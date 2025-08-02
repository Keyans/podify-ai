<template>
  <div 
    class="min-h-screen"
    :style="{
      backgroundColor: 'var(--bg-primary)',
      color: 'var(--text-primary)'
    }"
  >
    <!-- 顶部导航栏 -->
    <nav 
      class="border-b px-6 py-4"
      :style="{
        backgroundColor: 'var(--bg-secondary)',
        borderColor: 'var(--border-color)'
      }"
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <div class="flex items-center space-x-3 logo-hover">
            <!-- 统一的高科技感Logo -->
            <div class="relative w-8 h-8 logo-pulse">
              <div class="absolute inset-0 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 rounded-lg p-0.5">
                <div class="w-full h-full bg-black rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5"/>
                    <path d="M2 12l10 5 10-5"/>
                  </svg>
                </div>
              </div>
              <div class="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-cyan-400 rounded-full animate-pulse"></div>
            </div>
            <div class="flex flex-col">
              <span class="text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent text-gradient-animate">
                CUZCUZAI
              </span>
              <span class="text-xs text-cyan-400/60 -mt-1">AI Powered</span>
            </div>
          </div>
        </div>
        
        <div class="flex items-center space-x-4">
          <!-- 主题选择器组件 -->
          <div class="relative">
            <ThemeSelector />
          </div>
        </div>
      </div>
    </nav>

    <div class="flex h-[calc(100vh-73px)]">
      <!-- 左侧边栏 -->
      <aside 
        class="w-56 border-r flex flex-col"
        :style="{
          backgroundColor: 'var(--bg-secondary)',
          borderColor: 'var(--border-color)'
        }"
      >
        <!-- 主导航区域 -->
        <nav class="py-4 flex-1">
          <!-- 驾驶舱 -->
          <div class="mb-4">
            <ul class="space-y-1">
              <li>
                <a 
                  href="#" 
                  @click.prevent="openInTab('/dashboard', '驾驶舱')"
                  class="flex items-center space-x-3 px-4 py-2 text-sm transition-all duration-200 hover:bg-dark-input hover:text-dark-text hover:border-r-2 hover:border-cyan-400" 
                  :class="{ 'bg-cyan-400/10 text-cyan-400 border-r-4 border-cyan-400': currentActivePath === '/dashboard' }"
                  :style="{ color: currentActivePath === '/dashboard' ? '#22d3ee' : 'var(--text-secondary)' }"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
                  </svg>
                  <span>驾驶舱</span>
                </a>
              </li>
            </ul>
          </div>

          <!-- 我的应用 -->
          <div class="mb-4">
            <div 
              class="flex items-center justify-between px-4 py-2 cursor-pointer" 
              @click="toggleMyApps"
            >
              <div class="flex items-center space-x-3">
                <svg 
                  class="w-4 h-4" 
                  :style="{ color: 'var(--text-secondary)' }"
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"/>
                </svg>
                <span :style="{ color: 'var(--text-secondary)' }" class="text-sm">我的应用</span>
              </div>
              <svg 
                class="w-4 h-4 transition-transform duration-200" 
                :class="{ 'rotate-90': isMyAppsOpen }" 
                :style="{ color: 'var(--text-tertiary)' }"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
            <div v-show="isMyAppsOpen" class="ml-6 space-y-1">
              <a href="#" @click.prevent="openInTab('/dashboard/apps/collection', '商品采集')" class="flex items-center space-x-2 px-4 py-1.5 text-sm transition-all duration-200 hover:bg-dark-input hover:text-cyan-400" :class="{ 'bg-cyan-400/10 text-cyan-400': currentActivePath === '/dashboard/apps/collection' }">
                <div class="w-1.5 h-1.5 rounded-full" :class="currentActivePath === '/dashboard/apps/collection' ? 'bg-cyan-400' : 'bg-dark-text-tertiary'"></div>
                <span>商品采集</span>
              </a>
              <a href="#" @click.prevent="openInTab('/dashboard/apps/cropping', '智能裁图')" class="flex items-center space-x-2 text-dark-text-secondary px-4 py-1.5 text-sm hover:bg-dark-input hover:text-cyan-400 transition-all duration-200" :class="{ 'bg-cyan-400/10 text-cyan-400': currentActivePath === '/dashboard/apps/cropping' }">
                <div class="w-1.5 h-1.5 rounded-full" :class="currentActivePath === '/dashboard/apps/cropping' ? 'bg-cyan-400' : 'bg-dark-text-tertiary'"></div>
                <span>智能裁图</span>
              </a>
              <a href="#" @click.prevent="openInTab('/dashboard/apps/cutout', '一键抠图')" class="flex items-center space-x-2 text-dark-text-secondary px-4 py-1.5 text-sm hover:bg-dark-input hover:text-cyan-400 transition-all duration-200" :class="{ 'bg-cyan-400/10 text-cyan-400': currentActivePath === '/dashboard/apps/cutout' }">
                <div class="w-1.5 h-1.5 rounded-full" :class="currentActivePath === '/dashboard/apps/cutout' ? 'bg-cyan-400' : 'bg-dark-text-tertiary'"></div>
                <span>一键抠图</span>
              </a>
              <a href="#" @click.prevent="openInTab('/dashboard/apps/text-to-image', '文生图')" class="flex items-center space-x-2 text-dark-text-secondary px-4 py-1.5 text-sm hover:bg-dark-input hover:text-cyan-400 transition-all duration-200" :class="{ 'bg-cyan-400/10 text-cyan-400': currentActivePath === '/dashboard/apps/text-to-image' }">
                <div class="w-1.5 h-1.5 rounded-full" :class="currentActivePath === '/dashboard/apps/text-to-image' ? 'bg-cyan-400' : 'bg-dark-text-tertiary'"></div>
                <span>文生图</span>
              </a>
              <a href="#" @click.prevent="openInTab('/dashboard/apps/transform', '超级裂变')" class="flex items-center space-x-2 text-dark-text-secondary px-4 py-1.5 text-sm hover:bg-dark-input hover:text-cyan-400 transition-all duration-200" :class="{ 'bg-cyan-400/10 text-cyan-400': currentActivePath === '/dashboard/apps/transform' }">
                <div class="w-1.5 h-1.5 rounded-full" :class="currentActivePath === '/dashboard/apps/transform' ? 'bg-cyan-400' : 'bg-dark-text-tertiary'"></div>
                <span>超级裂变</span>
              </a>
              <a href="#" @click.prevent="openInTab('/dashboard/apps/detection', '侵权检测')" class="flex items-center space-x-2 text-dark-text-secondary px-4 py-1.5 text-sm hover:bg-dark-input hover:text-cyan-400 transition-all duration-200" :class="{ 'bg-cyan-400/10 text-cyan-400': currentActivePath === '/dashboard/apps/detection' }">
                <div class="w-1.5 h-1.5 rounded-full" :class="currentActivePath === '/dashboard/apps/detection' ? 'bg-cyan-400' : 'bg-dark-text-tertiary'"></div>
                <span>侵权检测</span>
              </a>
              <a href="#" @click.prevent="openInTab('/dashboard/apps/pod-synthesis', 'POD合成')" class="flex items-center space-x-2 text-dark-text-secondary px-4 py-1.5 text-sm hover:bg-dark-input hover:text-cyan-400 transition-all duration-200" :class="{ 'bg-cyan-400/10 text-cyan-400': currentActivePath === '/dashboard/apps/pod-synthesis' }">
                <div class="w-1.5 h-1.5 rounded-full" :class="currentActivePath === '/dashboard/apps/pod-synthesis' ? 'bg-cyan-400' : 'bg-dark-text-tertiary'"></div>
                <span>POD合成</span>
              </a>
              <a href="#" @click.prevent="openInTab('/dashboard/apps/title-generation', '标题生成')" class="flex items-center space-x-2 text-dark-text-secondary px-4 py-1.5 text-sm hover:bg-dark-input hover:text-cyan-400 transition-all duration-200" :class="{ 'bg-cyan-400/10 text-cyan-400': currentActivePath === '/dashboard/apps/title-generation' }">
                <div class="w-1.5 h-1.5 rounded-full" :class="currentActivePath === '/dashboard/apps/title-generation' ? 'bg-cyan-400' : 'bg-dark-text-tertiary'"></div>
                <span>标题生成</span>
              </a>
              <a href="#" @click.prevent="openInTab('/dashboard/apps/batch-listing', '批量刊登')" class="flex items-center space-x-2 text-dark-text-secondary px-4 py-1.5 text-sm hover:bg-dark-input hover:text-cyan-400 transition-all duration-200" :class="{ 'bg-cyan-400/10 text-cyan-400': currentActivePath === '/dashboard/apps/batch-listing' }">
                <div class="w-1.5 h-1.5 rounded-full" :class="currentActivePath === '/dashboard/apps/batch-listing' ? 'bg-cyan-400' : 'bg-dark-text-tertiary'"></div>
                <span>批量刊登</span>
              </a>
            </div>
          </div>

          <div class="mb-4">
            <ul class="space-y-1">
              <li>
                                 <a href="#" @click.prevent="openInTab('/dashboard/workflow', '工作流')" class="flex items-center space-x-3 text-dark-text-secondary px-4 py-2 text-sm hover:bg-dark-input hover:text-cyan-400 hover:border-r-2 hover:border-cyan-400 transition-all duration-200" :class="{ 'bg-cyan-400/10 text-cyan-400 border-r-4 border-cyan-400': currentActivePath === '/dashboard/workflow' }">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z"/>
                  </svg>
                  <span>工作流</span>
                </a>
              </li>
            </ul>
          </div>

          <!-- 图库管理 -->
          <div class="mb-4">
            <div class="flex items-center justify-between px-4 py-2 cursor-pointer" @click="toggleImageLibrary">
              <div class="flex items-center space-x-3">
                <svg class="w-4 h-4 text-dark-text-secondary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                </svg>
                <span class="text-dark-text-secondary text-sm">图库管理</span>
              </div>
              <svg class="w-4 h-4 text-dark-text-tertiary transition-transform duration-200" :class="{ 'rotate-90': isImageLibraryOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
            <div v-show="isImageLibraryOpen" class="ml-6 space-y-1">
                             <a href="#" @click.prevent="openInTab('/dashboard/images/overview', '图库概览')" class="flex items-center space-x-2 text-dark-text-secondary px-4 py-1.5 text-sm hover:bg-dark-input hover:text-cyan-400 transition-all duration-200" :class="{ 'bg-cyan-400/10 text-cyan-400': currentActivePath === '/dashboard/images/overview' }">
                <div class="w-1.5 h-1.5 rounded-full" :class="currentActivePath === '/dashboard/images/overview' ? 'bg-cyan-400' : 'bg-dark-text-tertiary'"></div>
                <span>图库概览</span>
              </a>
              <a href="#" @click.prevent="openInTab('/dashboard/images/products', '商品图库')" class="flex items-center space-x-2 text-dark-text-secondary px-4 py-1.5 text-sm hover:bg-dark-input hover:text-cyan-400 transition-all duration-200" :class="{ 'bg-cyan-400/10 text-cyan-400': currentActivePath === '/dashboard/images/products' }">
                <div class="w-1.5 h-1.5 rounded-full" :class="currentActivePath === '/dashboard/images/products' ? 'bg-cyan-400' : 'bg-dark-text-tertiary'"></div>
                <span>商品图库</span>
              </a>
              <a href="#" @click.prevent="openInTab('/dashboard/images/materials', '素材图库')" class="flex items-center space-x-2 text-dark-text-secondary px-4 py-1.5 text-sm hover:bg-dark-input hover:text-cyan-400 transition-all duration-200" :class="{ 'bg-cyan-400/10 text-cyan-400': currentActivePath === '/dashboard/images/materials' }">
                <div class="w-1.5 h-1.5 rounded-full" :class="currentActivePath === '/dashboard/images/materials' ? 'bg-cyan-400' : 'bg-dark-text-tertiary'"></div>
                <span>素材图库</span>
              </a>
              <a href="#" @click.prevent="openInTab('/dashboard/images/processing-results', '结果图库')" class="flex items-center space-x-2 text-dark-text-secondary px-4 py-1.5 text-sm hover:bg-dark-input hover:text-cyan-400 transition-all duration-200" :class="{ 'bg-cyan-400/10 text-cyan-400': currentActivePath === '/dashboard/images/processing-results' }">
                <div class="w-1.5 h-1.5 rounded-full" :class="currentActivePath === '/dashboard/images/processing-results' ? 'bg-cyan-400' : 'bg-dark-text-tertiary'"></div>
                <span>结果图库</span>
              </a>
            </div>
          </div>

          <!-- 商品管理 -->
          <div class="mb-4">
            <div class="flex items-center justify-between px-4 py-2 cursor-pointer" @click="toggleProductManagement">
              <div class="flex items-center space-x-3">
                <svg class="w-4 h-4 text-dark-text-secondary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                </svg>
                <span class="text-dark-text-secondary text-sm">商品管理</span>
              </div>
              <svg class="w-4 h-4 text-dark-text-tertiary transition-transform duration-200" :class="{ 'rotate-90': isProductManagementOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
            <div v-show="isProductManagementOpen" class="ml-6 space-y-1">
              <a href="#" @click.prevent="openInTab('/dashboard/products/white', '白品管理')" class="flex items-center space-x-2 text-dark-text-secondary px-4 py-1.5 text-sm hover:bg-dark-input hover:text-cyan-400 transition-all duration-200" :class="{ 'bg-cyan-400/10 text-cyan-400': currentActivePath === '/dashboard/products/white' }">
                <div class="w-1.5 h-1.5 rounded-full" :class="currentActivePath === '/dashboard/products/white' ? 'bg-cyan-400' : 'bg-dark-text-tertiary'"></div>
                <span>白品管理</span>
              </a>
              <a href="#" @click.prevent="openInTab('/dashboard/products/pod', 'POD商品')" class="flex items-center space-x-2 text-dark-text-secondary px-4 py-1.5 text-sm hover:bg-dark-input hover:text-cyan-400 transition-all duration-200" :class="{ 'bg-cyan-400/10 text-cyan-400': currentActivePath === '/dashboard/products/pod' }">
                <div class="w-1.5 h-1.5 rounded-full" :class="currentActivePath === '/dashboard/products/pod' ? 'bg-cyan-400' : 'bg-dark-text-tertiary'"></div>
                <span>POD商品</span>
              </a>
            </div>
          </div>

          <!-- 应用市场 -->
          <div class="mb-4">
            <ul class="space-y-1">
              <li>
                                 <a href="#" @click.prevent="openInTab('/dashboard/application/market', '应用市场')" class="flex items-center space-x-3 text-dark-text-secondary px-4 py-2 text-sm hover:bg-dark-input hover:text-cyan-400 hover:border-r-2 hover:border-cyan-400 transition-all duration-200" :class="{ 'bg-cyan-400/10 text-cyan-400 border-r-4 border-cyan-400': currentActivePath === '/dashboard/application/market' }">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z"/>
                  </svg>
                  <span>应用市场</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <!-- 底部区域：账号设置、帮助中心、用户信息 -->
        <div 
          class="border-t py-4"
          :style="{ borderColor: 'var(--border-color)' }"
        >
          <!-- 账号设置 -->
          <div class="mb-2">
            <ul class="space-y-1">
              <li>
                                 <a href="#" @click.prevent="openInTab('/dashboard/settings', '账号设置')" class="flex items-center space-x-3 text-dark-text-secondary px-4 py-2 text-sm hover:bg-dark-input hover:text-cyan-400 hover:border-r-2 hover:border-cyan-400 transition-all duration-200" :class="{ 'bg-cyan-400/10 text-cyan-400 border-r-4 border-cyan-400': currentActivePath === '/dashboard/settings' }">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
                  </svg>
                  <span>账号设置</span>
                </a>
              </li>
            </ul>
          </div>

          <!-- 帮助中心 -->
          <div class="mb-4">
            <ul class="space-y-1">
              <li>
                                 <a href="#" @click.prevent="openInTab('/dashboard/help', '帮助中心')" class="flex items-center space-x-3 text-dark-text-secondary px-4 py-2 text-sm hover:bg-dark-input hover:text-cyan-400 hover:border-r-2 hover:border-cyan-400 transition-all duration-200" :class="{ 'bg-cyan-400/10 text-cyan-400 border-r-4 border-cyan-400': currentActivePath === '/dashboard/help' }">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
                  </svg>
                  <span>帮助中心</span>
                </a>
              </li>
            </ul>
          </div>

          <!-- 用户信息区域 -->
          <div class="relative px-4">
            <div 
              class="flex items-center justify-between py-2 cursor-pointer hover:bg-dark-input rounded-md px-2"
              @click="toggleTeamModal"
            >
              <div class="flex items-center space-x-3">
                <!-- 用户头像 -->
                <div class="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-dark-text">体验用户</span>
                  <span class="text-xs text-dark-text-secondary">{{ currentTeam.name }}</span>
                </div>
              </div>
              <!-- 更多按钮 -->
              <button class="p-1 hover:bg-dark-hover rounded">
                <svg class="w-4 h-4 text-dark-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </aside>

      <!-- 右侧内容区域 -->
      <div class="flex-1 flex flex-col">
        <!-- 标签页导航区域 -->
        <div 
          class="border-b"
          :style="{
            backgroundColor: 'var(--bg-secondary)',
            borderColor: 'var(--border-color)'
          }"
        >
          <div class="flex items-center justify-between">
            <!-- 标签页列表 -->
            <div class="flex items-center px-0 py-0 overflow-x-auto flex-1">
              
              <div 
                v-for="tab in openTabs" 
                :key="tab.id"
                class="flex items-center space-x-2 px-4 py-3 text-sm whitespace-nowrap cursor-pointer transition-all duration-200 border-r min-w-0 relative"
                :class="{
                  'font-medium': tab.id === activeTab,
                }"
                :style="{
                  backgroundColor: tab.id === activeTab ? 'var(--bg-primary)' : 'var(--bg-secondary)',
                  borderColor: 'var(--border-color)',
                  borderBottomColor: tab.id === activeTab ? 'var(--bg-primary)' : 'var(--border-color)',
                  color: tab.id === activeTab ? 'var(--color-primary)' : 'var(--text-secondary)'
                }"
                @click="switchToTab(tab.id)"
                @contextmenu.prevent="showTabContextMenu($event, tab.id)"
              >
                <!-- 活跃标签底部指示线 -->
                <div 
                  v-if="tab.id === activeTab"
                  class="absolute bottom-0 left-0 right-0 h-0.5"
                  :style="{ backgroundColor: 'var(--color-primary)' }"
                ></div>
                
                <span class="truncate">{{ tab.title }}</span>
                
                <button 
                  v-if="openTabs.length > 1"
                  @click.stop="closeTab(tab.id)"
                  class="rounded p-1 flex-shrink-0 ml-2 transition-colors"
                  :class="{
                    'hover:bg-gray-200': tab.id !== activeTab,
                    'hover:bg-blue-100': tab.id === activeTab
                  }"
                  :style="{ color: tab.id === activeTab ? 'var(--color-primary)' : 'var(--text-tertiary)' }"
                >
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- 右侧控制按钮 -->
            <div class="flex items-center px-2 py-2 border-l" :style="{ borderColor: 'var(--border-color)' }">
              <!-- 标签页菜单按钮 -->
              <button 
                @click.stop="showTabMenu"
                class="p-2 rounded transition-colors"
                :class="{
                  'hover:bg-gray-100': !showTabMenuDropdown,
                  'bg-gray-100': showTabMenuDropdown
                }"
                :style="{ color: 'var(--text-secondary)' }"
                title="标签页操作"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- 标签页右键菜单 -->
        <div 
          v-if="showContextMenu"
          class="fixed border rounded-md shadow-lg py-1 z-50 min-w-[160px]"
          :style="{ 
            left: contextMenuPosition.x + 'px', 
            top: contextMenuPosition.y + 'px',
            backgroundColor: 'var(--bg-primary)',
            borderColor: 'var(--border-color)',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.15)'
          }"
          @click.stop
        >
          <button 
            @click="closeCurrentTab"
            class="w-full text-left px-4 py-2 text-sm transition-colors duration-200 flex items-center space-x-2"
            :class="{
              'opacity-50 cursor-not-allowed': openTabs.length <= 1,
              'hover:bg-gray-100': openTabs.length > 1
            }"
            :style="{ 
              color: 'var(--text-primary)',
              backgroundColor: openTabs.length > 1 ? 'transparent' : 'var(--bg-tertiary)'
            }"
            :disabled="openTabs.length <= 1"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
            <span>关闭</span>
          </button>
          
          <button 
            @click="closeOtherTabs"
            class="w-full text-left px-4 py-2 text-sm transition-colors duration-200 flex items-center space-x-2"
            :class="{
              'opacity-50 cursor-not-allowed': openTabs.length <= 1,
              'hover:bg-gray-100': openTabs.length > 1
            }"
            :style="{ 
              color: 'var(--text-primary)',
              backgroundColor: openTabs.length > 1 ? 'transparent' : 'var(--bg-tertiary)'
            }"
            :disabled="openTabs.length <= 1"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
            <span>关闭其他标签页</span>
          </button>

          <button 
            @click="closeAllTabs"
            class="w-full text-left px-4 py-2 text-sm transition-colors duration-200 flex items-center space-x-2"
            :class="{
              'opacity-50 cursor-not-allowed': openTabs.length <= 1,
              'hover:bg-gray-100': openTabs.length > 1
            }"
            :style="{ 
              color: 'var(--text-primary)',
              backgroundColor: openTabs.length > 1 ? 'transparent' : 'var(--bg-tertiary)'
            }"
            :disabled="openTabs.length <= 1"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span>关闭所有标签页</span>
          </button>

          <hr class="my-1" :style="{ borderColor: 'var(--border-color)' }">

          <button 
            @click="reloadCurrentTab"
            class="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-200 flex items-center space-x-2"
            :style="{ color: 'var(--text-primary)' }"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            <span>重新加载</span>
          </button>

          <button 
            @click="duplicateTab"
            class="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-200 flex items-center space-x-2"
            :style="{ color: 'var(--text-primary)' }"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
            </svg>
            <span>在新窗口中打开</span>
          </button>
        </div>

        <!-- 标签页操作菜单 -->
        <div 
          v-if="showTabMenuDropdown"
          class="fixed border rounded-md shadow-lg py-1 z-50 min-w-[160px]"
          :style="{ 
            right: '60px', 
            top: '115px',
            backgroundColor: 'var(--bg-primary)',
            borderColor: 'var(--border-color)',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.15)'
          }"
          @click.stop
        >
          <button 
            @click="closeOtherTabs"
            class="w-full text-left px-4 py-2 text-sm transition-colors duration-200 flex items-center space-x-2"
            :class="{
              'opacity-50 cursor-not-allowed': openTabs.length <= 1,
              'hover:bg-gray-100': openTabs.length > 1
            }"
            :style="{ 
              color: 'var(--text-primary)',
              backgroundColor: openTabs.length > 1 ? 'transparent' : 'var(--bg-tertiary)'
            }"
            :disabled="openTabs.length <= 1"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
            <span>关闭其他标签页</span>
          </button>

          <button 
            @click="closeAllTabs"
            class="w-full text-left px-4 py-2 text-sm transition-colors duration-200 flex items-center space-x-2"
            :class="{
              'opacity-50 cursor-not-allowed': openTabs.length <= 1,
              'hover:bg-gray-100': openTabs.length > 1
            }"
            :style="{ 
              color: 'var(--text-primary)',
              backgroundColor: openTabs.length > 1 ? 'transparent' : 'var(--bg-tertiary)'
            }"
            :disabled="openTabs.length <= 1"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span>关闭所有标签页</span>
          </button>

          <hr class="my-1" :style="{ borderColor: 'var(--border-color)' }">

          <button 
            @click="reloadAllTabs"
            class="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-200 flex items-center space-x-2"
            :style="{ color: 'var(--text-primary)' }"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            <span>重新加载所有标签页</span>
          </button>

          <button 
            @click="clearAllCache"
            class="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-200 flex items-center space-x-2"
            :style="{ color: 'var(--text-primary)' }"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
            <span>清理所有缓存</span>
          </button>
        </div>

        <!-- 页面内容区域 -->
        <main class="flex-1 overflow-auto">
        <slot />
      </main>
      </div>
    </div>

    <!-- 团队切换弹窗 -->
    <div 
      v-if="showTeamModal" 
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click="closeTeamModal"
    >
      <div 
        class="bg-dark-card border border-dark-border rounded-lg shadow-xl w-96 max-h-96 overflow-hidden"
        @click.stop
      >
        <!-- 弹窗头部 -->
        <div class="p-4 border-b border-dark-border">
          <h3 class="text-lg font-medium text-dark-text">个人账号</h3>
        </div>

        <!-- 弹窗内容 -->
        <div class="p-4">
          <!-- 团队切换下拉选择 -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-dark-text mb-2">当前团队</label>
            <div class="relative">
              <select 
                v-model="currentTeam.id"
                @change="switchTeam"
                class="w-full px-3 py-2 bg-dark-input border border-dark-border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-dark-text"
              >
                <option v-for="team in availableTeams" :key="team.id" :value="team.id">
                  {{ team.name }}
                </option>
              </select>
            </div>
          </div>

          <!-- 当前团队信息 -->
          <div class="bg-dark-input rounded-md p-3 mb-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <span class="text-white text-sm font-bold">{{ currentTeam.name.charAt(0) }}</span>
                </div>
                <div>
                  <div class="font-medium text-dark-text">{{ currentTeam.name }}</div>
                  <div class="text-xs text-orange-500 bg-orange-100 px-2 py-0.5 rounded-full inline-block">{{ currentTeam.version }}</div>
                </div>
              </div>
              <div class="text-right">
                <div class="text-sm text-dark-text">余额：¥{{ currentTeam.balance }}</div>
                <svg class="w-4 h-4 text-green-500 ml-auto" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </div>
            </div>
          </div>

          <!-- 快捷操作 -->
          <div class="space-y-2">
            <button 
              @click="joinNewTeam"
              class="w-full flex items-center justify-center space-x-3 p-3 hover:bg-dark-hover rounded-md cursor-pointer transition-colors"
            >
              <div class="w-8 h-8 bg-gray-500 rounded-lg flex items-center justify-center">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                </svg>
              </div>
              <span class="font-medium text-dark-text">加入新团队</span>
            </button>

            <button 
              @click="createTeam"
              class="w-full flex items-center justify-center space-x-3 p-3 hover:bg-dark-hover rounded-md cursor-pointer transition-colors"
            >
              <div class="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
              </div>
              <span class="font-medium text-dark-text">创建团队</span>
            </button>
          </div>
        </div>

        <!-- 弹窗底部 -->
        <div class="p-4 border-t border-dark-border bg-dark-input">
          <button 
            @click="logout"
            class="w-full text-center py-2 text-red-500 hover:text-red-400 text-sm transition-colors"
          >
            退出登录
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, onBeforeUnmount, nextTick } from 'vue'
import { useThemeStore } from '~/composables/useTheme'
import ThemeSelector from '~/components/ThemeSelector.vue'

