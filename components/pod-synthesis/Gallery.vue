<template>
  <div class="flex flex-col h-full">
    <!-- 图库类型选择 -->
    <div class="flex space-x-4 mb-6">
      <button 
        v-for="type in galleryTypes" 
        :key="type.key"
        @click="selectGalleryType(type.key)"
        class="px-4 py-2 rounded-md text-sm font-medium transition-colors"
        :class="{
          'text-white': selectedGalleryType === type.key,
          'border': selectedGalleryType !== type.key
        }"
        :style="{
          backgroundColor: selectedGalleryType === type.key ? 'var(--accent-color)' : 'var(--bg-tertiary)',
          color: selectedGalleryType === type.key ? 'white' : 'var(--text-primary)',
          borderColor: selectedGalleryType !== type.key ? 'var(--border-color)' : 'transparent'
        }"
      >
        {{ type.label }}
      </button>
    </div>

    <!-- 主要内容区域：左右分栏 -->
    <div class="flex flex-1 overflow-hidden">
      <!-- 左侧分类面板 -->
      <div class="w-64 border-r flex flex-col" :style="{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }">
        <!-- 分类标题和搜索 -->
        <div class="p-4 border-b" :style="{ borderColor: 'var(--border-color)' }">
          <h3 class="font-medium mb-3" :style="{ color: 'var(--text-primary)' }">图片分类</h3>
          <input 
            type="text" 
            v-model="searchKeyword" 
            @input="handleSearchInput"
            placeholder="搜索图片" 
            class="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:border-transparent"
            :style="{
              backgroundColor: 'var(--bg-tertiary)',
              color: 'var(--text-primary)',
              borderColor: 'var(--border-color)'
            }"
          >
        </div>

        <!-- 分类列表 -->
        <div class="flex-1 overflow-y-auto">
          <!-- 全部分类 -->
          <div 
            @click="selectCategory('全部')"
            class="flex items-center px-4 py-3 cursor-pointer transition-colors"
            :class="selectedCategory === '全部' ? 'text-white' : 'hover:opacity-80'"
            :style="{
              backgroundColor: selectedCategory === '全部' ? 'var(--accent-color)' : 'transparent',
              color: selectedCategory === '全部' ? 'white' : 'var(--text-primary)'
            }"
          >
            <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
            </svg>
            <span class="flex-1">全部</span>
            <span class="text-xs px-2 py-1 rounded" :style="{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }">{{ pagination.total }}</span>
          </div>

          <!-- 用户定义分类 -->
          <div v-if="apiCategories.length === 0 && !categoriesLoading" class="text-sm text-gray-500 px-2 py-4">
            🔍 [Debug] 没有分类数据
          </div>
          <div v-if="categoriesLoading" class="text-sm text-gray-500 px-2 py-4">
            🔍 [Debug] 正在加载分类...
          </div>
             <component 
               :is="CategoryTreeNode"
               v-for="category in apiCategories" 
               :key="category.categoryId"
               :category="category"
               :selected-category="selectedCategory"
               :level="0"
               :get-category-count="getCategoryCount"
               @select="selectCategory"
             />
        </div>
      </div>

      <!-- 右侧图片展示区域 -->
      <div class="flex-1 flex flex-col">
        <!-- 图片内容区域 -->
        <div class="flex-1 overflow-auto p-6">
          <!-- 加载状态 -->
          <div v-if="loading" class="flex justify-center py-8">
            <div class="text-sm" :style="{ color: 'var(--text-secondary)' }">加载中...</div>
          </div>
          
          <div v-else-if="error" class="text-center py-8">
            <div class="text-sm text-red-500">{{ error }}</div>
          </div>
          
          <!-- 图片网格 -->
          <div v-else class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
      <div 
        v-for="(image, index) in paginatedImages" 
        :key="image.id || index" 
        @click="toggleSelectImage(image)"
        class="group relative rounded-lg overflow-hidden border cursor-pointer transition-all duration-200 hover:shadow-md"
        :style="{
          borderColor: image.selected ? 'var(--accent-color)' : 'var(--border-color)',
          backgroundColor: 'var(--bg-secondary)'
        }"
      >
        <!-- 选择复选框 -->
        <div class="absolute top-2 left-2 z-10">
          <input 
            type="checkbox" 
            :checked="image.selected"
            @click.stop
            @change="toggleSelectImage(image)"
            class="w-4 h-4 rounded"
            :style="{
              accentColor: 'var(--accent-color)'
            }"
          />
        </div>

        <!-- 图片 -->
        <div class="aspect-square overflow-hidden">
          <OptimizedImage 
            :src="image.imageUrl || image.image" 
            :alt="image.title || '图片'"
            class="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
            :show-zoom-icon="false"
            lazy
          />
        </div>
      </div>
          </div>

          <!-- 分页和统计信息 -->
          <div class="border-t pt-6 mt-6" :style="{ borderColor: 'var(--border-color)' }">
            <div class="flex items-center justify-between">
              <div class="text-sm" :style="{ color: 'var(--text-secondary)' }">
                已选择 {{ selectedImages.length }} 张图片，共 {{ filteredImages.length }} 张
              </div>
              
              <!-- 分页控件 -->
              <div class="flex items-center space-x-2">
                <button 
                  @click="goToPage(pagination.currentPage - 1)"
                  :disabled="pagination.currentPage === 1"
                  class="px-3 py-1 text-sm rounded border disabled:opacity-50 disabled:cursor-not-allowed"
                  :style="{
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)',
                    backgroundColor: 'var(--bg-tertiary)'
                  }"
                >
                  上一页
                </button>
                
                <span 
                  class="px-3 py-1 rounded text-sm text-white"
                  :style="{ backgroundColor: 'var(--accent-color)' }"
                >
                  {{ pagination.currentPage }}
                </span>
                
                <button 
                  @click="goToPage(pagination.currentPage + 1)"
                  :disabled="pagination.currentPage >= totalPages"
                  class="px-3 py-1 text-sm rounded border disabled:opacity-50 disabled:cursor-not-allowed"
                  :style="{
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)',
                    backgroundColor: 'var(--bg-tertiary)'
                  }"
                >
                  下一页
                </button>
                
                <!-- 页面大小选择 -->
                <select 
                  v-model="pagination.pageSize" 
                  @change="handlePageSizeChange"
                  class="ml-4 px-2 py-1 text-sm rounded border"
                  :style="{
                    borderColor: 'var(--border-color)',
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)'
                  }"
                >
                  <option value="12">12/页</option>
                  <option value="24">24/页</option>
                  <option value="48">48/页</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import OptimizedImage from '@/components/OptimizedImage.vue'
