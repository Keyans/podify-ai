import { post, get } from '../index'
import apiConfig, { setAuthToken, buildApiPath } from '../apiConfig'

// 认证模块API路径配置（相对路径，不包含前缀）
const authApiPaths = {
  login: '/pod/tenant/api/v1/auth/login',
  logout: '/pod/tenant/api/v1/auth/logout',
  register: '/pod/tenant/api/v1/users/multi-platform/register',
  sendSmsCode: '/pod/tenant/api/v1/sms/send-code',
  sendEmailCode: '/pod/tenant/api/v1/email/send-code', // 添加邮箱验证码接口
  myTeam: '/pod/tenant/api/v1/teams/my',
  info: '/user/info'
}

// 构建完整路径的辅助方法
const getPath = (path: keyof typeof authApiPaths) => {
  // 登录、登出、注册、短信、邮箱、团队接口不需要cuzcuz-ai前缀
  if (path === 'login' || path === 'logout' || path === 'register' || path === 'sendSmsCode' || path === 'sendEmailCode' || path === 'myTeam') {
    return authApiPaths[path]
  }
  return buildApiPath(authApiPaths[path])
}

// 登录接口响应类型
interface LoginResponse {
  accessToken: string
  refreshToken: string
  tokenType: string
  expiresIn: number
  userInfo: {
    userId: string
    tenantId: string
    username: string
    email: string
    phone: string | null
    nickname: string
    displayName: string
    platformType: number
    platformName: string
    clientType: string
  }
  timestamp: string
}

// 注册接口请求类型
interface RegisterRequest {
  contactEmail?: string   // 邮箱注册时使用
  contactPhone?: string   // 手机注册时使用
  password: string
  inviteCode?: string     // 手机注册时使用
  smsCode?: string
  emailCode?: string
  nickname?: string
}

// 登录请求类型 - 统一使用username字段
interface LoginRequest {
  username: string  // 邮箱或手机号
  password?: string  // 密码登录（邮箱登录、手机密码登录）
  verificationCode?: string   // 手机验证码登录
}

// 发送验证码请求类型
interface SendSmsCodeRequest {
  phoneNumber: string
  codeType: 'REGISTER' | 'LOGIN' | 'RESET'
}

interface SendEmailCodeRequest {
  email: string
  codeType: 'REGISTER' | 'LOGIN' | 'RESET'
}

// 更新API配置以设置认证请求头
const setAuthHeaders = (loginData: LoginResponse) => {
  if (process.client) {
    // 保存登录信息到localStorage
    // accessToken已经包含了Bearer前缀，直接保存
    localStorage.setItem('auth_token', loginData.accessToken)
    localStorage.setItem('refresh_token', loginData.refreshToken)
    localStorage.setItem('user_id', loginData.userInfo.userId)
    localStorage.setItem('tenant_id', loginData.userInfo.tenantId)
    // 保存为标准的请求头值
    localStorage.setItem('platform_type', 'AI_PROJECT')
    localStorage.setItem('client_type', 'AI_C_WEB')
    localStorage.setItem('user_info', JSON.stringify(loginData))
  }
  
  // 设置请求头的token（accessToken已经包含Bearer前缀）
  setAuthToken(loginData.accessToken)
}

// 获取认证请求头
const getAuthHeaders = () => {
  if (process.client) {
    const userId = localStorage.getItem('user_id')
    const tenantId = localStorage.getItem('tenant_id')
    const platformType = localStorage.getItem('platform_type')
    const clientType = localStorage.getItem('client_type')
    const authToken = localStorage.getItem('auth_token')
    
    const headers: Record<string, string> = {
      'X-Tenant-Id': tenantId || '0',
      'X-Auth-User-Id': userId || '', 
      'X-Auth-Platform-Type': platformType || 'AI_PROJECT',
      'X-Client-Type': clientType || 'AI_C_WEB'
    }
    
    // 添加Authorization头（如果有token）
    if (authToken) {
      headers['Authorization'] = authToken
    }
    
    return headers
  }
  return {}
}

// 获取基础请求头（用于登录前的请求）
const getBaseHeaders = () => {
  return {
    'X-Auth-Platform-Type': 'AI_PROJECT',
    'X-Client-Type': 'AI_C_WEB'
  }
}

// 发送短信验证码
const sendSmsCode = async (phone: string, type: 'register' | 'login' | 'reset' = 'register') => {
  try {
    // 将type转换为服务端期望的大写格式
    const codeType = type.toUpperCase()
    
    const data = await post(getPath('sendSmsCode'), { 
      phoneNumber: phone,  // 修改参数名为phoneNumber
      codeType              // 修改参数名为codeType，值为大写
    }, {
      headers: getBaseHeaders()
    })
    return data
  } catch (error) {
    console.error('发送短信验证码失败:', error)
    throw error
  }
}

