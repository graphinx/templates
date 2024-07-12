import {
	PUBLIC_AUTH_HEADER,
	PUBLIC_AUTH_TYPE,
	PUBLIC_OAUTH_AUTHORIZE_URL,
	PUBLIC_OAUTH_CLIENT_ID,
	PUBLIC_OAUTH_SCOPES,
	PUBLIC_OAUTH_TOKEN_URL
} from '$env/static/public';
import PKCE from 'js-pkce';
import { get, writable } from 'svelte/store';

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
	redirect_uri.pathname = '/';
	redirect_uri.search = '';

	return new PKCE({
		authorization_endpoint: PUBLIC_OAUTH_AUTHORIZE_URL,
		client_id: PUBLIC_OAUTH_CLIENT_ID,
		token_endpoint: PUBLIC_OAUTH_TOKEN_URL,
		requested_scopes: PUBLIC_OAUTH_SCOPES,
		redirect_uri: redirect_uri.toString()
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
			return maybeFinishAuthenticationOAuth2(url);
			break;

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
