<template>
  <span :class="className">
    {{ formattedTime }}
  </span>
</template>

<script setup lang="ts">
interface Props {
  time?: string | number | Date | null
  format?: string
  className?: string
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  format: 'YYYY-MM-DD HH:mm:ss',
  className: '',
  placeholder: '-'
})

const formattedTime = computed(() => {
  if (!props.time) {
    return props.placeholder
  }

  try {
    const date = new Date(props.time)
    
    // 检查日期是否有效
    if (isNaN(date.getTime())) {
      return props.placeholder
    }

    // 格式化时间
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')

    // 根据格式返回相应的时间字符串
    switch (props.format) {
      case 'YYYY-MM-DD':
        return `${year}-${month}-${day}`
      case 'HH:mm:ss':
        return `${hours}:${minutes}:${seconds}`
      case 'YYYY-MM-DD HH:mm':
        return `${year}-${month}-${day} ${hours}:${minutes}`
      case 'YYYY-MM-DD HH:mm:ss':
      default:
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    }
  } catch (error) {
    console.warn('TimeFormatter: Invalid time format', props.time, error)
    return props.placeholder
  }
})
</script>

<style scoped>
/* 默认样式，可以通过className prop覆盖 */
.time-formatter {
  font-family: 'Courier New', monospace;
  color: #666;
}
</style>