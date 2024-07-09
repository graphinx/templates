# Évènements
<html><head></head><body>
<p>Les différents évènements organisés par des <a href="../groups">groupes</a>.</p>
<p>Un évènement peut, ou non, avoir des billets (et donc un système de billetterie).</p>
<p>Voir <a href="../ticketing">Billetterie</a> pour tout ce qui est billest et réservations.</p>
<h2>URLs additionnelles</h2>
<p>Renvoie un billet PDF d'une réservation ayant pour code <code>:code</code>.</p></body></html>

## Types
### EvenSearchResult *(object)*


- **event**: [`Event!`](./events.md#event-object)
  
  
  
  
  
- **highlightedTitle**: `String!`
  
  
  
  
  
- **id**: `ID!`
  
  
  
  
  
- **rank**: `Float`
  
  
  
  
  
- **similarity**: `Float!`
  
  
  
  
  

### Event *(object)*
An event is a date, time and place, as well as an optional ticket

- **articles**: [`[Article!]!`](./posts.md#article-object)
  
  
  
  
  
- **author**: [`User`](./users.md#user-object)
  
  
  
  
  
- **authorId**: `ID`
  
  
  
  
  
- **bannedUsers**: [`[User!]!`](./users.md#user-object)
  
  
  
  
  
- **beneficiary**: [`LydiaAccount`](./payments.md#lydiaaccount-object)
  
  
  
  
  
- **bookings**(after, before, first, last): `EventBookingsConnection!`
  
  
  
  *Arguments*
  
  - **after**: `String`
  - **before**: `String`
  - **first**: `Int`
  - **last**: `Int`
  
  
- **bookingsCounts**: [`RegistrationsCounts!`](./ticketing.md#registrationscounts-object)
  
  
  
  
  
- **bookingsCsv**: `EventBookingsCsvResult!`
  
  Renvoie un texte au format CSV contenant un export des réservations de l'évènement.
  
  
  
- **canEdit**: `Boolean!`
  
  L'utilisateur·ice connecté·e peut modifier cet évènement
  
  
  
- **canEditManagers**: `Boolean!`
  
  L'utilisateur·ice connecté·e peut ajouter, enlever ou modifier les droits des managers de cet évènement
  
  
  
- **canSeeBookings**: `Boolean!`
  
  L'utilisateur·ice connecté·e peut scanner les réservations de cet évènement
  
  
  
- **canSeeLogs**: `Boolean!`
  
  L'utilsateur·ice connecté·e peut voir les logs de cet évènement
  
  
  
- **capacity**: `Int!`
  
  
  
  
  
- **coOrganizers**: [`[Group!]!`](./groups.md#group-object)
  
  
  
  
  
- **contactMail**: `String!`
  
  
  
  
  
- **description**: `String!`
  
  
  
  
  
- **descriptionHtml**: `String!`
  
  
  
  
  
- **descriptionPreview**: `String!`
  
  
  
  
  
- **endsAt**: `DateTime!`
  
  
  
  
  
- **forms**: [`[Form!]!`](./forms.md#form-object)
  
  Formulaires associés à l'événement
  
  
  
- **frequency**: [`EventFrequency!`](./events.md#eventfrequency-enum)
  
  
  
  
  
- **group**: [`Group!`](./groups.md#group-object)
  
  
  
  
  
- **groupId**: `ID!`
  
  
  
  
  
- **id**: `ID!`
  
  
  
  
  
- **includeInKiosk**: `Boolean!`
  
  Vrai si l'évènement doit apparaître dans le mode kiosque
  
  
  
- **links**: [`[Link!]!`](./links.md#link-object)
  
  
  
  
  
- **location**: `String!`
  
  
  
  
  
- **logs**(after, before, first, last): `EventLogsConnection!`
  
  Logs concernant cet évènement. Ne contient pas les logs concernant les réservations.
  
  *Arguments*
  
  - **after**: `String`
  - **before**: `String`
  - **first**: `Int`
  - **last**: `Int`
  
  
- **lydiaAccountId**: `ID`
  
  
  
  
  
- **managers**: [`[EventManager!]!`](./events.md#eventmanager-object)
  
  
  
  
  
- **myBookings**: `EventMyBookingsResult!`
  
  Réservations faites par et/ou pour l'utilisateur.ice connecté.e
  
  
  
- **myReactions**: [`BooleanMap!`](./reactions.md#booleanmap-scalar)
  
  
  
  
  
- **mySoonestShotgunOpensAt**: `DateTime`
  
  
  
  
  
- **pictureFile**: `String!`
  
  
  
  
  
- **pictureFileDark**: `String!`
  
  Le nom du fichier de l'image, en thème sombre
  
  
  
- **pictureURL**(dark: `Boolean!`): `String!`
  
  L'URL publique de l'image
  
  *Arguments*
  
  - **dark**: `Boolean!`
    
    Utiliser l'image en thème sombre
  
  
- **placesLeft**: `Int`
  
  
  
  
  
- **profitsBreakdown**: [`ProfitsBreakdown!`](./payments.md#profitsbreakdown-object)
  
  
  
  
  
- **reacted**(emoji: `String!`): `Boolean!`
  
  
  
  
  
- **reactionCounts**: [`Counts!`](./reactions.md#counts-scalar)
  
  
  
  
  
- **reactions**(emoji: `String!`): `Int!`
  
  
  
  
  
- **recurringUntil**: `DateTime`
  
  
  
  
  
- **searchBookings**(q: `String!`): `[RegistrationSearchResult!]!`
  
  
  
  
  
- **showPlacesLeft**: `Boolean!`
  
  Vrai si le nombre de places restantes doit être affiché
  
  
  
- **slug**: `String!`
  
  Un nom lisible sans espaces, adaptés pour des URLs.
  
  
  
- **startsAt**: `DateTime!`
  
  
  
  
  
- **ticket**(id: `ID`, slug: `String`): [`Ticket!`](./ticketing.md#ticket-object)
  
  
  
  
  
- **ticketGroups**: [`[TicketGroup!]!`](./ticketing.md#ticketgroup-object)
  
  
  
  
  
- **tickets**: [`[Ticket!]!`](./ticketing.md#ticket-object)
  
  
  
  
  
- **title**: `String!`
  
  
  
  
  
- **uid**: `String!`
  
  
  
  
  
- **visibility**: [`Visibility!`](./global.md#visibility-enum)
  
  
  
  
  


### EventManager *(object)*
An event manager is a user that can scan tickets, and may be able to manage the event

- **canEdit**: `Boolean!`
  
  
  
  
  
- **canEditPermissions**: `Boolean!`
  
  
  
  
  
- **canVerifyRegistrations**: `Boolean!`
  
  
  
  
  
- **event**: [`Event!`](./events.md#event-object)
  
  
  
  
  
- **power**: [`EventManagerPowerLevel!`](./events.md#eventmanagerpowerlevel-enum)
  
  
  
  
  
- **user**: [`User!`](./users.md#user-object)
  
  
  
  
  


### EventsByDay *(object)*


- **date**: `DateTime!`
  
  
  
  
  
- **happening**: [`[Event!]!`](./events.md#event-object)
  
  Évènements qui ont lieu (commencent) à ce jour
  
  
  
- **shotgunning**: [`[Event!]!`](./events.md#event-object)
  
  Évènements qui ont leur premier shotgun à ce jour
  
  
  

### ManagerOfEventInput *(input object)*


- **canEdit**: `Boolean!`
  
  
  
  
  
- **canEditPermissions**: `Boolean!`
  
  
  
  
  
- **canVerifyRegistrations**: `Boolean!`
  
  
  
  
  
- **userUid**: `String!`
  
  
  
  
  




## Queries
### event(group: [`UID!`](./global.md#uid-scalar), slug: `String!`): [`Event!`](./events.md#event-object)





### eventManager(eventId: `ID!`, user: `String!`): [`EventManager!`](./events.md#eventmanager-object)





### events(...): [`Connection<Event>`](./events.md#event-object)



*Arguments*

- **after**: `String`
- **before**: `String`
- **first**: `Int`
- **future**: `Boolean`
- **kiosk**: `Boolean`
  
  N'include seulement les évènements qui veulent être inclus dans l'affichage kiosque
- **last**: `Int`
- **noLinkedArticles**: `Boolean`
- **past**: `Boolean`
- **pastRecurring**: `Boolean`
- **upcomingShotguns**: `Boolean`


### eventsByDay(after, before, first, kiosk, last): [`Connection<EventsByDay>`](./events.md#eventsbyday-object)

Tout les évènements, regroupés par date (de début). Les curseurs (before, after) peuvent être des dates au format YYYY-MM-DD

*Arguments*

- **after**: `String`
- **before**: `String`
- **first**: `Int`
- **kiosk**: `Boolean`
  
  N'include seulement les évènements qui veulent être inclus dans l'affichage kiosque
- **last**: `Int`


### eventsInWeek(today: `DateTime!`): [`[Event!]!`](./events.md#event-object)





### kioskReload: `Boolean!`





### searchEvents(groupUid: `String`, q: `String!`): [`[EvenSearchResult!]!`](./events.md#evensearchresult-object)





## Mutations
### deleteEvent(id: `ID!`): `Boolean!`





### deleteEventManager(eventId: `ID!`, user: `String!`): `Boolean!`





### deleteEventPicture(id: `ID!`): `Boolean!`





### kioskReload: `Boolean!`





### updateEventPicture(file: [`File!`](./global.md#file-scalar), id: `ID!`): `String!`





### upsertEvent(...): [`Result<Event>`](./events.md#event-object)



*Arguments*

- **bannedUsers**: `[String!]!`
  
  List of user uids
- **coOrganizers**: `[String!]!`
  
  List of group uids
- **contactMail**: `String!`
- **description**: `String!`
- **endsAt**: `DateTime!`
- **frequency**: [`EventFrequency!`](./events.md#eventfrequency-enum)
- **groupUid**: `String!`
- **id**: `String`
- **includeInKiosk**: `Boolean`
  
  Include l'évènement dans l'affichage du mode kiosque
- **links**: [`[LinkInput!]!`](./links.md#linkinput-input-object)
- **location**: `String!`
- **lydiaAccountId**: `String`
- **managers**: [`[ManagerOfEventInput!]!`](./events.md#managerofeventinput-input-object)
- **recurringUntil**: `DateTime`
- **showPlacesLeft**: `Boolean`
  
  Affiche le nombre de places restantes dans l'évènement
- **startsAt**: `DateTime!`
- **ticketGroups**: [`[TicketGroupInput!]!`](./ticketing.md#ticketgroupinput-input-object)
- **tickets**: [`[TicketInput!]!`](./ticketing.md#ticketinput-input-object)
- **title**: `String!`
- **visibility**: [`Visibility!`](./global.md#visibility-enum)


### upsertManagersOfEvent(eventId: `ID!`, managers: [`[ManagerOfEventInput!]!`](./events.md#managerofeventinput-input-object)): [`[EventManager!]!`](./events.md#eventmanager-object)





## Subscriptions
### event(group: [`UID!`](./global.md#uid-scalar), slug: `String!`): [`Event!`](./events.md#event-object)





### kioskReload: `Boolean!`




