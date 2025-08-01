<template>
  <div class="flex flex-col h-full">
    <!-- 自定义搜索栏区域 - 允许各页面插入自己的搜索栏设计 -->
    <div v-if="$slots['custom-filters']" class="flex-shrink-0 mb-4">
      <slot name="custom-filters"></slot>
      </div>

    <!-- 默认过滤器栏 - 仅在没有自定义搜索栏时显示 -->
    <div v-else class="flex-shrink-0 mb-4 p-4 rounded-lg border border-dark-border bg-dark-card">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <!-- 过滤器 -->
        <div class="relative">
            <select 
              v-model="filters.status" 
              @change="handleFilterChange"
              class="appearance-none px-4 py-2 pr-8 rounded-lg border text-sm"
            :style="{
              backgroundColor: 'var(--bg-tertiary)',
              color: 'var(--text-primary)',
              borderColor: 'var(--border-color)'
            }"
            >
              <option value="all">全部状态</option>
              <option value="waiting">等待中</option>
              <option value="processing">处理中</option>
              <option value="completed">已完成</option>
              <option value="failed">失败</option>
          </select>
            <svg class="absolute right-2 top-3 w-4 h-4 pointer-events-none" :style="{ color: 'var(--text-secondary)' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
        </div>

          <div class="relative">
            <select 
              v-model="filters.date"
              @change="handleFilterChange"
              class="appearance-none px-4 py-2 pr-8 rounded-lg border text-sm"
            :style="{
              backgroundColor: 'var(--bg-tertiary)',
                color: 'var(--text-primary)',
                borderColor: 'var(--border-color)'
              }"
            >
              <option value="all">全部时间</option>
              <option value="today">今天</option>
              <option value="week">本周</option>
              <option value="month">本月</option>
            </select>
            <svg class="absolute right-2 top-3 w-4 h-4 pointer-events-none" :style="{ color: 'var(--text-secondary)' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
        </div>

          <!-- 搜索框 -->
        <div class="relative">
          <input 
              type="text" 
            v-model="filters.search"
              @input="handleFilterChange"
              placeholder="搜索任务ID"
              class="pl-10 pr-4 py-2 rounded-lg border text-sm"
            :style="{
              backgroundColor: 'var(--bg-tertiary)',
              color: 'var(--text-primary)',
              borderColor: 'var(--border-color)'
            }"
            >
            <svg class="absolute left-3 top-3 w-4 h-4" :style="{ color: 'var(--text-secondary)' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>

        <div class="flex items-center space-x-3">
        <button 
            v-if="showNewButton"
            @click="handleNewTask"
            class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center text-sm"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            {{ newButtonText }}
        </button>

        <slot name="extra-buttons"></slot>
        </div>
      </div>
    </div>

    <!-- 大数据量性能提示 -->
    <div 
      v-if="totalItems > 1000 && !props.virtualScroll" 
      class="flex-shrink-0 mb-4 p-3 rounded-lg border-l-4"
      :style="{ 
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        borderLeftColor: '#f59e0b',
        color: 'var(--text-primary)'
      }"
    >
      <div class="flex items-center">
        <svg class="w-5 h-5 mr-2" :style="{ color: '#f59e0b' }" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
        </svg>
        <div>
          <p class="font-medium">性能提示</p>
          <p class="text-sm mt-1" :style="{ color: 'var(--text-secondary)' }">
            当前数据量较大（{{ totalItems }} 条），建议启用服务端分页以获得更好的性能体验。
          </p>
        </div>
      </div>
    </div>

    <!-- 数据表格区域 - 精确计算高度 -->
    <div class="flex-1 min-h-0 flex flex-col rounded-lg border overflow-hidden" :style="{ borderColor: 'var(--border-color)' }">
      <!-- 表格头部 - 固定高度 -->
      <div class="flex-shrink-0" :style="{ backgroundColor: 'var(--bg-tertiary)' }">
        <table class="w-full">
          <thead>
          <tr>
            <th class="px-6 py-3 text-left" :style="{ color: 'var(--text-secondary)' }">
              <input type="checkbox" class="rounded border-gray-300" v-model="selectAll" @change="toggleSelectAll">
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" :style="{ color: 'var(--text-secondary)' }">{{ idLabel }}ID</th>
            <th v-if="showType" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" :style="{ color: 'var(--text-secondary)' }">{{ typeLabel }}类型</th>
            <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" :style="{ color: 'var(--text-secondary)' }">{{ quantityLabel }}数量</th>
            <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" :style="{ color: 'var(--text-secondary)' }">{{ statusLabel }}状态</th>
            <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" :style="{ color: 'var(--text-secondary)' }">创建人</th>
            <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" :style="{ color: 'var(--text-secondary)' }">创建时间</th>
            <th class="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider" :style="{ color: 'var(--text-secondary)' }">操作</th>
          </tr>
        </thead>
        </table>
      </div>
      
      <!-- 表格内容区域 - 精确自适应高度，确保内部滚动 -->
      <div class="flex-1 min-h-0 overflow-auto" :style="{ backgroundColor: 'var(--bg-secondary)' }">
        <table class="w-full">
        <tbody class="divide-y" :style="{ 
          backgroundColor: 'var(--bg-secondary)',
          borderColor: 'var(--border-color)'
        }">
          <tr 
            v-for="(item, index) in paginatedData" 
              :key="item.id"
            class="hover:bg-opacity-50" 
            :style="{ backgroundColor: 'var(--bg-secondary)' }"
          >
            <td class="px-6 py-4">
              <input type="checkbox" class="rounded border-gray-300" v-model="selectedItems" :value="item.id">
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm" :style="{ color: 'var(--text-primary)' }">
              {{ item.id }}
            </td>
            <td v-if="showType" class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <span class="text-sm" :style="{ color: 'var(--text-primary)' }">{{ getTypeText(item) }}</span>
                <span 
                  v-if="item.platform" 
                  class="ml-2 px-2 py-1 text-xs rounded"
                  :style="{ 
                    backgroundColor: getPlatformBgColor(item.platform),
                    color: 'white'
                  }"
                >
                  {{ item.platform }}
                </span>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div>
                <div class="flex items-center justify-between mb-1">
                  <span class="text-xs" :style="{ color: 'var(--text-secondary)' }">目标：{{ getTargetCount(item) }}</span>
                  <span class="text-xs" :style="{ color: getProgressColor(item) }">{{ getSuccessCount(item) }}</span>
                </div>
                <div class="w-full h-1 rounded-full" :style="{ backgroundColor: 'var(--bg-tertiary)' }">
                  <div class="h-1 rounded-full" :style="{
                    width: getProgressPercentage(item) + '%',
                    backgroundColor: getProgressColor(item)
                  }"></div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span 
                  class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                  :class="getStatusClass(item)"
                >
                  {{ getStatusText(item) }}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm" :style="{ color: 'var(--text-primary)' }">
                {{ item.创建人 || item.creator || '-' }}
            </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm" :style="{ color: 'var(--text-secondary)' }">
                {{ item.创建时间 || item.createdAt || '-' }}
            </td>
              <td class="px-6 py-4 whitespace-nowrap text-center text-sm">
                <div class="flex items-center justify-center space-x-2">
              <button 
                    @click="handleView(item)"
                    class="text-blue-600 hover:text-blue-700 font-medium"
              >
                查看详情
              </button>
                  <span class="text-gray-300">|</span>
                <button 
                    @click="handleDelete(item)"
                    class="text-red-600 hover:text-red-700 font-medium"
                >
                    删除
                </button>
              </div>
            </td>
          </tr>
          
            <!-- 无数据时的占位内容 - 使用最小高度确保填充 -->
          <tr v-if="filteredData.length === 0">
              <td :colspan="showType ? 8 : 7" class="px-6 py-20">
                <div class="flex flex-col items-center justify-center text-center" :style="{ color: 'var(--text-secondary)', minHeight: '300px' }">
                  <svg class="w-16 h-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                  <p class="text-lg font-medium mb-2">暂无数据</p>
                  <p class="text-sm opacity-75">还没有任何任务记录</p>
                </div>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
      
      <!-- 分页区域 - 固定高度 -->
      <div class="flex-shrink-0 px-6 py-4 flex items-center justify-between border-t" :style="{ 
        borderColor: 'var(--border-color)',
        backgroundColor: 'var(--bg-secondary)'
      }">
        <div class="flex items-center space-x-4">
          <div class="text-sm" :style="{ color: 'var(--text-secondary)' }">
            共 {{ totalItems }} 条记录
          </div>
          <!-- 每页显示数量选择 -->
          <div class="flex items-center space-x-2">
            <span class="text-sm" :style="{ color: 'var(--text-secondary)' }">每页显示</span>
            <select 
              v-model="pagination.pageSize"
              @change="handlePageSizeChange"
              class="px-2 py-1 text-sm rounded border"
              :style="{
                backgroundColor: 'var(--bg-tertiary)',
                color: 'var(--text-primary)',
                borderColor: 'var(--border-color)'
              }"
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <span class="text-sm" :style="{ color: 'var(--text-secondary)' }">条</span>
          </div>
        </div>
        
        <div class="flex items-center space-x-2">
          <!-- 首页 -->
          <button 
            @click="goToPage(1)"
            :disabled="pagination.currentPage === 1"
            class="px-3 py-1.5 text-sm rounded border disabled:opacity-50 disabled:cursor-not-allowed"
            :style="{
              backgroundColor: 'var(--bg-tertiary)',
              color: 'var(--text-primary)',
              borderColor: 'var(--border-color)'
            }"
          >
            首页
          </button>
          
          <!-- 上一页 -->
          <button 
            @click="goToPage(pagination.currentPage - 1)"
            :disabled="pagination.currentPage === 1"
            class="px-3 py-1.5 text-sm rounded border disabled:opacity-50 disabled:cursor-not-allowed"
            :style="{
              backgroundColor: 'var(--bg-tertiary)',
              color: 'var(--text-primary)',
              borderColor: 'var(--border-color)'
            }"
          >
            上一页
          </button>

          <!-- 页码 -->
          <span class="px-3 py-1.5 text-sm rounded border bg-blue-600 text-white">
            {{ pagination.currentPage }}
          </span>

          <!-- 下一页 -->
          <button 
            @click="goToPage(pagination.currentPage + 1)"
            :disabled="pagination.currentPage >= totalPages"
            class="px-3 py-1.5 text-sm rounded border disabled:opacity-50 disabled:cursor-not-allowed"
            :style="{ 
              backgroundColor: 'var(--bg-tertiary)',
              color: 'var(--text-primary)',
              borderColor: 'var(--border-color)'
            }"
          >
            下一页
          </button>
          
          <!-- 末页 -->
          <button 
            @click="goToPage(totalPages)"
            :disabled="pagination.currentPage >= totalPages"
            class="px-3 py-1.5 text-sm rounded border disabled:opacity-50 disabled:cursor-not-allowed"
            :style="{ 
              backgroundColor: 'var(--bg-tertiary)',
              color: 'var(--text-primary)',
              borderColor: 'var(--border-color)'
            }"
          >
            末页
          </button>
          
          <!-- 跳转 -->
          <div class="flex items-center space-x-2 ml-4">
            <span class="text-sm" :style="{ color: 'var(--text-secondary)' }">跳转</span>
            <input 
              type="number" 
              v-model="jumpPage"
              @keyup.enter="handleJumpPage"
              class="w-16 px-2 py-1 text-sm rounded border text-center"
              :style="{
                backgroundColor: 'var(--bg-tertiary)',
                color: 'var(--text-primary)',
                borderColor: 'var(--border-color)'
              }"
              min="1"
              :max="totalPages"
            >
            <span class="text-sm" :style="{ color: 'var(--text-secondary)' }">页</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

