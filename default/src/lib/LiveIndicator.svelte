<script>
	import { page } from '$app/stores';
	import Pill from './Pill.svelte';
	export let href = '';
	export let mobile = false;
</script>

<svelte:element
	this={href ? 'a' : 'span'}
	{href}
	class="live-indicator"
	title="Also available as a subscription"
>
	{#if mobile}
		<span class="dot" class:mobile></span> LIVE
	{:else}
		<Pill noInteractions={$page.url.pathname === '/websockets'}><span class="dot"></span> LIVE</Pill
		>
	{/if}
</svelte:element>

<style>
	.live-indicator {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		color: rgb(255 49 118);
		text-decoration: none;
	}

	.dot::before {
		display: inline-block;
		width: 0.7em;
		height: 0.7em;
		content: '';
		background: currentcolor;
		border-radius: 100000px;
	}

	.dot.mobile::before {
		margin-right: 0.25em;
	}
</style>
