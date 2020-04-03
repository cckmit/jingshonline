import * as Industry from '@/api/dictionaries/industry'
export const state = () => ({
  industryData: []
})
export const mutations = {
  SET_INDUSTRY_DATA: (state, data) => {
    state.industryData = data
  }
}

export const actions = {
  /**
   * 获取行业数据
   * @param {commit} param0
   * @param {object} query
   */
  getIndustryTreeData({ commit }, query) {
    return new Promise((resolve, reject) => {
      Industry.getTree(query).then(response => {
        const { data } = response
        commit('SET_INDUSTRY_DATA', data)
        resolve(data)
      })
        .catch(error => {
          reject(error)
        })
    })
  },
  /**
   * 获取行业详情
   * @param {commit} param0
   * @param {number} id
   */
  getIndustryInfo({ commit }, id) {
    return new Promise((resolve, reject) => {
      Industry.getInfo(id).then(response => {
        const { data } = response
        resolve(data)
      })
        .catch(error => {
          reject(error)
        })
    })
  }
}

