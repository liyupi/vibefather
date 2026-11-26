# Use VibeFather in Claude Code, Codex, Cursor, GitHub Copilot, Gemini CLI and 28 more AI coding tools

VibeFather gives your AI coding tool a library of original website templates, each with a live demo, the exact build prompt and a DESIGN.md. There are three ways in, and you only need one:

| | Command or address | Works in |
|---|---|---|
| **Agent Skill** (recommended) | `npx skills add https://vibefather.ai` | Every tool that loads Agent Skills (70+) |
| **Remote MCP server** | `https://mcp.vibefather.ai` (Streamable HTTP, no key) | Every tool that supports remote MCP |
| **CLI** | `npx vibefather add <slug>` | Anything: it writes prompt.md + DESIGN.md into your project |

After setup, just ask: *"Build me a portfolio site from a VibeFather template"*, *"Find a dark SaaS landing page on VibeFather and build it for my product"*, or *"Restyle this project with the design of neo-brutalist-blog-and-portfolio"*.

## Coding agents

### Claude Code

*Anthropic's coding agent for the terminal.* Claude Code builds a whole multi-file site from one long prompt, so a VibeFather prompt is a natural fit: paste it, or let Claude search the library over MCP.

**Skill**

```bash
npx skills add https://vibefather.ai -g -a claude-code
```

**MCP server**

```bash
claude mcp add --transport http vibefather https://mcp.vibefather.ai
```

**Tip:** Start Claude Code in an empty folder, then ask: “find a dark SaaS template on VibeFather and build it for my product”.

