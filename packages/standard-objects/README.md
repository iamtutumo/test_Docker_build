 #Huayan Rubik's Cube built-in metadata

## Base object

The [base](/packages/standard-objects/base.object.yml) object is the base object of all objects, which means that all objects in Huayan Rubik's Cube inherit from this object.

This object is configured with some basic fields, such as creator, creation time, owner, branch, etc. The properties of these fields can be rewritten or extended in objects inherited from this object.

This object is configured with some basic operation buttons, such as create, edit, delete, etc. You can rewrite the properties of these buttons or add new buttons in objects inherited from this object.

This object is configured with the object permissions of ordinary users and administrator profiles. For example, ordinary users can only modify and delete their own records, while administrators can modify and delete all records.

## Built-in standard objects

### Organization and Personnel

- Users [users](/packages/standard-objects/users.object.yml): used to save registered users and basic parameters of users in the system.

- Workspace [spaces](/packages/standard-objects/spaces.object.yml): Steedos SAAS version can divide users into different workspaces (enterprises), and each workspace can be configured with independent organizational structure and permission control. . Every piece of business data entered by business personnel will automatically add the space attribute to mark the workspace to which it belongs.

- Employees [space_users](/packages/standard-objects/space_users.object.yml): used to mark which workspace the user belongs to and the parameter settings in the corresponding workspace. Each user can belong to multiple workspaces.

- Organizations [organizations](/packages/standard-objects/organizations.object.yml): used to define the company's organizational structure in the workspace. Each employee can belong to multiple organizations.

- Division [company](/packages/standard-objects/company.object.yml): Division can be understood as a group branch. Each employee can belong to multiple divisions. It is generally used to implement division-level permissions.

### Function

