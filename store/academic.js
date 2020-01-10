import * as academic from '@/api/lawyer/academic'

export const actions = {

  /**
   * lawyer
   * 学术成果数据
   * @param {commit} commit
   * @param {*} query
   */
  getAcademicList({ commit }, lawyerId) {
    return new Promise((resolve, reject) => {
      academic.getData(lawyerId).then(response => {
        const { data } = response
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    })
  },

  /**
   * lawyer
   * 创建学术成果
   * @param {commit} commit
   * @param {object} academicData
   */
  createtAcademic({ commit }, academicData) {
    return new Promise((resolve, reject) => {
      academic.create(academicData).then(response => {
        const { data } = response
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    })
  },

  /**
   * lawyer
   * 修改学术成果
   * @param {commit} commit
   * @param {object} academicData
   */
  updatetAcademic({ commit }, academicData) {
    return new Promise((resolve, reject) => {
      academic.update(academicData).then(response => {
        const { data } = response
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    })
  },

  /**
   * 删除学术成果
   * @param {commit} commit
   * @param {number} id
   */
  deletetAcademic({ commit }, id) {
    return new Promise((resolve, reject) => {
      academic.remove(id).then(response => {
        const { data } = response
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    })
  }
}

