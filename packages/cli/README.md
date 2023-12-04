 #Steedos
Develop and run your enterprise apps in miniutes

### install from npm
```
npm i steedos-cli -g
```

### install from src
```
cd cli
npm i -g
```

### build creator bundle
```
meteor build --directory C:\srv\creator-build
```

### run bundle
```
steedos run -s C:\srv\creator-build
```

### develop app
- create project folder
- write main.js
- steedos run will load main.js on bootstrap
```
steedos run -s C:\srv\creator-build
```

### help
```
steedos run --help
```

### i18n
- Generate internationalization files for objects under the project
- Syntax `steedos i18n ${lng} [-s]`
- lng: The internationalized language needs to be generated, required (en | zh-CN)
- -s: The path to the project, defaults to the current directory, optional
- -p: Project folder that requires internationalization
- Example: `steedos i18n zh-CN -s D:\GitHub\steedos-project-saas`
- Example: `steedos i18n zh-CN -s . -p ./steedos-app`

- How to run the development environment: Run the cli project, execute `yarn build`, and then enter the **bin** folder to execute (example): `.\run i18n zh-CN -s D:\GitHub\steedos-project -saas`

### source
- Environment variables need to be configured: METADATA_SERVER, METADATA_APIKEY, which can be configured through the project's env file.
- config: Create .env.local and write METADATA_SERVER, METADATA_APIKEY. For example `steedos source:config`
- retrieve: Get data from the server to generate a local file. For example `steedos source:retrieve -m Object:Accounts`
- deploy: Deploy local files to the server. For example `steedos source:deploy -p steedos-app\main\default`

### data
- Environment variables need to be configured: METADATA_SERVER, METADATA_APIKEY, which can be configured through the project's env file.
- export: Get data from the server and generate a local file. For example `steedos data:export -o accounts` or `steedos data:export -o accounts -p`
- import: Deploy local files to the server. For example `steedos data:import -f accounts.json` or `steedos data:import -p account-plan.json`


## Retrieve extended attributes of built-in objects

### Method 1: Use package.yml
1 Add package.yml
```
# For example, synchronize department’s custom fields and buttons. Add `steedos-app/package.yml`
CustomAction:
  - organizations.*
CustomActionScript:
  - organizations.*
CustomField:
  - organizations.*
```

2 Execute the command under the project and path
```
steedos source:retrieve -y ./steedos-app/package.yml
```
### Method 2: retrieve -m command
Example 1: Sync department’s custom button `btn1`
```
steedos source:retrieve -m CustomAction:organizations.btn1
```
Example 2: Synchronize all custom buttons in the department
```
steedos source:retrieve -m CustomAction:organizations.*
```