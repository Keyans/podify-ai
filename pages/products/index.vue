<template>
  <div class="space-y-6">
    <!-- 页面标题 -->
    <div class="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-2xl p-6 border border-amber-100 dark:border-amber-800">
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
          </svg>
        </div>
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-dark-text">白品管理</h1>
          <p class="mt-1 text-sm text-gray-600 dark:text-dark-text-secondary">管理您的基础商品信息和SKU</p>
        </div>
      </div>
    </div>

    <!-- 统计卡片 -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-elegant dark:shadow-elegant-dark border border-gray-100 dark:border-dark-border hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-dark-text-secondary">商品总数</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-dark-text">{{ totalProducts }}</p>
          </div>
          <div class="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-elegant dark:shadow-elegant-dark border border-gray-100 dark:border-dark-border hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-dark-text-secondary">SKU总数</p>
            <p class="text-2xl font-bold text-green-600 dark:text-green-400">{{ totalSkus }}</p>
          </div>
          <div class="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-elegant dark:shadow-elegant-dark border border-gray-100 dark:border-dark-border hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-dark-text-secondary">今日新增</p>
            <p class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ todayNewProducts }}</p>
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
            <p class="text-2xl font-bold text-orange-600 dark:text-orange-400">¥{{ averagePrice }}</p>
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
          <button @click="showCreateDialog = true"
            class="inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            创建商品
          </button>
          <button @click="exportProducts"
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
            <button @click="batchExport"
              class="inline-flex items-center px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium rounded-lg transition-all duration-200">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
              </svg>
              批量导出
            </button>
          </div>
        </div>

        <!-- 搜索框 -->
        <div class="relative">
          <input
            v-model="searchKeyword"
            type="text"
            placeholder="搜索商品名称、SKU..."
            class="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 dark:bg-dark-card dark:text-dark-text"
            @input="handleSearch"
          />
          <svg class="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
      </div>
    </div>

    <!-- 商品列表 -->
    <div class="bg-white dark:bg-dark-surface rounded-xl shadow-elegant dark:shadow-elegant-dark border border-gray-100 dark:border-dark-border overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-100 dark:border-dark-border">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-dark-text">商品列表</h3>
        <p class="text-sm text-gray-600 dark:text-dark-text-secondary mt-1">管理您的所有商品信息</p>
      </div>

      <div class="overflow-x-auto">
        <el-table
          :data="currentPageProducts"
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

          <el-table-column prop="creator" label="创建人" width="100">
            <template #default="scope">
              <div class="flex items-center space-x-2">
                <div class="w-6 h-6 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center">
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
                <button @click="viewProduct(scope.row)"
                  class="inline-flex items-center px-3 py-1.5 text-sm font-medium text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 bg-amber-50 dark:bg-amber-900/20 hover:bg-amber-100 dark:hover:bg-amber-900/30 rounded-lg transition-all duration-200">
                  查看详情
                </button>
                <button @click="editProduct(scope.row)"
                  class="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-dark-text-secondary hover:text-gray-700 dark:hover:text-dark-text bg-gray-50 dark:bg-dark-card hover:bg-gray-100 dark:hover:bg-dark-border rounded-lg transition-all duration-200">
                  编辑
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

  <!-- 创建商品对话框 -->
  <CreateProductDialog v-model="showCreateDialog" @success="refreshData" />

  <!-- 查看商品详情对话框 -->
  <ViewProductDialog v-model="showViewDialog" :product="selectedProduct" />

  <!-- 编辑商品对话框 -->
  <EditProductDialog v-model="showEditDialog" :product="selectedProduct" @success="refreshData" />
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import CreateProductDialog from './components/CreateProductDialog.vue';
import ViewProductDialog from './components/ViewProductDialog.vue';
import EditProductDialog from './components/EditProductDialog.vue';

// 类型定义
interface ProductSku {
  id: string;
  attributes: Record<string, string>;
  price: number;
  stock: number;
  image?: string;
}

interface Product {
  id: string;
  name: string;
  minPrice: number;
  skuCount: number;
  coverImage: string;
  additionalImages: string[];
  skus: ProductSku[];
  creator: string;
  createTime: string;
}

// 响应式数据
const loading = ref(false);
const showCreateDialog = ref(false);
const showViewDialog = ref(false);
const showEditDialog = ref(false);
const selectedProduct = ref<Product | null>(null);
const selectedRows = ref<Product[]>([]);
const searchKeyword = ref('');

