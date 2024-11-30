<script lang="ts" module>
	import { writable } from 'svelte/store';
	export const tocShown = writable(false);
	export const tocIsFloating = writable(false);
</script>

<!-- From https://github.com/janosh/svelte-toc, MIT-licensed. -->
<script lang="ts">
	import { browser } from '$app/environment';
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import debounced from '$lib/stores';
	import { onMount } from 'svelte';
	import { useParamStore } from 'svelte-param-store';
	import { blur, type BlurParams } from 'svelte/transition';
	import { data } from './data.generated';
	import GraphinxCredits from './GraphinxCredits.svelte';
	import MenuIcon from './icons/MenuIcon.svelte';
	import SearchBar from './SearchBar.svelte';
	import { currentTheme } from './theme';

	interface Props {
		activeHeading?: HTMLHeadingElement | null;
		activeHeadingScrollOffset?: number;
		activeTocLi?: HTMLLIElement | null;
		aside?: HTMLElement | undefined;
		breakpoint?: number;
		desktop?: boolean;
		flashClickedHeadingsFor?: number;
		getHeadingIds?: any;
		getHeadingLevels?: any; // get the number from H1, H2, ...
		getHeadingTitles?: any;
		// the result of document.querySelectorAll(headingSelector). can be useful for binding
		headings?: HTMLHeadingElement[];
		headingSelector?: string;
		hide?: boolean;
		autoHide?: boolean;
		keepActiveTocItemInView?: boolean; // requires scrollend event browser support
		minItems?: number;
		nav?: HTMLElement | undefined;
		open?: boolean;
		openButtonLabel?: string;
		pageBody?: string | HTMLElement;
		scrollBehavior?: 'auto' | 'smooth';
		titleTag?: string;
		tocItems?: HTMLLIElement[];
		warnOnEmpty?: boolean;
		blurParams?: BlurParams | undefined;
		title?: string;
		opentocicon?: import('svelte').Snippet;
		customTitle?: import('svelte').Snippet;
		tocitem?: import('svelte').Snippet<[any]>;
	}

	let {
		activeHeading = $bindable(null),
		activeHeadingScrollOffset = 100,
		activeTocLi = $bindable(null),
		aside = $bindable(undefined),
		breakpoint = 1000,
		desktop = $bindable(true),
		flashClickedHeadingsFor = 1500,
		getHeadingIds = (node: HTMLHeadingElement): string => node.id,
		getHeadingLevels = (node: HTMLHeadingElement): number => Number(node.nodeName[1]),
		getHeadingTitles = (node: HTMLHeadingElement): string =>
			node.dataset.tocTitle || node.firstChild?.textContent || node?.textContent || '',
		headings = $bindable([]),
		headingSelector = ':is(h2, [data-toc-include]):not(.toc-exclude)',
		hide = $bindable(false),
		autoHide = false,
		keepActiveTocItemInView = true,
		minItems = 0,
		nav = $bindable(undefined),
		open = $bindable(false),
		openButtonLabel = 'Open table of contents',
		pageBody = $bindable('body'),
		scrollBehavior = 'smooth',
		titleTag = 'h2',
		tocItems = $bindable([]),
		warnOnEmpty = true,
		blurParams = { duration: 200 },
		title = 'Contents',
		opentocicon,
		customTitle,
		tocitem
	}: Props = $props();

	let window_width: number = $state();

	let searchQuery = $derived(browser ? debounced(useParamStore('q'), 20) : undefined);

	let levels = $derived(headings.map(getHeadingLevels));
	let minLevel = $derived(Math.min(...levels));
	$effect(() => {
		desktop = window_width > breakpoint;
	});
	$effect(() => {
		$tocShown = headings.length >= minItems;
	});
	$effect(() => {
		$tocIsFloating = !desktop;
	});

	function close(event: MouseEvent) {
		if (!aside?.contains(event.target as Node)) open = false;
	}

	onNavigate(() => {
		open = false;
	});

	// (re-)query headings on mount and on route changes
	function requery_headings() {
		if (typeof document === 'undefined') return; // for SSR
		headings = [...document.querySelectorAll(headingSelector)] as HTMLHeadingElement[];
		set_active_heading();
		if (headings.length === 0) {
			if (warnOnEmpty) {
				console.warn(
					`svelte-toc found no headings for headingSelector='${headingSelector}'. ${
						autoHide ? 'Hiding' : 'Showing empty'
					} table of contents.`
				);
			}
			if (autoHide) hide = true;
		} else if (hide && autoHide) {
			hide = false;
		}
	}

	requery_headings();

	onMount(() => {
		if (typeof pageBody === 'string') {
			pageBody = document.querySelector(pageBody) as HTMLElement;

			if (!pageBody) {
				throw new Error(`Could not find page body element: ${pageBody}`);
			}
		}
		const mutation_observer = new MutationObserver(requery_headings);
		mutation_observer.observe(pageBody, { childList: true, subtree: true });
		return () => mutation_observer.disconnect();
	});
	function set_active_heading() {
		let idx = headings.length;
		while (idx--) {
			const { top } = headings[idx].getBoundingClientRect();

			// loop through headings from last to first until we find one that the viewport already
			// scrolled past. if none is found, set make first heading active
			if (top < activeHeadingScrollOffset || idx === 0) {
				activeHeading = headings[idx];
				activeTocLi = tocItems[idx];
				return; // exit while loop if updated active heading
			}
		}
	}

	const handler = (node: HTMLHeadingElement) => (event: MouseEvent | KeyboardEvent) => {
		if (event instanceof KeyboardEvent && !['Enter', ' '].includes(event.key)) return;
		open = false;
		node.scrollIntoView({ behavior: scrollBehavior, block: 'start' });

		const id = getHeadingIds?.(node);
		if (id) history.replaceState({}, '', `#${id}`);

		if (flashClickedHeadingsFor) {
			node.classList.add('toc-clicked');
			setTimeout(() => node.classList.remove('toc-clicked'), flashClickedHeadingsFor);
		}
	};
