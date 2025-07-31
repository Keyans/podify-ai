<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
    <div class="bg-dark-card rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto text-dark-text">
      <!-- 弹窗头部 -->
      <div class="p-5 border-b border-dark-border flex justify-between items-center">
        <h3 class="font-medium text-dark-text">裂变详情 <span class="text-gray-400 text-sm">任务ID：{{ taskData?.id || taskData?.裂变ID || 'N/A' }}</span></h3>
        <button @click="close" class="text-gray-400 hover:text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <!-- 弹窗内容 -->
      <div class="p-6">
        <!-- 统计卡片 -->
        <div class="grid grid-cols-3 gap-4 mb-6">
          <div class="bg-dark-input rounded-md p-4">
            <div class="text-sm text-gray-400 mb-1">总数量</div>
            <div class="font-medium">{{ taskData?.目标 || 0 }}</div>
          </div>
          <div class="bg-dark-input rounded-md p-4">
            <div class="text-sm text-gray-400 mb-1">成功数</div>
            <div class="font-medium">{{ taskData?.成功 || 0 }}</div>
          </div>
          <div class="bg-dark-input rounded-md p-4">
            <div class="text-sm text-gray-400 mb-1">失败数</div>
            <div class="font-medium">{{ taskData?.失败 || 0 }}</div>
          </div>
        </div>
        
        <!-- 筛选区域 -->
        <div class="flex mb-4">
          <div class="relative">
            <button @click="showStatusDropdown = !showStatusDropdown" class="px-3 py-2 bg-dark-input border border-dark-border rounded-md flex items-center">
              状态
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div v-if="showStatusDropdown" class="absolute mt-1 w-40 bg-dark-card border border-dark-border rounded-md shadow-lg z-10">
              <div class="py-1">
                <a href="#" @click.prevent="filterByStatus('全部')" class="block px-4 py-2 text-sm text-dark-text hover:bg-dark-hover">全部</a>
                <a href="#" @click.prevent="filterByStatus('成功')" class="block px-4 py-2 text-sm text-dark-text hover:bg-dark-hover">成功</a>
                <a href="#" @click.prevent="filterByStatus('部分成功')" class="block px-4 py-2 text-sm text-dark-text hover:bg-dark-hover">部分成功</a>
                <a href="#" @click.prevent="filterByStatus('失败')" class="block px-4 py-2 text-sm text-dark-text hover:bg-dark-hover">失败</a>
                <a href="#" @click.prevent="filterByStatus('处理中')" class="block px-4 py-2 text-sm text-dark-text hover:bg-dark-hover">处理中</a>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 表格 -->
        <div class="overflow-x-auto">
          <table class="min-w-full">
            <thead>
              <tr class="border-b border-dark-border">
                <th class="py-3 px-4 text-left">
                  <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" />
                </th>
                <th class="py-3 px-4 text-left">序号</th>
                <th class="py-3 px-4 text-left">原图</th>
                <th class="py-3 px-4 text-left">裂变图</th>
                <th class="py-3 px-4 text-left">状态</th>
                <th class="py-3 px-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="loading" class="border-b border-dark-border">
                <td colspan="6" class="py-8 text-center text-gray-400">
                  <div class="flex items-center justify-center">
                    <div class="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mr-2"></div>
                    加载中...
                  </div>
                </td>
              </tr>
              <tr v-else-if="displayItems.length === 0" class="border-b border-dark-border">
                <td colspan="6" class="py-8 text-center text-gray-400">暂无数据</td>
              </tr>
              <tr v-else v-for="(item, index) in displayItems" :key="item.id || index" class="border-b border-dark-border">
                <td class="py-3 px-4">
                  <input type="checkbox" v-model="item.selected" />
                </td>
                <td class="py-3 px-4">{{ (currentPage - 1) * pageSize + index + 1 }}</td>
                <td class="py-3 px-4">
                  <div class="w-16 h-16 bg-dark-hover rounded-md overflow-hidden">
                    <img 
                      v-if="item.originalImage || item.imageUrl" 
                      :src="item.originalImage || item.imageUrl" 
                      alt="原图" 
                      class="w-full h-full object-cover" 
                      @error="handleImageError"
                    />
                    <div v-else class="w-full h-full bg-dark-hover flex items-center justify-center">
                      <span class="text-xs text-gray-500">无图片</span>
                    </div>
                  </div>
                </td>
                <td class="py-3 px-4">
                  <div class="flex space-x-2">
                    <div class="w-16 h-16 bg-dark-hover rounded-md overflow-hidden">
                      <img 
                        v-if="item.fissionedImage || item.fissionUrl" 
                        :src="item.fissionedImage || item.fissionUrl" 
                        alt="裂变图" 
                        class="w-full h-full object-cover"
                        @error="handleImageError"
                      />
                      <div v-else class="w-full h-full bg-dark-hover flex items-center justify-center">
                        <span class="text-xs text-gray-500">无图片</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td class="py-3 px-4">
                  <span 
                    class="px-2 py-1 text-xs font-medium rounded-md"
                    :class="getStatusClass(item.status || item.fissionStatus)"
                  >
                    {{ getStatusText(item.status || item.fissionStatus) }}
                  </span>
                </td>
                <td class="py-3 px-4 text-right">
                  <a href="#" class="text-green-500 hover:underline" @click.prevent="downloadImage(item)">下载图片</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- 分页 -->
        <div class="flex items-center justify-between mt-6">
          <div class="text-sm text-gray-400">
            共 {{ totalItems }} 条记录，第 {{ currentPage }} / {{ totalPages }} 页
          </div>
          <div class="flex items-center space-x-2">
            <button 
              @click="goToPage(1)" 
              :disabled="currentPage === 1"
              class="w-8 h-8 flex items-center justify-center rounded-md border border-dark-border disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            </button>
            <button 
              @click="goToPage(currentPage - 1)" 
              :disabled="currentPage === 1"
              class="w-8 h-8 flex items-center justify-center rounded-md border border-dark-border disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <!-- 页码按钮 -->
            <template v-for="page in visiblePages" :key="page">
              <button 
                v-if="page !== '...'"
                @click="goToPage(page)" 
                :class="[
                  'w-8 h-8 flex items-center justify-center rounded-md border border-dark-border',
                  currentPage === page ? 'bg-green-600 text-white' : 'hover:bg-dark-hover'
                ]"
              >
                {{ page }}
              </button>
              <span v-else class="px-2 text-gray-400">...</span>
            </template>
            
            <button 
              @click="goToPage(currentPage + 1)" 
              :disabled="currentPage === totalPages"
              class="w-8 h-8 flex items-center justify-center rounded-md border border-dark-border disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button 
              @click="goToPage(totalPages)" 
              :disabled="currentPage === totalPages"
              class="w-8 h-8 flex items-center justify-center rounded-md border border-dark-border disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </button>
            <div class="flex items-center space-x-1 ml-2">
              <span class="text-sm text-gray-400">跳转</span>
              <input 
                type="number" 
                v-model="jumpPage" 
                @keyup.enter="jumpToPage"
                class="w-12 px-2 py-1 bg-dark-input border border-dark-border rounded-md text-center text-sm" 
                :min="1" 
                :max="totalPages"
              >
              <span class="text-sm text-gray-400">页</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 弹窗底部 -->
      <div class="p-5 border-t border-dark-border flex justify-end space-x-3">
        <button @click="close" class="px-4 py-2 border border-dark-border rounded-md text-gray-400 hover:bg-dark-hover">关闭</button>
        <button @click="exportTransformDetail" class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">一键提取</button>
        <div class="relative">
          <button @click="showMoreActions = !showMoreActions" class="px-4 py-2 border border-dark-border rounded-md text-gray-400 hover:bg-dark-hover flex items-center">
            更多操作
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div v-if="showMoreActions" class="absolute bottom-full right-0 mb-2 w-40 bg-dark-card border border-dark-border rounded-md shadow-lg z-10">
            <div class="py-1">
              <a href="#" class="block px-4 py-2 text-sm text-dark-text hover:bg-dark-hover" @click.prevent="exportDetail">导出详情</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, defineProps, defineEmits, computed, watch } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  taskData: {
    type: Object,
    default: () => ({})
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['close', 'download', 'page-change'])

