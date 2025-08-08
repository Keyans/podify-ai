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
        <form @submit.prevent="submit" class="space-y-4">
          <!-- 店铺名称 -->
          <div>
            <label class="block text-sm font-medium text-dark-text mb-2">店铺名称</label>
            <input
              v-model="formData.storeName"
              type="text"
              placeholder="请输入店铺名称"
              class="w-full px-3 py-2 bg-dark-input border border-dark-border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-dark-text"
              required
            >
          </div>

          <!-- 所属平台 -->
          <div>
            <label class="block text-sm font-medium text-dark-text mb-2">所属平台</label>
            <select 
              v-model="formData.platform" 
              @change="handlePlatformChange"
              class="w-full px-3 py-2 bg-dark-input border border-dark-border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-dark-text"
              required
            >
              <option value="">请选择所属平台</option>
              <option 
                v-for="platform in availablePlatforms" 
                :key="platform.code" 
                :value="platform.code"
              >
                {{ platform.name }}
              </option>
            </select>
          </div>

          <!-- 动态授权字段 -->
          <div v-if="formData.platform" class="space-y-4">
            <!-- TEMU平台 -->
            <template v-if="formData.platform === 'TEMU'">
              <div>
                <label class="block text-sm font-medium text-dark-text mb-2">授权密钥 <a href="https://seller.temu.com/login.html" target="_blank" class="text-xs text-gray-400">如何获取？</a></label>
                <input
                  v-model="formData.accessToken"
                  type="text"
                  placeholder="请输入TEMU Access Token"
                  class="w-full px-3 py-2 bg-dark-input border border-dark-border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-dark-text"
                  required
                >
                <p class="text-xs text-gray-400 mt-1">从TEMU商家后台获取您的Access Token</p>
              </div>
            </template>

            <!-- 其他平台占位符 -->
            <template v-else>
              <div class="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div class="ml-3">
                    <h3 class="text-sm font-medium text-yellow-800">
                      平台配置开发中
                    </h3>
                    <p class="text-sm text-yellow-700 mt-1">
                      {{ formData.platform }} 平台的授权配置正在开发中，敬请期待！
                    </p>
                  </div>
                </div>
              </div>
            </template>
          </div>

          <!-- 提交按钮 -->
          <div class="flex gap-3 pt-4">
            <button
              type="button"
              @click="close"
              class="flex-1 px-4 py-2 text-gray-400 border border-gray-600 rounded-md hover:bg-gray-700 transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              :disabled="!isFormValid"
              class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              添加店铺
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { usePlatformStore } from '~/stores/platform'

// Props & Emits
const props = defineProps({
  isOpen: Boolean
})

const emits = defineEmits(['close', 'submit'])

// 使用平台store
const platformStore = usePlatformStore()

// 响应式数据
const formData = ref({
  storeName: '',
  platform: '',
  accessToken: '',
  apiKey: '',
  secretKey: '',
  accessKeyId: '',
  secretAccessKey: '',
  marketplaceId: '',
  storeUrl: ''
})

// 从store获取可用平台列表（排除"全部平台"选项）
const availablePlatforms = computed(() => {
  const platformList = platformStore.getPlatformList || []
  return platformList.filter(platform => platform.key !== 'all')
})

// 计算属性
const isFormValid = computed(() => {
  if (!formData.value.storeName || !formData.value.platform) {
    return false
  }

  // 目前只有TEMU平台已接入，其他平台暂时只要基础信息就可以
  if (formData.value.platform === 'temu') {
    return !!formData.value.accessToken
  }
  
  // 其他平台暂时只验证基础信息
  return true
})

// 方法
const close = () => {
  emits('close')
}

const handlePlatformChange = () => {
  // 清空之前平台的授权字段
  const keepFields = ['storeName', 'platform']
  Object.keys(formData.value).forEach(key => {
    if (!keepFields.includes(key)) {
      formData.value[key] = ''
    }
  })
}



const submit = () => {
  if (!isFormValid.value) return
  
  emits('submit', {
    ...formData.value
  })
}

const resetForm = () => {
  formData.value = {
    storeName: '',
    platform: '',
    accessToken: '',
    apiKey: '',
    secretKey: '',
    accessKeyId: '',
    secretAccessKey: '',
    marketplaceId: '',
    storeUrl: ''
  }
}

// 监听弹窗关闭，重置表单
watch(() => props.isOpen, (newVal) => {
  if (!newVal) {
    resetForm()
  }
})

// 组件挂载时确保平台数据已加载
onMounted(async () => {
  try {
    await platformStore.loadPlatforms()
  } catch (error) {
    console.error('加载平台数据失败:', error)
  }
})
</script>