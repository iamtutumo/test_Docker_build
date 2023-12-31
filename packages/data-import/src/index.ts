import { DbManager } from '@steedos/metadata-api/lib/util/dbManager'
import { keyBy, isEmpty } from 'lodash'
import { getSteedosConfig } from '@steedos/objectql'
import ImportJson from './imports/ImportJson'
import ImportCsv from './imports/ImportCsv'
import ImportFlow from './imports/ImportFlow'

export async function getUserSession(): Promise<any> {
    var dbManager = new DbManager({});
    const now = new Date()
    try {
        await dbManager.connect();
        const space = await dbManager.findOne('spaces', {}, false);
        if (!space) {
            return;
        }
        const spaceOwner = space.owner;
        const spaceUser = await dbManager.findOne('space_users', { space: space._id, user: spaceOwner }, false);
        if (!spaceUser) {
            return;
        }
        return {
            spaceId: space._id,
            userId: spaceOwner,
            company_id: spaceUser.company_id,
            company_ids: spaceUser.company_ids
        };
    } catch (error) {
        console.error(error)
    } finally {
        await dbManager.endSession();
        await dbManager.close();
    }
}

/**
 * 如果库中没有collection则提前新建好
 * @param dbManager mongodb 数据库操作类
 * @param results 需要导入的数据
 */
export async function preCreateCollection(dbManager, results: readFileResult[]) {
    const db = dbManager.client.db()
    const collectionInfos = await db.listCollections({}, { nameOnly: true }).toArray()
    const collectionsMap = keyBy(collectionInfos, 'name')
    const config = getSteedosConfig()
    const datasourceConfig = config.datasources['default']
    const locale = datasourceConfig.locale || 'zh'
    const options = {
        'collation': { 'locale': locale },
    };
    for (const result of results) {
        const objectName = result.objectName
        if (!collectionsMap[objectName]) {
            await db.createCollection(objectName, options)
        }
    }
}

type readFileResult = {
    readonly objectName: string,
    readonly records: any[]
}

/**
 * 
 * @param {*} filePath 要导入数据的文件夹路径
 * @param {*} onlyInsert 仅导入，在导入数据之前先检查，如果存在任意一条记录，则不执行导入
 */
export async function importData(filePath: string, onlyInsert: boolean = true) {
    const userSession = await getUserSession()
    if (isEmpty(userSession)) {
        return;
    }
    const importer = {
        csv: new ImportCsv(userSession),
        json: new ImportJson(userSession),
        flow: new ImportFlow(userSession)
    }

    if (onlyInsert) {
        var dbManager = new DbManager(userSession);
        try {
            await dbManager.connect();
            //检查csv数据是否存在
            const csvData = await importer.csv.readFile(filePath);
            for (const result of csvData) {
                for (let record of result.records) {
                    const dbRecord = await dbManager.findOne(result.objectName, { _id: record._id }, true);
                    if (dbRecord) {
                        throw new Error(`停止导入数据：${result.objectName}对象的${record._id}记录已存在`);
                    }
                }
            }
            //检查json数据是否存在
            const jsonData = await importer.json.readFile(filePath);
            for (const result of jsonData) {
                for (let record of result.records) {
                    const dbRecord = await dbManager.findOne(result.objectName, { _id: record._id }, true);
                    if (dbRecord) {
                        throw new Error(`停止导入数据：${result.objectName}对象的${record._id}记录已存在`);
                    }
                }
            }
            //检查flow数据是否存在
            const flowData = await importer.flow.readFile(filePath);

            for (const formName in flowData) {
                var form = flowData[formName];

                let flowApiName = form.api_name

                if (flowApiName) {
                    let flow = await dbManager.findOneWithProjection('flows', { api_name: flowApiName }, { form: 1 })
                    if (flow) {
                        throw new Error(`停止导入数据：流程${flowApiName}已存在`);
                    }
                }
            }
        } catch (error) {
            console.info(error.message);
            return;
        } finally {
            await dbManager.endSession();
            await dbManager.close();
        }
    }
    importer.csv.fileRecordsToDB(filePath);
    importer.json.fileRecordsToDB(filePath);
    importer.flow.fileRecordsToDB(filePath);
}