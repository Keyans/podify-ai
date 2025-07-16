<template>
  <div class="space-y-6">
    <!-- 页面标题 -->
    <div class="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-purple-100 dark:border-purple-800">
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2"></path>
          </svg>
        </div>
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-dark-text">POD商品</h1>
          <p class="mt-1 text-sm text-gray-600 dark:text-dark-text-secondary">按需印刷商品管理和刊登</p>
        </div>
      </div>
    </div>

    <!-- 统计卡片 -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-elegant dark:shadow-elegant-dark border border-gray-100 dark:border-dark-border hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-dark-text-secondary">POD商品总数</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-dark-text">{{ totalPodProducts }}</p>
          </div>
          <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2"></path>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-elegant dark:shadow-elegant-dark border border-gray-100 dark:border-dark-border hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-dark-text-secondary">已刊登数量</p>
            <p class="text-2xl font-bold text-green-600 dark:text-green-400">{{ publishedCount }}</p>
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
            <p class="text-sm font-medium text-gray-600 dark:text-dark-text-secondary">今日新增</p>
            <p class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ todayNewPodProducts }}</p>
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
            <p class="text-sm font-medium text-gray-600 dark:text-dark-text-secondary">平均价格</p>
            <p class="text-2xl font-bold text-orange-600 dark:text-orange-400">¥{{ averagePodPrice }}</p>
          </div>
          <div class="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- 操作区域 -->
    <div class="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-elegant dark:shadow-elegant-dark border border-gray-100 dark:border-dark-border">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div class="flex items-center space-x-3">
          <div class="text-sm text-gray-600 dark:text-dark-text-secondary bg-blue-50 dark:bg-blue-900/20 px-3 py-2 rounded-lg border border-blue-200 dark:border-blue-800">
            <svg class="w-4 h-4 inline mr-2 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            POD商品通过"POD合成"应用自动生成，无法手动创建
          </div>
          
          <button @click="exportPodProducts"
            class="inline-flex items-center px-4 py-2.5 bg-white dark:bg-dark-card text-gray-700 dark:text-dark-text font-medium rounded-lg border border-gray-300 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-border shadow-sm hover:shadow-md transition-all duration-200">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
            </svg>
            导出商品
          </button>

          <!-- 批量操作按钮 -->
          <div v-if="selectedRows.length > 0" class="flex items-center space-x-2 ml-4 pl-4 border-l border-gray-200 dark:border-dark-border">
            <span class="text-sm text-gray-600 dark:text-dark-text-secondary">
              已选择 {{ selectedRows.length }} 项
            </span>
            <button @click="batchPublish"
              class="inline-flex items-center px-3 py-1.5 bg-purple-500 hover:bg-purple-600 text-white text-sm font-medium rounded-lg transition-all duration-200">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
              批量刊登
            </button>
          </div>
        </div>

        <!-- 搜索框 -->
        <div class="relative">
          <input
            v-model="searchKeyword"
            type="text"
            placeholder="搜索POD商品..."
            class="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-dark-card dark:text-dark-text"
            @input="handleSearch"
          />
          <svg class="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
      </div>
    </div>

    <!-- POD商品列表 -->
    <div class="bg-white dark:bg-dark-surface rounded-xl shadow-elegant dark:shadow-elegant-dark border border-gray-100 dark:border-dark-border overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-100 dark:border-dark-border">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-dark-text">POD商品列表</h3>
        <p class="text-sm text-gray-600 dark:text-dark-text-secondary mt-1">管理您的按需印刷商品</p>
      </div>

      <div class="overflow-x-auto">
        <el-table
          :data="currentPagePodProducts"
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
          
          <el-table-column label="商品封面图" width="100">
            <template #default="scope">
              <div class="flex justify-center">
                <el-image
                  :src="scope.row.coverImage"
                  :preview-src-list="[scope.row.coverImage]"
                  fit="cover"
                  class="w-16 h-16 rounded-lg border border-gray-200 dark:border-dark-border"
                  :preview-teleported="true"
                />
              </div>
            </template>
          </el-table-column>
          
          <el-table-column prop="name" label="商品名称" min-width="200">
            <template #default="scope">
              <div class="font-medium text-gray-900 dark:text-dark-text">
                {{ scope.row.name }}
              </div>
              <div class="text-xs text-gray-500 dark:text-dark-text-secondary mt-1">
                基于: {{ scope.row.baseProduct }}
              </div>
            </template>
          </el-table-column>
          
          <el-table-column prop="price" label="价格（最低）" width="120">
            <template #default="scope">
              <span class="font-medium text-green-600 dark:text-green-400">
                ¥{{ scope.row.minPrice }}
              </span>
            </template>
          </el-table-column>
          
          <el-table-column prop="skuCount" label="SKU数量" width="100">
            <template #default="scope">
              <span class="text-sm font-medium text-blue-600 dark:text-blue-400">
                {{ scope.row.skuCount }}
              </span>
            </template>
          </el-table-column>
          
          <el-table-column prop="publishStatus" label="刊登状态" width="120">
            <template #default="scope">
              <span :class="getPublishStatusClass(scope.row.publishStatus)" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                {{ getPublishStatusText(scope.row.publishStatus) }}
              </span>
            </template>
          </el-table-column>
          
          <el-table-column prop="creator" label="创建人" width="100">
            <template #default="scope">
              <div class="flex items-center space-x-2">
                <div class="w-6 h-6 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex items-center justify-center">
                  <span class="text-white text-xs font-medium">{{ scope.row.creator.charAt(0) }}</span>
                </div>
                <span class="text-sm text-gray-900 dark:text-dark-text">{{ scope.row.creator }}</span>
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
                <button @click="viewPodProduct(scope.row)"
                  class="inline-flex items-center px-3 py-1.5 text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-lg transition-all duration-200">
                  查看详情
                </button>
                <button @click="publishProduct(scope.row)"
                  class="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-dark-text-secondary hover:text-gray-700 dark:hover:text-dark-text bg-gray-50 dark:bg-dark-card hover:bg-gray-100 dark:hover:bg-dark-border rounded-lg transition-all duration-200">
                  刊登
                </button>
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

  <!-- 查看POD商品详情对话框 -->
  <ViewPodProductDialog v-model="showViewDialog" :product="selectedProduct" />
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import ViewPodProductDialog from './components/ViewPodProductDialog.vue';

