<script lang="ts">
	import HashLink from '$lib/HashLink.svelte';
	import TypeKindIndicator from '$lib/TypeKindIndicator.svelte';
	import { pascalToKebab } from '$lib/casing';
	import { markdownToHtml } from '$lib/markdown';
	import { findTypeInSchema } from '$lib/schema-utils';
	import type { ModuleItem } from 'graphinx';
	import {
		type GraphQLNamedType,
		type GraphQLSchema,
		isEnumType,
		isInputObjectType,
		isInterfaceType,
		isObjectType,
		isScalarType,
		isUnionType
	} from 'graphql';
	import ArgType from './ArgType.svelte';
	import Query from './Query.svelte';
	import { linkToItem } from '$lib/links';

	export let type: GraphQLNamedType;
	export let allItems: ModuleItem[];
	export let schema: GraphQLSchema;
	export let renderTitle = false;
	export let moduleName: string;
	$: item = allItems.find((i) => i.name === type.name);
	$: fields =
		isObjectType(type) || isInputObjectType(type) || isInterfaceType(type)
			? Object.values(type.getFields())
			: [];
</script>

<article>
	<section class="doc">
		<HashLink
			data-toc-title={type.name}
			element={renderTitle ? 'h4' : 'h3'}
			href={linkToItem(item)}
		>
			{#if type.astNode?.kind}
				<TypeKindIndicator kind={type.astNode?.kind}></TypeKindIndicator>
			{/if}
			<code class="no-color">{type.name}</code>
			{#if item?.sourceCodeURL}
				<a href={item.sourceCodeURL} class="source-code">[src]</a>
			{/if}
		</HashLink>
		{#await markdownToHtml(type.description ?? '', allItems) then doc}
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html doc}
		{:catch error}
			<p>Impossible de rendre la documentation pour {type.name}: {error}</p>
		{/await}
	</section>
	<section class="fields">
		{#if fields.length > 0}
			<ul>
				{#each fields as field}
					<li>
						<Query {allItems} {schema} kind="field" query={{ args: [], ...field }}></Query>
					</li>
				{/each}
			</ul>
		{:else if isEnumType(type)}
			<ul>
				{#each type.getValues() ?? [] as { name, description }}
					<li>
						<code class="no-color">
							{#if description}
								<strong>{name}</strong>
							{:else}{name}{/if}
						</code>
						<div class="doc">
							{#await markdownToHtml(description ?? '', allItems) then doc}
								<!-- eslint-disable-next-line svelte/no-at-html-tags -->
								{@html doc}
							{:catch error}
								<p>Impossible de rendre la documentation pour {name}: {error}</p>
							{/await}
						</div>
					</li>
				{/each}
			</ul>
		{:else if isUnionType(type)}
			{@const possibleTypes = (type.getTypes() ?? [])
				.map((t) => findTypeInSchema(schema, t.name))
				.filter(Boolean)}
			<ul>
				{#each possibleTypes as t}
					<li>
						<ArgType {allItems} {schema} nullable={false} typ={t}></ArgType>
						<div class="doc">
							{#await markdownToHtml(t.description ?? '', allItems) then doc}
								<!-- eslint-disable-next-line svelte/no-at-html-tags -->
								{@html doc}
							{:catch error}
								<p>Impossible de rendre la documentation pour {moduleName}: {error}</p>
							{/await}
						</div>
					</li>
				{/each}
			</ul>
		{:else if isScalarType(type)}
			<ArgType {allItems} {schema} nullable={false} typ={type}></ArgType>
		{/if}
	</section>
</article>

<style>
	.source-code {
		margin-left: 1em;
	}
</style>
