<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white relative overflow-hidden">
    <!-- 背景装饰元素 -->
    <div class="absolute inset-0">
      <!-- 大圆形背景 -->
      <div class="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-gray-700/30 to-gray-600/20 rounded-full transform -translate-x-32 -translate-y-32"></div>
      <div class="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tr from-gray-700/20 to-gray-600/10 rounded-full transform translate-x-24 translate-y-24"></div>
      
      <!-- 中等圆形 -->
      <div class="absolute top-1/3 right-1/4 w-48 h-48 bg-gradient-to-br from-green-500/10 to-emerald-500/5 rounded-full"></div>
      <div class="absolute bottom-1/4 left-1/3 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-red-500/5 rounded-full"></div>
      
      <!-- 小装饰点 -->
      <div class="absolute top-1/3 left-1/2 w-4 h-4 bg-green-400/60 rounded-full animate-pulse"></div>
      <div class="absolute top-1/4 left-1/4 w-2 h-2 bg-orange-400/60 rounded-full animate-pulse" style="animation-delay: 1s"></div>
      <div class="absolute bottom-1/3 right-1/3 w-3 h-3 bg-purple-400/60 rounded-full animate-pulse" style="animation-delay: 2s"></div>
    </div>

    <div class="relative z-10 flex min-h-screen">
      <!-- 左侧登录表单区域 -->
      <div class="w-96 bg-gray-900/80 backdrop-blur-sm border-r border-gray-700/50 flex items-center justify-center p-8">
        <div class="w-full max-w-sm">
          <!-- 表单头部 -->
          <div class="text-center mb-8">
            <div class="flex items-center justify-center space-x-2 mb-4">
              <div class="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
                <span class="text-black font-bold text-sm">灵</span>
              </div>
              <span class="text-xl font-bold">CUZCUZAI</span>
            </div>
            <h2 class="text-2xl font-bold mb-2">创建账户</h2>
            <p class="text-gray-400 text-sm">加入CUZCUZAI，开启创作之旅</p>
          </div>

          <!-- 消息提示 -->
          <div v-if="message" class="mb-4 p-3 rounded-lg text-sm" :class="{
            'bg-green-100 text-green-800 border border-green-200': messageType === 'success',
            'bg-red-100 text-red-800 border border-red-200': messageType === 'error'
          }">
            {{ message }}
          </div>

          <!-- 注册表单 -->
          <form @submit.prevent="handleRegister" class="space-y-6">
            <!-- 用户名输入 -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">用户名</label>
              <input 
                v-model="registerForm.username"
                type="text" 
                required
                class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-white placeholder-gray-400"
                placeholder="请输入用户名"
              >
            </div>
            
            <!-- 邮箱输入 -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">邮箱</label>
              <input 
                v-model="registerForm.email"
                type="email" 
                required
                class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-white placeholder-gray-400"
                placeholder="请输入您的邮箱"
              >
            </div>
            
            <!-- 密码输入 -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">密码</label>
              <input 
                v-model="registerForm.password"
                type="password" 
                required
                class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-white placeholder-gray-400"
                placeholder="请输入密码"
              >
            </div>
            
            <!-- 确认密码输入 -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">确认密码</label>
              <input 
                v-model="registerForm.confirmPassword"
                type="password" 
                required
                class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-white placeholder-gray-400"
                placeholder="请再次输入密码"
              >
            </div>
            
            <!-- 服务条款 -->
            <div class="flex items-center space-x-3">
              <label class="flex items-center space-x-3 cursor-pointer group">
                <div class="relative">
                  <input 
                    v-model="agreeToTerms" 
                    type="checkbox"
                    class="sr-only"
                    required
                  >
                  <!-- 未选中状态：深灰色背景，灰色边框 -->
                  <!-- 选中状态：亮绿色背景，绿色边框，白色对勾 -->
                  <div class="w-5 h-5 rounded border-2 transition-all duration-300 ease-in-out flex items-center justify-center transform"
                       :class="agreeToTerms 
                         ? 'bg-green-500 border-green-500 scale-110 shadow-lg shadow-green-500/50' 
                         : 'bg-gray-700 border-gray-500 group-hover:border-gray-400 group-hover:bg-gray-600'">
                    <!-- 对勾图标，仅在选中时显示 -->
                    <svg v-if="agreeToTerms" 
                         class="w-3.5 h-3.5 text-white checkmark-animation" 
                         fill="none" 
                         stroke="currentColor" 
                         viewBox="0 0 24 24">
                      <path stroke-linecap="round" 
                            stroke-linejoin="round" 
                            stroke-width="3" 
                            d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                </div>
                <span class="text-gray-300 text-sm group-hover:text-white transition-colors">
                  我已阅读并同意
                  <a href="#" class="text-green-400 hover:text-green-300 transition-colors">服务条款</a>
                  和
                  <a href="#" class="text-green-400 hover:text-green-300 transition-colors">隐私政策</a>
                </span>
              </label>
            </div>
            
            <!-- 注册按钮 -->
            <button 
              type="submit"
              :disabled="loading || !agreeToTerms"
              class="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all transform hover:scale-105 disabled:hover:scale-100 shadow-lg"
            >
              <span v-if="loading" class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                注册中...
              </span>
              <span v-else>创建账户</span>
            </button>
          </form>
          
          <!-- 登录链接 -->
          <div class="mt-6 text-center">
            <p class="text-gray-400 text-sm">
              已有账户？
              <a href="/login" class="text-green-400 hover:text-green-300 transition-colors font-medium">立即登录</a>
            </p>
          </div>
        </div>
      </div>

      <!-- 右侧内容区域 -->
      <div class="flex-1 flex items-center justify-center p-8">
        <div class="max-w-md text-center">
          <!-- 特色功能展示 -->
          <div class="mb-8">
            <h1 class="text-4xl font-bold mb-4">加入CUZCUZAI</h1>
            <p class="text-xl text-gray-300 mb-8">解锁无限创作可能</p>
            
            <!-- 功能特点 -->
            <div class="space-y-6">
              <div class="flex items-center space-x-4">
                <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <div class="text-left">
                  <h3 class="text-lg font-semibold">AI智能创作</h3>
                  <p class="text-gray-400 text-sm">强大的AI引擎助力您的创作</p>
                </div>
              </div>
              
              <div class="flex items-center space-x-4">
                <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <div class="text-left">
                  <h3 class="text-lg font-semibold">个性化定制</h3>
                  <p class="text-gray-400 text-sm">根据您的需求量身定制</p>
                </div>
              </div>
              
              <div class="flex items-center space-x-4">
                <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z"/>
                  </svg>
                </div>
                <div class="text-left">
                  <h3 class="text-lg font-semibold">多格式输出</h3>
                  <p class="text-gray-400 text-sm">支持多种创作格式和媒体</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { register } from '~/apis/auth'

