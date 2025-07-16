<template>
  <div class="space-y-6">
    <!-- 页面标题 -->
    <div class="bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 rounded-2xl p-6 border border-primary-100 dark:border-primary-800">
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
          </svg>
        </div>
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-dark-text">商品采集</h1>
          <p class="mt-1 text-sm text-gray-600 dark:text-dark-text-secondary">智能采集全球电商平台商品信息</p>
        </div>
      </div>
    </div>

    <!-- 统计卡片 -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-elegant dark:shadow-elegant-dark border border-gray-100 dark:border-dark-border hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-dark-text-secondary">总采集数</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-dark-text">{{ totalCollections }}</p>
          </div>
          <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
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
            <p class="text-sm font-medium text-gray-600 dark:text-dark-text-secondary">进行中</p>
            <p class="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{{ inProgressCount }}</p>
          </div>
          <div class="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-elegant dark:shadow-elegant-dark border border-gray-100 dark:border-dark-border hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-dark-text-secondary">今日采集</p>
            <p class="text-2xl font-bold text-purple-600 dark:text-purple-400">{{ todayCount }}</p>
          </div>
          <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
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
            <Plus class="w-5 h-5 mr-2" />
            新建采集
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
              class="inline-flex items-center px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-all duration-200">
              <Download class="w-4 h-4 mr-1" />
              批量导出
            </button>
          </div>
        </div>
        <div>
          <button @click="downloadPlugin"
            class="inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
            <Download class="w-5 h-5 mr-2" />
            下载采集插件
          </button>
        </div>
      </div>
    </div>

    <!-- 采集列表 -->
    <div class="bg-white dark:bg-dark-surface rounded-xl shadow-elegant dark:shadow-elegant-dark border border-gray-100 dark:border-dark-border overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-100 dark:border-dark-border">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-dark-text">采集任务列表</h3>
        <p class="text-sm text-gray-600 dark:text-dark-text-secondary mt-1">管理和监控您的所有采集任务</p>
      </div>

      <div class="overflow-x-auto">
        <el-table
          :data="collectionList"
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

          <el-table-column prop="id" label="采集ID" width="120">
            <template #default="scope">
              <div class="font-mono text-sm font-medium text-primary-600 dark:text-primary-400">
                {{ scope.row.id }}
              </div>
            </template>
          </el-table-column>

          <el-table-column label="采集类型" width="200">
            <template #default="scope">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 rounded-lg flex items-center justify-center"
                     :class="getTypeIconBg(scope.row.type)">
                  <component :is="getTypeIcon(scope.row.type)" class="w-4 h-4" :class="getTypeIconColor(scope.row.type)" />
                </div>
                <div>
                  <div class="font-medium text-gray-900 dark:text-dark-text">{{ scope.row.type }}</div>
                  <div class="text-sm text-gray-500 dark:text-dark-text-secondary">{{ scope.row.platform }}</div>
                </div>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="采集数量" width="150">
            <template #default="scope">
              <div class="space-y-1">
                <div class="flex items-center space-x-2">
                  <span class="text-xs text-gray-500 dark:text-dark-text-secondary">目标:</span>
                  <span class="font-medium text-gray-900 dark:text-dark-text">{{ scope.row.targetCount }}</span>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="text-xs text-gray-500 dark:text-dark-text-secondary">成功:</span>
                  <span class="font-medium text-green-600 dark:text-green-400">{{ scope.row.successCount }}</span>
                </div>
                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                  <div class="bg-green-500 h-1.5 rounded-full transition-all duration-300"
                       :style="{ width: `${(scope.row.successCount / scope.row.targetCount) * 100}%` }"></div>
                </div>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="采集状态" width="150">
            <template #default="scope">
              <div class="space-y-2">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      :class="getStatusClass(scope.row.status)">
                  <span class="w-1.5 h-1.5 rounded-full mr-1.5" :class="getStatusDotClass(scope.row.status)"></span>
                  {{ scope.row.status }}
                </span>
                <div v-if="scope.row.status.includes('失败')">
                  <button @click="viewFailureReason(scope.row)"
                    class="text-xs text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 underline">
                    查看原因
                  </button>
                </div>
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="collector" label="创建人" width="100">
            <template #default="scope">
              <div class="flex items-center space-x-2">
                <div class="w-6 h-6 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                  <span class="text-white text-xs font-medium">{{ scope.row.collector.charAt(0).toUpperCase() }}</span>
                </div>
                <span class="text-sm font-medium text-gray-900 dark:text-dark-text">{{ scope.row.collector }}</span>
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

    <!-- 新建采集弹窗 -->
    <CreateCollectionDialog 
      v-model="showCreateDialog" 
      @success="handleCreateSuccess"
    />

    <!-- 查看详情弹窗 -->
    <ViewDetailsDialog 
      v-model="showDetailsDialog" 
      :collection-data="selectedCollection"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { ElMessage } from 'element-plus';