// 统计数据
const totalProducts = ref(128);
const totalSkus = ref(456);
const todayNewProducts = ref(12);
const averagePrice = ref(199.99);

// 分页数据
const pagination = ref({
  currentPage: 1,
  pageSize: 10,
  total: 0
});

// 模拟数据
const products = ref<Product[]>([
  {
    id: 'P001',
    name: '时尚休闲T恤 纯棉圆领短袖',
    minPrice: 69.9,
    skuCount: 6,
    coverImage: 'https://picsum.photos/400/400?random=1',
    additionalImages: [
      'https://picsum.photos/400/400?random=11',
      'https://picsum.photos/400/400?random=12'
    ],
    skus: [
      { id: 'SKU001', attributes: { 'color': '白色', 'size': 'M' }, price: 69.9, stock: 100 },
      { id: 'SKU002', attributes: { 'color': '白色', 'size': 'L' }, price: 69.9, stock: 80 },
      { id: 'SKU003', attributes: { 'color': '黑色', 'size': 'M' }, price: 69.9, stock: 90 },
      { id: 'SKU004', attributes: { 'color': '黑色', 'size': 'L' }, price: 69.9, stock: 70 },
      { id: 'SKU005', attributes: { 'color': '蓝色', 'size': 'M' }, price: 69.9, stock: 85 },
      { id: 'SKU006', attributes: { 'color': '蓝色', 'size': 'L' }, price: 69.9, stock: 65 }
    ],
    creator: '张三',
    createTime: '2024-01-15 14:30:25'
  },
  {
    id: 'P002',
    name: '夏季薄款牛仔裤 直筒宽松',
    minPrice: 129.9,
    skuCount: 4,
    coverImage: 'https://picsum.photos/400/400?random=2',
    additionalImages: [
      'https://picsum.photos/400/400?random=21',
      'https://picsum.photos/400/400?random=22'
    ],
    skus: [
      { id: 'SKU007', attributes: { 'color': '浅蓝', 'size': '30' }, price: 129.9, stock: 50 },
      { id: 'SKU008', attributes: { 'color': '浅蓝', 'size': '32' }, price: 129.9, stock: 45 },
      { id: 'SKU009', attributes: { 'color': '深蓝', 'size': '30' }, price: 129.9, stock: 55 },
      { id: 'SKU010', attributes: { 'color': '深蓝', 'size': '32' }, price: 129.9, stock: 40 }
    ],
    creator: '李四',
    createTime: '2024-01-15 13:45:12'
  },
  {
    id: 'P003',
    name: '运动休闲鞋 轻便透气',
    minPrice: 199.9,
    skuCount: 8,
    coverImage: 'https://picsum.photos/400/400?random=3',
    additionalImages: [
      'https://picsum.photos/400/400?random=31',
      'https://picsum.photos/400/400?random=32'
    ],
    skus: [
      { id: 'SKU011', attributes: { 'color': '白色', 'size': '39' }, price: 199.9, stock: 30 },
      { id: 'SKU012', attributes: { 'color': '白色', 'size': '40' }, price: 199.9, stock: 35 },
      { id: 'SKU013', attributes: { 'color': '白色', 'size': '41' }, price: 199.9, stock: 40 },
      { id: 'SKU014', attributes: { 'color': '白色', 'size': '42' }, price: 199.9, stock: 38 },
      { id: 'SKU015', attributes: { 'color': '黑色', 'size': '39' }, price: 199.9, stock: 32 },
      { id: 'SKU016', attributes: { 'color': '黑色', 'size': '40' }, price: 199.9, stock: 36 },
      { id: 'SKU017', attributes: { 'color': '黑色', 'size': '41' }, price: 199.9, stock: 42 },
      { id: 'SKU018', attributes: { 'color': '黑色', 'size': '42' }, price: 199.9, stock: 40 }
    ],
    creator: '王五',
    createTime: '2024-01-15 12:20:08'
  },
  {
    id: 'P004',
    name: '女士连衣裙 碎花雪纺',
    minPrice: 159.9,
    skuCount: 6,
    coverImage: 'https://picsum.photos/400/400?random=4',
    additionalImages: [
      'https://picsum.photos/400/400?random=41',
      'https://picsum.photos/400/400?random=42'
    ],
    skus: [
      { id: 'SKU019', attributes: { 'color': '蓝色', 'size': 'S' }, price: 159.9, stock: 25 },
      { id: 'SKU020', attributes: { 'color': '蓝色', 'size': 'M' }, price: 159.9, stock: 30 },
      { id: 'SKU021', attributes: { 'color': '蓝色', 'size': 'L' }, price: 159.9, stock: 20 },
      { id: 'SKU022', attributes: { 'color': '粉色', 'size': 'S' }, price: 159.9, stock: 28 },
      { id: 'SKU023', attributes: { 'color': '粉色', 'size': 'M' }, price: 159.9, stock: 32 },
      { id: 'SKU024', attributes: { 'color': '粉色', 'size': 'L' }, price: 159.9, stock: 22 }
    ],
    creator: '赵六',
    createTime: '2024-01-15 11:15:33'
  },
  {
    id: 'P005',
    name: '男士商务西装 修身款',
    minPrice: 599.9,
    skuCount: 9,
    coverImage: 'https://picsum.photos/400/400?random=5',
    additionalImages: [
      'https://picsum.photos/400/400?random=51',
      'https://picsum.photos/400/400?random=52'
    ],
    skus: [
      { id: 'SKU025', attributes: { 'color': '黑色', 'size': '48' }, price: 599.9, stock: 15 },
      { id: 'SKU026', attributes: { 'color': '黑色', 'size': '50' }, price: 599.9, stock: 18 },
      { id: 'SKU027', attributes: { 'color': '黑色', 'size': '52' }, price: 599.9, stock: 12 },
      { id: 'SKU028', attributes: { 'color': '藏青', 'size': '48' }, price: 599.9, stock: 16 },
      { id: 'SKU029', attributes: { 'color': '藏青', 'size': '50' }, price: 599.9, stock: 19 },
      { id: 'SKU030', attributes: { 'color': '藏青', 'size': '52' }, price: 599.9, stock: 14 },
      { id: 'SKU031', attributes: { 'color': '灰色', 'size': '48' }, price: 599.9, stock: 17 },
      { id: 'SKU032', attributes: { 'color': '灰色', 'size': '50' }, price: 599.9, stock: 20 },
      { id: 'SKU033', attributes: { 'color': '灰色', 'size': '52' }, price: 599.9, stock: 15 }
    ],
    creator: '钱七',
    createTime: '2024-01-15 10:30:45'
  }
]);

