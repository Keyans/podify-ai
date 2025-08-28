<template>
  <!-- 上传模板弹窗 -->
  <a-modal
    v-model:open="internalVisible"
    title="上传模板"
    :width="600"
    :footer="null"
    centered
    :maskClosable="false"
    class="upload-template-modal"
  >
    <div class="upload-form">
      <!-- 平台选择 -->
      <div class="form-item">
        <label class="form-label">请选择模板平台</label>
        <a-select
          v-model:value="commonForm.platform"
          placeholder="请选择平台"
          :loading="platformLoading"
          style="width: 100%"
          @change="onPlatformChange"
        >
          <a-select-option 
            v-for="option in platformOptions.filter(item => item.value !== '')"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </a-select-option>
        </a-select>
      </div>

      <!-- 模板名称 -->
      <div class="form-item">
        <label class="form-label">模板名称</label>
        <a-input
          v-model:value="commonForm.templateName"
          placeholder="请输入名称（选填，不填写自动使用文件名）"
        />
      </div>

      <!-- 上传方式选择 -->
      <div class="form-item">
        <label class="form-label">上传方式</label>
        <a-select
          v-model:value="uploadMethod"
          placeholder="请选择上传方式"
          style="width: 100%"
        >
          <a-select-option value="template">模版上传</a-select-option>
          <a-select-option value="api">接口上传</a-select-option>
        </a-select>
      </div>

      <!-- 模版上传组件 -->
      <UploadTemplateForm
        v-if="uploadMethod === 'template'"
        ref="templateFormRef"
        :platform-field-config="platformFieldConfig"
        :common-form="commonForm"
        :get-platform-id="getPlatformId"
      />

      <!-- API上传组件 -->
      <ApiUploadForm
        v-else-if="uploadMethod === 'api'"
        ref="apiFormRef"
        :platform-field-config="platformFieldConfig"
        :common-form="commonForm"
        :get-platform-id="getPlatformId"
      />

      <!-- 底部按钮 -->
      <div class="form-actions">
        <a-button @click="handleCancel">取消</a-button>
        <a-button @click="handleClearForm" style="margin-left: 8px;">清空表单</a-button>
        <a-button 
          type="primary" 
          :loading="uploading"
          @click="handleFormSubmit"
          style="margin-left: 8px;"
        >
          确定上传
        </a-button>
      </div>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { computed, ref, reactive, watch } from 'vue'
import { message } from 'ant-design-vue'
import ApiUploadForm from './upload-type/api/ApiUploadForm.vue'
import UploadTemplateForm from './upload-type/template/UploadTemplateForm.vue'
import { createTemplate, getPlatformFieldConfig, type PlatformFieldConfig } from '~/apis/business/publish'

// Props
interface Props {
  open?: boolean
  platformOptions?: Array<{label: string, value: string, id?: string}>
  platformLoading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  open: false,
  platformOptions: () => [],
  platformLoading: false
})

// Emits
interface Emits {
  (e: 'update:open', value: boolean): void
  (e: 'close'): void
  (e: 'success'): void
}

const emits = defineEmits<Emits>()

// 上传状态
const uploading = ref(false)

// 公共表单数据
const commonForm = reactive({
  platform: '',
  templateName: ''
})

// 上传方式
const uploadMethod = ref('api')

// 平台字段配置相关状态
const platformFieldConfig = ref<PlatformFieldConfig[]>([])
const fieldConfigLoading = ref(false)

// 组件引用
const templateFormRef = ref()
const apiFormRef = ref()

// 内部可见性状态
const internalVisible = computed({
  get: () => props.open,
  set: (value: boolean) => {
    emits('update:open', value)
    if (!value) {
      emits('close')
    }
  }
})

// 监听弹窗打开状态和平台选项变化，自动设置默认值
watch([() => props.open, () => props.platformOptions], ([isOpen, newOptions]) => {
  console.log('弹窗状态变化:', { isOpen, optionsLength: newOptions?.length, currentPlatform: commonForm.platform })
  
  // 只有在弹窗打开时才执行自动选择逻辑
  if (!isOpen) {
    return
  }
  
  // 过滤掉空值选项，获取有效的平台选项
  const validOptions = newOptions.filter(item => item.value !== '')
  
  // 如果有可用选项且当前未选择平台，自动选择第0个
  if (validOptions.length > 0 && !commonForm.platform) {
    const defaultPlatform = validOptions[0].value
    console.log('弹窗打开时自动设置默认平台:', defaultPlatform)
    
    // 设置默认平台
    commonForm.platform = defaultPlatform
    
    // 自动加载该平台的字段配置
    onPlatformChange(defaultPlatform)
  } else if (commonForm.platform && validOptions.length > 0) {
    // 如果当前已经有选中的平台，确保字段配置被加载
    console.log('当前已选择平台，重新加载字段配置:', commonForm.platform)
    onPlatformChange(commonForm.platform)
  }
})

// 监听上传方式变化，确保切换到API上传时重新加载字段配置
watch(uploadMethod, (newMethod) => {
  console.log('上传方式变化:', newMethod, '当前平台:', commonForm.platform)
  
  // 如果切换到API上传且已经选择了平台，重新加载字段配置
  if (newMethod === 'api' && commonForm.platform) {
    console.log('切换到API上传，重新加载字段配置')
    onPlatformChange(commonForm.platform)
  }
})

