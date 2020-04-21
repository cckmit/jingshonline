import * as Casereason from '@/api/dictionaries/casereason'
import utils from '@/utils'

export const state = () => ({
  casereasonTreeData: [],
  casereasonTreeDataForAntd: []
})
export const mutations = {
  SET_CASE_REASION_TREE_DATA: (state, data) => {
    state.casereasonTreeData = data
    state.casereasonTreeDataForAntd = utils.formatTreeDataForAntd(data)
  }
}

export const actions = {
  /**
   * 获取案由数据
   * @param {commit} param0
   * @param {object} query
   */
  getCasereasonTreeData({ commit }, query) {
    return new Promise((resolve, reject) => {
      Casereason.getTree(query).then(response => {
        const { data } = response
        commit('SET_CASE_REASION_TREE_DATA', data)
        resolve(data)
      })
        .catch(error => {
          reject(error)
        })
    })
  },
  /**
   * 获取案由详情
   * @param {commit} param0
   * @param {number} id
   */
  getCasereasonInfo({ commit }, id) {
    return new Promise((resolve, reject) => {
      Casereason.getInfo(id).then(response => {
        const { data } = response
        resolve(data)
      })
        .catch(error => {
          reject(error)
        })
    })
  }
}
