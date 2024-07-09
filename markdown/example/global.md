# Types globaux
<html><head></head><body>
<p>Types utilisés au travers de tout l'API.</p></body></html>

## Types
### BuildInfo *(object)*


- **commit**: `String!`
  
  Le hash du commit utilisé pour build l'API
  
  
  
- **version**: `String!`
  
  La version actuelle de l'API (et de l'application)
  
  
  

### Error *(object)*
The most basic error object, based on the base JavaScript Error object.

- **message**: `String!`
  
  
  
  
  

### ErrorInterface *(interface)*
Basic interface for all error types to implement.

- **message**: `String!`
  
  
  
  
  

### File *(scalar)*

### NotFoundError *(object)*
An error raised when a resource does not exist.

- **message**: `String!`
  
  
  
  
  

### Pictured *(interface)*
Une ressource qui possède une image associée

- **pictureFile**: `String!`
  
  Le nom du fichier de l'image
  
  
  
- **pictureFileDark**: `String!`
  
  Le nom du fichier de l'image, en thème sombre
  
  
  
- **pictureURL**(dark: `Boolean!`): `String!`
  
  L'URL publique de l'image
  
  *Arguments*
  
  - **dark**: `Boolean!`
    
    Utiliser l'image en thème sombre
  
  

### QRCode *(object)*


- **path**: `String!`
  
  
  
  
  
- **viewbox**: `String!`
  
  
  
  
  

### SortDirection *(enum)*


- `Ascending`
- `Descending`

### StringToIntMapping *(object)*
Associe une clé à une valeur de type nombre entier

- **key**: `String!`
  
  Clé de la paire
  
  
  
- **value**: `Int!`
  
  Valeur de la paire
  
  
  


### Visibility *(enum)*


- `GroupRestricted`
- `Private`
- `Public`
- `SchoolRestricted`
- `Unlisted`

### ZodError *(object)*
A validation error, as a list of field errors.

- **fieldErrors**: [`[ZodFieldError!]!`](./global.md#zodfielderror-object)
  
  
  
  
  
- **message**: `String!`
  
  
  
  
  


## Queries
### buildInfo: [`BuildInfo!`](./global.md#buildinfo-object)

Retourne des informations sur le build actuel de l'API



### renderMarkdown(markdown: `String!`): `String!`

Rendu de markdown en HTML. Demande a être authentifié·e pour éviter tout abus.

*Arguments*

- **markdown**: `String!`
  
  Le markdown à rendre en HTML


### uidIsAvailable(uid: [`UID!`](./global.md#uid-scalar)): `Boolean!`

Vérifie si un identifiant (un “@” dans l'interface) est disponible



## Mutations
## Subscriptions