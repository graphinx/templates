# Services
<html><head></head><body>
<p>Services externes proposés par une <a href="../student-associations">AE</a>, une <a href="../schools">école</a> ou un <a href="../groups">groupe</a>.</p></body></html>

## Types


### Service *(object)*
A service

- **description**: `String!`
  
  
  
  
  
- **group**: [`Group`](./groups.md#group-object)
  
  
  
  
  
- **id**: `ID!`
  
  
  
  
  
- **importance**: `Int!`
  
  
  
  
  
- **logo**: `String!`
  
  
  
  
  
- **logoSourceType**: [`LogoSourceType!`](./services.md#logosourcetype-enum)
  
  
  
  
  
- **name**: `String!`
  
  
  
  
  
- **school**: [`School`](./schools.md#school-object)
  
  
  
  
  
- **studentAssociation**: [`StudentAssociation`](./student-associations.md#studentassociation-object)
  
  
  
  
  
- **url**: `String!`
  
  
  
  
  

## Queries
### service(id: `ID!`): [`Service!`](./services.md#service-object)





### services(groupUid: `String`, schoolUid: `String`, studentAssociationUid: `String`): [`[Service!]!`](./services.md#service-object)





### userServices: [`[Service!]!`](./services.md#service-object)





## Mutations
### upsertService(...): [`Result<Service>`](./services.md#service-object)



*Arguments*

- **description**: `String!`
- **groupUid**: `String`
- **id**: `ID`
- **importance**: `Int`
- **logo**: `String!`
- **logoSourceType**: [`LogoSourceType!`](./services.md#logosourcetype-enum)
- **name**: `String!`
- **schoolUid**: `String`
- **studentAssociationUid**: `String`
- **url**: `String!`


## Subscriptions