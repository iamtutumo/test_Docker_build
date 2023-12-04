import { exportExcelExpress } from '../routes';
import { processExpress } from "@steedos/process";
const Future = require('fibers/future');
const objectql = require("@steedos/objectql");
const steedosAuth = require("@steedos/auth");
const express = require('express');
const _ = require("underscore");
const app = express();
const routersApp = express();
var path = require('path');
import fs = require('fs')

import { Publish } from '../publish'
import { getSteedosSchema, extend } from '@steedos/objectql';
import { coreExpress } from '../express-middleware'

import { createHash } from "crypto";

const session = require('express-session')

routersApp.use(session({
    secret: process.env.STEEDOS_SESSION_SECRET || 'steedos',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 800000 },
    name: 'ivan'
}))

export const sha1 = (contents) => {
    var hash = createHash('sha1');
    hash.update(contents);
    return hash.digest('hex');
};

const extendSimpleSchema = () => {
    SimpleSchema.extendOptions({
        filtersFunction: Match.Optional(Match.OneOf(Function, String))
    });
    SimpleSchema.extendOptions({
        optionsFunction: Match.Optional(Match.OneOf(Function, String))
    });
    SimpleSchema.extendOptions({
        createFunction: Match.Optional(Match.OneOf(Function, String))
    });
}

export const loadClientScripts = ()=>{
    try {
        if(typeof WebAppInternals !== 'undefined'){
            let clientCodes = getClientBaseObject();
            let clientScripts = objectql.getClientScriptsFiles();
            _.each(clientScripts, function (scriptFile) {
                let code = fs.readFileSync(scriptFile, 'utf8');
                clientCodes = clientCodes + '\r\n;' + code + '\r\n;'
            });
    
            clientCodes = clientCodes + objectql.getClientScripts();
    
            WebAppInternals.additionalStaticJs["/steedos_dynamic_scripts.js"] = clientCodes
        }
    } catch (error) {
        // console.log(`loadClientScripts error: ${error}`);
    }
}

export const initCreator = async () => {
    let allObjects = await objectql.getDataSource('meteor').getObjects();
    let allDefautObjects = await objectql.getDataSource('default').getObjects();
    await Future.task(() => {
        try {
            extendSimpleSchema();
            Creator.baseObject = objectql.getObjectConfig(objectql.MONGO_BASE_OBJECT);
            Creator.steedosSchema = getSteedosSchema()
            // 不需要加载 Creator 中定义的objects
            // _.each(Creator.Objects, function (obj, object_name) {
            //     obj.name = object_name
            //     objectql.addObjectConfig(obj, 'default')
            // });
            objectql.addAppConfigFiles(path.join(process.cwd(), "src/**"))
            // let allObjects = objectql.getObjectConfigs('meteor');
            _.each(allObjects, function (obj) {
                const objectConfig = obj.metadata;
                const localObjectConfig = objectql.getObjectConfig(objectConfig.name);
                if(localObjectConfig){
                    objectConfig.listeners = localObjectConfig.listeners;
                    objectConfig.methods = localObjectConfig.methods;
                    objectConfig.triggers = localObjectConfig.triggers;
                    extend(objectConfig, {triggers: localObjectConfig._baseTriggers})
                }
                Creator.Objects[objectConfig.name] = objectConfig;
            });

            // let allApps = objectql.getAppConfigs();
            // _.each(allApps, function (app) {
            //     if (!app._id)
            //         app._id = app.name
            //     Creator.Apps[app._id] = app
            // });

            let allDashboards = objectql.getDashboardConfigs();
            if(!Creator.Dashboards){
                // Creator新版本发包前Creator.Dashboards全局变量不存在
                Creator.Dashboards = {}
            }
            _.each(allDashboards, function (dashboard) {
                if (!dashboard._id)
                    dashboard._id = dashboard.name
                Creator.Dashboards[dashboard._id] = dashboard
            });

            let allServerScripts = objectql.getServerScripts();
            _.each(allServerScripts, function (scriptFile) {
                require(scriptFile)
            });

            _.each(allObjects, function (obj) {
                const objectConfig = obj.metadata;
                const localObjectConfig = objectql.getObjectConfig(objectConfig.name);
                if(localObjectConfig){
                    if(Creator.Objects[objectConfig.name]){
                        extend(localObjectConfig, {methods: Creator.Objects[objectConfig.name].methods})
                    }
                }
            });

            loadClientScripts()

            _.each(allObjects, function (obj) {
                const objectConfig = obj.metadata;
                const localObjectConfig = objectql.getObjectConfig(objectConfig.name);
                if (localObjectConfig)
                    extend(objectConfig, {triggers: localObjectConfig._baseTriggers})
                if (objectConfig.name != 'users')
                    Creator.loadObjects(objectConfig, objectConfig.name);
            });

            _.each(allDefautObjects, function (obj) {
                try {
                    const objectConfig = obj.metadata;
                    const _db = Creator.createCollection({name: objectConfig.name}); 
                    Creator.Collections[_db._name] = _db;
                } catch (error) {
                    console.error(error)
                }
            })

        } catch (error) {
            console.error(error)
        }
    }).promise();

}

