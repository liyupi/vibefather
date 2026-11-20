# VibeFather API reference: MCP server, REST API and plain-text prompts

Everything here is public, read-only and free. No API key, no sign-up. Use it from an AI coding agent, a script, a CI job or your own tool.

| Surface | Address | Best for |
|---|---|---|
| Remote MCP server | `https://mcp.vibefather.ai` (Streamable HTTP, stateless) | AI coding agents: Claude Code, Codex, Cursor, Copilot, Gemini CLI, Windsurf, Claude Desktop, ChatGPT |
| REST API | `https://vibefather.ai/api/v1/…` (JSON and Markdown) | Scripts, CLIs, your own integrations |
| Plain-text prompt | `https://vibefather.ai/templates/<slug>.md` | Pasting into any AI tool, `curl` from an agent |
| Agent Skill | `https://vibefather.ai/skill.md`, `/.well-known/agent-skills/index.json` | `npx skills add https://vibefather.ai` |
| LLM index | `https://vibefather.ai/llms.txt`, `/llms-full.txt` | LLMs, answer engines and crawlers |

## MCP server

Endpoint: `https://mcp.vibefather.ai`. Transport: Streamable HTTP (`POST` JSON-RPC, JSON responses). The server is stateless, so every request stands on its own. The `initialize` result carries `instructions` with the full VibeFather workflow (the same text as the Agent Skill), so a model that connects knows how to search, ask for variables and build.

### Tools

#### `search_templates`

Search the library.

| Argument | Type | Notes |
|---|---|---|
| `query` | string, optional | Free words: `"dark saas"`, `"bakery"`, `"3d product configurator"` |
| `tags` | string[], optional | Tag slugs that must all match, e.g. `["landing-page", "dark"]`. Get them from `list_tags`. |
| `limit` | integer 1–30, optional | Default 10 |

Returns one block per template: slug, title, one line, tags, stack and the template page URL.

#### `get_template`

| Argument | Type |
|---|---|
| `slug` | string |

Returns the title, one line, stack, tags, access (free or Pro), page URL, every live demo built from the prompt (with the model that built it and the variable values it used), a preview image, credits for the work that inspired it, and the long description.

#### `get_prompt`

| Argument | Type |
|---|---|
| `slug` | string |

Returns the complete `prompt.md`: stack, file structure, pages, sections, copy as `[VARIABLES]`, colors, fonts, spacing, motion, assets and checks. Follow it exactly and replace the variables. For Pro templates the public prompt stops after the Variables section and says so.

#### `get_design_md`

| Argument | Type |
|---|---|
| `slug` | string |

Returns the template's `DESIGN.md`: color tokens, typography, spacing, radius, components, motion and rules. Use it to restyle an existing project without touching its content.

#### `list_tags`

No arguments. Returns every tag as `facet: slug — Name (count)`. Facets: `type`, `usecase`, `role`, `style`, `effect`, `stack`, `industry`.

#### `get_source`

| Argument | Type |
|---|---|
| `slug` | string |

Explains how to download the engineered source code of a demo (VibeFather Pro).

### Prompts

| Prompt | Arguments | What it does |
|---|---|---|
| `build_website` | `what`: what you want to build, or a template slug | Searches, shows 2–4 options with live demo links, asks for the `[VARIABLES]` once, builds exactly as the prompt says. Claude Code shows it as `/mcp__vibefather__build_website`. |
| `apply_design` | `slug` | Fetches the template's `DESIGN.md` and applies it to the current project, keeping your content and routing. |

### Try it with curl

```bash
curl -s https://mcp.vibefather.ai \
  -H 'content-type: application/json' \
  -H 'accept: application/json, text/event-stream' \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"search_templates","arguments":{"query":"portfolio","tags":["dark"],"limit":3}}}'
```

## REST API

Base URL: `https://vibefather.ai`. Responses are cached for a few minutes. Please keep it to a reasonable rate and set a `user-agent` that names your tool.

### `GET /api/v1/templates`

Search and list templates.

| Parameter | Notes |
|---|---|
| `q` | Free words |
| `tags` | Comma-separated tag slugs that must all match: `tags=landing-page,dark` |
| `type` | One type slug: `landing-page`, `saas`, `portfolio`, `ecommerce`, `dashboard`, `docs`, `explainer`, `game`, `toy`… |
| `style` | One style slug: `dark`, `minimal`, `editorial`, `brutalist`, `retro`, `glass`, `playful`… |
| `sort` | `popular` (default) or `latest` |
| `limit` | 1–100, default 30 |

```bash
curl -s "https://vibefather.ai/api/v1/templates?q=portfolio&tags=dark&limit=2"
```

```jsonc
{
  "templates": [{
    "slug": "kinetic-typography-portfolio",
    "title": "Kinetic Typography Portfolio",
    "tagline": "A motion designer portfolio where giant variable type splits, stretches and re-forms as you scroll.",
    "stack": "Vite 5 + TypeScript + GSAP …",
    "tags": [{ "slug": "portfolio", "facet": "type" }, { "slug": "dark", "facet": "style" }],
    "types": ["portfolio"],
    "styles": ["dark"],
    "model": "claude-opus-5-5",
    "preview": "https://media.vibefather.ai/t/…/poster.webp",
    "url": "https://vibefather.ai/templates/kinetic-typography-portfolio"
  }]
}
```

### `GET /api/v1/templates/<slug>`

One template: `title`, `tagline`, `descriptor`, `description`, `stack`, `pages`, `tags`, `types`, `styles`, `demo` (live demo URL), `media` (`webp` animated preview, `mp4`, `poster`, `shotDesktop`, `shotMobile`, `og`), `credits` (inspiration), `examples` (every demo with its model and tool) and `links` (`page`, `prompt`, `design`, `source`).

### `GET /api/v1/templates/<slug>/prompt`

The prompt as `text/markdown`. Same content as `https://vibefather.ai/templates/<slug>.md`.

### `GET /api/v1/templates/<slug>/design`

The template's `DESIGN.md` as `text/markdown`.

### `GET /api/v1/badge?m=templates|sites|models`

A [shields.io endpoint](https://shields.io/badges/endpoint-badge) with the live count, for READMEs:

```markdown
![templates](https://img.shields.io/endpoint?url=https%3A%2F%2Fvibefather.ai%2Fapi%2Fv1%2Fbadge%3Fm%3Dtemplates)
```

## Plain-text prompts for any AI tool

Every template page has a Markdown twin. Paste it into Lovable, Bolt, v0, Replit, ChatGPT or any chat, or let an agent fetch it:

```bash
curl -s https://vibefather.ai/templates/interactive-science-explainer.md > prompt.md
```

## License of the content

The API is free to call. The prompts and `DESIGN.md` files it returns are licensed per template: free templates under [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) (personal and non-commercial use, keep the credit line); commercial use needs [VibeFather Pro](https://vibefather.ai/pricing).
