<template>
  <div class="min-h-screen bg-black text-white">
    <!-- 导航栏 -->
    <nav class="flex justify-between items-center px-8 py-4 border-b border-gray-800">
      <div class="flex items-center space-x-2">
        <div class="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
          <span class="text-black font-bold text-sm">灵</span>
        </div>
        <span class="text-xl font-bold">PodifyAi</span>
      </div>
      
      <div class="hidden md:flex space-x-8">
        <a href="#" class="text-orange-400 hover:text-orange-300 transition-colors">产品功能</a>
        <a href="#" class="hover:text-gray-300 transition-colors">工作台</a>
        <a href="#" class="hover:text-gray-300 transition-colors">AI工具箱</a>
        <a href="#" class="hover:text-gray-300 transition-colors">解决方案</a>
        <a href="#" class="hover:text-gray-300 transition-colors">会员中心</a>
        <a href="#" class="hover:text-gray-300 transition-colors">关于我们</a>
      </div>
      
      <div class="flex items-center space-x-4">
        <NuxtLink to="/login" class="text-sm hover:text-gray-300 transition-colors">登录/注册</NuxtLink>
      </div>
    </nav>

    <!-- 英雄区域 -->
    <section class="relative px-8 py-20 overflow-hidden">
      <div class="max-w-7xl mx-auto">
        <div class="flex items-center justify-between">
          <!-- 左侧文本内容 -->
          <div class="flex-1 max-w-2xl">
            <h1 class="text-6xl font-bold mb-6 leading-tight">
              用PodifyAi，
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
                畅享创作乐趣
              </span>
            </h1>
            <p class="text-xl text-gray-300 mb-8">Less Design, More Creation.</p>
            <NuxtLink to="/login" class="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all transform hover:scale-105 shadow-lg">
              ✨ 开始创作
            </NuxtLink>
          </div>

          <!-- 右侧创意展示区域 -->
          <div class="flex-1 relative h-96 ml-20">
            <!-- 中心主要元素 -->
            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl animate-float">
              <div class="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                <div class="w-16 h-16 bg-black rounded-full flex items-center justify-center">
                  <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
              </div>
            </div>

            <!-- 浮动创意元素 -->
            <div class="absolute top-0 right-0 w-40 h-48 bg-gradient-to-br from-pink-400 to-purple-500 rounded-2xl shadow-xl animate-float overflow-hidden" style="animation-delay: 0.5s">
              <div class="w-full h-full bg-gradient-to-br from-pink-500/20 to-purple-600/20 flex items-center justify-center">
                <div class="text-center text-white">
                  <div class="w-16 h-16 bg-white/20 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <p class="text-sm font-medium">AI创作</p>
                </div>
              </div>
            </div>
            
            <div class="absolute bottom-0 right-16 w-36 h-44 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl shadow-xl animate-float overflow-hidden" style="animation-delay: 1s">
              <div class="w-full h-full bg-gradient-to-br from-green-500/20 to-emerald-600/20 flex items-center justify-center">
                <div class="text-center text-white">
                  <div class="w-16 h-16 bg-white/20 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.1 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
                    </svg>
                  </div>
                  <p class="text-sm font-medium">智能设计</p>
                </div>
              </div>
            </div>
            
            <div class="absolute top-16 left-0 w-28 h-28 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full shadow-xl animate-float" style="animation-delay: 1.5s">
              <div class="w-full h-full bg-gradient-to-br from-blue-500/20 to-cyan-600/20 flex items-center justify-center text-white">
                <svg class="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
            </div>
            
            <div class="absolute bottom-8 left-8 w-44 h-32 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl shadow-xl animate-float overflow-hidden" style="animation-delay: 2s">
              <div class="w-full h-full bg-gradient-to-br from-orange-500/20 to-red-600/20 flex items-center justify-center">
                <div class="text-center text-white">
                  <div class="w-16 h-16 bg-white/20 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 6L12 10.5 8.5 8 12 5.5 15.5 8zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/>
                    </svg>
                  </div>
                  <p class="text-sm font-medium">多元素材</p>
                </div>
              </div>
            </div>
            
            <div class="absolute top-8 right-24 w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full shadow-xl animate-float" style="animation-delay: 2.5s">
              <div class="w-full h-full bg-gradient-to-br from-purple-500/20 to-pink-600/20 flex items-center justify-center text-white">
                <svg class="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 功能特色区域 -->
    <section class="py-20 bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-white mb-4">强大的AI创作能力</h2>
          <p class="text-xl text-gray-300">让创意无限延伸，让作品更加精彩</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- 智能生成卡片 -->
          <div class="group bg-gray-800 rounded-2xl p-8 text-center hover:bg-gray-700 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div class="relative mb-6">
              <div class="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto transform group-hover:rotate-6 transition-transform duration-300">
                <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 6L12 10.5 8.5 8 12 5.5 15.5 8zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/>
                </svg>
              </div>
              <div class="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-pulse"></div>
            </div>
            <h3 class="text-2xl font-bold text-white mb-3">智能生成</h3>
            <p class="text-gray-400 leading-relaxed">基于先进AI技术，快速生成高质量内容，让创作变得简单高效</p>
            <div class="mt-6 flex justify-center space-x-2">
              <div class="w-2 h-2 bg-blue-400 rounded-full"></div>
              <div class="w-2 h-2 bg-blue-400 rounded-full opacity-60"></div>
              <div class="w-2 h-2 bg-blue-400 rounded-full opacity-30"></div>
            </div>
          </div>
          
          <!-- 个性定制卡片 -->
          <div class="group bg-gray-800 rounded-2xl p-8 text-center hover:bg-gray-700 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div class="relative mb-6">
              <div class="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto transform group-hover:rotate-6 transition-transform duration-300">
                <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <div class="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <h3 class="text-2xl font-bold text-white mb-3">个性定制</h3>
            <p class="text-gray-400 leading-relaxed">根据您的需求和偏好，定制专属的创作风格和内容方向</p>
            <div class="mt-6 flex justify-center space-x-2">
              <div class="w-2 h-2 bg-green-400 rounded-full"></div>
              <div class="w-2 h-2 bg-green-400 rounded-full opacity-60"></div>
              <div class="w-2 h-2 bg-green-400 rounded-full opacity-30"></div>
            </div>
          </div>
          
          <!-- 多元输出卡片 -->
          <div class="group bg-gray-800 rounded-2xl p-8 text-center hover:bg-gray-700 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div class="relative mb-6">
              <div class="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-600 rounded-2xl flex items-center justify-center mx-auto transform group-hover:rotate-6 transition-transform duration-300">
                <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z"/>
                </svg>
              </div>
              <div class="absolute -top-2 -right-2 w-6 h-6 bg-purple-400 rounded-full animate-pulse"></div>
            </div>
            <h3 class="text-2xl font-bold text-white mb-3">多元输出</h3>
            <p class="text-gray-400 leading-relaxed">支持多种格式和媒体类型输出，满足不同场景的使用需求</p>
            <div class="mt-6 flex justify-center space-x-2">
              <div class="w-2 h-2 bg-purple-400 rounded-full"></div>
              <div class="w-2 h-2 bg-purple-400 rounded-full opacity-60"></div>
              <div class="w-2 h-2 bg-purple-400 rounded-full opacity-30"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 作品展示区域 -->
    <section class="py-20 bg-black">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-white mb-4">精彩作品展示</h2>
          <p class="text-xl text-gray-300">探索AI创作的无限可能</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- 作品卡片1 -->
          <div class="group relative bg-gray-900 rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 hover:shadow-2xl">
            <div class="aspect-video bg-gradient-to-br from-purple-500 to-pink-600 relative overflow-hidden">
              <div class="absolute inset-0 bg-black/20 flex items-center justify-center">
                <div class="text-center text-white">
                  <div class="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <h4 class="text-lg font-semibold">AI艺术创作</h4>
                </div>
              </div>
              <div class="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm">
                热门
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-white mb-2">数字艺术系列</h3>
              <p class="text-gray-400 text-sm mb-4">运用AI技术创作的现代数字艺术作品，展现科技与艺术的完美融合</p>
              <div class="flex items-center justify-between">
                <span class="text-orange-400 text-sm font-medium">创意设计</span>
                <div class="flex space-x-1">
                  <div class="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <div class="w-2 h-2 bg-pink-400 rounded-full"></div>
                  <div class="w-2 h-2 bg-orange-400 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 作品卡片2 -->
          <div class="group relative bg-gray-900 rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 hover:shadow-2xl">
            <div class="aspect-video bg-gradient-to-br from-blue-500 to-cyan-600 relative overflow-hidden">
              <div class="absolute inset-0 bg-black/20 flex items-center justify-center">
                <div class="text-center text-white">
                  <div class="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.1 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
                    </svg>
                  </div>
                  <h4 class="text-lg font-semibold">智能设计</h4>
                </div>
              </div>
              <div class="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm">
                推荐
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-white mb-2">品牌视觉设计</h3>
              <p class="text-gray-400 text-sm mb-4">AI辅助完成的品牌视觉识别系统，包含logo、配色和视觉元素设计</p>
              <div class="flex items-center justify-between">
                <span class="text-blue-400 text-sm font-medium">品牌设计</span>
                <div class="flex space-x-1">
                  <div class="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <div class="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <div class="w-2 h-2 bg-teal-400 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 作品卡片3 -->
          <div class="group relative bg-gray-900 rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 hover:shadow-2xl">
            <div class="aspect-video bg-gradient-to-br from-green-500 to-emerald-600 relative overflow-hidden">
              <div class="absolute inset-0 bg-black/20 flex items-center justify-center">
                <div class="text-center text-white">
                  <div class="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z"/>
                    </svg>
                  </div>
                  <h4 class="text-lg font-semibold">内容创作</h4>
                </div>
              </div>
              <div class="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm">
                最新
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-white mb-2">多媒体内容</h3>
              <p class="text-gray-400 text-sm mb-4">AI生成的多媒体内容，包含文本、图像和音频的综合创作项目</p>
              <div class="flex items-center justify-between">
                <span class="text-green-400 text-sm font-medium">内容制作</span>
                <div class="flex space-x-1">
                  <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                  <div class="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <div class="w-2 h-2 bg-teal-400 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 作品卡片4 -->
          <div class="group relative bg-gray-900 rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 hover:shadow-2xl">
            <div class="aspect-video bg-gradient-to-br from-orange-500 to-red-600 relative overflow-hidden">
              <div class="absolute inset-0 bg-black/20 flex items-center justify-center">
                <div class="text-center text-white">
                  <div class="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 6L12 10.5 8.5 8 12 5.5 15.5 8zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/>
                    </svg>
                  </div>
                  <h4 class="text-lg font-semibold">交互体验</h4>
                </div>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-white mb-2">互动设计</h3>
              <p class="text-gray-400 text-sm mb-4">AI驱动的交互式用户体验设计，提升产品的用户参与度</p>
              <div class="flex items-center justify-between">
                <span class="text-orange-400 text-sm font-medium">UX设计</span>
                <div class="flex space-x-1">
                  <div class="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <div class="w-2 h-2 bg-red-400 rounded-full"></div>
                  <div class="w-2 h-2 bg-pink-400 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 作品卡片5 -->
          <div class="group relative bg-gray-900 rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 hover:shadow-2xl">
            <div class="aspect-video bg-gradient-to-br from-indigo-500 to-purple-600 relative overflow-hidden">
              <div class="absolute inset-0 bg-black/20 flex items-center justify-center">
                <div class="text-center text-white">
                  <div class="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <h4 class="text-lg font-semibold">创新应用</h4>
                </div>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-white mb-2">技术创新</h3>
              <p class="text-gray-400 text-sm mb-4">结合最新AI技术的创新应用项目，探索未来创作的新可能</p>
              <div class="flex items-center justify-between">
                <span class="text-indigo-400 text-sm font-medium">技术研发</span>
                <div class="flex space-x-1">
                  <div class="w-2 h-2 bg-indigo-400 rounded-full"></div>
                  <div class="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <div class="w-2 h-2 bg-pink-400 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 作品卡片6 -->
          <div class="group relative bg-gray-900 rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 hover:shadow-2xl">
            <div class="aspect-video bg-gradient-to-br from-teal-500 to-blue-600 relative overflow-hidden">
              <div class="absolute inset-0 bg-black/20 flex items-center justify-center">
                <div class="text-center text-white">
                  <div class="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                  <h4 class="text-lg font-semibold">个性化</h4>
                </div>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-white mb-2">定制方案</h3>
              <p class="text-gray-400 text-sm mb-4">为客户量身定制的AI创作解决方案，满足特定行业和场景需求</p>
              <div class="flex items-center justify-between">
                <span class="text-teal-400 text-sm font-medium">定制服务</span>
                <div class="flex space-x-1">
                  <div class="w-2 h-2 bg-teal-400 rounded-full"></div>
                  <div class="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <div class="w-2 h-2 bg-cyan-400 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 查看更多按钮 -->
        <div class="text-center mt-12">
          <button class="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-3 rounded-full font-semibold hover:from-orange-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
            查看更多作品
          </button>
        </div>
      </div>
    </section>

    <!-- 底部区域 -->
    <footer class="text-center py-8 border-t border-gray-800">
      <div class="mb-4">
        <h3 class="text-2xl font-bold mb-2">PodifyAi，更懂创意的AI</h3>
        <p class="text-gray-400">少量设计师，多样创作内容</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
// 设置页面标题和meta信息
useHead({
  title: 'PodifyAi - 创造多元素材',
  meta: [
    { name: 'description', content: '用PodifyAi创造多元素材，Less Design, More Creation.' },
    { name: 'keywords', content: 'AI, 设计, 创意, 素材生成' }
  ]
})
</script>

<style scoped>
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}
</style>