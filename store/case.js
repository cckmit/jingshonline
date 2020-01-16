import * as Case from '@/api/case'

const state = {
  caseStatus: [
    {
      id: 0,
      type: 'info',
      name: 'draft',
      displayName: '草稿'
    },
    {
      id: 1,
      type: '',
      name: 'Unreviewd',
      displayName: '待审核'
    },
    {
      id: 2,
      type: 'success',
      name: 'PassReview',
      displayName: '审核通过'
    },
    {
      id: 3,
      type: 'danger',
      name: 'UnPassReview',
      displayName: '审核驳回'
    }
  ],
  clientType: [
    {
      id: 0,
      name: 'person',
      displayName: '个人'
    },
    {
      id: 1,
      name: 'company',
      displayName: '公司'
    },
    {
      id: 2,
      name: 'government',
      displayName: '政府'
    },
    {
      id: 3,
      name: 'other',
      displayName: '其他'
    }
  ]
}

const actions = {
  /**
   * 添加案件
   * @param {commit} commit
   * @param {object} caseData
   */
  adminCaseCreate({ commit }, caseData) {
    return new Promise((resolve, reject) => {
      Case.adminCreate(caseData)
        .then(response => {
          const { data } = response
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  /**
   * 编辑案件
   * @param {commit} commit
   * @param {object} caseData
   */
  adminCaseUpdate({ commit }, caseData) {
    return new Promise((resolve, reject) => {
      Case.adminUpdate(caseData).then(response => {
        const { data } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  /**
   * 删除案件
   * @param {commit} commit
   * @param {number} id
   */
  adminCaseDelete({ commit }, id) {
    return new Promise((resolve, reject) => {
      Case.adminDelete(id).then(response => {
        const { data } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  /**
   * 恢复案件
   * @param {commit} commit
   * @param {number} id
   */
  adminCaseRecover({ commit }, id) {
    return new Promise((resolve, reject) => {
      Case.adminRecover(id).then(response => {
        const { data } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  /**
   * 根据ID获取案件详情
   * @param {commit} commit
   * @param {number} id
   */
  adminCaseGetInfo({ commit }, id) {
    return new Promise((resolve, reject) => {
      Case.adminGetInfo(id).then(response => {
        const { data } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  /**
   * 根据ID获取案件详情(查看)
   * @param {commit} commit
   * @param {number} id
   */
  adminCaseGetInfoForLook({ commit }, id) {
    return new Promise((resolve, reject) => {
      Case.adminGetInfoForLook(id).then(response => {
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
   * @param {object} query
   */
  adminCaseGetList({ commit }, query) {
    return new Promise((resolve, reject) => {
      Case.adminGetData(query).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  /**
   * 获取已删除案件列表
   * @param {commit} commit
   * @param {object} query
   */
  adminCaseGetRecycleList({ commit }, query) {
    return new Promise((resolve, reject) => {
      Case.adminRecycleData(query).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  /**
   * 审核案件
   * @param {commit} commit
   * @param {object} reviewData
   */
  adminCaseReview({ commit }, reviewData) {
    return new Promise((resolve, reject) => {
      Case.adminReview(reviewData).then(response => {
        const { data } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  /**
   * 获取待审核案件列表
   * @param {commit} commit
   * @param {object} query
   */
  adminCaseGetReviewList({ commit }, query) {
    return new Promise((resolve, reject) => {
      Case.adminReviewQuery(query).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  /**
   * 通过裁判文书号检查是否已存在
   * @param {commit} commit
   * @param {string} judgmentnumber
   */
  adminCaseJudgmentnumber({ commit }, judgmentnumber) {
    return new Promise((resolve, reject) => {
      Case.adminCaseJudgmentnumber(judgmentnumber).then(response => {
        const { data } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
export default {
  namespaced: true,
  state,
  actions
}
