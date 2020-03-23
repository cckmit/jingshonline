import cookie from '@/plugins/cookie'
export default function({ store, error }) {
  if (cookie.get('token')) {
    error({
      message: 'You are not connected',
      statusCode: 403
    })
  }
}
