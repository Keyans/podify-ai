<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
    <div class="bg-dark-card rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden text-dark-text">
      <!-- Header -->
      <div class="p-5 border-b border-dark-border flex justify-between items-center">
        <h3 class="font-medium text-dark-text">生成详情 任务ID：{{ taskData?.生图ID || taskData?.id || 'COL001' }}</h3>
        <button @click="close" class="text-gray-400 hover:text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div class="p-6">
        <!-- 统计卡片 -->
        <div class="grid grid-cols-3 gap-4 mb-6">
          <div class="bg-dark-input rounded-lg p-4 text-center">
            <div class="text-sm text-dark-text-secondary mb-1">产品数</div>
            <div class="text-xl font-bold text-dark-text">{{ taskInfo?.productCount || '25,212' }}</div>
          </div>
          <div class="bg-dark-input rounded-lg p-4 text-center">
            <div class="text-sm text-dark-text-secondary mb-1">目标数</div>
            <div class="text-xl font-bold text-dark-text">{{ taskInfo?.targetCount || '156' }}</div>
          </div>
          <div class="bg-dark-input rounded-lg p-4 text-center">
            <div class="text-sm text-dark-text-secondary mb-1">成功数</div>
            <div class="text-xl font-bold text-dark-text">{{ taskInfo?.successCount || '156' }}</div>
          </div>
        </div>

        <!-- 搜索和筛选 -->
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center space-x-4">
            <div class="relative">
              <input 
                v-model="searchQuery"
                type="text"
                placeholder="请输入标题搜索"
                class="px-3 py-2 bg-dark-input border border-dark-border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-dark-text pl-10"
              />
              <svg class="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
            <button 
              @click="handleSearch"
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              搜索
            </button>
            <div class="relative">
              <select 
                v-model="statusFilter"
                class="px-3 py-2 bg-dark-input border border-dark-border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-dark-text"
              >
                <option value="">状态</option>
                <option value="success">成功</option>
                <option value="failed">失败</option>
                <option value="processing">处理中</option>
              </select>
            </div>
          </div>
        </div>

        <!-- 详情表格 -->
        <div class="bg-dark-input rounded-lg overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-dark-border">
                <tr>
                  <th class="px-4 py-3 text-left text-xs font-medium text-dark-text-secondary uppercase tracking-wider">
                    <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" class="rounded border-dark-border">
                  </th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-dark-text-secondary uppercase tracking-wider">序号</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-dark-text-secondary uppercase tracking-wider">商品图</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-dark-text-secondary uppercase tracking-wider">标题</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-dark-text-secondary uppercase tracking-wider">状态</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-dark-border">
                <tr v-for="(item, index) in paginatedDetailList" :key="index" class="hover:bg-dark-hover">
                  <td class="px-4 py-3">
                    <input 
                      type="checkbox" 
                      v-model="selectedItems" 
                      :value="item.id || index"
                      class="rounded border-dark-border"
                    >
                  </td>
                  <td class="px-4 py-3 text-sm text-dark-text">{{ index + 1 }}</td>
                  <td class="px-4 py-3">
                    <img 
                      :src="item.productImage || item.image || 'https://via.placeholder.com/40x40/333/fff?text=IMG'" 
                      :alt="item.productName || '商品图片'"
                      class="w-10 h-10 rounded object-cover"
                    />
                  </td>
                  <td class="px-4 py-3">
                    <div class="text-sm text-dark-text max-w-md">
                      {{ item.title || item.generatedTitle || getSimulatedTitle(index) }}
                    </div>
                  </td>
                  <td class="px-4 py-3">
                    <span 
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      :class="getStatusClass(item.status || getSimulatedStatus(index))"
                    >
                      {{ getStatusText(item.status || getSimulatedStatus(index)) }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- 分页控件 -->
        <div class="flex items-center justify-between mt-4">
          <div class="text-sm text-dark-text-secondary">
            共 {{ detailList.length }} 条记录
          </div>
          
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-2">
              <span class="text-sm text-dark-text-secondary">每页</span>
              <select 
                v-model="pagination.pageSize"
                @change="handlePageSizeChange"
                class="px-2 py-1 bg-dark-input border border-dark-border rounded text-dark-text text-sm"
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
              <span class="text-sm text-dark-text-secondary">条</span>
            </div>
            
            <div class="flex items-center space-x-1">
              <button 
                @click="goToPage(1)"
                :disabled="pagination.currentPage === 1"
                class="px-2 py-1 text-sm rounded border border-dark-border text-dark-text disabled:opacity-50 disabled:cursor-not-allowed hover:bg-dark-hover"
              >
                «
              </button>
              <button 
                @click="goToPage(pagination.currentPage - 1)"
                :disabled="pagination.currentPage === 1"
                class="px-2 py-1 text-sm rounded border border-dark-border text-dark-text disabled:opacity-50 disabled:cursor-not-allowed hover:bg-dark-hover"
              >
                ‹
              </button>
              
              <span class="px-3 py-1 text-sm text-dark-text">
                {{ pagination.currentPage }}
              </span>
              
              <button 
                @click="goToPage(pagination.currentPage + 1)"
                :disabled="pagination.currentPage >= totalPages"
                class="px-2 py-1 text-sm rounded border border-dark-border text-dark-text disabled:opacity-50 disabled:cursor-not-allowed hover:bg-dark-hover"
              >
                ›
              </button>
              <button 
                @click="goToPage(totalPages)"
                :disabled="pagination.currentPage >= totalPages"
                class="px-2 py-1 text-sm rounded border border-dark-border text-dark-text disabled:opacity-50 disabled:cursor-not-allowed hover:bg-dark-hover"
              >
                »
              </button>
              
              <div class="flex items-center space-x-2 ml-4">
                <span class="text-sm text-dark-text-secondary">跳转</span>
                <input 
                  v-model="jumpPage"
                  type="number"
                  :min="1"
                  :max="totalPages"
                  @keyup.enter="goToPage(parseInt(jumpPage))"
                  class="w-16 px-2 py-1 bg-dark-input border border-dark-border rounded text-dark-text text-sm text-center"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="p-5 border-t border-dark-border flex justify-between">
        <button @click="close" class="px-4 py-2 border border-dark-border rounded-md text-dark-text-secondary hover:bg-dark-hover">关闭</button>
        
        <div class="flex space-x-3">
          <button 
            @click="exportTitles"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            导出详情
          </button>
          
          <div class="relative">
            <button 
              @click="showBatchOperations = !showBatchOperations"
              class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
            >
              批量打程
              <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            
            <!-- 批量操作下拉菜单 -->
            <div v-if="showBatchOperations" class="absolute right-0 bottom-full mb-2 w-48 bg-dark-card border border-dark-border rounded-md shadow-lg z-10">
              <div class="py-1">
                <button 
                  @click="batchOperation('copy')"
                  class="w-full text-left px-4 py-2 text-sm text-dark-text hover:bg-dark-hover"
                >
                  复制标题
                </button>
                <button 
                  @click="batchOperation('export')"
                  class="w-full text-left px-4 py-2 text-sm text-dark-text hover:bg-dark-hover"
                >
                  导出选中
                </button>
                <button 
                  @click="batchOperation('delete')"
                  class="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-dark-hover"
                >
                  删除选中
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits, watch } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  taskData: {
    type: Object,
    default: () => ({})
  }
})