import { getGalleryImageList, getGalleryCategories, getGalleryStats, GalleryType } from '@/apis/business/gallery'
import { getProductSuccessList } from '@/apis/business/product'

// 分类树节点组件
const CategoryTreeNode = {
  name: 'CategoryTreeNode',
  props: {
    category: Object,
    selectedCategory: String,
    level: Number,
    getCategoryCount: Function
  },
  emits: ['select'],
  setup(props, { emit }) {
    const isExpanded = ref(true)
    const hasChildren = computed(() => props.category.categoryList && props.category.categoryList.length > 0)
    const isSelected = computed(() => props.selectedCategory === props.category.categoryName)
    
    const toggleExpanded = () => {
      if (hasChildren.value) {
        isExpanded.value = !isExpanded.value
      }
    }
    
    const selectCategory = () => {
      emit('select', props.category.categoryName)
    }
    
    const getCount = (categoryName) => {
      if (props.getCategoryCount) {
        return props.getCategoryCount(categoryName)
      }
      return props.category.count || 0
    }
    
    return {
      isExpanded,
      hasChildren,
      isSelected,
      toggleExpanded,
      selectCategory,
      getCount
    }
  },
  template: `
     <div>
       <!-- 当前分类节点 -->
       <div 
         class="group flex items-center justify-between py-2 px-2 rounded-md cursor-pointer transition-all duration-200 hover:bg-gray-50"
         :class="{
           'bg-blue-50 text-blue-600 border-l-2 border-blue-500': isSelected,
           'text-gray-700': !isSelected
         }"
         :style="{ paddingLeft: (level * 20 + 8) + 'px' }"
         @click="selectCategory"
       >
         <div class="flex items-center space-x-2 flex-1 min-w-0">
           <!-- 展开/收起图标 -->
           <button 
             v-if="hasChildren" 
             @click.stop="toggleExpanded"
             class="flex-shrink-0 p-1 rounded hover:bg-gray-200 transition-colors"
           >
             <svg 
               class="w-3 h-3 text-gray-400 transition-transform duration-200" 
               :class="{ 'rotate-90': isExpanded }"
               fill="none" 
               stroke="currentColor" 
               viewBox="0 0 24 24"
             >
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
             </svg>
           </button>
           <div v-else class="w-5 flex-shrink-0"></div>
           
           <!-- 文件夹图标 -->
           <svg 
             class="w-4 h-4 flex-shrink-0" 
             :class="{
               'text-blue-500': isSelected,
               'text-gray-500': !isSelected,
               'text-yellow-600': hasChildren && isExpanded,
               'text-yellow-500': hasChildren && !isExpanded
             }"
             fill="none" 
             stroke="currentColor" 
             viewBox="0 0 24 24"
           >
             <path 
               v-if="hasChildren && isExpanded"
               stroke-linecap="round" 
               stroke-linejoin="round" 
               stroke-width="2" 
               d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" 
             />
             <path 
               v-else
               stroke-linecap="round" 
               stroke-linejoin="round" 
               stroke-width="2" 
               d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" 
             />
           </svg>
           
           <span 
             class="text-sm font-medium truncate" 
             :class="{
               'text-blue-600': isSelected,
               'text-gray-700': !isSelected
             }"
             :title="category.categoryName"
           >
             {{ category.categoryName }}
           </span>
         </div>
         
         <span 
           class="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 font-medium flex-shrink-0 ml-2"
           :class="{
             'bg-blue-100 text-blue-600': isSelected
           }"
         >
           {{ getCount(category.categoryName) }}
         </span>
       </div>
       
       <!-- 子分类 -->
       <div v-if="hasChildren && isExpanded" class="ml-2">
         <component 
           :is="$options"
           v-for="subCategory in category.categoryList" 
           :key="subCategory.categoryId"
           :category="subCategory"
           :selected-category="selectedCategory"
           :level="level + 1"
           :get-category-count="getCategoryCount"
           @select="$emit('select', $event)"
         />
       </div>
     </div>
   `
}

