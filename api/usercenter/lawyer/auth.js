/* 律师认证 */
import request from '@/plugins/request'
import setting from '@/plugins/setting'

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
