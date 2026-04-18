---
vendor:
  id: amazon-kiro
  name: Amazon Kiro
  interfaces: [IDE, CLI, kiro.dev]

extensions:
  - name: Steering
    normalizedFamily: instructions
    vendorTerms: [steering, steering files, AGENTS.md, team steering, foundational steering]
    scopes: [user-home, project-root, subdirectory, organization]
    interfaces: [IDE, CLI]
    availability:
      status: current
      claimStrength: explicit
      notes: "Supports always, fileMatch, manual, and auto inclusion modes; AGENTS.md also supported as always-included source"
    trustModel: "Contextual guidance, not a hard policy layer; inclusion modes control when steering loads"
    sources:
      - label: "Steering for IDE"
        url: "https://kiro.dev/docs/steering/"
      - label: "Steering for CLI"
        url: "https://kiro.dev/docs/cli/steering/"

  - name: Prompts
    normalizedFamily: prompts
    vendorTerms: [prompts, reusable prompts, MCP prompts]
    scopes: [project-root, user-home]
    interfaces: [CLI]
    availability:
      status: current
      claimStrength: explicit
      notes: "CLI feature; local prompts in .kiro/prompts/, global in ~/.kiro/prompts/; MCP prompts from configured servers; invoked with @name"
    trustModel: "Reusable prompt templates with local > global > MCP priority; content previewed before sending to model"
    sources:
      - label: "Manage prompts"
        url: "https://kiro.dev/docs/cli/chat/manage-prompts/"

  - name: Skills
    normalizedFamily: skills
    vendorTerms: [agent skills, SKILL.md]
    scopes: [project-root, user-home]
    interfaces: [IDE, CLI]
    availability:
      status: current
      claimStrength: explicit
      notes: "Auto-activate when relevant or invoked as slash commands; workspace takes priority over global on conflicts"
    trustModel: "Progressive disclosure rather than always-on injection"
    sources:
      - label: "Agent Skills for IDE"
        url: "https://kiro.dev/docs/skills/"
      - label: "Agent Skills for CLI"
        url: "https://kiro.dev/docs/cli/skills/"

  - name: MCP Servers
    normalizedFamily: mcp-tools
    vendorTerms: [MCP servers, mcp.json]
    scopes: [user-home, project-root]
    interfaces: [IDE, CLI]
    availability:
      status: current
      claimStrength: explicit
      notes: "IDE merges workspace and user MCP configs with workspace precedence; multi-root workspaces initialize all servers at startup"
    trustModel: "External-tool integration with command- or HTTP-backed MCP servers; IDE exposes server prompt/resource templates via the # mention system"
    sources:
      - label: "Model context protocol"
        url: "https://kiro.dev/docs/mcp/"
      - label: "MCP configuration"
        url: "https://kiro.dev/docs/mcp/configuration/"
      - label: "Kiro Interface"
        url: "https://kiro.dev/docs/editor/interface/"

  - name: Custom Agents and Subagents
    normalizedFamily: agents
    vendorTerms: [custom agents, subagents, agent configuration]
    scopes: [project-root, user-home]
    interfaces: [IDE, CLI]
    availability:
      status: current
      claimStrength: explicit
      notes: "CLI custom agents are JSON config files; IDE subagents are Markdown files; workspace agents override global on name conflicts"
    trustModel: "Specialist agents can constrain tools and permissions; enabling write tools gives the agent access to modify files under ~/.kiro"
    sources:
      - label: "Creating custom agents for CLI"
        url: "https://kiro.dev/docs/cli/custom-agents/creating/"
      - label: "Agent configuration reference"
        url: "https://kiro.dev/docs/cli/custom-agents/configuration-reference/"
      - label: "Subagents for IDE"
        url: "https://kiro.dev/docs/chat/subagents/"
      - label: "Subagents for CLI"
        url: "https://kiro.dev/docs/cli/chat/subagents/"

  - name: Hooks
    normalizedFamily: hooks
    vendorTerms: [hooks, agent automations, Ask Kiro, Run Command]
    scopes: [project-root, user-home]
    interfaces: [IDE, CLI]
    availability:
      status: current
      claimStrength: explicit
      notes: "IDE hooks triggered by IDE or tool events; CLI hooks defined in agent configuration tied to lifecycle events"
    trustModel: "Deterministic automation; IDE hooks can Ask Kiro (agent prompt) or Run Command (shell); CLI hooks fire on agentSpawn, userPromptSubmit, preToolUse, postToolUse, stop"
    sources:
      - label: "Hooks for IDE"
        url: "https://kiro.dev/docs/hooks/"
      - label: "Hooks for CLI"
        url: "https://kiro.dev/docs/cli/hooks/"
      - label: "Hook actions"
        url: "https://kiro.dev/docs/hooks/actions/"
      - label: "Hook types"
        url: "https://kiro.dev/docs/hooks/types/"

  - name: Powers
    normalizedFamily: plugins-distribution
    vendorTerms: [powers, POWER.md, contextual bundles]
    scopes: []
    interfaces: [IDE, kiro.dev]
    availability:
      status: current
      claimStrength: explicit
      notes: "All Kiro users can access and use powers; on-disk scope unspecified; third-party tools subject to separate terms"
    trustModel: "Contextual bundle activation designed to reduce tool-context overload"
    sources:
      - label: "Powers docs"
        url: "https://kiro.dev/docs/powers/"
      - label: "Install powers"
        url: "https://kiro.dev/docs/powers/installation/"
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
      notes: "Admins can point Kiro to a private registry by editing product.json"
    trustModel: "Standard IDE extension trust with an explicit governance hook for curated registries"
    sources:
      - label: "Custom extension registry"
        url: "https://kiro.dev/docs/editor/extension-registry/"
---

Amazon Kiro is strongest on workspace-centric IDE automation and bundled "powers." Steering supports four inclusion modes: always (default), fileMatch (conditional on file patterns), manual (on-demand via #name or slash commands), and auto (description-matched). Kiro also supports AGENTS.md as an always-included steering source. Team steering can be distributed via MDM or Group Policy. Powers are a first-class concept bundling POWER.md, MCP server configuration, and optional steering/hooks into a single install with contextual activation. In multi-root workspaces, Kiro collects hooks and MCP definitions from each root folder.
