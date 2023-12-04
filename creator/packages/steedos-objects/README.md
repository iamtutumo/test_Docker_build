Steedos Objects
===

Steedos Objects are used to define objects in Steedos.

[For detailed descriptions of objects, please refer to this document. ](https://github.com/steedos/help/blob/master/zh-cn/creator/object.md)

### permissions permissions
Object permissions are divided into the following types:
- allowCreate: can create
- allowDelete: can be deleted
- allowEdit: editable
- allowRead: can view owner=own records
- modifyAllRecords: Can modify everyone's records
- viewAllRecords: can view everyone’s records
- actions [text] field, used to control which actions are displayed
- listviews [text] field, used to control which listviews are displayed
- related_objects field, used to control what content is displayed in the related list
- fields [text], visible fields for the current user. If this attribute is not configured in the database, it means there is no limit.
- readonly_fields [text], fields that cannot be edited by the current user
Note: A person can belong to multiple permission sets. If multiple permission sets define the permissions for the same object, most attributes take the maximum permission set. In addition to the following attributes: readonly_fields takes the minimum permission set.

API
- object permissions: Creator.getPermissions(object_name)
- record permissions: Creator.getRecordPermissions(object_name, record, userId)

### PermissionSet permission set
Administrators can set permission sets to define each user's access rights to app, object, and object fields.
- Each object can predefine two permission sets admin, user. Workspace administrators have admin rights.
- When customizing permission sets, you need to specify the corresponding user.
- Multiple permission sets can be stacked, with relatively higher permissions being the end-user permissions.
- Permission set allows you to set the Apps that users are authorized to access
- Permissions can be assigned to specific objects.
- Permissions can be specified for specific fields.