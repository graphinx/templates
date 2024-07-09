# Health Checks
<html><head></head><body>
<p>Différents "health checks" de l'application, des tests permettant de vérifier que l'application fonctionne correctement.
Ils sont utilisés pour monitorer que l'application est en bonne santé, et permet aussi d'exposer un endpoint /health dans l'application web.</p></body></html>

## Types

### HealthCheck *(object)*
Results of a health self-check

- **database**: [`DatabaseHealthCheck!`](./health-checks.md#databasehealthcheck-object)
  
  
  
  
  
- **ldap**: [`LdapHealthCheck!`](./health-checks.md#ldaphealthcheck-object)
  
  
  
  
  
- **mail**: [`MailHealthCheck!`](./health-checks.md#mailhealthcheck-object)
  
  
  
  
  
- **redis**: [`RedisHealthCheck!`](./health-checks.md#redishealthcheck-object)
  
  
  
  
  




## Queries
### healthcheck: [`HealthCheck!`](./health-checks.md#healthcheck-object)

- **Rate limit:** 5/seconde



## Mutations
## Subscriptions