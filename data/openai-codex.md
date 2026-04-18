---
vendor:
  id: openai-codex
  name: OpenAI Codex
  interfaces: [CLI, IDE extension, app, web]

extensions:
  - name: AGENTS.md Instructions
    normalizedFamily: instructions
    vendorTerms: [AGENTS.md, AGENTS.override.md, custom instructions]
    scopes: [user-home, project-root, subdirectory]
    interfaces: [CLI, IDE extension]
    availability:
      status: current
      claimStrength: explicit
      notes: "Explicit for local scopes; strongly implied for CLI-plus-IDE reuse; unspecified for web"
    trustModel: "Prompt-time guidance loaded at run start; more specific files override by concatenation order rather than hard policy"
    sources:
      - label: "Customization"
        url: "https://developers.openai.com/codex/concepts/customization"
      - label: "Custom instructions with AGENTS.md"
        url: "https://developers.openai.com/codex/guides/agents-md"

  - name: Memories
    normalizedFamily: instructions
    vendorTerms: [memories, learned context]
    scopes: [project-root, user-home]
    interfaces: [CLI, IDE extension, app]
    availability:
      status: current
      claimStrength: explicit
      notes: "Useful context learned from prior work; complements AGENTS.md"
    trustModel: "Context carried forward from prior sessions; not user-authored instructions but agent-learned knowledge"
    sources:
      - label: "Memories"
        url: "https://developers.openai.com/codex/memories"
      - label: "Customization"
        url: "https://developers.openai.com/codex/concepts/customization"

  - name: Skills
    normalizedFamily: skills
    vendorTerms: [agent skills, SKILL.md, skill folders]
    scopes: [subdirectory, project-root, user-home, machine]
    interfaces: [CLI, IDE extension, app]
    availability:
      status: current
      claimStrength: explicit
      notes: "Progressive disclosure; metadata loaded at start, full content on selection"
    trustModel: "Reusable workflows and domain expertise; skills are the authoring format, plugins are the distribution unit"
    sources:
      - label: "Agent Skills"
        url: "https://developers.openai.com/codex/skills"

  - name: Custom Prompts (deprecated)
    normalizedFamily: prompts
    vendorTerms: [custom prompts, slash commands, reusable prompts]
    scopes: [user-home]
    interfaces: [CLI, IDE extension]
    availability:
      status: current
      claimStrength: explicit
      notes: "Deprecated in favor of skills; markdown files in ~/.codex/prompts/ invoked as /prompts:name"
    trustModel: "User-local reusable prompt templates with argument placeholders; not shared through repositories"
    sources:
      - label: "Custom Prompts (deprecated)"
        url: "https://developers.openai.com/codex/custom-prompts"

  - name: MCP Servers
    normalizedFamily: mcp-tools
    vendorTerms: [MCP servers, STDIO transport, streamable HTTP transport]
    scopes: [user-home, project-root, subdirectory]
    interfaces: [CLI, IDE extension]
    availability:
      status: current
      claimStrength: explicit
      notes: "CLI and IDE extension share the same MCP configuration"
    trustModel: "External tools and data sources made available as MCP tools with auth and transport-specific controls"
    sources:
      - label: "Model Context Protocol"
        url: "https://developers.openai.com/codex/mcp"

  - name: Subagents
    normalizedFamily: agents
    vendorTerms: [subagents, parallel delegated workflows]
    scopes: [cloud-session]
    interfaces: [app, CLI]
    availability:
      status: current
      claimStrength: explicit
      notes: "Enabled by default in current releases; IDE visibility coming soon"
    trustModel: "Codex only spawns subagents when explicitly asked; each subagent has its own context and tool work, increasing token use but isolating context"
    sources:
      - label: "Subagents"
        url: "https://developers.openai.com/codex/subagents"

  - name: Hooks
    normalizedFamily: hooks
    vendorTerms: [hooks, lifecycle scripts, hooks.json]
    scopes: [user-home, project-root]
    interfaces: [CLI, IDE extension]
    availability:
      status: experimental
      claimStrength: explicit
      notes: "Experimental, explicitly stated; Windows support temporarily disabled"
    trustModel: "Deterministic scripts in the agent loop, not merely prompt instructions"
    sources:
      - label: "Hooks"
        url: "https://developers.openai.com/codex/hooks"

  - name: Plugins
    normalizedFamily: plugins-distribution
    vendorTerms: [plugins, installable distribution unit, marketplace]
    scopes: [project-root, user-home]
    interfaces: [app, CLI]
    availability:
      status: current
      claimStrength: explicit
      notes: "Plugins are the installable distribution unit; skills are the authoring format"
    trustModel: "Plugin use inherits approval settings; may require separate app authentication; may bundle MCP setup or third-party app terms"
    sources:
      - label: "Plugins"
        url: "https://developers.openai.com/codex/plugins"
      - label: "Build plugins"
        url: "https://developers.openai.com/codex/plugins/build"

  - name: Configuration, Rules, and Requirements
    normalizedFamily: settings-policy
    vendorTerms: [config.toml, requirements.toml, managed configuration, rules, .rules files]
    scopes: [user-home, project-root, subdirectory, machine, cloud-session]
    interfaces: [CLI, IDE extension, app]
    availability:
      status: current
      claimStrength: explicit
      notes: "Config and requirements are current; Rules (command execution policies in .codex/rules/) are experimental"
    trustModel: "Strongest formal control layer; governs approvals, sandbox modes, and feature flags; admin-enforced requirements cannot be overridden; rules control which commands can escape the sandbox"
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
---

OpenAI Codex is strongest on nested filesystem scoping and policy-enforced local clients. It builds an instruction chain from global scope in `~/.codex` down to the current working directory, supporting `AGENTS.override.md`, nested directory overrides, and load-order precedence. Memories carry useful context forward from prior work. Rules are a separate experimental concept controlling which commands can escape the sandbox using Starlark-based `.rules` files. Configuration and requirements form the strongest formal control layer, with admin-enforced `requirements.toml` that users cannot override. Skills are the authoring format; plugins are the installable distribution unit.
