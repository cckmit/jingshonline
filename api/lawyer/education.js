/* 教育经历 */
import request from '@/plugins/request'
import setting from '@/plugins/setting'

/**
 * 根据ID获取教育经历
 * @param {number} id
 */
export const getInfo = id => {
  return request({
    url: `${setting.apiPrefix}/lawyer/education/get/${id}`,
    method: 'get'
  })
}

/**
 * lawyer
 * 根据ID获取某个律师教育经历
 * @param {*} query
 */
export const getData = id => {
  return request({
    url: `${setting.apiPrefix}/lawyer/education/list?lawyerId=${id}`,
    method: 'get'
  })
}

/**
 * lawyer
 * 创建教育经历
 * @param {object} educationData
 */
export const create = educationData => {
  return request({
    url: `${setting.apiPrefix}/lawyer/education/create`,
    method: 'post',
    data: {
      input: educationData
    }
  })
}

/**
 * lawyer
 * 修改教育经历
 * @param {object} educationData
 */
export const update = educationData => {
  return request({
    url: `${setting.apiPrefix}/lawyer/education/update`,
    method: 'put',
    data: {
      input: educationData
    }
  })
}

/**
 * 删除教育经历
 * @param {number} id
 */

export const remove = id => {
  return request({
    url: `${setting.apiPrefix}/lawyer/education/delete/${id}`,
    method: 'delete'
  })
}
