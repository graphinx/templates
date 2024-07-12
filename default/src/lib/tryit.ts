import {
	PUBLIC_AUTH_HEADER,
	PUBLIC_AUTH_TYPE,
	PUBLIC_OAUTH_AUTHORIZE_URL,
	PUBLIC_OAUTH_CLIENT_ID,
	PUBLIC_OAUTH_SCOPES,
	PUBLIC_OAUTH_TOKEN_URL
} from '$env/static/public';
import {
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLSchema,
	isEnumType,
	isInputObjectType,
	isListType,
	isNonNullType,
	isObjectType,
	isScalarType,
	isUnionType,
	type GraphQLArgument,
	type GraphQLField,
	type GraphQLInputType
} from 'graphql';
import PKCE from 'js-pkce';
// @ts-expect-error dont know why but it works so f it
import * as prettier from 'prettier/standalone.mjs';
// @ts-expect-error dont know why but it works so f it
import parserGraphql from 'prettier/plugins/graphql.mjs';
// const parserGraphql = parsers.graphql;
import { get, writable } from 'svelte/store';
import { drillToNamedType } from './schema-utils';

export const tryitText = writable('');
export const tryitOpen = writable(false);
export const tryitVariables = writable<Record<string, string>>({});

export function authenticationType(): 'OAuth' | 'OpenID' | 'UserPassword' | null {
	if (['OAuth', 'OpenID', 'UserPassword'].includes(PUBLIC_AUTH_TYPE)) {
		return PUBLIC_AUTH_TYPE as 'OAuth' | 'OpenID' | 'UserPassword';
	}
	console.log(oauth2Client());
	return null;
}

export function authorizationHeader(
	token: string | null | undefined
): Record<string, never> | { Authorization: string } {
	if (!token) return {};
	switch (PUBLIC_AUTH_HEADER) {
		case 'Bearer':
			return { Authorization: `Bearer ${token}` };

		case 'Basic':
			return { Authorization: `Basic ${token}` };

		case 'plain':
			return { Authorization: token };

		default:
			break;
	}
	return {};
}

function oauth2Client() {
	const redirect_uri = new URL(window.location.toString());

	return new PKCE({
		authorization_endpoint: PUBLIC_OAUTH_AUTHORIZE_URL,
		client_id: PUBLIC_OAUTH_CLIENT_ID,
		token_endpoint: PUBLIC_OAUTH_TOKEN_URL,
		requested_scopes: PUBLIC_OAUTH_SCOPES,
		redirect_uri: `${redirect_uri.protocol}//${redirect_uri.host}/`
	});
}

export async function startAuthentication() {
	switch (authenticationType()) {
		case 'OAuth':
			return startOAuthAuthentication();

		default:
			break;
	}
}

async function startOAuthAuthentication() {
	window.location.replace(
		oauth2Client().authorizeUrl({
			tryit: 'open'
		})
	);
}

export async function maybeFinishAuthentication(url: URL): Promise<string | undefined> {
	switch (authenticationType()) {
		case 'OAuth':
			return (await maybeFinishAuthenticationOAuth2(url)) ?? undefined;

		default:
			break;
	}
}

async function maybeFinishAuthenticationOAuth2(url: URL) {
	if (sessionStorage.getItem('accessToken')) return sessionStorage.getItem('accessToken');
	if (!url.searchParams.has('code')) return undefined;
	const client = oauth2Client();
	const tokens = await client.exchangeForAccessToken(url.toString());
	const accessToken = tokens.access_token;
	window.sessionStorage.setItem('accessToken', accessToken);
	return accessToken;
}

export async function logout() {
	switch (authenticationType()) {
		case 'OAuth':
			return logoutOAuth2();

		default:
			break;
	}
}

async function logoutOAuth2() {
	sessionStorage.removeItem('accessToken');
}

export function saveTryitState() {
	sessionStorage.setItem('tryitText', get(tryitText));
	sessionStorage.setItem('tryitVariables', JSON.stringify(get(tryitVariables)));
	sessionStorage.setItem('tryitOpen', JSON.stringify(get(tryitOpen)));
}

