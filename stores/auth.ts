
import { ref, computed, readonly } from 'vue';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', () => {
  // 状态
  const isLoggedIn = ref(false)
  const userInfo = ref<{
    id?: string
    name?: string
    email?: string
    avatar?: string
  } | null>(null)
  const token = ref<string | null>(null)

  // 计算属性
  const isAuthenticated = computed(() => !!token.value)

  // 方法
  const login = async (credentials: { email: string; password: string }) => {
    try {
      // 模拟登录API调用
      console.log('Login attempt:', credentials)
      
      // 模拟响应数据
      const response = {
        token: 'mock-jwt-token',
        user: {
          id: '1',
          name: '测试用户',
          email: credentials.email,
          avatar: 'https://via.placeholder.com/40'
        }
      }
      
      token.value = response.token
      userInfo.value = response.user
      isLoggedIn.value = true
      
      // 存储到localStorage（仅客户端）
      if (process.client) {
        localStorage.setItem('auth_token', response.token)
        localStorage.setItem('user_info', JSON.stringify(response.user))
      }
      
      return response
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  }

  const logout = () => {
    token.value = null
    userInfo.value = null
    isLoggedIn.value = false
    
    // 清除localStorage（仅客户端）
    if (process.client) {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user_info')
    }
  }

  const checkAuth = () => {
    if (process.client) {
      const savedToken = localStorage.getItem('auth_token')
      const savedUserInfo = localStorage.getItem('user_info')
      
      if (savedToken && savedUserInfo) {
        token.value = savedToken
        userInfo.value = JSON.parse(savedUserInfo)
        isLoggedIn.value = true
      }
    }
  }

  const updateUserInfo = (newUserInfo: Partial<typeof userInfo.value>) => {
    if (userInfo.value) {
      userInfo.value = { ...userInfo.value, ...newUserInfo }
      
      if (process.client) {
        localStorage.setItem('user_info', JSON.stringify(userInfo.value))
      }
    }
  }

  return {
    // 状态
    isLoggedIn: readonly(isLoggedIn),
    userInfo: readonly(userInfo),
    token: readonly(token),
    
    // 计算属性
    isAuthenticated,
    
    // 方法
    login,
    logout,
    checkAuth,
    updateUserInfo
  }
})
