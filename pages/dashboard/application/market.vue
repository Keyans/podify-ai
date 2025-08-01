<template>
  <div class="flex flex-col h-screen bg-dark-bg">
    <!-- 顶部区域 - 页面标题 + 统计卡片 + 分类tab -->
    <div class="p-6 space-y-6">
      <!-- 页面标题和操作按钮 -->
      <div class="flex items-center justify-between">
  <div>
          <h1 class="text-2xl font-bold text-dark-text mb-2">应用市场</h1>
          <p class="text-dark-text-secondary text-sm">安装、管理和使用各种AI工具应用</p>
        </div>
        <div class="flex items-center space-x-3">
          <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4-4m0 0L8 8m4-4v12"></path>
            </svg>
            <span>我的应用</span>
          </button>
          <button class="bg-dark-input hover:bg-dark-hover text-dark-text px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors border border-dark-border">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <span>应用设置</span>
          </button>
        </div>
      </div>

      <!-- 统计卡片 -->
      <div class="grid grid-cols-4 gap-6">
        <!-- 已安装应用 -->
        <div class="bg-dark-card rounded-lg p-6 border border-dark-border">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-dark-text-secondary text-sm">已安装应用</p>
              <p class="text-dark-text text-2xl font-bold">{{ stats.installedApps }}</p>
            </div>
            <div class="bg-blue-600 bg-opacity-20 p-3 rounded-lg">
              <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
              </svg>
        </div>
      </div>
    </div>

        <!-- 可用应用 -->
        <div class="bg-dark-card rounded-lg p-6 border border-dark-border">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-dark-text-secondary text-sm">可用应用</p>
              <p class="text-dark-text text-2xl font-bold">{{ stats.availableApps }}</p>
            </div>
            <div class="bg-green-600 bg-opacity-20 p-3 rounded-lg">
              <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
            </div>
          </div>
    </div>

        <!-- 今日更新 -->
        <div class="bg-dark-card rounded-lg p-6 border border-dark-border">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-dark-text-secondary text-sm">今日更新</p>
              <p class="text-dark-text text-2xl font-bold">{{ stats.todayUpdates }}</p>
            </div>
            <div class="bg-purple-600 bg-opacity-20 p-3 rounded-lg">
              <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path>
              </svg>
            </div>
      </div>
    </div>

        <!-- 热门应用 -->
        <div class="bg-dark-card rounded-lg p-6 border border-dark-border">
          <div class="flex items-center justify-between">
          <div>
              <p class="text-dark-text-secondary text-sm">热门应用</p>
              <p class="text-dark-text text-2xl font-bold">{{ stats.popularApps }}</p>
            </div>
            <div class="bg-orange-600 bg-opacity-20 p-3 rounded-lg">
              <svg class="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- 分类Tab和搜索栏 -->
      <div class="bg-dark-card rounded-lg p-4 border border-dark-border space-y-4">
        <!-- 分类标签 -->
        <div class="flex flex-wrap items-center gap-3">
          <button 
            v-for="category in categories"
            :key="category.id"
            @click="selectCategory(category.id)"
            :class="selectedCategory === category.id ? 'bg-blue-600 text-white' : 'bg-dark-input text-dark-text-secondary hover:text-dark-text'"
            class="px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-dark-border hover:border-dark-text-secondary"
          >
            <span class="mr-2">{{ category.icon }}</span>
            {{ category.name }}
          </button>
        </div>

        <!-- 搜索和筛选 -->
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4 flex-1">
            <!-- 搜索框 -->
            <div class="relative flex-1 max-w-md">
              <input 
                type="text" 
                v-model="searchQuery"
                placeholder="搜索应用名称、描述或标签..."
                class="w-full bg-dark-input border border-dark-border rounded-lg pl-10 pr-4 py-2 text-dark-text placeholder-dark-text-tertiary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg class="w-5 h-5 text-dark-text-tertiary absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>

            <!-- 筛选选项 -->
            <div class="flex items-center space-x-3">
              <select v-model="filterPrice" class="bg-dark-input border border-dark-border rounded-lg px-3 py-2 text-dark-text text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">全部价格</option>
                <option value="免费">免费</option>
                <option value="充值">充值</option>
                <option value="订阅">订阅</option>
              </select>

              <select v-model="filterRating" class="bg-dark-input border border-dark-border rounded-lg px-3 py-2 text-dark-text text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">全部评分</option>
                <option value="4.5">4.5+ 星</option>
                <option value="4.0">4.0+ 星</option>
                <option value="3.5">3.5+ 星</option>
              </select>

              <select v-model="sortBy" class="bg-dark-input border border-dark-border rounded-lg px-3 py-2 text-dark-text text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="featured">推荐排序</option>
                <option value="rating">评分排序</option>
                <option value="downloads">下载量</option>
                <option value="newest">最新发布</option>
              </select>

              <button 
                @click="clearFilters"
                class="px-4 py-2 bg-dark-hover hover:bg-dark-border text-dark-text-secondary hover:text-dark-text rounded-lg transition-colors border border-dark-border"
              >
                清除筛选
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 应用网格区域 -->
    <div class="flex-1 px-6 pb-6 overflow-auto">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div 
          v-for="app in filteredApps" 
          :key="app.id" 
          class="bg-dark-card rounded-lg border border-dark-border p-6 hover:border-blue-500 transition-all duration-200 group"
        >
          <!-- 应用头部 -->
          <div class="flex items-start space-x-4 mb-4">
            <div class="w-12 h-12 rounded-lg overflow-hidden bg-dark-input flex-shrink-0">
              <img 
                :src="app.icon" 
                :alt="app.name"
                class="w-full h-full object-cover"
                @error="handleImageError"
              />
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="text-dark-text font-semibold text-lg line-clamp-1">{{ app.name }}</h3>
              <p class="text-dark-text-secondary text-sm">{{ app.author }}</p>
              <div class="flex items-center mt-1">
                <div class="flex items-center">
                  <svg v-for="i in 5" :key="i" class="w-3 h-3" :class="i <= Math.floor(app.rating) ? 'text-yellow-400' : 'text-dark-border'" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                </div>
                <span class="text-dark-text text-sm font-medium ml-1">{{ app.rating }}</span>
                <span class="text-dark-text-tertiary text-xs ml-1">({{ app.reviews }})</span>
              </div>
            </div>
          </div>

          <!-- 应用描述 -->
          <p class="text-dark-text-secondary text-sm mb-4 line-clamp-3">{{ app.desc }}</p>

          <!-- 标签 -->
          <div class="flex flex-wrap gap-2 mb-4">
            <span 
              v-for="tag in app.tags.slice(0, 3)" 
              :key="tag" 
              class="px-2 py-1 bg-dark-input text-dark-text-secondary text-xs rounded-lg border border-dark-border"
            >
              {{ tag }}
            </span>
            <span 
              v-if="app.tags.length > 3"
              class="px-2 py-1 bg-dark-input text-dark-text-tertiary text-xs rounded-lg border border-dark-border"
            >
              +{{ app.tags.length - 3 }}
            </span>
          </div>

          <!-- 价格和操作按钮 -->
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <span 
                  :class="getPriceClass(app.price)"
                  class="font-bold text-base"
                >
                  {{ getPriceText(app.price) }}
                </span>
                <span 
                  v-if="app.originalPrice && app.price !== '免费'"
                  class="text-dark-text-tertiary text-sm line-through"
                >
                  {{ app.originalPrice }}
                </span>
              </div>
              <div class="flex items-center space-x-1 text-dark-text-tertiary text-xs">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
                <span>{{ app.downloads }}</span>
              </div>
            </div>

            <button 
              @click="handleAppAction(app)"
              :class="getButtonClass(app)"
              class="w-full py-2.5 rounded-lg font-semibold transition-all duration-200 group-hover:scale-[1.02]"
            >
              {{ getButtonText(app) }}
            </button>
          </div>
        </div>
      </div>

      <!-- 加载更多 -->
      <div class="flex justify-center mt-8" v-if="hasMore">
        <button 
          @click="loadMore"
          class="px-6 py-3 bg-dark-card hover:bg-dark-hover text-dark-text border border-dark-border rounded-lg transition-colors"
        >
          <span v-if="!loading">加载更多应用</span>
          <span v-else class="flex items-center space-x-2">
            <svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>加载中...</span>
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// 使用 dashboard 布局
definePageMeta({
  layout: 'dashboard'
})