export function restoreTryitState() {
	console.log('restoring tryit state');
	tryitText.set(sessionStorage.getItem('tryitText') || '');
	tryitVariables.set(JSON.parse(sessionStorage.getItem('tryitVariables') || '{}'));
	tryitOpen.set(JSON.parse(sessionStorage.getItem('tryitOpen') || 'false'));
}

export async function exampleQuery(
	schema: GraphQLSchema,
	kind: 'query' | 'mutation' | 'subscription' | 'field',
	query: GraphQLField<unknown, unknown>
) {
	if (kind === 'field') return '';
	const unwrappedReturnType = drillToNamedType(query.type);
	let field = query.name;

	if (query.args.length > 0) {
		const filledArgs = query.args
			.toSorted(({ type }) => {
				// put input object args at the end
				return isInputObjectType(type) ? -1 : 1;
			})
			.map(
				(a) =>
					`${a.name}: ${exampleValue({
						...a
					})}`
			);
		if (filledArgs.length < 3) {
			field += `(${filledArgs.join(', ')})`;
		} else {
			field += `(\n${filledArgs.join(',\n')}\n)`;
		}
	}

	let selection = '';

	if (unwrappedReturnType && isObjectType(unwrappedReturnType)) {
		selection = exampleSelection(unwrappedReturnType, 1);
	} else if (unwrappedReturnType && isUnionType(unwrappedReturnType)) {
		const possibleType = unwrappedReturnType.getTypes().toSorted((a) => {
			// prefer types that don't have error in their name, it's more interesting
			if (a.name.toLowerCase().includes('Error')) return -1;
			return 1;
		})[0];
		selection = `{\n... on ${possibleType.name} ${exampleSelection(possibleType, 2)}\n}`;
	}

	return prettier.format(`${kind} { ${field} ${selection} }`, {
		parser: 'graphql',
		plugins: [parserGraphql]
	});
}

function exampleValue({
	type,
	defaultValue
}: {
	type: GraphQLInputType;
	defaultValue?: unknown;
}): string {
	if (defaultValue !== undefined && defaultValue !== null) {
		return JSON.stringify(defaultValue);
	}

	if (isNonNullType(type)) {
		return exampleValue({ defaultValue, type: type.ofType });
	}

	if (isListType(type)) {
		return `[${exampleValue({ defaultValue, type: type.ofType })}]`;
	}

	if (isEnumType(type)) {
		return type.getValues()[0].name;
	}

	if (isInputObjectType(type)) {
		const requiredFields = Object.values(type.getFields()).filter((f) =>
			isNonNullType(f.type)
		) as Array<GraphQLArgument & { type: GraphQLNonNull<GraphQLInputType> }>;

		const filledFields = requiredFields.map(
			(f) => `${f.name}: ${exampleValue({ type: f.type.ofType, defaultValue: f.defaultValue })}`
		);

		return filledFields.length < 3
			? `{${filledFields.join(', ')}}`
			: `{\n${filledFields.join(',\n')}\n}`;
	}

	if (isScalarType(type)) {
		switch (type.name) {
			case 'String':
				return '"example"';
			case 'Int':
				return '42';
			case 'Float':
				return '3.14';
			case 'Boolean':
				return 'true';
			default:
				return '"example"';
		}
	}

	return 'null';
}

function exampleSelection(type: GraphQLObjectType, hideProtip = false): string {
	const field = Object.values(type.getFields())[0];

	const protip =
		!hideProtip && Object.values(type.getFields()).length > 1
			? `\n# other fields...\n# protip: use ctrl+space\n`
			: '';

	if (!field) return `{\n__typename${protip}}`;
	if (field && isObjectType(drillToNamedType(field.type))) {
		const innerSelection = exampleSelection(
			drillToNamedType(field.type) as GraphQLObjectType,
			Boolean(protip)
		);
		return `{\n${field.name} ${innerSelection}${protip}\n}`;
	}
	return `{\n${field.name}${protip}\n}`;
}
