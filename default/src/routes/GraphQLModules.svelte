<script lang="ts">
	import { dev } from '$app/environment';
	import { page } from '$app/stores';
	import ModuleIcon from '$lib/ModuleIcon.svelte';
	import { MODULES_COLORS } from '$lib/colors';
	import EditIcon from '$lib/icons/EditIcon.svelte';
	import ExternalLinkIcon from '$lib/icons/ExternalLinkIcon.svelte';
	import type { Module, ModuleItem } from 'graphinx';
	import {
		findMutationInSchema,
		findQueryInSchema,
		findSubscriptionInSchema,
		findTypeInSchema
	} from '$lib/schema-utils';
	import Query from './Query.svelte';
	import TypeDef from './TypeDef.svelte';
	import type { GraphQLSchema } from 'graphql';

	export let schema: GraphQLSchema;
	export let allItems: ModuleItem[];
	export let modules: Module[];
	export let renderTitle: boolean = modules.length > 1;

	function isImplicitSubscription(queryName: string) {
		return modules.some(
			({ subscriptions }) =>
				!subscriptions.includes(queryName) && findSubscriptionInSchema(schema, queryName)
		);
	}
</script>

{#each modules as { name, displayName, renderedDocs, types, queries, mutations, subscriptions, contributeURL, sourceCodeURL }}
	<section class="module" id={name} style:--color="var(--{MODULES_COLORS[name]})">
		{#if renderTitle}
			<h2 data-toc-title={displayName}>
				<ModuleIcon inline {name}></ModuleIcon>

				{displayName}

				{#if $page.url.pathname !== `/${name}`}
					<a href="/{name}" class="link-to-page">
						<ExternalLinkIcon></ExternalLinkIcon> Page
					</a>
				{/if}

				{#if contributeURL}
					<a class="link-to-source" href={contributeURL}>
						<EditIcon></EditIcon> Edit this page
					</a>
				{/if}
				{#if sourceCodeURL}
					<a href={sourceCodeURL} class="source-code">[src]</a>
				{/if}
			</h2>
		{/if}
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html renderedDocs}
		{#if types.length > 0}
			<svelte:element this={renderTitle ? 'h3' : 'h2'} id="{name}/types">Types</svelte:element>
			{#each types as typeName}
				{@const type = findTypeInSchema(schema, typeName)}
				{#if type}
					{@const item = allItems.find((i) => i.name === typeName)}
					{#if !item?.connection && !item?.result}
						<TypeDef {schema} {allItems} moduleName={name} {type} {renderTitle} />
					{/if}
				{:else if dev}
					<article class="error">
						<code class="no-color">{typeName}</code> non trouvée dans le schéma.
					</article>
				{/if}
			{/each}
		{/if}
		{#if queries.length > 0}
			<svelte:element this={renderTitle ? 'h3' : 'h2'} id="{name}/queries">Queries</svelte:element>
			{#each queries as queryName}
				{@const query = findQueryInSchema(schema, queryName)}
				{@const item = allItems.find((i) => i.name === queryName)}
				{#if query}
					<Query
						{schema}
						{query}
						{allItems}
						kind="query"
						hasAvailableSubscription={isImplicitSubscription(queryName)}
					/>
				{:else if dev}
					<article class="error">
						<code class="no-color">{queryName}</code> not found in schema.
					</article>
				{/if}
			{/each}
		{/if}
		{#if mutations.length > 0}
			<svelte:element this={renderTitle ? 'h3' : 'h2'} id="{name}/mutations"
				>Mutations</svelte:element
			>
			{#each mutations as mutationName}
				{@const query = findMutationInSchema(schema, mutationName)}
				{#if query}
					<Query {allItems} {schema} {query} kind="mutation" />
				{:else if dev}
					<article class="error">
						<code class="no-color">{mutationName}</code> not found in schema.
					</article>
				{/if}
			{/each}
		{/if}
		{#if subscriptions.length > 0}
			<svelte:element this={renderTitle ? 'h3' : 'h2'} id="{name}/subscriptions"
				>Subscriptions</svelte:element
			>
			{#each subscriptions as subscription}
				{@const query = findSubscriptionInSchema(schema, subscription)}
				{#if query}
					<Query {allItems} {schema} {query} kind="subscription" />
				{:else if dev}
					<article class="error">
						<code class="no-color">{subscription}</code> not found in schema.
					</article>
				{/if}
			{/each}
		{/if}
	</section>
{/each}

<style>
	h2 {
		display: flex;
		flex-wrap: wrap;
		column-gap: 1em;
		align-items: center;
	}

	[data-toc-title] {
		color: color-mix(in oklab, var(--color) 60%, var(--fg));
	}

	.source-code {
		margin-left: 2em;
		font-size: 1rem;
	}

	h2 > a {
		font-size: 1rem;
		text-decoration: none;
	}

	h2 .link-to-source {
		margin-left: auto;
	}
</style>
