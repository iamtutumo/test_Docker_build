/*
 * @Author: sunhaolin@hotoa.com
 * @Date: 2022-05-28 11:07:57
 * @LastEditors: sunhaolin@hotoa.com
 * @LastEditTime: 2022-08-10 15:09:37
 * @Description: 
 */
const { afterInsertAutoNumber } = require('./autonumberTirggerHelper')

module.exports = {
    listenTo: 'base',
    afterInsert: async function () {
        return await afterInsertAutoNumber.apply(this, arguments)
    }
}