// 状态变量
const selectAll = ref(false)
const showStatusDropdown = ref(false)
const showMoreActions = ref(false)
const selectedStatus = ref('全部')
const jumpPage = ref(1)

// 计算属性
const displayItems = computed(() => {
  const items = props.taskData?.detailList || []
  // 为每个项目添加选择状态
  return items.map(item => ({
    ...item,
    selected: item.selected || false
  }))
})

const totalItems = computed(() => props.taskData?.detailPagination?.total || 0)
const currentPage = computed(() => props.taskData?.detailPagination?.page || 1)
const pageSize = computed(() => props.taskData?.detailPagination?.limit || 10)
const totalPages = computed(() => Math.ceil(totalItems.value / pageSize.value) || 1)

// 可见页码计算
const visiblePages = computed(() => {
  const pages = []
  const total = totalPages.value
  const current = currentPage.value
  
  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(total)
    } else if (current >= total - 3) {
      pages.push(1)
      pages.push('...')
      for (let i = total - 4; i <= total; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)
      pages.push('...')
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(total)
    }
  }
  
  return pages
})

// 状态转换函数
const getStatusText = (status) => {
  const statusMap = {
    0: '待处理',
    1: '处理中',
    2: '成功',
    3: '失败',
    4: '部分成功'
  }
  return statusMap[status] || '未知'
}

