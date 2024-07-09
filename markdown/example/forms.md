# Formulaires
<html><head></head><body>
<p>Churros propose un système de formulaires, à l'instar de Google Forms. Sert principalement à poser des questions supplémentaires lors d'une réservation d'un évènement, où à effectuer des sondages.</p></body></html>

## Types
### Answer *(interface)*
Une réponse à un formulaire. Les réponses peuvent être de plusieurs types différents (en fonction de la question).

- **answerString**: `String!`
  
  
  
  
  
- **booking**: [`Registration`](./ticketing.md#registration-object)
  
  Réservation associée à la réponse
  
  
  
- **checkboxIsMarked**: `Boolean`
  
  
  
  
  
- **createdAt**: `DateTime!`
  
  Date de création de la réponse
  
  
  
- **createdBy**: [`User`](./users.md#user-object)
  
  Utilisateur ayant répondu à la question
  
  
  
- **form**: [`Form!`](./forms.md#form-object)
  
  Formulaire auquel appartient la question
  
  
  
- **id**: `ID!`
  
  Préfixe de l'identifiant: `answer:`
  
  
  
- **question**: [`Question!`](./forms.md#question-interface)
  
  
  
  
  
- **section**: [`FormSection!`](./forms.md#formsection-object)
  
  Section du formulaire auquel appartient la question
  
  
  
- **updatedAt**: `DateTime!`
  
  Date de dernière mise à jour de la réponse
  
  
  

### AnswerDate *(object)*
Réponse de type `Date` (voir [`QuestionKind`](#QuestionKind))

- **answerString**: `String!`
  
  
  
  
  
- **booking**: [`Registration`](./ticketing.md#registration-object)
  
  Réservation associée à la réponse
  
  
  
- **checkboxIsMarked**: `Boolean`
  
  
  
  
  
- **createdAt**: `DateTime!`
  
  Date de création de la réponse
  
  
  
- **createdBy**: [`User`](./users.md#user-object)
  
  Utilisateur ayant répondu à la question
  
  
  
- **form**: [`Form!`](./forms.md#form-object)
  
  Formulaire auquel appartient la question
  
  
  
- **id**: `ID!`
  
  Préfixe de l'identifiant: `answer:`
  
  
  
- **question**: [`QuestionScalar!`](./forms.md#questionscalar-object)
  
  Question à laquelle la réponse est associée
  
  
  
- **rawValue**: `String`
  
  Réponse donnée, brute (sous forme de texte)
  
  
  
- **section**: [`FormSection!`](./forms.md#formsection-object)
  
  Section du formulaire auquel appartient la question
  
  
  
- **updatedAt**: `DateTime!`
  
  Date de dernière mise à jour de la réponse
  
  
  
- **value**: `DateTime`
  
  Réponse donnée
  
  
  

### AnswerFileUpload *(object)*
Réponse de type `FileUpload` (voir [`QuestionKind`](#QuestionKind))

- **answerString**: `String!`
  
  
  
  
  
- **booking**: [`Registration`](./ticketing.md#registration-object)
  
  Réservation associée à la réponse
  
  
  
- **checkboxIsMarked**: `Boolean`
  
  
  
  
  
- **createdAt**: `DateTime!`
  
  Date de création de la réponse
  
  
  
- **createdBy**: [`User`](./users.md#user-object)
  
  Utilisateur ayant répondu à la question
  
  
  
- **form**: [`Form!`](./forms.md#form-object)
  
  Formulaire auquel appartient la question
  
  
  
- **id**: `ID!`
  
  Préfixe de l'identifiant: `answer:`
  
  
  
- **question**: [`QuestionFileUpload!`](./forms.md#questionfileupload-object)
  
  Question à laquelle la réponse est associée
  
  
  
- **section**: [`FormSection!`](./forms.md#formsection-object)
  
  Section du formulaire auquel appartient la question
  
  
  
- **updatedAt**: `DateTime!`
  
  Date de dernière mise à jour de la réponse
  
  
  
- **value**: `String`
  
  Réponse donnée
  
  
  

### AnswerInput *(input object)*


- **answer**: `[String!]!`
  
  Réponse à la question. Pour les questions à une seule réponse, ne mettre qu'un seul élément.
      
  - Pour les questions de type `Date`, utiliser le format `YYYY-mm-dd`
  - Pour les questions de type `Time`, utiliser le format `HH:MM:ss`
  - Pour les questions de type `Scale`, utiliser simplement le nombre répondu par l'utilisateur·ice
  - Pour les questions de type `FileUpload`, utiliser la mutation [`answerFileQuestion`](#mutation/answerFileQuestion)
  
  
  
- **question**: `ID!`
  
  ID de la question à laquelle répondre
  
  
  

### AnswerLongText *(object)*
Réponse de type `LongText` (voir [`QuestionKind`](#QuestionKind))

- **answerString**: `String!`
  
  
  
  
  
- **booking**: [`Registration`](./ticketing.md#registration-object)
  
  Réservation associée à la réponse
  
  
  
- **checkboxIsMarked**: `Boolean`
  
  
  
  
  
- **createdAt**: `DateTime!`
  
  Date de création de la réponse
  
  
  
- **createdBy**: [`User`](./users.md#user-object)
  
  Utilisateur ayant répondu à la question
  
  
  
- **form**: [`Form!`](./forms.md#form-object)
  
  Formulaire auquel appartient la question
  
  
  
- **id**: `ID!`
  
  Préfixe de l'identifiant: `answer:`
  
  
  
- **question**: [`QuestionScalar!`](./forms.md#questionscalar-object)
  
  Question à laquelle la réponse est associée
  
  
  
- **section**: [`FormSection!`](./forms.md#formsection-object)
  
  Section du formulaire auquel appartient la question
  
  
  
- **updatedAt**: `DateTime!`
  
  Date de dernière mise à jour de la réponse
  
  
  
- **value**: `String`
  
  Réponse donnée
  
  
  

### AnswerNumber *(object)*
Réponse de type `Number` (voir [`QuestionKind`](#QuestionKind))

- **answerString**: `String!`
  
  
  
  
  
- **booking**: [`Registration`](./ticketing.md#registration-object)
  
  Réservation associée à la réponse
  
  
  
- **checkboxIsMarked**: `Boolean`
  
  
  
  
  
- **createdAt**: `DateTime!`
  
  Date de création de la réponse
  
  
  
- **createdBy**: [`User`](./users.md#user-object)
  
  Utilisateur ayant répondu à la question
  
  
  
- **form**: [`Form!`](./forms.md#form-object)
  
  Formulaire auquel appartient la question
  
  
  
- **id**: `ID!`
  
  Préfixe de l'identifiant: `answer:`
  
  
  
- **question**: [`QuestionScalar!`](./forms.md#questionscalar-object)
  
  Question à laquelle la réponse est associée
  
  
  
- **section**: [`FormSection!`](./forms.md#formsection-object)
  
  Section du formulaire auquel appartient la question
  
  
  
- **updatedAt**: `DateTime!`
  
  Date de dernière mise à jour de la réponse
  
  
  
- **value**: `Float`
  
  Réponse donnée
  
  
  

### AnswerScale *(object)*
Réponse de type `Scale` (voir [`QuestionKind`](#QuestionKind))

- **answerString**: `String!`
  
  
  
  
  
- **booking**: [`Registration`](./ticketing.md#registration-object)
  
  Réservation associée à la réponse
  
  
  
- **checkboxIsMarked**: `Boolean`
  
  
  
  
  
- **createdAt**: `DateTime!`
  
  Date de création de la réponse
  
  
  
- **createdBy**: [`User`](./users.md#user-object)
  
  Utilisateur ayant répondu à la question
  
  
  
- **form**: [`Form!`](./forms.md#form-object)
  
  Formulaire auquel appartient la question
  
  
  
- **id**: `ID!`
  
  Préfixe de l'identifiant: `answer:`
  
  
  
- **normalizedValue**: `Float`
  
  Réponse donnée, entre 0 et 1
  
  
  
- **question**: [`QuestionScale!`](./forms.md#questionscale-object)
  
  Question à laquelle la réponse est associée
  
  
  
- **section**: [`FormSection!`](./forms.md#formsection-object)
  
  Section du formulaire auquel appartient la question
  
  
  
- **updatedAt**: `DateTime!`
  
  Date de dernière mise à jour de la réponse
  
  
  
- **value**: `Int`
  
  Réponse donnée
  
  
  


### AnswerSelectMultiple *(object)*
Réponse de type `SelectMultiple` (voir [`QuestionKind`](#QuestionKind))

- **answerString**: `String!`
  
  
  
  
  
- **booking**: [`Registration`](./ticketing.md#registration-object)
  
  Réservation associée à la réponse
  
  
  
- **checkboxIsMarked**: `Boolean`
  
  
  
  
  
- **createdAt**: `DateTime!`
  
  Date de création de la réponse
  
  
  
- **createdBy**: [`User`](./users.md#user-object)
  
  Utilisateur ayant répondu à la question
  
  
  
- **form**: [`Form!`](./forms.md#form-object)
  
  Formulaire auquel appartient la question
  
  
  
- **id**: `ID!`
  
  Préfixe de l'identifiant: `answer:`
  
  
  
- **question**: [`QuestionSelectMultiple!`](./forms.md#questionselectmultiple-object)
  
  Question à laquelle la réponse est associée
  
  
  
- **section**: [`FormSection!`](./forms.md#formsection-object)
  
  Section du formulaire auquel appartient la question
  
  
  
- **updatedAt**: `DateTime!`
  
  Date de dernière mise à jour de la réponse
  
  
  
- **value**: `[String!]`
  
  Réponse donnée
  
  
  

### AnswerSelectOne *(object)*
Réponse de type `SelectOne` (voir [`QuestionKind`](#QuestionKind))

- **answerString**: `String!`
  
  
  
  
  
- **booking**: [`Registration`](./ticketing.md#registration-object)
  
  Réservation associée à la réponse
  
  
  
- **checkboxIsMarked**: `Boolean`
  
  
  
  
  
- **createdAt**: `DateTime!`
  
  Date de création de la réponse
  
  
  
- **createdBy**: [`User`](./users.md#user-object)
  
  Utilisateur ayant répondu à la question
  
  
  
- **form**: [`Form!`](./forms.md#form-object)
  
  Formulaire auquel appartient la question
  
  
  
- **id**: `ID!`
  
  Préfixe de l'identifiant: `answer:`
  
  
  
- **question**: [`QuestionSelectOne!`](./forms.md#questionselectone-object)
  
  Question à laquelle la réponse est associée
  
  
  
- **section**: [`FormSection!`](./forms.md#formsection-object)
  
  Section du formulaire auquel appartient la question
  
  
  
- **updatedAt**: `DateTime!`
  
  Date de dernière mise à jour de la réponse
  
  
  
- **value**: `String`
  
  Réponse donnée
  
  
  

### AnswerText *(object)*
Réponse de type `Text` (voir [`QuestionKind`](#QuestionKind))

- **answerString**: `String!`
  
  
  
  
  
- **booking**: [`Registration`](./ticketing.md#registration-object)
  
  Réservation associée à la réponse
  
  
  
- **checkboxIsMarked**: `Boolean`
  
  
  
  
  
- **createdAt**: `DateTime!`
  
  Date de création de la réponse
  
  
  
- **createdBy**: [`User`](./users.md#user-object)
  
  Utilisateur ayant répondu à la question
  
  
  
- **form**: [`Form!`](./forms.md#form-object)
  
  Formulaire auquel appartient la question
  
  
  
- **id**: `ID!`
  
  Préfixe de l'identifiant: `answer:`
  
  
  
- **question**: [`QuestionScalar!`](./forms.md#questionscalar-object)
  
  Question à laquelle la réponse est associée
  
  
  
- **section**: [`FormSection!`](./forms.md#formsection-object)
  
  Section du formulaire auquel appartient la question
  
  
  
- **updatedAt**: `DateTime!`
  
  Date de dernière mise à jour de la réponse
  
  
  
- **value**: `String`
  
  Réponse donnée
  
  
  

### AnswerTime *(object)*
Réponse de type `Time` (voir [`QuestionKind`](#QuestionKind))

- **answer**: [`Answer!`](./forms.md#answer-interface)
  
  
  
  
  
- **answerString**: `String!`
  
  
  
  
  
- **booking**: [`Registration`](./ticketing.md#registration-object)
  
  Réservation associée à la réponse
  
  
  
- **checkboxIsMarked**: `Boolean`
  
  
  
  
  
- **createdAt**: `DateTime!`
  
  Date de création de la réponse
  
  
  
- **createdBy**: [`User`](./users.md#user-object)
  
  Utilisateur ayant répondu à la question
  
  
  
- **form**: [`Form!`](./forms.md#form-object)
  
  Formulaire auquel appartient la question
  
  
  
- **id**: `ID!`
  
  Préfixe de l'identifiant: `answer:`
  
  
  
- **question**: [`QuestionScalar!`](./forms.md#questionscalar-object)
  
  Question à laquelle la réponse est associée
  
  
  
- **rawValue**: `String`
  
  Réponse donnée, brute (sous forme de texte)
  
  
  
- **section**: [`FormSection!`](./forms.md#formsection-object)
  
  Section du formulaire auquel appartient la question
  
  
  
- **updatedAt**: `DateTime!`
  
  Date de dernière mise à jour de la réponse
  
  
  
- **value**: `DateTime`
  
  Réponse donnée
  
  
  

### AnswersExportFormats *(enum)*
Formats d'export des réponses

- `CSV`
  Format CSV (séparateur de colonnes: virgule, séparateur de lignes: saut de ligne)
  
- `TSV`
  Format TSV (séparateur de colonnes: tabulation, séparateur de lignes: saut de ligne)
  

### AnswersOfUser *(object)*
Représente toutes les réponses d'un·e utilisateur·ice à un formulaire. Pratique pour grouper les réponses afin de les afficher dans un tableau

- **answers**: [`[Answer!]!`](./forms.md#answer-interface)
  
  
  
  
  
- **date**: `DateTime!`
  
  Correspond à la date de dernière réponse parmis les réponses
  
  
  
- **user**: [`User!`](./users.md#user-object)
  
  
  
  
  

### Form *(object)*
Un formulaire

- **answerCount**: `Int!`
  
  Nombre de réponses au formulaire
  
  
  
- **answers**(after, before, first, last): `FormAnswersConnection!`
  
  Réponses au formulaire
  
  *Arguments*
  
  - **after**: `String`
  - **before**: `String`
  - **first**: `Int`
  - **last**: `Int`
  
  
- **answersByUser**(after, before, first, last, q): `FormAnswersByUserConnection!`
  
  Réponses au formulaire, groupées par utilisateur·ice. Ne contient pas de réponses dont l'utilisateur·ice est inconnu·e.
  
  *Arguments*
  
  - **after**: `String`
  - **before**: `String`
  - **first**: `Int`
  - **last**: `Int`
  - **q**: `String`
    
    Recherche par utilisateur·ice
  
  
- **answersExport**(format: [`AnswersExportFormats!`](./forms.md#answersexportformats-enum)): `String!`
  
  Export des réponses au formulaires dans un format
  
  *Arguments*
  
  - **format**: [`AnswersExportFormats!`](./forms.md#answersexportformats-enum)
    
    Format à utiliser
  
  
- **canAnswer**: `Boolean!`
  
  Indique si l'utilisateur peut répondre au formulaire.
  
  
  
- **canEdit**: `Boolean!`
  
  Indique si l'utilisateur peut éditer le formulaire.
  
  
  
- **canModifyAnswers**: `Boolean!`
  
  Indique si l'utilisateur·ice peut modifier ses réponses au formulaire.
  
  
  
- **canSeeAnswerStats**: `Boolean!`
  
  Indique si l'utilisateur peut voir les statistiques des réponses au formulaire.
  
  
  
- **canSeeAnswers**: `Boolean!`
  
  Indique si l'utilisateur peut voir les réponses au formulaire.
  
  
  
- **canSetCheckboxes**: `Boolean!`
  
  Indique si l'utilisateur peut cocher ou décocher les cases à cocher à côté des réponses au formulaire.
  
  
  
- **checkboxesAreEnabled**: `Boolean!`
  
  
  
  
  
- **closesAt**: `DateTime`
  
  Date de fermeture du formulaire.
  
  
  
- **createdAt**: `DateTime!`
  
  Date de création du formulaire
  
  
  
- **createdBy**: [`User`](./users.md#user-object)
  
  Utilisateur ayant créé le formulaire
  
  
  
- **description**: `String`
  
  Description en Markdown du formulaire.
  
  
  
- **descriptionHtml**: `String!`
  
  Description en HTML du formulaire.
  
  
  
- **event**: [`Event`](./events.md#event-object)
  
  Événement associé au formulaire
  
  
  
- **group**: [`Group`](./groups.md#group-object)
  
  Groupe auquel le formulaire est associé
  
  
  
- **hasSections**: `Boolean!`
  
  Vrai si le formulaire comporte des sections
  
  
  
- **id**: `ID!`
  
  Préfixe de l'identifiant: `form:`
  
  
  
- **linkedGoogleSheetUrl**: `String`
  
  L'URL du Google Sheet des réponses lié à ce formulaire. Voir `createLinkedGoogleSheet` pour créer un Google Sheet lié au formulaire.
  
  
  
- **localId**: `String!`
  
  Identifiant local du formulaire
  
  
  
- **myAnswers**: [`[Answer!]!`](./forms.md#answer-interface)
  
  Réponses de l'utilisateur·ice connecté·e à ce formulaire
  
  
  
- **opensAt**: `DateTime`
  
  Date d'ouverture du formulaire.
  
  
  
- **questions**(after, before, first, last): `FormQuestionsConnection!`
  
  Questions du formulaire. Liste de toutes les questions, peut importe la section dans laquelle elles se trouvent.
  
  *Arguments*
  
  - **after**: `String`
  - **before**: `String`
  - **first**: `Int`
  - **last**: `Int`
  
  
- **searchAnswers**(q: `String!`, similarityCutoff: `Float`): [`[AnswerSearchResult!]!`](./forms.md#answersearchresult-object)
  
  
  
  *Arguments*
  
  - **q**: `String!`
    
    La recherche
  - **similarityCutoff**: `Float`
  
  
- **section**(id: `String`): [`FormSection!`](./forms.md#formsection-object)
  
  Une section du formulaire.
  
  *Arguments*
  
  - **id**: `String`
    
    Identifiant (local ou global) de la section
  
  
- **sections**: [`[FormSection!]!`](./forms.md#formsection-object)
  
  Sections du formulaire. Un formulaire contient toujours au moins une section (sauf s'il n'y a aucune question). Uniquement accessible par celleux qui peuvent modifier le formulaire. Utiliser `nextSection` pour afficher une section dans le but d'y répondre.
  
  
  
- **title**: `String!`
  
  
  
  
  
- **updatedAt**: `DateTime!`
  
  Date de dernière mise à jour du formulaire
  
  
  
- **visibility**: [`Visibility!`](./global.md#visibility-enum)
  
  Visibilité du formulaire
  
  
  

### FormSearchResult *(object)*


- **form**: [`Form!`](./forms.md#form-object)
  
  
  
  
  
- **highlightedDescription**: `String!`
  
  
  
  
  
- **id**: `ID!`
  
  
  
  
  
- **rank**: `Float`
  
  
  
  
  
- **similarity**: `Float!`
  
  
  
  
  

### FormSection *(object)*
Une section d'un formulaire. Les sections sont utiles pour séparer les questions en plusieurs parties, dont certaines peuvent être affichées selon des réponses à des questions précédentes

- **answers**(after, before, first, last): `FormSectionAnswersConnection!`
  
  Réponses à cette section
  
  *Arguments*
  
  - **after**: `String`
  - **before**: `String`
  - **first**: `Int`
  - **last**: `Int`
  
  
- **description**: `String!`
  
  Description en Markdown de la section
  
  
  
- **descriptionHtml**: `String!`
  
  Description en HTML de la section
  
  
  
- **form**: [`Form!`](./forms.md#form-object)
  
  Formulaire auquel appartient la section
  
  
  
- **id**: `ID!`
  
  
  
  
  
- **localId**: `String!`
  
  Identifiant local de la section du formulaire
  
  
  
- **nextSection**: [`FormSection`](./forms.md#formsection-object)
  
  Section suivante dans le formulaire, si il y en a une. (Sinon, c'est que c'est la dernière section). Dépend du fait que des sections soit cachées à l'utilisateur (voir `restrictedToGroups`), ou que une répond à une question provoque le passaage à une autre section (voir `goToSection`) 
  
  
  
- **order**: `Int!`
  
  Ordre de la section dans le formulaire
  
  
  
- **questions**: [`[Question!]!`](./forms.md#question-interface)
  
  Questions dans section
  
  
  
- **restrictedToGroups**: [`[Group!]!`](./groups.md#group-object)
  
  Si non vide, seul·e·s les membres des groupes spécifiés peuvent accéder à cette section. 
  
  
  
- **title**: `String!`
  
  Titre de la section
  
  
  





### Question *(interface)*
Une question dans un formulaire

- **anonymous**: `Boolean!`
  
  Indique si la réponse à la question est anonyme. Si oui, les personnes pouvant voir les réponses ne pouront jamais savoir la réponse d'une personne à la question
  
  
  
- **answers**(after, before, by, first, last): `QuestionAnswersConnection!`
  
  
  
  *Arguments*
  
  - **after**: `String`
  - **before**: `String`
  - **by**: `String`
    
    Récupérer uniquement les réponses d'un utilisateur, par son uid.
  - **first**: `Int`
  - **last**: `Int`
  
  
- **defaultAnswer**: [`Answer`](./forms.md#answer-interface)
  
  La réponse par défaut à cette question. Même si le résultat est bien de type Answer, le champ `id` est vide
  
  
  
- **description**: `String!`
  
  Description en Markdown de la question
  
  
  
- **descriptionHtml**: `String!`
  
  Description en HTML de la question
  
  
  
- **id**: `ID!`
  
  Préfixe d'identifiant: question:
  
  
  
- **mandatory**: `Boolean!`
  
  Indique si la question est obligatoire
  
  
  
- **myAnswer**: [`Answer`](./forms.md#answer-interface)
  
  La réponse de l'utilisateur·ice connecté·e à cette question
  
  
  
- **order**: `Int!`
  
  Ordre de la question dans la section
  
  
  
- **section**: [`FormSection!`](./forms.md#formsection-object)
  
  Section du formulaire dans laquelle est la question
  
  
  
- **title**: `String!`
  
  Titre de la question
  
  
  
- **totalAnswers**: `Int!`
  
  Nombre total de réponses à cette question
  
  
  
- **type**: [`QuestionKind!`](./forms.md#questionkind-enum)
  
  Type de la question
  
  
  


### QuestionKind *(enum)*
Le type de question

- `Date`
  La réponse est une date, sans heure associée.
  
- `FileUpload`
  La réponse est un fichier mis en ligne par l'utilisateur·ice.
  
- `LongText`
  La réponse est un texte long.
  
- `Number`
  La réponse est un nombre, potentiellement à virgule.
  
- `Scale`
  La réponse est un nombre entier entre deux bornes
  
- `SelectMultiple`
  La réponse est une ou plusieurs options parmi une liste.
  
- `SelectOne`
  La réponse est une des options parmi une liste.
  
- `Text`
  La réponse est un texte court.
  
- `Time`
  La réponse est un temps  (heures, minute et seconde), sans date associée.
  

### QuestionScalar *(object)*
Question de type `Text`, `Number`, `Date`, `Time` ou `LongText`

- **anonymous**: `Boolean!`
  
  Indique si la réponse à la question est anonyme. Si oui, les personnes pouvant voir les réponses ne pouront jamais savoir la réponse d'une personne à la question
  
  
  
- **answers**(after, before, by, first, last): `QuestionAnswersConnection!`
  
  
  
  *Arguments*
  
  - **after**: `String`
  - **before**: `String`
  - **by**: `String`
    
    Récupérer uniquement les réponses d'un utilisateur, par son uid.
  - **first**: `Int`
  - **last**: `Int`
  
  
- **defaultAnswer**: [`Answer`](./forms.md#answer-interface)
  
  La réponse par défaut à cette question. Même si le résultat est bien de type Answer, le champ `id` est vide
  
  
  
- **description**: `String!`
  
  Description en Markdown de la question
  
  
  
- **descriptionHtml**: `String!`
  
  Description en HTML de la question
  
  
  
- **id**: `ID!`
  
  Préfixe d'identifiant: question:
  
  
  
- **mandatory**: `Boolean!`
  
  Indique si la question est obligatoire
  
  
  
- **myAnswer**: [`Answer`](./forms.md#answer-interface)
  
  La réponse de l'utilisateur·ice connecté·e à cette question
  
  
  
- **order**: `Int!`
  
  Ordre de la question dans la section
  
  
  
- **section**: [`FormSection!`](./forms.md#formsection-object)
  
  Section du formulaire dans laquelle est la question
  
  
  
- **title**: `String!`
  
  Titre de la question
  
  
  
- **totalAnswers**: `Int!`
  
  Nombre total de réponses à cette question
  
  
  
- **type**: [`QuestionKind!`](./forms.md#questionkind-enum)
  
  Type de la question
  
  
  





## Queries
### allForms(after, before, first, last): [`Connection<Form>`](./forms.md#form-object)

Récupère tous les formulaires. Réservé aux admins.

*Arguments*

- **after**: `String`
- **before**: `String`
- **first**: `Int`
- **last**: `Int`


### form(localId: `String!`): [`Form`](./forms.md#form-object)

Récupère un formulaire. On peut utiliser une subscription pour avoir la mise à jour en temps réel des réponses au formulaire.

*Arguments*

- **localId**: `String!`
  
  Identifiant local (sans le préfixe `form:`) du formulaire


### forms(after, before, first, last): [`Connection<Form>`](./forms.md#form-object)

Récupère les formulaires visibles par l'utilisateur·ice connecté·e.

*Arguments*

- **after**: `String`
- **before**: `String`
- **first**: `Int`
- **last**: `Int`


### searchForms(q: `String!`, similarityCutoff: `Float`): [`[FormSearchResult!]!`](./forms.md#formsearchresult-object)

Recherche des formulaires

*Arguments*

- **q**: `String!`
  
  La recherche
- **similarityCutoff**: `Float`


## Mutations
### answerFileQuestion(answer: [`File!`](./global.md#file-scalar), question: `ID!`): [`AnswerFileUpload!`](./forms.md#answerfileupload-object)

Répondre à une question de type `FileUpload` en uploadant un fichier

*Arguments*

- **answer**: [`File!`](./global.md#file-scalar)
  
  Fichier à uploader
- **question**: `ID!`
  
  ID de la question à laquelle répondre


### answerFormSection(answers: [`[AnswerInput!]!`](./forms.md#answerinput-input-object), section: `ID!`): [`Result<Answer>`](./forms.md#answer-interface)



*Arguments*

- **answers**: [`[AnswerInput!]!`](./forms.md#answerinput-input-object)
- **section**: `ID!`
  
  ID de la section du formulaire


### createLinkedGoogleSheet(form: `ID!`): `String!`

Crée une feuille Google Sheets (si elle n'existe pas déjà) qui contiendra les réponses au formulaire (et sera mise à jour automatiquement). Renvoie l'URL de la feuille Google Sheets.

*Arguments*

- **form**: `ID!`
  
  L'identifiant du formulaire


### mailFormAnswers(formId: `ID!`): `Result<String>`

Envoie une copie des réponses de l'utilisateur·ice connecté·e à ce formulaire par email. Renvoie l'adresse mail à laquelle les réponses ont été envoyées.

*Arguments*

- **formId**: `ID!`
  
  ID du formulaire


### setFormAnswersCheckbox(checked: `Boolean!`, form: `String!`, userId: `ID!`): [`Form!`](./forms.md#form-object)

Coche ou décoche la case à cocher à côté des réponses à un formulaire pour un·e utilisateur·ice.

*Arguments*

- **checked**: `Boolean!`
  
  Vrai pour cocher la case, faux pour la décocher
- **form**: `String!`
  
  L'ID du formulaire
- **userId**: `ID!`
  
  ID de l'utilisateur·ice


### upsertForm(input: `MutationUpsertFormInput!`): [`Form!`](./forms.md#form-object)

Crée ou met à jour un formulaire. À la création, une section de formulaire vide sans titre est automatiquement créée. C'est pratique pour les formulaires sans section.



### upsertFormSection(input: `MutationUpsertFormSectionInput!`): [`FormSection!`](./forms.md#formsection-object)

Crée ou met à jour une section de formulaire.



### upsertQuestion(input: `MutationUpsertQuestionInput!`): [`Question!`](./forms.md#question-interface)

Crée ou met à jour une question.



## Subscriptions
### form(localId: `String!`): [`Form`](./forms.md#form-object)

Récupère un formulaire. On peut utiliser une subscription pour avoir la mise à jour en temps réel des réponses au formulaire.

*Arguments*

- **localId**: `String!`
  
  Identifiant local (sans le préfixe `form:`) du formulaire

