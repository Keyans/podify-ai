<template>
  <span 
    class="inline-flex items-center px-2 py-1 text-xs font-medium rounded-md"
    :class="statusConfig.class"
  >
    <!-- 状态图标 -->
    <svg 
      v-if="showIcon && statusConfig.icon" 
      class="w-3 h-3 mr-1" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        stroke-width="2" 
        :d="statusConfig.icon"
      />
    </svg>
    
    <!-- 动画加载图标（仅用于进行中状态） -->
    <div 
      v-if="showIcon && status === 1" 
      class="w-3 h-3 mr-1 border border-current border-t-transparent rounded-full animate-spin"
    ></div>
    
    <!-- 状态文本 -->
    {{ statusConfig.text }}
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  // 状态值：0:待执行 1:进行中 2:已完成 3:部分失败 4:失败
  status: {
    type: [Number, String],
    required: true
  },
  // 是否显示图标
  showIcon: {
    type: Boolean,
    default: true
  },
  // 尺寸：sm, md, lg
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  // 自定义样式主题：default, soft
  theme: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'soft'].includes(value)
  }
})

// 状态配置映射
const statusConfig = computed(() => {
  const statusValue = parseInt(props.status)
  
  // 基础配置
  const baseConfig = {
    0: {
      text: '待执行',
      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', // 时钟图标
      colors: {
        default: 'bg-gray-100 text-gray-800 border border-gray-200',
        soft: 'bg-gray-50 text-gray-700 border border-gray-100'
      }
    },
    1: {
      text: '进行中',
      icon: null, // 使用动画加载图标
      colors: {
        default: 'bg-blue-100 text-blue-800 border border-blue-200',
        soft: 'bg-blue-50 text-blue-700 border border-blue-100'
      }
    },
    2: {
      text: '已完成',
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', // 勾选图标
      colors: {
        default: 'bg-green-100 text-green-800 border border-green-200',
        soft: 'bg-green-50 text-green-700 border border-green-100'
      }
    },
    3: {
      text: '部分失败',
      icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z', // 警告图标
      colors: {
        default: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
        soft: 'bg-yellow-50 text-yellow-700 border border-yellow-100'
      }
    },
    4: {
      text: '失败',
      icon: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z', // 错误图标
      colors: {
        default: 'bg-red-100 text-red-800 border border-red-200',
        soft: 'bg-red-50 text-red-700 border border-red-100'
      }
    }
  }
  
  const config = baseConfig[statusValue] || {
    text: '未知',
    icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z', // 问号图标
    colors: {
      default: 'bg-gray-100 text-gray-600 border border-gray-200',
      soft: 'bg-gray-50 text-gray-500 border border-gray-100'
    }
  }
  
  // 根据尺寸调整类名
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2 py-1 text-xs',
    lg: 'px-3 py-1 text-sm'
  }
  
  return {
    text: config.text,
    icon: config.icon,
    class: `${config.colors[props.theme]} ${sizeClasses[props.size]}`
  }
})
</script>

<style scoped>
/* 确保动画效果正常显示 */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>