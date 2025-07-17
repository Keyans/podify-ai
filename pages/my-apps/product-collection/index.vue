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
            <p class="text-sm font-medium text-gray-600 dark:text-dark-text-secondary">今日新增</p>
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

    <!-- 操作栏 -->
    <div class="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-elegant dark:shadow-elegant-dark border border-gray-100 dark:border-dark-border">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <button @click="showCreateDialog = true"
            class="inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
            <Plus class="w-5 h-5 mr-2" />
            新建采集
          </button>
          
          <button @click="batchExport"
            class="inline-flex items-center px-4 py-2.5 text-gray-700 dark:text-dark-text font-medium rounded-lg border border-gray-300 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-border transition-all duration-200">
            <Download class="w-5 h-5 mr-2" />
            批量导出
          </button>
          
          <button @click="downloadPlugin"
            class="inline-flex items-center px-4 py-2.5 text-blue-700 dark:text-blue-400 font-medium rounded-lg border border-blue-300 dark:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200">
            <Download class="w-5 h-5 mr-2" />
            下载插件
          </button>
        </div>

        <div class="flex items-center space-x-3">
          <button @click="exportTable"
            class="inline-flex items-center px-4 py-2.5 text-green-700 dark:text-green-400 font-medium rounded-lg border border-green-300 dark:border-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-200">
            <Download class="w-5 h-5 mr-2" />
            导出表格
          </button>
        </div>
      </div>
    </div>

    <!-- 数据表格 -->
    <div class="bg-white dark:bg-dark-surface rounded-xl shadow-elegant dark:shadow-elegant-dark border border-gray-100 dark:border-dark-border overflow-hidden">
      <div class="modern-table">
        <el-table 
          v-if="mounted"
          :data="collectionList" 
          v-loading="loading"
          @selection-change="handleSelectionChange"
          style="width: 100%"
          class="w-full"
          height="600"
        >
          <!-- 选择列 -->
          <el-table-column type="selection" width="55" align="center" />
          
          <!-- 采集ID -->
          <el-table-column prop="id" label="采集ID" width="120" align="center">
            <template #default="{ row }">
              <span class="font-mono text-sm text-primary-600 dark:text-primary-400">{{ row.id }}</span>
            </template>
          </el-table-column>

          <!-- 采集类型 -->
          <el-table-column prop="type" label="采集类型" width="120" align="center">
            <template #default="{ row }">
              <div class="flex items-center justify-center space-x-2">
                <div :class="[
                  'w-8 h-8 rounded-lg flex items-center justify-center',
                  getTypeIconBg(row.type)
                ]">
                  <component :is="getTypeIcon(row.type)" :class="[
                    'w-4 h-4',
                    getTypeIconColor(row.type)
                  ]" />
                </div>
                <span class="text-sm font-medium text-gray-900 dark:text-dark-text">{{ row.type }}</span>
              </div>
            </template>
          </el-table-column>

          <!-- 平台 -->
          <el-table-column prop="platform" label="平台" width="100" align="center">
            <template #default="{ row }">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                {{ row.platform }}
              </span>
            </template>
          </el-table-column>

          <!-- 采集进度 -->
          <el-table-column label="采集进度" width="180" align="center">
            <template #default="{ row }">
              <div class="space-y-1">
                <div class="flex items-center justify-between text-xs">
                  <span class="text-gray-600 dark:text-dark-text-secondary">{{ row.successCount }}/{{ row.targetCount }}</span>
                  <span class="font-medium text-gray-900 dark:text-dark-text">{{ Math.round((row.successCount / row.targetCount) * 100) }}%</span>
                </div>
                <div class="w-full bg-gray-200 dark:bg-dark-border rounded-full h-2">
                  <div 
                    class="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-300"
                    :style="{ width: `${Math.round((row.successCount / row.targetCount) * 100)}%` }"
                  ></div>
                </div>
              </div>
            </template>
          </el-table-column>

          <!-- 状态 -->
          <el-table-column prop="status" label="状态" width="120" align="center">
            <template #default="{ row }">
              <div class="flex items-center justify-center space-x-2">
                <div :class="[
                  'w-2 h-2 rounded-full',
                  getStatusDotClass(row.status)
                ]"></div>
                <span :class="[
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                  getStatusClass(row.status)
                ]">
                  {{ row.status }}
                </span>
              </div>
            </template>
          </el-table-column>

          <!-- 创建者 -->
          <el-table-column prop="collector" label="创建者" width="100" align="center">
            <template #default="{ row }">
              <span class="text-sm text-gray-600 dark:text-dark-text-secondary">{{ row.collector }}</span>
            </template>
          </el-table-column>

          <!-- 创建时间 -->
          <el-table-column prop="createTime" label="创建时间" width="160" align="center">
            <template #default="{ row }">
              <span class="text-sm text-gray-600 dark:text-dark-text-secondary">{{ row.createTime }}</span>
            </template>
          </el-table-column>

          <!-- 操作列 -->
          <el-table-column label="操作" width="160" align="center" fixed="right">
            <template #default="{ row }">
              <div class="flex items-center justify-center space-x-1">
                <button @click="viewDetails(row)"
                  class="inline-flex items-center px-3 py-1.5 text-xs font-medium text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all duration-200">
                  查看详情
                </button>
                <el-dropdown v-if="mounted" trigger="click">
                  <button class="inline-flex items-center px-2 py-1.5 text-xs font-medium text-gray-700 dark:text-dark-text bg-gray-50 dark:bg-dark-border rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200">
                    更多
                    <svg class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item @click="viewFailureReason(row)" v-if="row.status.includes('失败')">
                        查看失败原因
                      </el-dropdown-item>
                      <el-dropdown-item>重新采集</el-dropdown-item>
                      <el-dropdown-item>导出数据</el-dropdown-item>
                      <el-dropdown-item divided class="text-red-600">删除</el-dropdown-item>
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
          v-if="mounted"
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
    <ClientOnly>
      <CreateCollectionDialog 
        v-model="showCreateDialog" 
        @success="handleCreateSuccess"
      />
    </ClientOnly>

    <!-- 查看详情弹窗 -->
    <ClientOnly>
      <ViewDetailsDialog 
        v-model="showDetailsDialog" 
        :collection-data="selectedCollection"
      />
    </ClientOnly>
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

