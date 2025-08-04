<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
    <!-- 背景遮罩 -->
    <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity" @click="close"></div>
    
    <!-- 弹窗内容 -->
    <div class="flex min-h-full items-center justify-center p-4">
      <div class="relative bg-dark-card rounded-lg shadow-xl max-w-2xl w-full border border-dark-border">
        <!-- 弹窗头部 -->
        <div class="flex items-center justify-between p-6 border-b border-dark-border">
          <h3 class="text-lg font-medium text-dark-text">新建批量刊登任务</h3>
          <button @click="close" class="text-dark-text-secondary hover:text-dark-text">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- 弹窗内容 -->
        <div class="p-6">
          <form @submit.prevent="handleSubmit">
            <!-- 任务名称 -->
            <div class="mb-4">
              <label class="block text-sm font-medium text-dark-text mb-2">任务名称</label>
              <input 
                v-model="formData.taskName"
                type="text" 
                class="w-full px-3 py-2 bg-dark-input border border-dark-border rounded-md focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-dark-text"
                placeholder="请输入任务名称"
                required
              >
            </div>

            <!-- 目标平台 -->
            <div class="mb-4">
              <label class="block text-sm font-medium text-dark-text mb-2">目标平台</label>
              <div class="grid grid-cols-3 gap-3">
                <label v-for="platform in platforms" :key="platform.value" class="flex items-center space-x-2 cursor-pointer">
                  <input 
                    v-model="formData.selectedPlatforms"
                    :value="platform.value"
                    type="checkbox" 
                    class="rounded border-dark-border text-cyan-400 focus:ring-cyan-400"
                  >
                  <span class="text-sm text-dark-text">{{ platform.label }}</span>
                </label>
              </div>
            </div>

            <!-- 商品数量 -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-dark-text mb-2">预计刊登商品数量</label>
              <input 
                v-model.number="formData.productCount"
                type="number" 
                min="1"
                class="w-full px-3 py-2 bg-dark-input border border-dark-border rounded-md focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-dark-text"
                placeholder="请输入商品数量"
                required
              >
            </div>

            <!-- 操作按钮 -->
            <div class="flex justify-end space-x-3">
              <button 
                type="button"
                @click="close"
                class="px-4 py-2 border border-dark-border rounded-md text-dark-text-secondary hover:bg-dark-input transition-colors"
              >
                取消
              </button>
              <button 
                type="submit"
                class="px-4 py-2 bg-cyan-400 text-dark-bg rounded-md hover:bg-cyan-500 transition-colors"
              >
                创建任务
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'submit'])

// 表单数据
const formData = ref({
  taskName: '',
  selectedPlatforms: [],
  productCount: ''
})

// 平台选项
const platforms = ref([
  { value: 'taobao', label: '淘宝' },
  { value: 'tmall', label: '天猫' },
  { value: 'jd', label: '京东' },
  { value: 'pdd', label: '拼多多' },
  { value: 'douyin', label: '抖音' },
  { value: 'kuaishou', label: '快手' }
])

// 关闭弹窗
const close = () => {
  emit('close')
}

// 提交表单
const handleSubmit = () => {
  if (formData.value.selectedPlatforms.length === 0) {
    alert('请至少选择一个目标平台')
    return
  }
  
  emit('submit', { ...formData.value })
  
  // 重置表单
  formData.value = {
    taskName: '',
    selectedPlatforms: [],
    productCount: ''
  }
}

// 监听弹窗状态，重置表单
watch(() => props.isOpen, (newVal) => {
  if (!newVal) {
    formData.value = {
      taskName: '',
      selectedPlatforms: [],
      productCount: ''
    }
  }
})
</script> 