const themeStore = useThemeStore()
const activeTheme = computed(() => themeStore.activeTheme)
const route = useRoute()
const router = useRouter()

// 菜单状态
const isMyAppsOpen = ref(true)
const isImageLibraryOpen = ref(false)
const isProductManagementOpen = ref(false)
const showTeamModal = ref(false)

// 导航状态管理
const isNavigating = ref(false)
const pendingNavigation = ref(null)

// 标签页管理
const openTabs = ref([
  { id: 'dashboard', title: '驾驶舱', path: '/dashboard' }
])
const activeTab = ref('dashboard')

// 团队管理
const availableTeams = ref([
  { id: 'cuzcuz', name: 'CUZCUZ团队', version: '团队版', balance: '431.31' },
  { id: 'abc', name: 'ABC团队', version: '个人版', balance: '168.50' },
])
const currentTeam = ref(availableTeams.value[0])

// 标签页右键菜单
const showContextMenu = ref(false)
const contextMenuPosition = ref({ x: 0, y: 0 })
const showTabMenuDropdown = ref(false)

// 组件缓存相关
const pageCache = ref(new Map())

// 页面标题映射
const routeTitleMap = {
  '/dashboard': '驾驶舱',
  '/dashboard/apps/collection': '商品采集',
  '/dashboard/apps/cropping': '智能裁图',
  '/dashboard/apps/cutout': '一键抠图',
  '/dashboard/apps/text-to-image': '文生图',
  '/dashboard/apps/transform': '超级裂变',
  '/dashboard/apps/detection': '侵权检测',
  '/dashboard/apps/pod-synthesis': 'POD合成',
  '/dashboard/apps/title-generation': '标题生成',
  '/dashboard/apps/batch-listing': '批量刊登',
  '/dashboard/workflow': '工作流',
  '/dashboard/images/overview': '图库概览',
  '/dashboard/images/products': '商品图库',
  '/dashboard/images/materials': '素材图库',
  '/dashboard/images/processing-results': '结果图库',
  '/dashboard/products/white': '白品管理',
  '/dashboard/products/pod': 'POD商品',
  '/dashboard/application/market': '应用市场',
  '/dashboard/settings': '账号设置',
  '/dashboard/help': '帮助中心'
}

