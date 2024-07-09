# Groupes
<html><head></head><body>
<p>Groupes de personnnes: peut être un club, une association, un bureau d'<a href="../student-associations">AE</a>, un groupe d'intégration ou un simple groupe (parfois dit "groupe informel").</p></body></html>

## Types
### Group *(object)*
A group is a collection of users

- **address**: `String!`
  
  
  
  
  
- **ancestors**: [`[Group!]!`](./groups.md#group-object)
  
  All the ancestors of this group, from the current group to the root.
  
  
  
- **articles**: [`[Article!]!`](./posts.md#article-object)
  
  
  
  
  
- **boardMembers**: [`[GroupMember!]!`](./groups.md#groupmember-object)
  
  
  
  
  
- **canEditDetails**: `Boolean!`
  
  Vrai si l'utilisateur·ice connecté·e peut modifier les informations du groupe
  
  
  
- **canEditPages**: `Boolean!`
  
  L'utilisateur·ice connecté·e peut éditer (créer ou modifier) les pages du groupe
  
  
  
- **canListPages**: `Boolean!`
  
  L'utilisateur·ice connecté·e peut lister les pages du groupe
  
  
  
- **children**: [`[Group!]!`](./groups.md#group-object)
  
  
  
  
  
- **coOrganizedEvents**: [`[Event!]!`](./events.md#event-object)
  
  
  
  
  
- **color**: `String!`
  
  
  
  
  
- **description**: `String!`
  
  
  
  
  
- **email**: `String!`
  
  
  
  
  
- **events**(after, before, first, last): `GroupEventsConnection!`
  
  
  
  *Arguments*
  
  - **after**: `String`
  - **before**: `String`
  - **first**: `Int`
  - **last**: `Int`
  
  
- **familyChildren**: [`[Group!]!`](./groups.md#group-object)
  
  
  
  
  
- **familyId**: `ID`
  
  Helper field to get a whole tree without processing all groups\nTo be set to the group's id itself for root groups.
  
  
  
- **forms**: [`[Form!]!`](./forms.md#form-object)
  
  Formulaires associés au groupe
  
  
  
- **groupId**: `ID!`
  
  
  
  
  
- **id**: `ID!`
  
  
  
  
  
- **ldapUid**: `String!`
  
  
  
  
  
- **links**: [`[Link!]!`](./links.md#link-object)
  
  
  
  
  
- **longDescription**: `String!`
  
  
  
  
  
- **longDescriptionHtml**: `String!`
  
  
  
  
  
- **mailingList**: `String!`
  
  
  
  
  
- **members**: [`[GroupMember!]!`](./groups.md#groupmember-object)
  
  
  
  
  
- **name**: `String!`
  
  
  
  
  
- **ownEvents**: [`[Event!]!`](./events.md#event-object)
  
  
  
  
  
- **page**(path: `String!`): [`Page`](./pages.md#page-object)
  
  La page associée au groupe
  
  *Arguments*
  
  - **path**: `String!`
    
    Le chemin de la page. Ce n'est pas le chemin complet, mais celui qui est local au groupe. Voir `Page` pour plus d'informations.
  
  
- **pages**(after, before, first, last): [`Connection<Page>`](./pages.md#page-object)
  
  Les pages associées au groupe
  
  *Arguments*
  
  - **after**: `String`
  - **before**: `String`
  - **first**: `Int`
  - **last**: `Int`
  
  
- **parent**: [`Group`](./groups.md#group-object)
  
  Parent group, from which this group inherits its permissions
  
  
  
- **parentId**: `ID`
  
  
  
  
  
- **pictureFile**: `String!`
  
  
  
  
  
- **pictureFileDark**: `String!`
  
  
  
  
  
- **pictureURL**(dark: `Boolean!`): `String!`
  
  L'URL publique de l'image
  
  *Arguments*
  
  - **dark**: `Boolean!`
    
    Utiliser l'image en thème sombre
  
  
- **president**: [`GroupMember`](./groups.md#groupmember-object)
  
  
  
  
  
- **related**: [`[Group!]!`](./groups.md#group-object)
  
  Related clubs
  
  
  
- **roomIsOpen**: `Boolean!`
  
  
  
  
  
- **root**: [`Group`](./groups.md#group-object)
  
  Family root, only created for performance reasons
  
  
  
- **secretaries**: [`[GroupMember!]!`](./groups.md#groupmember-object)
  
  
  
  
  
- **selfJoinable**: `Boolean!`
  
  
  
  
  
- **services**: [`[Service!]!`](./services.md#service-object)
  
  
  
  
  
- **shopItems**(after, before, first, last): `GroupShopItemsConnection!`
  
  
  
  *Arguments*
  
  - **after**: `String`
  - **before**: `String`
  - **first**: `Int`
  - **last**: `Int`
  
  
- **shopOrders**: [`[ShopPayment!]!`](./shop.md#shoppayment-object)
  
  
  
  
  
- **studentAssociation**: [`StudentAssociation`](./student-associations.md#studentassociation-object)
  
  
  
  
  
- **treasurers**: [`[GroupMember!]!`](./groups.md#groupmember-object)
  
  
  
  
  
- **type**: [`GroupType!`](./groups.md#grouptype-enum)
  
  
  
  
  
- **uid**: `String!`
  
  
  
  
  
- **vicePresidents**: [`[GroupMember!]!`](./groups.md#groupmember-object)
  
  
  
  
  
- **website**: `String!`
  
  
  
  
  

### GroupMember *(object)*
The intermediate model between users and groups

- **canEditArticles**: `Boolean!`
  
  
  
  
  
- **canEditMembers**: `Boolean!`
  
  
  
  
  
- **canScanEvents**: `Boolean!`
  
  
  
  
  
- **createdAt**: `DateTime!`
  
  
  
  
  
- **group**: [`Group!`](./groups.md#group-object)
  
  
  
  
  
- **groupId**: `ID!`
  
  
  
  
  
- **isDeveloper**: `Boolean!`
  
  
  
  
  
- **member**: [`User!`](./users.md#user-object)
  
  
  
  
  
- **memberId**: `ID!`
  
  
  
  
  
- **president**: `Boolean!`
  
  
  
  
  
- **secretary**: `Boolean!`
  
  
  
  
  
- **title**: `String!`
  
  
  
  
  
- **treasurer**: `Boolean!`
  
  
  
  
  
- **vicePresident**: `Boolean!`
  
  
  
  
  

### GroupSearchResult *(object)*


- **group**: [`Group!`](./groups.md#group-object)
  
  
  
  
  
- **highlightedDescription**: `String!`
  
  
  
  
  
- **id**: `ID!`
  
  
  
  
  
- **rank**: `Float`
  
  
  
  
  
- **similarity**: `Float!`
  
  
  
  
  

### GroupType *(enum)*


- `Association`
- `Club`
- `Group`
- `Integration`
- `List`
- `StudentAssociationSection`




### UpsertGroupInput *(input object)*


- **address**: `String!`
  
  
  
  
  
- **color**: `String`
  
  
  
  
  
- **description**: `String!`
  
  
  
  
  
- **email**: `String`
  
  
  
  
  
- **links**: [`[LinkInput!]!`](./links.md#linkinput-input-object)
  
  
  
  
  
- **longDescription**: `String!`
  
  
  
  
  
- **mailingList**: `String`
  
  
  
  
  
- **name**: `String!`
  
  
  
  
  
- **parent**: [`UID`](./global.md#uid-scalar)
  
  
  
  
  
- **related**: `[String!]!`
  
  
  
  
  
- **school**: [`UID`](./global.md#uid-scalar)
  
  
  
  
  
- **selfJoinable**: `Boolean!`
  
  
  
  
  
- **studentAssociation**: [`UID`](./global.md#uid-scalar)
  
  
  
  
  
- **type**: [`GroupType!`](./groups.md#grouptype-enum)
  
  
  
  
  
- **uid**: [`UID`](./global.md#uid-scalar)
  
  Ne sert qu'à la création du groupe. Il est impossible de modifier un uid existant
  
  
  
- **website**: `String!`
  
  
  
  
  

## Queries
### group(uid: `String!`): [`Group!`](./groups.md#group-object)





### groupMembersCsv(groupUid: `String!`): `Result<String>`





### groups(types: [`[GroupType!]`](./groups.md#grouptype-enum)): [`[Group!]!`](./groups.md#group-object)





### searchGroups(q: `String!`, similarityCutoff: `Float`): [`[GroupSearchResult!]!`](./groups.md#groupsearchresult-object)





## Mutations
### addGroupMember(groupUid: `String!`, title: `String!`, uid: `String!`): [`Result<GroupMember>`](./groups.md#groupmember-object)





### deleteGroup(uid: `String!`): `Boolean!`





### deleteGroupMember(groupId: `ID!`, memberId: `ID!`): `Boolean!`





### deleteGroupPicture(dark: `Boolean!`, uid: `String!`): `Boolean!`





### selfJoinGroup(groupUid: `String!`, uid: `String!`): [`GroupMember!`](./groups.md#groupmember-object)





### updateGroupPicture(dark: `Boolean!`, file: [`File!`](./global.md#file-scalar), uid: `String!`): `String!`





### updateRoomOpenState(groupUid: `String!`, openRoom: `Boolean!`): `Boolean!`

Changer si la salle d'un groupe est fermée ou ouvert

*Arguments*

- **groupUid**: `String!`
  
  L'uid du groupe
- **openRoom**: `Boolean!`
  
  Vrai si on veut indiquer que le local est maintenant ouvert 


### upsertGroup(input: [`UpsertGroupInput!`](./groups.md#upsertgroupinput-input-object), uid: [`UID`](./global.md#uid-scalar)): [`Result<Group>`](./groups.md#group-object)





### upsertGroupMember(...): [`GroupMember!`](./groups.md#groupmember-object)



*Arguments*

- **canEditArticles**: `Boolean!`
- **canEditMembers**: `Boolean!`
- **canScanEvents**: `Boolean!`
- **groupId**: `ID!`
- **isDeveloper**: `Boolean!`
- **memberId**: `ID!`
- **president**: `Boolean!`
- **secretary**: `Boolean!`
- **title**: `String!`
- **treasurer**: `Boolean!`
- **vicePresident**: `Boolean!`


## Subscriptions