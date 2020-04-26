/** 案件 **/
import request from '@/plugins/request'
import setting from '@/plugins/setting'

/**
 * 添加案件
 * @param {object} caseData
 */
export const caseCreate = caseData => {
  return request({
    url: `${setting.apiPrefix}/lawyer/case/create`,
    method: 'post',
    data: {
      input: caseData
    }
  })
}

/**
 * 编辑案件
 * @param {object} caseData
 */
export const caseUpdate = caseData => {
  return request({
    url: `${setting.apiPrefix}/lawyer/case/update`,
    method: 'put',
    data: {
      input: caseData
    }
  })
}

/**
 * 删除案件
 * @param {number} caseId
 */
export const caseDelete = caseId => {
  return request({
    url: `${setting.apiPrefix}/lawyer/case/delete/${caseId}`,
    method: 'delete'
  })
}

/**
 * 查询案件
 * @param {object} query
 */
export const caseQuery = query => {
  return request({
    url: `${setting.apiPrefix}/lawyer/case/query`,
    method: 'post',
    data: {
      query
    }
  })
}

/**
 * 通过案件ID获取案件详情
 * @param {number} caseId
 */
export const caseInfo = caseId => {
  return request({
    url: `${setting.apiPrefix}/lawyer/case/get/${caseId}`,
    method: 'get'
  })
}
