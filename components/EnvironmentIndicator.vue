<template>
  <div v-if="showIndicator" class="fixed top-4 right-4 z-50">
    <div 
      class="px-3 py-1 rounded-full text-xs font-medium shadow-lg border"
      :class="environmentClasses"
    >
      <span class="flex items-center">
        <div 
          class="w-2 h-2 rounded-full mr-2"
          :class="statusDotClass"
        ></div>
        {{ environmentInfo.name }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// Props
const props = defineProps({
  show: {
    type: Boolean,
    default: true
  }
})

// 获取运行时配置
const { $config } = useNuxtApp()

// 环境信息
const environmentInfo = computed(() => {
  return {
    name: $config.public.environmentName || '开发环境',
    env: $config.public.environment || 'development',
    apiTarget: $config.public.apiProxyTarget
  }
})

// 是否显示指示器（只在开发和测试环境显示）
const showIndicator = computed(() => {
  return props.show && ['development', 'test'].includes(environmentInfo.value.env)
})

// 环境样式类
const environmentClasses = computed(() => {
  const env = environmentInfo.value.env
  
  switch (env) {
    case 'development':
      return 'bg-blue-100 text-blue-800 border-blue-200'
    case 'test':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    case 'production':
      return 'bg-red-100 text-red-800 border-red-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
})

// 状态点样式
const statusDotClass = computed(() => {
  const env = environmentInfo.value.env
  
  switch (env) {
    case 'development':
      return 'bg-blue-500 animate-pulse'
    case 'test':
      return 'bg-yellow-500 animate-pulse'
    case 'production':
      return 'bg-red-500'
    default:
      return 'bg-gray-500'
  }
})
</script>

<style scoped>
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}
</style> 