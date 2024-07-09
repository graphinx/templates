# Associations étudiantes
<html><head></head><body>
<p>Associations Étudiantes de chaque <a href="/schools">école</a>. Il n'y a qu'une seule <em>AE</em> par école.</p></body></html>

## Types
### ContributionOption *(object)*


- **descriptionHtml**: `String!`
  
  
  
  
  
- **id**: `ID!`
  
  
  
  
  
- **name**: `String!`
  
  
  
  
  
- **offeredIn**: [`School!`](./schools.md#school-object)
  
  
  
  
  
- **paysFor**: [`[StudentAssociation!]!`](./student-associations.md#studentassociation-object)
  
  
  
  
  
- **price**: `Float!`
  
  
  
  
  


### StudentAssociation *(object)*
There is one student association per school

- **canCreateGroups**(type: [`GroupType`](./groups.md#grouptype-enum)): `Boolean!`
  
  Si l'utilsateur·ice courant·e peut créer des groupes rattachés à cette AE
  
  *Arguments*
  
  - **type**: [`GroupType`](./groups.md#grouptype-enum)
    
    Quel type de groupe l'on souhaiterait créer. Si non spécifié, renvoie vrai si l'on peut créer au moins un type de groupe
  
  
- **canEditPages**: `Boolean!`
  
  L'utilisateur·ice connecté·e peut éditer (créer ou modifier) les pages de l'AE
  
  
  
- **canListPages**: `Boolean!`
  
  L'utilisateur·ice connecté·e peut lister les pages de l'AE
  
  
  
- **contributionOptions**: [`[ContributionOption!]!`](./student-associations.md#contributionoption-object)
  
  
  
  
  
- **createdAt**: `DateTime!`
  
  
  
  
  
- **description**: `String!`
  
  
  
  
  
- **groups**(after, before, first, last, types): `StudentAssociationGroupsConnection!`
  
  
  
  *Arguments*
  
  - **after**: `String`
  - **before**: `String`
  - **first**: `Int`
  - **last**: `Int`
  - **types**: [`[GroupType!]`](./groups.md#grouptype-enum)
  
  
- **groupsCount**: `Int!`
  
  Nombre de groupes reliés à cette AE
  
  
  
- **id**: `ID!`
  
  
  
  
  
- **links**: [`[Link!]!`](./links.md#link-object)
  
  
  
  
  
- **name**: `String!`
  
  
  
  
  
- **page**(path: `String!`): [`Page`](./pages.md#page-object)
  
  La page associée à l'AE
  
  *Arguments*
  
  - **path**: `String!`
    
    Le chemin de la page. Ce n'est pas le chemin complet, mais celui qui est local à l'AE. Voir `Page` pour plus d'informations.
  
  
- **pages**(after, before, first, last): [`Connection<Page>`](./pages.md#page-object)
  
  Les pages associées à l'AE
  
  *Arguments*
  
  - **after**: `String`
  - **before**: `String`
  - **first**: `Int`
  - **last**: `Int`
  
  
- **pictureFile**: `String!`
  
  
  
  
  
- **pictureFileDark**: `String!`
  
  Le nom du fichier de l'image, en thème sombre
  
  
  
- **pictureURL**(dark: `Boolean!`): `String!`
  
  L'URL publique de l'image
  
  *Arguments*
  
  - **dark**: `Boolean!`
    
    Utiliser l'image en thème sombre
  
  
- **school**: [`School!`](./schools.md#school-object)
  
  
  
  
  
- **schoolId**: `ID!`
  
  
  
  
  
- **uid**: `String`
  
  
  
  
  
- **updatedAt**: `DateTime!`
  
  
  
  
  

## Queries
### contributionOptions: [`[ContributionOption!]!`](./student-associations.md#contributionoption-object)





### studentAssociation(uid: `String!`): [`StudentAssociation!`](./student-associations.md#studentassociation-object)





### studentAssociations(canContributeOnly: `Boolean`): [`[StudentAssociation!]!`](./student-associations.md#studentassociation-object)





## Mutations
### cancelPendingContribution(optionId: `ID!`): `Boolean!`





### contribute(optionId: `ID!`, phone: `String!`): `Result<Boolean>`





### updateStudentAssociationPicture(file: [`File!`](./global.md#file-scalar), uid: `String!`): `String!`





## Subscriptions