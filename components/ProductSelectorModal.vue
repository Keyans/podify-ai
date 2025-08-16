<template>
  <a-modal
    v-model:open="modalOpen"
    title="选择产品"
    width="1200px"
    :footer="null"
    centered
    :mask-closable="false"
    class="product-selector-modal"
    @cancel="close"
  >
    <div class="text-dark-text">

      <!-- 搜索、筛选区域 -->
      <div class="p-4 border-b border-dark-border">
        <pageSearch 
          v-model="searchFormData"
          :fields="searchFields"
          @search="handleSearch"
          @reset="handleReset"
        />
      </div>

      <!-- 选项卡和产品列表区域 -->
      <div class="overflow-y-auto" style="max-height: 400px;">
        <a-tabs v-model:activeKey="activeTab" @change="switchTab" class="px-4">
          <a-tab-pane key="official" tab="官方白品">
            <a-list
              :data-source="paginatedProducts"
              :grid="{ gutter: 16, column: 4 }"
              class="product-list"
            >
              <template #renderItem="{ item: product }">
                <a-list-item>
                  <div 
                    @click="toggleProduct(product)"
                    class="relative group cursor-pointer border rounded-lg overflow-hidden transition-all"
                    :class="selectedProductIds.includes(product.id) ? 'border-blue-500 ring-2 ring-blue-500' : 'border-dark-border hover:border-blue-400'"
                  >
                    <a-image 
                      :src="product.image" 
                      :alt="product.name"
                      class="w-full h-32 object-cover"
                      :preview="false"
                    />
                    <div class="p-3">
                      <div class="font-medium text-sm text-dark-text truncate">{{ product.name }}</div>
                      <div class="text-xs text-dark-text-secondary">{{ product.category }}</div>
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
                </a-list-item>
              </template>
              
              <!-- 无数据提示 -->
              <template #empty>
                <div class="text-center py-8 text-dark-text-secondary">
                  <svg class="w-12 h-12 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                  </svg>
                  <p>没有找到相关产品</p>
                </div>
              </template>
            </a-list>
          </a-tab-pane>
          
          <a-tab-pane key="self" tab="自有白品">
            <a-list
              :data-source="paginatedProducts"
              :grid="{ gutter: 16, column: 4 }"
              class="product-list"
            >
              <template #renderItem="{ item: product }">
                <a-list-item>
                  <div 
                    @click="toggleProduct(product)"
                    class="relative group cursor-pointer border rounded-lg overflow-hidden transition-all"
                    :class="selectedProductIds.includes(product.id) ? 'border-blue-500 ring-2 ring-blue-500' : 'border-dark-border hover:border-blue-400'"
                  >
                    <a-image 
                      :src="product.image" 
                      :alt="product.name"
                      class="w-full h-32 object-cover"
                      :preview="false"
                    />
                    <div class="p-3">
                      <div class="font-medium text-sm text-dark-text truncate">{{ product.name }}</div>
                      <div class="text-xs text-dark-text-secondary">{{ product.category }}</div>
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
                </a-list-item>
              </template>
              
              <!-- 无数据提示 -->
              <template #empty>
                <div class="text-center py-8 text-dark-text-secondary">
                  <svg class="w-12 h-12 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                  </svg>
                  <p>没有找到相关产品</p>
                </div>
              </template>
            </a-list>
          </a-tab-pane>
        </a-tabs>
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
  </a-modal>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits, watch, onMounted } from 'vue'
import whiteApi from '~/apis/business/white'
import pageSearch from '~/components/common/pageSearch.vue'

const props = defineProps({
  open: {
    type: Boolean,
    default: false
  },
  initialSelectedProducts: {
    type: Array,
    default: () => []
  }
})

const emits = defineEmits(['update:open', 'confirm'])

// 处理 a-modal 的双向绑定
const modalOpen = computed({
  get: () => props.open,
  set: (value) => emits('update:open', value)
})

// 搜索表单数据
const searchFormData = ref({
  searchQuery: '',
  selectedCategory: ''
})

// 搜索字段配置
const searchFields = ref([
  {
    key: 'searchQuery',
    label: '产品名称',
    component: 'a-input',
    props: {
      placeholder: '请输入产品名称'
    }
  },
  {
    key: 'selectedCategory',
    label: '产品分类',
    component: 'a-select',
    props: {
      placeholder: '请选择分类',
      options: [
        { value: '', label: '全部分类' },
        { value: 'clothing', label: '服装' },
        { value: 'bags', label: '包包' },
        { value: 'accessories', label: '配饰' },
        { value: 'home', label: '家居' },
        { value: 'electronics', label: '电子产品' }
      ]
    }
  }
])

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
  if (searchFormData.value.selectedCategory) {
    result = result.filter(product => product.category === searchFormData.value.selectedCategory)
  }
  
  // 按搜索关键词筛选
  if (searchFormData.value.searchQuery && searchFormData.value.searchQuery.trim()) {
    const searchLower = searchFormData.value.searchQuery.toLowerCase()
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
const handleSearch = (formData) => {
  searchFormData.value = { ...formData }
  pagination.value.currentPage = 1
  fetchList()
}

// 处理重置
const handleReset = () => {
  searchFormData.value = {
    searchQuery: '',
    selectedCategory: ''
  }
  pagination.value.currentPage = 1
  fetchList()
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
  emits('update:open', false)
}

// 重置状态
const resetState = () => {
  searchFormData.value = {
    searchQuery: '',
    selectedCategory: ''
  }
  selectedProductIds.value = []
  pagination.value.currentPage = 1
}

// 监听弹窗状态变化
watch(() => props.open, (newVal) => {
  if (newVal) {
    resetState()
    // 处理初始选中的产品
    if (props.initialSelectedProducts && props.initialSelectedProducts.length > 0) {
      selectedProductIds.value = props.initialSelectedProducts.map(product => product.id)
    }
    fetchList()
  }
})

// API：根据来源与分页获取数据
const fetchList = async () => {
  try {
    const query = {
      page: pagination.value.currentPage,
      limit: pagination.value.pageSize,
      title: searchFormData.value.searchQuery || '',
      userId: activeTab.value === 'self' ? (localStorage.getItem('user_id') || '') : ''
    }
    const res = await whiteApi.getWhiteProductList(query)
    const list = res?.data?.whiteProductList || res?.data || []
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
  activeTab.value = tab
  pagination.value.currentPage = 1
  await fetchList()
}

// 移除onMounted中的fetchList调用，只在弹窗打开时才加载数据
</script>