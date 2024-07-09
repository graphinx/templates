# Commentaires
<html><head></head><body>
<p>Les différents commentaires postés.
Les commentaires peuvent être reliés à des <a href="../posts">posts</a> ou des <a href="../documents">documents</a></p></body></html>

## Types
### Comment *(object)*


- **author**: [`User`](./users.md#user-object)
  
  
  
  
  
- **authorId**: `ID`
  
  
  
  
  
- **body**: `String!`
  
  
  
  
  
- **bodyHtml**: `String!`
  
  
  
  
  
- **createdAt**: `DateTime!`
  
  
  
  
  
- **document**: [`Document`](./documents.md#document-object)
  
  
  
  
  
- **documentId**: `ID`
  
  
  
  
  
- **id**: `ID!`
  
  
  
  
  
- **inReplyTo**: [`Comment`](./comments.md#comment-object)
  
  
  
  
  
- **inReplyToId**: `ID`
  
  
  
  
  
- **reacted**(emoji: `String!`): `Boolean!`
  
  
  
  
  
- **reactions**(emoji: `String!`): `Int!`
  
  
  
  
  
- **replies**: [`[Comment!]!`](./comments.md#comment-object)
  
  
  
  
  
- **updatedAt**: `DateTime!`
  
  
  
  
  

### Commentable *(interface)*
Une resource pouvant être commentée par les utilisateur·ice·s

- **comments**(after, before, first, last): [`Connection<Comment>`](./comments.md#comment-object)
  
  
  
  *Arguments*
  
  - **after**: `String`
  - **before**: `String`
  - **first**: `Int`
  - **last**: `Int`
  
  
- **id**: `ID!`
  
  L’identifiant de la resource commentée
  
  
  


## Queries
## Mutations
### deleteComment(id: `ID!`): [`Comment!`](./comments.md#comment-object)





### upsertComment(body, id, inReplyToId, resourceId): [`Comment!`](./comments.md#comment-object)



*Arguments*

- **body**: `String!`
- **id**: `ID`
- **inReplyToId**: `ID`
- **resourceId**: `ID`


## Subscriptions