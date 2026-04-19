<script lang="ts">
	let { data } = $props();

	const scopeColors: Record<string, string> = {
		'user-home': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
		'project-root': 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
		'subdirectory': 'bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300',
		'organization': 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
		'cloud-session': 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300',
		'machine': 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
	};

	function scopeLabel(id: string) {
		return data.meta.scopes.find((s: { id: string; label: string }) => s.id === id)?.label ?? id;
	}

	function getVendorEntry(vendorId: string) {
		return data.entries.find((e) => e.vendor.id === vendorId) ?? null;
	}
</script>

<svelte:head>
	<title>{data.family.label} — Agent-Ex</title>
</svelte:head>

<div class="max-w-6xl mx-auto px-4 py-8">
	<nav class="text-sm text-gray-500 dark:text-gray-400 mb-6">
		<a href="/" class="hover:text-blue-600 dark:hover:text-blue-400">Agent-Ex</a> → {data.family.label}
	</nav>

	<h1 class="text-2xl font-bold mb-2">{data.family.label}</h1>
	<p class="text-gray-600 dark:text-gray-400 mb-8">{data.family.description}</p>

	<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
		{#each data.vendors as vendor}
			{@const entry = getVendorEntry(vendor.id)}
			<div class="border border-gray-200 dark:border-gray-700 rounded-lg p-5">
				<div class="flex items-center gap-2 mb-4">
					<a href="/tool/{vendor.id}" class="text-lg font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{vendor.name}</a>
				</div>

				{#if entry}
					{#if entry.extension.coveredBy}
						<p class="text-sm text-gray-400 dark:text-gray-500 italic">
							→ <a href="/family/{entry.extension.coveredBy.family}" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors underline">{entry.extension.coveredBy.label}</a>
						</p>
					{:else}
					<div class="space-y-3 text-sm">
						<div>
							<span class="text-gray-500 dark:text-gray-400 text-xs block mb-1">Extension Name</span>
							<span class="font-medium">{entry.extension.name}</span>
						</div>
						<div>
							<span class="text-gray-500 dark:text-gray-400 text-xs block mb-1">Vendor Terms</span>
							<span class="text-gray-700 dark:text-gray-300">{entry.extension.vendorTerms.join(', ')}</span>
						</div>
						<div>
							<span class="text-gray-500 dark:text-gray-400 text-xs block mb-1">Scopes</span>
							<div class="flex flex-wrap gap-1">
								{#each entry.extension.scopes as scope}
									<span class="px-1.5 py-0.5 rounded text-[10px] font-medium {scopeColors[scope] ?? 'bg-gray-100 dark:bg-gray-800'}">{scopeLabel(scope)}</span>
								{/each}
								{#if entry.extension.scopes.length === 0}
									<span class="text-xs text-gray-400 italic">unspecified</span>
								{/if}
							</div>
						</div>
						<div>
							<span class="text-gray-500 dark:text-gray-400 text-xs block mb-1">Interfaces</span>
							<span class="text-gray-700 dark:text-gray-300">{entry.extension.interfaces.join(', ')}</span>
						</div>
						<div>
							<span class="text-gray-500 dark:text-gray-400 text-xs block mb-1">Availability</span>
							<span class="text-gray-700 dark:text-gray-300">{entry.extension.availability.status}</span>
							<span class="text-gray-400 text-xs">({entry.extension.availability.claimStrength})</span>
						</div>
						<div>
							<span class="text-gray-500 dark:text-gray-400 text-xs block mb-1">Trust Model</span>
							<span class="text-gray-700 dark:text-gray-300">{entry.extension.trustModel}</span>
						</div>
						{#if entry.extension.availability.notes}
							<div>
								<span class="text-gray-500 dark:text-gray-400 text-xs block mb-1">Notes</span>
								<span class="text-gray-600 dark:text-gray-400 text-xs">{entry.extension.availability.notes}</span>
							</div>
						{/if}
						<div class="pt-2 border-t border-gray-100 dark:border-gray-800 flex flex-wrap gap-2">
							{#each entry.extension.sources as source}
								<a href={source.url} target="_blank" rel="noopener" class="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline">{source.label} ↗</a>
							{/each}
						</div>
					</div>
					{/if}
				{:else}
					<p class="text-sm text-gray-400 italic">Not documented for this vendor</p>
				{/if}
			</div>
		{/each}
	</div>
</div>
