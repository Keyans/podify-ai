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
            <p class="text-2xl font-bold text-gray-900 dark:text-dark-text">{{ totalTasks }}</p>
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
              <p class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ todayCount }}</p>
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
            <Plus class="w-5 h-5 mr-2" />
            新建裂变
          </button>
          <button @click="exportTable"
            class="inline-flex items-center px-4 py-2.5 bg-white dark:bg-dark-card text-gray-700 dark:text-dark-text font-medium rounded-lg border border-gray-300 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-border shadow-sm hover:shadow-md transition-all duration-200">
            <Download class="w-5 h-5 mr-2" />
            导出表格
          </button>

          <!-- 批量操作按钮 -->
          <div v-if="selectedRows.length > 0" class="flex items-center space-x-2 ml-4 pl-4 border-l border-gray-200 dark:border-dark-border">
            <span class="text-sm text-gray-600 dark:text-dark-text-secondary">
              已选择 {{ selectedRows.length }} 项
            </span>
            <button @click="batchExport"
              class="inline-flex items-center px-3 py-1.5 bg-purple-500 hover:bg-purple-600 text-white text-sm font-medium rounded-lg transition-all duration-200">
              <Download class="w-4 h-4 mr-1" />
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
          v-if="mounted"
          :data="splitList"
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
  <ClientOnly>
    <CreateSplitDialog v-model="showCreateDialog" @success="handleCreateSuccess" />
  </ClientOnly>

  <!-- 查看详情对话框 -->
  <ClientOnly>
    <ViewDetailsDialog v-model="showDetailsDialog" :task="selectedTask" />
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { ElMessage } from 'element-plus';
import { Plus, Download } from '@element-plus/icons-vue';
import {
  PhotoIcon,
  SwatchIcon,
  CubeIcon,
  PaintBrushIcon
} from '@heroicons/vue/24/outline';

// 只在客户端导入组件
const CreateSplitDialog = process.client ? 
  (await import('./components/CreateSplitDialog.vue')).default : 
  null;
const ViewDetailsDialog = process.client ? 
  (await import('./components/ViewDetailsDialog.vue')).default : 
  null;

// 响应式数据
const mounted = ref(false);
const showCreateDialog = ref(false);
const showDetailsDialog = ref(false);
const selectedTask = ref<any>(null);
const splitList = ref<any[]>([]);
const selectedRows = ref<any[]>([]);

// Store状态
const loading = ref(false);
const pagination = ref({
  currentPage: 1,
  pageSize: 20,
  total: 0
});

// 统计数据
const totalTasks = computed(() => splitList.value.length);
const successRate = computed(() => {
  if (splitList.value.length === 0) return 0;
  const totalSuccess = splitList.value.reduce((sum, item) => sum + item.successCount, 0);
  const totalImages = splitList.value.reduce((sum, item) => sum + item.imageCount, 0);
  return totalImages > 0 ? Math.round((totalSuccess / totalImages) * 100) : 0;
});
const processingCount = computed(() =>
  splitList.value.filter(item => item.status === '处理中').length
);
const todayCount = computed(() => {
  const today = new Date().toDateString();
  return splitList.value.filter(item =>
    new Date(item.createTime).toDateString() === today
  ).length;
});

// 类型图标映射
const typeIconMap: Record<string, any> = {
  '人像裂变': PhotoIcon,
  '商品裂变': SwatchIcon,
  '背景裂变': PaintBrushIcon,
  '其他': CubeIcon,
};

// 方法
const getTypeIcon = (type: string) => {
  return typeIconMap[type] || CubeIcon;
};

const getTypeIconBg = (type: string) => {
  const bgMap: Record<string, string> = {
    '人像裂变': 'bg-purple-100 dark:bg-purple-900/30',
    '商品裂变': 'bg-blue-100 dark:bg-blue-900/30',
    '背景裂变': 'bg-green-100 dark:bg-green-900/30',
    '其他': 'bg-gray-100 dark:bg-gray-900/30',
  };
  return bgMap[type] || 'bg-gray-100 dark:bg-gray-900/30';
};

const getTypeIconColor = (type: string) => {
  const colorMap: Record<string, string> = {
    '人像裂变': 'text-purple-600 dark:text-purple-400',
    '商品裂变': 'text-blue-600 dark:text-blue-400',
    '背景裂变': 'text-green-600 dark:text-green-400',
    '其他': 'text-gray-600 dark:text-gray-400',
  };
  return colorMap[type] || 'text-gray-600 dark:text-gray-400';
};

