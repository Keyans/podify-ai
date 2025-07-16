<template>
  <div class="space-y-6">
    <!-- 页面标题 -->
    <div class="bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 rounded-2xl p-6 border border-primary-100 dark:border-primary-800">
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
          </svg>
        </div>
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-dark-text">侵权检测</h1>
          <p class="mt-1 text-sm text-gray-600 dark:text-dark-text-secondary">AI智能图片侵权检测和风险评估工具</p>
        </div>
      </div>
    </div>

    <!-- 统计卡片 -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-elegant dark:shadow-elegant-dark border border-gray-100 dark:border-dark-border hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-dark-text-secondary">无风险</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-dark-text">{{ stats.noRisk }}</p>
          </div>
          <div class="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-elegant dark:shadow-elegant-dark border border-gray-100 dark:border-dark-border hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-dark-text-secondary">低风险</p>
            <p class="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{{ stats.lowRisk }}</p>
          </div>
          <div class="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-elegant dark:shadow-elegant-dark border border-gray-100 dark:border-dark-border hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-dark-text-secondary">中风险</p>
            <p class="text-2xl font-bold text-orange-600 dark:text-orange-400">{{ stats.mediumRisk }}</p>
          </div>
          <div class="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-elegant dark:shadow-elegant-dark border border-gray-100 dark:border-dark-border hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-dark-text-secondary">高风险</p>
            <p class="text-2xl font-bold text-red-600 dark:text-red-400">{{ stats.highRisk }}</p>
          </div>
          <div class="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- 头部操作区域 -->
    <div class="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-elegant dark:shadow-elegant-dark border border-gray-100 dark:border-dark-border">
      <div class="flex justify-between items-center">
        <div class="flex items-center space-x-3">
          <button @click="showCreateDialog = true"
            class="inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
            <PlusIcon class="w-5 h-5 mr-2" />
            新建检测
          </button>
          <button @click="exportTable"
            class="inline-flex items-center px-4 py-2.5 bg-white dark:bg-dark-card text-gray-700 dark:text-dark-text font-medium rounded-lg border border-gray-300 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-border shadow-sm hover:shadow-md transition-all duration-200">
            <ArrowDownTrayIcon class="w-5 h-5 mr-2" />
            导出表格
          </button>

          <!-- 批量操作按钮 -->
          <div v-if="selectedRows.length > 0" class="flex items-center space-x-2 ml-4 pl-4 border-l border-gray-200 dark:border-dark-border">
            <span class="text-sm text-gray-600 dark:text-dark-text-secondary">
              已选择 {{ selectedRows.length }} 项
            </span>
            <button @click="batchExport"
              class="inline-flex items-center px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-all duration-200">
              <ArrowDownTrayIcon class="w-4 h-4 mr-1" />
              批量导出
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 检测任务列表 -->
    <div class="bg-white dark:bg-dark-surface rounded-xl shadow-elegant dark:shadow-elegant-dark border border-gray-100 dark:border-dark-border overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-100 dark:border-dark-border">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-dark-text">检测任务列表</h3>
        <p class="text-sm text-gray-600 dark:text-dark-text-secondary mt-1">管理和监控您的所有侵权检测任务</p>
      </div>

      <div class="overflow-x-auto">
        <el-table
          :data="filteredTasks"
          style="width: 100%"
          v-loading="loading"
          :header-cell-style="{
            backgroundColor: 'var(--el-bg-color-page)',
            color: 'var(--el-text-color-primary)',
            fontWeight: '600',
            borderBottom: '1px solid var(--el-border-color-light)'
          }"
          :row-style="{ backgroundColor: 'transparent' }"
          class="modern-table"
          @selection-change="handleSelectionChange">

          <!-- 复选框列 -->
          <el-table-column type="selection" width="55" align="center" />

          <el-table-column prop="id" label="检测ID" width="120">
            <template #default="scope">
              <div class="font-mono text-sm font-medium text-primary-600 dark:text-primary-400">
                {{ scope.row.id }}
              </div>
            </template>
          </el-table-column>

          <el-table-column label="检测类型" width="200">
            <template #default>
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <svg class="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                </div>
                <div>
                  <div class="font-medium text-gray-900 dark:text-dark-text">侵权检测</div>
                  <div class="text-sm text-gray-500 dark:text-dark-text-secondary">AI智能检测</div>
                </div>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="检测数量">
            <template #default="scope">
              <div class="space-y-1">
                <div class="flex items-center space-x-2">
                  <span class="text-xs text-gray-500 dark:text-dark-text-secondary">目标:</span>
                  <span class="font-medium text-gray-900 dark:text-dark-text">{{ scope.row.imageCount }}</span>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="text-xs text-gray-500 dark:text-dark-text-secondary">完成:</span>
                  <span class="font-medium text-green-600 dark:text-green-400">{{ scope.row.completedCount }}</span>
                </div>
                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                  <div class="bg-green-500 h-1.5 rounded-full transition-all duration-300"
                       :style="{ width: `${(scope.row.completedCount / scope.row.imageCount) * 100}%` }"></div>
                </div>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="检测状态" width="150">
            <template #default="scope">
              <div class="space-y-2">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      :class="getStatusClass(scope.row.status)">
                  <span class="w-1.5 h-1.5 rounded-full mr-1.5" :class="getStatusDotClass(scope.row.status)"></span>
                  {{ getStatusText(scope.row.status) }}
                </span>
                <div v-if="scope.row.status === DetectionStatus.FAILED">
                  <button @click="viewFailureReason(scope.row)"
                    class="text-xs text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 underline">
                    查看原因
                  </button>
                </div>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="风险分布" width="200">
            <template #default="scope">
              <div v-if="scope.row.riskSummary" class="flex flex-wrap gap-1">
                <span v-if="scope.row.riskSummary.noRisk > 0"
                      class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                  无风险: {{ scope.row.riskSummary.noRisk }}
                </span>
                <span v-if="scope.row.riskSummary.lowRisk > 0"
                      class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                  低风险: {{ scope.row.riskSummary.lowRisk }}
                </span>
                <span v-if="scope.row.riskSummary.mediumRisk > 0"
                      class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400">
                  中风险: {{ scope.row.riskSummary.mediumRisk }}
                </span>
                <span v-if="scope.row.riskSummary.highRisk > 0"
                      class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                  高风险: {{ scope.row.riskSummary.highRisk }}
                </span>
              </div>
              <span v-else class="text-gray-400 dark:text-dark-text-secondary">-</span>
            </template>
          </el-table-column>

          <el-table-column prop="operator" label="创建人" width="100">
            <template #default="scope">
              <div class="font-medium text-gray-900 dark:text-dark-text">{{ scope.row.operator }}</div>
            </template>
          </el-table-column>

          <el-table-column prop="createTime" label="创建时间" width="160">
            <template #default="scope">
              <div class="text-sm text-gray-600 dark:text-dark-text-secondary">{{ scope.row.createTime }}</div>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="180">
            <template #default="scope">
              <div class="flex items-center space-x-2">
                <button @click="viewDetails(scope.row)"
                  class="inline-flex items-center px-3 py-1.5 text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 bg-primary-50 dark:bg-primary-900/20 hover:bg-primary-100 dark:hover:bg-primary-900/30 rounded-lg transition-all duration-200">
                  查看详情
                </button>

                <!-- 更多操作下拉菜单 -->
                <el-dropdown @command="handleMoreAction" trigger="click">
                  <button class="inline-flex items-center px-2 py-1.5 text-sm font-medium text-gray-600 dark:text-dark-text-secondary hover:text-gray-700 dark:hover:text-dark-text bg-gray-50 dark:bg-dark-card hover:bg-gray-100 dark:hover:bg-dark-border rounded-lg transition-all duration-200">
                    更多
                    <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item :command="{action: 'smartCrop', row: scope.row}">
                        <div class="flex items-center space-x-2">
                          <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011-1h2a1 1 0 011 1v18a1 1 0 01-1 1H4a1 1 0 01-1-1V1a1 1 0 011-1h2a1 1 0 011 1v3m0 0h8m-8 0H4a1 1 0 00-1 1v3a1 1 0 001 1h3m0 0h10m0 0h3a1 1 0 001-1V5a1 1 0 00-1-1h-3m-3 0v8a1 1 0 01-1 1H8a1 1 0 01-1-1V4"></path>
                          </svg>
                          <span>智能裁图</span>
                        </div>
                      </el-dropdown-item>
                      <el-dropdown-item :command="{action: 'titleGenerate', row: scope.row}">
                        <div class="flex items-center space-x-2">
                          <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                          </svg>
                          <span>标题生成</span>
                        </div>
                      </el-dropdown-item>
                      <el-dropdown-item :command="{action: 'batchListing', row: scope.row}">
                        <div class="flex items-center space-x-2">
                          <svg class="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                          </svg>
                          <span>批量刊登</span>
                        </div>
                      </el-dropdown-item>
                      <el-dropdown-item :command="{action: 'oneClickCutout', row: scope.row}">
                        <div class="flex items-center space-x-2">
                          <svg class="w-4 h-4 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                          </svg>
                          <span>一键抠图</span>
                        </div>
                      </el-dropdown-item>
                      <el-dropdown-item :command="{action: 'superSplit', row: scope.row}">
                        <div class="flex items-center space-x-2">
                          <svg class="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                          </svg>
                          <span>超级裂变</span>
                        </div>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 分页 -->
      <div class="flex justify-between items-center px-6 py-4 border-t border-gray-100 dark:border-dark-border bg-gray-50 dark:bg-dark-card/50">
        <div class="text-sm text-gray-600 dark:text-dark-text-secondary">
          共 {{ pagination.total }} 条记录
        </div>
        <el-pagination
          v-model:current-page="pagination.currentPage"
          v-model:page-size="pagination.pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="pagination.total"
          layout="sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          class="modern-pagination"
        />
      </div>
    </div>
  </div>
  <!-- 新建检测对话框 -->
  <CreateDetectionDialog v-model="showCreateDialog" @success="refreshData" />

  <!-- 查看详情对话框 -->
  <ViewDetailsDialog v-model="showDetailsDialog" :task="selectedTask" />
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { PlusIcon, ArrowDownTrayIcon } from '@heroicons/vue/24/outline';
import CreateDetectionDialog from './components/CreateDetectionDialog.vue';
import ViewDetailsDialog from './components/ViewDetailsDialog.vue';
import {
  copyrightDetectionStore,
  getStatusText,
  type CopyrightDetectionTask,
  DetectionStatus
} from '@/store/copyright-detection';

