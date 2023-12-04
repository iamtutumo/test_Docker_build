import { SteedosListenerConfig, getObject, SteedosObjectTypeConfig } from '../types'
import { wrapAsync } from './index'
import _ = require("underscore");
import { SteedosTriggerContextConfig } from '../types/trigger';
import { TriggerActionParams } from '../ts-types';
const ENUM_WHEN = ['beforeFind', 'beforeInsert', 'beforeUpdate', 'beforeDelete', 'afterFind', 'afterCount', 'afterFindOne', 'afterInsert', 'afterUpdate', 'afterDelete']

function getBaseContext(object: SteedosObjectTypeConfig) {
    return {
        object_name: object.name,
        datasource_name: object.datasource,
        getObject
    }
}

function getTriggerWhen(when: string) {
    switch (when) {
        case 'beforeFind':
            return 'before.find';
        case 'beforeInsert':
            return 'before.insert';
        case 'beforeUpdate':
            return 'before.update';
        case 'beforeDelete':
            return 'before.remove';
        case 'afterFind':
            return 'after.find';
        case 'afterCount':
            return 'after.count'
        case 'afterFindOne':
            return 'after.findOne';
        case 'afterInsert':
            return 'after.insert';
        case 'afterUpdate':
            return 'after.update';
        case 'afterDelete':
            return 'after.remove';
        default:
            return when
    }
}

function transformListenerToTrigger(object: SteedosObjectTypeConfig, when: string, todo: Function, json) {
    let trigger: any = {
        on: 'server',
        when: getTriggerWhen(when),
        todo: transformTrigger(object, when, todo),
        metadataServiceName: json.metadataServiceName
    }

    if (json._id) {
        trigger._id = json._id
    }
    return trigger
}

function proxyBeforeFind(trigger: Function, baseContext) {
    return function (userId, selector, options) {
        return wrapAsync(trigger, Object.assign({ userId, spaceId: selector.space, selector, options }, baseContext));
    }
}

function proxyBeforeInsert(trigger: Function, baseContext) {
    return function (userId, doc) {
        return wrapAsync(trigger, Object.assign({ userId, spaceId: doc.space, doc }, baseContext));
    }
}

function proxyBeforeUpdate(trigger: Function, baseContext) {
    return function (userId, doc, fieldNames, modifier, options) {
        return wrapAsync(trigger, Object.assign({ userId: userId, spaceId: doc.space, id: doc._id, doc: modifier.$set, getObject: getObject }, baseContext))
    }
}

function proxyBeforeDelete(trigger: Function, baseContext) {
    return function (userId, doc) {
        return wrapAsync(trigger, Object.assign({ userId, spaceId: doc.space, id: doc._id }, baseContext))
    }
}

function proxyAfterFind(trigger: Function, baseContext) {
    return function (userId, doc) {
        return wrapAsync(trigger, Object.assign({ userId, spaceId: doc.space, id: doc._id }, baseContext))
    }
}
function proxyAfterCount(trigger: Function, baseContext) {
    return function (userId, doc) {
        return wrapAsync(trigger, Object.assign({ userId, spaceId: doc.space, id: doc._id }, baseContext))
    }
}

function proxyAfterFindOne(trigger: Function, baseContext) {
    return function (userId, doc) {
        return wrapAsync(trigger, Object.assign({ userId, spaceId: doc.space, id: doc._id }, baseContext))
    }
}

function proxyAfterInsert(trigger: Function, baseContext) {
    return function (userId, doc) {
        return wrapAsync(trigger, Object.assign({ userId, spaceId: doc.space, doc }, baseContext));
    }
}

function proxyAfterUpdate(trigger: Function, baseContext) {
    return function (userId, doc, fieldNames, modifier, options) {
        return wrapAsync(trigger, Object.assign({ userId: userId, spaceId: doc.space, id: doc._id, doc: modifier.$set, previousDoc: this.previous }, baseContext))
    }
}

function proxyAfterDelete(trigger: Function, baseContext) {
    return function (userId, doc) {
        return wrapAsync(trigger, Object.assign({ userId, spaceId: doc.space, id: doc._id, previousDoc: doc }, baseContext))
    }
}

