<template>
  <div class="min-h-screen bg-black text-white">
    <!-- 顶部导航栏 -->
    <nav class="flex justify-between items-center px-8 py-4">
      <div class="flex items-center space-x-2">
        <!-- 高科技感Logo -->
        <div class="relative w-10 h-10">
          <div class="absolute inset-0 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 rounded-lg p-0.5">
            <div class="w-full h-full bg-black rounded-lg flex items-center justify-center">
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
      
      <div class="hidden md:flex space-x-8">
        <NuxtLink to="/dashboard/products" class="hover:text-blue-400 transition-colors">产品商城</NuxtLink>
        <NuxtLink to="/dashboard" class="hover:text-blue-400 transition-colors">AI工具箱</NuxtLink>
        <NuxtLink to="/dashboard/images" class="hover:text-blue-400 transition-colors">案例库</NuxtLink>
        <NuxtLink to="/dashboard/tools" class="hover:text-blue-400 transition-colors">合作中心</NuxtLink>
        <NuxtLink to="/dashboard/settings" class="hover:text-blue-400 transition-colors">关于我们</NuxtLink>
      </div>
      
      <div class="flex items-center">
        <!-- 动态显示登录/工作台按钮 -->
        <NuxtLink 
          :to="isLoggedIn ? '/dashboard' : '/login'" 
          class="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2 rounded-md text-sm transition-colors"
        >
          {{ isLoggedIn ? '进入工作台' : '立即登录' }}
        </NuxtLink>
      </div>
    </nav>

    <!-- 主要英雄区域 -->
    <section class="relative px-8 py-20 md:py-32 overflow-hidden circuit-bg">
      <!-- 科技感背景装饰 -->
      <div class="absolute inset-0 overflow-hidden">
        <!-- 扫描线 -->
        <div class="scan-line" style="animation-delay: 0s;"></div>
        <div class="scan-line" style="animation-delay: 3s; left: 20%;"></div>
        <div class="scan-line" style="animation-delay: 6s; left: 80%;"></div>
        
        <!-- 数据流 -->
        <div class="data-stream" style="left: 10%; animation-delay: 1s;"></div>
        <div class="data-stream" style="left: 30%; animation-delay: 2s;"></div>
        <div class="data-stream" style="left: 60%; animation-delay: 0.5s;"></div>
        <div class="data-stream" style="left: 90%; animation-delay: 3s;"></div>
        
        <!-- 浮动粒子 -->
        <div class="absolute top-20 left-20 w-2 h-2 bg-cyan-400/50 rounded-full" style="animation: particleFloat 6s ease-in-out infinite;"></div>
        <div class="absolute top-40 right-32 w-1 h-1 bg-blue-400/60 rounded-full" style="animation: particleFloat 8s ease-in-out infinite; animation-delay: 2s;"></div>
        <div class="absolute bottom-32 left-1/3 w-1.5 h-1.5 bg-cyan-300/40 rounded-full" style="animation: particleFloat 7s ease-in-out infinite; animation-delay: 1s;"></div>
        <div class="absolute top-1/2 right-20 w-1 h-1 bg-blue-300/50 rounded-full" style="animation: particleFloat 5s ease-in-out infinite; animation-delay: 3s;"></div>
      </div>
      
      <div class="max-w-7xl mx-auto relative z-10">
        <div class="flex flex-col md:flex-row items-center justify-between">
          <!-- 左侧文本内容 -->
          <div class="md:w-1/2 mb-10 md:mb-0">
            <h1 class="text-5xl md:text-6xl font-bold mb-20 leading-tight">
              <span class="block mb-20 neon-text text-cyan-400">CUZ CUZ AI</span>
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                创造多元素材
              </span>
            </h1>
            <p class="text-xl text-gray-300 mb-20">Less Design, More Creation.</p>
            <!-- 动态显示登录/开始创作按钮 -->
            <NuxtLink 
              :to="isLoggedIn ? '/dashboard' : '/login'" 
              class="inline-block bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium py-4 px-10 rounded-lg text-lg hover:from-blue-700 hover:to-cyan-600 transition-colors duration-200"
            >
              <span class="flex items-center">
                {{ isLoggedIn ? '开始创作' : '立即体验' }}
              </span>
            </NuxtLink>
          </div>

          <!-- 右侧科技展示区 -->
          <div class="md:w-1/2 relative">
            <!-- 背景科技网格 -->
            <div class="absolute inset-0 opacity-10">
              <div class="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-2xl"></div>
              <div class="grid-pattern absolute inset-0"></div>
            </div>
            
            <!-- 动态粒子效果 -->
            <div class="absolute inset-0">
              <div class="floating-particle w-2 h-2 bg-cyan-400 rounded-full absolute top-1/4 left-1/4 animate-pulse" style="animation-delay: 0s;"></div>
              <div class="floating-particle w-1 h-1 bg-blue-400 rounded-full absolute top-3/4 right-1/4 animate-pulse" style="animation-delay: 1s;"></div>
              <div class="floating-particle w-1.5 h-1.5 bg-purple-400 rounded-full absolute bottom-1/4 left-1/3 animate-pulse" style="animation-delay: 2s;"></div>
            </div>
            
            <!-- 连接线条动画 -->
            <div class="absolute inset-0">
              <svg class="w-full h-full" viewBox="0 0 400 400" fill="none">
                <path d="M50 50 L350 100 L300 350 L100 300 Z" stroke="url(#gradient1)" stroke-width="1" opacity="0.3" class="animate-pulse"/>
                <path d="M150 80 L320 180 L250 320 L80 250 Z" stroke="url(#gradient2)" stroke-width="1" opacity="0.2" class="animate-pulse" style="animation-delay: 1s;"/>
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#00f5ff"/>
                    <stop offset="100%" style="stop-color:#3b82f6"/>
                  </linearGradient>
                  <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#8b5cf6"/>
                    <stop offset="100%" style="stop-color:#06b6d4"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            
            <!-- 风车式布局容器 -->
            <div class="relative z-10 w-full h-96">
              <!-- 中心AI核心 -->
              <div class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
                <!-- 外层旋转环 -->
                <div class="relative w-32 h-32">
                  <div class="absolute inset-0 rounded-full border-2 border-cyan-400/30 animate-spin" style="animation-duration: 8s;"></div>
                  <div class="absolute inset-2 rounded-full border border-blue-400/20 animate-spin" style="animation-duration: 6s; animation-direction: reverse;"></div>
                  
                  <!-- 核心Logo -->
                  <div class="absolute inset-4 rounded-full bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 p-0.5 hologram-effect">
                    <div class="w-full h-full rounded-full bg-black flex items-center justify-center relative overflow-hidden">
                      <!-- 内部扫描线 -->
                      <div class="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent animate-pulse transform rotate-45"></div>
                      
                      <!-- Logo图标 -->
                      <svg class="w-12 h-12 text-cyan-400 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                      </svg>
                      
                      <!-- 脉冲效果 -->
                      <div class="absolute inset-0 rounded-full bg-cyan-400/10 animate-ping"></div>
                    </div>
                  </div>
                  
                  <!-- 轨道点 -->
                  <div class="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                  <div class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-400 rounded-full animate-pulse" style="animation-delay: 1s;"></div>
                  <div class="absolute top-1/2 -left-1 transform -translate-y-1/2 w-2 h-2 bg-purple-400 rounded-full animate-pulse" style="animation-delay: 2s;"></div>
                  <div class="absolute top-1/2 -right-1 transform -translate-y-1/2 w-2 h-2 bg-pink-400 rounded-full animate-pulse" style="animation-delay: 3s;"></div>
                </div>
              </div>
              
              <!-- 风车叶片容器 -->
              <div class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full windmill-container">
                
                <!-- 叶片1：上方 (12点方向) -->
                <div class="absolute windmill-blade windmill-blade-1" style="top: 0; left: 50%; transform: translateX(-50%) rotate(0deg); transform-origin: 50% 192px;">
                  <div class="relative group w-32 h-24">
                    <div class="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-xl transform group-hover:rotate-3 transition-transform"></div>
                    <div class="relative rounded-xl overflow-hidden transform group-hover:scale-110 transition-all duration-500 border border-cyan-400/30 windmill-card">
                      <img src="https://ix-marketing.imgix.net/case-study_tile_rew.png?auto=format,compress&w=2618" alt="高端时尚设计" class="w-full h-full object-cover" />
                      <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div class="absolute bottom-1 left-1 text-cyan-400 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">AI生成</div>
                    </div>
                  </div>
                </div>
                
                <!-- 叶片2：右方 (3点方向) -->
                <div class="absolute windmill-blade windmill-blade-2" style="top: 50%; right: 0; transform: translateY(-50%) rotate(90deg); transform-origin: -160px 50%;">
                  <div class="relative group w-32 h-24">
                    <div class="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-xl transform group-hover:rotate-3 transition-transform"></div>
                    <div class="relative rounded-xl overflow-hidden transform group-hover:scale-110 transition-all duration-500 border border-purple-400/30 windmill-card">
                      <img src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=600&auto=format&fit=crop" alt="未来科技风" class="w-full h-full object-cover" />
                      <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div class="absolute bottom-1 left-1 text-purple-400 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">智能设计</div>
                    </div>
                  </div>
                </div>
                
                <!-- 叶片3：下方 (6点方向) -->
                <div class="absolute windmill-blade windmill-blade-3" style="bottom: 0; left: 50%; transform: translateX(-50%) rotate(180deg); transform-origin: 50% -168px;">
                  <div class="relative group w-32 h-24">
                    <div class="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-xl transform group-hover:rotate-3 transition-transform"></div>
                    <div class="relative rounded-xl overflow-hidden transform group-hover:scale-110 transition-all duration-500 border border-blue-400/30 windmill-card">
                      <img src="https://images.unsplash.com/photo-1563291074-2bf8677ac0e5?q=80&w=600&auto=format&fit=crop" alt="奢华产品" class="w-full h-full object-cover" />
                      <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div class="absolute bottom-1 left-1 text-blue-400 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">创意生成</div>
                    </div>
                  </div>
                </div>
                
                <!-- 叶片4：左方 (9点方向) -->
                <div class="absolute windmill-blade windmill-blade-4" style="top: 50%; left: 0; transform: translateY(-50%) rotate(270deg); transform-origin: 160px 50%;">
                  <div class="relative group w-32 h-24">
                    <div class="absolute inset-0 bg-gradient-to-br from-pink-400/20 to-cyan-400/20 rounded-xl transform group-hover:rotate-3 transition-transform"></div>
                    <div class="relative rounded-xl overflow-hidden transform group-hover:scale-110 transition-all duration-500 border border-pink-400/30 windmill-card">
                      <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=600&auto=format&fit=crop" alt="建筑设计" class="w-full h-full object-cover" />
                      <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div class="absolute bottom-1 left-1 text-pink-400 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">空间设计</div>
                    </div>
                  </div>
                </div>
                
                <!-- 连接线条 -->
                <div class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <svg class="w-96 h-96" viewBox="0 0 400 400" fill="none">
                    <!-- 四条连接线 -->
                    <line x1="200" y1="200" x2="200" y2="50" stroke="url(#windmill-gradient1)" stroke-width="1" opacity="0.4" class="animate-pulse"/>
                    <line x1="200" y1="200" x2="350" y2="200" stroke="url(#windmill-gradient2)" stroke-width="1" opacity="0.4" class="animate-pulse" style="animation-delay: 0.5s;"/>
                    <line x1="200" y1="200" x2="200" y2="350" stroke="url(#windmill-gradient3)" stroke-width="1" opacity="0.4" class="animate-pulse" style="animation-delay: 1s;"/>
                    <line x1="200" y1="200" x2="50" y2="200" stroke="url(#windmill-gradient4)" stroke-width="1" opacity="0.4" class="animate-pulse" style="animation-delay: 1.5s;"/>
                    
                    <defs>
                      <linearGradient id="windmill-gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color:#06b6d4"/>
                        <stop offset="100%" style="stop-color:#3b82f6"/>
                      </linearGradient>
                      <linearGradient id="windmill-gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style="stop-color:#8b5cf6"/>
                        <stop offset="100%" style="stop-color:#ec4899"/>
                      </linearGradient>
                      <linearGradient id="windmill-gradient3" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color:#3b82f6"/>
                        <stop offset="100%" style="stop-color:#06b6d4"/>
                      </linearGradient>
                      <linearGradient id="windmill-gradient4" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style="stop-color:#ec4899"/>
                        <stop offset="100%" style="stop-color:#06b6d4"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
            
            <!-- 数据流效果 -->
            <div class="absolute top-0 right-0 w-24 h-1 bg-gradient-to-r from-transparent to-cyan-400 opacity-50 data-flow"></div>
            <div class="absolute bottom-0 left-0 w-24 h-1 bg-gradient-to-r from-blue-400 to-transparent opacity-50 data-flow" style="animation-delay: 2s;"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- 特色标语区域 -->
    <section class="py-24 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      <!-- 极光背景效果 -->
      <div class="absolute inset-0 opacity-30">
        <div class="aurora aurora-1"></div>
        <div class="aurora aurora-2"></div>
        <div class="aurora aurora-3"></div>
      </div>
      
      <!-- 流星划过效果 -->
      <div class="shooting-stars">
        <div class="shooting-star shooting-star-1"></div>
        <div class="shooting-star shooting-star-2"></div>
        <div class="shooting-star shooting-star-3"></div>
      </div>
      
      <div class="max-w-5xl mx-auto text-center px-8 relative z-10">
        <h2 class="text-4xl md:text-5xl font-bold mb-4">CUZCUZAI，更懂创意的AI</h2>
        <p class="text-xl text-gray-300">少做重复设计，多样创作时间</p>
      </div>
    </section>

    <!-- 功能特点区域 -->
    <section class="py-20 bg-gray-900 relative overflow-hidden">
      <!-- 科技网格背景 -->
      <div class="absolute inset-0 opacity-5">
        <div class="tech-grid-bg"></div>
      </div>
      
      <!-- 浮动数据点 -->
      <div class="floating-data-points">
        <div class="data-point data-point-1"></div>
        <div class="data-point data-point-2"></div>
        <div class="data-point data-point-3"></div>
        <div class="data-point data-point-4"></div>
        <div class="data-point data-point-5"></div>
      </div>
      
      <div class="max-w-7xl mx-auto px-8 relative z-10">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- 特点卡片1 -->
          <div class="hover-card bg-gray-800 bg-opacity-50 rounded-xl p-8 transition-all duration-300 text-center">
            <div class="relative mb-6">
              <div class="w-full h-48 overflow-hidden rounded-xl mb-4">
                <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=500&auto=format&fit=crop" alt="AI智能生成" class="w-full h-full object-cover transition-transform hover:scale-110 duration-300" />
              </div>
            </div>
            <h3 class="text-2xl font-bold text-blue-400 mb-4">一键生成素材</h3>
            <p class="text-gray-400 leading-relaxed text-sm mb-4">多种素材生成方式，智能编辑工具加持，轻松生成创意素材</p>
            <div class="flex justify-center gap-6">
              <div class="flex items-center text-gray-300 text-sm">
                <div class="w-2 h-2 bg-cyan-400 rounded-full mr-2"></div>
                <span>文本生图</span>
              </div>
              <div class="flex items-center text-gray-300 text-sm">
                <div class="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                <span>图像变换</span>
              </div>
              <div class="flex items-center text-gray-300 text-sm">
                <div class="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                <span>风格迁移</span>
              </div>
            </div>
          </div>
          
          <!-- 特点卡片2 -->
          <div class="hover-card bg-gray-800 bg-opacity-50 rounded-xl p-8 transition-all duration-300 text-center">
            <div class="relative mb-6">
              <div class="w-full h-48 overflow-hidden rounded-xl mb-4">
                <img src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=500&auto=format&fit=crop" alt="高清图像处理" class="w-full h-full object-cover transition-transform hover:scale-110 duration-300" />
              </div>
            </div>
            <h3 class="text-2xl font-bold text-blue-400 mb-4">逼真精准细化</h3>
            <p class="text-gray-400 leading-relaxed text-sm mb-4">多种生成方式，加强图像的清晰度文字准确，格式优化，突破极限</p>
            <div class="flex justify-center gap-6">
              <div class="flex items-center text-gray-300 text-sm">
                <div class="w-2 h-2 bg-cyan-400 rounded-full mr-2"></div>
                <span>高清放大</span>
              </div>
              <div class="flex items-center text-gray-300 text-sm">
                <div class="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                <span>细节增强</span>
              </div>
              <div class="flex items-center text-gray-300 text-sm">
                <div class="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                <span>色彩优化</span>
              </div>
            </div>
          </div>
          
          <!-- 特点卡片3 -->
          <div class="hover-card bg-gray-800 bg-opacity-50 rounded-xl p-8 transition-all duration-300 text-center">
            <div class="relative mb-6">
              <div class="w-full h-48 overflow-hidden rounded-xl mb-4">
                <img src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=500&auto=format&fit=crop" alt="简易操作" class="w-full h-full object-cover transition-transform hover:scale-110 duration-300" />
              </div>
            </div>
            <h3 class="text-2xl font-bold text-blue-400 mb-4">不用学就会用</h3>
            <p class="text-gray-400 leading-relaxed text-sm mb-4">中文语境交互，无需环境配置，详细教程在线管理支持导出文件</p>
            <div class="flex justify-center gap-6">
              <div class="flex items-center text-gray-300 text-sm">
                <div class="w-2 h-2 bg-cyan-400 rounded-full mr-2"></div>
                <span>中文交互</span>
              </div>
              <div class="flex items-center text-gray-300 text-sm">
                <div class="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                <span>在线教程</span>
              </div>
              <div class="flex items-center text-gray-300 text-sm">
                <div class="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                <span>一键导出</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 设计场景区域 -->
    <section class="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      <!-- 能量波纹效果 -->
      <div class="absolute inset-0">
        <div class="energy-wave energy-wave-1"></div>
        <div class="energy-wave energy-wave-2"></div>
        <div class="energy-wave energy-wave-3"></div>
      </div>
      
      <!-- 漂浮粒子群 -->
      <div class="particle-swarm">
        <div class="particle particle-1"></div>
        <div class="particle particle-2"></div>
        <div class="particle particle-3"></div>
        <div class="particle particle-4"></div>
        <div class="particle particle-5"></div>
        <div class="particle particle-6"></div>
      </div>
      
      <div class="max-w-7xl mx-auto px-8 relative z-10">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold mb-4">多元设计场景，<span class="text-blue-400">高效创意工作流</span></h2>
        </div>
        
        <!-- 场景标签 -->
        <div class="flex justify-center flex-wrap gap-4 mb-16">
          <button class="px-6 py-2 rounded-full bg-gray-800 border border-gray-700 text-white hover:bg-gray-700 transition-colors">电商设计</button>
          <button class="px-6 py-2 rounded-full bg-gray-800 border border-gray-700 text-white hover:bg-gray-700 transition-colors">平面海报</button>
          <button class="px-6 py-2 rounded-full bg-gray-800 border border-gray-700 text-white hover:bg-gray-700 transition-colors">游戏美术</button>
          <button class="px-6 py-2 rounded-full bg-gray-800 border border-gray-700 text-white hover:bg-gray-700 transition-colors">绘本设计</button>
          <button class="px-6 py-2 rounded-full bg-gray-800 border border-gray-700 text-white hover:bg-gray-700 transition-colors">品牌设计</button>
          <button class="px-6 py-2 rounded-full bg-gray-800 border border-gray-700 text-white hover:bg-gray-700 transition-colors">无限创意</button>
        </div>
        
        <!-- AI模特展示区域 -->
        <div class="relative p-8 bg-gradient-to-br from-gray-900/80 to-gray-800/60 rounded-3xl overflow-hidden backdrop-blur-sm border border-gray-700/50">
          <!-- 量子粒子效果 -->
          <div class="quantum-particles">
            <div class="quantum-dot quantum-dot-1"></div>
            <div class="quantum-dot quantum-dot-2"></div>
            <div class="quantum-dot quantum-dot-3"></div>
            <div class="quantum-dot quantum-dot-4"></div>
            <div class="quantum-dot quantum-dot-5"></div>
          </div>
          
          <!-- 数据流线效果 -->
          <div class="data-streams">
            <div class="data-stream stream-1"></div>
            <div class="data-stream stream-2"></div>
            <div class="data-stream stream-3"></div>
          </div>
          
          <!-- 背景装饰 -->
          <div class="absolute inset-0 opacity-10">
            <div class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-400/20 to-transparent rounded-full"></div>
            <div class="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-cyan-400/20 to-transparent rounded-full"></div>
          </div>
          
          <!-- 动态线条装饰 -->
          <div class="absolute inset-0">
            <svg class="w-full h-full" viewBox="0 0 600 400" fill="none" style="opacity: 0.15;">
              <path d="M0 200 Q150 100 300 200 T600 200" stroke="url(#aiModelGradient1)" stroke-width="1" class="animate-pulse"/>
              <path d="M0 250 Q200 150 400 250 T600 250" stroke="url(#aiModelGradient2)" stroke-width="1" class="animate-pulse" style="animation-delay: 1s;"/>
              <defs>
                <linearGradient id="aiModelGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style="stop-color:#06b6d4"/>
                  <stop offset="100%" style="stop-color:#3b82f6"/>
                </linearGradient>
                <linearGradient id="aiModelGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style="stop-color:#8b5cf6"/>
                  <stop offset="100%" style="stop-color:#06b6d4"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          
          <div class="relative z-10 flex flex-col lg:flex-row gap-12">
            <!-- 左侧内容区域 -->
            <div class="lg:w-2/5 flex flex-col justify-center">
              <!-- 标题区域 -->
              <div class="mb-8">
                <div class="flex items-center mb-4">
                  <div class="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-xl flex items-center justify-center mr-4">
                    <svg class="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">AI模特</h3>
                    <div class="h-1 w-16 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mt-2"></div>
                  </div>
                </div>
                <p class="text-xl text-gray-300 leading-relaxed">服装上身更直观，营销转化更高效</p>
              </div>
              
              <!-- 特性列表 -->
              <div class="space-y-4 mb-8">
                <div class="flex items-center">
                  <div class="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                  <span class="text-gray-300">真实模特效果展示</span>
                </div>
                <div class="flex items-center">
                  <div class="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                  <span class="text-gray-300">多样化服装搭配</span>
                </div>
                <div class="flex items-center">
                  <div class="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                  <span class="text-gray-300">一键智能换装</span>
                </div>
              </div>
              
              <!-- 操作按钮 -->
              <button 
                @click="handleTryNow"
                class="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105"
              >
                <span class="relative z-10 flex items-center">
                  <span>马上试用</span>
                  <svg class="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </span>
                <div class="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
            </div>
            
            <!-- 右侧图片展示区域 -->
            <div class="lg:w-3/5">
              <div class="relative">
                <!-- 简化的展示区域 -->
                <div class="grid grid-cols-3 gap-6">
                  
                  <!-- 主图：时尚模特 -->
                  <div class="relative group h-96">
                    <div class="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-2xl transform rotate-1 group-hover:rotate-2 transition-transform"></div>
                    <div class="relative h-full rounded-2xl overflow-hidden border border-cyan-400/30 group-hover:border-cyan-400/50 transition-colors">
                      <img src="https://images.unsplash.com/photo-1603217192634-61068e4d4bf9?q=80&w=400&auto=format&fit=crop" alt="时尚模特" class="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" />
                      <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div class="absolute bottom-4 left-4 text-cyan-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">时尚模特</div>
                    </div>
                  </div>
                  
                  <!-- 中图：服装展示 -->
                  <div class="flex flex-col gap-6">
                    <div class="relative group h-44">
                      <div class="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-xl transform -rotate-1 group-hover:-rotate-2 transition-transform"></div>
                      <div class="relative h-full rounded-xl overflow-hidden border border-purple-400/30 group-hover:border-purple-400/50 transition-colors">
                        <img src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=400&auto=format&fit=crop" alt="服装展示" class="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" />
                        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div class="absolute bottom-3 left-3 text-purple-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">服装展示</div>
                      </div>
                    </div>
                    
                    <div class="relative group h-44">
                      <div class="absolute inset-0 bg-gradient-to-br from-pink-400/20 to-cyan-400/20 rounded-xl transform rotate-1 group-hover:rotate-2 transition-transform"></div>
                      <div class="relative h-full rounded-xl overflow-hidden border border-pink-400/30 group-hover:border-pink-400/50 transition-colors">
                        <img src="https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=400&auto=format&fit=crop" alt="效果对比" class="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" />
                        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div class="absolute bottom-3 left-3 text-pink-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">效果对比</div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- 右侧图：创意展示 -->
                  <div class="relative group h-96">
                    <div class="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-2xl transform -rotate-1 group-hover:-rotate-2 transition-transform"></div>
                    <div class="relative h-full rounded-2xl overflow-hidden border border-blue-400/30 group-hover:border-blue-400/50 transition-colors">
                      <img src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=300&auto=format&fit=crop" alt="创意展示" class="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" />
                      <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div class="absolute bottom-4 left-4 text-blue-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">创意展示</div>
                    </div>
                  </div>
                  
                </div>
                
                <!-- 浮动装饰元素 -->
                <div class="absolute -top-6 -right-6 w-10 h-10 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-15 animate-pulse"></div>
                <div class="absolute -bottom-6 -left-6 w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-pulse" style="animation-delay: 1s;"></div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 通用设计工作流 -->
        <div class="mt-20 relative">
          <!-- 科技线条网络 -->
          <div class="absolute inset-0 opacity-10">
            <svg class="w-full h-full" viewBox="0 0 800 400">
              <defs>
                <linearGradient id="workflow-line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style="stop-color:#06b6d4"/>
                  <stop offset="50%" style="stop-color:#3b82f6"/>
                  <stop offset="100%" style="stop-color:#8b5cf6"/>
                </linearGradient>
              </defs>
              <path d="M0,200 Q200,100 400,200 T800,200" stroke="url(#workflow-line-gradient)" stroke-width="2" fill="none" class="tech-flow-line"/>
              <path d="M100,100 Q300,50 500,100 T700,100" stroke="url(#workflow-line-gradient)" stroke-width="1" fill="none" class="tech-flow-line" style="animation-delay: 1s;"/>
              <path d="M100,300 Q300,350 500,300 T700,300" stroke="url(#workflow-line-gradient)" stroke-width="1" fill="none" class="tech-flow-line" style="animation-delay: 2s;"/>
            </svg>
          </div>
          
          <div class="text-center mb-12 relative z-10">
            <h3 class="text-3xl font-bold mb-4">通用设计工作流</h3>
            <p class="text-gray-400">从创意到成品，AI助力每一步</p>
          </div>
          
          <!-- 工作流步骤 -->
          <div class="relative">
            <!-- 连接线和简洁流光效果 -->
            <div class="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 hidden md:block overflow-visible">
              <!-- 基础连接线 -->
              <div class="h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"></div>
              
              <!-- 简洁流光条 -->
              <div class="absolute inset-0 overflow-visible">
                <div class="workflow-simple-flow h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full transform -translate-y-0.25"></div>
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
              <!-- 步骤1 -->
              <div class="text-center">
                <div class="relative mx-auto w-20 h-20 mb-4">
                  <div class="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full p-0.5">
                    <div class="w-full h-full bg-black rounded-full flex items-center justify-center">
                      <svg class="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                      </svg>
                    </div>
                  </div>
                  <div class="absolute -top-1 -right-1 w-6 h-6 bg-cyan-400 rounded-full flex items-center justify-center text-black font-bold text-sm">1</div>
                </div>
                <h4 class="text-lg font-semibold text-cyan-400 mb-2">创意输入</h4>
                <p class="text-gray-400 text-sm">输入文字描述或上传参考图片</p>
              </div>
              
              <!-- 步骤2 -->
              <div class="text-center">
                <div class="relative mx-auto w-20 h-20 mb-4">
                  <div class="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-0.5">
                    <div class="w-full h-full bg-black rounded-full flex items-center justify-center">
                      <svg class="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                      </svg>
                    </div>
                  </div>
                  <div class="absolute -top-1 -right-1 w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                </div>
                <h4 class="text-lg font-semibold text-blue-400 mb-2">AI分析</h4>
                <p class="text-gray-400 text-sm">智能理解需求，匹配最佳风格</p>
              </div>
              
              <!-- 步骤3 -->
              <div class="text-center">
                <div class="relative mx-auto w-20 h-20 mb-4">
                  <div class="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-0.5">
                    <div class="w-full h-full bg-black rounded-full flex items-center justify-center">
                      <svg class="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 3v1m0 0v1m0-1h2m-2 0H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-7 3V7a1 1 0 011-1h4a1 1 0 011 1v1"></path>
                      </svg>
                    </div>
                  </div>
                  <div class="absolute -top-1 -right-1 w-6 h-6 bg-purple-400 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                </div>
                <h4 class="text-lg font-semibold text-purple-400 mb-2">快速生成</h4>
                <p class="text-gray-400 text-sm">秒级生成高质量创意素材</p>
              </div>
              
              <!-- 步骤4 -->
              <div class="text-center">
                <div class="relative mx-auto w-20 h-20 mb-4">
                  <div class="absolute inset-0 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-full p-0.5">
                    <div class="w-full h-full bg-black rounded-full flex items-center justify-center">
                      <svg class="w-8 h-8 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                    </div>
                  </div>
                  <div class="absolute -top-1 -right-1 w-6 h-6 bg-pink-400 rounded-full flex items-center justify-center text-white font-bold text-sm">4</div>
                </div>
                <h4 class="text-lg font-semibold text-pink-400 mb-2">完善导出</h4>
                <p class="text-gray-400 text-sm">精细调整，一键导出成品</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 素材生成区域 -->
    <section class="py-20 bg-black">
      <div class="max-w-7xl mx-auto px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold mb-4">创意素材生成</h2>
        </div>
        
        <!-- 素材类型标签 -->
        <div class="flex justify-center flex-wrap gap-4 mb-16">
          <button class="px-6 py-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors">文本生图</button>
          <button class="px-6 py-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors">图片转风格</button>
          <button class="px-6 py-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors">相似图制变</button>
          <button class="px-6 py-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors">差分生图</button>
        </div>
        
        <!-- 文本生图界面 -->
        <div class="bg-gray-900/50 rounded-2xl overflow-hidden p-8 border border-gray-800">
          <div class="flex flex-col md:flex-row gap-8">
            <div class="md:w-1/2">
              <div class="bg-gray-800/50 rounded-xl p-6 mb-6">
                <div class="flex items-center space-x-2 mb-4">
                  <div class="w-3 h-3 rounded-full bg-blue-400"></div>
                  <h4 class="text-lg font-medium">文本生图</h4>
                </div>
                <p class="text-gray-400 text-sm mb-4">CUZCUZAI一键触发</p>
                <p class="text-gray-400 text-sm mb-6">支持中文输入，隔海相望即可视觉</p>
                
                <!-- 输入框 -->
                <div class="relative">
                  <input 
                    type="text" 
                    placeholder="产品描述，创意需求，风格，背景等等"
                    class="w-full bg-black/50 border border-gray-700 rounded-full px-6 py-3 text-white focus:outline-none focus:border-blue-400"
                  />
                  <button 
                    @click="handleGenerate"
                    class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-full text-sm transition-colors"
                  >
                    生成
                  </button>
                </div>
              </div>
              
              <!-- 输入提示 -->
              <div class="text-right">
                <button class="text-blue-400 hover:text-blue-300 text-sm transition-colors">
                  生成风格推荐
                </button>
              </div>
            </div>
            
            <!-- 右侧预览区 -->
            <div class="md:w-1/2 flex items-center justify-center bg-gradient-to-b from-transparent to-gray-800/30 rounded-xl">
              <div class="w-full h-80 bg-gray-800/50 rounded-xl flex items-center justify-center border border-gray-700">
                <img src="https://images.unsplash.com/photo-1511376777868-611b54f68947?q=80&w=600&auto=format&fit=crop" alt="AI生成效果预览" class="h-full w-auto rounded-xl object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 素材加工区域 -->
    <section class="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      <!-- 数字雨效果 -->
      <div class="digital-rain">
        <div class="rain-drop rain-drop-1"></div>
        <div class="rain-drop rain-drop-2"></div>
        <div class="rain-drop rain-drop-3"></div>
        <div class="rain-drop rain-drop-4"></div>
        <div class="rain-drop rain-drop-5"></div>
      </div>
      
      <!-- 电路板背景 -->
      <div class="absolute inset-0 opacity-5">
        <div class="circuit-board-bg"></div>
      </div>
      
      <!-- 浮动代码片段 -->
      <div class="floating-code-snippets">
        <div class="code-snippet code-snippet-1">CUZ</div>
        <div class="code-snippet code-snippet-2">CUZ</div>
        <div class="code-snippet code-snippet-3">AI</div>
      </div>
      
      <div class="max-w-7xl mx-auto px-8 relative z-10">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold mb-4">高效素材加工</h2>
        </div>
        
        <!-- 加工功能标签 -->
        <div class="flex justify-center flex-wrap gap-4 mb-16">
          <button class="px-6 py-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors">一键抠图</button>
          <button class="px-6 py-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors">智能擦除</button>
          <button class="px-6 py-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors">画面拓展</button>
          <button class="px-6 py-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors">智能替换</button>
          <button class="px-6 py-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors">无损放大</button>
          <button class="px-6 py-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors">线稿提取</button>
        </div>
        
        <!-- 示例展示 -->
        <div class="flex flex-col md:flex-row gap-8">
          <div class="md:w-1/2">
            <div class="bg-gray-800/30 rounded-xl p-6 h-full">
              <div class="flex items-center mb-4">
                <div class="w-3 h-3 rounded-full bg-blue-400 mr-2"></div>
                <h3 class="text-xl font-medium">一键抠图</h3>
              </div>
              <p class="text-gray-400 text-sm mb-6">AI智能识别主体，秒级移除背景</p>
              
              <!-- 抠图动画展示区 -->
              <div class="h-72 relative bg-gray-900/50 rounded-lg overflow-hidden group cursor-pointer" @click="startMattingAnimation">
                <!-- 透明背景棋盘格 -->
                <div class="absolute inset-0 matting-background"></div>
                
                <!-- 抠图后的图片（透明背景）- 底层 -->
                <div class="absolute inset-0 matting-result">
                  <!-- 已经抠好图的狗狗 - 透明背景 -->
                  <div class="w-full h-full relative transition-all duration-500" 
                       :class="{ 'matting-glow': isMattingAnimating }">
                    <!-- 直接显示已经抠好图的狗狗图片 -->
                    <img 
                      src="/dog.png" 
                      alt="抠图后的狗狗（透明背景）" 
                      class="w-full h-full object-cover matting-cutout-image"
                    />
                  </div>
                </div>
                
                <!-- 原始图片遮罩层 - 从左到右移除 -->
                <div class="absolute inset-0 matting-overlay" :class="{ 'animate-sweep-away': isMattingAnimating }">
                  <img 
                    src="/dogbg.png" 
                    alt="原始图片-带背景的狗狗" 
                    class="w-full h-full object-cover" 
                  />
                </div>
                
                <!-- AI处理光束效果 -->
                <div class="absolute inset-0 matting-beam" :class="{ 'animate-beam': isMattingAnimating }"></div>
                
                <!-- 提示文字 -->
                <div class="absolute bottom-4 left-4 text-cyan-400 text-sm font-medium opacity-80 group-hover:opacity-100 transition-opacity z-10">
                  <div v-if="!isMattingAnimating" class="flex items-center bg-black/70 backdrop-blur-sm px-3 py-2 rounded-full">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                    <span class="animate-pulse">点击查看AI抠图过程</span>
                  </div>
                  <div v-else class="flex items-center bg-black/70 backdrop-blur-sm px-3 py-2 rounded-full">
                    <svg class="w-4 h-4 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                    </svg>
                    <span class="text-yellow-400">AI正在智能抠图中...</span>
                  </div>
                </div>
                
                <!-- 动画状态指示 -->
                <div v-if="isMattingAnimating" class="absolute top-4 right-4 bg-green-500/20 border border-green-400/50 text-green-400 px-3 py-1 rounded-full text-xs font-medium animate-pulse z-10">
                  <span class="flex items-center">
                    <div class="w-2 h-2 bg-green-400 rounded-full mr-2 animate-ping"></div>
                    背景移除中
                  </span>
                </div>
                
                <!-- 透明背景提示 -->
                <div v-if="isMattingAnimating" class="absolute top-4 left-4 bg-white/90 border border-gray-300 text-gray-800 px-3 py-1 rounded-full text-xs font-medium z-10 shadow-md">
                  <span class="flex items-center">
                    <div class="w-3 h-3 mr-2 rounded-sm" style="background: repeating-conic-gradient(#cccccc 0% 25%, white 0% 50%) 50% / 6px 6px;"></div>
                    PNG透明背景
                  </span>
                </div>
                
                <!-- 进度条 -->
                <div v-if="isMattingAnimating" class="absolute bottom-0 left-0 w-full h-1 bg-gray-700">
                  <div class="h-full bg-gradient-to-r from-blue-400 to-cyan-400 animate-progress"></div>
                </div>
              </div>
              
              <div class="mt-4 text-center">
                <!-- 动态按钮 -->
                <NuxtLink 
                  :to="isLoggedIn ? '/dashboard' : '/login'" 
                  class="inline-block bg-gradient-to-r from-blue-600 to-blue-400 text-white px-6 py-2 rounded-md text-sm hover:from-blue-700 hover:to-blue-500 transition-colors"
                >
                  {{ isLoggedIn ? '开始创作' : '立即体验' }}
                </NuxtLink>
              </div>
            </div>
          </div>
          
          <div class="md:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-gray-800/30 rounded-xl p-6">
              <h4 class="text-lg font-medium mb-4">创意太难...?</h4>
              <p class="text-gray-400 text-sm mb-4">设计灵感枯竭，无从下手</p>
              <div class="w-full h-32 overflow-hidden rounded-lg">
                <img src="https://images.unsplash.com/photo-1505238680356-667803448bb6?q=80&w=400&auto=format&fit=crop" alt="创意困境" class="w-full h-full object-cover" />
              </div>
            </div>
            
            <div class="bg-gray-800/30 rounded-xl p-6">
              <h4 class="text-lg font-medium mb-4">沟通太难...?</h4>
              <p class="text-gray-400 text-sm mb-4">需求模糊不清，沟通效率低</p>
              <div class="w-full h-32 overflow-hidden rounded-lg">
                <img src="https://images.unsplash.com/photo-1558403194-611308249627?q=80&w=400&auto=format&fit=crop" alt="沟通问题" class="w-full h-full object-cover" />
              </div>
            </div>
            
            <div class="bg-gray-800/30 rounded-xl p-6">
              <h4 class="text-lg font-medium mb-4">AI好复杂...?</h4>
              <p class="text-gray-400 text-sm mb-4">安装程序复杂，英文界面看不懂</p>
              <div class="w-full h-32 overflow-hidden rounded-lg">
                <img src="https://images.unsplash.com/photo-1535378620166-273708d44e4c?q=80&w=400&auto=format&fit=crop" alt="复杂AI" class="w-full h-full object-cover" />
              </div>
            </div>
            
            <div class="bg-gray-800/30 rounded-xl p-6">
              <h4 class="text-lg font-medium mb-4">不用学就会</h4>
              <p class="text-gray-400 text-sm mb-4">中文即可交互，详细教程</p>
              <div class="w-full h-32 overflow-hidden rounded-lg">
                <img src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=400&auto=format&fit=crop" alt="简单操作" class="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 风格画廊 -->
    <section class="py-20 bg-black relative overflow-hidden">
      <!-- 光束扫描效果 -->
      <div class="scanning-beams">
        <div class="scan-beam scan-beam-1"></div>
        <div class="scan-beam scan-beam-2"></div>
        <div class="scan-beam scan-beam-3"></div>
      </div>
      
      <!-- 星空背景 -->
      <div class="starfield">
        <div class="star star-1"></div>
        <div class="star star-2"></div>
        <div class="star star-3"></div>
        <div class="star star-4"></div>
        <div class="star star-5"></div>
        <div class="star star-6"></div>
        <div class="star star-7"></div>
        <div class="star star-8"></div>
      </div>
      
      <!-- 全息网格 -->
      <div class="absolute inset-0 opacity-10">
        <div class="holographic-grid"></div>
      </div>
      
      <div class="max-w-7xl mx-auto px-8 relative z-10">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold mb-4">甄选风格</h2>
        </div>
        
        <!-- 风格图片网格 -->
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          <div class="text-center">
            <div class="w-full h-60 overflow-hidden rounded-xl mb-4 hover-card">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop" alt="人像风格" class="w-full h-full object-cover transition-transform hover:scale-110 duration-300" />
            </div>
            <h4 class="text-lg font-medium text-cyan-400 mb-2">人像风格</h4>
            <p class="text-gray-400 text-sm">专业人像摄影风格</p>
          </div>
          
          <div class="text-center">
            <div class="w-full h-60 overflow-hidden rounded-xl mb-4 hover-card">
              <img src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=400&auto=format&fit=crop" alt="抽象风格" class="w-full h-full object-cover transition-transform hover:scale-110 duration-300" />
            </div>
            <h4 class="text-lg font-medium text-cyan-400 mb-2">抽象艺术</h4>
            <p class="text-gray-400 text-sm">现代抽象艺术表达</p>
          </div>
          
          <div class="text-center">
            <div class="w-full h-60 overflow-hidden rounded-xl mb-4 hover-card">
              <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop" alt="插画风格" class="w-full h-full object-cover transition-transform hover:scale-110 duration-300" />
            </div>
            <h4 class="text-lg font-medium text-cyan-400 mb-2">插画设计</h4>
            <p class="text-gray-400 text-sm">手绘插画艺术风格</p>
          </div>
          
          <div class="text-center">
            <div class="w-full h-60 overflow-hidden rounded-xl mb-4 hover-card">
              <img src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=400&auto=format&fit=crop" alt="科技风格" class="w-full h-full object-cover transition-transform hover:scale-110 duration-300" />
            </div>
            <h4 class="text-lg font-medium text-cyan-400 mb-2">科技未来</h4>
            <p class="text-gray-400 text-sm">科幻未来主义风格</p>
          </div>
          
          <div class="text-center">
            <div class="w-full h-60 overflow-hidden rounded-xl mb-4 hover-card">
              <img src="https://images.unsplash.com/photo-1549888834-3ec93abae044?q=80&w=400&auto=format&fit=crop" alt="建筑风格" class="w-full h-full object-cover transition-transform hover:scale-110 duration-300" />
            </div>
            <h4 class="text-lg font-medium text-cyan-400 mb-2">建筑摄影</h4>
            <p class="text-gray-400 text-sm">现代建筑美学</p>
          </div>
          
          <div class="text-center">
            <div class="w-full h-60 overflow-hidden rounded-xl mb-4 hover-card">
              <img src="https://images.unsplash.com/photo-1551034549-befb91b260e0?q=80&w=400&auto=format&fit=crop" alt="自然风格" class="w-full h-full object-cover transition-transform hover:scale-110 duration-300" />
            </div>
            <h4 class="text-lg font-medium text-cyan-400 mb-2">自然风光</h4>
            <p class="text-gray-400 text-sm">自然景观摄影</p>
          </div>
          
          <div class="text-center">
            <div class="w-full h-60 overflow-hidden rounded-xl mb-4 hover-card">
              <img src="https://images.unsplash.com/photo-1560393464-5c69a73c5770?q=80&w=400&auto=format&fit=crop" alt="产品风格" class="w-full h-full object-cover transition-transform hover:scale-110 duration-300" />
            </div>
            <h4 class="text-lg font-medium text-cyan-400 mb-2">产品摄影</h4>
            <p class="text-gray-400 text-sm">商业产品展示</p>
          </div>
          
          <div class="text-center">
            <div class="w-full h-60 overflow-hidden rounded-xl mb-4 hover-card">
              <img src="https://images.unsplash.com/photo-1626544827763-d516dce335e2?q=80&w=400&auto=format&fit=crop" alt="3D风格" class="w-full h-full object-cover transition-transform hover:scale-110 duration-300" />
            </div>
            <h4 class="text-lg font-medium text-cyan-400 mb-2">3D渲染</h4>
            <p class="text-gray-400 text-sm">立体三维效果</p>
          </div>
        </div>
        
        <!-- 立即体验按钮 -->
        <div class="mt-16 text-center">
          <NuxtLink 
            :to="isLoggedIn ? '/dashboard' : '/login'" 
            class="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/25"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
            <span>{{ isLoggedIn ? '开始创作' : '立即体验 CUZCUZAI' }}</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- 底部信息区域 -->
    <footer class="relative bg-gradient-to-b from-gray-900 via-black to-gray-900 overflow-hidden">
      <!-- 脉冲波纹 -->
      <div class="pulse-waves">
        <div class="pulse-wave pulse-wave-1"></div>
        <div class="pulse-wave pulse-wave-2"></div>
        <div class="pulse-wave pulse-wave-3"></div>
      </div>
      
      <!-- 闪烁星点 -->
      <div class="twinkling-stars">
        <div class="twinkle twinkle-1"></div>
        <div class="twinkle twinkle-2"></div>
        <div class="twinkle twinkle-3"></div>
        <div class="twinkle twinkle-4"></div>
        <div class="twinkle twinkle-5"></div>
        <div class="twinkle twinkle-6"></div>
      </div>
      
      <!-- 科技感背景装饰 -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent"></div>
        <div class="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-400 to-transparent"></div>
        <div class="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
      </div>
      
      <!-- 主要内容区域 -->
      <div class="relative z-10 max-w-7xl mx-auto px-8 py-16">
        <div class="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
          
          <!-- Logo和介绍区域 -->
          <div class="md:col-span-1">
            <div class="flex items-center mb-6">
              <div class="relative w-12 h-12 mr-4">
                <div class="absolute inset-0 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 rounded-xl p-0.5">
                  <div class="w-full h-full bg-black rounded-xl flex items-center justify-center">
                    <svg class="w-7 h-7 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                      <path d="M2 17l10 5 10-5"/>
                      <path d="M2 12l10 5 10-5"/>
                    </svg>
                  </div>
                </div>
                <div class="absolute -top-1 -right-1 w-4 h-4 bg-cyan-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h3 class="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">CUZCUZAI</h3>
                <p class="text-cyan-400/60 text-sm">AI Powered</p>
              </div>
            </div>
            <p class="text-gray-400 text-sm leading-relaxed mb-4">
              CUZCUZAI是一个专业的AI创意设计平台，致力于为用户提供高效、智能的设计解决方案。
            </p>
            <p class="text-gray-500 text-xs">Less Design, More Creation</p>
          </div>

          <!-- 关于CUZCUZAI -->
          <div class="md:col-span-1">
            <h4 class="text-cyan-400 font-semibold mb-4">关于CUZCUZAI</h4>
            <ul class="space-y-3 text-gray-400 text-sm">
              <li><a href="#" class="hover:text-cyan-400 transition-colors">关于我们</a></li>
              <li><a href="#" class="hover:text-cyan-400 transition-colors">加入我们</a></li>
              <li><a href="#" class="hover:text-cyan-400 transition-colors">联系我们</a></li>
              <li><a href="#" class="hover:text-cyan-400 transition-colors">合作交流</a></li>
            </ul>
          </div>

          <!-- 热门推荐 -->
          <div class="md:col-span-1">
            <h4 class="text-cyan-400 font-semibold mb-4">热门推荐</h4>
            <ul class="space-y-3 text-gray-400 text-sm">
              <li><a href="#" class="hover:text-cyan-400 transition-colors">定制产品</a></li>
              <li><a href="#" class="hover:text-cyan-400 transition-colors">在线设计</a></li>
              <li><a href="#" class="hover:text-cyan-400 transition-colors">POD导航</a></li>
              <li><a href="#" class="hover:text-cyan-400 transition-colors">海外货盘</a></li>
            </ul>
          </div>

          <!-- 友情链接 -->
          <div class="md:col-span-1">
            <h4 class="text-cyan-400 font-semibold mb-4">友情链接</h4>
            <ul class="space-y-3 text-gray-400 text-sm">
              <li><a href="#" class="hover:text-cyan-400 transition-colors">CUZCUZAI官网</a></li>
              <li><a href="#" class="hover:text-cyan-400 transition-colors">设计工具</a></li>
              <li><a href="#" class="hover:text-cyan-400 transition-colors">创意社区</a></li>
              <li><a href="#" class="hover:text-cyan-400 transition-colors">开发者文档</a></li>
            </ul>
          </div>

          <!-- 媒体矩阵 -->
          <div class="md:col-span-1">
            <h4 class="text-cyan-400 font-semibold mb-4">媒体矩阵</h4>
            <div class="grid grid-cols-2 gap-3">
              <!-- 公众号 -->
              <div class="text-center">
                <div class="w-16 h-16 mx-auto mb-2 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-lg border border-cyan-400/30 flex items-center justify-center">
                  <svg class="w-6 h-6 text-cyan-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <p class="text-xs text-gray-400">公众号</p>
              </div>
              
              <!-- 小程序 -->
              <div class="text-center">
                <div class="w-16 h-16 mx-auto mb-2 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-lg border border-blue-400/30 flex items-center justify-center">
                  <svg class="w-6 h-6 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <p class="text-xs text-gray-400">小程序</p>
              </div>
              
              <!-- 社群顾问 -->
              <div class="text-center">
                <div class="w-16 h-16 mx-auto mb-2 bg-gradient-to-br from-purple-400/20 to-cyan-400/20 rounded-lg border border-purple-400/30 flex items-center justify-center">
                  <svg class="w-6 h-6 text-purple-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.32 1.32 0 0 0 18.7 8H16c-.8 0-1.54.37-2.01.99l-2.54 3.38c-.28.37-.28.85 0 1.22l2.54 3.38c.47.62 1.21.99 2.01.99h1.3l2.54 7.63H20z"/>
                  </svg>
                </div>
                <p class="text-xs text-gray-400">社群顾问</p>
              </div>
              
              <!-- 抖音 -->
              <div class="text-center">
                <div class="w-16 h-16 mx-auto mb-2 bg-gradient-to-br from-pink-400/20 to-red-400/20 rounded-lg border border-pink-400/30 flex items-center justify-center">
                  <svg class="w-6 h-6 text-pink-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                </div>
                <p class="text-xs text-gray-400">抖音</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 分割线 -->
        <div class="h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent mb-8"></div>

        <!-- 底部信息 -->
        <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div class="text-center md:text-left">
            <p class="text-gray-400 text-sm mb-2">
              Copyright © CUZCUZAI All Rights Reserved. 
              <a href="#" class="text-cyan-400 hover:text-cyan-300 transition-colors">闽ICP备2025106563号</a>
            </p>
            <p class="text-gray-500 text-xs">Less Design, More Creation</p>
          </div>
          
          <!-- 合作伙伴标识 -->
          <div class="flex flex-wrap justify-center md:justify-end items-center gap-4 md:gap-6">
            <div class="flex items-center space-x-2 text-gray-400 text-xs">
              <div class="w-6 h-6 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded border border-cyan-400/30 flex items-center justify-center">
                <span class="text-cyan-400 font-bold text-xs">S</span>
              </div>
              <span>SHOPLINE</span>
            </div>
            
            <div class="flex items-center space-x-2 text-gray-400 text-xs">
              <div class="w-6 h-6 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded border border-blue-400/30 flex items-center justify-center">
                <span class="text-blue-400 font-bold text-xs">微</span>
              </div>
              <span>微信小程序</span>
            </div>
            
            <div class="flex items-center space-x-2 text-gray-400 text-xs">
              <div class="w-6 h-6 bg-gradient-to-r from-green-400/20 to-cyan-400/20 rounded border border-green-400/30 flex items-center justify-center">
                <span class="text-green-400 font-bold text-xs">C</span>
              </div>
              <span>Clipdrop合作伙伴</span>
            </div>
            
            <div class="flex items-center space-x-2 text-gray-400 text-xs">
              <div class="w-6 h-6 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded border border-blue-400/30 flex items-center justify-center">
                <span class="text-blue-400 font-bold text-xs">资</span>
              </div>
              <span>资质认证</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
