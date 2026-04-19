---
vendor:
  id: claude-code
  name: Claude Code
  interfaces: [terminal CLI, VS Code, Desktop, web, JetBrains]

extensions:
  - name: CLAUDE.md and Rules
    normalizedFamily: instructions
    vendorTerms: [CLAUDE.md, CLAUDE.local.md, .claude/CLAUDE.md, rules, .claude/rules/*.md, "@import syntax", auto memory, MEMORY.md, AGENTS.md, claudeMdExcludes, InstructionsLoaded hook, autoMemoryDirectory]
    scopes: [organization, user-home, project-root, subdirectory]
    interfaces: [terminal CLI, VS Code, Desktop, web, JetBrains]
    availability:
      status: current
      claimStrength: explicit
      notes: "CLAUDE.md walks up directory tree; subdirectory files load on demand; rules can be path-scoped; managed policy CLAUDE.md at OS-level paths cannot be excluded; @path import syntax with 5-hop recursive depth; AGENTS.md supported via @import; claudeMdExcludes for monorepo filtering; auto memory is a complementary per-working-tree system (first 200 lines or 25KB loaded at session start, autoMemoryDirectory/autoMemoryEnabled settings); InstructionsLoaded hook fires when CLAUDE.md or rules load for audit logging; HTML comments stripped from CLAUDE.md to save context tokens; .worktreeinclude file for gitignored files in new worktrees"
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
    vendorTerms: [skills, SKILL.md, commands, custom commands, slash commands, .claude/skills/<name>/SKILL.md, .claude/commands/*.md, reference skills, action skills, Agent Skills standard, bundled skills, when_to_use, argument-hint, user-invocable, paths, "Skill(name)", routines, "/schedule"]
    scopes: [project-root, user-home, organization]
    interfaces: [terminal CLI, VS Code, Desktop, web, JetBrains]
    availability:
      status: current
      claimStrength: explicit
      notes: "Reference skills provide knowledge, action skills trigger workflows; can run in isolated context via subagents. Dual invocation: user via /name and model-invoked automatically. Legacy .claude/commands/ still works. Follows Agent Skills open standard (agentskills.io). Rich frontmatter: model, effort, context:fork, agent, hooks, paths, allowed-tools, when_to_use, argument-hint, user-invocable, shell (bash/powershell), once. Dynamic context injection via shell preprocessing with $ARGUMENTS[N], ${CLAUDE_SESSION_ID}, ${CLAUDE_SKILL_DIR} substitutions. Auto-discovered from nested directories (monorepo support) with live change detection. Skill content persists with auto-compaction budget (5K tokens each, 25K combined). Skill(name) permission rule syntax for allow/deny. Bundled skills: /batch, /debug, /simplify, /loop, /claude-api, /fewer-permission-prompts, /autofix-pr, /security-review, /ultraplan, /ultrareview, /review, /schedule. MCP prompts surface as /mcp__<server>__<prompt>. Skills can pre-approve tools via allowed-tools frontmatter. Enterprise deployment via managed settings; managed settings can disable shell execution in skills."
    trustModel: "Reusable knowledge and workflows; auto-loaded when relevant or invoked via /name; bundled skills like /simplify, /batch, /debug included; enterprise deployment via managed settings"
    sources:
      - label: "Extend Claude with skills"
        url: "https://code.claude.com/docs/en/skills"
      - label: "Commands reference"
        url: "https://code.claude.com/docs/en/commands"

  - name: MCP Servers
    normalizedFamily: mcp-tools
    vendorTerms: [MCP servers, .mcp.json, local-scoped MCP servers, project-scoped MCP servers, user-scoped MCP servers, managed-mcp.json, MCP Tool Search, MCP resources, MCP prompts, MCP elicitation, channels, plugin-provided MCP servers, claude.ai connectors, headersHelper, "oauth.scopes", "anthropic/maxResultSizeChars", list_changed notifications, ENABLE_TOOL_SEARCH]
    scopes: [user-home, project-root, organization]
    interfaces: [terminal CLI, VS Code, Desktop, web, JetBrains]
    availability:
      status: current
      claimStrength: explicit
      notes: "Five-tier scope hierarchy: Local > Project > User > Plugin > claude.ai connectors. Tool Search enabled by default defers tool loading (ENABLE_TOOL_SEARCH with auto/auto:N/true/false modes). Supports HTTP, SSE (deprecated), and stdio transports. OAuth 2.0 auth with scopes pinning, authServerMetadataUrl override, CIMD support, and headersHelper for dynamic auth (Kerberos, short-lived tokens). Plugin-provided MCP servers auto-start. MCP resources, prompts, and elicitation supported. Channels enable push messages. Claude Code can serve as an MCP server (claude mcp serve). Import from Claude Desktop. Environment variable expansion in .mcp.json (${VAR} and ${VAR:-default}). anthropic/maxResultSizeChars annotation allows up to 500K chars. Automatic reconnection with exponential backoff. list_changed notifications for dynamic tool updates. Enterprise managed-mcp.json with allowlist/denylist policies and serverUrl pattern matching."
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
    vendorTerms: [subagents, custom subagents, managed subagents, built-in subagents, plugin subagents, project subagents, color, initialPrompt, "--agent", "--agents", "Agent(agent_type)", disallowedTools, "/agents command", "claude agents"]
    scopes: [user-home, project-root, organization, cloud-session]
    interfaces: [terminal CLI, VS Code, Desktop, web]
    availability:
      status: current
      claimStrength: explicit
      notes: "Five priority levels: managed > CLI flag > project > user > plugin. Built-in subagents: Explore, Plan, general-purpose, statusline-setup, Claude Code Guide. Supports isolation worktrees, persistent memory, skills preloading, scoped MCP servers, hooks in frontmatter, effort levels, background mode, @-mention invocation, and subagent resumption. New frontmatter: color (display color), initialPrompt (auto-submitted first turn), disallowedTools (denylist). --agent flag runs whole session as a subagent; agent setting in settings.json for project default. --agents flag for ad-hoc multi-agent sessions. Agent(agent_type) syntax for tool restrictions. Managed subagents via managed settings. /agents command with Running/Library tabs. CLAUDE_CODE_SUBAGENT_MODEL env var for global model override. Auto-compaction at ~95% capacity."
    trustModel: "Isolated workers with their own context, prompt, tools, and optionally model; only summary returns to main conversation; permission mode inheritance from parent; plugin subagents cannot use hooks/mcpServers/permissionMode"
    sources:
      - label: "Create custom subagents"
        url: "https://code.claude.com/docs/en/sub-agents"
      - label: "SDK subagents"
        url: "https://code.claude.com/docs/en/sdk/subagents"

  - name: Agent Teams
    normalizedFamily: agents
    vendorTerms: [agent teams, teammates, team lead, shared task list, mailbox, peer-to-peer messaging, SendMessage, teammateMode, "--teammate-mode", require plan approval]
    scopes: [project-root, user-home]
    interfaces: [terminal CLI]
    availability:
      status: experimental
      claimStrength: explicit
      notes: "Experimental and disabled by default; requires CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1. Multiple independent Claude Code sessions with shared tasks and peer-to-peer messaging. Two display modes: in-process and split-pane (tmux/iTerm2). Task dependencies with file locking prevent race conditions. Quality gate hooks (TeammateIdle, TaskCreated, TaskCompleted). Plan approval workflow — teammates work in read-only plan mode until lead approves. teammateMode global config setting (auto/in-process/tmux) with --teammate-mode CLI override. SendMessage tool for inter-agent communication. Subagent definitions usable as teammate types."
    trustModel: "Teammates inherit lead's permission settings; can change individual modes after spawning but not at spawn time; if lead uses --dangerously-skip-permissions all teammates do too"
    sources:
      - label: "Agent teams"
        url: "https://code.claude.com/docs/en/agent-teams"
      - label: "Extend Claude Code"
        url: "https://code.claude.com/docs/en/features-overview"

  - name: Hooks
    normalizedFamily: hooks
    vendorTerms: [hooks, shell commands, HTTP endpoints, LLM prompts, agent hooks, async hooks, prompt hooks, MCP tool hooks, asyncRewake, matcher, decision control, CLAUDE_ENV_FILE, if field, defer, statusMessage, updatedMCPToolOutput, updatedPermissions]
    scopes: [user-home, project-root, organization]
    interfaces: [terminal CLI, VS Code, Desktop]
    availability:
      status: current
      claimStrength: explicit
      notes: "4 handler types (command, http, prompt, agent) across 26 lifecycle events including CwdChanged, FileChanged, WorktreeCreate/Remove, PreCompact/PostCompact, Elicitation/ElicitationResult, InstructionsLoaded, ConfigChange, StopFailure; async hooks run in background; hooks defined in settings files, plugins, skills, and agent frontmatter; PreToolUse hooks enforce policy even in bypass mode; if field enables granular tool+argument filtering (e.g., Bash(git *), Edit(*.ts)); defer permissionDecision for external UI integration; shell field supports bash/powershell; statusMessage for UI feedback; updatedMCPToolOutput in PostToolUse; updatedPermissions in PermissionRequest; allowManagedHooksOnly lets org admins restrict to managed hooks; allowedHttpHookUrls and httpHookAllowedEnvVars for HTTP hook security"
    trustModel: "Deterministic control layer supporting shell commands, HTTP endpoints, LLM prompts, and agent subagents; hooks run with full user permissions; can intercept lifecycle events and tool use; organization admins can restrict to managed hooks only"
    sources:
      - label: "Automate workflows with hooks"
        url: "https://code.claude.com/docs/en/hooks-guide"
      - label: "Hooks reference"
        url: "https://code.claude.com/docs/en/hooks"

  - name: Plugins and Marketplaces
    normalizedFamily: plugins-distribution
    vendorTerms: [plugins, plugin.json, marketplace.json, .claude-plugin, LSP servers, monitors, marketplace, plugin hints, plugin dependencies, output styles, channels, userConfig, bin, "${CLAUDE_PLUGIN_DATA}", "${CLAUDE_PLUGIN_ROOT}", blockedMarketplaces, pluginTrustMessage, "/reload-plugins", "--plugin-dir"]
    scopes: [project-root, user-home, organization]
    interfaces: [terminal CLI, VS Code, Desktop, web, JetBrains]
    availability:
      status: current
      claimStrength: explicit
      notes: "Includes plugin-only components (LSP servers, monitors) not available as standalone files; monitors (v2.1.105+) support when field for conditional activation; plugins namespace skills as /plugin-name:skill. Official Anthropic marketplace with submission review (claude.ai and platform.claude.com). npm packages as plugin source. Plugin dependency version constraints with semver. Plugin hints protocol for CLI integration. Managed marketplace restrictions (strictKnownMarketplaces) with hostPattern/url/npm/file/directory/settings source types. userConfig with sensitive keychain storage. ${CLAUDE_PLUGIN_DATA} persistent directory survives updates. /reload-plugins for live reload. --plugin-dir for development. blockedMarketplaces and pluginTrustMessage managed settings. settings.json at plugin root for default settings."
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
    vendorTerms: [settings.json, settings.local.json, managed settings, managed-settings.json, managed-settings.d/, server-managed settings, "~/.claude.json", managed preferences (plist), registry policies, forceRemoteSettingsRefresh, JSON schema, audit logging]
    scopes: [organization, user-home, project-root]
    interfaces: [terminal CLI, VS Code, Desktop, web, JetBrains]
    availability:
      status: current
      claimStrength: explicit
      notes: "Four-tier scope: Managed > CLI args > Local > Project > User. 60+ settings keys covering permissions, sandbox, hooks, env, plugins, auto-mode, and more. Server-managed settings via Claude.ai admin console for Teams/Enterprise. MDM delivery via macOS plist, Windows registry (HKLM and HKCU), or file-based managed-settings.json with managed-settings.d/ drop-in directory for independent policy fragments. Managed-only settings cannot be overridden. JSON schema at schemastore.org for autocomplete/validation. forceRemoteSettingsRefresh for fail-closed startup enforcement. Security approval dialogs for shell commands, custom env vars, hook configs. Audit logging via compliance API. Extensive sandbox settings for filesystem/network restrictions."
    trustModel: "Formal policy/config layer with documented precedence; managed settings delivered by server policy or OS-level device management cannot be overridden; controls permissions, hooks, environment variables, model defaults"
    sources:
      - label: "Claude Code settings"
        url: "https://code.claude.com/docs/en/settings"
      - label: "Server-managed settings"
        url: "https://code.claude.com/docs/en/server-managed-settings"

  - name: Output Styles
    normalizedFamily: settings-policy
    vendorTerms: [output styles, system prompt variants, custom output styles, outputStyle setting, output-styles/ directory, keep-coding-instructions]
    scopes: [project-root, user-home]
    interfaces: [terminal CLI, VS Code, Desktop, web]
    availability:
      status: current
      claimStrength: explicit
      notes: "Directly modifies Claude Code's system prompt; three built-in styles (Default, Explanatory, Learning); custom styles as Markdown files with YAML frontmatter; plugins can distribute output styles; keep-coding-instructions frontmatter field controls whether coding-specific system prompt parts are retained (default: false); output styles completely replace coding-specific system prompt parts unlike CLAUDE.md which adds to it"
    trustModel: "Stronger than ordinary context guidance because it changes the system prompt layer; intended to style behavior"
    sources:
      - label: "Output styles"
        url: "https://code.claude.com/docs/en/output-styles"
---

Claude Code has the broadest explicit extension taxonomy in a single `.claude` ecosystem. CLAUDE.md supports multiple layers: managed policy (OS-level, cannot be excluded), project, user, local, and ancestor directory layers with on-demand subdirectory loading. The @import syntax allows CLAUDE.md files to reference other files recursively, including AGENTS.md. Rules (`.claude/rules/*.md`) provide path-scoped instructions. The InstructionsLoaded hook enables audit logging when instructions load. Skills are the most flexible extension — reference skills provide knowledge, action skills trigger workflows, and they can run in isolated context via subagents. New frontmatter fields (when_to_use, argument-hint, user-invocable, paths, shell, once) and substitutions ($ARGUMENTS[N], ${CLAUDE_SESSION_ID}, ${CLAUDE_SKILL_DIR}) expand skill capabilities. Many new built-in commands including /autofix-pr, /security-review, /ultraplan, /ultrareview, /review, and /schedule for routines. Agent Teams are experimental: multiple independent Claude Code sessions that coordinate via shared tasks, peer-to-peer messaging via SendMessage, plan approval workflows, and task dependencies with file locking. Subagents now support color, initialPrompt, disallowedTools frontmatter, --agent flag for session-level agent mode, and managed deployment. Hooks support 4 handler types across 26 lifecycle events with new if field for granular tool+argument filtering and defer for external UI integration. Plugins include plugin-only components (LSP servers, monitors with conditional activation, channels) with marketplace distribution, dependency management, userConfig with keychain storage, and managed restrictions. Settings now cover 60+ keys with managed-settings.d/ drop-in directory, JSON schema validation, fail-closed startup enforcement, and audit logging.
