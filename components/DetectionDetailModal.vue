<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
    <div class="bg-dark-card rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto text-dark-text">
      <!-- Header -->
      <div class="p-5 border-b border-dark-border flex justify-between items-center">
        <h3 class="font-medium text-dark-text">检测详情 任务ID：{{ taskData?.id || 'COL001' }}</h3>
        <button @click="close" class="text-gray-400 hover:text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div class="p-6">
        <!-- 统计卡片 -->
        <div class="grid grid-cols-4 gap-4 mb-6">
          <div class="bg-dark-input rounded-lg p-4 text-center">
            <div class="text-sm text-dark-text-secondary mb-1">检测数</div>
            <div class="text-xl font-bold text-dark-text">{{ taskInfo?.targetCount || '0' }}</div>
          </div>
          <div class="bg-dark-input rounded-lg p-4 text-center">
            <div class="text-sm text-dark-text-secondary mb-1">目标数</div>
            <div class="text-xl font-bold text-dark-text">{{ taskInfo?.targetCount || '0' }}</div>
          </div>
          <div class="bg-dark-input rounded-lg p-4 text-center">
            <div class="text-sm text-dark-text-secondary mb-1">成功数</div>
            <div class="text-xl font-bold text-dark-text">{{ taskInfo?.completedCount || '0' }}</div>
          </div>
          <div class="bg-dark-input rounded-lg p-4 text-center">
            <div class="text-sm text-dark-text-secondary mb-1">失败数</div>
            <div class="text-xl font-bold text-dark-text">{{ taskInfo?.failedCount || '0' }}</div>
          </div>
        </div>

        <!-- 风险等级统计 -->
        <div class="grid grid-cols-5 gap-4 mb-6">
          <div class="bg-green-600 rounded-lg p-4 text-center text-white">
            <div class="text-sm mb-1">低风险</div>
            <div class="text-xl font-bold">{{ taskInfo?.lowRiskCount || '0' }}</div>
          </div>
          <div class="bg-yellow-600 rounded-lg p-4 text-center text-white">
            <div class="text-sm mb-1">中风险</div>
            <div class="text-xl font-bold">{{ taskInfo?.mediumRiskCount || '0' }}</div>
          </div>
          <div class="bg-red-600 rounded-lg p-4 text-center text-white">
            <div class="text-sm mb-1">高风险</div>
            <div class="text-xl font-bold">{{ taskInfo?.highRiskCount || '0' }}</div>
          </div>
          <div class="bg-blue-600 rounded-lg p-4 text-center text-white">
            <div class="text-sm mb-1">未知风险</div>
            <div class="text-xl font-bold">{{ taskInfo?.unknownRiskCount || '0' }}</div>
          </div>
          <div class="bg-gray-600 rounded-lg p-4 text-center text-white">
            <div class="text-sm mb-1">无风险</div>
            <div class="text-xl font-bold">{{ taskInfo?.noRiskCount || '0' }}</div>
          </div>
        </div>

        <!-- 提示信息 -->
        <div class="text-center text-dark-text-secondary mb-6">
          这两个图表第三方接口返回情况
          <svg class="w-4 h-4 inline ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>

        <!-- 筛选器 -->
        <div class="flex items-center space-x-4 mb-4">
          <div class="relative">
            <select 
              v-model="filterRiskLevel"
              class="px-3 py-2 bg-dark-input border border-dark-border rounded-md text-dark-text focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">风险等级</option>
              <option value="low">低风险</option>
              <option value="medium">中风险</option>
              <option value="high">高风险</option>
              <option value="unknown">未知</option>
            </select>
          </div>
        </div>

        <!-- 详情表格 -->
        <div class="overflow-hidden rounded-lg border border-dark-border">
          <table class="min-w-full divide-y divide-dark-border">
            <thead class="bg-dark-input">
              <tr>
                <th class="px-6 py-3 text-left">
                  <input type="checkbox" class="rounded border-gray-300" v-model="selectAll" @change="toggleSelectAll">
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-dark-text-secondary uppercase tracking-wider">序号</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-dark-text-secondary uppercase tracking-wider">原图</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-dark-text-secondary uppercase tracking-wider">风险等级</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-dark-text-secondary uppercase tracking-wider">风险标签</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-dark-text-secondary uppercase tracking-wider">可信度（越接近检测结果）</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-dark-text-secondary uppercase tracking-wider">检测时间</th>
              </tr>
            </thead>
            <tbody class="bg-dark-card divide-y divide-dark-border">
              <tr v-for="(item, index) in paginatedDetailList" :key="index" class="hover:bg-dark-hover">
                <td class="px-6 py-4">
                  <input type="checkbox" class="rounded border-gray-300" v-model="selectedItems" :value="item.id">
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-dark-text">{{ index + 1 }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <img 
                    :src="item.imageUrl || 'https://via.placeholder.com/60x60'" 
                    :alt="item.imageName"
                    class="w-15 h-15 object-cover rounded-md"
                  />
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span 
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    :class="getRiskLevelClass(item.riskLevel)"
                  >
                    {{ getRiskLevelText(item.riskLevel) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-dark-text">
                  {{ item.riskLabel || '疑似含有侵权内容' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-dark-text">
                  {{ item.confidence || '42.51%' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-dark-text-secondary">
                  {{ item.detectionTime || '2025-07-24 01:12:39' }}
                </td>
              </tr>
              
              <!-- 无数据展示 -->
              <tr v-if="filteredDetailList.length === 0">
                <td colspan="7" class="py-8 text-center text-sm text-dark-text-secondary">
                  暂无数据
                </td>
              </tr>
            </tbody>
          </table>
          
          <!-- 分页 -->
          <div class="px-6 py-4 flex items-center justify-between border-t border-dark-border bg-dark-card">
            <div class="flex items-center space-x-4">
              <div class="text-sm text-dark-text-secondary">
                共 {{ filteredDetailList.length }} 条记录
              </div>
              <div class="flex items-center space-x-2">
                <span class="text-sm text-dark-text-secondary">每页显示</span>
                <select 
                  v-model="pagination.pageSize"
                  @change="handlePageSizeChange"
                  class="px-2 py-1 text-sm rounded border bg-dark-input border-dark-border text-dark-text"
                >
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
                <span class="text-sm text-dark-text-secondary">条</span>
              </div>
            </div>
            
            <div class="flex items-center space-x-2">
              <button 
                @click="goToPage(1)"
                :disabled="pagination.currentPage === 1"
                class="px-3 py-1 text-sm rounded border border-dark-border text-dark-text disabled:opacity-50 disabled:cursor-not-allowed hover:bg-dark-hover"
              >
                首页
              </button>
              <button 
                @click="goToPage(pagination.currentPage - 1)"
                :disabled="pagination.currentPage === 1"
                class="px-3 py-1 text-sm rounded border border-dark-border text-dark-text disabled:opacity-50 disabled:cursor-not-allowed hover:bg-dark-hover"
              >
                上一页
              </button>
              
              <span class="px-3 py-1 text-sm bg-green-600 text-white rounded">
                {{ pagination.currentPage }}
              </span>
              
              <button 
                @click="goToPage(pagination.currentPage + 1)"
                :disabled="pagination.currentPage >= totalPages"
                class="px-3 py-1 text-sm rounded border border-dark-border text-dark-text disabled:opacity-50 disabled:cursor-not-allowed hover:bg-dark-hover"
              >
                下一页
              </button>
              <button 
                @click="goToPage(totalPages)"
                :disabled="pagination.currentPage >= totalPages"
                class="px-3 py-1 text-sm rounded border border-dark-border text-dark-text disabled:opacity-50 disabled:cursor-not-allowed hover:bg-dark-hover"
              >
                尾页
              </button>
              
              <div class="flex items-center space-x-2 ml-4">
                <span class="text-sm text-dark-text-secondary">跳转</span>
                <input 
                  v-model="jumpToPage"
                  type="number"
                  :min="1"
                  :max="totalPages"
                  class="w-12 px-2 py-1 text-sm rounded border bg-dark-input border-dark-border text-dark-text text-center"
                  @keyup.enter="handleJumpToPage"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Footer -->
      <div class="p-5 border-t border-dark-border flex justify-between items-center">
        <div class="flex space-x-3">
          <button @click="close" class="px-4 py-2 border border-dark-border rounded-md text-dark-text-secondary hover:bg-dark-hover">
            关闭
          </button>
          <button 
            @click="handleDownload" 
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-4-4m4 4l4-4m-6 4V4" />
            </svg>
            导出详情
          </button>
        </div>
        <div class="relative">
          <button 
            @click="showPodDropdown = !showPodDropdown"
            class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
          >
            POD合成
            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          <!-- POD下拉菜单 -->
          <div v-if="showPodDropdown" class="absolute right-0 top-full mt-1 w-48 bg-dark-card border border-dark-border rounded-md shadow-lg z-10">
            <div class="py-1">
              <button 
                @click="handlePodAction('t-shirt')"
                class="w-full text-left px-4 py-2 text-sm text-dark-text hover:bg-dark-hover"
              >
                T恤合成
              </button>
              <button 
                @click="handlePodAction('mug')"
                class="w-full text-left px-4 py-2 text-sm text-dark-text hover:bg-dark-hover"
              >
                杯子合成
              </button>
              <button 
                @click="handlePodAction('poster')"
                class="w-full text-left px-4 py-2 text-sm text-dark-text hover:bg-dark-hover"
              >
                海报合成
              </button>
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

// 筛选器状态
const filterRiskLevel = ref('')

// 选中项
const selectAll = ref(false)
const selectedItems = ref([])

// 分页状态
const pagination = ref({
  currentPage: 1,
  pageSize: 10
})

const jumpToPage = ref(1)
const showPodDropdown = ref(false)

// 模拟详情数据
const detailList = ref([
  {
    id: 1,
    imageUrl: 'https://via.placeholder.com/60x60',
    imageName: '商品图片1',
    riskLevel: 'low',
    riskLabel: '疑似含有侵权身份内容',
    confidence: '42.51%',
    detectionTime: '2025-07-24 01:12:39'
  },
  {
    id: 2,
    imageUrl: 'https://via.placeholder.com/60x60',
    imageName: '商品图片2',
    riskLevel: 'unknown',
    riskLabel: '无',
    confidence: '79.25%',
    detectionTime: '2025-07-24 01:12:39'
  },
  {
    id: 3,
    imageUrl: 'https://via.placeholder.com/60x60',
    imageName: '商品图片3',
    riskLevel: 'medium',
    riskLabel: '疑似含有明星相关内容',
    confidence: '90.23%',
    detectionTime: '2025-07-24 01:12:39'
  },
  {
    id: 4,
    imageUrl: 'https://via.placeholder.com/60x60',
    imageName: '商品图片4',
    riskLevel: 'high',
    riskLabel: '疑似含有艺术品色情内容',
    confidence: '16.20%',
    detectionTime: '2025-07-24 01:12:39'
  },
  {
    id: 5,
    imageUrl: 'https://via.placeholder.com/60x60',
    imageName: '商品图片5',
    riskLevel: 'unknown',
    riskLabel: '未知风险',
    confidence: '59.16%',
    detectionTime: '2025-07-24 01:12:39'
  }
])

// 根据筛选条件过滤数据
const filteredDetailList = computed(() => {
  let result = [...detailList.value]
  
  if (filterRiskLevel.value) {
    result = result.filter(item => item.riskLevel === filterRiskLevel.value)
  }
  
  return result
})

// 计算总页数
const totalPages = computed(() => {
  return Math.ceil(filteredDetailList.value.length / pagination.value.pageSize)
})

// 分页后的数据
const paginatedDetailList = computed(() => {
  const start = (pagination.value.currentPage - 1) * pagination.value.pageSize
  const end = start + pagination.value.pageSize
  return filteredDetailList.value.slice(start, end)
})

// 获取风险等级样式
const getRiskLevelClass = (level) => {
  switch (level) {
    case 'low':
      return 'bg-green-100 text-green-800'
    case 'medium':
      return 'bg-yellow-100 text-yellow-800'
    case 'high':
      return 'bg-red-100 text-red-800'
    case 'unknown':
      return 'bg-blue-100 text-blue-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

// 获取风险等级文本
const getRiskLevelText = (level) => {
  switch (level) {
    case 'low':
      return '低风险'
    case 'medium':
      return '中风险'
    case 'high':
      return '高风险'
    case 'unknown':
      return '未知'
    default:
      return '无风险'
  }
}

// 全选/取消全选
const toggleSelectAll = () => {
  if (selectAll.value) {
    selectedItems.value = paginatedDetailList.value.map(item => item.id)
  } else {
    selectedItems.value = []
  }
}

// 页面大小变化
const handlePageSizeChange = () => {
  pagination.value.currentPage = 1
}

// 跳转到指定页面
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    pagination.value.currentPage = page
    emits('page-change', { page })
  }
}

// 处理跳转页面
const handleJumpToPage = () => {
  const page = parseInt(jumpToPage.value)
  if (page >= 1 && page <= totalPages.value) {
    goToPage(page)
  }
}

// 关闭弹窗
const close = () => {
  emits('close')
}

// 处理下载
const handleDownload = () => {
  emits('download', selectedItems.value.length > 0 ? selectedItems.value : detailList.value)
}

// 处理POD操作
const handlePodAction = (type) => {
  console.log('POD操作:', type, selectedItems.value)
  showPodDropdown.value = false
}

// 监听弹窗状态变化
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    // 重置状态
    pagination.value.currentPage = 1
    selectedItems.value = []
    selectAll.value = false
    filterRiskLevel.value = ''
    showPodDropdown.value = false
    
    // 如果有任务数据，使用任务数据中的详情列表
    if (props.taskData?.detailList) {
      detailList.value = props.taskData.detailList
    }
  }
})

// 任务统计信息
const taskInfo = computed(() => {
  return props.taskData?.taskInfo || {}
})

// 点击外部关闭下拉菜单
const handleClickOutside = (event) => {
  if (showPodDropdown.value && !event.target.closest('.relative')) {
    showPodDropdown.value = false
  }
}

// 监听点击事件
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    document.addEventListener('click', handleClickOutside)
  } else {
    document.removeEventListener('click', handleClickOutside)
  }
})
</script> 