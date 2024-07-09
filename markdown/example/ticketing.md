# Billetterie
<html><head></head><body>
<p>Billets et réservations de places sur des <a href="/events">évènements</a>.</p></body></html>

## Types






### Registration *(object)*
A reservation is a user's registration for a ticket

- **author**: [`User`](./users.md#user-object)
  
  
  
  
  
- **authorEmail**: `String!`
  
  
  
  
  
- **authorId**: `ID`
  
  
  
  
  
- **authorIsBeneficiary**: `Boolean!`
  
  
  
  
  
- **beneficiary**: `String!`
  
  
  
  
  
- **beneficiaryUser**: [`User`](./users.md#user-object)
  
  
  
  
  
- **cancelled**: `Boolean!`
  
  
  
  
  
- **cancelledAt**: `DateTime`
  
  
  
  
  
- **cancelledBy**: [`User`](./users.md#user-object)
  
  
  
  
  
- **code**: `String!`
  
  
  
  
  
- **createdAt**: `DateTime!`
  
  
  
  
  
- **id**: `ID!`
  
  
  
  
  
- **opposed**: `Boolean!`
  
  
  
  
  
- **opposedAt**: `DateTime`
  
  
  
  
  
- **opposedBy**: [`User`](./users.md#user-object)
  
  
  
  
  
- **paid**: `Boolean!`
  
  
  
  
  
- **paymentMethod**: [`PaymentMethod`](./payments.md#paymentmethod-enum)
  
  
  
  
  
- **ticket**: [`Ticket!`](./ticketing.md#ticket-object)
  
  
  
  
  
- **ticketId**: `ID!`
  
  
  
  
  
- **updatedAt**: `DateTime!`
  
  
  
  
  
- **verified**: `Boolean!`
  
  
  
  
  
- **verifiedAt**: `DateTime`
  
  
  
  
  
- **verifiedBy**: [`User`](./users.md#user-object)
  
  
  
  
  




### Ticket *(object)*
A ticket is a way to register for an event. May include a price and conditions.

- **allowedPaymentMethods**: [`[PaymentMethod!]!`](./payments.md#paymentmethod-enum)
  
  
  
  
  
- **autojoinGroups**: [`[Group!]!`](./groups.md#group-object)
  
  
  
  
  
- **basePrice**: `Float!`
  
  
  
  
  
- **capacity**: `Int!`
  
  
  
  
  
- **closesAt**: `DateTime`
  
  
  
  
  
- **description**: `String!`
  
  
  
  
  
- **descriptionHtml**: `String!`
  
  
  
  
  
- **event**: [`Event!`](./events.md#event-object)
  
  
  
  
  
- **eventId**: `ID!`
  
  
  
  
  
- **fullName**: `String!`
  
  Full name, including the ticket group's name if any
  
  
  
- **godsonLimit**: `Int!`
  
  
  
  
  
- **group**: [`TicketGroup`](./ticketing.md#ticketgroup-object)
  
  
  
  
  
- **id**: `ID!`
  
  
  
  
  
- **links**: [`[Link!]!`](./links.md#link-object)
  
  
  
  
  
- **name**: `String!`
  
  
  
  
  
- **onlyManagersCanProvide**: `Boolean!`
  
  
  
  
  
- **openToAlumni**: `Boolean`
  
  
  
  
  
- **openToApprentices**: `Boolean`
  
  
  
  
  
- **openToContributors**: `Boolean`
  
  
  
  
  
- **openToExternal**: `Boolean`
  
  
  
  
  
- **openToGroups**: [`[Group!]!`](./groups.md#group-object)
  
  
  
  
  
- **openToMajors**: [`[Major!]!`](./curriculum.md#major-object)
  
  
  
  
  
- **openToPromotions**: `[Int!]!`
  
  
  
  
  
- **openToSchools**: [`[School!]!`](./schools.md#school-object)
  
  
  
  
  
- **opensAt**: `DateTime`
  
  
  
  
  
- **placesLeft**: `Int`
  
  Nombre de places restantes. Null si l'information n'est pas disponible. N'est jamais null quand il n'y a plus de places disponibles (0)
  
  
  
- **price**: `Float!`
  
  
  
  
  
- **registrations**: [`[Registration!]!`](./ticketing.md#registration-object)
  
  
  
  
  
- **remainingGodsons**: `Int!`
  
  
  
  
  
- **slug**: `String!`
  
  Un nom lisible sans espaces, adaptés pour des URLs.
  
  
  
- **ticketGroupId**: `ID`
  
  
  
  
  
- **uid**: `String!`
  
  
  
  
  

### TicketGroup *(object)*
A ticket group allows for conditions on multiple tickets, such as an upper limit on the sum of registrations in the sub-tickets

- **capacity**: `Int!`
  
  
  
  
  
- **event**: [`Event!`](./events.md#event-object)
  
  
  
  
  
- **eventId**: `ID!`
  
  
  
  
  
- **id**: `ID!`
  
  
  
  
  
- **name**: `String!`
  
  
  
  
  
- **tickets**: [`[Ticket!]!`](./ticketing.md#ticket-object)
  
  
  
  
  

### TicketGroupInput *(input object)*


- **capacity**: `Int!`
  
  
  
  
  
- **id**: `ID`
  
  
  
  
  
- **name**: `String!`
  
  
  
  
  

### TicketInput *(input object)*


- **allowedPaymentMethods**: [`[PaymentMethod!]!`](./payments.md#paymentmethod-enum)
  
  
  
  
  
- **autojoinGroups**: `[String!]!`
  
  
  
  
  
- **capacity**: `Int!`
  
  
  
  
  
- **closesAt**: `DateTime`
  
  
  
  
  
- **description**: `String!`
  
  
  
  
  
- **godsonLimit**: `Int!`
  
  
  
  
  
- **groupName**: `String`
  
  
  
  
  
- **id**: `ID`
  
  
  
  
  
- **links**: [`[LinkInput!]!`](./links.md#linkinput-input-object)
  
  
  
  
  
- **name**: `String!`
  
  
  
  
  
- **onlyManagersCanProvide**: `Boolean!`
  
  
  
  
  
- **openToAlumni**: `Boolean`
  
  
  
  
  
- **openToApprentices**: `Boolean`
  
  
  
  
  
- **openToContributors**: `Boolean`
  
  
  
  
  
- **openToExternal**: `Boolean`
  
  
  
  
  
- **openToGroups**: `[String!]!`
  
  
  
  
  
- **openToMajors**: `[String!]!`
  
  
  
  
  
- **openToPromotions**: `[Int!]!`
  
  
  
  
  
- **openToSchools**: `[String!]!`
  
  
  
  
  
- **opensAt**: `DateTime`
  
  
  
  
  
- **price**: `Float!`
  
  
  
  
  

## Queries
### registration(id: `ID!`): [`Result<Registration>`](./ticketing.md#registration-object)





### registrationQRCode(id: `ID!`): [`QRCode!`](./global.md#qrcode-object)

Returns an SVG path of the QR Code for the given registration



### registrationsOfUser(after, before, first, forUserOnly, last, userUid): [`Connection<Registration>`](./ticketing.md#registration-object)



*Arguments*

- **after**: `String`
- **before**: `String`
- **first**: `Int`
- **forUserOnly**: `Boolean`
- **last**: `Int`
- **userUid**: `String!`


### ticketGroup(id: `ID!`): [`TicketGroup!`](./ticketing.md#ticketgroup-object)





## Mutations
### cancelRegistration(id: `ID!`): `Result<Boolean>`





### checkIfRegistrationIsPaid(id: `ID!`): `Boolean!`





### createGoogleWalletPass(code: `String!`): `String!`

Créer un pass Google Wallet pour une réservation donnée. Renvoie l'URL a utiliser pour ajouter le pass à Google Wallet.

*Arguments*

- **code**: `String!`
  
  Code de la réservation


### deleteTicket(force: `Boolean!`, id: `ID!`): `Boolean!`



*Arguments*

- **force**: `Boolean!`
  
  Supprimer le billet même s'il existe des réservations
- **id**: `ID!`


### deleteTicketGroup(id: `ID!`): `Boolean!`





### opposeRegistration(id: `ID!`): `Result<Boolean>`





### paidRegistration(beneficiary, paymentMethod, phone, regId): `Result<String>`

When paying with Paypal, returns the order id for a capture to finish the payment

*Arguments*

- **beneficiary**: `String`
- **paymentMethod**: [`PaymentMethod`](./payments.md#paymentmethod-enum)
- **phone**: `String`
- **regId**: `ID!`


### upsertRegistration(authorEmail, beneficiary, id, paid, paymentMethod, ticketId): [`Result<Registration>`](./ticketing.md#registration-object)



*Arguments*

- **authorEmail**: `String`
- **beneficiary**: `String`
- **id**: `ID`
- **paid**: `Boolean!`
- **paymentMethod**: [`PaymentMethod`](./payments.md#paymentmethod-enum)
- **ticketId**: `ID!`


### upsertTicketGroup(capacity, eventId, id, name, tickets): [`TicketGroup!`](./ticketing.md#ticketgroup-object)



*Arguments*

- **capacity**: `Int!`
- **eventId**: `ID!`
- **id**: `ID`
- **name**: `String!`
- **tickets**: `[ID!]!`


## Subscriptions
### registration(id: `ID!`): [`Result<Registration>`](./ticketing.md#registration-object)