// 登录状态管理
const isLoggedIn = ref(false)

// 抠图动画状态
const isMattingAnimating = ref(false)

// 检查登录状态
const checkLoginStatus = () => {
  if (process.client) {
    isLoggedIn.value = localStorage.getItem('isLoggedIn') === 'true'
  }
}

// 处理马上试用按钮点击
const handleTryNow = () => {
  if (isLoggedIn.value) {
    navigateTo('/dashboard')
  } else {
    navigateTo('/login')
  }
}

// 处理生成按钮点击
const handleGenerate = () => {
  if (isLoggedIn.value) {
    navigateTo('/dashboard')
  } else {
    navigateTo('/login')
  }
}

// 启动抠图动画
const startMattingAnimation = () => {
  if (isMattingAnimating.value) return
  
  console.log('🎬 启动一键抠图动画!')
  console.log('📋 双图片切换方案：')
  console.log('  1. 底层：已经抠好图的透明背景图片')
  console.log('  2. 顶层：原始蓝色背景图片（从左到右移除）')
  console.log('  3. 效果：透明区域显示PNG风格棋盘格背景')
  console.log('🎨 透明背景颜色：白色(#ffffff) + 浅灰色(#e5e5e5)')
  console.log('📐 棋盘格大小：12x12px')
  console.log('🖼️  方案优势：真实抠图效果，无CSS mask限制')
  console.log('📄 底层图片：/dog.png（本地透明背景图片）')
  console.log('📄 顶层图片：/dogbg.png（同一只狗的带背景版本）')
  console.log('🎯 图片配对：完美匹配，同一只狗狗的两个版本')
  console.log('🔧 尺寸修复：两张图片都使用 object-cover 确保显示大小完全一致')
  console.log('🚫 移除蓝色效果：清除边框、阴影、发光效果，保持纯净透明背景')
  console.log('⭕ 移除光圈：清除狗狗图片上的蓝色脉冲光圈提示效果')
  
  isMattingAnimating.value = true
  
  // 添加动画阶段监控
  setTimeout(() => {
    console.log('⚡ 动画进行中 - 背景正在被移除...')
  }, 1000)
  
  setTimeout(() => {
    console.log('🎯 动画后期 - 透明背景应该可见...')
  }, 2500)
  
  // 3.5秒后重置动画状态
  setTimeout(() => {
    console.log('✨ 抠图动画完成!')
    console.log('🔍 最终状态：应该显示透明背景的抠图结果')
    isMattingAnimating.value = false
  }, 3500)
}

