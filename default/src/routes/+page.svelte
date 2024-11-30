<script lang="ts">
	import {
		PUBLIC_API_URL,
		PUBLIC_API_WEBSOCKET_URL,
		PUBLIC_DEFAULT_RATE_LIMIT
	} from '$env/static/public';
	import SearchBar from '$lib/SearchBar.svelte';
	import { tocShown } from '$lib/TableOfContents.svelte';
	import { currentTheme } from '$lib/theme';
	import type { PageData } from './$types';
	import ModulesList from './ModulesList.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	// $: searchQuery = browser ? debounced(useParamStore('q'), 20) : undefined;
	let query = $state('');
</script>

<svelte:head>
	<title>Documentation—{data.config.branding.name}</title>
</svelte:head>

<header class:has-toc={$tocShown}>
	{#if data.config.branding.logo[$currentTheme]}
		<img src={data.config.branding.logo[$currentTheme]} aria-hidden="true" />
	{/if}
	<h1>{data.config.branding.name}</h1>
</header>
<dl class="basic-info">
	{#if PUBLIC_API_URL}
		<dt>Endpoint URL</dt>
		<dd><a href={PUBLIC_API_URL}><code>{PUBLIC_API_URL}</code></a></dd>

		{#if PUBLIC_API_WEBSOCKET_URL}
			<dt>Subscriptions endpoint URL</dt>
			<dd><code>{PUBLIC_API_WEBSOCKET_URL}</code></dd>
		{/if}
	{/if}
	{#if data.config.relay}
		<dt>Pagination</dt>
		<dd>
			<a href="https://graphql.org/learn/pagination/#complete-connection-model">GraphQL Relay</a>
			(nodes on <code>{data.config.relay.node ?? 'edges.node'}</code>)
		</dd>
	{/if}
	{#if data.config.errors}
		<dt>Errors types</dt>
		<dd>
			Success data on <code>{data.config.errors.data ?? 'data'}</code>
		</dd>
	{/if}
	{#if PUBLIC_DEFAULT_RATE_LIMIT}
		<dt>Rate limit</dt>
		<dd><strong>{PUBLIC_DEFAULT_RATE_LIMIT}</strong> (unless specified)</dd>
	{/if}
</dl>
<section class="search">
	<SearchBar bind:query></SearchBar>
</section>

<section class="description">
	{@html data.descriptionHtml}

	{#if data.queryTypeDescriptionHtml}
		<h2>Queries</h2>
		{@html data.queryTypeDescriptionHtml}
	{/if}

	{#if data.mutationTypeDescriptionHtml}
		<h2>Mutations</h2>
		{@html data.mutationTypeDescriptionHtml}
	{/if}

	{#if data.subscriptionTypeDescriptionHtml}
		<h2>Subscriptions</h2>
		{@html data.subscriptionTypeDescriptionHtml}
	{/if}
</section>

<h2>Modules</h2>
<ModulesList modules={data.modules} />

<style>
	h1 {
		margin: 0;
		padding: 0;
	}
	header img {
		height: 6rem;
	}
	header {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 2rem;
	}
	header.has-toc {
		flex-direction: row;
		gap: 1rem;
	}
	.basic-info {
		display: grid;
		grid-template-columns: repeat(2, auto);
	}
	.search {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 2rem 0;
		margin-bottom: 3rem;
		border-radius: 1rem;
		background-color: var(--shadow);
	}
	.description {
		margin: 3.5rem 0;
	}
</style>