// 注册组件
const components = {
  CategoryTreeNode
}

// Props
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  }
})

// Emits
const emit = defineEmits(['update:modelValue', 'selection-change'])

// 图库类型
const galleryTypes = ref([
  { key: 'product', label: '商品图库', apiType: GalleryType.PRODUCTS },
  { key: 'material', label: '素材图库', apiType: GalleryType.MATERIALS },
  { key: 'result', label: '结果图库', apiType: GalleryType.RESULTS }
])

// 响应式数据
const selectedGalleryType = ref('product')
const searchKeyword = ref('')
const selectedCategory = ref('全部')
const loading = ref(false)
const error = ref('')
const categoriesLoading = ref(false)
const apiCategories = ref([])

// 分页
const pagination = ref({
  currentPage: 1,
  pageSize: 24,
  total: 0
})

// 分类列表（根据图库类型动态变化）
const categories = computed(() => {
  const categoryNames = ['全部']
  
  // 递归提取分类名称
  const extractCategoryNames = (categoryList) => {
    categoryList.forEach(category => {
      categoryNames.push(category.categoryName)
      if (category.categoryList && category.categoryList.length > 0) {
        extractCategoryNames(category.categoryList)
      }
    })
  }
  
  if (apiCategories.value.length > 0) {
    extractCategoryNames(apiCategories.value)
  }
  
  return categoryNames
})

// 获取分类的图片数量
const getCategoryCount = (categoryName) => {
  if (categoryName === '全部') {
    return stats.value.totalImages || 0
  }
  
  // 递归查找分类的数量
  const findCategoryCount = (categoryList, targetName) => {
    for (const category of categoryList) {
      if (category.categoryName === targetName) {
        return category.count || 0
      }
      if (category.categoryList && category.categoryList.length > 0) {
        const found = findCategoryCount(category.categoryList, targetName)
        if (found !== null) return found
      }
    }
    return null
  }
  
  const count = findCategoryCount(apiCategories.value, categoryName)
  return count !== null ? count : 0
}

// 图片数据
const images = ref([])
const stats = ref({})

// 由于使用API分页，直接使用images作为显示数据
const paginatedImages = computed(() => {
  return images.value
})

// 总页数
const totalPages = computed(() => {
  return Math.ceil(pagination.value.total / pagination.value.pageSize)
})

// 过滤后的图片总数（用于显示统计信息）
const filteredImages = computed(() => {
  return { length: pagination.value.total }
})

// 已选择的图片
const selectedImages = computed(() => {
  return images.value.filter(image => image.selected)
})

// 方法
const selectGalleryType = (type) => {
  selectedGalleryType.value = type
  selectedCategory.value = '全部'
  pagination.value.currentPage = 1
  
  // 同时加载分类、统计数据和图片数据
  Promise.all([
    loadCategories(),
    loadStats(),
    loadImages()
  ])
}

const selectCategory = (category) => {
  selectedCategory.value = category
  pagination.value.currentPage = 1
  loadImages()
}

const toggleSelectImage = (image) => {
  image.selected = !image.selected
  emit('selection-change', selectedImages.value)
  emit('update:modelValue', selectedImages.value)
}

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    pagination.value.currentPage = page
    loadImages()
  }
}

