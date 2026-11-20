# vibefather

Original website templates for AI coding tools — each with a live demo, a tested build prompt and a DESIGN.md. Browse them at [vibefather.ai](https://vibefather.ai).

## Give your AI tool the whole library

```bash
npx vibefather skill
```

Installs the VibeFather skill for Claude Code, Codex, Cursor, GitHub Copilot, Gemini CLI and Windsurf (`~/.agents/skills` and `~/.claude/skills`). Add `--project` to install it into the current project only. Then ask your agent:

> Build me a portfolio site from a VibeFather template

Or connect the MCP server (`https://mcp.vibefather.ai`, no API key):

```bash
npx vibefather mcp   # prints the setup for every tool
```

## Add one template to your project

```bash
npx vibefather search "dark saas"
npx vibefather add <slug>                # vibefather/<slug>/prompt.md + DESIGN.md
npx vibefather add <slug> --design-only  # just the design system
npx vibefather open <slug>               # open the live demo page
```

Then tell your agent: *"Build this site following vibefather/&lt;slug&gt;/prompt.md. Replace the [VARIABLES] with my details."*

## License

The CLI is MIT. Free template prompts are CC BY-NC 4.0 (personal and non-commercial use, with credit); commercial use needs [VibeFather Pro](https://vibefather.ai/pricing).
