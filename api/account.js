import request from '@/plugins/request'
import setting from '@/plugins/setting'

export const login = ({ account, password }) => {
  const data = { account, password }
  return request({
    url: 'api/oauth2/token',
    data: { 'input': data },
    headers: { 'x-terminal': setting.terminal },
    method: 'post'
  })
}

export const register = data => {
  return request({
    url: `${setting.apiPrefix}/account/register`,
    method: 'post',
    data: {
      input: data
    }
  })
}

export const getLoginUserInfo = () => {
  return request({
    url: `${setting.apiPrefix}/account/get/userinfo`,
    method: 'get'
  })
}
/**
 * 修改账号密码
 * @param {object} passwordData
 */
export const ChangePassword = passwordData => {
  return request({
    url: `${setting.apiPrefix}/account/changepassword`,
    method: 'put',
    data: {
      input: passwordData
    }
  })
}
/**
 * 修改邮箱
 * @param {object} emailData
 */
export const ChangeEmail = emailData => {
  return request({
    url: `${setting.apiPrefix}/account/changemail`,
    method: 'put',
    data: {
      input: emailData
    }
  })
}
/**
 * 修改手机号
 * @param {object} phoneData
 */
export const ChangePhone = phoneData => {
  return request({
    url: `${setting.apiPrefix}/account/changphone`,
    method: 'put',
    data: {
      input: phoneData
    }
  })
}
