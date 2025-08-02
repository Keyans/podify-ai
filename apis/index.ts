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
    // 添加认证请求头（如果存在）
    if (process.client) {
      const accessToken = localStorage.getItem('access_token')
      const userId = localStorage.getItem('user_id')
      const tenantId = localStorage.getItem('tenant_id')
      
      // 设置Authorization header（使用动态token）
      if (accessToken) {
        config.headers.set('Authorization', accessToken)
      }
      
      // 设置其他必要的头部字段
      if (userId && tenantId) {
        config.headers.set('X-Tenant-Id', tenantId)
        config.headers.set('X-Auth-User-Id', userId)
        config.headers.set('X-Auth-Platform-Type', 'web')
        config.headers.set('X-Client-Type', 'pod-admin')
      }
    }
    
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // 如果返回的状态码为200，说明HTTP请求成功
    if (response.status === 200) {
      const data = response.data
      
      // 检查业务错误码
      if (data && typeof data === 'object') {
        // 如果存在code字段，检查是否为成功状态
        if ('code' in data) {
          const code = Number(data.code)
          // 成功的业务状态码通常是 0, 200, 或 10000
          if (code === 0 || code === 200 || code === 10000) {
            return data
          } else {
            // 业务错误，创建错误对象并包含完整的响应信息
            const error = new Error(data.message || '操作失败')
            ;(error as any).response = {
              data: data,
              status: response.status,
              statusText: response.statusText
            }
            ;(error as any).code = code
            return Promise.reject(error)
          }
        }
        
        // 如果没有code字段但有success字段
        if ('success' in data && !data.success) {
          const error = new Error(data.message || '操作失败')
          ;(error as any).response = {
            data: data,
            status: response.status,
            statusText: response.statusText
          }
          return Promise.reject(error)
        }
      }
      
      // 默认返回数据
      return data
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
export * from './business/gallery'

export default {
  get,
  post,
  put,
  del,
  axios: axiosInstance
} 