// 定义props和emits
const props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  },
  // 任务类型相关标签
  idLabel: {
    type: String,
    default: '任务'
  },
  typeLabel: {
    type: String,
    default: '任务'
  },
  quantityLabel: {
    type: String,
    default: '任务'
  },
  statusLabel: {
    type: String,
    default: '任务'
  },
  newButtonText: {
    type: String,
    default: '新建任务'
  },
  // 是否显示新建按钮
  showNewButton: {
    type: Boolean,
    default: true
  },
  // 是否显示类型列
  showType: {
    type: Boolean,
    default: true
  },
  // 虚拟滚动配置
  virtualScroll: {
    type: Boolean,
    default: false
  },
  // 每页显示数量
  pageSize: {
    type: Number,
    default: 10
  },
  // 总数据量 (用于虚拟滚动)
  totalItems: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['view', 'delete', 'page-change', 'filter-change', 'newTask'])

// 选中项
const selectAll = ref(false)
const selectedItems = ref([])

// 过滤器状态
const filters = ref({
  status: 'all',
  date: 'all',
  search: ''
})

// 分页状态 - 使用props中的配置
const pagination = ref({
  currentPage: 1,
  pageSize: props.pageSize || 10
})

// 监听props变化，更新分页配置
watch(() => props.pageSize, (newPageSize) => {
  if (newPageSize) {
    pagination.value.pageSize = newPageSize
  }
}, { immediate: true })

