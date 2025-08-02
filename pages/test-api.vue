<template>
  <div class="min-h-screen bg-black text-white p-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold mb-8 text-center text-cyan-400">API 测试页面</h1>
      
      <!-- 登录测试 -->
      <div class="bg-gray-900 rounded-lg p-6 mb-8">
        <h2 class="text-xl font-bold mb-4 text-blue-400">登录接口测试</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <!-- 登录方式选择 -->
            <div class="mb-4">
              <label class="block text-sm font-medium mb-2">登录方式</label>
              <div class="flex space-x-2">
                <button
                  type="button"
                  @click="loginMethod = 'email'"
                  :class="[
                    'px-4 py-2 rounded transition-all',
                    loginMethod === 'email' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
                  ]"
                >
                  邮箱登录
                </button>
                <button
                  type="button"
                  @click="loginMethod = 'phone'"
                  :class="[
                    'px-4 py-2 rounded transition-all',
                    loginMethod === 'phone' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
                  ]"
                >
                  手机登录
                </button>
              </div>
            </div>
            
            <div v-if="loginMethod === 'email'" class="mb-4">
              <label class="block text-sm font-medium mb-2">邮箱</label>
              <input 
                v-model="testForm.email"
                type="email" 
                class="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white"
                placeholder="输入邮箱地址"
              >
            </div>
            
            <div v-if="loginMethod === 'phone'" class="mb-4">
              <label class="block text-sm font-medium mb-2">手机号</label>
              <input 
                v-model="testForm.phone"
                type="tel" 
                class="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white"
                placeholder="输入手机号码"
              >
            </div>

            <!-- 手机登录方式选择 -->
            <div v-if="loginMethod === 'phone'" class="mb-4">
              <label class="block text-sm font-medium mb-2">登录方式</label>
              <div class="flex space-x-2">
                <button
                  type="button"
                  @click="phoneTestLoginMethod = 'password'"
                  :class="[
                    'px-3 py-1 rounded text-sm transition-all',
                    phoneTestLoginMethod === 'password' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
                  ]"
                >
                  密码
                </button>
                <button
                  type="button"
                  @click="phoneTestLoginMethod = 'sms'"
                  :class="[
                    'px-3 py-1 rounded text-sm transition-all',
                    phoneTestLoginMethod === 'sms' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
                  ]"
                >
                  验证码
                </button>
              </div>
            </div>
            
            <div v-if="loginMethod === 'email' || (loginMethod === 'phone' && phoneTestLoginMethod === 'password')" class="mb-4">
              <label class="block text-sm font-medium mb-2">密码</label>
              <input 
                v-model="testForm.password"
                type="password" 
                class="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white"
                placeholder="输入密码"
              >
            </div>

            <!-- 手机登录验证码 -->
            <div v-if="loginMethod === 'phone' && phoneTestLoginMethod === 'sms'" class="mb-4 flex space-x-2">
              <input 
                v-model="testForm.loginSmsCode"
                type="text" 
                maxlength="6"
                class="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white"
                placeholder="登录验证码"
              >
              <button 
                @click="testSendLoginSmsCode"
                :disabled="isLoginSmsLoading || !testForm.phone"
                class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded disabled:opacity-50"
              >
                {{ isLoginSmsLoading ? '发送中...' : '获取登录验证码' }}
              </button>
            </div>
            
            <button 
              @click="testLogin"
              :disabled="isTestLoading"
              class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded disabled:opacity-50 mb-4"
            >
              {{ isTestLoading ? '测试中...' : '测试登录' }}
            </button>
          </div>
          
          <div>
            <h3 class="text-sm font-medium mb-2">API信息</h3>
            <div class="bg-gray-800 p-4 rounded text-sm space-y-2">
              <div><strong>接口：</strong> /pod/tenant/api/v1/tenants/login</div>
              <div><strong>方法：</strong> POST</div>
              <div><strong>请求头：</strong></div>
              <ul class="ml-4 text-xs text-gray-400">
                <li>X-Auth-Platform-Type: web</li>
                <li>X-Client-Type: cuzcuz-ai-web</li>
              </ul>
              <div><strong>请求体：</strong></div>
              <ul class="ml-4 text-xs text-gray-400">
                <li v-if="loginMethod === 'email'">email: 用户邮箱</li>
                <li v-if="loginMethod === 'phone'">phone: 用户手机号</li>
                <li>password: 用户密码</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- 注册测试 -->
      <div class="bg-gray-900 rounded-lg p-6 mb-8">
        <h2 class="text-xl font-bold mb-4 text-green-400">注册接口测试</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <!-- 注册方式选择 -->
            <div class="mb-4">
              <label class="block text-sm font-medium mb-2">注册方式</label>
              <div class="flex space-x-2">
                <button
                  type="button"
                  @click="registerMethod = 'email'"
                  :class="[
                    'px-4 py-2 rounded transition-all',
                    registerMethod === 'email' ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300'
                  ]"
                >
                  邮箱注册
                </button>
                <button
                  type="button"
                  @click="registerMethod = 'phone'"
                  :class="[
                    'px-4 py-2 rounded transition-all',
                    registerMethod === 'phone' ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300'
                  ]"
                >
                  手机注册
                </button>
              </div>
            </div>
            
            <div v-if="registerMethod === 'email'" class="mb-4">
              <label class="block text-sm font-medium mb-2">邮箱</label>
              <input 
                v-model="registerForm.email"
                type="email" 
                class="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white"
                placeholder="输入邮箱地址"
              >
            </div>
            
            <div v-if="registerMethod === 'phone'" class="mb-4">
              <label class="block text-sm font-medium mb-2">手机号</label>
              <input 
                v-model="registerForm.phone"
                type="tel" 
                class="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white"
                placeholder="输入手机号码"
              >
            </div>
            
            <div class="mb-4">
              <label class="block text-sm font-medium mb-2">密码</label>
              <input 
                v-model="registerForm.password"
                type="password" 
                class="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white"
                placeholder="输入密码"
              >
            </div>
            
            <div v-if="registerMethod === 'phone'" class="mb-4 flex space-x-2">
              <input 
                v-model="registerForm.smsCode"
                type="text" 
                maxlength="6"
                class="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white"
                placeholder="短信验证码"
              >
              <button 
                @click="testSendSmsCode"
                :disabled="isSmsLoading || !registerForm.phone"
                class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded disabled:opacity-50"
              >
                {{ isSmsLoading ? '发送中...' : '获取短信验证码' }}
              </button>
            </div>
            
            <div v-if="registerMethod === 'email'" class="mb-4 flex space-x-2">
              <input 
                v-model="registerForm.emailCode"
                type="text" 
                maxlength="6"
                class="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white"
                placeholder="邮箱验证码"
              >
              <button 
                @click="testSendEmailCode"
                :disabled="isEmailLoading || !registerForm.email"
                class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded disabled:opacity-50"
              >
                {{ isEmailLoading ? '发送中...' : '获取邮箱验证码' }}
              </button>
            </div>
            
            <button 
              @click="testRegister"
              :disabled="isRegisterLoading"
              class="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded disabled:opacity-50"
            >
              {{ isRegisterLoading ? '测试中...' : '测试注册' }}
            </button>
          </div>
          
          <div>
            <h3 class="text-sm font-medium mb-2">API信息</h3>
            <div class="bg-gray-800 p-4 rounded text-sm space-y-2">
              <div><strong>注册接口：</strong> /pod/tenant/api/v1/tenants/register</div>
              <div><strong>短信接口：</strong> /pod/tenant/api/v1/sms/send-code</div>
              <div><strong>邮箱接口：</strong> /pod/tenant/api/v1/email/send-code</div>
              <div><strong>方法：</strong> POST</div>
              <div><strong>请求头：</strong></div>
              <ul class="ml-4 text-xs text-gray-400">
                <li>X-Auth-Platform-Type: web</li>
                <li>X-Client-Type: cuzcuz-ai-web</li>
              </ul>
              <div><strong>注册请求体：</strong></div>
              <ul class="ml-4 text-xs text-gray-400">
                <li v-if="registerMethod === 'email'">email: 用户邮箱</li>
                <li v-if="registerMethod === 'phone'">phone: 手机号码</li>
                <li>password: 用户密码</li>
                <li v-if="registerMethod === 'email'">emailCode: 邮箱验证码</li>
                <li v-if="registerMethod === 'phone'">smsCode: 短信验证码</li>
              </ul>
              <div><strong>验证码请求体：</strong></div>
              <ul class="ml-4 text-xs text-gray-400">
                <li v-if="registerMethod === 'email'">email: 邮箱地址, type: register</li>
                <li v-if="registerMethod === 'phone'">phone: 手机号码, type: register</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 响应结果 -->
      <div class="bg-gray-900 rounded-lg p-6 mb-8">
        <h2 class="text-xl font-bold mb-4 text-green-400">响应结果</h2>
        <div class="bg-gray-800 p-4 rounded">
          <pre class="text-sm overflow-auto">{{ responseData || '暂无数据' }}</pre>
        </div>
      </div>
      
      <!-- 当前认证状态 -->
      <div class="bg-gray-900 rounded-lg p-6">
        <h2 class="text-xl font-bold mb-4 text-yellow-400">当前认证状态</h2>
        <div class="bg-gray-800 p-4 rounded">
          <div class="space-y-2 text-sm">
            <div><strong>已登录：</strong> {{ isLoggedIn ? '是' : '否' }}</div>
            <div><strong>访问令牌：</strong> {{ authToken || '无' }}</div>
            <div><strong>用户ID：</strong> {{ userId || '无' }}</div>
            <div><strong>租户ID：</strong> {{ tenantId || '无' }}</div>
            <div><strong>租户代码：</strong> {{ tenantCode || '无' }}</div>
          </div>
          
          <div class="mt-4 space-x-4">
            <button 
              @click="refreshAuthStatus"
              class="bg-yellow-600 hover:bg-yellow-700 text-white py-1 px-3 rounded text-sm"
            >
              刷新状态
            </button>
            <button 
              @click="clearAuth"
              class="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded text-sm"
            >
              清除认证
            </button>
            <NuxtLink 
              to="/login"
              class="inline-block bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded text-sm"
            >
              去登录页面
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 测试表单
const testForm = ref({
  email: '',
  password: '',
  phone: '', // Added for phone login
  loginSmsCode: '' // Added for phone login sms code
})