// 类型定义
interface PodProduct {
  id: string;
  name: string;
  baseProduct: string;
  minPrice: number;
  skuCount: number;
  coverImage: string;
  publishStatus: 'unpublished' | 'published' | 'publishing';
  creator: string;
  createTime: string;
}

// 响应式数据
const loading = ref(false);
const showViewDialog = ref(false);
const selectedProduct = ref<PodProduct | null>(null);
const selectedRows = ref<PodProduct[]>([]);
const searchKeyword = ref('');

// 统计数据
const totalPodProducts = ref(86);
const publishedCount = ref(42);
const todayNewPodProducts = ref(8);
const averagePodPrice = ref(89.99);

// 分页数据
const pagination = ref({
  currentPage: 1,
  pageSize: 10,
  total: 0
});

// 模拟数据
const podProducts = ref<PodProduct[]>([
  {
    id: 'POD001',
    name: '个性化T恤 - 猫咪图案',
    baseProduct: '纯棉圆领T恤',
    minPrice: 79.9,
    skuCount: 6,
    coverImage: 'https://picsum.photos/400/400?random=101',
    publishStatus: 'published',
    creator: '张三',
    createTime: '2024-01-15 14:30:25'
  },
  {
    id: 'POD002',
    name: '定制马克杯 - 风景图案',
    baseProduct: '陶瓷马克杯',
    minPrice: 45.9,
    skuCount: 3,
    coverImage: 'https://picsum.photos/400/400?random=102',
    publishStatus: 'unpublished',
    creator: '李四',
    createTime: '2024-01-15 13:45:12'
  },
  {
    id: 'POD003',
    name: '艺术帆布包 - 抽象图案',
    baseProduct: '帆布手提袋',
    minPrice: 89.9,
    skuCount: 4,
    coverImage: 'https://picsum.photos/400/400?random=103',
    publishStatus: 'publishing',
    creator: '王五',
    createTime: '2024-01-15 12:20:08'
  },
  {
    id: 'POD004',
    name: '个性化手机壳 - 几何图案',
    baseProduct: 'iPhone手机壳',
    minPrice: 39.9,
    skuCount: 8,
    coverImage: 'https://picsum.photos/400/400?random=104',
    publishStatus: 'published',
    creator: '赵六',
    createTime: '2024-01-15 11:15:33'
  },
  {
    id: 'POD005',
    name: '定制抱枕 - 卡通图案',
    baseProduct: '方形抱枕',
    minPrice: 69.9,
    skuCount: 5,
    coverImage: 'https://picsum.photos/400/400?random=105',
    publishStatus: 'unpublished',
    creator: '钱七',
    createTime: '2024-01-15 10:30:45'
  }
]);

// 计算属性
const currentPagePodProducts = computed(() => {
  let filtered = podProducts.value;
  
  // 搜索过滤
  if (searchKeyword.value) {
    filtered = filtered.filter(product => 
      product.name.toLowerCase().includes(searchKeyword.value.toLowerCase()) ||
      product.baseProduct.toLowerCase().includes(searchKeyword.value.toLowerCase())
    );
  }
  
  const start = (pagination.value.currentPage - 1) * pagination.value.pageSize;
  const end = start + pagination.value.pageSize;
  return filtered.slice(start, end);
});

// 初始化
onMounted(() => {
  loadPodProducts();
});

// 方法
const loadPodProducts = () => {
  loading.value = true;
  setTimeout(() => {
    pagination.value.total = podProducts.value.length;
    loading.value = false;
  }, 500);
};

const getPublishStatusClass = (status: string) => {
  const statusClasses: Record<string, string> = {
    'published': 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
    'publishing': 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300',
    'unpublished': 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300'
  };
  return statusClasses[status] || statusClasses['unpublished'];
};

const getPublishStatusText = (status: string) => {
  const statusTexts: Record<string, string> = {
    'published': '已刊登',
    'publishing': '刊登中',
    'unpublished': '未刊登'
  };
  return statusTexts[status] || '未知';
};

const handleSelectionChange = (selection: PodProduct[]) => {
  selectedRows.value = selection;
};

const handleSearch = () => {
  pagination.value.currentPage = 1;
  loadPodProducts();
};

const viewPodProduct = (product: PodProduct) => {
  selectedProduct.value = product;
  showViewDialog.value = true;
};

const publishProduct = (product: PodProduct) => {
  ElMessage.success(`正在刊登商品：${product.name}`);
};

const exportPodProducts = () => {
  ElMessage.success('导出POD商品功能开发中...');
};

const batchPublish = () => {
  ElMessage.success(`正在批量刊登 ${selectedRows.value.length} 个POD商品...`);
};

// 分页相关方法
const handleSizeChange = (val: number) => {
  pagination.value.pageSize = val;
  pagination.value.currentPage = 1;
  loadPodProducts();
};

const handleCurrentChange = (val: number) => {
  pagination.value.currentPage = val;
  loadPodProducts();
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
