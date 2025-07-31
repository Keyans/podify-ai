<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
    <div class="bg-dark-card rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto text-dark-text">
      <!-- 弹窗头部 -->
      <div class="p-5 border-b border-dark-border flex justify-between items-center">
        <h3 class="font-medium text-dark-text">生图详情 <span class="text-gray-400 text-sm">任务ID：{{ taskData?.id || taskData?.生图ID || 'COL001' }}</span></h3>
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
            <div class="text-sm text-gray-400 mb-1">生图数</div>
            <div class="font-medium">{{ taskData?.目标 || taskData?.targetCount || '25,212' }}</div>
          </div>
          <div class="bg-dark-input rounded-md p-4">
            <div class="text-sm text-gray-400 mb-1">目标数</div>
            <div class="font-medium">{{ taskData?.成功 || taskData?.successCount || '156' }}</div>
          </div>
          <div class="bg-dark-input rounded-md p-4">
            <div class="text-sm text-gray-400 mb-1">成功数</div>
            <div class="font-medium">{{ taskData?.失败 || taskData?.failedCount || '156' }}</div>
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
                <th class="py-3 px-4 text-left">参考图</th>
                <th class="py-3 px-4 text-left">结果图</th>
                <th class="py-3 px-4 text-left">生图尺寸</th>
                <th class="py-3 px-4 text-left">描述</th>
                <th class="py-3 px-4 text-left">状态</th>
                <th class="py-3 px-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="loading" class="border-b border-dark-border">
                <td colspan="8" class="py-8 text-center text-gray-400">
                  <div class="flex items-center justify-center">
                    <div class="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mr-2"></div>
                    加载中...
                  </div>
                </td>
              </tr>
              <tr v-else-if="displayItems.length === 0" class="border-b border-dark-border">
                <td colspan="8" class="py-8 text-center text-gray-400">暂无数据</td>
              </tr>
              <tr v-else v-for="(item, index) in displayItems" :key="item.id || index" class="border-b border-dark-border">
                <td class="py-3 px-4">
                  <input type="checkbox" v-model="item.selected" />
                </td>
                <td class="py-3 px-4">{{ (currentPage - 1) * pageSize + index + 1 }}</td>
                <td class="py-3 px-4">
                  <div class="w-16 h-16 bg-dark-hover rounded-md overflow-hidden">
                    <img v-if="item.referenceImage" :src="item.referenceImage" alt="参考图" class="w-full h-full object-cover" />
                    <div v-else class="w-full h-full bg-dark-hover flex items-center justify-center">
                      <span class="text-xs text-gray-500">无参考图</span>
                    </div>
                  </div>
                </td>
                <td class="py-3 px-4">
                  <div class="flex space-x-2">
                    <div v-for="(resultImg, imgIndex) in item.resultImages || []" :key="imgIndex" class="w-16 h-16 bg-dark-hover rounded-md overflow-hidden">
                      <img :src="resultImg" alt="结果图" class="w-full h-full object-cover" />
                    </div>
                    <div v-if="!item.resultImages || item.resultImages.length === 0" class="w-16 h-16 bg-dark-hover rounded-md flex items-center justify-center">
                      <span class="text-xs text-gray-500">生成中</span>
                    </div>
                  </div>
                </td>
                <td class="py-3 px-4">
                  <span class="text-sm">{{ item.dimensions || '1024×1024' }}</span>
                </td>
                <td class="py-3 px-4">
                  <div class="max-w-xs">
                    <p class="text-sm text-gray-300 truncate" :title="item.description">
                      {{ item.description || item.prompt || 'SONDER Graphic Print T-Shirt - Unisex...' }}
                    </p>
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
                  <button 
                    @click="downloadImage(item)"
                    class="text-blue-400 hover:text-blue-300 text-sm"
                  >
                    下载图片
                  </button>
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
            <span class="text-sm text-gray-400">{{ pageSize }}/页</span>
            
            <!-- 页码按钮 -->
            <div class="flex items-center space-x-1">
              <button 
                @click="goToPage(currentPage - 1)"
                :disabled="currentPage === 1"
                class="w-8 h-8 flex items-center justify-center border border-dark-border rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button 
                v-for="page in visiblePages" 
                :key="page"
                @click="goToPage(page)"
                class="w-8 h-8 flex items-center justify-center border border-dark-border rounded-md text-sm"
                :class="currentPage === page ? 'bg-green-600 text-white border-green-600' : 'hover:bg-dark-hover'"
              >
                {{ page }}
              </button>
              
              <button 
                @click="goToPage(currentPage + 1)"
                :disabled="currentPage === totalPages"
                class="w-8 h-8 flex items-center justify-center border border-dark-border rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            <div class="flex items-center space-x-2">
              <span class="text-sm text-gray-400">跳转</span>
              <input 
                v-model="jumpPage"
                @keyup.enter="jumpToPage"
                type="number" 
                :min="1" 
                :max="totalPages"
                class="w-12 px-2 py-1 text-sm bg-dark-input border border-dark-border rounded text-center"
              />
            </div>
          </div>
        </div>
      </div>
      
      <!-- 弹窗底部 -->
      <div class="p-5 border-t border-dark-border flex justify-end space-x-3">
        <button @click="close" class="px-4 py-2 border border-dark-border rounded-md text-gray-400 hover:bg-dark-hover">关闭</button>
        <button @click="exportTextToImageDetail" class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">导出详情</button>
        <div class="relative">
          <button @click="showMoreActions = !showMoreActions" class="px-4 py-2 border border-dark-border rounded-md text-gray-400 hover:bg-dark-hover flex items-center">
            更多操作
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div v-if="showMoreActions" class="absolute bottom-full right-0 mb-2 w-40 bg-dark-card border border-dark-border rounded-md shadow-lg z-10">
            <div class="py-1">
              <a href="#" class="block px-4 py-2 text-sm text-dark-text hover:bg-dark-hover" @click.prevent="exportDetail">保存收藏</a>
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
  return props.taskData?.detailList || mockDetailData.value
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
  
  return pages.filter(page => page !== '...' || pages.indexOf(page) === pages.lastIndexOf(page))
})

