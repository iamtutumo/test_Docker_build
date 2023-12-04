const _ = require('lodash');
const objectql = require('@steedos/objectql');
const auth = require('@steedos/auth');

 /**
  Convert the original default value formula expression into the new expression syntax. The original expression syntax is as follows:
  ==========
  - Get the value of a field: Use "{" and "}" (note that they are both half-width) to expand the field name, such as: {user.name}. Note that form field values ​​are not supported, such as {price}
  - System variables based on the current user: including name, role, department, etc.
  ID: {userId}
  Name: {user.name}
  Department (when the applicant belongs to multiple departments, the full path of the main department): {user.organization.fullname}
  Department (lowest level department name): {user.organization.name}
  Role name: {user.roles} is not supported. User.roles is written in userSession. In the formula engine, user points to space_users instead of userSession.
  Mobile: {user.mobile}
  Landline: {user.work_phone}
  Position: {user.position}
  - Get information about the current workspace
  ID: {spaceId}
  - Get the current time
  {now}
  - Double-layer curly brace syntax, only compatible with basic syntax, and the default value is ignored for complex ones.
  {{global.userId}}
  {{global.spaceId}}
  {{global.user.xxx}}
  {{global.now}}
  ===========
 * @param express 
 */
const getCompatibleDefaultValueExpression = (express) => {
    const regSingle = /^\{\w+(\.*\w+)*\}$/;//转换前端默认值语法{}包着的老语法，
    const regDouble = /^\{\{\w+(\.*\w+)*\}\}$/;//转换前端默认值语法{{}}包着的新语法
    // 需要注意的是公式引擎中$user指向的是当前用户的space_users记录而不是users记录。
    let result = express;
    if (regSingle.test(express)) {
        if (express.indexOf("userId") > -1) {
            result = "$user.user._id";
        }
        else if(express.indexOf("spaceId") > -1){
            result = "$user.space._id";
        }
        else if(express.indexOf("user.") > -1){
            result = express.replace("{user.", "$user.").replace("}", "");
        }
        else if(express.indexOf("now") > -1){
            result = "NOW()";
        }
        else {
            // 不支持的表达式直接跳过
            result = null;
        }
    }
    else if (regDouble.test(express)) {
        // 只支持有限的转换前端默认值语法{{}}包着的新语法，因为里面是js表达式，可能性太多，无法都支持转为公式引擎语法
        // 只支持兼容以下最基本的格式
        /*
        {{global.userId}}
        {{global.spaceId}}
        {{global.user.xxx}}
        {{global.now}}
        */
        if (express.indexOf("global.userId") > -1) {
            result = "$user.user._id";
        }
        else if(express.indexOf("global.spaceId") > -1){
            result = "$user.space._id";
        }
        else if(express.indexOf("global.user.") > -1){
            result = express.replace("{{global.user.", "$user.").replace("}}", "");
        }
        else if(express.indexOf("global.now") > -1){
            result = "NOW()";
        }
        else {
            // 不支持的表达式直接跳过
            result = null;
        }
    }
    return result;
}

const setDefaultValues = async function (doc, fields, userId, spaceId) {
    if (!userId) {
        return;
    }
    const userSession = await auth.getSessionByUserId(userId, spaceId);
    // console.log("==setDefaultValues=doc===", doc);
    let keys = _.keys(fields);
    // console.log("==setDefaultValues=keys===", keys);
    for (const key of keys) {
        if (/\./.test(key)) {
            // 不支持也不需要给grid/object字段加默认值
            continue;
        }
        if (!_.isNil(doc[key])) {
            // doc中字段已有值的话不加默认值
            continue;
        }
        const field = fields[key];
        let defaultValue = field.defaultValue;
        const fieldType = field.type;
        const valueType = typeof defaultValue;
        if (valueType === "boolean") {
            doc[field.name] = defaultValue;
        }
        else if (_.isArray(defaultValue)) {
            doc[field.name] = defaultValue;
        }
        else if (_.isNumber(defaultValue)) {
            if(!_.isNaN(defaultValue)){
                doc[field.name] = defaultValue;
            }
        }
        else if (valueType === "string") {
            if (defaultValue.length) {
                // 运行公式引擎
                // console.log("==setDefaultValues=defaultValue===2222=", defaultValue);
                defaultValue = getCompatibleDefaultValueExpression(defaultValue);
                // console.log("==setDefaultValues=defaultValue===333=", defaultValue);
                if(defaultValue){
                    defaultValue = await objectql.computeSimpleFormula(defaultValue, doc, userSession);
                    if(field.multiple && !_.isArray(defaultValue)){
                        defaultValue = defaultValue.split(',');
                    }
                    doc[field.name] = defaultValue;
                    // console.log("==setDefaultValues=doc[field.name]====", field.name, doc[field.name]);
                }
            }
            else {
                doc[field.name] = "";
            }
        }
    }
}

exports.beforeInsert = async function () {
    const { doc, userId, spaceId, object_name} = this;
    if (!userId) {
        return;
    }
    // console.log("===object_name==", object_name);
    const object = objectql.getObject(object_name);
    if (!object) {
        return;
    }
    const objectConfig = object.toConfig();
    // console.log("===fields=1==", objectConfig.fields);
    const fields = _.pickBy(objectConfig.fields, function (fieldItem) {
        return fieldItem.defaultValue;
    });
    // console.log("===fields=2==", fields);
    if (!_.isEmpty(fields)) {
        await setDefaultValues(doc, fields, userId, spaceId);
        // console.log("===before.insert=last==doc==", doc);
    }
}