const getStatusClass = (status) => {
  const statusClassMap = {
    0: 'bg-gray-500 text-white',
    1: 'bg-blue-500 text-white',
    2: 'bg-green-500 text-white',
    3: 'bg-red-500 text-white',
    4: 'bg-orange-500 text-white'
  }
  return statusClassMap[status] || 'bg-gray-500 text-white'
}

// 图片加载错误处理
const handleImageError = (event) => {
  event.target.style.display = 'none'
  const parent = event.target.parentNode
  if (parent) {
    const placeholder = document.createElement('div')
    placeholder.className = 'w-full h-full bg-dark-hover flex items-center justify-center'
    placeholder.innerHTML = '<span class="text-xs text-gray-500">图片加载失败</span>'
    parent.appendChild(placeholder)
  }
}

// 切换全选
const toggleSelectAll = () => {
  displayItems.value.forEach(item => {
    item.selected = selectAll.value
  })
}

// 监听单个选择变化
watch(displayItems, () => {
  selectAll.value = displayItems.value.length > 0 && displayItems.value.every(item => item.selected)
}, { deep: true })

// 按状态筛选
const filterByStatus = (status) => {
  selectedStatus.value = status
  showStatusDropdown.value = false
  // 这里可以添加筛选逻辑
}

// 分页相关方法
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value && page !== currentPage.value) {
    emits('page-change', {
      page: page,
      limit: pageSize.value
    })
  }
}

const jumpToPage = () => {
  const page = parseInt(jumpPage.value)
  if (page >= 1 && page <= totalPages.value) {
    goToPage(page)
  }
}

// 下载图片
const downloadImage = (item) => {
  console.log('下载图片:', item)
  emits('download', [item])
}

// 导出裂变详情
const exportTransformDetail = () => {
  const selectedItems = displayItems.value.filter(item => item.selected)
  console.log('导出裂变详情:', selectedItems)
  emits('download', selectedItems)
}

// 导出详情
const exportDetail = () => {
  const selectedItems = displayItems.value.filter(item => item.selected)
  console.log('导出详情:', selectedItems)
  emits('download', selectedItems)
  showMoreActions.value = false
}

// 关闭弹窗
const close = () => {
  emits('close')
}

// 监听弹窗打开，重置跳转页码
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    jumpPage.value = currentPage.value
  }
})
</script> 