const handlePageSizeChange = () => {
  pagination.value.currentPage = 1
  loadImages()
}

// 搜索防抖
let searchTimeout = null
const handleSearchInput = () => {
  // 搜索逻辑已在watch中处理
}

// 获取当前图库类型的API类型
const getCurrentGalleryApiType = () => {
  const currentType = galleryTypes.value.find(type => type.key === selectedGalleryType.value)
  return currentType ? currentType.apiType : GalleryType.PRODUCTS
}

// 获取分类数据
const loadCategories = async () => {
  try {
    categoriesLoading.value = true
    const galleryType = getCurrentGalleryApiType()
    console.log('🔍 [Gallery Debug] 当前图库类型:', selectedGalleryType.value, '对应API类型:', galleryType)
    
    const response = await getGalleryCategories({ galleryType })
    console.log('🔍 [Gallery Debug] API响应完整数据:', response)
    
    if (response.success && response.data) {
      console.log('🔍 [Gallery Debug] 分类数据结构:', response.data)
      console.log('🔍 [Gallery Debug] categoryList:', response.data.categoryList)
      apiCategories.value = response.data.categoryList || []
      console.log('🔍 [Gallery Debug] 设置后的apiCategories:', apiCategories.value)
    } else {
      console.log('🔍 [Gallery Debug] API响应失败或无数据:', response)
    }
  } catch (err) {
    console.error('🔍 [Gallery Debug] 获取分类失败:', err)
  } finally {
    categoriesLoading.value = false
  }
}

// 获取统计数据
const loadStats = async () => {
  try {
    const galleryType = getCurrentGalleryApiType()
    const response = await getGalleryStats({ galleryType })
    
    if (response.success && response.data) {
      stats.value = response.data
    }
  } catch (err) {
    console.error('获取统计数据失败:', err)
  }
}

// 加载图片数据
const loadImages = async () => {
  try {
    loading.value = true
    error.value = ''
    
    const galleryType = getCurrentGalleryApiType()
    
    // 构建查询参数
    const params = {
      page: pagination.value.currentPage,
      limit: pagination.value.pageSize
    }
    
    // 添加搜索条件
    if (searchKeyword.value) {
      params.imageName = searchKeyword.value
    }
    
    // 添加分类筛选
    if (selectedCategory.value !== '全部') {
      // 查找对应的分类ID
      const findCategoryId = (categoryList, targetName) => {
        for (const category of categoryList) {
          if (category.categoryName === targetName) {
            return category.categoryId
          }
          if (category.categoryList && category.categoryList.length > 0) {
            const found = findCategoryId(category.categoryList, targetName)
            if (found) return found
          }
        }
        return null
      }
      
      const categoryId = findCategoryId(apiCategories.value, selectedCategory.value)
      if (categoryId) {
        params.categoryId = categoryId
      }
    }
    
    let response
    
    // 根据图库类型调用不同的API
    if (selectedGalleryType.value === 'product') {
      response = await getProductSuccessList(params)
    } else {
      params.galleryType = galleryType
      response = await getGalleryImageList(params)
    }
    
    if (response.success && response.data) {
      // 处理商品图库数据
      if (selectedGalleryType.value === 'product' && response.data.productList) {
        images.value = response.data.productList.map(item => ({
          id: item.id,
          imageUrl: item.image,
          title: item.title,
          selected: false,
          ...item
        }))
      }
      // 处理素材图库和结果图库数据
      else if (response.data.imageList) {
        images.value = response.data.imageList.map((item, index) => ({
          id: item.imageName + '_' + index,
          imageUrl: item.imageUrl,
          title: item.imageName,
          selected: false,
          ...item
        }))
      }
      
      pagination.value.total = parseInt(response.data.total || '0')
    } else {
      images.value = []
      pagination.value.total = 0
    }
    
  } catch (err) {
    console.error('加载图片失败:', err)
    error.value = '加载图片失败，请重试'
    images.value = []
    pagination.value.total = 0
  } finally {
    loading.value = false
  }
}

// 监听图库类型变化
watch(selectedGalleryType, () => {
  Promise.all([
    loadCategories(),
    loadStats(),
    loadImages()
  ])
})

// 监听搜索关键词变化
watch(searchKeyword, () => {
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }
  searchTimeout = setTimeout(() => {
    pagination.value.currentPage = 1
    loadImages()
  }, 500)
})

// 监听分类选择变化
watch(selectedCategory, () => {
  pagination.value.currentPage = 1
  loadImages()
})

// 组件挂载时加载数据
onMounted(() => {
  Promise.all([
    loadCategories(),
    loadStats(),
    loadImages()
  ])
})
</script>

<style scoped>
/* 组件样式 */
</style>