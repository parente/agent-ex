---
vendor:
  id: claude-code
  name: Claude Code
  interfaces: [terminal CLI, VS Code, Desktop, web, JetBrains]

extensions:
  - name: CLAUDE.md and Rules
    normalizedFamily: instructions
    vendorTerms: [CLAUDE.md, CLAUDE.local.md, .claude/CLAUDE.md, rules, .claude/rules/*.md, "@import syntax", auto memory, MEMORY.md]
    scopes: [organization, user-home, project-root, subdirectory]
    interfaces: [terminal CLI, VS Code, Desktop, web, JetBrains]
    availability:
      status: current
      claimStrength: explicit
      notes: "CLAUDE.md walks up directory tree; subdirectory files load on demand; rules can be path-scoped; managed policy CLAUDE.md at OS-level paths cannot be excluded; @path import syntax with 5-hop recursive depth; AGENTS.md supported via @import; claudeMdExcludes for monorepo filtering; auto memory is a complementary per-working-tree system"
    trustModel: "Context files, not enforced configuration; Anthropic explicitly says compliance is not guaranteed for vague or conflicting instructions; managed policy CLAUDE.md deployed by IT cannot be excluded"
    sources:
      - label: "Extend Claude Code"
        url: "https://code.claude.com/docs/en/features-overview"
      - label: "Explore the .claude directory"
        url: "https://code.claude.com/docs/en/claude-directory"
      - label: "How Claude remembers your project"
        url: "https://code.claude.com/docs/en/memory"
      - label: "Server-managed settings"
        url: "https://code.claude.com/docs/en/server-managed-settings"

  - name: Skills
    normalizedFamily: prompts
    vendorTerms: [skills, SKILL.md, commands, custom commands, slash commands, .claude/skills/<name>/SKILL.md, .claude/commands/*.md, bundled skills, Agent Skills standard]
    scopes: [project-root, user-home, organization]
    interfaces: [terminal CLI, VS Code, Desktop, web]
    availability:
      status: current
      claimStrength: explicit
      notes: "Skills are the primary prompt/workflow mechanism; legacy .claude/commands/ still works. Dual invocation: user via /name and model-invoked automatically. Follows Agent Skills open standard (agentskills.io). Bundled skills: /batch, /debug, /simplify, /loop, /claude-api, /fewer-permission-prompts. MCP prompts surface as /mcp__<server>__<prompt>. Enterprise deployment via managed settings."
    trustModel: "Reusable knowledge and workflows; auto-loaded when relevant or invoked via /name; skills can pre-approve tools via allowed-tools frontmatter; enterprise managed settings can disable shell execution in skills"
    sources:
      - label: "Extend Claude with skills"
        url: "https://code.claude.com/docs/en/skills"
      - label: "Commands reference"
        url: "https://code.claude.com/docs/en/commands"

  - name: Skills (knowledge and workflows)
    normalizedFamily: skills
    vendorTerms: [skills, SKILL.md, reference skills, action skills, Agent Skills standard, bundled skills]
    scopes: [project-root, user-home, organization]
    interfaces: [terminal CLI, VS Code, Desktop, web]
    availability:
      status: current
      claimStrength: explicit
      notes: "Reference skills provide knowledge, action skills trigger workflows; can run in isolated context via subagents. Follows Agent Skills open standard. Rich frontmatter: model, effort, context:fork, agent, hooks, paths, allowed-tools. Dynamic context injection via shell preprocessing. Auto-discovered from nested directories (monorepo support). Skill content persists with auto-compaction budget (5K tokens each, 25K combined)."
    trustModel: "Reusable knowledge and workflows; auto-loaded when relevant or invoked via /name; bundled skills like /simplify, /batch, /debug included; enterprise deployment via managed settings"
    sources:
      - label: "Extend Claude with skills"
        url: "https://code.claude.com/docs/en/skills"

  - name: MCP Servers
    normalizedFamily: mcp-tools
    vendorTerms: [MCP servers, .mcp.json, local-scoped MCP servers, project-scoped MCP servers, user-scoped MCP servers, managed-mcp.json, MCP Tool Search, MCP resources, MCP prompts, MCP elicitation, channels, plugin-provided MCP servers, claude.ai connectors]
    scopes: [user-home, project-root, organization]
    interfaces: [terminal CLI, VS Code, Desktop, web, JetBrains]
    availability:
      status: current
      claimStrength: explicit
      notes: "Three installation scopes: local (default, per-project private), project (shared via .mcp.json), and user (cross-project). Tool Search enabled by default defers tool loading. Supports HTTP, SSE (deprecated), and stdio transports. OAuth 2.0 auth for remote servers. Plugin-provided MCP servers auto-start. MCP resources, prompts, and elicitation supported. Channels enable push messages. Claude Code can serve as an MCP server. Enterprise managed-mcp.json and allowlist/denylist policies available."
    trustModel: "Project-scoped servers require explicit approval; managed-mcp.json provides enterprise lockdown; allowlist/denylist policies via managed settings; plugin MCP servers inherit plugin trust"
    sources:
      - label: "Connect Claude Code to tools via MCP"
        url: "https://code.claude.com/docs/en/mcp"
      - label: "Discover and install plugins"
        url: "https://code.claude.com/docs/en/discover-plugins"
      - label: "Claude Code settings"
        url: "https://code.claude.com/docs/en/settings"

  - name: Subagents
    normalizedFamily: agents
    vendorTerms: [subagents, custom subagents, managed subagents, built-in subagents, plugin subagents, project subagents]
    scopes: [user-home, project-root, organization, cloud-session]
    interfaces: [terminal CLI, VS Code]
    availability:
      status: current
      claimStrength: explicit
      notes: "Five priority levels: managed > CLI flag > project > user > plugin. Built-in subagents: Explore, Plan, general-purpose, statusline-setup, Claude Code Guide. Supports isolation worktrees, persistent memory, skills preloading, scoped MCP servers, hooks in frontmatter, effort levels, background mode, @-mention invocation, and subagent resumption."
    trustModel: "Isolated workers with their own context, prompt, tools, and optionally model; only summary returns to main conversation; permission mode inheritance from parent; plugin subagents cannot use hooks/mcpServers/permissionMode"
    sources:
      - label: "Create custom subagents"
        url: "https://code.claude.com/docs/en/sub-agents"
      - label: "SDK subagents"
        url: "https://code.claude.com/docs/en/sdk/subagents"

  - name: Agent Teams
    normalizedFamily: agents
    vendorTerms: [agent teams, teammates, team lead, shared task list, mailbox, peer-to-peer messaging]
    scopes: [project-root, user-home]
    interfaces: [terminal CLI]
    availability:
      status: experimental
      claimStrength: explicit
      notes: "Experimental and disabled by default; requires CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1. Multiple independent Claude Code sessions with shared tasks and peer-to-peer messaging. Two display modes: in-process and split-pane (tmux/iTerm2). Task dependencies, quality gate hooks (TeammateIdle, TaskCreated, TaskCompleted), plan approval workflow."
    trustModel: "Teammates inherit lead's permission settings; can change individual modes after spawning but not at spawn time; if lead uses --dangerously-skip-permissions all teammates do too"
    sources:
      - label: "Agent teams"
        url: "https://code.claude.com/docs/en/agent-teams"
      - label: "Extend Claude Code"
        url: "https://code.claude.com/docs/en/features-overview"

  - name: Hooks
    normalizedFamily: hooks
    vendorTerms: [hooks, shell commands, HTTP endpoints, LLM prompts, agent hooks, async hooks, prompt hooks, MCP tool hooks, asyncRewake, matcher, decision control, CLAUDE_ENV_FILE]
    scopes: [user-home, project-root, organization]
    interfaces: [terminal CLI, VS Code]
    availability:
      status: current
      claimStrength: explicit
      notes: "4 handler types (command, http, prompt, agent) across 27 lifecycle events; async hooks run in background; hooks defined in settings files, plugins, skills, and agent frontmatter; PreToolUse hooks enforce policy even in bypass mode; allowManagedHooksOnly lets org admins restrict to managed hooks"
    trustModel: "Deterministic control layer supporting shell commands, HTTP endpoints, LLM prompts, and agent subagents; hooks run with full user permissions; can intercept lifecycle events and tool use; organization admins can restrict to managed hooks only"
    sources:
      - label: "Automate workflows with hooks"
        url: "https://code.claude.com/docs/en/hooks-guide"
      - label: "Hooks reference"
        url: "https://code.claude.com/docs/en/hooks"

  - name: Plugins and Marketplaces
    normalizedFamily: plugins-distribution
    vendorTerms: [plugins, plugin.json, marketplace.json, .claude-plugin, LSP servers, monitors, marketplace, plugin hints, plugin dependencies, output styles, channels, userConfig, bin]
    scopes: [project-root, user-home, organization]
    interfaces: [terminal CLI, VS Code, Desktop, web]
    availability:
      status: current
      claimStrength: explicit
      notes: "Includes plugin-only components (LSP servers, monitors) not available as standalone files; plugins namespace skills as /plugin-name:skill. Official Anthropic marketplace with submission review. npm packages as plugin source. Plugin dependency version constraints with semver. Plugin hints protocol for CLI integration. Managed marketplace restrictions (strictKnownMarketplaces)."
    trustModel: "Plugins execute arbitrary code with user privileges; managed marketplace restrictions allow org lockdown; plugin caching isolates installs; path traversal outside plugin root blocked; official marketplace requires submission review"
    sources:
      - label: "Create plugins"
        url: "https://code.claude.com/docs/en/plugins"
      - label: "Plugins reference"
        url: "https://code.claude.com/docs/en/plugins-reference"
      - label: "Discover and install prebuilt plugins through marketplaces"
        url: "https://code.claude.com/docs/en/discover-plugins"
      - label: "Create and distribute a plugin marketplace"
        url: "https://code.claude.com/docs/en/plugin-marketplaces"
      - label: "Plugin dependency versions"
        url: "https://code.claude.com/docs/en/plugin-dependencies"

  - name: Settings and Managed Settings
    normalizedFamily: settings-policy
    vendorTerms: [settings.json, settings.local.json, managed settings, managed-settings.json, managed-settings.d/, server-managed settings, "~/.claude.json", managed preferences (plist), registry policies]
    scopes: [organization, user-home, project-root]
    interfaces: [terminal CLI, VS Code, Desktop, web]
    availability:
      status: current
      claimStrength: explicit
      notes: "Four-tier scope: Managed > CLI args > Local > Project > User. 50+ settings keys covering permissions, sandbox, hooks, env, plugins, auto-mode, and more. Server-managed settings via Claude.ai admin console for Teams/Enterprise. MDM delivery via macOS plist, Windows registry, or file-based managed-settings.json with drop-in directory. Managed-only settings cannot be overridden."
    trustModel: "Formal policy/config layer with documented precedence; managed settings delivered by server policy or OS-level device management cannot be overridden; controls permissions, hooks, environment variables, model defaults"
    sources:
      - label: "Claude Code settings"
        url: "https://code.claude.com/docs/en/settings"
      - label: "Server-managed settings"
        url: "https://code.claude.com/docs/en/server-managed-settings"

  - name: Output Styles
    normalizedFamily: settings-policy
    vendorTerms: [output styles, system prompt variants, custom output styles, outputStyle setting, output-styles/ directory]
    scopes: [project-root, user-home]
    interfaces: [terminal CLI, VS Code, Desktop, web]
    availability:
      status: current
      claimStrength: explicit
      notes: "Directly modifies Claude Code's system prompt; three built-in styles (Default, Explanatory, Learning); custom styles as Markdown files with YAML frontmatter; plugins can distribute output styles"
    trustModel: "Stronger than ordinary context guidance because it changes the system prompt layer; intended to style behavior"
    sources:
      - label: "Output styles"
        url: "https://code.claude.com/docs/en/output-styles"
---

Claude Code has the broadest explicit extension taxonomy in a single `.claude` ecosystem. CLAUDE.md supports multiple layers: managed policy (OS-level, cannot be excluded), project, user, local, and ancestor directory layers with on-demand subdirectory loading. The @import syntax allows CLAUDE.md files to reference other files recursively. Rules (`.claude/rules/*.md`) provide path-scoped instructions. Skills are the most flexible extension — reference skills provide knowledge, action skills trigger workflows, and they can run in isolated context via subagents. Agent Teams are experimental: multiple independent Claude Code sessions that coordinate via shared tasks and peer-to-peer messaging. Hooks support 4 handler types across 27 lifecycle events. Plugins include plugin-only components (LSP servers, monitors, channels) with marketplace distribution, dependency management, and managed restrictions.
