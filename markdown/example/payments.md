# Paiements
<html><head></head><body>
<p>Intégrations avec différents prestataires de paiements, notamment <a href="https://lydia-app.com">Lydia</a> et <a href="https://paypal.com">PayPal</a>.</p></body></html>

## Types
### LydiaAccount *(object)*
A Lydia account

- **events**: [`[Event!]!`](./events.md#event-object)
  
  
  
  
  
- **group**: [`Group`](./groups.md#group-object)
  
  
  
  
  
- **groupId**: `ID`
  
  
  
  
  
- **id**: `ID!`
  
  
  
  
  
- **name**: `String!`
  
  
  
  
  
- **studentAssociation**: [`StudentAssociation`](./student-associations.md#studentassociation-object)
  
  
  
  
  
- **studentAssociationId**: `ID`
  
  
  
  
  


### PaymentMethod *(enum)*


- `Card`
- `Cash`
- `Check`
- `Lydia`
- `Other`
- `PayPal`
- `Transfer`


### PromotionType *(enum)*


- `SIMPPS`

## Queries
### lydiaAccount(id: `ID!`): [`LydiaAccount!`](./payments.md#lydiaaccount-object)





### lydiaAccounts: [`[LydiaAccount!]!`](./payments.md#lydiaaccount-object)





### lydiaAccountsOfGroup(uid: `String!`): [`[LydiaAccount!]!`](./payments.md#lydiaaccount-object)





## Mutations
### claimPromotionCode(code: `String!`): `Boolean!`





### finishPaypalRegistrationPayment(orderId: `String!`): `Result<Boolean>`





### upsertLydiaAccount(groupUid, id, name, privateToken, vendorToken): [`LydiaAccount!`](./payments.md#lydiaaccount-object)



*Arguments*

- **groupUid**: `String!`
- **id**: `ID`
- **name**: `String!`
- **privateToken**: `String!`
- **vendorToken**: `String!`


## Subscriptions