import { Plus, Download } from '@element-plus/icons-vue';
import {
  ShoppingBagIcon,
  BuildingStorefrontIcon,
  MagnifyingGlassIcon,
  CubeIcon
} from '@heroicons/vue/24/outline';
import CreateCollectionDialog from './components/CreateCollectionDialog.vue';
import ViewDetailsDialog from './components/ViewDetailsDialog.vue';
import {
  collectionStore,
  getCollectionTasks,
  exportCollectionData,
  downloadPlugin as downloadPluginApi,
  type CollectionTask
} from '../../../store/product-collection';

// 响应式数据
const showCreateDialog = ref(false);
const showDetailsDialog = ref(false);
const selectedCollection = ref<CollectionTask | null>(null);
const collectionList = ref<CollectionTask[]>([]);
const selectedRows = ref<CollectionTask[]>([]);

// 使用store中的状态
const { loading, pagination } = collectionStore;

// 统计数据
const totalCollections = computed(() => collectionList.value.length);
const successRate = computed(() => {
  if (collectionList.value.length === 0) return 0;
  const totalSuccess = collectionList.value.reduce((sum, item) => sum + item.successCount, 0);
  const totalTarget = collectionList.value.reduce((sum, item) => sum + item.targetCount, 0);
  return totalTarget > 0 ? Math.round((totalSuccess / totalTarget) * 100) : 0;
});
const inProgressCount = computed(() =>
  collectionList.value.filter(item => item.status === '进行中').length
);
const todayCount = computed(() => {
  const today = new Date().toDateString();
  return collectionList.value.filter(item =>
    new Date(item.createTime).toDateString() === today
  ).length;
});

// 类型图标映射
const typeIconMap: Record<string, any> = {
  '商品': ShoppingBagIcon,
  '店铺': BuildingStorefrontIcon,
  '搜索': MagnifyingGlassIcon,
  '其他': CubeIcon,
};

// 方法
const getTypeIcon = (type: string) => {
  return typeIconMap[type] || CubeIcon;
};

const getTypeIconBg = (type: string) => {
  const bgMap: Record<string, string> = {
    '商品': 'bg-blue-100 dark:bg-blue-900/30',
    '店铺': 'bg-green-100 dark:bg-green-900/30',
    '搜索': 'bg-purple-100 dark:bg-purple-900/30',
    '其他': 'bg-gray-100 dark:bg-gray-900/30',
  };
  return bgMap[type] || 'bg-gray-100 dark:bg-gray-900/30';
};

const getTypeIconColor = (type: string) => {
  const colorMap: Record<string, string> = {
    '商品': 'text-blue-600 dark:text-blue-400',
    '店铺': 'text-green-600 dark:text-green-400',
    '搜索': 'text-purple-600 dark:text-purple-400',
    '其他': 'text-gray-600 dark:text-gray-400',
  };
  return colorMap[type] || 'text-gray-600 dark:text-gray-400';
};

const getStatusClass = (status: string) => {
  if (status === '已完成') return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
  if (status === '进行中') return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300';
  if (status.includes('失败')) return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300';
  return 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300';
};

const getStatusDotClass = (status: string) => {
  if (status === '已完成') return 'bg-green-500';
  if (status === '进行中') return 'bg-yellow-500';
  if (status.includes('失败')) return 'bg-red-500';
  return 'bg-gray-500';
};

const exportTable = async () => {
  try {
    await exportCollectionData('excel');
    ElMessage.success('表格导出成功！');
  } catch (error) {
    ElMessage.error('导出失败，请重试');
  }
};

const downloadPlugin = async () => {
  try {
    await downloadPluginApi();
    ElMessage.success('插件下载成功！');
  } catch (error) {
    ElMessage.error('下载失败，请重试');
  }
};

const viewFailureReason = (row: any) => {
  const reason = row.failureReason || '网络超时导致部分商品采集失败';
  ElMessage.info(`采集ID ${row.id} 的失败原因：${reason}`);
};

