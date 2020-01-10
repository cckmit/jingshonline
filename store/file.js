import * as File from '@/api/file'

export const state = () => ({
  fileType: [
    {
      id: 0,
      name: 'JudgmentDocument',
      displayName: '裁判文书'
    },
    {
      id: 1,
      name: 'AgentWord',
      displayName: '代理词'
    },
    {
      id: 2,
      name: 'OtherCaseFile',
      displayName: '其他案件材料'
    },
    {
      id: 3,
      name: 'Avatar',
      displayName: '头像'
    },
    {
      id: 4,
      name: 'LawyerLicence',
      displayName: '律师执业证'
    },
    {
      id: 5,
      name: 'resume',
      displayName: '律师简历'
    },
    {
      id: 6,
      name: 'Logo',
      displayName: 'LOGO'
    },
    {
      id: 7,
      name: 'LawfirmCredit',
      displayName: '律所执业证'
    }
  ]
})
export const actions = {
  /**
   * Oss文件签名
   * @param {commit} param0
   * @param {object} OSSData
   */
  OssSignature({ commit }, OSSData) {
    return new Promise((resolve, reject) => {
      File.OssSignature(OSSData).then(response => {
        const { data } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
