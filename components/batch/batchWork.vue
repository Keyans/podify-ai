<template>
  <div>
    <a-modal
      v-model:open="modalVisible"
      title="新建批量刊登任务"
      width="1000px"
      centered
      :footer="null"
      @cancel="handleCancel"
    >
      <div class="space-y-6">
        <!-- 选择刊登模板部分 -->
        <div>
          <h3 class="text-lg font-medium mt-4">选择刊登模板</h3>
          <PageSearch
            v-model="templateSearchParams"
            :fields="templateSearchFields"
            @search="onTemplateSearch"
            @reset="onTemplateReset"
          >
            <template #prefix>
              <a-button type="primary" @click="showUploadModal">
                上传新模板
              </a-button>
            </template>
          </PageSearch>
        </div>

        <!-- 选择商品部分 -->
        <div>
          <h3 class="text-lg font-medium mb-4">选择商品</h3>
          <div class="p-4 border border-gray-200 rounded-lg">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm text-gray-600">已选择商品: {{ selectedProducts.length }} 个</span>
              <a-button type="primary" @click="showProductSelector = true">
                选择商品
              </a-button>
            </div>
            <div v-if="selectedProducts.length > 0" class="space-y-2">
              <div 
                v-for="product in selectedProducts" 
                :key="product.id"
                class="flex items-center justify-between p-2 bg-gray-50 rounded"
              >
                <div class="flex items-center space-x-2">
                  <img 
                    :src="product.image" 
                    :alt="product.name"
                    class="w-10 h-10 object-cover rounded"
                  />
                  <span>{{ product.name }}</span>
                </div>
                <a-button type="text" size="small" @click="removeProduct(product.id)">
                  移除
                </a-button>
              </div>
            </div>
            <div v-else class="text-gray-400 text-center py-4">
              请选择要刊登的商品
            </div>
          </div>
        </div>
      </div>

      <!-- 弹窗底部按钮 -->
      <template #footer>
        <div class="flex justify-end space-x-2">
          <a-button @click="handleCancel">取消</a-button>
          <a-button 
            type="primary" 
            :disabled="!selectedTemplate || selectedProducts.length === 0"
            @click="handleSubmit"
          >
            提交任务 ({{ selectedProducts.length }}个商品)
          </a-button>
        </div>
      </template>
    </a-modal>

    <!-- 模板选择弹窗 -->
    <batchModal v-model:open="showTemplateModal" @template-selected="onTemplateSelected" />
    
    <!-- 上传新模板弹窗 -->
    <batchModal v-model:open="showUploadTemplateModal" @template-selected="onTemplateUploaded" />
    
    <!-- 商品选择弹窗 -->
    <ProductSelectorModal
      v-model:open="showProductSelector"
      :initial-selected-products="selectedProducts"
      @confirm="onProductsSelected"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import PageSearch from '~/components/common/pageSearch.vue'
import batchModal from '~/components/batch/batchModal.vue'
import ProductSelectorModal from '~/components/ProductSelectorModal.vue'

// 定义接口
interface Template {
  id: string
  name: string
  platformId: string
  storeId: string
}

interface Product {
  id: string
  name: string
  image: string
  category: string
}

// Props 和 Emits
const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
  'close': []
  'submit': [data: { template: Template, products: Product[] }]
}>()

// 响应式数据
const modalVisible = computed({
  get: () => props.open,
  set: (value) => emit('update:open', value)
})

const showTemplateModal = ref(false)
const showProductSelector = ref(false)
const showUploadTemplateModal = ref(false)
const selectedTemplate = ref<Template | null>(null)
const selectedProducts = ref<Product[]>([])

// 模板搜索相关
const templateSearchParams = ref({
  platform: undefined,
  store: undefined,
  templateName: undefined,
  templateId: undefined
})

// 模板选项数据
const templateOptions = ref<Array<{label: string, value: string}>>([])
const loadingTemplates = ref(false)

