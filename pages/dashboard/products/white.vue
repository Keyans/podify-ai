<template>
  <div class="flex flex-col h-screen bg-dark-bg">
    <!-- 顶部区域 - 页面标题 + 统计卡片 + 搜索栏 -->
    <div class="p-6 space-y-6">
      <!-- 页面标题和操作按钮 -->
      <PageTitle :totalList="totalList" />

      <PageSearch  
        v-model="params"
        :fields="searchFields"
        @search="onSearch"
        @reset="onReset"
      />
      <!-- 搜索和筛选栏 -->
      <div class="bg-dark-card rounded-lg p-4 border border-dark-border">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <!-- 视图切换 -->
            <div class="flex items-center space-x-2">
              <button 
                @click="viewMode = 'grid'"
                :class="viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-dark-input text-dark-text-secondary'"
                class="p-2 rounded-lg transition-colors"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                </svg>
              </button>
              <button 
                @click="viewMode = 'list'"
                :class="viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-dark-input text-dark-text-secondary'"
                class="p-2 rounded-lg transition-colors"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
                </svg>
              </button>
            </div>

            <!-- 筛选选项 -->
            <div class="flex items-center space-x-3">
              <select v-model="filterStatus" class="bg-dark-input border border-dark-border rounded-lg px-3 py-2 text-dark-text text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">全部状态</option>
                <option value="侵权">侵权</option>
                <option value="绿标">绿标</option>
                <option value="蓝标">蓝标</option>
              </select>

              <select v-model="filterCreator" class="bg-dark-input border border-dark-border rounded-lg px-3 py-2 text-dark-text text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">全部创建人</option>
                <option value="Admin">Admin</option>
                <option value="User1">User1</option>
              </select>

              <input 
                type="date" 
                v-model="filterDate"
                class="bg-dark-input border border-dark-border rounded-lg px-3 py-2 text-dark-text text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
        </div>

          <!-- 搜索框 -->
          <div class="flex items-center space-x-3">
            <div class="relative">
              <input 
                type="text" 
                v-model="searchQuery"
                placeholder="搜索商品名称或编号..."
                class="bg-dark-input border border-dark-border rounded-lg pl-10 pr-4 py-2 text-dark-text placeholder-dark-text-tertiary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80"
              />
              <svg class="w-5 h-5 text-dark-text-tertiary absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
            </div>
            <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
              搜索
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部区域 - 分类 + 商品 -->
    <div class="flex flex-1 overflow-hidden px-6 pb-6">
      <!-- 左侧分类栏 -->
      <div class="w-64 bg-dark-card border border-dark-border rounded-lg p-4 mr-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-dark-text font-semibold">商品分类</h3>
          <button 
            @click="showAddCategoryModal = true"
            class="text-blue-400 hover:text-blue-300 text-sm transition-colors"
          >
            添加分类
      </button>
    </div>

        <div class="space-y-1">
          <!-- 全部分类 -->
          <button 
            @click="selectCategory(null)"
            :class="selectedCategory === null ? 'bg-blue-600 text-white' : 'text-dark-text-secondary hover:text-dark-text hover:bg-dark-hover'"
            class="w-full text-left px-3 py-2 rounded-lg transition-colors text-sm flex items-center justify-between"
          >
            <span>全部</span>
            <span class="text-xs opacity-75">{{ getTotalCount() }}</span>
          </button>

          <!-- 系统分类 -->
          <div class="mt-4">
            <p class="text-dark-text-tertiary text-xs uppercase tracking-wider mb-2 px-3">系统分类</p>
            <div class="space-y-1">
              <button 
                v-for="category in systemCategories"
                :key="category.id"
                @click="selectCategory(category)"
                :class="selectedCategory?.id === category.id ? 'bg-blue-600 text-white' : 'text-dark-text-secondary hover:text-dark-text hover:bg-dark-hover'"
                class="w-full text-left px-3 py-2 rounded-lg transition-colors text-sm flex items-center justify-between"
              >
                <div class="flex items-center space-x-2">
                  <span>{{ category.icon }}</span>
                  <span>{{ category.name }}</span>
                </div>
                <span class="text-xs opacity-75">{{ category.count }}</span>
              </button>
                </div>
                </div>

          <!-- 自定义分类 -->
          <div class="mt-4">
            <p class="text-dark-text-tertiary text-xs uppercase tracking-wider mb-2 px-3">自定义分类</p>
            <div class="space-y-1">
              <div 
                v-for="category in userCategories"
                :key="category.id"
                class="group relative"
              >
                <button 
                  v-if="editingCategory !== category.id"
                  @click="selectCategory(category)"
                  :class="selectedCategory?.id === category.id ? 'bg-blue-600 text-white' : 'text-dark-text-secondary hover:text-dark-text hover:bg-dark-hover'"
                  class="w-full text-left px-3 py-2 rounded-lg transition-colors text-sm flex items-center justify-between"
                >
                  <div class="flex items-center space-x-2">
                    <span>{{ category.icon }}</span>
                    <span>{{ category.name }}</span>
                  </div>
                  <div class="flex items-center space-x-1">
                    <span class="text-xs opacity-75">{{ category.count }}</span>
                    <div class="opacity-0 group-hover:opacity-100 flex items-center space-x-1 ml-2">
                      <button 
                        @click.stop="editCategory(category.id)"
                        class="text-dark-text-tertiary hover:text-blue-400 transition-colors"
                      >
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                      </button>
                      <button 
                        @click.stop="deleteCategory(category.id)"
                        class="text-dark-text-tertiary hover:text-red-400 transition-colors"
                      >
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                      </button>
                    </div>
                </div>
                </button>

                <!-- 编辑模式 -->
                <div v-else class="flex items-center space-x-2 px-3 py-2">
                  <input 
                    v-model="categoryForm.name"
                    class="flex-1 bg-dark-input border border-dark-border rounded px-2 py-1 text-sm text-dark-text focus:outline-none focus:ring-1 focus:ring-blue-500"
                    @keyup.enter="saveCategoryEdit"
                    @keyup.escape="cancelCategoryEdit"
                  />
                  <button 
                    @click="saveCategoryEdit"
                    class="text-green-400 hover:text-green-300 transition-colors"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </button>
                  <button 
                    @click="cancelCategoryEdit"
                    class="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧商品展示区域 -->
      <div class="flex-1 bg-dark-card border border-dark-border rounded-lg p-6 overflow-auto">
        <!-- 商品网格视图 -->
        <div v-if="viewMode === 'grid'" class="grid grid-cols-4 gap-6">
          <div 
            v-for="product in filteredProducts" 
            :key="product.id"
            class="relative group cursor-pointer"
            @click="showProductDetail(product)"
          >
            <!-- 选择复选框 -->
            <div class="absolute top-3 left-3 z-10">
              <input 
                type="checkbox" 
                :checked="product.selected"
                @click.stop="toggleProduct(product.id)"
                class="w-4 h-4 rounded border-dark-border bg-dark-input text-blue-600 focus:ring-blue-500 focus:ring-2"
              />
                </div>

            <!-- 状态标签 -->
            <div class="absolute top-3 right-3 z-10">
              <span 
                :class="getStatusClass(product.status)"
                class="px-2 py-1 rounded text-xs font-medium"
              >
                {{ product.status }}
              </span>
                </div>

            <!-- 商品图片 -->
            <div class="aspect-square bg-dark-input rounded-lg overflow-hidden mb-3">
              <img 
                :src="product.image" 
                :alt="product.name"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
                </div>

            <!-- 商品信息 -->
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-blue-400 text-sm font-medium">${{ product.price }}</span>
                <span class="text-dark-text-tertiary text-xs">{{ product.sku }}</span>
                </div>
              
              <h3 class="text-dark-text text-sm font-medium line-clamp-2">{{ product.name }}</h3>
              
              <div class="flex items-center justify-between text-xs text-dark-text-secondary">
                <span>{{ product.creator }}</span>
                <span>{{ product.createTime }}</span>
              </div>
                </div>
                </div>
                </div>

        <!-- 商品列表视图 -->
        <div v-else class="space-y-3">
          <div 
            v-for="product in filteredProducts" 
            :key="product.id"
            class="flex items-center space-x-4 p-4 bg-dark-input rounded-lg hover:bg-dark-hover transition-colors cursor-pointer"
            @click="showProductDetail(product)"
          >
            <input 
              type="checkbox" 
              :checked="product.selected"
              @click.stop="toggleProduct(product.id)"
              class="w-4 h-4 rounded border-dark-border bg-dark-input text-blue-600 focus:ring-blue-500 focus:ring-2"
            />
            
            <img 
              :src="product.image" 
              :alt="product.name"
              class="w-16 h-16 object-cover rounded-lg"
            />
            
            <div class="flex-1">
              <div class="flex items-center space-x-2 mb-1">
                <h3 class="text-dark-text font-medium">{{ product.name }}</h3>
                <span 
                  :class="getStatusClass(product.status)"
                  class="px-2 py-1 rounded text-xs font-medium"
                >
                  {{ product.status }}
                </span>
              </div>
              <div class="flex items-center space-x-4 text-sm text-dark-text-secondary">
                <span>价格: ${{ product.price }}</span>
                <span>SKU: {{ product.sku }}</span>
                <span>创建人: {{ product.creator }}</span>
                <span>时间: {{ product.createTime }}</span>
                </div>
                </div>
                </div>
      </div>

      <!-- 分页 -->
        <div class="mt-8 flex items-center justify-between">
          <div class="text-dark-text-secondary text-sm">
            共 {{ filteredProducts.length }} 条记录
          </div>
          
          <div class="flex items-center space-x-2">
            <button 
              class="p-2 text-dark-text-secondary hover:text-dark-text hover:bg-dark-hover rounded transition-colors"
              @click="prevPage"
              :disabled="currentPage === 1"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            
            <span class="text-dark-text-secondary text-sm">{{ currentPage }} / {{ totalPages }}</span>
            
            <button 
              class="p-2 text-dark-text-secondary hover:text-dark-text hover:bg-dark-hover rounded transition-colors"
              @click="nextPage"
              :disabled="currentPage >= totalPages"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 商品详情弹窗 -->
    <!-- <WhiteProductDetailModal 
      :isOpen="showDetailModal"
      :product="selectedProduct"
      @close="closeDetailModal"
      @confirm="handleProductConfirm"
      @adjust-effect="handleAdjustEffect"
    /> -->

    <!-- 新建白品 - 选择产品弹窗 -->
    <!-- <ProductSelectorModal
      :isOpen="showCreateModal"
      @close="showCreateModal = false"
      @confirm="handleCreateConfirm"
    /> -->

    <!-- 添加分类弹窗 -->
    <div v-if="showAddCategoryModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="showAddCategoryModal = false">
      <div class="bg-dark-card rounded-lg p-6 w-96 border border-dark-border" @click.stop>
        <h3 class="text-lg font-semibold text-dark-text mb-4">添加分类</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-dark-text text-sm font-medium mb-2">分类名称</label>
            <input 
              v-model="newCategoryForm.name"
              type="text" 
              class="w-full bg-dark-input border border-dark-border rounded-lg px-3 py-2 text-dark-text focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="请输入分类名称"
            />
          </div>
          <div>
            <label class="block text-dark-text text-sm font-medium mb-2">分类图标</label>
            <input 
              v-model="newCategoryForm.icon"
              type="text" 
              class="w-full bg-dark-input border border-dark-border rounded-lg px-3 py-2 text-dark-text focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="请输入emoji图标"
            />
          </div>
        </div>
        <div class="flex items-center justify-end space-x-3 mt-6">
          <button 
            @click="showAddCategoryModal = false"
            class="px-4 py-2 text-dark-text-secondary hover:text-dark-text transition-colors"
          >
            取消
          </button>
          <button 
            @click="addCategory"
            class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            确定
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted,reactive } from 'vue'
import auth from '~/apis/auth'
import whiteApi from '~/apis/business/white'
import WhiteProductDetailModal from '~/components/WhiteProductDetailModal.vue'
import ProductSelectorModal from '~/components/ProductSelectorModal.vue'
import PageTitle from '~/components/common/pageTitle.vue'
import PageSearch from '~/components/common/pageSearch.vue'


