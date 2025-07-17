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
          <div class="w-10 h-10 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
          <div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-dark-text">抠图详情</h3>
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

    <!-- 抠图信息概览 -->
    <div v-if="task" class="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 p-4 rounded-xl border border-pink-200 dark:border-pink-800">
        <div class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div>
            <p class="text-xs text-pink-600 dark:text-pink-400 font-medium">任务状态</p>
            <p class="text-sm font-bold text-pink-900 dark:text-pink-100">{{ getStatusText(task.status) }}</p>
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
            <p class="text-xs text-blue-600 dark:text-blue-400 font-medium">目标数量</p>
            <p class="text-sm font-bold text-blue-900 dark:text-blue-100">{{ task.targetCount }}</p>
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

      <div class="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-xl border border-purple-200 dark:border-purple-800">
        <div class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
          </div>
          <div>
            <p class="text-xs text-purple-600 dark:text-purple-400 font-medium">操作人</p>
            <p class="text-sm font-bold text-purple-900 dark:text-purple-100">{{ task.operator }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 抠图结果列表 -->
    <div class="px-6 pb-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-dark-text mb-4">抠图结果</h3>
      <div class="bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-dark-border overflow-hidden">
        <el-table
          :data="processResults"
          style="width: 100%"
          v-loading="loading"
          max-height="400"
          class="modern-table"
        >
          <el-table-column prop="index" label="序号" width="80" align="center" />
          <el-table-column label="原图" width="100" align="center">
            <template #default="scope">
              <div v-if="scope.row.status === 'success'" class="flex justify-center">
                <el-image
                  :src="scope.row.originalImage"
                  :preview-src-list="[scope.row.originalImage]"
                  fit="cover"
                  class="w-16 h-16 rounded-lg border border-gray-200 dark:border-dark-border"
                  :preview-teleported="true"
                />
              </div>
              <div v-else class="text-gray-400 text-xs">无图片</div>
            </template>
          </el-table-column>
          <el-table-column label="结果图" width="100" align="center">
            <template #default="scope">
              <div v-if="scope.row.status === 'success'" class="flex justify-center">
                <!-- 带棋盘格背景的预览图 -->
                <div class="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200 dark:border-dark-border">
                  <!-- 棋盘格背景 -->
                  <div class="absolute inset-0 checkerboard-bg"></div>
                  <!-- 抠图结果 -->
                  <el-image
                    :src="scope.row.thumbnail"
                    :preview-src-list="[scope.row.thumbnail]"
                    fit="cover"
                    class="relative z-10 w-full h-full"
                    :preview-teleported="true"
                  />
                </div>
              </div>
              <div v-else class="text-gray-400 text-xs">无图片</div>
            </template>
          </el-table-column>
          <el-table-column label="文件名" min-width="200">
            <template #default="scope">
              <div v-if="scope.row.fileName" class="text-sm font-medium text-gray-900 dark:text-dark-text">
                {{ scope.row.fileName }}
              </div>
              <div v-else class="text-gray-400 text-xs">无文件名</div>
            </template>
          </el-table-column>
          <el-table-column prop="originalSize" label="原始尺寸" width="120" align="center">
            <template #default="scope">
              <span v-if="scope.row.originalSize" class="text-sm text-gray-600 dark:text-dark-text-secondary">
                {{ scope.row.originalSize }}
              </span>
              <span v-else class="text-gray-400 text-xs">-</span>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态" width="100" align="center">
            <template #default="scope">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    :class="scope.row.status === 'success' ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300' : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'">
                {{ getItemStatusText(scope.row.status) }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120" align="center">
            <template #default="scope">
              <button
                v-if="scope.row.status === 'success'"
                @click="downloadResult(scope.row)"
                class="text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 text-sm font-medium">
                下载结果
              </button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div class="flex justify-center p-4 border-t border-gray-200 dark:border-dark-border">
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 50]"
            :total="total"
            layout="total, sizes, prev, pager, next"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>

    <template #footer>
      <div class="flex items-center justify-between p-6 border-t border-gray-100 dark:border-dark-border bg-gray-50 dark:bg-dark-card/50">
        <div class="text-sm text-gray-600 dark:text-dark-text-secondary">
          共 {{ total }} 条抠图结果
        </div>
        <div class="flex items-center space-x-3">
          <button @click="handleClose"
            class="px-6 py-2.5 text-gray-700 dark:text-dark-text font-medium rounded-lg border border-gray-300 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-border transition-all duration-200">
            关闭
          </button>
          <button @click="exportDetails"
            class="inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
            <ArrowDownTrayIcon class="w-5 h-5 mr-2" />
            导出详情
          </button>
        </div>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { ElMessage } from 'element-plus';
import { ArrowDownTrayIcon } from '@heroicons/vue/24/outline';

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
  fileName: string;
  originalSize: string;
  status: 'success' | 'failed';
  originalImage: string;
  thumbnail: string;
  downloadUrl?: string;
  errorMessage?: string;
  url?: string;
}

