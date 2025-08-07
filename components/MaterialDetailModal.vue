<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
    <div class="bg-dark-card rounded-lg w-full max-w-7xl max-h-[95vh] overflow-hidden text-dark-text">
      <!-- Header -->
      <div class="p-4 border-b border-dark-border flex justify-between items-center">
        <h3 class="font-medium text-dark-text">素材详情</h3>
        <button @click="close" class="text-gray-400 hover:text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div class="flex h-[calc(95vh-80px)]">
        <!-- 预览区域 -->
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

          <div class="w-full h-full overflow-hidden rounded-lg shadow-md bg-white">
            <OptimizedImage
              :src="material?.imageUrl || material?.preview"
              :alt="material?.imageName || material?.title"
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
          <div v-if="materialList.length > 1" class="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
            {{ currentIndex + 1 }} / {{ materialList.length }}
          </div>
        </div>

        <!-- 信息面板 -->
        <div class="w-80 p-6 border-l border-dark-border overflow-y-auto">
          <!-- 标题和标签 -->
          <div class="mb-6">
            <div class="flex items-start justify-between mb-3">
              <h4 class="text-lg font-semibold text-dark-text">{{ material?.imageName || material?.title || '未知素材' }}</h4>
            </div>
            <p class="text-sm text-dark-text-secondary leading-relaxed">
              {{ material?.description || '创作者: ' + (material?.createBy || '未知') }}
            </p>
          </div>

          <!-- 基本信息 -->
          <div class="mb-6">
            <h5 class="text-sm font-semibold text-dark-text mb-3">基本信息</h5>
            <div class="space-y-2">
              <div class="flex justify-between text-sm">
                <span class="text-dark-text-secondary">素材ID</span>
                <span class="text-dark-text font-mono text-xs">{{ material?.id || '未知' }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-dark-text-secondary">格式</span>
                <span class="text-dark-text font-medium">{{ getImageFormat(material?.imageUrl) }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-dark-text-secondary">分类</span>
                <span class="text-dark-text">{{ getCategoryName(material?.category) }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-dark-text-secondary">下载量</span>
                <span class="text-dark-text">{{ material?.downloads || 0 }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-dark-text-secondary">创建时间</span>
                <span class="text-dark-text">{{ material?.createTime || material?.uploadedAt || '未知' }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-dark-text-secondary">创建者</span>
                <span class="text-dark-text">{{ material?.createBy || '未知' }}</span>
              </div>
            </div>
          </div>

          <!-- 技术规格 -->
          <div class="mb-6">
            <h5 class="text-sm font-semibold text-dark-text mb-3">技术规格</h5>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-dark-text-secondary">文件大小</span>
                <span class="text-dark-text">{{ getFileSize(material) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-dark-text-secondary">颜色模式</span>
                <span class="text-dark-text">{{ getColorMode(material) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-dark-text-secondary">分辨率</span>
                <span class="text-dark-text">{{ getResolution(material) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-dark-text-secondary">兼容性</span>
                <span class="text-dark-text">{{ getCompatibility(material) }}</span>
              </div>
            </div>
          </div>

          <!-- 使用许可 -->
          <div class="mb-6">
            <h5 class="text-sm font-semibold text-dark-text mb-3">使用许可</h5>
            <div class="space-y-2 text-sm">
              <div class="flex items-center">
                <svg class="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span class="text-dark-text">商业使用</span>
              </div>
              <div class="flex items-center">
                <svg class="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span class="text-dark-text">修改编辑</span>
              </div>
              <div class="flex items-center">
                <svg class="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span class="text-dark-text">重新分发</span>
              </div>
              <div class="flex items-center">
                <svg class="w-4 h-4 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
                <span class="text-dark-text-secondary">转售原件</span>
              </div>
            </div>
          </div>

          <!-- 相关标签 -->
          <div class="mb-6">
            <h5 class="text-sm font-semibold text-dark-text mb-3">相关标签</h5>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="tag in getTags(material)" 
                :key="tag"
                class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 cursor-pointer hover:bg-blue-200"
              >
                {{ tag }}
              </span>
            </div>
          </div>

          <!-- 操作按钮 -->
          <div class="space-y-3">
            <button 
              @click="handleDownload"
              class="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-4-4m4 4l4-4m-6 4V4"/>
              </svg>
              {{ material?.isPremium ? '获取高级版本' : '免费下载' }}
            </button>
            
            <button 
              @click="handleFavorite"
              :class="material?.isFavorite ? 'bg-red-50 text-red-600 border-red-200' : 'border-dark-border text-dark-text'"
              class="w-full px-4 py-2 border rounded-md hover:bg-dark-hover flex items-center justify-center"
            >
              <svg class="w-4 h-4 mr-2" :class="material?.isFavorite ? 'text-red-500' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
              {{ material?.isFavorite ? '已收藏' : '添加收藏' }}
            </button>
            
            <button 
              @click="handleShare"
              class="w-full px-4 py-2 border border-dark-border rounded-md text-dark-text hover:bg-dark-hover flex items-center justify-center"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"/>
              </svg>
              分享
            </button>
            
            <button 
              @click="handleCopyLink"
              class="w-full px-4 py-2 border border-dark-border rounded-md text-dark-text hover:bg-dark-hover flex items-center justify-center"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
              </svg>
              复制链接
            </button>
          </div>

          <!-- 统计信息 -->
          <div class="mt-6 pt-6 border-t border-dark-border">
            <div class="grid grid-cols-2 gap-4 text-center">
              <div>
                <div class="text-lg font-bold text-dark-text">{{ material?.downloads || '0' }}</div>
                <div class="text-xs text-dark-text-secondary">下载次数</div>
              </div>
              <div>
                <div class="text-lg font-bold text-dark-text">{{ getViewCount(material) }}</div>
                <div class="text-xs text-dark-text-secondary">浏览次数</div>
              </div>
            </div>
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
        :src="material?.imageUrl || material?.preview"
        :alt="material?.imageName || material?.title"
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
    <div v-if="materialList.length > 1" class="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded-full text-lg">
      {{ currentIndex + 1 }} / {{ materialList.length }}
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
  material: {
    type: Object,
    default: () => null
  },
  materialList: {
    type: Array,
    default: () => []
  },
  currentIndex: {
    type: Number,
    default: 0
  }
})

const emits = defineEmits(['close', 'download', 'favorite', 'change-material'])

// 响应式数据
const showImageZoom = ref(false)

// 导航计算属性
const canGoPrevious = computed(() => {
  return props.materialList.length > 1 && props.currentIndex > 0
})

const canGoNext = computed(() => {
  return props.materialList.length > 1 && props.currentIndex < props.materialList.length - 1
})

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
    const newMaterial = props.materialList[newIndex]
    emits('change-material', newMaterial, newIndex)
  }
}

const goToNext = () => {
  if (canGoNext.value) {
    const newIndex = props.currentIndex + 1
    const newMaterial = props.materialList[newIndex]
    emits('change-material', newMaterial, newIndex)
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

// 获取图片格式
const getImageFormat = (imageUrl) => {
  if (!imageUrl) return '未知'
  const extension = imageUrl.split('.').pop()?.toUpperCase()
  return extension || '未知'
}

// 获取分类名称
const getCategoryName = (category) => {
  const categoryMap = {
    icons: '图标',
    backgrounds: '背景',
    textures: '纹理',
    illustrations: '插画',
    fonts: '字体',
    templates: '模板',
    decorations: '装饰',
    patterns: '图案'
  }
  return categoryMap[category] || '其他'
}

// 获取文件大小
const getFileSize = (material) => {
  if (!material) return '未知'
  
  const sizeMap = {
    'SVG': '50KB',
    'PNG': '2.5MB',
    'JPG': '1.8MB',
    'AI': '15MB',
    'TTF': '2MB',
    'HTML': '500KB'
  }
  return sizeMap[material.format] || '未知'
}

// 获取颜色模式
const getColorMode = (material) => {
  if (!material) return '未知'
  
  const modeMap = {
    'SVG': '矢量',
    'PNG': 'RGBA',
    'JPG': 'RGB',
    'AI': '矢量',
    'TTF': '矢量',
    'HTML': 'Web'
  }
  return modeMap[material.format] || 'RGB'
}

// 获取分辨率
const getResolution = (material) => {
  if (!material) return '未知'
  
  if (material.format === 'SVG' || material.format === 'AI' || material.format === 'TTF') {
    return '无限'
  }
  return '300 DPI'
}

// 获取兼容性
const getCompatibility = (material) => {
  if (!material) return '未知'
  
  const compatibilityMap = {
    'SVG': 'Web, AI, Sketch',
    'PNG': '所有设备',
    'JPG': '所有设备',
    'AI': 'Adobe Illustrator',
    'TTF': '所有系统',
    'HTML': 'Web浏览器'
  }
  return compatibilityMap[material.format] || '通用'
}

// 获取相关标签
const getTags = (material) => {
  if (!material) return []
  
  const baseTags = []
  
  // 根据分类添加标签
  switch (material.category) {
    case 'icons':
      baseTags.push('图标', '线条', 'UI', '界面')
      break
    case 'backgrounds':
      baseTags.push('背景', '装饰', '抽象', '几何')
      break
    case 'textures':
      baseTags.push('纹理', '材质', '表面', '质感')
      break
    case 'illustrations':
      baseTags.push('插画', '矢量', '手绘', '艺术')
      break
    case 'fonts':
      baseTags.push('字体', '排版', '文字', '设计')
      break
    case 'templates':
      baseTags.push('模板', '布局', '响应式', '网页')
      break
    case 'decorations':
      baseTags.push('装饰', '元素', '节日', '庆祝')
      break
    case 'patterns':
      baseTags.push('图案', '重复', '平铺', '纹样')
      break
  }
  
  // 根据是否免费添加标签
  if (material.isPremium) {
    baseTags.push('高级')
  } else {
    baseTags.push('免费')
  }
  
  // 根据格式添加标签
  baseTags.push(material.format)
  
  return baseTags.slice(0, 8) // 最多显示8个标签
}

// 获取浏览次数
const getViewCount = (material) => {
  if (!material) return '0'
  
  // 模拟浏览次数（通常是下载次数的3-5倍）
  const downloads = parseInt(material.downloads) || 0
  return `${Math.round(downloads * 3.5)}k`
}

// 处理下载
const handleDownload = () => {
  emits('download', props.material)
}

// 处理收藏
const handleFavorite = () => {
  emits('favorite', props.material)
}

// 处理分享
const handleShare = () => {
  if (navigator.share && props.material) {
    navigator.share({
      title: props.material.title,
      text: props.material.description || '查看这个设计素材',
      url: window.location.href
    }).catch(err => console.log('分享失败:', err))
  } else {
    // 备用分享方案
    handleCopyLink()
  }
}

// 处理复制链接
const handleCopyLink = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href)
    console.log('链接已复制到剪贴板')
    // 实际应用中可以显示提示消息
  } catch (err) {
    console.error('复制链接失败:', err)
  }
}

// 关闭弹窗
const close = () => {
  emits('close')
}

// 生命周期钩子
onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script> 