import request from '@/plugins/request'
import setting from '@/plugins/setting'

/**
 * 根据ID获取某个律师简历详情
 * @param {number} id
 */
export const getInfo = id => {
  return request({
    url: `${setting.apiPrefix}/admin/lawyer/abundant/get/${id}`,
    method: 'get'
  })
}

/**
 * 审核简历
 * @param {object} auditData
 */
export const audit = auditData => {
  return request({
    url: `${setting.apiPrefix}/admin/lawyer/resume/audit`,
    method: 'put',
    params: {
      input: auditData
    }
  })
}