// 页面挂载时检查登录状态
onMounted(() => {
  checkLoginStatus()
  
  // 监听storage变化，实时更新登录状态
  if (process.client) {
    window.addEventListener('storage', checkLoginStatus)
  }
})

// 组件卸载时清理监听器
onUnmounted(() => {
  if (process.client) {
    window.removeEventListener('storage', checkLoginStatus)
  }
})

// 页面元信息
useHead({
  title: 'CUZCUZAI - 创造多元素材',
  meta: [
    { name: 'description', content: '用CUZCUZAI创造多元素材，Less Design, More Creation.' },
    { name: 'keywords', content: 'AI, 设计, 创意, 素材生成' }
  ]
})
</script>

<style scoped>
/* 添加渐变动画效果 */
@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.gradient-animate {
  background-size: 200% 200%;
  animation: gradientAnimation 5s ease infinite;
}

/* 高科技感脉冲动画 */
@keyframes techPulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.05);
  }
}

/* Logo悬停效果 */
.logo-hover:hover .logo-pulse {
  animation: techPulse 1.5s ease-in-out infinite;
}

/* 渐变文字动画 */
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.text-gradient-animate {
  background-size: 200% 200%;
  animation: gradientShift 3s ease infinite;
}

/* 科技感粒子背景动画 */
@keyframes particleFloat {
  0%, 100% {
    transform: translateY(0px) translateX(0px);
    opacity: 0.7;
  }
  25% {
    transform: translateY(-20px) translateX(10px);
    opacity: 1;
  }
  50% {
    transform: translateY(-10px) translateX(-5px);
    opacity: 0.8;
  }
  75% {
    transform: translateY(-30px) translateX(15px);
    opacity: 0.9;
  }
}

