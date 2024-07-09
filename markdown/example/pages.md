# Pages
<html><head></head><body>
<p>Pages web liées à un groupe ou une AE. Pratique pour par exemple parler des partenariats d'une AE (genre réductions de prix), héberger les status d'une asso, etc.</p></body></html>

## Types




### Page *(object)*
Une page écrite par un·e utilisateur·rice, servant par exemple à présenter les partenariats d'une AE sur une page dédiée.

- **body**: `String!`
  
  Contenu de la page. Supporte la syntaxe Markdown.
  
  
  
- **bodyHtml**: `String!`
  
  Contenu de la page, converti en HTML. Protégé contre les attaques XSS.
  
  
  
- **canBeEdited**: `Boolean!`
  
  L'utilisateur·ice connecté·e peut modifier ou supprimer cette page
  
  
  
- **createdAt**: `DateTime!`
  
  
  
  
  
- **files**: `[String!]!`
  
  Chemin vers les fichiers inclus sur la page, par exmple des images. Voir filesURLs pour obtenir les URLs de ces fichiers.
  
  
  
- **filesURLs**: `[String!]!`
  
  URLs vers les fichiers inclus sur la page.
  
  
  
- **group**: [`Group`](./groups.md#group-object)
  
  Groupe auquel appartient la page. Peut être null si la page n'appartient à aucun groupe.
  
  
  
- **id**: `ID!`
  
  
  
  
  
- **lastAuthor**: [`User`](./users.md#user-object)
  
  Dernier·ère utilisateur·rice ayant modifié la page. Peut être null si la page n'a jamais été modifiée, ou que l'utilisateur·ice en question a été supprimé·e.
  
  
  
- **path**: `String!`
  
  Chemin vers la page. Doit être unique _par AE ou groupe_. L'URL finale sera donc préfixée d'une certaine manière pour éviter les collisions.
  
  
  
- **studentAssociation**: [`StudentAssociation`](./student-associations.md#studentassociation-object)
  
  Association étudiante à laquelle appartient la page. Peut être null si la page n'appartient à aucune association.
  
  
  
- **title**: `String!`
  
  Titre de la page.
  
  
  
- **updatedAt**: `DateTime!`
  
  
  
  
  



## Queries
### page(id: `ID!`): [`Page!`](./pages.md#page-object)

Récupérer une page par son identifiant. Voir aussi `Group.page` et `StudentAssociation.page` pour des queries plus ergonomiques



### pages(after, before, first, last): [`Connection<Page>`](./pages.md#page-object)

Récupère toutes les pages existantes. Réservé aux administrateur·ice.s.

*Arguments*

- **after**: `String`
- **before**: `String`
- **first**: `Int`
- **last**: `Int`


## Mutations
### addFileToPage(file: [`File!`](./global.md#file-scalar), page: `ID!`): [`Result<Page>`](./pages.md#page-object)

Ajouter un fichier à une page. Permet notamment d'ajouter des images pour s'en servir dans le contenu de la page.



### deletePage(group, id, path, studentAssociation): [`Result<Page>`](./pages.md#page-object)

Supprime une page existante. On peut renseigner l'identifiant de la page ou son chemin ainsi que son groupe ou AE d'appartenance.

*Arguments*

- **group**: `String`
  
  L'UID du groupe auquel la page appartient
- **id**: `ID`
  
  L'identifiant de la page à supprimer
- **path**: `String`
  
  Le chemin de la page à supprimer
- **studentAssociation**: `String`
  
  L'UID de l'AE à laquelle la page appartient


### removeFileFromPage(filename: `String!`, page: `ID!`): [`Result<Page>`](./pages.md#page-object)

Supprimer un fichier d'une page.



### upsertPage(body, group, path, studentAssociation, title): [`Result<Page>`](./pages.md#page-object)

Crée ou met à jour une page.

*Arguments*

- **body**: `String!`
  
  Le corps de la page. Supporte le markdown
- **group**: `String`
  
  L'UID du groupe auquel la page appartient
- **path**: `String!`
  
  Le chemin de la page. Si la page existe déjà, elle sera mise à jour. Sinon, une nouvelle page sera créée. Ne peut contenir que des caractères alphanumériques, des tirets, des tirets du bas et des slashes. Fait pour être utilisé dans des URLs.
- **studentAssociation**: `String`
  
  L'UID de l'AE à laquelle la page appartient
- **title**: `String!`
  
  Le titre de la page


## Subscriptions