const params = reactive({
  keyword: '',
  status: undefined,
  date: []
})

const searchFields = [
  {
    key: 'keyword',
    label: '关键词',
    component: 'a-input',
    props: { placeholder: '请输入', allowClear: true }
  },
  {
    key: 'status',
    label: '状态',
    component: 'a-select',
    props: {
      placeholder: '请选择',
      allowClear: true,
      options: [
        { label: '启用', value: 1 },
        { label: '停用', value: 0 }
      ]
    }
  },
  {
    key: 'date',
    label: '日期',
    component: 'a-range-picker',
    props: {
      placeholder: ['开始日期', '结束日期']
    }
  }
]

const onSearch = (val) => console.log('查询:', val)
const onReset = () => console.log('已重置')

const totalList = ref([
  {
    title: '产品总数',
    value: '1000'
  },
  {
    title: '自建',
    value: '1000'
  },
  {
    title: '今日新增',
    value: '1000'
  }
])

// 使用 dashboard 布局
definePageMeta({
  layout: 'dashboard'
})

useHead({
  title: '白品管理 - CUZCUZAI',
  meta: [
    { name: 'description', content: 'CUZCUZAI 白品管理页面' }
  ]
})

// 响应式数据
const showDetailModal = ref(false)
const selectedProduct = ref(null)
const showAddCategoryModal = ref(false)
const viewMode = ref('grid')
const selectedCategory = ref(null)
const editingCategory = ref(null)
const currentPage = ref(1)
const itemsPerPage = ref(20)
const showCreateModal = ref(false)

