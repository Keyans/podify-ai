// https://nuxt.com/docs/api/configuration/nuxt-config
import { getEnvironmentConfig } from './config/environments'

// 获取当前环境配置
const envConfig = getEnvironmentConfig(process.env.NUXT_ENV)

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  ssr: false,
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],
  // 开发服务器配置
  devServer: {
    host: '0.0.0.0', // 允许通过IP地址访问
    port: 3000
  },
  // 路由规则配置
  routeRules: {
    // 公开页面 - 可以预渲染
    '/': { prerender: true },
    '/login': { ssr: false }, // 客户端渲染
    '/register': { ssr: false },
    
    // Dashboard页面 - 需要认证，客户端渲染
    '/dashboard/**': { 
      ssr: false    // 客户端渲染
    },
    
    // 测试页面 - 开发环境可用
    '/test-**': { 
      prerender: false,
      ssr: false
    }
  },
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
  runtimeConfig: {
    public: {
      // API配置
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || envConfig.apiBaseUrl,
      apiPrefix: process.env.NUXT_PUBLIC_API_PREFIX || envConfig.apiPrefix,
      apiProxyTarget: process.env.NUXT_PUBLIC_API_PROXY_TARGET || envConfig.apiProxyTarget,
      apiProxyPrefix: process.env.NUXT_PUBLIC_API_PROXY_PREFIX || envConfig.apiProxyPrefix,
      apiHeaders: {
        'x-client-type': process.env.NUXT_PUBLIC_API_CLIENT_TYPE || envConfig.apiClientType
        // authorization 现在在客户端动态设置
      },
      // 业务配置
      microPodUrl: process.env.NUXT_PUBLIC_MICRO_POD_URL || envConfig.microPodUrl,
      galleryUrl: process.env.NUXT_PUBLIC_GALLERY_URL || envConfig.galleryUrl,
      backendApi: process.env.NUXT_PUBLIC_BACKEND_API || envConfig.backendApi,
      clientType: process.env.NUXT_PUBLIC_CLIENT_TYPE || envConfig.clientType,
      // 环境信息
      environment: process.env.NUXT_ENV || 'development',
      environmentName: envConfig.name,
      // CLS配置
      clsSecretId: process.env.NUXT_PUBLIC_CLS_SECRET_ID || '',
      clsSecretKey: process.env.NUXT_PUBLIC_CLS_SECRET_KEY || '',
      clsTopicId: process.env.NUXT_PUBLIC_CLS_TOPIC_ID || '',
      clsEndpoint: process.env.NUXT_PUBLIC_CLS_ENDPOINT || ''
    }
  },
  // 代理配置
  vite: {
    server: {
      proxy: {
        // API代理配置
        [process.env.NUXT_PUBLIC_API_PROXY_PREFIX || envConfig.apiProxyPrefix]: {
          target: process.env.NUXT_PUBLIC_API_PROXY_TARGET || envConfig.apiProxyTarget,
          changeOrigin: true,
          secure: false,
          ws: false,
          configure: (proxy, options) => {
            proxy.on('proxyReq', (proxyReq) => {
              // 基本的client-type头部，认证头部由客户端请求添加
              proxyReq.setHeader('x-client-type', process.env.NUXT_PUBLIC_API_CLIENT_TYPE || envConfig.apiClientType)
            })
          }
        }
      }
    }
  }
})
