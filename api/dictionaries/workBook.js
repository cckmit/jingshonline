/** 字典 **/
import request from '@/plugins/request'
import setting from '@/plugins/setting'

/**
 * 字典结构数据
 * @param {*} query
 */
export const getData = query => {
  return request({
    url: `${setting.apiPrefix}/wordbook/query`,
    method: 'post',
    data: {
      query: query
    }
  })
}

/**
 * 字典项数据
 * @param {number} id
 */
export const getinfoData = id => {
  return request({
    url: `${setting.apiPrefix}/wordbook/items/id/${id}`,
    method: 'get'
  })
}

