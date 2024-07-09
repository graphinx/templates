# Notifications
<html><head></head><body>
<p>Notifications envoyées aux utilisateurs.</p></body></html>

## Types
### Notification *(object)*
A notification is a push notification that was sent to a user

- **actions**: [`[Link!]!`](./links.md#link-object)
  
  
  
  
  
- **body**: `String!`
  
  
  
  
  
- **channel**: [`NotificationChannel!`](./notifications.md#notificationchannel-enum)
  
  
  
  
  
- **createdAt**: `DateTime!`
  
  
  
  
  
- **goto**: `String!`
  
  
  
  
  
- **group**: [`Group`](./groups.md#group-object)
  
  
  
  
  
- **groupId**: `ID`
  
  
  
  
  
- **id**: `ID!`
  
  
  
  
  
- **imageFile**: `String!`
  
  
  
  
  
- **subscription**: [`NotificationSubscription!`](./notifications.md#notificationsubscription-object)
  
  
  
  
  
- **subscriptionId**: `ID!`
  
  
  
  
  
- **timestamp**: `DateTime`
  
  
  
  
  
- **title**: `String!`
  
  
  
  
  
- **updatedAt**: `DateTime!`
  
  
  
  
  
- **vibrate**: `[Int!]!`
  
  
  
  
  

### NotificationChannel *(enum)*


- `Articles`
- `Comments`
- `GodparentRequests`
- `GroupBoard`
- `Other`
- `Permissions`
- `Shotguns`

### NotificationSubscription *(object)*
A NotificationSubscription stores a user's subscription to push notifications on a user agent

- **createdAt**: `DateTime!`
  
  
  
  
  
- **endpoint**: `String!`
  
  
  
  
  
- **expiresAt**: `DateTime`
  
  
  
  
  
- **id**: `ID!`
  
  
  
  
  
- **name**: `String!`
  
  
  
  
  
- **owner**: [`User!`](./users.md#user-object)
  
  
  
  
  
- **ownerId**: `ID!`
  
  
  
  
  
- **updatedAt**: `DateTime!`
  
  
  
  
  

### NotificationSubscriptionKeysInput *(input object)*


- **auth**: `String!`
  
  
  
  
  
- **p256dh**: `String!`
  
  
  
  
  


## Queries
### notification(id: `ID!`): [`Notification!`](./notifications.md#notification-object)





### notificationSubscription(endpoint: `String!`): [`NotificationSubscription!`](./notifications.md#notificationsubscription-object)





### notificationSubscriptions: [`[NotificationSubscription!]!`](./notifications.md#notificationsubscription-object)





### notifications(...): [`Connection<Notification>`](./notifications.md#notification-object)



*Arguments*

- **after**: `String`
- **before**: `String`
- **channels**: [`[NotificationChannel!]`](./notifications.md#notificationchannel-enum)
- **first**: `Int`
- **groupUids**: `[String!]`
- **last**: `Int`
- **subscriptionEndpoint**: `ID`


### notificationsSendCountForArticle(group: [`UID!`](./global.md#uid-scalar), visibility: [`Visibility!`](./global.md#visibility-enum)): `Int!`

Returns how many people will be notified if an article of the given visibility and group is created.



## Mutations
### deleteNotificationSubscription(endpoint: `String!`): `Boolean!`





### sendNotification(body: `String!`, title: `String!`): `Boolean!`

Envoie une notification à l'utilisateur connecté. Limité à une notification par heure. Si l'utilisateur a désactivé les notifications de type “Autres” pour le groupe responsable du [client OAuth](/oauth) faisant la requête, la notification ne lui sera pas envoyée.

- **Rate limit:** 1/heure

*Arguments*

- **body**: `String!`
  
  Corps de la notification.
- **title**: `String!`
  
  Titre de la notification. Sera préfixé par “[Nom de l'application]” quand la mutation est appelée par un [client OAuth](/oauth).


### testNotification(subscriptionEndpoint: `String!`): `Boolean!`





### upsertNotificationSubscription(endpoint, expiresAt, keys, name): [`NotificationSubscription!`](./notifications.md#notificationsubscription-object)



*Arguments*

- **endpoint**: `String!`
- **expiresAt**: `DateTime`
- **keys**: [`NotificationSubscriptionKeysInput!`](./notifications.md#notificationsubscriptionkeysinput-input-object)
- **name**: `String!`


## Subscriptions