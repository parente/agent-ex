<script lang="ts">
  import type { Extension } from "$lib/data/types.js";

  let { data } = $props();
  let expanded = $state<string | null>(null);

  const scopeColors: Record<string, string> = {
    "user-home":
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
    "project-root":
      "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
    subdirectory:
      "bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300",
    organization:
      "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
    "cloud-session":
      "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300",
    machine: "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300",
  };

  function findExts(vendorId: string, familyId: string): Extension[] {
    return (
      data.vendors
        .find((v) => v.id === vendorId)
        ?.extensions.filter((e) => e.normalizedFamily === familyId) ?? []
    );
  }

  function toggle(key: string) {
    expanded = expanded === key ? null : key;
  }

  function scopeLabel(id: string) {
    return data.meta.scopes.find((s) => s.id === id)?.label ?? id;
  }
</script>

<svelte:head>
  <title>Agent-Ex — Agentic Tool Extension Point Explorer</title>
</svelte:head>

<div class="max-w-[1400px] mx-auto px-4 py-8">
  <div class="mb-8">
    <h1 class="text-3xl font-bold mb-2">Agent-Ex</h1>
    <p class="text-gray-600 dark:text-gray-400">
      Compare extension points across agentic coding tools. Click a cell for
      details inline. Click a column or row header to see its full page.
    </p>
  </div>

  <div class="mb-6 flex flex-wrap gap-4 text-sm">
    <div
      class="flex items-center gap-2 text-gray-500 dark:text-gray-400 font-medium"
    >
      Scopes:
    </div>
    {#each data.meta.scopes as scope}
      <span
        class="px-2 py-0.5 rounded text-xs font-medium {scopeColors[scope.id] ??
          'bg-gray-100 dark:bg-gray-800'}">{scope.label}</span
      >
    {/each}
  </div>

  <div
    class="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg"
  >
    <table class="w-full text-sm">
      <thead>
        <tr
          class="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700"
        >
          <th
            class="text-left p-3 font-semibold text-gray-700 dark:text-gray-300 sticky left-0 bg-gray-50 dark:bg-gray-900 min-w-[180px]"
            >Extension Family</th
          >
          {#each data.vendors as vendor}
            <th
              class="text-left p-3 font-semibold text-gray-700 dark:text-gray-300 min-w-[220px]"
            >
              <a
                href="/tool/{vendor.id}"
                class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >{vendor.name}</a
              >
            </th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each data.meta.families as family}
          <tr
            class="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-gray-800/50"
          >
            <td
              class="p-3 font-medium sticky left-0 bg-white dark:bg-gray-950 align-top"
            >
              <a
                href="/family/{family.id}"
                class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >{family.label}</a
              >
              <p class="text-xs text-gray-400 font-normal mt-0.5">
                {family.description}
              </p>
            </td>
            {#each data.vendors as vendor}
              {@const exts = findExts(vendor.id, family.id)}
              <td class="p-3 align-top">
                {#if exts.length > 0}
                  {#each exts as ext, idx}
                    {#if idx > 0}<div
                        class="mt-2 pt-2 border-t border-gray-100 dark:border-gray-800"
                      ></div>{/if}
                    {#if ext.coveredBy}
                      <button
                        class="text-xs text-gray-400 dark:text-gray-500 italic hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                        onclick={() =>
                          toggle(`${vendor.id}:${ext.coveredBy.family}:0`)}
                        >→ {ext.coveredBy.label}</button
                      >
                    {:else}
                      {@const key = `${vendor.id}:${family.id}:${idx}`}
                      <button
                        class="w-full text-left cursor-pointer"
                        onclick={() => toggle(key)}
                      >
                        <div class="mb-1.5">
                          <span class="font-medium text-xs">{ext.name}</span>
                        </div>
                        <div class="flex flex-wrap gap-1">
                          {#each ext.scopes as scope}
                            <span
                              class="px-1.5 py-0.5 rounded text-[10px] font-medium {scopeColors[
                                scope
                              ] ?? 'bg-gray-100 dark:bg-gray-800'}"
                              >{scopeLabel(scope)}</span
                            >
                          {/each}
                          {#if ext.scopes.length === 0}
                            <span class="text-[10px] text-gray-400 italic"
                              >scope unspecified</span
                            >
                          {/if}
                        </div>
                      </button>

                      {#if expanded === key}
                        <div
                          class="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 text-xs space-y-2"
                        >
                          <div>
                            <span class="text-gray-500 dark:text-gray-400"
                              >Vendor terms:</span
                            >
                            <span class="text-gray-700 dark:text-gray-300"
                              >{ext.vendorTerms.join(", ")}</span
                            >
                          </div>
                          <div>
                            <span class="text-gray-500 dark:text-gray-400"
                              >Interfaces:</span
                            >
                            <span class="text-gray-700 dark:text-gray-300"
                              >{ext.interfaces.join(", ")}</span
                            >
                          </div>
                          <div>
                            <span class="text-gray-500 dark:text-gray-400"
                              >Trust model:</span
                            >
                            <span class="text-gray-700 dark:text-gray-300"
                              >{ext.trustModel}</span
                            >
                          </div>
                          {#if ext.availability.notes}
                            <div>
                              <span class="text-gray-500 dark:text-gray-400"
                                >Notes:</span
                              >
                              <span class="text-gray-700 dark:text-gray-300"
                                >{ext.availability.notes}</span
                              >
                            </div>
                          {/if}
                          <div class="flex flex-wrap gap-2 pt-1">
                            {#each ext.sources as source}
                              <a
                                href={source.url}
                                target="_blank"
                                rel="noopener"
                                class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline"
                                >{source.label} ↗</a
                              >
                            {/each}
                          </div>
                        </div>
                      {/if}
                    {/if}
                  {/each}
                {:else}
                  <span class="text-xs text-gray-300 dark:text-gray-600 italic"
                    >—</span
                  >
                {/if}
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
