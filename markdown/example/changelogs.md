# Changelogs
<html><head></head><body>
<p>L'historique des versions de l'application.
Les changelogs représentent les changements dans l'application web officielle également, et ne séparent pas les changements de l'API seul de ceux concernant l'application web.</p></body></html>

## Types
### ChangelogRelease *(object)*
A release in the changelog

- **changes**: [`ReleaseChangesMaps!`](./changelogs.md#releasechangesmaps-object)
  
  The changes of the release, grouped by category
  
  
  
- **date**: `DateTime`
  
  The date of the release
  
  
  
- **description**: `String!`
  
  A short description of the release
  
  
  
- **descriptionHtml**: `String!`
  
  A short description of the release, in HTML. Safe from XSS.
  
  
  
- **version**: `String!`
  
  The version of the release
  
  
  





## Queries
### changelog(version: `String`): [`ChangelogRelease!`](./changelogs.md#changelogrelease-object)



*Arguments*

- **version**: `String`
  
  The version to request a changelog for. Defaults to the current version (dev).


### combinedChangelog(from: `String`, sort: [`SortDirection!`](./global.md#sortdirection-enum), to: `String!`): [`Result<ChangelogRelease>`](./changelogs.md#changelogrelease-object)

A changelog for multiple versions. 
Be careful, this range is (from, to]. I.e. **the first version is excluded, and the last is included**. 
This is way more useful for querying a range of versions for a changelog, but not the usual way ranges are defined.

*Arguments*

- **from**: `String`
  
  The version to start from, **exclusive**. Leave empty to start from the latest version the user has seen
- **sort**: [`SortDirection!`](./global.md#sortdirection-enum)
- **to**: `String!`
  
  The version to end at, **inclusive**. Leave empty to end at the current version (dev).


### upcomingChangelog: [`Result<ChangelogRelease>`](./changelogs.md#changelogrelease-object)





## Mutations
### acknowledgeChangelog(version: `String!`): `Boolean!`

Marks the user as having seen the given version's changelog.



## Subscriptions