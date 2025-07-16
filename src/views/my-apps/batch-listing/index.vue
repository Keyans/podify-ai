<template>
  <div class="space-y-6">
    <!-- 页面标题 -->
    <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-blue-100 dark:border-blue-800">
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
        </div>
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-dark-text">批量刊登</h1>
          <p class="mt-1 text-sm text-gray-600 dark:text-dark-text-secondary">批量发布商品到各大电商平台</p>
        </div>
      </div>
    </div>

    <!-- 统计卡片 -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-elegant dark:shadow-elegant-dark border border-gray-100 dark:border-dark-border hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-dark-text-secondary">刊登任务总数</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-dark-text">{{ totalTasks }}</p>
          </div>
          <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-elegant dark:shadow-elegant-dark border border-gray-100 dark:border-dark-border hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-dark-text-secondary">成功率</p>
            <p class="text-2xl font-bold text-green-600 dark:text-green-400">{{ successRate }}%</p>
          </div>
          <div class="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-elegant dark:shadow-elegant-dark border border-gray-100 dark:border-dark-border hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-dark-text-secondary">今日刊登</p>
            <p class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ todayListings }}</p>
          </div>
          <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-elegant dark:shadow-elegant-dark border border-gray-100 dark:border-dark-border hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-dark-text-secondary">处理中任务</p>
            <p class="text-2xl font-bold text-orange-600 dark:text-orange-400">{{ processingTasks }}</p>
          </div>
          <div class="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- 操作区域 -->
    <div class="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-elegant dark:shadow-elegant-dark border border-gray-100 dark:border-dark-border">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div class="flex items-center space-x-3">
          <button @click="showCreateDialog = true"
            class="inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            新建刊登任务
          </button>
          <button @click="exportTasks"
            class="inline-flex items-center px-4 py-2.5 bg-white dark:bg-dark-card text-gray-700 dark:text-dark-text font-medium rounded-lg border border-gray-300 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-border shadow-sm hover:shadow-md transition-all duration-200">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
            </svg>
            导出任务
          </button>

          <!-- 批量操作按钮 -->
          <div v-if="selectedRows.length > 0" class="flex items-center space-x-2 ml-4 pl-4 border-l border-gray-200 dark:border-dark-border">
            <span class="text-sm text-gray-600 dark:text-dark-text-secondary">
              已选择 {{ selectedRows.length }} 项
            </span>
            <button @click="batchCancel"
              class="inline-flex items-center px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-all duration-200">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
              批量取消
            </button>
          </div>
        </div>

        <!-- 搜索框 -->
        <div class="relative">
          <input
            v-model="searchKeyword"
            type="text"
            placeholder="搜索任务ID、平台..."
            class="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-dark-card dark:text-dark-text"
            @input="handleSearch"
          />
          <svg class="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
      </div>
    </div>

    <!-- 任务列表 -->
    <div class="bg-white dark:bg-dark-surface rounded-xl shadow-elegant dark:shadow-elegant-dark border border-gray-100 dark:border-dark-border overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-100 dark:border-dark-border">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-dark-text">批量刊登任务</h3>
        <p class="text-sm text-gray-600 dark:text-dark-text-secondary mt-1">管理您的批量刊登任务</p>
      </div>

      <div class="overflow-x-auto">
        <el-table
          :data="currentPageTasks"
          style="width: 100%"
          v-loading="loading"
          @selection-change="handleSelectionChange"
          class="modern-table"
          :header-cell-style="{
            backgroundColor: 'var(--el-bg-color-page)',
            color: 'var(--el-text-color-primary)',
            fontWeight: '600',
            borderBottom: '1px solid var(--el-border-color-light)'
          }"
          :row-style="{ backgroundColor: 'transparent' }"
        >
          <el-table-column type="selection" width="55" />

          <el-table-column prop="id" label="任务ID" width="100">
            <template #default="scope">
              <span class="font-medium text-gray-900 dark:text-dark-text">{{ scope.row.id }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="platform" label="刊登平台" width="120">
            <template #default="scope">
              <div class="flex items-center">
                <span class="font-medium text-gray-900 dark:text-dark-text">{{ scope.row.platform }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="productCount" label="商品数量" width="120">
            <template #default="scope">
              <div class="flex items-center">
                <span class="font-medium text-gray-900 dark:text-dark-text">{{ scope.row.productCount }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="successCount" label="成功数量" width="120">
            <template #default="scope">
              <div class="flex items-center">
                <span class="font-medium text-green-600 dark:text-green-400">{{ scope.row.successCount }}</span>
                <span class="text-gray-500 dark:text-dark-text-secondary ml-1">/ {{ scope.row.productCount }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="status" label="状态" width="120">
            <template #default="scope">
              <span :class="getStatusClass(scope.row.status)" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                {{ getStatusText(scope.row.status) }}
              </span>
            </template>
          </el-table-column>

          <el-table-column prop="operator" label="操作人" width="120">
            <template #default="scope">
              <span class="text-gray-700 dark:text-dark-text-secondary">{{ scope.row.operator }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="templateName" label="刊登模板" width="150">
            <template #default="scope">
              <span class="text-gray-700 dark:text-dark-text-secondary">{{ scope.row.templateName || '-' }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="createTime" label="创建时间" width="180">
            <template #default="scope">
              <span class="text-gray-700 dark:text-dark-text-secondary">{{ scope.row.createTime }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="180">
            <template #default="scope">
              <div class="flex items-center space-x-2">
                <button @click="viewTaskDetails(scope.row)"
                  class="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-all duration-200">
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
                      <el-dropdown-item :command="{action: 'cancel', row: scope.row}" v-if="scope.row.status === 'processing'">
                        <div class="flex items-center space-x-2">
                          <svg class="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                          </svg>
                          <span>取消任务</span>
                        </div>
                      </el-dropdown-item>
                      <el-dropdown-item :command="{action: 'retry', row: scope.row}" v-if="scope.row.status === 'failed' || scope.row.status === 'partial_failed'">
                        <div class="flex items-center space-x-2">
                          <svg class="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                          </svg>
                          <span>重试任务</span>
                        </div>
                      </el-dropdown-item>
                      <el-dropdown-item :command="{action: 'export', row: scope.row}">
                        <div class="flex items-center space-x-2">
                          <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                          </svg>
                          <span>导出结果</span>
                        </div>
                      </el-dropdown-item>
                      <el-dropdown-item :command="{action: 'download', row: scope.row}" v-if="scope.row.status === 'completed'">
                        <div class="flex items-center space-x-2">
                          <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                          </svg>
                          <span>下载刊登数据表</span>
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

  <!-- 新建刊登任务对话框 -->
  <CreateListingDialog v-model="showCreateDialog" @success="refreshData" />

  <!-- 查看详情对话框 -->
  <ViewDetailsDialog v-model="showDetailsDialog" :task="selectedTask" />
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
// import { PlusIcon, ArrowDownTrayIcon } from '@heroicons/vue/24/outline';
import CreateListingDialog from './components/CreateListingDialog.vue';
import ViewDetailsDialog from './components/ViewDetailsDialog.vue';

// 类型定义
interface ListingTask {
  id: string;
  platform: string;
  productCount: number;
  successCount: number;
  status: 'completed' | 'processing' | 'failed' | 'partial_failed' | 'pending';
  operator: string;
  templateName?: string;
  createTime: string;
  templateFile?: string;
  products?: string[];
}

// 响应式数据
const loading = ref(false);
const showCreateDialog = ref(false);
const showDetailsDialog = ref(false);
const selectedTask = ref<ListingTask | null>(null);
const selectedRows = ref<ListingTask[]>([]);
const searchKeyword = ref('');

// 统计数据
const totalTasks = ref(86);
const successRate = ref(92.5);
const todayListings = ref(12);
const processingTasks = ref(3);

// 分页数据
const pagination = ref({
  currentPage: 1,
  pageSize: 10,
  total: 0
});

// 模拟数据
const listingTasks = ref<ListingTask[]>([
  {
    id: 'LST001',
    platform: '亚马逊',
    productCount: 25,
    successCount: 23,
    status: 'completed',
    operator: '张三',
    templateName: 'Amazon商品刊登模板.xlsx',
    createTime: '2024-01-15 14:30:25'
  },
  {
    id: 'LST002',
    platform: 'Temu',
    productCount: 18,
    successCount: 15,
    status: 'partial_failed',
    operator: '李四',
    templateName: 'Temu批量上传模板.csv',
    createTime: '2024-01-15 13:45:12'
  },
  {
    id: 'LST003',
    platform: 'Shein',
    productCount: 30,
    successCount: 0,
    status: 'processing',
    operator: '王五',
    templateName: 'Shein服装类目模板.xlsm',
    createTime: '2024-01-15 12:20:08'
  },
  {
    id: 'LST004',
    platform: '亚马逊',
    productCount: 12,
    successCount: 0,
    status: 'failed',
    operator: '赵六',
    templateName: 'Amazon变体商品模板.csv',
    createTime: '2024-01-15 11:15:33'
  },
  {
    id: 'LST005',
    platform: 'Temu',
    productCount: 8,
    successCount: 8,
    status: 'completed',
    operator: '钱七',
    templateName: '通用商品信息模板.xlsx',
    createTime: '2024-01-15 10:30:45'
  }
]);

// 计算属性
const currentPageTasks = computed(() => {
  let filtered = listingTasks.value;

  // 搜索过滤
  if (searchKeyword.value) {
    filtered = filtered.filter(task =>
      task.id.toLowerCase().includes(searchKeyword.value.toLowerCase()) ||
      task.platform.toLowerCase().includes(searchKeyword.value.toLowerCase())
    );
  }

  const start = (pagination.value.currentPage - 1) * pagination.value.pageSize;
  const end = start + pagination.value.pageSize;
  return filtered.slice(start, end);
});

// 初始化
onMounted(() => {
  loadTasks();
});

// 方法
const loadTasks = () => {
  loading.value = true;
  setTimeout(() => {
    pagination.value.total = listingTasks.value.length;
    loading.value = false;
  }, 500);
};

const getStatusClass = (status: string) => {
  const statusClasses: Record<string, string> = {
    'completed': 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
    'processing': 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
    'failed': 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300',
    'partial_failed': 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300',
    'pending': 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300'
  };
  return statusClasses[status] || statusClasses['pending'];
};

const getStatusText = (status: string) => {
  const statusTexts: Record<string, string> = {
    'completed': '已完成',
    'processing': '处理中',
    'failed': '失败',
    'partial_failed': '部分失败',
    'pending': '等待中'
  };
  return statusTexts[status] || '未知';
};

const viewTaskDetails = (task: ListingTask) => {
  selectedTask.value = task;
  showDetailsDialog.value = true;
};

const handleMoreAction = (command: { action: string; row: ListingTask }) => {
  const { action, row } = command;

  switch (action) {
    case 'cancel':
      cancelTask(row);
      break;
    case 'retry':
      retryTask(row);
      break;
    case 'export':
      exportTaskResult(row);
      break;
    case 'download':
      downloadListingData(row);
      break;
    default:
      ElMessage.warning('未知操作');
  }
};

const handleSearch = () => {
  pagination.value.currentPage = 1;
  loadTasks();
};

const cancelTask = (task: ListingTask) => {
  ElMessage.success(`已取消任务：${task.id}`);
  // 这里应该调用取消任务API
};

const retryTask = (task: ListingTask) => {
  ElMessage.success(`正在重试任务：${task.id}`);
  // 这里应该调用重试任务API
};

const exportTaskResult = (task: ListingTask) => {
  ElMessage.success(`正在导出任务结果：${task.id}`);
  // 这里应该调用导出任务结果API
};

const downloadListingData = (task: ListingTask) => {
  ElMessage.success(`正在下载刊登数据表：${task.id}`);
  // 这里应该调用下载刊登数据表API
};

const exportTasks = () => {
  ElMessage.success('导出任务功能开发中...');
};

const batchCancel = () => {
  ElMessage.success(`正在批量取消 ${selectedRows.value.length} 个任务...`);
  // 这里应该调用批量取消API
};

const refreshData = () => {
  ElMessage.success('操作成功！');
  loadTasks();
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

// 选择相关方法
const handleSelectionChange = (selection: ListingTask[]) => {
  selectedRows.value = selection;
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

.shadow-elegant {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.shadow-elegant-dark {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
}

.modern-pagination :deep(.el-pagination) {
  justify-content: flex-end;
}

.modern-pagination :deep(.el-pagination__sizes) {
  margin-right: 16px;
}

.modern-pagination :deep(.el-pagination__total) {
  margin-right: auto;
}
</style>
