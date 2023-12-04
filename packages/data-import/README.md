 <!--
 * @Author: sunhaolin@hotoa.com
 * @Date: 2021-10-21 09:57:01
 * @LastEditors: sunhaolin@hotoa.com
 * @LastEditTime: 2022-07-15 14:18:13
 * @Description:
-->
## Function Description
- This package is a data import function in system settings, which can import object data through excel

### Provides the importData function to support importing .data.json, .data.csv, and .flow.json data

- For example, in the custom software package package.service.js, listen for system initialization events or call importData when the service starts to import the data in the software package:

```js
const { importData } = require('@steedos/data-import')
const path = require('path')
module.exports = {
    /**
     *Events
     */
    events: {
        // System initialization successful
        'service-cloud-init.succeeded': async function (ctx) {
            await importData(path.join(__dirname, 'main', 'default', 'data'));
        }
    },
    /**
     * Service started lifecycle event handler
     */
    async started() {
        await importData(path.join(__dirname, 'main', 'default', 'data'));
    },
};
```

- importData function parameter description
```js
/**
 *
 * @param {*} filePath The folder path to import data
 * @param {*} onlyInsert Only import, check before importing data. If any record exists, no import will be performed. The default is true. If it is false, the update operation will be performed if it exists.
 */
export async function importData(filePath: string, onlyInsert: boolean = true) {
    // function body
}
```