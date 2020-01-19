export default function({ store, error }) {
  if (!store.state.account.token) {
    error({
      message: 'You are not connected',
      statusCode: 403
    })
  }
}
