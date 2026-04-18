---
vendor:
  id: github-copilot
  name: GitHub Copilot
  interfaces: [GitHub.com, VS Code, Visual Studio, JetBrains, Eclipse, Xcode, CLI]

extensions:
  - name: Custom Instructions
    normalizedFamily: instructions
    vendorTerms: [custom instructions, personal instructions, repository instructions, path-specific instructions, organization instructions, AGENTS.md]
    scopes: [user-home, project-root, subdirectory, organization]
    interfaces: [GitHub.com, VS Code, Visual Studio, JetBrains, Eclipse, Xcode, CLI]
    availability:
      status: current
      claimStrength: explicit
      notes: "VS Code and Visual Studio fully supported; JetBrains, Eclipse, Xcode in preview; GitHub.com and CLI supported"
    trustModel: "Always-on context additions, not hard policy guards"
    sources:
      - label: "Support for different types of custom instructions"
        url: "https://docs.github.com/en/copilot/reference/custom-instructions-support"
      - label: "Copilot customization cheat sheet"
        url: "https://docs.github.com/en/copilot/reference/customization-cheat-sheet"

  - name: Agent Skills
    normalizedFamily: skills
    vendorTerms: [agent skills, skill folders, SKILL.md]
    scopes: [project-root, user-home]
    interfaces: [GitHub.com, VS Code, CLI]
    availability:
      status: current
      claimStrength: explicit
      notes: "VS Code, GitHub.com, and CLI supported; JetBrains in preview per cheat sheet"
    trustModel: "Loaded when relevant to specialized tasks rather than continuously; can include scripts and resources"
    sources:
      - label: "About agent skills"
        url: "https://docs.github.com/en/copilot/concepts/agents/about-agent-skills"
      - label: "Copilot customization cheat sheet"
        url: "https://docs.github.com/en/copilot/reference/customization-cheat-sheet"

  - name: Prompt Files
    normalizedFamily: prompts
    vendorTerms: [prompt files, reusable prompt templates]
    scopes: [project-root]
    interfaces: [VS Code, Visual Studio, JetBrains]
    availability:
      status: current
      claimStrength: explicit
      notes: "VS Code and Visual Studio supported; JetBrains in preview; not supported on GitHub.com, Eclipse, Xcode, or CLI"
    trustModel: "Manual, reusable prompt templates with variables; not always-on instructions"
    sources:
      - label: "Prompt files"
        url: "https://docs.github.com/en/copilot/tutorials/customization-library/prompt-files"
      - label: "About customizing GitHub Copilot responses"
        url: "https://docs.github.com/en/copilot/concepts/prompting/response-customization?tool=vscode"

  - name: MCP Servers
    normalizedFamily: mcp-tools
    vendorTerms: [GitHub MCP server, GitHub MCP Registry, MCP servers]
    scopes: [machine, organization]
    interfaces: [GitHub.com, VS Code, Visual Studio, JetBrains, Eclipse, Xcode, CLI]
    availability:
      status: current
      claimStrength: explicit
      notes: "Supported on all surfaces per cheat sheet; GitHub MCP Registry is a curated list of partner and community servers"
    trustModel: "MCP exposes tools and API capabilities subject to OAuth/PAT auth, toolset selection, and organizational policy"
    sources:
      - label: "About Model Context Protocol"
        url: "https://docs.github.com/en/copilot/concepts/context/mcp"
      - label: "Setting up the GitHub MCP Server"
        url: "https://docs.github.com/en/copilot/how-tos/provide-context/use-mcp-in-your-ide/set-up-the-github-mcp-server"
      - label: "Using the GitHub MCP Server in your IDE"
        url: "https://docs.github.com/en/copilot/how-tos/provide-context/use-mcp-in-your-ide/use-the-github-mcp-server"

  - name: Custom Agents
    normalizedFamily: agents
    vendorTerms: [custom agents, agent profiles, Copilot cloud agent, Copilot CLI agents]
    scopes: [user-home, project-root, organization]
    interfaces: [GitHub.com, VS Code, JetBrains, Eclipse, Xcode, CLI]
    availability:
      status: current
      claimStrength: explicit
      notes: "VS Code, GitHub.com, and CLI supported; JetBrains, Eclipse, Xcode in preview per cheat sheet"
    trustModel: "Specialist persona with its own instructions, tool restrictions, and context; can spin up subagents"
    sources:
      - label: "Creating custom agents for Copilot cloud agent"
        url: "https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/create-custom-agents"
      - label: "Creating and using custom agents for GitHub Copilot CLI"
        url: "https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/create-custom-agents-for-cli"

  - name: Subagents
    normalizedFamily: agents
    vendorTerms: [subagents, delegated work, isolated context]
    scopes: [cloud-session]
    interfaces: [VS Code, JetBrains, Eclipse, Xcode, CLI]
    availability:
      status: current
      claimStrength: explicit
      notes: "VS Code and CLI supported; JetBrains, Eclipse, Xcode in preview; not on GitHub.com per cheat sheet"
    trustModel: "Separate agent spawned by the main agent to handle delegated work in an isolated context"
    sources:
      - label: "Copilot customization cheat sheet"
        url: "https://docs.github.com/en/copilot/reference/customization-cheat-sheet"

  - name: Hooks
    normalizedFamily: hooks
    vendorTerms: [hooks, lifecycle interceptors]
    scopes: [project-root]
    interfaces: [GitHub.com, VS Code, CLI]
    availability:
      status: current
      claimStrength: explicit
      notes: "GitHub.com and CLI supported; VS Code in preview per cheat sheet"
    trustModel: "Deterministic lifecycle interceptors that can log, validate, or approve/deny tool executions"
    sources:
      - label: "About hooks"
        url: "https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-hooks"
      - label: "Using hooks with GitHub Copilot CLI"
        url: "https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/use-hooks"

  - name: Policies, Settings, and Content Exclusion
    normalizedFamily: settings-policy
    vendorTerms: [policies, feature policies, privacy policies, model policies, MCP management, MCP registry, MCP allowlist, content exclusion, IDE settings]
    scopes: [user-home, organization, machine]
    interfaces: [GitHub.com, VS Code, Visual Studio, JetBrains, Eclipse, Xcode, CLI]
    availability:
      status: current
      claimStrength: explicit
      notes: "Enterprise policies cascade to orgs; org policies control feature availability for licensed users; MCP registry and allowlist enforcement across all surfaces; content exclusion at org level"
    trustModel: "Enterprise owners define policies that org owners cannot override; feature, privacy, and model policies control what licensed users can access; MCP allowlists restrict which servers are permitted"
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

  - name: CLI Plugins
    normalizedFamily: plugins-distribution
    vendorTerms: [CLI plugins, LSP servers, installable units, marketplace]
    scopes: [project-root, user-home]
    interfaces: [CLI]
    availability:
      status: current
      claimStrength: explicit
      notes: "CLI only; bundles custom agents, skills, hooks, MCP server configurations, and LSP server configurations"
    trustModel: "Packaging layer for reuse and team standardization"
    sources:
      - label: "About plugins for GitHub Copilot CLI"
        url: "https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-cli-plugins"
---

GitHub Copilot is strongest on repo, org, and enterprise sharing across GitHub surfaces. The customization cheat sheet explicitly lists Custom Instructions, Prompt Files, Custom Agents, Subagents, Agent Skills, Hooks, and MCP with a full surface support matrix. Custom agents can be centralized at organization or enterprise level in a `.github-private` repository. CLI plugins are the distribution unit that bundles agents, skills, hooks, MCP, and LSP configurations. MCP is supported on all surfaces.
