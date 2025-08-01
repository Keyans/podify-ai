<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 页面头部 -->
    <div class="bg-white shadow-sm border-b">
      <div class="px-6 py-4">
        <h1 class="text-2xl font-semibold text-gray-900">热门趋势</h1>
        <p class="text-gray-600 mt-1">发现最新的市场趋势和热门产品</p>
      </div>
    </div>

    <!-- 主要内容 -->
    <div class="p-6">
      <!-- 趋势统计 -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-red-100">
              <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">热门关键词</p>
              <p class="text-2xl font-semibold text-gray-900">1,247</p>
              <p class="text-xs text-green-600">+15% 本周</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-orange-100">
              <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">趋势产品</p>
              <p class="text-2xl font-semibold text-gray-900">89</p>
              <p class="text-xs text-green-600">+8 今日新增</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-purple-100">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">市场关注度</p>
              <p class="text-2xl font-semibold text-gray-900">92%</p>
              <p class="text-xs text-green-600">+3% 本月</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-green-100">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">预估收益</p>
              <p class="text-2xl font-semibold text-gray-900">¥45,680</p>
              <p class="text-xs text-green-600">+12% 预期</p>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <!-- 热门关键词 -->
        <div class="bg-white rounded-lg shadow">
          <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-lg font-medium text-gray-900">热门关键词</h2>
          </div>
          <div class="p-6">
            <div class="space-y-3">
              <div v-for="keyword in hotKeywords" :key="keyword.id" class="flex items-center justify-between">
                <div class="flex items-center">
                  <span class="text-sm font-medium text-gray-900">#{{ keyword.rank }}</span>
                  <span class="ml-3 text-sm text-gray-700">{{ keyword.word }}</span>
                </div>
                <div class="flex items-center space-x-2">
                  <span :class="[
                    'text-xs px-2 py-1 rounded-full',
                    keyword.trend === 'up' ? 'bg-green-100 text-green-800' :
                    keyword.trend === 'down' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  ]">
                    {{ keyword.change }}
                  </span>
                  <svg v-if="keyword.trend === 'up'" class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                  </svg>
                  <svg v-else-if="keyword.trend === 'down'" class="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"></path>
                  </svg>
                  <svg v-else class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 趋势分析 -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow">
            <div class="px-6 py-4 border-b border-gray-200">
              <h2 class="text-lg font-medium text-gray-900">趋势分析</h2>
            </div>
            <div class="p-6">
              <div class="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div class="text-center">
                  <svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                  <p class="text-gray-500">市场趋势分析图表</p>
                  <p class="text-sm text-gray-400 mt-1">显示过去30天的趋势变化</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 热门产品推荐 -->
      <div class="bg-white rounded-lg shadow">
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex justify-between items-center">
            <h2 class="text-lg font-medium text-gray-900">热门产品推荐</h2>
            <div class="flex space-x-2">
              <select class="border border-gray-300 rounded-md px-3 py-2 text-sm">
                <option>全部分类</option>
                <option>服装</option>
                <option>家居</option>
                <option>数码</option>
                <option>美妆</option>
              </select>
              <select class="border border-gray-300 rounded-md px-3 py-2 text-sm">
                <option>按热度排序</option>
                <option>按价格排序</option>
                <option>按销量排序</option>
              </select>
            </div>
          </div>
        </div>
        
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <!-- 产品卡片 -->
            <div v-for="product in trendingProducts" :key="product.id" class="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div class="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 relative">
                <div class="absolute top-2 left-2">
                  <span class="bg-red-500 text-white text-xs px-2 py-1 rounded-full">热门</span>
                </div>
                <div class="absolute top-2 right-2">
                  <button class="bg-white bg-opacity-80 p-1 rounded-full hover:bg-opacity-100">
                    <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                  </button>
                </div>
                <div class="w-full h-full flex items-center justify-center">
                  <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
              </div>
              
              <div class="p-4">
                <h3 class="text-sm font-medium text-gray-900 mb-2">{{ product.name }}</h3>
                <div class="flex items-center justify-between mb-2">
                  <span class="text-lg font-bold text-gray-900">¥{{ product.price }}</span>
                  <div class="flex items-center">
                    <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    <span class="text-sm text-gray-600 ml-1">{{ product.rating }}</span>
                  </div>
                </div>
                
                <div class="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <span>销量: {{ product.sales }}</span>
                  <span :class="[
                    product.trend === 'up' ? 'text-green-600' :
                    product.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                  ]">
                    {{ product.trendText }}
                  </span>
                </div>
                
                <div class="flex space-x-2">
                  <button class="flex-1 bg-blue-600 text-white text-sm py-2 rounded hover:bg-blue-700">
                    查看详情
                  </button>
                  <button class="px-3 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 配置页面布局和元数据
definePageMeta({
  layout: 'dashboard',
  title: '热门趋势 - CUZCUZAI',
  description: 'CUZCUZAI热门趋势页面'
})

// 模拟数据
const hotKeywords = ref([
  { id: 1, rank: 1, word: '春季新品', trend: 'up', change: '+25%' },
  { id: 2, rank: 2, word: '环保材质', trend: 'up', change: '+18%' },
  { id: 3, rank: 3, word: '简约设计', trend: 'stable', change: '0%' },
  { id: 4, rank: 4, word: '个性定制', trend: 'up', change: '+12%' },
  { id: 5, rank: 5, word: '限量版', trend: 'down', change: '-5%' },
  { id: 6, rank: 6, word: '智能科技', trend: 'up', change: '+30%' },
  { id: 7, rank: 7, word: '复古风格', trend: 'up', change: '+8%' },
  { id: 8, rank: 8, word: '健康生活', trend: 'up', change: '+22%' }
])

const trendingProducts = ref([
  {
    id: 1,
    name: '春季限定T恤设计',
    price: 89,
    rating: 4.8,
    sales: '1.2k',
    trend: 'up',
    trendText: '↗ 热度上升'
  },
  {
    id: 2,
    name: '环保帆布包',
    price: 45,
    rating: 4.6,
    sales: '856',
    trend: 'up',
    trendText: '↗ 热度上升'
  },
  {
    id: 3,
    name: '个性化手机壳',
    price: 29,
    rating: 4.5,
    sales: '2.1k',
    trend: 'stable',
    trendText: '→ 稳定'
  },
  {
    id: 4,
    name: '复古风马克杯',
    price: 35,
    rating: 4.7,
    sales: '678',
    trend: 'up',
    trendText: '↗ 热度上升'
  },
  {
    id: 5,
    name: '简约笔记本',
    price: 25,
    rating: 4.4,
    sales: '934',
    trend: 'down',
    trendText: '↘ 热度下降'
  },
  {
    id: 6,
    name: '智能手表表带',
    price: 68,
    rating: 4.9,
    sales: '445',
    trend: 'up',
    trendText: '↗ 热度上升'
  },
  {
    id: 7,
    name: '健康生活贴纸',
    price: 15,
    rating: 4.3,
    sales: '1.5k',
    trend: 'up',
    trendText: '↗ 热度上升'
  },
  {
    id: 8,
    name: '艺术印花抱枕',
    price: 55,
    rating: 4.6,
    sales: '723',
    trend: 'stable',
    trendText: '→ 稳定'
  }
])
</script>