# Annonces
<html><head></head><body>
<p>Annonces effectuées par les administrateur·ice·s de l'application.
À afficher à tout le monde (connecté ou non) de manière visible au travers de toute l'application.</p></body></html>

## Types
### Announcement *(object)*
Announcement is a way to get a message accross the entire site, such as for maintenance announcements.

- **body**: `String!`
  
  
  
  
  
- **bodyHtml**: `String!`
  
  
  
  
  
- **by**: [`User`](./users.md#user-object)
  
  
  
  
  
- **createdAt**: `DateTime!`
  
  
  
  
  
- **endsAt**: `DateTime!`
  
  
  
  
  
- **id**: `ID!`
  
  
  
  
  
- **startsAt**: `DateTime!`
  
  
  
  
  
- **title**: `String!`
  
  
  
  
  
- **updatedAt**: `DateTime!`
  
  
  
  
  
- **userId**: `ID`
  
  
  
  
  
- **warning**: `Boolean!`
  
  
  
  
  



## Queries
### announcement(id: `ID!`): [`Announcement!`](./announcements.md#announcement-object)



*Arguments*

- **id**: `ID!`
  
  ID local ou global


### announcements(after, before, first, last): [`Connection<Announcement>`](./announcements.md#announcement-object)



*Arguments*

- **after**: `String`
- **before**: `String`
- **first**: `Int`
- **last**: `Int`


### announcementsNow: [`[Announcement!]!`](./announcements.md#announcement-object)





## Mutations
### deleteAnnouncement(id: `ID!`): `Boolean!`





### upsertAnnouncement(body, endsAt, id, startsAt, title, warning): [`Result<Announcement>`](./announcements.md#announcement-object)



*Arguments*

- **body**: `String!`
- **endsAt**: `DateTime!`
- **id**: `ID`
- **startsAt**: `DateTime!`
- **title**: `String!`
- **warning**: `Boolean!`


## Subscriptions
### announcementsNow: [`[Announcement!]!`](./announcements.md#announcement-object)




