# Update Vendor Data

Update the Agent-Ex data files in `data/` by checking upstream documentation for changes.

## When to use

Use this skill when asked to update, refresh, or add vendor data for the Agent-Ex extension point explorer.

## Data schema

Each vendor is a Markdown file in `data/` with YAML frontmatter. The schema is:

```yaml
vendor:
  id: vendor-slug          # kebab-case, used in URLs
  name: Display Name
  interfaces: [list, of, surfaces]

extensions:
  - name: Human-readable Name
    normalizedFamily: family-id   # must match an id in data/_meta.yaml families
    vendorTerms: [vendor, specific, terms]
    scopes: [scope-ids]           # must match ids in data/_meta.yaml scopes
    interfaces: [surface, list]
    availability:
      status: current | public preview | experimental
      claimStrength: explicit | strongly-implied | inferred | unspecified
      notes: "Free-text notes about availability"
    trustModel: "Description of trust and execution model"
    sources:
      - label: "Human-readable source name"
        url: "https://upstream-doc-url"
```

The Markdown body after the frontmatter contains general prose about the vendor.

## Normalized families (from data/_meta.yaml)

- `instructions` — Persistent context: custom instructions, steering, CLAUDE.md, AGENTS.md, rules
- `prompts` — Reusable prompt templates: prompt files, custom prompts, commands
- `skills` — Reusable workflows and knowledge: skills, prompt files, commands
- `mcp-tools` — External tool connections: MCP servers, LSP
- `agents` — Specialist personas and workers: custom agents, subagents, agent teams
- `hooks` — Deterministic lifecycle automation: hooks
- `plugins-distribution` — Shareable bundles: plugins, powers, marketplaces
- `settings-policy` — Configuration and controls: settings, config, rules (command execution), managed settings

## Scopes (from data/_meta.yaml)

- `user-home` — User / Home directory
- `project-root` — Project / Repo Root
- `subdirectory` — Subdirectory / Folder
- `organization` — Organization / Enterprise
- `cloud-session` — Cloud / Web Session
- `machine` — Machine / Admin

## Update procedure

For each vendor:

1. **Read the current data file** from `data/<vendor-id>.md`
2. **Fetch known source URLs** listed in each extension's `sources` array
3. **Search for new or changed documentation** using targeted web searches scoped to the vendor's documentation domain (see vendor domains below). Use queries like:
   - `site:docs.github.com/en/copilot skills hooks agents 2026`
   - `site:developers.openai.com/codex new features`
   - `site:kiro.dev/docs hooks skills agents`
   - `site:code.claude.com/docs plugins subagents`
4. **Compare upstream docs against current data** — look for:
   - New extension points not yet in the data
   - Changed scopes, interfaces, or availability status
   - New or renamed vendor terms
   - New source URLs that should be tracked
5. **Update the vendor data file** with any changes found
6. **Add any new source URLs** discovered during the search to the appropriate extension's `sources` array
7. **Update this skill file** — add any new source URLs to the "Known source URLs" section below so future update runs start from a more complete list
8. **Update `lastUpdated`** in `data/_meta.yaml`

### Important: self-updating source list

The "Known source URLs" section at the bottom of this file is a starting point, not a complete list. Vendor docs change frequently — new pages are added, old ones are reorganized. When you discover a new relevant URL during a web search or by following links in fetched docs, **add it to the list below** so the next update cycle benefits from it.

## Adding a new vendor

1. Search the web for the vendor's documentation on extension points, customization, and configuration
2. Create `data/<vendor-id>.md` following the schema above
3. Add the vendor's extensions with all required fields
4. Ensure every `normalizedFamily` matches an existing family in `data/_meta.yaml`
5. Ensure every scope matches an existing scope in `data/_meta.yaml`
6. If a new family or scope is needed, add it to `data/_meta.yaml` first
7. Add the vendor's documentation domain and discovered URLs to this skill file

## Vendor documentation domains

Use these domains for targeted `site:` web searches when looking for new or updated documentation:

- **GitHub Copilot**: `docs.github.com/en/copilot`
- **OpenAI Codex**: `developers.openai.com/codex`
- **Amazon Kiro**: `kiro.dev/docs`
- **Claude Code**: `code.claude.com/docs`

## Known source URLs by vendor

These are starting points. Search the vendor domains above for additional pages not yet listed here.

