import * as Certificate from '@/api/lawyer/certificate'

export const actions = {
  /**
   * lawyer
   * 行业资质数据
   * @param {commit} commit
   * @param {*} query
   */
  getCertificateList({ commit }, lawyerId) {
    return new Promise((resolve, reject) => {
      Certificate.getData(lawyerId).then(response => {
        const { data } = response
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    })
  },

  /**
   * lawyer
   * 创建行业资质
   * @param {commit} commit
   * @param {object} certificateData
   */
  createtCertificate({ commit }, certificateData) {
    return new Promise((resolve, reject) => {
      Certificate.create(certificateData).then(response => {
        const { data } = response
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    })
  },

  /**
   * lawyer
   * 修改行业资质
   * @param {commit} commit
   * @param {object} certificateData
   */
  updatetCertificate({ commit }, certificateData) {
    return new Promise((resolve, reject) => {
      Certificate.update(certificateData).then(response => {
        const { data } = response
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    })
  },

  /**
   * 删除行业资质
   * @param {commit} commit
   * @param {number} id
   */
  deletetCertificate({ commit }, id) {
    return new Promise((resolve, reject) => {
      Certificate.remove(id).then(response => {
        const { data } = response
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    })
  }
}

