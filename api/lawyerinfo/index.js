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
    url: `${setting.apiPrefix}/customer/lawyer/follow/cancel`,
    method: 'delete',
    data: {
      lawyerId: lawyerId
    }
  })
}

/**
 * 律师常去法院
 * @param {number} lawyerId
 */

export const LawyerOftenCourt = lawyerId => {
  return request({
    url: `${setting.apiPrefix}/customer/lawyer/get/${lawyerId}`,
    method: 'get',
    data: {
      lawyerId: lawyerId
    }
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
