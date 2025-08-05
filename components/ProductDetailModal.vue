<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
    <div class="bg-dark-card rounded-lg w-full max-w-7xl max-h-[95vh] overflow-hidden text-dark-text">
      <!-- Header -->
      <div class="p-4 border-b border-dark-border flex justify-between items-center">
        <h3 class="font-medium text-dark-text">商品详情</h3>
        <button @click="close" class="text-gray-400 hover:text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div class="flex h-[calc(95vh-80px)]">
        <!-- 图片预览区域 -->
        <div class="flex-1 p-3 bg-gray-50 flex items-center justify-center relative">
          <!-- 左箭头 -->
          <button 
            v-if="canGoPrevious"
            @click="goToPrevious"
            class="absolute left-6 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full flex items-center justify-center transition-all duration-200 shadow-lg hover:scale-110"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>

          <div class="w-full h-full overflow-hidden rounded-lg shadow-md">
            <OptimizedImage
              :src="product?.image"
              :alt="product?.title"
              width="100%"
              height="100%"
              container-class="w-full h-full"
              image-class="w-full h-full object-contain"
              :lazy="false"
              :zoomable="true"
              priority="high"
              :show-progress="true"
              @click="handleImageZoom"
            />
          </div>

          <!-- 右箭头 -->
          <button 
            v-if="canGoNext"
            @click="goToNext"
            class="absolute right-6 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full flex items-center justify-center transition-all duration-200 shadow-lg hover:scale-110"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>

          <!-- 当前位置指示器 -->
          <div v-if="productList.length > 1" class="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
            {{ currentIndex + 1 }} / {{ productList.length }}
          </div>
        </div>

        <!-- 信息面板 -->
        <div class="w-80 p-6 border-l border-dark-border overflow-y-auto">
          <!-- 商品基本信息 -->
          <div class="mb-6">
            <h4 class="text-lg font-semibold text-dark-text mb-4">商品信息</h4>
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-dark-text-secondary">商品ID</span>
                <span class="text-dark-text font-mono text-sm">{{ product?.id }}</span>
              </div>
              <div class="flex flex-col">
                <span class="text-dark-text-secondary mb-2">商品标题</span>
                <span class="text-dark-text font-medium break-words">{{ product?.title || '未知商品' }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-dark-text-secondary">价格</span>
                <span class="text-dark-text font-semibold text-green-600">{{ product?.price || '未知价格' }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-dark-text-secondary">平台</span>
                <span 
                  class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                  :class="getPlatformClass(product?.platform)"
                >
                  {{ getPlatformName(product?.platform) }}
                </span>
              </div>
              <div class="flex justify-between">
                <span class="text-dark-text-secondary">状态</span>
                <span 
                  class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                  :class="getStatusClass(product?.status)"
                >
                  {{ getStatusText(product?.status) }}
                </span>
              </div>
              <div class="flex justify-between">
                <span class="text-dark-text-secondary">分类</span>
                <span class="text-dark-text">{{ getCategoryName(product?.categoryId) }}</span>
              </div>
            </div>
          </div>

          <!-- 商品链接 -->
          <div class="mb-6" v-if="product?.url">
            <h4 class="text-lg font-semibold text-dark-text mb-4">商品链接</h4>
            <div class="space-y-3">
              <a 
                :href="product.url" 
                target="_blank" 
                class="flex items-center p-3 bg-dark-input rounded-lg hover:bg-dark-hover transition-colors"
              >
                <svg class="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
                <span class="text-blue-500 text-sm truncate">访问商品页面</span>
              </a>
            </div>
          </div>

          <!-- 技术信息 -->
          <div class="mb-6">
            <h4 class="text-lg font-semibold text-dark-text mb-4">技术信息</h4>
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-dark-text-secondary">图片格式</span>
                <span class="text-dark-text">{{ getImageFormat(product?.image) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-dark-text-secondary">加载状态</span>
                <span class="text-green-600 text-sm">已缓存</span>
              </div>
              <div class="flex justify-between">
                <span class="text-dark-text-secondary">最后更新</span>
                <span class="text-dark-text text-sm">{{ formatDate(new Date()) }}</span>
              </div>
            </div>
          </div>

          <!-- 操作按钮 -->
          <div class="space-y-3">
            <button 
              @click="downloadProduct"
              class="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-4-4m4 4l4-4m-6 4V4"/>
              </svg>
              下载图片
            </button>
            
            <button 
              v-if="product?.url"
              @click="copyProductUrl"
              class="w-full flex items-center justify-center px-4 py-2 border border-dark-border text-dark-text rounded-md hover:bg-dark-hover transition-colors"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
              </svg>
              复制链接
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 图片放大预览 -->
  <div v-if="showImageZoom" class="fixed inset-0 bg-black bg-opacity-90 z-60 flex items-center justify-center p-4" @click="closeImageZoom">
    <!-- 左箭头 -->
    <button 
      v-if="canGoPrevious"
      @click.stop="goToPrevious"
      class="absolute left-8 top-1/2 transform -translate-y-1/2 z-10 w-16 h-16 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full flex items-center justify-center transition-all duration-200 shadow-lg hover:scale-110"
    >
      <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
      </svg>
    </button>

    <div class="max-w-full max-h-full overflow-hidden rounded-lg">
      <OptimizedImage
        :src="product?.image"
        :alt="product?.title"
        width="auto"
        height="auto"
        container-class="max-w-screen max-h-screen"
        :lazy="false"
        priority="high"
      />
    </div>

    <!-- 右箭头 -->
    <button 
      v-if="canGoNext"
      @click.stop="goToNext"
      class="absolute right-8 top-1/2 transform -translate-y-1/2 z-10 w-16 h-16 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full flex items-center justify-center transition-all duration-200 shadow-lg hover:scale-110"
    >
      <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
      </svg>
    </button>

    <!-- 当前位置指示器 -->
    <div v-if="productList.length > 1" class="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded-full text-lg">
      {{ currentIndex + 1 }} / {{ productList.length }}
    </div>

    <!-- 关闭按钮 -->
    <button 
      @click.stop="closeImageZoom"
      class="absolute top-8 right-8 w-12 h-12 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full flex items-center justify-center transition-all duration-200"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import OptimizedImage from '~/components/OptimizedImage.vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  product: {
    type: Object,
    default: () => ({})
  },
  productList: {
    type: Array,
    default: () => []
  },
  currentIndex: {
    type: Number,
    default: 0
  },
  categories: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['close', 'download', 'change-product'])

// 响应式数据
const showImageZoom = ref(false)

// 导航计算属性
const canGoPrevious = computed(() => {
  return props.productList.length > 1 && props.currentIndex > 0
})

const canGoNext = computed(() => {
  return props.productList.length > 1 && props.currentIndex < props.productList.length - 1
})

// 关闭弹窗
const close = () => {
  emit('close')
}

// 处理图片放大
const handleImageZoom = () => {
  showImageZoom.value = true
}

// 关闭图片放大
const closeImageZoom = () => {
  showImageZoom.value = false
}

// 导航方法
const goToPrevious = () => {
  if (canGoPrevious.value) {
    const newIndex = props.currentIndex - 1
    const newProduct = props.productList[newIndex]
    emit('change-product', newProduct, newIndex)
  }
}

const goToNext = () => {
  if (canGoNext.value) {
    const newIndex = props.currentIndex + 1
    const newProduct = props.productList[newIndex]
    emit('change-product', newProduct, newIndex)
  }
}

// 键盘事件处理
const handleKeydown = (event) => {
  if (!props.isOpen) return
  
  switch (event.key) {
    case 'ArrowLeft':
      event.preventDefault()
      goToPrevious()
      break
    case 'ArrowRight':
      event.preventDefault()
      goToNext()
      break
    case 'Escape':
      event.preventDefault()
      if (showImageZoom.value) {
        closeImageZoom()
      } else {
        close()
      }
      break
  }
}

// 生命周期钩子
onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})

