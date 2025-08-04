import { post, get } from '../index'
import apiConfig, { setAuthToken, buildApiPath } from '../apiConfig'

// 认证模块API路径配置（相对路径，不包含前缀）
const authApiPaths = {
  login: '/pod/tenant/api/v1/tenants/login',
  loginBySms: '/pod/tenant/api/v1/tenants/login-by-sms', // 添加验证码登录接口
  register: '/pod/tenant/api/v1/tenants/register',
  sendSmsCode: '/pod/tenant/api/v1/sms/send-code',
  sendEmailCode: '/pod/tenant/api/v1/email/send-code', // 添加邮箱验证码接口
  info: '/user/info'
}

// 构建完整路径的辅助方法
const getPath = (path: keyof typeof authApiPaths) => {
  // 登录、注册、短信、邮箱接口不需要cuzcuz-ai前缀
  if (path === 'login' || path === 'loginBySms' || path === 'register' || path === 'sendSmsCode' || path === 'sendEmailCode') {
    return authApiPaths[path]
  }
  return buildApiPath(authApiPaths[path])
}

// 登录接口响应类型
interface LoginResponse {
  accessToken: string
  avatar: string | null
  email: string
  expiresIn: string
  galleryStorageSize: number
  lastLoginTime: string
  loginTime: string
  nickname: string
  permissions: any[]
  phone: string
  refreshToken: string
  role: string
  tenantCode: string
  tenantId: string
  tenantName: string
  tokenType: string
  userId: string
  username: string
}

// 注册接口请求类型
interface RegisterRequest {
  email?: string
  phone?: string
  password: string
  smsCode?: string
  emailCode?: string
  nickname?: string
}

// 登录请求类型 - 统一使用account字段
interface LoginRequest {
  account: string  // 邮箱或手机号
  password?: string  // 密码登录
  captcha?: string   // 验证码登录
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
    localStorage.setItem('auth_token', loginData.accessToken)
    localStorage.setItem('refresh_token', loginData.refreshToken)
    localStorage.setItem('user_id', loginData.userId)
    localStorage.setItem('tenant_id', loginData.tenantId)
    localStorage.setItem('tenant_code', loginData.tenantCode)
    localStorage.setItem('user_info', JSON.stringify(loginData))
  }
  
  // 设置请求头的token
  setAuthToken(`${loginData.tokenType} ${loginData.accessToken}`)
}

// 获取认证请求头
const getAuthHeaders = () => {
  if (process.client) {
    const userId = localStorage.getItem('user_id')
    const tenantId = localStorage.getItem('tenant_id')
    
    return {
      'X-Tenant-Id': tenantId || '',
      'X-Auth-User-Id': userId || '', 
      'X-Auth-Platform-Type': 'web',
      'X-Client-Type': 'cuzcuz-ai-web'
    }
  }
  return {}
}

// 获取基础请求头（用于登录前的请求）
const getBaseHeaders = () => {
  return {
    'X-Auth-Platform-Type': 'web',
    'X-Client-Type': 'cuzcuz-ai-web'
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

// 登录接口 - 支持邮箱或手机号登录
const login = async (loginData: LoginRequest) => {
  try {
    const data: LoginResponse = await post(getPath('login'), loginData, {
      headers: getBaseHeaders()
    })
    
    if (data && data.accessToken) {
      // 保存认证信息和设置请求头
      setAuthHeaders(data)
    }
    
    return data
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

// 登出
const logout = () => {
  if (process.client) {
    // 清除所有认证相关信息
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('user_id')
    localStorage.removeItem('tenant_id')
    localStorage.removeItem('tenant_code')
    localStorage.removeItem('user_info')
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userInfo')
    
    // 清除旧的token key（兼容）
    localStorage.removeItem('auth_token')
    
    // 清除记住密码相关信息（可选）
    localStorage.removeItem('rememberPassword')
    localStorage.removeItem('savedEmail')
    localStorage.removeItem('savedPhone')
    localStorage.removeItem('savedPassword')
    localStorage.removeItem('savedAuthMethod')
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
  initAuth,
  isLoggedIn,
  getAuthHeaders,
  setAuthHeaders,
  sendSmsCode,
  sendEmailCode
} 