// 根据筛选条件过滤数据
const filteredData = computed(() => {
  let result = [...props.data]
  
  // 按状态筛选
  if (filters.value.status !== 'all') {
    result = result.filter(item => getStatus(item) === filters.value.status)
  }
  
  // 按ID搜索
  if (filters.value.search) {
    const searchLower = filters.value.search.toLowerCase()
    result = result.filter(item => {
      return item.id.toLowerCase().includes(searchLower)
    })
  }
  
  return result
})

// 计算分页后的数据 - 支持服务端分页
const paginatedData = computed(() => {
  // 如果使用服务端分页（totalItems > 0），直接返回传入的数据
  if (props.totalItems > 0) {
    return filteredData.value
  }
  
  // 否则使用客户端分页
  const startIndex = (pagination.value.currentPage - 1) * pagination.value.pageSize
  const endIndex = startIndex + pagination.value.pageSize
  return filteredData.value.slice(startIndex, endIndex)
})

// 总记录数 - 优先使用props传入的总数（用于服务端分页）
const totalItems = computed(() => {
  return props.totalItems > 0 ? props.totalItems : filteredData.value.length
})

// 总页数
const totalPages = computed(() => {
  return Math.max(1, Math.ceil(totalItems.value / pagination.value.pageSize))
})

// 可见页码 - 智能分页显示
const visiblePages = computed(() => {
  const total = totalPages.value
  const current = pagination.value.currentPage
  const pages = []
  
  if (total <= 5) {
    // 总页数少于等于5页，显示所有页码
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    // 总页数大于5页，智能显示
    if (current <= 3) {
      // 当前页在前3页，显示前5页
      for (let i = 1; i <= 5; i++) {
        pages.push(i)
      }
    } else if (current >= total - 2) {
      // 当前页在后3页，显示后5页
      for (let i = total - 4; i <= total; i++) {
        pages.push(i)
      }
    } else {
      // 当前页在中间，显示当前页前后各2页
      for (let i = current - 2; i <= current + 2; i++) {
        pages.push(i)
      }
    }
  }
  
  return pages
})

