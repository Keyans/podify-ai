<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
    <div class="bg-dark-card rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto text-dark-text">
      <div class="p-5 border-b border-dark-border flex justify-between items-center">
        <h3 class="font-medium">添加新店铺</h3>
        <button @click="close" class="text-gray-400 hover:text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      <div class="p-6">
        <!-- 店铺名称 -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-dark-text mb-2">店铺名称</label>
          <input 
            type="text" 
            v-model="form.storeName" 
            class="w-full px-3 py-2 bg-dark-input border border-dark-border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-dark-text"
            placeholder="请输入店铺名称"
          >
        </div>

        <!-- 所属平台 -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-dark-text mb-2">所属平台</label>
          <select 
            v-model="form.storePlatform" 
            class="w-full px-3 py-2 bg-dark-input border border-dark-border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-dark-text"
          >
            <option value="">请选择所属平台</option>
            <option v-for="platform in platformOptions" :key="platform.value" :value="platform.value">
              {{ platform.label }}
            </option>
          </select>
        </div>

        <!-- 访问令牌 -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-dark-text mb-2">
            访问令牌
            <span class="text-orange-500 text-xs ml-1">如何获取？</span>
          </label>
          <input 
            type="text" 
            v-model="form.accessToken" 
            class="w-full px-3 py-2 bg-dark-input border border-dark-border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-dark-text"
            placeholder="请输入访问令牌"
          >
        </div>

        <!-- 提示信息 -->
        <div class="bg-orange-50 border border-orange-200 rounded-md p-4 mb-6">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-orange-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-orange-800">
                支持平台及获取说明
              </h3>
              <div class="mt-2 text-sm text-orange-700">
                <div class="mb-2">
                  <span class="font-medium">支持平台</span>：TEMU、亚马逊、SHEIN等主流跨境电商平台
                </div>
                <div class="text-xs space-y-1">
                  <div><span class="font-medium">店铺类型</span>：半托管、全托管</div>
                  <div><span class="font-medium">授权秘钥</span>：请联系对应平台获取访问令牌</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="p-5 border-t border-dark-border flex justify-end space-x-3">
        <button 
          @click="close" 
          class="px-4 py-2 border border-dark-border rounded-md text-gray-400 hover:bg-dark-hover"
        >
          取消
        </button>
        <button 
          @click="submit" 
          :disabled="!canSubmit"
          class="px-4 py-2 rounded-md transition-colors"
          :class="canSubmit 
            ? 'bg-blue-600 text-white hover:bg-blue-700' 
            : 'bg-gray-400 text-gray-200 cursor-not-allowed'"
        >
          确定
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, defineProps, defineEmits, watch, computed, onMounted } from 'vue'
import { getPlatformOptions } from '~/apis/business/store'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['close', 'submit'])

// 表单数据
const form = reactive({
  storeName: '',
  storePlatform: '',
  accessToken: ''
})

// 选项数据
const platformOptions = ref([
  { value: 'TEMU', label: 'TEMU' },
  { value: 'AMAZON', label: '亚马逊' },
  { value: 'SHEIN', label: 'SHEIN' }
])

// 验证表单是否可提交
const canSubmit = computed(() => {
  return form.storeName.trim() && form.storePlatform && form.accessToken.trim()
})

// 获取平台选项
const loadPlatformOptions = async () => {
  try {
    const response = await getPlatformOptions()
    if (response && response.success && response.data && Array.isArray(response.data)) {
      platformOptions.value = response.data
    }
  } catch (error) {
    console.error('获取平台选项失败:', error)
    // 保持默认选项，不需要重新设置
  }
}



// 关闭弹窗
const close = () => {
  emits('close')
}

// 提交表单
const submit = () => {
  if (!canSubmit.value) {
    return
  }
  
  const formData = {
    storeName: form.storeName,
    storePlatform: form.storePlatform,
    accessToken: form.accessToken
  }
  emits('submit', formData)
}

// 重置表单
const resetForm = () => {
  Object.assign(form, {
    storeName: '',
    storePlatform: '',
    accessToken: ''
  })
}

// 监听弹窗关闭事件，重置表单
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    // 弹窗打开时加载选项数据
    loadPlatformOptions()
  } else {
    // 弹窗关闭时重置表单
    resetForm()
  }
})

// 组件挂载时加载选项数据
onMounted(() => {
  loadPlatformOptions()
})
</script> 