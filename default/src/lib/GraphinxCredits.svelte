<script lang="ts">
	interface Props {
		centered?: boolean;
	}

	let { centered = false }: Props = $props();
</script>

<div class="graphinx-credits" class:centered>
	<img src="https://raw.githubusercontent.com/graphinx/graphinx/main/logo-transparent.png" alt="" />
	<p>
		Documentation generated with <a target="_blank" href="https://github.com/graphinx/graphinx"
			>Graphinx</a
		>
	</p>
</div>

<style>
	.graphinx-credits img {
		width: 2rem;
		object-fit: contain;
	}

	.graphinx-credits {
		border-top: #ad1af175 0.25rem dashed;
		padding-top: 0.5rem;
		margin-top: 3rem;
		font-size: 0.85em;
		display: flex;
		gap: 0.5em;
	}

	.graphinx-credits.centered {
		font-size: 1em;
		gap: 0.5em;
		padding: 2rem 0;
		border-width: 0.125rem;
		justify-content: center;
		align-items: center;
	}
</style>
