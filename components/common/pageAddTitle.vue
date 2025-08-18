<template>
    <a-modal
        v-model:open="internalVisible"
        title="新建生成任务"
        centered
        ok-text="确认" 
        cancel-text="取消" 
        >
        <div class="title-generator-form">
          <!-- 生成规则设置 -->
          <div class="form-section">
            <div class="section-header">
              <h3 class="section-title">生成规则设置</h3>
              <a-button type="link" class="preset-btn">使用预设</a-button>
            </div>
            <a-textarea
              v-model:value="formData.generatorRule"
              placeholder="请描述你要AI生成标题的要求"
              :rows="6"
              class="rule-textarea"
            />
            <div class="tip-text">
              <a-typography-text type="secondary">
                <ExclamationCircleOutlined /> 一次最多支持1000款产品
              </a-typography-text>
            </div>
          </div>

          <!-- 选择商品 -->
          <div class="form-section">
            <h3 class="section-title">选择商品</h3>
            <div class="product-selector">
              <div class="product-area" :class="{ 'has-products': selectedProducts.length > 0 }">
                <div v-if="selectedProducts.length === 0" class="empty-state">
                  <div class="select-btn-wrapper">
                    <a-button type="primary" @click="handleSelectProducts" class="select-product-btn">
                      选择商品
                    </a-button>
                    <div class="progress-wrapper">
                      <a-progress :percent="0" :show-info="false" stroke-color="#ff6b35" />
                    </div>
                  </div>
                  <p class="select-tip">点击选择商品</p>
                </div>
                <div v-else class="selected-products">
                  <div class="products-header">
                    <span>已选择 {{ selectedProducts.length }} 款商品</span>
                    <a-button type="link" @click="handleSelectProducts">重新选择</a-button>
                  </div>
                  <div class="products-list">
                    <div v-for="product in selectedProducts" :key="product.whiteProductId" class="product-item">
                      <img :src="product.imageUrl" :alt="product.title" class="product-image" />
                      <div class="product-info">
                        <div class="product-name">{{ product.title }}</div>
                        <div class="product-category">{{ product.price }}</div>
                      </div>
                      <a-button type="text" @click="removeProduct(product.whiteProductId)" class="remove-btn">
                        <CloseOutlined />
                      </a-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      <!-- 底部按钮 -->
      <template #footer>
        <div class="modal-footer">
          <a-button @click="handleCancel">取消</a-button>
          <a-button type="primary" @click="handleOk" :loading="loading">
            提交任务
          </a-button>
        </div>
      </template>
    </a-modal>
    
    <!-- 商品选择弹框 -->
    <ProductSelectorModal
      v-model:open="showProductSelector"
      :initial-selected-products="selectedProducts"
      @confirm="handleProductSelectorConfirm"
    />
</template>
<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { message } from 'ant-design-vue'
import { ExclamationCircleOutlined, CloseOutlined } from '@ant-design/icons-vue'
import { createTitleGeneratorTask } from '~/apis/business/title-generation'
import ProductSelectorModal from '~/components/ProductSelectorModal.vue'

interface Props {
  open: boolean
  imageTitle?: string
}

interface Product {
  whiteProductId: string
  title: string
  categoryName: string
  imageUrl: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:open': [value: boolean]
  success: []
}>()

const internalVisible = ref(props.open)
const loading = ref(false)
const showProductSelector = ref(false)

// 表单数据
const formData = reactive({
  generatorRule: ''
})

// 选中的商品
const selectedProducts = ref<Product[]>([])

watch(
  () => props.open,
  (newVal) => {
    internalVisible.value = newVal
    if (newVal) {
      // 重置表单
      formData.generatorRule = ''
      selectedProducts.value = []
    }
  },
  { immediate: true }
)

watch(
  internalVisible,
  (newVal) => {
    emit('update:open', newVal)
  }
)

// 选择商品
const handleSelectProducts = () => {
  showProductSelector.value = true
}

