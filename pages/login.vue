<template>
  <div class="min-h-screen flex">
    <!-- 左侧内容区域 - 绿色渐变背景 -->
    <div class="flex-1 bg-gradient-to-br from-green-600 to-green-800 text-white p-12 flex flex-col justify-center relative">
      <!-- 中心内容 - 增加居中样式 -->
      <div class="max-w-xl mx-auto">
        <h1 class="text-4xl font-bold mb-16 text-center whitespace-nowrap">一站式电商运营神器，助您轻松抢占市场</h1>
        
        <div class="grid grid-cols-2 gap-8">
          <div class="flex items-start space-x-3">
            <div class="w-2 h-2 bg-white rounded-full mt-2"></div>
            <span>风险智能防控</span>
          </div>
          <div class="flex items-start space-x-3">
            <div class="w-2 h-2 bg-white rounded-full mt-2"></div>
            <span>智能图像处理</span>
          </div>
          <div class="flex items-start space-x-3">
            <div class="w-2 h-2 bg-white rounded-full mt-2"></div>
            <span>创意批量操作</span>
          </div>
          <div class="flex items-start space-x-3">
            <div class="w-2 h-2 bg-white rounded-full mt-2"></div>
            <span>高效流量拓展</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 右侧登录表单区域 - 黑色背景 -->
    <div class="w-[500px] bg-black text-white flex items-center justify-center p-12 relative">
      <!-- Logo - 移到黑色背景区域的右上角 -->
      <div class="absolute top-10 right-10">
        <span class="text-3xl font-bold">
          <span class="text-orange-500">CuzCuz</span>
          <span class="text-green-300">AI</span>
        </span>
      </div>
      
      <div class="w-full max-w-md">
        <!-- 登录表单 -->
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- 用户名输入 -->
          <div>
            <input 
              v-model="loginForm.email"
              type="text" 
              required
              class="w-full px-4 py-3 bg-transparent border border-gray-700 rounded-lg focus:outline-none focus:border-gray-500 text-white placeholder-gray-500"
              placeholder="用户名"
            >
          </div>
          
          <!-- 密码输入 -->
          <div>
            <input 
              v-model="loginForm.password"
              type="password" 
              required
              class="w-full px-4 py-3 bg-transparent border border-gray-700 rounded-lg focus:outline-none focus:border-gray-500 text-white placeholder-gray-500"
              placeholder="密码"
            >
          </div>
          
          <!-- 登录按钮 -->
          <button 
            type="submit"
            :disabled="isLoading"
            class="w-full bg-white hover:bg-gray-100 text-black font-medium py-3 px-4 rounded-lg transition-all"
          >
            登录
          </button>
          
          <!-- 第三方登录提示 -->
          <div class="text-center text-gray-400 text-sm">
            或使用第三方登录
          </div>
          
          <!-- Google登录按钮 -->
          <button 
            type="button"
            class="w-full flex items-center justify-center px-4 py-3 border border-gray-700 rounded-lg hover:bg-gray-900 transition-colors"
          >
            <svg class="w-5 h-5 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.6 20H24v8h11.4c-1.1 5.4-5.9 8-11.4 8-6.9 0-12-5.1-12-12s5.1-12 12-12c3.1 0 5.9 1.1 8 3l6.1-6.1C33.7 5.5 29.1 4 24 4 13 4 4 13 4 24s9 20 20 20 19-8 19-20c0-1.3-.2-2.7-.4-4z"/>
              <path fill="#FF3D00" d="M6.3 14.7l7.1 5.3c1.8-4.2 5.9-7 10.6-7 3.1 0 5.9 1.1 8 3l6.1-6.1C33.7 5.5 29.1 4 24 4c-8.3 0-15.3 5.3-18 12.7z"/>
              <path fill="#4CAF50" d="M24 44c4.9 0 9.3-1.6 12.9-4.3l-6.3-5.3c-1.8 1.2-4.9 2.6-6.6 2.6-6.9 0-12-5.1-12-12 0-1.2.2-2.4.5-3.5l-7.1-5.3C4.4 19.3 4 21.6 4 24c0 11 9 20 20 20z"/>
              <path fill="#1976D2" d="M43.6 20H24v8h11.4c-.5 2.3-1.9 4.3-3.8 5.4l6.3 5.3c3.7-3.4 5.1-8.4 5.1-14.7 0-1.3-.2-2.7-.4-4z"/>
            </svg>
            <span>Google</span>
          </button>
          
          <!-- 隐私政策提示 -->
          <div class="text-center text-gray-500 text-xs mt-8">
            登录即表示您同读并认同 用户隐私政策 及 平台使用条款
          </div>
        </form>
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
      alert('账号或密码错误，请重试')
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
  title: 'CuzCuz AI - 登录',
  meta: [
    { name: 'description', content: '登录CuzCuz AI，一站式电商运营神器' }
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