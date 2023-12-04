 # Provide interface


## Overview
---

| Method | Address | Purpose |
| :--- | :--- | :--- |
| GET | /service/api/$sidecar/registry/nodes | Get nodes |
| GET | /service/api/$sidecar/registry/services | Get services |
| GET | /service/api/$sidecar/registry/actions | Get actions |
| GET | /service/api/$sidecar/registry/events | Get events |
| POST | /service/api/$sidecar/registry/services | Register service |
| DELETE | /service/api/$sidecar/registry/services/:serviceName | Log out of service |
| POST | /service/api/$sidecar/call/:action | Call action |
| POST | /service/api/$sidecar/emit/:event | Trigger event |
| POST | /service/api/$sidecar/broadcast/:event | Broadcast event |

## illustrate
---

### Interface authentication

- Add request header `Authorization: Bearer apikey,{apiKey}`, {apiKey} value is obtained from the `Huayan Rubik's Cube Platform-Advanced Settings-API Key` menu
  
### Register service

The request body format is MoleculerJS Service. It should be noted that the sidecar will use the POST method to call the action or event interface. Example:
```
POST /service/api/$sidecar/registry/services
```

**Request body**
```js
{
    name: "posts",
    version: 1,

    settings: {
        // It means, your HTTP server running on port 5000 and sidecar can reach it on `localhost`
        // The URLs in action/event handlers contain relative URL.
        baseUrl: "http://localhost:5000"
    },

    actions: {
        list: {
            params: {
                limit: "number",
                offset: "number"
            },
            // Shorthand handler URL what will be called by sidecar
            handler: "/actions/posts/list"
        }
    },

    events: {
        "user.created": {
            // Shorthand handler URL what will be called by sidecar
            handler: "/events/user.created"
        }
    }
}
```

### Call action

Call service action, example:
```
POST /service/api/$sidecar/call/comments.create
```

**Request body**
```js
{
    // Context params
    params: {
        title: "Lorem ipsum",
        content: "Lorem ipsum dolor sit amet..."
    },
    // Context meta
    meta: {
        user: {
            ID: 12345
        }
    },
    // Calling options
    options: {
        timeout: 3000
    }
}
```

**Response body**
```js
{
    // Response data
    response: {
        id: 1,
        title: "Lorem ipsum",
        content: "Lorem ipsum dolor sit amet..."
    },
    // Optional: Context meta if you changed the content.
    meta: {
        user: {
            ID: 12345
        }
    }
}
```

**Error response**
```js
{
    error: {
        name: "MoleculerClientError",
        code: 422,
        type: "VALIDATION_ERROR",
        message: "Title is required",
        data: {
            action: "comments.create",
            params: {
                title: null
            }
        }
    }
}
```

### Trigger event

An event that triggers a service, example:
```
POST /service/api/$sidecar/emit/post.created
```

For broadcast, use the following URL, example:
```
POST /service/api/$sidecar/broadcast/post.created
```

**Request body**
```js
{
    // Context params
    params: {
        id: 1,
        title: "First post",
        content: "Post content",
        author: 12345
    },
    // Context meta
    meta: {
        user: {
            ID: 12345
        }
    },
    // Emit options
    options: {
        groups: "users"
    }
}
```

### Accept action request
If the registered service defines an action, when other services call the action, the sidecar will use the POST method to call the handler address defined in the action. The request body is as follows:

**Request body**
```js
{
    // Action name
    action: "posts.list",

    // Caller NodeID
    nodeID: "node-123",

    // Context params
    params: {
        limit: 10,
        offset: 50
    },

    // Context meta
    meta: {
        user: {
            ID: 12345
        }
    },

    // Calling options
    options: {
        timeout: 3000
    }
}
```

The handler address defined in the action, the return value should be in the following format:

**Response body**
```js
{
    // Response data
    response: [
        { id: 1, title: "First post" },
        { id: 2, title: "Second post" },
        { id: 3, title: "Third post" }
    ],
    // Optional: Context meta if you changed the content.
    meta: {
        user: {
            ID: 12345
        }
    }
}
```

If an error is reported during execution, the sidecar will return the response body in the following format:

**Error response**
```js
{
    //Error data
    error: {
        name: "MoleculerClientError",
        code: 400,
        type: "INVALID_INPUT",
        message: "Some user input is not valid",
        data: {
            // Any useful data
            action: "posts.list",
            params: {
                limit: "asd"
            }
        }
    }
}
```

### Accept event request
If the registered service defines an event, when other services call the event, the sidecar will use the POST method to call the handler address defined in the event. The request body is as follows:

**Request body**
```js
{
    //Event name
    event: "user.created",

    // Type of event (emit, broadcast)
    eventType: "emit",

    eventGroups: "posts",

    // Caller NodeID
    nodeID: "node-123",

    // Context params
    params: {
        limit: 10,
        offset: 50
    },

    // Context meta
    meta: {
        user: {
            ID: 12345
        }
    }
}
```
Responses and error reports are the same as actions.