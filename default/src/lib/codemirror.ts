// TODO clean this up, it's a mess
import { EditorView } from '@codemirror/view';
import type { Extension } from '@codemirror/state';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags as t } from '@lezer/highlight';

const c = {
	fg: 'var(--fg)',
	bg: 'var(--bg-darker)',
	bgDarker: 'var(--shadow-2)',
	shadow: 'var(--bg)',
	shadow2: 'var(--shadow)',
	muted: 'var(--muted)',
	green: 'var(--green)',
	magenta: 'var(--magenta)',
	orange: 'var(--orange)',
	yellow: 'var(--yellow)',
	blue: 'var(--blue)',
	pink: 'var(--pink)',
	red: 'var(--red)',
	cyan: 'var(--cyan)'
} as const;

// Colors from https://www.nordtheme.com/docs/colors-and-palettes
// Polar Night
const base00 = c.fg; // black
const base01 = c.fg; // dark grey
const base02 = c.muted;

// Snow Storm
const base06 = c.bg; // white

// Frost
const cyan = c.cyan; // moss green
const blue = c.blue; // ice blue
const pink = c.pink; // water blue

// Aurora
const orange = c.orange; // orange
const yellow = c.yellow; // yellow
const green = c.green; // green
const magenta = c.magenta; // purple

const invalid = c.red;
const darkBackground = c.shadow2;
const highlightBackground = 'var(--selection-on-shadow)';
const tooltipBackground = c.shadow;
const selection = c.bgDarker;
const cursor = c.fg;

/// The editor theme styles for Basic Light.
export const basicLightTheme = EditorView.theme(
	{
		'&': {
			color: c.fg,
			backgroundColor: c.bg
		},

		'.cm-content': {
			caretColor: cursor
		},

		'.cm-gutterElement': {
			color: c.muted
		},

		'.cm-gutterElement.cm-activeLineGutter': {
			color: c.fg
		},

		'.cm-cursor, .cm-dropCursor': { borderLeftColor: cursor },
		'&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection':
			{ backgroundColor: selection },

		'.cm-panels': { backgroundColor: darkBackground, color: c.muted },
		'.cm-panels.cm-panels-top': { borderBottom: '2px solid black' },
		'.cm-panels.cm-panels-bottom': { borderTop: '2px solid black' },

		'.cm-searchMatch': {
			backgroundColor: '#72a1ff59',
			outline: `1px solid ${c.muted}`
		},
		'.cm-searchMatch.cm-searchMatch-selected': {
			backgroundColor: c.bgDarker
		},

		'.cm-activeLine': { backgroundColor: highlightBackground },
		'.cm-selectionMatch': { backgroundColor: c.bgDarker },

		'&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket': {
			outline: `1px solid ${c.muted}`
		},

		'&.cm-focused .cm-matchingBracket': {
			backgroundColor: base06
		},

		'.cm-gutters': {
			backgroundColor: base06,
			color: base00,
			border: 'none'
		},

		'.cm-activeLineGutter': {
			backgroundColor: highlightBackground
		},

		'.cm-foldPlaceholder': {
			backgroundColor: 'transparent',
			border: 'none',
			color: '#ddd'
		},

		'.cm-tooltip': {
			border: 'none',
			backgroundColor: tooltipBackground
		},
		'.cm-tooltip .cm-tooltip-arrow:before': {
			borderTopColor: 'transparent',
			borderBottomColor: 'transparent'
		},
		'.cm-tooltip .cm-tooltip-arrow:after': {
			borderTopColor: tooltipBackground,
			borderBottomColor: tooltipBackground
		},
		'.cm-tooltip-autocomplete': {
			borderBottomRightRadius: '1rem',
			borderBottomLeftRadius: '1rem',
			'& > ul > li[aria-selected]': {
				backgroundColor: highlightBackground,
				color: c.cyan,
				borderBottomRightRadius: '1rem',
				borderBottomLeftRadius: '1rem'
			}
		},
		'.cm-scroller, .cm-tooltip-autocomplete > ul': {
			fontFamily: "'Space Mono', monospace !important",
			color: c.fg
		}
	},
	{ dark: false }
);

/// The highlighting style for code in the Basic Light theme.
export const basicLightHighlightStyle = HighlightStyle.define([
	{ tag: t.keyword, color: c.magenta },
	{
		tag: [t.name, t.deleted, t.character, t.propertyName, t.macroName],
		color: c.fg
	},
	{
		tag: [t.function(t.propertyName)],
		color: c.blue
	},
	{ tag: [t.variableName], color: c.cyan },
	{ tag: [t.function(t.variableName)], color: c.blue },
	{ tag: [t.labelName], color: pink },
	{
		tag: [t.color, t.constant(t.name), t.standard(t.name)],
		color: blue
	},
	{ tag: [t.definition(t.name), t.separator], color: green },
	{ tag: [t.brace], color: c.muted },
	{
		tag: [t.annotation],
		color: invalid
	},
	{
		tag: [t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace],
		color: blue
	},
	{
		tag: [t.typeName, t.className],
		color: yellow
	},
	{
		tag: [t.operator, t.operatorKeyword],
		color: green
	},
	{
		tag: [t.tagName],
		color: magenta
	},
	{
		tag: [t.squareBracket],
		color: c.muted
	},
	{
		tag: [t.angleBracket],
		color: c.muted
	},
	{
		tag: [t.attributeName],
		color: c.blue
	},
	{
		tag: [t.regexp],
		color: blue
	},
	{
		tag: [t.quote],
		color: base01
	},
	{ tag: [t.string], color: c.green },
	{
		tag: t.link,
		color: cyan,
		textDecoration: 'underline',
		textUnderlinePosition: 'under'
	},
	{
		tag: [t.url, t.escape, t.special(t.string)],
		color: c.green
	},
	{ tag: [t.meta], color: blue },
	{ tag: [t.comment], color: base02, fontStyle: 'italic' },
	{ tag: t.strong, fontWeight: 'bold', color: blue },
	{ tag: t.emphasis, fontStyle: 'italic', color: blue },
	{ tag: t.strikethrough, textDecoration: 'line-through' },
	{ tag: t.heading, fontWeight: 'bold', color: blue },
	{ tag: t.special(t.heading1), fontWeight: 'bold', color: blue },
	{ tag: t.heading1, fontWeight: 'bold', color: blue },
	{
		tag: [t.heading2, t.heading3, t.heading4],
		fontWeight: 'bold',
		color: blue
	},
	{
		tag: [t.heading5, t.heading6],
		color: blue
	},
	{ tag: [t.atom, t.bool, t.special(t.variableName)], color: orange },
	{
		tag: [t.processingInstruction, t.inserted],
		color: cyan
	},
	{
		tag: [t.contentSeparator],
		color: yellow
	},
	{ tag: t.invalid, color: base02, borderBottom: `1px dotted ${invalid}` }
]);

/// Extension to enable the Basic Light theme (both the editor theme and
/// the highlight style).
export const theme: Extension = [basicLightTheme, syntaxHighlighting(basicLightHighlightStyle)];