Setup page with one-click buttons: [vibefather.ai/ai/claude-code](https://vibefather.ai/ai/claude-code?utm_source=github&utm_medium=readme&utm_campaign=vibefather&utm_content=agents)

### Codex

*OpenAI's coding agent for the terminal and desktop.* Codex runs the prompt end to end in your terminal or the Codex app. Add the MCP server once and it can pick a template and pull its prompt itself.

**Skill**

```bash
npx skills add https://vibefather.ai -g -a codex
```

**MCP server**

```bash
codex mcp add vibefather --url https://mcp.vibefather.ai
```

**Tip:** Put DESIGN.md in the project root next to AGENTS.md so Codex keeps the look consistent in later edits.

Setup page with one-click buttons: [vibefather.ai/ai/codex](https://vibefather.ai/ai/codex?utm_source=github&utm_medium=readme&utm_campaign=vibefather&utm_content=agents)

### Gemini CLI

*Google's open-source agent for the terminal.* Gemini CLI can take a full VibeFather prompt in one go. With the MCP server it can also look up templates by tag.

**Skill**

```bash
npx skills add https://vibefather.ai -g -a gemini-cli
```

**MCP server**

```bash
gemini mcp add --transport http vibefather https://mcp.vibefather.ai
```

**Tip:** Run it in an empty folder and approve file writes once, so the build doesn't stop at every file.

Setup page with one-click buttons: [vibefather.ai/ai/gemini-cli](https://vibefather.ai/ai/gemini-cli?utm_source=github&utm_medium=readme&utm_campaign=vibefather&utm_content=agents)

### OpenCode

*Open-source coding agent for the terminal, any model.* OpenCode is an open-source terminal agent that works with almost any model provider, so you can build a VibeFather template with the model you already pay for.

**Skill**

```bash
npx skills add https://vibefather.ai -g -a opencode
```

**MCP server** (`opencode.json`)

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "vibefather": {
      "type": "remote",
      "url": "https://mcp.vibefather.ai",
      "enabled": true
    }
  }
}
```

**Tip:** Use a strong coding model for the first build — long prompts with exact motion specs reward it.

Setup page with one-click buttons: [vibefather.ai/ai/opencode](https://vibefather.ai/ai/opencode?utm_source=github&utm_medium=readme&utm_campaign=vibefather&utm_content=agents)

### Pi

*Minimal, hackable coding agent for the terminal.* Pi keeps the agent small and lets skills do the rest, which suits VibeFather well: install the skill and Pi knows how to find and build any template.

**Skill**

```bash
npx skills add https://vibefather.ai -g -a pi
```

**Tip:** Pi has no MCP on purpose — the skill plus the CLI covers everything the MCP server does.

Setup page with one-click buttons: [vibefather.ai/ai/pi](https://vibefather.ai/ai/pi?utm_source=github&utm_medium=readme&utm_campaign=vibefather&utm_content=agents)

### Amp

*Frontier coding agent for the terminal and editor.* Amp works through long, multi-step builds on its own, so a full VibeFather prompt — every section, color and animation — usually lands in one run.

**Skill**

```bash
npx skills add https://vibefather.ai -g -a amp
```

**MCP server**: add a remote MCP server (Streamable HTTP) named `vibefather` with the URL `https://mcp.vibefather.ai` in Amp's MCP settings.

**Tip:** Ask Amp to start the dev server and check the page at the end of the run.

Setup page with one-click buttons: [vibefather.ai/ai/amp](https://vibefather.ai/ai/amp?utm_source=github&utm_medium=readme&utm_campaign=vibefather&utm_content=agents)

### goose

*Block's open-source, extensible AI agent.* goose runs locally with the model of your choice and supports skills and MCP extensions, so it can pull a VibeFather template and build it on your machine.

**Skill**

```bash
npx skills add https://vibefather.ai -g -a goose
```

**MCP server**: add a remote MCP server (Streamable HTTP) named `vibefather` with the URL `https://mcp.vibefather.ai` in goose's MCP settings.

**Tip:** Give goose an empty working folder so the template's file structure stays clean.

Setup page with one-click buttons: [vibefather.ai/ai/goose](https://vibefather.ai/ai/goose?utm_source=github&utm_medium=readme&utm_campaign=vibefather&utm_content=agents)

### Kiro

*AWS's spec-driven agentic IDE and CLI.* Kiro plans work as specs before it codes. A VibeFather prompt already reads like a spec — stack, pages, sections, motion — so Kiro can turn it into tasks directly.

**Skill**

```bash
npx skills add https://vibefather.ai -g -a kiro-cli
```

**MCP server**: add a remote MCP server (Streamable HTTP) named `vibefather` with the URL `https://mcp.vibefather.ai` in Kiro's MCP settings.

**Tip:** Let Kiro generate its task list from prompt.md, then run the tasks in order.

Setup page with one-click buttons: [vibefather.ai/ai/kiro-cli](https://vibefather.ai/ai/kiro-cli?utm_source=github&utm_medium=readme&utm_campaign=vibefather&utm_content=agents)

### Qwen Code

*Alibaba's open-source terminal agent for Qwen models.* Qwen Code brings Qwen's coding models to the terminal. Install the skill and it can fetch a VibeFather template and build it end to end.

**Skill**

```bash
npx skills add https://vibefather.ai -g -a qwen-code
```

**MCP server**: add a remote MCP server (Streamable HTTP) named `vibefather` with the URL `https://mcp.vibefather.ai` in Qwen Code's MCP settings.

**Tip:** Pick a Qwen coder model for the build; it follows the Stack section closely.

Setup page with one-click buttons: [vibefather.ai/ai/qwen-code](https://vibefather.ai/ai/qwen-code?utm_source=github&utm_medium=readme&utm_campaign=vibefather&utm_content=agents)

### Kimi Code

*Moonshot AI's coding agent for the terminal.* Kimi Code handles long context well, which helps with VibeFather prompts that spell out every section and animation in detail.

**Skill**

```bash
npx skills add https://vibefather.ai -g -a kimi-code-cli
```

**MCP server**: add a remote MCP server (Streamable HTTP) named `vibefather` with the URL `https://mcp.vibefather.ai` in Kimi Code's MCP settings.

**Tip:** Paste the Copy prompt instruction as-is; it installs the skill and fetches the template itself.

Setup page with one-click buttons: [vibefather.ai/ai/kimi-code](https://vibefather.ai/ai/kimi-code?utm_source=github&utm_medium=readme&utm_campaign=vibefather&utm_content=agents)

### DeepSeek Harness

*DeepSeek's open-source agent harness (dsh).* DeepSeek Harness supports native plugin bundles and custom plugin markets. Install the VibeFather plugin once to mount both the remote MCP server and the bundled Agent Skill automatically.

**MCP server**

```bash
dsh plugin add dsh-plugin-vibefather
# Or add our custom plugin market in DSH Plugins -> Discover:
# https://vibefather.ai/dsh/index.json
```

**Tip:** In the DSH Web UI, open Plugins -> Discover -> Add custom index and paste https://vibefather.ai/dsh/index.json to install with one click.

Setup page with one-click buttons: [vibefather.ai/ai/deepseek-harness](https://vibefather.ai/ai/deepseek-harness?utm_source=github&utm_medium=readme&utm_campaign=vibefather&utm_content=agents)

### Factory Droid

*Factory's coding agent for the terminal and IDE.* Droid is built for end-to-end tasks. Give it a VibeFather template and it scaffolds, builds and runs the site without hand-holding.

**Skill**

```bash
npx skills add https://vibefather.ai -g -a droid
```

**MCP server**: add a remote MCP server (Streamable HTTP) named `vibefather` with the URL `https://mcp.vibefather.ai` in Factory Droid's MCP settings.

**Tip:** Tell Droid the target folder up front so it doesn't build inside an existing project.

Setup page with one-click buttons: [vibefather.ai/ai/droid](https://vibefather.ai/ai/droid?utm_source=github&utm_medium=readme&utm_campaign=vibefather&utm_content=agents)

### OpenHands

*Open-source autonomous software agent.* OpenHands works in its own sandbox, so it can install the VibeFather CLI, build the template and preview it without touching your machine.

**Skill**

```bash
npx skills add https://vibefather.ai -g -a openhands
```

**MCP server**: add a remote MCP server (Streamable HTTP) named `vibefather` with the URL `https://mcp.vibefather.ai` in OpenHands's MCP settings.

**Tip:** Ask it to expose the dev server port so you can open the result in your browser.

Setup page with one-click buttons: [vibefather.ai/ai/openhands](https://vibefather.ai/ai/openhands?utm_source=github&utm_medium=readme&utm_campaign=vibefather&utm_content=agents)

### Warp

*Agentic terminal with built-in coding agents.* Warp's agents run right in your terminal, so the skill install, the template download and the dev server all happen in one place.

**Skill**

```bash
npx skills add https://vibefather.ai -g -a warp
```

**MCP server**: add a remote MCP server (Streamable HTTP) named `vibefather` with the URL `https://mcp.vibefather.ai` in Warp's MCP settings.

**Tip:** Run the Copy prompt instruction in Agent Mode and approve the commands as they come.

Setup page with one-click buttons: [vibefather.ai/ai/warp](https://vibefather.ai/ai/warp?utm_source=github&utm_medium=readme&utm_campaign=vibefather&utm_content=agents)

### Devin

*Cognition's autonomous AI software engineer.* Devin takes a task and works through it on its own. Hand it a VibeFather template and it delivers a built, running site.

**Skill**

```bash
npx skills add https://vibefather.ai -g -a devin
```

**MCP server**: add a remote MCP server (Streamable HTTP) named `vibefather` with the URL `https://mcp.vibefather.ai` in Devin's MCP settings.

**Tip:** Include the template page link so Devin can compare its result with the live demo.

Setup page with one-click buttons: [vibefather.ai/ai/devin](https://vibefather.ai/ai/devin?utm_source=github&utm_medium=readme&utm_campaign=vibefather&utm_content=agents)

## AI editors

### Cursor

*AI code editor with a built-in agent.* In Cursor, paste the prompt into Agent mode, or connect the MCP server so the agent can search templates and read their screenshots.

**Skill**

```bash
npx skills add https://vibefather.ai -g -a cursor
```

**MCP server** (`.cursor/mcp.json`)

```json
{
  "mcpServers": {
    "vibefather": {
      "url": "https://mcp.vibefather.ai"
    }
  }
}
```

**Tip:** Save DESIGN.md as a project rule so every later prompt follows the same colors, fonts and spacing.

Setup page with one-click buttons: [vibefather.ai/ai/cursor](https://vibefather.ai/ai/cursor?utm_source=github&utm_medium=readme&utm_campaign=vibefather&utm_content=agents)

### GitHub Copilot

*GitHub's AI assistant inside VS Code.* Copilot's agent mode in VS Code can build a template from the prompt and use the VibeFather MCP server as a tool.

**Skill**

```bash
npx skills add https://vibefather.ai -g -a github-copilot
```

**MCP server** (`.vscode/mcp.json`)

```json
{
  "servers": {
    "vibefather": {
      "type": "http",
      "url": "https://mcp.vibefather.ai"
    }
  }
}
```

**Tip:** Switch the chat to Agent mode before pasting — Ask mode only answers, it won't create files.

Setup page with one-click buttons: [vibefather.ai/ai/github-copilot](https://vibefather.ai/ai/github-copilot?utm_source=github&utm_medium=readme&utm_campaign=vibefather&utm_content=agents)

### Windsurf

*AI code editor with the Cascade agent.* Windsurf's Cascade agent builds the site from the prompt in your workspace. Connect the MCP server to search templates from chat.

**Skill**

```bash
npx skills add https://vibefather.ai -g -a windsurf
```

**MCP server** (`~/.codeium/windsurf/mcp_config.json`)

```json
{
  "mcpServers": {
    "vibefather": {
      "serverUrl": "https://mcp.vibefather.ai"
    }
  }
}
```

**Tip:** Keep DESIGN.md open in the workspace so Cascade picks it up as context for follow-up changes.

Setup page with one-click buttons: [vibefather.ai/ai/windsurf](https://vibefather.ai/ai/windsurf?utm_source=github&utm_medium=readme&utm_campaign=vibefather&utm_content=agents)

### Zed

*Fast, open-source editor with an AI agent panel.* Zed's agent panel edits the whole project, and Zed reads skills and MCP servers, so it can build a VibeFather template inside a fast native editor.

**Skill**

```bash
npx skills add https://vibefather.ai -g -a zed
```

**MCP server**: add a remote MCP server (Streamable HTTP) named `vibefather` with the URL `https://mcp.vibefather.ai` in Zed's MCP settings.

**Tip:** Open an empty folder as the project before you paste the instruction.

Setup page with one-click buttons: [vibefather.ai/ai/zed](https://vibefather.ai/ai/zed?utm_source=github&utm_medium=readme&utm_campaign=vibefather&utm_content=agents)

### Trae

*ByteDance's AI-native IDE.* Trae's builder mode creates a project from a description, so a VibeFather prompt gives it the full spec instead of a one-line idea.

**Skill**

```bash
npx skills add https://vibefather.ai -g -a trae
```

**MCP server**: add a remote MCP server (Streamable HTTP) named `vibefather` with the URL `https://mcp.vibefather.ai` in Trae's MCP settings.

**Tip:** Use the builder (agent) mode, not chat, so Trae writes the files itself.

Setup page with one-click buttons: [vibefather.ai/ai/trae](https://vibefather.ai/ai/trae?utm_source=github&utm_medium=readme&utm_campaign=vibefather&utm_content=agents)

### Qoder

*Alibaba's agentic coding platform.* Qoder plans and executes multi-file changes, which fits a VibeFather build: one prompt, a whole site, files created in order.

**Skill**

```bash
npx skills add https://vibefather.ai -g -a qoder
```

**MCP server**: add a remote MCP server (Streamable HTTP) named `vibefather` with the URL `https://mcp.vibefather.ai` in Qoder's MCP settings.

**Tip:** Start in a new workspace so Qoder treats the template as a fresh project.

Setup page with one-click buttons: [vibefather.ai/ai/qoder](https://vibefather.ai/ai/qoder?utm_source=github&utm_medium=readme&utm_campaign=vibefather&utm_content=agents)

### ZCode

*Z.ai's coding tool for GLM models.* ZCode pairs GLM models with a coding agent and your existing toolchain. Install the skill and it can pick a VibeFather template and build it.

**Skill**

```bash
npx skills add https://vibefather.ai -g -a zcode
```

**MCP server**: add a remote MCP server (Streamable HTTP) named `vibefather` with the URL `https://mcp.vibefather.ai` in ZCode's MCP settings.

**Tip:** Let it run the VibeFather CLI commands from the instruction rather than pasting the whole prompt.

Setup page with one-click buttons: [vibefather.ai/ai/zcode](https://vibefather.ai/ai/zcode?utm_source=github&utm_medium=readme&utm_campaign=vibefather&utm_content=agents)

### Kilo Code

*Open-source coding agent for VS Code and JetBrains.* Kilo Code runs as an extension with the model of your choice. Install the skill and its agent can build any VibeFather template in your editor.

**Skill**

```bash
npx skills add https://vibefather.ai -g -a kilo
```

**MCP server**: add a remote MCP server (Streamable HTTP) named `vibefather` with the URL `https://mcp.vibefather.ai` in Kilo Code's MCP settings.

**Tip:** Switch to Code mode before pasting so it creates files instead of just planning.

Setup page with one-click buttons: [vibefather.ai/ai/kilo-code](https://vibefather.ai/ai/kilo-code?utm_source=github&utm_medium=readme&utm_campaign=vibefather&utm_content=agents)

### Cline

*Open-source autonomous coding agent for VS Code.* Cline asks before each command and file change, so you can watch a VibeFather template being built step by step and approve as you go.

**Skill**

```bash
npx skills add https://vibefather.ai -g -a cline
```

**MCP server**: add a remote MCP server (Streamable HTTP) named `vibefather` with the URL `https://mcp.vibefather.ai` in Cline's MCP settings.

**Tip:** Turn on auto-approve for file writes in the project folder to speed up long builds.

Setup page with one-click buttons: [vibefather.ai/ai/cline](https://vibefather.ai/ai/cline?utm_source=github&utm_medium=readme&utm_campaign=vibefather&utm_content=agents)

### Roo Code

*Open-source AI dev team inside VS Code.* Roo Code's modes split planning from coding. Plan from the template prompt in Architect mode, then build it in Code mode.

**Skill**

```bash
npx skills add https://vibefather.ai -g -a roo
```

**MCP server**: add a remote MCP server (Streamable HTTP) named `vibefather` with the URL `https://mcp.vibefather.ai` in Roo Code's MCP settings.

**Tip:** Code mode with file writes allowed gives the fastest one-shot build.

Setup page with one-click buttons: [vibefather.ai/ai/roo-code](https://vibefather.ai/ai/roo-code?utm_source=github&utm_medium=readme&utm_campaign=vibefather&utm_content=agents)

### Antigravity

*Google's agent-first development platform.* Antigravity's agents can run the build and check the result in a browser, a good match for VibeFather templates that come with a live demo to compare against.

**Skill**

```bash
npx skills add https://vibefather.ai -g -a antigravity
```

**MCP server**: add a remote MCP server (Streamable HTTP) named `vibefather` with the URL `https://mcp.vibefather.ai` in Antigravity's MCP settings.

**Tip:** Ask the agent to open the template's live demo and compare it with what it built.

Setup page with one-click buttons: [vibefather.ai/ai/antigravity](https://vibefather.ai/ai/antigravity?utm_source=github&utm_medium=readme&utm_campaign=vibefather&utm_content=agents)

### Junie

*JetBrains' coding agent for its IDEs.* Junie works inside WebStorm and the other JetBrains IDEs, so you can build a VibeFather template where you already write code.

**Skill**

```bash
npx skills add https://vibefather.ai -g -a junie
```

**MCP server**: add a remote MCP server (Streamable HTTP) named `vibefather` with the URL `https://mcp.vibefather.ai` in Junie's MCP settings.

**Tip:** Open a new empty project in WebStorm first, then give Junie the instruction.

Setup page with one-click buttons: [vibefather.ai/ai/junie](https://vibefather.ai/ai/junie?utm_source=github&utm_medium=readme&utm_campaign=vibefather&utm_content=agents)

### Augment Code

*Coding agent for VS Code, JetBrains and the terminal.* Augment's agent handles multi-file tasks across editors and its CLI, so a VibeFather build works the same wherever you run it.

**Skill**

```bash
npx skills add https://vibefather.ai -g -a augment
```

**MCP server**: add a remote MCP server (Streamable HTTP) named `vibefather` with the URL `https://mcp.vibefather.ai` in Augment Code's MCP settings.

**Tip:** Use the agent (not chat) so it can create the project files.

Setup page with one-click buttons: [vibefather.ai/ai/augment](https://vibefather.ai/ai/augment?utm_source=github&utm_medium=readme&utm_campaign=vibefather&utm_content=agents)

### CodeBuddy

*Tencent's AI coding assistant and IDE.* CodeBuddy's agent can create a project from a full spec. A VibeFather prompt gives it the exact stack, layout and motion to follow.

**Skill**

```bash
npx skills add https://vibefather.ai -g -a codebuddy
```

**MCP server**: add a remote MCP server (Streamable HTTP) named `vibefather` with the URL `https://mcp.vibefather.ai` in CodeBuddy's MCP settings.

**Tip:** Run it in a fresh folder and let it install dependencies when asked.

Setup page with one-click buttons: [vibefather.ai/ai/codebuddy](https://vibefather.ai/ai/codebuddy?utm_source=github&utm_medium=readme&utm_campaign=vibefather&utm_content=agents)

## App builders in the browser

### Lovable

*Build an app by chatting, right in the browser.* Lovable builds React + Tailwind apps in the browser. Paste a VibeFather prompt as your first message — React + Tailwind templates come out closest.

**Prompt**: open any template on [vibefather.ai](https://vibefather.ai/templates?utm_source=github&utm_medium=readme&utm_campaign=vibefather&utm_content=agents), copy the prompt (or `curl https://vibefather.ai/templates/<slug>.md`) and paste it as your first message.

**Tip:** Paste the whole prompt in one message. Splitting it up makes the builder guess the parts it hasn't seen yet.

Setup page with one-click buttons: [vibefather.ai/ai/lovable](https://vibefather.ai/ai/lovable?utm_source=github&utm_medium=readme&utm_campaign=vibefather&utm_content=agents)

### Bolt

*Build and run apps in a browser sandbox.* Bolt runs the project in a browser sandbox, so you see the template come together live. Paste the prompt as your first message.

**Prompt**: open any template on [vibefather.ai](https://vibefather.ai/templates?utm_source=github&utm_medium=readme&utm_campaign=vibefather&utm_content=agents), copy the prompt (or `curl https://vibefather.ai/templates/<slug>.md`) and paste it as your first message.

**Tip:** If Bolt picks a different stack, add “use exactly the stack in the Stack section” to the end of the prompt.

Setup page with one-click buttons: [vibefather.ai/ai/bolt](https://vibefather.ai/ai/bolt?utm_source=github&utm_medium=readme&utm_campaign=vibefather&utm_content=agents)

### v0

*Vercel's AI builder for React and Next.js.* v0 generates React and Next.js projects. Paste a template prompt and it builds the layout, components and motion described in it.

**Prompt**: open any template on [vibefather.ai](https://vibefather.ai/templates?utm_source=github&utm_medium=readme&utm_campaign=vibefather&utm_content=agents), copy the prompt (or `curl https://vibefather.ai/templates/<slug>.md`) and paste it as your first message.

**Tip:** Templates tagged React and Tailwind translate to v0's Next.js setup with the fewest changes.

Setup page with one-click buttons: [vibefather.ai/ai/v0](https://vibefather.ai/ai/v0?utm_source=github&utm_medium=readme&utm_campaign=vibefather&utm_content=agents)

### Replit

*Build, run and host apps in one place.* Replit Agent builds and hosts the site in one place. Paste a template prompt and deploy the result from the same workspace.

**Prompt**: open any template on [vibefather.ai](https://vibefather.ai/templates?utm_source=github&utm_medium=readme&utm_campaign=vibefather&utm_content=agents), copy the prompt (or `curl https://vibefather.ai/templates/<slug>.md`) and paste it as your first message.

**Tip:** Ask the agent to keep it a static site — templates don't need a backend or database.

Setup page with one-click buttons: [vibefather.ai/ai/replit](https://vibefather.ai/ai/replit?utm_source=github&utm_medium=readme&utm_campaign=vibefather&utm_content=agents)

## Any other tool

If your tool reads a long prompt and writes files, it can build a VibeFather template. Copy the prompt from the template page, or fetch it as Markdown with `curl https://vibefather.ai/templates/<slug>.md`, and paste it as one message. If it supports remote MCP, add `https://mcp.vibefather.ai`.
