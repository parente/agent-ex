<script lang="ts">
	import '../app.css';
	let { data, children } = $props();
	let menuOpen = $state(false);
	let theme = $state<'system' | 'light' | 'dark'>('system');

	function applyTheme(t: typeof theme) {
		if (typeof document === 'undefined') return;
		const dark = t === 'dark' || (t === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
		document.documentElement.classList.toggle('dark', dark);
		localStorage.setItem('theme', t);
	}

	function cycleTheme() {
		const order: typeof theme[] = ['system', 'light', 'dark'];
		theme = order[(order.indexOf(theme) + 1) % 3];
		applyTheme(theme);
	}

	const themeIcon: Record<string, string> = { system: '◐', light: '☀', dark: '☾' };

	$effect(() => {
		theme = (localStorage.getItem('theme') as typeof theme) ?? 'system';
		applyTheme(theme);
		const mq = window.matchMedia('(prefers-color-scheme: dark)');
		const handler = () => { if (theme === 'system') applyTheme('system'); };
		mq.addEventListener('change', handler);
		return () => mq.removeEventListener('change', handler);
	});
</script>

<div class="min-h-screen flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
	<!-- Nav -->
	<header class="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 sticky top-0 z-10">
		<div class="max-w-[1400px] mx-auto px-4 flex items-center justify-between h-14">
			<a href="/" class="text-lg font-bold text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Agent-Ex</a>

			<!-- Desktop nav -->
			<nav class="hidden md:flex items-center gap-6 text-sm">
				<a href="/" class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">Matrix</a>
				<div class="relative group">
					<span class="text-gray-600 dark:text-gray-400 cursor-default">Tools ▾</span>
					<div class="absolute top-full left-0 pt-1 hidden group-hover:block">
						<div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1 min-w-[180px]">
							{#each data.nav.vendors as v}
								<a href="/tool/{v.id}" class="block px-3 py-1.5 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">{v.name}</a>
							{/each}
						</div>
					</div>
				</div>
				<div class="relative group">
					<span class="text-gray-600 dark:text-gray-400 cursor-default">Families ▾</span>
					<div class="absolute top-full right-0 pt-1 hidden group-hover:block">
						<div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1 min-w-[220px]">
							{#each data.nav.families as f}
								<a href="/family/{f.id}" class="block px-3 py-1.5 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">{f.label}</a>
							{/each}
						</div>
					</div>
				</div>
				<a href="/about" class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">About</a>
				<button onclick={cycleTheme} class="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer" title="Theme: {theme}">
					{themeIcon[theme]}
				</button>
			</nav>

			<!-- Mobile nav controls -->
			<div class="md:hidden flex items-center gap-2">
				<button onclick={cycleTheme} class="text-gray-500 dark:text-gray-400 p-2 cursor-pointer" title="Theme: {theme}">
					{themeIcon[theme]}
				</button>
				<button class="text-gray-600 dark:text-gray-400 p-2 cursor-pointer" onclick={() => menuOpen = !menuOpen}>
					{#if menuOpen}✕{:else}☰{/if}
				</button>
			</div>
		</div>

		<!-- Mobile menu -->
		{#if menuOpen}
			<nav class="md:hidden border-t border-gray-100 dark:border-gray-800 px-4 py-3 space-y-2 text-sm">
				<a href="/" class="block text-gray-700 dark:text-gray-300 py-1" onclick={() => menuOpen = false}>Matrix</a>
				<div class="text-gray-400 text-xs uppercase mt-2">Tools</div>
				{#each data.nav.vendors as v}
					<a href="/tool/{v.id}" class="block text-gray-700 dark:text-gray-300 py-1 pl-2" onclick={() => menuOpen = false}>{v.name}</a>
				{/each}
				<div class="text-gray-400 text-xs uppercase mt-2">Families</div>
				{#each data.nav.families as f}
					<a href="/family/{f.id}" class="block text-gray-700 dark:text-gray-300 py-1 pl-2" onclick={() => menuOpen = false}>{f.label}</a>
				{/each}
				<a href="/about" class="block text-gray-700 dark:text-gray-300 py-1 mt-2" onclick={() => menuOpen = false}>About</a>
			</nav>
		{/if}
	</header>

	<!-- Content -->
	<main class="flex-1">
		{@render children()}
	</main>

	<!-- Footer -->
	<footer class="border-t border-gray-200 dark:border-gray-800 py-4 text-center text-xs text-gray-400">
		Data last updated {data.nav.lastUpdated} · Auto-generated from upstream docs and may be inaccurate · <a href="https://github.com/parente/agent-ex" class="hover:text-gray-600 dark:hover:text-gray-300">Source on GitHub</a>
	</footer>
</div>
