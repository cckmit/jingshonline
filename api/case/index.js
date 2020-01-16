import request from '@/plugins/request'
import setting from '@/plugins/setting'

/**
 * 创建案件
 * @param {object} caseData
 */
export const adminCreate = caseData => {
  return request({
    url: `${setting.apiPrefix}/admin/case/create`,
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
export const adminUpdate = caseData => {
  return request({
    url: `${setting.apiPrefix}/admin/case/update`,
    method: 'put',
    data: {
      input: caseData
    }
  })
}

/**
 * 删除案件
 * @param {number} id
 */
export const adminDelete = id => {
  return request({
    url: `${setting.apiPrefix}/admin/case/delete/${id}`,
    method: 'delete'
  })
}

/**
 * 获取案件详情
 * @param {number} id
 */
export const adminGetInfo = id => {
  return request({
    url: `${setting.apiPrefix}/admin/case/get/${id}`,
    method: 'get'
  })
}

/**
 * 获取案件详情(查看)
 * @param {number} id
 */
export const adminGetInfoForLook = id => {
  return request({
    url: `${setting.apiPrefix}/admin/case/look/${id}`,
    method: 'get'
  })
}

/**
 * 获取案件列表
 * @param {object} query
 */
export const adminGetData = query => {
  return request({
    url: `${setting.apiPrefix}/admin/case/query`,
    method: 'post',
    data: {
      query: query
    }
  })
}

/**
 * 获取已删除案件列表
 * @param {*} query
 */
export const adminRecycleData = query => {
  return request({
    url: `${setting.apiPrefix}/admin/case/recycle/query`,
    method: 'post',
    data: {
      query: query
    }
  })
}

/**
 * 恢复案件
 * @param {number} id
 */
export const adminRecover = id => {
  return request({
    url: `${setting.apiPrefix}/admin/case/retrieve/${id}`,
    method: 'put'
  })
}

/**
 * 获取待审核案例列表
 * @param {object} query
 */
export const adminReviewQuery = query => {
  return request({
    url: `${setting.apiPrefix}/admin/case/review/query`,
    method: 'post',
    data: {
      query: query
    }
  })
}

/**
 * 审核案件
 * @param {object} reviewData
 */
export const adminReview = reviewData => {
  return request({
    url: `${setting.apiPrefix}/admin/case/audit`,
    method: 'put',
    data: {
      input: reviewData
    }
  })
}

/**
 * 通过裁判文书号检查是否已存在
 * @param {string} judgmentnumber
 */
export const adminCaseJudgmentnumber = judgmentnumber => {
  return request({
    url: `${setting.apiPrefix}/admin/case/get/judgmentnumber/{judgmentnumber}`,
    method: 'get',
    params: {
      judgmentNumber: judgmentnumber
    }
  })
}

/**
 * 获取案例tree结构数据
 * @param {object} query
 */
export const getCaseTree = (query) => {
  return request({
    url: `${setting.apiPrefix}/casereason/tree`,
    method: 'get',
    params: {
      input: query
    }
  })
}
/**
 * 获取地区tree结构数据
 * @param {object} query
 */
export const getRegionTree = (query) => {
  return request({
    url: `${setting.apiPrefix}/region/tree`,
    method: 'get',
    params: {
      input: query
    }
  })
}
/**
 * 获取法院等级tree结构数据
 * @param {object} query
 */
export const getCourtLevelTree = (query) => {
  return request({
    url: `${setting.apiPrefix}/practicearea/tree`,
    method: 'get',
    params: {
      input: query
    }
  })
}
/**
 * 获取案件列表
 * @param {object} query
 */
export const getCaseData = query => {
  return request({
    url: `${setting.apiPrefix}/admin/case/query`,
    method: 'post',
    data: {
      query: query
    }
  })
}
export default { adminCreate, adminUpdate, adminDelete, adminGetInfo, adminGetInfoForLook, adminGetData, adminRecycleData, adminRecover, adminReviewQuery, adminReview, adminCaseJudgmentnumber }
