<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 z-60 flex items-center justify-center">
    <div class="bg-dark-card rounded-lg w-full max-w-5xl max-h-[80vh] overflow-hidden text-dark-text">
      <!-- Header -->
      <div class="p-4 border-b border-dark-border flex justify-between items-center">
        <h4 class="font-medium text-dark-text">选择产品</h4>
        <button @click="close" class="text-gray-400 hover:text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- 搜索、筛选与来源切换区域 -->
      <div class="p-4 border-b border-dark-border">
        <div class="flex items-center justify-between mb-3">
          <!-- 来源切换：官方白品 / 自有白品 -->
          <div class="flex items-center space-x-2">
            <button
              @click="switchTab('official')"
              :class="activeTab==='official' ? 'bg-blue-600 text-white' : 'bg-dark-input text-dark-text-secondary'"
              class="px-3 py-1 rounded-md text-sm"
            >官方白品</button>
            <button
              @click="switchTab('self')"
              :class="activeTab==='self' ? 'bg-blue-600 text-white' : 'bg-dark-input text-dark-text-secondary'"
              class="px-3 py-1 rounded-md text-sm"
            >自有白品</button>
          </div>

          <!-- 可放置右侧的更多筛选下拉 -->
        </div>

        <div class="flex items-center space-x-4">
          <!-- 搜索框 -->
          <div class="flex-1 relative">
            <input 
              v-model="searchQuery"
              type="text"
              placeholder="搜索产品"
              class="w-full px-3 py-2 bg-dark-input border border-dark-border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-dark-text pl-10"
              @input="handleSearch"
            />
            <svg class="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>

          <!-- 分类筛选 -->
          <div class="relative">
            <select 
              v-model="selectedCategory"
              @change="handleCategoryChange"
              class="px-3 py-2 bg-dark-input border border-dark-border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-dark-text"
            >
              <option value="">选择分类</option>
              <option value="clothing">服装</option>
              <option value="bags">包包</option>
              <option value="accessories">配饰</option>
              <option value="home">家居</option>
              <option value="electronics">电子产品</option>
            </select>
          </div>
        </div>
      </div>

      <!-- 产品列表区域 -->
      <div class="p-4 overflow-y-auto" style="max-height: 400px;">
        <div class="grid grid-cols-4 gap-4 mb-4">
          <div v-for="product in paginatedProducts" :key="product.id" class="relative group cursor-pointer">
            <div 
              @click="toggleProduct(product)"
              class="border rounded-lg overflow-hidden transition-all"
              :class="selectedProductIds.includes(product.id) ? 'border-blue-500 ring-2 ring-blue-500' : 'border-dark-border hover:border-blue-400'"
            >
              <img 
                :src="product.image" 
                :alt="product.name"
                class="w-full h-32 object-cover"
              />
              <div class="p-3">
                <div class="font-medium text-sm text-dark-text truncate">{{ product.name }}</div>
                <div class="text-xs text-dark-text-secondary">{{ product.category }}</div>
              </div>
            </div>
            
            <!-- 选中标记 -->
            <div v-if="selectedProductIds.includes(product.id)" class="absolute top-2 right-2">
              <div class="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- 无数据提示 -->
        <div v-if="filteredProducts.length === 0" class="text-center py-8 text-dark-text-secondary">
          <svg class="w-12 h-12 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
          </svg>
          <p>没有找到相关产品</p>
        </div>
      </div>

      <!-- 分页区域 -->
      <div v-if="filteredProducts.length > 0" class="p-4 border-t border-dark-border">
        <div class="flex items-center justify-between">
          <div class="text-sm text-dark-text-secondary">
            已选择 {{ selectedProductIds.length }} 款产品
          </div>
          
          <!-- 分页控件 -->
          <div class="flex items-center space-x-2">
            <button 
              @click="goToPage(pagination.currentPage - 1)"
              :disabled="pagination.currentPage === 1"
              class="px-3 py-1 text-sm rounded border border-dark-border text-dark-text disabled:opacity-50 disabled:cursor-not-allowed hover:bg-dark-hover"
            >
              <
            </button>
            
            <span class="text-sm text-dark-text">
              {{ pagination.currentPage }}
            </span>
            
            <button 
              @click="goToPage(pagination.currentPage + 1)"
              :disabled="pagination.currentPage >= totalPages"
              class="px-3 py-1 text-sm rounded border border-dark-border text-dark-text disabled:opacity-50 disabled:cursor-not-allowed hover:bg-dark-hover"
            >
              >
            </button>
            
            <span class="text-sm text-dark-text-secondary">
              ...
            </span>
            
            <button 
              @click="goToPage(totalPages)"
              :disabled="pagination.currentPage >= totalPages"
              class="px-3 py-1 text-sm rounded border border-dark-border text-dark-text disabled:opacity-50 disabled:cursor-not-allowed hover:bg-dark-hover"
            >
              >
            </button>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="p-4 border-t border-dark-border flex justify-end space-x-3">
        <button @click="close" class="px-4 py-2 border border-dark-border rounded-md text-dark-text-secondary hover:bg-dark-hover">
          取消
        </button>
        <button 
          @click="confirmSelection"
          :disabled="selectedProductIds.length === 0"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          确定选择
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits, watch, onMounted } from 'vue'
import whiteApi from '~/apis/business/white'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['close', 'confirm'])

