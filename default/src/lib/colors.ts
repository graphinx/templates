import { browser } from '$app/environment';
import { get, writable } from 'svelte/store';
import { data } from './data.generated';

export const colorNames = writable([] as string[]);

export function loadColorNames() {
	if (!browser) return;

	const colorsStylesheet = [...document.styleSheets].find((d) => d.href?.endsWith('colors.css'));

	const colorsRootCssRule = [...(colorsStylesheet?.cssRules ?? [])].find(
		(r) => r instanceof CSSStyleRule && r.selectorText === ':root'
	) as CSSStyleRule;

	colorNames.set([...colorsRootCssRule.style].map((n) => n.replace(/^--/, '')));
}

export function moduleColor(module: string): string {
	return data.modules.find((m) => m.name === module)?.metadata?.color || get(colorNames)[0];
}
