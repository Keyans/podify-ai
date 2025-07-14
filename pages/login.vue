<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white relative overflow-hidden">
    <!-- 背景装饰元素 -->
    <div class="absolute inset-0">
      <!-- 大圆形背景 -->
      <div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-gray-700/30 to-gray-600/20 rounded-full transform translate-x-32 -translate-y-32"></div>
      <div class="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-gray-700/20 to-gray-600/10 rounded-full transform -translate-x-24 translate-y-24"></div>
      
      <!-- 中等圆形 -->
      <div class="absolute top-1/4 left-1/4 w-48 h-48 bg-gradient-to-br from-blue-500/10 to-cyan-500/5 rounded-full"></div>
      <div class="absolute bottom-1/3 right-1/3 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-pink-500/5 rounded-full"></div>
      
      <!-- 小装饰点 -->
      <div class="absolute top-1/2 left-1/2 w-4 h-4 bg-orange-400/60 rounded-full animate-pulse"></div>
      <div class="absolute top-1/3 right-1/4 w-2 h-2 bg-green-400/60 rounded-full animate-pulse" style="animation-delay: 1s"></div>
      <div class="absolute bottom-1/4 left-1/3 w-3 h-3 bg-blue-400/60 rounded-full animate-pulse" style="animation-delay: 2s"></div>
    </div>

    <div class="relative z-10 flex min-h-screen">
      <!-- 左侧内容区域 -->
      <div class="flex-1 flex items-center justify-center p-8">
        <div class="max-w-md">
          <!-- 机器人/宇航员形象区域 -->
          <div class="relative mb-8">
            <!-- 主要圆形容器 -->
            <div class="w-64 h-64 mx-auto relative">
              <!-- 外圈装饰 -->
              <div class="absolute inset-0 border-2 border-gray-600/30 rounded-full"></div>
              <div class="absolute inset-4 border border-gray-500/20 rounded-full"></div>
              
              <!-- 中心高亮区域 -->
              <div class="absolute inset-8 bg-gradient-to-br from-blue-500/20 to-cyan-500/10 rounded-full flex items-center justify-center">
                <!-- 机器人/宇航员图标 -->
                <div class="w-24 h-32 bg-gradient-to-b from-blue-400 to-blue-600 rounded-2xl relative shadow-2xl">
                  <!-- 头部 -->
                  <div class="w-16 h-16 bg-gradient-to-b from-blue-300 to-blue-500 rounded-xl mx-auto mt-2 relative">
                    <!-- 眼睛 -->
                    <div class="absolute top-4 left-3 w-2 h-2 bg-white rounded-full"></div>
                    <div class="absolute top-4 right-3 w-2 h-2 bg-white rounded-full"></div>
                    <!-- 嘴部指示灯 -->
                    <div class="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-cyan-300 rounded-full animate-pulse"></div>
                  </div>
                  
                  <!-- 身体装饰 -->
                  <div class="mt-2 px-2">
                    <div class="w-full h-1 bg-blue-300/50 rounded mb-1"></div>
                    <div class="w-3/4 h-1 bg-blue-300/30 rounded mx-auto mb-1"></div>
                    <div class="w-1/2 h-1 bg-blue-300/20 rounded mx-auto"></div>
                  </div>
                </div>
              </div>
              
              <!-- 蓝色高亮边框 -->
              <div class="absolute inset-0 border-2 border-blue-400/60 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          <!-- 欢迎文本 -->
          <div class="text-center">
            <h1 class="text-3xl font-bold mb-2">欢迎来到PodifyAi</h1>
            <p class="text-gray-400">开启您的AI创作之旅</p>
          </div>
        </div>
      </div>

      <!-- 右侧登录表单区域 -->
      <div class="w-96 bg-gray-900/80 backdrop-blur-sm border-l border-gray-700/50 flex items-center justify-center p-8">
        <div class="w-full max-w-sm">
          <!-- 表单头部 -->
          <div class="text-center mb-8">
            <div class="flex items-center justify-center space-x-2 mb-4">
              <div class="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
                <span class="text-black font-bold text-sm">灵</span>
              </div>
              <span class="text-xl font-bold">PodifyAi</span>
            </div>
            <h2 class="text-2xl font-bold mb-2">登录账户</h2>
            <p class="text-gray-400 text-sm">请输入您的账户信息</p>
          </div>

          <!-- 默认账号提示 -->
          <div class="mb-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <p class="text-blue-300 text-sm mb-1">💡 测试账号</p>
            <p class="text-gray-300 text-xs">邮箱: admin@lingtu.ai</p>
            <p class="text-gray-300 text-xs">密码: 123456</p>
          </div>

          <!-- 登录表单 -->
          <form @submit.prevent="handleLogin" class="space-y-6">
            <!-- 邮箱输入 -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">邮箱</label>
              <input 
                v-model="loginForm.email"
                type="email" 
                required
                class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white placeholder-gray-400"
                placeholder="请输入您的邮箱"
              >
            </div>
            
            <!-- 密码输入 -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">密码</label>
              <input 
                v-model="loginForm.password"
                type="password" 
                required
                class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white placeholder-gray-400"
                placeholder="请输入您的密码"
              >
            </div>
            
            <!-- 记住我和忘记密码 -->
            <div class="flex items-center justify-between">
              <label class="flex items-center">
                <input type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500">
                <span class="ml-2 text-sm text-gray-300">记住我</span>
              </label>
              <a href="#" class="text-sm text-blue-400 hover:text-blue-300 transition-colors">忘记密码？</a>
            </div>
            
            <!-- 登录按钮 -->
            <button 
              type="submit"
              :disabled="isLoading"
              class="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all transform hover:scale-105 shadow-lg"
            >
              {{ isLoading ? '登录中...' : '登录' }}
            </button>
            
            <!-- 一键填充按钮 -->
            <button 
              type="button"
              @click="fillDefaultCredentials"
              class="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-all text-sm"
            >
              🚀 一键填充测试账号
            </button>
          </form>
          
          <!-- 分割线 -->
          <div class="my-6 flex items-center">
            <div class="flex-1 border-t border-gray-600"></div>
            <span class="px-4 text-gray-400 text-sm">或</span>
            <div class="flex-1 border-t border-gray-600"></div>
          </div>
          
          <!-- 第三方登录 -->
          <div class="space-y-3">
            <button class="w-full flex items-center justify-center px-4 py-3 border border-gray-600 rounded-lg hover:bg-gray-800/50 transition-colors">
              <svg class="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span class="text-gray-300">使用 Google 登录</span>
            </button>
            
            <button class="w-full flex items-center justify-center px-4 py-3 border border-gray-600 rounded-lg hover:bg-gray-800/50 transition-colors">
              <svg class="w-5 h-5 mr-3 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.024-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.221.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
              </svg>
              <span class="text-gray-300">使用微信登录</span>
            </button>
          </div>
          
          <!-- 注册链接 -->
          <div class="mt-6 text-center">
            <p class="text-gray-400 text-sm">
              还没有账户？
              <NuxtLink to="/register" class="text-blue-400 hover:text-blue-300 transition-colors font-medium">立即注册</NuxtLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 登录表单数据