// 左侧导航当前激活路径
const currentActivePath = ref(route.path)

// 防抖延迟时间（毫秒）
const DEBOUNCE_DELAY = 150

// 防抖导航函数
const debouncedNavigate = debounce((path) => {
  executeNavigation(path)
}, DEBOUNCE_DELAY)

// 防抖工具函数
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// 执行导航的核心函数
const executeNavigation = async (path) => {
  if (isNavigating.value) {
    // 如果正在导航，保存待处理的导航请求
    pendingNavigation.value = path
    return
  }

  try {
    console.log('开始执行导航:', path)
    isNavigating.value = true
    pendingNavigation.value = null
    
    // 清理目标页面的缓存，确保重新加载
    clearPageCache(path)
    
    // 等待当前渲染完成
    await nextTick()
    
    // 执行导航
    await navigateTo(path)
    
    // 等待路由切换完成
    await nextTick()
    
    // 强制刷新页面内容
    await refreshPageContent()
    
    console.log('导航完成:', path)
    
  } catch (error) {
    console.error('导航失败:', error)
  } finally {
    isNavigating.value = false
    
    // 处理待处理的导航请求
    if (pendingNavigation.value && pendingNavigation.value !== path) {
      const nextPath = pendingNavigation.value
      pendingNavigation.value = null
      await nextTick()
      executeNavigation(nextPath)
    }
  }
}

