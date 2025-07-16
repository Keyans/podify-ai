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
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          <div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-dark-text">采集详情</h3>
            <p class="text-sm text-gray-600 dark:text-dark-text-secondary">任务ID: {{ collectionData?.id || '' }}</p>
          </div>
        </div>
        <button @click="handleClose" 
          class="p-2 text-gray-400 hover:text-gray-600 dark:text-dark-text-secondary dark:hover:text-dark-text rounded-lg hover:bg-gray-100 dark:hover:bg-dark-card transition-all duration-200">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </template>
    
    <!-- 采集信息概览 -->
    <div v-if="collectionData" class="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
        <div class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a1.994 1.994 0 01-1.414.586H7a4 4 0 01-4-4V7a4 4 0 014-4z"></path>
            </svg>
          </div>
          <div>
            <p class="text-xs text-blue-600 dark:text-blue-400 font-medium">采集类型</p>
            <p class="text-sm font-bold text-blue-900 dark:text-blue-100">{{ collectionData.type }}</p>
          </div>
        </div>
      </div>
      
      <div class="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-xl border border-green-200 dark:border-green-800">
        <div class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
            </svg>
          </div>
          <div>
            <p class="text-xs text-green-600 dark:text-green-400 font-medium">平台</p>
            <p class="text-sm font-bold text-green-900 dark:text-green-100">{{ collectionData.platform }}</p>
          </div>
        </div>
      </div>
      
      <div class="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-xl border border-purple-200 dark:border-purple-800">
        <div class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
          </div>
          <div>
            <p class="text-xs text-purple-600 dark:text-purple-400 font-medium">目标数量</p>
            <p class="text-sm font-bold text-purple-900 dark:text-purple-100">{{ collectionData.targetCount }}</p>
          </div>
        </div>
      </div>
      
      <div class="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800">
        <div class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div>
            <p class="text-xs text-emerald-600 dark:text-emerald-400 font-medium">成功数量</p>
            <p class="text-sm font-bold text-emerald-900 dark:text-emerald-100">{{ collectionData.successCount }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 采集结果列表 -->
    <div class="px-6 pb-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-dark-text mb-4">采集结果</h3>
      <div class="bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-dark-border overflow-hidden">
        <el-table 
          :data="detailsList" 
          style="width: 100%" 
          v-loading="loading"
          max-height="400"
          class="modern-table"
        >
          <el-table-column prop="index" label="序号" width="80" align="center" />
          <el-table-column label="主图" width="100" align="center">
            <template #default="scope">
              <div v-if="scope.row.mainImage" class="flex justify-center">
                <el-image
                  :src="scope.row.mainImage"
                  :preview-src-list="[scope.row.mainImage]"
                  fit="cover"
                  class="w-16 h-16 rounded-lg border border-gray-200 dark:border-dark-border"
                  :preview-teleported="true"
                />
              </div>
              <div v-else class="text-gray-400 text-xs">无图片</div>
            </template>
          </el-table-column>
          <el-table-column label="标题" min-width="200">
            <template #default="scope">
              <div v-if="scope.row.title" class="text-sm font-medium text-gray-900 dark:text-dark-text">
                {{ scope.row.title }}
              </div>
              <div v-else class="text-gray-400 text-xs">无标题</div>
            </template>
          </el-table-column>
          <el-table-column prop="price" label="价格" width="100" align="center">
            <template #default="scope">
              <span v-if="scope.row.price" class="text-red-600 dark:text-red-400 font-medium">
                {{ scope.row.price }}
              </span>
              <span v-else class="text-gray-400 text-xs">-</span>
            </template>
          </el-table-column>
          <el-table-column prop="rating" label="评分" width="120" align="center">
            <template #default="scope">
              <div v-if="scope.row.rating" class="flex items-center justify-center">
                <el-rate
                  v-model="scope.row.rating"
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="{value}"
                  size="small"
                />
              </div>
              <span v-else class="text-gray-400 text-xs">-</span>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态" width="100" align="center">
            <template #default="scope">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    :class="scope.row.status === '成功' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'">
                {{ scope.row.status }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120" align="center">
            <template #default="scope">
              <button 
                v-if="scope.row.originalUrl" 
                @click="openOriginalUrl(scope.row.originalUrl)"
                class="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium">
                查看原链接
              </button>
            </template>
          </el-table-column>
        </el-table>
        
        <!-- 分页 -->
        <div class="flex justify-center p-4 border-t border-gray-200 dark:border-dark-border">
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 50]"
            :total="total"
            layout="total, sizes, prev, pager, next"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>

    <template #footer>
      <div class="flex items-center justify-between p-6 border-t border-gray-100 dark:border-dark-border bg-gray-50 dark:bg-dark-card/50">
        <div class="text-sm text-gray-600 dark:text-dark-text-secondary">
          共 {{ total }} 条采集结果
        </div>
        <div class="flex items-center space-x-3">
          <button @click="handleClose"
            class="px-6 py-2.5 text-gray-700 dark:text-dark-text font-medium rounded-lg border border-gray-300 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-border transition-all duration-200">
            关闭
          </button>
          <button @click="exportDetails"
            class="inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
            <Download class="w-5 h-5 mr-2" />
            导出详情
          </button>
        </div>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { ElMessage } from 'element-plus';
import { Download } from '@element-plus/icons-vue';

// Props
interface Props {
  modelValue: boolean;
  collectionData: any;
}

// Emits
interface Emits {
  (e: 'update:modelValue', value: boolean): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// 响应式数据
const loading = ref(false);
const currentPage = ref(1);
const pageSize = ref(20);
const total = ref(0);

// 模拟详情数据
const detailsList = ref([
  {
    index: 1,
    title: 'Apple iPhone 15 Pro Max 256GB Natural Titanium',
    mainImage: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=200&h=200&fit=crop',
    price: '$1,199.00',
    rating: 4.5,
    status: '成功',
    originalUrl: 'https://amazon.com/example1'
  },
  {
    index: 2,
    title: 'Samsung Galaxy S24 Ultra 512GB Titanium Black',
    mainImage: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop',
    price: '$1,299.99',
    rating: 4.3,
    status: '成功',
    originalUrl: 'https://amazon.com/example2'
  },
  {
    index: 3,
    title: '',
    mainImage: '',
    price: '',
    rating: 0,
    status: '失败',
    originalUrl: 'https://amazon.com/example3'
  }
]);

// 计算属性
const dialogVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

// 方法
const openOriginalUrl = (url: string) => {
  window.open(url, '_blank');
};

const exportDetails = () => {
  ElMessage.success('导出详情功能开发中...');
};

const handleSizeChange = (val: number) => {
  pageSize.value = val;
  loadDetails();
};

const handleCurrentChange = (val: number) => {
  currentPage.value = val;
  loadDetails();
};

const loadDetails = () => {
  loading.value = true;
  setTimeout(() => {
    total.value = detailsList.value.length;
    loading.value = false;
  }, 300);
};

const handleClose = () => {
  emit('update:modelValue', false);
};

// 监听弹窗显示状态
watch(dialogVisible, (newVal) => {
  if (newVal && props.collectionData) {
    currentPage.value = 1;
    loadDetails();
  }
});
</script>

<style scoped>
.modern-dialog :deep(.el-dialog) {
  border-radius: 16px;
  overflow: hidden;
  background: white;
}

.dark .modern-dialog :deep(.el-dialog) {
  background: rgb(30, 41, 59);
  border: 1px solid rgb(71, 85, 105);
}

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

.modern-table :deep(.el-table__row:hover) {
  background-color: rgba(59, 130, 246, 0.05) !important;
}
</style>
