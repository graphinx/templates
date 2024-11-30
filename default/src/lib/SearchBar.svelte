<script lang="ts">
	import SearchIcon from '$lib/icons/SearchIcon.svelte';

	interface Props {
		query?: string | string[] | undefined;
	}

	let { query = $bindable('') }: Props = $props();
</script>

<search>
	<form action="/-/search" method="get">
		<input placeholder="Search…" bind:value={query} name="q" type="search" /><button type="submit">
			<SearchIcon></SearchIcon>
		</button>
	</form>
</search>

<style>
	search {
		margin: 1rem 0;
	}

	search form {
		display: flex;
		font-size: 1em;
	}

	search input {
		flex-shrink: 1;
		min-width: 0;
		padding: 0.25em 0.5em;
		font-size: 1em;
		color: var(--fg);
		background: transparent;
		border: 2px solid var(--fg);
		border-right: 0;
	}

	search input::placeholder {
		color: var(--muted);
		opacity: 1;
	}

	search button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.25em;
		font-size: 1.3em;
		color: var(--fg);
		background: transparent;
		border: none;
		border: 2px solid var(--fg);
		border-left: 0;
	}
</style>