// 搜索和筛选状态
const searchQuery = ref('')
const selectedCategory = ref('')

// 选中的产品ID列表
const selectedProductIds = ref([])

// 分页状态
const pagination = ref({
  currentPage: 1,
  pageSize: 8
})

// 当前来源
const activeTab = ref('official') // official: 官方白品, self: 自有白品

// 产品数据
const allProducts = ref([])
const total = ref(0)

// 筛选后的产品
const filteredProducts = computed(() => {
  let result = [...allProducts.value]
  
  // 按分类筛选
  if (selectedCategory.value) {
    result = result.filter(product => product.category === selectedCategory.value)
  }
  
  // 按搜索关键词筛选
  if (searchQuery.value.trim()) {
    const searchLower = searchQuery.value.toLowerCase()
    result = result.filter(product => 
      product.name.toLowerCase().includes(searchLower) ||
      product.category.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower)
    )
  }
  
  return result
})

// 总页数（使用接口返回的 total 进行计算；若没有则回退本地长度）
const totalPages = computed(() => {
  const sourceTotal = total.value || filteredProducts.value.length
  return Math.ceil(sourceTotal / pagination.value.pageSize)
})

// 分页后的产品
const paginatedProducts = computed(() => {
  const start = (pagination.value.currentPage - 1) * pagination.value.pageSize
  const end = start + pagination.value.pageSize
  return filteredProducts.value.slice(start, end)
})

// 处理搜索
const handleSearch = () => {
  pagination.value.currentPage = 1
}

// 处理分类变化
const handleCategoryChange = () => {
  pagination.value.currentPage = 1
}

// 分页跳转
const goToPage = async (page) => {
  if (page >= 1 && page <= totalPages.value) {
    pagination.value.currentPage = page
    await fetchList()
  }
}

// 切换产品选择
const toggleProduct = (product) => {
  const index = selectedProductIds.value.indexOf(product.id)
  if (index > -1) {
    selectedProductIds.value.splice(index, 1)
  } else {
    selectedProductIds.value.push(product.id)
  }
}

// 确认选择
const confirmSelection = () => {
  const selectedProducts = allProducts.value.filter(product => 
    selectedProductIds.value.includes(product.id)
  )
  emits('confirm', selectedProducts)
}

// 关闭弹窗
const close = () => {
  emits('close')
}

// 重置状态
const resetState = () => {
  searchQuery.value = ''
  selectedCategory.value = ''
  selectedProductIds.value = []
  pagination.value.currentPage = 1
}

// 监听弹窗状态变化
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    resetState()
    fetchList()
  }
})

// API：根据来源与分页获取数据
const fetchList = async () => {
  try {
    const query = {
      page: pagination.value.currentPage,
      limit: pagination.value.pageSize,
      title: searchQuery.value || '',
      userId: activeTab.value === 'self' ? (localStorage.getItem('user_id') || '') : ''
    }
    const res = await whiteApi.getWhiteProductList(query)
    const list = res?.data?.list || res?.data || []
    total.value = res?.data?.total || list.length
    allProducts.value = list.map((it) => ({
      id: it.id || it.productId,
      name: it.title || it.name,
      image: it.coverUrl || it.imageUrl,
      category: it.categoryName || '',
      description: it.description || ''
    }))
  } catch (e) {
    console.error('加载白品列表失败', e)
    allProducts.value = []
    total.value = 0
  }
}

const switchTab = async (tab) => {
  if (activeTab.value !== tab) {
    activeTab.value = tab
    pagination.value.currentPage = 1
    await fetchList()
  }
}

// 移除onMounted中的fetchList调用，只在弹窗打开时才加载数据
</script>