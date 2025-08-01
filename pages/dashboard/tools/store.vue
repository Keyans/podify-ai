<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 页面头部 -->
    <div class="bg-white shadow-sm border-b">
      <div class="px-6 py-4">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-2xl font-semibold text-gray-900">应用商店</h1>
            <p class="text-gray-600 mt-1">发现和安装有用的应用来扩展您的功能</p>
          </div>
          <div class="flex space-x-3">
            <button class="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              我的应用
            </button>
            <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              上传应用
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 主要内容 -->
    <div class="p-6">
      <!-- 应用统计 -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-blue-100">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">可用应用</p>
              <p class="text-2xl font-semibold text-gray-900">156</p>
              <p class="text-xs text-green-600">+12 本周新增</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-green-100">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">已安装</p>
              <p class="text-2xl font-semibold text-gray-900">24</p>
              <p class="text-xs text-blue-600">8个待更新</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-purple-100">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">收藏应用</p>
              <p class="text-2xl font-semibold text-gray-900">18</p>
              <p class="text-xs text-gray-600">个人收藏</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-orange-100">
              <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">热门下载</p>
              <p class="text-2xl font-semibold text-gray-900">2.4K</p>
              <p class="text-xs text-green-600">本月总下载</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 搜索和筛选 -->
      <div class="bg-white rounded-lg shadow mb-8">
        <div class="p-6">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div class="flex-1 max-w-lg">
              <div class="relative">
                <input type="text" placeholder="搜索应用..." 
                  class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <svg class="w-5 h-5 text-gray-400 absolute left-3 top-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
            <div class="flex space-x-3">
              <select class="border border-gray-300 rounded-lg px-4 py-3">
                <option>全部分类</option>
                <option>设计工具</option>
                <option>营销工具</option>
                <option>数据分析</option>
                <option>客户服务</option>
                <option>财务管理</option>
              </select>
              <select class="border border-gray-300 rounded-lg px-4 py-3">
                <option>按热度排序</option>
                <option>按评分排序</option>
                <option>按价格排序</option>
                <option>按更新时间</option>
              </select>
              <button class="bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
                </svg>
                筛选
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 推荐应用 -->
      <div class="mb-8">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-semibold text-gray-900">推荐应用</h2>
          <button class="text-blue-600 hover:text-blue-800 text-sm font-medium">查看全部</button>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div v-for="app in featuredApps" :key="app.id" class="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
            <div class="p-6">
              <div class="flex items-start justify-between mb-4">
                <div class="flex items-center">
                  <div :class="[
                    'w-12 h-12 rounded-lg flex items-center justify-center mr-4',
                    app.color
                  ]">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="app.icon"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-lg font-medium text-gray-900">{{ app.name }}</h3>
                    <p class="text-sm text-gray-500">{{ app.developer }}</p>
                  </div>
                </div>
                <button class="text-gray-400 hover:text-red-500">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                </button>
              </div>
              
              <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ app.description }}</p>
              
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center">
                  <div class="flex items-center">
                    <svg v-for="i in 5" :key="i" :class="[
                      'w-4 h-4',
                      i <= app.rating ? 'text-yellow-400' : 'text-gray-300'
                    ]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <span class="text-sm text-gray-600 ml-2">{{ app.rating }}</span>
                  <span class="text-sm text-gray-400 ml-1">({{ app.reviews }})</span>
                </div>
                <span :class="[
                  'text-sm px-2 py-1 rounded-full',
                  app.price === '免费' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                ]">{{ app.price }}</span>
              </div>
              
              <div class="flex space-x-2">
                <button :class="[
                  'flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors',
                  app.installed ? 'bg-green-100 text-green-800' : 'bg-blue-600 text-white hover:bg-blue-700'
                ]">
                  {{ app.installed ? '已安装' : '安装' }}
                </button>
                <button class="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                  详情
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 应用分类 -->
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <!-- 分类导航 -->
        <div class="bg-white rounded-lg shadow">
          <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-lg font-medium text-gray-900">应用分类</h2>
          </div>
          <div class="p-6">
            <div class="space-y-2">
              <button v-for="category in categories" :key="category.id" 
                :class="[
                  'w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center justify-between',
                  category.active ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'hover:bg-gray-50'
                ]">
                <div class="flex items-center">
                  <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="category.icon"></path>
                  </svg>
                  <span class="text-sm font-medium">{{ category.name }}</span>
                </div>
                <span class="text-xs text-gray-500">{{ category.count }}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- 应用列表 -->
        <div class="lg:col-span-3">
          <div class="bg-white rounded-lg shadow">
            <div class="px-6 py-4 border-b border-gray-200">
              <h2 class="text-lg font-medium text-gray-900">设计工具</h2>
            </div>
            
            <div class="divide-y divide-gray-200">
              <div v-for="app in categoryApps" :key="app.id" class="p-6 hover:bg-gray-50">
                <div class="flex items-start justify-between">
                  <div class="flex items-start">
                    <div :class="[
                      'w-16 h-16 rounded-lg flex items-center justify-center mr-4 flex-shrink-0',
                      app.color
                    ]">
                      <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="app.icon"></path>
                      </svg>
                    </div>
                    <div class="flex-1">
                      <div class="flex items-center mb-2">
                        <h3 class="text-lg font-medium text-gray-900 mr-3">{{ app.name }}</h3>
                        <span :class="[
                          'text-xs px-2 py-1 rounded-full',
                          app.price === '免费' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        ]">{{ app.price }}</span>
                      </div>
                      <p class="text-sm text-gray-500 mb-2">{{ app.developer }}</p>
                      <p class="text-gray-600 mb-3">{{ app.description }}</p>
                      <div class="flex items-center space-x-4 text-sm text-gray-500">
                        <div class="flex items-center">
                          <svg class="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                          {{ app.rating }} ({{ app.reviews }} 评价)
                        </div>
                        <div class="flex items-center">
                          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                          </svg>
                          {{ app.downloads }} 下载
                        </div>
                        <div>更新: {{ app.lastUpdate }}</div>
                      </div>
                    </div>
                  </div>
                  <div class="flex space-x-2 ml-4">
                    <button :class="[
                      'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                      app.installed ? 'bg-green-100 text-green-800' : 'bg-blue-600 text-white hover:bg-blue-700'
                    ]">
                      {{ app.installed ? '已安装' : '安装' }}
                    </button>
                    <button class="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                      详情
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 分页 -->
            <div class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <p class="text-sm text-gray-700">
                    显示 <span class="font-medium">1</span> 到 <span class="font-medium">10</span> 条，共 <span class="font-medium">45</span> 条记录
                  </p>
                </div>
                <div class="flex space-x-2">
                  <button class="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">上一页</button>
                  <button class="px-3 py-1 bg-blue-600 text-white rounded text-sm">1</button>
                  <button class="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">2</button>
                  <button class="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">3</button>
                  <button class="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">下一页</button>
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
  title: '应用商店 - CUZCUZAI',
  description: 'CUZCUZAI应用商店页面'
})

