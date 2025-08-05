<template>
  <div 
    :class="containerClass"
    :style="{ width: width, height: height }"
    class="relative overflow-hidden bg-gray-800 rounded-md"
    ref="imageContainer"
  >
    <!-- 占位图/骨架屏 -->
    <div 
      v-if="!imageLoaded && !hasError" 
      class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900"
      :class="{ 'animate-pulse': loading }"
    >
      <div class="flex flex-col items-center space-y-2">
        <svg 
          class="w-8 h-8 text-gray-600 animate-spin" 
          v-if="loading"
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            class="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            stroke-width="4"
          ></circle>
          <path 
            class="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <svg 
          v-else
          class="w-8 h-8 text-gray-600" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          ></path>
        </svg>
        <span class="text-xs text-gray-500">{{ loading ? '加载中...' : '图片' }}</span>
      </div>
    </div>

    <!-- 错误状态 -->
    <div 
      v-if="hasError" 
      class="absolute inset-0 flex items-center justify-center bg-gray-900"
    >
      <div class="flex flex-col items-center space-y-2">
        <svg 
          class="w-8 h-8 text-red-500" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z"
          ></path>
        </svg>
        <span class="text-xs text-red-400">加载失败</span>
      </div>
    </div>

    <!-- 实际图片 -->
    <img
      v-if="imageLoaded"
      ref="image"
      :src="src"
      :alt="alt"
      :class="imageClass || 'w-full h-full object-cover'"
      class="transition-opacity duration-300"
      :style="{ 
        opacity: imageLoaded ? 1 : 0,
        transform: imageLoaded ? 'scale(1)' : 'scale(1.05)'
      }"
      @click="handleImageClick"
    />

    <!-- 放大镜图标 (hover时显示) -->
    <div 
      v-if="imageLoaded && zoomable"
      class="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black bg-opacity-40 transition-opacity duration-200 cursor-zoom-in"
      @click="handleImageClick"
    >
      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
      </svg>
    </div>

    <!-- 加载进度条 -->
    <div 
      v-if="loading && showProgress" 
      class="absolute bottom-0 left-0 right-0 h-1 bg-gray-700 overflow-hidden"
    >
      <div 
        class="h-full bg-blue-500 transition-all duration-300"
        :style="{ width: `${loadingProgress}%` }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import imagePreloader from '~/utils/imagePreloader'

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: ''
  },
  width: {
    type: String,
    default: '100%'
  },
  height: {
    type: String,
    default: 'auto'
  },
  containerClass: {
    type: String,
    default: ''
  },
  imageClass: {
    type: String,
    default: ''
  },
  lazy: {
    type: Boolean,
    default: true
  },
  zoomable: {
    type: Boolean,
    default: false
  },
  preload: {
    type: Boolean,
    default: false
  },
  priority: {
    type: String,
    default: 'normal', // 'high', 'normal', 'low'
    validator: (value) => ['high', 'normal', 'low'].includes(value)
  },
  showProgress: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['load', 'error', 'click'])

// 响应式数据
const loading = ref(false)
const imageLoaded = ref(false)
const hasError = ref(false)
const loadingProgress = ref(0)
const imageContainer = ref(null)
const image = ref(null)
const observer = ref(null)

// 图片加载函数
const loadImage = async () => {
  if (!props.src || imageLoaded.value) return

  console.log(`🖼️ [OptimizedImage] 开始加载图片: ${props.src}`)

  // 首先检查缓存
  if (imagePreloader.isCached(props.src)) {
    console.log(`✅ [OptimizedImage] 图片已缓存，直接显示: ${props.src}`)
    imageLoaded.value = true
    emit('load')
    return
  }

  loading.value = true
  hasError.value = false
  loadingProgress.value = 0

  try {
    console.log(`📥 [OptimizedImage] 开始下载图片: ${props.src}`)
    
    // 模拟加载进度
    const progressInterval = setInterval(() => {
      if (loadingProgress.value < 80) {
        loadingProgress.value += Math.random() * 20
      }
    }, 100)

    // 使用预加载器加载图片
    await imagePreloader.preloadImage(props.src, props.priority)
    
    console.log(`✅ [OptimizedImage] 图片加载完成: ${props.src}`)
    
    clearInterval(progressInterval)
    loadingProgress.value = 100

    // 短暂延迟以显示完成状态
    setTimeout(() => {
      imageLoaded.value = true
      loading.value = false
      emit('load')
    }, 150)

  } catch (error) {
    console.error(`❌ [OptimizedImage] 图片加载失败: ${props.src}`, error)
    loading.value = false
    hasError.value = true
    emit('error', error)
  }
}

// 处理图片点击
const handleImageClick = (event) => {
  emit('click', event)
  
  if (props.zoomable) {
    // 可以在这里实现图片放大查看功能
    // 比如打开一个图片预览模态框
  }
}

// 懒加载设置
const setupLazyLoading = () => {
  if (!props.lazy || !('IntersectionObserver' in window)) {
    loadImage()
    return
  }

  observer.value = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadImage()
          observer.value?.unobserve(entry.target)
        }
      })
    },
    {
      rootMargin: '50px' // 提前50px开始加载
    }
  )

  if (imageContainer.value) {
    observer.value.observe(imageContainer.value)
  }
}

// 预加载设置
const setupPreload = () => {
  if (props.preload && props.src) {
    imagePreloader.preloadImage(props.src, props.priority)
  }
}

// 监听src变化
watch(() => props.src, (newSrc, oldSrc) => {
  if (newSrc !== oldSrc) {
    imageLoaded.value = false
    hasError.value = false
    loadingProgress.value = 0
    
    if (props.lazy) {
      setupLazyLoading()
    } else {
      loadImage()
    }
  }
}, { immediate: false })

// 组件挂载
onMounted(async () => {
  await nextTick()
  
  // 检查是否已经缓存
  if (imagePreloader.isCached(props.src)) {
    imageLoaded.value = true
    return
  }

  setupPreload()
  
  if (props.lazy) {
    setupLazyLoading()
  } else {
    loadImage()
  }
})

// 组件卸载清理
onUnmounted(() => {
  if (observer.value) {
    observer.value.disconnect()
  }
})
</script>

<style scoped>
/* 图片渐现动画 */
.transition-opacity {
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* 骨架屏动画 */
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .7;
  }
}
</style>