// 注册表单数据
const registerForm = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

// 加载状态和消息
const loading = ref(false)
const message = ref('')
const messageType = ref('') // 'success', 'error'

// 同意条款状态
const agreeToTerms = ref(false)

// 显示消息
const showMessage = (msg, type = 'error') => {
  message.value = msg
  messageType.value = type
  
  // 自动清除消息
  setTimeout(() => {
    message.value = ''
    messageType.value = ''
  }, 5000)
}

// 处理注册
const handleRegister = async () => {
  // 清除之前的消息
  message.value = ''
  messageType.value = ''
  
  // 验证是否同意条款
  if (!agreeToTerms.value) {
    showMessage('请先同意服务条款和隐私政策', 'error')
    return
  }
  
  if (registerForm.value.password !== registerForm.value.confirmPassword) {
    showMessage('密码不一致，请重新输入', 'error')
    return
  }

  try {
    loading.value = true
    
    // 准备注册数据
    const registerData = {
      contactEmail: registerForm.value.email,
      password: registerForm.value.password,
      nickname: registerForm.value.username
    }
    
    console.log('开始注册，数据:', registerData)
    
    // 使用Nuxt的auth插件调用注册API
    const { $auth } = useNuxtApp()
    const response = await $auth.register(registerData)
    
    console.log('注册响应:', response)
    
    // 检查注册是否成功并且返回了accessToken
    if (response && response.success && response.data && response.data.accessToken) {
      const userData = response.data
      
      console.log('注册成功，保存登录状态并跳转到dashboard')
      
      // 保存登录状态到localStorage (兼容现有逻辑)
      localStorage.setItem('isLoggedIn', 'true')
      
      // 保存认证相关信息（用于API调用）
      localStorage.setItem('auth_token', userData.accessToken)
      localStorage.setItem('access_token', userData.accessToken) // 保留兼容性
      localStorage.setItem('user_id', userData.userId)
      localStorage.setItem('tenant_id', userData.tenantId)
      
      // 保存完整用户信息
      localStorage.setItem('userInfo', JSON.stringify({
        email: userData.email || userData.username,
        name: userData.nickname || '用户',
        avatar: userData.avatar || '',
        userId: userData.userId,
        tenantId: userData.tenantId,
        tenantCode: userData.tenantCode,
        tenantName: userData.tenantName,
        permissions: userData.permissions || []
      }))
      
      // 显示成功提示
      showMessage('注册成功，欢迎使用CUZCUZAI！', 'success')
      
      // 延迟跳转，确保认证状态已保存
      setTimeout(async () => {
        try {
          await navigateTo('/dashboard')
        } catch (error) {
          console.error('跳转失败:', error)
          // 强制刷新到dashboard页面
          window.location.href = '/dashboard'
        }
      }, 500)
    } else {
      // 注册失败，显示错误信息
      const errorMessage = response?.message || '注册失败，请重试'
      showMessage(errorMessage, 'error')
      console.error('注册失败:', errorMessage)
    }
    
  } catch (error) {
    console.error('注册过程中发生错误:', error)
    
    // 提取错误信息
    let errorMessage = '注册失败，请重试'
    if (error?.response?.data?.message) {
      errorMessage = error.response.data.message
    } else if (error?.message) {
      errorMessage = error.message
    }
    
    showMessage(errorMessage, 'error')
  } finally {
    loading.value = false
  }
}

// 页面元数据
useHead({
  title: '注册 - CUZCUZAI',
  meta: [
    { name: 'description', content: '注册CUZCUZAI账户，开启您的AI创作之旅' }
  ]
})
</script>

<style scoped>
/* 自定义动画 */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

/* 自定义弹跳动画 - 更柔和的效果 */
@keyframes checkmark-bounce {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.checkmark-animation {
  animation: checkmark-bounce 0.3s ease-out;
}
</style>