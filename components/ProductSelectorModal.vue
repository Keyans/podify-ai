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

      <!-- 搜索和筛选区域 -->
      <div class="p-4 border-b border-dark-border">
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
import { getProductList } from '~/apis/business/title-generation'

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

// 产品数据
const allProducts = ref([
  // 服装类
  { id: '1', name: '纯棉圆领T恤', image: 'https://via.placeholder.com/200x200/333/fff?text=T恤', category: '服装', description: '舒适纯棉材质，多色可选' },
  { id: '2', name: '商务马克杯', image: 'https://via.placeholder.com/200x200/666/fff?text=杯子', category: '家居', description: '陶瓷材质，适合办公使用' },
  { id: '3', name: '帆布手提袋', image: 'https://via.placeholder.com/200x200/999/fff?text=包包', category: '包包', description: '环保帆布材质，大容量设计' },
  { id: '4', name: '方形抱枕', image: 'https://via.placeholder.com/200x200/ccc/000?text=抱枕', category: '家居', description: '柔软舒适，多种图案可选' },
  { id: '5', name: '连帽卫衣', image: 'https://via.placeholder.com/200x200/555/fff?text=卫衣', category: '服装', description: '加厚保暖，时尚百搭' },
  { id: '6', name: '帽子', image: 'https://via.placeholder.com/200x200/777/fff?text=帽子', category: '配饰', description: '防晒遮阳，户外必备' },
  { id: '7', name: '橙色上衣', image: 'https://via.placeholder.com/200x200/ffa500/fff?text=上衣', category: '服装', description: '亮眼橙色，青春活力' },
  { id: '8', name: '窗帘', image: 'https://via.placeholder.com/200x200/ddd/000?text=窗帘', category: '家居', description: '遮光效果好，多种款式' },
  { id: '9', name: '白色T恤', image: 'https://via.placeholder.com/200x200/eee/000?text=白T', category: '服装', description: '经典白色，百搭单品' },
  { id: '10', name: '蓝色衬衫', image: 'https://via.placeholder.com/200x200/87ceeb/000?text=衬衫', category: '服装', description: '商务休闲，质感面料' },
  { id: '11', name: '运动鞋', image: 'https://via.placeholder.com/200x200/ff6347/fff?text=鞋子', category: '配饰', description: '舒适透气，运动首选' },
  { id: '12', name: '背包', image: 'https://via.placeholder.com/200x200/4682b4/fff?text=背包', category: '包包', description: '大容量设计，出行便携' }
])

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

// 总页数
const totalPages = computed(() => {
  return Math.ceil(filteredProducts.value.length / pagination.value.pageSize)
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
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    pagination.value.currentPage = page
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
  }
})

// 组件挂载时加载产品数据
onMounted(async () => {
  // 这里可以调用真实的API获取产品数据
  // try {
  //   const response = await getProductList({ page: 1, limit: 100 })
  //   if (response.success) {
  //     allProducts.value = response.data.list || []
  //   }
  // } catch (error) {
  //   console.error('获取产品列表失败:', error)
  // }
})
</script> 