- Reports [reports](/packages/standard-objects/reports.object.yml): Business personnel can customize reports to analyze business data, please refer to the document [Analyze your data](https://www.steedos.cn /docs/admin/record_report#%E6%8A%A5%E8%A1%A8).

- Tasks [tasks](/packages/standard-objects/tasks.object.yml): used for daily task management, and can also be used to manage object-related tasks. When the object is checked "[Allow adding tasks]( https://www.steedos.cn/docs/admin/create_object#About object function switch)" After the switch, business personnel can see the task sub-table related to the record in the object record detailed interface. After a task is created, its assignee can receive push notifications.

 - Schedule [events](/packages/standard-objects/events.object.yml): used for daily schedule management, and can also be used to manage object-related schedules. When the object is checked "[Allow adding events]" (https ://www.steedos.cn/docs/admin/create_object#About the object function switch)" After the switch, business personnel can see the schedule sub-table related to the record in the object record detailed interface. After a schedule is created, its assignees can receive push notifications.

- Memos [notes](/packages/standard-objects/notes.object.yml): used for daily memo management, and can also be used to manage object-related memos. When the object is checked "[Allow adding notes] ](https://www.steedos.cn/docs/admin/create_object#About object function switch)" After switching, business personnel can see the memo subtable related to the record in the object record detailed interface.

- Announcements [announcements](/packages/standard-objects/announcements.object.yml): used to publish announcements. You can choose which people to publish to, and relevant personnel can receive announcement notifications.

- Notifications [notifications](/packages/standard-objects/notifications.object.yml): Used to send notifications to specified personnel. As long as a notification record is created and associated with the relevant personnel, the relevant personnel can also receive APP push notifications.

- Attachments [cms_files](/packages/standard-objects/cms_files.object.yml): Used to manage attachments related to objects. When the object is checked "[Allow attachments to be added](https://www.steedos. cn/docs/admin/create_object#About object function switch)" is switched on, business personnel can see the attachment sub-table related to the record in the object record detailed interface.

- Attachment version [cfs_files_filerecord](/packages/standard-objects/cfs_files_filerecord.object.yml): used to store various versions of the attachment. You can view each version of the attachment on the attachment details page.

- Order [billing_pay_records](/packages/standard-objects/billing_pay_records.object.yml): Obsolete.

- Data import [queue_import](/packages/standard-objects/queue_import.object.yml): used to import data in Excel files to Huayan Rubik's Cube.

- Data import history [queue_import_history](/packages/standard-objects/queue_import_history.object.yml): used to view the history of data import.

- Login log [audit_login](/packages/standard-objects/audit_login.object.yml): used to view information such as the time of each login to the system

- Autonumber [autonumber](/packages/standard-objects/autonumber.object.yml): used to view objects containing autonumber fields and modify the current number value of the autonumber field.

- Holidays [holidays](/packages/standard-objects/holidays.object.yml): used to customize holidays.

- Working hours [business_hours](/packages/standard-objects/business_hours.object.yml): used to customize working hours.

- External applications [connected_apps](/packages/standard-objects/connected_apps.object.yml): used by the system to reference external applications.

- Custom homepage [dashboard](/packages/standard-objects/dashboard.object.yml): used to define the homepage of the application.

- My favorites [favorites](/packages/standard-objects/favorites.object.yml): used to save records of each user's favorites.

- Follow [follows](/packages/standard-objects/follows.object.yml): used to save the objects that users follow

- Token [license_auth_token](/packages/standard-objects/license_auth_token.object.yml) when activating Huayan Rubik's Cube: invalid

- License [license](/packages/standard-objects/license.object.yml): The private deployment version of the Huayan Rubik's Cube platform is completely free. Cloud services require the purchase of relevant licenses.

- OAuth2 application [OAuth2Clients](/packages/standard-objects/OAuth2Clients.object.yml): stores oauth2 client information or jwt client secret

- Recently viewed [object_recent_viewed](/packages/standard-objects/object_recent_viewed.object.yml): This object records the recent view log of each user.

- WebHooks [object_webhooks](/packages/standard-objects/object_webhooks.object.yml): Used to subscribe to object record addition, deletion, and modification events. When relevant events are triggered, the specified URL will be automatically called back.

- Field permissions [permission_fields](/packages/standard-objects/permission_fields.object.yml): used to set field permissions.

- Picklist value [picklist_options](/packages/standard-objects/picklist_options.object.yml): Obsolete.

- Picklists [picklists](/packages/standard-objects/picklists.object.yml): Obsolete.

- Restriction rules [restriction_rules](/packages/standard-objects/restriction_rules.object.yml): used to narrow the record access rights of certain specified users to an object. The object record stores relevant restriction rules.

- Sharing rules [share_rules](/packages/standard-objects/share_rules.object.yml): used to amplify the record access rights of certain specified users to an object. The relevant sharing rules are saved in the object record.

- Login session [sessions](/packages/standard-objects/sessions.object.yml): used to save logged-in users, IP addresses, login time and other information.

- Settings [settings](/packages/standard-objects/settings.object.yml): Configuration table.

- Tabs [tabs](/packages/standard-objects/tabs.object.yml): Tabs used to configure the top navigation in the application. For instructions, please refer to the document [tabs](https://www.steedos .cn/docs/admin/create_object#%E9%80%89%E9%A1%B9%E5%8D%A1).

- Verification code [users_verify_code](/packages/standard-objects/users_verify_code.object.yml): Used to save the verification code in scenarios where a verification code needs to be sent such as mobile phone number or email registration/login.

- Online form [web_forms](/packages/standard-objects/web_forms.object.yml): Online form (anonymous data submission), used for potential customer registration, partner application form, online fault reporting and other needs.

- Applications [apps](/packages/standard-objects/apps.object.yml): used to save application configurations, such as configuring the top navigation tab, whether to open in a new window, etc. Enabled applications will be displayed in the application The launcher is in the nine-square grid.

- API Key [api_keys](/packages/standard-objects/api_keys-app/main/default/objects/api_keys/api_keys.object.yml): used to save API Key records created by users. The enabled API Key is usually Used for authentication in various interfaces. API Key is also used for authentication when [activating Huayan Rubik's Cube private deployment project](https://www.steedos.cn/docs/deploy/deploy-activate).

- Messages [chat_messages](/packages/standard-objects/chatter/chat_messages.object.yml): Basic module: record messages.

- Room [chat_rooms](/packages/standard-objects/chatter/chat_rooms.object.yml): Basic module: record messages.

 - Subscription [chat_subscriptions](/packages/standard-objects/chatter/chat_subscriptions.object.yml): Basic module: record messages.

- Business partners [accounts](/packages/standard-objects/community-users/accounts.object.yml): used to save business partner related information.

- Contacts [contacts](/packages/standard-objects/community-users/contacts.object.yml): used to save contact-related information.

- Invite users [space_users_invite](/packages/standard-objects/invite/space_users_invite.object.yml): record invitation information

- [_object_reload_logs](/packages/standard-objects/object-database/_object_reload_logs.object.yml): used to automatically load when objects and fields change


- External data sources [datasources](/packages/standard-objects/object-database/datasources.object.yml): For defining external data sources, you can connect to databases such as MongoDB, SQL Server, PostgreSQL, Oracle, and MySQL.

 - Objects [objects](/packages/standard-objects/object-database/objects.object.yml): Used to describe business object properties. It is a configuration file that maps to a database table (or collection when using MongoDB).

- Operation buttons [object_actions](/packages/standard-objects/object-database/object_actions.object.yml): You can configure operation buttons for objects. These buttons will be displayed on the object list or object record detailed interface. Clicking these buttons will Execute the script configured on the execute button.

- Object fields [object_fields](/packages/standard-objects/object-database/object_fields.object.yml): used to save field information on the object. Each field will be mapped to a field in the database table.

- Page layout [object_layouts](/packages/standard-objects/object-database/object_layouts.object.yml): used to define the page layout of the object record detail page.

- List view [object_listviews](/packages/standard-objects/object-database/object_listviews.object.yml): List view is the main interface of the object. Use the list to browse the data in the object, and you can configure what to display on the list. Column and list data filter conditions.

- Related sublist [object_related_list](/packages/standard-objects/object-database/object_related_list.object.yml): Obsolete, the related functions have been replaced by page layout.

- Object triggers [object_triggers](/packages/standard-objects/object-database/object_triggers.object.yml): used to save events that are triggered when creating, modifying, or deleting records configured on the object.

- Object validation rules [object_validation_rules](/packages/standard-objects/object-database/object_validation_rules.object.yml): used to save the validation rules configured on the object. The validation rules are mainly used to verify whether the data of the object meets specific requirements. the rule of. When a user's changes to a field of an object do not comply with the validation rules created by the user, the information entered by the user cannot be submitted for saving.

- webhooks queue [object_webhooks_queue](/packages/standard-objects/queue/object_webhooks_queue.object.yml): used to save the Webhooks queue to be executed.

- Field updates [action_field_updates](/packages/standard-objects/workflow-actions/action_field_updates.object.yml): used to save the field update information configured by the administrator in the process automation configuration. For details, please refer to the document [Field Updates]( https://www.steedos.cn/docs/admin/auto_process#%E5%AD%97%E6%AE%B5%E6%9B%B4%E6%96%B0).

- Workflow notifications [workflow_notifications](/packages/standard-objects/workflow-actions/workflow_notifications.object.yml): used to save the workflow notification information configured by the administrator in the process automation configuration. For details, please refer to the document [Workflow Notice](https://www.steedos.cn/docs/admin/auto_process#%E5%B7%A5%E4%BD%9C%E6%B5%81%E9%80%9A%E7%9F%A5) .

- Workflow rules [workflow_rule](/packages/standard-objects/workflow-actions/workflow_rule.object.yml): used to save the workflow rules configured by the administrator in the process automation configuration. For details, please refer to the document [Workflow Rules] ](https://www.steedos.cn/docs/admin/auto_process#%E5%B7%A5%E4%BD%9C%E6%B5%81%E8%A7%84%E5%88%99).

### Permissions

- Permission set [permission_set](/packages/standard-objects/permission_set.object.yml): used to save the permission set configured by the administrator in the settings application. For details, please refer to the document [permission set](https://www. steedos.cn/docs/admin/permission_set#%E6%9D%83%E9%99%90%E9%9B%86).

- Object permissions [permission_objects](/packages/standard-objects/permission_objects.object.yml): used to save the object permissions configured by the administrator in the settings application. For details, please refer to the document [Object Permissions] (https://www. steedos.cn/docs/admin/permission_set#%E5%AF%B9%E8%B1%A1%E6%9D%83%E9%99%90).

- Sharing rules [permission_shares](/packages/standard-objects/permission_shares.object.yml): used to save the sharing rules configured by the administrator in the settings application. For details, please refer to the document [Sharing Rules](https://www. steedos.cn/docs/admin/permission_set#%E5%85%B1%E4%BA%AB%E8%A7%84%E5%88%99).

### Approval

 - Roles [roles](/packages/standard-objects/roles.object.yml): used to save the role configuration configured by the administrator for the Approval King application in the settings application.

- Form [forms](/packages/standard-objects/workflow/forms.object.yml): used to save the form designed by the administrator using the form designer of the Approval King application.

- Process [flows](/packages/standard-objects/workflow/flows.object.yml): used to save the process designed by the administrator using the process designer of the Approval King application.

- Process categories [categories](/packages/standard-objects/workflow/categories.object.yml): used to save the process categories configured by the administrator for the Approval King application in the settings application.

- Positions [flow_roles](/packages/standard-objects/workflow/flow_roles.object.yml): used to save the positions configured by the administrator for the Approval King application in the settings application.

- Position members [flow_positions](/packages/standard-objects/workflow/flow_positions.object.yml): used to save the position members configured by the administrator for the Approval King application in the settings application.

- Approval (application form) [instances](/packages/standard-objects/workflow/instances.object.yml): used to save the application form and approval process filled out by business personnel.

- Object process mapping [object_workflows](/packages/standard-objects/object_workflows.object.yml): used to save the object process mapping relationship configured by the administrator for the Approval King application in the settings application.

- Historical steps [approvals](/packages/standard-objects/workflow/approvals.object.yml): used to record the approval information filled in by relevant personnel when each step is executed during the approval process.

- Process number [instance_number_rules](/packages/standard-objects/workflow/instance_number_rules.object.yml): used to save the process numbering rules configured by the administrator for the Approval King application in the settings application.

- Efficiency Statistics [instances_statistic](/packages/standard-objects/workflow/instances_statistic.object.yml): Approval King efficiency statistics.

- Process delegation [process_delegation_rules](/packages/standard-objects/workflow/process_delegation_rules.object.yml): used to save the process delegation rules configured by the administrator for the Approval King application in the settings application.

- Image signature [space_user_signs](/packages/standard-objects/workflow/space_user_signs.object.yml): used to save the image signature configured by the administrator for the Approval King application in the settings application.

- Process trigger [webhooks](/packages/standard-objects/workflow/webhooks.object.yml): used to save the process trigger configured by the administrator for the Approval King application in the settings application, when the approval process reaches a specific stage The specified event will be triggered.

## Built-in standard permission set

- Process Administrator [workflow_admin](/packages/standard-objects/permissionsets/workflow_admin.permissionset.yml): This permission set can be used to configure the administrator responsible for each process.

- Division Admin [organization_admin](/packages/standard-objects/permissionsets/organization_admin.permissionset.yml): This permission set can be used to configure administrators for each division.

## Built-in standard applications

### Set up application admin

This application is a system settings application where administrators can configure various parameters.

### cms knowledge

- Column [cms_categories](/packages/standard-objects/cms/cms_categories.object.yml): used to save the categories of knowledge articles.

- Knowledge [cms_posts](/packages/standard-objects/cms/cms_posts.object.yml): used to save knowledge articles.

- Sites [cms_sites](/packages/standard-objects/cms/cms_sites.object.yml): used to save sites in knowledge applications. Each article must belong to a site.

### packages-app

- Software package [package](/packages/standard-objects/packages-app/main/default/objects/package/package.object.yml): used to save software package information. The software package contains metadata and related source code .

- Installed software package [imported_package](/packages/standard-objects/packages-app/main/default/objects/imported_package/imported_package.object.yml): used to save the installed software package information of the current Huayan Rubik's Cube project .

- Software package components [package_type_members](/packages/standard-objects/packages-app/main/default/objects/package_type_members/package_type_members.object.yml): Used to save what metadata is included in each software package.

- Software package version [package_version](/packages/standard-objects/packages-app/main/default/objects/package_version/package_version.object.yml): used to save each version information of the software package, in the Huayan Rubik's Cube project The installed software package actually installs the package in a certain version saved here.

### Approval process process

- Approval process [process_definition](/packages/standard-objects/process/approval/process_definition.object.yml): used to save the approval process information configured by the administrator in the settings application.

- Approval step [process_node](/packages/standard-objects/process/approval/process_node.object.yml): used to save the approval step information configured by the administrator in the settings application for each approval process.

- Approval process [process_flows](/packages/standard-objects/process/flows/process_flows.object.yml): automated process, not yet implemented

- [process_flows_criteria](/packages/standard-objects/process/flows/process_flows_criteria.object.yml): Automated process, not yet implemented

- [process_flows_criteria_action](/packages/standard-objects/process/flows/process_flows_criteria_action.object.yml): Automated process, not yet implemented

- [process_instance](/packages/standard-objects/process/process_instance/process_instance.object.yml): Approval process instance

 - [process_instance_node](/packages/standard-objects/process/process_instance/process_instance_node.object.yml): Approval process step instance

- Approval history [process_instance_history](/packages/standard-objects/process/process_instance/process_instance_history.object.yml): used to record the approval information filled in by relevant personnel when each step is executed during the approval process.
