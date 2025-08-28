<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="$imageViewer.state.isVisible"
        class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm"
        @click="$imageViewer.hideImage"
      >
        <!-- 关闭按钮 -->
        <button
          class="absolute top-4 right-4 z-10 w-12 h-12 flex items-center justify-center bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors duration-200"
          @click="$imageViewer.hideImage"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <!-- 图片容器 -->
        <div
          class="relative max-w-[90vw] max-h-[90vh] p-4"
          @click.stop
        >
          <Transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0 scale-90"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-90"
            mode="out-in"
          >
            <img
              :key="$imageViewer.state.currentImage"
              :src="$imageViewer.state.currentImage"
              :alt="$imageViewer.state.currentAlt"
              class="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              draggable="false"
            />
          </Transition>

          <!-- 导航按钮 - 仅在多张图片时显示 -->
          <template v-if="$imageViewer.state.images.length > 1">
            <!-- 上一张 -->
            <button
              class="absolute left-2 top-1/2 transform -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors duration-200"
              @click="$imageViewer.previousImage"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>

            <!-- 下一张 -->
            <button
              class="absolute right-2 top-1/2 transform -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors duration-200"
              @click="$imageViewer.nextImage"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>

            <!-- 图片计数 -->
            <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {{ $imageViewer.state.currentIndex + 1 }} / {{ $imageViewer.state.images.length }}
            </div>
          </template>
        </div>

        <!-- 操作提示 -->
        <div class="absolute bottom-4 right-4 text-white/70 text-sm space-y-1">
          <div>ESC 关闭</div>
          <div v-if="$imageViewer.state.images.length > 1">← → 切换图片</div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
// 使用插件提供的图片查看器
const { $imageViewer } = useNuxtApp()
</script>

<style scoped>
/* 确保图片查看器在最顶层 */
.z-\[9999\] {
  z-index: 9999;
}
</style>