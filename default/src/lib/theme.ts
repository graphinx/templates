import { writable } from 'svelte/store';

export const currentTheme = writable<'dark' | 'light'>('dark');

export function setupThemeListener() {
	currentTheme.set(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
	window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
		currentTheme.set(e.matches ? 'dark' : 'light');
	});

	currentTheme.subscribe((theme) => {
		document.documentElement.setAttribute('data-theme', theme);
	});
}
