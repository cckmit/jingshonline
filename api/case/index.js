/** 案件 **/
import request from '@/plugins/request'
import setting from '@/plugins/setting'

/**
 * 获取案件列表
 * @param {object} query
 */
export const getCaseList = query => {
  return request({
    url: `${setting.apiPrefix}/customer/case/query`,
    method: 'post',
    data: {
      query: query
    }
  })
}
/**
 * 获取案件详情
 * @param {number} caseId
 */
export const getCaseInfo = caseId => {
  return request({
    url: `${setting.apiPrefix}/customer/case/get/${caseId}`,
    method: 'get'
  })
}