</script>

<svelte:window
	bind:innerWidth={window_width}
	onscroll={set_active_heading}
	onclick={close}
	onscrollend={() => {
		// wait for scroll end since Chrome doesn't support multiple simultaneous scrolls,
		// smooth or otherwise (https://stackoverflow.com/a/63563437)
		if (keepActiveTocItemInView && activeTocLi) {
			// scroll the active ToC item into the middle of the ToC container
			nav?.scrollTo?.({
				top: activeTocLi?.offsetTop - nav.offsetHeight / 2,
				behavior: `smooth`
			});
		}
	}}
/>

<aside
	class="toc"
	class:desktop
	class:hidden={hide}
	class:mobile={!desktop}
	bind:this={aside}
	hidden={hide}
	aria-hidden={hide}
>
	{#if !open && !desktop && headings.length >= minItems}
		<button
			onclick={(e) => {
				e.preventDefault();
				e.stopPropagation();
				open = true;
			}}
			aria-label={openButtonLabel}
		>
			{#if opentocicon}{@render opentocicon()}{:else}
				<MenuIcon width="1em" />
			{/if}
		</button>
	{/if}
	{#if open || (desktop && headings.length >= minItems)}
		<nav transition:blur={blurParams} bind:this={nav}>
			<p class="suptitle">
				<!-- svelte-ignore a11y_missing_attribute -->
				<img src={data.config.branding.logo[$currentTheme]} aria-hidden="true" />
				{data.config.branding.name}
				{#if $page.url.pathname !== '/'}
					<a class="back" href="/">← Back</a>
				{/if}
			</p>
			<SearchBar bind:query={$searchQuery}></SearchBar>
			{#if title}
				{#if customTitle}{@render customTitle()}{:else}
					<svelte:element this={titleTag} class="toc-title toc-exclude">
						{title}
					</svelte:element>
				{/if}
			{/if}
			<ol>
				{#each headings as heading, idx}
					<li
						style:margin="0 0 0 {levels[idx] - minLevel}em"
						style:font-size="{2 - 0.2 * (levels[idx] - minLevel)}ex"
						class:active={activeHeading === heading}
						onclick={handler(heading)}
						onkeyup={handler(heading)}
						bind:this={tocItems[idx]}
						role="menuitem"
					>
						{#if tocitem}{@render tocitem({ heading, idx })}{:else}
							{getHeadingTitles(heading)}
						{/if}
					</li>
				{/each}
			</ol>
			{#if desktop}
				<GraphinxCredits />
			{:else}
				<button
					class="close-btn"
					onclick={() => {
						open = false;
					}}
				>
					×
				</button>
			{/if}
		</nav>
	{/if}
</aside>

<style>
	.suptitle {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem 1rem;
		align-items: center;
		margin: 0;
		margin-bottom: 1rem;
		font-size: 1.2rem;
		font-weight: bold;
	}

	.suptitle img {
		height: 1.2em;
	}

	.back {
		display: block;
		font-size: 1rem;
		font-weight: normal;
	}

	aside.toc {
		position: fixed;
		z-index: var(--toc-z-index, 1);
		box-sizing: border-box;
		width: var(--toc-width);
		min-width: var(--toc-min-width);
		height: max-content;
		font-size: var(--toc-font-size);
		overflow-wrap: break-word;
	}

	aside.toc > nav {
		position: relative;
		max-height: var(--toc-max-height, 90vh);
		padding: var(--toc-padding, 1em 1em 0);
		overflow: var(--toc-overflow, auto);
		overscroll-behavior: contain;
	}

	aside.toc > nav > ol {
		padding: var(--toc-ol-padding, 0);
		margin: var(--toc-ol-margin);
		list-style: var(--toc-ol-list-style, none);
	}

	.toc-title {
		padding: var(--toc-title-padding);
		margin: var(--toc-title-margin);
	}

	aside.toc > nav > ol > li {
		padding: 0.5em 1em;
		margin: var(--toc-li-margin);
		color: var(--toc-li-color);
		cursor: pointer;
		border: var(--toc-li-border);
		border-radius: var(--toc-li-border-radius);
	}

	aside.toc > nav > ol > li:hover {
		color: var(--toc-li-hover-color, cornflowerblue);
		background: var(--toc-li-hover-bg);
	}

	aside.toc > nav > ol > li.active {
		font-weight: var(--toc-active-font-weight);
		color: var(--toc-active-color, white);
		background: var(--toc-active-bg, cornflowerblue);
		border: var(--toc-active-border);
		border-width: var(--toc-active-border-width);
		border-radius: var(--toc-active-border-radius, 2pt);
	}

	aside.toc > button {
		position: absolute;
		right: 0;
		bottom: 0;
		z-index: 2;
		padding: var(--toc-mobile-btn-padding, 2pt 3pt);
		font-size: 2em;
		line-height: 0;
		color: var(--toc-mobile-btn-color, black);
		cursor: pointer;
		background: var(--toc-mobile-btn-bg, rgb(255 255 255 / 20%));
		border: none;
		border-radius: var(--toc-mobile-btn-border-radius, 4pt);
	}

	aside.toc > nav > .toc-title {
		margin-top: 0;
	}

	aside.toc.mobile {
		position: fixed;
		right: var(--toc-mobile-right, 1em);
		bottom: var(--toc-mobile-bottom, 1em);
	}

	aside.toc.mobile > nav {
		right: 0;
		z-index: -1;
		box-sizing: border-box;
		width: var(--toc-mobile-width, 16em);
		background: var(--toc-mobile-bg, white);
		border: var(--toc-mobile-border);
		border-radius: 3pt;
		box-shadow: var(--toc-mobile-shadow);
	}

	aside.toc.desktop {
		position: sticky;
		top: 0;
		top: var(--toc-desktop-sticky-top, 2em);
		right: 0;
		max-width: var(--toc-desktop-max-width);
		margin: var(--toc-desktop-nav-margin);

		/* max-width: 200px; */
		background: var(--toc-desktop-bg);
	}

	.close-btn {
		border: none;
		font-size: 2rem;
		cursor: pointer;
		display: flex;
		margin-left: auto;
	}
</style>
