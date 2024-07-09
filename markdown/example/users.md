# Users
<html><head></head><body>
<p>Les personnes utilisant l'application.</p>
<h2>Inscription</h2>
<p>L'inscription se fait en deux ou trois parties: la première consiste à donner simplement une adresse e-mail et à la valider.
Ensuite, on rentre le reste des informations.
Enfin, si la personne déclare appartenir à une école mais que l'e-mail n'est pas dans le domaine de l'école (ce qui prouve automatiquement que la personne est étudiante), il faut qu'un admin confirme manuellement.</p>
<p>Ce n'est qu'après cette validation (quand elle est nécessaire) que l'objet <code>UserCandidate</code> est transformé en <code>User</code>.</p>
<h2>Connexion</h2>
<p>La mutation <code>login</code> permet la connexion.</p></body></html>

## Types


### Credential *(object)*
A credential is a way to authenticate a user

- **active**: `Boolean!`
  
  
  
  
  
- **createdAt**: `DateTime!`
  
  
  
  
  
- **expiresAt**: `DateTime`
  
  
  
  
  
- **id**: `ID!`
  
  
  
  
  
- **name**: `String!`
  
  
  
  
  
- **token**: `String!`
  
  
  
  
  
- **type**: [`CredentialType!`](./users.md#credentialtype-enum)
  
  
  
  
  
- **user**: [`User!`](./users.md#user-object)
  
  
  
  
  
- **userAgent**: `String!`
  
  
  
  
  




### GodparentRequest *(object)*
Requests to become someone's godchild. Gets deleted once the request has been accepted (or denied). godchild is the requester, godparent is the requested.

- **createdAt**: `DateTime!`
  
  
  
  
  
- **godchild**: [`User!`](./users.md#user-object)
  
  
  
  
  
- **godparent**: [`User!`](./users.md#user-object)
  
  
  
  
  
- **id**: `ID!`
  
  
  
  
  
- **updatedAt**: `DateTime!`
  
  
  
  
  

















### QuickSignup *(object)*
Lien d'inscription rapide, qui permet de créer un compte étudiant sans adresse mail étudiante et sans validation manuelle

- **code**: `String!`
  
  
  
  
  
- **createdAt**: `DateTime!`
  
  
  
  
  
- **expired**: `Boolean!`
  
  Vrai si le lien est expiré
  
  
  
- **id**: `ID!`
  
  
  
  
  
- **school**: [`School!`](./schools.md#school-object)
  
  
  
  
  
- **schoolId**: `ID!`
  
  
  
  
  
- **updatedAt**: `DateTime!`
  
  
  
  
  
- **validUntil**: `DateTime!`
  
  
  
  
  

### User *(object)*
Users are the people who use the app

- **address**: `String!`
  
  
  
  
  
- **admin**: `Boolean!`
  
  
  
  
  
- **adminOf**(studentAssociation: `String!`): `Boolean!`
  
  Vrai si cette personne est administratrice de l'association étudiante donnée
  
  *Arguments*
  
  - **studentAssociation**: `String!`
    
    UID de l'association étudiante
  
  
- **allowedApps**: [`[ThirdPartyApp!]!`](./oauth.md#thirdpartyapp-object)
  
  
  
  
  
- **answeredForms**(after, before, first, last): `UserAnsweredFormsConnection!`
  
  Formulaires complètement répondus par l'utilisateur
  
  *Arguments*
  
  - **after**: `String`
  - **before**: `String`
  - **first**: `Int`
  - **last**: `Int`
  
  
- **apprentice**: `Boolean!`
  
  
  
  
  
- **articles**(after, before, first, last): `UserArticlesConnection!`
  
  
  
  *Arguments*
  
  - **after**: `String`
  - **before**: `String`
  - **first**: `Int`
  - **last**: `Int`
  
  
- **authorizedApps**: [`[ThirdPartyApp!]!`](./oauth.md#thirdpartyapp-object)
  
  Applications tierces autorisées à accéder à ce compte utilisateur
  
  
  
- **birthday**: `DateTime`
  
  
  
  
  
- **boardMemberships**: [`[GroupMember!]!`](./groups.md#groupmember-object)
  
  Les affiliations de l'utilisateur à des groupes dont iel est au bureau
  
  
  
- **booking**(beneficiary: `String`, event: `ID!`): [`Registration!`](./ticketing.md#registration-object)
  
  
  
  
  
- **bookings**(after, before, first, forUserOnly, last): `UserBookingsConnection!`
  
  
  
  *Arguments*
  
  - **after**: `String`
  - **before**: `String`
  - **first**: `Int`
  - **forUserOnly**: `Boolean`
  - **last**: `Int`
  
  
- **bot**: `Boolean!`
  
  Vrai si cet utilisateur est un bot (i.e. ne représente pas une personne physique)
  
  
  
- **canAccessDocuments**: `Boolean!`
  
  
  
  
  
- **canBeEdited**: `Boolean!`
  
  
  
  
  
- **canCreatePostsOn**: [`[Group!]!`](./groups.md#group-object)
  
  Groupes sur lesquels l'utilisateur·ice peut créer des posts
  
  
  
- **canEditGroup**(uid: `String!`): `Boolean!`
  
  Vrai si cette personne peut éditer le groupe donné
  
  *Arguments*
  
  - **uid**: `String!`
    
    UID du groupe
  
  
- **canEditGroups**: `Boolean!`
  
  Vrai si cette personne peut éditer des groupes
  
  
  
- **cededImageRightsToTVn7**: `Boolean!`
  
  
  
  
  
- **contributesTo**: [`[StudentAssociation!]!`](./student-associations.md#studentassociation-object)
  
  
  
  
  
- **contributesWith**: [`[ContributionOption!]!`](./student-associations.md#contributionoption-object)
  
  
  
  
  
- **createdAt**: `DateTime!`
  
  
  
  
  
- **credentials**: [`[Credential!]!`](./users.md#credential-object)
  
  
  
  
  
- **description**: `String!`
  
  
  
  
  
- **descriptionHtml**: `String!`
  
  
  
  
  
- **email**: `String!`
  
  
  
  
  
- **emailChangeRequests**: [`[EmailChange!]!`](./users.md#emailchange-object)
  
  
  
  
  
- **enabledNotificationChannels**: [`[NotificationChannel!]!`](./notifications.md#notificationchannel-enum)
  
  
  
  
  
- **external**: `Boolean!`
  
  
  
  
  
- **familyTree**: [`FamilyTree!`](./users.md#familytree-object)
  
  
  
  
  
- **firstName**: `String!`
  
  
  
  
  
- **fullName**: `String!`
  
  
  
  
  
- **godchildren**: [`[User!]!`](./users.md#user-object)
  
  
  
  
  
- **godparent**: [`User`](./users.md#user-object)
  
  
  
  
  
- **graduationYear**: `Int!`
  
  
  
  
  
- **groups**: [`[GroupMember!]!`](./groups.md#groupmember-object)
  
  
  
  
  
- **id**: `ID!`
  
  
  
  
  
- **incomingGodparentRequests**: [`[GodparentRequest!]!`](./users.md#godparentrequest-object)
  
  
  
  
  
- **lastName**: `String!`
  
  
  
  
  
- **latestVersionSeenInChangelog**: `String!`
  
  
  
  
  
- **links**: [`[Link!]!`](./links.md#link-object)
  
  
  
  
  
- **major**: [`Major`](./curriculum.md#major-object)
  
  
  
  
  
- **majorId**: `ID`
  
  
  
  
  
- **managedEvents**: [`[EventManager!]!`](./events.md#eventmanager-object)
  
  
  
  
  
- **minor**: [`Minor`](./curriculum.md#minor-object)
  
  
  
  
  
- **nickname**: `String!`
  
  
  
  
  
- **otherEmails**: `[String!]!`
  
  
  
  
  
- **outgoingGodparentRequests**: [`[GodparentRequest!]!`](./users.md#godparentrequest-object)
  
  
  
  
  
- **partiallyAnsweredForms**(after, before, first, last): `UserPartiallyAnsweredFormsConnection!`
  
  Formulaires partiellement répondus par l'utilisateur
  
  *Arguments*
  
  - **after**: `String`
  - **before**: `String`
  - **first**: `Int`
  - **last**: `Int`
  
  
- **pendingContributions**: [`[ContributionOption!]!`](./student-associations.md#contributionoption-object)
  
  
  
  
  
- **phone**: `String!`
  
  
  
  
  
- **pictureFile**: `String!`
  
  
  
  
  
- **pictureFileDark**: `String!`
  
  Le nom du fichier de l'image, en thème sombre
  
  
  
- **pictureURL**(dark: `Boolean!`): `String!`
  
  L'URL publique de l'image
  
  *Arguments*
  
  - **dark**: `Boolean!`
    
    Utiliser l'image en thème sombre
  
  
- **schoolUid**: `String`
  
  
  
  
  
- **studentAssociationAdmin**: `Boolean!`
  
  Vrai si cette personne est administratrice d'au moins une association étudiante
  
  
  
- **uid**: `String!`
  
  
  
  
  
- **yearTier**: `Int!`
  
  
  
  
  

### UserCandidate *(object)*
UserCandidates are users in the registration process

- **address**: `String!`
  
  
  
  
  
- **apprentice**: `Boolean!`
  
  
  
  
  
- **birthday**: `DateTime`
  
  
  
  
  
- **cededImageRightsToTVn7**: `Boolean!`
  
  
  
  
  
- **createdAt**: `DateTime`
  
  
  
  
  
- **email**: `String!`
  
  
  
  
  
- **emailIsSchoolEmail**: `Boolean!`
  
  Vrai si l'email est une adresse email d'étudiant.
  
  
  
- **emailValidated**: `Boolean!`
  
  
  
  
  
- **firstName**: `String!`
  
  
  
  
  
- **fullName**: `String!`
  
  
  
  
  
- **graduationYear**: `Int!`
  
  
  
  
  
- **id**: `ID!`
  
  
  
  
  
- **lastName**: `String!`
  
  
  
  
  
- **major**: [`Major`](./curriculum.md#major-object)
  
  
  
  
  
- **majorId**: `ID`
  
  
  
  
  
- **needsManualValidation**: `Boolean`
  
  Vrai si l'utilisateur aura besoin d'une validation manuelle à la fin de l'inscription. Null si la notion n'a pas encore de sens. Si la filière n'a pas encore été renseignée, retourne vrai seulement si l'inscription devra être validée manuellement si une filière (peut importe laquelle) est choisie. Voir `needsManualValidationForMajor` pour être plus précis
  
  
  
- **needsManualValidationForMajor**(major: `String!`): `Boolean`
  
  Vrai si l'utilisateur aura besoin d'une validation manuelle à la fin de l'inscription si iel choisi cette filière. Null si la notion n'a pas encore de sens.
  
  *Arguments*
  
  - **major**: `String!`
    
    L'UID de la filière
  
  
- **phone**: `String!`
  
  
  
  
  
- **schoolEmail**: `String`
  
  
  
  
  
- **schoolServer**: `String`
  
  
  
  
  
- **schoolUid**: `String`
  
  
  
  
  
- **suggestedUid**: `String!`
  
  
  
  
  
- **uid**: `String!`
  
  
  
  
  
- **usingQuickSignup**: `Boolean!`
  
  Vrai si l'utilisateur a été créé via un lien d'inscription rapide.
  
  
  

### UserSearchResult *(object)*


- **highlightedDescription**: `String!`
  
  
  
  
  
- **id**: `ID!`
  
  
  
  
  
- **rank**: `Float`
  
  
  
  
  
- **similarity**: `Float!`
  
  
  
  
  
- **user**: [`User!`](./users.md#user-object)
  
  
  
  
  

## Queries
### allUsers(after, before, first, last): [`Connection<User>`](./users.md#user-object)



*Arguments*

- **after**: `String`
- **before**: `String`
- **first**: `Int`
- **last**: `Int`


### birthdays(activeOnly: `Boolean`, now: `DateTime`, width: `Int`): [`[User!]!`](./users.md#user-object)





### existsInSchoolLdap(email: `String!`): `Boolean!`





### godparentRequest(id: `ID!`): [`GodparentRequest!`](./users.md#godparentrequest-object)





### godparentRequests: [`[GodparentRequest!]!`](./users.md#godparentrequest-object)





### me: [`User!`](./users.md#user-object)

- **Rate limit:** 6000/minute



### quickSignups(after, before, first, last): [`Connection<QuickSignup>`](./users.md#quicksignup-object)



*Arguments*

- **after**: `String`
- **before**: `String`
- **first**: `Int`
- **last**: `Int`


### searchUsers(q: `String!`, similarityCutoff: `Float`): [`[UserSearchResult!]!`](./users.md#usersearchresult-object)





### user(id: `ID`, uid: `String`): [`User!`](./users.md#user-object)





### userByEmail(email: `String!`): [`User!`](./users.md#user-object)





### userCandidate(token: `String!`): [`UserCandidate!`](./users.md#usercandidate-object)





### userCandidateByEmail(email: `String!`): [`UserCandidate!`](./users.md#usercandidate-object)





### userCandidates(after, before, first, last): [`Connection<UserCandidate>`](./users.md#usercandidate-object)



*Arguments*

- **after**: `String`
- **before**: `String`
- **first**: `Int`
- **last**: `Int`


## Mutations
### acceptRegistration(email: `String!`): [`Result<User>`](./users.md#user-object)





### completeRegistration(...): [`Result<CompleteSignupResult>`](./users.md#completesignupresult-union)



*Arguments*

- **address**: `String!`
- **apprentice**: `Boolean!`
- **birthday**: `DateTime`
- **cededImageRightsToTVn7**: `Boolean!`
- **firstName**: `String!`
- **graduationYear**: `Int!`
- **lastName**: `String!`
- **majorId**: `ID`
- **password**: `String!`
- **passwordConfirmation**: `String!`
- **phone**: `String!`
- **token**: `String!`
- **uid**: [`UID!`](./global.md#uid-scalar)


### createBot(major, name, password, uid): [`User!`](./users.md#user-object)



*Arguments*

- **major**: `String`
  
  UID de la filière
- **name**: `String!`
  
  Nom du compte bot
- **password**: `String!`
  
  Mot de passe du compte bot
- **uid**: `String!`
  
  UID du compte bot


### createPasswordReset(email: `String!`): `Result<Boolean>`

Démarre une procédure de réinitialisation de mot de passe pour l'utilisateur associé à l'adresse e-mail ou l'uid fournie. Renvoie `true` même si l'utilisateur n'existe pas.



### createQuickSignup(school: `String!`, validUntil: `DateTime!`): [`QuickSignup!`](./users.md#quicksignup-object)

Créer un lien d'inscription rapide

*Arguments*

- **school**: `String!`
  
  UID de l'école
- **validUntil**: `DateTime!`
  
  Date de validité du lien


### deleteGodchild(godchildUid: `String!`, parentUid: `String!`): `Boolean!`





### deleteGodparentRequest(accept: `Boolean!`, id: `ID!`): [`GodparentRequest!`](./users.md#godparentrequest-object)

Deletes a pending godparent request. If accept is true, the request will be accepted (and the godparent of the requester will be changed), otherwise it will be rejected (the godparent of the requester won't be changed)



### deleteQuickSignup(code: `String!`): [`QuickSignup!`](./users.md#quicksignup-object)





### deleteRegistration(id: `ID!`): `Boolean!`





### deleteToken(id: `ID!`): `Boolean!`





### deleteUserPicture(uid: `String!`): `Boolean!`





### login(clientId: `String`, email: `String!`, password: `String!`): [`Result<Credential>`](./users.md#credential-object)

Logs a user in and returns a session token.



### logout: `Boolean!`

Logs a user out and invalidates the session token.



### refuseRegistration(email: `String!`, reason: `String!`): `Boolean!`





### registerGoogleCredential(code: `String!`): `Result<Boolean>`

Enregistrer un token OAuth2 Google pour l'utilisateur connecté.

*Arguments*

- **code**: `String!`
  
  Le code d'authorisation


### renameSession(id: `ID!`, name: `String!`): `Boolean!`





### requestEmailChange(email: `String!`): `Result<Boolean>`





### resetPassword(disconnectAll, newPassword, oldPassword, uid): `Result<Boolean>`



*Arguments*

- **disconnectAll**: `Boolean!`
- **newPassword**: `String!`
- **oldPassword**: `String!`
- **uid**: `String!`


### startRegistration(email: `String!`, quickSignupCode: `String`): `Result<Boolean>`



*Arguments*

- **email**: `String!`
- **quickSignupCode**: `String`
  
  Code d'inscription rapide, pour s'inscrire sans mail étudiant et sans validation manuelle. Voir QuickSignupType.


### syncUserLdap(uid: `String!`): `Boolean!`





### updateNotificationSettings(enabledChannels: [`[NotificationChannel!]!`](./notifications.md#notificationchannel-enum), uid: `String!`): [`[NotificationChannel!]!`](./notifications.md#notificationchannel-enum)





### updateUser(...): [`Result<User>`](./users.md#user-object)



*Arguments*

- **address**: `String!`
- **apprentice**: `Boolean!`
- **birthday**: `DateTime`
- **cededImageRightsToTVn7**: `Boolean!`
- **contributesWith**: `[ID!]`
- **description**: `String!`
- **email**: `String!`
- **firstName**: `String!`
- **godparentUid**: `String`
  
  An empty string removes the godparent. Passing null (or undefined) does not update the godparent. An uid sets the godparent to that uid.
- **graduationYear**: `Int`
- **lastName**: `String!`
- **links**: [`[LinkInput!]!`](./links.md#linkinput-input-object)
- **majorId**: `ID`
- **minorId**: `ID`
- **nickname**: `String!`
- **otherEmails**: `[String!]!`
- **phone**: `String!`
- **uid**: [`UID!`](./global.md#uid-scalar)


### updateUserCandidate(...): `Result<Boolean>`



*Arguments*

- **address**: `String!`
- **birthday**: `DateTime`
- **cededImageRightsToTVn7**: `Boolean!`
- **email**: `String!`
- **firstName**: `String!`
- **graduationYear**: `Int!`
- **lastName**: `String!`
- **majorId**: `ID!`
- **phone**: `String!`
- **register**: `Boolean!`
  
  Inscrire définitivement l'utilisateur·ice si vrai. Si faux, mettre à jour la demande d'inscription sans créer de compte
- **uid**: [`UID!`](./global.md#uid-scalar)
  
  Le @ souhaité


### updateUserPermissions(canAccessDocuments: `Boolean!`, uid: `String!`): [`User!`](./users.md#user-object)





### updateUserPicture(file: [`File!`](./global.md#file-scalar), uid: `String!`): `String!`





### upsertGodparentRequest(godchildUid: `String!`, godparentUid: `String!`, id: `ID`): [`Result<GodparentRequest>`](./users.md#godparentrequest-object)





### usePasswordReset(newPassword: `String!`, token: `String!`): `Result<Boolean>`





### validateEmail(token: `String!`): `Result<Boolean>`





## Subscriptions