// 只在客户端导入组件
const CreateCollectionDialog = process.client ? 
  (await import('./components/CreateCollectionDialog.vue')).default : 
  null;
const ViewDetailsDialog = process.client ? 
  (await import('./components/ViewDetailsDialog.vue')).default : 
  null;

// 响应式数据
const mounted = ref(false);
const showCreateDialog = ref(false);
const showDetailsDialog = ref(false);
const selectedCollection = ref<any>(null);
const collectionList = ref<any[]>([]);
const selectedRows = ref<any[]>([]);

// Store状态
const loading = ref(false);
const pagination = ref({
  currentPage: 1,
  pageSize: 20,
  total: 0
});

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
    ElMessage.success('表格导出成功！');
  } catch (error) {
    ElMessage.error('导出失败，请重试');
  }
};

const downloadPlugin = async () => {
  try {
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

const handleSizeChange = (val: number) => {
  pagination.value.pageSize = val;
  loadCollectionList();
};

const handleCurrentChange = (val: number) => {
  pagination.value.currentPage = val;
  loadCollectionList();
};

const loadCollectionList = async () => {
  try {
    loading.value = true;
    // 模拟数据
    const mockData = [
      {
        id: 'COL001',
        type: '商品',
        platform: '亚马逊',
        targetCount: 100,
        successCount: 95,
        status: '已完成',
        collector: 'admin',
        createTime: '2024-01-15 10:30:00',
        links: 'https://amazon.com/product1\nhttps://amazon.com/product2'
      },
      {
        id: 'COL002', 
        type: '店铺',
        platform: 'Temu',
        targetCount: 50,
        successCount: 45,
        status: '部分失败',
        collector: 'admin',
        createTime: '2024-01-14 14:20:00',
        links: 'https://temu.com/store1',
        failureReason: '部分商品链接失效'
      },
      {
        id: 'COL003',
        type: '搜索',
        platform: 'Shein',
        targetCount: 200,
        successCount: 150,
        status: '进行中',
        collector: 'admin',
        createTime: '2024-01-13 09:15:00',
        keyword: 'women dress'
      },
      {
        id: 'COL004',
        type: '商品',
        platform: '亚马逊',
        targetCount: 30,
        successCount: 0,
        status: '失败',
        collector: 'admin',
        createTime: '2024-01-12 16:45:00',
        links: 'https://amazon.com/invalid-product',
        failureReason: '所有商品链接均无效'
      }
    ];
    
    const start = (pagination.value.currentPage - 1) * pagination.value.pageSize;
    const end = start + pagination.value.pageSize;
    collectionList.value = mockData.slice(start, end);
    pagination.value.total = mockData.length;
    loading.value = false;
  } catch (error) {
    loading.value = false;
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
  mounted.value = true;
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
