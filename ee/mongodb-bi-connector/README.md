 ## Steedos
Automatically generate and update the schema required by mongo-bi-connector

### run service
```
yarn start
```

### Function Description
- This service is used to generate the schema data required by mongo bi connector and write it into the mongo database

### Instructions
- Start the service first when using it, automatically read the object definition, and write it to the schems and names tables under MONGO_URL
- Run mongosqld from the command line --schemaSource [schemaDbName] --schemaMode custom
    + mongo bi connector must be installed first
    + schemaDbName must be consistent with the MONGO_URL configuration in the env file
- After the mongo bi connector is started, you can use other sql tools to query mongodb through the connector (default port 3307)

### source
- Environment variables need to be configured: MONGO_URL, TRANSPORTER, which can be configured through the project's env file.