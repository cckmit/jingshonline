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
 * 根据法院等级获取法院法院所有的地区信息
 * @param {object} query
 */
export const getCourtRegions = courtLevel => {
  return request({
    url: `${setting.apiPrefix}/court/regions`,
    method: 'post',
    data: {
      input: { courtLevel: courtLevel }
    }
  })
}
/**
 * 根据法院等级获取法院法院获取该某个地区区域的子节点
 * @param {object} query
 */
export const getCourtRegionsChild = regionId => {
  return request({
    url: `${setting.apiPrefix}/court/region/children`,
    method: 'post',
    data: {
      input: { regionId: regionId }
    }
  })
}