// 显示的数据项
const displayItems = computed(() => {
  const list = detailList.value || []
  if (props.taskData?.detailList) {
    // 如果有真实数据，直接返回
    return list
  } else {
    // 否则使用模拟数据进行分页
    const start = (currentPage.value - 1) * pageSize.value
    const end = start + pageSize.value
    return list.slice(start, end)
  }
})

// 模拟详情数据
const mockDetailData = ref([
  {
    id: 1,
    referenceImage: 'https://via.placeholder.com/150/000000/FFFFFF?text=Ref+1',
    resultImages: [
      'https://via.placeholder.com/150/FF0000/FFFFFF?text=Result+1A',
      'https://via.placeholder.com/150/00FF00/FFFFFF?text=Result+1B'
    ],
    dimensions: '1024×1024',
    description: 'SONDER Graphic Print T-Shirt - Unisex...',
    prompt: 'A stylish graphic t-shirt design',
    status: '已完成',
    selected: false
  },
  {
    id: 2,
    referenceImage: null,
    resultImages: [
      'https://via.placeholder.com/150/0000FF/FFFFFF?text=Result+2A',
      'https://via.placeholder.com/150/FF00FF/FFFFFF?text=Result+2B',
      'https://via.placeholder.com/150/FFFF00/000000?text=Result+2C',
      'https://via.placeholder.com/150/00FFFF/000000?text=Result+2D'
    ],
    dimensions: '1080×1920',
    description: 'Men\'s Humorous Cat Graphic T-Shirt - ...',
    prompt: 'A funny cat illustration on t-shirt',
    status: '部分失败',
    selected: false
  },
  {
    id: 3,
    referenceImage: 'https://via.placeholder.com/150/800080/FFFFFF?text=Ref+3',
    resultImages: [],
    dimensions: '1080×1920',
    description: 'Grey Summer Casual Tee, Regular Fit Ro...',
    prompt: 'A casual summer t-shirt design',
    status: '失败',
    selected: false
  },
  {
    id: 4,
    referenceImage: 'https://via.placeholder.com/150/FFA500/FFFFFF?text=Ref+4',
    resultImages: [
      'https://via.placeholder.com/150/008000/FFFFFF?text=Result+4A',
      'https://via.placeholder.com/150/800000/FFFFFF?text=Result+4B'
    ],
    dimensions: '1024×1024',
    description: '"Every for Man Has A Character" Design...',
    prompt: 'Inspirational quote t-shirt design',
    status: '处理中',
    selected: false
  },
  {
    id: 5,
    referenceImage: 'https://via.placeholder.com/150/4169E1/FFFFFF?text=Ref+5',
    resultImages: [
      'https://via.placeholder.com/150/DC143C/FFFFFF?text=Result+5A'
    ],
    dimensions: '1024×1024',
    description: 'Quirky Design, Durable Fabric, Comfort...',
    prompt: 'A quirky and comfortable t-shirt design',
    status: '已完成',
    selected: false
  }
])

// 方法
const close = () => {
  emits('close')
}

const toggleSelectAll = () => {
  displayItems.value.forEach(item => {
    item.selected = selectAll.value
  })
}

const filterByStatus = (status) => {
  selectedStatus.value = status
  showStatusDropdown.value = false
  // 这里可以添加筛选逻辑
}

const getStatusClass = (status) => {
  const statusClasses = {
    '已完成': 'bg-green-100 text-green-800',
    '处理中': 'bg-yellow-100 text-yellow-800',
    '失败': 'bg-red-100 text-red-800',
    '部分失败': 'bg-orange-100 text-orange-800'
  }
  return statusClasses[status] || 'bg-gray-100 text-gray-800'
}

const getStatusText = (status) => {
  return status || '未知'
}

const downloadImage = (item) => {
  console.log('下载图片:', item)
  emits('download', item)
}

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value && page !== currentPage.value) {
    currentPage.value = page
    
    // 如果有真实数据，通知父组件进行分页
    if (props.taskData?.detailList) {
      emits('page-change', {
        page: page,
        limit: pageSize.value
      })
    }
  }
}

const jumpToPage = () => {
  const page = parseInt(jumpPage.value)
  if (page && page >= 1 && page <= totalPages.value) {
    goToPage(page)
    jumpPage.value = ''
  }
}

const exportTextToImageDetail = () => {
  console.log('导出文生图详情')
}

const exportDetail = () => {
  console.log('保存收藏')
  showMoreActions.value = false
}

// 监听任务数据变化，重置分页
watch(() => props.taskData, (newData) => {
  if (newData?.detailPagination) {
    currentPage.value = newData.detailPagination.page || 1
    pageSize.value = newData.detailPagination.limit || 10
  }
}, { deep: true })

// 监听弹窗打开，重置状态
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    selectAll.value = false
    showStatusDropdown.value = false
    showMoreActions.value = false
    selectedStatus.value = '全部'
    jumpPage.value = ''
    currentPage.value = 1
  }
})
</script> 