<template>
  <el-dialog
    v-model="dialogVisible"
    width="1200px"
    :before-close="handleClose"
    :show-close="false"
    class="modern-dialog"
  >
    <!-- 自定义标题 -->
    <template #header>
      <div class="flex items-center justify-between p-6 border-b border-gray-100 dark:border-dark-border">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
            </svg>
          </div>
          <div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-dark-text">商品详情</h3>
            <p class="text-sm text-gray-600 dark:text-dark-text-secondary">ID: {{ product?.id || '' }}</p>
          </div>
        </div>
        <button @click="handleClose"
          class="p-2 text-gray-400 hover:text-gray-600 dark:text-dark-text-secondary dark:hover:text-dark-text rounded-lg hover:bg-gray-100 dark:hover:bg-dark-card transition-all duration-200">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </template>

    <div v-if="product" class="p-6 space-y-8">
      <!-- 商品基本信息 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- 商品图片 -->
        <div>
          <div class="mb-4">
            <el-image
              :src="product.coverImage"
              :preview-src-list="[product.coverImage, ...product.additionalImages]"
              fit="cover"
              class="w-full h-80 object-cover rounded-lg border border-gray-200 dark:border-dark-border"
              :preview-teleported="true"
            />
          </div>
          <div class="grid grid-cols-5 gap-2">
            <div
              class="cursor-pointer border-2 rounded-lg overflow-hidden transition-all duration-200 border-amber-500"
              @click="previewImage(product.coverImage)"
            >
              <img :src="product.coverImage" class="w-full h-16 object-cover" />
            </div>
            <div
              v-for="(image, index) in product.additionalImages"
              :key="index"
              class="cursor-pointer border-2 border-gray-200 dark:border-dark-border hover:border-amber-500 rounded-lg overflow-hidden transition-all duration-200"
              @click="previewImage(image)"
            >
              <img :src="image" class="w-full h-16 object-cover" />
            </div>
          </div>
        </div>

        <!-- 商品信息 -->
        <div class="space-y-6">
          <div>
            <h2 class="text-2xl font-bold text-gray-900 dark:text-dark-text">{{ product.name }}</h2>
            <div class="mt-2 flex items-center space-x-4">
              <div class="text-xl font-bold text-amber-600 dark:text-amber-400">
                ¥{{ product.minPrice.toFixed(2) }}
              </div>
              <div class="text-sm text-gray-500 dark:text-dark-text-secondary">
                SKU数量: {{ product.skuCount }}
              </div>
            </div>
          </div>

          <div class="border-t border-gray-100 dark:border-dark-border pt-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-dark-text mb-3">创建信息</h3>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-sm text-gray-500 dark:text-dark-text-secondary">创建人</p>
                <p class="text-sm font-medium text-gray-900 dark:text-dark-text">{{ product.creator }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500 dark:text-dark-text-secondary">创建时间</p>
                <p class="text-sm font-medium text-gray-900 dark:text-dark-text">{{ product.createTime }}</p>
              </div>
            </div>
          </div>

          <div class="border-t border-gray-100 dark:border-dark-border pt-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-dark-text mb-3">操作</h3>
            <div class="flex space-x-3">
              <el-button type="primary" @click="editProduct">
                <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
                编辑商品
              </el-button>
              <el-button @click="createListing">
                <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
                创建刊登
              </el-button>
            </div>
          </div>
        </div>
      </div>

      <!-- SKU信息 -->
      <div class="border-t border-gray-100 dark:border-dark-border pt-6">
        <h3 class="text-lg font-medium text-gray-900 dark:text-dark-text mb-4">SKU信息</h3>
        <el-table
          :data="product.skus"
          style="width: 100%"
          class="modern-table"
          :header-cell-style="{
            backgroundColor: 'var(--el-bg-color-page)',
            color: 'var(--el-text-color-primary)',
            fontWeight: '600',
            borderBottom: '1px solid var(--el-border-color-light)'
          }"
          :row-style="{ backgroundColor: 'transparent' }"
        >
          <el-table-column prop="id" label="SKU ID" width="120">
            <template #default="scope">
              <span class="font-mono text-sm text-gray-600 dark:text-dark-text-secondary">{{ scope.row.id }}</span>
            </template>
          </el-table-column>
          
          <el-table-column label="属性" min-width="200">
            <template #default="scope">
              <div class="flex flex-wrap gap-2">
                <el-tag
                  v-for="(value, key) in scope.row.attributes"
                  :key="key"
                  size="small"
                  class="mr-1"
                >
                  {{ key }}: {{ value }}
                </el-tag>
              </div>
            </template>
          </el-table-column>
          
          <el-table-column prop="price" label="价格" width="120">
            <template #default="scope">
              <span class="font-medium text-green-600 dark:text-green-400">¥{{ scope.row.price.toFixed(2) }}</span>
            </template>
          </el-table-column>
          
          <el-table-column prop="stock" label="库存" width="100">
            <template #default="scope">
              <span class="font-medium text-gray-900 dark:text-dark-text">{{ scope.row.stock }}</span>
            </template>
          </el-table-column>
          
          <el-table-column label="SKU图" width="100">
            <template #default="scope">
              <div v-if="scope.row.image" class="flex justify-center">
                <el-image
                  :src="scope.row.image"
                  :preview-src-list="[scope.row.image]"
                  fit="cover"
                  class="w-12 h-12 rounded-lg border border-gray-200 dark:border-dark-border"
                  :preview-teleported="true"
                />
              </div>
              <span v-else class="text-gray-400">-</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <template #footer>
      <div class="flex items-center justify-end p-6 border-t border-gray-100 dark:border-dark-border bg-gray-50 dark:bg-dark-card/50">
        <button @click="handleClose"
          class="px-6 py-2.5 text-gray-700 dark:text-dark-text font-medium rounded-lg border border-gray-300 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-border transition-all duration-200">
          关闭
        </button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { ElMessage } from 'element-plus';

