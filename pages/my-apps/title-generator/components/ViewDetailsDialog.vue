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
          <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
            </svg>
          </div>
          <div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-dark-text">标题生成详情</h3>
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
      <div class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
        <div class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div>
            <p class="text-xs text-blue-600 dark:text-blue-400 font-medium">任务状态</p>
            <p class="text-sm font-bold text-blue-900 dark:text-blue-100">{{ getStatusText(task.status) }}</p>
          </div>
        </div>
      </div>

      <div class="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-xl border border-green-200 dark:border-green-800">
        <div class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
          <div>
            <p class="text-xs text-green-600 dark:text-green-400 font-medium">图片数量</p>
            <p class="text-sm font-bold text-green-900 dark:text-green-100">{{ task.imageCount }}</p>
          </div>
        </div>
      </div>

      <div class="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 p-4 rounded-xl border border-indigo-200 dark:border-indigo-800">
        <div class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
            </svg>
          </div>
          <div>
            <p class="text-xs text-indigo-600 dark:text-indigo-400 font-medium">生成数量</p>
            <p class="text-sm font-bold text-indigo-900 dark:text-indigo-100">{{ task.generatedCount }}</p>
          </div>
        </div>
      </div>

      <div class="bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-900/20 dark:to-cyan-800/20 p-4 rounded-xl border border-cyan-200 dark:border-cyan-800">
        <div class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
            </svg>
          </div>
          <div>
            <p class="text-xs text-cyan-600 dark:text-cyan-400 font-medium">使用预设</p>
            <p class="text-sm font-bold text-cyan-900 dark:text-cyan-100">{{ task.preset || '自定义规则' }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 生成规则 -->
    <div class="px-6 pb-4">
      <div class="bg-gray-50 dark:bg-dark-card/50 p-4 rounded-lg border border-gray-100 dark:border-dark-border">
        <h4 class="text-sm font-medium text-gray-900 dark:text-dark-text mb-2">生成规则</h4>
        <p class="text-sm text-gray-700 dark:text-dark-text-secondary whitespace-pre-line">{{ generationRules }}</p>
      </div>
    </div>

    <!-- 标题生成结果列表 -->
    <div class="px-6 pb-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-dark-text mb-4">标题生成结果</h3>
      <div class="bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-dark-border overflow-hidden">
        <el-table
          :data="processResults"
          style="width: 100%"
          v-loading="loading"
          max-height="400"
          class="modern-table"
        >
          <el-table-column prop="index" label="序号" width="80" align="center" />
          <el-table-column label="图片" width="100" align="center">
            <template #default="scope">
              <div v-if="scope.row.status === 'success'" class="flex justify-center">
                <el-image
                  :src="scope.row.image"
                  :preview-src-list="[scope.row.image]"
                  fit="cover"
                  class="w-16 h-16 rounded-lg border border-gray-200 dark:border-dark-border"
                  :preview-teleported="true"
                />
              </div>
              <div v-else class="flex justify-center">
                <div class="w-16 h-16 bg-gray-100 dark:bg-dark-card rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="fileName" label="文件名" width="150" align="center">
            <template #default="scope">
              <span class="text-sm text-gray-600 dark:text-dark-text-secondary">{{ scope.row.fileName }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="title" label="生成标题" min-width="300">
            <template #default="scope">
              <div v-if="scope.row.status === 'success'" class="space-y-2">
                <div v-for="(title, index) in scope.row.titles" :key="index" class="p-2 bg-gray-50 dark:bg-dark-card rounded border border-gray-200 dark:border-dark-border">
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-900 dark:text-dark-text">{{ title }}</span>
                    <button @click="copyTitle(title)" class="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-2M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div v-else class="text-sm text-gray-500 dark:text-dark-text-secondary">
                {{ getItemStatusText(scope.row.status) }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态" width="100" align="center">
            <template #default="scope">
              <el-tag
                :type="scope.row.status === 'success' ? 'success' : 'danger'"
                size="small"
              >
                {{ getItemStatusText(scope.row.status) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120" align="center">
            <template #default="scope">
              <div v-if="scope.row.status === 'success'" class="flex justify-center">
                <button @click="exportTitles(scope.row)"
                  class="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all duration-200">
                  导出
                </button>
              </div>
              <div v-else class="flex justify-center">
                <span class="text-sm text-gray-400">-</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <template #footer>
      <div class="flex items-center justify-between p-6 border-t border-gray-100 dark:border-dark-border bg-gray-50 dark:bg-dark-card/50">
        <div class="text-sm text-gray-600 dark:text-dark-text-secondary">
          共 {{ total }} 条生成结果
        </div>
        <div class="flex items-center space-x-3">
          <button @click="handleClose"
            class="px-6 py-2.5 text-gray-700 dark:text-dark-text font-medium rounded-lg border border-gray-300 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-border transition-all duration-200">
            关闭
          </button>
          <button @click="exportAllTitles"
            class="inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
            </svg>
            导出全部
          </button>
        </div>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
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

// 类型定义
interface ProcessResult {
  index: number;
  image: string;
  fileName: string;
  titles: string[];
  status: 'success' | 'failed';
}

// 响应式数据
const dialogVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const loading = ref(false);
const total = ref(0);
const generationRules = ref('任务：根据图片内容拟定标题；要求：商品款式+商品颜色+印花图案+使用场景，遵循<亚马逊>平台要求，输出<英文>，总字符量不超过120个字符');

// 模拟生成结果数据
const processResults = ref<ProcessResult[]>([
  {
    index: 1,
    image: 'https://picsum.photos/400/400?random=1',
    fileName: 'product_001.jpg',
    titles: [
      'Women\'s Floral Print Summer Dress - Blue Casual Maxi Dress with Pockets for Beach Vacation',
      'Elegant Blue Floral Maxi Dress for Women - Casual Summer Beach Vacation Outfit with Side Pockets',
      'Summer Beach Maxi Dress - Women\'s Blue Floral Print Casual Outfit with Pockets for Vacation'
    ],
    status: 'success'
  },
  {
    index: 2,
    image: 'https://picsum.photos/400/400?random=2',
    fileName: 'product_002.jpg',
    titles: [
      'Men\'s Casual Linen Shirt - White Button Down Short Sleeve Beach Shirt for Summer Vacation',
      'Summer White Linen Shirt for Men - Casual Short Sleeve Button Down Beach Wear for Vacation',
      'Men\'s White Short Sleeve Linen Shirt - Casual Button Down Beach Wear for Summer Vacation'
    ],
    status: 'success'
  },
  {
    index: 3,
    image: 'https://picsum.photos/400/400?random=3',
    fileName: 'product_003.jpg',
    titles: [],
    status: 'failed'
  }
]);

// 初始化数据
total.value = processResults.value.length;

// 状态相关方法
const getStatusText = (status: string) => {
  const statusTexts: Record<string, string> = {
    'completed': '已完成',
    'processing': '处理中',
    'failed': '失败',
    'pending': '等待中'
  };
  return statusTexts[status] || '未知';
};

const getItemStatusText = (status: ProcessResult['status']) => {
  const statusTexts: Record<ProcessResult['status'], string> = {
    'success': '成功',
    'failed': '失败'
  };
  return statusTexts[status] || '未知';
};

// 操作方法
const handleClose = () => {
  dialogVisible.value = false;
};

const copyTitle = (title: string) => {
  navigator.clipboard.writeText(title).then(() => {
    ElMessage.success('标题已复制到剪贴板');
  }).catch(() => {
    ElMessage.error('复制失败，请手动复制');
  });
};

const exportTitles = (item: ProcessResult) => {
  ElMessage.success(`正在导出 ${item.fileName} 的标题`);
  // 这里应该实现实际的导出逻辑
};

const exportAllTitles = () => {
  ElMessage.success('正在导出所有标题...');
  // 这里应该实现导出所有标题的逻辑
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
  background-color: rgba(59, 130, 246, 0.05) !important;
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
