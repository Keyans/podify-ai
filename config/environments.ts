// 环境配置管理 - 基于 .env 文件
export interface EnvironmentConfig {
  name: string
  apiBaseUrl: string
  apiPrefix: string
  apiProxyTarget: string
  apiProxyPrefix: string
  apiClientType: string
  apiAuthToken: string
  microPodUrl: string
  galleryUrl: string
  backendApi: string
  clientType: string
}

// 环境名称映射
const environmentNames: Record<string, string> = {
  development: '开发环境',
  test: '测试环境',
  production: '生产环境'
}

// 获取当前环境名称
export const getCurrentEnvironment = (): string => {
  return process.env.NUXT_ENV || process.env.NODE_ENV || 'development'
}

// 从环境变量构建配置（不再使用硬编码的默认值）
export const getEnvironmentConfig = (env?: string): EnvironmentConfig => {
  const envName = env || getCurrentEnvironment()
  
  return {
    name: environmentNames[envName] || '未知环境',
    apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || '',
    apiPrefix: process.env.NUXT_PUBLIC_API_PREFIX || '/pod/cuzcuz-ai',
    apiProxyTarget: process.env.NUXT_PUBLIC_API_PROXY_TARGET || '',
    apiProxyPrefix: process.env.NUXT_PUBLIC_API_PROXY_PREFIX || '/pod',
    apiClientType: process.env.NUXT_PUBLIC_API_CLIENT_TYPE || 'pod-admin',
    apiAuthToken: process.env.NUXT_PUBLIC_API_AUTH_TOKEN || '',
    microPodUrl: process.env.NUXT_PUBLIC_MICRO_POD_URL || '',
    galleryUrl: process.env.NUXT_PUBLIC_GALLERY_URL || '',
    backendApi: process.env.NUXT_PUBLIC_BACKEND_API || '',
    clientType: process.env.NUXT_PUBLIC_CLIENT_TYPE || envName
  }
} 