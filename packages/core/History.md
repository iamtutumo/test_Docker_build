 1.5.0-beta.0/2019-08-30
===================

  * Separate the ownership table company from organizations #124
1.3.19/2019-08-20
===================

  * base object migrated to standard-objects
1.3.19/2019-08-20
===================

  * [Cancel the datasource_name part of the url of graphql api](https://github.com/steedos/object-server/issues/125)
1.3.18/2019-08-20
===================

  * Optimize core.init function
1.3.17/2019-08-20
===================

  * Support debugging plug-ins in the .plugins folder in the meteor project
1.3.16/2019-08-19
===================

  * Adjust the plug-in debugging folder plugins -> .plugins; unify some data formats of stemos-config.yml and plugin-config.yml datasources
1.3.14/2019-08-17
===================

  * Support object inheritance
1.3.10/2019-08-14
===================

  * Upgrade @steedos/objectql, fix npm install version conflict
1.3.9/2019-08-14
===================

  * Support loading objects in plugins
1.3.2/2019-08-10
===================

  * Add initRoutes function to core.ts
1.3.1/2019-08-02
===================

  * Provide publish interface
1.2.1/2019-07-23
===================

  * Load .client.js into web client
1.1.27/2019-07-16
===================

  * fix bug: prevent datasources from being undefined in steedos-config.yml, causing the core.init function to report an error
1.1.26/2019-07-16
===================

  * Added init function to simplify startup file code
1.1.25/2019-07-16
===================

  * Use @steedos/auth:1.0.7
1.1.22/2019-07-15
===================

  * Open interface `/api-v2/jwt/sso` single sign-on, `/api-v2/jwt/getToken` obtains `{userId:'xx', authToken: 'xx'}`
1.1.21/2019-07-12
===================

  * OData interface speed optimization, EXCEL access is too slow

1.1.20/2019-06-17
===================

  * After the odata interface obtains $set and $unset, it merges set and unset into a doc and hands it to the driver. In the merged doc, some field values ​​in the unset field are null.
  * Fix OData interface problem. When EXCEL is connected, the expand field cannot come out.

1.1.19/2019-06-13
===================

  * LoadStandardObjects loading method optimization and loading object_webhooks.object.yml

1.1.18/2019-06-04
===================

  * The list interface does not return data that has been falsely deleted (is_deleted:true)

1.1.17/2019-06-04
===================

  * Do not use $set in the data parameter format of update in meteormongodriver to be consistent with mongodriver #82