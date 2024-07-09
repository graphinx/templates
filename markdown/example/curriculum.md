# Curriculum
<html><head></head><body>
<p>Différentes matières enseignées dans les écoles, et leur organisation au sein de celle-ci.</p>
<p>La hiérarchie est la suivante:</p>
<ul>
<li><a href="../schools">École</a>
<ul>
<li>Filière (ou majeure): objet <code>Major</code>
<ul>
<li>Parcours (ou mineure): objet <code>Minor</code>
<ul>
<li>"UE" (Unité d'enseignement): objet <code>TeachingUnit</code>
<ul>
<li>Matière: objet <code>Subject</code></li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
</ul>
<p>Cependant, afin de rendre les différents cas particuliers des écoles représentables, cette représentation se doit d'être la plus flexible possible.</p>
<p>En conséquence, une matière peut être reliée à:</p>
<ul>
<li>une UE</li>
<li>une mineure</li>
<li>une majeure</li>
</ul>
<p>Et de même, une UE peut être reliée à:</p>
<ul>
<li>une mineure</li>
<li>une majeure</li>
</ul>
<p>La hiérarchie complète est donc plutôt la suivante:</p>
<pre><code>School
    Major
        Subject
        TeachingUnit
        Minor
            Subject
            TeachingUnit
                Subject
</code></pre></body></html>

## Types
### Major *(object)*
A school syllabus

- **id**: `ID!`
  
  
  
  
  
- **ldapSchool**: [`School`](./schools.md#school-object)
  
  
  
  
  
- **minors**: [`[Minor!]!`](./curriculum.md#minor-object)
  
  
  
  
  
- **name**: `String!`
  
  
  
  
  
- **schools**: [`[School!]!`](./schools.md#school-object)
  
  
  
  
  
- **shortName**: `String!`
  
  
  
  
  
- **subjects**(forApprentices: `Boolean`, yearTier: `Int`): [`[Subject!]!`](./curriculum.md#subject-object)
  
  
  
  
  
- **uid**: `String!`
  
  
  
  
  

### Minor *(object)*


- **id**: `ID!`
  
  
  
  
  
- **majors**: [`[Major!]!`](./curriculum.md#major-object)
  
  
  
  
  
- **name**: `String!`
  
  
  
  
  
- **shortName**: `String!`
  
  
  
  
  
- **slug**: `String!`
  
  Un nom lisible sans espaces, adaptés pour des URLs.
  
  
  
- **subjects**: [`[Subject!]!`](./curriculum.md#subject-object)
  
  
  
  
  
- **uid**: `String!`
  
  
  
  
  
- **users**: [`[User!]!`](./users.md#user-object)
  
  
  
  
  
- **yearTier**: `Int!`
  
  
  
  
  


### Subject *(object)*


- **apogeeCode**: `String`
  
  
  
  
  
- **documents**(after, before, first, last): `SubjectDocumentsConnection!`
  
  
  
  *Arguments*
  
  - **after**: `String`
  - **before**: `String`
  - **first**: `Int`
  - **last**: `Int`
  
  
- **documentsCount**: `Int!`
  
  
  
  
  
- **emoji**: `String!`
  
  
  
  
  
- **forApprentices**: `Boolean!`
  
  
  
  
  
- **id**: `ID!`
  
  
  
  
  
- **links**: [`[Link!]!`](./links.md#link-object)
  
  
  
  
  
- **majors**: [`[Major!]!`](./curriculum.md#major-object)
  
  
  
  
  
- **minors**: [`[Minor!]!`](./curriculum.md#minor-object)
  
  
  
  
  
- **name**: `String!`
  
  
  
  
  
- **nextExamAt**: `DateTime`
  
  
  
  
  
- **semester**: `Int`
  
  
  
  
  
- **shortName**: `String!`
  
  
  
  
  
- **slug**: `String!`
  
  Un nom lisible sans espaces, adaptés pour des URLs.
  
  
  
- **uid**: `String!`
  
  
  
  
  
- **unit**: [`TeachingUnit`](./curriculum.md#teachingunit-object)
  
  
  
  
  
- **unitId**: `ID`
  
  
  
  
  
- **yearTier**: `Int`
  
  
  
  
  


## Queries
### major(uid: `String!`): [`Major!`](./curriculum.md#major-object)





### majors: [`[Major!]!`](./curriculum.md#major-object)





### minor(id: `ID!`): [`Minor!`](./curriculum.md#minor-object)





### minors(after, before, first, last): [`Connection<Minor>`](./curriculum.md#minor-object)



*Arguments*

- **after**: `String`
- **before**: `String`
- **first**: `Int`
- **last**: `Int`


### subject(forApprentices: `Boolean!`, slug: `String!`, yearTier: `Int!`): [`Subject!`](./curriculum.md#subject-object)





### subjects: [`[Subject!]!`](./curriculum.md#subject-object)





## Mutations
### updateSubjectsExamDates: `Boolean!`





## Subscriptions