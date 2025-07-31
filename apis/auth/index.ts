import { post, get } from '../index'
import apiConfig, { setAuthToken, buildApiPath } from '../apiConfig'

// 认证模块API路径配置（相对路径，不包含前缀）
const authApiPaths = {
  login: '/user/login',
  register: '/user/register',
  info: '/user/info'
}

// 构建完整路径的辅助方法
const getPath = (path: keyof typeof authApiPaths) => buildApiPath(authApiPaths[path])

// 登录接口
export const login = async (username: string, password: string) => {
  try {
    const data = await post(getPath('login'), { username, password })
    
    // 假设服务器返回了token
    if (data && data.token) {
      // 保存token到请求头配置
      setAuthToken(data.token)
      
      // 同时保存到localStorage
      if (process.client) {
        localStorage.setItem('auth_token', data.token)
      }
    }
    
    return data
  } catch (error) {
    console.error('登录失败:', error)
    throw error
  }
}

// 注册接口
export const register = async (userData: any) => {
  try {
    const data = await post(getPath('register'), userData)
    return data
  } catch (error) {
    console.error('注册失败:', error)
    throw error
  }
}

// 获取用户信息
export const getUserInfo = async () => {
  try {
    const data = await get(getPath('info'))
    return data
  } catch (error) {
    console.error('获取用户信息失败:', error)
    throw error
  }
}

// 登出
export const logout = () => {
  // 清除token
  setAuthToken('')
  
  // 清除localStorage
  if (process.client) {
    localStorage.removeItem('auth_token')
  }
}

// 初始化认证状态(从localStorage恢复token)
export const initAuth = () => {
  if (process.client) {
    const token = localStorage.getItem('auth_token')
    if (token) {
      setAuthToken(token)
      return true
    }
  }
  return false
}

export default {
  login,
  register,
  getUserInfo,
  logout,
  initAuth
} 