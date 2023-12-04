 1.13.6/2019-12-20
===================

  * Add a sorting number field to the branch and synchronize it from the organization when updating the organization #211
  * When creating a new branch, if you select the associated organization, the organization should no longer be automatically created #212
  *Introduce dotenv
  * [Add global function Creator.openApp to assist in single sign-on](https://github.com/steedos/creator/issues/1494)
1.6.4-patch.1/2019-09-16
===================

  * jsreport-core and other jsreport core package versions are fixed to prevent higher versions from reporting the error Cannot find module 'handlebars'
1.5.0-beta.0/2019-08-30

  * Separate the branch table company from organizations #124
1.0.12/2019-09-02
===================

  * [Webhook adds global checkbox option](https://github.com/steedos/workflow/issues/2035)
===================

  * The object extends the action.on value, adds options list_item and record_only, and removes the original action.only_list_item and action.only_detail attributes.
1.0.10/2019-09-02
===================

  * Organize base objects
1.0.9/2019-08-31
===================

  * The process can upload attachments as text templates. [The Approval King needs to implement the function of configuring corresponding text templates for each process] (https://github.com/steedos/workflow/issues/2045)
1.0.4/2019-08-19
===================

  * [Data import function, supports repeated import of the same Excel](https://github.com/steedos/object-server/issues/109)
1.0.0/2019-08-13
===================

  * [Standard business object improvement #114](https://github.com/steedos/object-server/issues/114)
0.2.2/2019-08-12
===================

  * fix bug: add `!!js/function` to the function type field in the yml file
0.2.1/2019-08-02
===================

  * object listViews supports specifying field width and whether to wrap lines
0.1.1/2019-07-23
===================

  *Creator.Objects.reports recognizes that the jsreport plug-in is configured before displaying relevant fields
0.1.2/2019-07-30
===================

  * Organize core objects
0.0.6/2019-07-22
===================

  * Dealing with bug: error reported when modifying a single field in the root department

0.0.5/2019-07-17
===================

  * Add *.object.js file
0.0.3/2019-06-13
===================

  * Add core.objcet.yml, core.objectwebhooks.trigger.js and object_webhooks.object.yml