<template>
  <div class="min-h-screen overflow-hidden relative">
    <!-- 科技感动态背景 -->
    <div class="absolute inset-0 bg-black">
      <!-- 动态网格背景 -->
      <div class="absolute inset-0 opacity-20">
        <div class="grid-background"></div>
      </div>
      
      <!-- 科技感粒子动画 -->
      <div class="absolute inset-0">
        <div class="particle-container">
          <div v-for="i in 50" :key="i" class="particle" :style="getParticleStyle(i)"></div>
        </div>
      </div>
      
      <!-- 主要渐变背景 -->
      <div class="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-cyan-900/10 to-black opacity-80"></div>
    </div>

    <div class="relative z-10 min-h-screen flex">
      <!-- 左侧内容区域 - 科技蓝渐变背景 -->
      <div class="flex-1 relative overflow-hidden">
        <!-- 主背景渐变 -->
        <div class="absolute inset-0 bg-gradient-to-br from-blue-600 via-cyan-600 to-blue-800"></div>
        
        <!-- AI主题背景图片 -->
        <div class="absolute inset-0 opacity-20">
          <!-- AI生成图片背景 -->
          <div class="absolute top-20 right-20 w-64 h-64 rounded-full overflow-hidden ai-image-float">
            <img src="/images/ai-generated.jpg" alt="AI Generated" class="w-full h-full object-cover opacity-60">
            <div class="absolute inset-0 bg-gradient-to-tr from-cyan-500/30 to-transparent"></div>
          </div>
          
          <!-- 科技未来图片 -->
          <div class="absolute bottom-32 left-16 w-48 h-48 rounded-2xl overflow-hidden ai-image-pulse" style="transform: rotate(-15deg);">
            <img src="/images/tech-future.jpg" alt="Tech Future" class="w-full h-full object-cover opacity-50">
            <div class="absolute inset-0 bg-gradient-to-bl from-blue-500/30 to-transparent"></div>
          </div>
          
          <!-- 复杂AI图片 -->
          <div class="absolute top-1/3 left-1/4 w-32 h-32 rounded-xl overflow-hidden ai-image-rotate">
            <img src="/images/complex-ai.jpg" alt="Complex AI" class="w-full h-full object-cover opacity-40">
            <div class="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-400/20"></div>
          </div>
        </div>
        
        <!-- 科技感几何装饰 -->
        <div class="absolute inset-0">
          <!-- 动态几何图形 -->
          <div class="absolute top-20 left-20 w-32 h-32 border border-cyan-400/30 rotate-45 tech-glow-slow"></div>
          <div class="absolute bottom-32 right-32 w-24 h-24 border border-blue-400/30 rotate-12 tech-glow-slow"></div>
          
          <!-- 新增：六边形装饰 -->
          <div class="absolute top-1/2 right-20 w-16 h-16">
            <svg viewBox="0 0 100 100" class="w-full h-full tech-polygon">
              <polygon points="50,5 85,25 85,75 50,95 15,75 15,25" 
                       fill="none" 
                       stroke="rgba(0,204,255,0.4)" 
                       stroke-width="2"/>
            </svg>
          </div>
          
          <!-- 新增：圆形网格 -->
          <div class="absolute bottom-40 left-40 w-20 h-20">
            <svg viewBox="0 0 100 100" class="w-full h-full tech-circle">
              <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(51,102,255,0.3)" stroke-width="1"/>
              <circle cx="50" cy="50" r="20" fill="none" stroke="rgba(0,204,255,0.4)" stroke-width="1"/>
              <circle cx="50" cy="50" r="10" fill="none" stroke="rgba(51,102,255,0.5)" stroke-width="1"/>
            </svg>
          </div>
          
          <!-- AI数据流线条 -->
          <svg class="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#3366FF;stop-opacity:0.3" />
                <stop offset="50%" style="stop-color:#00CCFF;stop-opacity:0.6" />
                <stop offset="100%" style="stop-color:#3366FF;stop-opacity:0.1" />
              </linearGradient>
              <linearGradient id="dataFlow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:transparent" />
                <stop offset="20%" style="stop-color:#00CCFF;stop-opacity:0.8" />
                <stop offset="40%" style="stop-color:#3366FF;stop-opacity:0.6" />
                <stop offset="60%" style="stop-color:#00CCFF;stop-opacity:0.4" />
                <stop offset="100%" style="stop-color:transparent" />
              </linearGradient>
            </defs>
            
            <!-- 主要连接线 -->
            <path d="M100,50 Q300,100 500,200 T900,150" stroke="url(#lineGradient)" stroke-width="2" fill="none" class="animate-pulse" />
            <path d="M50,200 Q250,50 450,300 T850,250" stroke="url(#lineGradient)" stroke-width="1" fill="none" class="animate-pulse" style="animation-delay: 1s" />
            
            <!-- 数据流动线条 -->
            <path d="M0,300 Q200,200 400,250 Q600,300 800,200" stroke="url(#dataFlow)" stroke-width="3" fill="none" class="data-flow-1" />
            <path d="M100,400 Q300,350 500,380 Q700,410 900,350" stroke="url(#dataFlow)" stroke-width="2" fill="none" class="data-flow-2" />
          </svg>
          
          <!-- AI节点连接点 -->
          <div class="absolute top-32 left-32 w-4 h-4 bg-cyan-400 rounded-full ai-node animate-ping"></div>
          <div class="absolute top-64 right-48 w-3 h-3 bg-blue-400 rounded-full ai-node animate-ping" style="animation-delay: 0.5s"></div>
          <div class="absolute bottom-48 left-64 w-2 h-2 bg-cyan-300 rounded-full ai-node animate-ping" style="animation-delay: 1s"></div>
          <div class="absolute bottom-64 right-64 w-3 h-3 bg-blue-300 rounded-full ai-node animate-ping" style="animation-delay: 1.5s"></div>
        </div>
        
        <!-- 动态科技纹理覆盖层 -->
        <div class="absolute inset-0 opacity-10">
          <div class="tech-texture-overlay"></div>
        </div>
        
        <!-- AI代码矩阵效果 -->
        <div class="absolute inset-0 opacity-5">
          <div class="code-matrix">
            <div v-for="i in 20" :key="`matrix-${i}`" class="matrix-column" :style="getMatrixStyle(i)">
              <span v-for="j in 30" :key="`char-${j}`" class="matrix-char">{{ getRandomChar() }}</span>
            </div>
          </div>
        </div>
        
        <!-- AI芯片装饰 -->
        <div class="absolute top-40 right-40 w-12 h-12 ai-chip">
          <svg viewBox="0 0 100 100" class="w-full h-full">
            <rect x="10" y="10" width="80" height="80" fill="none" stroke="rgba(0,204,255,0.4)" stroke-width="2" rx="8"/>
            <rect x="20" y="20" width="60" height="60" fill="none" stroke="rgba(51,102,255,0.6)" stroke-width="1" rx="4"/>
            <rect x="30" y="30" width="40" height="40" fill="rgba(0,204,255,0.2)" stroke="none" rx="2"/>
            <circle cx="50" cy="50" r="8" fill="rgba(51,102,255,0.8)"/>
            <!-- 芯片引脚 -->
            <line x1="0" y1="25" x2="10" y2="25" stroke="rgba(0,204,255,0.6)" stroke-width="1"/>
            <line x1="0" y1="35" x2="10" y2="35" stroke="rgba(0,204,255,0.6)" stroke-width="1"/>
            <line x1="0" y1="45" x2="10" y2="45" stroke="rgba(0,204,255,0.6)" stroke-width="1"/>
            <line x1="0" y1="55" x2="10" y2="55" stroke="rgba(0,204,255,0.6)" stroke-width="1"/>
            <line x1="0" y1="65" x2="10" y2="65" stroke="rgba(0,204,255,0.6)" stroke-width="1"/>
            <line x1="0" y1="75" x2="10" y2="75" stroke="rgba(0,204,255,0.6)" stroke-width="1"/>
            
            <line x1="90" y1="25" x2="100" y2="25" stroke="rgba(0,204,255,0.6)" stroke-width="1"/>
            <line x1="90" y1="35" x2="100" y2="35" stroke="rgba(0,204,255,0.6)" stroke-width="1"/>
            <line x1="90" y1="45" x2="100" y2="45" stroke="rgba(0,204,255,0.6)" stroke-width="1"/>
            <line x1="90" y1="55" x2="100" y2="55" stroke="rgba(0,204,255,0.6)" stroke-width="1"/>
            <line x1="90" y1="65" x2="100" y2="65" stroke="rgba(0,204,255,0.6)" stroke-width="1"/>
            <line x1="90" y1="75" x2="100" y2="75" stroke="rgba(0,204,255,0.6)" stroke-width="1"/>
          </svg>
        </div>
        
        <!-- AI神经网络可视化 -->
        <div class="absolute bottom-20 right-20 w-32 h-32 neural-network">
          <svg viewBox="0 0 100 100" class="w-full h-full">
            <!-- 输入层 -->
            <circle cx="20" cy="20" r="3" fill="rgba(51,102,255,0.8)" class="neural-node"/>
            <circle cx="20" cy="40" r="3" fill="rgba(51,102,255,0.8)" class="neural-node"/>
            <circle cx="20" cy="60" r="3" fill="rgba(51,102,255,0.8)" class="neural-node"/>
            <circle cx="20" cy="80" r="3" fill="rgba(51,102,255,0.8)" class="neural-node"/>
            
            <!-- 隐藏层 -->
            <circle cx="50" cy="30" r="3" fill="rgba(0,204,255,0.8)" class="neural-node"/>
            <circle cx="50" cy="50" r="3" fill="rgba(0,204,255,0.8)" class="neural-node"/>
            <circle cx="50" cy="70" r="3" fill="rgba(0,204,255,0.8)" class="neural-node"/>
            
            <!-- 输出层 -->
            <circle cx="80" cy="40" r="3" fill="rgba(51,255,204,0.8)" class="neural-node"/>
            <circle cx="80" cy="60" r="3" fill="rgba(51,255,204,0.8)" class="neural-node"/>
            
            <!-- 连接线 -->
            <line x1="23" y1="20" x2="47" y2="30" stroke="rgba(51,102,255,0.4)" stroke-width="0.5" class="neural-connection"/>
            <line x1="23" y1="40" x2="47" y2="50" stroke="rgba(51,102,255,0.4)" stroke-width="0.5" class="neural-connection"/>
            <line x1="23" y1="60" x2="47" y2="70" stroke="rgba(51,102,255,0.4)" stroke-width="0.5" class="neural-connection"/>
            <line x1="53" y1="30" x2="77" y2="40" stroke="rgba(0,204,255,0.4)" stroke-width="0.5" class="neural-connection"/>
            <line x1="53" y1="50" x2="77" y2="60" stroke="rgba(0,204,255,0.4)" stroke-width="0.5" class="neural-connection"/>
          </svg>
        </div>
        
        <!-- 内容区域 -->
        <div class="relative z-10 p-12 flex flex-col justify-center h-full">
          <div class="max-w-xl mx-auto text-center">
            <!-- AI特效标题 -->
            <div class="mb-4">
              <div class="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <div class="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                <span class="text-cyan-200 text-sm font-medium">AI POWERED PLATFORM</span>
                <div class="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style="animation-delay: 0.5s"></div>
              </div>
            </div>
            
            <h1 class="text-5xl font-bold mb-8 text-white leading-tight">
              <span class="bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent">
                一站式电商运营神器
              </span>
              <br>
              <span class="text-3xl bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                助您轻松抢占市场
              </span>
            </h1>
            
            <!-- 特性展示网格 -->
            <div class="grid grid-cols-2 gap-6 mt-12">
              <div class="feature-card group">
                <div class="flex items-center space-x-3">
                  <div class="relative">
                    <div class="w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full group-hover:scale-110 transition-transform"></div>
                    <div class="absolute inset-0 w-3 h-3 bg-cyan-400 rounded-full animate-ping opacity-30"></div>
                  </div>
                  <span class="text-white/90 group-hover:text-white transition-colors">风险智能防控</span>
                </div>
              </div>
              <div class="feature-card group">
                <div class="flex items-center space-x-3">
                  <div class="relative">
                    <div class="w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full group-hover:scale-110 transition-transform"></div>
                    <div class="absolute inset-0 w-3 h-3 bg-blue-400 rounded-full animate-ping opacity-30" style="animation-delay: 0.3s"></div>
                  </div>
                  <span class="text-white/90 group-hover:text-white transition-colors">智能图像处理</span>
                </div>
              </div>
              <div class="feature-card group">
                <div class="flex items-center space-x-3">
                  <div class="relative">
                    <div class="w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full group-hover:scale-110 transition-transform"></div>
                    <div class="absolute inset-0 w-3 h-3 bg-cyan-400 rounded-full animate-ping opacity-30" style="animation-delay: 0.6s"></div>
                  </div>
                  <span class="text-white/90 group-hover:text-white transition-colors">创意批量操作</span>
                </div>
              </div>
              <div class="feature-card group">
                <div class="flex items-center space-x-3">
                  <div class="relative">
                    <div class="w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full group-hover:scale-110 transition-transform"></div>
                    <div class="absolute inset-0 w-3 h-3 bg-blue-400 rounded-full animate-ping opacity-30" style="animation-delay: 0.9s"></div>
                  </div>
                  <span class="text-white/90 group-hover:text-white transition-colors">高效流量拓展</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧登录表单区域 -->
      <div class="w-[500px] relative overflow-hidden">
        <!-- 背景 -->
        <div class="absolute inset-0 bg-black/95 backdrop-blur-sm"></div>
        
        <!-- 科技感边框效果 -->
        <div class="absolute inset-0 border-l border-cyan-500/30"></div>
        <div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
        
        <!-- Logo区域 -->
        <div class="absolute top-8 right-8 z-20">
          <div class="flex items-center space-x-3 logo-hover">
            <!-- 统一的高科技感Logo -->
            <div class="relative w-10 h-10 logo-pulse">
              <div class="absolute inset-0 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 rounded-xl p-0.5">
                <div class="w-full h-full bg-black rounded-xl flex items-center justify-center">
                  <svg class="w-6 h-6 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5"/>
                    <path d="M2 12l10 5 10-5"/>
                  </svg>
                </div>
              </div>
              <div class="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
            </div>
            <div class="flex flex-col">
              <span class="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                CUZCUZAI
              </span>
              <span class="text-xs text-cyan-400/60 -mt-1">AI Powered</span>
            </div>
          </div>
        </div>
        
        <!-- 登录表单内容 -->
        <div class="relative z-10 flex items-center justify-center min-h-screen p-12">
          <div class="w-full max-w-md">
            <!-- 登录标题 -->
            <div class="text-center mb-8">
              <h2 class="text-3xl font-bold bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent mb-2">
                欢迎回来
              </h2>
              <p class="text-gray-400">登录您的账户，开启AI智能之旅</p>
            </div>

            <!-- 登录表单 -->
            <form @submit.prevent="handleLogin" class="space-y-6">
              <!-- 用户名输入 -->
              <div class="relative">
                <div class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl blur-sm"></div>
                <input 
                  v-model="loginForm.email"
                  type="text" 
                  required
                  class="relative w-full px-6 py-4 bg-gray-900/50 border border-gray-700/50 rounded-xl focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 text-white placeholder-gray-400 transition-all backdrop-blur-sm"
                  placeholder="用户名"
                >
                <div class="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent opacity-0 hover:opacity-100 transition-opacity pointer-events-none"></div>
              </div>
              
              <!-- 密码输入 -->
              <div class="relative">
                <div class="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl blur-sm"></div>
                <input 
                  v-model="loginForm.password"
                  type="password" 
                  required
                  class="relative w-full px-6 py-4 bg-gray-900/50 border border-gray-700/50 rounded-xl focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 text-white placeholder-gray-400 transition-all backdrop-blur-sm"
                  placeholder="密码"
                >
                <div class="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent opacity-0 hover:opacity-100 transition-opacity pointer-events-none"></div>
              </div>
              
              <!-- 登录按钮 -->
              <button 
                type="submit"
                :disabled="isLoading"
                class="w-full relative group overflow-hidden"
              >
                <div class="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl transition-all group-hover:from-blue-400 group-hover:to-cyan-400"></div>
                <div class="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div class="relative px-6 py-4 text-white font-semibold text-lg flex items-center justify-center space-x-2">
                  <span v-if="!isLoading">登录</span>
                  <span v-else class="loading-dots">
                    <div></div>
                    <div></div>
                    <div></div>
                  </span>
                </div>
                <!-- 闪光效果 -->
                <div class="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
              </button>
              
              <!-- 分割线 -->
              <div class="relative my-8">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-gray-700"></div>
                </div>
                <div class="relative flex justify-center text-sm">
                  <span class="px-4 bg-black text-gray-400">或使用第三方登录</span>
                </div>
              </div>
              
              <!-- Google登录按钮 -->
              <button 
                type="button"
                class="w-full relative group overflow-hidden"
              >
                <div class="absolute inset-0 bg-gray-900 border border-gray-700 rounded-xl group-hover:border-gray-600 transition-colors"></div>
                <div class="relative px-6 py-4 flex items-center justify-center space-x-3">
                  <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                    <path fill="#FFC107" d="M43.6 20H24v8h11.4c-1.1 5.4-5.9 8-11.4 8-6.9 0-12-5.1-12-12s5.1-12 12-12c3.1 0 5.9 1.1 8 3l6.1-6.1C33.7 5.5 29.1 4 24 4 13 4 4 13 4 24s9 20 20 20 19-8 19-20c0-1.3-.2-2.7-.4-4z"/>
                    <path fill="#FF3D00" d="M6.3 14.7l7.1 5.3c1.8-4.2 5.9-7 10.6-7 3.1 0 5.9 1.1 8 3l6.1-6.1C33.7 5.5 29.1 4 24 4c-8.3 0-15.3 5.3-18 12.7z"/>
                    <path fill="#4CAF50" d="M24 44c4.9 0 9.3-1.6 12.9-4.3l-6.3-5.3c-1.8 1.2-4.9 2.6-6.6 2.6-6.9 0-12-5.1-12-12 0-1.2.2-2.4.5-3.5l-7.1-5.3C4.4 19.3 4 21.6 4 24c0 11 9 20 20 20z"/>
                    <path fill="#1976D2" d="M43.6 20H24v8h11.4c-.5 2.3-1.9 4.3-3.8 5.4l6.3 5.3c3.7-3.4 5.1-8.4 5.1-14.7 0-1.3-.2-2.7-.4-4z"/>
                  </svg>
                  <span class="text-white font-medium">Google</span>
                </div>
              </button>
              
              <!-- 隐私政策提示 -->
              <div class="text-center text-gray-500 text-xs mt-8 leading-relaxed">
                登录即表示您同读并认同 
                <a href="#" class="text-cyan-400 hover:text-cyan-300 transition-colors">用户隐私政策</a> 
                及 
                <a href="#" class="text-cyan-400 hover:text-cyan-300 transition-colors">平台使用条款</a>
              </div>
            </form>
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