// 强制刷新页面内容
const refreshPageContent = async () => {
  try {
    // 通过重新渲染来强制更新页面内容
    const currentRoute = router.currentRoute.value
    console.log('刷新页面内容:', { currentRoute: currentRoute.path, routePath: route.path })
    
    if (currentRoute.path !== route.path) {
      console.log('路由不匹配，跳过刷新')
      return // 路由已经改变，无需刷新
    }
    
    // 触发页面组件重新渲染
    await nextTick()
    
    // 发送自定义事件通知页面更新
    const event = new CustomEvent('page-force-refresh', {
      detail: { path: currentRoute.path }
    })
    window.dispatchEvent(event)
    console.log('发送强制刷新事件:', currentRoute.path)
    
  } catch (error) {
    console.error('刷新页面内容失败:', error)
  }
}

// 标签页管理方法
const openInTab = async (path, title) => {
  try {
    console.log('openInTab 被调用:', { path, title, currentPath: route.path })
    
    // 如果当前路径已经是目标路径，只更新标签页状态
    if (route.path === path) {
      const existingTab = openTabs.value.find(tab => tab.path === path)
      if (existingTab) {
        activeTab.value = existingTab.id
        currentActivePath.value = path
      }
      return
    }
    
    const existingTab = openTabs.value.find(tab => tab.path === path)
    
    if (existingTab) {
      // 如果标签页已存在，直接切换到该标签页
      console.log('切换到现有标签页:', existingTab.title)
      activeTab.value = existingTab.id
      currentActivePath.value = path
    } else {
      // 创建新标签页
      const newTabId = `tab-${Date.now()}`
      const newTab = {
        id: newTabId,
        title,
        path,
      }
      
      console.log('创建新标签页:', title)
      openTabs.value.push(newTab)
      activeTab.value = newTabId
      currentActivePath.value = path
    }
    
    // 使用防抖导航
    debouncedNavigate(path)
    
  } catch (error) {
    console.error('打开标签页失败:', error)
  }
}

