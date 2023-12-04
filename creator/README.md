# Creator

 Huayan Rubik's Cube is finally packaged and run as a Meteor application, and its source code is in this folder.

## Directory index

- [Meteor project configuration](/creator/.meteor/README.md): Here are stored various configuration files of the Meteor project, such as which Meteor packages the project depends on, what Meteor kernel version is used, etc.
- [Auxiliary packaging script](/creator/.scripts/README.md): It is stored here to assist in solving various abnormal problems that may occur during the packaging or running process of the project.
- [Meteor application files](/creator/app/README.md): The Meteor application files of Huayan Rubik's Cube, including the front and back ends, are stored here.
- [Front-end script](/creator/client/README.md): Stored here are script files that will be automatically executed when the Huayan Rubik's Cube Meteor project is run on the browser or client.
- [React component module](/creator/imports/README.md): The React components to be imported into the Huayan Rubik's Cube Meteor project are stored here.
- [Meteor Function Package](/creator/packages/README.md): Each folder here contains various function packages that the Huayan Rubik's Cube Meteor project depends on.
- [Static Resource File](/creator/public/README.md): Stored here are various static resource files that the Huayan Rubik's Cube Meteor project depends on.

## NPM Scripts description

This project provides the following executable script commands:

- start: Execute `meteor run` to start the [Meteor](https://www.meteor.com/) application.
- start-verbose: Same as `start`, the difference is that the application is started in verbose log mode.
- build: Execute `meteor build` to package the [Meteor](https://www.meteor.com/) application into an NPM package. For details, please refer to the subsequent [Packaging Creator Project](#Packaging Creator Project) section.
- pub: Execute `npm publish` to package the NPM package.
- prepare: scripts that will be pre-executed when running the yarn command, including scripts for the front-end React component package `@steedos-ui/builder-community` that integrates injection dependencies.

 For the specific content of the script, please refer to the scripts attribute in the [package.json](./package.json) file.

## Remote development debugging

To run the debug development source code of this project, you need to install the development environment first. We recommend using [Gitpod](https://gitpod.io/) to start the remote development environment to avoid the tedious process of installing the development environment locally.

The remote development environment has installed and initialized the necessary components, including nodejs, mongodb, redis, vscode, meteor, etc. You only need to enter the address `https://gitpod.io/#{Git warehouse address}` in the browser. Use [Gitpod](https://gitpod.io/) to start the remote development environment.

The following development steps are suitable for developing the source code under the `/creator` path, which is a Meteor application. If you want to develop the debugger for the Huayan Rubik's Cube platform source code that the Meteor application depends on, that is, various NPM under the `/packages` path For the package source code, please refer to another remote development debugging tutorial: [Start the remote development environment](https://www.steedos.cn/docs/developer/gitpod).

### Preparation before development

#### Activate Huayan Magic Cube Cloud Service

Please follow this [Tutorial](https://steedos.cn/docs/deploy/deploy-activate) to activate the Huayan Rubik's Cube cloud service.

#### Activate the Huayan Rubik's Cube

Please refer to this [document](https://steedos.cn/docs/deploy/deploy-activate) and be prepared to activate the two environment variables that Huayan Rubik's Cube depends on when running the project later.

#### Register a GitPod account

We recommend using Gitpod to develop the Huayan Rubik's Cube project online, which can avoid the tedious process of installing a development environment. If you do not have a [Github](https://github.com/) account and a [Gitpod](https://gitpod.io/) account, please register them separately and log in to them using a browser.

### Fork project

 If you want to adjust the Huayan Rubik's Cube platform source code, please Fork [Huayan Rubik's Cube Platform Source Code](https://github.com/steedos/steedos-platform). If we use Gitpod to develop the forked project online later, we can put the developed Submit the code to the Git repository.

We welcome everyone to submit PR to the platform source code and contribute their wisdom to the Huayan Rubik's Cube open source community.

### Start the remote development environment

Just enter the address `https://gitpod.io/#{Git warehouse address from the previous fork}` in the browser to use Gitpod to start the remote development environment.

For example, visit the address <https://gitpod.io/#https://github.com/steedos/steedos-platform> to run [Huayan Rubik's Cube Platform Source Code] online (https://github.com/steedos/steedos -platform) project, you can replace the Git warehouse address after the # with the Git warehouse address of any Huayan Rubik's Cube project you want to run.

When Gitpod starts the remote development environment, it will automatically allocate remote server resources, install the relevant development environment, and clone the project in the Git warehouse address after the # number for initialization. When everything is ready, it will automatically redirect the browser address to Gitpod for initialization. Good Workspaces access address.

In order to quickly start the remote development environment, you can install the Chrome plug-in [Gitpod - Always ready to code](https://chrome.google.com/webstore/detail/gitpod-always-ready-to-co/dodmmooeoklaejobgleioelladacbeki) and use it like this When you visit the homepage of any Git warehouse with the Chrome browser, you can see a button called Gitpod. Click it to start the remote development environment with one click.

> We can also visit [Gitpod official website personal settings page] (https://gitpod.io/preferences) and check the `Open in Desktop IDE` option to enable the function of using local VS Code to open remote Gitpod projects. After this function is enabled, You can use local VS Code to open the Gitpod project.

### Run the Rubik's Cube platform

After opening the project in the browser, the `yarn` command will be automatically executed in the project root directory to install the project dependencies, and the `yarn start` command will be automatically executed to run the project.

It should be noted that the root directory of the platform source code project runs the template project within the source code project. The project path is `examples/project-template`. The template project created by executing the npx create-steedos-app command also comes from this folder. .

### Run the Creator project

After the above steps, we only ran the template project in the platform, not the Creator project. Next, please perform the following steps to run the Creator project source code:

- Please visit the previously run template project and enter the Huayan Rubik's Cube initial account and password to confirm that the Rubik's Cube project has been successfully activated and initialized.
- Press `CTRL + C` to stop a previously running template project.
- Command line `cd` to enter the creator folder.
- Execute the `yarn` command to install the project dependency packages, and make sure there is no error log at the end.
- Execute the `yarn start` command to run the `creator` project.

There are following precautions when running this project:

- The port number in the `.env.local` file is 3100. This port number is hard-coded in the `start` command of `package.json`. The port number cannot be changed. If you want to change the port number, you need to change it at the same time. The port number parameter in the `start` command is also changed.
- Please do not change the `MONGO_URL` parameter in the `.env.local` file to point to other databases. By default, it points to the database initialized when running the template project before. Otherwise, you cannot use the Huayan Rubik's Cube initial account to log in to the system.

### Visit Creator project

After the above Creator project is run, the browser window will not automatically open to access the project. You can manually enter the Gitpod-Workspaces access address in the browser and add the port number of the project you want to access as a prefix to access it.

For example, assuming that the Workspaces access address opened by the remote development environment previously opened is `https://white-silverfish-e5vy4oyh.ws-us25.gitpod.io`, we only need to enter the address `https://3100-white-silverfish-e5vy4oyh .ws-us25.gitpod.io` to access the Creator project that was just started.

### Debug Creator source code

After running the Creator project according to the above steps, we can adjust the Creator project source code. The source code here refers to the code in the Creator folder. You can refer to the relevant `README.md` file in the folder to learn about the related projects. Introduction instructions.

After changing the source code of the Creator project, there is no need to restart the service to test and confirm the code effect, because the project has a hot start function, and the project will be automatically recompiled and run as long as the source code is changed.

It should be noted that the system configuration file `steedos-config.yml` in the Creator project does not take effect. Instead, the configuration file named `settings.json` in the root directory is used to configure system parameters. The parameters it supports are the same as the former It's the same, just the writing format is different.

### Package Creator project

Execute the following instructions on the command line to package the Meteor project in the `/creator` directory. When the packaging is successful, the packaged files will be automatically copied to the `/server` folder as an NPM named "steedos-server" Bao was cited by the Huayan Rubik's Cube platform.

```sh
cd creator/
export TOOL_NODE_FLAGS="--max-old-space-size=3800"
yarn run build
```
 ### test

After packaging the Creator project according to the above instructions, the packaged files will be automatically copied to the `/server` folder. To test the packaged Creator project, you only need to execute the following instructions to re-run the Huayan Rubik's Cube platform in the root directory. Template project can be:

```sh
cd ../
yarn start
```

If the browser window does not automatically open to access the project after the project is completed, you can manually enter the Gitpod-Workspaces access address in the browser and add the project port number `5000-` as the prefix to access it.
