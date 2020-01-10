/* 行业资质 */
import request from '@/plugins/request'
import setting from '@/plugins/setting'

/**
 * 根据ID获取某个律师行业资质
 * @param {number} id
 */
export const getInfo = id => {
  return request({
    url: `${setting.apiPrefix}/lawyer/certificate/get`,
    method: 'get',
    params: {
      input: id
    }
  })
}

/**
 * lawyer
 * 行业资质数据
 * @param {*} query
 */
export const getData = id => {
  return request({
    url: `${setting.apiPrefix}/lawyer/certificate/list`,
    method: 'get',
    params: {
      lawyerId: id
    }
  })
}

/**
 * lawyer
 * 创建行业资质
 * @param {object} certificateData
 */
export const create = certificateData => {
  return request({
    url: `${setting.apiPrefix}/lawyer/certificate/create`,
    method: 'post',
    data: {
      input: certificateData
    }
  })
}

/**
 * lawyer
 * 修改行业资质
 * @param {object} certificateData
 */
export const update = certificateData => {
  return request({
    url: `${setting.apiPrefix}/lawyer/certificate/update`,
    method: 'put',
    data: {
      input: certificateData
    }
  })
}

/**
 * 删除行业资质
 * @param {number} id
 */
export const remove = id => {
  return request({
    url: `${setting.apiPrefix}/lawyer/certificate/delete/${id}`,
    method: 'delete'
  })
}
