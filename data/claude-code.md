---
vendor:
  id: claude-code
  name: Claude Code
  interfaces: [terminal CLI, VS Code, Desktop, web, JetBrains]

extensions:
  - name: CLAUDE.md and Rules
    normalizedFamily: instructions
    vendorTerms: [CLAUDE.md, CLAUDE.local.md, rules, "@import syntax", auto memory, AGENTS.md]
    scopes: [organization, user-home, project-root, subdirectory]
    interfaces: [terminal CLI, VS Code, Desktop, web, JetBrains]
    availability:
      status: current
      claimStrength: explicit
      notes: "Walks up directory tree with on-demand subdirectory loading; rules can be path-scoped; @import syntax with 4-hop recursive depth supports AGENTS.md; managed policy CLAUDE.md at OS-level paths cannot be excluded; auto memory is a complementary per-working-tree system"
    trustModel: "Contextual guidance, not enforced configuration; compliance not guaranteed for vague or conflicting instructions"
    sources:
      - label: "Features overview"
        url: "https://code.claude.com/docs/en/features-overview"
      - label: "Memory"
        url: "https://code.claude.com/docs/en/memory"
      - label: "Server-managed settings"
        url: "https://code.claude.com/docs/en/server-managed-settings"

  - name: Skills
    normalizedFamily: prompts
    coveredBy:
      family: skills
      label: Covered by Skills
    vendorTerms: []
    scopes: []
    interfaces: []
    availability:
      status: current
      claimStrength: explicit
      notes: ""
    trustModel: ""
    sources: []

  - name: Skills
    normalizedFamily: skills
    vendorTerms: [skills, SKILL.md, commands, slash commands, Agent Skills standard]
    scopes: [project-root, user-home, organization]
    interfaces: [terminal CLI, VS Code, Desktop, web, JetBrains]
    availability:
      status: current
      claimStrength: explicit
      notes: "Reference skills provide knowledge, action skills trigger workflows; follows Agent Skills open standard (agentskills.io); bundled skills include /batch, /debug, /simplify, /loop, /run, /verify, /deep-research; enterprise deployment via managed settings"
    trustModel: "Reusable knowledge and workflows loaded on demand or invoked via /name; enterprise deployment via managed settings"
    sources:
      - label: "Skills"
        url: "https://code.claude.com/docs/en/skills"
      - label: "Commands"
        url: "https://code.claude.com/docs/en/commands"

  - name: MCP Servers
    normalizedFamily: mcp-tools
    vendorTerms: [MCP servers, .mcp.json, managed-mcp.json, MCP Tool Search]
    scopes: [user-home, project-root, organization]
    interfaces: [terminal CLI, VS Code, Desktop, web, JetBrains]
    availability:
      status: current
      claimStrength: explicit
      notes: "Five-tier scope hierarchy (local > project > user > plugin > claude.ai connectors); Tool Search defers tool loading until needed; supports HTTP, SSE, stdio, and WebSocket transports; OAuth 2.0 with headersHelper for dynamic auth; Claude Code can serve as an MCP server"
    trustModel: "Project-scoped servers require explicit approval; enterprise lockdown via managed-mcp.json allowlist/denylist"
    sources:
      - label: "MCP"
        url: "https://code.claude.com/docs/en/mcp"
      - label: "Settings"
        url: "https://code.claude.com/docs/en/settings"

  - name: Subagents
    normalizedFamily: agents
    vendorTerms: [subagents, custom subagents, managed subagents, Dynamic Workflows]
    scopes: [user-home, project-root, organization, cloud-session]
    interfaces: [terminal CLI, VS Code, Desktop, web]
    availability:
      status: current
      claimStrength: explicit
      notes: "Five priority levels (managed > CLI flag > project > user > plugin); built-in Explore, Plan, and Guide agents; Dynamic Workflows (new) generate JavaScript orchestration to fan work across parallel subagent swarms; isolation via worktrees; forked subagents (experimental)"
    trustModel: "Isolated workers with their own context, prompt, and tools; only summary returns to parent"
    sources:
      - label: "Subagents"
        url: "https://code.claude.com/docs/en/sub-agents"
      - label: "Dynamic Workflows"
        url: "https://code.claude.com/docs/en/workflows"

  - name: Agent Teams
    normalizedFamily: agents
    vendorTerms: [agent teams, teammates, shared task list, peer-to-peer messaging]
    scopes: [project-root, user-home]
    interfaces: [terminal CLI]
    availability:
      status: experimental
      claimStrength: explicit
      notes: "Multiple independent sessions with shared tasks and peer-to-peer messaging; task dependencies with file locking; TeammateIdle hook for quality gates; two display modes (in-process and tmux)"
    trustModel: "Teammates inherit lead's permission settings; if lead uses --dangerously-skip-permissions all teammates do too"
    sources:
      - label: "Agent teams"
        url: "https://code.claude.com/docs/en/agent-teams"

  - name: Hooks
    normalizedFamily: hooks
    vendorTerms: [hooks, agent hooks, async hooks]
    scopes: [user-home, project-root, organization]
    interfaces: [terminal CLI, VS Code, Desktop]
    availability:
      status: current
      claimStrength: explicit
      notes: "5 handler types (command, http, mcp_tool, prompt, agent) across 29 lifecycle events; async hooks with asyncRewake for background execution; PreToolUse hooks enforce policy even in bypass mode; if field enables granular tool+argument filtering"
    trustModel: "Deterministic scripts that run on lifecycle events; supports shell, HTTP, MCP tool, LLM, and agent handlers; can block tool use"
    sources:
      - label: "Hooks guide"
        url: "https://code.claude.com/docs/en/hooks-guide"
      - label: "Hooks reference"
        url: "https://code.claude.com/docs/en/hooks"

  - name: Plugins and Marketplaces
    normalizedFamily: plugins-distribution
    vendorTerms: [plugins, plugin.json, marketplace, .claude-plugin, background monitors]
    scopes: [project-root, user-home, organization]
    interfaces: [terminal CLI, VS Code, Desktop, web, JetBrains]
    availability:
      status: current
      claimStrength: explicit
      notes: "Includes plugin-only components (LSP servers, monitors, themes, bin/ PATH additions); two official marketplaces (Anthropic-curated and community); strictPluginOnlyCustomization for enterprise lockdown; semver dependency constraints between plugins"
    trustModel: "Packaging layer that executes arbitrary code with user privileges; managed marketplace restrictions allow org lockdown"
    sources:
      - label: "Plugins"
        url: "https://code.claude.com/docs/en/plugins"
      - label: "Plugins reference"
        url: "https://code.claude.com/docs/en/plugins-reference"
      - label: "Discover plugins"
        url: "https://code.claude.com/docs/en/discover-plugins"

  - name: Settings and Managed Settings
    normalizedFamily: settings-policy
    vendorTerms: [settings.json, managed settings, managed-settings.json, server-managed settings, policyHelper]
    scopes: [organization, user-home, project-root]
    interfaces: [terminal CLI, VS Code, Desktop, web, JetBrains]
    availability:
      status: current
      claimStrength: explicit
      notes: "Four-tier scope (managed > local > project > user); 60+ settings keys; policyHelper for dynamic managed settings computation at startup; MDM delivery via macOS plist, Windows registry, or file-based with drop-in directory; fail-closed enforcement option"
    trustModel: "Admin-delivered managed settings cannot be overridden; controls permissions, hooks, environment variables, and model defaults"
    sources:
      - label: "Settings"
        url: "https://code.claude.com/docs/en/settings"
      - label: "Server-managed settings"
        url: "https://code.claude.com/docs/en/server-managed-settings"

  - name: Output Styles
    normalizedFamily: settings-policy
    vendorTerms: [output styles, custom output styles]
    scopes: [project-root, user-home]
    interfaces: [terminal CLI, VS Code, Desktop, web]
    availability:
      status: current
      claimStrength: explicit
      notes: "Directly modifies the system prompt; three built-in styles (Default, Explanatory, Learning); custom styles as Markdown files; plugins can distribute output styles"
    trustModel: "Stronger than ordinary context because it changes the system prompt layer; intended to style behavior"
    sources:
      - label: "Output styles"
        url: "https://code.claude.com/docs/en/output-styles"
---

Claude Code has the broadest explicit extension taxonomy in a single .claude ecosystem. Dynamic Workflows (new) generate JavaScript orchestration scripts to fan work across parallel subagent swarms for codebase-wide tasks. Hooks are the most capable with 5 handler types across 29 lifecycle events, and plugins support enterprise lockdown via strictPluginOnlyCustomization.
