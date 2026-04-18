---
vendor:
  id: claude-code
  name: Claude Code
  interfaces: [terminal CLI, VS Code, Cursor, Desktop, web, JetBrains]

extensions:
  - name: CLAUDE.md and Rules
    normalizedFamily: instructions
    vendorTerms: [CLAUDE.md, CLAUDE.local.md, rules, .claude/rules/*.md]
    scopes: [organization, user-home, project-root, subdirectory]
    interfaces: [terminal CLI, VS Code, Desktop, web, JetBrains]
    availability:
      status: current
      claimStrength: explicit
      notes: "CLAUDE.md walks up directory tree; subdirectory files load on demand; rules can be path-scoped; cross-surface parity documented"
    trustModel: "Context files, not enforced configuration; Anthropic explicitly says compliance is not guaranteed for vague or conflicting instructions"
    sources:
      - label: "Extend Claude Code"
        url: "https://code.claude.com/docs/en/features-overview"
      - label: "Explore the .claude directory"
        url: "https://code.claude.com/docs/en/claude-directory"
      - label: "How Claude remembers your project"
        url: "https://code.claude.com/docs/en/memory"

  - name: Commands (legacy)
    normalizedFamily: prompts
    vendorTerms: [commands, custom commands, slash commands, .claude/commands/*.md]
    scopes: [project-root, user-home]
    interfaces: [terminal CLI, VS Code, Desktop, web]
    availability:
      status: current
      claimStrength: explicit
      notes: "Legacy custom commands now use the same mechanism as skills; markdown files in .claude/commands/ invoked as /name"
    trustModel: "Simple reusable prompt templates invoked explicitly; now merged into the skills system"
    sources:
      - label: "Commands"
        url: "https://code.claude.com/docs/en/commands"

  - name: Skills
    normalizedFamily: skills
    vendorTerms: [skills, SKILL.md]
    scopes: [project-root, user-home]
    interfaces: [terminal CLI, VS Code, Desktop, web]
    availability:
      status: current
      claimStrength: explicit
      notes: "Reference skills provide knowledge, action skills trigger workflows; can run in isolated context via subagents"
    trustModel: "Reusable knowledge and workflows; auto-loaded when relevant or invoked via /name; bundled skills like /simplify, /batch, /debug included"
    sources:
      - label: "Extend Claude with skills"
        url: "https://code.claude.com/docs/en/skills"

  - name: MCP Servers
    normalizedFamily: mcp-tools
    vendorTerms: [MCP servers, .mcp.json, personal MCP servers, project-scoped MCP servers]
    scopes: [user-home, project-root]
    interfaces: [terminal CLI, VS Code, Desktop, web, JetBrains]
    availability:
      status: current
      claimStrength: explicit
      notes: "Explicit cross-surface parity for MCP; project-scoped servers require approval; tool search on by default"
    trustModel: "External-tool integration with approval and auth controls; local scope overrides project scope"
    sources:
      - label: "Connect Claude Code to tools via MCP"
        url: "https://code.claude.com/docs/en/mcp"

  - name: Subagents
    normalizedFamily: agents
    vendorTerms: [subagents, custom subagents, managed subagents]
    scopes: [user-home, project-root, organization, cloud-session]
    interfaces: [terminal CLI, VS Code]
    availability:
      status: current
      claimStrength: explicit
      notes: "Project subagents discovered by walking up from cwd; can preload specific skills; override by name (managed > CLI flag > project > user > plugin)"
    trustModel: "Isolated workers with their own context, prompt, tools, and optionally model; only summary returns to main conversation"
    sources:
      - label: "Create custom subagents"
        url: "https://code.claude.com/docs/en/sub-agents"

  - name: Agent Teams
    normalizedFamily: agents
    vendorTerms: [agent teams, coordinated sessions, peer-to-peer messaging]
    scopes: [cloud-session]
    interfaces: [terminal CLI]
    availability:
      status: experimental
      claimStrength: explicit
      notes: "Experimental and disabled by default; multiple independent Claude Code sessions with shared tasks and peer-to-peer messaging"
    trustModel: "Independent sessions that communicate directly; each teammate is a separate Claude instance with higher token cost than subagents"
    sources:
      - label: "Extend Claude Code"
        url: "https://code.claude.com/docs/en/features-overview"

  - name: Hooks
    normalizedFamily: hooks
    vendorTerms: [hooks, shell commands, HTTP endpoints, LLM prompts, async hooks, prompt hooks, MCP tool hooks]
    scopes: [user-home, project-root, organization]
    interfaces: [terminal CLI, VS Code]
    availability:
      status: current
      claimStrength: explicit
      notes: "Hooks are part of settings.json hierarchy; all registered hooks fire for matching events regardless of source"
    trustModel: "Deterministic control layer supporting shell commands, HTTP endpoints, and LLM prompts; can intercept lifecycle events and tool use"
    sources:
      - label: "Automate workflows with hooks"
        url: "https://code.claude.com/docs/en/hooks-guide"
      - label: "Hooks reference"
        url: "https://code.claude.com/docs/en/hooks"

  - name: Plugins and Marketplaces
    normalizedFamily: plugins-distribution
    vendorTerms: [plugins, plugin.json, LSP servers, monitors, marketplace]
    scopes: [project-root, user-home]
    interfaces: [terminal CLI, VS Code, Desktop, web]
    availability:
      status: current
      claimStrength: explicit
      notes: "Includes plugin-only components (LSP servers, monitors) not available as standalone .claude files; plugins namespace skills as /plugin-name:skill"
    trustModel: "Packaging layer for reusable components; marketplace discovery/install documented"
    sources:
      - label: "Create plugins"
        url: "https://code.claude.com/docs/en/plugins"
      - label: "Plugins reference"
        url: "https://code.claude.com/docs/en/plugins-reference"
      - label: "Discover and install prebuilt plugins through marketplaces"
        url: "https://code.claude.com/docs/en/discover-plugins"

  - name: Settings and Managed Settings
    normalizedFamily: settings-policy
    vendorTerms: [settings.json, settings.local.json, managed settings]
    scopes: [organization, user-home, project-root]
    interfaces: [terminal CLI, VS Code, Desktop, web]
    availability:
      status: current
      claimStrength: explicit
      notes: "Unusually explicit hierarchy; managed settings delivered by server policy or OS-level device management cannot be overridden"
    trustModel: "Formal policy/config layer with documented precedence; controls permissions, hooks, environment variables, model defaults"
    sources:
      - label: "Claude Code settings"
        url: "https://code.claude.com/docs/en/settings"

  - name: Output Styles
    normalizedFamily: settings-policy
    vendorTerms: [output styles, system prompt variants]
    scopes: [project-root, user-home]
    interfaces: [terminal CLI, VS Code, Desktop, web]
    availability:
      status: current
      claimStrength: explicit
      notes: "Directly modifies Claude Code's system prompt; distinct from CLAUDE.md which holds project conventions"
    trustModel: "Stronger than ordinary context guidance because it changes the system prompt layer; intended to style behavior"
    sources:
      - label: "Output styles"
        url: "https://code.claude.com/docs/en/output-styles"
---

Claude Code has the broadest explicit extension taxonomy in a single `.claude` ecosystem. CLAUDE.md supports multiple layers: managed policy, project, user, local, and ancestor directory layers with on-demand subdirectory loading. Rules (`.claude/rules/*.md`) provide path-scoped instructions. Skills are the most flexible extension — reference skills provide knowledge, action skills trigger workflows, and they can run in isolated context via subagents. Agent Teams are a new experimental concept: multiple independent Claude Code sessions that coordinate via shared tasks and peer-to-peer messaging, going beyond subagents for complex parallel work. Hooks are particularly broad, supporting shell commands, HTTP endpoints, and LLM prompts. Plugins can include plugin-only components (LSP servers, monitors) not available as standalone files.
