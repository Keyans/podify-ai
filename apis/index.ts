import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosRequestHeaders } from 'axios'
import apiConfig, { getDefaultHeaders } from './apiConfig'

// 创建axios实例
const axiosInstance: AxiosInstance = axios.create({
  timeout: 30000, // 请求超时时间
  withCredentials: true // 携带cookie信息
})

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    // 合并默认请求头
    const headers = getDefaultHeaders()
    Object.keys(headers).forEach(key => {
      config.headers.set(key, headers[key])
    })
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    if (response.status === 200) {
      // 这里可以根据实际业务场景进行数据处理
      return response.data
    }
    
    return Promise.reject(new Error('请求失败'))
  },
  (error: any) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 未授权，可能是token过期
          console.error('未授权或Token已过期')
          // 可以在这里执行登出操作或刷新token
          break
        case 403:
          // 禁止访问
          console.error('无权限访问')
          break
        case 404:
          // 资源不存在
          console.error('请求资源不存在')
          break
        case 500:
          // 服务器错误
          console.error('服务器错误')
          break
        default:
          console.error(`未知错误: ${error.response.status}`)
      }
    } else if (error.request) {
      // 请求发出但没有收到响应
      console.error('网络错误，请检查网络连接')
    } else {
      // 请求配置出错
      console.error('请求配置错误:', error.message)
    }
    
    return Promise.reject(error)
  }
)

// 封装GET请求
export const get = (url: string, params?: any, config?: AxiosRequestConfig): Promise<any> => {
  return axiosInstance.get(url, { params, ...config })
}

// 封装POST请求
export const post = (url: string, data?: any, config?: AxiosRequestConfig): Promise<any> => {
  return axiosInstance.post(url, data, config)
}

// 封装PUT请求
export const put = (url: string, data?: any, config?: AxiosRequestConfig): Promise<any> => {
  return axiosInstance.put(url, data, config)
}

// 封装DELETE请求
export const del = (url: string, config?: AxiosRequestConfig): Promise<any> => {
  return axiosInstance.delete(url, config)
}

// 导出业务API
export * from './business/cropper'
export * from './business/fission'

export default {
  get,
  post,
  put,
  del,
  axios: axiosInstance
} 