// 模拟数据
const featuredApps = ref([
  {
    id: 1,
    name: 'AI 设计助手',
    developer: 'DesignCorp',
    description: '使用AI技术快速生成专业的设计作品，提高设计效率',
    rating: 4.8,
    reviews: 1247,
    price: '¥99/月',
    installed: false,
    icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
    color: 'bg-purple-100 text-purple-600'
  },
  {
    id: 2,
    name: '社交媒体管理',
    developer: 'SocialTech',
    description: '一站式管理所有社交媒体账号，自动发布和数据分析',
    rating: 4.6,
    reviews: 856,
    price: '免费',
    installed: true,
    icon: 'M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84',
    color: 'bg-blue-100 text-blue-600'
  },
  {
    id: 3,
    name: '数据分析仪表板',
    developer: 'DataViz Pro',
    description: '强大的数据可视化工具，帮助您更好地理解业务数据',
    rating: 4.9,
    reviews: 2134,
    price: '¥199/月',
    installed: false,
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    color: 'bg-green-100 text-green-600'
  },
  {
    id: 4,
    name: '客户服务机器人',
    developer: 'ChatBot Inc',
    description: '智能客服机器人，24/7自动回复客户咨询',
    rating: 4.5,
    reviews: 678,
    price: '¥149/月',
    installed: true,
    icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
    color: 'bg-orange-100 text-orange-600'
  }
])

const categories = ref([
  {
    id: 1,
    name: '设计工具',
    count: 45,
    active: true,
    icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
  },
  {
    id: 2,
    name: '营销工具',
    count: 32,
    active: false,
    icon: 'M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z'
  },
  {
    id: 3,
    name: '数据分析',
    count: 28,
    active: false,
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
  },
  {
    id: 4,
    name: '客户服务',
    count: 19,
    active: false,
    icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
  },
  {
    id: 5,
    name: '财务管理',
    count: 15,
    active: false,
    icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  {
    id: 6,
    name: '项目管理',
    count: 22,
    active: false,
    icon: 'M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'
  }
])

const categoryApps = ref([
  {
    id: 1,
    name: 'Figma 插件集',
    developer: 'Figma Team',
    description: '扩展Figma功能的插件集合，包含颜色管理、图标库、原型工具等',
    rating: 4.8,
    reviews: 3247,
    price: '免费',
    downloads: '50K+',
    lastUpdate: '2024-03-10',
    installed: true,
    icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
    color: 'bg-purple-100 text-purple-600'
  },
  {
    id: 2,
    name: 'AI 图像生成器',
    developer: 'AI Creative',
    description: '使用最新的AI技术生成高质量的图像和插画，支持多种风格',
    rating: 4.6,
    reviews: 1856,
    price: '¥299/月',
    downloads: '25K+',
    lastUpdate: '2024-03-08',
    installed: false,
    icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
    color: 'bg-blue-100 text-blue-600'
  },
  {
    id: 3,
    name: '颜色调色板',
    developer: 'Color Studio',
    description: '专业的颜色管理工具，提供丰富的调色板和颜色搭配建议',
    rating: 4.7,
    reviews: 945,
    price: '¥99/月',
    downloads: '18K+',
    lastUpdate: '2024-03-05',
    installed: false,
    icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM7 3H5v12a2 2 0 002 2 2 2 0 002-2V3z',
    color: 'bg-green-100 text-green-600'
  },
  {
    id: 4,
    name: '字体管理器',
    developer: 'Typography Pro',
    description: '管理和预览字体的专业工具，支持字体配对和样式预览',
    rating: 4.5,
    reviews: 723,
    price: '免费',
    downloads: '32K+',
    lastUpdate: '2024-03-12',
    installed: true,
    icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4',
    color: 'bg-orange-100 text-orange-600'
  },
  {
    id: 5,
    name: '原型设计工具',
    developer: 'Proto Maker',
    description: '快速创建交互原型，支持动画效果和用户测试',
    rating: 4.9,
    reviews: 2134,
    price: '¥199/月',
    downloads: '42K+',
    lastUpdate: '2024-03-11',
    installed: false,
    icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4',
    color: 'bg-indigo-100 text-indigo-600'
  }
])
</script>