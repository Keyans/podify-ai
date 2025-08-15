import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosRequestHeaders } from 'axios'
// 从 Nuxt 提供的 Vue Router 组合式函数中导入 useRouter，用于编程式导航
import { navigateTo } from '#app';
// 你可能需要引入你的配置或默认头文件，这里暂时保留
// import apiConfig, { getDefaultHeaders } from './apiConfig'

// 创建axios实例
const axiosInstance: AxiosInstance = axios.create({
  timeout: 30000, // 请求超时时间
  withCredentials: true // 携带cookie信息
})

/**
 * 这是一个处理登出和重定向到登录页面的通用函数。
 * 它可以被 401 状态码和特定的业务错误码调用。
 */
const handleLogoutAndRedirect = async () => {
  if (process.client) {
    console.error('检测到认证失效，正在执行登出并重定向到登录页...');
    
    // 清除本地存储中的所有认证相关信息，确保安全登出
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('tenant_id');
    localStorage.removeItem('platform_type');
    localStorage.removeItem('client_type');

    // 使用 Nuxt 3 的 navigateTo 方法进行重定向
    // `replace: true` 意味着替换当前历史记录，防止用户点击返回按钮回到此页面
    // 确保你的登录页面路由是 /login
    await navigateTo('/login', { replace: true });
  }
};


/**
 * 这是一个用于设置默认请求头的辅助函数。
 * 它可以确保请求头包含必要的租户、用户和客户端信息。
 *
 * @param config Axios请求配置对象
 */
const setDefaultHeaders = (config: AxiosRequestConfig) => {
  const userId = localStorage.getItem('user_id');
  const tenantId = localStorage.getItem('tenant_id');

  if (userId && tenantId) {
    const platformType = localStorage.getItem('platform_type') || 'AI_PROJECT';
    const clientType = localStorage.getItem('client_type') || 'AI_C_WEB';

    // 只在没有设置时才设置默认值，避免覆盖函数中明确设置的值
    // 由于 config.headers 可能为 undefined 或类型不确定，需先判断 headers 是否存在且有 get/set 方法
    const headers = config.headers as any;
    if (headers && typeof headers.get === 'function' && typeof headers.set === 'function') {
      if (!headers.get('X-Tenant-Id')) {
        headers.set('X-Tenant-Id', tenantId);
      }
      if (!headers.get('X-Auth-User-Id')) {
        headers.set('X-Auth-User-Id', userId);
      }
    }
    // 修复 config.headers 可能为 undefined 或没有 get/set 方法的问题
    if (headers && typeof headers.get === 'function' && typeof headers.set === 'function') {
      if (!headers.get('X-Auth-Platform-Type')) {
        headers.set('X-Auth-Platform-Type', platformType);
      }
      if (!headers.get('X-Client-Type')) {
        headers.set('X-Client-Type', clientType);
      }
    }
  }
};

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    // 确保这段逻辑只在客户端执行
    if (process.client) {
      const authToken = localStorage.getItem('auth_token');
      
      // 设置Authorization header（使用动态token）
      if (authToken) {
        config.headers.set('Authorization', authToken);
      }
      
      // 调用新抽离的函数，设置其他默认请求头
      setDefaultHeaders(config);
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

          // 核心改动：新增对特定业务错误码的检查
          const unauthorizedCodes = [10301, 10302, 10303, 10304];
          if (unauthorizedCodes.includes(code)) {
            // 如果业务码是认证相关的错误，执行登出并重定向
            handleLogoutAndRedirect();
            // 返回一个拒绝的Promise，阻止后续的.then()链执行
            return Promise.reject(new Error(data.message || '认证失败，请重新登录'));
          }
          
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
    // http 状态码处理
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 核心改动：在捕获到 401 状态码时，执行登出并重定向
          handleLogoutAndRedirect();
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

export default {
  get,
  post,
  put,
  del,
  axios: axiosInstance
}
