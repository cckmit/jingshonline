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

