<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
    <div class="bg-dark-card rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto text-dark-text">
      <!-- Header -->
      <div class="p-5 border-b border-dark-border flex justify-between items-center">
        <h3 class="font-medium text-dark-text">新建标题生成任务</h3>
        <button @click="close" class="text-gray-400 hover:text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div class="p-6">
        <!-- 生成规律设置 -->
        <div class="mb-6">
          <div class="flex items-center justify-between mb-3">
            <label class="text-sm font-medium text-dark-text">生成规律设置</label>
            <button 
              @click="showPresetModal = true"
              class="text-sm text-blue-500 hover:text-blue-400"
            >
              使用预设
            </button>
          </div>
          <textarea 
            v-model="formData.prompt"
            placeholder="请描述您希望AI生成标题的要求"
            class="w-full h-32 px-3 py-2 bg-dark-input border border-dark-border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-dark-text resize-none"
          />
          <div class="flex items-center mt-2 text-sm text-blue-500">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            一次最多支持 1000 张图片
          </div>
        </div>

        <!-- 选择商品 -->
        <div class="mb-6">
          <label class="text-sm font-medium text-dark-text mb-3 block">选择商品</label>
          
          <!-- 选择商品按钮 -->
          <div 
            @click="openProductSelector"
            class="border-2 border-dashed border-dark-border rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-500/5 transition-colors"
          >
            <svg class="w-12 h-12 mx-auto mb-4 text-dark-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
            </svg>
            <div class="text-lg font-medium text-dark-text mb-2">选择商品</div>
            <div class="text-sm text-dark-text-secondary">
              点击后弹窗
            </div>
          </div>

          <!-- 已选择的商品展示 -->
          <div v-if="selectedProducts.length > 0" class="mt-4">
            <div class="grid grid-cols-4 gap-4 mb-4">
              <div v-for="product in selectedProducts" :key="product.id" class="relative group">
                <img 
                  :src="product.image" 
                  :alt="product.name"
                  class="w-full h-24 object-cover rounded-lg border border-blue-500"
                />
                <div class="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div class="text-white text-xs text-center px-2">
                    <div class="font-medium truncate">{{ product.name }}</div>
                    <div class="text-gray-300">{{ product.category }}</div>
                  </div>
                </div>
                <!-- 删除按钮 -->
                <button 
                  @click="removeProduct(product.id)"
                  class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            </div>
            
            <div class="flex items-center text-sm text-dark-text-secondary">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              已选择 {{ selectedProducts.length }} 个商品
            </div>
          </div>
        </div>
      </div>
      
      <div class="p-5 border-t border-dark-border flex justify-end space-x-3">
        <button @click="close" class="px-4 py-2 border border-dark-border rounded-md text-dark-text-secondary hover:bg-dark-hover">取消</button>
        <button 
          @click="submit" 
          :disabled="submitting || !canSubmit"
          class="px-4 py-2 bg-cyan-400 text-white rounded-md hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          <div v-if="submitting" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
          {{ submitting ? '提交中...' : `提交任务` }}
        </button>
      </div>
    </div>
  </div>

  <!-- 商品选择弹窗 -->
  <ProductSelectorModal
    :isOpen="showProductSelector"
    @close="showProductSelector = false"
    @confirm="handleProductSelection"
  />

  <!-- 预设弹窗 -->
  <div v-if="showPresetModal" class="fixed inset-0 bg-black bg-opacity-50 z-60 flex items-center justify-center">
    <div class="bg-dark-card rounded-lg w-full max-w-md text-dark-text">
      <div class="p-4 border-b border-dark-border">
        <h4 class="font-medium">选择预设</h4>
      </div>
      <div class="p-4">
        <div class="space-y-2">
          <button 
            v-for="preset in presets" 
            :key="preset.id"
            @click="selectPreset(preset)"
            class="w-full text-left p-3 rounded-md hover:bg-dark-hover border border-dark-border"
          >
            <div class="font-medium text-sm">{{ preset.name }}</div>
            <div class="text-xs text-dark-text-secondary mt-1">{{ preset.description }}</div>
          </button>
        </div>
      </div>
      <div class="p-4 border-t border-dark-border flex justify-end space-x-3">
        <button @click="showPresetModal = false" class="px-4 py-2 border border-dark-border rounded-md text-dark-text-secondary hover:bg-dark-hover">取消</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, defineProps, defineEmits, watch, computed } from 'vue'
