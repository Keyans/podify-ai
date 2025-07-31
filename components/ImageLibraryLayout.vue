<template>
  <div>
    <!-- 页面头部 -->
    <div class="bg-white shadow-sm border-b mb-6">
      <div class="px-6 py-4">
        <h1 class="text-2xl font-semibold text-gray-900">{{ title }}</h1>
        <p class="text-gray-600 mt-1">{{ description }}</p>
      </div>
    </div>

    <!-- 主要内容 -->
    <div class="px-6">
      <!-- 统计卡片 -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div v-for="(stat, index) in statistics" :key="index" class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full" :class="stat.iconBg">
              <component :is="stat.icon" class="w-6 h-6" :class="stat.iconColor" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">{{ stat.label }}</p>
              <p class="text-2xl font-semibold text-gray-900">{{ stat.value }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 工具栏 -->
      <div class="bg-white rounded-lg shadow mb-6">
        <div class="px-6 py-4">
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div class="flex space-x-4">
              <button 
                v-for="(action, index) in actions" 
                :key="index"
                :class="action.class"
                class="px-4 py-2 rounded-md flex items-center"
                @click="$emit('action', action.key)"
              >
                <component :is="action.icon" class="w-4 h-4 mr-2" />
                {{ action.label }}
              </button>
            </div>
            <div class="flex space-x-2">
              <select 
                class="border border-gray-300 rounded-md px-3 py-2 text-sm"
                @change="$emit('categoryChange', $event.target.value)"
              >
                <option value="">全部分类</option>
                <option v-for="category in categories" :key="category.value" :value="category.value">
                  {{ category.label }}
                </option>
              </select>
              <div class="relative">
                <input 
                  type="text" 
                  :placeholder="searchPlaceholder"
                  class="border border-gray-300 rounded-md pl-10 pr-4 py-2 text-sm"
                  @input="$emit('search', $event.target.value)"
                >
                <svg class="w-4 h-4 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 图片展示区域 -->
      <div class="bg-white rounded-lg shadow">
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold text-gray-900">{{ sectionTitle }}</h2>
            <button 
              class="text-sm font-medium hover:underline"
              :class="primaryColor"
              @click="$emit('viewAll')"
            >
              查看全部
            </button>
          </div>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <!-- 图片项 -->
            <div 
              v-for="(item, index) in images" 
              :key="index" 
              class="group relative bg-gray-100 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              @click="$emit('imageClick', item)"
            >
              <!-- 图片容器 -->
              <div class="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center relative">
                <img v-if="item.image" :src="item.image" :alt="item.title" class="w-full h-full object-cover">
                <div v-else class="w-full h-full flex items-center justify-center" :style="{ backgroundColor: item.bgColor || '#f3f4f6' }">
                  <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
                
                <!-- 状态标签 -->
                <div class="absolute top-2 left-2">
                  <span :class="getStatusClass(item.status)" class="px-2 py-1 text-xs font-medium rounded">
                    {{ item.status }}
                  </span>
                </div>
              </div>
              
              <!-- 悬停操作 -->
              <div class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                <button 
                  class="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100"
                  @click.stop="$emit('imageAction', { action: 'view', item })"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                </button>
                <button 
                  class="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100"
                  @click.stop="$emit('imageAction', { action: 'download', item })"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </button>
                <button 
                  class="bg-white text-red-600 p-2 rounded-full hover:bg-gray-100"
                  @click.stop="$emit('imageAction', { action: 'delete', item })"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </div>
              
              <!-- 图片信息 -->
              <div class="p-3 bg-white">
                <p class="text-sm font-medium text-gray-900 truncate">{{ item.title }}</p>
                <p class="text-xs text-gray-500 mt-1">{{ item.size }} • {{ item.date }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 分页 -->
        <div class="px-6 py-4 border-t border-gray-200">
          <div class="flex items-center justify-between">
            <div class="text-sm text-gray-700">
              显示 {{ pagination.start }}-{{ pagination.end }} 共 {{ pagination.total }} {{ pagination.unit }}
            </div>
            <div class="flex space-x-2">
              <button 
                class="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50"
                :disabled="pagination.currentPage === 1"
                @click="$emit('pageChange', pagination.currentPage - 1)"
              >
                上一页
              </button>
              <button 
                v-for="page in visiblePages" 
                :key="page"
                :class="[
                  'px-3 py-1 rounded text-sm',
                  page === pagination.currentPage 
                    ? `${primaryBgColor} text-white` 
                    : 'border border-gray-300 hover:bg-gray-50'
                ]"
                @click="$emit('pageChange', page)"
              >
                {{ page }}
              </button>
              <button 
                class="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50"
                :disabled="pagination.currentPage === pagination.totalPages"
                @click="$emit('pageChange', pagination.currentPage + 1)"
              >
                下一页
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// Props
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  statistics: {
    type: Array,
    required: true
  },
  actions: {
    type: Array,
    required: true
  },
  categories: {
    type: Array,
    default: () => []
  },
  searchPlaceholder: {
    type: String,
    default: '搜索...'
  },
  sectionTitle: {
    type: String,
    required: true
  },
  images: {
    type: Array,
    required: true
  },
  pagination: {
    type: Object,
    required: true
  },
  statusConfig: {
    type: Object,
    default: () => ({})
  },
  primaryColor: {
    type: String,
    default: 'text-blue-600 hover:text-blue-700'
  },
  primaryBgColor: {
    type: String,
    default: 'bg-blue-600'
  }
})

// Emits
defineEmits([
  'action',
  'categoryChange', 
  'search',
  'viewAll',
  'imageClick',
  'imageAction',
  'pageChange'
])

// 计算可见页码
const visiblePages = computed(() => {
  const { currentPage, totalPages } = props.pagination
  const pages = []
  const maxVisible = 3
  
  let start = Math.max(1, currentPage - Math.floor(maxVisible / 2))
  let end = Math.min(totalPages, start + maxVisible - 1)
  
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1)
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

// 获取状态样式
const getStatusClass = (status) => {
  const defaultConfig = {
    '已处理': 'bg-green-100 text-green-800',
    '处理中': 'bg-blue-100 text-blue-800',
    '待处理': 'bg-yellow-100 text-yellow-800',
    '处理失败': 'bg-red-100 text-red-800',
    '免费': 'bg-green-100 text-green-800',
    '精选': 'bg-purple-100 text-purple-800',
    '热门': 'bg-red-100 text-red-800',
    '新品': 'bg-blue-100 text-blue-800'
  }
  
  const config = { ...defaultConfig, ...props.statusConfig }
  return config[status] || 'bg-gray-100 text-gray-800'
}
</script>