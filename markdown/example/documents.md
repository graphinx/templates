# Documents (La Frappe)
<html><head></head><body>
<p>Documents publiés dans des <a href="../curriculum">matières</a>.</p>
<p>Nommé "La Frappe" au sein des écoles de Toulouse INP.</p></body></html>

## Types
### Document *(object)*


- **comments**(after, before, first, last): [`Connection<Comment>`](./comments.md#comment-object)
  
  
  
  *Arguments*
  
  - **after**: `String`
  - **before**: `String`
  - **first**: `Int`
  - **last**: `Int`
  
  
- **createdAt**: `DateTime!`
  
  
  
  
  
- **description**: `String!`
  
  
  
  
  
- **descriptionHtml**: `String!`
  
  
  
  
  
- **id**: `ID!`
  
  
  
  
  
- **paperPaths**: `[String!]!`
  
  Liste de chemins vers les fichiers représentant le sujet (ou la fiche de révision)
  
  
  
- **reacted**(emoji: `String!`): `Boolean!`
  
  
  
  
  
- **reactions**(emoji: `String!`): `Int!`
  
  
  
  
  
- **schoolYear**: `Int!`
  
  
  
  
  
- **slug**: `String!`
  
  Un nom lisible sans espaces, adaptés pour des URLs.
  
  
  
- **solutionPaths**: `[String!]!`
  
  Liste de chemins vers les fichiers représentant la correction.
  
  
  
- **subject**: [`Subject`](./curriculum.md#subject-object)
  
  
  
  
  
- **subjectId**: `ID`
  
  
  
  
  
- **title**: `String!`
  
  
  
  
  
- **type**: [`DocumentType!`](./documents.md#documenttype-enum)
  
  
  
  
  
- **uid**: `String!`
  
  
  
  
  
- **updatedAt**: `DateTime!`
  
  
  
  
  
- **uploader**: [`User`](./users.md#user-object)
  
  
  
  
  
- **uploaderId**: `ID`
  
  
  
  
  

### DocumentSearchResult *(object)*


- **document**: [`Document!`](./documents.md#document-object)
  
  
  
  
  
- **id**: `ID!`
  
  
  
  
  
- **rank**: `Int`
  
  
  
  
  
- **similarity**: `Float!`
  
  
  
  
  




## Queries
### document(slug: `String!`, subject: `ID!`): [`Document!`](./documents.md#document-object)





### documents(after, before, first, last): [`Connection<Document>`](./documents.md#document-object)



*Arguments*

- **after**: `String`
- **before**: `String`
- **first**: `Int`
- **last**: `Int`


### searchDocuments(forApprentices, majorUid, q, yearTier): [`[DocumentSearchResult!]!`](./documents.md#documentsearchresult-object)



*Arguments*

- **forApprentices**: `Boolean!`
- **majorUid**: `String!`
- **q**: `String!`
- **yearTier**: `Int!`


## Mutations
### deleteDocument(id: `ID!`): `Boolean!`





### deleteDocumentFile(documentId: `ID!`, filename: `String!`): `Boolean!`





### mergeDocuments(from: `[ID!]!`, into: `ID!`): [`Document!`](./documents.md#document-object)





### setDocumentFileIsSolution(documentId: `ID!`, filename: `String!`, isSolution: `Boolean!`): `Boolean!`





### uploadDocumentFile(documentId: `ID!`, file: [`File!`](./global.md#file-scalar), solution: `Boolean!`): `String!`





### upsertDocument(description, id, schoolYear, subject, title, type): [`Result<Document>`](./documents.md#document-object)



*Arguments*

- **description**: `String!`
- **id**: `ID`
- **schoolYear**: `Int!`
- **subject**: `ID!`
- **title**: `String!`
- **type**: [`DocumentType!`](./documents.md#documenttype-enum)


## Subscriptions