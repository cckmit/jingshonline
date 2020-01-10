/* 工作经历 */

import request from '@/plugins/request'
import setting from '@/plugins/setting'

/**
 * 根据ID获取某个律师工作经历
 * @param {number} id
 */
export const getInfo = id => {
  return request({
    url: `${setting.apiPrefix}/lawyer/workexperience/get`,
    method: 'get',
    params: {
      input: id
    }
  })
}

/**
 * lawyer
 * 工作经历数据
 * @param {*} query
 */
export const getData = id => {
  return request({
    url: `${setting.apiPrefix}/lawyer/workexperience/list`,
    method: 'get',
    params: {
      lawyerId: id
    }
  })
}

/**
 * lawyer
 * 创建工作经历
 * @param {object} workexperienceData
 */
export const create = workexperienceData => {
  return request({
    url: `${setting.apiPrefix}/lawyer/workexperience/create`,
    method: 'post',
    data: {
      input: workexperienceData
    }
  })
}

/**
 * lawyer
 * 修改工作经历
 * @param {object} workexperienceData
 */
export const update = workexperienceData => {
  return request({
    url: `${setting.apiPrefix}/lawyer/workexperience/update`,
    method: 'put',
    data: {
      input: workexperienceData
    }
  })
}

/**
 * lawyer
 * 删除工作经历
 * @param {number} id
 */
export const remove = id => {
  return request({
    url: `${setting.apiPrefix}/lawyer/workexperience/delete/${id}`,
    method: 'delete'
  })
}
