import * as Education from '@/api/lawyer/education'
export const state = () => ({
  // 专科=0,本科=1,硕士=2,博士=3
  education: [
    {
      id: 0,
      name: 'Specialty',
      displayName: '专科'
    },
    {
      id: 1,
      name: 'Undergraduate',
      displayName: '本科'
    },
    {
      id: 2,
      name: 'master',
      displayName: '硕士'
    },
    {
      id: 3,
      name: 'doctor',
      displayName: '博士'
    }
  ]
})

export const actions = {

  /**
   * lawyer
   * 教育经历数据
   * @param {commit} commit
   * @param {*} query
   */
  getEducationList({ commit }, lawyerId) {
    return new Promise((resolve, reject) => {
      Education.getData(lawyerId).then(response => {
        const {
          data
        } = response
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    })
  },

  /**
   * lawyer
   * 创建教育经历
   * @param {commit} commit
   * @param {object} educationData
   */
  createEducation({ commit }, educationData) {
    return new Promise((resolve, reject) => {
      Education.create(educationData).then(response => {
        const {
          data
        } = response
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    })
  },

  /**
   * lawyer
   * 修改教育经历
   * @param {object} educationData
   */
  updateEducation({
    commit
  }, educationData) {
    return new Promise((resolve, reject) => {
      Education.update(educationData).then(response => {
        const {
          data
        } = response
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    })
  },

  /**
   * 删除教育经历
   * @param {commit} commit
   * @param {number} id
   */
  deletetEducation({ commit }, id) {
    return new Promise((resolve, reject) => {
      Education.remove(id).then(response => {
        const {
          data
        } = response
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    })
  }
}