const closeTab = (tabId) => {
  if (openTabs.value.length <= 1) return // 至少保留一个标签页
  
  const tabIndex = openTabs.value.findIndex(tab => tab.id === tabId)
  if (tabIndex === -1) return
  
  const tabToClose = openTabs.value[tabIndex]
  
  // 移除标签页
  openTabs.value.splice(tabIndex, 1)
  
  // 如果关闭的是当前活跃的标签页，切换到相邻的标签页
  if (activeTab.value === tabId) {
    const newActiveIndex = Math.max(0, tabIndex - 1)
    const newActiveTab = openTabs.value[newActiveIndex]
    activeTab.value = newActiveTab.id
    currentActivePath.value = newActiveTab.path
    debouncedNavigate(newActiveTab.path)
  }
}

const switchToTab = async (tabId) => {
  try {
    const tab = openTabs.value.find(t => t.id === tabId)
    if (tab && activeTab.value !== tabId) {
      activeTab.value = tabId
      currentActivePath.value = tab.path
      
      // 使用防抖导航
      debouncedNavigate(tab.path)
    }
  } catch (error) {
    console.error('切换标签页失败:', error)
  }
}

// 清理缓存方法
const clearPageCache = (path) => {
  pageCache.value.delete(path)
}

// 清理所有缓存
const clearAllCache = () => {
  pageCache.value.clear()
  closeContextMenu()
}

