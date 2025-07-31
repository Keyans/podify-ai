<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
    <div class="bg-dark-card rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto text-dark-text">
      <!-- 弹窗头部 -->
      <div class="p-5 border-b border-dark-border flex justify-between items-center">
        <h3 class="font-medium text-dark-text">抠图详情 <span class="text-gray-400 text-sm">任务ID：{{ taskData?.id || taskData?.抠图ID || 'N/A' }}</span></h3>
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
            <div class="text-sm text-gray-400 mb-1">目标数</div>
            <div class="font-medium text-blue-400">{{ taskData?.targetCount || taskData?.mattingNum || taskData?.目标 || 0 }}</div>
          </div>
          <div class="bg-dark-input rounded-md p-4">
            <div class="text-sm text-gray-400 mb-1">成功数</div>
            <div class="font-medium text-green-400">{{ taskData?.successCount || taskData?.mattingSuccessNum || taskData?.成功 || 0 }}</div>
          </div>
          <div class="bg-dark-input rounded-md p-4">
            <div class="text-sm text-gray-400 mb-1">失败数</div>
            <div class="font-medium text-red-400">{{ taskData?.failedCount || taskData?.mattingFailNum || taskData?.失败 || 0 }}</div>
          </div>
        </div>
        
        <!-- 筛选区域 -->
        <div class="flex mb-4">
          <div class="relative">
            <button @click="showStatusDropdown = !showStatusDropdown" class="px-3 py-2 bg-dark-input border border-dark-border rounded-md flex items-center">
              {{ selectedStatus }}
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div v-if="showStatusDropdown" class="absolute mt-1 w-40 bg-dark-card border border-dark-border rounded-md shadow-lg z-10">
              <div class="py-1">
                <a href="#" @click.prevent="filterByStatus('全部')" class="block px-4 py-2 text-sm text-dark-text hover:bg-dark-hover">全部</a>
                <a href="#" @click.prevent="filterByStatus('成功')" class="block px-4 py-2 text-sm text-dark-text hover:bg-dark-hover">成功</a>
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
                <th class="py-3 px-4 text-left">抠图</th>
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
                    <img v-if="item.originalImage || item.imageUrl" :src="item.originalImage || item.imageUrl" alt="原图" class="w-full h-full object-cover" @error="handleImageError" />
                    <div v-else class="w-full h-full bg-dark-hover flex items-center justify-center">
                      <span class="text-xs text-gray-500">无原图</span>
                    </div>
                  </div>
                </td>
                <td class="py-3 px-4">
                  <div class="w-16 h-16 bg-dark-hover rounded-md overflow-hidden">
                    <img v-if="item.cutoutImage || item.resultsImageUrl || item.resultUrl" :src="item.cutoutImage || item.resultsImageUrl || item.resultUrl" alt="抠图" class="w-full h-full object-cover" @error="handleImageError" />
                    <div v-else-if="item.status === 0" class="w-full h-full bg-dark-hover flex items-center justify-center">
                      <div class="text-xs text-yellow-400 text-center">
                        <div class="w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-1"></div>
                        处理中
                      </div>
                    </div>
                    <div v-else class="w-full h-full bg-dark-hover flex items-center justify-center">
                      <span class="text-xs text-gray-500">无结果</span>
                    </div>
                  </div>
                </td>
                <td class="py-3 px-4">
                  <span 
                    class="px-2 py-1 text-xs font-medium rounded-md"
                    :class="getStatusClass(item.status)"
                  >
                    {{ getStatusText(item.status) }}
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
            共 {{ totalItems }} 条记录
          </div>
          <div class="flex items-center space-x-2">
            <button 
              @click="goToPage(1)" 
              :disabled="currentPage === 1"
              class="w-8 h-8 flex items-center justify-center rounded-md border border-dark-border disabled:opacity-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            </button>
            <button 
              @click="goToPage(currentPage - 1)" 
              :disabled="currentPage === 1"
              class="w-8 h-8 flex items-center justify-center rounded-md border border-dark-border disabled:opacity-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <!-- 页码按钮 -->
            <button 
              v-for="page in visiblePages" 
              :key="page"
              @click="goToPage(page)"
              class="w-8 h-8 flex items-center justify-center rounded-md border border-dark-border"
              :class="{ 'bg-green-600 text-white': page === currentPage }"
            >
              {{ page }}
            </button>
            
            <button 
              @click="goToPage(currentPage + 1)" 
              :disabled="currentPage === totalPages"
              class="w-8 h-8 flex items-center justify-center rounded-md border border-dark-border disabled:opacity-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button 
              @click="goToPage(totalPages)" 
              :disabled="currentPage === totalPages"
              class="w-8 h-8 flex items-center justify-center rounded-md border border-dark-border disabled:opacity-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </button>
            <div class="flex items-center space-x-1 ml-2">
              <span class="text-sm text-gray-400">跳转</span>
              <input 
                type="text" 
                v-model="jumpPage" 
                @keyup.enter="jumpToPage"
                class="w-12 px-2 py-1 bg-dark-input border border-dark-border rounded-md text-center text-sm"
              >
              <span class="text-sm text-gray-400">页</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 弹窗底部 -->
      <div class="p-5 border-t border-dark-border flex justify-end space-x-3">
        <button @click="close" class="px-4 py-2 border border-dark-border rounded-md text-gray-400 hover:bg-dark-hover">关闭</button>
        <button @click="exportCutoutDetail" class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">一键提取</button>
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
const jumpPage = ref('')

