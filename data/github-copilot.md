---
vendor:
  id: github-copilot
  name: GitHub Copilot
  interfaces: [GitHub.com, VS Code, Visual Studio, JetBrains, Eclipse, Xcode, CLI, Copilot SDK]

extensions:
  - name: Custom Instructions
    normalizedFamily: instructions
    vendorTerms: [custom instructions, repository instructions, organization instructions, AGENTS.md, CLAUDE.md, GEMINI.md, Copilot Memory]
    scopes: [user-home, project-root, subdirectory, organization]
    interfaces: [GitHub.com, VS Code, Visual Studio, JetBrains, Eclipse, Xcode, CLI, Copilot SDK]
    availability:
      status: current
      claimStrength: explicit
      notes: "Precedence from personal → path-specific → repo → agent → org; Copilot Memory (public preview) adds cross-agent persistent context with 28-day auto-expiry"
    trustModel: "Contextual guidance with precedence-based concatenation; not enforced policy"
    sources:
      - label: "Custom instructions support"
        url: "https://docs.github.com/en/copilot/reference/custom-instructions-support"
      - label: "Customization cheat sheet"
        url: "https://docs.github.com/en/copilot/reference/customization-cheat-sheet"
      - label: "Copilot Memory"
        url: "https://docs.github.com/en/copilot/concepts/agents/copilot-memory"

  - name: Agent Skills
    normalizedFamily: skills
    vendorTerms: [agent skills, SKILL.md, .agents/skills]
    scopes: [project-root, user-home]
    interfaces: [GitHub.com, VS Code, JetBrains, CLI, Copilot SDK]
    availability:
      status: current
      claimStrength: explicit
      notes: "Based on open Agent Skills standard (agentskills.io); cross-tool compatible paths; allowed-tools frontmatter pre-approves tool usage"
    trustModel: "Reusable workflows loaded on demand when relevant; can include scripts and resources"
    sources:
      - label: "About agent skills"
        url: "https://docs.github.com/en/copilot/concepts/agents/about-agent-skills"
      - label: "Customization cheat sheet"
        url: "https://docs.github.com/en/copilot/reference/customization-cheat-sheet"

  - name: Prompt Files
    normalizedFamily: prompts
    vendorTerms: [prompt files, reusable prompts, slash commands]
    scopes: [project-root, user-home]
    interfaces: [VS Code, Visual Studio, JetBrains]
    availability:
      status: current
      claimStrength: explicit
      notes: "IDE-only; YAML frontmatter can specify agent mode, model, and tool restrictions per prompt; user-level prompts sync via VS Code Settings Sync"
    trustModel: "Reusable prompt templates invoked manually; not auto-loaded"
    sources:
      - label: "Prompt files"
        url: "https://docs.github.com/en/copilot/tutorials/customization-library/prompt-files"
      - label: "VS Code prompt files"
        url: "https://code.visualstudio.com/docs/copilot/customization/prompt-files"

  - name: MCP Servers
    normalizedFamily: mcp-tools
    vendorTerms: [MCP servers, GitHub MCP server, MCP Registry, MCP allowlist]
    scopes: [machine, project-root, organization]
    interfaces: [GitHub.com, VS Code, Visual Studio, JetBrains, Eclipse, Xcode, CLI, Copilot SDK]
    availability:
      status: current
      claimStrength: explicit
      notes: "Available on all surfaces regardless of plan; GitHub MCP Registry in public preview; org/enterprise can restrict via allowlist policy; cloud agent integrates with Jira, Slack, Teams, Linear, and Azure Boards via MCP"
    trustModel: "Tool calls subject to OAuth/PAT auth and allowlist enforcement; enterprise policies override org policies"
    sources:
      - label: "About MCP"
        url: "https://docs.github.com/en/copilot/concepts/context/mcp"
      - label: "Configure MCP registry"
        url: "https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-mcp-usage/configure-mcp-registry"
      - label: "MCP allowlist enforcement"
        url: "https://docs.github.com/en/copilot/reference/mcp-allowlist-enforcement"

  - name: Custom Agents
    normalizedFamily: agents
    vendorTerms: [custom agents, agent profiles, .agent.md]
    scopes: [user-home, project-root, organization]
    interfaces: [GitHub.com, VS Code, Visual Studio, JetBrains, Eclipse, Xcode, CLI]
    availability:
      status: current
      claimStrength: explicit
      notes: "Enterprise-level agents via .github-private repo; agent-to-agent delegation via tool alias; subagents handle delegated work in isolated context"
    trustModel: "Isolated persona with its own instructions, tool restrictions, and context; enterprise agents override org agents"
    sources:
      - label: "About custom agents"
        url: "https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents"
      - label: "Custom agents configuration"
        url: "https://docs.github.com/en/copilot/reference/custom-agents-configuration"

  - name: Hooks
    normalizedFamily: hooks
    vendorTerms: [hooks, lifecycle interceptors]
    scopes: [project-root]
    interfaces: [GitHub.com, VS Code, CLI, Copilot SDK]
    availability:
      status: current
      claimStrength: explicit
      notes: "8 hook types including preToolUse (can deny), postToolUse, sessionStart/End; SDK exposes hooks programmatically via native language callbacks"
    trustModel: "Deterministic scripts that run synchronously on lifecycle events; can block tool use"
    sources:
      - label: "About hooks"
        url: "https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-hooks"
      - label: "Hooks configuration"
        url: "https://docs.github.com/en/copilot/reference/hooks-configuration"

  - name: Policies, Settings, and Content Exclusion
    normalizedFamily: settings-policy
    vendorTerms: [policies, content exclusion, MCP allowlist, BYOK, Copilot Memory policy]
    scopes: [user-home, organization, machine]
    interfaces: [GitHub.com, VS Code, Visual Studio, JetBrains, Eclipse, Xcode, CLI]
    availability:
      status: current
      claimStrength: explicit
      notes: "Three policy types (feature, privacy, model); content exclusion does not apply to CLI, cloud agent, or Agent mode; agentic audit log events for monitoring; BYOK in preview"
    trustModel: "Admin-defined policies that lower tiers cannot override; MCP allowlists restrict permitted servers"
    sources:
      - label: "Copilot policies"
        url: "https://docs.github.com/en/copilot/concepts/policies"
      - label: "Content exclusion"
        url: "https://docs.github.com/en/copilot/how-tos/configure-content-exclusion/exclude-content-from-copilot"
      - label: "Policy conflicts"
        url: "https://docs.github.com/en/copilot/reference/policy-conflicts"

  - name: CLI Plugins
    normalizedFamily: plugins-distribution
    vendorTerms: [CLI plugins, marketplace, plugin.json]
    scopes: [project-root, user-home]
    interfaces: [CLI]
    availability:
      status: current
      claimStrength: explicit
      notes: "CLI only; bundles agents, skills, hooks, commands, MCP, and LSP configs; install from marketplace, GitHub repo, or local path"
    trustModel: "Packaging layer for reuse and team standardization; agents/skills use first-found-wins, MCP uses last-wins precedence"
    sources:
      - label: "About CLI plugins"
        url: "https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-cli-plugins"
      - label: "Creating plugins"
        url: "https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/plugins-creating"
      - label: "CLI plugin reference"
        url: "https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-plugin-reference"
---

GitHub Copilot is strongest on repo, org, and enterprise sharing across GitHub surfaces. CLI plugins are the distribution unit that bundles agents, skills, hooks, and MCP configurations. Enterprise governance includes agentic audit log events, BYOK, and policy-based controls across all surfaces.
