<script lang="ts">
	import { data } from '$lib/data.generated';
	import ModuleCard from '$lib/ModuleCard.svelte';
	import type { Module } from 'graphinx';

	export let modules: Module[];
</script>

<section class="modules-list">
	{#each modules as module}
		<ModuleCard {module} />
	{/each}
	<ModuleCard
		module={{
			name: 'index',
			displayName: data.config.modules?.index?.title ?? 'Index',
			shortDescription: data.config.modules?.index?.description ?? 'Every item on a single page'
		}}
	/>
</section>

<style>
	.modules-list {
		--card-width: 223px;
		--card-height: 200px;

		display: grid;
		grid-template-columns: repeat(auto-fill, calc(min(var(--card-width), 100%)));
		gap: 1.5rem;
		justify-content: center;
	}
</style>
