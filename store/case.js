import * as Case from '@/api/case/index'

export const actions = {

  /**
   * 获取案件列表
   * @param {commit} commit
   * @param {string} query
   */
  getCaseListData({ commit }, query) {
    return new Promise((resolve, reject) => {
      Case.getCaseList(query)
        .then(response => {
          const {
            data
          } = response
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  /**
   * 获取案件详情
   * @param {commit} commit
   * @param {number} id
   */
  getCaseInfoData({ commit }, id) {
    return new Promise((resolve, reject) => {
      Case.getCaseInfo(id).then(response => {
        const { data } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  /**
   * 收藏
   * @param {commit} commit
   * @param {string} query
   */
  getFollowData({ commit }, query) {
    return new Promise((resolve, reject) => {
      Case.getFollow(query)
        .then(response => {
          const {
            data
          } = response
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  /**
   * 收藏
   * @param {commit} commit
   * @param {string} query
   */
  getUnfollowData({ commit }, query) {
    return new Promise((resolve, reject) => {
      Case.getUnfollow(query)
        .then(response => {
          const {
            data
          } = response
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}
