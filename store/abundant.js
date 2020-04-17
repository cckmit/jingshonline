import * as Abundant from '@/api/lawyer/abundant'

const actions = {

  /**
   * 获取简历详情
   * @param {commit} param0
   * @param {number} id
   */
  getAbundantInfo({
    commit
  }, id) {
    return new Promise((resolve, reject) => {
      Abundant.getInfo(id).then(response => {
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
   * 审核简历
   * @param {commit} param0
   * @param {number} id
   */
  auditResume({
    commit
  }, auditData) {
    return new Promise((resolve, reject) => {
      Abundant.audit(auditData).then(response => {
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
export default {
  namespaced: true,
  actions
}
