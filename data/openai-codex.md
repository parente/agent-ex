---
vendor:
  id: openai-codex
  name: OpenAI Codex
  interfaces: [CLI, IDE extension, app, web]

extensions:
  - name: AGENTS.md Instructions
    normalizedFamily: instructions
    vendorTerms: [AGENTS.md, AGENTS.override.md, custom instructions, project_doc_fallback_filenames, agents.md standard, automations]
    scopes: [user-home, project-root, subdirectory]
    interfaces: [CLI, IDE extension, app]
    availability:
      status: current
      claimStrength: explicit
      notes: "Discovery chain: global (~/.codex) reads AGENTS.override.md first then AGENTS.md; project scope walks from root to CWD checking override then standard per directory; combined size capped at 32 KiB (configurable via project_doc_max_bytes); fallback filenames configurable; CODEX_HOME env var overrides home directory; links to official agents.md cross-vendor standard; Automations feature enables recurring AGENTS.md drift checks"
    trustModel: "Prompt-time guidance loaded at run start; more specific files override by concatenation order rather than hard policy"
    sources:
      - label: "Customization"
        url: "https://developers.openai.com/codex/concepts/customization"
      - label: "Custom instructions with AGENTS.md"
        url: "https://developers.openai.com/codex/guides/agents-md"

  - name: Memories
    normalizedFamily: instructions
    vendorTerms: [memories, learned context, "/memories"]
    scopes: [user-home]
    interfaces: [CLI, IDE extension, app]
    availability:
      status: current
      claimStrength: explicit
      notes: "Off by default; not available in EEA/UK/Switzerland; stored under ~/.codex/memories/; /memories slash command for per-thread control; background processing after threads go idle; secret redaction applied; configurable via memories.generate_memories, memories.use_memories, memories.extract_model, memories.consolidation_model"
    trustModel: "Context carried forward from prior sessions; not user-authored instructions but agent-learned knowledge"
    sources:
      - label: "Memories"
        url: "https://developers.openai.com/codex/memories"
      - label: "Customization"
        url: "https://developers.openai.com/codex/concepts/customization"

  - name: Skills
    normalizedFamily: skills
    vendorTerms: [agent skills, SKILL.md, skill folders, .agents/skills, agents/openai.yaml, "$skill-creator", "$skill-installer", allow_implicit_invocation, "dependencies.tools"]
    scopes: [subdirectory, project-root, user-home, machine]
    interfaces: [CLI, IDE extension, app]
    availability:
      status: current
      claimStrength: explicit
      notes: "Progressive disclosure: metadata loaded at start, full content on selection. Six scope tiers: REPO (CWD, parent dirs, root via .agents/skills/), USER (~/.agents/skills/), ADMIN (/etc/codex/skills), SYSTEM (bundled). Two invocation modes: explicit ($-mention or /skills) and implicit (auto-matched by description). Built-in $skill-creator and $skill-installer. Builds on open Agent Skills standard (agentskills.io). Distributable via plugins. agents/openai.yaml metadata schema supports UI presentation, allow_implicit_invocation policy, and MCP tool dependency declarations. Symlinked skill folders supported. [[skills.config]] entries in config.toml for enable/disable."
    trustModel: "Reusable workflows and domain expertise; skills are the authoring format, plugins are the distribution unit; allow_implicit_invocation policy controls auto-activation"
    sources:
      - label: "Agent Skills"
        url: "https://developers.openai.com/codex/skills"
      - label: "Codex Plugins"
        url: "https://developers.openai.com/codex/plugins"
      - label: "Build Codex Plugins"
        url: "https://developers.openai.com/codex/plugins/build"

  - name: Custom Prompts (deprecated)
    normalizedFamily: prompts
    vendorTerms: [custom prompts, slash commands, reusable prompts, prompts directory]
    scopes: [user-home]
    interfaces: [CLI, IDE extension]
    availability:
      status: deprecated
      claimStrength: explicit
      notes: "Explicitly deprecated in favor of skills. Still functional but no longer recommended. Markdown files in ~/.codex/prompts/ invoked as /prompts:name. Supports YAML frontmatter (description, argument-hint) and placeholder arguments ($1-$9, named $KEY=value). Requires restart after edits."
    trustModel: "User-local reusable prompt templates with argument placeholders; not shared through repositories"
    sources:
      - label: "Custom Prompts (deprecated)"
        url: "https://developers.openai.com/codex/custom-prompts"

  - name: MCP Servers
    normalizedFamily: mcp-tools
    vendorTerms: [MCP servers, STDIO transport, streamable HTTP transport, OAuth authentication, bearer token authentication, enabled_tools, disabled_tools, startup_timeout_sec, tool_timeout_sec, mcp_oauth_callback_port]
    scopes: [user-home, project-root]
    interfaces: [CLI, IDE extension, app]
    availability:
      status: current
      claimStrength: explicit
      notes: "CLI, IDE extension, and app share MCP configuration via config.toml; STDIO and streamable HTTP transports; OAuth via codex mcp login with server-advertised scopes_supported; per-server enabled_tools/disabled_tools filtering; per-server startup_timeout_sec (default 10) and tool_timeout_sec (default 60); enabled/required flags per server; custom OAuth callback port/URL for remote devbox; http_headers and env_http_headers for HTTP servers; enterprise allowlist enforcement via requirements.toml (name + identity matching)"
    trustModel: "Destructive MCP tool calls always require approval; side-effect calls can elicit approval; granular mcp_elicitations approval toggle; enterprise allowlist via requirements.toml; Guardian subagent can review MCP approvals"
    sources:
      - label: "Model Context Protocol"
        url: "https://developers.openai.com/codex/mcp"
      - label: "Agent approvals and security"
        url: "https://developers.openai.com/codex/agent-approvals-security"
      - label: "Managed configuration"
        url: "https://developers.openai.com/codex/enterprise/managed-configuration"

  - name: Subagents
    normalizedFamily: agents
    vendorTerms: [subagents, custom agents, parallel delegated workflows, agent threads, spawn_agents_on_csv, nickname_candidates, developer_instructions, model_reasoning_effort]
    scopes: [user-home, project-root, cloud-session]
    interfaces: [app, CLI]
    availability:
      status: current
      claimStrength: explicit
      notes: "Enabled by default; IDE visibility coming soon. Ships with 3 built-in agents (default, worker, explorer). Custom agents defined as TOML files at user (~/.codex/agents/) or project (.codex/agents/) scope with detailed schema: name, description, developer_instructions, nickname_candidates, model, model_reasoning_effort, sandbox_mode, mcp_servers, skills.config. Model guidance: gpt-5.4 for most agents, gpt-5.4-mini for fast/cheap, gpt-5.3-codex-spark for near-instant text-only. Experimental spawn_agents_on_csv for CSV batch processing with agents.job_max_runtime_seconds (default 1800s). Max 6 concurrent threads by default; max nesting depth of 1. Approval requests surface from inactive threads with overlay."
    trustModel: "Subagents inherit parent sandbox policy; approval requests surface from inactive threads; runtime overrides reapplied to children; custom agents can override sandbox mode; max_depth defaults to 1"
    sources:
      - label: "Subagents"
        url: "https://developers.openai.com/codex/subagents"
      - label: "Subagent concepts"
        url: "https://developers.openai.com/codex/concepts/subagents"

  - name: Hooks
    normalizedFamily: hooks
    vendorTerms: [hooks, command hooks, hook events, hooks.json, statusMessage, permissionDecision]
    scopes: [user-home, project-root]
    interfaces: [CLI, IDE extension]
    availability:
      status: experimental
      claimStrength: explicit
      notes: "Experimental, behind codex_hooks = true feature flag. Windows support temporarily disabled. 5 hook events: SessionStart, PreToolUse, PostToolUse, UserPromptSubmit, Stop. PreToolUse/PostToolUse only intercept Bash tool calls (not MCP, Write, WebSearch, or unified_exec streaming). Multiple hooks run concurrently. Default timeout 600s. Hooks discovered additively from multiple config layers (~/.codex/hooks.json and <repo>/.codex/hooks.json). SessionStart supports source matching (startup/resume). statusMessage field for UI feedback during execution."
    trustModel: "Deterministic scripts in the agent loop; hooks run as local shell commands receiving JSON on stdin; PreToolUse can deny commands but enforcement is incomplete (model can write scripts to disk); PostToolUse cannot undo side effects"
    sources:
      - label: "Hooks"
        url: "https://developers.openai.com/codex/hooks"

  - name: Plugins
    normalizedFamily: plugins-distribution
    vendorTerms: [plugins, installable distribution unit, marketplace, plugin directory, "$plugin-creator", plugin manifest, ".codex-plugin/plugin.json", ".app.json", ".mcp.json", "@-invocation"]
    scopes: [project-root, user-home]
    interfaces: [app, CLI, IDE extension]
    availability:
      status: current
      claimStrength: explicit
      notes: "Plugins bundle skills, app integrations, and MCP servers. Three marketplace tiers: official curated directory, repo-scoped (.agents/plugins/marketplace.json), and personal (~/.agents/plugins/marketplace.json). Official public plugin publishing coming soon. Built-in $plugin-creator for scaffolding. Detailed manifest schema (.codex-plugin/plugin.json) with interface metadata. .app.json for app/connector mappings (Gmail, Google Drive, Slack). .mcp.json for bundled MCP config. Per-plugin enable/disable in config.toml. @-invocation in prompt window for explicit plugin/skill invocation. IDE extension has plugin directory access."
    trustModel: "Existing approval settings apply; bundled apps subject to their own auth/privacy policies; enable/disable via config.toml; marketplace policy fields control install behavior"
    sources:
      - label: "Plugins"
        url: "https://developers.openai.com/codex/plugins"
      - label: "Build plugins"
        url: "https://developers.openai.com/codex/plugins/build"

  - name: Configuration, Rules, and Requirements
    normalizedFamily: settings-policy
    vendorTerms: [config.toml, requirements.toml, managed configuration, rules, .rules files, profiles, feature flags, managed_config.toml, cloud-managed requirements, prefix_rule, permissions profiles, granular approval policy, enforce_residency, feature maturity, Codex SDK, App Server, GitHub Action, non-interactive mode]
    scopes: [user-home, project-root, subdirectory, machine, cloud-session, organization]
    interfaces: [CLI, IDE extension, app, web]
    availability:
      status: current
      claimStrength: explicit
      notes: "Config, requirements, and managed configuration are current. Rules (.codex/rules/ with Starlark-based prefix_rule) and profiles are experimental. Cloud-managed requirements support group-based assignment for Business/Enterprise plans. MDM support for macOS. Precedence: CLI flags > Profile > Project config > User config > System config > Defaults. Requirements are admin-enforced and cannot be overridden. Formal 4-level feature maturity taxonomy: Under development, Experimental, Beta, Stable. Codex SDK, App Server, GitHub Action, and non-interactive mode available for automation."
    trustModel: "Layered trust: requirements (admin-enforced, can't override) > managed defaults (admin-set starting values) > user config. Cloud-managed requirements use signed cache with expiry. Project-scoped config only loaded for trusted projects. Protected paths (.git, .codex, .agents) read-only even in workspace-write. OS-level sandbox (macOS Seatbelt, Linux bwrap+seccomp)."
    sources:
      - label: "Config basics"
        url: "https://developers.openai.com/codex/config-basic"
      - label: "Advanced Configuration"
        url: "https://developers.openai.com/codex/config-advanced"
      - label: "Configuration Reference"
        url: "https://developers.openai.com/codex/config-reference"
      - label: "Rules"
        url: "https://developers.openai.com/codex/rules"
      - label: "Managed configuration"
        url: "https://developers.openai.com/codex/enterprise/managed-configuration"
      - label: "Agent approvals and security"
        url: "https://developers.openai.com/codex/agent-approvals-security"
      - label: "Feature maturity"
        url: "https://developers.openai.com/codex/feature-maturity"
      - label: "Enterprise governance"
        url: "https://developers.openai.com/codex/enterprise/governance"
