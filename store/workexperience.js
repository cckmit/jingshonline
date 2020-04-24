import * as Workexperience from '@/api/usercenter/lawyer/workexperience'

export const actions = {
  /**
   * lawyer
   * 工作经历数据
   * @param {commit} commit
   * @param {*} query
   */
  getWorkexperienceList({ commit }, lawyerId) {
    return new Promise((resolve, reject) => {
      Workexperience.getData(lawyerId).then(response => {
        const { data } = response
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    })
  },

  /**
   * lawyer
   * 创建工作经历
   * @param {commit} commit
   * @param {object} workexperienceData
   */
  createWorkexperience({ commit }, workexperienceData) {
    return new Promise((resolve, reject) => {
      Workexperience.create(workexperienceData).then(response => {
        const { data } = response
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    })
  },

  /**
   * lawyer
   * 修改工作经历
   * @param {commit} commit
   * @param {object} workexperienceData
   */
  updateWorkexperience({ commit }, workexperienceData) {
    return new Promise((resolve, reject) => {
      Workexperience.update(workexperienceData).then(response => {
        const { data } = response
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    })
  },

  /**
   * 删除工作经历
   * @param {commit} commit
   * @param {number} id
   */
  deleteWorkexperience({ commit }, id) {
    return new Promise((resolve, reject) => {
      Workexperience.remove(id).then(response => {
        const { data } = response
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    })
  }
}