const getStatusClass = (status: string) => {
  if (status === '已完成') return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
  if (status === '处理中') return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300';
  if (status.includes('失败')) return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300';
  return 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300';
};

const getStatusText = (status: string) => {
  return status;
};

const getStatusDotClass = (status: string) => {
  if (status === '已完成') return 'bg-green-500';
  if (status === '处理中') return 'bg-yellow-500';
  if (status.includes('失败')) return 'bg-red-500';
  return 'bg-gray-500';
};

const handleMoreAction = (command: { action: string; row: any }) => {
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
    default:
      ElMessage.warning('未知操作');
  }
};

// 创建相关任务的函数
const createTitleGenerateTask = (splitData: any) => {
  ElMessage.success(`正在为裂变任务 ${splitData.id} 创建标题生成任务...`);
};

const createBatchListingTask = (splitData: any) => {
  ElMessage.success(`正在为裂变任务 ${splitData.id} 创建批量刊登任务...`);
};

const createSmartCropTask = (splitData: any) => {
  ElMessage.success(`正在为裂变任务 ${splitData.id} 创建智能裁图任务...`);
};

const createOneClickCutoutTask = (splitData: any) => {
  ElMessage.success(`正在为裂变任务 ${splitData.id} 创建一键抠图任务...`);
};

const createCopyrightDetectionTask = (splitData: any) => {
  ElMessage.success(`正在为裂变任务 ${splitData.id} 创建侵权检测任务...`);
};

const exportTable = async () => {
  try {
    ElMessage.success('表格导出成功！');
  } catch (error) {
    ElMessage.error('导出失败，请重试');
  }
};

const downloadSample = async () => {
  try {
    ElMessage.success('示例文件下载成功！');
  } catch (error) {
    ElMessage.error('下载失败，请重试');
  }
};

const viewDetails = (row: any) => {
  selectedTask.value = row;
  showDetailsDialog.value = true;
};

const handleCreateSuccess = () => {
  // 刷新列表
  loadSplitList();
  ElMessage.success('裂变任务创建成功！');
};

// 选择相关方法
const handleSelectionChange = (selection: any[]) => {
  selectedRows.value = selection;
};

// 批量操作方法
const batchExport = () => {
  if (selectedRows.value.length === 0) {
    ElMessage.warning('请先选择要下载的任务');
    return;
  }
  ElMessage.success(`正在下载 ${selectedRows.value.length} 个任务的裂变结果...`);
};

const handleSizeChange = (val: number) => {
  pagination.value.pageSize = val;
  loadSplitList();
};

const handleCurrentChange = (val: number) => {
  pagination.value.currentPage = val;
  loadSplitList();
};

const loadSplitList = async () => {
  try {
    loading.value = true;
    // 模拟数据
    const mockData = [
      {
        id: 'SPL001',
        type: '商品裂变',
        imageCount: 30,
        successCount: 150,
        status: '已完成',
        creator: 'admin',
        createTime: '2024-01-15 10:30:00',
        estimatedTime: '8分钟'
      },
      {
        id: 'SPL002',
        type: '人像裂变',
        imageCount: 15,
        successCount: 60,
        status: '已完成',
        creator: 'admin',
        createTime: '2024-01-14 14:20:00',
        estimatedTime: '4分钟'
      },
      {
        id: 'SPL003',
        type: '背景裂变',
        imageCount: 25,
        successCount: 75,
        status: '处理中',
        creator: 'admin',
        createTime: '2024-01-13 09:15:00',
        estimatedTime: '6分钟'
      },
      {
        id: 'SPL004',
        type: '商品裂变',
        imageCount: 10,
        successCount: 0,
        status: '处理失败',
        creator: 'admin',
        createTime: '2024-01-12 16:45:00',
        estimatedTime: '3分钟',
        errorMessage: '图片质量不符合要求'
      }
    ];
    
    const start = (pagination.value.currentPage - 1) * pagination.value.pageSize;
    const end = start + pagination.value.pageSize;
    splitList.value = mockData.slice(start, end);
    pagination.value.total = mockData.length;
    loading.value = false;
  } catch (error) {
    loading.value = false;
    ElMessage.error('加载数据失败，请重试');
  }
};

onMounted(() => {
  mounted.value = true;
  loadSplitList();
});
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
