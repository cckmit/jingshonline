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

/**
 * 创建地区
 * @param {object} regionData
 */
export const create = regionData => {
  return request({
    url: `${setting.apiPrefix}/region/create`,
    method: 'post',
    data: {
      input: regionData
    }
  })
}

/**
 * 修改地区
 * @param {object} regionData
 */
export const update = regionData => {
  return request({
    url: `${setting.apiPrefix}/region/update`,
    method: 'put',
    data: {
      input: regionData
    }
  })
}

/**
 * 删除地区
 * @param {number} id
 */
export const remove = id => {
  return request({
    url: `${setting.apiPrefix}/region/delete/${id}`,
    method: 'delete'
  })
}
