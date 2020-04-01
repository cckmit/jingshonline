import utils from '../utils/index'
export default function({ route, req, res, redirect, error }) {
  const isClient = process.client
  const isServer = process.server
  let token = ''
  // 在服务端
  if (isServer) {
    const cookies = utils.getcookiesInServer(req)
    token = cookies['JingShOnline-token'] ? cookies['JingShOnline-token'] : ''
  }
  // 在客户端判读是否需要登陆
  if (isClient) {
    token = utils.getcookiesInClient('token')
  }
  if (!token) {
    error({
      message: 'You are not connected',
      statusCode: 403
    })
  }
}