// 搜索和筛选
const searchQuery = ref('')
const filterStatus = ref('')
const filterCreator = ref('')
const filterDate = ref('')

// 表单数据
const categoryForm = ref({ name: '', icon: '' })
const newCategoryForm = ref({ name: '', icon: '' })

// 统计数据
const stats = ref({
  productCount: '9,156',
  skuCount: '25,432',
  todayCount: '344',
  storageUsed: '35.32GB'
})

// 系统分类
const systemCategories = ref([
  { id: 'uncategorized', name: '未分类', count: 421, icon: '📁' },
  { id: 'clothing', name: '服装', count: 341, icon: '👕' },
  { id: 'accessories', name: '配饰', count: 156, icon: '👒' },
  { id: 'home', name: '家居', count: 67, icon: '🏠' },
  { id: 'electronics', name: '电子产品', count: 89, icon: '📱' }
])

// 用户自定义分类
const userCategories = ref([
  { id: 'custom1', name: '夏季商品', count: 25, icon: '☀️' },
  { id: 'custom2', name: '冬季商品', count: 18, icon: '❄️' }
])

// 商品数据
const products = ref([])
const loading = ref(false)
const activeTab = ref('official') // official: 官方白品, self: 自有白品

const fetchProducts = async () => {
  try {
    loading.value = true
    const query = {
      page: currentPage.value,
      limit: itemsPerPage.value,
      categoryId: selectedCategory.value?.id || '',
      title: searchQuery.value || '',
      userId: activeTab.value === 'self' ? localStorage.getItem('user_id') || '' : ''
    }
    const res = await whiteApi.getWhiteProductList(query)
    const list = res?.data?.whiteProductList || []
    products.value = list.map((it)=>({      id: it.whiteProductId || it.id,
      name: it.title || it.name,
      price: it.price,
      sku: `${it.skuNum || 0} SKUs`,
      creator: it.creator || 'Admin',
      createTime: it.createTime,
      image: it.imageUrl || it.coverUrl,
      status: it.statusName || '',
      selected: false,
      category: it.categoryId
    }))
  } finally {
    loading.value = false
  }
}

