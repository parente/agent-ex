# Agent-Ex Implementation Plan

## Problem Statement

Build a web app that makes it easy to explore and compare the extension points (hooks, MCP, skills, agents, etc.) across GitHub Copilot, OpenAI Codex, Amazon Kiro, and Claude Code. The data must be editable by humans/agents without touching app code, the UI must offer multiple views (comparison matrix, per-tool, per-family), and every fact must link to its upstream source.

## Requirements

- Full-fidelity data: every attribute from the research report (normalized type, scopes, interfaces, availability, trust model, claim strength, description, sources)
- Data stored as one Markdown file per vendor with YAML frontmatter, parsed at build time
- Three views: comparison matrix (primary), per-tool detail, per-family detail
- Hybrid UI: badges/chips in matrix, expandable detail with full prose
- Citations: every extension links to upstream doc URLs
- Assisted updates via a Kiro skill
- SvelteKit + Tailwind CSS, deployed to Cloudflare Pages
- Monorepo structure

## Data Schema

### `data/_meta.yaml` — Global taxonomy

Defines normalized extension families, scope levels, and claim strength labels used across all vendor files.

### `data/<vendor-id>.md` — Per-vendor data

Each vendor is a Markdown file with YAML frontmatter containing:
- `vendor.id`, `vendor.name`, `vendor.interfaces`
- `extensions[]` array, each with: `name`, `normalizedFamily`, `vendorTerms`, `scopes`, `interfaces`, `availability` (status, claimStrength, notes), `trustModel`, `sources` (label + url)
- Markdown body for general vendor prose

## Architecture

```
data/                          # Editable data layer
  _meta.yaml                   # Taxonomy definitions
  github-copilot.md            # Vendor data files
  openai-codex.md
  amazon-kiro.md
  claude-code.md
src/
  lib/data/
    types.ts                   # TypeScript types
    loader.ts                  # Build-time parser (gray-matter + yaml)
    index.ts                   # Query helpers
  routes/
    +layout.svelte             # App shell with nav
    +page.svelte               # Comparison matrix (home)
    tool/[id]/+page.svelte     # Per-tool detail
    family/[id]/+page.svelte   # Per-family detail
    about/+page.svelte         # About page
.kiro/skills/
  update-vendor-data/SKILL.md  # Agent skill for data updates
```

## Design Decisions

1. **Data by vendor, not by extension family** — Updates flow from "I read Vendor X's docs" → "I update Vendor X's file." The app reassembles data by family at build time.
2. **Markdown + YAML frontmatter** — Human-readable, agent-friendly, supports structured data and prose in one file.
3. **Build-time data loading** — No runtime database; data is parsed from files during the SvelteKit build via server load functions.
4. **Tailwind CSS** — Utility-first, widely understood by agents, minimal custom CSS needed.
5. **Kiro skill for updates** — Since upstream docs are unstructured, an agent skill is the best fit for assisted updates rather than a simple script.

## Views

1. **Comparison Matrix** (`/`): Vendors as columns, normalized families as rows. Cells show colored scope badges. Click to expand detail with vendor terms, trust model, and source links.
2. **Per-Tool Detail** (`/tool/[id]`): All extensions for one vendor as cards with full attributes and source citations.
3. **Per-Family Detail** (`/family/[id]`): One extension family across all vendors side-by-side, highlighting differences.
4. **About** (`/about`): Project origin story and methodology.
