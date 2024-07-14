<script lang="ts">
	import { page } from '$app/stores';
	import HashLink from '$lib/HashLink.svelte';
	import LiveIndicator from '$lib/LiveIndicator.svelte';
	import * as tryit from '$lib/TryIt.svelte';
	import { pascalToKebab } from '$lib/casing';
	import { linkToItem } from '$lib/links';
	import { markdownToHtml } from '$lib/markdown';
	import { exampleQuery } from '$lib/tryit';
	import type { ModuleItem } from 'graphinx';
	import {
		type GraphQLField,
		type GraphQLNamedType,
		type GraphQLSchema,
		type GraphQLType,
		isEnumType,
		isInputObjectType,
		isNamedType
	} from 'graphql';
	import { onMount } from 'svelte';
	import ArgType from './ArgType.svelte';
	import TypeDef from './TypeDef.svelte';

	export let schema: GraphQLSchema;
	export let allItems: ModuleItem[];
	export let query: GraphQLField<unknown, unknown>; //| GraphQLArgument;
	export let kind: 'query' | 'mutation' | 'subscription' | 'field';
	export let hasAvailableSubscription = false;
	// export let showReturnType = false;
	export let typeIsEnumAndWasExpanded = false;

	$: item = allItems.find((i) => i.name === query.name);
	$: args = query.args ?? [];
	$: unwrappedReturnType = firstNonWrapperType(query.type);

	let mobile = false;
	onMount(() => {
		mobile = window.innerWidth < 768;
	});

	/**
	 * Used to insert the "Try it" button in line with the description
	 * Returns [first paragraph innerHTML, rest of the html]
	 * @param renderedMarkdown
	 */
	function unwrapFirstParagraph(renderedMarkdown: string): [string, string] {
		// Parsing HTML with Regex is A-OK here since this HTML was generated from markdown
		const firstParagraph = renderedMarkdown.match(/<p>(.*?)<\/p>/)?.[1] ?? '';
		const rest = renderedMarkdown.replace(/<p>.*?<\/p>/, '');
		return [firstParagraph, rest];
	}

	function syntaxHighlightTypeName(t: GraphQLType): string {
		if (isEnumType(t)) return 'enum';
		return isNamedType(t) ? t.name : t.ofType ? syntaxHighlightTypeName(t.ofType) : 'Unknown';
	}
	// if the item's return type is only referenced in one type, and it's an object, we can expand it into its fields
	function expandTypedef(t: GraphQLType) {
		const name = firstNonWrapperType(t)?.name ?? '';
		const item = allItems.find((i) => i.name === name);
		if (!item) return false;
		return item.referencedBy.length === 1;
	}

	function firstNonWrapperType(t: GraphQLType): GraphQLNamedType | null {
		if (!isNamedType(t)) return t.ofType ? firstNonWrapperType(t.ofType) : null;
		return t;
	}

	function defaultValueString(v: unknown): string {
		try {
			return JSON.stringify(v);
		} catch (error) {
			return `(unserializable: ${error})`;
		}
	}

	$: tryitQuery = exampleQuery(schema, kind, query);
	$: hash = kind !== 'field' ? linkToItem(item) : undefined;
	$: showArgumentTypesInHeader = !mobile && !(kind === 'field' && args.length > 2);

	$: headingLevel = $page.url.pathname === '/' ? 'h4' : 'h3';
</script>

<svelte:window
	on:resize={() => {
		mobile = window.innerWidth < 768;
	}}
/>

