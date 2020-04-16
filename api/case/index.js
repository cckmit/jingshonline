/** 案件 **/
import request from '@/plugins/request'
import setting from '@/plugins/setting'

export const searchCase = searchKey => {
  return request({
    url: `${setting.apiPrefix}/customer/case/conditions`,
    method: 'post',
    data: {
      query: {
        searchKey
      }
    }
  })
}

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

/**
 * 收藏
 * @param {number} caseId
 */
export const caseFollow = caseId => {
  return request({
    url: `${setting.apiPrefix}/customer/case/follow/${caseId}`,
    method: 'post'
  })
}

/**
 * 取消收藏
 * @param {number} caseId
 */
export const caseUnfollow = caseId => {
  return request({
    url: `${setting.apiPrefix}/customer/case/unfollow/${caseId}`,
    method: 'post'
  })
}

/**
 * 案例浏览
 * @param {number} caseId
 */
export const caseClick = caseId => {
  return request({
    url: `${setting.apiPrefix}/customer/case/click/${caseId}`,
    method: 'post'
  })
}

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
