<script lang="ts">
	import HashLink from '$lib/HashLink.svelte';
	import TypeKindIndicator from '$lib/TypeKindIndicator.svelte';
	import { linkToItem } from '$lib/links';
	import { markdownToHtml } from '$lib/markdown';
	import { findTypeInSchema } from '$lib/schema-utils';
	import type { ModuleItem } from 'graphinx';
	import {
		GraphQLInterfaceType,
		type GraphQLNamedType,
		type GraphQLSchema,
		isEnumType,
		isInputObjectType,
		isInterfaceType,
		isObjectType,
		isUnionType,
		Kind
	} from 'graphql';
	import ArgType from './ArgType.svelte';
	import Query from './Query.svelte';

	interface Props {
		type: GraphQLNamedType;
		allItems: ModuleItem[];
		schema: GraphQLSchema;
		headingLevel?: null | 'h3' | 'h4';
		moduleName?: string | undefined;
	}

	let {
		type,
		allItems,
		schema,
		headingLevel = 'h3',
		moduleName = $bindable(undefined)
	}: Props = $props();

	let implementedInterfaces = $derived(
		(isObjectType(type)
			? type
					.getInterfaces()
					.map((intf) => [intf, allItems.find((i) => i.name === intf.name)])
					.filter(([, i]) => Boolean(i))
			: []) as Array<[GraphQLInterfaceType, ModuleItem]>
	);

	$effect(() => {
		moduleName ??= allItems.find((i) => i.name === type.name)?.moduleName;
	});

	let item = $derived(allItems.find((i) => i.name === type.name));
	let fields = $derived(
		isObjectType(type) || isInputObjectType(type) || isInterfaceType(type)
			? Object.values(type.getFields())
			: []
	);
</script>

<article class:tight={!headingLevel}>
	<!-- <section class="doc">
		{#if headingLevel}
			<HashLink data-toc-title={type.name} element={headingLevel} href={linkToItem(item)}>
				{#if type.astNode?.kind}
					<TypeKindIndicator kind={type.astNode?.kind}></TypeKindIndicator>
				{/if}
				<code class="no-color">{type.name}</code>
				{#if item?.sourceCodeURL}
					<a href={item.sourceCodeURL} class="source-code">[src]</a>
				{/if}
				{#if implementedInterfaces.length > 0}
					<span class="implements">
						<em>implements</em>
						{#each implementedInterfaces.entries() as [i, [intf, item]]}
							{#if i > 0},
							{/if}
							<a href={linkToItem(item)}>{item.name}</a>
						{/each}
					</span>
				{/if}
			</HashLink>
		{/if}
		{#await markdownToHtml(type.description ?? '', allItems) then doc}
			{@html doc}
		{:catch error}
			<p>Impossible de rendre la documentation pour {type.name}: {error}</p>
		{/await}
	</section> -->
	<!-- <section class="fields">
		{#if fields.length > 0}
			<ul>
				{#each fields as field}
					<li>
						<Query {allItems} {schema} kind="field" query={{ args: [], ...field }}></Query>
					</li>
				{/each}
			</ul>
			{#each implementedInterfaces as [intf, item]}
				{@const intfFields = Object.values(intf.getFields()).filter(
					(f) => !fields.some((f2) => f2.name === f.name)
				)}
				{#if intfFields.length > 0}
					<p class="from-interface">
						<em
							title="Those fields are available on {type.name} because it implements the {intf.name} interface"
							>from</em
						>
						<a href={linkToItem(item)} title={intf.description}>
							<TypeKindIndicator kind={Kind.INTERFACE_TYPE_DEFINITION}></TypeKindIndicator>
							{item.name}
						</a>
					</p>
					<ul>
						{#each intfFields as field}
							<li>
								<Query {allItems} {schema} kind="field" query={field}></Query>
							</li>
						{/each}
					</ul>
				{/if}
			{/each}
		{:else if isEnumType(type)}
			<ul>
				{#each type.getValues() ?? [] as { name, description, deprecationReason }}
					<li title={deprecationReason}>
						<code class="no-color" class:deprecated={deprecationReason}>
							{#if description}
								<strong>{name}</strong>
							{:else}{name}{/if}
						</code>
						<div class="doc">
							{#await markdownToHtml(description ?? '', allItems) then doc}
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
								{@html doc}
							{:catch error}
								<p>Impossible de rendre la documentation pour {moduleName}: {error}</p>
							{/await}
						</div>
					</li>
				{/each}
			</ul>
		{/if}
	</section> -->
</article>

<style>
	.source-code {
		margin-left: 1em;
	}

	article.tight {
		margin: 0;
	}

	.implements {
		font-size: 0.75em;
		font-weight: normal;
		margin-left: 0.5em;
	}

	.from-interface {
		font-size: 0.75em;
	}

	.from-interface em,
	.implements em {
		margin-right: 0.75em;
		margin-left: 1em;
	}

	.deprecated {
		text-decoration: line-through;
	}
</style>
