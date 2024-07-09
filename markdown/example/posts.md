# Posts
<html><head></head><body>
<p>Les différents posts publiés par les différents <a href="../groups">groupes</a></p>
<p>Appelés <em>Articles</em> dans le code pour des soucis de rétrocompatibilité.
Sera renommé en <em>Post</em> partout dans le futur.</p></body></html>

## Types
### Article *(object)*
An article is a post in a group

- **author**: [`User`](./users.md#user-object)
  
  
  
  
  
- **authorId**: `ID`
  
  
  
  
  
- **body**: `String!`
  
  
  
  
  
- **bodyHtml**: `String!`
  
  
  
  
  
- **bodyPreview**: `String!`
  
  
  
  
  
- **canBeEdited**: `Boolean!`
  
  Vrai si l'utilisateur·ice connecté·e peut éditer le post (en considérant qu'iel ne va pas changer l'auteur·ice ou le groupe du post)
  
  
  
- **comments**(after, before, first, last): [`Connection<Comment>`](./comments.md#comment-object)
  
  
  
  *Arguments*
  
  - **after**: `String`
  - **before**: `String`
  - **first**: `Int`
  - **last**: `Int`
  
  
- **createdAt**: `DateTime!`
  
  
  
  
  
- **event**: [`Event`](./events.md#event-object)
  
  
  
  
  
- **eventId**: `ID`
  
  
  
  
  
- **group**: [`Group!`](./groups.md#group-object)
  
  
  
  
  
- **groupId**: `ID!`
  
  
  
  
  
- **id**: `ID!`
  
  
  
  
  
- **links**: [`[Link!]!`](./links.md#link-object)
  
  
  
  
  
- **myReactions**: [`BooleanMap!`](./reactions.md#booleanmap-scalar)
  
  
  
  
  
- **notifiedAt**: `DateTime`
  
  
  
  
  
- **pictureFile**: `String!`
  
  
  
  
  
- **pictureFileDark**: `String!`
  
  Le nom du fichier de l'image, en thème sombre
  
  
  
- **pictureURL**(dark: `Boolean!`): `String!`
  
  L'URL publique de l'image
  
  *Arguments*
  
  - **dark**: `Boolean!`
    
    Utiliser l'image en thème sombre
  
  
- **published**: `Boolean!`
  
  
  
  
  
- **publishedAt**: `DateTime!`
  
  
  
  
  
- **reacted**(emoji: `String!`): `Boolean!`
  
  
  
  
  
- **reactionCounts**: [`Counts!`](./reactions.md#counts-scalar)
  
  
  
  
  
- **reactions**(emoji: `String!`): `Int!`
  
  
  
  
  
- **slug**: `String!`
  
  Un nom lisible sans espaces, adaptés pour des URLs.
  
  
  
- **title**: `String!`
  
  
  
  
  
- **uid**: `String!`
  
  
  
  
  
- **visibility**: [`Visibility!`](./global.md#visibility-enum)
  
  
  
  
  

### ArticleSearchResultType *(object)*


- **article**: [`Article!`](./posts.md#article-object)
  
  
  
  
  
- **highlightedTitle**: `String!`
  
  
  
  
  
- **id**: `ID!`
  
  
  
  
  
- **rank**: `Float`
  
  
  
  
  
- **similarity**: `Float!`
  
  
  
  
  



## Queries
### article(group: [`UID!`](./global.md#uid-scalar), slug: `String!`): [`Article!`](./posts.md#article-object)





### homepage(after, before, first, last): [`Connection<Article>`](./posts.md#article-object)

Gets the homepage articles, customized if the user is logged in.

*Arguments*

- **after**: `String`
- **before**: `String`
- **first**: `Int`
- **last**: `Int`


### searchArticles(groupUid: `String`, q: `String!`): [`[ArticleSearchResultType!]!`](./posts.md#articlesearchresulttype-object)





## Mutations
### deleteArticle(id: `ID!`): `Boolean!`





### deleteArticlePicture(id: `ID!`): `Boolean!`





### updateArticlePicture(file: [`File!`](./global.md#file-scalar), id: `ID!`): `String!`





### upsertArticle(...): [`Result<Article>`](./posts.md#article-object)



*Arguments*

- **body**: `String!`
- **event**: `ID`
- **group**: [`UID!`](./global.md#uid-scalar)
- **id**: `ID`
- **links**: [`[LinkInput!]!`](./links.md#linkinput-input-object)
- **publishedAt**: `DateTime`
- **title**: `String!`
- **visibility**: [`Visibility!`](./global.md#visibility-enum)


## Subscriptions
### article(group: [`UID!`](./global.md#uid-scalar), slug: `String!`): [`Article!`](./posts.md#article-object)





### homepage(after, before, first, last): [`Connection<Article>`](./posts.md#article-object)

Gets the homepage articles, customized if the user is logged in.

*Arguments*

- **after**: `String`
- **before**: `String`
- **first**: `Int`
- **last**: `Int`

