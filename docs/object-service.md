 Object Service Object Service
===

Low-code platform objects are the core, and object metadata needs to solve the following problems during the loading and running stages:
- Object metadata loading
- Inheritance of objects
- Basic methods of adding, deleting, modifying and checking objects
- Event publishing and subscription
- Object trigger
- Object service dependencies
- Object service life cycle
- Object service hot update

Huayan Rubik's Cube uses Moleculer Service to run business objects to achieve the above functions.

## Metadata loading

In Huayan Rubik's Cube, metadata is used to define objects, and objects support repeated definition in different software packages to achieve expansion. When the system starts, it will scan all software packages (Package Services) in the system, and load the software packages in sequence according to the dependencies of the Package Service, so as to expand the old objects in the new software packages.

## Base Object Service

During the system startup phase, the corresponding Object Service is automatically generated based on metadata. All Object Services inherit from the Base Object Service, and basic addition, deletion, modification, and query functions are implemented in the Base Object Service. Base Object Service will further call the driver-level addition, deletion, modification and check functions according to different drivers.

## Actions

 Object Service uses Action to define methods. Basic methods include addition, deletion, modification, and query. Developers can customize Action.
 Action is an asynchronous function and can be called directly using the following syntax

```
const res = await broker.call(actionName, params, opts);
```

Actions can also be converted into APIs through the Moleculer API Gateway and accessed in the form of REST, GraphQL, and gRPC.

Moleculer solves the load balancing problem of Action calls between different nodes to avoid repeated calls.

![action-balancing](https://moleculer.services/docs/0.14/assets/action-balancing.gif)

## Events

Action will automatically emit events when adding, deleting, modifying, and checking. You can subscribe to Events in the service.

Moleculer solves the problem of load balancing of Events among nodes. Multiple nodes of the same microservice will only receive Events once.

![balanced-events](https://moleculer.services/docs/0.14/assets/balanced-events.gif)

Moleculer Events are one-way, so triggers cannot be implemented based on Events.

## Triggers

Trigger is a special type of Action, which is automatically called in the add, delete, modify, and check function, and can control the interruption of the add, delete, modify, and check Action based on the Trigger return value.

## Life cycle of object service

Based on Moleculer Service, the following object life cycle functions can be customized

```
// users.object.service.js
module.exports = {
    name: "users",
    actions: {...},
    events: {...},
    methods: {...},

    created() {
        // Fired when the service instance created (with `broker.loadService` or `broker.createService`)
    },

    merged() {
        // Fired after the service schemas merged and before the service instance created
    },
    
    async started() {
        // Fired when broker starts this service (in `broker.start()`)
    }

    async stopped() {
        // Fired when broker stops this service (in `broker.stop()`)
    }
};
```

 ## Object service dependency

If an object in the cluster must wait for another object to be loaded before it can be loaded, you can use the following command:

```
broker.waitForServices("posts", "users").then(rsp -> {
    // Called after the "posts" and "users" services are available
});
```

## Hot update of objects

Modifying objects in the visual interface or installing software packages may require hot updating (recreating) the object service in memory. Therefore, the object service needs to subscribe to the modification events of its own metadata and perform related processing.