useHead({
  title: '应用市场 - PodifyAi',
  meta: [
    { name: 'description', content: 'PodifyAi 应用市场页面' }
  ]
})

// 响应式数据
const selectedCategory = ref('all')
const searchQuery = ref('')
const filterPrice = ref('')
const filterRating = ref('')
const sortBy = ref('featured')
const loading = ref(false)
const hasMore = ref(true)

// 统计数据
const stats = ref({
  installedApps: '12',
  availableApps: '48',
  todayUpdates: '3',
  popularApps: '8'
})

// 分类数据
const categories = ref([
  { id: 'all', name: '全部应用', icon: '🎯' },
  { id: 'collect', name: '智能采集', icon: '🛒' },
  { id: 'process', name: '商品处理', icon: '✂️' },
  { id: 'analysis', name: '数据分析', icon: '📊' },
  { id: 'seo', name: 'SEO工具', icon: '🔍' },
  { id: 'marketing', name: '营销工具', icon: '📢' },
  { id: 'management', name: '管理工具', icon: '⚙️' },
  { id: 'automation', name: '自动化工具', icon: '🤖' },
  { id: 'content', name: '内容创作', icon: '✍️' }
])

// 应用数据
const apps = ref([
  {
    id: 1,
    icon: '/api/placeholder/48/48',
    name: '商品采集',
    author: 'RiinAi团队',
    rating: 4.9,
    reviews: '2,071',
    desc: '智能采集商品并导入各平台商品，支持Amazon、Temu、Shein等主流平台',
    tags: ['智能采集', '多平台', '自动化', 'Amazon', 'Temu', 'Shein'],
    price: '免费',
    originalPrice: null,
    downloads: '10K+',
    category: 'collect',
    installed: true,
    featured: true
  },
  {
    id: 2,
    icon: '/api/placeholder/48/48',
    name: '智能裁图',
    author: 'RiinAi团队',
    rating: 4.8,
    reviews: '2,271',
    desc: 'AI智能裁剪图片，批量处理图片素材，自动识别内容，支持多种裁剪比例',
    tags: ['图片处理', 'AI', '批量', '裁剪'],
    price: '免费',
    originalPrice: null,
    downloads: '8.5K+',
    category: 'process',
    installed: true,
    featured: true
  },
  {
    id: 3,
    icon: '/api/placeholder/48/48',
    name: '一键抠图',
    author: 'RiinAi团队',
    rating: 4.9,
    reviews: '1,675',
    desc: '一键智能抠图，批量管理，处理高效，超好用的抠图工具',
    tags: ['抠图', 'AI', '批量', '智能'],
    price: '充值',
    originalPrice: '¥29.9/月',
    downloads: '15K+',
    category: 'process',
    installed: false,
    featured: true
  },
  {
    id: 4,
    icon: '/api/placeholder/48/48',
    name: '智能裂变工具',
    author: 'RiinAi团队',
    rating: 4.7,
    reviews: '1,075',
    desc: '智能裂变工具，安全、快速管理，支持多种模式和数据分析',
    tags: ['裂变', '数据分析', '营销', '安全'],
    price: '¥199/月',
    originalPrice: '¥299/月',
    downloads: '5.2K+',
    category: 'marketing',
    installed: true,
    featured: true
  },
  {
    id: 5,
    icon: '/api/placeholder/48/48',
    name: '标题生成',
    author: 'RiinAi团队',
    rating: 4.6,
    reviews: '3,471',
    desc: 'AI根据商品图片/关键词，智能生成标题和优化标题',
    tags: ['AI', '标题', '优化', 'SEO'],
    price: '充值',
    originalPrice: null,
    downloads: '12K+',
    category: 'content',
    installed: false,
    featured: false
  },
  {
    id: 6,
    icon: '/api/placeholder/48/48',
    name: 'POD合成',
    author: 'RiinAi团队',
    rating: 4.8,
    reviews: '2,011',
    desc: 'AI智能合成商品图片，批量生成POD商品素材，支持多种模板和样式',
    tags: ['POD', 'AI', '合成', '模板'],
    price: '¥89/月',
    originalPrice: '¥129/月',
    downloads: '6.8K+',
    category: 'process',
    installed: false,
    featured: true
  },
  {
    id: 7,
    icon: '/api/placeholder/48/48',
    name: '批量刊登',
    author: 'RiinAi团队',
    rating: 4.4,
    reviews: '1,687',
    desc: '支持多平台商品批量刊登，支持多种刊登方式和AI标题优化',
    tags: ['批量', '多平台', 'AI', '刊登'],
    price: '¥159/月',
    originalPrice: '¥199/月',
    downloads: '4.3K+',
    category: 'management',
    installed: false,
    featured: false
  },
  {
    id: 8,
    icon: '/api/placeholder/48/48',
    name: '价格监控',
    author: '第三方开发者',
    rating: 4.2,
    reviews: '2,099',
    desc: '实时监控商品价格变动，支持多平台价格监控和智能提醒',
    tags: ['价格', '监控', '多平台', '提醒'],
    price: '免费',
    originalPrice: null,
    downloads: '9.1K+',
    category: 'analysis',
    installed: false,
    featured: false
  }
])

