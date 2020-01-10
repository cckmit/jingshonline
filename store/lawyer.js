import * as Lawyer from '@/api/lawyer/index'

export const state = () => ({
  status: [
    {
      id: 0,
      type: 'info',
      name: 'UnCertified',
      displayName: '待提交审核'
    },
    {
      id: 1,
      type: '',
      name: 'Unreviewd',
      displayName: '等待审核'
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
      displayName: '审核未通过'
    }
  ],
  resumeStatus: [
    {
      id: 0,
      type: '',
      name: 'UnCertified',
      displayName: '等待审核'
    },
    {
      id: 1,
      type: 'success',
      name: 'Certified',
      displayName: '审核通过'
    },
    {
      id: 2,
      type: 'danger',
      name: 'Failed',
      displayName: '审核未通过'
    }
  ]
})

export const actions = {
  /**
   * 获取律师列表无参数
   * @param {commit} commit
   */
  GetLawyer({ commit }) {
    return new Promise((resolve, reject) => {
      Lawyer.Get().then(response => {
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
   * 获取律师列表
   * @param {commit} commit
   * @param {string} query
   */
  GetLawyerList({ commit }, query) {
    return new Promise((resolve, reject) => {
      Lawyer.GetData(query)
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
  LawyerGetInfo({ commit }, id) {
    return new Promise((resolve, reject) => {
      Lawyer.GetInfo(id).then(response => {
        const { data } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  /**
   * 修改律师擅长行业、领域
   * @param {commit} commit
   * @param {object} knowledgeData
   */
  ChangeKnowledge({ commit }, knowledgeData) {
    return new Promise((resolve, reject) => {
      Lawyer.ChangeKnowledge(knowledgeData).then(response => {
        const { data } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  /**
   * 修改律师账号密码
   * @param {commit} commit
   * @param {boject} changePasswordData
   */
  ChangePassWord({ commit }, changePasswordData) {
    return new Promise((resolve, reject) => {
      Lawyer.ChangePassword(changePasswordData).then(response => {
        const { data } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