// 计算属性
const currentPageProducts = computed(() => {
  let filtered = products.value;

  // 搜索过滤
  if (searchKeyword.value) {
    filtered = filtered.filter(product =>
      product.name.toLowerCase().includes(searchKeyword.value.toLowerCase()) ||
      product.skus.some(sku => sku.id.toLowerCase().includes(searchKeyword.value.toLowerCase()))
    );
  }

  const start = (pagination.value.currentPage - 1) * pagination.value.pageSize;
  const end = start + pagination.value.pageSize;
  return filtered.slice(start, end);
});

// 初始化
onMounted(() => {
  loadProducts();
});

// 方法
const loadProducts = () => {
  loading.value = true;
  setTimeout(() => {
    pagination.value.total = products.value.length;
    loading.value = false;
  }, 500);
};

const handleSelectionChange = (selection: Product[]) => {
  selectedRows.value = selection;
};

const handleSearch = () => {
  pagination.value.currentPage = 1;
  loadProducts();
};

const viewProduct = (product: Product) => {
  selectedProduct.value = product;
  showViewDialog.value = true;
};

const editProduct = (product: Product) => {
  selectedProduct.value = product;
  showEditDialog.value = true;
};

const exportProducts = () => {
  ElMessage.success('导出商品功能开发中...');
};

const batchExport = () => {
  ElMessage.success(`正在批量导出 ${selectedRows.value.length} 个商品...`);
};

const refreshData = () => {
  ElMessage.success('操作成功！');
  loadProducts();
};

// 分页相关方法
const handleSizeChange = (val: number) => {
  pagination.value.pageSize = val;
  pagination.value.currentPage = 1;
  loadProducts();
};

const handleCurrentChange = (val: number) => {
  pagination.value.currentPage = val;
  loadProducts();
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
  background-color: rgba(245, 158, 11, 0.05) !important;
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
