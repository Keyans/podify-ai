<template>
  <div>
    <div class="p-6">
      <!-- 数据统计卡片 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <!-- 今日创作数 -->
        <div class="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-purple-100 text-sm">今日创作数</p>
              <p class="text-3xl font-bold">412,560</p>
              <p class="text-purple-100 text-xs mt-1">较昨日 +12.5%</p>
            </div>
            <div class="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- 活跃用户 -->
        <div class="bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-xl p-6 text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-cyan-100 text-sm">活跃用户</p>
              <p class="text-3xl font-bold">324</p>
              <p class="text-cyan-100 text-xs mt-1">在线用户数量</p>
            </div>
            <div class="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- 本月收入 -->
        <div class="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-orange-100 text-sm">本月收入</p>
              <p class="text-3xl font-bold">¥89,432</p>
              <p class="text-orange-100 text-xs mt-1">较上月 +8.2%</p>
            </div>
            <div class="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- 系统状态 -->
        <div class="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-green-100 text-sm">系统状态</p>
              <p class="text-3xl font-bold">99.9%</p>
              <p class="text-green-100 text-xs mt-1">运行正常</p>
            </div>
            <div class="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- 左侧内容 -->
        <div class="lg:col-span-2 space-y-6">
          <!-- 快捷操作 -->
          <div class="bg-white rounded-xl p-6 shadow-sm">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">快捷操作</h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <NuxtLink to="/dashboard/products" class="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <div class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-2">
                  <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                  </svg>
                </div>
                <span class="text-sm font-medium text-gray-700">商品采集</span>
                <span class="text-xs text-gray-500">采集商品信息</span>
              </NuxtLink>

              <NuxtLink to="/dashboard/images" class="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                <div class="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-2">
                  <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                </div>
                <span class="text-sm font-medium text-gray-700">图片管理</span>
                <span class="text-xs text-gray-500">管理图片资源</span>
              </NuxtLink>

              <NuxtLink to="/dashboard/team/collaboration" class="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                <div class="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-2">
                  <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                  </svg>
                </div>
                <span class="text-sm font-medium text-gray-700">团队协作</span>
                <span class="text-xs text-gray-500">协作管理</span>
              </NuxtLink>

              <NuxtLink to="/dashboard/tools/workflow" class="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                <div class="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-2">
                  <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <span class="text-sm font-medium text-gray-700">工作流</span>
                <span class="text-xs text-gray-500">自动化流程</span>
              </NuxtLink>
            </div>
          </div>

          <!-- 使用情况TOP5 -->
          <div class="bg-white rounded-xl p-6 shadow-sm">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">使用情况TOP5</h3>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-gray-600">1. 商品采集（智能）</span>
                <span class="text-gray-800 font-medium">320</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-600">2. 图片管理（智能）</span>
                <span class="text-gray-800 font-medium">270</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-600">3. 团队协作（智能）</span>
                <span class="text-gray-800 font-medium">240</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-600">4. POD管理（智能）</span>
                <span class="text-gray-800 font-medium">210</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-600">5. 工作流（智能）</span>
                <span class="text-gray-800 font-medium">190</span>
              </div>
            </div>
          </div>

          <!-- 异常告警 -->
          <div class="bg-white rounded-xl p-6 shadow-sm">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">异常告警</h3>
            <div class="space-y-3">
              <div class="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                <div class="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                <div>
                  <p class="text-sm font-medium text-gray-800">2个服务器负载过高</p>
                  <p class="text-xs text-gray-500">服务器CPU使用率超过85%</p>
                </div>
              </div>
              <div class="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                <div class="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                <div>
                  <p class="text-sm font-medium text-gray-800">1个数据库连接异常</p>
                  <p class="text-xs text-gray-500">数据库响应时间超过预期</p>
                </div>
              </div>
              <div class="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                <div class="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p class="text-sm font-medium text-gray-800">1个存储空间不足</p>
                  <p class="text-xs text-gray-500">存储使用率达到90%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧内容 -->
        <div class="space-y-6">
          <!-- 最近活动 -->
          <div class="bg-white rounded-xl p-6 shadow-sm">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">最近活动</h3>
            <div class="space-y-4">
              <div class="flex items-start space-x-3">
                <div class="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p class="text-sm font-medium text-gray-800">采集了新商品信息</p>
                  <p class="text-xs text-gray-500">2分钟前 · 商品采集</p>
                </div>
              </div>
              <div class="flex items-start space-x-3">
                <div class="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p class="text-sm font-medium text-gray-800">完成图片处理任务</p>
                  <p class="text-xs text-gray-500">5分钟前 · 图片管理</p>
                </div>
              </div>
              <div class="flex items-start space-x-3">
                <div class="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <p class="text-sm font-medium text-gray-800">团队成员加入协作</p>
                  <p class="text-xs text-gray-500">10分钟前 · 团队协作</p>
                </div>
              </div>
              <div class="flex items-start space-x-3">
                <div class="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div>
                  <p class="text-sm font-medium text-gray-800">工作流执行完成</p>
                  <p class="text-xs text-gray-500">1小时前 · 工作流</p>
                </div>
              </div>
            </div>
          </div>

          <!-- 使用情况TOP5 -->
          <div class="bg-white rounded-xl p-6 shadow-sm">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">使用情况TOP5</h3>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-gray-600">1. 智能问答（智能）</span>
                <span class="text-gray-800 font-medium">23</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-600">2. 内容生成（智能）</span>
                <span class="text-gray-800 font-medium">18</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-600">3. 图像识别（智能）</span>
                <span class="text-gray-800 font-medium">15</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-600">4. 语音合成（智能）</span>
                <span class="text-gray-800 font-medium">12</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-600">5. 文本翻译（智能）</span>
                <span class="text-gray-800 font-medium">9</span>
              </div>
            </div>
          </div>

          <!-- 管理员公告 -->
          <div class="bg-white rounded-xl p-6 shadow-sm">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">管理员公告</h3>
            <div class="space-y-3">
              <div class="p-3 bg-blue-50 rounded-lg">
                <p class="text-sm font-medium text-gray-800">系统升级通知，预计停机1小时</p>
                <p class="text-xs text-gray-500 mt-1">将于今晚23:00-24:00进行系统升级</p>
              </div>
              <div class="p-3 bg-green-50 rounded-lg">
                <p class="text-sm font-medium text-gray-800">新功能上线：POD管理</p>
                <p class="text-xs text-gray-500 mt-1">支持按需打印产品管理</p>
              </div>
              <div class="p-3 bg-yellow-50 rounded-lg">
                <p class="text-sm font-medium text-gray-800">服务器维护完成</p>
                <p class="text-xs text-gray-500 mt-1">性能提升20%，响应更快</p>
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

// 用户信息
const userInfo = ref({
  name: '管理员',
  email: 'admin@lingtu.ai'
})

// 检查登录状态
onMounted(() => {
  const isLoggedIn = localStorage.getItem('isLoggedIn')
  const savedUserInfo = localStorage.getItem('userInfo')
  
  if (isLoggedIn !== 'true') {
    navigateTo('/login')
    return
  }
  
  if (savedUserInfo) {
    userInfo.value = JSON.parse(savedUserInfo)
  }
})

// 退出登录
const handleLogout = () => {
  localStorage.removeItem('isLoggedIn')
  localStorage.removeItem('userInfo')
  navigateTo('/login')
}

// 页面元数据
useHead({
  title: '仪表盘 - PodifyAi',
  meta: [
    { name: 'description', content: 'PodifyAi管理仪表盘' }
  ]
})
</script>