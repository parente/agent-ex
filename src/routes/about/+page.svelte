<svelte:head>
  <title>About — Agent-Ex</title>
</svelte:head>

<div class="max-w-3xl mx-auto px-4 py-8">
  <nav class="text-sm text-gray-500 dark:text-gray-400 mb-6">
    <a href="/" class="hover:text-blue-600 dark:hover:text-blue-400">Agent-Ex</a
    > → About
  </nav>

  <h1 class="text-2xl font-bold mb-6">About Agent-Ex</h1>

  <div
    class="prose prose-gray dark:prose-invert max-w-none text-sm leading-relaxed space-y-4"
  >
    <p>
      Agent-Ex started as a research question: <em
        >what can you actually customize across agentic coding tools, and how do
        the options compare?</em
      > The initial research was conducted using ChatGPT's Deep Research mode, which
      crawled official vendor documentation and produced a detailed comparison report
      cataloging every documented extension point, its scope, interfaces, availability,
      trust model, and upstream sources.
    </p>

    <p>
      That report was thorough but hard to navigate as a wall of text. Agent-Ex
      turns it into an interactive web app where you can quickly scan a
      comparison matrix, drill into any tool or extension family, and follow
      source links to verify facts against the upstream docs. The goal is to
      track extension point capabilities across whatever vendors and families
      the research turns up over time — not just a fixed set of tools.
    </p>

    <h2 class="text-lg font-semibold mt-8 mb-3">How it's built</h2>

    <p>
      The app is built with SvelteKit and Tailwind CSS, deployed to Cloudflare
      Pages. The data lives in simple Markdown files with YAML frontmatter — one
      file per vendor in the <code
        class="bg-gray-100 dark:bg-gray-800 px-1 rounded">data/</code
      > directory. This means humans or agents can update the data without touching
      any application code. New vendors and new extension families can be added by
      editing data files alone.
    </p>

    <p>
      A skill <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded"
        >update-vendor-data/</code
      > provides instructions for agent-assisted updates. An agent can search vendor
      documentation domains, fetch upstream URLs, compare against current data, and
      propose edits — including updating the skill itself with newly discovered source
      URLs.
    </p>

    <h2 class="text-lg font-semibold mt-8 mb-3">Normalized taxonomy</h2>

    <p>
      To make cross-tool comparison meaningful, vendor-specific terminology is
      normalized into extension families grounded in what users recognize across
      tools:
    </p>

    <ul class="list-disc pl-5 space-y-1">
      <li>
        <strong>Instructions</strong> — persistent context the agent sees every session
      </li>
      <li>
        <strong>Prompts</strong> — reusable prompt templates explicitly invoked by
        name
      </li>
      <li>
        <strong>Skills</strong> — richer workflows and knowledge the agent can discover
        and use on its own
      </li>
      <li>
        <strong>MCP &amp; Tools</strong> — connections to external services via Model
        Context Protocol
      </li>
      <li>
        <strong>Agents</strong> — specialist personas, isolated workers, or coordinated
        teams
      </li>
      <li>
        <strong>Hooks</strong> — deterministic automation on lifecycle events
      </li>
      <li>
        <strong>Plugins &amp; Distribution</strong> — packaging and sharing bundles
        of the above
      </li>
      <li>
        <strong>Settings &amp; Policy</strong> — tool configuration, managed settings,
        and organizational controls
      </li>
    </ul>

    <p>
      This taxonomy evolves as vendors add new concepts. If a new extension type
      doesn't fit an existing family, a new one can be added to <code
        class="bg-gray-100 dark:bg-gray-800 px-1 rounded">data/_meta.yaml</code
      >.
    </p>

    <h2 class="text-lg font-semibold mt-8 mb-3">Source and accuracy</h2>

    <p>
      Every data point links to its upstream documentation source. Since vendor
      docs change frequently, some information may be outdated. Use the source
      links to verify current status, and consider running the update skill to
      refresh the data.
    </p>
  </div>
</div>
