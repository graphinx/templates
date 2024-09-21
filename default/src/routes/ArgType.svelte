<script lang="ts">
	import { data } from '$lib/data.generated';
	import { linkToItem } from '$lib/links';
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
	import { drillToNamedType } from '$lib/schema-utils';
	import LinkIcon from '$lib/icons/LinkIcon.svelte';

	export let schema: GraphQLSchema;
	export let linkify = true;
	export let allItems: ModuleItem[];
	export let typ: GraphQLType;
	export let inline = false;
	export let nullable = true;
	export let noExpandEnums = false;
	export let invertNullabilitySign = true;
	export let explicitNullabilitySign = false;
	export let underlyingType: GraphQLNamedType | undefined = undefined;
	
	$: item = isNamedType(typ) ? allItems.find((i) => i.name === typ.name) : undefined;
	$: resultSuccessType = item?.result?.successDataType
		? allItems.find((i) => i.name === item.result?.successDataType)
		: undefined;
	$: resultErrorTypes = item?.result?.errorTypes
		? item.result.errorTypes.map((name) => allItems.find((i) => i.name === name)).filter(Boolean)
		: [];
	$: connectionNodeType = item?.connection?.nodeType
		? allItems.find((i) => i.name === item.connection?.nodeType)
		: undefined;

	$: if (resultSuccessType)
		underlyingType = drillToNamedType(schema.getType(resultSuccessType.name)) ?? underlyingType;
	$: if (connectionNodeType)
		underlyingType = drillToNamedType(schema.getType(connectionNodeType.name)) ?? underlyingType;

	export let enumWasExpanded = false;
	$: enumWasExpanded = willExpandEnum(typ);
	$: enumValues = getEnumValues(typ);

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
		>{:else if isListType(typ)}<span class="type array">[</span><svelte:self
			{schema}
			{allItems}
			noExpandEnums={true}
			{nullable}
			{linkify}
			{inline}
			typ={typ.ofType}
		/><span class="type array">]</span>{:else if isNonNullType(typ)}<svelte:self
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
				>&lt;<svelte:self
					{schema}
					{allItems}
					{noExpandEnums}
					{inline}
					{linkify}
					{nullable}
					typ={underlyingType}
				></svelte:self>&gt;</span
			>{:else}<a class="type object" href={linkify ? linkToItem(item) : undefined}>{typ.name}</a
			>{/if}{:else if isScalarType(typ)}<span class="type scalar">{typ.name}</span
		>{:else if isUnionType(typ)}{#if item?.result?.successDataType}<span class="type errorable"
				><span
					class="type errorable"
					title="May return a success object that has data in the field {data.config.errors
						?.data}, or one of these errors: {resultErrorTypes.map((i) => i?.name).join(', ')}"
					>Result</span
				>&lt;<svelte:self
					{schema}
					{allItems}
					{linkify}
					{inline}
					{noExpandEnums}
					{nullable}
					typ={underlyingType ?? new GraphQLScalarType({ name: item.result.successDataType })}
				></svelte:self>&gt;</span
			>{:else}
			{#if willExpandEnum(typ)}{#if nullable}({/if}<span class="type union">
					{#each Object.entries(getUnionValues(typ)) as [i, value]}
						<svelte:self {schema} {allItems} nullable={false} noExpandEnums {inline} typ={value}
						></svelte:self>{#if Number(i) < getUnionValues(typ).length - 1}&nbsp;<strong>|</strong
							>&nbsp;{/if}{/each}</span
				>{#if nullable}){/if}{:else}<a href={linkify ? linkToItem(item) : undefined}>{typ.name}</a
				>{/if}{/if}{:else}<span class="type unknown">unknown</span>{/if}<span
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