const emits = defineEmits(['close', 'download', 'page-change'])

// 搜索和筛选
const searchQuery = ref('')
const statusFilter = ref('')

// 选择状态
const selectAll = ref(false)
const selectedItems = ref([])

// 批量操作
const showBatchOperations = ref(false)

// 分页状态
const pagination = ref({
  currentPage: 1,
  pageSize: 10
})

const jumpPage = ref(1)

// 任务统计信息
const taskInfo = computed(() => {
  return props.taskData?.taskInfo || {}
})

// 详情数据
const detailList = computed(() => {
  // 如果有真实数据，使用真实数据
  if (props.taskData?.detailList && props.taskData.detailList.length > 0) {
    return props.taskData.detailList
  }
  
  // 否则使用模拟数据
  return Array.from({ length: 4 }, (_, index) => ({
    id: index + 1,
    productImage: `https://via.placeholder.com/40x40/333/fff?text=${index + 1}`,
    productName: `商品${index + 1}`,
    title: getSimulatedTitle(index),
    status: getSimulatedStatus(index)
  }))
})

// 总页数
const totalPages = computed(() => {
  return Math.ceil(detailList.value.length / pagination.value.pageSize)
})

// 分页后的详情数据
const paginatedDetailList = computed(() => {
  const start = (pagination.value.currentPage - 1) * pagination.value.pageSize
  const end = start + pagination.value.pageSize
  return detailList.value.slice(start, end)
})

