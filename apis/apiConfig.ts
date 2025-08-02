// API基础配置

// 环境配置
interface EnvironmentConfig {
  apiBaseUrl: string;
  apiHeaders: {
    'x-client-type': string;
    // authorization 现在在客户端动态设置，不再作为静态配置
  };
}

// 从运行时配置获取环境配置
const getRuntimeConfig = () => {
  if (process.client && window && (window as any).$nuxt) {
    return (window as any).$nuxt.$config.public
  }
  return {}
}

// 环境配置对象
export const environments: Record<string, EnvironmentConfig> = {
  development: {
    apiBaseUrl: '', // 开发环境使用代理
    apiHeaders: {
      'x-client-type': 'cuzcuz-ai-web'
    }
  },
  test: {
    apiBaseUrl: '', // 测试环境使用代理
    apiHeaders: {
      'x-client-type': 'cuzcuz-ai-web'
    }
  },
  production: {
    apiBaseUrl: '', // 生产环境使用代理
    apiHeaders: {
      'x-client-type': 'cuzcuz-ai-web'
    }
  }
}

// HTTP状态码枚举
export enum HttpStatusCode {
  SUCCESS = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500
}

// API响应类型
export interface ApiResponse<T = any> {
  code: number
  message: string
  data?: T
  success: boolean
  timestamp?: string
}

// 获取当前环境配置
export const getCurrentEnv = (): string => {
  return process.env.NODE_ENV || 'development'
}

// 获取当前环境的API配置
export const getApiConfig = (): EnvironmentConfig => {
  const env = getCurrentEnv()
  return environments[env] || environments.development
}

// 获取API前缀
export const getApiPrefix = (): string => {
  // 优先使用运行时配置
  const runtimeConfig = getRuntimeConfig()
  if (runtimeConfig?.apiPrefix) {
    return runtimeConfig.apiPrefix
  }
  
  // 兜底使用默认前缀
  return '/pod/cuzcuz-ai'
}

// 构建完整API路径
export const buildApiPath = (path: string): string => {
  const prefix = getApiPrefix()
  return `${prefix}${path}`
}

// 获取完整API URL（保留原方法用于兼容）
export const getFullApiUrl = (path: string): string => {
  return path // 使用代理，直接返回路径
}

// 获取默认请求头
export const getDefaultHeaders = (): Record<string, string> => {
  // 优先使用运行时配置
  const runtimeConfig = getRuntimeConfig()
  if (runtimeConfig?.apiHeaders) {
    return runtimeConfig.apiHeaders
  }
  
  // 兜底使用环境配置
  return getApiConfig().apiHeaders
}

// 设置认证令牌（已废弃，现在使用localStorage中的动态token）
export const setAuthToken = (token: string): void => {
  // 已废弃：现在认证token通过localStorage动态管理
  console.warn('setAuthToken is deprecated. Auth tokens are now managed via localStorage.')
}

// 清除认证令牌（已废弃，现在使用logout函数）
export const clearAuthToken = (): void => {
  // 已废弃：现在使用logout函数清除认证信息
  console.warn('clearAuthToken is deprecated. Use logout function instead.')
}

// 是否已认证（现在检查localStorage中的token）
export const isAuthenticated = (): boolean => {
  if (process.client) {
    return !!localStorage.getItem('access_token')
  }
  return false
}

export default {
  environments,
  HttpStatusCode,
  getCurrentEnv,
  getApiConfig,
  getApiPrefix,
  buildApiPath,
  getFullApiUrl,
  getDefaultHeaders,
  setAuthToken,
  clearAuthToken,
  isAuthenticated
} 