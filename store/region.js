import * as Region from '@/api/region'

export const state = () => ({
  // token: cookie.get('token'),
  regionTreeData: []
})

export const mutations = {
  regionData(state, value) {
    state.regionTreeData = value
  }
}

export const actions = {
  /**
   * 获取地区数据
   * @param {commit} param0
   * @param {object} query
   */
  async getRegionTreeData({ commit }, query) {
    return new Promise((resolve, reject) => {
      Region.getTree(query).then(response => {
        const { data } = response
        commit('regionData', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
