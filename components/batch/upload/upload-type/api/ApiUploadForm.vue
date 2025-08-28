<template>
  <div class="api-upload-form">
    <PageSearch
      v-if="dynamicFields.length > 0"
      v-model="formData"
      :fields="dynamicFields"
      :has-search-button="false"
      layout="vertical"
    />
    <div v-else class="no-fields-tip">
      <a-empty description="请先选择平台获取字段配置" />
    </div>
    
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { message } from 'ant-design-vue'
import PageSearch from '~/components/common/pageSearch.vue'
import { type PlatformFieldConfig, type TemplateDTO } from '../../../../../apis/business/publish'

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

// 表单数据
const formData = ref<Record<string, any>>({})

// 根据字段类型获取组件名称
const getComponentByType = (fieldType: string): string => {
  switch (fieldType) {
    case 'select':
      return 'a-select'
    case 'textarea':
      return 'a-textarea'
    case 'number':
      return 'a-input-number'
    case 'text':
    default:
      return 'a-input'
  }
}

// 处理选项配置
const processOptions = (field: PlatformFieldConfig) => {
  if (field.type === 'select' && field.options) {
    return field.options.map(option => ({
      label: option.label || option.value, // 兼容label为null的情况
      value: option.value
    }))
  }
  return []
}

// 处理字段属性配置
const getFieldProps = (field: PlatformFieldConfig) => {
  const baseProps: Record<string, any> = {}

  // 根据字段类型添加特定属性
  switch (field.type) {
    case 'select':
      baseProps.options = processOptions(field)
      baseProps.placeholder = field.optionsConfig?.placeholder || `请选择${field.label}`
      break
    case 'number':
      baseProps.min = field.optionsConfig?.min ?? 0
      baseProps.step = field.optionsConfig?.step ?? 0.01
      baseProps.placeholder = field.optionsConfig?.placeholder || `请输入${field.label}`
      if (field.optionsConfig?.max !== undefined) {
        baseProps.max = field.optionsConfig.max
      }
      break
    case 'textarea':
      baseProps.rows = 4
      baseProps.placeholder = field.optionsConfig?.placeholder || `请输入${field.label}`
      if (field.optionsConfig?.maxLength) {
        baseProps.maxLength = field.optionsConfig.maxLength
      }
      break
    case 'text':
    default:
      baseProps.placeholder = field.optionsConfig?.placeholder || `请输入${field.label}`
      if (field.optionsConfig?.maxLength) {
        baseProps.maxLength = field.optionsConfig.maxLength
      }
      break
  }

  return baseProps
}

// 动态字段配置（基于平台字段配置生成）
const dynamicFields = computed(() => {
  if (!props.platformFieldConfig || props.platformFieldConfig.length === 0) {
    return []
  }

  return props.platformFieldConfig
    .filter(field => field.label && field.code) // 过滤有效字段
    .map(field => {
      // 构建验证规则
      const rules = []
      if (field.required) {
        const fieldType = field.type
        let message = `请输入${field.label}`
        
        if (fieldType === 'select') {
          message = `请选择${field.label}`
        }
        
        rules.push({
          required: true,
          message,
          trigger: fieldType === 'select' ? 'change' : 'blur'
        })
      }
      
      // 添加长度验证
      if (field.optionsConfig?.maxLength) {
        rules.push({
          max: field.optionsConfig.maxLength,
          message: `${field.label}不能超过${field.optionsConfig.maxLength}个字符`,
          trigger: 'blur'
        })
      }
      
      return {
        key: field.code,
        label: field.label,
        component: getComponentByType(field.type),
        props: getFieldProps(field),
        rules
      }
    })
})

// 监听平台字段配置变化，重置表单数据
watch(() => props.platformFieldConfig, (newConfig) => {
  if (newConfig && newConfig.length > 0) {
    // 重置表单数据，保留已有的有效数据
    const newFormData: Record<string, any> = {}
    newConfig.forEach(field => {
      if (field.code) {
        // 如果之前有数据且字段仍然存在，保留数据
        newFormData[field.code] = formData.value[field.code] || ''
      }
    })
    formData.value = newFormData
  } else {
    // 清空表单数据
    formData.value = {}
  }
}, { deep: true })

// 构造API上传专用的DTO对象
const buildApiUploadDTO = (): TemplateDTO => {
  return {
    id: 0,
    name: props.commonForm?.templateName || '接口上传模板',
    platformId: props.getPlatformId?.(props.commonForm?.platform || '') || 0,
    storeId: 0,
    categoryId: 0,
    baseTemplateId: 0,
    platformFields: {
      key: {
        type: 'api_data',
        data: formData.value,
        uploadMethod: 'api',
        platformFieldConfig: props.platformFieldConfig // 包含平台字段配置
      }
    },
    categoryFields: {
      key: {
        source: 'api',
        data: formData.value,
        uploadMethod: 'api'
      }
    }
  }
}

// 获取DTO数据
const getDto = async (): Promise<TemplateDTO | null> => {
  // 验证必填字段
  if (!props.platformFieldConfig || props.platformFieldConfig.length === 0) {
    message.error('平台字段配置为空，请先选择平台')
    return null
  }

  // 检查必填字段
  const requiredFields = props.platformFieldConfig.filter(field => field.required)
  const missingFields = requiredFields.filter(field => {
    const value = formData.value[field.code]
    return !value || (typeof value === 'string' && value.trim() === '')
  })

  if (missingFields.length > 0) {
    const fieldLabels = missingFields.map(field => field.label).join('、')
    message.error(`请填写必填字段：${fieldLabels}`)
    return null
  }

  console.log('API上传表单数据:', formData.value)
  console.log('平台字段配置:', props.platformFieldConfig)
  
  return buildApiUploadDTO()
}

// 重置表单
const resetForm = () => {
  formData.value = {}
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

.no-fields-tip {
  text-align: center;
  padding: 40px 0;
}

.form-actions {
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
  text-align: center;
}

/* 覆盖PageSearch的垂直布局样式 */
.api-upload-form :deep(.ant-form-vertical .ant-form-item) {
  margin-bottom: 16px;
}

.api-upload-form :deep(.ant-form-vertical .ant-form-item-label) {
  padding-bottom: 4px;
  font-weight: 500;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .api-upload-form {
    padding: 12px 0;
  }
  
  .api-upload-form :deep(.ant-form-vertical .ant-form-item) {
    margin-bottom: 12px;
  }
}
</style>