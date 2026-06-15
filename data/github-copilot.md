---
vendor:
  id: github-copilot
  name: GitHub Copilot
  interfaces: [GitHub.com, VS Code, Visual Studio, JetBrains, Eclipse, Xcode, CLI, Copilot SDK, Copilot app]

extensions:
  - name: Custom Instructions
    normalizedFamily: instructions
    vendorTerms: [custom instructions, repository instructions, organization instructions, AGENTS.md, CLAUDE.md, GEMINI.md, Copilot Memory]
    scopes: [user-home, project-root, subdirectory, organization]
    interfaces: [GitHub.com, VS Code, Visual Studio, JetBrains, Eclipse, Xcode, CLI, Copilot SDK]
    availability:
      status: current
      claimStrength: explicit
      notes: "Five instruction types (personal, repo, path-specific, agent, org) with precedence-based concatenation; Copilot Memory (public preview) stores repo-level facts and user preferences with 28-day auto-expiry"
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
    vendorTerms: [agent skills, SKILL.md, .agents/skills, gh skill, awesome-copilot]
    scopes: [project-root, user-home]
    interfaces: [GitHub.com, VS Code, JetBrains, CLI, Copilot SDK, Copilot app]
    availability:
      status: current
      claimStrength: explicit
      notes: "Based on open Agent Skills standard (agentskills.io); cross-tool compatible paths (.github/skills, .claude/skills, .agents/skills); gh skill CLI for discovery/install; github/awesome-copilot community collection; org/enterprise skills coming soon"
    trustModel: "Reusable workflows loaded on demand when relevant; allowed-tools frontmatter pre-approves tool usage"
    sources:
      - label: "About agent skills"
        url: "https://docs.github.com/en/copilot/concepts/agents/about-agent-skills"
      - label: "Add skills (CLI)"
        url: "https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-skills"

  - name: Prompt Files
    normalizedFamily: prompts
    vendorTerms: [prompt files, reusable prompts, slash commands]
    scopes: [project-root, user-home]
    interfaces: [VS Code, Visual Studio, JetBrains]
    availability:
      status: public preview
      claimStrength: explicit
      notes: "IDE-only; YAML frontmatter specifies agent mode, model, tools, and custom agent name; /create-prompt generates prompts from descriptions; user-level prompts sync via Settings Sync"
    trustModel: "Reusable prompt templates invoked manually; not auto-loaded"
    sources:
      - label: "Prompt files"
        url: "https://docs.github.com/en/copilot/tutorials/customization-library/prompt-files"
      - label: "VS Code prompt files"
        url: "https://code.visualstudio.com/docs/copilot/customization/prompt-files"

  - name: MCP Servers
    normalizedFamily: mcp-tools
    vendorTerms: [MCP servers, GitHub MCP server, MCP Registry, MCP allowlist, toolsets]
    scopes: [machine, project-root, organization]
    interfaces: [GitHub.com, VS Code, Visual Studio, JetBrains, Eclipse, Xcode, CLI, Copilot SDK, Copilot app]
    availability:
      status: current
      claimStrength: explicit
      notes: "Available on all surfaces regardless of plan; GitHub MCP Registry in public preview; remote MCP servers without local setup; toolset customization for GitHub API capabilities; Copilot app (technical preview) supports repo-level MCP; enterprise allowlist policy disabled by default for Business/Enterprise"
    trustModel: "Tool calls subject to OAuth/PAT auth and allowlist enforcement; enterprise policies override org policies; push protection blocks secrets in AI-generated responses"
    sources:
      - label: "About MCP"
        url: "https://docs.github.com/en/copilot/concepts/context/mcp"
      - label: "Configure MCP registry"
        url: "https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-mcp-usage/configure-mcp-registry"
      - label: "MCP allowlist enforcement"
        url: "https://docs.github.com/en/copilot/reference/mcp-allowlist-enforcement"

  - name: Custom Agents
    normalizedFamily: agents
    vendorTerms: [custom agents, agent profiles, .agent.md, Autopilot, Fleet, agent apps]
    scopes: [user-home, project-root, organization]
    interfaces: [GitHub.com, VS Code, Visual Studio, JetBrains, Eclipse, Xcode, CLI, Copilot SDK, Copilot app]
    availability:
      status: current
      claimStrength: explicit
      notes: "Markdown agent profiles with YAML frontmatter at repo/org/enterprise levels; JetBrains/Eclipse/Xcode in public preview; CLI adds Autopilot (autonomous), Fleet (parallel execution), and Chronicle (session persistence); Copilot SDK provides full programmatic agent loop with OpenTelemetry observability"
    trustModel: "Isolated persona with its own instructions, tool restrictions, and context; enterprise agents override org agents"
    sources:
      - label: "About custom agents"
        url: "https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents"
      - label: "Custom agents configuration"
        url: "https://docs.github.com/en/copilot/reference/custom-agents-configuration"
      - label: "Enterprise management"
        url: "https://docs.github.com/en/copilot/concepts/agents/enterprise-management"

  - name: Hooks
    normalizedFamily: hooks
    vendorTerms: [hooks, lifecycle interceptors]
    scopes: [project-root, user-home]
    interfaces: [GitHub.com, VS Code, CLI, Copilot SDK]
    availability:
      status: current
      claimStrength: explicit
      notes: "8 hook types including preToolUse (can deny), postToolUse, agentStop, subagentStop, errorOccurred; SDK exposes hooks programmatically via native language callbacks"
    trustModel: "Deterministic scripts that run synchronously on lifecycle events; can block tool use"
    sources:
      - label: "About hooks"
        url: "https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-hooks"
      - label: "Hooks configuration"
        url: "https://docs.github.com/en/copilot/reference/hooks-configuration"
      - label: "SDK hooks quickstart"
        url: "https://docs.github.com/en/copilot/how-tos/copilot-sdk/use-hooks/quickstart"

  - name: Policies, Settings, and Content Exclusion
    normalizedFamily: settings-policy
    vendorTerms: [policies, content exclusion, MCP allowlist, BYOK, Copilot Memory policy, agentic audit logs]
    scopes: [user-home, organization, machine]
    interfaces: [GitHub.com, VS Code, Visual Studio, JetBrains, Eclipse, Xcode, CLI]
    availability:
      status: current
      claimStrength: explicit
      notes: "Three policy types (feature, privacy, model); granular org selection for cloud agent; MCP management as separate policy; agentic audit log events and activity monitoring; content exclusion does not apply to CLI or Agent mode"
    trustModel: "Admin-defined policies that lower tiers cannot override; MCP allowlists restrict permitted servers; block agentic features control"
    sources:
      - label: "Copilot policies"
        url: "https://docs.github.com/en/copilot/concepts/policies"
      - label: "Content exclusion"
        url: "https://docs.github.com/en/copilot/how-tos/configure-content-exclusion/exclude-content-from-copilot"
      - label: "Agentic audit log events"
        url: "https://docs.github.com/en/copilot/reference/agentic-audit-log-events"

  - name: CLI Plugins
    normalizedFamily: plugins-distribution
    vendorTerms: [CLI plugins, marketplace, plugin.json, enterprise plugin standards]
    scopes: [project-root, user-home, organization]
    interfaces: [CLI]
    availability:
      status: current
      claimStrength: explicit
      notes: "CLI only; bundles agents, skills, hooks, MCP, and LSP configs; 4 default marketplaces; enterprise plugin standards for governance with auto-installed plugins"
    trustModel: "Packaging layer for reuse and team standardization; enterprise admins define required marketplaces and auto-installed plugins"
    sources:
      - label: "About CLI plugins"
        url: "https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-cli-plugins"
      - label: "Enterprise plugin standards"
        url: "https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-enterprise-plugin-standards"
      - label: "CLI plugin reference"
        url: "https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-plugin-reference"
---

GitHub Copilot is strongest on repo, org, and enterprise sharing across GitHub surfaces. The Copilot app (technical preview) adds a standalone agent interface alongside the SDK's full programmatic access with agent loops, hooks, and OpenTelemetry observability. CLI plugins are the distribution unit with enterprise plugin standards for governance, and Autopilot/Fleet modes enable autonomous and parallel task execution.
