---
vendor:
  id: amazon-kiro
  name: Amazon Kiro
  interfaces: [IDE, CLI, kiro.dev]

extensions:
  - name: Steering
    normalizedFamily: instructions
    vendorTerms: [steering, steering files, AGENTS.md, team steering]
    scopes: [user-home, project-root, subdirectory, organization]
    interfaces: [IDE, CLI]
    availability:
      status: current
      claimStrength: explicit
      notes: "Four inclusion modes (always, fileMatch, manual, auto); AGENTS.md also supported; foundational steering files auto-generated via IDE; team steering distributed via MDM/Group Policy"
    trustModel: "Contextual guidance with inclusion modes controlling when steering loads; not enforced policy"
    sources:
      - label: "Steering for IDE"
        url: "https://kiro.dev/docs/steering/"
      - label: "Steering for CLI"
        url: "https://kiro.dev/docs/cli/steering/"

  - name: Prompts
    normalizedFamily: prompts
    vendorTerms: [prompts, reusable prompts, MCP prompts]
    scopes: [project-root, user-home]
    interfaces: [IDE, CLI]
    availability:
      status: current
      claimStrength: explicit
      notes: "File-based prompts are CLI only; MCP prompts accessible in both CLI and IDE via mention syntax; local > global > MCP priority; invoked with @name"
    trustModel: "Reusable prompt templates invoked manually; content previewed before sending to model"
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
      notes: "Progressive disclosure (name+description at startup, full content on demand); IDE supports slash command invocation and importing from GitHub repos; workspace takes priority over global"
    trustModel: "Reusable instruction packages loaded on demand; can include scripts for deterministic tasks but activation is controlled by the agent"
    sources:
      - label: "Skills for IDE"
        url: "https://kiro.dev/docs/skills/"
      - label: "Skills for CLI"
        url: "https://kiro.dev/docs/cli/skills/"

  - name: MCP Servers
    normalizedFamily: mcp-tools
    vendorTerms: [MCP servers, mcp.json, MCP registry, Add to Kiro badge]
    scopes: [user-home, project-root, organization]
    interfaces: [IDE, CLI]
    availability:
      status: current
      claimStrength: explicit
      notes: "Workspace and user configs merge with workspace precedence; CLI adds agent config as a third tier; curated server directory with 30+ servers and one-click install; enterprise MCP registry allow-list fetched at startup and every 24h"
    trustModel: "Tool calls require per-use approval unless auto-approved; enterprise registry allow-list with client-side enforcement"
    sources:
      - label: "MCP overview"
        url: "https://kiro.dev/docs/mcp/"
      - label: "MCP configuration"
        url: "https://kiro.dev/docs/mcp/configuration/"
      - label: "Enterprise MCP governance"
        url: "https://kiro.dev/docs/enterprise/governance/mcp/"

  - name: Custom Agents and Subagents
    normalizedFamily: agents
    vendorTerms: [custom agents, subagents, plan agent, headless mode]
    scopes: [project-root, user-home]
    interfaces: [IDE, CLI]
    availability:
      status: current
      claimStrength: explicit
      notes: "CLI agents are JSON configs with tools, resources, hooks, and MCP servers; IDE subagents are Markdown with YAML frontmatter; DAG-based task dependencies for CLI subagents; headless mode for CI/CD; autonomous agent (preview) runs asynchronously in sandboxed environments"
    trustModel: "Isolated workers that default to read-only; write tools require explicit opt-in via allowedTools globs"
    sources:
      - label: "Creating custom agents"
        url: "https://kiro.dev/docs/cli/custom-agents/creating/"
      - label: "Agent configuration reference"
        url: "https://kiro.dev/docs/cli/custom-agents/configuration-reference/"
      - label: "Subagents for CLI"
        url: "https://kiro.dev/docs/cli/chat/subagents/"

  - name: Hooks
    normalizedFamily: hooks
    vendorTerms: [hooks, agent hooks]
    scopes: [project-root, user-home]
    interfaces: [IDE, CLI]
    availability:
      status: current
      claimStrength: explicit
      notes: "IDE: 10 trigger types with Ask Kiro and Run Command actions; CLI: 5 types with JSON stdin, tool matching aliases/wildcards, and caching; natural language hook creation in IDE"
    trustModel: "Deterministic scripts that run on lifecycle events; exit code semantics differ between IDE and CLI"
    sources:
      - label: "Hooks for IDE"
        url: "https://kiro.dev/docs/hooks/"
      - label: "Hooks for CLI"
        url: "https://kiro.dev/docs/cli/hooks/"
      - label: "Hook types"
        url: "https://kiro.dev/docs/hooks/types/"

  - name: Powers
    normalizedFamily: plugins-distribution
    vendorTerms: [powers, POWER.md]
    scopes: [user-home, project-root]
    interfaces: [IDE, kiro.dev]
    availability:
      status: current
      claimStrength: explicit
      notes: "IDE only; bundles POWER.md, MCP server config, and optional steering/hooks; 60+ partner and community powers via kiro.dev marketplace; install from kiro.dev, IDE panel, or GitHub URL"
    trustModel: "Packaging layer for IDE distribution; third-party powers explicitly disclaimed; no sandboxing mentioned"
    sources:
      - label: "Powers docs"
        url: "https://kiro.dev/docs/powers/"
      - label: "Create powers"
        url: "https://kiro.dev/docs/powers/create/"
      - label: "Powers marketplace"
        url: "https://kiro.dev/powers/"

  - name: Enterprise Governance and Settings
    normalizedFamily: settings-policy
    vendorTerms: [Kiro Profile, admin settings, .kiroignore, content exclusion, MCP governance, model governance]
    scopes: [organization, user-home, project-root, machine]
    interfaces: [IDE, CLI]
    availability:
      status: current
      claimStrength: explicit
      notes: "Kiro Profile controls encryption, prompt logging, MCP, web tools, model allow-lists, and API key generation; MCP governance via registry allow-list; content exclusion via .kiroignore; CLI tool permissions default to read-trusted with per-request approval for writes; SSO with Okta and Microsoft Entra ID"
    trustModel: "Admin-controlled via AWS console with client-side enforcement; .kiroignore blocks files from agent context"
    sources:
      - label: "Enterprise settings"
        url: "https://kiro.dev/docs/enterprise/settings/"
      - label: "Enterprise governance"
        url: "https://kiro.dev/docs/enterprise/governance/"
      - label: "CLI permissions"
        url: "https://kiro.dev/docs/cli/chat/permissions/"
---

Amazon Kiro is strongest on workspace-centric IDE automation, bundled powers, and enterprise governance. Steering supports four inclusion modes with AGENTS.md compatibility; powers bundle MCP servers, steering, and hooks into a single installable unit. Enterprise governance includes MCP registry allow-lists, model governance, and centralized admin settings via Kiro Profile.