const isTestLoading = ref(false)
const responseData = ref(null)

// 注册表单
const registerForm = ref({
  email: '',
  phone: '',
  password: '',
  smsCode: '',
  emailCode: '' // Added for email verification
})

const isSmsLoading = ref(false)
const isRegisterLoading = ref(false)
const isEmailLoading = ref(false) // Added for email verification

// 认证状态
const isLoggedIn = ref(false)
const authToken = ref('')
const userId = ref('')
const tenantId = ref('')
const tenantCode = ref('')

// 登录方式选择
const loginMethod = ref('email')
// 注册方式选择
const registerMethod = ref('email')

// 手机登录方式选择
const phoneTestLoginMethod = ref('password')
const isLoginSmsLoading = ref(false)

// 测试登录
const testLogin = async () => {
  if (loginMethod.value === 'email' && !testForm.value.email) {
    alert('请输入邮箱地址')
    return
  }
  if (loginMethod.value === 'phone' && !testForm.value.phone) {
    alert('请输入手机号码')
    return
  }
  if ((loginMethod.value === 'email' || phoneTestLoginMethod.value === 'password') && !testForm.value.password) {
    alert('请输入密码')
    return
  }
  if (loginMethod.value === 'phone' && phoneTestLoginMethod.value === 'sms' && !testForm.value.loginSmsCode) {
    alert('请输入登录验证码')
    return
  }

  isTestLoading.value = true
  responseData.value = null

  try {
    const { $auth } = useNuxtApp()
    let result
    
    if (loginMethod.value === 'email') {
      // 邮箱密码登录
      result = await $auth.login({
        email: testForm.value.email,
        password: testForm.value.password
      })
    } else {
      // 手机号登录
      if (phoneTestLoginMethod.value === 'sms') {
        // 手机号验证码登录
        result = await $auth.loginBySms(testForm.value.phone, testForm.value.loginSmsCode)
      } else {
        // 手机号密码登录
        result = await $auth.login({
          phone: testForm.value.phone,
          password: testForm.value.password
        })
      }
    }
    
    responseData.value = JSON.stringify(result, null, 2)
    refreshAuthStatus()
  } catch (error) {
    console.error('登录测试失败:', error)
    responseData.value = JSON.stringify({
      error: true,
      message: error.message || '登录失败',
      details: error.response?.data || error
    }, null, 2)
  } finally {
    isTestLoading.value = false
  }
}

