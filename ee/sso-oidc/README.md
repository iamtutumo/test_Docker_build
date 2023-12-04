 <!--
 * @Author: baozhoutao@steedos.com
 * @Date: 2022-06-24 17:03:59
 * @LastEditors: baozhoutao@steedos.com
 * @LastEditTime: 2022-06-29 15:45:29
 * @Description:
-->
## Single sign-on service

The following environment variables need to be configured
```
STEEDOS_IDENTITY_OIDC_CONFIG_URL= required
STEEDOS_IDENTITY_OIDC_CLIENT_ID= required
STEEDOS_IDENTITY_OIDC_CLIENT_SECRET= Required
STEEDOS_IDENTITY_OIDC_REQUIRE_LOCAL_ACCOUNT= Whether a local account is required. Optional, default value is false.
STEEDOS_IDENTITY_OIDC_NAME= Optional, default is Steedos
STEEDOS_IDENTITY_OIDC_LOGO= Optional, default/images/logo.png
```


sso interface:

- `POST /api/global/auth/oidc/login`
- body
```
{
    accessToken: oidc accessToken
}
```