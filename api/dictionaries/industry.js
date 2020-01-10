/** 行业 **/
import request from '@/plugins/request'
import setting from '@/plugins/setting'

/**
 * 行业tree结构数据
 * @param {*} query
 */
export const getTree = (query) => {
  return request({
    url: `${setting.apiPrefix}/industry/tree`,
    method: 'get',
    params: {
      input: query
    }
  })
}

/**
 * 根据ID获取某个行业详情
 * @param {number} id
 */
export const getInfo = id => {
  return request({
    url: `${setting.apiPrefix}/industry/get/${id}`,
    method: 'get'
  })
}