// 测试发送验证码 (短信)
const testSendSmsCode = async () => {
  if (!registerForm.value.phone) {
    alert('请输入手机号码')
    return
  }

  isSmsLoading.value = true
  responseData.value = null

  try {
    const { $auth } = useNuxtApp()
    const result = await $auth.sendSmsCode(registerForm.value.phone, 'register')
    responseData.value = JSON.stringify(result, null, 2)
  } catch (error) {
    console.error('发送短信验证码失败:', error)
    responseData.value = JSON.stringify({
      error: true,
      message: error.message || '发送短信验证码失败',
      details: error.response?.data || error
    }, null, 2)
  } finally {
    isSmsLoading.value = false
  }
}

// 测试发送验证码 (邮箱)
const testSendEmailCode = async () => {
  if (!registerForm.value.email) {
    alert('请输入邮箱地址')
    return
  }

  isEmailLoading.value = true
  responseData.value = null

  try {
    const { $auth } = useNuxtApp()
    const result = await $auth.sendEmailCode(registerForm.value.email, 'register')
    responseData.value = JSON.stringify(result, null, 2)
  } catch (error) {
    console.error('发送邮箱验证码失败:', error)
    responseData.value = JSON.stringify({
      error: true,
      message: error.message || '发送邮箱验证码失败',
      details: error.response?.data || error
    }, null, 2)
  } finally {
    isEmailLoading.value = false
  }
}

