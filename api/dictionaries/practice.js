/** 领域 **/
import request from '@/plugins/request'
import setting from '@/plugins/setting'

/**
 * 获取领域tree结构数据
 * @param {object} query
 */
export const getTree = (query) => {
  return request({
    url: `${setting.apiPrefix}/practicearea/tree`,
    method: 'get',
    params: {
      input: query
    }
  })
}

/**
 * 根据传入type 值获取对应领域 tree 结构数据
 * @param {number} type
 */
export const getTreeOfType = (type) => {
  return request({
    url: `${setting.apiPrefix}/practicearea/tree/${type}`,
    method: 'get'
  })
}

/**
 * 根据ID获取某个领域详情
 * @param {number} id
 */
export const getInfo = id => {
  return request({
    url: `${setting.apiPrefix}/practicearea/get/${id}`,
    method: 'get'
  })
}
