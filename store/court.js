import * as Court from '@/api/dictionaries/court'
export const state = () => ({
  courtLevel: []
})

export const mutations = {
  SET_COURT_LEVEL: (state, data) => {
    state.courtLevel = data
  }
}
export const actions = {
  /**
   * 获取法院数据无参数查询
   * @param {commit} param0
   */
  getCourt({ commit }) {
    return new Promise((resolve, reject) => {
      Court.get().then(response => {
        const { data } = response
        resolve(data)
      })
        .catch(error => {
          reject(error)
        })
    })
  },
  /**
   * 获取法院数据
   * @param {commit} param0
   * @param {object} query
   */
  getCourtData({ commit }, query) {
    return new Promise((resolve, reject) => {
      Court.getData(query).then(response => {
        const { data } = response
        resolve(data)
      })
        .catch(error => {
          reject(error)
        })
    })
  },
  /**
   * 获取法院详情
   * @param {commit} param0
   * @param {number} id
   */
  getCourtInfo({ commit }, id) {
    return new Promise((resolve, reject) => {
      Court.getInfo(id).then(response => {
        const { data } = response
        resolve(data)
      })
        .catch(error => {
          reject(error)
        })
    })
  },
  /**
   * 获取法院级别
   * @param {commit} param0
   */
  getCourtLevel({ commit }) {
    return new Promise((resolve, reject) => {
      Court.courtLevel().then(response => {
        const { data } = response
        commit('SET_COURT_LEVEL', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
