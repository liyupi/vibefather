#!/usr/bin/env node
// VibeFather CLI: find website templates and drop their prompt.md + DESIGN.md into your project.
// Zero dependencies: only Node's built-in fetch, fs and child_process.
import { mkdir, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";

const API = (process.env.VIBEFATHER_API_URL ?? "https://vibefather.ai").replace(/\/$/, "");
const MCP_URL = process.env.VIBEFATHER_MCP_URL ?? "https://mcp.vibefather.ai";
const [cmd, ...rest] = process.argv.slice(2);

const flags = new Map<string, string | true>();
const args: string[] = [];
for (let i = 0; i < rest.length; i++) {
  const a = rest[i]!;
  if (a.startsWith("--")) {
    const next = rest[i + 1];
    if (next && !next.startsWith("--")) {
      flags.set(a.slice(2), next);
      i++;
    } else flags.set(a.slice(2), true);
  } else args.push(a);
}

const dim = (s: string) => (process.stdout.isTTY ? `\x1b[2m${s}\x1b[0m` : s);
const bold = (s: string) => (process.stdout.isTTY ? `\x1b[1m${s}\x1b[0m` : s);

async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url, { headers: { "user-agent": "vibefather-cli" } });
  if (res.status === 404) throw new Error("Template not found. Try: npx vibefather search <query>");
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return (await res.json()) as T;
}

async function getText(url: string): Promise<string> {
  const res = await fetch(url, { headers: { "user-agent": "vibefather-cli" } });
  if (res.status === 404) throw new Error("Template not found. Try: npx vibefather search <query>");
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.text();
}

type Item = { slug: string; title?: string; name: string; descriptor: string; tagline: string; stack: string; url: string };

async function search() {
  const q = args.join(" ");
  const { templates } = await getJson<{ templates: Item[] }>(`${API}/api/v1/templates?limit=20${q ? `&q=${encodeURIComponent(q)}` : ""}`);
  if (!templates.length) return console.log("No templates matched.");
  for (const t of templates) {
    console.log(`${bold(t.slug.padEnd(28))} ${t.title ?? `${t.name} — ${t.descriptor}`}`);
    console.log(`${" ".repeat(29)}${dim(t.stack)}`);
  }
  console.log(dim(`\nAdd one: npx vibefather add <slug>`));
}

async function add() {
  const slug = args[0];
  if (!slug) throw new Error("Usage: npx vibefather add <slug> [--dir <path>] [--design-only]");
  const dir = path.resolve(String(flags.get("dir") ?? path.join("vibefather", slug)));
  const designOnly = flags.has("design-only");
  const [meta, design, prompt] = await Promise.all([
    getJson<{ title?: string; name: string; descriptor: string; demo: string | null; links: { page: string } }>(`${API}/api/v1/templates/${encodeURIComponent(slug)}`),
    getText(`${API}/api/v1/templates/${encodeURIComponent(slug)}/design`),
    designOnly ? Promise.resolve("") : getText(`${API}/api/v1/templates/${encodeURIComponent(slug)}/prompt?via=cli`),
  ]);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, "DESIGN.md"), design);
  if (!designOnly) await writeFile(path.join(dir, "prompt.md"), prompt);
  const rel = path.relative(process.cwd(), dir) || ".";
  console.log(bold(meta.title ?? `${meta.name} — ${meta.descriptor}`));
  console.log(`  ${designOnly ? "" : `${rel}/prompt.md\n  `}${rel}/DESIGN.md`);
  console.log(`  live demo: ${meta.demo ?? meta.links.page}`);
  console.log(
    designOnly
      ? `\nNext: ask your agent "Apply the design system in ${rel}/DESIGN.md to this project."`
      : `\nNext: ask your agent "Build this site following ${rel}/prompt.md. Replace the [VARIABLES] with my details."`,
  );
}

async function open() {
  const slug = args[0];
  const url = slug ? `${API}/templates/${slug}` : API;
  const opener = process.platform === "darwin" ? "open" : process.platform === "win32" ? "start" : "xdg-open";
  spawn(opener, [url], { stdio: "ignore", detached: true, shell: process.platform === "win32" }).unref();
  console.log(url);
}

// Installs the Agent Skill. ~/.agents/skills is read by Codex, Cursor, GitHub Copilot, Gemini CLI and Windsurf;
// Claude Code reads ~/.claude/skills.
async function skill() {
  const project = flags.has("project");
  const root = project ? process.cwd() : homedir();
  const md = await getText(`${API}/.well-known/agent-skills/vibefather/SKILL.md`);
  const targets = [path.join(root, ".agents", "skills", "vibefather"), path.join(root, ".claude", "skills", "vibefather")];
  for (const dir of targets) {
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, "SKILL.md"), md);
    console.log(`  ${dir.replace(homedir(), "~")}/SKILL.md`);
  }
  console.log(`\n${bold("VibeFather skill installed")} ${dim(project ? "(this project)" : "(all projects)")}`);
  console.log(dim("Works in Claude Code, Codex, Cursor, GitHub Copilot, Gemini CLI and Windsurf. Restart the tool, then ask:"));
  console.log(`  "Build me a portfolio site from a VibeFather template"`);
}

function mcp() {
  const json = (o: unknown) => JSON.stringify(o, null, 2);
  console.log(`${bold("VibeFather MCP server")}  ${MCP_URL}  ${dim("(no API key needed)")}

${bold("Claude Code")}
  claude mcp add --transport http vibefather ${MCP_URL}

${bold("Codex")}
  codex mcp add vibefather --url ${MCP_URL}

${bold("Gemini CLI")}
  gemini mcp add --transport http vibefather ${MCP_URL}

${bold("Cursor")} ${dim(".cursor/mcp.json")}
${json({ mcpServers: { vibefather: { url: MCP_URL } } })}

${bold("VS Code / GitHub Copilot")} ${dim(".vscode/mcp.json")}
${json({ servers: { vibefather: { type: "http", url: MCP_URL } } })}

${bold("Windsurf")} ${dim("~/.codeium/windsurf/mcp_config.json")}
${json({ mcpServers: { vibefather: { serverUrl: MCP_URL } } })}

${bold("Claude.ai / ChatGPT")}
  Settings → Connectors → Add custom connector → ${MCP_URL}

One-click buttons for each tool: ${API}/ai`);
}

function login() {
  // Browser sign-in from the CLI is not available yet; Pro prompts are on the website.
  console.log(`Log in at ${API}/login. Pro prompts and source code are on each template page for Pro members: ${API}/pricing`);
  console.log(dim("Signing in from the CLI is coming soon."));
}

function help() {
  console.log(`${bold("vibefather")} — original website templates for AI coding tools

  npx vibefather skill [--project]        install the VibeFather skill for Claude Code, Codex, Cursor and more
  npx vibefather mcp                      show how to connect the MCP server to your tool
  npx vibefather search [query]           find templates
  npx vibefather add <slug> [--dir d]     write prompt.md + DESIGN.md into your project
  npx vibefather add <slug> --design-only
  npx vibefather open [slug]              open a template in your browser

Browse all templates: ${API}/templates`);
}

const commands: Record<string, () => unknown> = { skill, mcp, search, add, open, login, help, "--help": help, "-h": help };

try {
  await (commands[cmd ?? "help"] ?? help)();
} catch (err) {
  console.error(`✗ ${(err as Error).message}`);
  process.exit(1);
}