// 标签页右键菜单方法
const showTabContextMenu = (event, tabId) => {
  event.preventDefault()
  event.stopPropagation()
  activeTab.value = tabId // 确保当前点击的标签页是激活的
  contextMenuPosition.value = { x: event.clientX, y: event.clientY }
  showContextMenu.value = true
  showTabMenuDropdown.value = false // 关闭其他菜单
}

const showTabMenu = (event) => {
  event.preventDefault()
  event.stopPropagation()
  showTabMenuDropdown.value = !showTabMenuDropdown.value
  showContextMenu.value = false // 关闭右键菜单
}

const closeContextMenu = () => {
  showContextMenu.value = false
  showTabMenuDropdown.value = false
}

const closeCurrentTab = () => {
  if (openTabs.value.length > 1) {
    closeTab(activeTab.value)
  }
  closeContextMenu()
}

const closeOtherTabs = () => {
  const currentTab = openTabs.value.find(tab => tab.id === activeTab.value)
  if (currentTab) {
    // 清理其他标签页的缓存
    openTabs.value.forEach(tab => {
      if (tab.id !== activeTab.value) {
        clearPageCache(tab.path)
      }
    })
    openTabs.value = [currentTab]
  }
  closeContextMenu()
}

const closeAllTabs = async () => {
  try {
    // 清理所有缓存
    clearAllCache()
    openTabs.value = [{ id: 'dashboard', title: '驾驶舱', path: '/dashboard' }]
    activeTab.value = 'dashboard'
    currentActivePath.value = '/dashboard'
    
    // 使用防抖导航
    debouncedNavigate('/dashboard')
    closeContextMenu()
  } catch (error) {
    console.error('关闭所有标签页失败:', error)
    closeContextMenu()
  }
}

