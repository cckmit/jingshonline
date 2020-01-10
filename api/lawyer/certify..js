/* 认证 */
import request from '@/plugins/request'
import setting from '@/plugins/setting'

/**
 * 认证数据无参数
 */
export const get = () => {
  return request({
    url: `${setting.apiPrefix}/lawyer/certify/getlist`,
    method: 'get'
  })
}

