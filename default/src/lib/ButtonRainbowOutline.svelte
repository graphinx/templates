<script lang="ts">
	export let stopped = true;
</script>

<button on:click {...$$restProps} class:stopped>
	<slot />
</button>

<style>
	*,
	*::before,
	*::after {
		box-sizing: border-box;
	}

	button[disabled] {
		--bg: #db49ab;
		cursor: wait;
	}

	button.stopped::before {
		animation: none;
		opacity: 0;
		animation:
			rotation 1s ease infinite,
			stop-animation 1s ease forwards;
	}

	@keyframes stop-animation {
		from {
			opacity: 1;
		}
		75% {
			opacity: 0;
		}
		to {
			animation-play-state: paused;
		}
	}

	button:hover,
	button:focus-visible {
		scale: 1.15;
	}

	button:not(:disabled):active {
		scale: 0.9;
		--bg: #a81078;
	}

	button {
		--width: 3px;
		--border-color: var(--blue);
		--bg: #e22ba5;

		position: relative;
		z-index: 0;
		transition: all 0.2s ease;

		overflow: hidden;

		color: white;
		background-color: var(--bg);
		font-size: 1.25rem;

		padding: 0.5em 1em;
		border-radius: 2em;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5em;

		display: flex;
		align-items: center;
		justify-content: center;
		border: none;
		cursor: pointer;

		&::before {
			content: '';
			position: absolute;
			z-index: -2;
			left: -50%;
			top: -50%;
			width: 200%;
			height: 200%;
			scale: 2;
			background-color: var(--border-color);
			background-repeat: no-repeat;
			background-size:
				50% 50%,
				50% 50%;
			background-position:
				0 0,
				100% 0,
				100% 100%,
				0 100%;
			background-image: linear-gradient(var(--border-color), var(--border-color)),
				linear-gradient(var(--bg), var(--bg)), linear-gradient(var(--bg), var(--bg)),
				linear-gradient(var(--bg), var(--bg));
		}

		&::after {
			content: '';
			position: absolute;
			z-index: -1;
			left: var(--width);
			top: var(--width);
			width: calc(100% - 2 * var(--width));
			height: calc(100% - 2 * var(--width));
			background: var(--bg);
			border-radius: 2em;
		}
	}

	button::before {
		animation: rotation 1s ease infinite;
	}

	@keyframes rotation {
		from {
			rotate: 0;
		}
		to {
			rotate: 1turn;
		}
	}
</style>
