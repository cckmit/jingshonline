/** 地区 **/
import request from '@/plugins/request'
import setting from '@/plugins/setting'

/**
 * 获取地区tree结构数据
 * @param {object} query
 */
export const getTree = (query) => {
  return request({
    url: `${setting.apiPrefix}/region/tree`,
    method: 'get',
    params: {
      input: query
    }
  })
}
/**
 * 根据ID获取某个地区详情
 * @param {number} id
 */
export const getInfo = id => {
  return request({
    url: `${setting.apiPrefix}/region/get/${id}`,
    method: 'get'
  })
}
