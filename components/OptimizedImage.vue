<template>
  <div 
    class="relative inline-block"
    :class="containerClass"
  >
    <!-- 加载状态 -->
    <div
      v-if="isLoading"
      class="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"
      :class="skeletonClass"
    >
      <div class="w-full h-full flex items-center justify-center">
        <svg class="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
        </svg>
      </div>
    </div>

    <!-- 主图片 -->
    <img
      ref="imageRef"
      :src="src"
      :alt="alt"
      :class="[
        'transition-all duration-200',
        zoomable ? 'cursor-zoom-in hover:opacity-80' : '',
        imageClass,
        isLoading ? 'opacity-0' : 'opacity-100'
      ]"
      :data-zoomable="zoomable"
      :data-image-viewer="zoomable"
      @load="handleLoad"
      @error="handleError"
      v-bind="$attrs"
    />

    <!-- 错误状态 -->
    <div
      v-if="hasError"
      class="absolute inset-0 bg-gray-100 dark:bg-gray-800 flex items-center justify-center rounded"
      :class="errorClass"
    >
      <div class="text-center text-gray-500">
        <svg class="w-8 h-8 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
        <p class="text-xs">图片加载失败</p>
      </div>
    </div>

    <!-- 放大图标提示 -->
    <div
      v-if="zoomable && !isLoading && !hasError && showZoomIcon"
      class="absolute top-2 right-2 bg-black/50 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  src: string,
  alt?: string,
  zoomable?: boolean,
  showZoomIcon?: boolean,
  containerClass?: string,
  imageClass?: string,
  skeletonClass?: string,
  errorClass?: string
}>(), {
  alt: '',
  zoomable: true,
  showZoomIcon: true,
  containerClass: 'group',
  imageClass: '',
  skeletonClass: '',
  errorClass: ''
})

// 状态管理
const isLoading = ref(true)
const hasError = ref(false)
const imageRef = ref<HTMLImageElement>()

// 加载完成处理
const handleLoad = () => {
  isLoading.value = false
  hasError.value = false
  
  // 初始化图片查看器
  nextTick(() => {
    const { $imageViewer } = useNuxtApp()
    if (props.zoomable && $imageViewer?.initImageViewer) {
      $imageViewer.initImageViewer()
    }
  })
}

// 错误处理
const handleError = () => {
  isLoading.value = false
  hasError.value = true
}

// 监听src变化，重置状态
watch(() => props.src, () => {
  if (props.src) {
    isLoading.value = true
    hasError.value = false
  }
}, { immediate: true })

// 暴露图片元素引用
defineExpose({
  imageRef
})
</script>

<style scoped>
/* 确保容器具有正确的尺寸 */
img {
  display: block;
  max-width: 100%;
  height: auto;
}
</style>