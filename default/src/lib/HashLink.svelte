<script lang="ts">
	import LinkIcon from './icons/LinkIcon.svelte';

	export let href: string | undefined;
	export let element: string = 'h4';
	$: hash = href ? href.replace(/^.+#/, '') : undefined;
</script>

<svelte:element this={element} class="header" id={hash} {...$$restProps}>
	{#if href}
		<a class="hash-link" {href}>
			<LinkIcon></LinkIcon>
		</a>
	{/if}
	<div class="header-content">
		<slot />
	</div>
	<div class="header-end">
		<slot name="end" />
	</div>
</svelte:element>

<style>
	.hash-link {
		margin-bottom: -0.25em;
		font-size: 1.2em;
		color: var(--fg);
		opacity: 0.25;
		transition: opacity 0.2s ease;
	}

	:not(span):hover .hash-link,
	:not(span):focus-visible .hash-link {
		color: var(--fg);
		opacity: 1;
	}

	.header {
		display: flex;
		gap: 1em;
		align-items: center;
	}

	@media (max-width: 1000px) {
		.header-content {
			overflow: auto hidden;
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			flex: 1;
		}
	}

	.header-end {
		margin-left: auto;
	}
</style>