const getClientBaseObject = () => {
    if( typeof Creator !== 'undefined'){
        let baseObject = JSON.stringify(Creator.baseObject, function (key, val) {
            if (typeof val === 'function') {
                return "$FS$" + val.toString().replace(/\"/g, "'")+"$FE$";
            }
            if(key === 'listeners'){
                return 'null';
            }
            return val;
        });
        let code = "Creator.baseObject=" + baseObject;
        code = code.replace(/"\$FS\$/g, "").replace(/\$FE\$"/g, "").replace(/'\$FS\$/g, "").replace(/\$FE\$'/g, "").replace(/\\r/g, "").replace(/\\n/g, "")
        code = code + ";\r\n";
        return code;
    }
}

export class Core {

    static run() {
        this.initPublishAPI()
        this.initCoreRoutes();
        this.initRouters();
    }

    transformTriggerWhen(triggerWhen: string){
        let when = triggerWhen;
        switch (triggerWhen) {
            case 'beforeInsert':
                when = 'before.insert'
                break;
            case 'beforeUpdate':
                when = 'before.update'
                break;
            case 'beforeDelete':
                when = 'before.delete'
                break;
            case 'afterInsert':
                when = 'after.insert'
                break;
            case 'afterUpdate':
                when = 'after.update'
                break;
            case 'afterDelete':
                when = 'after.delete'
                break;
            default:
                break;
        }
        return when
    }

    private static initPublishAPI() {
        Publish.init();
    }

    private static initCoreRoutes() {
        // /api/v4/users/login, /api/v4/users/validate
        app.use(steedosAuth.authExpress);
        // app.use(bootStrapExpress);
        app.use(exportExcelExpress);
        app.use(processExpress)
        app.use(coreExpress);

        let routers = objectql.getRouterConfigs()
        _.each(routers, (item)=>{
            app.use(item.prefix, item.router)
        })

        WebApp.connectHandlers.use(app);
    }

    private static initRouters(){
        let routers = objectql.getRouters()
        _.each(routers, (router)=>{
            if(router.router.default){
                routersApp.use('', router.router.default)
            }
        })
        WebApp.connectHandlers.use(routersApp);
    }
}

export const loadRouters = (routers)=>{
    _.each(routers, (router)=>{
        if(router.router.default){
            routersApp.use('', router.router.default)
        }
    })
    try {
        WebApp.connectHandlers.use(routersApp);
    } catch (error) {
        
    }
}

export const removeRouter = (path, methods)=>{
    routersApp._router?.stack.forEach(function(route,i,routes) {
        if (route.route && route.route.path === path) {
            if(JSON.stringify(route.route.methods) === JSON.stringify(methods)){
                routes.splice(i,1);
            }
        }
        if(route.handle.stack){
            route.handle.stack.forEach(function(_route,i,routes) {
                if (_route.route && _route.route.path === path) {
                    if(JSON.stringify(_route.route.methods) === JSON.stringify(methods)){
                        routes.splice(i,1);
                    }
                }
            });
        }
    });
}

// export const initPublic = () => {
//     const router = express.Router()

//     let publicPath = require.resolve("@steedos/webapp/package.json")
//     publicPath = publicPath.replace("package.json", 'build')
//     let routerPath = "/"
//     if(__meteor_runtime_config__.ROOT_URL_PATH_PREFIX){
//         routerPath = __meteor_runtime_config__.ROOT_URL_PATH_PREFIX
//     }
//     const cacheTime = 86400000*1; // one day
//     router.use(routerPath, express.static(publicPath, { maxAge: cacheTime }));
//     WebApp.rawConnectHandlers.use(router);
//     // WebApp.connectHandlers.use(router);
// }

export const initDesignSystem = () => {
    // const router = express.Router()

    // let dsPath = require.resolve("@salesforce-ux/design-system/package.json")
    // dsPath = dsPath.replace("package.json", 'assets')
    // let routerPath = "/assets/"
    // if (__meteor_runtime_config__ && __meteor_runtime_config__.ROOT_URL_PATH_PREFIX)
    //     routerPath = __meteor_runtime_config__.ROOT_URL_PATH_PREFIX + "/assets/";
    // const cacheTime = 86400000*1; // one day
    // router.use(routerPath, express.static(dsPath, { maxAge: cacheTime }));
    // WebApp.rawConnectHandlers.use(router);
}