### GitHub Copilot
- https://docs.github.com/en/copilot/reference/custom-instructions-support
- https://docs.github.com/en/copilot/reference/customization-cheat-sheet
- https://docs.github.com/en/copilot/tutorials/customization-library/prompt-files
- https://docs.github.com/en/copilot/concepts/prompting/response-customization?tool=vscode
- https://docs.github.com/en/copilot/concepts/context/mcp
- https://docs.github.com/en/copilot/how-tos/provide-context/use-mcp-in-your-ide/set-up-the-github-mcp-server
- https://docs.github.com/en/copilot/how-tos/provide-context/use-mcp-in-your-ide/use-the-github-mcp-server
- https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/create-custom-agents
- https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/create-custom-agents-for-cli
- https://docs.github.com/en/copilot/concepts/agents/about-agent-skills
- https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-hooks
- https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/use-hooks
- https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-cli-plugins
- https://docs.github.com/en/copilot/concepts/policies
- https://docs.github.com/en/copilot/concepts/mcp-management
- https://docs.github.com/en/copilot/reference/mcp-allowlist-enforcement
- https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-enterprise-policies
- https://docs.github.com/en/copilot/how-tos/configure-content-exclusion/exclude-content-from-copilot
- https://docs.github.com/en/copilot/reference/copilot-feature-matrix

### OpenAI Codex
- https://developers.openai.com/codex/concepts/customization
- https://developers.openai.com/codex/guides/agents-md
- https://developers.openai.com/codex/config-basic
- https://developers.openai.com/codex/config-advanced
- https://developers.openai.com/codex/config-reference
- https://developers.openai.com/codex/hooks
- https://developers.openai.com/codex/mcp
- https://developers.openai.com/codex/skills
- https://developers.openai.com/codex/plugins
- https://developers.openai.com/codex/plugins/build
- https://developers.openai.com/codex/subagents
- https://developers.openai.com/codex/ide
- https://developers.openai.com/codex/ide/settings
- https://developers.openai.com/codex/app
- https://developers.openai.com/codex/cloud
- https://developers.openai.com/codex/custom-prompts
- https://developers.openai.com/codex/rules
- https://developers.openai.com/codex/memories
- https://help.openai.com/en/articles/11369540-using-codex-with-chatgpt
- https://developers.openai.com/codex/enterprise/managed-configuration

### Amazon Kiro
- https://kiro.dev/docs/steering/
- https://kiro.dev/docs/cli/steering/
- https://kiro.dev/docs/hooks/
- https://kiro.dev/docs/cli/hooks/
- https://kiro.dev/docs/hooks/actions/
- https://kiro.dev/docs/hooks/types/
- https://kiro.dev/docs/editor/multi-root-workspaces/
- https://kiro.dev/docs/mcp/
- https://kiro.dev/docs/mcp/configuration/
- https://kiro.dev/docs/editor/interface/
- https://kiro.dev/docs/skills/
- https://kiro.dev/docs/cli/skills/
- https://kiro.dev/docs/cli/custom-agents/creating/
- https://kiro.dev/docs/cli/custom-agents/configuration-reference/
- https://kiro.dev/docs/chat/subagents/
- https://kiro.dev/docs/cli/chat/subagents/
- https://kiro.dev/docs/powers/
- https://kiro.dev/docs/powers/installation/
- https://kiro.dev/docs/cli/chat/manage-prompts/
- https://kiro.dev/powers/
- https://kiro.dev/docs/editor/extension-registry/

### Claude Code
- https://code.claude.com/docs/en/features-overview
- https://code.claude.com/docs/en/claude-directory
- https://code.claude.com/docs/en/memory
- https://code.claude.com/docs/en/overview
- https://code.claude.com/docs/en/vs-code
- https://code.claude.com/docs/en/claude-code-on-the-web
- https://code.claude.com/docs/en/settings
- https://code.claude.com/docs/en/mcp
- https://code.claude.com/docs/en/skills
- https://code.claude.com/docs/en/commands
- https://code.claude.com/docs/en/sub-agents
- https://code.claude.com/docs/en/agent-teams
- https://code.claude.com/docs/en/hooks-guide
- https://code.claude.com/docs/en/hooks
- https://code.claude.com/docs/en/plugins
- https://code.claude.com/docs/en/plugins-reference
- https://code.claude.com/docs/en/discover-plugins
- https://code.claude.com/docs/en/output-styles
- https://www.anthropic.com/news/enabling-claude-code-to-work-more-autonomously
