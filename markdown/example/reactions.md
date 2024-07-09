# Réactions
<html><head></head><body>
<p>Réactions (likes, etc) sur les différents objets de l'application (évènements, posts, etc)</p></body></html>

## Types
### BooleanMap *(scalar)*

### Counts *(scalar)*


### Reactable *(interface)*
Une resource pouvant recevoir des réactions (likes, etc) par les utilisateur·ice·s

- **id**: `ID!`
  
  L’identifiant de la resource
  
  
  
- **reacted**(emoji: `String!`): `Boolean!`
  
  Vrai si l’utilisateur·ice connecté·e a réagi avec cet emoji
  
  
  
- **reactions**(emoji: `String!`): `Int!`
  
  Nombre total de réactions avec cet emoji
  
  
  

### Reaction *(object)*


- **author**: [`User`](./users.md#user-object)
  
  
  
  
  
- **authorId**: `ID`
  
  
  
  
  
- **comment**: [`Comment`](./comments.md#comment-object)
  
  
  
  
  
- **commentId**: `ID`
  
  
  
  
  
- **createdAt**: `DateTime!`
  
  
  
  
  
- **document**: [`Document`](./documents.md#document-object)
  
  
  
  
  
- **documentId**: `ID`
  
  
  
  
  
- **emoji**: `String!`
  
  
  
  
  
- **id**: `ID!`
  
  
  
  
  
- **updatedAt**: `DateTime!`
  
  
  
  
  

## Queries
### reaction(id: `ID!`): [`Reaction!`](./reactions.md#reaction-object)





### reactions(after, before, first, last): [`Connection<Reaction>`](./reactions.md#reaction-object)



*Arguments*

- **after**: `String`
- **before**: `String`
- **first**: `Int`
- **last**: `Int`


## Mutations
### deleteReaction(articleId, commentId, documentId, emoji, eventId): `Boolean!`



*Arguments*

- **articleId**: `ID`
- **commentId**: `ID`
- **documentId**: `ID`
- **emoji**: `String!`
- **eventId**: `ID`


### toggleReaction(articleId, commentId, documentId, emoji, eventId): [`Reactable!`](./reactions.md#reactable-interface)



*Arguments*

- **articleId**: `ID`
- **commentId**: `ID`
- **documentId**: `ID`
- **emoji**: `String!`
- **eventId**: `ID`


### upsertReaction(articleId, commentId, documentId, emoji, eventId, id): `Int!`



*Arguments*

- **articleId**: `ID`
- **commentId**: `ID`
- **documentId**: `ID`
- **emoji**: `String!`
- **eventId**: `ID`
- **id**: `ID`


## Subscriptions