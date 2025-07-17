// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  
  // 兼容性日期
  compatibilityDate: '2025-07-17',
  
  // CSS配置
  css: [
    'element-plus/dist/index.css',
    '~/assets/css/main.css'
  ],

  // 模块配置
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],

  // 构建配置
  build: {
    transpile: ['element-plus']
  },

  // 运行时配置
  runtimeConfig: {
    public: {
      apiBase: '/api'
    }
  },

  // 应用配置
  app: {
    head: {
      title: '灵图AI - 畅享创作乐趣',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '用灵图AI，畅享创作乐趣。Less Design, More Creation.' },
        { name: 'keywords', content: '灵图AI,AI设计,创作工具,图片生成' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  }
}) 