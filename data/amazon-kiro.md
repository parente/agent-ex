---
vendor:
  id: amazon-kiro
  name: Amazon Kiro
  interfaces: [IDE, CLI, kiro.dev]

extensions:
  - name: Steering
    normalizedFamily: instructions
    vendorTerms: [steering, steering files, AGENTS.md, team steering, foundational steering, file references]
    scopes: [user-home, project-root, subdirectory, organization]
    interfaces: [IDE, CLI]
    availability:
      status: current
      claimStrength: explicit
      notes: "Supports always, fileMatch, manual, and auto inclusion modes (IDE); AGENTS.md also supported as always-included source; foundational steering files (product.md, tech.md, structure.md) auto-generated via IDE; custom agents require explicit resource inclusion for steering; workspace overrides global on conflict"
    trustModel: "Contextual guidance, not a hard policy layer; inclusion modes control when steering loads; team steering distributed via MDM/Group Policy"
    sources:
      - label: "Steering for IDE"
        url: "https://kiro.dev/docs/steering/"
      - label: "Steering for CLI"
        url: "https://kiro.dev/docs/cli/steering/"

  - name: Prompts
    normalizedFamily: prompts
    vendorTerms: [prompts, reusable prompts, MCP prompts, local prompts, global prompts]
    scopes: [project-root, user-home]
    interfaces: [CLI]
    availability:
      status: current
      claimStrength: explicit
      notes: "CLI feature; local prompts in .kiro/prompts/, global in ~/.kiro/prompts/; MCP prompts from configured servers; invoked with @name; priority: local > global > MCP; /prompts slash command with list, create, edit, details, get, remove subcommands; MCP prompts support arguments, file-based prompts do not"
    trustModel: "Reusable prompt templates with local > global > MCP priority; content previewed before sending to model"
    sources:
      - label: "Manage prompts"
        url: "https://kiro.dev/docs/cli/chat/manage-prompts/"

  - name: Skills
    normalizedFamily: skills
    vendorTerms: [agent skills, SKILL.md, "skill:// URI"]
    scopes: [project-root, user-home]
    interfaces: [IDE, CLI]
    availability:
      status: current
      claimStrength: explicit
      notes: "Auto-activate via progressive disclosure (name+description at startup, full content on demand). IDE supports slash command invocation; CLI activation is automatic only. Workspace takes priority over global on conflicts. Custom agents must explicitly include skills via skill:// URIs. IDE supports importing skills from GitHub repos or local folders."
    trustModel: "Text-only instruction packages that cannot execute code on their own; if agent has write/shell tools enabled, it could execute commands referenced in skills; no isolation between skills"
    sources:
      - label: "Agent Skills for IDE"
        url: "https://kiro.dev/docs/skills/"
      - label: "Agent Skills for CLI"
        url: "https://kiro.dev/docs/cli/skills/"

  - name: MCP Servers
    normalizedFamily: mcp-tools
    vendorTerms: [MCP servers, mcp.json, MCP tools, MCP prompts, MCP resource templates, MCP elicitation, autoApprove, disabledTools, MCP registry]
    scopes: [user-home, project-root, organization]
    interfaces: [IDE, CLI]
    availability:
      status: current
      claimStrength: explicit
      notes: "IDE and CLI merge workspace and user MCP configs with workspace precedence. CLI adds a third tier: agent config > workspace > global. IDE supports MCP prompts, resource templates, and elicitation. CLI supports OAuth authentication with mid-session token refresh. Enterprise admins can enforce allow-lists via MCP registry URL (fetched at startup and every 24h). Curated server directory with 30+ servers and one-click install."
    trustModel: "Tool approval required per-use; autoApprove array or wildcard bypasses approval; disabledTools blocks specific tools; IDE approved environment variables whitelist; enterprise MCP registry allow-list with client-side enforcement"
    sources:
      - label: "Model context protocol"
        url: "https://kiro.dev/docs/mcp/"
      - label: "MCP configuration"
        url: "https://kiro.dev/docs/mcp/configuration/"
      - label: "MCP tools usage"
        url: "https://kiro.dev/docs/mcp/usage/"
      - label: "MCP server directory"
        url: "https://kiro.dev/docs/mcp/servers/"
      - label: "CLI MCP overview"
        url: "https://kiro.dev/docs/cli/mcp/"
      - label: "CLI MCP configuration"
        url: "https://kiro.dev/docs/cli/mcp/configuration/"
      - label: "Enterprise MCP governance"
        url: "https://kiro.dev/docs/enterprise/governance/mcp/"

  - name: Custom Agents and Subagents
    normalizedFamily: agents
    vendorTerms: [custom agents, subagents, agent configuration, plan agent, agent permissions, task dependencies, toolAliases, allowedTools, knowledgeBase resources]
    scopes: [project-root, user-home]
    interfaces: [IDE, CLI]
    availability:
      status: current
      claimStrength: explicit
      notes: "CLI custom agents are JSON config files with extensive configuration: prompt (inline or file URI), tools, allowedTools (glob patterns), toolAliases, toolsSettings, resources (file, skill, knowledgeBase with semantic search), hooks (5 trigger types), mcpServers (with OAuth), model override. IDE subagents are Markdown files with YAML frontmatter. Two built-in IDE subagents (context gathering, general purpose). Built-in Plan agent (CLI, read-only). CLI subagents support DAG-based task dependencies, per-subagent permission control, and dedicated execution monitor. ACP support enables CLI agents in JetBrains and Zed."
    trustModel: "Agents default to read-only; write tools require explicit opt-in; allowedTools with globs controls approval-free tools; trustedAgents and agentPermissions provide layered permission control; preToolUse hooks can audit/block; IDE subagents: steering and MCP work, Specs and Hooks do not"
    sources:
      - label: "Creating custom agents for CLI"
        url: "https://kiro.dev/docs/cli/custom-agents/creating/"
      - label: "Agent configuration reference"
        url: "https://kiro.dev/docs/cli/custom-agents/configuration-reference/"
      - label: "Subagents for IDE"
        url: "https://kiro.dev/docs/chat/subagents/"
      - label: "Subagents for CLI"
        url: "https://kiro.dev/docs/cli/chat/subagents/"
      - label: "Planning agent"
        url: "https://kiro.dev/docs/cli/chat/planning-agent/"
      - label: "Agent Client Protocol"
        url: "https://kiro.dev/docs/cli/acp/"

  - name: Hooks
    normalizedFamily: hooks
    vendorTerms: [hooks, agent hooks, Ask Kiro, Run Command, Agent Prompt, Shell Command]
    scopes: [project-root, user-home]
    interfaces: [IDE, CLI]
    availability:
      status: current
      claimStrength: explicit
      notes: "IDE hooks support 10 trigger types (Prompt Submit, Agent Stop, Pre/Post Tool Use, File Create/Save/Delete, Pre/Post Task Execution, Manual Trigger) with two action types (Ask Kiro agent prompt, Run Command shell). CLI hooks support 5 types (AgentSpawn, UserPromptSubmit, PreToolUse, PostToolUse, Stop) defined in agent configuration with JSON STDIN events, tool matching, caching, and exit-code-based flow control (exit 2 blocks PreToolUse). Default timeout: 60s IDE, 30s CLI."
    trustModel: "Deterministic automation; IDE hooks can Ask Kiro (agent prompt) or Run Command (shell); CLI hooks fire on lifecycle events with structured JSON input; exit code semantics differ between surfaces"
    sources:
      - label: "Hooks for IDE"
        url: "https://kiro.dev/docs/hooks/"
      - label: "Hooks for CLI"
        url: "https://kiro.dev/docs/cli/hooks/"
      - label: "Hook actions"
        url: "https://kiro.dev/docs/hooks/actions/"
      - label: "Hook types"
        url: "https://kiro.dev/docs/hooks/types/"
      - label: "Hook examples"
        url: "https://kiro.dev/docs/hooks/examples/"

  - name: Powers
    normalizedFamily: plugins-distribution
    vendorTerms: [powers, POWER.md, mcp.json, "steering/", keywords, dynamic MCP tool loading]
    scopes: [user-home, project-root]
    interfaces: [IDE, kiro.dev]
    availability:
      status: current
      claimStrength: explicit
      notes: "IDE-only; CLI support planned. 40+ curated and community powers available via kiro.dev marketplace and GitHub. Powers register in ~/.kiro/settings/mcp.json (user scope) with workspace-level steering/hooks. Cross-tool compatibility (Cursor, Claude Code, Cline) planned. Install from kiro.dev, IDE powers panel, or GitHub URL."
    trustModel: "Third-party powers explicitly disclaimed (not tested or screened across all use cases); MCP servers auto-register on install; environment variables for secrets; no sandboxing or permission model mentioned"
    sources:
      - label: "Powers docs"
        url: "https://kiro.dev/docs/powers/"
      - label: "Install powers"
        url: "https://kiro.dev/docs/powers/installation/"
      - label: "Create powers"
        url: "https://kiro.dev/docs/powers/create/"
      - label: "Powers landing page"
        url: "https://kiro.dev/powers/"

  - name: IDE Extensions and Extension Registry
    normalizedFamily: settings-policy
    vendorTerms: [IDE extensions, OpenVSX, extension registry, product.json]
    scopes: [machine, organization]
    interfaces: [IDE]
    availability:
      status: current
      claimStrength: explicit
      notes: "Admins can point Kiro to a private registry by editing product.json; deployable via MDM/endpoint management"
    trustModel: "Standard IDE extension trust with an explicit governance hook for curated registries"
    sources:
      - label: "Custom extension registry"
        url: "https://kiro.dev/docs/editor/extension-registry/"

  - name: Enterprise Governance and CLI Configuration
    normalizedFamily: settings-policy
    vendorTerms: [Kiro Profile, admin settings, Kiro console, .kiroignore, kiroAgent.agentIgnoreFiles, content exclusion, MCP registry, MCP allow-list, MCP governance, model governance, web tools governance, API key governance, "/tools", tool permissions, trust levels, cli.json]
    scopes: [organization, user-home, project-root]
    interfaces: [IDE, CLI]
    availability:
      status: current
      claimStrength: explicit
      notes: "Enterprise admin toggles via Kiro Profile control encryption, code references, dashboards, prompt logging, MCP on/off, web tools on/off, overages, model allow-lists, and API key generation. MCP governance via registry allow-list (JSON over HTTPS, 24h sync, MCP Registry open standard). Model governance restricts available models (important for data residency). Content exclusion via .kiroignore (gitignore syntax, workspace and global scopes). CLI tool permissions via /tools command with tiered shell/path trust (session-scoped). CLI three-tier config: Global > Project > Agent."
    trustModel: "Admin-controlled via AWS console with client-side enforcement; MCP registry parameters are read-only; .kiroignore blocks files from agent context; CLI tool permissions default to read-trusted with per-request approval for writes/shell"
    sources:
      - label: "Enterprise settings"
        url: "https://kiro.dev/docs/enterprise/settings/"
      - label: "Enterprise MCP governance"
        url: "https://kiro.dev/docs/enterprise/governance/mcp/"
      - label: "Model governance"
        url: "https://kiro.dev/docs/enterprise/governance/model/"
      - label: "Web tools governance"
        url: "https://kiro.dev/docs/enterprise/governance/web-tools/"
      - label: "API key governance"
        url: "https://kiro.dev/docs/enterprise/governance/api-keys/"
      - label: "Kiroignore"
        url: "https://kiro.dev/docs/editor/kiroignore/"
      - label: "CLI permissions"
        url: "https://kiro.dev/docs/cli/chat/permissions/"
      - label: "CLI configuration"
        url: "https://kiro.dev/docs/cli/chat/configuration/"
---

Amazon Kiro is strongest on workspace-centric IDE automation, bundled "powers," and enterprise governance. Steering supports four inclusion modes: always (default), fileMatch (conditional on file patterns), manual (on-demand via #name or slash commands), and auto (description-matched). Kiro also supports AGENTS.md as an always-included steering source. Team steering can be distributed via MDM or Group Policy. Powers are a first-class concept bundling POWER.md, MCP server configuration, and optional steering/hooks into a single install with contextual activation. In multi-root workspaces, Kiro collects hooks and MCP definitions from each root folder. Enterprise governance includes MCP registry allow-lists, model governance, web tools governance, API key governance, and centralized admin settings via Kiro Profile. CLI custom agents support extensive configuration including knowledgeBase resources with semantic search, DAG-based task dependencies for subagents, and ACP for cross-editor compatibility.
