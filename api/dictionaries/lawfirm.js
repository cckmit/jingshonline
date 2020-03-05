/** 律所 **/
import request from '@/plugins/request'
import setting from '@/plugins/setting'

/**
 * 律所数据无参数
 * @param {object} query
 */
export const get = query => {
  return request({
    url: `${setting.apiPrefix}/lawfirm/list`,
    method: 'post',
    data: {
      query: query
    }
  })
}

/**
 * 律所数据
 * @param {*} query
 */
export const getData = query => {
  return request({
    url: `${setting.apiPrefix}/lawfirm/query`,
    method: 'post',
    data: {
      query: query
    }
  })
}

/**
 * 根据ID获取某个律所详情
 * @param {number} id
 */
export const getInfo = id => {
  return request({
    url: `${setting.apiPrefix}/lawfirm/get/${id}`,
    method: 'get'
  })
}
