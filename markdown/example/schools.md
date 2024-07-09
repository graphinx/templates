# Écoles
<html><head></head><body>
<p>Écoles présentes sur l'application.</p></body></html>

## Types
### School *(object)*


- **address**: `String!`
  
  
  
  
  
- **aliasMailDomains**: `[String!]!`
  
  
  
  
  
- **color**: `String!`
  
  
  
  
  
- **description**: `String!`
  
  
  
  
  
- **id**: `ID!`
  
  
  
  
  
- **name**: `String!`
  
  
  
  
  
- **pictureFile**: `String!`
  
  
  
  
  
- **pictureFileDark**: `String!`
  
  Le nom du fichier de l'image, en thème sombre
  
  
  
- **pictureURL**(dark: `Boolean!`): `String!`
  
  L'URL publique de l'image
  
  *Arguments*
  
  - **dark**: `Boolean!`
    
    Utiliser l'image en thème sombre
  
  
- **services**: [`[Service!]!`](./services.md#service-object)
  
  
  
  
  
- **slug**: `String!`
  
  
  
  
  
- **studentAssociations**: [`[StudentAssociation!]!`](./student-associations.md#studentassociation-object)
  
  
  
  
  
- **studentMailDomain**: `String!`
  
  
  
  
  
- **uid**: `String!`
  
  
  
  
  

### SchoolGroup *(object)*


- **majors**: [`[Major!]!`](./curriculum.md#major-object)
  
  
  
  
  
- **names**: `[String!]!`
  
  
  
  
  

### SchoolInput *(input object)*


- **color**: `String!`
  
  
  
  
  
- **id**: `ID`
  
  
  
  
  
- **name**: `String!`
  
  
  
  
  

## Queries
### school(uid: `String!`): [`School!`](./schools.md#school-object)





### schoolGroups: [`[SchoolGroup!]!`](./schools.md#schoolgroup-object)





### schools: [`[School!]!`](./schools.md#school-object)





## Mutations
### deleteSchoolPicture(id: `String!`): `String!`





### updateSchool(address, aliasMailDomains, description, name, studentMailDomain, uid): [`School!`](./schools.md#school-object)



*Arguments*

- **address**: `String`
- **aliasMailDomains**: `[String!]!`
- **description**: `String`
- **name**: `String!`
- **studentMailDomain**: `String!`
- **uid**: `String!`


### updateSchoolPicture(file: [`File!`](./global.md#file-scalar), id: `String!`): `String!`





## Subscriptions