// 计算属性
const filteredProducts = computed(() => {
  let filtered = products.value

  // 按分类筛选
  if (selectedCategory.value) {
    filtered = filtered.filter(product => product.category === selectedCategory.value.id)
  }

  // 按状态筛选
  if (filterStatus.value) {
    filtered = filtered.filter(product => product.status === filterStatus.value)
  }

  // 按创建人筛选
  if (filterCreator.value) {
    filtered = filtered.filter(product => product.creator === filterCreator.value)
  }

  // 按搜索关键词筛选
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.id.toLowerCase().includes(query)
    )
  }

  return filtered
})

const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage.value))

// 方法
const getTotalCount = () => {
  return products.value.length
}

const selectCategory = (category) => {
  selectedCategory.value = category
  currentPage.value = 1
}

const toggleProduct = (productId) => {
  const product = products.value.find(p => p.id === productId)
  if (product) {
    product.selected = !product.selected
  }
}

const showProductDetail = (product) => {
  selectedProduct.value = product
  showDetailModal.value = true
  // 拉取并填充详情（仅官方白品）
  fetchOfficialDetail(product.id)
}

const closeDetailModal = () => {
  showDetailModal.value = false
  selectedProduct.value = null
}

const handleProductConfirm = (productData) => {
  console.log('确认商品数据:', productData)
  closeDetailModal()
}