// 获取平台名称
const getPlatformName = (platform) => {
  const platformMap = {
    1: 'TEMU',
    2: '亚马逊',
    3: 'Shein',
    4: '1688',
    5: '淘宝'
  }
  return platformMap[platform] || '未知平台'
}

// 获取平台样式类
const getPlatformClass = (platform) => {
  const platformClasses = {
    1: 'bg-purple-100 text-purple-800', // TEMU
    2: 'bg-orange-100 text-orange-800', // 亚马逊
    3: 'bg-pink-100 text-pink-800',     // Shein
    4: 'bg-blue-100 text-blue-800',     // 1688
    5: 'bg-red-100 text-red-800'        // 淘宝
  }
  return platformClasses[platform] || 'bg-gray-100 text-gray-800'
}

// 获取状态文本
const getStatusText = (status) => {
  const statusMap = {
    0: '待处理',
    1: '进行中',
    2: '已完成',
    3: '部分失败',
    4: '失败'
  }
  return statusMap[status] || '未知状态'
}

// 获取状态样式类
const getStatusClass = (status) => {
  const statusClasses = {
    0: 'bg-gray-100 text-gray-800',
    1: 'bg-blue-100 text-blue-800',
    2: 'bg-green-100 text-green-800',
    3: 'bg-yellow-100 text-yellow-800',
    4: 'bg-red-100 text-red-800'
  }
  return statusClasses[status] || 'bg-gray-100 text-gray-800'
}

// 获取图片格式
const getImageFormat = (imageUrl) => {
  if (!imageUrl) return '未知'
  const extension = imageUrl.split('.').pop()?.toUpperCase()
  return extension || '未知'
}

// 获取分类名称
const getCategoryName = (categoryId) => {
  // 如果分类ID是0或空值，显示"未分类"
  if (categoryId === 0 || categoryId === '0' || !categoryId) {
    return '未分类'
  }
  
  // 递归查找分类名称
  const findCategory = (categories, id) => {
    for (const category of categories) {
      if (category.categoryId === id || category.categoryId === String(id)) {
        return category.categoryName
      }
      if (category.categoryList && category.categoryList.length > 0) {
        const found = findCategory(category.categoryList, id)
        if (found) return found
      }
    }
    return null
  }
  
  const categoryName = findCategory(props.categories, categoryId)
  return categoryName || `分类ID: ${categoryId}`
}

// 格式化日期
const formatDate = (date) => {
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// 下载商品图片
const downloadProduct = async () => {
  if (!props.product?.image) return
  
  try {
    const response = await fetch(props.product.image)
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    
    const link = document.createElement('a')
    link.href = url
    link.download = `product_${props.product.id}_${Date.now()}.${getImageFormat(props.product.image).toLowerCase()}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    window.URL.revokeObjectURL(url)
    
    emit('download', props.product)
  } catch (error) {
    console.error('下载图片失败:', error)
    alert('下载失败，请重试')
  }
}

// 复制商品链接
const copyProductUrl = async () => {
  if (!props.product?.url) return
  
  try {
    await navigator.clipboard.writeText(props.product.url)
    alert('链接已复制到剪贴板')
  } catch (error) {
    console.error('复制链接失败:', error)
    alert('复制失败，请手动复制')
  }
}
</script>

<style scoped>
/* 自定义滚动条 */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: var(--bg-secondary);
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: var(--text-secondary);
}

/* 图片放大动画 */
.z-60 {
  z-index: 60;
}
</style>