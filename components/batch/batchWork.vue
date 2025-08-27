<template>
  <div>
    <a-modal
      v-model:open="modalVisible"
      title="新建刊登任务"
      width="1000px"
      centered
    >
      <div class="space-y-6">
        <!-- 选择刊登模板部分 -->
        <div class="mt-5">
          <PageSearch
            v-model="templateSearchParams"
            :fields="templateSearchFields"
            @search="onTemplateSearch"
            @reset="onTemplateReset"
          >
          </PageSearch>
        </div>

        <!-- 选择商品部分 -->
        <div>
          <div class="p-4 border rounded-lg product-selector">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm selected-count">已选择商品: {{ selectedProducts.length }} 个</span>
              <a-button type="primary" @click="showProductSelector = true">
                选择商品
              </a-button>
            </div>
            <div v-if="selectedProducts.length > 0" class="space-y-2">
              <div 
                v-for="product in selectedProducts" 
                :key="product.podProductId"
                class="flex items-center justify-between p-2 rounded product-item"
              >
                <div class="flex items-center space-x-2">
                  <commonImage 
                    :src="product.imageUrl" 
                    :alt="product.title"
                    class="w-10 h-10 object-cover rounded"
                  />
                  <div>
                    <div class="product-title">{{ product.title }}</div>
                    <div class="selected-count">价格:{{ product.price }}</div>
                    <div class="selected-count">工艺:{{ product.craftsmanshipList.join(',') }}</div>
                  </div>
                </div>
                <a-button type="text" size="small" @click="removeProduct(product.podProductId)">
                  移除
                </a-button>
              </div>
            </div>
            <div v-else class="text-center py-4 empty-state">
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
            提交任务 
            <span v-show="selectedProducts.length>0">({{ selectedProducts.length }}个商品)</span>
          </a-button>
        </div>
      </template>
    </a-modal>

    <!-- 模板选择弹窗 -->
    <batchModal 
      v-model:open="showTemplateModal" 
      :platform-options="props.platformOptions"
      :platform-loading="props.platformLoading"
      @template-selected="onTemplateSelected" 
    />
        
    <!-- 商品选择弹窗 -->
    <ProductSelectorModal
      v-model:open="showProductSelector"
      :initial-selected-products="selectedProducts"
      @confirm="onProductsSelected"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, h } from 'vue'
import PageSearch from '~/components/common/pageSearch.vue'
import batchModal from '~/components/batch/batchModal.vue'
import ProductSelectorModal from '~/components/ProductSelectorModal.vue'
import commonImage from '../common/commonImage.vue'
import { createTask, getStorePageList, getTemplatesByPlatformAndStore } from '~/apis/business/publish'

// 定义接口
interface Template {
  id: string
  name: string
  platformId: string
  storeId: string
}

interface Product {
  podProductId: string  // 产品ID
  price: string
  title: string
  imageUrl: string
  craftsmanshipList: any[]
  skuId?: string       // SKU ID，可选
}

// Props 和 Emits
interface Props {
  open: boolean
  platformOptions?: Array<{label: string, value: string, id?: string}>
  platformLoading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  platformOptions: () => [],
  platformLoading: false
})

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
const selectedTemplate = ref<Template | null>(null)
const selectedProducts = ref<Product[]>([])

// 级联选择器数据
const cascaderOptions = ref<any[]>([])
const loadingStates = ref({
  platforms: false,
  stores: false,
  templates: false
})

// 模板搜索相关
const templateSearchParams = ref({
  platform: undefined,
  store: undefined,
  templateName: undefined,
  templateId: undefined
})



