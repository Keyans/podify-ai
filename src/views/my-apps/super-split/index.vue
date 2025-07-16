<template>
  <div class="space-y-6">
    <!-- 页面标题 -->
    <div class="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-purple-100 dark:border-purple-800">
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        </div>
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-dark-text">超级裂变</h1>
          <p class="mt-1 text-sm text-gray-600 dark:text-dark-text-secondary">AI智能图片裂变和多样化生成工具</p>
        </div>
      </div>
    </div>
    <!-- 统计卡片 -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-elegant dark:shadow-elegant-dark border border-gray-100 dark:border-dark-border hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-dark-text-secondary">总裂变数</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-dark-text">{{ totalSplits }}</p>
          </div>
          <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
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
              <p class="text-sm font-medium text-gray-600 dark:text-dark-text-secondary">今日裂变</p>
              <p class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ todaySplits }}</p>
            </div>
            <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-elegant dark:shadow-elegant-dark border border-gray-100 dark:border-dark-border hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600 dark:text-dark-text-secondary">处理中</p>
              <p class="text-2xl font-bold text-orange-600 dark:text-orange-400">{{ processingCount }}</p>
            </div>
            <div class="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
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
            class="inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
            <PlusIcon class="w-5 h-5 mr-2" />
            新建裂变
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
              class="inline-flex items-center px-3 py-1.5 bg-purple-500 hover:bg-purple-600 text-white text-sm font-medium rounded-lg transition-all duration-200">
              <ArrowDownTrayIcon class="w-4 h-4 mr-1" />
              批量导出
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 裂变任务列表 -->
    <div class="bg-white dark:bg-dark-surface rounded-xl shadow-elegant dark:shadow-elegant-dark border border-gray-100 dark:border-dark-border overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-100 dark:border-dark-border">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-dark-text">裂变任务列表</h3>
        <p class="text-sm text-gray-600 dark:text-dark-text-secondary mt-1">管理和监控您的所有裂变任务</p>
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

            <el-table-column prop="id" label="任务ID" width="120">
              <template #default="scope">
                <span class="font-mono text-sm text-gray-600 dark:text-dark-text-secondary">{{ scope.row.id }}</span>
              </template>
            </el-table-column>

            <el-table-column label="裂变数量" width="150">
              <template #default="scope">
                <div class="flex items-center space-x-2">
                  <span class="text-sm text-gray-600 dark:text-dark-text-secondary">目标:</span>
                  <span class="font-medium text-gray-900 dark:text-dark-text">{{ scope.row.targetCount }}</span>
                  <span class="text-gray-400">|</span>
                  <span class="text-sm text-gray-600 dark:text-dark-text-secondary">裂变:</span>
                  <span class="font-medium text-purple-600 dark:text-purple-400">{{ scope.row.splitCount }}</span>
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="status" label="裂变状态" width="120">
              <template #default="scope">
                <span :class="getStatusClass(scope.row.status)" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                  {{ getStatusText(scope.row.status) }}
                </span>
              </template>
            </el-table-column>

            <el-table-column prop="successCount" label="成功数量" width="100">
              <template #default="scope">
                <span class="text-sm font-medium text-green-600 dark:text-green-400">{{ scope.row.successCount }}</span>
              </template>
            </el-table-column>

            <el-table-column prop="operator" label="操作人" width="100">
              <template #default="scope">
                <div class="flex items-center space-x-2">
                  <div class="w-6 h-6 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex items-center justify-center">
                    <span class="text-white text-xs font-medium">{{ scope.row.operator.charAt(0) }}</span>
                  </div>
                  <span class="text-sm text-gray-900 dark:text-dark-text">{{ scope.row.operator }}</span>
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="createTime" label="创建时间" width="180">
              <template #default="scope">
                <div class="text-sm text-gray-600 dark:text-dark-text-secondary">
                  {{ scope.row.createTime }}
                </div>
              </template>
            </el-table-column>

            <el-table-column label="操作" width="180">
              <template #default="scope">
                <div class="flex items-center space-x-2">
                  <button @click="viewDetails(scope.row)"
                    class="inline-flex items-center px-3 py-1.5 text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-lg transition-all duration-200">
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
                            <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                            </svg>
                            <span>批量刊登</span>
                          </div>
                        </el-dropdown-item>
                        <el-dropdown-item :command="{action: 'smartCrop', row: scope.row}">
                          <div class="flex items-center space-x-2">
                            <svg class="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                            <span>智能裁图</span>
                          </div>
                        </el-dropdown-item>
                        <el-dropdown-item :command="{action: 'oneClickCutout', row: scope.row}">
                          <div class="flex items-center space-x-2">
                            <svg class="w-4 h-4 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2"></path>
                            </svg>
                            <span>一键抠图</span>
                          </div>
                        </el-dropdown-item>
                        <el-dropdown-item :command="{action: 'copyrightDetection', row: scope.row}">
                          <div class="flex items-center space-x-2">
                            <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                            </svg>
                            <span>侵权检测</span>
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

  <!-- 新建裂变对话框 -->
  <CreateSplitDialog v-model="showCreateDialog" @success="refreshData" />

  <!-- 查看详情对话框 -->
  <ViewDetailsDialog v-model="showDetailsDialog" :task="selectedTask" />
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { PlusIcon, ArrowDownTrayIcon } from '@heroicons/vue/24/outline';
import CreateSplitDialog from './components/CreateSplitDialog.vue';
import ViewDetailsDialog from './components/ViewDetailsDialog.vue';

// 类型定义
interface SplitTask {
  id: string;
  targetCount: number;
  splitCount: number;
  status: 'completed' | 'processing' | 'failed' | 'pending';
  successCount: number;
  operator: string;
  createTime: string;
}

