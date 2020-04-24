import * as Socialposition from '@/api/usercenter/lawyer/socialposition'

export const actions = {
  /**
   * lawyer
   * 社会职务数据
   * @param {commit} commit
   * @param {*} query
   */
  getSocialpositionList({ commit }, lawyerId) {
    return new Promise((resolve, reject) => {
      Socialposition.getData(lawyerId).then(response => {
        const { data } = response
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    })
  },

  /**
   * lawyer
   * 创建社会职务
   * @param {commit} commit
   * @param {object} socialpositionData
   */
  createSocialposition({ commit }, socialpositionData) {
    return new Promise((resolve, reject) => {
      Socialposition.create(socialpositionData).then(response => {
        const { data } = response
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    })
  },

  /**
   * lawyer
   * 修改社会职务
   * @param {commit} commit
   * @param {object} socialpositionData
   */
  updateSocialposition({ commit }, socialpositionData) {
    return new Promise((resolve, reject) => {
      Socialposition.update(socialpositionData).then(response => {
        const { data } = response
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    })
  },

  /**
   * 删除社会职务
   * @param {commit} commit
   * @param {number} id
   */
  deleteSocialposition({ commit }, id) {
    return new Promise((resolve, reject) => {
      Socialposition.remove(id).then(response => {
        const { data } = response
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    })
  }
}