// 计算属性
const filteredApps = computed(() => {
  let filtered = apps.value

  // 按分类筛选
  if (selectedCategory.value !== 'all') {
    filtered = filtered.filter(app => app.category === selectedCategory.value)
  }

  // 按价格筛选
  if (filterPrice.value) {
    filtered = filtered.filter(app => {
      if (filterPrice.value === '免费') return app.price === '免费'
      if (filterPrice.value === '充值') return app.price === '充值'
      if (filterPrice.value === '订阅') return app.price.includes('月')
      return true
    })
  }

  // 按评分筛选
  if (filterRating.value) {
    const minRating = parseFloat(filterRating.value)
    filtered = filtered.filter(app => app.rating >= minRating)
  }

  // 按搜索关键词筛选
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(app => 
      app.name.toLowerCase().includes(query) ||
      app.desc.toLowerCase().includes(query) ||
      app.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }

  // 排序
  if (sortBy.value === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating)
  } else if (sortBy.value === 'downloads') {
    filtered.sort((a, b) => parseFloat(b.downloads) - parseFloat(a.downloads))
  } else if (sortBy.value === 'featured') {
    filtered.sort((a, b) => b.featured - a.featured)
  }

  return filtered
})

// 方法
const selectCategory = (categoryId) => {
  selectedCategory.value = categoryId
}

