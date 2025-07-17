<template>
  <div class="space-y-6">
    <!-- 页面标题 -->
    <div class="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6 border border-blue-100 dark:border-blue-800">
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
          </svg>
        </div>
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-dark-text">标题生成</h1>
          <p class="mt-1 text-sm text-gray-600 dark:text-dark-text-secondary">AI智能生成吸引人的商品标题</p>
        </div>
      </div>
    </div>

    <!-- 统计卡片 -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-elegant dark:shadow-elegant-dark border border-gray-100 dark:border-dark-border hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-dark-text-secondary">总生成数</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-dark-text">{{ totalGenerated }}</p>
          </div>
          <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
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
            <p class="text-sm font-medium text-gray-600 dark:text-dark-text-secondary">今日生成</p>
            <p class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ todayGenerated }}</p>
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
            class="inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
            <PlusIcon class="w-5 h-5 mr-2" />
            新建生成
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

    <!-- 标题生成任务列表 -->
    <div class="bg-white dark:bg-dark-surface rounded-xl shadow-elegant dark:shadow-elegant-dark border border-gray-100 dark:border-dark-border overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-100 dark:border-dark-border">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-dark-text">标题生成任务列表</h3>
        <p class="text-sm text-gray-600 dark:text-dark-text-secondary mt-1">管理和监控您的所有标题生成任务</p>
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

          <el-table-column prop="id" label="标题ID" width="120">
            <template #default="scope">
              <span class="font-mono text-sm text-gray-600 dark:text-dark-text-secondary">
                {{ scope.row.id }}
              </span>
            </template>
          </el-table-column>

          <el-table-column label="生成数量" width="150">
            <template #default="scope">
              <div class="flex items-center space-x-2">
                <span class="text-sm text-gray-600 dark:text-dark-text-secondary">图片:</span>
                <span class="font-medium text-gray-900 dark:text-dark-text">{{ scope.row.imageCount }}</span>
                <span class="text-gray-400">|</span>
                <span class="text-sm text-gray-600 dark:text-dark-text-secondary">标题:</span>
                <span class="font-medium text-blue-600 dark:text-blue-400">{{ scope.row.generatedCount }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="status" label="生成状态" width="120">
            <template #default="scope">
              <span :class="getStatusClass(scope.row.status)" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                {{ getStatusText(scope.row.status) }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="preset" label="使用预设" width="150">
            <template #default="scope">
              <span class="text-sm text-gray-600 dark:text-dark-text-secondary">{{ scope.row.preset || '自定义规则' }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="operator" label="操作人" width="100">
            <template #default="scope">
              <div class="flex items-center space-x-2">
                <div class="w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center">
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
                      <el-dropdown-item :command="{action: 'superSplit', row: scope.row}">
                        <div class="flex items-center space-x-2">
                          <svg class="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                          </svg>
                          <span>超级裂变</span>
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

  <!-- 新建标题生成对话框 -->
  <CreateTitleDialog v-model="showCreateDialog" @success="refreshData" />

  <!-- 查看详情对话框 -->
  <ViewDetailsDialog v-model="showDetailsDialog" :task="selectedTask" />
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { PlusIcon, ArrowDownTrayIcon } from '@heroicons/vue/24/outline';
import CreateTitleDialog from './components/CreateTitleDialog.vue';
import ViewDetailsDialog from './components/ViewDetailsDialog.vue';

// 类型定义
interface TitleTask {
  id: string;
  imageCount: number;
  generatedCount: number;
  status: 'completed' | 'processing' | 'failed' | 'pending';
  preset: string;
  operator: string;
  createTime: string;
}

// 响应式数据
const loading = ref(false);
const showCreateDialog = ref(false);
const showDetailsDialog = ref(false);
const selectedTask = ref<TitleTask | null>(null);
const selectedRows = ref<TitleTask[]>([]);

// 统计数据
const totalGenerated = ref(2856);
const successRate = ref(96.8);
const todayGenerated = ref(234);
const processingCount = ref(12);

// 分页数据
const pagination = ref({
  currentPage: 1,
  pageSize: 20,
  total: 0
});

// 模拟数据
const titleTasks = ref<TitleTask[]>([
  {
    id: 'TG001',
    imageCount: 25,
    generatedCount: 75,
    status: 'completed',
    preset: '亚马逊标题',
    operator: '张三',
    createTime: '2024-01-15 14:30:25'
  },
  {
    id: 'TG002',
    imageCount: 18,
    generatedCount: 54,
    status: 'processing',
    preset: 'Temu标题',
    operator: '李四',
    createTime: '2024-01-15 13:45:12'
  },
  {
    id: 'TG003',
    imageCount: 32,
    generatedCount: 96,
    status: 'completed',
    preset: 'Shein标题',
    operator: '王五',
    createTime: '2024-01-15 12:20:08'
  },
  {
    id: 'TG004',
    imageCount: 15,
    generatedCount: 0,
    status: 'failed',
    preset: '自定义规则',
    operator: '赵六',
    createTime: '2024-01-15 11:15:33'
  },
  {
    id: 'TG005',
    imageCount: 28,
    generatedCount: 0,
    status: 'pending',
    preset: '亚马逊标题',
    operator: '钱七',
    createTime: '2024-01-15 10:30:45'
  },
  {
    id: 'TG006',
    imageCount: 22,
    generatedCount: 66,
    status: 'completed',
    preset: 'eBay标题',
    operator: '孙八',
    createTime: '2024-01-15 09:45:22'
  },
  {
    id: 'TG007',
    imageCount: 19,
    generatedCount: 38,
    status: 'processing',
    preset: '自定义规则',
    operator: '周九',
    createTime: '2024-01-15 08:20:15'
  },
  {
    id: 'TG008',
    imageCount: 35,
    generatedCount: 105,
    status: 'completed',
    preset: '亚马逊标题',
    operator: '吴十',
    createTime: '2024-01-14 16:30:40'
  },
  {
    id: 'TG009',
    imageCount: 12,
    generatedCount: 36,
    status: 'completed',
    preset: 'Temu标题',
    operator: '郑一',
    createTime: '2024-01-14 15:15:28'
  },
  {
    id: 'TG010',
    imageCount: 26,
    generatedCount: 52,
    status: 'processing',
    preset: 'Shein标题',
    operator: '王二',
    createTime: '2024-01-14 14:45:55'
  }
]);

// 计算属性
const currentPageTasks = computed(() => {
  const start = (pagination.value.currentPage - 1) * pagination.value.pageSize;
  const end = start + pagination.value.pageSize;
  return titleTasks.value.slice(start, end);
});

// 初始化
onMounted(() => {
  loadTitleTasks();
});

// 方法
const loadTitleTasks = () => {
  loading.value = true;
  setTimeout(() => {
    pagination.value.total = titleTasks.value.length;
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

const handleSelectionChange = (selection: TitleTask[]) => {
  selectedRows.value = selection;
};

const viewDetails = (task: TitleTask) => {
  selectedTask.value = task;
  showDetailsDialog.value = true;
};

const handleMoreAction = (command: { action: string; row: TitleTask }) => {
  const { action, row } = command;

  switch (action) {
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
  ElMessage.success('标题生成任务创建成功！');
  // 刷新任务列表
  loadTitleTasks();
};

// 创建批量刊登任务
const createBatchListingTask = (titleData: TitleTask) => {
  ElMessage.success(`正在为标题生成任务 ${titleData.id} 创建批量刊登任务...`);
  // 这里应该打开批量刊登任务创建弹窗，并预填充标题数据
};

// 创建智能裁图任务
const createSmartCropTask = (titleData: TitleTask) => {
  ElMessage.success(`正在为标题生成任务 ${titleData.id} 创建智能裁图任务...`);
  // 这里应该打开智能裁图任务创建弹窗，并预填充图片数据
};

// 创建一键抠图任务
const createOneClickCutoutTask = (titleData: TitleTask) => {
  ElMessage.success(`正在为标题生成任务 ${titleData.id} 创建一键抠图任务...`);
  // 这里应该打开一键抠图任务创建弹窗，并预填充图片数据
};

// 创建超级裂变任务
const createSuperSplitTask = (titleData: TitleTask) => {
  ElMessage.success(`正在为标题生成任务 ${titleData.id} 创建超级裂变任务...`);
  // 这里应该打开超级裂变任务创建弹窗，并预填充图片数据
};

// 创建侵权检测任务
const createCopyrightDetectionTask = (titleData: TitleTask) => {
  ElMessage.success(`正在为标题生成任务 ${titleData.id} 创建侵权检测任务...`);
  // 这里应该打开侵权检测任务创建弹窗，并预填充图片数据
};

// 分页相关方法
const handleSizeChange = (val: number) => {
  pagination.value.pageSize = val;
  pagination.value.currentPage = 1;
  loadTitleTasks();
};

const handleCurrentChange = (val: number) => {
  pagination.value.currentPage = val;
  loadTitleTasks();
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
