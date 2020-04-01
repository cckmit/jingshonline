export default function({ store, error }) {
  console.log(store.state.account.token)
  if (store.state.account.token === undefined) {
    error({
      message: 'You are not connected',
      statusCode: 403
    })
  }
}