/* 扫描线动画 */
@keyframes scanLine {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100vw);
  }
}

.scan-line {
  position: absolute;
  top: 0;
  left: 0;
  width: 1px;
  height: 100%;
  background: linear-gradient(to bottom, transparent, #00ffff, transparent);
  animation: scanLine 8s linear infinite;
}

/* 数据流动画 */
@keyframes dataFlow {
  0% {
    transform: translateY(100vh);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100vh);
    opacity: 0;
  }
}

.data-stream {
  position: absolute;
  width: 2px;
  height: 50px;
  background: linear-gradient(to bottom, transparent, #00ffff, transparent);
  animation: dataFlow 5s linear infinite;
}

/* 全息效果 */
@keyframes hologram {
  0%, 100% {
    opacity: 0.8;
    filter: hue-rotate(0deg);
  }
  25% {
    opacity: 1;
    filter: hue-rotate(90deg);
  }
  50% {
    opacity: 0.9;
    filter: hue-rotate(180deg);
  }
  75% {
    opacity: 1;
    filter: hue-rotate(270deg);
  }
}

.hologram-effect {
  animation: hologram 4s ease-in-out infinite;
}

/* 电路板纹理效果 */
.circuit-bg {
  background-image: 
    radial-gradient(circle at 25% 25%, #00ffff22 2px, transparent 2px),
    radial-gradient(circle at 75% 75%, #0099ff22 2px, transparent 2px);
  background-size: 50px 50px;
}

/* 悬浮卡片效果 */
.hover-card {
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 255, 255, 0.1);
}

.hover-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 255, 255, 0.1);
  border-color: rgba(0, 255, 255, 0.3);
}

