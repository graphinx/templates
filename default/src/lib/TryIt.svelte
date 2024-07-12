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
	import { buildSchema, Kind, parse, type DocumentNode, type TypeNode } from 'graphql';
	import { onMount, tick } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import CloseIcon from './icons/CloseIcon.svelte';
	import PadlockIcon from './icons/PadlockIcon.svelte';
	import PlayIcon from './icons/PlayIcon.svelte';
	import { tryitText } from './tryit';
	import { PUBLIC_API_URL } from '$env/static/public';
	import ExpandIcon from './icons/ExpandIcon.svelte';
	import CollapseIcon from './icons/CollapseIcon.svelte';
	import 'highlight.js/styles/atom-one-dark-reasonable.min.css';
	import hljs from 'highlight.js';
	import { highlightActiveLine } from '@codemirror/view';
	import { fade } from 'svelte/transition';
	import { browser } from '$app/environment';
	import ButtonRainbowOutline from './ButtonRainbowOutline.svelte';

	let schema = buildSchema(data.schema);
	let docStore: Writable<string> | undefined;
	let token: string | null = null;

	let resultDataHeight = 0;
	onMount(async () => {
		if (!browser) return;
		const result = document.querySelector('.result');
		const resultHeader = document.querySelector('.result h2');
		await tick();
		if (result && resultHeader)
			resultDataHeight =
				result.getBoundingClientRect().height - resultHeader.getBoundingClientRect().height;
		console.log(result?.getBoundingClientRect());
		console.log({ resultDataHeight });
	});

	function ensureMinimumNewlines(text: string, min: number) {
		let lines = text.split('\n');
		if (lines.length < min) {
			lines.push(...Array(min - lines.length).fill(''));
		}
		return lines.join('\n');
	}

	tryitText.subscribe((txt) => {
		docStore?.set(ensureMinimumNewlines(txt, 10));
	});

	let queryDocument: DocumentNode | undefined;
	$: try {
		queryDocument = parse($docStore ?? '');
	} catch (e) {
		// console.error(e);
	}

	function printType(t: TypeNode): string {
		if (t.kind === Kind.NAMED_TYPE) {
			return t.name.value;
		}

		if (t.kind === Kind.NON_NULL_TYPE) {
			return `${printType(t.type)}!`;
		}

		return `[${printType(t.type)}]`;
	}

	$: variableDefs = [
		...new Set(
			queryDocument?.definitions
				.filter((def) => def.kind === Kind.OPERATION_DEFINITION)
				.flatMap(
					(def) =>
						def.variableDefinitions?.map(
							({ variable: { name }, type }) => [name.value, printType(type)] as const
						) ?? []
				)
		)
	].sort();

	let expandedZone: '' | 'request' | 'response' = '';

	let sending = false;
	let serverError = '';
	let serverDataHighlighted = '';
	async function sendRequest() {
		sending = true;
		// await fetch(`${PUBLIC_API_URL}?query=${encodeURIComponent($docStore ?? '')}`, {
		await fetch(PUBLIC_API_URL, {
			method: 'post',
			body: JSON.stringify({
				query: $docStore,
				variables: variableValues
			}),
			headers: {
				'Content-Type': 'application/json',
				Authorization: token ? `Bearer ${token}` : '',
				...headerDefs
			}
		})
			.then((response) => {
				response.json().then((j) => {
					serverDataHighlighted = hljs.highlight(JSON.stringify(j, null, 2), {
						language: 'json'
					}).value;
					serverError = '';
				});
			})
			.catch((err) => {
				serverError = err.message;
			});

		await new Promise((r) => setTimeout(r, 1000));
		sending = false;
	}

	let variableValues: Record<string, string> = {};
	let headerDefs: Record<string, string> = {
		// 'X-Custom-Header': 'feur'
	};

	let dialog: HTMLDialogElement;

	onMount(() => {
		$tryitText = `mutation l($password: String!) { 
				login(email: "lebihae", password: $password)  { 
					...on MutationLoginSuccess {
						data{token}
					}
					...on Error {
						message
					}
				}
			}`;
		variableDefs = [['password', 'String!']];
		variableValues = { password: 'feur' };
		dialog.showModal();
	});
</script>

