---
vendor:
  id: github-copilot
  name: GitHub Copilot
  interfaces: [GitHub.com, VS Code, Visual Studio, JetBrains, Eclipse, Xcode, CLI, Copilot SDK]

extensions:
  - name: Custom Instructions
    normalizedFamily: instructions
    vendorTerms: [custom instructions, personal instructions, repository instructions, path-specific instructions, organization instructions, agent instructions, AGENTS.md, CLAUDE.md, GEMINI.md, workspace instructions, Copilot Memory, agentic memory]
    scopes: [user-home, project-root, subdirectory, organization]
    interfaces: [GitHub.com, VS Code, Visual Studio, JetBrains, Eclipse, Xcode, CLI, Copilot SDK]
    availability:
      status: current
      claimStrength: explicit
      notes: "VS Code and Visual Studio fully supported; JetBrains, Eclipse, Xcode in preview; GitHub.com and CLI supported; precedence order: Personal > Path-specific > Repository-wide > Agent > Organization; organization instructions only on GitHub.com; Copilot Memory (public preview) provides cross-agent agentic memory that auto-expires after 28 days — off by default for enterprise/org, on for individual plans"
    trustModel: "Always-on context additions, not hard policy guards; precedence-based concatenation with more specific files overriding broader ones; Copilot Memory complements instructions with persistent cross-agent context"
    sources:
      - label: "Support for different types of custom instructions"
        url: "https://docs.github.com/en/copilot/reference/custom-instructions-support"
      - label: "Copilot customization cheat sheet"
        url: "https://docs.github.com/en/copilot/reference/customization-cheat-sheet"
      - label: "About customizing GitHub Copilot responses"
        url: "https://docs.github.com/en/copilot/concepts/prompting/response-customization"
      - label: "Copilot Memory"
        url: "https://docs.github.com/en/copilot/concepts/agents/copilot-memory"

  - name: Agent Skills
    normalizedFamily: skills
    vendorTerms: [agent skills, skill folders, SKILL.md, allowed-tools, open standard, .agents/skills]
    scopes: [project-root, user-home]
    interfaces: [GitHub.com, VS Code, JetBrains, CLI, Copilot SDK]
    availability:
      status: current
      claimStrength: explicit
      notes: "VS Code GA since 1.108.0; JetBrains in preview since 1.5.64; GitHub.com, CLI, and SDK (public preview) supported; org/enterprise scopes coming soon; based on open Agent Skills standard (agentskills.io); cross-tool compatible paths (.github/skills, .claude/skills, .agents/skills)"
    trustModel: "Loaded when relevant to specialized tasks rather than continuously; can include scripts and resources; allowed-tools frontmatter pre-approves tool usage"
    sources:
      - label: "About agent skills"
        url: "https://docs.github.com/en/copilot/concepts/agents/about-agent-skills"
      - label: "Copilot customization cheat sheet"
        url: "https://docs.github.com/en/copilot/reference/customization-cheat-sheet"
      - label: "Add skills to Copilot CLI"
        url: "https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-skills"
      - label: "Add skills to cloud agent"
        url: "https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/add-skills"
      - label: "SDK custom skills"
        url: "https://docs.github.com/en/copilot/how-tos/copilot-sdk/use-copilot-sdk/custom-skills"

  - name: Prompt Files
    normalizedFamily: prompts
    vendorTerms: [prompt files, reusable prompt templates, slash commands, Chat Customizations editor]
    scopes: [project-root, user-home]
    interfaces: [VS Code, Visual Studio, JetBrains, Xcode]
    availability:
      status: current
      claimStrength: explicit
      notes: "VS Code (GA since 1.108.0) and Visual Studio (GA since 18.0.0) fully supported; JetBrains and Xcode in preview; not supported on GitHub.com, Eclipse, or CLI; user-level prompt files synced via VS Code Settings Sync; AI-assisted prompt generation via /create-prompt command"
    trustModel: "Manual, reusable prompt templates with variables and YAML frontmatter; can specify agent mode, model, and tool restrictions per prompt"
    sources:
      - label: "Prompt files"
        url: "https://docs.github.com/en/copilot/tutorials/customization-library/prompt-files"
      - label: "About customizing GitHub Copilot responses"
        url: "https://docs.github.com/en/copilot/concepts/prompting/response-customization?tool=vscode"
      - label: "VS Code prompt files documentation"
        url: "https://code.visualstudio.com/docs/copilot/customization/prompt-files"

  - name: MCP Servers
    normalizedFamily: mcp-tools
    vendorTerms: [GitHub MCP server, GitHub MCP Registry, MCP servers, MCP toolsets, MCP allowlist, enterprise MCP configuration]
    scopes: [machine, project-root, organization]
    interfaces: [GitHub.com, VS Code, Visual Studio, JetBrains, Eclipse, Xcode, CLI, Copilot SDK]
    availability:
      status: current
      claimStrength: explicit
      notes: "Available to all GitHub users regardless of plan; all major IDEs fully supported; GitHub MCP Registry in public preview; org/enterprise can restrict via MCP allowlist policy; toolset customization supported; GitHub MCP server built into CLI; cloud agent has GitHub MCP server and Playwright MCP server by default; cloud agent integrates with Jira, Slack, Teams, Linear, and Azure Boards via MCP; enterprise MCP Server configuration supports GHES and GHEC with data residency"
    trustModel: "MCP exposes tools and API capabilities subject to OAuth/PAT auth, push protection for secrets, and MCP allowlist enforcement (name/ID matching); enterprise policies override org policies; Registry only mode restricts to approved servers"
    sources:
      - label: "About Model Context Protocol"
        url: "https://docs.github.com/en/copilot/concepts/context/mcp"
      - label: "Setting up the GitHub MCP Server"
        url: "https://docs.github.com/en/copilot/how-tos/provide-context/use-mcp-in-your-ide/set-up-the-github-mcp-server"
      - label: "Using the GitHub MCP Server in your IDE"
        url: "https://docs.github.com/en/copilot/how-tos/provide-context/use-mcp-in-your-ide/use-the-github-mcp-server"
      - label: "Configure MCP registry"
        url: "https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-mcp-usage/configure-mcp-registry"
      - label: "Configure MCP server access"
        url: "https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-mcp-usage/configure-mcp-server-access"
      - label: "Extend Copilot Chat with MCP"
        url: "https://docs.github.com/en/copilot/how-tos/provide-context/use-mcp-in-your-ide/extend-copilot-chat-with-mcp"
      - label: "Add MCP servers to CLI"
        url: "https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-mcp-servers"
      - label: "Enterprise MCP Server configuration"
        url: "https://docs.github.com/en/copilot/how-tos/provide-context/use-mcp-in-your-ide/enterprise-configuration"
      - label: "Configure MCP toolsets"
        url: "https://docs.github.com/en/copilot/how-tos/provide-context/use-mcp-in-your-ide/configure-toolsets"

  - name: Custom Agents
    normalizedFamily: agents
    vendorTerms: [custom agents, agent profiles, .agent.md files, Copilot cloud agent, Copilot CLI agents]
    scopes: [user-home, project-root, organization]
    interfaces: [GitHub.com, VS Code, Visual Studio, JetBrains, Eclipse, Xcode, CLI]
    availability:
      status: current
      claimStrength: explicit
      notes: "VS Code and Eclipse fully supported; Visual Studio in preview since 18.0.0; JetBrains and Xcode in public preview; GitHub.com and CLI supported; enterprise-level agents via .github-private repo; agent-to-agent delegation via agent tool alias"
    trustModel: "Specialist persona with its own instructions, tool restrictions, and context; can spin up subagents; enterprise agents override org agents"
    sources:
      - label: "Creating custom agents for Copilot cloud agent"
        url: "https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/create-custom-agents"
      - label: "Creating custom agents for GitHub Copilot CLI"
        url: "https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/create-custom-agents-for-cli"
      - label: "About custom agents"
        url: "https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents"
      - label: "Custom agents configuration reference"
        url: "https://docs.github.com/en/copilot/reference/custom-agents-configuration"

  - name: Subagents
    normalizedFamily: agents
    vendorTerms: [subagents, delegated work, isolated context, temporary agent]
    scopes: [cloud-session]
    interfaces: [VS Code, JetBrains, Eclipse, Xcode, CLI]
    availability:
      status: current
      claimStrength: explicit
      notes: "VS Code and CLI supported; JetBrains, Eclipse, Xcode in preview; not on GitHub.com per cheat sheet; work performed by custom agents is carried out using subagents"
    trustModel: "Separate agent spawned by the main agent to handle delegated work in an isolated context window"
    sources:
      - label: "Copilot customization cheat sheet"
        url: "https://docs.github.com/en/copilot/reference/customization-cheat-sheet"

  - name: Hooks
    normalizedFamily: hooks
    vendorTerms: [hooks, lifecycle interceptors, shell commands, JSON-RPC hooks]
    scopes: [project-root]
    interfaces: [GitHub.com, VS Code, CLI, Copilot SDK]
    availability:
      status: current
      claimStrength: explicit
      notes: "GitHub.com and CLI fully supported; VS Code in preview; SDK exposes hooks programmatically via JSON-RPC; 8 hook types: sessionStart, sessionEnd, userPromptSubmitted, preToolUse, postToolUse, agentStop, subagentStop, errorOccurred; only preToolUse can deny tool executions"
    trustModel: "Deterministic lifecycle interceptors that run synchronously and block agent execution; scripts run with repo-level permissions; receive JSON via stdin; default timeout 30s"
    sources:
      - label: "About hooks"
        url: "https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-hooks"
      - label: "Using hooks with GitHub Copilot CLI"
        url: "https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/use-hooks"
      - label: "Hooks configuration reference"
        url: "https://docs.github.com/en/copilot/reference/hooks-configuration"
      - label: "Using hooks with cloud agent"
        url: "https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/use-hooks"
      - label: "SDK hooks quickstart"
        url: "https://docs.github.com/en/copilot/how-tos/copilot-sdk/use-hooks/quickstart"

  - name: Policies, Settings, and Content Exclusion
    normalizedFamily: settings-policy
    vendorTerms: [policies, feature policies, privacy policies, model policies, AI controls, MCP management, MCP registry, MCP allowlist, content exclusion, IDE settings, policy conflicts, Copilot allowlist, agentic audit log events, agent session filters, BYOK, FedRAMP models, base and LTS models, Copilot Memory policy]
    scopes: [user-home, organization, machine]
    interfaces: [GitHub.com, VS Code, Visual Studio, JetBrains, Eclipse, Xcode, CLI]
    availability:
      status: current
      claimStrength: explicit
      notes: "Enterprise AI controls tab with Agents, Copilot, and MCP sections; three policy types: feature, privacy, and models; content exclusion does NOT apply to Copilot CLI, cloud agent, or Agent mode in IDEs; policy conflict resolution uses least-restrictive for most features, most-restrictive for sensitive ones; agentic audit log events and agent session filters for monitoring; BYOK in preview across most IDEs; Copilot Memory policy-controlled (off by default for enterprise/org); FedRAMP model compliance and base/LTS model selection available"
    trustModel: "Enterprise owners define policies that org owners cannot override; feature, privacy, and model policies control what licensed users can access; MCP allowlists restrict which servers are permitted; content exclusion configurable at repo, org, and enterprise levels"
    sources:
      - label: "Copilot policies"
        url: "https://docs.github.com/en/copilot/concepts/policies"
      - label: "MCP server management"
        url: "https://docs.github.com/en/copilot/concepts/mcp-management"
      - label: "MCP allowlist enforcement"
        url: "https://docs.github.com/en/copilot/reference/mcp-allowlist-enforcement"
      - label: "Managing enterprise policies"
        url: "https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-enterprise-policies"
      - label: "Content exclusion"
        url: "https://docs.github.com/en/copilot/how-tos/configure-content-exclusion/exclude-content-from-copilot"
      - label: "Policy conflicts reference"
        url: "https://docs.github.com/en/copilot/reference/policy-conflicts"
      - label: "Agentic audit log events"
        url: "https://docs.github.com/en/copilot/reference/agentic-audit-log-events"
      - label: "Copilot allowlist reference"
        url: "https://docs.github.com/en/copilot/reference/copilot-allowlist-reference"

  - name: CLI Plugins
    normalizedFamily: plugins-distribution
    vendorTerms: [CLI plugins, LSP servers, installable units, marketplace, plugin.json, marketplace.json, commands, ACP server]
    scopes: [project-root, user-home]
    interfaces: [CLI]
    availability:
      status: current
      claimStrength: explicit
      notes: "CLI only; bundles custom agents, skills, hooks, commands, MCP server configurations, and LSP server configurations; two default marketplaces (copilot-plugins, awesome-copilot); cross-tool compatibility with .claude-plugin/ directory; install from marketplace, GitHub repo, Git URL, or local path; ACP server reference for Agent Communication Protocol integration"
    trustModel: "Packaging layer for reuse and team standardization; agents/skills use first-found-wins precedence (project overrides plugin); MCP servers use last-wins (plugin overrides user config)"
    sources:
      - label: "About plugins for GitHub Copilot CLI"
        url: "https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-cli-plugins"
      - label: "Finding and installing plugins"
        url: "https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/plugins-finding-installing"
      - label: "Creating plugins"
        url: "https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/plugins-creating"
      - label: "Plugin marketplace"
        url: "https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/plugins-marketplace"
      - label: "CLI plugin reference"
        url: "https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-plugin-reference"
      - label: "ACP server reference"
        url: "https://docs.github.com/en/copilot/reference/copilot-cli-reference/acp-server"
---

GitHub Copilot is strongest on repo, org, and enterprise sharing across GitHub surfaces. The customization cheat sheet explicitly lists Custom Instructions, Prompt Files, Custom Agents, Subagents, Agent Skills, Hooks, and MCP with a full surface support matrix. Prompt Files are now GA in VS Code (1.108.0+) and Visual Studio (18.0.0+). Agent Skills reached GA in VS Code 1.108.0 with JetBrains in preview since 1.5.64. Custom agents can be centralized at organization or enterprise level in a `.github-private` repository; Visual Studio now supports custom agents in preview and Eclipse is fully supported. Copilot Memory (public preview) provides cross-agent agentic memory with auto-expiry. CLI plugins are the distribution unit that bundles agents, skills, hooks, commands, MCP, and LSP configurations. MCP is supported on all surfaces with toolset customization, enterprise allowlist enforcement, and cloud agent integrations with Jira, Slack, Teams, Linear, and Azure Boards. The Copilot SDK (public preview) adds programmatic access to skills, MCP, hooks, and custom agents. Enterprise governance now includes agentic audit log events, agent session filters, BYOK, and FedRAMP model compliance.