/* 霓虹灯效果 */
.neon-text {
  text-shadow: 
    0 0 5px currentColor,
    0 0 10px currentColor,
    0 0 20px currentColor,
    0 0 40px currentColor;
}

/* 脉冲边框动画 */
@keyframes pulseBorder {
  0%, 100% {
    border-color: rgba(0, 255, 255, 0.3);
    box-shadow: 0 0 0 0 rgba(0, 255, 255, 0.4);
  }
  50% {
    border-color: rgba(0, 255, 255, 0.8);
    box-shadow: 0 0 0 10px rgba(0, 255, 255, 0);
  }
}

.pulse-border {
  animation: pulseBorder 2s infinite;
}

/* 矩阵雨效果 */
@keyframes matrix {
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  5% {
    opacity: 1;
  }
  95% {
    opacity: 1;
  }
  100% {
    transform: translateY(100vh);
    opacity: 0;
  }
}

.matrix-char {
  position: absolute;
  color: #06b6d4;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  animation: matrix 3s linear infinite;
}

/* 加载指示器 */
@keyframes loading {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading-spinner {
  border: 2px solid rgba(0, 255, 255, 0.1);
  border-top: 2px solid #00ffff;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: loading 1s linear infinite;
}

/* 网格背景图案 */
.grid-pattern {
  background-image: 
    linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
  animation: gridShift 10s linear infinite;
}

@keyframes gridShift {
  0% { transform: translate(0, 0); }
  100% { transform: translate(20px, 20px); }
}

/* 浮动粒子增强 */
.floating-particle {
  animation: particleFloat 4s ease-in-out infinite;
}

.floating-particle:nth-child(2) {
  animation-delay: 1.5s;
  animation-duration: 3.5s;
}

.floating-particle:nth-child(3) {
  animation-delay: 2.5s;
  animation-duration: 4.5s;
}

/* 数据流动画 */
.data-flow {
  animation: dataStreamEnhanced 3s ease-in-out infinite;
}

@keyframes dataStreamEnhanced {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateX(200%);
    opacity: 0;
  }
}

