 ---
title: Date, time fields and time zone
---

### Overview

Date and time type fields are stored in UTC time in the database. The date type field corresponds to 00:00:00.

When querying date and time type fields, the time must be converted to UTC time format before executing the query.

For example, if you want to query documents whose creation date is before 13:00 pm Beijing time, you need to convert Beijing time to GMT time before executing the query.
```js
[["created","<=","2019-08-06T07:00:00Z"]]
```

The following groups of methods are equivalent. They all define time values ​​in UTC format:
- [["created","<=",new Date("2019-05-25T06:44:44.000Z")]]
- [["created","<=","2019-05-25T06:44:44.000Z"]]
- [["created","<=",new Date("2019-05-25T06:44:44Z")]]
- [["created","<=","2019-05-25T06:44:44Z"]]

Taking the local time as Beijing time in China as an example, the above UTC method is equivalent to:
- [["created","<=",new Date("2019-05-25 14:44:44")]]
- [["created","<=","2019-05-25 14:44:44"]]

The above utc format and local time format will be converted to OData Query: `(created le 2019-05-25T06:44:44Z)`

> Although local time format search is supported, it is recommended for end users to use UTC time format.

> The rules for date and time fields in the between operator are the same as above

### Date field
Users who want to search for data on 2019-08-07 Beijing time should use `[["signed_date","between",["2019-08-06T16:00:00Z","2019-08-07T15:59:59Z" ]]`
The OData request would be: `((signed_date ge 2019-08-06T16:00:00Z) and (signed_date le 2019-08-07T15:59:59Z))`

> Note that unlike the @steedos/filters package, when the search condition of the filter date control in Creator is set to search for 2019-08-07 data, the OData request is `((signed_date ge 2019-08-07T00:00:00Z) and ( signed_date le 2019-08-07T23:59:59Z))`, this is because the date field is specially recognized in Creator, and the time range of the day in UTC is directly used, but it does not affect the function.

> Based on the above rules for the date field in the @steedos/filters package, the date field in the database is required to be stored as 0 o'clock UTC of the day. See: https://github.com/steedos/creator/issues/1271

### Time field:
The user wants to search for data before 2019-08-07 13:00:00 Beijing time. The application uses `[["created","<=",[["created","<=","2019-08-07T05 :00:00Z"]]]]`
The OData request would be: `(signed_date ge 2019-08-07T05:00:00Z)`

> The time field in Creator is the same as the @steedos/filters package

### Built-in time range:
Users who want to search for this year’s data in Beijing time should use `[["created","between","this_year"]]`
When used as a front-end in Creator, it will be automatically converted to `[["signed_date","between",["2018-12-31T16:00:00Z","2019-12-31T15:59:59Z"]]`,
Its OData request will be: `((created ge 2018-12-31T16:00:00Z) and (created le 2019-12-31T15:59:59Z))`;
Used in the background, the default is automatically converted to `[["signed_date","between",["2019-01-01T00:00:00Z","2019-12-31T23:59:59Z"]]`,
Its OData request will be: `((signed_date ge 2019-01-01T00:00:00Z) and (signed_date le 2019-12-31T23:59:59Z))`;

> The utcOffset value can be configured in the background to change the default behavior. For example, if it is set to utcOffset equal to 8, the effect will be the same as the front-end effect in the above Creator, and 8 hours will be automatically subtracted.

> Note that unlike the @steedos/filters package, when selecting this year's range in the filter in Creator, the OData request is `((signed_date ge 2019-01-01T00:00:00Z) and (signed_date le 2019-12-31T23:59 :59Z))`, this is because the range of this year in Creator is processed as a date field, and special processing is done to directly use the time range of the current year in UTC, but it does not affect the function.

### yml format
Note that there is a difference between the date and time fields in the yml format file with quotes and without quotes:
- Without quotation marks, the Date object is defined, and 2019-05-25T06:44:44.000Z and 2019-05-25 06:44:44 are both in UTC format and do not support local time writing.
- If you add quotation marks, you are defining a string, and there is a difference between '2019-05-25T06:44:44.000Z' and '2019-05-25 06:44:44'. The former will be recognized as utc, and the latter will recognized as local time

The following is the yml format definition of `created <= 2019-05-25T06:44:44Z`. They are equivalent:
```
filters:
  -
    -
      -created
      - '<='
      - 2019-05-25T06:44:44Z
```
==
```
filters:
  -
    -
      -created
      - '<='
      - '2019-05-25T06:44:44Z'
```
==

```
filters:
  -
    -
      -created
      - '<='
      - 2019-05-25 06:44:44
```
==

```
filters:
  -
    -
      -created
      - '<='
      - '2019-05-25 14:44:44'
```


### Store values ​​in database
The above date, time field and time zone rules only apply to date objects stored in the database. Direct storage as strings in the database is not supported. Take mongodb as an example:
- Supports the storage method `ISODate("2009-05-17T16:00:00.000Z")`, but does not support comparison of time fields stored as `"2009-05-17T16:00:00.000Z"`
- If stored as a string, there will be time zone deviation during comparison.