// 模拟标题数据
const getSimulatedTitle = (index) => {
  const titles = [
    'SONDER Graphic Print T-Shirt - Unisex Summer Short Sleeve Tee with Bold "Every for Man Has A Character" Design, Casual Women\'s Top, Machine Washable, White',
    'SONDER Graphic Print T-Shirt - Unisex Summer Short Sleeve Tee with Bold "Every for Man Has A Character" Design, Casual Women\'s Top, Machine Washable, White',
    '-',
    '-'
  ]
  return titles[index] || `标题 ${index + 1}`
}

// 模拟状态数据
const getSimulatedStatus = (index) => {
  const statuses = ['success', 'success', 'failed', 'processing']
  return statuses[index] || 'success'
}

// 状态文本转换
const getStatusText = (status) => {
  const statusMap = {
    'success': '成功',
    'failed': '失败',
    'processing': '处理中'
  }
  return statusMap[status] || '未知'
}

// 状态样式
const getStatusClass = (status) => {
  const statusClasses = {
    'success': 'bg-green-100 text-green-800',
    'failed': 'bg-red-100 text-red-800',
    'processing': 'bg-yellow-100 text-yellow-800'
  }
  return statusClasses[status] || 'bg-gray-100 text-gray-800'
}

// 处理搜索
const handleSearch = () => {
  console.log('搜索标题:', searchQuery.value)
  // 实际应用中应该调用搜索API
}

// 全选切换
const toggleSelectAll = () => {
  if (selectAll.value) {
    selectedItems.value = paginatedDetailList.value.map(item => item.id)
  } else {
    selectedItems.value = []
  }
}

// 分页跳转
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    pagination.value.currentPage = page
    jumpPage.value = page
    
    // 通知父组件分页变化
    emits('page-change', {
      page: page,
      limit: pagination.value.pageSize
    })
  }
}

// 页面大小变化
const handlePageSizeChange = () => {
  pagination.value.currentPage = 1
  jumpPage.value = 1
  
  // 通知父组件分页变化
  emits('page-change', {
    page: 1,
    limit: pagination.value.pageSize
  })
}

// 导出标题
const exportTitles = () => {
  const selectedTitles = detailList.value
    .filter(item => selectedItems.value.includes(item.id))
    .map(item => item.title)
  
  if (selectedTitles.length === 0) {
    console.log('请先选择要导出的标题')
    return
  }
  
  console.log('导出标题:', selectedTitles)
  emits('download', selectedTitles)
}

// 批量操作
const batchOperation = (operation) => {
  const selectedTitles = detailList.value.filter(item => selectedItems.value.includes(item.id))
  
  if (selectedTitles.length === 0) {
    console.log('请先选择要操作的项目')
    return
  }
  
  switch (operation) {
    case 'copy':
      console.log('复制标题:', selectedTitles)
      break
    case 'export':
      console.log('导出选中:', selectedTitles)
      emits('download', selectedTitles.map(item => item.title))
      break
    case 'delete':
      console.log('删除选中:', selectedTitles)
      break
  }
  
  showBatchOperations.value = false
}

// 关闭弹窗
const close = () => {
  emits('close')
}

// 监听弹窗状态变化
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    // 重置状态
    pagination.value.currentPage = 1
    jumpPage.value = 1
    selectedItems.value = []
    selectAll.value = false
    searchQuery.value = ''
    statusFilter.value = ''
    showBatchOperations.value = false
  }
})

// 点击外部关闭下拉菜单
const handleClickOutside = (event) => {
  if (showBatchOperations.value && !event.target.closest('.relative')) {
    showBatchOperations.value = false
  }
}

// 添加全局点击监听
if (typeof window !== 'undefined') {
  document.addEventListener('click', handleClickOutside)
}
</script> 