// 响应式数据
const loading = ref(false);
const showCreateDialog = ref(false);
const showDetailsDialog = ref(false);
const selectedTask = ref<CopyrightDetectionTask | null>(null);
const selectedRows = ref<CopyrightDetectionTask[]>([]);

// 筛选条件
const statusFilter = ref('');
const riskFilter = ref<string[]>([]);
const searchKeyword = ref('');

// 分页
const pagination = ref({
  currentPage: 1,
  pageSize: 10,
  total: 0
});

// 计算属性
const stats = computed(() => {
  const completedTasks = copyrightDetectionStore.tasks.filter(task => task.status === DetectionStatus.COMPLETED);
  return completedTasks.reduce((acc, task) => {
    if (task.riskSummary) {
      acc.noRisk += task.riskSummary.noRisk;
      acc.lowRisk += task.riskSummary.lowRisk;
      acc.mediumRisk += task.riskSummary.mediumRisk;
      acc.highRisk += task.riskSummary.highRisk;
    }
    return acc;
  }, { noRisk: 0, lowRisk: 0, mediumRisk: 0, highRisk: 0 });
});

const filteredTasks = computed(() => {
  let filtered = copyrightDetectionStore.tasks;

  // 状态筛选
  if (statusFilter.value) {
    filtered = filtered.filter(task => task.status === statusFilter.value);
  }

  // 风险等级筛选
  if (riskFilter.value.length > 0) {
    filtered = filtered.filter(task => {
      if (!task.riskSummary) return false;
      return riskFilter.value.some(level => {
        switch (level) {
          case 'no_risk':
            return task.riskSummary!.noRisk > 0;
          case 'low_risk':
            return task.riskSummary!.lowRisk > 0;
          case 'medium_risk':
            return task.riskSummary!.mediumRisk > 0;
          case 'high_risk':
            return task.riskSummary!.highRisk > 0;
          default:
            return false;
        }
      });
    });
  }

  // 搜索筛选
  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase();
    filtered = filtered.filter(task =>
      task.id.toLowerCase().includes(keyword) ||
      task.operator.toLowerCase().includes(keyword)
    );
  }

  pagination.value.total = filtered.length;

  const start = (pagination.value.currentPage - 1) * pagination.value.pageSize;
  const end = start + pagination.value.pageSize;
  return filtered.slice(start, end);
});

