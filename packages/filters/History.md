 1.7.4/2019-10-16
===================

  * The value of utcOffset is wrong, it should be `USER_CONTEXT.user.utcOffset` instead of `USER_CONTEXT.utcOffset`
1.7.3/2019-10-15
===================

  * Remove devextreme package dependency
1.5.4/2019-09-09
===================

  * Use the packaged es5 version
1.0.0/2019-08-14
===================

  *Upgraded to 1.0, fix version number conflicts
0.0.14/2019-08-14
===================

  * Release Guid/EdmLiteral related code, because the code of this package may also be used in the front end to prevent any potential bugs
0.0.13/2019-08-12
===================

  * Support formula field value parsing based on userContext
0.0.12/2019-08-08
===================

  * Built-in ranges such as this_year support utcOffset parameters using different time zones
  * Instead of directly processing the time zone with getTimezoneOffset in the code, directly change the formatISO8601 kernel function to use the utc time value
0.0.11/2019-08-07
===================

  * Release more functions in the package for calling
0.0.10/2019-08-07
===================

  * fix the time zone deviation problem between this_year in @steedos/filters package
0.0.9/2019-08-06
===================

  * Supports filters such as 2019-03-23T01:00:33.524Z, 2019-03-23T01:00:33Z, 2019-03-23 ​​01:00:33, 2019-3-23 1:0:33, etc. Format string defines utc date and time fields
  * Support strings such as 2019-03-23 ​​01:00:33 in filters to define local time date and time fields
0.0.8/2019-08-05
===================

  * fix the time type field in the filter should not be directly setHours, because it will cause the filter conditions to change for no reason when querying multiple times.
0.0.7/2019-08-03
===================

  * Fix 8-hour time zone problem, support time type as string
  * bug issues such as between undefind