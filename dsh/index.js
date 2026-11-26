import { readFile } from "node:fs/promises";
import { dirname, join, sep } from "node:path";
import { fileURLToPath } from "node:url";

const BUNDLED_SKILL_RANK = 600;
const SKILL_NAME = "vibefather";
const DEFAULT_DESCRIPTION =
  "Search and build original vibe coding website templates from VibeFather with exact build prompts and DESIGN.md design systems.";

export const name = "vibefather-skill";
export const inject = ["skills"];

function parseSkill(raw) {
  const fm = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/u.exec(raw);
  if (!fm) return { description: DEFAULT_DESCRIPTION, content: raw.trim() };
  const body = raw.slice(fm[0].length).trim();
  const block = fm[1] ?? "";
  let description = DEFAULT_DESCRIPTION;
  const single = /^description:\s*(.+)$/m.exec(block);
  if (single) {
    const val = (single[1] ?? "").trim();
    if (val.startsWith('"')) {
      try {
        const parsed = JSON.parse(val);
        if (typeof parsed === "string" && parsed.trim()) description = parsed.trim();
      } catch {
        description = val.replace(/^"|"$/g, "").trim() || DEFAULT_DESCRIPTION;
      }
    } else if (val.startsWith("'") && val.endsWith("'")) {
      description = val.slice(1, -1).trim() || DEFAULT_DESCRIPTION;
    } else if (val && !/^[>|]-?$/.test(val)) {
      description = val;
    } else {
      const folded = /^description:\s*[>|]-?\r?\n((?:[ \t]+[^\r\n]*\r?\n?)+)/m.exec(block);
      if (folded) {
        description = folded[1].replace(/^[ \t]+/gm, "").replace(/\r?\n/g, " ").trim() || DEFAULT_DESCRIPTION;
      }
    }
  }
  return { description, content: body };
}

export function apply(ctx) {
  const pkgRoot = dirname(dirname(fileURLToPath(import.meta.url)));
  const skillDir = join(pkgRoot, "skills", SKILL_NAME);
  const skillFile = join(skillDir, "SKILL.md");

  async function load(signal) {
    const raw = await readFile(skillFile, { encoding: "utf8", signal });
    return parseSkill(raw);
  }

  ctx.skills.registerProvider((control) => ({
    name: "dsh-plugin-vibefather",
    async list(options) {
      try {
        const parsed = await load(options?.signal);
        return {
          candidates: [
            {
              name: SKILL_NAME,
              path: skillFile,
              description: parsed.description,
              invocation: { modelInvocable: true, userInvocable: true },
              provider: "dsh-plugin-vibefather",
              source: "bundled",
              rank: BUNDLED_SKILL_RANK,
              resourceBase: { kind: "directory", path: skillDir.split(sep).join("/") },
              locator: skillFile,
            },
          ],
          complete: true,
        };
      } catch (err) {
        if (options?.signal?.aborted) throw err;
        ctx.logger?.warn?.(`vibefather-skill: failed to load SKILL.md: ${String(err)}`);
        return { candidates: [], complete: true };
      }
    },
    async get(candidate, options) {
      const { rank: _rank, locator: _locator, ...summary } = candidate;
      try {
        const parsed = await load(options?.signal);
        return { ...summary, content: parsed.content };
      } catch (err) {
        if (options?.signal?.aborted) throw err;
        control.invalidate();
        return undefined;
      }
    },
  }));
}
