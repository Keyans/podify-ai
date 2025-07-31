<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-6">环境配置测试</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- 环境信息 -->
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-lg font-semibold mb-4">当前环境</h2>
        <div class="space-y-2">
          <div>环境名称: <span class="font-mono text-blue-600">{{ envConfig.name }}</span></div>
          <div>环境类型: <span class="font-mono text-blue-600">{{ envConfig.clientType }}</span></div>
        </div>
      </div>

      <!-- API 配置 -->
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-lg font-semibold mb-4">API 配置</h2>
        <div class="space-y-2 text-sm">
          <div>代理目标: <span class="font-mono text-green-600">{{ envConfig.apiProxyTarget }}</span></div>
          <div>API 前缀: <span class="font-mono text-green-600">{{ envConfig.apiPrefix }}</span></div>
          <div>代理前缀: <span class="font-mono text-green-600">{{ envConfig.apiProxyPrefix }}</span></div>
          <div>客户端类型: <span class="font-mono text-green-600">{{ envConfig.apiClientType }}</span></div>
          <div>认证令牌: <span class="font-mono text-red-600">{{ maskedToken }}</span></div>
        </div>
      </div>

      <!-- 业务配置 -->
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-lg font-semibold mb-4">业务配置</h2>
        <div class="space-y-2 text-sm">
          <div>图库地址: <span class="font-mono text-purple-600">{{ envConfig.galleryUrl }}</span></div>
          <div>后端 API: <span class="font-mono text-purple-600">{{ envConfig.backendApi }}</span></div>
          <div>微应用地址: <span class="font-mono text-purple-600">{{ envConfig.microPodUrl }}</span></div>
        </div>
      </div>

      <!-- 测试请求 -->
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-lg font-semibold mb-4">API 测试</h2>
        <button 
          @click="testApi" 
          :disabled="testing"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ testing ? '测试中...' : '测试 API 连接' }}
        </button>
        
        <div v-if="testResult" class="mt-4 p-3 rounded" :class="testResult.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
          <div class="font-semibold">{{ testResult.success ? '✅ 连接成功' : '❌ 连接失败' }}</div>
          <div class="text-sm mt-1">{{ testResult.message }}</div>
          <div v-if="testResult.url" class="text-xs mt-1 font-mono">{{ testResult.url }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

// 获取运行时配置
const { $config } = useNuxtApp()

// 环境配置
const envConfig = computed(() => ({
  name: $config.public.environmentName || '未知环境',
  clientType: $config.public.clientType || 'unknown',
  apiProxyTarget: $config.public.apiProxyTarget || '',
  apiPrefix: $config.public.apiPrefix || '',
  apiProxyPrefix: $config.public.apiProxyPrefix || '',
  apiClientType: $config.public.apiClientType || '',
  apiAuthToken: $config.public.apiHeaders?.authorization || '',
  galleryUrl: $config.public.galleryUrl || '',
  backendApi: $config.public.backendApi || '',
  microPodUrl: $config.public.microPodUrl || ''
}))

// 隐藏令牌
const maskedToken = computed(() => {
  const token = envConfig.value.apiAuthToken
  if (!token) return '未配置'
  return token.slice(0, 8) + '***' + token.slice(-4)
})

// 测试状态
const testing = ref(false)
const testResult = ref(null)

// 测试 API 连接
const testApi = async () => {
  testing.value = true
  testResult.value = null
  
  try {
    const testUrl = '/pod/cuzcuz-ai/smart/cropper/total'
    const response = await fetch(testUrl)
    
    testResult.value = {
      success: response.ok,
      message: response.ok ? 
        `HTTP ${response.status} - API 响应正常` : 
        `HTTP ${response.status} - ${response.statusText}`,
      url: `代理到: ${envConfig.value.apiProxyTarget}${testUrl}`
    }
  } catch (error) {
    testResult.value = {
      success: false,
      message: `网络错误: ${error.message}`,
      url: `目标: ${envConfig.value.apiProxyTarget}`
    }
  } finally {
    testing.value = false
  }
}

// 设置页面标题
definePageMeta({
  title: '环境配置测试'
})
</script>

<style scoped>
body {
  background-color: #f5f5f5;
}
</style> 