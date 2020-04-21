import request from '@/plugins/request'
import setting from '@/plugins/setting'

/**
 * 获取律师列表 无参数
 */
export const Get = () => {
  return request({
    url: `${setting.apiPrefix}/lawyer/query`,
    method: 'get'
  })
}

/**
 * 获取律师列表
 * @param {object} query
 */
export const GetData = query => {
  return request({
    url: `${setting.apiPrefix}/customer/lawyer/query`,
    method: 'post',
    data: {
      query: query
    }
  })
}

/**
 * 获取律师详情
 * @param {number} id
 */
export const GetInfo = id => {
  return request({
    url: `${setting.apiPrefix}/lawyer/getinfobyid/${id}`,
    method: 'get'
  })
}

/**
 * 修改律师擅长行业、领域
 * @param {object} knowledgeData
 */
export const ChangeKnowledge = knowledgeData => {
  return request({
    url: `${setting.apiPrefix}/lawyer/knowledge/update`,
    method: 'post',
    data: {
      input: knowledgeData
    }
  })
}

/**
 * 修改律师账号密码
 * @param {object} passwordData
 */
export const ChangePassword = passwordData => {
  return request({
    url: `${setting.apiPrefix}/lawyer/changepassword`,
    method: 'put',
    data: {
      input: passwordData
    }
  })
}
/**
 * 收藏律师
 * @param {number} lawyerId
 */
export const collecteData = lawyerId => {
  return request({
    url: `${setting.apiPrefix}/customer/lawyer/follow/${lawyerId}`,
    method: 'post'
  })
}
/**
 * 取消收藏律师
 * @param {number} lawyerId
 */
export const uncollecteData = lawyerId => {
  return request({
    url: `${setting.apiPrefix}/customer/lawyer/unfollow/${lawyerId}`,
    method: 'delete'
  })
}

/**
 * 律师认证
 * @param {Object} lawyerData
 */
export const certify = lawyerData => {
  return request({
    url: `${setting.apiPrefix}/lawyer/certify`,
    method: 'post',
    data: {
      input: lawyerData
    }
  })
}

/**
 * 根据lawyerID获取律师认证信息
 * @param {Number} lawyerId
 */
export const getCertifyInfo = lawyerId => {
  return request({
    url: `${setting.apiPrefix}/lawyer/certifyinfo/get/${lawyerId}`,
    method: 'get'
  })
}

/**
 * 律师创建案例
 * @param {Object} caseData
 */
export const lawyerCaseCreate = caseData => {
  return request({
    url: `${setting.apiPrefix}/lawyer/case/create`,
    method: 'post',
    data: {
      input: caseData
    }
  })
}

/**
 * 律师编辑案例
 * @param {Object} caseData
 */
export const lawyerCaseUpdate = caseData => {
  return request({
    url: `${setting.apiPrefix}/lawyer/case/update`,
    method: 'put',
    data: {
      input: caseData
    }
  })
}

/**
 * 律师删除案例
 * @param {Number} caseId
 */
export const lawyerCaseDelect = caseId => {
  return request({
    url: `${setting.apiPrefix}/lawyer/case/delete/${caseId}`,
    method: 'delete'
  })
}

/**
 * 律师查询案例
 * @param {Object} query
 */
export const lawyerCaseQuery = query => {
  return request({
    url: `${setting.apiPrefix}/lawyer/case/query`,
    method: 'post',
    data: {
      query: query
    }
  })
}

/**
 * 律师查询案例
 * @param {Number} caseId
 */
export const lawyerGetCaseInfo = caseId => {
  return request({
    url: `${setting.apiPrefix}/lawyer/case/get/${caseId}`,
    method: 'get'
  })
}
