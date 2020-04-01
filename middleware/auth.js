import cookie from '@/plugins/cookie'
import setting from '@/plugins/setting'
export default function({ req, error }) {
  const cookies = cookie.getcookiesInServer(req)
  const token = cookies[`${setting.cookiePrefix}-token`] || cookie.get('token')
  if (!token) {
    error({
      message: 'You are not connected',
      statusCode: 403
    })
  }
}
