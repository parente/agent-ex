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

## Update procedure

### Prerequisites

Before starting, read `data/_meta.yaml` to load the current families, scopes, and claim strengths. These are the canonical definitions — do not rely on any inline copies.

### Phase 1 — Fan-out research

1. **Read current data**: Read all `data/*.md` vendor files and this skill file to build a research matrix of (vendor, family) pairs. For each pair, collect:
   - The current extension YAML block(s) for that family
   - The source URLs listed in those extensions
   - The vendor's documentation domain (from "Vendor documentation domains" below)
   - Any additional known URLs for that vendor (from "Known source URLs" below) that are relevant to the family

2. **Create the research directory**: Ensure `.research/` exists.

3. **Spawn research subagents**: Use the `subagent` tool in `blocking` mode to spawn one stage per (vendor, family) pair. All stages run in parallel (no `depends_on`). Each stage should use:
   - `role`: `vendor-researcher`
   - `name`: `research-{vendor-id}-{family-id}`
   - `prompt_template`: A prompt that includes:
     - The vendor ID, name, and documentation domain
     - The family ID and label
     - The current extension data for this (vendor, family) pair
     - The list of known source URLs to fetch
     - Instructions to perform web searches using `site:{vendor-domain}` queries with terms related to the family (e.g., the vendor terms, family label)
     - The output file path: `.research/{vendor-id}/{family-id}.md`
     - The distillation template:

       ```
       # Research: {vendor-name} / {family-label}
       ## Current Data Summary
       (Brief summary of what's currently in the data file for this family)
       ## Findings from Known URLs
       (For each URL fetched: what changed or was confirmed, key facts extracted)
       ## New URLs Discovered
       (Any new documentation pages found via web search, with brief description)
       ## Recommended Changes
       (Specific additions, updates, or removals to the extension data)
       ```

4. **Wait for completion**: The `blocking` mode ensures all research stages finish before proceeding.

### Phase 2 — Gather and synthesize

5. **Read distillations**: For each vendor, read all `.research/{vendor-id}/*.md` files.

6. **Update vendor data files**: For each vendor, compare the distilled findings against `data/{vendor-id}.md` and apply updates:
   - Add new extension points not yet in the data
   - Update changed scopes, interfaces, or availability status
   - Add new or renamed vendor terms
   - Add new source URLs to the appropriate extension's `sources` array
   - Preserve the existing Markdown prose body — only update it if the distillations indicate significant new information about the vendor's overall approach

7. **Validate changes**: Ensure every `normalizedFamily` matches a family in `data/_meta.yaml` and every scope matches a scope in `data/_meta.yaml`.

### Phase 3 — Meta-review and self-update

8. **Flag taxonomy changes**: Review all distillation files holistically for cross-vendor patterns:
   - New capability categories that don't fit existing families
   - Families that appear deprecated or renamed across multiple vendors
   - Emerging scopes not yet in `_meta.yaml`
   - If any taxonomy changes are warranted, **present recommendations to the user** and wait for confirmation before modifying `data/_meta.yaml` families or scopes.

9. **Update known source URLs**: Add any newly discovered URLs from the distillation files to the "Known source URLs by vendor" section of this skill file, organized under the appropriate vendor heading.

10. **Update lastUpdated**: Set `lastUpdated` in `data/_meta.yaml` to today's date.

