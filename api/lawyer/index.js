import request from '@/plugins/request'
import setting from '@/plugins/setting'

/**
 * 获取律师列表 无参数
 */
export const Get = () => {
  return request({
    url: `${setting.apiPrefix}/lawyer/query`,
    method: 'get'
  })
}

/**
 * 获取律师列表
 * @param {object} query
 */
export const GetData = query => {
  return request({
    url: `${setting.apiPrefix}/lawyer/query`,
    method: 'post',
    data: {
      query: query
    }
  })
}

/**
 * 获取律师详情
 * @param {number} id
 */
export const GetInfo = id => {
  return request({
    url: `${setting.apiPrefix}/lawyer/getinfobyid/${id}`,
    method: 'get'
  })
}

/**
 * 修改律师擅长行业、领域
 * @param {object} knowledgeData
 */
export const ChangeKnowledge = knowledgeData => {
  return request({
    url: `${setting.apiPrefix}/lawyer/knowledge/update`,
    method: 'post',
    data: {
      input: knowledgeData
    }
  })
}

/**
 * 修改律师账号密码
 * @param {object} passwordData
 */
export const ChangePassword = passwordData => {
  return request({
    url: `${setting.apiPrefix}/lawyer/changepassword`,
    method: 'put',
    data: {
      input: passwordData
    }
  })
}
