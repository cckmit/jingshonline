/* 学术成果 */
import request from '@/plugins/request'
import setting from '@/plugins/setting'

/**
 * 根据ID获取某个律师学术成果
 * @param {number} id
 */
export const getInfo = id => {
  return request({
    url: `${setting.apiPrefix}/lawyer/academic/get`,
    method: 'get',
    params: {
      input: id
    }
  })
}

/**
 * lawyer
 * 学术成果数据
 * @param {*} query
 */
export const getData = id => {
  return request({
    url: `${setting.apiPrefix}/lawyer/academic/list`,
    method: 'get',
    params: {
      lawyerId: id
    }
  })
}

/**
 * lawyer
 * 创建学术成果
 * @param {object} academicData
 */
export const create = academicData => {
  return request({
    url: `${setting.apiPrefix}/lawyer/academic/create`,
    method: 'post',
    data: {
      input: academicData
    }
  })
}

/**
 * lawyer
 * 修改学术成果
 * @param {object} academicData
 */
export const update = academicData => {
  return request({
    url: `${setting.apiPrefix}/lawyer/academic/update`,
    method: 'put',
    data: {
      input: academicData
    }
  })
}

/**
 * 删除学术成果
 * @param {number} id
 */

export const remove = id => {
  return request({
    url: `${setting.apiPrefix}/lawyer/academic/delete/${id}`,
    method: 'delete'
  })
}
