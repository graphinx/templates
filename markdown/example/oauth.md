# Applications tierces (OAuth)
<html><head></head><body>
<p>Churros fournit un service de provider OAuth.</p>
<p>Des applications tierces peuvent utiliser l'API de Churros au nom d'une personne, si celle-ci autorise l'application.</p>
<h2>Endpoints utiles</h2>
<ul>
<li>
<p><strong>URL d'autorisation</strong>: <code>https://churros.inpt.fr/authorize</code></p>
</li>
<li>
<p><strong>URL d'obtention d'un token</strong>: <code>https://churros.inpt.fr/token</code></p>
</li>
<li>
<p><strong>URL d'obtention d'informations basiques sur l'utilisateur·ice connecté·e</strong>: <code>https://churros.inpt.fr/identity</code></p>
<p>Renvoie un JSON, contenant les informations suivantes:</p>
<ul>
<li><code>uid</code>: nom d'utilisateur·ice unique (le "@")</li>
<li><code>email</code>: adresse email</li>
<li><code>ldapInternalEmail</code>: adresse email en <code>@bde.enseeiht.fr</code> (pour les n7iens)</li>
<li><code>fullName</code>: nom d'affichage</li>
<li><code>firstName</code>: prénom</li>
<li><code>lastName</code>: nom de famille</li>
<li><code>groupsUids</code>: uids des groupes dont l'utilisateur·ice est membre</li>
</ul>
</li>
</ul>
<p>Pour en savoir plus, voir la <a href="https://wiki.inpt.fr/inp-net/public/oauth-churros">documentation OAuth2 de Churros</a></p></body></html>

## Types
### ApiRateLimitHits *(object)*
Des données temporelles pour construire des graphiques d'atteintes de rate limiting. La résolution temporelle est d'une minute.

- **count**: `Int!`
  
  Le nombre d'erreurs de rate-limiting à cette date
  
  
  
- **date**: `DateTime!`
  
  La date à laquelle les requêtes ont été faites
  
  
  
- **queryName**: `String!`
  
  Le nom de la query ou mutation ou subscription
  
  
  
- **queryType**: `String!`
  
  Le type de requête effectuée
  
  
  
- **timestamp**: `Int!`
  
  
  
  
  
- **user**: [`User`](./users.md#user-object)
  
  
  
  
  

### ApiUsage *(object)*
Des données temporelles pour construire des graphiques d'utilisation de l'API au cours du temps. La résolution temporelle est d'une minute.

- **count**: `Int!`
  
  Le nombre de requêtes faites à cette date
  
  
  
- **date**: `DateTime!`
  
  La date à laquelle les requêtes ont été faites
  
  
  
- **queryName**: `String!`
  
  Le nom de la query ou mutation ou subscription
  
  
  
- **queryType**: [`ApiUsageQueryType!`](./oauth.md#apiusagequerytype-enum)
  
  Le type de requête effectuée
  
  
  
- **timestamp**: `Int!`
  
  
  
  
  
- **user**: [`User`](./users.md#user-object)
  
  
  
  
  






### ThirdPartyAppRegistrationResponse *(object)*


- **client_id**: `String!`
  
  
  
  
  
- **client_secret**: `String!`
  
  
  
  
  

## Queries
### allApps: [`[ThirdPartyApp!]!`](./oauth.md#thirdpartyapp-object)

Get all OAuth2 clients. Only admins can do this.



### myApps: [`[ThirdPartyApp!]!`](./oauth.md#thirdpartyapp-object)





### thirdPartyApp(id: `ID!`): [`ThirdPartyApp!`](./oauth.md#thirdpartyapp-object)



*Arguments*

- **id**: `ID!`
  
  The third party app's client_id. The 'app:' id prefix is optional.


## Mutations
### activateApp(id: `ID!`): `Boolean!`

Activate a third-party app. Only admins can do this.

*Arguments*

- **id**: `ID!`
  
  The app's ID


### authorize(clientId: `String!`, redirectUri: `String!`): `Result<String>`

Authorize a third-party client to access the user's data. 
Returns an access code. 

Use the frontend's /authorize endpoint instead of this, as it requires already being logged-in.

Do a `GET` request to `http://localhost:5173/authorize?client_id=<clientId>&redirect_uri=<redirectUri>&response_type=code&state=<state>` with:

- `<clientId>`: The client ID of the app. See registerApp to get this.
- `<redirectUri>`: The URL that you want to redirect the user to. The frontend uses this on /authorize to redirect users to `<redirectUri>?code=<return value of this mutation>`
- `<state>`: A random string generated from personal information used to prevent CSRF attacks.

Use that code to get an access token with /token:

Do a `POST` request to `http://localhost:5173/token` with a `application/x-www-form-urlencoded` body with the following fields:

- `grant_type`: `authorization_code`
- `code`: The code returned by this endpoint
- `client_id`: The client ID of the app
- `client_secret`: The client secret of the app
- `redirect_uri`: The redirect URI used in this request

*Arguments*

- **clientId**: `String!`
  
  The client ID of the app. See registerApp to get this.
- **redirectUri**: `String!`
  
  The URL that you want to redirect the user to. The frontend uses this on /authorize to redirect users to `<redirectUri>?code=<return value of this mutation>`


### deactivateApp(id: `ID!`): `Boolean!`

Deactivate a third-party app. Only admins can do this.

*Arguments*

- **id**: `ID!`
  
  The app's ID


### editApp(allowedRedirectUris, description, id, name, ownerGroupUid, website): [`ThirdPartyApp!`](./oauth.md#thirdpartyapp-object)

Update a third-party app's details

*Arguments*

- **allowedRedirectUris**: `[String!]`
- **description**: `String`
- **id**: `ID!`
  
  The app's ID
- **name**: `String`
- **ownerGroupUid**: `String`
- **website**: `String`


### registerApp(allowedRedirectUris, description, name, ownerGroupUid, website): [`ThirdPartyAppRegistrationResponse!`](./oauth.md#thirdpartyappregistrationresponse-object)

Register a third-party OAuth2 client. Returns the client secret. The client secret cannot be retrieved at any other time. Use refreshAppSecret to rotate your client secret.

*Arguments*

- **allowedRedirectUris**: `[String!]!`
  
  Allowed redirect URIs.
- **description**: `String!`
  
  The app's description
- **name**: `String!`
  
  The app's name
- **ownerGroupUid**: `String!`
  
  The UID of  the group that made this app
- **website**: `String!`
  
  URL to the website of the app. Used, amongst other things, to get the icon.


### revokeAuthorization(clientId: `String!`): `Boolean!`

Révoque l'accès d'une application au compte utilisateur connecté. Renvoie `true` si l'opération a réussi.

*Arguments*

- **clientId**: `String!`
  
  Identifiant de l'application


### rotateAppSecret(id: `ID!`): `String!`

Rotate a third-party app's secret

*Arguments*

- **id**: `ID!`
  
  The app's ID


## Subscriptions
### thirdPartyApp(id: `ID!`): [`ThirdPartyApp!`](./oauth.md#thirdpartyapp-object)



*Arguments*

- **id**: `ID!`
  
  The third party app's client_id. The 'app:' id prefix is optional.