const loginForm = ref({
  email: '',
  password: ''
})

const isLoading = ref(false)

// 默认测试账号
const defaultCredentials = {
  email: 'admin@lingtu.ai',
  password: '123456'
}

// 一键填充测试账号
const fillDefaultCredentials = () => {
  loginForm.value.email = defaultCredentials.email
  loginForm.value.password = defaultCredentials.password
}

// 处理登录
const handleLogin = async () => {
  isLoading.value = true
  
  try {
    // 验证账号密码
    if (loginForm.value.email === defaultCredentials.email && 
        loginForm.value.password === defaultCredentials.password) {
      
      // 模拟登录延迟
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // 保存登录状态到localStorage
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('userInfo', JSON.stringify({
        email: loginForm.value.email,
        name: '管理员',
        avatar: ''
      }))
      
      // 跳转到dashboard
      await navigateTo('/dashboard')
    } else {
      alert('账号或密码错误，请使用测试账号登录')
    }
  } catch (error) {
    console.error('登录失败:', error)
    alert('登录失败，请重试')
  } finally {
    isLoading.value = false
  }
}

// 页面加载时检查是否已登录
onMounted(() => {
  const isLoggedIn = localStorage.getItem('isLoggedIn')
  if (isLoggedIn === 'true') {
    navigateTo('/dashboard')
  }
})

// 页面元数据
useHead({
  title: '登录 - PodifyAi',
  meta: [
    { name: 'description', content: '登录PodifyAi，开启您的AI创作之旅' }
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
</style>