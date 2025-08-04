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
        <!-- 所属平台 -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-dark-text mb-2">所属平台</label>
          <select 
            v-model="form.platform" 
            class="w-full px-3 py-2 bg-dark-input border border-dark-border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-dark-text"
          >
            <option value="">请选择所属平台</option>
            <option v-for="platform in platformOptions" :key="platform.value" :value="platform.value">
              {{ platform.label }}
            </option>
          </select>
        </div>

        <!-- 店铺类型 -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-dark-text mb-2">店铺类型</label>
          <select 
            v-model="form.storeType" 
            class="w-full px-3 py-2 bg-dark-input border border-dark-border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-dark-text"
          >
            <option value="">请选择店铺类型</option>
            <option v-for="type in storeTypeOptions" :key="type.value" :value="type.value">
              {{ type.label }}
            </option>
          </select>
        </div>

        <!-- 授权秘钥 -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-dark-text mb-2">
            授权秘钥
            <span class="text-orange-500 text-xs ml-1">如何获取？</span>
          </label>
          <input 
            type="text" 
            v-model="form.authKey" 
            class="w-full px-3 py-2 bg-dark-input border border-dark-border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-dark-text"
            placeholder="请输入Temu店铺秘钥"
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
                  <span class="font-medium">三三手机号平台说明</span>：如果您还不支持 Temu 平台
                </div>
                <div class="text-xs space-y-1">
                  <div><span class="font-medium">学校：</span>店铺类型（货源）：半托管，全托管</div>
                  <div><span class="font-medium">学校：</span>授权秘钥（第入口）：</div>
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
import { getPlatformOptions, getStoreTypeOptions } from '~/apis/business/store'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['close', 'submit'])

// 表单数据
const form = reactive({
  platform: '',
  storeType: '',
  authKey: ''
})

// 选项数据
const platformOptions = ref([])
const storeTypeOptions = ref([])

// 验证表单是否可提交
const canSubmit = computed(() => {
  return form.platform && form.storeType && form.authKey.trim()
})

// 获取平台选项
const loadPlatformOptions = async () => {
  try {
    const response = await getPlatformOptions()
    if (response.success) {
      platformOptions.value = response.data
    }
  } catch (error) {
    console.error('获取平台选项失败:', error)
    // 使用默认选项
    platformOptions.value = [
      { value: 'temu', label: 'Temu' },
      { value: 'amazon', label: '亚马逊' },
      { value: 'shein', label: 'Shein' }
    ]
  }
}

// 获取店铺类型选项
const loadStoreTypeOptions = async () => {
  try {
    const response = await getStoreTypeOptions()
    if (response.success) {
      storeTypeOptions.value = response.data
    }
  } catch (error) {
    console.error('获取店铺类型选项失败:', error)
    // 使用默认选项
    storeTypeOptions.value = [
      { value: 'semi-managed', label: '半托管' },
      { value: 'full-managed', label: '全托管' }
    ]
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
    ...form
  }
  emits('submit', formData)
}

// 重置表单
const resetForm = () => {
  Object.assign(form, {
    platform: '',
    storeType: '',
    authKey: ''
  })
}

// 监听弹窗关闭事件，重置表单
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    // 弹窗打开时加载选项数据
    loadPlatformOptions()
    loadStoreTypeOptions()
  } else {
    // 弹窗关闭时重置表单
    resetForm()
  }
})

// 组件挂载时加载选项数据
onMounted(() => {
  loadPlatformOptions()
  loadStoreTypeOptions()
})
</script> 