const reloadCurrentTab = async () => {
  try {
    const tab = openTabs.value.find(t => t.id === activeTab.value)
    if (tab) {
      // 清理当前标签页的缓存，强制重新加载
      clearPageCache(tab.path)
      
      // 使用导航重新加载而不是整页刷新
      await executeNavigation(tab.path)
    }
    closeContextMenu()
  } catch (error) {
    console.error('重新加载标签页失败:', error)
    closeContextMenu()
  }
}

const reloadAllTabs = () => {
  clearAllCache()
  window.location.reload()
  closeContextMenu()
}

const duplicateTab = async () => {
  try {
    const tab = openTabs.value.find(t => t.id === activeTab.value)
    if (tab) {
      const newTabId = `tab-${Date.now()}`
      const newTab = {
        id: newTabId,
        title: tab.title + ' (副本)',
        path: tab.path,
      }
      openTabs.value.push(newTab)
      activeTab.value = newTabId
      currentActivePath.value = tab.path
      
      // 使用防抖导航
      debouncedNavigate(newTab.path)
    }
    closeContextMenu()
  } catch (error) {
    console.error('复制标签页失败:', error)
    closeContextMenu()
  }
}

// 切换菜单展开状态
const toggleMyApps = () => {
  isMyAppsOpen.value = !isMyAppsOpen.value
}
const toggleImageLibrary = () => {
  isImageLibraryOpen.value = !isImageLibraryOpen.value
}
const toggleProductManagement = () => {
  isProductManagementOpen.value = !isProductManagementOpen.value
}