// 生命周期
onMounted(() => {
  loadTasks();
});

// 方法
const loadTasks = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 500);
};



const handleSelectionChange = (selection: CopyrightDetectionTask[]) => {
  selectedRows.value = selection;
};

const viewDetails = (task: CopyrightDetectionTask) => {
  selectedTask.value = task;
  showDetailsDialog.value = true;
};

const handleMoreAction = (command: { action: string; row: CopyrightDetectionTask }) => {
  const { action, row } = command;

  switch (action) {
    case 'titleGenerate':
      createTitleGenerateTask(row);
      break;
    case 'batchListing':
      createBatchListingTask(row);
      break;
    case 'smartCrop':
      createSmartCropTask(row);
      break;
    case 'oneClickCutout':
      createOneClickCutoutTask(row);
      break;
    case 'superSplit':
      createSuperSplitTask(row);
      break;
  }
};

// 获取状态样式类
const getStatusClass = (status: DetectionStatus) => {
  const statusClasses = {
    [DetectionStatus.PENDING]: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
    [DetectionStatus.PROCESSING]: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    [DetectionStatus.COMPLETED]: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    [DetectionStatus.FAILED]: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
  };
  return statusClasses[status] || statusClasses[DetectionStatus.PENDING];
};

// 获取状态点样式类
const getStatusDotClass = (status: DetectionStatus) => {
  const dotClasses = {
    [DetectionStatus.PENDING]: 'bg-gray-400',
    [DetectionStatus.PROCESSING]: 'bg-blue-400',
    [DetectionStatus.COMPLETED]: 'bg-green-400',
    [DetectionStatus.FAILED]: 'bg-red-400'
  };
  return dotClasses[status] || dotClasses[DetectionStatus.PENDING];
};

