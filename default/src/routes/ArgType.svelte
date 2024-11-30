<script lang="ts">
	import { run } from 'svelte/legacy';
	import ArgType from './ArgType.svelte';
	import { data } from '$lib/data.generated';
	import { linkToItem } from '$lib/links';
	import { drillToNamedType } from '$lib/schema-utils';
	import type { ModuleItem } from 'graphinx';
	import {
		type GraphQLEnumValue,
		type GraphQLNamedType,
		type GraphQLObjectType,
		GraphQLScalarType,
		type GraphQLSchema,
		type GraphQLType,
		isEnumType,
		isInputObjectType,
		isInterfaceType,
		isListType,
		isNamedType,
		isNonNullType,
		isObjectType,
		isScalarType,
		isUnionType
	} from 'graphql';

	interface Props {
		schema: GraphQLSchema;
		linkify?: boolean;
		allItems: ModuleItem[];
		typ: GraphQLType;
		inline?: boolean;
		nullable?: boolean;
		noExpandEnums?: boolean;
		invertNullabilitySign?: boolean;
		explicitNullabilitySign?: boolean;
		underlyingType?: GraphQLNamedType | undefined;
		enumWasExpanded?: boolean;
	}

	let {
		schema,
		linkify = true,
		allItems,
		typ,
		inline = false,
		nullable = true,
		noExpandEnums = false,
		invertNullabilitySign = true,
		explicitNullabilitySign = false,
		underlyingType = $bindable(undefined),
		enumWasExpanded = $bindable(false)
	}: Props = $props();

	function getEnumValues(t: GraphQLType): GraphQLEnumValue[] {
		try {
			if (isEnumType(t)) return Object.values(t.getValues()) ?? [];
		} catch {
			return [];
		}
		return [];
	}

	function getUnionValues(t: GraphQLType): readonly GraphQLObjectType[] {
		try {
			if (isUnionType(t)) return t.getTypes() ?? [];
		} catch {
			return [];
		}
		return [];
	}

	function willExpandEnum(t: GraphQLType) {
		const valuesCount = isEnumType(t)
			? getEnumValues(t).length
			: isUnionType(t)
				? getUnionValues(t).length
				: 0;
		return Boolean(
			(isEnumType(t) || isUnionType(t)) &&
				enumValues &&
				!noExpandEnums &&
				(inline ? valuesCount <= 3 : true) &&
				valuesCount <= 10
		);
	}
	let item = $derived(isNamedType(typ) ? allItems.find((i) => i.name === typ.name) : undefined);
	let resultSuccessType = $derived(
		item?.result?.successDataType
			? allItems.find((i) => i.name === item.result?.successDataType)
			: undefined
	);
	let resultErrorTypes = $derived(
		item?.result?.errorTypes
			? item.result.errorTypes.map((name) => allItems.find((i) => i.name === name)).filter(Boolean)
			: []
	);
	let connectionNodeType = $derived(
		item?.connection?.nodeType
			? allItems.find((i) => i.name === item.connection?.nodeType)
			: undefined
	);
	$effect(() => {
		if (resultSuccessType)
			underlyingType = drillToNamedType(schema.getType(resultSuccessType.name)) ?? underlyingType;
	});
	$effect(() => {
		if (connectionNodeType)
			underlyingType = drillToNamedType(schema.getType(connectionNodeType.name)) ?? underlyingType;
	});
	$effect(() => {
		enumWasExpanded = willExpandEnum(typ);
	});
	let enumValues = $derived(getEnumValues(typ));
</script>

