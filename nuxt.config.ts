// https://nuxt.com/docs/api/configuration/nuxt-config
import { getEnvironmentConfig } from './config/environments'

// 获取当前环境配置
const envConfig = getEnvironmentConfig(process.env.NUXT_ENV)


function proxy() {
  //let targetTest = "https://cuz-ai.riin.com"; //测试环境
  let devTarget = "http://192.168.1.151:30882"; //dev 环境
  //let devTarget = "http://10.120.22.134:8080"; //hzh本地
  return {
    "/pod": {
      target: devTarget,
      ws: false,
      changeOrigin: true,
      secure: false, //证书免校验
    },
  };
}



export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  css: ['~/assets/css/main.css'],
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@ant-design-vue/nuxt', '@nuxt/image'],
  // 开发服务器配置
  devServer: {
    host: '0.0.0.0', // 允许通过IP地址访问
    port: 3000
  },
  // 路由规则配置
  routeRules: {
    // 公开页面 - 改为客户端渲染，支持动态功能
    '/': { ssr: true },
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
  // 图像优化
  image: {
      quality: 80,
      format: ["webp", "avif", "jpg", "png"],
      screens: {
        xs: 320,
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
        xxl: 1536,
      },
      domains: ["your-domain.com"],
      presets: {
        product: {
          modifiers: {
            format: "webp",
            quality: 80,
            width: 500,
            height: 500,
          },
        },
        thumbnail: {
          modifiers: {
            format: "webp",
            quality: 60,
            width: 200,
            height: 200,
          },
        },
      },
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
      backendApi: process.env.NUXT_PUBLIC_BACKEND_API || envConfig.backendApi,
    }
  },
  // 代理配置
  vite: {
    base: "/",
    server: {
      proxy: proxy()
    }
  }
})