const viewDetails = (row: any) => {
  selectedCollection.value = row;
  showDetailsDialog.value = true;
};

const handleCreateSuccess = () => {
  // 刷新列表
  loadCollectionList();
  ElMessage.success('采集任务创建成功！');
};

// 处理更多操作
const handleMoreAction = (command: any) => {
  const { action, row } = command;

  switch (action) {
    case 'smartCrop':
      createSmartCropTask(row);
      break;
    case 'titleGenerate':
      createTitleGenerateTask(row);
      break;
    case 'batchListing':
      createBatchListingTask(row);
      break;
    case 'oneClickCutout':
      createOneClickCutoutTask(row);
      break;
    case 'superSplit':
      createSuperSplitTask(row);
      break;
    default:
      ElMessage.warning('未知操作');
  }
};

// 创建智能裁图任务
const createSmartCropTask = (collectionData: any) => {
  ElMessage.success(`正在为采集任务 ${collectionData.id} 创建智能裁图任务...`);
  // 这里应该打开智能裁图任务创建弹窗，并预填充采集的图片数据
};

// 创建标题生成任务
const createTitleGenerateTask = (collectionData: any) => {
  ElMessage.success(`正在为采集任务 ${collectionData.id} 创建标题生成任务...`);
  // 这里应该打开标题生成任务创建弹窗，并预填充商品信息
};

// 创建批量刊登任务
const createBatchListingTask = (collectionData: any) => {
  ElMessage.success(`正在为采集任务 ${collectionData.id} 创建批量刊登任务...`);
  // 这里应该打开批量刊登任务创建弹窗，并预填充商品数据
};

// 创建一键抠图任务
const createOneClickCutoutTask = (collectionData: any) => {
  ElMessage.success(`正在为采集任务 ${collectionData.id} 创建一键抠图任务...`);
  // 这里应该打开一键抠图任务创建弹窗，并预填充图片数据
};

// 创建超级裂变任务
const createSuperSplitTask = (collectionData: any) => {
  ElMessage.success(`正在为采集任务 ${collectionData.id} 创建超级裂变任务...`);
  // 这里应该打开超级裂变任务创建弹窗，并预填充商品数据
};

const handleSizeChange = (val: number) => {
  pagination.pageSize = val;
  loadCollectionList();
};

const handleCurrentChange = (val: number) => {
  pagination.currentPage = val;
  loadCollectionList();
};

const loadCollectionList = async () => {
  try {
    const { data, total } = await getCollectionTasks(pagination.currentPage, pagination.pageSize);
    collectionList.value = data;
    pagination.total = total;
  } catch (error) {
    ElMessage.error('加载数据失败，请重试');
  }
};

// 选择相关方法
const handleSelectionChange = (selection: any[]) => {
  selectedRows.value = selection;
};

// 批量操作方法
const batchExport = () => {
  if (selectedRows.value.length === 0) {
    ElMessage.warning('请先选择要导出的任务');
    return;
  }

  ElMessage.success(`正在导出 ${selectedRows.value.length} 个任务的数据...`);
  // 这里应该调用批量导出API
};

onMounted(() => {
  loadCollectionList();
});
</script>

<style scoped>
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

.modern-pagination :deep(.el-pagination__total),
.modern-pagination :deep(.el-pagination__sizes),
.modern-pagination :deep(.el-pagination__jump) {
  color: rgb(107, 114, 128);
}

.dark .modern-pagination :deep(.el-pagination__total),
.dark .modern-pagination :deep(.el-pagination__sizes),
.dark .modern-pagination :deep(.el-pagination__jump) {
  color: rgb(156, 163, 175);
}

.modern-pagination :deep(.el-pager li) {
  background: transparent;
  border: 1px solid rgb(229, 231, 235);
  margin: 0 2px;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.dark .modern-pagination :deep(.el-pager li) {
  border-color: rgb(75, 85, 99);
  color: rgb(156, 163, 175);
}

.modern-pagination :deep(.el-pager li:hover) {
  background: rgb(59, 130, 246);
  border-color: rgb(59, 130, 246);
  color: white;
  transform: translateY(-1px);
}

.modern-pagination :deep(.el-pager li.is-active) {
  background: linear-gradient(135deg, rgb(59, 130, 246), rgb(37, 99, 235));
  border-color: rgb(59, 130, 246);
  color: white;
}
</style>