// 获取平台ID（从 platformOptions props 中查找对应的真实ID）
const getPlatformId = (platformName: string): number => {
  // 首先尝试从 props.platformOptions 中找到对应的平台ID
  const platformOption = props.platformOptions.find(option => 
    option.value === platformName || option.label === platformName
  )
  
  if (platformOption && platformOption.id) {
    // 如果找到了对应的平台选项并且有ID，返回真实的ID
    const realId = parseInt(platformOption.id)
    if (!isNaN(realId)) {
      console.log(`平台 ${platformName} 的真实ID:`, realId)
      return realId
    }
  }
  
  // 如果没有找到或者ID不是数字，使用备用映射（兼容性考虑）
  console.warn(`未在 platformOptions 中找到平台 ${platformName} 的ID，使用备用映射`)
  const fallbackMap: Record<string, number> = {
    'temu': 2, // 根据您提到的，TEMU的真实ID是2
    'TEMU': 2,
    'amazon': 1,
    '亚马逊': 1,
    'AMAZON': 1,
    'shein': 3,
    'SHEIN': 3,
    'Shein': 3,
    'tiktok': 4,
    'TikTok': 4,
    'TIKTOK': 4,
    'ebay': 5,
    'eBay': 5,
    'EBAY': 5,
    'shopify': 6,
    'SHOPIFY': 6
  }
  return fallbackMap[platformName] || 0
}

// 平台变化事件处理
const onPlatformChange = async (value: any) => {
  const platformStr = value ? String(value) : ''
  
  if (!platformStr) {
    // 清空平台字段配置
    platformFieldConfig.value = []
    return
  }
  
  console.log('平台变化:', platformStr)
  await fetchPlatformFieldConfig(platformStr)
}

// 获取平台字段配置
const fetchPlatformFieldConfig = async (platformValue: string) => {
  try {
    fieldConfigLoading.value = true
    
    console.log('开始获取平台字段配置...', { 
      platformValue, 
      availablePlatforms: props.platformOptions 
    })
    
    // 根据平台名称获取平台ID
    const platformId = getPlatformId(platformValue)
    if (!platformId) {
      console.warn('未找到平台ID:', {
        platformValue,
        availablePlatforms: props.platformOptions,
        searchResult: props.platformOptions.find(option => 
          option.value === platformValue || option.label === platformValue
        )
      })
      message.warning('未识别的平台类型')
      return
    }
    
    console.log('平台ID获取成功:', { platformValue, platformId })
    
    // 调用真实接口
    const response = await getPlatformFieldConfig(platformId.toString())
    
    if (response.success && response.data) {
      // 接口返回的数据结构是 response.data 而不是 response.data.fields
      const fields = Array.isArray(response.data) ? response.data : []
      platformFieldConfig.value = fields
      console.log('平台字段配置获取成功:', response.data)
      message.success(`获取${platformValue}平台字段配置成功`)
    } else {
      console.warn('获取平台字段配置失败:', response)
      message.warning('获取平台字段配置失败')
      platformFieldConfig.value = []
    }
  } catch (error) {
    console.error('获取平台字段配置失败:', error)
    message.error('获取平台字段配置失败，请重试')
    platformFieldConfig.value = []
  } finally {
    fieldConfigLoading.value = false
  }
}

// 处理表单提交
const handleFormSubmit = async () => {
  if (!commonForm.platform) {
    message.error('请选择平台')
    return
  }
  
  if (!uploadMethod.value) {
    message.error('请选择上传方式')
    return
  }
  
  try {
    uploading.value = true
    
    let templateDTO
    
    // 模版上传
    if (uploadMethod.value === 'template' && templateFormRef.value) {
      templateDTO = await templateFormRef.value.getDto()
    } 
    // API上传
    else if (uploadMethod.value === 'api' && apiFormRef.value) {
      templateDTO = await apiFormRef.value.getDto()
    }
    
    if (!templateDTO) {
      return // 子组件已经显示了错误信息
    }
    
    console.log('开始调用createTemplate接口:', templateDTO)
    
    // 调用创建模板接口
    const response = await createTemplate(templateDTO)
    
    if (response.success) {
      message.success('模板上传成功！')
      console.log('模板创建成功:', response.data)
      
      // 触发成功事件
      handleUploadSuccess()
    } else {
      console.error('模板创建失败:', response)
      message.error(`模板上传失败: ${response.message || '未知错误'}`)
    }
  } catch (error) {
    console.error('模板上传失败:', error)
    message.error('模板上传失败，请重试')
  } finally {
    uploading.value = false
  }
}

// 处理上传成功
const handleUploadSuccess = () => {
  emits('success')
  internalVisible.value = false
}

// 处理取消
const handleCancel = () => {
  internalVisible.value = false
}

// 清空表单
const handleClearForm = () => {
  // 重置公共表单
  commonForm.platform = ''
  commonForm.templateName = ''
  
  // 重置上传方式
  uploadMethod.value = 'template'
  
  // 重置平台字段配置
  platformFieldConfig.value = []
  
  // 重置子组件
  if (templateFormRef.value) {
    templateFormRef.value.resetForm()
  }
  if (apiFormRef.value) {
    apiFormRef.value.resetForm()
  }
}
</script>

<style scoped>
.upload-template-modal {
  .ant-modal-body {
    padding: 16px;
  }
}

.upload-form {
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

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid var(--border-color);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .form-actions {
    flex-direction: column;
  }
  
  .form-actions .ant-btn {
    width: 100%;
  }
}
</style>