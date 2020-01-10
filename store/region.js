import * as Region from '@/api/dictionaries/region'

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
  },
  /**
   * 获取地区详情
   * @param {commit} param0
   * @param {number} id
   */
  getRegionInfo({ commit }, id) {
    return new Promise((resolve, reject) => {
      Region.getInfo(id).then(response => {
        const { data } = response
        resolve(data)
      })
        .catch(error => {
          reject(error)
        })
    })
  }
}