11. **Clean up**: Remove the `.research/` directory and its contents.

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
- https://docs.github.com/en/copilot/concepts/prompting/response-customization
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
- https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents
- https://docs.github.com/en/copilot/reference/custom-agents-configuration
- https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-skills
- https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/add-skills
- https://docs.github.com/en/copilot/how-tos/copilot-sdk/use-copilot-sdk/custom-skills
- https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-mcp-usage/configure-mcp-registry
- https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-mcp-usage/configure-mcp-server-access
- https://docs.github.com/en/copilot/how-tos/provide-context/use-mcp-in-your-ide/extend-copilot-chat-with-mcp
- https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-mcp-servers
- https://docs.github.com/en/copilot/reference/hooks-configuration
- https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/use-hooks
- https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/plugins-finding-installing
- https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/plugins-creating
- https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/plugins-marketplace
- https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-plugin-reference
- https://docs.github.com/en/copilot/reference/policy-conflicts
- https://code.visualstudio.com/docs/copilot/customization/prompt-files
- https://docs.github.com/en/copilot/concepts/agents/copilot-memory
- https://docs.github.com/en/copilot/how-tos/provide-context/use-mcp-in-your-ide/enterprise-configuration
- https://docs.github.com/en/copilot/how-tos/provide-context/use-mcp-in-your-ide/configure-toolsets
- https://docs.github.com/en/copilot/how-tos/provide-context/use-mcp-in-your-ide/change-mcp-registry
- https://docs.github.com/en/copilot/reference/copilot-allowlist-reference
- https://docs.github.com/en/copilot/reference/agentic-audit-log-events
- https://docs.github.com/en/copilot/reference/copilot-cli-reference/acp-server
- https://docs.github.com/en/copilot/how-tos/copilot-sdk/use-hooks/quickstart

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
- https://developers.openai.com/codex/concepts/subagents
- https://developers.openai.com/codex/ide
- https://developers.openai.com/codex/ide/settings
- https://developers.openai.com/codex/app
- https://developers.openai.com/codex/app/features
- https://developers.openai.com/codex/cloud
- https://developers.openai.com/codex/custom-prompts
- https://developers.openai.com/codex/rules
- https://developers.openai.com/codex/memories
- https://help.openai.com/en/articles/11369540-using-codex-with-chatgpt
- https://developers.openai.com/codex/enterprise/managed-configuration
- https://developers.openai.com/codex/agent-approvals-security
- https://developers.openai.com/codex/enterprise/governance
- https://developers.openai.com/codex/feature-maturity
- https://developers.openai.com/codex/noninteractive
- https://developers.openai.com/codex/sdk
- https://developers.openai.com/codex/app-server
- https://developers.openai.com/codex/github-action
- https://developers.openai.com/codex/speed
- https://developers.openai.com/codex/security
- https://developers.openai.com/codex/app/automations

### Amazon Kiro
- https://kiro.dev/docs/steering/
- https://kiro.dev/docs/cli/steering/
- https://kiro.dev/docs/hooks/
- https://kiro.dev/docs/cli/hooks/
- https://kiro.dev/docs/hooks/actions/
- https://kiro.dev/docs/hooks/types/
- https://kiro.dev/docs/hooks/examples/
- https://kiro.dev/docs/editor/multi-root-workspaces/
- https://kiro.dev/docs/mcp/
- https://kiro.dev/docs/mcp/configuration/
- https://kiro.dev/docs/mcp/usage/
- https://kiro.dev/docs/mcp/servers/
- https://kiro.dev/docs/mcp/security/
- https://kiro.dev/docs/cli/mcp/
- https://kiro.dev/docs/cli/mcp/configuration/
- https://kiro.dev/docs/editor/interface/
- https://kiro.dev/docs/skills/
- https://kiro.dev/docs/cli/skills/
- https://kiro.dev/docs/cli/custom-agents/creating/
- https://kiro.dev/docs/cli/custom-agents/configuration-reference/
- https://kiro.dev/docs/chat/subagents/
- https://kiro.dev/docs/cli/chat/subagents/
- https://kiro.dev/docs/cli/chat/planning-agent/
- https://kiro.dev/docs/cli/acp/
- https://kiro.dev/docs/powers/
- https://kiro.dev/docs/powers/installation/
- https://kiro.dev/docs/powers/create/
- https://kiro.dev/docs/cli/chat/manage-prompts/
- https://kiro.dev/powers/
- https://kiro.dev/docs/editor/extension-registry/
- https://kiro.dev/docs/editor/kiroignore/
- https://kiro.dev/docs/enterprise/settings/
- https://kiro.dev/docs/enterprise/governance/mcp/
- https://kiro.dev/docs/enterprise/governance/model/
- https://kiro.dev/docs/enterprise/governance/web-tools/
- https://kiro.dev/docs/enterprise/governance/api-keys/
- https://kiro.dev/docs/cli/chat/permissions/
- https://kiro.dev/docs/cli/chat/configuration/
- https://kiro.dev/docs/cli/mcp/registry/
- https://kiro.dev/docs/cli/headless/
- https://kiro.dev/docs/enterprise/governance/

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
- https://code.claude.com/docs/en/server-managed-settings
- https://code.claude.com/docs/en/plugin-marketplaces
- https://code.claude.com/docs/en/plugin-hints
- https://code.claude.com/docs/en/plugin-dependencies
- https://code.claude.com/docs/en/channels
- https://code.claude.com/docs/en/sdk/subagents
- https://www.anthropic.com/news/enabling-claude-code-to-work-more-autonomously
