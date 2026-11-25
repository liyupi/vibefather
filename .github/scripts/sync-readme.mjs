// Refreshes the dynamic showcase sections (counts, gallery, latest models and repo description)
// in README.md and README.zh-CN.md from the public vibefather.ai showcase API.
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";

const SITE = "https://vibefather.ai";
const UTM = "utm_source=github&utm_medium=readme&utm_campaign=vibefather&utm_content=";

const ZH = {
  demo: "\u5728\u7ebf Demo",
  prompt: "\u63d0\u793a\u8bcd",
  latestModels: "\u6700\u65b0\u4e0a\u7ebf\u6a21\u578b\uff1a",
  allModels: "\u5168\u90e8",
  modelsUnit: "\u4e2a\u6a21\u578b",
  altMid: "\uff1avibe coding \u7f51\u7ad9\u6a21\u677f\uff0c\u5728\u7ebf Demo \u7531 ",
  altEnd: " \u751f\u6210",
  sep: "\u3001",
};

const res = await fetch(`${SITE}/api/v1/showcase`, {
  headers: { "user-agent": "vibefather-readme-sync" },
  signal: AbortSignal.timeout(30_000),
});
if (!res.ok) throw new Error(`showcase fetch failed: HTTP ${res.status}`);
const data = await res.json();

if (!data?.counts?.templates || !Array.isArray(data.gallery) || data.gallery.length < 3) {
  throw new Error("showcase payload looks incomplete");
}

const andList = (xs) => (xs.length > 1 ? `${xs.slice(0, -1).join(", ")} and ${xs.at(-1)}` : (xs[0] ?? ""));

function renderGallery(items, lang) {
  const count = Math.floor(items.length / 3) * 3;
  const shown = items.slice(0, count);
  const demo = lang === "en" ? "Live demo" : ZH.demo;
  const prompt = lang === "en" ? "Prompt" : ZH.prompt;
  const cell = (t) => {
    const page = `${t.page}?${UTM}gallery`;
    const models = t.models ?? [];
    const alt =
      lang === "en"
        ? `${t.title}: vibe coding website template, live demos built by ${andList(models)}`
        : `${t.title}${ZH.altMid}${models.join(ZH.sep)}${ZH.altEnd}`;
    return `<td width="33%" valign="top">
<a href="${page}"><img src="${t.image}" width="100%" alt="${alt.replace(/"/g, "&quot;")}"></a><br>
<b><a href="${page}">${t.title}</a></b><br>
<sub>${t.tagline}</sub><br>
<sub>${models.join(" \u00b7 ")} \u00b7 <a href="${page}">${demo}</a> \u00b7 <a href="https://github.com/liyupi/awesome-vibe-coding-websites/blob/main/templates/${t.slug}/${lang === "zh" ? "prompt.zh-CN.md" : "prompt.md"}">${prompt}</a></sub>
</td>`;
  };
  const rows = [];
  for (let i = 0; i < shown.length; i += 3) {
    rows.push(`<tr>\n${shown.slice(i, i + 3).map(cell).join("\n")}\n</tr>`);
  }
  return `<table>\n${rows.join("\n")}\n</table>`;
}

function renderModels(models, lang) {
  const top = models.slice(0, 8);
  const links = top
    .map((m) => `[${m.name}](${SITE}/models/${m.slug}?${UTM}models) <sub>${m.sites}</sub>`)
    .join(" \u00b7 ");
  const more =
    models.length > top.length
      ? lang === "en"
        ? ` \u00b7 [all ${models.length} models \u2192](${SITE}/models?${UTM}models)`
        : ` \u00b7 [${ZH.allModels} ${models.length} ${ZH.modelsUnit} \u2192](${SITE}/zh/models?${UTM}models)`
      : "";
  return lang === "en" ? `**Latest models:** ${links}${more}` : `**${ZH.latestModels}** ${links}${more}`;
}

function replaceBlock(src, name, body) {
  const re = new RegExp(`<!-- ${name}:START -->[\\s\\S]*?<!-- ${name}:END -->`, "g");
  return src.replace(re, `<!-- ${name}:START -->\n${body}\n<!-- ${name}:END -->`);
}

function replaceInline(src, tag, value) {
  const re = new RegExp(`<!-- ${tag} -->[\\s\\S]*?<!-- /${tag} -->`, "g");
  return src.replace(re, `<!-- ${tag} -->${value}<!-- /${tag} -->`);
}

for (const [file, lang] of [
  ["README.md", "en"],
  ["README.zh-CN.md", "zh"],
]) {
  let content = readFileSync(file, "utf8");
  content = replaceInline(content, "T", data.counts.templatesFloor);
  content = replaceInline(content, "S", data.counts.sitesFloor);
  content = replaceInline(content, "M", String(data.counts.models));
  content = replaceBlock(content, "GALLERY", renderGallery(data.gallery, lang));
  content = replaceBlock(content, "MODELS", renderModels(data.models, lang));
  writeFileSync(file, content);
}

const run = (cmd, ...args) => execFileSync(cmd, args, { encoding: "utf8" }).trim();
run("git", "add", "README.md", "README.zh-CN.md");
if (run("git", "status", "--porcelain")) {
  run("git", "config", "user.name", "github-actions[bot]");
  run("git", "config", "user.email", "41898282+github-actions[bot]@users.noreply.github.com");
  const msg = `Refresh README showcase (${data.counts.templatesFloor} templates, ${data.counts.models} AI models)`;
  run("git", "commit", "-q", "-m", msg);
  run("git", "push", "-q");
  console.log(`committed: ${msg}`);
} else {
  console.log("no README changes");
}

if (data.repoDescription) {
  try {
    const metaEnv = { ...process.env, GH_TOKEN: process.env.REPO_META_TOKEN || process.env.GH_TOKEN };
    const current = JSON.parse(execFileSync("gh", ["repo", "view", "--json", "description"], { encoding: "utf8", env: metaEnv })).description || "";
    if (current.trim() !== data.repoDescription.trim()) {
      execFileSync("gh", ["repo", "edit", "--description", data.repoDescription], { encoding: "utf8", env: metaEnv });
      console.log(`updated description: ${data.repoDescription}`);
    }
  } catch (err) {
    console.warn(`skipped description sync: ${err.message}`);
  }
}
