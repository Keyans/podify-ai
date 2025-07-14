<template>
  <div class="min-h-screen bg-gray-50">
    <div class="p-6">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-gray-900">团队协作</h1>
        <p class="text-gray-600 mt-2">管理团队成员和协作项目</p>
      </div>

      <!-- 统计卡片 -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-2 bg-blue-100 rounded-lg">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">团队成员</p>
              <p class="text-2xl font-bold text-gray-900">12</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-2 bg-green-100 rounded-lg">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">活跃项目</p>
              <p class="text-2xl font-bold text-gray-900">8</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-2 bg-yellow-100 rounded-lg">
              <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">待办任务</p>
              <p class="text-2xl font-bold text-gray-900">24</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-2 bg-purple-100 rounded-lg">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">今日消息</p>
              <p class="text-2xl font-bold text-gray-900">156</p>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- 团队成员 -->
        <div class="bg-white rounded-lg shadow">
          <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 class="text-lg font-medium text-gray-900">团队成员</h2>
            <button class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm">
              邀请成员
            </button>
          </div>
          <div class="p-6">
            <div class="space-y-4">
              <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <span class="text-white font-medium">张</span>
                  </div>
                  <div>
                    <p class="font-medium text-gray-900">张三</p>
                    <p class="text-sm text-gray-500">产品经理</p>
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">在线</span>
                  <button class="text-gray-400 hover:text-gray-600">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                    </svg>
                  </button>
                </div>
              </div>

              <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <span class="text-white font-medium">李</span>
                  </div>
                  <div>
                    <p class="font-medium text-gray-900">李四</p>
                    <p class="text-sm text-gray-500">UI设计师</p>
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">忙碌</span>
                  <button class="text-gray-400 hover:text-gray-600">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                    </svg>
                  </button>
                </div>
              </div>

              <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                    <span class="text-white font-medium">王</span>
                  </div>
                  <div>
                    <p class="font-medium text-gray-900">王五</p>
                    <p class="text-sm text-gray-500">开发工程师</p>
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">离线</span>
                  <button class="text-gray-400 hover:text-gray-600">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 最近项目 -->
        <div class="bg-white rounded-lg shadow">
          <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 class="text-lg font-medium text-gray-900">最近项目</h2>
            <button class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm">
              新建项目
            </button>
          </div>
          <div class="p-6">
            <div class="space-y-4">
              <div class="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div class="flex items-center justify-between mb-2">
                  <h3 class="font-medium text-gray-900">电商平台重构</h3>
                  <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">进行中</span>
                </div>
                <p class="text-sm text-gray-600 mb-3">重构现有电商平台，提升用户体验和性能</p>
                <div class="flex items-center justify-between">
                  <div class="flex -space-x-2">
                    <div class="w-6 h-6 bg-blue-500 rounded-full border-2 border-white"></div>
                    <div class="w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                    <div class="w-6 h-6 bg-purple-500 rounded-full border-2 border-white"></div>
                  </div>
                  <span class="text-xs text-gray-500">截止: 2024-02-15</span>
                </div>
              </div>

              <div class="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div class="flex items-center justify-between mb-2">
                  <h3 class="font-medium text-gray-900">移动端应用开发</h3>
                  <span class="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">计划中</span>
                </div>
                <p class="text-sm text-gray-600 mb-3">开发配套的移动端应用，支持iOS和Android</p>
                <div class="flex items-center justify-between">
                  <div class="flex -space-x-2">
                    <div class="w-6 h-6 bg-red-500 rounded-full border-2 border-white"></div>
                    <div class="w-6 h-6 bg-yellow-500 rounded-full border-2 border-white"></div>
                  </div>
                  <span class="text-xs text-gray-500">截止: 2024-03-01</span>
                </div>
              </div>

              <div class="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div class="flex items-center justify-between mb-2">
                  <h3 class="font-medium text-gray-900">数据分析系统</h3>
                  <span class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">已完成</span>
                </div>
                <p class="text-sm text-gray-600 mb-3">构建实时数据分析和报表系统</p>
                <div class="flex items-center justify-between">
                  <div class="flex -space-x-2">
                    <div class="w-6 h-6 bg-indigo-500 rounded-full border-2 border-white"></div>
                    <div class="w-6 h-6 bg-pink-500 rounded-full border-2 border-white"></div>
                    <div class="w-6 h-6 bg-teal-500 rounded-full border-2 border-white"></div>
                  </div>
                  <span class="text-xs text-gray-500">完成: 2024-01-20</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 最近活动 -->
      <div class="mt-6 bg-white rounded-lg shadow">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-lg font-medium text-gray-900">最近活动</h2>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div class="flex items-start space-x-3">
              <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
              </div>
              <div class="flex-1">
                <p class="text-sm text-gray-900">
                  <span class="font-medium">张三</span> 创建了新任务 "优化首页加载速度"
                </p>
                <p class="text-xs text-gray-500">2小时前</p>
              </div>
            </div>

            <div class="flex items-start space-x-3">
              <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <div class="flex-1">
                <p class="text-sm text-gray-900">
                  <span class="font-medium">李四</span> 完成了任务 "设计用户界面原型"
                </p>
                <p class="text-xs text-gray-500">4小时前</p>
              </div>
            </div>

            <div class="flex items-start space-x-3">
              <div class="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
              </div>
              <div class="flex-1">
                <p class="text-sm text-gray-900">
                  <span class="font-medium">王五</span> 在项目 "电商平台重构" 中发表了评论
                </p>
                <p class="text-xs text-gray-500">6小时前</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 使用 dashboard 布局
definePageMeta({
  layout: 'dashboard'
})

useHead({
  title: '团队协作 - PodifyAi',
  meta: [
    { name: 'description', content: 'PodifyAi团队协作页面' }
  ]
})
</script>