<svelte:element this={kind === 'field' ? 'div' : 'article'} data-kind={kind}>
	<HashLink
		data-toc-title={query.name}
		href={hash}
		element={kind === 'field' ? 'span' : headingLevel}
	>
		{#if hasAvailableSubscription}
			<LiveIndicator></LiveIndicator>
		{/if}
		{#if kind === 'field' && args && args.length === 0}
			<code class="no-color"
				><svelte:element
					this={typeIsEnumAndWasExpanded ? 'a' : 'span'}
					href="#{query.name}"
					class="field-name">{query.name}</svelte:element
				>:
			</code><ArgType
				linkify={!unwrappedReturnType || !expandTypedef(unwrappedReturnType)}
				noExpandEnums={Boolean(unwrappedReturnType && expandTypedef(unwrappedReturnType))}
				{allItems}
				{schema}
				bind:enumWasExpanded={typeIsEnumAndWasExpanded}
				typ={query.type}
			></ArgType>
			{#if unwrappedReturnType && expandTypedef(unwrappedReturnType)}
				<TypeDef headingLevel={null} {allItems} {schema} type={unwrappedReturnType}></TypeDef>
			{/if}
		{:else}
			<code class="no-color"
				>{query.name}({#if !mobile}&#8203;{/if}{#if args && args.length >= (mobile ? 3 : 5)}<span
						class="too-many-args">...</span
					>{:else}{#each Object.entries(args) as [i, { name, type, defaultValue }]}{name}{#if showArgumentTypesInHeader}:&nbsp;<ArgType
								{allItems}
								{schema}
								noExpandEnums={Boolean(defaultValue)}
								inline
								typ={type}

							></ArgType>{/if}{#if defaultValue !== null && defaultValue !== undefined}&nbsp;=&nbsp;<span
								class="literal {pascalToKebab(syntaxHighlightTypeName(type))}">{defaultValue}</span
							>{/if}{#if Number(i) < args.length - 1},&#x20;&#8203;{/if}{/each}{/if})</code
			>&#x20;&rarr;&nbsp;<code class="no-color"
				><ArgType {allItems} {schema} inline typ={query.type}></ArgType></code
			>
		{/if}
		<svelte:fragment slot="end">
			{#if !query.description}
				{#await tryitQuery then q}
					{#if q}
						<button class="try" on:click={() => tryit.summon(q)}>Try it</button>
					{/if}
				{/await}
			{/if}
		</svelte:fragment>
	</HashLink>
	{#if query.description}
		<section class="doc">
			{#await markdownToHtml(query.description, $page.data.allResolvers) then doc}
				{@const [firstParagraphInner, remainingHTML] = unwrapFirstParagraph(doc)}
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				<p>
					{@html firstParagraphInner}
					{#await tryitQuery then q}
						{#if q}
							<button class="try inline" on:click={() => tryit.summon(q)}>Try it</button>
						{/if}
					{/await}
				</p>
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				{@html remainingHTML}
			{:catch error}
				<p>Impossible de rendre la documentation pour {query.name}: {error}</p>
			{/await}
		</section>
	{/if}

	{#if 'isDeprecated' in query && query.isDeprecated}
		<section class="deprecated">
			<p class="subtitle">Déprécié</p>
			{#if query.deprecationReason}
				{#await markdownToHtml(query.deprecationReason, $page.data.allResolvers)}
					<p>{query.deprecationReason}</p>
				{:then deprecationReason}
					<!-- eslint-disable-next-line svelte/no-at-html-tags -->
					{@html deprecationReason}
				{:catch}
					<p>{query.deprecationReason}</p>
				{/await}
			{/if}
		</section>
	{/if}
	{#if args.length > 0 && (args.some( (arg) => arg.description?.trim() ) || !showArgumentTypesInHeader)}
		<section class="args">
			<p class="subtitle">Arguments</p>
			<ul>
				{#each args as arg}
					<li>
						<code class="no-color">{arg.name}: </code>
						<span class="type">
							<code class="no-color">
								<ArgType {allItems} {schema} typ={arg.type} />
							</code>
						</span>
						{#if arg.defaultValue}
							<span class="default-value">
								<code class="no-color">
									= <span class="literal {pascalToKebab(syntaxHighlightTypeName(arg.type))}"
										>{defaultValueString(arg.defaultValue)}</span
									>
								</code>
							</span>
						{/if}
						{#if arg.description}
							<div class="doc">
								{#await markdownToHtml(arg.description, $page.data.allResolvers) then doc}
									<!-- eslint-disable-next-line svelte/no-at-html-tags -->
									{@html doc}
								{:catch error}
									<p>
										Impossible de rendre la documentation pour {arg.name}: {error}
									</p>
								{/await}
							</div>
						{/if}
						{#if expandTypedef(arg.type)}
							{@const innerTypeName = firstNonWrapperType(arg.type)?.name}
							{@const innerType = innerTypeName ? schema.getType(innerTypeName) : undefined}
							{#if innerType}
								<div class="inner-type">
									<ul>
										{#each isInputObjectType(innerType) ? Object.values(innerType.getFields()) ?? [] : [] as field}
											<li>
												<svelte:self {allItems} kind="field" query={field}></svelte:self>
											</li>
										{/each}
									</ul>
								</div>
							{/if}
						{/if}
					</li>
				{/each}
			</ul>
		</section>
	{/if}
</svelte:element>

<style>
	.literal.string {
		color: var(--green);
	}

	.literal.enum {
		color: var(--yellow);
	}

	.literal.int,
	.literal.float {
		color: var(--orange);
	}

	.too-many-args {
		color: var(--pink);
	}

	.subtitle {
		margin-top: 1rem;
		font-weight: bold;
		color: var(--muted);
	}

	.doc {
		padding-top: 0.25rem;
		padding-bottom: 0.75rem;
	}

	button {
		border: none;
		box-shadow: none;
		font-size: 1em;
	}

	button.try {
		margin-left: auto;
		border: 2px solid var(--muted);
		border-radius: 999999px;
		padding: 0.25em 0.5em;
		cursor: pointer;
		font-weight: bold;
		display: inline-block;
		width: max-content;
	}

	button.try:hover,
	button.try:focus-visible {
		background-color: var(--fg);
		border-color: var(--fg);
		color: var(--bg);
	}

	button.try.inline {
		padding: 0.125em 0.5em;
		font-size: 0.85em;
	}

	@media (max-width: 700px) {
		button.try {
			display: none;
		}
	}
</style>