// 发送邮箱验证码
const sendEmailCode = async (email: string, type: 'register' | 'login' | 'reset' = 'register') => {
  try {
    // 将type转换为服务端期望的大写格式
    const codeType = type.toUpperCase()
    
    const data = await post(getPath('sendEmailCode'), { 
      email, 
      codeType  // 修改参数名为codeType，值为大写
    }, {
      headers: getBaseHeaders()
    })
    return data
  } catch (error) {
    console.error('发送邮箱验证码失败:', error)
    throw error
  }
}

// 注册接口
const register = async (registerData: RegisterRequest) => {
  try {
    const data: LoginResponse = await post(getPath('register'), registerData, {
      headers: getBaseHeaders()
    })
    
    // 注册成功后，自动设置认证信息（如果接口返回了令牌）
    if (data && data.accessToken) {
      setAuthHeaders(data)
    }
    
    return data
  } catch (error) {
    console.error('注册失败:', error)
    throw error
  }
}

// API通用响应结构
interface ApiResponse<T> {
  code: number
  message: string
  data: T
  timestamp: string
  error: boolean
  success: boolean
}

// 登录接口 - 支持邮箱或手机号登录
const login = async (loginData: LoginRequest) => {
  try {
    const response: ApiResponse<LoginResponse> = await post(getPath('login'), loginData, {
      headers: getBaseHeaders()
    })
    
    if (response && response.success && response.data && response.data.accessToken) {
      // 保存认证信息和设置请求头
      setAuthHeaders(response.data)
    }
    
    return response
  } catch (error) {
    console.error('登录失败:', error)
    throw error
  }
}

// 移除单独的验证码登录接口，统一使用login接口

// 获取用户信息
const getUserInfo = async () => {
  try {
    const data = await get(getPath('info'), {
      headers: getAuthHeaders()
    })
    return data
  } catch (error) {
    console.error('获取用户信息失败:', error)
    throw error
  }
}

// 获取我的团队信息
const getMyTeam = async () => {
  try {
    const data = await post(getPath('myTeam'), {}, {
      headers: getAuthHeaders()
    })
    return data
  } catch (error) {
    console.error('获取团队信息失败:', error)
    throw error
  }
}

// 登出
const logout = async () => {
  try {
    // 先调用登出API
    await post(getPath('logout'), {}, {
      headers: getAuthHeaders()
    })
  } catch (error) {
    console.error('登出API调用失败:', error)
    // 即使API调用失败，也要清除本地存储
  } finally {
    // 清除所有认证相关信息
    if (process.client) {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('user_id')
      localStorage.removeItem('tenant_id')
      localStorage.removeItem('platform_type')
      localStorage.removeItem('client_type')
      localStorage.removeItem('user_info')
      localStorage.removeItem('isLoggedIn')
      localStorage.removeItem('userInfo')
      localStorage.removeItem('teamInfo')
      
      // 清除旧的token key（兼容）
      localStorage.removeItem('auth_token')
      localStorage.removeItem('tenant_code') // 兼容旧字段
      
      // 清除记住密码相关信息（可选）
      localStorage.removeItem('rememberPassword')
      localStorage.removeItem('savedEmail')
      localStorage.removeItem('savedPhone')
      localStorage.removeItem('savedPassword')
      localStorage.removeItem('savedAuthMethod')
    }
  }
}

// 初始化认证状态
const initAuth = () => {
  if (process.client) {
    const token = localStorage.getItem('auth_token')
    const userId = localStorage.getItem('user_id')
    const tenantId = localStorage.getItem('tenant_id')
    
    if (token && userId && tenantId) {
      setAuthToken(token)
      return true
    }
  }
  return false
}

// 检查是否已登录
const isLoggedIn = () => {
  if (process.client) {
    const token = localStorage.getItem('auth_token')
    const userId = localStorage.getItem('user_id')
    const tenantId = localStorage.getItem('tenant_id')
    return !!(token && userId && tenantId)
  }
  return false
}

export {
  login,
  register,
  logout,
  getUserInfo,
  getMyTeam,
  initAuth,
  isLoggedIn,
  getAuthHeaders,
  setAuthHeaders,
  sendSmsCode,
  sendEmailCode
}

// 添加默认导出
export default {
  login,
  register,
  logout,
  getUserInfo,
  getMyTeam,
  initAuth,
  isLoggedIn,
  getAuthHeaders,
  setAuthHeaders,
  sendSmsCode,
  sendEmailCode
} 