// 团队相关方法
const toggleTeamModal = () => {
  showTeamModal.value = !showTeamModal.value
}

const closeTeamModal = () => {
  showTeamModal.value = false
}

const switchTeam = () => {
  const selectedTeam = availableTeams.value.find(team => team.id === currentTeam.value.id)
  if (selectedTeam) {
    currentTeam.value = selectedTeam
    console.log('切换到团队:', selectedTeam.name)
    // 实际应用中这里会更新当前团队信息和权限
  }
}

const joinNewTeam = () => {
  console.log('加入新团队')
  closeTeamModal()
  // 实际应用中这里会打开加入团队的表单或页面
}

const createTeam = () => {
  console.log('创建新团队')
  closeTeamModal()
  // 实际应用中这里会打开创建团队的表单或页面
}

// 退出登录
const logout = () => {
  localStorage.removeItem('isLoggedIn')
  localStorage.removeItem('userInfo')
  navigateTo('/login')
}

// 监听路由变化，同步标签页状态和左侧导航状态
watch(() => route.path, (newPath, oldPath) => {
  // 防止无效的路由变化处理
  if (!newPath || newPath === oldPath) return
  
  // 如果正在导航中，跳过路由监听器的处理，避免竞态条件
  if (isNavigating.value) {
    return
  }
  
  console.log('路由变化:', { oldPath, newPath, currentActivePath: currentActivePath.value })
  
  // 更新左侧导航激活状态
  currentActivePath.value = newPath
  
  // 查找是否已有对应的标签页
  const existingTab = openTabs.value.find(tab => tab.path === newPath)
  
  if (existingTab) {
    // 如果已有标签页，激活它
    if (activeTab.value !== existingTab.id) {
      console.log('激活现有标签页:', existingTab.title)
      activeTab.value = existingTab.id
    }
  } else {
    // 如果是新页面，添加新标签页
    const title = routeTitleMap[newPath] || '未知页面'
    const newTabId = `tab-${Date.now()}`
    const newTab = {
      id: newTabId,
      title,
      path: newPath,
    }
    
    console.log('创建新标签页:', title)
    openTabs.value.push(newTab)
    activeTab.value = newTabId
  }
  
  // 延迟触发页面内容刷新，确保路由切换完成
  nextTick(() => {
    refreshPageContent()
  })
}, { immediate: true })

// 点击外部关闭菜单
const handleClickOutside = (event) => {
  // 检查点击是否在菜单外部
  if (showContextMenu.value || showTabMenuDropdown.value) {
    const contextMenus = document.querySelectorAll('.fixed.bg-white.border.border-gray-200, .fixed[style*="backgroundColor: var(--bg-primary)"]')
    let clickedInside = false
    
    contextMenus.forEach(menu => {
      if (menu && menu.contains(event.target)) {
        clickedInside = true
      }
    })
    
    // 检查是否点击了菜单按钮
    const menuButton = event.target.closest('button')
    if (menuButton && (menuButton.title === '标签页操作' || menuButton.getAttribute('title') === '标签页操作')) {
      clickedInside = true
    }
    
    if (!clickedInside) {
      closeContextMenu()
    }
  }
}

// 键盘快捷键
const handleKeydown = (event) => {
  // Ctrl+W 关闭当前标签页
  if (event.ctrlKey && event.key === 'w') {
    event.preventDefault()
    if (openTabs.value.length > 1) {
      closeTab(activeTab.value)
    }
  }
  
  // Ctrl+T 新建标签页（跳转到驾驶舱）
  if (event.ctrlKey && event.key === 't') {
    event.preventDefault()
    openInTab('/dashboard', '驾驶舱')
  }
  
  // Ctrl+Shift+T 重新打开最近关闭的标签页
  if (event.ctrlKey && event.shiftKey && event.key === 'T') {
    event.preventDefault()
    reloadCurrentTab()
  }
  
  // ESC 关闭菜单
  if (event.key === 'Escape') {
    closeContextMenu()
  }
}

// 初始化时设置默认标签页
onMounted(() => {
  // 根据当前路由设置活跃标签页
  const currentPath = route.path
  const existingTab = openTabs.value.find(tab => tab.path === currentPath)
  
  if (existingTab) {
    activeTab.value = existingTab.id
  } else {
    // 如果当前路径没有标签页，添加新标签页
    const title = routeTitleMap[currentPath] || '未知页面'
    
    // 如果是驾驶舱路径，保持默认ID
    const newTabId = currentPath === '/dashboard' ? 'dashboard' : `tab-${Date.now()}`
    const newTab = {
      id: newTabId,
      title,
      path: currentPath,
    }
    
    // 如果不是默认的驾驶舱路径，添加到现有标签页
    if (currentPath !== '/dashboard') {
      openTabs.value.push(newTab)
    } else {
      // 如果是驾驶舱路径，确保默认标签页正确
      openTabs.value[0] = newTab
    }
    
    activeTab.value = newTabId
  }
  
  // 添加全局事件监听器
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleKeydown)
})

// 组件卸载时清理事件监听器
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style>
/* 自定义滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--bg-secondary);
}

::-webkit-scrollbar-thumb {
  background-color: var(--border-color);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}

/* 高科技Logo动画样式 */
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.text-gradient-animate {
  background-size: 200% 200%;
  animation: gradientShift 3s ease infinite;
}

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

.logo-hover:hover .logo-pulse {
  animation: techPulse 1.5s ease-in-out infinite;
}
</style>