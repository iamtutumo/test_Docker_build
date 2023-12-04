/*
 * @Author: sunhaolin@hotoa.com
 * @Date: 2022-06-23 15:17:20
 * @LastEditors: sunhaolin@hotoa.com
 * @LastEditTime: 2022-06-30 13:54:38
 * @Description: 
 */
const { isPlatformEnterPrise } = require('@steedos/license')

/**
 * 对象开启审计日志功能时校验许可证，是否是企业版，如不是企业版则提示
 * @param {string} spaceId 工作区ID/魔方ID
 */
async function checkIsEnterprise(triggerContext) {
    const { doc, spaceId } = triggerContext;
    if (doc.enable_audit) {
        const allow = await isPlatformEnterPrise(spaceId)
        if (!allow) {
            throw new Error(`Please purchase an Enterprise license to use the record field history feature.`);
        }
    }
}

module.exports = {
    listentTo: "objects",

    beforeInsert: async function () {
        await checkIsEnterprise(this)
    },

    beforeUpdate: async function () {
        await checkIsEnterprise(this)
    },

}