// 响应式数据
const dialogVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

// 分页相关
const loading = ref(false);
const currentPage = ref(1);
const pageSize = ref(10);
const total = computed(() => processResults.value.length);

// 模拟处理结果数据
const processResults = ref([
  {
    fileName: 'portrait1.png',
    originalSize: '1920x1080',
    status: 'success',
    originalImage: 'https://via.placeholder.com/100x100/6b7280/ffffff?text=ORIG1',
    thumbnail: 'https://via.placeholder.com/100x100/ec4899/ffffff?text=CUT1',
    downloadUrl: '#'
  },
  {
    fileName: 'object1.png',
    originalSize: '1600x900',
    status: 'success',
    originalImage: 'https://via.placeholder.com/100x100/6b7280/ffffff?text=ORIG2',
    thumbnail: 'https://via.placeholder.com/100x100/f97316/ffffff?text=CUT2',
    downloadUrl: '#'
  },
  {
    fileName: 'product1.png',
    originalSize: '1280x720',
    status: 'failed',
    originalImage: 'https://via.placeholder.com/100x100/6b7280/ffffff?text=ORIG3',
    thumbnail: 'https://via.placeholder.com/100x100/ef4444/ffffff?text=FAIL',
    errorMessage: '图片背景过于复杂'
  },
  {
    fileName: 'portrait2.png',
    originalSize: '2048x1536',
    status: 'success',
    originalImage: 'https://via.placeholder.com/100x100/6b7280/ffffff?text=ORIG4',
    thumbnail: 'https://via.placeholder.com/100x100/8b5cf6/ffffff?text=CUT3',
    downloadUrl: '#'
  },
  {
    fileName: 'object2.png',
    originalSize: '1440x900',
    status: 'success',
    originalImage: 'https://via.placeholder.com/100x100/6b7280/ffffff?text=ORIG5',
    thumbnail: 'https://via.placeholder.com/100x100/f59e0b/ffffff?text=CUT4',
    downloadUrl: '#'
  }
]);

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

const downloadResult = (item: ProcessResult) => {
  ElMessage.success(`正在下载 ${item.fileName}`);
  // 这里应该实现实际的下载逻辑
};

const exportDetails = () => {
  ElMessage.success('正在导出详情...');
  // 这里应该实现导出逻辑
};

// 分页方法
const handleSizeChange = (size: number) => {
  pageSize.value = size;
  currentPage.value = 1;
};

const handleCurrentChange = (page: number) => {
  currentPage.value = page;
};
</script>

<style scoped>
.modern-dialog :deep(.el-dialog__header) {
  padding: 0;
}

.modern-dialog :deep(.el-dialog__body) {
  padding: 0;
}

.modern-dialog :deep(.el-dialog__footer) {
  padding: 0;
}

.modern-table {
  width: 100% !important;
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

.modern-table :deep(.el-table__row) {
  transition: all 0.2s ease;
}

.modern-table :deep(.el-table__row:hover) {
  background-color: rgba(236, 72, 153, 0.05) !important;
}

.modern-table :deep(.el-table__header) {
  width: 100% !important;
}

.modern-table :deep(.el-table__body) {
  width: 100% !important;
}

/* 棋盘格背景样式 */
.checkerboard-bg {
  background-image: 
    linear-gradient(45deg, #f0f0f0 25%, transparent 25%), 
    linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), 
    linear-gradient(45deg, transparent 75%, #f0f0f0 75%), 
    linear-gradient(-45deg, transparent 75%, #f0f0f0 75%);
  background-size: 8px 8px;
  background-position: 0 0, 0 4px, 4px -4px, -4px 0px;
}

.dark .checkerboard-bg {
  background-image: 
    linear-gradient(45deg, #4a5568 25%, transparent 25%), 
    linear-gradient(-45deg, #4a5568 25%, transparent 25%), 
    linear-gradient(45deg, transparent 75%, #4a5568 75%), 
    linear-gradient(-45deg, transparent 75%, #4a5568 75%);
}
</style>
