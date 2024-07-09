# Semaines de bar
<html><head></head><body>
<p>Spécifique à l'AEn7, représente une semaine où un club organise des activités et staff pour le bar du Foyer.
Les personnes ayant la permissions d'en créer sont les administrateur·ice·s, responsables des clubs (permission <code>canEditGroups</code>) et membres du bureau du Foyer (configurés avec la variable d'environnement <code>FOY_GROUPS</code>, liste séparée par des virgules d'uids de groupes)</p></body></html>

## Types


## Queries
### barWeek(slug: `String!`): [`BarWeek!`](./bar-weeks.md#barweek-object)





### barWeekNow(now: `DateTime!`): [`BarWeek`](./bar-weeks.md#barweek-object)





### barWeeks: [`[BarWeek!]!`](./bar-weeks.md#barweek-object)





## Mutations
### deleteBarWeek(id: `ID!`): `Boolean!`





### upsertBarWeek(description, endsAt, groupsUids, id, startsAt): [`Result<BarWeek>`](./bar-weeks.md#barweek-object)



*Arguments*

- **description**: `String!`
- **endsAt**: `DateTime!`
- **groupsUids**: `[String!]!`
- **id**: `ID`
- **startsAt**: `DateTime!`


## Subscriptions