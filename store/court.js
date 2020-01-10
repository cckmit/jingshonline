import * as Court from '@/api/dictionaries/court'
export const state = () => ({
  courtLevel: [{
    id: 0,
    name: '最高级人民法院'
  },
  {
    id: 1,
    name: '高级人民法院'
  },
  {
    id: 2,
    name: '中级人民法院'
  },
  {
    id: 3,
    name: '基层人民法院'
  },
  {
    id: 4,
    name: '专门法院'
  },
  {
    id: 5,
    name: '仲裁委员会'
  },
  {
    id: 6,
    name: '其他所'
  }]
})

export const actions = {
  /**
   * 获取法院数据无参数查询
   * @param {commit} param0
   */
  getCourt({ commit }) {
    return new Promise((resolve, reject) => {
      Court.get().then(response => {
        const { data } = response
        resolve(data)
      })
        .catch(error => {
          reject(error)
        })
    })
  },
  /**
   * 获取法院数据
   * @param {commit} param0
   * @param {object} query
   */
  getCourtData({ commit }, query) {
    return new Promise((resolve, reject) => {
      Court.getData(query).then(response => {
        const { data } = response
        resolve(data)
      })
        .catch(error => {
          reject(error)
        })
    })
  },
  /**
   * 获取法院详情
   * @param {commit} param0
   * @param {number} id
   */
  getCourtInfo({ commit }, id) {
    return new Promise((resolve, reject) => {
      Court.getInfo(id).then(response => {
        const { data } = response
        resolve(data)
      })
        .catch(error => {
          reject(error)
        })
    })
  }
}
