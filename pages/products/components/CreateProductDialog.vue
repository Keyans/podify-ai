<template>
  <el-dialog
    v-model="dialogVisible"
    title="创建商品"
    width="1000px"
    align-center
    @close="resetForm"
    class="create-product-dialog"
  >
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-position="top"
      class="space-y-6"
    >
      <!-- 基本信息 -->
      <div class="bg-gray-50 dark:bg-dark-card rounded-lg p-6">
        <h3 class="text-lg font-medium text-gray-900 dark:text-dark-text mb-4">基本信息</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- 商品标题 -->
          <el-form-item label="商品标题" prop="name">
            <el-input
              v-model="form.name"
              placeholder="请输入商品标题"
              maxlength="100"
              show-word-limit
            />
          </el-form-item>

          <!-- 商品价格 -->
          <el-form-item label="商品价格" prop="price">
            <el-input-number
              v-model="form.price"
              :min="0"
              :precision="2"
              :step="0.1"
              style="width: 100%"
            />
          </el-form-item>
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
                <div class="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 flex items-center justify-center transition-all rounded-lg">
                  <button
                    @click.stop="removeImage('cover')"
                    class="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full opacity-0 hover:opacity-100 flex items-center justify-center"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div v-else class="h-40 flex flex-col items-center justify-center">
                <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <p class="mt-2 text-sm text-gray-500 dark:text-dark-text-secondary">点击上传封面图</p>
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
                      class="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 hover:opacity-100 flex items-center justify-center"
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
                <p class="mt-2 text-sm text-gray-500 dark:text-dark-text-secondary">点击上传附图</p>
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
                      class="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 hover:opacity-100 flex items-center justify-center"
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
                <p class="mt-2 text-sm text-gray-500 dark:text-dark-text-secondary">点击上传SKU图</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- SKU设置 -->
      <div class="bg-gray-50 dark:bg-dark-card rounded-lg p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900 dark:text-dark-text">SKU设置</h3>
          <el-button type="primary" @click="addSkuAttribute" size="small">添加属性</el-button>
        </div>

        <!-- SKU属性 -->
        <div v-if="form.skuAttributes.length > 0" class="space-y-4 mb-6">
          <div v-for="(attr, index) in form.skuAttributes" :key="index" class="flex items-start space-x-4">
            <el-input
              v-model="attr.name"
              placeholder="属性名称，如：颜色、尺码"
              style="width: 200px"
            />
            <div class="flex-1">
              <el-tag
                v-for="(value, vIndex) in attr.values"
                :key="vIndex"
                closable
                @close="removeAttributeValue(index, vIndex)"
                class="mr-2 mb-2"
              >
                {{ value }}
              </el-tag>
              <el-input
                v-if="attr.inputVisible"
                ref="inputRef"
                v-model="attr.inputValue"
                size="small"
                style="width: 100px"
                @keyup.enter="confirmAttributeValue(index)"
                @blur="confirmAttributeValue(index)"
              />
              <el-button v-else size="small" @click="showAttributeInput(index)">+ 添加值</el-button>
            </div>
            <el-button type="danger" @click="removeSkuAttribute(index)" size="small" circle>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </el-button>
          </div>
        </div>

        <!-- 生成的SKU列表 -->
        <div v-if="generatedSkus.length > 0" class="border border-gray-200 dark:border-dark-border rounded-lg overflow-hidden">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-dark-border">
            <thead class="bg-gray-100 dark:bg-dark-border">
              <tr>
                <th v-for="attr in form.skuAttributes" :key="attr.name" class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-text-secondary uppercase tracking-wider">
                  {{ attr.name }}
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
              <tr v-for="(sku, index) in generatedSkus" :key="index">
                <td v-for="attr in form.skuAttributes" :key="attr.name" class="px-4 py-3 text-sm text-gray-900 dark:text-dark-text">
                  {{ sku.attributes[attr.name] }}
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
        <div v-else-if="form.skuAttributes.length > 0" class="text-center py-8 text-gray-500 dark:text-dark-text-secondary">
          请为每个属性添加值，系统将自动生成SKU组合
        </div>
        <div v-else class="text-center py-8 text-gray-500 dark:text-dark-text-secondary">
          请添加SKU属性，如颜色、尺码等
        </div>
      </div>
    </el-form>

    <template #footer>
      <div class="flex justify-end space-x-3">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm" :loading="submitting">创建商品</el-button>
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

  <!-- 创建效果图对话框 -->
  <CreateEffectDialog
    v-model="showEffectDialog"
    @success="handleEffectCreated"
  />
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue';
import { ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import ImageSelectorDialog from './ImageSelectorDialog.vue';
import CreateEffectDialog from './CreateEffectDialog.vue';

// Props
const props = defineProps<{
  modelValue: boolean;
}>();

// Emits
const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  'success': [];
}>();

