import request from '@/plugins/request'
import setting from '@/plugins/setting'

/**
 * OSS签名
 * @param {object} OSSData
 */
export const OssSignature = OSSData => {
  return request({
    url: `${setting.apiPrefix}/Oss/signature`,
    method: 'post',
    data: {
      input: OSSData
    }
  })
}
