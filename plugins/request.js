/**
 * 封装Axios
 * 处理请求、响应错误信息
 */
import { Message } from 'element-ui' // 引用饿了么UI消息组件
import axios from 'axios' // 引用axios
// import store from '@/store'
import cookie from './cookie'

// create an axios instance
const service = axios.create({
  baseURL: process.env.baseUrl, // 所有异步请求都加上/api,nginx转发到后端Springboot
  // withCredentials: true, // send cookies when cross-domain requests
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    cookie.get('token') ? config.headers['Authorization'] = cookie.get('token') : ''
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    // const res = response.data // res is my own data
    const { data, status } = response
    if (data.isSucceed) {
      const resData = data.data
      return { data: resData, status }
    } else {
      const errorInfo = { message: data.message, code: data.statusCode }
      if (errorInfo.code === 401) {
        // to re-login
        Message({
          message: '您尚未登录，请登录后再进行此操作。',
          type: 'warning',
          duration: 5 * 1000
        })
      } else {
        Message({
          message: errorInfo.message || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
      }
      return Promise.reject(errorInfo)
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service // 导出封装后的axios
