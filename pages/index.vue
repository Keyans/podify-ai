<template>
  <div class="min-h-screen bg-black text-white">
    <!-- 顶部导航栏 -->
    <nav class="flex justify-between items-center px-8 py-4">
      <div class="flex items-center space-x-2">
        <img src="/favicon.png" alt="CUZCUZAI" class="w-8 h-8" />
        <span class="text-xl font-bold">CUZCUZAI</span>
      </div>
      
      <div class="hidden md:flex space-x-8">
        <a href="#" class="hover:text-blue-400 transition-colors">产品商城</a>
        <a href="#" class="hover:text-blue-400 transition-colors">工作台</a>
        <a href="#" class="hover:text-blue-400 transition-colors">AI工具箱</a>
        <a href="#" class="hover:text-blue-400 transition-colors">案例库</a>
        <a href="#" class="hover:text-blue-400 transition-colors">合作中心</a>
        <a href="#" class="hover:text-blue-400 transition-colors">关于我们</a>
      </div>
      
      <div class="flex items-center">
        <NuxtLink to="/login" class="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2 rounded-md text-sm transition-colors">
          进入工作台
        </NuxtLink>
      </div>
    </nav>

    <!-- 主要英雄区域 -->
    <section class="relative px-8 py-20 md:py-32 overflow-hidden">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col md:flex-row items-center justify-between">
          <!-- 左侧文本内容 -->
          <div class="md:w-1/2 mb-10 md:mb-0">
            <h1 class="text-5xl md:text-6xl font-bold mb-20 leading-tight">
              <span class="block mb-20">CUZ CUZ AI</span>
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                创造多元素材
              </span>
            </h1>
            <p class="text-xl text-gray-300 mb-20">Less Design, More Creation.</p>
            <button class="bg-gradient-to-r from-blue-600 to-blue-400 text-white font-medium py-3 px-8 rounded-md text-lg transition-all transform hover:scale-105">
              <span class="flex items-center">
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
                </svg>
                开始创作
              </span>
            </button>
          </div>

          <!-- 右侧图像展示区 -->
          <div class="md:w-1/2 relative">
            <div class="grid grid-cols-2 gap-3">
              <!-- 中心圆形Logo -->
              <div class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-28 h-28 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 flex items-center justify-center p-1">
                <div class="w-full h-full rounded-full bg-black flex items-center justify-center">
                  <svg class="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                  </svg>
                </div>
              </div>
              
              <!-- 图片1：高端时尚服装设计 -->
              <div class="relative rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-500">
                <img src="https://ix-marketing.imgix.net/case-study_tile_rew.png?auto=format,compress&w=2618" alt="高端时尚设计" class="w-full h-full object-cover" />
              </div>
              
              <!-- 图片2：未来科技风格 -->
              <div class="relative rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-500 mt-12">
                <img src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=600&auto=format&fit=crop" alt="未来科技风" class="w-full h-full object-cover" />
              </div>
              
              <!-- 图片3：奢华产品展示 -->
              <div class="relative rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-500">
                <img src="https://images.unsplash.com/photo-1563291074-2bf8677ac0e5?q=80&w=600&auto=format&fit=crop" alt="奢华产品" class="w-full h-full object-cover" />
              </div>
              
              <!-- 图片4：建筑与空间设计 -->
              <div class="relative rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-500 mt-12">
                <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=600&auto=format&fit=crop" alt="建筑设计" class="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 特色标语区域 -->
    <section class="py-24 bg-gradient-to-b from-black to-gray-900">
      <div class="max-w-5xl mx-auto text-center px-8">
        <h2 class="text-4xl md:text-5xl font-bold mb-4">CUZCUZAI，更懂创意的AI</h2>
        <p class="text-xl text-gray-300">少做重复设计，多样创作时间</p>
      </div>
    </section>

    <!-- 功能特点区域 -->
    <section class="py-20 bg-gray-900">
      <div class="max-w-7xl mx-auto px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- 特点卡片1 -->
          <div class="bg-gray-800 bg-opacity-50 rounded-xl p-8 border border-gray-700 hover:border-gray-600 transition-all duration-300">
            <div class="relative mb-6">
              <img src="https://assets.imgix.net/docs/pictureelement.pdf?ixlib=react-9.10.0&auto=format%2Ccompress&w=2619" alt="AI智能生成" class="w-16 h-16 object-cover rounded-lg" />
            </div>
            <h3 class="text-2xl font-bold text-blue-400 mb-4">一键生成素材</h3>
            <p class="text-gray-400 leading-relaxed text-sm">多种素材生成方式，智能编辑工具加持，轻松生成创意素材</p>
          </div>
          
          <!-- 特点卡片2 -->
          <div class="bg-gray-800 bg-opacity-50 rounded-xl p-8 border border-gray-700 hover:border-gray-600 transition-all duration-300">
            <div class="relative mb-6">
              <img src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=150&auto=format&fit=crop" alt="高清图像处理" class="w-16 h-16 object-cover rounded-lg" />
            </div>
            <h3 class="text-2xl font-bold text-blue-400 mb-4">逼真精准细化</h3>
            <p class="text-gray-400 leading-relaxed text-sm">多种生成方式，加强图像的清晰度文字准确，格式优化，突破极限</p>
          </div>
          
          <!-- 特点卡片3 -->
          <div class="bg-gray-800 bg-opacity-50 rounded-xl p-8 border border-gray-700 hover:border-gray-600 transition-all duration-300">
            <div class="relative mb-6">
              <img src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=150&auto=format&fit=crop" alt="简易操作" class="w-16 h-16 object-cover rounded-lg" />
            </div>
            <h3 class="text-2xl font-bold text-blue-400 mb-4">不用学就会用</h3>
            <p class="text-gray-400 leading-relaxed text-sm">中文语境交互，无需环境配置，详细教程在线管理支持导出文件</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 设计场景区域 -->
    <section class="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div class="max-w-7xl mx-auto px-8">
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
        
        <!-- 场景展示 -->
        <div class="relative p-6 bg-blue-100/5 rounded-2xl overflow-hidden">
          <div class="relative z-10 flex flex-col md:flex-row gap-8">
            <div class="md:w-1/3">
              <h3 class="text-3xl font-bold mb-4">AI模特</h3>
              <p class="text-gray-400 mb-6">服装上身更直观，营销转化更高效</p>
              <button class="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors">
                <span>马上试用</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </button>
            </div>
            <div class="md:w-2/3 grid grid-cols-3 gap-4">
              <img src="https://images.unsplash.com/photo-1603217192634-61068e4d4bf9?q=80&w=300&auto=format&fit=crop" alt="时尚模特" class="rounded-lg w-full h-auto" />
              <img src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=300&auto=format&fit=crop" alt="服装展示" class="rounded-lg w-full h-auto" />
              <div class="grid grid-rows-2 gap-4">
                <img src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=300&auto=format&fit=crop" alt="产品展示1" class="rounded-lg w-full h-auto" />
                <img src="https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=300&auto=format&fit=crop" alt="产品展示2" class="rounded-lg w-full h-auto" />
              </div>
            </div>
          </div>
        </div>
        
        <!-- 通用设计工作流 -->
        <div class="mt-16 text-center">
          <div class="inline-block border-b border-blue-400 pb-1 px-8 mb-4">
            <h3 class="text-xl font-medium">通用设计工作流</h3>
          </div>
          <div class="flex justify-center mt-4">
            <button class="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-3 rounded-md font-medium hover:from-blue-600 hover:to-cyan-600 transition-all duration-300">
              马上进入
            </button>
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
                  <button class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-full text-sm transition-colors">
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
    <section class="py-20 bg-gradient-to-b from-black to-gray-900">
      <div class="max-w-7xl mx-auto px-8">
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
              <p class="text-gray-400 text-sm mb-6">AI自动识别主体，秒级移除背景</p>
              <div class="h-72 flex items-center justify-center bg-gray-900/50 rounded-lg overflow-hidden">
                <img src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=600&auto=format&fit=crop" alt="高端抠图效果" class="w-full h-full object-cover" />
              </div>
              <div class="mt-4 text-center">
                <button class="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-6 py-2 rounded-md text-sm hover:from-blue-700 hover:to-blue-500 transition-colors">
                  开始创作
                </button>
              </div>
            </div>
          </div>
          
          <div class="md:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-gray-800/30 rounded-xl p-6">
              <h4 class="text-lg font-medium mb-4">创意太难...?</h4>
              <p class="text-gray-400 text-sm mb-4">设计灵感枯竭，无从下手</p>
              <img src="https://images.unsplash.com/photo-1505238680356-667803448bb6?q=80&w=200&auto=format&fit=crop" alt="创意困境" class="w-16 h-16 object-cover rounded-lg" />
            </div>
            
            <div class="bg-gray-800/30 rounded-xl p-6">
              <h4 class="text-lg font-medium mb-4">沟通太难...?</h4>
              <p class="text-gray-400 text-sm mb-4">需求模糊不清，沟通效率低</p>
              <img src="https://images.unsplash.com/photo-1558403194-611308249627?q=80&w=200&auto=format&fit=crop" alt="沟通问题" class="w-16 h-16 object-cover rounded-lg" />
            </div>
            
            <div class="bg-gray-800/30 rounded-xl p-6">
              <h4 class="text-lg font-medium mb-4">AI好复杂...?</h4>
              <p class="text-gray-400 text-sm mb-4">安装程序复杂，英文界面看不懂</p>
              <img src="https://images.unsplash.com/photo-1535378620166-273708d44e4c?q=80&w=200&auto=format&fit=crop" alt="复杂AI" class="w-16 h-16 object-cover rounded-lg" />
            </div>
            
            <div class="bg-gray-800/30 rounded-xl p-6">
              <h4 class="text-lg font-medium mb-4">不用学就会</h4>
              <p class="text-gray-400 text-sm mb-4">中文即可交互，详细教程</p>
              <img src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=200&auto=format&fit=crop" alt="简单操作" class="w-16 h-16 object-cover rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 风格画廊 -->
    <section class="py-20 bg-black">
      <div class="max-w-7xl mx-auto px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold mb-4">甄选风格呈现</h2>
          <div class="inline-block border-b border-blue-400 pb-1 px-8 mt-4">
            <p class="text-sm">马上进入</p>
          </div>
        </div>
        
        <!-- 风格图片网格 -->
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          <div class="aspect-square overflow-hidden rounded-lg">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop" alt="人像风格" class="w-full h-full object-cover transition-transform hover:scale-110 duration-300" />
          </div>
          <div class="aspect-square overflow-hidden rounded-lg">
            <img src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=300&auto=format&fit=crop" alt="抽象风格" class="w-full h-full object-cover transition-transform hover:scale-110 duration-300" />
          </div>
          <div class="aspect-square overflow-hidden rounded-lg">
            <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=300&auto=format&fit=crop" alt="插画风格" class="w-full h-full object-cover transition-transform hover:scale-110 duration-300" />
          </div>
          <div class="aspect-square overflow-hidden rounded-lg">
            <img src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=300&auto=format&fit=crop" alt="科技风格" class="w-full h-full object-cover transition-transform hover:scale-110 duration-300" />
          </div>
          <div class="aspect-square overflow-hidden rounded-lg">
            <img src="https://images.unsplash.com/photo-1549888834-3ec93abae044?q=80&w=300&auto=format&fit=crop" alt="建筑风格" class="w-full h-full object-cover transition-transform hover:scale-110 duration-300" />
          </div>
          <div class="aspect-square overflow-hidden rounded-lg">
            <img src="https://images.unsplash.com/photo-1551034549-befb91b260e0?q=80&w=300&auto=format&fit=crop" alt="自然风格" class="w-full h-full object-cover transition-transform hover:scale-110 duration-300" />
          </div>
          <div class="aspect-square overflow-hidden rounded-lg">
            <img src="https://images.unsplash.com/photo-1560393464-5c69a73c5770?q=80&w=300&auto=format&fit=crop" alt="产品风格" class="w-full h-full object-cover transition-transform hover:scale-110 duration-300" />
          </div>
          <div class="aspect-square overflow-hidden rounded-lg">
            <img src="https://ix-marketing.imgix.net/case-study_playsports.png?auto=format,compress&w=2618" alt="复古风格" class="w-full h-full object-cover transition-transform hover:scale-110 duration-300" />
          </div>
          <div class="aspect-square overflow-hidden rounded-lg">
            <img src="https://images.unsplash.com/photo-1626544827763-d516dce335e2?q=80&w=300&auto=format&fit=crop" alt="3D风格" class="w-full h-full object-cover transition-transform hover:scale-110 duration-300" />
          </div>
          <div class="aspect-square overflow-hidden rounded-lg">
            <img src="https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=300&auto=format&fit=crop" alt="极简风格" class="w-full h-full object-cover transition-transform hover:scale-110 duration-300" />
          </div>
          <div class="aspect-square overflow-hidden rounded-lg">
            <img src="https://ix-marketing.imgix.net/case-study_tile_zadig.png?auto=format,compress&w=2618" alt="超现实风格" class="w-full h-full object-cover transition-transform hover:scale-110 duration-300" />
          </div>
          <div class="aspect-square overflow-hidden rounded-lg">
            <img src="https://ix-marketing.imgix.net/case-study_exposure2.png?auto=format,compress&w=2618" alt="未来风格" class="w-full h-full object-cover transition-transform hover:scale-110 duration-300" />
          </div>
        </div>
      </div>
    </section>

    <!-- 底部 -->
    <footer class="py-16 bg-gradient-to-b from-gray-900 to-black">
      <div class="max-w-7xl mx-auto px-8 flex flex-col items-center">
        <div class="flex items-center mb-8">
          <img src="/favicon.png" alt="CUZCUZAI" class="w-12 h-12 mr-4" />
          <div>
            <h3 class="text-2xl font-bold">CUZCUZAI</h3>
            <p class="text-gray-400 text-sm">更懂创意的AI</p>
          </div>
        </div>
        <p class="text-sm text-gray-500">Less Design More Creation</p>
        
        <div class="mt-12">
          <button class="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-8 py-3 rounded-md font-medium hover:from-blue-700 hover:to-blue-500 transition-colors">
            开始创作
          </button>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
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
</style>