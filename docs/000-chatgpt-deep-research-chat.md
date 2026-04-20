I want to build a cheat sheet of extension points supported by the following AI tools:

- GitHub Copilot
- OpenAI Codex
- Amazon Kiro
- Claude Code

I want the cheatsheat to incorporate as best as possible:

- all of the types of extensions supported (custom instructions, skills, mcp servers, prompts, ...),
- the scoping of those extensions possible (local user, one git repo folder, whole git repository, multiple git repositories, ...)
- which agentic interface supports them (CLI, IDE, desktop app, web app, ...)

Render the cheatsheet in a simple, heading based markdown format to start--one that we can later pivot into other forms (e.g., tables, a web app). Be sure to incorporate links to web pages where you found the information about each feature supported. Ideally these are markdown footnotes tied to the information in the main body of the document.

Before I put you into Deep Research with the starting links to perform this work, please write out a plan for your Deep Research that best captures the task ahead of you.

---

1. Lock the comparison frame first. I would define a fixed taxonomy so the four tools are evaluated on the same axes:
   - extension type
   - scope boundary
   - supported surface or interface
   - installation or configuration mechanism
   - trust and execution model
   - source link

2. Research each product from primary sources first. For each tool, I would prioritize:
   - official product docs
   - official setup or configuration docs
   - official extension, plugin, MCP, or customization docs
   - official repo docs where the product behavior is defined in practice
   - only then secondary sources, and only to fill gaps or confirm ambiguity

3. Normalize the terminology across vendors. The biggest risk is inconsistent naming. I would map vendor-specific terms into a common schema, for example:
   - custom instructions
   - repository instructions
   - workspace instructions
   - prompts or prompt libraries
   - skills
   - MCP servers
   - IDE extensions or plugins
   - CLI hooks or config files
   - agent/task definitions
   - local tooling integrations

4. Capture scoping with precision instead of hand-waving. I would explicitly test whether each extension point can be scoped to:
   - user or account
   - machine
   - IDE instance
   - project or workspace
   - repo root
   - subdirectory or nested folder
   - multiple repos
   - organization or enterprise
   - cloud-hosted workspace or web session

5. Separate “recognized by docs” from “actually usable in a given interface.” For every extension point, I would record:
   - supported interface: CLI, IDE, desktop app, web app, API, other
   - whether support is native or indirect
   - whether it is generally available, preview, beta, or enterprise-only

6. Record ambiguities and edge cases as first-class findings. I expect some vendors to have:
   - overlapping concepts with different names
   - features available in one client but not another
   - MCP support that differs by host
   - instruction files that are not truly hierarchical or composable
   - repo-scoped behavior that depends on the IDE rather than the model agent itself

7. Build the markdown cheat sheet in a structure that can later be transformed cleanly. I would draft it as:
   - overview section defining the taxonomy
   - one heading per tool
   - nested headings per extension type
   - under each, short bullets for scope, supported interfaces, notes, and sources
   - a final cross-cutting “normalization notes” section
   - footnotes for every material claim

8. Use footnotes aggressively but cleanly. I would attach footnotes to the exact claims that matter:
   - existence of the extension point
   - scope limits
   - interface support
   - caveats like preview or enterprise restrictions

9. Flag confidence where documentation is weak. If a claim has to be inferred from adjacent docs or product behavior rather than stated directly, I would label it as:
   - explicit
   - strongly implied
   - inferred

10. Deliver two outputs in the research pass:

- the heading-based markdown cheat sheet
- a short findings memo listing open questions, contradictions, and places where the vendors do not line up cleanly

A good Deep Research prompt for this would ask for primary-source-first verification, explicit scope normalization, and citation of each substantive claim with markdown footnotes.

---

Great. Please execute the research and deliver the outputs that I suggested and you further clarified for yourself.
