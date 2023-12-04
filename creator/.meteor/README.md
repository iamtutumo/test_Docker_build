 # Meteor project configuration

The final package and run of Huayan Rubik's Cube is a Meteor project, and the various configuration files of the Meteor project are stored in this folder.

Generally, the dependent Meteor packages in the project are configured in the `packages` file. When running the project, Meteor will generate the final project reference based on the dependent packages configured here. Which Meteor packages it depends on and the specific version number of each package are stored in `versions `in the file.

The Meteor kernel version that the project depends on is configured in the file `release`.