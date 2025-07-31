import { defineNuxtPlugin } from '#app'
import apiConfig from '~/apis/apiConfig'
import api from '~/apis/index'
import auth from '~/apis/auth'
import collector from '~/apis/business/collector'
import product from '~/apis/business/product'
import user from '~/apis/business/user'

export default defineNuxtPlugin((nuxtApp) => {
  // 初始化认证状态
  auth.initAuth()
  
  // 提供API给全局使用
  return {
    provide: {
      api,
      apiConfig,
      auth,
      collector,
      product,
      user
    }
  }
}) 