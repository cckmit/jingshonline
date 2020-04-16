import * as Case from '@/api/case/index'

export const state = () => ({
  sortData: [
    {
      name: '默认排序',
      label: '0',
      displayName: 'casestatus',
      id: 1
    },
    {
      name: '裁判日期',
      label: '0',
      displayName: 'endtime',
      id: 2
    },
    {
      name: '更新时间',
      label: '0',
      displayName: 'updatetime',
      id: 3
    },
    {
      name: '访问人数',
      label: '0',
      displayName: 'clickcount',
      id: 4
    },
    {
      name: '收藏数量',
      label: '0',
      displayName: 'followercount',
      id: 5
    },
    {
      name: '裁判日期',
      label: '0',
      displayName: 'endtime',
      id: 6
    }
  ]
})

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
  },

  /**
   * 创建案件
   * @param {commit} commit
   * @param {object} caseData
   */
  caseCreate({ commit }, caseData) {
    return new Promise((resolve, reject) => {
      Case.caseCreate(caseData).then(response => {
        const { data } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  /**
   * 编辑案件
   * @param {commit} commit
   * @param {object} caseData
   */
  caseUpdate({ commit }, caseData) {
    return new Promise((resolve, reject) => {
      Case.caseUpdate(caseData).then(response => {
        const { data } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  /**
   * 编辑案件
   * @param {commit} commit
   * @param {number} caseId
   */
  caseDelete({ commit }, caseId) {
    return new Promise((resolve, reject) => {
      Case.caseDelete(caseId).then(response => {
        const { data } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  /**
   * 案件查询
   * @param {commit} commit
   * @param {number} query
   */
  caseQuery({ commit }, query) {
    return new Promise((resolve, reject) => {
      Case.caseQuery(query).then(response => {
        const { data } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
