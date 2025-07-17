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
          <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2"></path>
            </svg>
          </div>
          <div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-dark-text">POD商品详情</h3>
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

    <!-- 商品信息概览 -->
    <div v-if="product" class="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-xl border border-purple-200 dark:border-purple-800">
        <div class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div>
            <p class="text-xs text-purple-600 dark:text-purple-400 font-medium">刊登状态</p>
            <p class="text-sm font-bold text-purple-900 dark:text-purple-100">{{ getPublishStatusText(product.publishStatus) }}</p>
          </div>
        </div>
      </div>

      <div class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
        <div class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
          </div>
          <div>
            <p class="text-xs text-blue-600 dark:text-blue-400 font-medium">SKU数量</p>
            <p class="text-sm font-bold text-blue-900 dark:text-blue-100">{{ product.skuCount }}</p>
          </div>
        </div>
      </div>

      <div class="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800">
        <div class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div>
            <p class="text-xs text-emerald-600 dark:text-emerald-400 font-medium">商品价格</p>
            <p class="text-sm font-bold text-emerald-900 dark:text-emerald-100">¥{{ product.minPrice.toFixed(2) }}</p>
          </div>
        </div>
      </div>

      <div class="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 p-4 rounded-xl border border-amber-200 dark:border-amber-800">
        <div class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
          </div>
          <div>
            <p class="text-xs text-amber-600 dark:text-amber-400 font-medium">创建人</p>
            <p class="text-sm font-bold text-amber-900 dark:text-amber-100">{{ product.creator }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 商品详情 -->
    <div v-if="product" class="px-6 pb-6 space-y-6">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-dark-text">商品详情</h3>
        <div class="flex space-x-3">
          <el-button type="primary" size="small" @click="publishProduct">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
            刊登商品
          </el-button>
          <el-button size="small" @click="downloadProduct">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
            </svg>
            下载图片
          </el-button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- 商品图片 -->
        <div class="bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-dark-border overflow-hidden">
          <div class="p-4 border-b border-gray-100 dark:border-dark-border">
            <h4 class="text-sm font-medium text-gray-900 dark:text-dark-text">商品图片</h4>
          </div>
          <div class="p-4">
            <el-image
              :src="product.coverImage"
              :preview-src-list="[product.coverImage]"
              fit="cover"
              class="w-full h-64 object-cover rounded-lg border border-gray-200 dark:border-dark-border"
              :preview-teleported="true"
            />
            <h2 class="text-lg font-bold text-gray-900 dark:text-dark-text mt-4">{{ product.name }}</h2>
          </div>
        </div>

        <!-- 合成信息 -->
        <div class="bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-dark-border overflow-hidden">
          <div class="p-4 border-b border-gray-100 dark:border-dark-border">
            <h4 class="text-sm font-medium text-gray-900 dark:text-dark-text">合成信息</h4>
          </div>
          <div class="p-4">
            <div class="grid grid-cols-2 gap-4">
              <div class="flex items-center space-x-3">
                <img src="https://picsum.photos/100/100?random=201" alt="基础商品" class="w-16 h-16 rounded-lg object-cover" />
                <div>
                  <p class="text-xs text-gray-500 dark:text-dark-text-secondary">基础商品</p>
                  <p class="text-sm font-medium text-gray-900 dark:text-dark-text">{{ product.baseProduct }}</p>
                </div>
              </div>
              <div class="flex items-center space-x-3">
                <img src="https://picsum.photos/100/100?random=202" alt="印刷图案" class="w-16 h-16 rounded-lg object-cover" />
                <div>
                  <p class="text-xs text-gray-500 dark:text-dark-text-secondary">印刷图案</p>
                  <p class="text-sm font-medium text-gray-900 dark:text-dark-text">自定义图案</p>
                </div>
              </div>
            </div>
            <div class="mt-4 pt-4 border-t border-gray-100 dark:border-dark-border">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <p class="text-xs text-gray-500 dark:text-dark-text-secondary">创建时间</p>
                  <p class="text-sm font-medium text-gray-900 dark:text-dark-text">{{ product.createTime }}</p>
                </div>
                <div>
                  <p class="text-xs text-gray-500 dark:text-dark-text-secondary">刊登状态</p>
                  <span :class="getPublishStatusClass(product.publishStatus)" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                    {{ getPublishStatusText(product.publishStatus) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- SKU信息 -->
      <div class="bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-dark-border overflow-hidden">
        <div class="p-4 border-b border-gray-100 dark:border-dark-border">
          <h4 class="text-sm font-medium text-gray-900 dark:text-dark-text">SKU信息</h4>
        </div>
        <div class="overflow-x-auto">
          <el-table
            :data="mockSkus"
            style="width: 100%"
            max-height="400"
            class="modern-table"
            :header-cell-style="{
              backgroundColor: 'var(--el-bg-color-page)',
              color: 'var(--el-text-color-primary)',
              fontWeight: '600',
              borderBottom: '1px solid var(--el-border-color-light)'
            }"
            :row-style="{ backgroundColor: 'transparent' }"
          >
            <el-table-column label="SKU图片" width="100">
              <template #default="scope">
                <div class="flex justify-center">
                  <el-image
                    :src="scope.row.image"
                    :preview-src-list="[scope.row.image]"
                    fit="cover"
                    class="w-12 h-12 rounded-lg border border-gray-200 dark:border-dark-border"
                    :preview-teleported="true"
                  />
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="id" label="SKU ID" width="120">
              <template #default="scope">
                <span class="font-mono text-sm text-gray-600 dark:text-dark-text-secondary">{{ scope.row.id }}</span>
              </template>
            </el-table-column>

            <el-table-column prop="name" label="规格" min-width="150">
              <template #default="scope">
                <span class="text-sm font-medium text-gray-900 dark:text-dark-text">{{ scope.row.name }}</span>
              </template>
            </el-table-column>

            <el-table-column prop="price" label="价格" width="100">
              <template #default="scope">
                <span class="font-medium text-green-600 dark:text-green-400">¥{{ scope.row.price }}</span>
              </template>
            </el-table-column>

            <el-table-column prop="stock" label="库存" width="100">
              <template #default="scope">
                <span class="font-medium text-gray-900 dark:text-dark-text">{{ scope.row.stock }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="flex items-center justify-between p-6 border-t border-gray-100 dark:border-dark-border bg-gray-50 dark:bg-dark-card/50">
        <div class="text-sm text-gray-600 dark:text-dark-text-secondary">
          {{ product?.skuCount || 0 }} 个SKU规格
        </div>
        <div class="flex items-center space-x-3">
          <button @click="handleClose"
            class="px-6 py-2.5 text-gray-700 dark:text-dark-text font-medium rounded-lg border border-gray-300 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-border transition-all duration-200">
            关闭
          </button>
          <button @click="publishProduct"
            class="inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
            刊登商品
          </button>
        </div>
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

// 模拟SKU数据
const mockSkus = ref([
  {
    id: 'SKU001',
    name: 'S码 - 白色',
    price: 79.9,
    stock: 100,
    image: 'https://picsum.photos/100/100?random=301'
  },
  {
    id: 'SKU002',
    name: 'M码 - 白色',
    price: 79.9,
    stock: 80,
    image: 'https://picsum.photos/100/100?random=302'
  },
  {
    id: 'SKU003',
    name: 'L码 - 白色',
    price: 79.9,
    stock: 90,
    image: 'https://picsum.photos/100/100?random=303'
  },
  {
    id: 'SKU004',
    name: 'S码 - 黑色',
    price: 79.9,
    stock: 70,
    image: 'https://picsum.photos/100/100?random=304'
  },
  {
    id: 'SKU005',
    name: 'M码 - 黑色',
    price: 79.9,
    stock: 85,
    image: 'https://picsum.photos/100/100?random=305'
  },
  {
    id: 'SKU006',
    name: 'L码 - 黑色',
    price: 79.9,
    stock: 65,
    image: 'https://picsum.photos/100/100?random=306'
  }
]);

// 方法
const handleClose = () => {
  dialogVisible.value = false;
};

const getPublishStatusClass = (status: string) => {
  const statusClasses: Record<string, string> = {
    'published': 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
    'publishing': 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300',
    'unpublished': 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300'
  };
  return statusClasses[status] || statusClasses['unpublished'];
};

const getPublishStatusText = (status: string) => {
  const statusTexts: Record<string, string> = {
    'published': '已刊登',
    'publishing': '刊登中',
    'unpublished': '未刊登'
  };
  return statusTexts[status] || '未知';
};

const publishProduct = () => {
  ElMessage.success('正在刊登POD商品...');
};

const downloadProduct = () => {
  ElMessage.success('正在下载商品图片...');
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
</style>