function transformTrigger(object: SteedosObjectTypeConfig, when: string, trigger: Function) {
    if (trigger.length == 0) {
        let baseContext = getBaseContext(object);
        switch (when) {
            case 'beforeFind':
                return proxyBeforeFind(trigger, baseContext)
            case 'beforeInsert':
                return proxyBeforeInsert(trigger, baseContext)
            case 'beforeUpdate':
                return proxyBeforeUpdate(trigger, baseContext)
            case 'beforeDelete':
                return proxyBeforeDelete(trigger, baseContext)
            case 'afterFind':
                return proxyAfterFind(trigger, baseContext)
            case 'afterCount':
                return proxyAfterCount(trigger, baseContext)
            case 'afterFindOne':
                return proxyAfterFindOne(trigger, baseContext)
            case 'afterInsert':
                return proxyAfterInsert(trigger, baseContext)
            case 'afterUpdate':
                return proxyAfterUpdate(trigger, baseContext)
            case 'afterDelete':
                return proxyAfterDelete(trigger, baseContext)
            default:
                break;
        }
    }
    return trigger;
}

export function transformListenersToTriggers(object: SteedosObjectTypeConfig, json: SteedosListenerConfig) {
    let triggerPrefix = json.name
    let triggers = {}
    _.each(ENUM_WHEN, (_when) => {
        if (json[_when]) {
            triggers[`${triggerPrefix}_${_when}`] = transformListenerToTrigger(object, _when, json[_when], json)
        }
    })
    return triggers;
}

export function generateActionParams(when: string, context: SteedosTriggerContextConfig): TriggerActionParams {
    let params: TriggerActionParams = { objectName: context.objectName, isExecuting: true, userId: context.userId, spaceId: context.spaceId };
    switch (when) {
        case 'before.find':
            params.isBefore = true;
            params.operationType = 'BEFORE_FIND';
            break;
        case 'before.aggregate':
            params.isBefore = true;
            params.operationType = 'BEFORE_AGGREGATE';
            break;
        case 'before.insert':
            params.isBefore = true;
            params.isInsert = true;
            params.new = [context.doc];
            params.newMap = [context.id];
            params.operationType = 'BEFORE_INSERT';
            params.size = 1;
            break;
        case 'before.update':
            params.isBefore = true;
            params.isUpdate = true;
            params.new = [context.doc];
            params.newMap = [context.id];
            params.operationType = 'BEFORE_UPDATE';
            params.size = 1;
            break;
        case 'before.delete':
            params.isBefore = true;
            params.isDelete = true;
            params.old = [context.doc];
            params.oldMap = [context.id];
            params.operationType = 'BEFORE_DELETE';
            params.size = 1;
            break;
        case 'after.find':
            params.isAfter = true;
            params.operationType = 'AFTER_FIND';
            break;
        case 'after.aggregate':
            params.isAfter = true;
            params.operationType = 'AFTER_AGGREGATE';
            break;
        case 'after.count':
            params.isAfter = true;
            params.operationType = 'AFTER_COUNT';
            break;
        case 'after.findOne':
            params.isAfter = true;
            params.operationType = 'AFTER_FINDONE';
            break;
        case 'after.insert':
            params.isAfter = true;
            params.isInsert = true;
            params.new = [context.doc];
            params.newMap = [context.id];
            params.operationType = 'AFTER_INSERT';
            params.size = 1;
            break;
        case 'after.update':
            params.isAfter = true;
            params.isExecuting = true;
            params.new = [context.doc];
            params.newMap = [context.id];
            params.old = [context.previousDoc];
            params.oldMap = [context.id];
            params.operationType = 'AFTER_UPDATE';
            params.size = 1;
            break;
        case 'after.delete':
            params.isAfter = true;
            params.isDelete = true;
            params.old = [context.previousDoc];
            params.oldMap = [context.id];
            params.operationType = 'AFTER_DELETE';
            params.size = 1;
            break;
        default:
            break;
    }
    return params;
}