const handleProductSelectorConfirm = (products: any[]) => {
  selectedProducts.value = products
  message.success(`已选择 ${products.length} 款商品`)
}

// 移除商品
const removeProduct = (productId: string) => {
  selectedProducts.value = selectedProducts.value.filter(p => p.whiteProductId !== productId)
}

// 表单验证
const validateForm = () => {
  if (!formData.generatorRule.trim()) {
    message.error('请输入生成规则')
    return false
  }
  if (selectedProducts.value.length === 0) {
    message.error('请选择商品')
    return false
  }
  return true
}

// 提交表单
const handleOk = async () => {
  if (!validateForm()) {
    return
  }

  try {
    loading.value = true
    
    // 调用创建标题生成任务的接口
    await createTitleGeneratorTask({
      generatorRule: formData.generatorRule,
      podProductIdList: selectedProducts.value.map(p => p.whiteProductId)
    })
    
    message.success('任务创建成功')
    
    // 关闭弹窗
    internalVisible.value = false
    
    // 触发成功事件
    emit('success')
  } catch (error) {
    message.error('创建任务失败，请重试')
  } finally {
    loading.value = false
  }
}

// 取消
const handleCancel = () => {
  internalVisible.value = false
}
</script>

<style scoped>
.title-generator-form {
  padding: 0;
}

.form-section {
  margin-bottom: 24px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.section-title {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  color: #262626;
}

.preset-btn {
  padding: 0;
  color: #ff6b35;
  font-size: 14px;
}

.preset-btn:hover {
  color: #ff8c69;
}

.rule-textarea {
  margin-bottom: 8px;
  border-radius: 6px;
}

.tip-text {
  display: flex;
  align-items: center;
  gap: 4px;
}

.product-selector {
  margin-top: 12px;
}

.product-area {
  min-height: 200px;
  border: 2px dashed #d9d9d9;
  border-radius: 6px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fafafa;
  transition: all 0.3s ease;
}

.product-area.has-products {
  background-color: #fff;
  border-style: solid;
  border-color: #d9d9d9;
  align-items: stretch;
  justify-content: flex-start;
  padding: 16px;
}

.empty-state {
  text-align: center;
  width: 100%;
}

.select-btn-wrapper {
  margin-bottom: 16px;
}

.select-product-btn {
  margin-bottom: 12px;
  height: 40px;
  padding: 0 24px;
  border-radius: 6px;
}

.progress-wrapper {
  width: 200px;
  margin: 0 auto;
}

.select-tip {
  margin: 0;
  color: #8c8c8c;
  font-size: 14px;
}

.selected-products {
  width: 100%;
}

.products-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f0f0f0;
}

.products-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.product-item {
  display: flex;
  align-items: center;
  padding: 12px;
  border: 1px solid #f0f0f0;
  border-radius: 6px;
  background-color: #fafafa;
}

.product-image {
  width: 60px;
  height: 60px;
  border-radius: 4px;
  object-fit: cover;
  margin-right: 12px;
}

.product-info {
  flex: 1;
}

.product-name {
  font-size: 14px;
  color: #262626;
  margin-bottom: 4px;
  font-weight: 500;
}

.product-category {
  font-size: 12px;
  color: #8c8c8c;
  font-weight: 400;
}

.remove-btn {
  color: #8c8c8c;
  padding: 4px;
}

.remove-btn:hover {
  color: #ff4d4f;
  background-color: #fff2f0;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 0 0;
  border-top: 1px solid #f0f0f0;
}

.modal-footer .ant-btn {
  height: 40px;
  padding: 0 24px;
  border-radius: 6px;
}

.modal-footer .ant-btn-primary {
  background-color: #ff6b35;
  border-color: #ff6b35;
}

.modal-footer .ant-btn-primary:hover {
  background-color: #ff8c69;
  border-color: #ff8c69;
}
</style>