// Props
const props = defineProps<{
  modelValue: boolean;
  product: any;
}>();

// Emits
const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();

// 响应式数据
const dialogVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const currentPreviewImage = ref('');

// 方法
const handleClose = () => {
  dialogVisible.value = false;
};

const previewImage = (imageUrl: string) => {
  currentPreviewImage.value = imageUrl;
};

const editProduct = () => {
  ElMessage.success('编辑商品功能开发中...');
};

const createListing = () => {
  ElMessage.success('创建刊登功能开发中...');
};
</script>

<style scoped>
.modern-dialog :deep(.el-dialog__header) {
  padding: 0;
  margin: 0;
}

.modern-dialog :deep(.el-dialog__body) {
  padding: 0;
}

.modern-dialog :deep(.el-dialog__footer) {
  padding: 0;
}

.modern-table {
  width: 100% !important;
  --el-table-border-color: theme('colors.gray.100');
  --el-table-bg-color: theme('colors.white');
  --el-table-tr-bg-color: theme('colors.white');
  --el-table-expanded-cell-bg-color: theme('colors.gray.50');
}

.modern-table :deep(.el-table) {
  width: 100% !important;
}

.modern-table :deep(.el-table__header-wrapper) {
  background: transparent;
  width: 100% !important;
}

.modern-table :deep(.el-table__body-wrapper) {
  background: transparent;
  width: 100% !important;
}

.modern-table :deep(.el-table__row) {
  transition: all 0.2s ease;
}

.modern-table :deep(.el-table__row:hover) {
  background-color: rgba(245, 158, 11, 0.05) !important;
  transform: translateY(-1px);
}

.modern-table :deep(.el-table__header) {
  width: 100% !important;
}

.modern-table :deep(.el-table__body) {
  width: 100% !important;
}

.dark .modern-table {
  --el-table-border-color: theme('colors.gray.700');
  --el-table-bg-color: theme('colors.gray.800');
  --el-table-tr-bg-color: theme('colors.gray.800');
  --el-table-expanded-cell-bg-color: theme('colors.gray.700');
}
</style>