<!-- Need to avoid extraneous whitespace, so the code is ugly like that. Sowwy ._. -->
{#if !typ}(none){:else}{#if isEnumType(typ)}{#if !willExpandEnum(typ)}<a
				href={linkify ? linkToItem(item) : undefined}
				title={(enumValues || []).map((v) => v.name).join(' | ')}
				class="type enum">{typ.name}</a
			>{:else}{#if nullable}({/if}{#each Object.entries(enumValues) as [i, value]}<span
					class="type enum enum-value">{value.name}</span
				>{#if Number(i) < enumValues.length - 1}<span class="type enum enum-value-separator"
						>&nbsp;|&#x20;</span
					>{/if}{/each}{#if nullable}){/if}{/if}{:else if isInputObjectType(typ)}<a
			href={linkify ? linkToItem(item) : undefined}
			class="type input">{typ.name}</a
		>{:else if isInterfaceType(typ)}<span class="type interface">{typ.name}</span
		>{:else if isListType(typ)}<span class="type array">[</span><ArgType
			{schema}
			{allItems}
			noExpandEnums={true}
			{nullable}
			{linkify}
			{inline}
			typ={typ.ofType}
		/><span class="type array">]</span>{:else if isNonNullType(typ)}<ArgType
			{schema}
			{allItems}
			{noExpandEnums}
			{linkify}
			{inline}
			nullable={false}
			typ={typ.ofType}
		/>{:else if isObjectType(typ)}{#if connectionNodeType}<span class="type connection"
				><span
					class="type connection"
					title="Returns a paginated object. Items are accessible in the field {data.config.relay
						?.node ?? 'edges.node'}">Connection</span
				>&lt;<ArgType
					{schema}
					{allItems}
					{noExpandEnums}
					{inline}
					{linkify}
					{nullable}
					typ={underlyingType}
				></ArgType>&gt;</span
			>{:else}<a class="type object" href={linkify ? linkToItem(item) : undefined}>{typ.name}</a
			>{/if}{:else if isScalarType(typ)}<span class="type scalar">{typ.name}</span
		>{:else if isUnionType(typ)}{#if item?.result?.successDataType}<span class="type errorable"
				><span
					class="type errorable"
					title="May return a success object that has data in the field {data.config.errors
						?.data}, or one of these errors: {resultErrorTypes.map((i) => i?.name).join(', ')}"
					>Result</span
				>&lt;<ArgType
					{schema}
					{allItems}
					{linkify}
					{inline}
					{noExpandEnums}
					{nullable}
					typ={underlyingType ?? new GraphQLScalarType({ name: item.result.successDataType })}
				></ArgType>&gt;</span
			>{:else if willExpandEnum(typ)}{#if nullable}({/if}<span class="type union">
				{#each Object.entries(getUnionValues(typ)) as [i, value]}
					<ArgType {schema} {allItems} nullable={false} noExpandEnums {inline} typ={value}
					></ArgType>{#if Number(i) < getUnionValues(typ).length - 1}&nbsp;<strong>|</strong
						>&nbsp;{/if}{/each}</span
			>{#if nullable}){/if}{:else}<a href={linkify ? linkToItem(item) : undefined}>{typ.name}</a
			>{/if}{:else}<span class="type unknown">unknown</span>{/if}<span
		class:nullable
		class:non-nullable={isNonNullType(typ)}
		>{#if invertNullabilitySign}{#if !isNonNullType(typ) && nullable}{#if explicitNullabilitySign}&nbsp;|&#x20;null{:else}<span
						title="Peut être null">?</span
					>{/if}{/if}{:else if isNonNullType(typ)}!{/if}</span
	>{/if}

<style>
	.connection {
		color: var(--magenta);
	}

	.scalar {
		color: var(--orange);
	}

	.enum {
		color: var(--yellow);
	}

	.enum.enum-value-separator {
		font-weight: bold;
		color: var(--fg);
	}

	.object {
		color: var(--blue);
	}

	.union {
		color: var(--pink);
	}

	.errorable,
	.nullable {
		font-weight: bold;
		color: var(--red);
	}

	.array {
		font-weight: bold;
		color: var(--fg);
	}

	.input {
		color: var(--cyan);
	}
</style>