// 级联选择器自定义下拉渲染函数
const cascaderDropdownRender = ({ menuNode, onMenuClick, popupVisible }: any) => {
  // 检查是否在最后一级（模板级）
  const menuElement = menuNode?.children?.[0]
  const isTemplateLevel = menuElement?.props?.class?.includes('ant-cascader-menu') && 
                          menuElement?.children?.some((item: any) => 
                            item?.props?.class?.includes('ant-cascader-menu-item') &&
                            item?.children?.some((child: any) => child?.props?.isLeaf === true)
                          )
  
  const elements = [menuNode]
  
  // 只在模板级别显示上传新模板选项
  if (isTemplateLevel || true) { // 临时设置为true，始终显示
    elements.push(
      h('div', {
        class: 'upload-template-separator',
        style: {
          borderTop: '1px solid var(--border-color)',
          margin: '4px 0'
        }
      }),
      h('div', {
        class: 'ant-cascader-menu-item upload-template-item',
        style: {
          padding: '8px 12px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: 'var(--bg-secondary)',
          color: 'var(--text-primary)',
          transition: 'background-color 0.3s ease',
          borderRadius: '4px',
          margin: '4px 8px'
        },
        onClick: (e: Event) => {
          e.stopPropagation()
          console.log('点击上传新模板')
          showTemplateModal.value = true
        },
        onMouseenter: (e: Event) => {
          const target = e.target as HTMLElement
          target.style.backgroundColor = 'var(--bg-tertiary)'
        },
        onMouseleave: (e: Event) => {
          const target = e.target as HTMLElement
          target.style.backgroundColor = 'var(--bg-secondary)'
        }
      }, [
        h('span', {
          style: {
            fontSize: '16px',
            color: 'var(--accent-color)',
            fontWeight: 'bold'
          }
        }, '+'),
        h('span', {
          style: {
            fontSize: '14px'
          }
        }, '上传新模板')
      ])
    )
  }
  
  return h('div', {}, elements)
}

const templateSearchFields = computed(() => [
  {
    key: 'platform',
    component: 'a-cascader',
    props: {
      placeholder: '请选择平台/店铺/模版',
      options: cascaderOptions.value,
      loadData: loadCascaderData,
      changeOnSelect: true,
      allowClear: true,
      style: { width: '300px' },
      fieldNames: {
        label: 'name',
        value: 'id',
        children: 'children'
      },
      dropdownRender: cascaderDropdownRender
    }
  }
])

// 事件处理函数
const handleCancel = () => {
  modalVisible.value = false
  emit('close')
}

const handleSubmit = async() => {
  if (selectedTemplate.value && selectedProducts.value.length > 0) {
    try {      
      // 构建请求参数，按照API要求的格式
      const requestParams = {
        platform: selectedTemplate.value.platformId, // 使用模板的platformId
        templateId: parseInt(selectedTemplate.value.id),
        storeId: selectedTemplate.value.storeId,
        itemList: selectedProducts.value.map(product => ({
          productId: product.podProductId,
          imageUrl: product.imageUrl
        }))
      }
      
      console.log('创建任务请求参数:', requestParams)
      
      const res = await createTask(requestParams)
      
      console.log('任务创建成功:', res)
      
      // 发出成功事件（在重置数据之前）
      emit('submit', { template: selectedTemplate.value, products: selectedProducts.value })
      
      // 重置数据
      selectedTemplate.value = null
      selectedProducts.value = []
      templateSearchParams.value = {
        platform: undefined,
        store: undefined,
        templateName: undefined,
        templateId: undefined
      }
      modalVisible.value = false
      
    } catch(error) {
      console.error('创建任务失败:', error)
      // 这里可以添加错误提示
    }
  }
}

