<template>
    <div class="p-6">
      <!-- 数据统计卡片 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <!-- 今日任务 -->
      <div class="bg-dark-card rounded-lg p-6 border border-dark-border">
          <div class="flex items-center justify-between">
            <div>
            <p class="text-dark-text-secondary text-sm mb-1">今日任务</p>
            <p class="text-2xl font-bold text-dark-text">{{ dashboardStats.today.taskCount }}</p>
            <div class="flex items-center mt-2">
              <svg class="w-4 h-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
              <span class="text-green-500 text-sm">+12.5%</span>
            </div>
          </div>
          <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            </div>
          </div>
        </div>

      <!-- 处理中 -->
      <div class="bg-dark-card rounded-lg p-6 border border-dark-border">
          <div class="flex items-center justify-between">
            <div>
            <p class="text-dark-text-secondary text-sm mb-1">处理中</p>
            <p class="text-2xl font-bold text-dark-text">{{ dashboardStats.today.processedCount }}</p>
            <div class="flex items-center mt-2">
              <svg class="w-4 h-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
              <span class="text-green-500 text-sm">+12.5%</span>
            </div>
          </div>
          <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            </div>
          </div>
        </div>

      <!-- 已完成 -->
      <div class="bg-dark-card rounded-lg p-6 border border-dark-border">
          <div class="flex items-center justify-between">
            <div>
            <p class="text-dark-text-secondary text-sm mb-1">已完成</p>
            <p class="text-2xl font-bold text-dark-text">{{ dashboardStats.today.completeCount }}</p>
            <div class="flex items-center mt-2">
              <svg class="w-4 h-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
              <span class="text-green-500 text-sm">+12.5%</span>
            </div>
          </div>
          <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            </div>
          </div>
        </div>

      <!-- 今日支出 -->
      <div class="bg-dark-card rounded-lg p-6 border border-dark-border">
          <div class="flex items-center justify-between">
            <div>
            <p class="text-dark-text-secondary text-sm mb-1">今日支出</p>
            <p class="text-2xl font-bold text-dark-text">¥ 3,44.53</p>
            <div class="flex items-center mt-2">
              <svg class="w-4 h-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
              <span class="text-green-500 text-sm">+4.5%</span>
            </div>
          </div>
          <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
            </div>
          </div>
        </div>
      </div>

    <!-- 主要内容区域 -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- 左侧内容 -->
        <div class="lg:col-span-2 space-y-6">
          <!-- 快捷操作 -->
        <div class="bg-dark-card rounded-lg p-6 border border-dark-border">
          <h3 class="text-lg font-semibold mb-4 text-dark-text">快捷操作</h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <NuxtLink 
              to="/dashboard/apps/collection" 
              class="flex flex-col items-center p-4 rounded-lg transition-colors hover:bg-dark-hover border border-dark-border"
              >
              <div class="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-2">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
              <span class="text-sm font-medium text-dark-text">商品采集</span>
              <span class="text-xs text-dark-text-secondary">采集商品信息</span>
              </NuxtLink>

              <NuxtLink 
              to="/dashboard/apps/cropping" 
              class="flex flex-col items-center p-4 rounded-lg transition-colors hover:bg-dark-hover border border-dark-border"
              >
              <div class="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-2">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              <span class="text-sm font-medium text-dark-text">智能裁图</span>
              <span class="text-xs text-dark-text-secondary">一键裁图</span>
              </NuxtLink>

              <NuxtLink 
              to="/dashboard/apps/text-to-image" 
              class="flex flex-col items-center p-4 rounded-lg transition-colors hover:bg-dark-hover border border-dark-border"
              >
              <div class="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-2">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              <span class="text-sm font-medium text-dark-text">文生图</span>
              <span class="text-xs text-dark-text-secondary">AI生成图片</span>
              </NuxtLink>

              <NuxtLink 
              to="/dashboard/workflow" 
              class="flex flex-col items-center p-4 rounded-lg transition-colors hover:bg-dark-hover border border-dark-border"
              >
              <div class="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center mb-2">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              <span class="text-sm font-medium text-dark-text">工作流</span>
              <span class="text-xs text-dark-text-secondary">自动化流程</span>
              </NuxtLink>
            </div>
          </div>

        <!-- 使用情况统计 -->
        <div class="bg-dark-card rounded-lg p-6 border border-dark-border">
          <h3 class="text-lg font-semibold text-dark-text mb-4">使用情况TOP5</h3>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
              <span class="text-dark-text-secondary">1. 商品采集</span>
              <span class="text-dark-text font-medium">320</span>
              </div>
              <div class="flex items-center justify-between">
              <span class="text-dark-text-secondary">2. 智能裁图</span>
              <span class="text-dark-text font-medium">270</span>
              </div>
              <div class="flex items-center justify-between">
              <span class="text-dark-text-secondary">3. 文生图</span>
              <span class="text-dark-text font-medium">240</span>
              </div>
              <div class="flex items-center justify-between">
              <span class="text-dark-text-secondary">4. 抠图处理</span>
              <span class="text-dark-text font-medium">210</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-dark-text-secondary">5. 工作流</span>
              <span class="text-dark-text font-medium">190</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧内容 -->
        <div class="space-y-6">
          <!-- 最近活动 -->
        <div class="bg-dark-card rounded-lg p-6 border border-dark-border">
          <h3 class="text-lg font-semibold text-dark-text mb-4">最近活动</h3>
            <div class="space-y-4">
              <div class="flex items-start space-x-3">
                <div class="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                <p class="text-sm font-medium text-dark-text">采集了新商品信息</p>
                <p class="text-xs text-dark-text-secondary">2分钟前 · 商品采集</p>
                </div>
              </div>
              <div class="flex items-start space-x-3">
                <div class="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                <p class="text-sm font-medium text-dark-text">完成图片处理任务</p>
                <p class="text-xs text-dark-text-secondary">5分钟前 · 智能裁图</p>
                </div>
              </div>
              <div class="flex items-start space-x-3">
                <div class="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                <p class="text-sm font-medium text-dark-text">生成AI图片</p>
                <p class="text-xs text-dark-text-secondary">10分钟前 · 文生图</p>
                </div>
              </div>
              <div class="flex items-start space-x-3">
                <div class="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div>
                <p class="text-sm font-medium text-dark-text">工作流执行完成</p>
                <p class="text-xs text-dark-text-secondary">1小时前 · 工作流</p>
                </div>
              </div>
            </div>
          </div>

        <!-- 系统状态 -->
        <div class="bg-dark-card rounded-lg p-6 border border-dark-border">
          <h3 class="text-lg font-semibold text-dark-text mb-4">系统状态</h3>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
              <span class="text-dark-text-secondary">API响应时间</span>
              <span class="text-green-500 font-medium">120ms</span>
              </div>
              <div class="flex items-center justify-between">
              <span class="text-dark-text-secondary">服务器负载</span>
              <span class="text-yellow-500 font-medium">65%</span>
              </div>
              <div class="flex items-center justify-between">
              <span class="text-dark-text-secondary">存储使用率</span>
              <span class="text-blue-500 font-medium">78%</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-dark-text-secondary">在线用户</span>
              <span class="text-dark-text font-medium">324</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getDashboardStats } from '~/apis/business/dashboard'