const clearFilters = () => {
  searchQuery.value = ''
  filterPrice.value = ''
  filterRating.value = ''
  sortBy.value = 'featured'
  selectedCategory.value = 'all'
}

const getPriceClass = (price) => {
  if (price === '免费') return 'text-green-400'
  if (price === '充值') return 'text-blue-400'
  if (price.includes('月')) return 'text-purple-400'
  return 'text-dark-text'
}

const getPriceText = (price) => {
  return price
}

const getButtonClass = (app) => {
  if (app.installed) {
    return 'bg-green-600 hover:bg-green-700 text-white'
  }
  if (app.price === '免费') {
    return 'bg-blue-600 hover:bg-blue-700 text-white'
  }
  if (app.price === '充值') {
    return 'bg-blue-500 hover:bg-blue-600 text-white'
  }
  return 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white'
}

const getButtonText = (app) => {
  if (app.installed) return '已安装'
  if (app.price === '免费') return '安装'
  if (app.price === '充值') return '充值使用'
  return '订阅'
}

const handleAppAction = (app) => {
  if (app.installed) {
    console.log('打开应用:', app.name)
  } else {
    console.log('安装应用:', app.name)
    // 模拟安装
    app.installed = true
  }
}

const handleImageError = (event) => {
  event.target.src = '/api/placeholder/48/48'
}

const loadMore = () => {
  loading.value = true
  // 模拟加载
  setTimeout(() => {
    loading.value = false
    hasMore.value = false
  }, 1000)
}

onMounted(() => {
  console.log('应用市场页面已加载')
})
</script> 

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 