// 类型定义
interface SkuAttribute {
  name: string;
  values: string[];
  inputVisible: boolean;
  inputValue: string;
}

// interface GeneratedSku {
//   attributes: Record<string, string>;
//   price: number;
//   stock: number;
//   image?: string;
// }

interface ProductForm {
  name: string;
  price: number;
  coverImage: string;
  additionalImages: string[];
  skuImages: string[];
  skuAttributes: SkuAttribute[];
}

// 响应式数据
const dialogVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const formRef = ref<FormInstance>();
const submitting = ref(false);
const showImageSelector = ref(false);
const showEffectDialog = ref(false);
const currentImageType = ref<'cover' | 'additional' | 'sku'>('cover');
const imageSelectorTitle = computed(() => {
  const titles = {
    cover: '选择封面图',
    additional: '选择附图',
    sku: '选择SKU图'
  };
  return titles[currentImageType.value];
});

const form = ref<ProductForm>({
  name: '',
  price: 0,
  coverImage: '',
  additionalImages: [],
  skuImages: [],
  skuAttributes: []
});

const rules = ref<FormRules>({
  name: [
    { required: true, message: '请输入商品标题', trigger: 'blur' },
    { min: 3, max: 100, message: '长度在 3 到 100 个字符', trigger: 'blur' }
  ],
  price: [
    { required: true, message: '请输入商品价格', trigger: 'blur' }
  ]
});

// 计算属性
const generatedSkus = computed(() => {
  if (form.value.skuAttributes.length === 0) return [];
  
  // 检查是否所有属性都有值
  const allAttributesHaveValues = form.value.skuAttributes.every(attr => attr.values.length > 0);
  if (!allAttributesHaveValues) return [];
  
  // 生成笛卡尔积
  const generateCartesianProduct = (arrays: string[][], current: string[] = [], index: number = 0, result: string[][] = []) => {
    if (index === arrays.length) {
      result.push([...current]);
      return;
    }
    
    for (let i = 0; i < arrays[index].length; i++) {
      current[index] = arrays[index][i];
      generateCartesianProduct(arrays, current, index + 1, result);
    }
    
    return result;
  };
  
  const attributeValues = form.value.skuAttributes.map(attr => attr.values);
  const combinations = generateCartesianProduct(attributeValues);

  // 创建SKU对象
  return combinations?.map(combination => {
    const attributes: Record<string, string> = {};
    form.value.skuAttributes.forEach((attr, index) => {
      attributes[attr.name] = combination[index];
    });

    return {
      attributes,
      price: form.value.price,
      stock: 100,
      image: ''
    };
  }) || [];
});

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

const addSkuAttribute = () => {
  form.value.skuAttributes.push({
    name: '',
    values: [],
    inputVisible: false,
    inputValue: ''
  });
};

const removeSkuAttribute = (index: number) => {
  form.value.skuAttributes.splice(index, 1);
};

const showAttributeInput = (index: number) => {
  form.value.skuAttributes[index].inputVisible = true;
  nextTick(() => {
    (document.querySelector('.el-input__inner') as HTMLInputElement)?.focus();
  });
};

const confirmAttributeValue = (index: number) => {
  const inputValue = form.value.skuAttributes[index].inputValue;
  if (inputValue) {
    form.value.skuAttributes[index].values.push(inputValue);
  }
  form.value.skuAttributes[index].inputVisible = false;
  form.value.skuAttributes[index].inputValue = '';
};

const removeAttributeValue = (attrIndex: number, valueIndex: number) => {
  form.value.skuAttributes[attrIndex].values.splice(valueIndex, 1);
};

const submitForm = async () => {
  if (!formRef.value) return;
  
  await formRef.value.validate((valid, _fields) => {
    if (valid) {
      submitting.value = true;
      
      // 模拟提交
      setTimeout(() => {
        submitting.value = false;
        ElMessage.success('商品创建成功！');
        resetForm();
        emit('success');
        emit('update:modelValue', false);
      }, 1000);
    }
  });
};

const resetForm = () => {
  if (formRef.value) {
    formRef.value.resetFields();
  }
  
  form.value = {
    name: '',
    price: 0,
    coverImage: '',
    additionalImages: [],
    skuImages: [],
    skuAttributes: []
  };
};

const handleEffectCreated = () => {
  // 处理特效创建成功
  ElMessage.success('特效创建成功！');
};
</script>

<style scoped>
.create-product-dialog :deep(.el-dialog__body) {
  padding: 20px;
}
</style>
