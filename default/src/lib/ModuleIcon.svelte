<script lang="ts">
	import { moduleColor } from './colors';
	import ModuleAllIcon from './icons/ModuleAllIcon.svelte';

	interface Props {
		name: string;
		iconSvg?: string | undefined;
		inline?: boolean;
		big?: boolean;
		[key: string]: any;
	}

	let { name, iconSvg = undefined, inline = false, big = false, ...rest }: Props = $props();
</script>

{#if iconSvg || name === 'index'}
	<div class:inline class:big class="icon" {...rest} style:--color="var(--{moduleColor(name)})">
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
