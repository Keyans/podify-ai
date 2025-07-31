<template>
  <div>
    <!-- 工具栏 -->
    <div class="flex flex-wrap items-center gap-3 mb-6" :class="showNewButton ? 'justify-between' : 'justify-end'">
      <!-- 左侧按钮 -->
      <div v-if="showNewButton" class="flex items-center space-x-2">
        <button 
          @click="$emit('newTask')"
          class="flex items-center space-x-1 px-4 py-2 rounded-md text-sm"
          :style="{
            backgroundColor: 'var(--bg-tertiary)',
            color: 'var(--text-primary)'
          }"
        >
          <span class="text-xl">+</span>
          <span>{{ newButtonText }}</span>
        </button>
      </div>

      <!-- 右侧筛选和搜索 -->
      <div class="flex flex-wrap items-center gap-2">
        <div class="relative">
          <input 
            type="text" 
            placeholder="高级搜索" 
            class="px-4 py-2 rounded-md text-sm w-36 focus:outline-none"
            :style="{
              backgroundColor: 'var(--bg-tertiary)',
              color: 'var(--text-primary)',
              borderColor: 'var(--border-color)'
            }"
          />
        </div>

        <div 
          class="relative inline-block"
          :style="{
            backgroundColor: 'var(--bg-tertiary)',
            color: 'var(--text-primary)',
            borderRadius: '0.375rem'
          }"
        >
          <select 
            class="block appearance-none px-4 py-2 pr-8 rounded-md text-sm focus:outline-none"
            :style="{
              backgroundColor: 'transparent',
              color: 'inherit'
            }"
          >
            <option>{{ statusLabel }}状态</option>
            <option>进行中</option>
            <option>已完成</option>
            <option>失败</option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
            <svg class="w-4 h-4" :style="{ color: 'var(--text-secondary)' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>

        <div class="flex items-center">
          <button 
            class="px-4 py-2 rounded-md text-sm flex items-center space-x-1"
            :style="{
              backgroundColor: 'var(--bg-tertiary)',
              color: 'var(--text-primary)'
            }"
          >
            <span>开始日期</span>
            <svg class="w-4 h-4" :style="{ color: 'var(--text-secondary)' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          <span class="mx-2" :style="{ color: 'var(--text-secondary)' }">~</span>
          <button 
            class="px-4 py-2 rounded-md text-sm flex items-center space-x-1"
            :style="{
              backgroundColor: 'var(--bg-tertiary)',
              color: 'var(--text-primary)'
            }"
          >
            <span>结束日期</span>
            <svg class="w-4 h-4" :style="{ color: 'var(--text-secondary)' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
        </div>

        <div class="relative">
          <input 
            v-model="filters.search"
            type="text" 
            :placeholder="idLabel + 'ID'"
            class="px-4 py-2 rounded-md text-sm w-36 focus:outline-none"
            :style="{
              backgroundColor: 'var(--bg-tertiary)',
              color: 'var(--text-primary)',
              borderColor: 'var(--border-color)'
            }"
          />
        </div>

        <button 
          @click="applyFilters"
          class="px-4 py-2 rounded-md text-sm"
          :style="{
            backgroundColor: 'var(--accent-color)',
            color: 'white'
          }"
        >
          <span>查询</span>
        </button>

        <slot name="extra-buttons"></slot>
      </div>
    </div>

    <!-- 大数据量性能提示 -->
    <div 
      v-if="totalItems > 1000 && !props.virtualScroll" 
      class="mb-4 p-3 rounded-lg border-l-4"
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

    <!-- 数据表格 -->
    <div class="overflow-hidden rounded-lg border" :style="{ borderColor: 'var(--border-color)' }">
      <table class="min-w-full divide-y" :style="{ borderColor: 'var(--border-color)' }">
        <thead :style="{ backgroundColor: 'var(--bg-tertiary)' }">
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
        <tbody class="divide-y" :style="{ 
          backgroundColor: 'var(--bg-secondary)',
          borderColor: 'var(--border-color)'
        }">
          <tr 
            v-for="(item, index) in paginatedData" 
            :key="index" 
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
              <div class="flex items-center">
                <span class="px-3 py-1 rounded-md text-xs"
                  :style="{
                    backgroundColor: getStatusBgColor(item),
                    color: 'white'
                  }"
                >
                  {{ getStatusText(item) }}
                </span>
                <span v-if="getStatus(item) === 'failed'" class="ml-2 text-xs underline cursor-pointer" :style="{ color: 'var(--text-secondary)' }">查看</span>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm" :style="{ color: 'var(--text-primary)' }">
              {{ getCreator(item) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm" :style="{ color: 'var(--text-primary)' }">
              {{ getCreatedTime(item) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-center">
              <button 
                @click.stop="viewTaskDetail(item)"
                class="px-3 py-1 text-sm" 
                :style="{ color: 'var(--accent-color)' }"
              >
                查看详情
              </button>
              <div class="relative inline-block text-left ml-2">
                <button 
                  @click.stop="showMoreOptions(item)"
                  class="inline-flex items-center text-sm rounded-md"
                  :style="{ color: 'var(--text-secondary)' }"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
          
          <!-- 无数据展示 -->
          <tr v-if="filteredData.length === 0">
            <td :colspan="showType ? 8 : 7" class="py-8 text-center text-sm" :style="{ color: 'var(--text-secondary)' }">
              暂无数据
            </td>
          </tr>
        </tbody>
      </table>
      
      <!-- 分页 -->
      <div class="px-6 py-4 flex items-center justify-between" :style="{ 
        borderTop: '1px solid',
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
            class="px-3 py-1 text-sm rounded border"
            :style="{ 
              borderColor: 'var(--border-color)',
              color: 'var(--text-secondary)',
              opacity: pagination.currentPage === 1 ? 0.5 : 1
            }"
            :disabled="pagination.currentPage === 1"
          >
            首页
          </button>
          
          <!-- 上一页 -->
          <button 
            @click="goToPage(pagination.currentPage - 1)"
            class="px-3 py-1 text-sm rounded border"
            :style="{ 
              borderColor: 'var(--border-color)',
              color: 'var(--text-secondary)',
              opacity: pagination.currentPage === 1 ? 0.5 : 1
            }"
            :disabled="pagination.currentPage === 1"
          >
            上一页
          </button>

          <!-- 页码 -->
          <div class="flex items-center space-x-1">
            <div 
              v-for="page in visiblePages" 
              :key="page"
              @click="goToPage(page)"
              class="px-3 py-1 text-sm rounded cursor-pointer"
              :style="{ 
                backgroundColor: pagination.currentPage === page ? 'var(--accent-color)' : 'transparent',
                color: pagination.currentPage === page ? 'white' : 'var(--text-secondary)',
                border: '1px solid',
                borderColor: pagination.currentPage === page ? 'var(--accent-color)' : 'var(--border-color)'
              }"
            >
              {{ page }}
            </div>
            
            <!-- 省略号和跳转 -->
            <div v-if="totalPages > 5" class="flex items-center space-x-1">
              <span v-if="!visiblePages.includes(totalPages)" class="px-2" :style="{ color: 'var(--text-secondary)' }">...</span>
              <div 
                v-if="!visiblePages.includes(totalPages)"
                @click="goToPage(totalPages)"
                class="px-3 py-1 text-sm rounded cursor-pointer border"
                :style="{ 
                  backgroundColor: 'transparent',
                  color: 'var(--text-secondary)',
                  borderColor: 'var(--border-color)'
                }"
              >
                {{ totalPages }}
              </div>
            </div>
          </div>

          <!-- 下一页 -->
          <button 
            @click="goToPage(pagination.currentPage + 1)"
            class="px-3 py-1 text-sm rounded border"
            :style="{ 
              borderColor: 'var(--border-color)',
              color: 'var(--text-secondary)',
              opacity: pagination.currentPage === totalPages ? 0.5 : 1
            }"
            :disabled="pagination.currentPage === totalPages"
          >
            下一页
          </button>
          
          <!-- 尾页 -->
          <button 
            @click="goToPage(totalPages)"
            class="px-3 py-1 text-sm rounded border"
            :style="{ 
              borderColor: 'var(--border-color)',
              color: 'var(--text-secondary)',
              opacity: pagination.currentPage === totalPages ? 0.5 : 1
            }"
            :disabled="pagination.currentPage === totalPages"
          >
            尾页
          </button>
          
          <!-- 跳转到指定页 -->
          <div class="flex items-center space-x-2 ml-4">
            <span class="text-sm" :style="{ color: 'var(--text-secondary)' }">跳转到</span>
            <input 
              type="number" 
              v-model="jumpToPage"
              @keyup.enter="handleJumpToPage"
              :min="1"
              :max="totalPages"
              class="w-16 px-2 py-1 text-sm text-center rounded border"
              :style="{
                backgroundColor: 'var(--bg-tertiary)',
                color: 'var(--text-primary)',
                borderColor: 'var(--border-color)'
              }"
            />
            <button 
              @click="handleJumpToPage"
              class="px-2 py-1 text-sm rounded border"
              :style="{ 
                borderColor: 'var(--border-color)',
                color: 'var(--text-secondary)'
              }"
            >
              确定
            </button>
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
const jumpToPage = ref(1)

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
const handleJumpToPage = () => {
  const page = parseInt(jumpToPage.value)
  if (page >= 1 && page <= totalPages.value) {
    goToPage(page)
  }
}

// 应用过滤器
const applyFilters = () => {
  pagination.value.currentPage = 1
  emit('filter-change', filters.value)
}

// 查看任务详情
const viewTaskDetail = (item) => {
  emit('view', item)
}

// 显示更多选项
const showMoreOptions = (item) => {
  console.log('显示更多选项:', item)
}
</script> 