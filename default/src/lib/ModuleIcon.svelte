<script lang="ts">
	import { moduleColor } from './colors';
	import ModuleAllIcon from './icons/ModuleAllIcon.svelte';

	export let name: string;
	export let iconSvg: string | undefined = undefined;
	export let inline = false;
	export let big = false;
</script>

{#if iconSvg || name === 'index'}
	<div
		class:inline
		class:big
		class="icon"
		{...$$restProps}
		style:--color="var(--{moduleColor(name)})"
	>
		{#if name === 'index'}
			<ModuleAllIcon />
		{:else}
			{@html iconSvg}
		{/if}
	</div>
{/if}

<style>
	.icon.inline {
		width: 1em;
		height: 1em;
		margin-right: 0.5em;
	}

	.icon.big {
		width: 1em;
		height: 1.2em;
		font-size: 1.5em;
	}

	.icon {
		color: var(--icon-color, currentColor);
	}
</style>
