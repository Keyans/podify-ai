<template>
  <el-dialog
    v-model="dialogVisible"
    title="编辑商品"
    width="1000px"
    align-center
    @close="resetForm"
    class="edit-product-dialog"
  >
    <div v-if="product" class="space-y-6">
      <!-- 基本信息 -->
      <div class="bg-gray-50 dark:bg-dark-card rounded-lg p-6">
        <h3 class="text-lg font-medium text-gray-900 dark:text-dark-text mb-4">基本信息</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- 商品标题 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">商品标题</label>
            <el-input
              v-model="form.name"
              placeholder="请输入商品标题"
              maxlength="100"
              show-word-limit
            />
          </div>

          <!-- 商品价格 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">商品价格</label>
            <el-input-number
              v-model="form.price"
              :min="0"
              :precision="2"
              :step="0.1"
              style="width: 100%"
            />
          </div>
        </div>
      </div>

      <!-- 商品图片 -->
      <div class="bg-gray-50 dark:bg-dark-card rounded-lg p-6">
        <h3 class="text-lg font-medium text-gray-900 dark:text-dark-text mb-4">商品图片</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- 封面图 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">封面图</label>
            <div
              class="border-2 border-dashed border-gray-300 dark:border-dark-border rounded-lg p-4 text-center cursor-pointer hover:border-amber-500 dark:hover:border-amber-500 transition-colors"
              @click="openImageSelector('cover')"
            >
              <div v-if="form.coverImage" class="relative">
                <img
                  :src="form.coverImage"
                  alt="封面图"
                  class="w-full h-40 object-cover rounded-lg"
                />
                <button
                  @click.stop="removeImage('cover')"
                  class="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              <div v-else class="h-40 flex flex-col items-center justify-center">
                <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <p class="mt-2 text-sm text-gray-500 dark:text-dark-text-secondary">点击更换封面图</p>
              </div>
            </div>
          </div>

          <!-- 附图 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">附图（多张）</label>
            <div
              class="border-2 border-dashed border-gray-300 dark:border-dark-border rounded-lg p-4 text-center cursor-pointer hover:border-amber-500 dark:hover:border-amber-500 transition-colors"
              @click="openImageSelector('additional')"
            >
              <div v-if="form.additionalImages.length > 0" class="relative">
                <div class="grid grid-cols-2 gap-2 h-40">
                  <div v-for="(image, index) in form.additionalImages.slice(0, 4)" :key="index" class="relative">
                    <img
                      :src="image"
                      :alt="`附图${index + 1}`"
                      class="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      @click.stop="removeAdditionalImage(index)"
                      class="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <div v-if="form.additionalImages.length > 4" class="absolute bottom-2 right-2 bg-gray-800 bg-opacity-70 text-white text-xs px-2 py-1 rounded-full">
                  +{{ form.additionalImages.length - 4 }}
                </div>
              </div>
              <div v-else class="h-40 flex flex-col items-center justify-center">
                <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <p class="mt-2 text-sm text-gray-500 dark:text-dark-text-secondary">点击添加附图</p>
              </div>
            </div>
          </div>

          <!-- SKU图 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">SKU图</label>
            <div
              class="border-2 border-dashed border-gray-300 dark:border-dark-border rounded-lg p-4 text-center cursor-pointer hover:border-amber-500 dark:hover:border-amber-500 transition-colors"
              @click="openImageSelector('sku')"
            >
              <div v-if="form.skuImages.length > 0" class="relative">
                <div class="grid grid-cols-2 gap-2 h-40">
                  <div v-for="(image, index) in form.skuImages.slice(0, 4)" :key="index" class="relative">
                    <img
                      :src="image"
                      :alt="`SKU图${index + 1}`"
                      class="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      @click.stop="removeSkuImage(index)"
                      class="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <div v-if="form.skuImages.length > 4" class="absolute bottom-2 right-2 bg-gray-800 bg-opacity-70 text-white text-xs px-2 py-1 rounded-full">
                  +{{ form.skuImages.length - 4 }}
                </div>
              </div>
              <div v-else class="h-40 flex flex-col items-center justify-center">
                <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <p class="mt-2 text-sm text-gray-500 dark:text-dark-text-secondary">点击添加SKU图</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- SKU信息 -->
      <div class="bg-gray-50 dark:bg-dark-card rounded-lg p-6">
        <h3 class="text-lg font-medium text-gray-900 dark:text-dark-text mb-4">SKU信息</h3>
        <div class="border border-gray-200 dark:border-dark-border rounded-lg overflow-hidden">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-dark-border">
            <thead class="bg-gray-100 dark:bg-dark-border">
              <tr>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-text-secondary uppercase tracking-wider">
                  SKU ID
                </th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-text-secondary uppercase tracking-wider">
                  属性
                </th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-text-secondary uppercase tracking-wider">
                  价格
                </th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-text-secondary uppercase tracking-wider">
                  库存
                </th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-text-secondary uppercase tracking-wider">
                  SKU图
                </th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-dark-surface divide-y divide-gray-200 dark:divide-dark-border">
              <tr v-for="(sku, index) in form.skus" :key="index">
                <td class="px-4 py-3 text-sm text-gray-900 dark:text-dark-text">
                  {{ sku.id }}
                </td>
                <td class="px-4 py-3 text-sm">
                  <div class="flex flex-wrap gap-1">
                    <el-tag
                      v-for="(value, key) in sku.attributes"
                      :key="key"
                      size="small"
                    >
                      {{ key }}: {{ value }}
                    </el-tag>
                  </div>
                </td>
                <td class="px-4 py-3 text-sm">
                  <el-input-number
                    v-model="sku.price"
                    :min="0"
                    :precision="2"
                    :step="0.1"
                    size="small"
                    style="width: 120px"
                  />
                </td>
                <td class="px-4 py-3 text-sm">
                  <el-input-number
                    v-model="sku.stock"
                    :min="0"
                    :precision="0"
                    :step="1"
                    size="small"
                    style="width: 120px"
                  />
                </td>
                <td class="px-4 py-3 text-sm">
                  <el-select
                    v-model="sku.image"
                    placeholder="选择SKU图"
                    size="small"
                    style="width: 120px"
                  >
                    <el-option
                      v-for="(image, imgIndex) in form.skuImages"
                      :key="imgIndex"
                      :label="`图片${imgIndex + 1}`"
                      :value="image"
                    >
                      <div class="flex items-center">
                        <img :src="image" class="w-8 h-8 object-cover rounded mr-2" />
                        <span>图片{{ imgIndex + 1 }}</span>
                      </div>
                    </el-option>
                  </el-select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="flex justify-end space-x-3">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm" :loading="submitting">保存修改</el-button>
      </div>
    </template>
  </el-dialog>

  <!-- 图片选择器对话框 -->
  <ImageSelectorDialog
    v-model="showImageSelector"
    :title="imageSelectorTitle"
    :multiple="currentImageType !== 'cover'"
    @select="handleImageSelected"
  />
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { ElMessage } from 'element-plus';
import ImageSelectorDialog from './ImageSelectorDialog.vue';

