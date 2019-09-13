import axios from 'axios'
import JSONbig from 'json-bigint'
import store from '@/store'

// axios 请求 拦截  对 axios 进行处理
// 创建一个axios实例 设置不同的baseURL
const instance = axios.create({
  timeout: 5000,
  baseURL: 'http://ttapi.research.itcast.cn'
})

instance.defaults.transformResponse = [function (data) {
  try {
    // data 数据可能不是标准的 JSON 格式字符串，否则会导致 JSONbig.parse(data) 转换失败报错
    return JSONbig.parse(data)
  } catch (err) {
    // 无法转换的数据直接原样返回
    return data
  }
}]
// Add a request interceptor
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  if (store.state.user) {
    config.headers.Authorization = `Bearer ${store.state.user.token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  // Do something with response data
  return response.data.data || response.data
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})

export default instance
