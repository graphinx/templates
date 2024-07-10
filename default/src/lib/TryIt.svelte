<script lang="ts" context="module">
	export function summon(defaultDocument: string) {
		tryitText.set(defaultDocument);
		const dialog = document.getElementById('tryit') as HTMLDialogElement;
		dialog.showModal();
	}
</script>

<script lang="ts">
	import CodeMirror, { basicSetup } from '$lib/CodeMirror.svelte';
	import { data } from '$lib/data.generated';
	import { graphql as graphqlLangageSupport } from 'cm6-graphql';
	import { buildSchema } from 'graphql';
	import { writable, type Writable } from 'svelte/store';
	import { tryitText } from './tryit';

	let schema = buildSchema(data.schema);
	let docStore: Writable<string> | undefined;

	tryitText.subscribe((txt) => {
		docStore?.set(txt);
	});
</script>

<dialog id="tryit">
	<CodeMirror bind:docStore doc="" extensions={[basicSetup, graphqlLangageSupport(schema)]} />
</dialog>

<style>
	#tryit {
		max-width: 600px;
	}
</style>
