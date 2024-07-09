# Gitlab
<html><head></head><body>
<p>Rapports utilisateurs et crédits.</p>
<p>Churros est interconnecté avec son dépôt pour tout ce qui concerne:</p>
<ul>
<li>la gestion de rapports utilisateurs (signalement de bugs et propositions de fonctionnalités).</li>
<li>l'affichage de crédits et le badge "développeur·euse" sur les profils (développeur·euse·s ayant fait des commits)</li>
</ul></body></html>

## Types
### Issue *(object)*
A Gitlab issue

- **body**: `String!`
  
  
  
  
  
- **bodyHtml**: `String!`
  
  
  
  
  
- **comments**: [`[IssueComment!]!`](./gitlab.md#issuecomment-object)
  
  
  
  
  
- **deployedIn**: `String!`
  
  
  
  
  
- **difficulty**: `Float`
  
  Expressed from 0 to 1
  
  
  
- **duplicatedFrom**: `Int`
  
  
  
  
  
- **importance**: `Float`
  
  Expressed from 0 to 1
  
  
  
- **number**: `Int!`
  
  
  
  
  
- **state**: [`IssueState!`](./gitlab.md#issuestate-enum)
  
  
  
  
  
- **submittedAt**: `DateTime!`
  
  The date at which the issue was submitted
  
  
  
- **title**: `String!`
  
  
  
  
  
- **url**: `String!`
  
  
  
  
  




## Queries
### codeContributors: [`Result<User>`](./users.md#user-object)





### issue(number: `Int!`): [`Issue!`](./gitlab.md#issue-object)





### issuesByUser: [`[Issue!]!`](./gitlab.md#issue-object)





## Mutations
### createGitlabIssue(description: `String!`, isBug: `Boolean!`, title: `String!`): `Int!`





## Subscriptions