/* 图片悬浮效果增强 */
.group:hover .group-hover\:scale-105 {
  filter: brightness(1.1) contrast(1.1);
}

/* 科技边框发光效果 */
.border-cyan-400\/30 {
  box-shadow: 0 0 10px rgba(6, 182, 212, 0.3);
}

.border-purple-400\/30 {
  box-shadow: 0 0 10px rgba(147, 51, 234, 0.3);
}

.border-blue-400\/30 {
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.3);
}

.border-pink-400\/30 {
  box-shadow: 0 0 10px rgba(244, 114, 182, 0.3);
}

/* 轨道点脉冲增强 */
.animate-pulse {
  animation: pulseEnhanced 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulseEnhanced {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(1.2);
  }
}

/* 旋转环动画优化 */
.animate-spin {
  filter: drop-shadow(0 0 5px currentColor);
}

/* 风车布局动画 */
.windmill-container {
  animation: windmillRotate 20s linear infinite;
}

@keyframes windmillRotate {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

/* 风车叶片 */
.windmill-blade {
  transition: all 0.3s ease;
}

.windmill-blade:hover {
  z-index: 40;
}

/* 风车卡片反向旋转保持正向 */
.windmill-card {
  animation: counterRotate 20s linear infinite;
}

@keyframes counterRotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}

