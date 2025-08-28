<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
    <div class="bg-dark-card rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto text-dark-text">
      <!-- 弹窗头部 -->
      <div class="p-5 border-b border-dark-border flex justify-between items-center">
        <h3 class="font-medium text-dark-text">SKU详情</h3>
        <button @click="close" class="text-gray-400 hover:text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <!-- 弹窗内容 -->
      <div class="p-6">
        <!-- 产品信息展示 -->
        <div class="bg-dark-input rounded-md p-4 mb-6">
          <div class="flex items-center space-x-4">
            <img :src="productInfo.mainImage" alt="产品主图" class="w-16 h-16 rounded-md object-cover">
            <img :src="productInfo.patternImage" alt="图案" class="w-16 h-16 rounded-md object-cover">
            <div class="flex-1">
              <h4 class="font-medium text-dark-text">{{ productInfo.name }}</h4>
              <p class="text-sm text-gray-400">{{ productInfo.sku }}</p>
            </div>
            <button @click="addProduct" class="px-4 py-2 text-blue-400 hover:text-blue-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>
        </div>

        <!-- SKU列表表格 -->
        <div class="bg-dark-input rounded-md">
          <div class="p-4 border-b border-dark-border">
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-400">共 {{ skuList.length }} 条记录</span>
              <div class="flex space-x-2">
                <button @click="exportSkuDetail" class="px-4 py-2 text-sm border border-dark-border rounded-md text-gray-400 hover:bg-dark-hover">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  导出详情
                </button>
                <button @click="close" class="px-4 py-2 text-sm bg-gray-600 hover:bg-gray-700 rounded-md text-white">
                  关闭
                </button>
              </div>
            </div>
          </div>
          
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-dark-hover">
                <tr>
                  <th class="px-4 py-3 text-left">
                    <input 
                      type="checkbox" 
                      v-model="selectAll" 
                      @change="toggleSelectAll"
                      class="rounded border-gray-600 bg-dark-input text-blue-500 focus:ring-blue-500"
                    >
                  </th>
                  <th class="px-4 py-3 text-left text-sm font-medium text-gray-400">序号</th>
                  <th class="px-4 py-3 text-left text-sm font-medium text-gray-400">SKU</th>
                  <th class="px-4 py-3 text-left text-sm font-medium text-gray-400">主图</th>
                  <th class="px-4 py-3 text-left text-sm font-medium text-gray-400">结果</th>
                  <th class="px-4 py-3 text-left text-sm font-medium text-gray-400">生成时间</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-dark-border">
                <tr v-for="(item, index) in skuList" :key="index" class="hover:bg-dark-hover">
                  <td class="px-4 py-3">
                    <input 
                      type="checkbox" 
                      v-model="item.selected"
                      class="rounded border-gray-600 bg-dark-input text-blue-500 focus:ring-blue-500"
                    >
                  </td>
                  <td class="px-4 py-3 text-sm text-gray-300">{{ index + 1 }}</td>
                  <td class="px-4 py-3">
                    <div class="flex items-center space-x-2">
                      <img :src="item.skuImage" alt="SKU图片" class="w-10 h-10 rounded object-cover cursor-pointer" data-zoomable>
                      <div class="text-sm text-dark-text">{{ item.skuTitle }}</div>
                    </div>
                  </td>
                  <td class="px-4 py-3">
                    <img :src="item.mainImage" alt="主图" class="w-10 h-10 rounded object-cover cursor-pointer" data-zoomable>
                  </td>
                  <td class="px-4 py-3">
                    <img :src="item.resultImage" alt="结果" class="w-10 h-10 rounded object-cover cursor-pointer" data-zoomable>
                  </td>
                  <td class="px-4 py-3 text-sm text-gray-400">{{ item.createdTime }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <!-- 分页 -->
          <div class="p-4 border-t border-dark-border flex justify-between items-center">
            <select v-model="pageSize" class="px-3 py-1 bg-dark-input border border-dark-border rounded text-sm text-dark-text">
              <option value="10">10/页</option>
              <option value="20">20/页</option>
              <option value="50">50/页</option>
              <option value="100">100/页</option>
            </select>
            
            <div class="flex items-center space-x-2">
              <button 
                @click="goToPage(currentPage - 1)"
                :disabled="currentPage <= 1"
                class="px-3 py-1 border border-dark-border rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed text-gray-400 hover:bg-dark-hover"
              >
                上一页
              </button>
              
              <div class="flex space-x-1">
                <button 
                  v-for="page in visiblePages" 
                  :key="page"
                  @click="goToPage(page)"
                  :class="[
                    'px-3 py-1 text-sm rounded',
                    page === currentPage 
                      ? 'bg-green-500 text-white' 
                      : 'border border-dark-border text-gray-400 hover:bg-dark-hover'
                  ]"
                >
                  {{ page }}
                </button>
              </div>
              
              <button 
                @click="goToPage(currentPage + 1)"
                :disabled="currentPage >= totalPages"
                class="px-3 py-1 border border-dark-border rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed text-gray-400 hover:bg-dark-hover"
              >
                下一页
              </button>
              
              <span class="text-sm text-gray-400 ml-2">
                跳转 
                <input 
                  v-model="pageInput" 
                  @keyup.enter="jumpToPage"
                  type="number" 
                  min="1" 
                  :max="totalPages"
                  class="w-12 px-1 py-1 bg-dark-input border border-dark-border rounded text-sm text-center text-dark-text mx-1"
                >
                页
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { getPodComposerSkuList } from '~/apis/business/pod-composer'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  taskId: {
    type: String,
    required: true
  },
  composerId: {
    type: String,
    required: true
  },
  productInfo: {
    type: Object,
    default: () => ({
      name: '男款短袖T恤欧版',
      sku: 'X0046V7ZYT',
      mainImage: 'https://via.placeholder.com/150/FFFFFF?text=T-shirt',
      patternImage: 'https://via.placeholder.com/150/FF5733/FFFFFF?text=Pattern'
    })
  }
})

