import { login, getLoginUserInfo } from '@/api/account'
import cookie from '@/plugins/cookie'

export const state = () => ({
  token: cookie.get('token'),
  name: '',
  avatar: '',
  introduction: '',
  roles: []
})
export const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_REAL_NAME: (state, realName) => {
    state.realName = realName
  },

  // user login
  login({ commit }, userInfo) {
    const { account, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ account: account.trim(), password: password })
        .then(response => {
          const { data } = response
          commit('SET_TOKEN', data)
          cookie.set('token', data)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      commit('SET_NAME', '')
      commit('SET_REAL_NAME', '')
      cookie.remove() // 移除token
      // resetRouter() // 重置路由
      dispatch('tagsView/delAllViews', null, { root: true }) // 移除所有选项卡
      resolve()
    })
  },
  // get user info
  getLoginUserInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getLoginUserInfo()
        .then(response => {
          const { data } = response
          if (!data) {
            reject('获取登录用户信息失败,请重新登录')
          }
          const { userName, realName } = data
          commit('SET_NAME', userName)
          commit('SET_REAL_NAME', realName)
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      cookie.remove()
      resolve()
    })
  }
}
