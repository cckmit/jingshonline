/* 社会职务 */

import request from '@/plugins/request'
import setting from '@/plugins/setting'

/**
 * 根据ID获取某个律师社会职务
 * @param {number} id
 */
export const getInfo = id => {
  return request({
    url: `${setting.apiPrefix}/lawyer/socialposition/get`,
    method: 'get',
    params: {
      input: id
    }
  })
}

/**
 * lawyer
 * 社会职务数据
 * @param {*} query
 */
export const getData = id => {
  return request({
    url: `${setting.apiPrefix}/lawyer/socialposition/list`,
    method: 'get',
    params: {
      lawyerId: id
    }
  })
}

/**
 * lawyer
 * 创建社会职务
 * @param {object} socialpositionData
 */
export const create = socialpositionData => {
  return request({
    url: `${setting.apiPrefix}/lawyer/socialposition/create`,
    method: 'post',
    data: {
      input: socialpositionData
    }
  })
}

/**
 * lawyer
 * 修改社会职务
 * @param {object} socialpositionData
 */
export const update = socialpositionData => {
  return request({
    url: `${setting.apiPrefix}/lawyer/socialposition/update`,
    method: 'put',
    data: {
      input: socialpositionData
    }
  })
}

/**
 * 删除社会职务
 * @param {number} id
 */
export const remove = id => {
  return request({
    url: `${setting.apiPrefix}/lawyer/socialposition/delete/${id}`,
    method: 'delete'
  })
}
