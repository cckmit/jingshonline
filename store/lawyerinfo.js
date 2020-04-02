import * as LawyerInfo from '@/api/lawyerinfo/index'

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
 * 用户关注律师案例列表案例
 * @param {number} caseId
 */
  UserFollowCase({ commit }, caseId) {
    return new Promise((resolve, reject) => {
      LawyerInfo.UserFollowCase(caseId)
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
 * 用户取消关注律师案例列表案例
 * @param {number} caseId
 */
  UserUnFollowCase({ commit }, caseId) {
    return new Promise((resolve, reject) => {
      LawyerInfo.UserUnFollowCase(caseId)
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
 * 律师访问数量
 * @param {number} lawyerId
 */
  LawyerClickCount({ commit }, lawyerId) {
    return new Promise((resolve, reject) => {
      LawyerInfo.LawyerClickCount(lawyerId)
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

