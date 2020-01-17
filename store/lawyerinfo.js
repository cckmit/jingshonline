import * as LawyerInfo from '@/api/LawyerInfo/index'

export const actions = {
  /**
 * 获取对应律师认证案例列表
 * @param {object} query
 */
  GetLawyerCaseList({ commit }, query) {
    return new Promise((resolve, reject) => {
      LawyerInfo.GetLawyerCaseList(query)
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
 * 用户关注律师
 * @param {number} lawyerId
 */
  UserFollow({ commit }, lawyerId) {
    return new Promise((resolve, reject) => {
      LawyerInfo.UserFollow(lawyerId)
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
 * 用户取消关注律师
 * @param {number} lawyerId
 */
  UserCancleFollow({ commit }, lawyerId) {
    return new Promise((resolve, reject) => {
      LawyerInfo.UserCancleFollow(lawyerId)
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
 * 律师常去法院
 * @param {number} lawyerId
 */
  GetLawyerInfo({ commit }, lawyerId) {
    return new Promise((resolve, reject) => {
      LawyerInfo.GetLawyerInfo(lawyerId)
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
 * 获取律师简历信息
 * @param {number} lawyerId
 */
  GetLawyerResume({ commit }, lawyerId) {
    return new Promise((resolve, reject) => {
      LawyerInfo.GetLawyerResume(lawyerId)
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