// Props
const props = defineProps<{
  modelValue: boolean;
  product: any;
}>();

// Emits
const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  'success': [];
}>();

// 响应式数据
const dialogVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const submitting = ref(false);
const showImageSelector = ref(false);
const currentImageType = ref<'cover' | 'additional' | 'sku'>('cover');

const imageSelectorTitle = computed(() => {
  const titles = {
    cover: '选择封面图',
    additional: '选择附图',
    sku: '选择SKU图'
  };
  return titles[currentImageType.value];
});

const form = ref({
  name: '',
  price: 0,
  coverImage: '',
  additionalImages: [] as string[],
  skuImages: [] as string[],
  skus: [] as any[]
});

// 监听product变化，初始化表单
watch(() => props.product, (newProduct) => {
  if (newProduct) {
    form.value = {
      name: newProduct.name,
      price: newProduct.minPrice,
      coverImage: newProduct.coverImage,
      additionalImages: [...newProduct.additionalImages],
      skuImages: [],
      skus: [...newProduct.skus]
    };
  }
}, { immediate: true });

// 方法
const openImageSelector = (type: 'cover' | 'additional' | 'sku') => {
  currentImageType.value = type;
  showImageSelector.value = true;
};

const handleImageSelected = (images: string[]) => {
  if (currentImageType.value === 'cover') {
    form.value.coverImage = images[0];
  } else if (currentImageType.value === 'additional') {
    form.value.additionalImages = [...form.value.additionalImages, ...images];
  } else if (currentImageType.value === 'sku') {
    form.value.skuImages = [...form.value.skuImages, ...images];
  }
};

const removeImage = (type: 'cover') => {
  if (type === 'cover') {
    form.value.coverImage = '';
  }
};

const removeAdditionalImage = (index: number) => {
  form.value.additionalImages.splice(index, 1);
};

const removeSkuImage = (index: number) => {
  form.value.skuImages.splice(index, 1);
};

const submitForm = () => {
  submitting.value = true;
  
  // 模拟提交
  setTimeout(() => {
    submitting.value = false;
    ElMessage.success('商品修改成功！');
    emit('success');
    emit('update:modelValue', false);
  }, 1000);
};

const resetForm = () => {
  // 重置表单逻辑
};
</script>

<style scoped>
.edit-product-dialog :deep(.el-dialog__body) {
  padding: 20px;
}
</style>
