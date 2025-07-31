<template>
  <!-- 统计卡片区域 -->
  <div class="grid grid-cols-4 gap-6 mb-6">
    <div 
      v-for="(stat, index) in stats" 
      :key="index"
      class="rounded-lg p-6"
      :style="{
        backgroundColor: 'var(--bg-secondary)',
        color: 'var(--text-primary)',
        borderWidth: '1px',
        borderColor: 'var(--border-color)'
      }"
    >
      <div>
        <p class="text-sm" :style="{ color: 'var(--text-secondary)' }">{{ stat.title }}</p>
        <p class="text-3xl font-bold mt-2" :style="{ color: 'var(--text-primary)' }">{{ stat.value }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// 定义props
const props = defineProps({
  stats: {
    type: Array,
    default: () => [
      { title: '总采集', value: 156 },
      { title: '成功率', value: '98%' },
      { title: '进行中', value: '45,678' },
      { title: '今日采集', value: 344 }
    ]
  }
})
</script> 