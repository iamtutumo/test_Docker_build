 ---
title: filter conditions
---

Filter conditions can be used to filter business data. for example:
- When defining a view, you can define filter conditions at the same time. Each view has its own filter. Filters can be used to set filter conditions for the content of the view list.

### Supported operators
- "=": equal to
- "<>": not equal to
- ">": greater than
- ">=": greater than or equal to
- "<": less than
- "<=": less than or equal to
- "startswith": starts with...
- "contains": contains...
- "notcontains": does not contain...
- "between": range

Example:
- [["field1", "=", true],["field2","<=",new Date()],["field3", ">", 20]]
- [["status", "=", ["closed","open"]]]
- [["age", "between", [20,30]]]

### "Not" operation

Can be inverted based on the current filter conditions, for example:
- ["not", ["value", "=", 3]]

### "And (and)", "or (or)" operation

Multiple filters can be combined using "and" and "or" operations, for example:
- [ [ "value", ">", 3 ], "and", [ "value", "<", 7 ] ]
- [ [ "value", ">", 7 ], "or", [ "value", "<", 3 ] ]

If you do not specify the "and" or "or" operation, the system will perform filtering based on the "and" operation by default. So the following two ways of writing have the same result:
- [ [ "value", ">", 3 ], "and", [ "value", "<", 7 ] ]
- [ [ "value", ">", 3 ], [ "value", "<", 7 ] ]

### Enhanced functions when the filter condition value is an array

When the operator is "=", the conditions are automatically split into multiple filtering conditions by "or", which is similar to the "in" operation function, so the results of the following two writing methods are the same:
- [["status", "in", ["closed","open"]]]
- [ [ "status", "=", "closed" ], "or", [ "status", "=", "open" ] ]

When the operator is "<>", the conditions are automatically split into multiple filter conditions by "and", so the results of the following two ways of writing are the same:
- [["status", "not in", ["closed","open"]]]
- [ [ "status", "<>", "closed" ], "and", [ "status", "<>", "open" ] ]

When the operator is "between", the conditions are automatically converted into filter conditions corresponding to the ">=" and "<=" operators. The following groups have the same effect:
- [["age", "between", [20,30]]] is equivalent to [ [ "age", ">=", 20 ], "and", [ "age", "<=", 30 ] ]
- [["age", "between", [null,30]]] is equivalent to [ [ "age", "<=", 30 ] ]
- [["age", "between", [20,null]]] is equivalent to [ [ "age", ">=", 20 ] ]

> between only supports numeric and date and time types, and the filtered value must be an array format of two elements.

In other cases, press "or" to automatically connect to multiple filter conditions.
- [["tag", "contains", ["start","end"]]] is equivalent to [ [ "tag", "contains", "start" ], "or", [ "tag", " contains", "end" ] ]

### Formula field support

It is allowed to specify the current status related attribute value as value in the filter condition.
- "{userId}": current login user id
- "{spaceId}": the current workspace
- "{user.xxx}": currently logged in user information, such as user.name, user.mobile, user.email, user.company_id, etc.
- All other variable values ​​that can be obtained in Steedos.USER_CONTEXT

Example:
- [["assignees", "=", "{userId}"]]

### Supports filtering conditions in Object format
```
[["object_name", "=", "project_issues"]]
```
Equivalent to:
```
{
"field": "object_name",
"operation": "=",
"value": "project_issues"
}
```

### Function support

Two functional modes are supported:
1. The entire filters are functions, such as:
```
filters: ()->
return [[["object_name","=","project_issues"],'or',["object_name","=","tasks"]]]
```
2. The filter.value in filters is function, such as:
```
filters: [["object_name", "=", ()->
return "project_issues"
]]
```
or
```
filters: [{
"field": "object_name"
"operation": "="
"value": ()->
return "project_issues"
}]
```

### Combined query
If multiple query conditions coexist, the filtered result connected by the "and" operator will be used by default.

### Date, time fields and time zone
Date and time type fields are stored in UTC time in the database. The date type field corresponds to 00:00:00.

When querying date and time type fields, the time must be converted to UTC time format before executing the query.

For example, if you want to query documents whose creation date is before 13:00 pm Beijing time, you need to convert Beijing time to GMT time before executing the query.
```js
[["created","<=","2019-08-06T07:00:00Z"]]
```