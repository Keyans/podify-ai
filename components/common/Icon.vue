<template>
  <span class="custom-icon" :style="{ color: color }">
    {{ iconText }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  type: string
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  color: 'currentColor'
})

const iconText = computed(() => {
  const iconMap: Record<string, string> = {
    'clock-circle': '⏰',
    'loading': '⏳',
    'check-circle': '✅',
    'exclamation-circle': '⚠️',
    'close-circle': '❌',
    'question-circle': '❓'
  }
  
  return iconMap[props.type] || '❓'
})
</script>

<style scoped>
.custom-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}
</style>