// 查看失败原因
const viewFailureReason = (task: CopyrightDetectionTask) => {
  ElMessage.info(`任务 ${task.id} 失败原因：网络连接超时`);
};

const exportTable = () => {
  ElMessage.success('导出表格功能开发中...');
};

const batchExport = () => {
  ElMessage.success(`正在批量导出 ${selectedRows.value.length} 个任务...`);
};

const refreshData = () => {
  ElMessage.success('侵权检测任务创建成功！');
  loadTasks();
};

// 创建其他任务的方法
const createTitleGenerateTask = (detectionData: CopyrightDetectionTask) => {
  ElMessage.success(`正在为检测任务 ${detectionData.id} 创建标题生成任务...`);
};

const createBatchListingTask = (detectionData: CopyrightDetectionTask) => {
  ElMessage.success(`正在为检测任务 ${detectionData.id} 创建批量刊登任务...`);
};

const createSmartCropTask = (detectionData: CopyrightDetectionTask) => {
  ElMessage.success(`正在为检测任务 ${detectionData.id} 创建智能裁图任务...`);
};

const createOneClickCutoutTask = (detectionData: CopyrightDetectionTask) => {
  ElMessage.success(`正在为检测任务 ${detectionData.id} 创建一键抠图任务...`);
};

const createSuperSplitTask = (detectionData: CopyrightDetectionTask) => {
  ElMessage.success(`正在为检测任务 ${detectionData.id} 创建超级裂变任务...`);
};

// 分页相关方法
const handleSizeChange = (val: number) => {
  pagination.value.pageSize = val;
  pagination.value.currentPage = 1;
  loadTasks();
};

const handleCurrentChange = (val: number) => {
  pagination.value.currentPage = val;
  loadTasks();
};
</script>

<style scoped>
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

.modern-pagination :deep(.el-pagination) {
  --el-pagination-font-size: 14px;
  --el-pagination-bg-color: theme('colors.white');
  --el-pagination-text-color: theme('colors.gray.600');
  --el-pagination-border-radius: 6px;
  --el-pagination-button-color: theme('colors.gray.600');
  --el-pagination-button-bg-color: theme('colors.white');
  --el-pagination-button-disabled-color: theme('colors.gray.400');
  --el-pagination-button-disabled-bg-color: theme('colors.gray.100');
  --el-pagination-hover-color: theme('colors.blue.600');
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
