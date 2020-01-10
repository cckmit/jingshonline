/** 案由 **/
import request from '@/plugins/request'
import setting from '@/plugins/setting'

/**
 * 获取案由tree结构数据
 * @param {object} query
 */
export const getTree = (query) => {
  return request({
    url: `${setting.apiPrefix}/casereason/tree`,
    method: 'get',
    params: {
      input: query
    }
  })
}
/**
 * 根据ID获取某个案由详情
 * @param {number} id
 */
export const getInfo = id => {
  return request({
    url: `${setting.apiPrefix}/casereason/get/${id}`,
    method: 'get'
  })
}
