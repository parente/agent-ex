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

	function familyLabel(id: string) {
		return data.meta.families.find((f: { id: string; label: string }) => f.id === id)?.label ?? id;
	}
</script>

<svelte:head>
	<title>{data.vendor.name} — Agent-Ex</title>
</svelte:head>

<div class="max-w-4xl mx-auto px-4 py-8">
	<nav class="text-sm text-gray-500 dark:text-gray-400 mb-6">
		<a href="/" class="hover:text-blue-600 dark:hover:text-blue-400">Agent-Ex</a> → {data.vendor.name}
	</nav>

	<h1 class="text-2xl font-bold mb-2">{data.vendor.name}</h1>
	<div class="flex flex-wrap gap-2 mb-4">
		{#each data.vendor.interfaces as iface}
			<span class="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs">{iface}</span>
		{/each}
	</div>

	{#if data.vendor.prose}
		<div class="text-sm text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">{data.vendor.prose}</div>
	{/if}

	<div class="space-y-6">
		{#each data.vendor.extensions as ext}
			<div class="border border-gray-200 dark:border-gray-700 rounded-lg p-5">
				<div class="flex items-center gap-2 mb-3">
					<h2 class="text-lg font-semibold">{ext.name}</h2>
					<a href="/family/{ext.normalizedFamily}" class="ml-auto px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-medium hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors">
						{familyLabel(ext.normalizedFamily)}
					</a>
				</div>

				<div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
					<div>
						<span class="text-gray-500 dark:text-gray-400 text-xs block mb-1">Vendor Terms</span>
						<span class="text-gray-700 dark:text-gray-300">{ext.vendorTerms.join(', ')}</span>
					</div>
					<div>
						<span class="text-gray-500 dark:text-gray-400 text-xs block mb-1">Interfaces</span>
						<span class="text-gray-700 dark:text-gray-300">{ext.interfaces.join(', ')}</span>
					</div>
					<div>
						<span class="text-gray-500 dark:text-gray-400 text-xs block mb-1">Scopes</span>
						<div class="flex flex-wrap gap-1">
							{#each ext.scopes as scope}
								<span class="px-1.5 py-0.5 rounded text-[10px] font-medium {scopeColors[scope] ?? 'bg-gray-100 dark:bg-gray-800'}">{scopeLabel(scope)}</span>
							{/each}
							{#if ext.scopes.length === 0}
								<span class="text-xs text-gray-400 italic">unspecified</span>
							{/if}
						</div>
					</div>
					<div>
						<span class="text-gray-500 dark:text-gray-400 text-xs block mb-1">Availability</span>
						<span class="text-gray-700 dark:text-gray-300">{ext.availability.status}</span>
						<span class="text-gray-400 text-xs">({ext.availability.claimStrength})</span>
					</div>
				</div>

				<div class="mt-3 text-sm">
					<span class="text-gray-500 dark:text-gray-400 text-xs block mb-1">Trust Model</span>
					<span class="text-gray-700 dark:text-gray-300">{ext.trustModel}</span>
				</div>

				{#if ext.availability.notes}
					<div class="mt-2 text-sm">
						<span class="text-gray-500 dark:text-gray-400 text-xs block mb-1">Notes</span>
						<span class="text-gray-600 dark:text-gray-400 text-xs">{ext.availability.notes}</span>
					</div>
				{/if}

				<div class="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 flex flex-wrap gap-3">
					{#each ext.sources as source}
						<a href={source.url} target="_blank" rel="noopener" class="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline">{source.label} ↗</a>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>
