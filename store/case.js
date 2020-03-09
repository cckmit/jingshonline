import * as Case from '@/api/case/index'

export const actions = {

  /**
   * 搜索案件
   * @param {commit} commit
   * @param {string} searchKey
   */
  CaseSearch({ commit }, searchKey) {
    return new Promise((resolve, reject) => {
      Case.searchCase(searchKey).then(response => {
        const { data } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

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
   * 获取律师详情
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
  caseFollowClick({ commit }, query) {
    return new Promise((resolve, reject) => {
      Case.caseFollow(query)
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
   * 取消收藏
   * @param {commit} commit
   * @param {string} query
   */
  caseUnfollowClick({ commit }, query) {
    return new Promise((resolve, reject) => {
      Case.caseUnfollow(query)
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
  caseClickCount({ commit }, query) {
    return new Promise((resolve, reject) => {
      Case.caseClick(query)
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