/* 风车叶片悬停效果 */
.windmill-blade .group:hover .windmill-card {
  animation-play-state: paused;
  transform: rotate(0deg) scale(1.1);
}

/* 风车连接线脉冲优化 */
.windmill-container svg line {
  filter: drop-shadow(0 0 3px currentColor);
}

/* 响应式风车布局 */
@media (max-width: 768px) {
  .windmill-container {
    animation: windmillRotate 30s linear infinite;
  }
  
  .windmill-blade {
    transform-origin: 50% 120px !important;
  }
  
  .windmill-blade .group {
    width: 80px;
    height: 60px;
  }
}

/* 简洁工作流流光效果 */
@keyframes workflowSimpleFlow {
  0% {
    transform: translateX(-150px);
    opacity: 0;
  }
  3% {
    opacity: 1;
  }
  85% {
    opacity: 1;
  }
  92% {
    opacity: 0.6;
  }
  97% {
    opacity: 0.2;
  }
  100% {
    transform: translateX(calc(100vw - 100px));
    opacity: 0;
  }
}

.workflow-simple-flow {
  animation: workflowSimpleFlow 8s linear infinite;
  width: 120px;
  position: absolute;
  left: 0;
  top: 0;
}

/* 极光效果 */
.aurora {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  background: linear-gradient(45deg, transparent, rgba(6, 182, 212, 0.2), transparent);
  animation: auroraMove 15s ease-in-out infinite;
  filter: blur(3px);
}

.aurora-1 {
  animation-delay: 0s;
  background: linear-gradient(45deg, transparent, rgba(6, 182, 212, 0.3), rgba(59, 130, 246, 0.2), transparent);
}

.aurora-2 {
  animation-delay: 5s;
  background: linear-gradient(135deg, transparent, rgba(139, 92, 246, 0.2), rgba(236, 72, 153, 0.2), transparent);
}

.aurora-3 {
  animation-delay: 10s;
  background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.15), transparent);
}

@keyframes auroraMove {
  0%, 100% {
    transform: translateX(-100%) skewX(-10deg);
    opacity: 0;
  }
  50% {
    transform: translateX(100%) skewX(10deg);
    opacity: 1;
  }
}