const emits = defineEmits(['close', 'export'])

// 状态变量
const selectAll = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)
const pageInput = ref(1)
const loading = ref(false)

// SKU列表数据
const skuList = ref([
  {
    selected: false,
    color: '白色',
    size: 'S',
    sku: 'X0046V7ZYT',
    mainImage: 'https://via.placeholder.com/150/FFFFFF?text=S',
    resultImage: 'https://via.placeholder.com/150/000000/FFFFFF?text=Result',
    createdTime: '2025-07-24 01:12:39'
  },
  {
    selected: false,
    color: '白色',
    size: 'M',
    sku: 'X0046V7ZYT',
    mainImage: 'https://via.placeholder.com/150/FFFFFF?text=M',
    resultImage: 'https://via.placeholder.com/150/000000/FFFFFF?text=Result',
    createdTime: '2025-07-24 01:12:39'
  },
  {
    selected: false,
    color: '白色',
    size: 'L',
    sku: 'X0046V7ZYT',
    mainImage: 'https://via.placeholder.com/150/FFFFFF?text=L',
    resultImage: 'https://via.placeholder.com/150/000000/FFFFFF?text=Result',
    createdTime: '2025-07-24 01:12:39'
  },
  {
    selected: false,
    color: '白色',
    size: 'XL',
    sku: 'X0046V7ZYT',
    mainImage: 'https://via.placeholder.com/150/FFFFFF?text=XL',
    resultImage: 'https://via.placeholder.com/150/000000/FFFFFF?text=Result',
    createdTime: '2025-07-24 01:12:39'
  }
])

// 总数据量
const totalItems = ref(0)

// 计算属性
const totalPages = computed(() => Math.ceil(totalItems.value / pageSize.value))

const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(totalPages.value, start + 4)
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

// 获取SKU列表数据
const fetchSkuList = async () => {
  if (!props.taskId || !props.composerId) return
  
  loading.value = true
  try {
    const params = {
      taskId: props.taskId,
      composerId: props.composerId,
      page: currentPage.value,
      limit: pageSize.value
    }
    
    console.log('获取SKU列表参数:', params)
    const response = await getPodComposerSkuList(params)
    console.log('SKU列表API响应:', response)
    
    if (response.success && response.data) {
      // 处理响应数据，将API返回的字段映射到组件期望的数据结构
      const skuData = response.data.composerList || []
      skuList.value = skuData.map(item => ({
        selected: false,
        composerId: item.composerId,
        skuTitle: item.skuTitle || '',
        skuImage: item.skuImageUrl || 'https://via.placeholder.com/150/FFFFFF?text=SKU',
        mainImage: item.imageUrl || 'https://via.placeholder.com/150/FFFFFF?text=Product',
        resultImage: item.resultsImageUrl || '',
        createdTime: item.createTime || '',
        status: item.status || 0
      }))
      
      // 更新总数据量
      totalItems.value = response.data.total || skuData.length
      
      console.log('处理后的SKU数据:', skuList.value)
      console.log('总数据量:', totalItems.value)
    }
  } catch (error) {
    console.error('获取SKU列表失败:', error)
  } finally {
    loading.value = false
  }
}

// 切换全选
const toggleSelectAll = () => {
  skuList.value.forEach(item => {
    item.selected = selectAll.value
  })
}

// 监听单个选择变化
watch(skuList, () => {
  selectAll.value = skuList.value.length > 0 && skuList.value.every(item => item.selected)
}, { deep: true })

// 分页相关方法
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    pageInput.value = page
    fetchSkuList()
  }
}

const jumpToPage = () => {
  const page = parseInt(pageInput.value)
  if (page >= 1 && page <= totalPages.value) {
    goToPage(page)
  }
}

// 导出SKU详情
const exportSkuDetail = () => {
  const selectedItems = skuList.value.filter(item => item.selected)
  emits('export', selectedItems)
}

// 添加产品
const addProduct = () => {
  console.log('添加产品到购物车或其他操作')
}

// 关闭弹窗
const close = () => {
  emits('close')
}

// 监听弹窗打开状态
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    fetchSkuList()
  }
})

// 组件挂载时获取数据
onMounted(() => {
  if (props.isOpen) {
    fetchSkuList()
  }
})
</script>

<style scoped>
/* 深色主题样式 */
.bg-dark-card {
  background-color: #1f2937;
}

.bg-dark-input {
  background-color: #374151;
}

.bg-dark-hover:hover {
  background-color: #4b5563;
}

.border-dark-border {
  border-color: #4b5563;
}

.text-dark-text {
  color: #f9fafb;
}

.divide-dark-border > :not([hidden]) ~ :not([hidden]) {
  border-color: #4b5563;
}
</style>