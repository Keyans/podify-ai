<template>
  <div class="api-upload-form">
    <!-- 接口名称 -->
    <div class="form-item">
      <label class="form-label">接口名称</label>
      <a-input
        v-model:value="apiForm.name"
        placeholder="请输入接口名称（选填）"
      />
    </div>

    <!-- 接口地址 -->
    <div class="form-item">
      <label class="form-label">接口地址</label>
      <a-input
        v-model:value="apiForm.url"
        placeholder="请输入接口URL"
      />
    </div>

    <!-- 请求方式 -->
    <div class="form-item">
      <label class="form-label">请求方式</label>
      <a-select
        v-model:value="apiForm.method"
        placeholder="选择请求方式"
        style="width: 100%"
      >
        <a-select-option value="GET">GET</a-select-option>
        <a-select-option value="POST">POST</a-select-option>
      </a-select>
    </div>

    <!-- 请求头 -->
    <div class="form-item">
      <label class="form-label">请求头（可选）</label>
      <a-textarea
        v-model:value="apiForm.headers"
        placeholder='{"Content-Type": "application/json", "Authorization": "Bearer token"}'
        :rows="3"
      />
    </div>

    <!-- 请求体 -->
    <div class="form-item" v-if="apiForm.method === 'POST'">
      <label class="form-label">请求体（可选）</label>
      <a-textarea
        v-model:value="apiForm.body"
        placeholder="请输入JSON格式的请求体"
        :rows="4"
      />
    </div>

    <!-- 测试连接 -->
    <div class="form-item">
      <div class="flex items-center space-x-3">
        <a-button 
          type="primary" 
          @click="testApiConnection"
          :loading="apiTesting"
          size="small"
        >
          测试连接
        </a-button>
        <span v-if="apiTestResult" :class="apiTestResult.success ? 'text-green-500' : 'text-red-500'" class="text-sm">
          {{ apiTestResult.message }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import type { TemplateDTO, PlatformFieldConfig } from '~/apis/business/publish'

// Props
interface Props {
  platformFieldConfig?: PlatformFieldConfig[]
  commonForm?: {
    platform: string
    templateName: string
  }
  getPlatformId?: (platformName: string) => number
}

const props = withDefaults(defineProps<Props>(), {
  platformFieldConfig: () => [],
  commonForm: () => ({ platform: '', templateName: '' }),
  getPlatformId: () => () => 0
})

// Emits
interface Emits {
  (e: 'getDto'): TemplateDTO | null
}

const emits = defineEmits<Emits>()

// API上传数据
const apiForm = reactive({
  name: '',
  url: '',
  method: 'GET',
  headers: '',
  body: '',
  responseData: null as any
})

// API测试状态
const apiTesting = ref(false)
const apiTestResult = ref<{success: boolean, message: string} | null>(null)

// API测试连接
const testApiConnection = async () => {
  if (!apiForm.url) {
    message.error('请输入接口地址')
    return
  }
  
  try {
    apiTesting.value = true
    apiTestResult.value = null
    
    // 解析请求头
    let headers = {}
    if (apiForm.headers) {
      try {
        headers = JSON.parse(apiForm.headers)
      } catch (error) {
        apiTestResult.value = { success: false, message: '请求头格式错误，请输入正确的JSON格式' }
        return
      }
    }
    
    // 构建请求配置
    const config: any = {
      method: apiForm.method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    }
    
    // 如果是POST请求且有请求体
    if (apiForm.method === 'POST' && apiForm.body) {
      try {
        config.body = JSON.stringify(JSON.parse(apiForm.body))
      } catch (error) {
        apiTestResult.value = { success: false, message: '请求体格式错误，请输入正确的JSON格式' }
        return
      }
    }
    
    // 发送测试请求
    const response = await fetch(apiForm.url, config)
    
    if (response.ok) {
      const data = await response.json()
      apiTestResult.value = { success: true, message: '连接成功！' }
      apiForm.responseData = data
      console.log('API测试响应:', data)
    } else {
      apiTestResult.value = { success: false, message: `连接失败: ${response.status} ${response.statusText}` }
    }
  } catch (error) {
    console.error('API测试错误:', error)
    apiTestResult.value = { success: false, message: `连接失败: ${error instanceof Error ? error.message : '未知错误'}` }
  } finally {
    apiTesting.value = false
  }
}

// 构造API上传专用的DTO对象
const buildApiUploadDTO = (): TemplateDTO => {
  return {
    id: 0,
    name: props.commonForm?.templateName || apiForm.name || '接口导入模板',
    platformId: props.getPlatformId?.(props.commonForm?.platform || '') || 0,
    storeId: 0,
    categoryId: 0,
    baseTemplateId: 0,
    platformFields: {
      key: {
        type: 'api_data',
        apiUrl: apiForm.url,
        apiMethod: apiForm.method,
        apiHeaders: apiForm.headers,
        apiBody: apiForm.body,
        uploadMethod: 'api',
        platformFieldConfig: props.platformFieldConfig // 包含平台字段配置
      }
    },
    categoryFields: {
      key: {
        source: 'api',
        data: Array.isArray(apiForm.responseData) 
          ? apiForm.responseData.slice(0, 5) 
          : (apiForm.responseData ? [apiForm.responseData] : []),
        rawApiData: apiForm.responseData,
        uploadMethod: 'api'
      }
    }
  }
}

// 获取DTO数据
const getDto = (): TemplateDTO | null => {
  if (!apiForm.url) {
    message.error('请输入接口地址')
    return null
  }
  
  return buildApiUploadDTO()
}

// 重置表单
const resetForm = () => {
  apiForm.name = ''
  apiForm.url = ''
  apiForm.method = 'GET'
  apiForm.headers = ''
  apiForm.body = ''
  apiForm.responseData = null
  apiTestResult.value = null
}

// 暴露方法给父组件
defineExpose({
  getDto,
  resetForm
})
</script>

<style scoped>
.api-upload-form {
  padding: 16px 0;
}

.form-item {
  margin-bottom: 16px;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: var(--text-primary);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .form-item {
    margin-bottom: 12px;
  }
}
</style>