/* 流星效果 */
.shooting-stars {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.shooting-star {
  position: absolute;
  width: 2px;
  height: 2px;
  background: linear-gradient(45deg, #00f5ff, transparent);
  border-radius: 50%;
  box-shadow: 0 0 6px #00f5ff;
  animation: shootingStar 3s linear infinite;
}

.shooting-star::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 300px;
  height: 1px;
  background: linear-gradient(to left, #00f5ff, transparent);
  transform: rotate(45deg);
  transform-origin: right;
}

.shooting-star-1 {
  top: 20%;
  right: 100%;
  animation-delay: 0s;
}

.shooting-star-2 {
  top: 60%;
  right: 100%;
  animation-delay: 1s;
}

.shooting-star-3 {
  top: 40%;
  right: 100%;
  animation-delay: 2s;
}

@keyframes shootingStar {
  0% {
    transform: translateX(0) translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateX(-2000px) translateY(1000px);
    opacity: 0;
  }
}

/* 科技网格背景 */
.tech-grid-bg {
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: techGridMove 20s linear infinite;
}

@keyframes techGridMove {
  0% { transform: translate(0, 0); }
  100% { transform: translate(50px, 50px); }
}

/* 浮动数据点 */
.floating-data-points {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.data-point {
  position: absolute;
  width: 4px;
  height: 4px;
  background: #00f5ff;
  border-radius: 50%;
  box-shadow: 0 0 10px #00f5ff;
  animation: dataFloat 8s ease-in-out infinite;
}

.data-point-1 {
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.data-point-2 {
  top: 30%;
  left: 80%;
  animation-delay: 1.5s;
}

.data-point-3 {
  top: 70%;
  left: 20%;
  animation-delay: 3s;
}

.data-point-4 {
  top: 50%;
  left: 60%;
  animation-delay: 4.5s;
}

.data-point-5 {
  top: 80%;
  left: 90%;
  animation-delay: 6s;
}

@keyframes dataFloat {
  0%, 100% {
    transform: translateY(0) scale(1);
    opacity: 0.7;
  }
  50% {
    transform: translateY(-30px) scale(1.2);
    opacity: 1;
  }
}

/* 能量波纹效果 */
.energy-wave {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 200px;
  height: 200px;
  border: 2px solid rgba(6, 182, 212, 0.2);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: energyWave 6s ease-out infinite;
}

.energy-wave-1 {
  animation-delay: 0s;
}

.energy-wave-2 {
  animation-delay: 2s;
  border-color: rgba(139, 92, 246, 0.2);
}

.energy-wave-3 {
  animation-delay: 4s;
  border-color: rgba(236, 72, 153, 0.2);
}

@keyframes energyWave {
  0% {
    transform: translate(-50%, -50%) scale(0.1);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(3);
    opacity: 0;
  }
}

/* 漂浮粒子群 */
.particle-swarm {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.particle {
  position: absolute;
  width: 3px;
  height: 3px;
  background: radial-gradient(circle, #00f5ff, transparent);
  border-radius: 50%;
  animation: particleSwarm 12s linear infinite;
}

.particle-1 {
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.particle-2 {
  top: 40%;
  left: 30%;
  animation-delay: 2s;
}

.particle-3 {
  top: 60%;
  left: 50%;
  animation-delay: 4s;
}

.particle-4 {
  top: 80%;
  left: 70%;
  animation-delay: 6s;
}

.particle-5 {
  top: 30%;
  left: 80%;
  animation-delay: 8s;
}

.particle-6 {
  top: 70%;
  left: 20%;
  animation-delay: 10s;
}

@keyframes particleSwarm {
  0%, 100% {
    transform: translateX(0) translateY(0) scale(1);
    opacity: 0.8;
  }
  25% {
    transform: translateX(100px) translateY(-50px) scale(1.2);
    opacity: 1;
  }
  50% {
    transform: translateX(-50px) translateY(-100px) scale(0.8);
    opacity: 0.6;
  }
  75% {
    transform: translateX(-100px) translateY(50px) scale(1.1);
    opacity: 0.9;
  }
}

/* 科技流动线条 */
.tech-flow-line {
  stroke-dasharray: 10 5;
  animation: techFlow 8s ease-in-out infinite;
}

@keyframes techFlow {
  0%, 100% {
    stroke-dashoffset: 0;
    opacity: 0.3;
  }
  50% {
    stroke-dashoffset: 100;
    opacity: 0.8;
  }
}

/* 数字雨效果 */
.digital-rain {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.rain-drop {
  position: absolute;
  width: 2px;
  height: 20px;
  background: linear-gradient(to bottom, transparent, #06b6d4, transparent);
  animation: digitalRain 4s linear infinite;
}

.rain-drop-1 {
  left: 10%;
  animation-delay: 0s;
}

.rain-drop-2 {
  left: 30%;
  animation-delay: 0.8s;
}

.rain-drop-3 {
  left: 50%;
  animation-delay: 1.6s;
}

.rain-drop-4 {
  left: 70%;
  animation-delay: 2.4s;
}

.rain-drop-5 {
  left: 90%;
  animation-delay: 3.2s;
}

@keyframes digitalRain {
  0% {
    transform: translateY(-100px);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(calc(100vh + 100px));
    opacity: 0;
  }
}

/* 电路板背景 */
.circuit-board-bg {
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px),
    linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
    radial-gradient(circle at 20% 20%, rgba(6, 182, 212, 0.2) 2px, transparent 2px),
    radial-gradient(circle at 80% 80%, rgba(6, 182, 212, 0.2) 2px, transparent 2px);
  background-size: 30px 30px, 30px 30px, 60px 60px, 60px 60px;
  animation: circuitPulse 8s ease-in-out infinite;
}

@keyframes circuitPulse {
  0%, 100% {
    opacity: 0.5;
  }
  50% {
    opacity: 0.8;
  }
}

/* 浮动代码片段 */
.floating-code-snippets {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.code-snippet {
  position: absolute;
  color: #06b6d4;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  font-weight: bold;
  text-shadow: 0 0 10px #06b6d4;
  animation: codeFloat 10s ease-in-out infinite;
}

.code-snippet-1 {
  top: 20%;
  left: 15%;
  animation-delay: 0s;
}

.code-snippet-2 {
  top: 60%;
  left: 80%;
  animation-delay: 2.5s;
}

.code-snippet-3 {
  top: 80%;
  left: 20%;
  animation-delay: 5s;
}



@keyframes codeFloat {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.7;
  }
  25% {
    transform: translateY(-20px) rotate(5deg);
    opacity: 1;
  }
  50% {
    transform: translateY(-10px) rotate(-3deg);
    opacity: 0.8;
  }
  75% {
    transform: translateY(-30px) rotate(2deg);
    opacity: 0.9;
  }
}

/* 光束扫描效果 */
.scanning-beams {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.scan-beam {
  position: absolute;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, transparent, rgba(0, 245, 255, 0.8), transparent);
  animation: scanBeam 6s ease-in-out infinite;
}

.scan-beam-1 {
  top: 20%;
  animation-delay: 0s;
}

.scan-beam-2 {
  top: 50%;
  animation-delay: 2s;
  background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.8), transparent);
}

.scan-beam-3 {
  top: 80%;
  animation-delay: 4s;
  background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.8), transparent);
}

@keyframes scanBeam {
  0%, 100% {
    transform: translateX(-100%);
    opacity: 0;
  }
  50% {
    transform: translateX(100%);
    opacity: 1;
  }
}

/* 星空背景 */
.starfield {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.star {
  position: absolute;
  width: 2px;
  height: 2px;
  background: #ffffff;
  border-radius: 50%;
  animation: starTwinkle 4s ease-in-out infinite;
}

.star-1 { top: 10%; left: 20%; animation-delay: 0s; }
.star-2 { top: 25%; left: 60%; animation-delay: 0.5s; }
.star-3 { top: 40%; left: 30%; animation-delay: 1s; }
.star-4 { top: 60%; left: 80%; animation-delay: 1.5s; }
.star-5 { top: 75%; left: 15%; animation-delay: 2s; }
.star-6 { top: 90%; left: 70%; animation-delay: 2.5s; }
.star-7 { top: 15%; left: 85%; animation-delay: 3s; }
.star-8 { top: 55%; left: 45%; animation-delay: 3.5s; }

@keyframes starTwinkle {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.5);
  }
}

/* 全息网格 */
.holographic-grid {
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(0, 245, 255, 0.2) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 245, 255, 0.2) 1px, transparent 1px);
  background-size: 40px 40px;
  animation: hologramShift 15s linear infinite;
}

@keyframes hologramShift {
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
  100% {
    transform: translate(40px, 40px) rotate(360deg);
  }
}

/* 量子粒子效果 */
.quantum-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.quantum-dot {
  position: absolute;
  width: 4px;
  height: 4px;
  background: radial-gradient(circle, #00f5ff, transparent);
  border-radius: 50%;
  animation: quantumFloat 8s ease-in-out infinite;
}

.quantum-dot-1 {
  top: 20%;
  left: 20%;
  animation-delay: 0s;
}

.quantum-dot-2 {
  top: 40%;
  left: 60%;
  animation-delay: 1.6s;
}

.quantum-dot-3 {
  top: 70%;
  left: 30%;
  animation-delay: 3.2s;
}

.quantum-dot-4 {
  top: 60%;
  left: 80%;
  animation-delay: 4.8s;
}

.quantum-dot-5 {
  top: 30%;
  left: 70%;
  animation-delay: 6.4s;
}

@keyframes quantumFloat {
  0%, 100% {
    transform: translateX(0) translateY(0) scale(1);
    opacity: 0.6;
  }
  25% {
    transform: translateX(20px) translateY(-15px) scale(1.2);
    opacity: 1;
  }
  50% {
    transform: translateX(-10px) translateY(-25px) scale(0.8);
    opacity: 0.8;
  }
  75% {
    transform: translateX(-20px) translateY(10px) scale(1.1);
    opacity: 0.9;
  }
}

/* 数据流线效果 */
.data-streams {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.data-stream {
  position: absolute;
  width: 100px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #00f5ff, transparent);
  animation: dataStream 5s ease-in-out infinite;
}

.stream-1 {
  top: 25%;
  left: 0;
  animation-delay: 0s;
}

.stream-2 {
  top: 50%;
  right: 0;
  animation-delay: 1.67s;
  animation-direction: reverse;
}

.stream-3 {
  top: 75%;
  left: 0;
  animation-delay: 3.33s;
}

@keyframes dataStream {
  0%, 100% {
    transform: translateX(-100px);
    opacity: 0;
  }
  50% {
    transform: translateX(calc(100vw + 100px));
    opacity: 1;
  }
}

/* 脉冲波纹 */
.pulse-waves {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.pulse-wave {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100px;
  height: 100px;
  border: 2px solid rgba(0, 245, 255, 0.3);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: pulseWave 4s ease-out infinite;
}

.pulse-wave-1 {
  animation-delay: 0s;
}

.pulse-wave-2 {
  animation-delay: 1.33s;
  border-color: rgba(59, 130, 246, 0.3);
}

.pulse-wave-3 {
  animation-delay: 2.67s;
  border-color: rgba(139, 92, 246, 0.3);
}

@keyframes pulseWave {
  0% {
    transform: translate(-50%, -50%) scale(0.1);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(4);
    opacity: 0;
  }
}

/* 闪烁星点 */
.twinkling-stars {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.twinkle {
  position: absolute;
  width: 3px;
  height: 3px;
  background: #ffffff;
  border-radius: 50%;
  box-shadow: 0 0 6px #ffffff;
  animation: twinkleAnimation 3s ease-in-out infinite;
}

.twinkle-1 { top: 15%; left: 25%; animation-delay: 0s; }
.twinkle-2 { top: 35%; left: 70%; animation-delay: 0.5s; }
.twinkle-3 { top: 55%; left: 20%; animation-delay: 1s; }
.twinkle-4 { top: 75%; left: 60%; animation-delay: 1.5s; }
.twinkle-5 { top: 25%; left: 80%; animation-delay: 2s; }
.twinkle-6 { top: 65%; left: 40%; animation-delay: 2.5s; }

@keyframes twinkleAnimation {
  0%, 100% {
    opacity: 0.4;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.3);
  }
}

/* 抠图动画效果 - 纯净的PNG透明背景 */
.matting-background {
  z-index: 1;
  /* PNG风格的透明背景棋盘格 - 经典白色和浅灰色 */
  background-color: #ffffff;
  background-image: 
    linear-gradient(45deg, #e5e5e5 25%, transparent 25%), 
    linear-gradient(-45deg, #e5e5e5 25%, transparent 25%), 
    linear-gradient(45deg, transparent 75%, #e5e5e5 75%), 
    linear-gradient(-45deg, transparent 75%, #e5e5e5 75%);
  background-size: 12px 12px;
  background-position: 0 0, 0 6px, 6px -6px, -6px 0px;
  border-radius: 8px;
}

.matting-result {
  z-index: 2;
}

.matting-overlay {
  z-index: 3;
  transform: translateX(0);
  transition: transform 0.3s ease;
}

.matting-overlay.animate-sweep-away {
  animation: mattingClipAway 3.5s ease-in-out forwards;
}

.matting-beam {
  z-index: 4;
  background: linear-gradient(90deg, 
    transparent 0%, 
    transparent 45%, 
    rgba(0, 245, 255, 0.9) 48%, 
    rgba(255, 255, 255, 0.8) 50%, 
    rgba(0, 245, 255, 0.9) 52%, 
    transparent 55%, 
    transparent 100%
  );
  width: 8px;
  transform: translateX(-100%);
  pointer-events: none;
  opacity: 0;
  box-shadow: 0 0 20px rgba(0, 245, 255, 0.5);
}

.matting-beam.animate-beam {
  animation: beamSweep 3.5s ease-in-out forwards;
  opacity: 1;
}

/* 使用clip-path从左到右移除背景 */
@keyframes mattingClipAway {
  0% {
    clip-path: inset(0 0 0 0);
  }
  10% {
    clip-path: inset(0 0 0 5%);
  }
  90% {
    clip-path: inset(0 0 0 95%);
  }
  100% {
    clip-path: inset(0 0 0 100%);
  }
}

@keyframes beamSweep {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  95% {
    transform: translateX(100%);
    opacity: 0.5;
  }
  100% {
    transform: translateX(120%);
    opacity: 0;
  }
}

/* 进度条动画 */
@keyframes progress {
  0% {
    width: 0%;
  }
  20% {
    width: 30%;
  }
  80% {
    width: 90%;
  }
  100% {
    width: 100%;
  }
}

.animate-progress {
  animation: progress 3s ease-in-out forwards;
}

/* 抠图展示区增强效果 */
.group:hover .matting-original img {
  transform: scale(1.02);
  transition: transform 0.3s ease;
}

/* 抠图结果增强显示 */
.matting-result > div > div {
  transition: all 0.3s ease;
}

/* 抠图后的图片效果 - 直接使用已抠图的图片 */
.matting-cutout-image {
  /* 不需要复杂的mask，直接显示已经抠好图的图片 */
  filter: drop-shadow(0 0 25px rgba(6, 182, 212, 0.5));
  /* 保持图片质量和透明背景 */
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
}

/* 增强透明背景显示效果 */
.matting-result {
  /* 确保透明背景可见 */
  background: transparent;
}

/* 简化的抠图效果 - 无蓝色发光 */
.matting-glow {
  transform: scale(1.02);
  transition: all 0.3s ease;
}

/* 移除蓝色光圈提示效果 */

/* Banner区域简化样式 - 移除复杂动画效果 */
</style>