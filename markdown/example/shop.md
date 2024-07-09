# Boutique
<html><head></head><body>
<p>Système de boutique permettant aux groupes de mettre en vente des produits.</p></body></html>

## Types





### ShopItem *(object)*


- **createdAt**: `DateTime!`
  
  
  
  
  
- **description**: `String!`
  
  
  
  
  
- **descriptionHtml**: `String!`
  
  
  
  
  
- **endsAt**: `DateTime`
  
  
  
  
  
- **group**: [`Group!`](./groups.md#group-object)
  
  
  
  
  
- **id**: `ID!`
  
  
  
  
  
- **itemOptions**: [`[ShopItemOption!]!`](./shop.md#shopitemoption-object)
  
  
  
  
  
- **lydiaAccount**: [`LydiaAccount`](./payments.md#lydiaaccount-object)
  
  
  
  
  
- **max**: `Int!`
  
  
  
  
  
- **name**: `String!`
  
  
  
  
  
- **paymentMethods**: [`[PaymentMethod!]!`](./payments.md#paymentmethod-enum)
  
  
  
  
  
- **pictures**: [`[Picture!]!`](./shop.md#picture-object)
  
  
  
  
  
- **price**: `Float!`
  
  
  
  
  
- **shopPayments**: [`[ShopPayment!]!`](./shop.md#shoppayment-object)
  
  
  
  
  
- **slug**: `String!`
  
  Un nom lisible sans espaces, adaptés pour des URLs.
  
  
  
- **startsAt**: `DateTime`
  
  
  
  
  
- **stock**: `Int!`
  
  
  
  
  
- **stockLeft**: `Int!`
  
  
  
  
  
- **uid**: `String!`
  
  
  
  
  
- **updatedAt**: `DateTime!`
  
  
  
  
  
- **visibility**: [`Visibility!`](./global.md#visibility-enum)
  
  
  
  
  



### ShopItemOptionInput *(input object)*


- **id**: `String!`
  
  
  
  
  
- **name**: `String!`
  
  
  
  
  
- **options**: `[String!]!`
  
  
  
  
  
- **otherToggle**: `Boolean!`
  
  
  
  
  
- **required**: `Boolean!`
  
  
  
  
  

### ShopPayment *(object)*


- **createdAt**: `DateTime!`
  
  
  
  
  
- **id**: `ID!`
  
  
  
  
  
- **paid**: `Boolean!`
  
  
  
  
  
- **paymentMethod**: [`PaymentMethod!`](./payments.md#paymentmethod-enum)
  
  
  
  
  
- **quantity**: `Int!`
  
  
  
  
  
- **shopItem**: [`ShopItem!`](./shop.md#shopitem-object)
  
  
  
  
  
- **shopItemAnswer**: [`ShopItemAnswer!`](./shop.md#shopitemanswer-object)
  
  
  
  
  
- **totalPrice**: `Float!`
  
  
  
  
  
- **updatedAt**: `DateTime!`
  
  
  
  
  
- **user**: [`User!`](./users.md#user-object)
  
  
  
  
  

## Queries
### shopItem(slug: `String!`): [`ShopItem!`](./shop.md#shopitem-object)





### shopPayments(item: `ID!`): [`[ShopPayment!]!`](./shop.md#shoppayment-object)





## Mutations
### deleteItemPicture(groupUid: `String!`, itemId: `String!`, pictureId: `String!`): `Boolean!`





### deleteShopItem(groupUid: `String!`, itemId: `ID!`): `Result<Boolean>`





### deleteShopOption(optionIds: `[String!]!`): `Boolean!`





### paidShopPayment(paymentMethod: [`PaymentMethod`](./payments.md#paymentmethod-enum), phone: `String`, shopPaymentId: `ID!`): [`Result<ShopPayment>`](./shop.md#shoppayment-object)





### updateItemPicture(file: [`File!`](./global.md#file-scalar), groupUid: `String!`, itemId: `String!`): [`Picture!`](./shop.md#picture-object)





### upsertShopItem(...): [`Result<ShopItem>`](./shop.md#shopitem-object)



*Arguments*

- **description**: `String!`
- **endsAt**: `DateTime`
- **groupUid**: `String!`
- **id**: `ID`
- **lydiaAccounId**: `String`
- **max**: `Int!`
- **name**: `String!`
- **paymentMethods**: [`[PaymentMethod!]!`](./payments.md#paymentmethod-enum)
- **price**: `Float!`
- **startsAt**: `DateTime`
- **stock**: `Int!`
- **visibility**: [`Visibility!`](./global.md#visibility-enum)


### upsertShopOptions(itemOptions: [`[ShopItemOptionInput!]!`](./shop.md#shopitemoptioninput-input-object), shopItemId: `String!`): `Boolean!`





### upsertShopPayment(...): [`Result<ShopPayment>`](./shop.md#shoppayment-object)



*Arguments*

- **answers**: `[String!]!`
- **id**: `ID`
- **paymentMethod**: `String`
- **phone**: `String`
- **quantity**: `Int!`
- **shopItemId**: `String!`
- **userUid**: `String!`


## Subscriptions