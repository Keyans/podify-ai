<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 顶部导航栏 -->
    <nav class="bg-white border-b border-gray-200 px-6 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <div class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
              <span class="text-white font-bold text-sm">灵</span>
            </div>
            <span class="text-xl font-bold text-gray-800">PodifyAi</span>
          </div>
          <span class="text-gray-400">|</span>
          <span class="text-gray-600">仪表盘</span>
        </div>
        
        <div class="flex items-center space-x-4">
          <button class="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5-5-5h5v-5a7.5 7.5 0 1 0-15 0v5h5l-5 5-5-5h5V7a12 12 0 1 1 24 0v10z"/>
            </svg>
          </button>
          <div class="relative">
            <div class="flex items-center space-x-2 cursor-pointer" @click="toggleDropdown">
              <!-- 用户头像 -->
              <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <span class="text-gray-700">管理员</span>
              <svg class="w-4 h-4 text-gray-400 transition-transform duration-200" :class="{ 'rotate-180': isDropdownOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </div>
            
            <!-- 下拉菜单 -->
            <div v-show="isDropdownOpen" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
              <div class="py-1">
                <a href="#" class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                  个人资料
                </a>
                <a href="#" class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  账户设置
                </a>
                <div class="border-t border-gray-100"></div>
                <a href="#" class="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50" @click="logout">
                  <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                  </svg>
                  退出登录
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <div class="flex">
      <!-- 左侧边栏 -->
      <aside class="w-56 bg-white border-r border-gray-200 min-h-screen">
        <nav class="py-4">
          <!-- 主要功能 -->
          <div class="mb-6">
            <h3 class="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">主要功能</h3>
            <ul class="space-y-1">
              <li>
                <NuxtLink to="/dashboard" class="flex items-center space-x-3 text-gray-700 px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-700 hover:border-r-2 hover:border-blue-500 transition-all duration-200" active-class="bg-blue-50 text-blue-700 border-r-2 border-blue-500">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                  </svg>
                  <span>首页</span>
                </NuxtLink>
              </li>
            </ul>
          </div>

          <!-- 商品管理 -->
          <div class="mb-6">
            <h3 class="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">商品管理</h3>
            <ul class="space-y-1">
              <li>
                <NuxtLink to="/dashboard/products" class="flex items-center space-x-3 text-gray-700 px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-700 hover:border-r-2 hover:border-blue-500 transition-all duration-200" active-class="bg-blue-50 text-blue-700 border-r-2 border-blue-500">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"/>
                  </svg>
                  <span>商品采集</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/dashboard/products/management" class="flex items-center space-x-3 text-gray-700 px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-700 hover:border-r-2 hover:border-blue-500 transition-all duration-200" active-class="bg-blue-50 text-blue-700 border-r-2 border-blue-500">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7V10C2 16 6 20.9 12 22C18 20.9 22 16 22 10V7L12 2ZM12 7C13.1 7 14 7.9 14 9S13.1 11 12 11 10 10.1 10 9 10.9 7 12 7ZM18 15C16.67 15 15.33 14.67 14 14C12.67 14.67 11.33 15 10 15C8.67 15 7.33 14.67 6 14V13C6 11.9 6.9 11 8 11H16C17.1 11 18 11.9 18 13V15Z"/>
                  </svg>
                  <span>店铺管理</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/dashboard/images" class="flex items-center space-x-3 text-gray-700 px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-700 hover:border-r-2 hover:border-blue-500 transition-all duration-200" active-class="bg-blue-50 text-blue-700 border-r-2 border-blue-500">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 19V5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19ZM8.5 13.5L11 16.51L14.5 12L19 18H5L8.5 13.5Z"/>
                  </svg>
                  <span>图片管理</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/dashboard/pod" class="flex items-center space-x-3 text-gray-700 px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-700 hover:border-r-2 hover:border-blue-500 transition-all duration-200" active-class="bg-blue-50 text-blue-700 border-r-2 border-blue-500">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z"/>
                  </svg>
                  <span>POD管理</span>
                </NuxtLink>
              </li>
            </ul>
          </div>

          <!-- 团队协作 -->
          <div class="mb-6">
            <h3 class="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">团队协作</h3>
            <ul class="space-y-1">
              <li>
                <NuxtLink to="/dashboard/team/collaboration" class="flex items-center space-x-3 text-gray-700 px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-700 hover:border-r-2 hover:border-blue-500 transition-all duration-200" active-class="bg-blue-50 text-blue-700 border-r-2 border-blue-500">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 4C18.2 4 20 5.8 20 8S18.2 12 16 12 12 10.2 12 8 13.8 4 16 4ZM8 12C10.2 12 12 10.2 12 8S10.2 4 8 4 4 5.8 4 8 5.8 12 8 12ZM8 14C5.33 14 0 15.34 0 18V20H16V18C16 15.34 10.67 14 8 14ZM16 14C15.71 14 15.38 14.02 15.03 14.05C16.19 14.89 17 16.3 17 18V20H24V18C24 15.34 18.67 14 16 14Z"/>
                  </svg>
                  <span>团队协作</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/dashboard/team/resources" class="flex items-center space-x-3 text-gray-700 px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-700 hover:border-r-2 hover:border-blue-500 transition-all duration-200" active-class="bg-blue-50 text-blue-700 border-r-2 border-blue-500">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 2C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2H6ZM13 3.5L18.5 9H13V3.5ZM8 12V14H16V12H8ZM8 16V18H13V16H8Z"/>
                  </svg>
                  <span>团队资产</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/dashboard/team/monitoring" class="flex items-center space-x-3 text-gray-700 px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-700 hover:border-r-2 hover:border-blue-500 transition-all duration-200" active-class="bg-blue-50 text-blue-700 border-r-2 border-blue-500">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM15.5 6L19 10L17.59 11.41L13.5 7.31V16H11.5V7.31L7.41 11.41L6 10L9.5 6H15.5Z"/>
                  </svg>
                  <span>任务监控</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/dashboard/tools/coupons" class="flex items-center space-x-3 text-gray-700 px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-700 hover:border-r-2 hover:border-blue-500 transition-all duration-200" active-class="bg-blue-50 text-blue-700 border-r-2 border-blue-500">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.79 21L3 11.21V2H11.21L21 11.79L12.79 21ZM7 9C7.55 9 8 8.55 8 8S7.55 7 7 7 6 7.45 6 8 6.45 9 7 9Z"/>
                  </svg>
                  <span>热门趋势</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/dashboard/tools/workflow" class="flex items-center space-x-3 text-gray-700 px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-700 hover:border-r-2 hover:border-blue-500 transition-all duration-200" active-class="bg-blue-50 text-blue-700 border-r-2 border-blue-500">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L13.09 8.26L22 9L14 14L17 23L12 19L7 23L10 14L2 9L10.91 8.26L12 2Z"/>
                  </svg>
                  <span>工作流</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/dashboard/tools/marketing" class="flex items-center space-x-3 text-gray-700 px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-700 hover:border-r-2 hover:border-blue-500 transition-all duration-200" active-class="bg-blue-50 text-blue-700 border-r-2 border-blue-500">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z"/>
                  </svg>
                  <span>营销中心</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/dashboard/tools/store" class="flex items-center space-x-3 text-gray-700 px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-700 hover:border-r-2 hover:border-blue-500 transition-all duration-200" active-class="bg-blue-50 text-blue-700 border-r-2 border-blue-500">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 6H2V20C2 21.1 2.9 22 4 22H18V20H4V6ZM20 2H8C6.9 2 6 2.9 6 4V16C6 17.1 6.9 18 8 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 12H8V4H20V12Z"/>
                  </svg>
                  <span>应用商店</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/dashboard/settings" class="flex items-center space-x-3 text-gray-700 px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-700 hover:border-r-2 hover:border-blue-500 transition-all duration-200" active-class="bg-blue-50 text-blue-700 border-r-2 border-blue-500">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
                  </svg>
                  <span>设置</span>
                </NuxtLink>
              </li>
            </ul>
          </div>
        </nav>
      </aside>

      <!-- 主内容区域 -->
      <main class="flex-1 p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// 下拉菜单状态
const isDropdownOpen = ref(false)

// 切换下拉菜单
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

// 关闭下拉菜单
const closeDropdown = () => {
  isDropdownOpen.value = false
}

// 点击外部关闭下拉菜单
const handleClickOutside = (event) => {
  const dropdown = event.target.closest('.relative')
  if (!dropdown) {
    closeDropdown()
  }
}

// 退出登录
const logout = () => {
  // 这里可以添加退出登录的逻辑
  console.log('退出登录')
  closeDropdown()
  // 可以跳转到登录页面
  // await navigateTo('/login')
}

// 监听点击事件
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>