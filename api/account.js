import request from '@/plugins/request'
import setting from '@/plugins/setting'

export const login = ({
  account,
  password
}) => {
  const data = {
    account,
    password
  }
  return request({
    url: 'api/oauth2/token',
    data: { 'input': data },
    headers: { 'x-terminal': setting.terminal },
    method: 'post'
  })
}

export const getLoginUserInfo = () => {
  return request({
    url: `${setting.apiPrefix}/region/tree`,
    method: 'get'
  })
}
