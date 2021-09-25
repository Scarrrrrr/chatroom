import axios from 'axios'
import { Message } from 'element-ui'
import _this from '../main.js'
// import store from '@/store'
// import storage from 'store'
import { VueAxios } from './axios'
// import { ACCESS_TOKEN } from '@/store/mutation-types'

// const baseURL = process.env.VUE_APP_MODEL_BASE_URL
const baseURL = "http://localhost:8080"
// 创建 axios 实例
const request = axios.create({
  baseURL: baseURL, // api base_url
  timeout: 6000 // 请求超时时间
})
export const pureAxios = axios.create({
  baseURL: baseURL, // api base_url
  timeout: 6000 // 请求超时时间
})

const err = (error) => {
  if (error.response) {
    const data = error.response.data
    // const token = storage.get(ACCESS_TOKEN)
    if (error.response.status === 403) {
      Message({
        message: 'Forbidden',
        description: data.msg
      })
    }
    console.log(data)
    if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
      Message({
        message: 'Unauthorized',
        description: 'Authorization verification failed'
      })
    }
  }
  return Promise.reject(error)
}

// request interceptor
request.interceptors.request.use(config => {
  const token = _this.$cookies.get('token')

  if (token) {
    config.headers['token'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
  }

  return config
}, err)

// pureAxios.interceptors.request.use(config => {
//   const token = storage.get(ACCESS_TOKEN)
//   if (token) {
//     config.headers['token'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
//   }
//   return config
// }, err)

// response interceptor
request.interceptors.response.use((response) => {
  const token = response.headers.token
  if(token){
    _this.$cookies.set('token',token,"1d")
  }
  return response.data
}, err)

const installer = {
  vm: {},
  install(Vue) {
    Vue.use(VueAxios, request)
  }
}

export default request

export {
  installer as VueAxios,
  request as axios
}
