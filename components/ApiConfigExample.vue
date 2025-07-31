<template>
  <div class="api-config-example p-4">
    <h2 class="text-xl font-bold mb-4">API配置示例</h2>
    
    <div class="mb-4">
      <p><strong>当前环境:</strong> {{ apiConfig.currentEnv }}</p>
      <p><strong>API基础URL:</strong> {{ currentConfig.apiBaseUrl }}</p>
      <p><strong>采集API完整地址:</strong> {{ collectorApiUrl }}</p>
      <p><strong>API头部信息:</strong></p>
      <pre class="bg-gray-100 p-2 rounded">{{ JSON.stringify(apiConfig.getApiHeaders(), null, 2) }}</pre>
    </div>
    
    <div class="mb-4">
      <h3 class="text-lg font-bold mb-2">切换环境</h3>
      <div class="flex space-x-2">
        <button @click="changeEnvironment('development')" class="px-3 py-1 bg-blue-500 text-white rounded">
          开发环境
        </button>
        <button @click="changeEnvironment('testing')" class="px-3 py-1 bg-green-500 text-white rounded">
          测试环境
        </button>
        <button @click="changeEnvironment('production')" class="px-3 py-1 bg-red-500 text-white rounded">
          生产环境
        </button>
      </div>
    </div>
    
    <div class="mb-4">
      <h3 class="text-lg font-bold mb-2">设置认证令牌</h3>
      <div class="flex space-x-2">
        <input v-model="authToken" class="border px-2 py-1 rounded flex-1" placeholder="输入认证令牌" />
        <button @click="setToken" class="px-3 py-1 bg-purple-500 text-white rounded">
          设置令牌
        </button>
      </div>
    </div>
    
    <div class="mt-6">
      <button @click="fetchCollectorData" class="px-4 py-2 bg-teal-500 text-white rounded">
        测试API调用
      </button>
      <div v-if="response" class="mt-4">
        <h3 class="text-lg font-bold">API响应:</h3>
        <pre class="bg-gray-100 p-2 rounded mt-2">{{ JSON.stringify(response, null, 2) }}</pre>
      </div>
      <div v-if="error" class="mt-4 text-red-500">
        <h3 class="text-lg font-bold">错误:</h3>
        <pre class="bg-red-100 p-2 rounded mt-2">{{ error }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useApiConfig } from '~/composables/useApiConfig'

const apiConfig = useApiConfig()
const authToken = ref('')
const response = ref(null)
const error = ref(null)

const currentConfig = computed(() => {
  return apiConfig.getCurrentConfig()
})

const collectorApiUrl = computed(() => {
  return apiConfig.getFullApiUrl()
})

function changeEnvironment(env) {
  apiConfig.setEnvironment(env)
}

function setToken() {
  if (authToken.value) {
    apiConfig.setAuthToken(authToken.value)
  }
}

async function fetchCollectorData() {
  try {
    error.value = null
    response.value = null
    
    const apiUrl = apiConfig.getFullApiUrl()
    const headers = apiConfig.getApiHeaders()
    
    // 测试API调用
    const res = await fetch(apiUrl, {
      method: 'GET',
      headers
    })
    
    if (!res.ok) {
      throw new Error(`API请求失败: ${res.status}`)
    }
    
    response.value = await res.json()
  } catch (err) {
    error.value = err.message
    console.error('API调用错误:', err)
  }
}

onMounted(() => {
  // 可以在这里初始化配置，例如从本地存储中恢复环境设置或令牌
  console.log('API配置示例组件已加载')
})
</script> 