// 测试注册
const testRegister = async () => {
  if (registerMethod.value === 'email' && !registerForm.value.email) {
    alert('请输入邮箱地址')
    return
  }
  if (registerMethod.value === 'phone' && !registerForm.value.phone) {
    alert('请输入手机号码')
    return
  }
  if (!registerForm.value.password) {
    alert('请输入密码')
    return
  }
  if (registerMethod.value === 'phone' && !registerForm.value.smsCode) {
    alert('请输入短信验证码')
    return
  }
  if (registerMethod.value === 'email' && !registerForm.value.emailCode) {
    alert('请输入邮箱验证码')
    return
  }

  isRegisterLoading.value = true
  responseData.value = null

  try {
    const { $auth } = useNuxtApp()
    let registerData = {}
    
    if (registerMethod.value === 'email') {
      registerData = {
        email: registerForm.value.email,
        password: registerForm.value.password,
        emailCode: registerForm.value.emailCode
      }
    } else {
      registerData = {
        phone: registerForm.value.phone,
        password: registerForm.value.password,
        smsCode: registerForm.value.smsCode
      }
    }
    
    const result = await $auth.register(registerData)
    responseData.value = JSON.stringify(result, null, 2)
    refreshAuthStatus()
  } catch (error) {
    console.error('注册测试失败:', error)
    responseData.value = JSON.stringify({
      error: true,
      message: error.message || '注册失败',
      details: error.response?.data || error
    }, null, 2)
  } finally {
    isRegisterLoading.value = false
  }
}

// 测试发送登录验证码 (手机)
const testSendLoginSmsCode = async () => {
  if (!testForm.value.phone) {
    alert('请输入手机号码')
    return
  }

  isLoginSmsLoading.value = true
  responseData.value = null

  try {
    const { $auth } = useNuxtApp()
    const result = await $auth.sendSmsCode(testForm.value.phone, 'login')
    responseData.value = JSON.stringify(result, null, 2)
  } catch (error) {
    console.error('发送登录验证码失败:', error)
    responseData.value = JSON.stringify({
      error: true,
      message: error.message || '发送登录验证码失败',
      details: error.response?.data || error
    }, null, 2)
  } finally {
    isLoginSmsLoading.value = false
  }
}

// 刷新认证状态
const refreshAuthStatus = () => {
  if (process.client) {
    isLoggedIn.value = localStorage.getItem('isLoggedIn') === 'true'
    authToken.value = localStorage.getItem('auth_token') || ''
    userId.value = localStorage.getItem('user_id') || ''
    tenantId.value = localStorage.getItem('tenant_id') || ''
    tenantCode.value = localStorage.getItem('tenant_code') || ''
  }
}

// 清除认证
const clearAuth = () => {
  const { $auth } = useNuxtApp()
  $auth.logout()
  refreshAuthStatus()
  responseData.value = null
  alert('认证信息已清除')
}

// 页面加载时刷新状态
onMounted(() => {
  refreshAuthStatus()
})

// 页面元数据
useHead({
  title: 'API测试 - CUZCUZAI',
  meta: [
    { name: 'description', content: 'CUZCUZAI API接口测试页面' }
  ]
})
</script> 