const handleAdjustEffect = (product) => {
  console.log('调整商品效果图:', product)
  // TODO: 实现调整商品效果图的逻辑
}

// 获取官方白品详情
const fetchOfficialDetail = async (id) => {
  try {
    const res = await whiteApi.getWhiteProductDetail(id)
    if (res?.data) {
      // 将详情字段合并到 selectedProduct，用于详情弹窗展示
      selectedProduct.value = {
        ...selectedProduct.value,
        ...res.data
      }
    }
  } catch (e) {
    console.error('获取白品详情失败', e)
  }
}

const getStatusClass = (status) => {
  switch (status) {
    case '侵权':
      return 'bg-red-600 text-white'
    case '绿标':
      return 'bg-green-600 text-white'
    case '蓝标':
      return 'bg-blue-600 text-white'
    default:
      return 'bg-gray-600 text-white'
  }
}

// 分类管理
const editCategory = (categoryId) => {
  const category = userCategories.value.find(c => c.id === categoryId)
  if (category) {
    editingCategory.value = categoryId
    categoryForm.value = { name: category.name, icon: category.icon }
  }
}

const saveCategoryEdit = () => {
  const category = userCategories.value.find(c => c.id === editingCategory.value)
  if (category) {
    category.name = categoryForm.value.name
    category.icon = categoryForm.value.icon
  }
  cancelCategoryEdit()
}

const cancelCategoryEdit = () => {
  editingCategory.value = null
  categoryForm.value = { name: '', icon: '' }
}

const deleteCategory = (categoryId) => {
  if (confirm('确定要删除此分类吗？')) {
    userCategories.value = userCategories.value.filter(c => c.id !== categoryId)
  }
}

const addCategory = () => {
  if (newCategoryForm.value.name) {
    const newCategory = {
      id: `custom${Date.now()}`,
      name: newCategoryForm.value.name,
      icon: newCategoryForm.value.icon || '📁',
      count: 0
    }
    userCategories.value.push(newCategory)
    newCategoryForm.value = { name: '', icon: '' }
    showAddCategoryModal.value = false
  }
}

// 分页方法
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

onMounted(() => {
  fetchProducts()
})

// 打开新建弹窗
const openCreateModal = () => {
  showCreateModal.value = true
}

// 处理选择产品后的确认
const handleCreateConfirm = (selectedProducts) => {
  console.log('选择用于新建的产品:', selectedProducts)
  showCreateModal.value = false
}
</script> 

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>