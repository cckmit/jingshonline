import * as Lawfirm from '@/api/dictionaries/lawfirm'
export const state = () => ({
  lawfirmData: [],
  lawfirmType: [
    {
      id: 0,
      name: '京师所/分所',
      displayName: '京师所/分所'
    },
    {
      id: 1,
      name: '联盟所',
      displayName: '联盟所'
    },
    {
      id: 2,
      name: '其他所',
      displayName: '其他所'
    }
  ],
  organizationType: [
    {
      id: 0,
      name: '合伙所',
      displayName: '合伙所'
    },
    {
      id: 1,
      name: '个人所',
      displayName: '个人所'
    }
  ]
})

export const mutations = {
  SET_LAWFIRM_DATA: (state, data) => {
    state.lawfirmData = data
  }
}

export const actions = {
  /**
   * 获取律所数据
   * @param {commit} param0
   */
  getLawfirmAllData({ commit }) {
    return new Promise((resolve, reject) => {
      Lawfirm.get({}).then(response => {
        const { data } = response
        commit('SET_LAWFIRM_DATA', data)
        resolve(data)
      })
        .catch(error => {
          reject(error)
        })
    })
  },
  /**
   * 获取律所数据
   * @param {commit} param0
   * @param {object} query
   */
  getLawfirm({ commit }, query) {
    return new Promise((resolve, reject) => {
      Lawfirm.get(query).then(response => {
        const { data } = response
        resolve(data)
      })
        .catch(error => {
          reject(error)
        })
    })
  },
  /**
   * 获取律所数据
   * @param {commit} param0
   * @param {object} query
   */
  getLawfirmList({ commit }, query) {
    return new Promise((resolve, reject) => {
      Lawfirm.getData(query).then(response => {
        const { data } = response
        resolve(data)
      })
        .catch(error => {
          reject(error)
        })
    })
  },
  /**
   * 获取律所详情
   * @param {commit} param0
   * @param {number} id
   */
  getLawfirmInfo({
    commit
  }, id) {
    return new Promise((resolve, reject) => {
      Lawfirm.getInfo(id).then(response => {
        const { data } = response
        resolve(data)
      })
        .catch(error => {
          reject(error)
        })
    })
  }

}
