const objectql = require('@steedos/objectql');
const isAPIName = function(apiName){
    var reg = new RegExp('^[a-z]([a-z0-9]|_(?!_))*[a-z0-9]$');
    if(!reg.test(apiName)){
        throw new Error("API names can only contain lowercase letters, numbers, must start with a letter, cannot end with an underscore character, or contain two consecutive underscore characters.");
    }
    if(apiName.length > 50){
        throw new Error("Name length cannot be greater than 50 characters");
    }
    return true
}

exports.checkAPIName = async function(objectName, fieldName, fieldValue, recordId, filters){
    isAPIName(fieldValue);
    if(!filters){
        filters = []
    }
    filters.push([fieldName,'=', fieldValue])
    if(recordId){
        filters.push(['_id','!=', recordId])
    }

    var count = await objectql.getObject(objectName).count({filters: filters});

    if(count > 0){
        throw new Error('The API name already exists or has been used previously. Please choose a different name.');
    }
}