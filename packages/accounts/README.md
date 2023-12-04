# Steedos Accounts

Fullstack authentication and accounts-management for steedos.

## Connect to mongodb

```bash
export MONGO_URL=mongodb://127.0.0.1/steedos
```

## process.ENV
```bash
export ROOT_URL=http://127.0.0.1:4000/
```

## Start Server at 4000

```bash
yarn
yarn start
```

Server apis runs on https://127.0.0.1:4000/accounts/

## Debug Webapp at 3000

```bash
cd webapp
yarn
yarn start
```

Navigate to https://127.0.0.1:3000/ to view react webapp.

## Build Webapp to 4000

```bash
cd webapp
yarn
yarn build
```

Build webapp to /webapps/build folder, will mount to https://127.0.0.1:4000/accounts/a/

Navigate to https://127.0.0.1:4000/ , will redirect to build webapp at https://127.0.0.1:4000/accounts/a/

 ## Password policy
The default password format requirements are: the password must contain characters, numbers, and letters, with at least one uppercase letter, and cannot be less than 8 characters.
It can be rewritten through the steedos-config.ym configuration file:
```
public:
  accounts:
    password:
      policy:
        reg: ^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)\S{8,}$
        regErrorMessage: Password must contain letters and numbers and cannot be less than 8 characters
```
## Function Description
- This package is used to provide the server interface for login and registration pages.