import ProductSelectorModal from '~/components/ProductSelectorModal.vue'
import { createTitleGenerationTask } from '~/apis/business/title-generation'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['close', 'submit'])

// 表单数据
const formData = reactive({
  prompt: '',
})

// 提交状态
const submitting = ref(false)

// 商品选择相关
const showProductSelector = ref(false)
const selectedProducts = ref([])

// 预设相关
const showPresetModal = ref(false)
const presets = ref([
  {
    id: 1,
    name: '电商标题优化',
    description: '生成适合电商平台的商品标题，包含关键词和卖点',
    prompt: '请为这些商品生成适合电商平台的标题，要求：1. 包含核心关键词 2. 突出产品卖点 3. 字数控制在30-50字 4. 吸引用户点击'
  },
  {
    id: 2,
    name: 'SEO友好标题',
    description: '生成对搜索引擎友好的标题，提高搜索排名',
    prompt: '请为这些商品生成SEO友好的标题，要求：1. 包含目标关键词 2. 符合搜索引擎优化规则 3. 提高搜索排名 4. 增加曝光度'
  },
  {
    id: 3,
    name: '营销型标题',
    description: '生成具有营销效果的标题，提高转化率',
    prompt: '请为这些商品生成营销型标题，要求：1. 突出优惠信息 2. 创造紧迫感 3. 提高点击率 4. 促进购买转化'
  }
])

// 打开商品选择器
const openProductSelector = () => {
  showProductSelector.value = true
}

// 处理商品选择
const handleProductSelection = (products) => {
  selectedProducts.value = [...products]
  showProductSelector.value = false
}

// 移除商品
const removeProduct = (productId) => {
  const index = selectedProducts.value.findIndex(p => p.id === productId)
  if (index > -1) {
    selectedProducts.value.splice(index, 1)
  }
}

// 选择预设
const selectPreset = (preset) => {
  formData.prompt = preset.prompt
  showPresetModal.value = false
}

// 检查是否可以提交
const canSubmit = computed(() => {
  return formData.prompt.trim() && selectedProducts.value.length > 0
})

// 关闭弹窗
const close = () => {
  emits('close')
}

// 提交表单
const submit = async () => {
  try {
    submitting.value = true
    
    // 调用创建标题生成任务接口
    const taskParams = {
      prompt: formData.prompt,
      products: selectedProducts.value
    }
    
    console.log('创建标题生成任务参数:', taskParams)
    
    const response = await createTitleGenerationTask(taskParams)
    
    if (response.success) {
      console.log('标题生成任务创建成功:', response)
      
      const resultData = {
        taskParams: taskParams,
        taskResponse: response.data,
        success: true
      }
      
      emits('submit', resultData)
    } else {
      console.error('标题生成任务创建失败:', response)
      
      const resultData = {
        taskParams: taskParams,
        taskResponse: null,
        success: false,
        error: response.message || '创建标题生成任务失败'
      }
      
      emits('submit', resultData)
    }
    
  } catch (error) {
    console.error('提交标题生成任务失败:', error)
    
    const resultData = {
      taskParams: {},
      taskResponse: null,
      success: false,
      error: error.message || '提交标题生成任务失败'
    }
    
    emits('submit', resultData)
  } finally {
    submitting.value = false
  }
}

// 重置表单
const resetForm = () => {
  formData.prompt = ''
  selectedProducts.value = []
  showProductSelector.value = false
  showPresetModal.value = false
  submitting.value = false
}

// 监听弹窗关闭，重置表单
watch(() => props.isOpen, (newVal) => {
  if (!newVal) {
    resetForm()
  }
})
</script> 