// 获取类型文本
const getTypeText = (item) => {
  // 处理采集类型
  if (item.type) {
    const typeMap = {
      '商品链接': '商品',
      '店铺链接': '店铺',
      '搜索采集': '搜索',
      '采集插件': '插件'
    }
    return typeMap[item.type] || item.type
  }
  
  // 处理裁图类型
  if (item.裁图类型) {
    return item.裁图类型
  }
  
  return '默认'
}

// 获取平台背景色
const getPlatformBgColor = (platform) => {
  if (platform.includes('亚马逊')) return '#232f3e'
  if (platform === 'TEMU') return '#eb2f96'
  if (platform === 'Shein') return '#333333'
  if (platform === '本地') return '#73d13d'
  return '#333333'
}

// 获取目标数量
const getTargetCount = (item) => {
  return item.targetCount || item.目标 || 100
}

// 获取成功数量
const getSuccessCount = (item) => {
  return item.successCount || item.成功 || 0
}

// 获取状态
const getStatus = (item) => {
  // 处理英文状态
  if (item.status) {
    return item.status
  }
  
  // 处理中文状态
  if (item.任务状态) {
    const statusMap = {
      '进行中': 'processing',
      '已完成': 'completed',
      '失败': 'failed',
      '部分失败': 'partial-failed'
    }
    return statusMap[item.任务状态] || 'processing'
  }
  
  return 'processing'
}

