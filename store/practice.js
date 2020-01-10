import * as Practice from '@/api/dictionaries/practice'

export const actions = {
  /**
   * 获取领域数据
   * @param {commit} param0
   * @param {object} query
   */
  getPracticeTreeData({
    commit
  }, query) {
    return new Promise((resolve, reject) => {
      Practice.getTree(query).then(response => {
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
   * 根据type获取领域数据
   * @param {commit} commit
   * @param {number} type
   */
  getPracticeTreeDataOfType({
    commit
  }, type) {
    return new Promise((resolve, reject) => {
      Practice.getTreeOfType(type).then(response => {
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
   * 获取领域详情
   * @param {commit} param0
   * @param {number} id
   */
  getPracticeInfo({
    commit
  }, id) {
    return new Promise((resolve, reject) => {
      Practice.getInfo(id).then(response => {
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
