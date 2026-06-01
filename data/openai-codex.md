---
vendor:
  id: openai-codex
  name: OpenAI Codex
  interfaces: [CLI, IDE extension, app, web]

extensions:
  - name: AGENTS.md Instructions
    normalizedFamily: instructions
    vendorTerms: [AGENTS.md, AGENTS.override.md, custom instructions, agents.md standard]
    scopes: [user-home, project-root, subdirectory]
    interfaces: [CLI, IDE extension, app]
    availability:
      status: current
      claimStrength: explicit
      notes: "Discovery chain walks from global (~/.codex) to CWD checking override then standard per directory; combined size capped at 32 KiB; links to official agents.md cross-vendor standard"
    trustModel: "Contextual guidance loaded at run start; more specific files override by concatenation order"
    sources:
      - label: "Customization"
        url: "https://developers.openai.com/codex/concepts/customization"
      - label: "AGENTS.md guide"
        url: "https://developers.openai.com/codex/guides/agents-md"

  - name: Memories
    normalizedFamily: instructions
    vendorTerms: [memories, learned context, Chronicle]
    scopes: [user-home]
    interfaces: [CLI, IDE extension, app]
    availability:
      status: current
      claimStrength: explicit
      notes: "Off by default; not available in EEA/UK/Switzerland; Chronicle (research preview, macOS only) augments memories with screen-context captures; secret redaction applied"
    trustModel: "Persistent learned context, not user-authored instructions; background processing after threads go idle"
    sources:
      - label: "Memories"
        url: "https://developers.openai.com/codex/memories"
      - label: "Chronicle"
        url: "https://developers.openai.com/codex/memories/chronicle"

  - name: Skills
    normalizedFamily: skills
    vendorTerms: [agent skills, SKILL.md, .agents/skills, $skill-creator]
    scopes: [subdirectory, project-root, user-home, machine]
    interfaces: [CLI, IDE extension, app]
    availability:
      status: current
      claimStrength: explicit
      notes: "Six scope tiers from repo to system-bundled; explicit ($-mention) and implicit (description matching) invocation; based on open Agent Skills standard (agentskills.io); can declare MCP dependencies for auto-wiring"
    trustModel: "Reusable workflows loaded progressively; skills are the authoring format, plugins are the distribution unit"
    sources:
      - label: "Agent Skills"
        url: "https://developers.openai.com/codex/skills"
      - label: "Plugins"
        url: "https://developers.openai.com/codex/plugins"

  - name: Custom Prompts (deprecated)
    normalizedFamily: prompts
    vendorTerms: [custom prompts, slash commands]
    scopes: [user-home]
    interfaces: [CLI, IDE extension]
    availability:
      status: deprecated
      claimStrength: explicit
      notes: "Deprecated in favor of skills; Markdown files in ~/.codex/prompts/ invoked as /prompts:name"
    trustModel: "User-local reusable prompt templates with argument placeholders; not shared through repositories"
    sources:
      - label: "Custom Prompts"
        url: "https://developers.openai.com/codex/custom-prompts"

  - name: MCP Servers
    normalizedFamily: mcp-tools
    vendorTerms: [MCP servers, OAuth authentication, remote MCP]
    scopes: [user-home, project-root]
    interfaces: [CLI, IDE extension, app]
    availability:
      status: current
      claimStrength: explicit
      notes: "STDIO and streamable HTTP transports; remote MCP stdio experimental; OAuth via codex mcp login; per-tool approval modes (auto/prompt/approve) with allow/deny lists; plugin-provided servers supported"
    trustModel: "Destructive tool calls always require approval; enterprise allowlist enforces name + identity matching"
    sources:
      - label: "MCP"
        url: "https://developers.openai.com/codex/mcp"
      - label: "Agent approvals and security"
        url: "https://developers.openai.com/codex/agent-approvals-security"

  - name: Subagents
    normalizedFamily: agents
    vendorTerms: [subagents, custom agents, agent threads, spawn_agents_on_csv]
    scopes: [user-home, project-root, cloud-session]
    interfaces: [app, CLI]
    availability:
      status: current
      claimStrength: explicit
      notes: "Enabled by default; built-in default/worker/explorer agents; custom agents via TOML files with model and reasoning effort selection; spawn_agents_on_csv (experimental) for batch processing with structured output; max 6 threads"
    trustModel: "Isolated workers that inherit parent sandbox policy; approval requests surface from inactive threads"
    sources:
      - label: "Subagents"
        url: "https://developers.openai.com/codex/subagents"
      - label: "Subagent concepts"
        url: "https://developers.openai.com/codex/concepts/subagents"

  - name: Hooks
    normalizedFamily: hooks
    vendorTerms: [hooks, hook events, managed hooks]
    scopes: [user-home, project-root]
    interfaces: [CLI, IDE extension]
    availability:
      status: current
      claimStrength: explicit
      notes: "10 lifecycle events including PermissionRequest, SubagentStart/Stop, PreCompact/PostCompact; PreToolUse can deny or rewrite tool calls; managed hooks via requirements.toml; plugin-bundled hooks supported"
    trustModel: "Deterministic scripts that run on lifecycle events; non-managed hooks require hash-based trust review; enterprise managed hooks via requirements.toml"
    sources:
      - label: "Hooks"
        url: "https://developers.openai.com/codex/hooks"
      - label: "Enterprise governance"
        url: "https://developers.openai.com/codex/enterprise/governance"

  - name: Plugins
    normalizedFamily: plugins-distribution
    vendorTerms: [plugins, marketplace, plugin manifest, plugin directory]
    scopes: [project-root, user-home]
    interfaces: [app, CLI, IDE extension]
    availability:
      status: current
      claimStrength: explicit
      notes: "Bundles skills, app integrations, hooks, and MCP servers; three marketplace tiers (Curated, Shared, Created); plugin directory in App and CLI; built-in $plugin-creator for scaffolding"
    trustModel: "Packaging layer for reuse; existing approval settings apply; marketplace policy fields control install behavior"
    sources:
      - label: "Plugins"
        url: "https://developers.openai.com/codex/plugins"
      - label: "Build plugins"
        url: "https://developers.openai.com/codex/plugins/build"

  - name: Configuration, Rules, and Requirements
    normalizedFamily: settings-policy
    vendorTerms: [config.toml, requirements.toml, managed configuration, rules, Starlark]
    scopes: [user-home, project-root, subdirectory, machine, cloud-session, organization]
    interfaces: [CLI, IDE extension, app, web]
    availability:
      status: current
      claimStrength: explicit
      notes: "Requirements are admin-enforced and cannot be overridden; Starlark-based rules (experimental) with prefix_rule() and tree-sitter shell parsing; cloud-managed requirements for Business/Enterprise; 4-level feature maturity taxonomy"
    trustModel: "Admin-enforced requirements cannot be overridden; OS-level sandbox (macOS Seatbelt, Linux bwrap+seccomp)"
    sources:
      - label: "Config basics"
        url: "https://developers.openai.com/codex/config-basic"
      - label: "Configuration reference"
        url: "https://developers.openai.com/codex/config-reference"
      - label: "Managed configuration"
        url: "https://developers.openai.com/codex/enterprise/managed-configuration"
---

OpenAI Codex is strongest on nested filesystem scoping and policy-enforced local clients. AGENTS.md walks from global scope down to CWD with override files at each level; requirements.toml provides admin-enforced controls that users cannot override. Skills are the authoring format with six scope tiers; plugins are the installable distribution unit with three marketplace tiers and bundled hooks support.
