<script lang="ts">
	import { PUBLIC_API_URL, PUBLIC_API_WEBSOCKET_URL } from '$env/static/public';
	import SearchBar from '$lib/SearchBar.svelte';
	import { tocShown } from '$lib/TableOfContents.svelte';
	import { currentTheme } from '$lib/theme';
	import type { PageData } from './$types';
	import ModulesList from './ModulesList.svelte';

	export let data: PageData;
	// $: searchQuery = browser ? debounced(useParamStore('q'), 20) : undefined;
	let query = '';
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

{#if PUBLIC_API_URL}
	<p>The GraphQL Endpoint is</p>
	<pre>{PUBLIC_API_URL}</pre>

	{#if PUBLIC_API_WEBSOCKET_URL}
		<p>The API also supports real-time data via a websocket at</p>
		<pre>{PUBLIC_API_WEBSOCKET_URL}</pre>
	{/if}
{/if}

<section class="search">
	<SearchBar bind:query></SearchBar>
</section>

<section class="description">{@html data.descriptionHtml}</section>

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
