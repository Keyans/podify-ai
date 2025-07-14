<template>
  <div>
      <div class="bg-white rounded-xl p-6 shadow-sm">
        <h1 class="text-2xl font-bold text-gray-800 mb-6">系统设置</h1>
        
        <div class="space-y-6">
          <!-- 基本设置 -->
          <div class="border-b border-gray-200 pb-6">
            <h2 class="text-lg font-semibold text-gray-800 mb-4">基本设置</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">系统名称</label>
                <input type="text" value="RiinAI" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">系统版本</label>
                <input type="text" value="v1.0.0" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              </div>
            </div>
          </div>
          
          <!-- 通知设置 -->
          <div class="border-b border-gray-200 pb-6">
            <h2 class="text-lg font-semibold text-gray-800 mb-4">通知设置</h2>
            <div class="space-y-3">
              <label class="flex items-center">
                <input type="checkbox" checked class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500">
                <span class="ml-2 text-sm text-gray-700">邮件通知</span>
              </label>
              <label class="flex items-center">
                <input type="checkbox" checked class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500">
                <span class="ml-2 text-sm text-gray-700">系统通知</span>
              </label>
              <label class="flex items-center">
                <input type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500">
                <span class="ml-2 text-sm text-gray-700">短信通知</span>
              </label>
            </div>
          </div>
          
          <!-- 安全设置 -->
          <div>
            <h2 class="text-lg font-semibold text-gray-800 mb-4">安全设置</h2>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">会话超时时间（分钟）</label>
                <input type="number" value="30" class="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              </div>
              <label class="flex items-center">
                <input type="checkbox" checked class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500">
                <span class="ml-2 text-sm text-gray-700">启用双因素认证</span>
              </label>
            </div>
          </div>
        </div>
        
        <div class="mt-8 flex space-x-4">
          <button class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
            保存设置
          </button>
          <button class="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors">
            重置
          </button>
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
  title: '设置 - PodifyAi',
  meta: [
    { name: 'description', content: 'PodifyAi设置页面' }
  ]
})
</script>