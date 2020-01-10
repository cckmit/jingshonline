import * as WorkBook from '@/api/dictionaries/workBook'

export const actions = {
  /**
   * 获取字典数据
   * @param {commit} param0
   * @param {object} query
   */
  getWorkBookData({ commit }, query) {
    return new Promise((resolve, reject) => {
      WorkBook.getData(query)
        .then(response => {
          const { data } = response
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  /**
   * 获取字典项数据
   * @param {commit} param0
   * @param {object} query
   */
  getWorkBookInfoData({ commit }, query) {
    return new Promise((resolve, reject) => {
      WorkBook.getinfoData(query)
        .then(response => {
          const { data } = response
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

}
