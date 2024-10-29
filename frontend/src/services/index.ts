import axios from 'axios'
import { message } from 'antd'
import { getToken } from '../utils/user'

const instance = axios.create({
  timeout: 10 * 1000,
})

// 请求拦截
instance.interceptors.request.use(
  (config) => {
    // 加上token
    config.headers['Authorization'] = `Bearer ${getToken()}`
    return config
  },
  (error) => Promise.reject(error)
)

// 响应拦截器 同意处理code msg
instance.interceptors.response.use((res) => {
  // const data = (res.data || {}) as ResType
  const resData = res.data || {}
  const { code, data, msg } = resData
  // 错误提示
  if (code != 0) {
    if (msg) message.error(msg)

    throw new Error(msg)
  }

  return data
})

export default instance

export type ResType = {
  code: number
  data?: ResDataType
  msg?: string
}

export type ResDataType = {
  [key: string]: any
}
