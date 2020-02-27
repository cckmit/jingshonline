import request from '@/plugins/request'
import setting from '@/plugins/setting'

/**
 * 获取对应律师认证案例列表
 * @param {object} query
 */
export const GetLawyerCaseList = query => {
  return request({
    url: `${setting.apiPrefix}/customer/case/query`,
    method: 'post',
    data: {
      query: query
    }
  })
}

/**
 * 用户关注律师
 * @param {number} lawyerId
 */
export const UserFollow = lawyerId => {
  return request({
    url: `${setting.apiPrefix}/customer/lawyer/follow`,
    method: 'post',
    data: {
      lawyerId: lawyerId
    }
  })
}

/**
 * 用户取消关注律师
 * @param {number} lawyerId
 */

export const UserCancleFollow = lawyerId => {
  return request({
    url: `${setting.apiPrefix}/customer/lawyer/unfollow/${lawyerId}`,
    method: 'delete'
  })
}

/**
 * 律师基础信息
 * @param {number} lawyerId
 */

export const GetLawyerInfo = lawyerId => {
  return request({
    url: `${setting.apiPrefix}/customer/lawyer/get/${lawyerId}`,
    method: 'get'
  })
}

/**
 * 获取律师简历信息
 * @param {number} lawyerId
 */

export const GetLawyerResume = lawyerId => {
  return request({
    url: `${setting.apiPrefix}/customer/lawyer/resume/get`,
    method: 'get',
    data: {
      lawyerId: lawyerId
    }
  })
}

/**
 * 用户收藏律师案例列表案例
 * @param {number} caseId
 */

export const UserFollowCase = caseId => {
  return request({
    url: `${setting.apiPrefix}/customer/case/follow/${caseId}`,
    method: 'post'
  })
}
