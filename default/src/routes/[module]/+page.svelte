<script lang="ts">
	import ModuleIcon from '$lib/ModuleIcon.svelte';
	import { moduleColor } from '$lib/colors';
	import EditIcon from '$lib/icons/EditIcon.svelte';
	import { buildSchema } from 'graphql';
	import GraphQlModules from '../GraphQLModules.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>
		{data.modules.length === 1
			? `${data.modules[0].displayName}—${data.config.branding.name}`
			: data.config.branding.name}</title
	>
</svelte:head>
<svelte:body />

<h1>
	{#if data.modules.length === 1}
		{@const module = data.modules[0]}

		<ModuleIcon --module-color={moduleColor(module.name)} inline {...module}></ModuleIcon>

		{module.displayName}

		{#if module.contributeURL}
			<a class="link-to-source" href={module.contributeURL}>
				<EditIcon></EditIcon> Contribute to this page
			</a>
		{/if}
	{:else}
		Documentation
	{/if}
</h1>

<GraphQlModules {...data} allItems={data.items} schema={buildSchema(data.schema)}></GraphQlModules>

<style>
	h1 {
		display: flex;
		align-items: center;
		margin-bottom: 1rem;
	}

	h1 > :global(*) {
		--icon-color: color-mix(in oklab, var(--module-color) 30%, var(--fg));
	}

	.link-to-source {
		margin-left: auto;
		font-size: 1rem;
		text-decoration: none;
	}
</style>