---

OpenAI Codex is strongest on nested filesystem scoping and policy-enforced local clients. It builds an instruction chain from global scope in `~/.codex` down to the current working directory, supporting `AGENTS.override.md`, nested directory overrides, and load-order precedence. AGENTS.md is now available across all surfaces including the app, and links to the official agents.md cross-vendor standard. Memories carry useful context forward from prior work (off by default, not available in EEA/UK/Switzerland). Rules are a separate experimental concept controlling which commands can escape the sandbox using Starlark-based `.rules` files. Configuration and requirements form the strongest formal control layer, with admin-enforced `requirements.toml` that users cannot override, cloud-managed requirements for Business/Enterprise with group-based assignment, and MDM support for macOS. A formal 4-level feature maturity taxonomy (Under development, Experimental, Beta, Stable) governs feature lifecycle. Skills are the authoring format with six scope tiers and agents/openai.yaml metadata for UI presentation and MCP dependency declarations; plugins are the installable distribution unit with three marketplace tiers and detailed manifest schema. Custom agents are defined as TOML files with built-in agents (default, worker, explorer), model selection guidance (gpt-5.4, gpt-5.4-mini, gpt-5.3-codex-spark), and experimental CSV batch processing. MCP servers now support per-server timeouts, enabled/required flags, and custom OAuth callback configuration.