// 响应式数据
const loading = ref(false);
const showCreateDialog = ref(false);
const showDetailsDialog = ref(false);
const selectedTask = ref<SplitTask | null>(null);
const selectedRows = ref<SplitTask[]>([]);

// 统计数据
const totalSplits = ref(1248);
const successRate = ref(94.2);
const todaySplits = ref(156);
const processingCount = ref(8);

// 分页数据
const pagination = ref({
  currentPage: 1,
  pageSize: 20,
  total: 0
});



// 模拟数据
const splitTasks = ref<SplitTask[]>([
  {
    id: 'SP001',
    targetCount: 50,
    splitCount: 3,
    status: 'completed',
    successCount: 150,
    operator: '张三',
    createTime: '2024-01-15 14:30:25'
  },
  {
    id: 'SP002',
    targetCount: 30,
    splitCount: 5,
    status: 'processing',
    successCount: 120,
    operator: '李四',
    createTime: '2024-01-15 13:45:12'
  },
  {
    id: 'SP003',
    targetCount: 80,
    splitCount: 2,
    status: 'completed',
    successCount: 160,
    operator: '王五',
    createTime: '2024-01-15 12:20:08'
  },
  {
    id: 'SP004',
    targetCount: 25,
    splitCount: 4,
    status: 'failed',
    successCount: 0,
    operator: '赵六',
    createTime: '2024-01-15 11:15:33'
  },
  {
    id: 'SP005',
    targetCount: 60,
    splitCount: 3,
    status: 'pending',
    successCount: 0,
    operator: '钱七',
    createTime: '2024-01-15 10:30:45'
  },
  {
    id: 'SP006',
    targetCount: 40,
    splitCount: 5,
    status: 'completed',
    successCount: 200,
    operator: '孙八',
    createTime: '2024-01-15 09:45:22'
  },
  {
    id: 'SP007',
    targetCount: 35,
    splitCount: 2,
    status: 'processing',
    successCount: 45,
    operator: '周九',
    createTime: '2024-01-15 08:20:15'
  },
  {
    id: 'SP008',
    targetCount: 70,
    splitCount: 4,
    status: 'completed',
    successCount: 280,
    operator: '吴十',
    createTime: '2024-01-14 16:30:40'
  },
  {
    id: 'SP009',
    targetCount: 20,
    splitCount: 3,
    status: 'completed',
    successCount: 60,
    operator: '郑一',
    createTime: '2024-01-14 15:15:28'
  },
  {
    id: 'SP010',
    targetCount: 55,
    splitCount: 5,
    status: 'processing',
    successCount: 180,
    operator: '王二',
    createTime: '2024-01-14 14:45:55'
  }
]);



// 计算属性
const currentPageTasks = computed(() => {
  const start = (pagination.value.currentPage - 1) * pagination.value.pageSize;
  const end = start + pagination.value.pageSize;
  return splitTasks.value.slice(start, end);
});

// 初始化
onMounted(() => {
  loadSplitTasks();
});

// 方法
const loadSplitTasks = () => {
  loading.value = true;
  setTimeout(() => {
    pagination.value.total = splitTasks.value.length;
    loading.value = false;
  }, 500);
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

const handleSelectionChange = (selection: SplitTask[]) => {
  selectedRows.value = selection;
};

const viewDetails = (task: SplitTask) => {
  selectedTask.value = task;
  showDetailsDialog.value = true;
};

const handleMoreAction = (command: { action: string; row: SplitTask }) => {
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
    case 'copyrightDetection':
      createCopyrightDetectionTask(row);
      break;
  }
};

const exportTable = () => {
  ElMessage.success('导出表格功能开发中...');
};

const batchExport = () => {
  ElMessage.success(`正在批量导出 ${selectedRows.value.length} 个任务...`);
};

const refreshData = () => {
  ElMessage.success('裂变任务创建成功！');
  // 刷新任务列表
  loadSplitTasks();
};

// 创建标题生成任务
const createTitleGenerateTask = (splitData: SplitTask) => {
  ElMessage.success(`正在为裂变任务 ${splitData.id} 创建标题生成任务...`);
  // 这里应该打开标题生成任务创建弹窗，并预填充裂变结果
};

// 创建批量刊登任务
const createBatchListingTask = (splitData: SplitTask) => {
  ElMessage.success(`正在为裂变任务 ${splitData.id} 创建批量刊登任务...`);
  // 这里应该打开批量刊登任务创建弹窗，并预填充裂变结果
};

// 创建智能裁图任务
const createSmartCropTask = (splitData: SplitTask) => {
  ElMessage.success(`正在为裂变任务 ${splitData.id} 创建智能裁图任务...`);
  // 这里应该打开智能裁图任务创建弹窗，并预填充裂变结果
};

// 创建一键抠图任务
const createOneClickCutoutTask = (splitData: SplitTask) => {
  ElMessage.success(`正在为裂变任务 ${splitData.id} 创建一键抠图任务...`);
  // 这里应该打开一键抠图任务创建弹窗，并预填充裂变结果
};

// 创建侵权检测任务
const createCopyrightDetectionTask = (splitData: SplitTask) => {
  ElMessage.success(`正在为裂变任务 ${splitData.id} 创建侵权检测任务...`);
  // 这里应该打开侵权检测任务创建弹窗，并预填充裂变结果
};

// 分页相关方法
const handleSizeChange = (val: number) => {
  pagination.value.pageSize = val;
  pagination.value.currentPage = 1;
  loadSplitTasks();
};

const handleCurrentChange = (val: number) => {
  pagination.value.currentPage = val;
  loadSplitTasks();
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
  background-color: rgba(147, 51, 234, 0.05) !important;
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
