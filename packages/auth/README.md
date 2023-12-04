 # @steedos/auth is used to generate and cache user sessions to improve verification speed.
## Install
- yarn add @steedos/auth or npm install @steedos/auth

## Open the getSession method to obtain the user session
- The parameter token is `X-AUTH-TOKEN`, spaceId is the workspace id
- `async function getSession(token: string, spaceId: string): Promise<SteedosUserSession>;`
- The format of returning SteedosUserSession is as follows:
```ts
export declare type SteedosIDType = number | string;
{
    userId: SteedosIDType; // user id
    spaceId: string; // workspace id
    roles: string[]; // User roles
    name: string; // User name
    steedos_id?: string; //User steedosid
    email?: string; // User email
    companyId?: string; // The user’s unit id
    companyIds?: string[]; // IDs of all units to which the user belongs
}
```
- If the parameter spaceid is not passed, `async function getSession(token: string): Promise<ResultSession>;`
- The format of the returned ResultSession is as follows:
```ts
{
  name: string; // User name
  userId: SteedosIDType; // user id
  steedos_id?: string; //User steedosid
  email?: string; // User email
}
```
## Open auth method to verify user session
- `async function auth(request: Request, response: Response): Promise<any>`
- Pass in the request response object and return the return value of the getSession method.

## Open the setRequestUser method and set the req.user attribute
- `async function setRequestUser(request: Request, response: Response, next)`
- Example:
```js
  let app = express();
  app.use('/', setRequestUser);
```

## Function Description
- This package is used to parse interface user authentication information and cache basic user information.