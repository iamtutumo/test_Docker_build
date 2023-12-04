/*
 * @Author: sunhaolin@hotoa.com
 * @Date: 2022-07-01 14:07:26
 * @LastEditors: sunhaolin@hotoa.com
 * @LastEditTime: 2022-07-01 14:57:56
 * @Description: 
 */
'use strict'

const { isPlatformEnterPrise } = require('@steedos/license')
const LOGO_FIELDS = ['account_logo', 'avatar_dark', 'avatar_square', 'avatar', 'background', 'favicon']

/**
 * Only the enterprise version can change the logo
 * @param {*} triggerContext 
 */
async function checkIsEnterprise(triggerContext) {
    const { doc, spaceId } = triggerContext;
    if (spaceId) {
        let needToCheck = false
        for (const fieldName of LOGO_FIELDS) {
            if (doc[fieldName]) {
                needToCheck = true
                break
            }
        }
        if (needToCheck) {
            const allow = await isPlatformEnterPrise(spaceId)
            if (!allow) {
                throw new Error('need_platform_enterprise');
            }
        }
    }
}

module.exports = {
    checkIsEnterprise
}