// 使用 dashboard 布局
definePageMeta({
  layout: 'dashboard'
})

// 统计数据
const dashboardStats = ref({
  today: {
    taskCount: '156',
    processedCount: '1,234',
    completeCount: '45,678'
  },
  yesterday: {
    taskCount: '0',
    processedCount: '0',
    completeCount: '0'
  },
  timestamp: '',
  error: false,
  success: true
})

// 加载状态
const loading = ref(false)

// 获取统计数据
const fetchDashboardStats = async () => {
  try {
    loading.value = true
    const response = await getDashboardStats()
    
    if (response.success && response.data) {
      dashboardStats.value = {
        today: {
          taskCount: response.data.today?.taskCount || '0',
          processedCount: response.data.today?.processedCount || '0',
          completeCount: response.data.today?.completeCount || '0'
        },
        yesterday: {
          taskCount: response.data.yesterday?.taskCount || '0',
          processedCount: response.data.yesterday?.processedCount || '0',
          completeCount: response.data.yesterday?.completeCount || '0'
        },
        timestamp: response.data.timestamp || '',
        error: response.data.error || false,
        success: response.data.success || true
      }
    }
  } catch (error) {
    console.error('获取驾驶舱统计数据失败:', error)
    // 保持默认模拟数据
  } finally {
    loading.value = false
  }
}

// 用户信息
const userInfo = ref({
  name: '管理员',
  email: 'admin@lingtu.ai'
})

// 检查登录状态
onMounted(async () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn')
  const savedUserInfo = localStorage.getItem('userInfo')
  
  if (isLoggedIn !== 'true') {
    navigateTo('/login')
    return
  }
  
  if (savedUserInfo) {
    userInfo.value = JSON.parse(savedUserInfo)
  }
  
  // 获取统计数据
  await fetchDashboardStats()
})

// 退出登录
const handleLogout = () => {
  localStorage.removeItem('isLoggedIn')
  localStorage.removeItem('userInfo')
  navigateTo('/login')
}

// 页面元数据
useHead({
  title: '仪表盘 - CUZCUZAI',
  meta: [
    { name: 'description', content: 'CUZCUZAI管理仪表盘' }
  ]
})
</script>