// import cookie from './cookie'
export default ({ app }) => {
  app.router.beforeEach((to, from, next) => {
    // debugger
    // const token = cookie.get('token')
    // if (token) {
    //   next()
    // } else if (to.name.toLowerCase().indexOf('usercenter') !== -1) {
    //   location.href = '/Account/login'
    // } else {
    //   next()
    // }
    next()
  })

  app.router.afterEach((to, from) => {

  })
}