<dialog id="tryit" bind:this={dialog}>
	<div class="modal-content">
		<header>
			<h1>Test it live!</h1>
			<button
				on:click={() => {
					const newVal = token ? null : 'quoicoufeurshikanokono';
					console.log(`Token: ${token} -> ${newVal}`);
					token = newVal;
				}}
				class="auth"
				style:color="var(--{token ? 'red' : 'cyan'})"
			>
				<PadlockIcon unlocked={Boolean(token)} />
				{#if token}
					Log out
				{:else}
					Authenticate
				{/if}

				<!-- <dialog id="tryit-auth"></dialog> -->
			</button>
			<button class="close" on:click={() => dialog.close()}>
				<CloseIcon />
			</button>
		</header>
		<section class="editor" data-expanded-zone={expandedZone}>
			<div class="codemirror">
				<h2>
					Query
					<button
						class="regular"
						on:click={() => {
							expandedZone = expandedZone === 'request' ? '' : 'request';
						}}
					>
						{#if expandedZone === 'request'}
							<CollapseIcon />
						{:else}
							<ExpandIcon />
						{/if}
					</button>
				</h2>
				<CodeMirror bind:docStore doc="" extensions={[basicSetup, graphqlLangageSupport(schema)]} />
				<div class="actions">
					<ButtonRainbowOutline disabled={sending} stopped={!sending} on:click={sendRequest}>
						<div class="play-icon">
							{#if sending}
								<span class="animated-dots">
									<span class="dot-1">·</span><span class="dot-2">·</span><span class="dot-3"
										>·</span
									>
								</span>
							{:else}
								<PlayIcon />
							{/if}
						</div>
						Execute
					</ButtonRainbowOutline>
				</div>
			</div>
			<div class="result">
				<h2>
					Result

					<button
						class="regular leftspaced"
						on:click={() => {
							expandedZone = expandedZone === 'response' ? '' : 'response';
						}}
					>
						{#if expandedZone === 'response'}
							<CollapseIcon />
						{:else}
							<ExpandIcon />
						{/if}
					</button>
				</h2>
				{#key [sending, serverError, serverDataHighlighted]}
					<section class="result-data" class:sending transition:fade={{ duration: 200 }}>
						{#if sending}
							<div class="loading" style:top={resultDataHeight / 2 - 30 + 'px'}>
								<span class="animated-dots">
									Loading
									<span class="dot-1">.</span>
									<span class="dot-2">.</span>
									<span class="dot-3">.</span>
								</span>
							</div>
						{:else if serverError}
							<pre class="errored">{serverError}</pre>
						{:else}
							<pre class="data">{@html serverDataHighlighted}</pre>
						{/if}
					</section>
				{/key}
			</div>
			<div class="variables">
				<h2>Variables</h2>
				<dl>
					{#each variableDefs as [name, type] (name)}
						<dt>
							<label for="tryit-variable-{name}">${name}</label>
						</dt>
						<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<dd
							on:click={(e) => {
								if (e.target !== e.currentTarget) return;
								e.currentTarget.querySelector('input')?.focus();
							}}
						>
							<input
								type="text"
								name="${name}"
								id="tryit-variable-{name}"
								placeholder={type}
								bind:value={variableValues[name]}
							/>
						</dd>
					{/each}
				</dl>
			</div>
			<div class="headers">
				<h2>Headers</h2>
				<dl>
					{#if token}
						<dt>Authorization</dt>
						<dd class="locked">Bearer {@html '&bull;'.repeat(token.length)}</dd>
					{/if}
					{#each Object.keys(headerDefs) as key (key)}
						<dt><label for="tryit-header-{key}">{key}</label></dt>
						<dd>
							<input
								type="text"
								name="header-{key}"
								id="tryit-header-{key}"
								bind:value={headerDefs[key]}
							/>
						</dd>
					{/each}
				</dl>
			</div>
		</section>
	</div>
</dialog>

<style>
	#tryit[open] {
		margin: 0;
		margin-left: auto;
		height: 100vh;
		display: flex;
		background-color: var(--bg);
		border: none;
		color: var(--fg);
	}

	#tryit::backdrop {
		background-color: rgba(0, 0, 0, 0.75);
	}

	.modal-content {
		width: 66vw;
		max-width: 1200px;
		padding: 0.5em 2em;
		display: grid;
		grid-template-rows: 5rem auto;
	}

	button {
		cursor: pointer;
		background: transparent;
		border: none;
		box-shadow: none;
		color: currentColor;
		font-size: 1em;
	}

	button.auth {
		font-size: 1.25em;
		border: 1px solid currentColor;
		border-radius: 0.5em;
		display: inline-flex;
		align-items: center;
		column-gap: 0.25em;
		padding: 0.25em 0.5em;
		transition: all 200ms ease;
	}

	button.auth:hover,
	button.auth:focus-visible {
		box-shadow: inset 0 0 2px 3px currentColor;
		font-weight: bold;
	}

	button.close {
		font-size: 2rem;
	}

	.editor button.regular:hover,
	.editor button.regular:focus-visible {
		background-color: var(--bg);
		border-color: color-mix(in srgb, var(--fg) 50%, var(--shadow));
	}

	.editor button.regular:active {
		border-color: var(--fg);
	}

	.editor button.regular {
		padding: 0.5em;
		border-radius: 0.5em;
		display: flex;
		justify-content: center;
		align-items: center;
		border: transparent 2px solid;
	}

	.codemirror .actions {
		position: absolute;
		bottom: 1rem;
		right: 1rem;
		z-index: 10;
	}

	.play-icon {
		display: flex;
		align-items: center;
		width: 1em;
		height: 1em;
	}

	.editor .codemirror {
		background-color: white;
		color: black;
		--fg: black;
		--bg: white;
		position: relative;
		overflow: auto;
	}

	.result-data {
		position: relative;
	}

	.result-data > * {
		position: absolute;
		overflow: auto;
		width: 100%;
	}

	.result-data .loading {
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		overflow: visible;
		justify-content: center;
		align-items: center;
	}

	.result-data .data {
		font-size: 0.9rem;
	}

	.result-data .errored {
		color: var(--red);
	}

	.editor > div {
		padding: 0 1.5em;
		border-radius: 1rem;
		background-color: var(--shadow);
		transition: opacity 200ms ease;
	}

	.editor .variables,
	.editor .headers {
		overflow: auto;
	}

	.editor > div h2 {
		display: flex;
		align-items: center;
		column-gap: 1rem;
	}

	.editor > div h2 button.leftspaced {
		margin-left: auto;
	}

	.editor {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: auto min(250px, 40%);
		gap: 2rem;
		transition: all 200ms ease;
	}

	.editor[data-expanded-zone='response'] {
		grid-template-columns: 50px auto;
		grid-template-rows: auto 50px;
	}
	.editor[data-expanded-zone='request'] {
		grid-template-columns: auto 50px;
		grid-template-rows: auto 50px;
	}

	.editor[data-expanded-zone='response'] > div:not(.result) {
		opacity: 0.5;
		overflow: hidden;
	}
	.editor[data-expanded-zone='request'] > div:not(.codemirror) {
		opacity: 0.5;
		overflow: hidden;
	}

	.editor dl {
		display: grid;
		grid-template-columns: max-content auto;
		column-gap: 0.75rem;
		row-gap: 1rem;
	}

	.editor dt {
		display: flex;
		align-self: center;
	}

	.editor dd {
		border-radius: 0.5em;
		margin-left: 0;
		padding: 0.5em 1em;
		border: 2px solid transparent;

	}

	.editor dd.locked {
		border: 2px dashed var(--bg);
		color: var(--muted);
	}

	.editor dd:not(.locked) {
		background-color: var(--bg);
	}

	.editor dd:hover {
		border-color: var(--muted);
	}

	.editor dd:focus-within {
		border-color: var(--fg);
	}

	.editor dd input {
		background-color: var(--bg);
		border: none;
		padding: none;
		font-size: 1em;
		color: currentColor;
		width: 100%;
	}

	.editor dd input:focus {
		border: none;
		outline: none;
	}

	.editor dd input::placeholder {
		color: var(--muted);
	}

	header {
		display: flex;
		align-items: center;
		column-gap: 2rem;
	}

	header .close {
		margin-left: auto;
	}

	@keyframes loading-dot {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.animated-dots .dot-1 {
		animation: loading-dot 1s infinite 0.1s;
	}

	.animated-dots .dot-2 {
		animation: loading-dot 1s infinite 0.2s;
	}

	.animated-dots .dot-3 {
		animation: loading-dot 1s infinite 0.3s;
	}
</style>