const onTemplateSearch = (params: any) => {
  console.log('搜索模板:', params)
  
  // 如果选择了模板ID，自动设置选中的模板
  if (params.templateId) {
    // 根据选中的模板ID构建模板信息
    const templateData: Template = {
      id: params.templateId,
      name: `模板${params.templateId}`,
      platformId: params.platform || 'amazon',
      storeId: params.store || '0004'
    }
    selectedTemplate.value = templateData
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

const onTemplateSelected = (template: Template | null) => {
  selectedTemplate.value = template
  showTemplateModal.value = false
}


const onProductsSelected = (products: Product[]) => {
  selectedProducts.value = products
  showProductSelector.value = false
}



const removeProduct = (productId: string) => {
  selectedProducts.value = selectedProducts.value.filter(p => p.podProductId !== productId)
}

// 获取启用的平台列表 - 使用传入的平台数据
const initializePlatformData = () => {
  try {
    if (props.platformOptions && props.platformOptions.length > 0) {
      // 使用传入的平台数据构建级联选择器的第一级数据（平台）
      cascaderOptions.value = props.platformOptions
        .filter(platform => platform.value !== '') // 过滤掉“全部”选项
        .map((platform: any) => ({
          id: platform.id || platform.value, // 优先使用id，如果没有则使用value
          name: platform.label,
          isLeaf: false, // 表示还有子级数据
          loading: false
        }))
    } else {
      // 提供默认数据作为后备方案
      cascaderOptions.value = [{
        id: 'amazon',
        name: 'Amazon',
        isLeaf: false,
        loading: false
      }]
    }
  } catch (error) {
    console.error('初始化平台数据失败:', error)
    // 错误处理，提供默认数据
    cascaderOptions.value = [{
      id: 'amazon',
      name: 'Amazon',
      isLeaf: false,
      loading: false
    }]
  }
}

// 获取店铺列表
const fetchStoreList = async (platformId: string): Promise<any[]> => {
  try {
    loadingStates.value.stores = true
    const requestParams = {
      page: 1,
      limit:100,
      platform: platformId
    }
    const response = await getStorePageList(requestParams)
    
    if (response.success && response.data) {
      const defaultStore = [{
        id: null,
        name: '通用模版',
        isLeaf: false, // 还有模板子级
        loading: false
      }]
      // 构建店铺数据
      const storeList = response.data.records.map((store: any) => ({
        id: store.id || store.storeId,
        name: store.name || store.storeName,
        isLeaf: false, // 还有模板子级
        loading: false
      }))
      
      // 合并defaultStore和店铺列表
      return [...defaultStore, ...storeList]
    } else {
      // 默认店铺数据
      return [{
        id: '0004',
        name: '默认店铺',
        isLeaf: false,
        loading: false
      }]
    }
  } catch (error) {
    console.error('获取店铺列表失败:', error)
    // 错误处理，返回默认店铺
    return [{
      id: '0004',
      name: '默认店铺',
      isLeaf: false,
      loading: false
    }]
  } finally {
    loadingStates.value.stores = false
  }
}

// 获取模板列表
const fetchTemplateList = async (platformId: string, storeId: string): Promise<any[]> => {
  try {
    loadingStates.value.templates = true
    console.log('开始获取模板列表...', { platformId, storeId })
    const response = await getTemplatesByPlatformAndStore({ platformId, storeId })
    console.log('模板列表获取成功:', response)
    
    if (response.success && response.data) {
      // 构建模板数据
      return response.data.map((template: any) => ({
        id: template.id || template.templateId,
        name: template.name || template.templateName,
        isLeaf: true, // 模板是最后一级
        loading: false
      }))
    } else {
      // 默认模板数据
      return [{
        id: '1',
        name: '默认模板',
        isLeaf: true,
        loading: false
      }]
    }
  } catch (error) {
    console.error('获取模板列表失败:', error)
    // 错误处理，返回默认模板
    return [{
      id: '1',
      name: '默认模板',
      isLeaf: true,
      loading: false
    }]
  } finally {
    loadingStates.value.templates = false
  }
}

// 级联选择器动态加载函数
const loadCascaderData = async (selectedOptions: any[]) => {
  const targetOption = selectedOptions[selectedOptions.length - 1]
  if (!targetOption) return
  
  targetOption.loading = true
  
  try {
    if (selectedOptions.length === 1) {
      // 加载第二级（店铺）
      const platformId = targetOption.id
      const stores = await fetchStoreList(platformId)
      targetOption.children = stores
    } else if (selectedOptions.length === 2) {
      // 加载第三级（模板）
      const platformId = selectedOptions[0].id
      const storeId = targetOption.id
      const templates = await fetchTemplateList(platformId, storeId)
      targetOption.children = templates
    }
  } catch (error) {
    console.error('加载级联数据失败:', error)
    // 错误处理，提供默认数据
    if (selectedOptions.length === 1) {
      targetOption.children = [{
        id: '0004',
        name: '默认店铺',
        isLeaf: false,
        loading: false
      }]
    } else if (selectedOptions.length === 2) {
      targetOption.children = [{
        id: '1',
        name: '默认模板',
        isLeaf: true,
        loading: false
      }]
    }
  } finally {
    targetOption.loading = false
    // 触发响应式更新
    cascaderOptions.value = [...cascaderOptions.value]
  }
}




// 组件挂载时初始化平台数据
onMounted(() => {
  initializePlatformData()
})

// 监听平台数据变化
watch(() => props.platformOptions, () => {
  initializePlatformData()
}, { deep: true })

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

<style scoped>
/* 商品选择器容器 */
.product-selector {
  background-color: var(--bg-secondary);
  border-color: var(--border-color);
}

/* 选中商品项 */
.product-item {
  background-color: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
}

.product-item:hover {
  background-color: var(--bg-primary);
  border-color: var(--accent-color);
}

/* 商品标题 */
.product-title {
  color: var(--text-primary);
  font-weight: 500;
}

/* 选中数量 */
.selected-count {
  color: var(--text-secondary);
}

/* 空状态 */
.empty-state {
  color: var(--text-tertiary);
}

/* 标题样式 */
h3 {
  color: var(--text-primary);
}

/* 按钮组样式 */
.flex.justify-end.space-x-2 {
  gap: 8px;
}

/* 模态框适配 */
:deep(.ant-modal-header) {
  background-color: var(--bg-secondary);
  border-bottom-color: var(--border-color);
}

:deep(.ant-modal-title) {
  color: var(--text-primary);
}

:deep(.ant-modal-body) {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
}

:deep(.ant-modal-footer) {
  background-color: var(--bg-secondary);
  border-top-color: var(--border-color);
}

/* 输入框和选择框适配 */
:deep(.ant-input) {
  background-color: var(--bg-tertiary);
  border-color: var(--border-color);
  color: var(--text-primary);
}

:deep(.ant-input:focus) {
  border-color: var(--accent-color);
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
}

:deep(.ant-select-selector) {
  background-color: var(--bg-tertiary) !important;
  border-color: var(--border-color) !important;
  color: var(--text-primary) !important;
}

:deep(.ant-select-focused .ant-select-selector) {
  border-color: var(--accent-color) !important;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2) !important;
}

/* 按钮适配 */
:deep(.ant-btn) {
  border-color: var(--border-color);
}

:deep(.ant-btn-primary) {
  background-color: var(--accent-color);
  border-color: var(--accent-color);
}

:deep(.ant-btn-primary:hover) {
  background-color: var(--accent-color);
  border-color: var(--accent-color);
  opacity: 0.8;
}

:deep(.ant-btn-text) {
  color: var(--text-secondary);
}

:deep(.ant-btn-text:hover) {
  color: var(--accent-color);
  background-color: var(--bg-tertiary);
}

/* 上传新模板样式 */
:deep(.upload-template-item) {
  background-color: var(--bg-secondary) !important;
  color: var(--text-primary) !important;
  border-radius: 4px !important;
}

:deep(.upload-template-item:hover) {
  background-color: var(--bg-tertiary) !important;
}

:deep(.upload-template-separator) {
  border-color: var(--border-color) !important;
}

/* 级联选择器下拉框适配 */
:deep(.ant-cascader-dropdown) {
  background-color: var(--bg-secondary);
}

:deep(.ant-cascader-menu) {
  background-color: var(--bg-secondary);
}

:deep(.ant-cascader-menu-item) {
  color: var(--text-primary);
}

:deep(.ant-cascader-menu-item:hover) {
  background-color: var(--bg-tertiary);
}

:deep(.ant-cascader-menu-item-active) {
  background-color: var(--bg-primary) !important;
  color: var(--accent-color) !important;
}
</style>