// 分页相关
const currentPage = ref(1)
const pageSize = ref(10)

// 计算属性
const detailList = computed(() => {
  return props.taskData?.detailList || []
})

const totalItems = computed(() => {
  return props.taskData?.detailPagination?.total || detailList.value.length
})

const totalPages = computed(() => {
  return Math.ceil(totalItems.value / pageSize.value)
})

// 显示的页码
const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(totalPages.value, currentPage.value + 2)
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

// 显示的数据项
const displayItems = computed(() => {
  let items = detailList.value.map((item, index) => ({
    ...item,
    selected: false,
    id: item.id || item.mattingId || index
  }))
  
  // 根据状态筛选
  if (selectedStatus.value !== '全部') {
    items = items.filter(item => getStatusText(item.status) === selectedStatus.value)
  }
  
  return items
})

// 状态文本转换
const getStatusText = (status) => {
  // 确保status是数字类型
  const numStatus = typeof status === 'string' ? parseInt(status) : status
  const statusMap = {
    0: '处理中',
    1: '成功',
    2: '失败',
    3: '暂停'
  }
  return statusMap[numStatus] || '未知'
}

// 状态样式
const getStatusClass = (status) => {
  const statusText = getStatusText(status)
  return {
    'bg-green-500 text-white': statusText === '成功',
    'bg-red-500 text-white': statusText === '失败',
    'bg-yellow-500 text-white': statusText === '处理中',
    'bg-gray-500 text-white': statusText === '暂停' || statusText === '未知'
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
}

// 分页操作
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value && page !== currentPage.value) {
    currentPage.value = page
    emits('page-change', {
      page: page,
      limit: pageSize.value
    })
  }
}

const jumpToPage = () => {
  const page = parseInt(jumpPage.value)
  if (page && page >= 1 && page <= totalPages.value) {
    goToPage(page)
    jumpPage.value = ''
  }
}

// 下载图片
const downloadImage = (item) => {
  const imageUrl = item.cutoutImage || item.resultsImageUrl || item.resultUrl
  if (imageUrl) {
    // 创建一个临时的a标签来下载图片
    const link = document.createElement('a')
    link.href = imageUrl
    link.download = `抠图结果_${item.id || Date.now()}.png`
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    console.log('下载抠图图片:', item)
  } else {
    console.warn('该项目没有可下载的抠图结果')
  }
  emits('download', [item])
}

// 导出抠图详情
const exportCutoutDetail = () => {
  const selectedItems = displayItems.value.filter(item => item.selected)
  if (selectedItems.length === 0) {
    console.warn('请选择要导出的项目')
    return
  }
  
  // 批量下载选中的抠图结果
  selectedItems.forEach((item, index) => {
    const imageUrl = item.cutoutImage || item.resultsImageUrl || item.resultUrl
    if (imageUrl) {
      setTimeout(() => {
        const link = document.createElement('a')
        link.href = imageUrl
        link.download = `抠图结果_${item.id || index}_${Date.now()}.png`
        link.target = '_blank'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }, index * 500) // 延迟下载，避免浏览器阻止多个下载
    }
  })
  
  console.log('导出抠图详情:', selectedItems)
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

// 图片加载错误处理
const handleImageError = (event) => {
  event.target.style.display = 'none'
  const parent = event.target.parentElement
  if (parent) {
    parent.innerHTML = '<span class="text-xs text-gray-500">图片加载失败</span>'
    parent.classList.add('flex', 'items-center', 'justify-center')
  }
}

// 监听taskData变化，重置分页
watch(() => props.taskData, (newData) => {
  console.log('详情弹窗接收到的数据:', newData)
  if (newData?.detailPagination) {
    currentPage.value = newData.detailPagination.page || 1
    pageSize.value = newData.detailPagination.limit || 10
  }
}, { deep: true, immediate: true })
</script> 