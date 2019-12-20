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
