import { get, post } from '../index'
import { buildApiPath } from '../apiConfig'

// 用户模块API路径配置（相对路径，不包含前缀）
const userApiPaths = {
  login: '/user/login',
  register: '/user/register',
  info: '/user/info'
}

// 构建完整路径的辅助方法
const getPath = (path: keyof typeof userApiPaths) => buildApiPath(userApiPaths[path])

// 用户登录
export const userLogin = async (loginData: any) => {
  try {
    const data = await post(getPath('login'), loginData)
    return data
  } catch (error) {
    console.error('用户登录失败:', error)
    throw error
  }
}

// 用户注册
export const userRegister = async (registerData: any) => {
  try {
    const data = await post(getPath('register'), registerData)
    return data
  } catch (error) {
    console.error('用户注册失败:', error)
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

export default {
  userLogin,
  userRegister,
  getUserInfo
} 