// 生成粒子样式
const getParticleStyle = (index) => {
  const x = Math.random() * 100
  const y = Math.random() * 100
  const delay = Math.random() * 5
  const duration = 3 + Math.random() * 4
  
  return {
    left: `${x}%`,
    top: `${y}%`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
  }
}

// 生成矩阵列样式
const getMatrixStyle = (index) => {
  const delay = Math.random() * 2
  return {
    animationDelay: `${delay}s`,
  }
}

// 生成随机字符
const getRandomChar = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  return chars[Math.floor(Math.random() * chars.length)]
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
  title: 'CUZCUZAI - 登录',
  meta: [
    { name: 'description', content: '登录CUZCUZAI，一站式电商运营神器' }
  ]
})
</script>

<style scoped>
/* 科技感网格背景 */
.grid-background {
  background-image: 
    linear-gradient(rgba(51, 102, 255, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(51, 102, 255, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: gridMove 20s linear infinite;
}

@keyframes gridMove {
  0% { transform: translate(0, 0); }
  100% { transform: translate(50px, 50px); }
}

/* 粒子动画 */
.particle-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.particle {
  position: absolute;
  width: 2px;
  height: 2px;
  background: linear-gradient(45deg, #3366FF, #00CCFF);
  border-radius: 50%;
  opacity: 0;
  animation: particleFloat infinite linear;
}

@keyframes particleFloat {
  0% {
    opacity: 0;
    transform: translateY(100vh) scale(0);
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(-100px) scale(1);
  }
}

/* Logo动画效果 */
.logo-hover {
  transition: all 0.3s ease;
}

.logo-hover:hover {
  transform: scale(1.05);
}

.logo-pulse {
  animation: logoPulse 3s ease-in-out infinite;
}

@keyframes logoPulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

/* 科技感光效 */
.tech-glow-slow {
  animation: techGlowSlow 4s ease-in-out infinite;
}

@keyframes techGlowSlow {
  0%, 100% {
    box-shadow: 0 0 10px rgba(51, 102, 255, 0.3);
    opacity: 0.6;
  }
  50% {
    box-shadow: 0 0 30px rgba(0, 204, 255, 0.6);
    opacity: 1;
  }
}

/* AI图片动画效果 */
.ai-image-float {
  animation: aiImageFloat 6s ease-in-out infinite;
}

@keyframes aiImageFloat {
  0%, 100% {
    transform: translateY(0px) scale(1);
  }
  50% {
    transform: translateY(-20px) scale(1.02);
  }
}

.ai-image-pulse {
  animation: aiImagePulse 4s ease-in-out infinite;
}

@keyframes aiImagePulse {
  0%, 100% {
    transform: rotate(-15deg) scale(1);
    opacity: 0.5;
  }
  50% {
    transform: rotate(-15deg) scale(1.05);
    opacity: 0.7;
  }
}

.ai-image-rotate {
  animation: aiImageRotate 8s linear infinite;
}

@keyframes aiImageRotate {
  0% {
    transform: rotate(0deg) scale(1);
  }
  25% {
    transform: rotate(90deg) scale(1.1);
  }
  50% {
    transform: rotate(180deg) scale(1);
  }
  75% {
    transform: rotate(270deg) scale(1.1);
  }
  100% {
    transform: rotate(360deg) scale(1);
  }
}

/* 科技几何形状动画 */
.tech-polygon {
  animation: techPolygonRotate 10s linear infinite;
}

@keyframes techPolygonRotate {
  0% {
    transform: rotate(0deg);
    opacity: 0.4;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    transform: rotate(360deg);
    opacity: 0.4;
  }
}

.tech-circle {
  animation: techCirclePulse 3s ease-in-out infinite;
}

@keyframes techCirclePulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.6;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
}

/* 数据流动画 */
.data-flow-1 {
  stroke-dasharray: 20 10;
  animation: dataFlow1 3s linear infinite;
}

.data-flow-2 {
  stroke-dasharray: 15 8;
  animation: dataFlow2 4s linear infinite;
}

@keyframes dataFlow1 {
  0% {
    stroke-dashoffset: 100;
    opacity: 0.3;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    stroke-dashoffset: 0;
    opacity: 0.3;
  }
}

@keyframes dataFlow2 {
  0% {
    stroke-dashoffset: 80;
    opacity: 0.2;
  }
  50% {
    opacity: 0.6;
  }
  100% {
    stroke-dashoffset: 0;
    opacity: 0.2;
  }
}

/* AI节点动画 */
.ai-node {
  box-shadow: 0 0 10px currentColor;
  animation-duration: 2s;
}

/* 动态科技纹理 */
.tech-texture-overlay {
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(circle at 20% 30%, rgba(51, 102, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(0, 204, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 40% 80%, rgba(51, 102, 255, 0.05) 0%, transparent 50%),
    linear-gradient(
      45deg,
      transparent 30%,
      rgba(51, 102, 255, 0.02) 50%,
      transparent 70%
    );
  background-size: 300px 300px, 250px 250px, 200px 200px, 100px 100px;
  animation: techTextureMove 20s linear infinite;
}

@keyframes techTextureMove {
  0% {
    background-position: 0% 0%, 100% 100%, 50% 50%, 0% 100%;
  }
  25% {
    background-position: 100% 0%, 0% 100%, 100% 50%, 100% 100%;
  }
  50% {
    background-position: 100% 100%, 0% 0%, 100% 100%, 100% 0%;
  }
  75% {
    background-position: 0% 100%, 100% 0%, 0% 100%, 0% 0%;
  }
  100% {
    background-position: 0% 0%, 100% 100%, 50% 50%, 0% 100%;
  }
}

/* AI代码矩阵效果 */
.code-matrix {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  color: #00CCFF;
  overflow: hidden;
}

.matrix-column {
  display: flex;
  flex-direction: column;
  animation: matrixFall 8s linear infinite;
  opacity: 0.6;
}

.matrix-char {
  display: block;
  line-height: 1.2;
  animation: matrixGlow 2s ease-in-out infinite;
}

@keyframes matrixFall {
  0% {
    transform: translateY(-100vh);
  }
  100% {
    transform: translateY(100vh);
  }
}

@keyframes matrixGlow {
  0%, 100% {
    opacity: 0.3;
    text-shadow: 0 0 5px #00CCFF;
  }
  50% {
    opacity: 1;
    text-shadow: 0 0 10px #00CCFF, 0 0 20px #3366FF;
  }
}

/* AI芯片动画 */
.ai-chip {
  animation: aiChipPulse 3s ease-in-out infinite;
}

@keyframes aiChipPulse {
  0%, 100% {
    transform: scale(1);
    filter: drop-shadow(0 0 5px rgba(0, 204, 255, 0.3));
  }
  50% {
    transform: scale(1.05);
    filter: drop-shadow(0 0 15px rgba(0, 204, 255, 0.6));
  }
}

/* 神经网络可视化动画 */
.neural-network {
  animation: neuralNetworkFloat 4s ease-in-out infinite;
}

@keyframes neuralNetworkFloat {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.neural-node {
  animation: neuralNodePulse 2s ease-in-out infinite;
}

@keyframes neuralNodePulse {
  0%, 100% {
    r: 3;
    opacity: 0.8;
  }
  50% {
    r: 4;
    opacity: 1;
  }
}

.neural-connection {
  animation: neuralConnectionFlow 3s ease-in-out infinite;
}

@keyframes neuralConnectionFlow {
  0%, 100% {
    opacity: 0.2;
    stroke-width: 0.5;
  }
  50% {
    opacity: 0.8;
    stroke-width: 1;
  }
}

/* 特性卡片悬停效果 */
.feature-card {
  padding: 12px;
  border-radius: 8px;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.feature-card:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(0, 204, 255, 0.3);
  transform: translateY(-2px);
}

/* 加载动画增强 */
.loading-dots {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.loading-dots div {
  width: 6px;
  height: 6px;
  background: white;
  border-radius: 50%;
  margin: 0 2px;
  animation: loadingDots 1.4s infinite ease-in-out both;
}

.loading-dots div:nth-child(1) { animation-delay: -0.32s; }
.loading-dots div:nth-child(2) { animation-delay: -0.16s; }
.loading-dots div:nth-child(3) { animation-delay: 0s; }

@keyframes loadingDots {
  0%, 80%, 100% { 
    transform: scale(0.8);
    opacity: 0.5;
  }
  40% { 
    transform: scale(1.2);
    opacity: 1;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .min-h-screen {
    flex-direction: column;
  }
  
  .flex-1 {
    min-height: 40vh;
  }
  
  .w-[500px] {
    width: 100%;
  }
}
</style>