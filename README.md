# Agent-Ex

- A web app for exploring and comparing extension points across agentic coding tools
- An experiment in using agents to keep web app data up to date

> **⚠️ Experimental project.** Agent-Ex is a research experiment. The data is gathered and maintained primarily by AI agents and may be incomplete, outdated, or inaccurate. Always refer to official vendor documentation for authoritative information. The author makes no warranty regarding the accuracy or completeness of the content.

## Background

Major agentic coding tools now support a common core of extension points — persistent instructions, reusable workflows, MCP tool adapters, specialist agents, hooks, distribution/bundling, and policy/configuration — but they differ significantly in where customization lives, how it's scoped, and how shareable it is. Agent-Ex normalizes these vendor-specific concepts into a shared taxonomy so you can quickly compare what's available across tools.

The data powering the app lives in simple Markdown files with YAML frontmatter in the `data/` directory. Humans or agents can update these files without touching any application code.

## Views

- **Comparison matrix** (`/`) — Vendors as columns, extension families as rows. Colored scope badges and status indicators at a glance; click any cell to expand full details with source citations.
- **Per-tool detail** (`/tool/[id]`) — All extensions for a single vendor with full attributes, trust model, and upstream source links.
- **Per-family detail** (`/family/[id]`) — One extension family across all vendors side-by-side, highlighting differences in scope, availability, and interfaces.

## Getting started

```sh
npm install
npm run dev
```

## Building and deploying

The app is configured for Cloudflare Pages via `@sveltejs/adapter-cloudflare`.

```sh
npm run build
```

The build output is in `.svelte-kit/cloudflare/`. To preview locally:

```sh
npm run preview
```

## Data format

Each vendor is a Markdown file in `data/` (e.g., `data/github-copilot.md`) with YAML frontmatter defining the vendor and its extensions. The global taxonomy lives in `data/_meta.yaml`.

See `.kiro/skills/update-vendor-data/SKILL.md` for the full schema reference.

### Adding a new vendor

1. Create `data/<vendor-id>.md` following the schema in the skill docs.
2. Populate all extensions with required fields: `name`, `normalizedFamily`, `vendorTerms`, `scopes`, `interfaces`, `availability`, `trustModel`, and `sources`.
3. Ensure every `normalizedFamily` and scope ID matches an entry in `data/_meta.yaml`. Add new ones there first if needed.
4. Update `lastUpdated` in `data/_meta.yaml`.

## Updating vendor data

The project includes a Kiro skill at `.kiro/skills/update-vendor-data/` designed for agent-assisted updates. To use it:

1. Ask an agent (e.g., Kiro CLI) to update vendor data — the skill will be picked up automatically.
2. The skill instructs the agent to fetch upstream documentation URLs listed in each vendor's `sources` arrays, compare against current data, and propose edits.
3. Review and commit the changes.

The skill also documents the full list of upstream source URLs organized by vendor, so the agent knows where to look.

## Tech stack

- [SvelteKit](https://svelte.dev/) with TypeScript
- [Tailwind CSS](https://tailwindcss.com/) v4
- [Cloudflare Pages](https://pages.cloudflare.com/) via `adapter-cloudflare`
- Data parsed at build time with [gray-matter](https://github.com/jonschlinkert/gray-matter) and [yaml](https://github.com/eemeli/yaml)
