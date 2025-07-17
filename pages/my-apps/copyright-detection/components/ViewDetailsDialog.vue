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
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
            </svg>
          </div>
          <div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-dark-text">侵权检测详情</h3>
            <p class="text-sm text-gray-500 dark:text-dark-text-secondary">任务ID: {{ task?.id }}</p>
          </div>
        </div>
        <button @click="handleClose" 
          class="p-2 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-lg transition-colors duration-200">
          <svg class="w-5 h-5 text-gray-500 dark:text-dark-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </template>

    <!-- 任务信息 -->
    <div class="px-6 py-4 bg-gray-50 dark:bg-dark-card border-b border-gray-100 dark:border-dark-border">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <p class="text-sm text-gray-500 dark:text-dark-text-secondary">图片总数</p>
          <p class="text-lg font-semibold text-gray-900 dark:text-dark-text">{{ task?.imageCount }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500 dark:text-dark-text-secondary">检测进度</p>
          <p class="text-lg font-semibold text-gray-900 dark:text-dark-text">{{ task?.completedCount }}/{{ task?.imageCount }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500 dark:text-dark-text-secondary">操作员</p>
          <p class="text-lg font-semibold text-gray-900 dark:text-dark-text">{{ task?.operator }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500 dark:text-dark-text-secondary">创建时间</p>
          <p class="text-lg font-semibold text-gray-900 dark:text-dark-text">{{ task?.createTime }}</p>
        </div>
      </div>
    </div>

    <!-- 风险统计 -->
    <div v-if="task?.riskSummary" class="px-6 py-4 border-b border-gray-100 dark:border-dark-border">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-dark-text mb-4">风险分布</h3>
      <div class="grid grid-cols-4 gap-4">
        <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-center">
          <div class="text-2xl font-bold text-green-600 dark:text-green-400">{{ task.riskSummary.noRisk }}</div>
          <div class="text-sm text-green-600 dark:text-green-400">无风险</div>
        </div>
        <div class="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 text-center">
          <div class="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{{ task.riskSummary.lowRisk }}</div>
          <div class="text-sm text-yellow-600 dark:text-yellow-400">低风险</div>
        </div>
        <div class="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 text-center">
          <div class="text-2xl font-bold text-orange-600 dark:text-orange-400">{{ task.riskSummary.mediumRisk }}</div>
          <div class="text-sm text-orange-600 dark:text-orange-400">中风险</div>
        </div>
        <div class="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 text-center">
          <div class="text-2xl font-bold text-red-600 dark:text-red-400">{{ task.riskSummary.highRisk }}</div>
          <div class="text-sm text-red-600 dark:text-red-400">高风险</div>
        </div>
      </div>
    </div>

    <!-- 筛选控制 -->
    <div class="px-6 py-4 border-b border-gray-100 dark:border-dark-border">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-dark-text">检测结果</h3>
          <el-select v-model="riskFilter" placeholder="筛选风险等级" multiple clearable style="width: 200px" @change="handleFilterChange">
            <el-option label="无风险" value="no_risk" />
            <el-option label="低风险" value="low_risk" />
            <el-option label="中风险" value="medium_risk" />
            <el-option label="高风险" value="high_risk" />
          </el-select>
        </div>
        <div class="flex space-x-2">
          <el-button @click="exportResults" size="small">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            导出结果
          </el-button>
        </div>
      </div>
    </div>

    <!-- 检测结果列表 -->
    <div class="px-6 pb-6">
      <div class="bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-dark-border overflow-hidden">
        <el-table
          :data="filteredResults"
          style="width: 100%"
          v-loading="loading"
          max-height="400"
          class="modern-table"
        >
          <el-table-column prop="fileName" label="文件名" width="200" />
          
          <el-table-column label="原图" width="100" align="center">
            <template #default="scope">
              <div class="flex justify-center">
                <el-image
                  :src="scope.row.originalImage"
                  :preview-src-list="[scope.row.originalImage]"
                  fit="cover"
                  class="w-16 h-16 rounded-lg border border-gray-200 dark:border-dark-border"
                />
              </div>
            </template>
          </el-table-column>

          <el-table-column label="风险等级" width="120" align="center">
            <template #default="scope">
              <el-tag :type="getRiskTagType(scope.row.riskLevel)" size="small">
                {{ getRiskLevelText(scope.row.riskLevel) }}
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column label="置信度" align="center">
            <template #default="scope">
              <div class="flex flex-col items-center">
                <span class="text-sm font-medium">{{ scope.row.confidence }}%</span>
                <el-progress 
                  :percentage="scope.row.confidence" 
                  :stroke-width="4"
                  :show-text="false"
                  :color="getConfidenceColor(scope.row.confidence)"
                  class="w-full mt-1" />
              </div>
            </template>
          </el-table-column>

          <el-table-column label="相似图片" width="120" align="center">
            <template #default="scope">
              <span class="text-sm">{{ scope.row.similarImages?.length || 0 }} 张</span>
            </template>
          </el-table-column>

          <el-table-column prop="detectionTime" label="检测时间" width="160" align="center" />

          <el-table-column label="操作" width="120" align="center" fixed="right">
            <template #default="scope">
              <el-button 
                type="primary" 
                size="small" 
                @click="viewSimilarImages(scope.row)"
                :disabled="!scope.row.similarImages || scope.row.similarImages.length === 0">
                查看详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <!-- 底部操作 -->
    <template #footer>
      <div class="flex justify-between items-center px-6 py-4 border-t border-gray-100 dark:border-dark-border bg-gray-50 dark:bg-dark-card">
        <div class="text-sm text-gray-500 dark:text-dark-text-secondary">
          共 {{ filteredResults.length }} 条检测结果
        </div>
        <div class="flex space-x-3">
          <el-button @click="handleClose">关闭</el-button>
          <el-button type="primary" @click="exportResults">导出详情</el-button>
        </div>
      </div>
    </template>
  </el-dialog>

  <!-- 相似图片详情对话框 -->
  <SimilarImagesDialog v-model="showSimilarDialog" :detection-result="selectedResult" />
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { ElMessage } from 'element-plus';
import SimilarImagesDialog from './SimilarImagesDialog.vue';
import {
  getTaskResults,
  getRiskLevelText,
  type CopyrightDetectionTask,
  type DetectionResult,
  RiskLevel
} from '~/stores/copyright-detection';

// Props
const props = defineProps<{
  modelValue: boolean;
  task: CopyrightDetectionTask | null;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();

// 响应式数据
const dialogVisible = ref(false);
const loading = ref(false);
const showSimilarDialog = ref(false);
const selectedResult = ref<DetectionResult | null>(null);
const riskFilter = ref<string[]>([]);

// 监听 modelValue 变化
watch(() => props.modelValue, (val) => {
  dialogVisible.value = val;
  if (val && props.task) {
    loadResults();
  }
});

watch(dialogVisible, (val) => {
  emit('update:modelValue', val);
});

// 计算属性
const taskResults = computed(() => {
  if (!props.task) return [];
  return getTaskResults(props.task.id);
});

const filteredResults = computed(() => {
  let filtered = taskResults.value;

  // 风险等级筛选
  if (riskFilter.value.length > 0) {
    filtered = filtered.filter(result => riskFilter.value.includes(result.riskLevel));
  }

  return filtered;
});

// 方法
const loadResults = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 500);
};

const getRiskTagType = (riskLevel: RiskLevel): string => {
  const tagTypes = {
    [RiskLevel.NO_RISK]: 'success',
    [RiskLevel.LOW_RISK]: 'warning',
    [RiskLevel.MEDIUM_RISK]: 'danger',
    [RiskLevel.HIGH_RISK]: 'danger'
  };
  return tagTypes[riskLevel];
};

const getConfidenceColor = (confidence: number): string => {
  if (confidence >= 80) return '#f56565'; // 红色
  if (confidence >= 60) return '#ed8936'; // 橙色
  if (confidence >= 40) return '#ecc94b'; // 黄色
  return '#48bb78'; // 绿色
};

const handleFilterChange = () => {
  // 筛选变化时的处理
};

const viewSimilarImages = (result: DetectionResult) => {
  selectedResult.value = result;
  showSimilarDialog.value = true;
};

const exportResults = () => {
  ElMessage.success('正在导出检测结果...');
  // 这里应该实现实际的导出逻辑
};

const handleClose = () => {
  dialogVisible.value = false;
  riskFilter.value = [];
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
  background: theme('colors.gray.50');
}

.modern-table :deep(.el-table__header) {
  background: theme('colors.gray.50');
}

.modern-table :deep(.el-table th) {
  background: theme('colors.gray.50') !important;
  color: theme('colors.gray.700');
  font-weight: 600;
  border-bottom: 1px solid theme('colors.gray.200');
}

.modern-table :deep(.el-table td) {
  border-bottom: 1px solid theme('colors.gray.100');
}

.modern-table :deep(.el-table__row:hover > td) {
  background-color: theme('colors.blue.50') !important;
}

/* 暗色模式适配 */
.dark .modern-table {
  --el-table-border-color: theme('colors.gray.700');
  --el-table-bg-color: theme('colors.gray.800');
  --el-table-tr-bg-color: theme('colors.gray.800');
  --el-table-expanded-cell-bg-color: theme('colors.gray.700');
}

.dark .modern-table :deep(.el-table__header-wrapper) {
  background: theme('colors.gray.700');
}

.dark .modern-table :deep(.el-table__header) {
  background: theme('colors.gray.700');
}

.dark .modern-table :deep(.el-table th) {
  background: theme('colors.gray.700') !important;
  color: theme('colors.gray.200');
  border-bottom: 1px solid theme('colors.gray.600');
}

.dark .modern-table :deep(.el-table td) {
  background: theme('colors.gray.800') !important;
  color: theme('colors.gray.200');
  border-bottom: 1px solid theme('colors.gray.700');
}

.dark .modern-table :deep(.el-table__row:hover > td) {
  background-color: theme('colors.gray.700') !important;
}
</style>
