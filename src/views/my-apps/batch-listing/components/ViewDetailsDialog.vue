<template>
  <el-dialog
    v-model="dialogVisible"
    width="1000px"
    align-center
    :before-close="handleClose"
    :show-close="false"
    class="modern-dialog">
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
            <h3 class="text-xl font-bold text-gray-900 dark:text-dark-text">刊登任务详情</h3>
            <p class="text-sm text-gray-600 dark:text-dark-text-secondary">查看任务信息和刊登结果</p>
          </div>
        </div>
        <button @click="handleClose" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </template>

    <div v-if="task" class="p-6 space-y-6">
      <!-- 任务基本信息 -->
      <div class="bg-gray-50 dark:bg-dark-card rounded-lg p-4">
        <h4 class="text-lg font-semibold text-gray-900 dark:text-dark-text mb-4">任务信息</h4>
        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-dark-text-secondary">任务ID:</span>
              <span class="font-medium text-gray-900 dark:text-dark-text">{{ task.id }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-dark-text-secondary">刊登平台:</span>
              <span class="font-medium text-gray-900 dark:text-dark-text">{{ task.platform }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-dark-text-secondary">商品数量:</span>
              <span class="font-medium text-gray-900 dark:text-dark-text">{{ task.productCount }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-dark-text-secondary">成功数量:</span>
              <span class="font-medium text-green-600 dark:text-green-400">{{ task.successCount }}</span>
            </div>
          </div>
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-dark-text-secondary">任务状态:</span>
              <span :class="getStatusClass(task.status)" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                {{ getStatusText(task.status) }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-dark-text-secondary">操作人:</span>
              <span class="font-medium text-gray-900 dark:text-dark-text">{{ task.operator }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-dark-text-secondary">创建时间:</span>
              <span class="font-medium text-gray-900 dark:text-dark-text">{{ task.createTime }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-dark-text-secondary">成功率:</span>
              <span class="font-medium text-blue-600 dark:text-blue-400">
                {{ ((task.successCount / task.productCount) * 100).toFixed(1) }}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- 刊登结果列表 -->
      <div>
        <div class="flex justify-between items-center mb-4">
          <h4 class="text-lg font-semibold text-gray-900 dark:text-dark-text">刊登结果</h4>
          <div class="flex space-x-2">
            <el-select v-model="statusFilter" placeholder="状态筛选" style="width: 120px" size="small">
              <el-option label="全部" value="" />
              <el-option label="成功" value="success" />
              <el-option label="失败" value="failed" />
            </el-select>
            <el-button size="small" @click="exportResults">导出结果</el-button>
          </div>
        </div>

        <div class="border border-gray-200 dark:border-dark-border rounded-lg overflow-hidden">
          <el-table
            :data="filteredResults"
            max-height="400"
            v-loading="loading"
          >
            <el-table-column type="index" label="序号" width="60" />
            
            <el-table-column label="商品信息" min-width="200">
              <template #default="scope">
                <div class="flex items-center space-x-3">
                  <el-image
                    :src="scope.row.productImage"
                    fit="cover"
                    class="w-12 h-12 rounded border border-gray-200 dark:border-dark-border"
                  />
                  <div>
                    <div class="font-medium text-gray-900 dark:text-dark-text">{{ scope.row.productName }}</div>
                    <div class="text-sm text-gray-500 dark:text-dark-text-secondary">SKU: {{ scope.row.sku }}</div>
                  </div>
                </div>
              </template>
            </el-table-column>
            
            <el-table-column prop="price" label="价格" width="100">
              <template #default="scope">
                <span class="font-medium text-green-600 dark:text-green-400">
                  ¥{{ scope.row.price }}
                </span>
              </template>
            </el-table-column>
            
            <el-table-column prop="status" label="刊登状态" width="120">
              <template #default="scope">
                <span :class="getResultStatusClass(scope.row.status)" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                  {{ getResultStatusText(scope.row.status) }}
                </span>
              </template>
            </el-table-column>
            
            <el-table-column prop="platformProductId" label="平台商品ID" width="150">
              <template #default="scope">
                <span v-if="scope.row.platformProductId" class="font-mono text-sm text-gray-900 dark:text-dark-text">
                  {{ scope.row.platformProductId }}
                </span>
                <span v-else class="text-gray-400">-</span>
              </template>
            </el-table-column>
            
            <el-table-column prop="errorMessage" label="错误信息" min-width="200">
              <template #default="scope">
                <span v-if="scope.row.errorMessage" class="text-red-600 dark:text-red-400 text-sm">
                  {{ scope.row.errorMessage }}
                </span>
                <span v-else class="text-gray-400">-</span>
              </template>
            </el-table-column>
            
            <el-table-column prop="listingTime" label="刊登时间" width="150">
              <template #default="scope">
                <span v-if="scope.row.listingTime" class="text-sm text-gray-600 dark:text-dark-text-secondary">
                  {{ scope.row.listingTime }}
                </span>
                <span v-else class="text-gray-400">-</span>
              </template>
            </el-table-column>
            
            <el-table-column label="操作" width="100">
              <template #default="scope">
                <el-button
                  v-if="scope.row.status === 'failed'"
                  type="primary"
                  link
                  size="small"
                  @click="retryListing(scope.row)"
                >
                  重试
                </el-button>
                <el-button
                  v-else-if="scope.row.platformProductId"
                  type="primary"
                  link
                  size="small"
                  @click="viewOnPlatform(scope.row)"
                >
                  查看
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <!-- 分页 -->
        <div class="flex justify-center mt-4">
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 50]"
            :total="filteredResults.length"
            layout="sizes, prev, pager, next"
            small
          />
        </div>
      </div>
    </div>

    <!-- 对话框底部 -->
    <template #footer>
      <div class="flex items-center justify-end p-6 border-t border-gray-100 dark:border-dark-border bg-gray-50 dark:bg-dark-card/50 space-x-3">
        <button @click="handleClose"
          class="px-6 py-2.5 text-gray-700 dark:text-dark-text font-medium rounded-lg border border-gray-300 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-border transition-all duration-200">
          关闭
        </button>
        <button
          v-if="task && (task.status === 'failed' || task.status === 'partial_failed')"
          @click="retryTask"
          class="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
        >
          重试任务
        </button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { ElMessage } from 'element-plus';

// Props
interface Props {
  modelValue: boolean;
  task: ListingTask | null;
}

// Emits
interface Emits {
  (e: 'update:modelValue', value: boolean): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// 类型定义
interface ListingTask {
  id: string;
  platform: string;
  productCount: number;
  successCount: number;
  status: 'completed' | 'processing' | 'failed' | 'partial_failed' | 'pending';
  operator: string;
  createTime: string;
}

interface ListingResult {
  id: string;
  productName: string;
  productImage: string;
  sku: string;
  price: number;
  status: 'success' | 'failed';
  platformProductId?: string;
  errorMessage?: string;
  listingTime?: string;
}

// 响应式数据
const dialogVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const loading = ref(false);
const statusFilter = ref('');
const currentPage = ref(1);
const pageSize = ref(10);
const listingResults = ref<ListingResult[]>([]);

// 监听任务变化，加载详情数据
watch(() => props.task, (newTask) => {
  if (newTask) {
    loadTaskDetails(newTask.id);
  }
}, { immediate: true });

// 计算属性
const filteredResults = computed(() => {
  let filtered = listingResults.value;
  
  if (statusFilter.value) {
    filtered = filtered.filter(result => result.status === statusFilter.value);
  }
  
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filtered.slice(start, end);
});

// 方法
const loadTaskDetails = async (_taskId: string) => {
  loading.value = true;
  try {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // 模拟刊登结果数据
    listingResults.value = [
      {
        id: '1',
        productName: '个性化T恤 - 猫咪图案',
        productImage: 'https://picsum.photos/400/400?random=201',
        sku: 'POD001-S-RED',
        price: 79.9,
        status: 'success',
        platformProductId: 'AMZ123456789',
        listingTime: '2024-01-15 14:35:20'
      },
      {
        id: '2',
        productName: '个性化T恤 - 猫咪图案',
        productImage: 'https://picsum.photos/400/400?random=201',
        sku: 'POD001-M-BLUE',
        price: 79.9,
        status: 'failed',
        errorMessage: '商品标题过长，超出平台限制'
      },
      {
        id: '3',
        productName: '定制马克杯 - 风景图案',
        productImage: 'https://picsum.photos/400/400?random=202',
        sku: 'POD002-WHITE',
        price: 45.9,
        status: 'success',
        platformProductId: 'AMZ987654321',
        listingTime: '2024-01-15 14:36:15'
      }
    ];
  } catch (error) {
    ElMessage.error('加载任务详情失败');
  } finally {
    loading.value = false;
  }
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

const getResultStatusClass = (status: string) => {
  const statusClasses: Record<string, string> = {
    'success': 'bg-green-100 text-green-800',
    'failed': 'bg-red-100 text-red-800'
  };
  return statusClasses[status] || '';
};

const getResultStatusText = (status: string) => {
  const statusTexts: Record<string, string> = {
    'success': '成功',
    'failed': '失败'
  };
  return statusTexts[status] || '未知';
};

const retryListing = (result: ListingResult) => {
  ElMessage.success(`正在重试刊登商品：${result.productName}`);
  // 这里应该调用重试刊登API
};

const viewOnPlatform = (result: ListingResult) => {
  ElMessage.info(`跳转到平台查看商品：${result.platformProductId}`);
  // 这里应该打开平台商品页面
};

const exportResults = () => {
  ElMessage.success('正在导出刊登结果...');
  // 这里应该调用导出API
};

const retryTask = () => {
  ElMessage.success(`正在重试任务：${props.task?.id}`);
  // 这里应该调用重试任务API
};

const handleClose = () => {
  statusFilter.value = '';
  currentPage.value = 1;
  emit('update:modelValue', false);
};
</script>

<style scoped>
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

.modern-dialog :deep(.el-dialog) {
  border-radius: 16px;
  overflow: hidden;
  background: white;
}

.dark .modern-dialog :deep(.el-dialog) {
  background: rgb(30, 41, 59);
  border: 1px solid rgb(71, 85, 105);
}

.modern-table {
  width: 100% !important;
}

.modern-table :deep(.el-table) {
  width: 100% !important;
}

.modern-table :deep(.el-table__row:hover) {
  background-color: rgba(59, 130, 246, 0.05) !important;
}
</style>