// 获取状态文本
const getStatusText = (item) => {
  // 处理中文状态
  if (item.任务状态) {
    return item.任务状态
  }
  
  // 处理英文状态
  const statusMap = {
    'processing': '进行中',
    'completed': '已完成',
    'failed': '失败',
    'partial-failed': '部分失败'
  }
  return statusMap[getStatus(item)] || '进行中'
}

// 获取状态背景色
const getStatusBgColor = (item) => {
  const status = getStatus(item)
  const statusBgColors = {
    'processing': 'rgba(53, 122, 232, 0.9)',
    'completed': 'rgba(39, 174, 96, 0.9)',
    'failed': 'rgba(235, 87, 87, 0.9)',
    'partial-failed': 'rgba(245, 158, 11, 0.9)'
  }
  return statusBgColors[status] || '#333333'
}

// 获取进度百分比
const getProgressPercentage = (item) => {
  const target = parseInt(getTargetCount(item))
  const success = parseInt(getSuccessCount(item))
  
  if (target === 0) return 0
  return Math.round((success / target) * 100)
}

// 获取进度条颜色
const getProgressColor = (item) => {
  const status = getStatus(item)
  const colors = {
    'processing': 'rgb(53, 122, 232)',
    'completed': 'rgb(39, 174, 96)',
    'failed': 'rgb(235, 87, 87)',
    'partial-failed': 'rgb(245, 158, 11)'
  }
  return colors[status] || 'var(--accent-color)'
}

// 获取创建人
const getCreator = (item) => {
  return item.creator || item.创建人 || 'admin'
}

// 获取创建时间
const getCreatedTime = (item) => {
  return item.createdAt || item.创建时间 || '-'
}

// 表格操作
const toggleSelectAll = () => {
  if (selectAll.value) {
    selectedItems.value = paginatedData.value.map(item => item.id)
  } else {
    selectedItems.value = []
  }
}

// 监听选中项变化
watch(selectedItems, (newVal) => {
  selectAll.value = newVal.length === paginatedData.value.length && paginatedData.value.length > 0
}, { deep: true })

// 跳转页面状态
const jumpPage = ref('')

// 页码跳转
const goToPage = (page) => {
  if (page < 1 || page > totalPages.value) return
  pagination.value.currentPage = page
  emit('page-change', pagination.value)
}

// 处理每页显示数量变化
const handlePageSizeChange = () => {
  pagination.value.currentPage = 1 // 重置到第一页
  emit('page-change', pagination.value)
}

// 处理跳转到指定页
const handleJumpPage = () => {
  const page = parseInt(jumpPage.value)
  if (page >= 1 && page <= totalPages.value) {
    goToPage(page)
    jumpPage.value = ''
  }
}

// 应用过滤器
const applyFilters = () => {
  pagination.value.currentPage = 1
  emit('filter-change', filters.value)
}

// 查看任务详情
const handleView = (item) => {
  emit('view', item)
}

// 删除任务
const handleDelete = (item) => {
  emit('delete', item)
}

// 处理新任务点击
const handleNewTask = () => {
  emit('newTask')
}

// 处理过滤器变化
const handleFilterChange = () => {
  applyFilters()
}

// 获取状态类
const getStatusClass = (item) => {
  const status = getStatus(item)
  if (status === 'processing') return 'bg-blue-100 text-blue-800'
  if (status === 'completed') return 'bg-green-100 text-green-800'
  if (status === 'failed') return 'bg-red-100 text-red-800'
  if (status === 'partial-failed') return 'bg-yellow-100 text-yellow-800'
  return 'bg-gray-100 text-gray-800'
}
</script> 