const templateSearchFields = [
  {
    key: 'platform',
    component: 'a-select',
    props: {
      placeholder: '请选择平台',
      options: [
        { label: '亚马逊', value: 'amazon' },
        { label: 'eBay', value: 'ebay' },
        { label: 'Shopify', value: 'shopify' }
      ],
      style: { width: '150px' }
    }
  },
  {
    key: 'store',
    component: 'a-select',
    props: {
      placeholder: '请选择门店',
      options: [
        { label: '0004号店', value: '0004' },
        { label: '0005号店', value: '0005' }
      ],
      style: { width: '150px' }

    }
  },
  {
    key: 'templateId',
    component: 'a-select',
    props: {
      placeholder: '请选择模板',
      options: templateOptions,
      showSearch: true,
      filterOption: (input: string, option: any) => {
        return option.label.toLowerCase().includes(input.toLowerCase())
      },
      style: { width: '150px' }
    }
  },
]

// 事件处理函数
const handleCancel = () => {
  modalVisible.value = false
  emit('close')
}

const handleSubmit = () => {
  if (selectedTemplate.value && selectedProducts.value.length > 0) {
    emit('submit', {
      template: selectedTemplate.value,
      products: selectedProducts.value
    })
    // 重置数据
    selectedTemplate.value = null
    selectedProducts.value = []
    templateSearchParams.value = {
      platform: undefined,
      store: undefined,
      templateName: undefined
    }
    modalVisible.value = false
  }
}

const onTemplateSearch = (params: any) => {
  console.log('搜索模板:', params)
  
  // 如果选择了模板ID，自动设置选中的模板
  if (params.templateId) {
    const selectedTemplateOption = templateOptions.value.find(option => option.value === params.templateId)
    if (selectedTemplateOption) {
      // 根据选中的模板ID找到完整的模板信息
      const templateData: Template = {
        id: params.templateId,
        name: selectedTemplateOption.label,
        platformId: params.platform || 'amazon',
        storeId: params.store || '0004'
      }
      selectedTemplate.value = templateData
    }
  }
  
  // 这里可以调用API搜索模板
}

const onTemplateReset = () => {
  templateSearchParams.value = {
    platform: undefined,
    store: undefined,
    templateName: undefined,
    templateId: undefined
  }
}

const onTemplateSelected = (template: Template) => {
  selectedTemplate.value = template
  showTemplateModal.value = false
}

const clearTemplate = () => {
  selectedTemplate.value = null
}

const onProductsSelected = (products: Product[]) => {
  selectedProducts.value = products
  showProductSelector.value = false
}

const onProductModalCancel = () => {
  showProductSelector.value = false
}

const removeProduct = (productId: string) => {
  selectedProducts.value = selectedProducts.value.filter(p => p.id !== productId)
}

// 获取模板列表
const fetchTemplates = async () => {
  try {
    loadingTemplates.value = true
    // 这里调用后端API获取模板列表
    // 模拟API调用
    const response = await new Promise<{data: Template[]}>((resolve) => {
      setTimeout(() => {
        resolve({
          data: [
            { id: '1', name: 'XXX商品刊登模板20250721', platformId: 'amazon', storeId: '0004' },
            { id: '2', name: 'YYY商品刊登模板20250722', platformId: 'ebay', storeId: '0005' },
            { id: '3', name: 'ZZZ商品刊登模板20250723', platformId: 'shopify', storeId: '0004' }
          ]
        })
      }, 1000)
    })
    
    templateOptions.value = response.data.map(template => ({
      label: template.name,
      value: template.id
    }))
  } catch (error) {
    console.error('获取模板列表失败:', error)
  } finally {
    loadingTemplates.value = false
  }
}

// 显示上传模板弹窗
const showUploadModal = () => {
  showUploadTemplateModal.value = true
}

// 处理模板上传完成
const onTemplateUploaded = (template: Template) => {
  // 重新获取模板列表
  fetchTemplates()
  showUploadTemplateModal.value = false
}

// 组件挂载时获取模板列表
onMounted(() => {
  fetchTemplates()
})

// 监听弹窗关闭，重置数据
watch(() => props.open, (newVal) => {
  if (!newVal) {
    // 弹窗关闭时重置数据
    selectedTemplate.value = null
    selectedProducts.value = []
    templateSearchParams.value = {
      platform: undefined,
      store: undefined,
      templateName: undefined,
      templateId: undefined
    }
  }
})
</script>