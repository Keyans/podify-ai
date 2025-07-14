<template>
  <div class="space-y-6">
      <!-- 智能目标 -->
      <div class="bg-white rounded-lg p-6">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">智能目标</h2>
        <p class="text-gray-600 text-sm mb-4">基于您的历史数据和市场趋势为您推荐最佳商品，帮助您快速找到热销商品，提升您的产品竞争力。</p>
      </div>

      <!-- 热门商品推荐 -->
      <div class="bg-white rounded-lg p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-gray-800">热门商品推荐</h2>
          <div class="flex space-x-2">
            <button class="px-3 py-1 text-sm bg-blue-500 text-white rounded">Amazon</button>
            <button class="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300">Etsy</button>
            <button class="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300">更多平台</button>
          </div>
        </div>
        
        <div class="grid grid-cols-3 gap-4">
          <div class="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div class="w-full h-32 bg-gray-200 rounded mb-3 flex items-center justify-center">
              <svg class="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
              </svg>
            </div>
            <h3 class="font-medium text-gray-800 mb-1">女性运动鞋</h3>
            <p class="text-sm text-gray-600 mb-2">价格：$50</p>
            <p class="text-xs text-gray-500">销量</p>
          </div>
          
          <div class="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div class="w-full h-32 bg-gray-200 rounded mb-3 flex items-center justify-center">
              <svg class="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
              </svg>
            </div>
            <h3 class="font-medium text-gray-800 mb-1">智能手表</h3>
            <p class="text-sm text-gray-600 mb-2">价格：$199</p>
            <p class="text-xs text-gray-500">销量</p>
          </div>
          
          <div class="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div class="w-full h-32 bg-gray-200 rounded mb-3 flex items-center justify-center">
              <svg class="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
              </svg>
            </div>
            <h3 class="font-medium text-gray-800 mb-1">小型家电器</h3>
            <p class="text-sm text-gray-600 mb-2">价格：$45</p>
            <p class="text-xs text-gray-500">销量</p>
          </div>
        </div>
      </div>

      <!-- 热门设计师推荐 -->
      <div class="bg-green-50 rounded-lg p-6">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">热门设计师推荐</h2>
        
        <div class="grid grid-cols-3 gap-4">
          <div class="bg-white rounded-lg p-4 text-center">
            <div class="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center">
              <svg class="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
            <h3 class="font-medium text-gray-800 mb-1">创意实验</h3>
            <p class="text-xs text-gray-600 mb-2">风格：简约、现代风格</p>
            <p class="text-xs text-gray-500">销量</p>
          </div>
          
          <div class="bg-white rounded-lg p-4 text-center">
            <div class="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center">
              <svg class="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
            <h3 class="font-medium text-gray-800 mb-1">设计师名</h3>
            <p class="text-xs text-gray-600 mb-2">风格：复古、怀旧风格</p>
            <p class="text-xs text-gray-500">销量</p>
          </div>
          
          <div class="bg-white rounded-lg p-4 text-center">
            <div class="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center">
              <svg class="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
            <h3 class="font-medium text-gray-800 mb-1">艺术家名</h3>
            <p class="text-xs text-gray-600 mb-2">风格：抽象、现代风格</p>
            <p class="text-xs text-gray-500">销量</p>
          </div>
        </div>
      </div>

      <!-- AI推荐设计方案 -->
      <div class="bg-white rounded-lg p-6">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">AI推荐设计方案</h2>
        
        <div class="grid grid-cols-2 gap-6">
          <div class="bg-blue-50 rounded-lg p-6 text-center">
            <div class="w-16 h-16 bg-gray-200 rounded mx-auto mb-4 flex items-center justify-center">
              <svg class="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
              </svg>
            </div>
            <h3 class="font-medium text-gray-800 mb-2">AI推荐：创意实验室系列设计</h3>
            <p class="text-sm text-gray-600 mb-4">基于市场趋势，为您推荐最具潜力的设计方案，帮助您快速获得市场认可。</p>
            <button class="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600 transition-colors">
              查看详情
            </button>
          </div>
          
          <div class="bg-purple-50 rounded-lg p-6 text-center">
            <div class="w-16 h-16 bg-gray-200 rounded mx-auto mb-4 flex items-center justify-center">
              <svg class="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
              </svg>
            </div>
            <h3 class="font-medium text-gray-800 mb-2">AI推荐：极简风格系列设计</h3>
            <p class="text-sm text-gray-600 mb-4">人工智能分析市场数据，为您推荐最具商业价值的设计方案，让您的产品脱颖而出。</p>
            <button class="bg-purple-500 text-white px-4 py-2 rounded text-sm hover:bg-purple-600 transition-colors">
              查看详情
            </button>
          </div>
        </div>
      </div>

      <!-- 市场趋势信息 -->
      <div class="bg-white rounded-lg p-6">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">市场趋势信息</h2>
        
        <div class="space-y-3">
          <div class="flex items-center justify-between p-3 bg-gray-50 rounded">
            <span class="text-sm text-gray-700">• Amazon：电子产品、服装配饰、家居用品等热销商品持续上升</span>
          </div>
          <div class="flex items-center justify-between p-3 bg-gray-50 rounded">
            <span class="text-sm text-gray-700">• Etsy：手工艺品、个性化定制、复古风格商品需求增长</span>
          </div>
          <div class="flex items-center justify-between p-3 bg-gray-50 rounded">
            <span class="text-sm text-gray-700">• 大数据：健康生活、环保材料、智能科技类产品市场前景广阔</span>
          </div>
          <div class="flex items-center justify-between p-3 bg-gray-50 rounded">
            <span class="text-sm text-gray-700">• 关键词：节能环保、个性化定制、健康生活、智能家居</span>
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
  title: '商品采集 - PodifyAi',
  meta: [
    { name: 'description', content: 'PodifyAi商品采集页面' }
  ]
})
</script>