import Vue from 'vue'
import Cookies from 'js-cookie'
import setting from './setting'

const cookies = {
  /**
   * @description 存储 cookie 值
   * @param {String} name cookie name
   * @param {String} value cookie value
   * @param {Object} setting cookie setting
   */
  set: (name, value, cookieSetting = {}) => {
    const currentCookieSetting = {}
    Object.assign(currentCookieSetting, cookieSetting)
    Cookies.set(`${setting.cookiePrefix}-${name}`, value, currentCookieSetting)
  },
  /**
   * @description 拿到 cookie 值
   * @param {String} name cookie name
   */
  get: name => {
    return Cookies.get(`${setting.cookiePrefix}-${name}`)
  },
  /**
   * @description 拿到 cookie 全部的值
   */
  getAll: () => {
    return Cookies.get()
  },

  /**
   * @description 删除 cookie
   * @param {String} name cookie name
   */
  remove: name => {
    return Cookies.remove(`${setting.cookiePrefix}-${name}`)
  },
  /**
   * 获取服务端cookie
   * @param {*} req
   */
  getcookiesInServer: function(req) {
    const service_cookie = {}
    req && req.headers.cookie && req.headers.cookie.split(';').forEach(function(val) {
      const parts = val.split('=')
      service_cookie[parts[0].trim()] = (parts[1] || '').trim()
    })
    return service_cookie
  }
}

export default cookies

Vue.prototype.$cookie = cookies // 引入组件（将echarts注册为全局）
