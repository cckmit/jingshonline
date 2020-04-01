import * as account from '@/api/account'
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
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}
export const actions = {
  // user login
  Login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      account.login(userInfo).then(response => {
        const { data } = response
        commit('SET_TOKEN', data)
        cookie.set('token', data)
        resolve(data)
      })
        .catch(error => {
          reject(error)
        })
    })
  },

  /**
   * user register
   * @param {commit} commit
   * @param {object} register
   */
  Register({ commit }, register) {
    return new Promise((resolve, reject) => {
      account.register(register).then(response => {
        const { data } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  /**
   * user logout
   * @param {*} param0
   */
  Logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      commit('SET_NAME', '')
      commit('SET_REAL_NAME', '')
      commit('SET_AVATAR', '')
      cookie.remove('token') // 移除token
      // resetRouter() // 重置路由
      resolve()
    })
  },

  // get user info
  GetLoginUserInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      account.getLoginUserInfo()
        .then(response => {
          const { data } = response
          if (!data) {
            reject('获取登录用户信息失败,请重新登录')
          }
          const { userName, realName, avatar } = data
          commit('SET_TOKEN', cookie.get('token'))
          commit('SET_NAME', userName)
          commit('SET_REAL_NAME', realName)
          commit('SET_AVATAR', avatar)
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // remove token
  ResetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      cookie.remove()
      resolve()
    })
  }
}
