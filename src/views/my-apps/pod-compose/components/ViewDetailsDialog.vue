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
          <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
            </svg>
          </div>
          <div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-dark-text">POD合成任务详情</h3>
            <p class="text-sm text-gray-600 dark:text-dark-text-secondary">任务ID: {{ task?.id || '' }}</p>
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

    <!-- 任务信息概览 -->
    <div v-if="task" class="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-xl border border-purple-200 dark:border-purple-800">
        <div class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div>
            <p class="text-xs text-purple-600 dark:text-purple-400 font-medium">任务状态</p>
            <p class="text-sm font-bold text-purple-900 dark:text-purple-100">{{ getStatusText(task.status) }}</p>
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
            <p class="text-xs text-blue-600 dark:text-blue-400 font-medium">合成数量</p>
            <p class="text-sm font-bold text-blue-900 dark:text-blue-100">{{ task.baseCount }} × {{ task.patternCount }}</p>
          </div>
        </div>
      </div>

      <div class="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800">
        <div class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div>
            <p class="text-xs text-emerald-600 dark:text-emerald-400 font-medium">成功数量</p>
            <p class="text-sm font-bold text-emerald-900 dark:text-emerald-100">{{ task.successCount }}</p>
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
            <p class="text-xs text-amber-600 dark:text-amber-400 font-medium">操作人</p>
            <p class="text-sm font-bold text-amber-900 dark:text-amber-100">{{ task.operator }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 合成详情 -->
    <div v-if="task" class="px-6 pb-6 space-y-6">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-dark-text">合成详情</h3>
        <div class="flex space-x-3">
          <el-button type="primary" size="small" @click="publishAllProducts">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
            批量刊登
          </el-button>
          <el-button size="small" @click="downloadAllImages">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
            </svg>
            下载图片
          </el-button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- 合成结果 -->
        <div class="bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-dark-border overflow-hidden">
          <div class="p-4 border-b border-gray-100 dark:border-dark-border">
            <h4 class="text-sm font-medium text-gray-900 dark:text-dark-text">合成结果</h4>
          </div>
          <div class="p-4">
            <div class="flex items-center space-x-4 mb-4">
              <el-image
                :src="task.resultImage"
                :preview-src-list="[task.resultImage]"
                fit="cover"
                class="w-24 h-24 rounded-lg border border-gray-200 dark:border-dark-border"
                :preview-teleported="true"
              />
              <div>
                <h4 class="text-lg font-medium text-gray-900 dark:text-dark-text">{{ task.productName }}</h4>
                <p class="text-sm text-gray-600 dark:text-dark-text-secondary">基于: {{ task.baseProduct }}</p>
                <span :class="getStatusClass(task.status)" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-2">
                  {{ getStatusText(task.status) }}
                </span>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p class="text-gray-500 dark:text-dark-text-secondary">任务ID</p>
                <p class="font-mono text-gray-900 dark:text-dark-text">{{ task.id }}</p>
              </div>
              <div>
                <p class="text-gray-500 dark:text-dark-text-secondary">创建时间</p>
                <p class="text-gray-900 dark:text-dark-text">{{ task.createTime }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 合成材料 -->
        <div class="bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-dark-border overflow-hidden">
          <div class="p-4 border-b border-gray-100 dark:border-dark-border">
            <h4 class="text-sm font-medium text-gray-900 dark:text-dark-text">合成材料</h4>
          </div>
          <div class="p-4">
            <div class="space-y-4">
              <!-- 基础商品 -->
              <div>
                <p class="text-xs text-gray-500 dark:text-dark-text-secondary mb-3">基础商品 ({{ task.baseCount }})</p>
                <div class="space-y-3 max-h-48 overflow-y-auto">
                  <div
                    v-for="(product, index) in getBaseProducts(task.baseProduct, task.baseCount)"
                    :key="index"
                    class="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
                  >
                    <img :src="`https://picsum.photos/100/100?random=${701 + index}`" :alt="product" class="w-12 h-12 rounded-lg object-cover" />
                    <div class="flex-1">
                      <p class="text-sm font-medium text-gray-900 dark:text-dark-text">{{ product }}</p>
                      <p class="text-xs text-green-600 dark:text-green-400">白品 {{ index + 1 }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 印刷图案 -->
              <div class="pt-4 border-t border-gray-100 dark:border-dark-border">
                <p class="text-xs text-gray-500 dark:text-dark-text-secondary mb-2">印刷图案 ({{ task.patternCount }})</p>
                <div class="grid grid-cols-3 gap-2">
                  <div v-for="i in Math.min(task.patternCount, 6)" :key="i" class="relative">
                    <img :src="`https://picsum.photos/100/100?random=${700 + i}`" :alt="`图案${i}`" class="w-full h-16 rounded-lg object-cover" />
                  </div>
                  <div v-if="task.patternCount > 6" class="bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center h-16">
                    <span class="text-xs text-gray-500 dark:text-gray-400">+{{ task.patternCount - 6 }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 生成的POD商品 -->
      <div class="bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-dark-border overflow-hidden">
        <div class="p-4 border-b border-gray-100 dark:border-dark-border">
          <h4 class="text-sm font-medium text-gray-900 dark:text-dark-text">生成的POD商品</h4>
        </div>
        <div class="overflow-x-auto">
          <el-table
            :data="generatedProducts"
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
            <el-table-column label="商品图片" width="100">
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

            <el-table-column prop="name" label="商品名称" min-width="200">
              <template #default="scope">
                <div>
                  <p class="text-sm font-medium text-gray-900 dark:text-dark-text">{{ scope.row.name }}</p>
                  <p class="text-xs text-gray-500 dark:text-dark-text-secondary">{{ scope.row.id }}</p>
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="price" label="价格" width="100">
              <template #default="scope">
                <span class="font-medium text-green-600 dark:text-green-400">¥{{ scope.row.price }}</span>
              </template>
            </el-table-column>

            <el-table-column prop="skuCount" label="SKU数量" width="100">
              <template #default="scope">
                <span class="font-medium text-gray-900 dark:text-dark-text">{{ scope.row.skuCount }}</span>
              </template>
            </el-table-column>

            <el-table-column label="操作" width="150">
              <template #default="scope">
                <div class="flex space-x-2">
                  <button @click="viewPodProduct(scope.row)" class="text-purple-600 hover:text-purple-700 transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  </button>
                  <button @click="publishPodProduct(scope.row)" class="text-blue-600 hover:text-blue-700 transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                    </svg>
                  </button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="flex items-center justify-between p-6 border-t border-gray-100 dark:border-dark-border bg-gray-50 dark:bg-dark-card/50">
        <div class="text-sm text-gray-600 dark:text-dark-text-secondary">
          共生成 {{ task?.successCount || 0 }} 个POD商品
        </div>
        <div class="flex items-center space-x-3">
          <button @click="handleClose"
            class="px-6 py-2.5 text-gray-700 dark:text-dark-text font-medium rounded-lg border border-gray-300 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-border transition-all duration-200">
            关闭
          </button>
          <button @click="publishAllProducts"
            class="inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
            批量刊登
          </button>
        </div>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ElMessage } from 'element-plus';

// Props
const props = defineProps<{
  modelValue: boolean;
  task: any;
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

// 生成的商品数据
const generatedProducts = computed(() => {
  if (!props.task) return [];

  return Array.from({ length: props.task.successCount }, (_, i) => ({
    id: `POD${String(i + 1).padStart(3, '0')}`,
    name: `${props.task.productName} - 图案${i + 1}`,
    image: `https://picsum.photos/100/100?random=${800 + i + 1}`,
    price: '79.90',
    skuCount: 6
  }));
});

// 方法
const handleClose = () => {
  dialogVisible.value = false;
};

const getBaseProducts = (baseProductStr: string, baseCount: number) => {
  if (baseCount === 1) {
    return [baseProductStr];
  }

  // 如果包含中文逗号或英文逗号，按逗号分割
  if (baseProductStr.includes('、') || baseProductStr.includes(',')) {
    return baseProductStr.split(/[、,]/).map(item => item.trim()).filter(item => item);
  }

  // 如果没有分隔符但baseCount > 1，生成默认名称
  return Array.from({ length: baseCount }, (_, i) => `${baseProductStr} ${i + 1}`);
};

const getStatusClass = (status: string) => {
  const statusClasses: Record<string, string> = {
    'completed': 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
    'processing': 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300',
    'failed': 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300',
    'pending': 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300'
  };
  return statusClasses[status] || statusClasses['pending'];
};

const getStatusText = (status: string) => {
  const statusTexts: Record<string, string> = {
    'completed': '已完成',
    'processing': '处理中',
    'failed': '失败',
    'pending': '等待中'
  };
  return statusTexts[status] || '未知';
};

// const getProcessingTime = (task: any) => {
//   // 模拟处理时长计算
//   if (task.status === 'completed') {
//     return '2分30秒';
//   } else if (task.status === 'processing') {
//     return '进行中...';
//   } else if (task.status === 'failed') {
//     return '失败';
//   }
//   return '等待中';
// };

const viewPodProduct = (product: any) => {
  ElMessage.info(`查看POD商品: ${product.name}`);
};

const publishPodProduct = (product: any) => {
  ElMessage.success(`正在刊登POD商品: ${product.name}`);
};

const publishAllProducts = () => {
  ElMessage.success(`正在批量刊登 ${props.task?.successCount || 0} 个POD商品`);
};

const downloadAllImages = () => {
  ElMessage.success(`正在下载 ${props.task?.successCount || 0} 个商品图片`);
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
