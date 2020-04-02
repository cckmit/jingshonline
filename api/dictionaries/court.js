/** 法院 **/
import request from '@/plugins/request'
import setting from '@/plugins/setting'

/**
 * 法院数据无参数
 */
export const get = () => {
  return request({
    url: `${setting.apiPrefix}/court/list`,
    method: 'get'
  })
}

/**
 * 法院数据
 * @param {*} query
 */
export const getData = (query) => {
  return request({
    url: `${setting.apiPrefix}/court/query`,
    method: 'post',
    data: {
      query: query
    }
  })
}

/**
 * 根据ID获取某个法院详情
 * @param {number} id
 */
export const getInfo = id => {
  return request({
    url: `${setting.apiPrefix}/court/get`,
    method: 'get',
    params: {
      input: id
    }
  })
}

/**
 * 获取法院级别
 */
export const courtLevel = () => {
  return request({
    url: `${setting.apiPrefix}/court/level`,
    method: 'get'
  })
}
