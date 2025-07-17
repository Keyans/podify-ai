<template>
  <el-dialog
    v-model="dialogVisible"
    width="1000px"
    align-center
    :show-close="false"
    class="modern-dialog">
    <!-- 自定义标题 -->
    <template #header>
      <div class="flex items-center justify-between p-6 border-b border-gray-100 dark:border-dark-border">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
            </svg>
          </div>
          <div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-dark-text">选择POD商品</h3>
            <p class="text-sm text-gray-600 dark:text-dark-text-secondary">选择要批量刊登的POD商品</p>
          </div>
        </div>
        <button @click="handleClose" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </template>

    <div class="p-6 space-y-4">
      <!-- 搜索和筛选区域 -->
      <div class="flex justify-between items-center">
        <div class="flex space-x-3">
          <el-input
            v-model="searchKeyword"
            placeholder="搜索商品名称..."
            style="width: 250px"
            clearable
          >
            <template #prefix>
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </template>
          </el-input>
          
          <el-select v-model="statusFilter" placeholder="刊登状态" style="width: 120px" clearable>
            <el-option label="全部" value="" />
            <el-option label="未刊登" value="unpublished" />
            <el-option label="已刊登" value="published" />
            <el-option label="刊登中" value="publishing" />
          </el-select>
        </div>
        
        <div class="text-sm text-gray-600 dark:text-dark-text-secondary">
          已选择 {{ selectedProducts.length }} 个商品
        </div>
      </div>

      <!-- 商品网格 -->
      <div class="border border-gray-200 dark:border-dark-border rounded-lg p-4">
        <div class="grid grid-cols-5 gap-4 max-h-96 overflow-y-auto">
          <div
            v-for="product in currentPageProducts"
            :key="product.id"
            class="border-2 rounded-lg p-3 cursor-pointer transition-all duration-200 hover:shadow-md relative"
            :class="isProductSelected(product.id) ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-dark-border hover:border-blue-300'"
            @click="toggleProduct(product)"
          >
            <!-- 选中标识 -->
            <div v-if="isProductSelected(product.id)" class="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            
            <!-- 商品图片 -->
            <el-image
              :src="product.coverImage"
              fit="cover"
              class="w-full h-24 rounded mb-2"
            />
            
            <!-- 商品信息 -->
            <div class="space-y-1">
              <div class="text-sm font-medium text-gray-900 dark:text-dark-text truncate" :title="product.name">
                {{ product.name }}
              </div>
              <div class="text-xs text-gray-500 dark:text-dark-text-secondary truncate">
                {{ product.baseProduct }}
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-green-600 dark:text-green-400">
                  ¥{{ product.minPrice }}
                </span>
                <span :class="getPublishStatusClass(product.publishStatus)" class="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium">
                  {{ getPublishStatusText(product.publishStatus) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 分页 -->
      <div class="flex justify-between items-center">
        <div class="text-sm text-gray-600 dark:text-dark-text-secondary">
          共 {{ filteredProducts.length }} 个商品
        </div>
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[15, 30, 45]"
          :total="filteredProducts.length"
          layout="sizes, prev, pager, next"
          small
        />
      </div>
    </div>

    <!-- 对话框底部 -->
    <template #footer>
      <div class="flex items-center justify-between p-6 border-t border-gray-100 dark:border-dark-border bg-gray-50 dark:bg-dark-card/50">
        <div class="flex space-x-2">
          <button @click="selectAll"
            class="px-4 py-2 text-sm text-gray-700 dark:text-dark-text font-medium rounded-lg border border-gray-300 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-border transition-all duration-200">
            全选
          </button>
          <button @click="clearSelection"
            class="px-4 py-2 text-sm text-gray-700 dark:text-dark-text font-medium rounded-lg border border-gray-300 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-border transition-all duration-200">
            清空
          </button>
        </div>
        <div class="flex space-x-3">
          <button @click="handleClose"
            class="px-6 py-2.5 text-gray-700 dark:text-dark-text font-medium rounded-lg border border-gray-300 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-border transition-all duration-200">
            取消
          </button>
          <button
            @click="handleConfirm"
            :disabled="selectedProducts.length === 0"
            class="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            确认选择 ({{ selectedProducts.length }})
          </button>
        </div>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { ElMessage } from 'element-plus';

// Props
interface Props {
  modelValue: boolean;
}

// Emits
interface Emits {
  (e: 'update:modelValue', value: boolean): void;
  (e: 'select', products: PodProduct[]): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

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
const dialogVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const searchKeyword = ref('');
const statusFilter = ref('');
const currentPage = ref(1);
const pageSize = ref(15);
const selectedProducts = ref<PodProduct[]>([]);

// 模拟POD商品数据
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
  },
  {
    id: 'POD006',
    name: '创意鼠标垫 - 星空图案',
    baseProduct: '橡胶鼠标垫',
    minPrice: 29.9,
    skuCount: 2,
    coverImage: 'https://picsum.photos/400/400?random=106',
    publishStatus: 'published',
    creator: '孙八',
    createTime: '2024-01-15 09:20:15'
  },
  {
    id: 'POD007',
    name: '个性化水杯 - 励志文字',
    baseProduct: '不锈钢保温杯',
    minPrice: 59.9,
    skuCount: 4,
    coverImage: 'https://picsum.photos/400/400?random=107',
    publishStatus: 'unpublished',
    creator: '周九',
    createTime: '2024-01-15 08:15:30'
  },
  {
    id: 'POD008',
    name: '定制笔记本 - 花卉图案',
    baseProduct: 'A5线装笔记本',
    minPrice: 35.9,
    skuCount: 3,
    coverImage: 'https://picsum.photos/400/400?random=108',
    publishStatus: 'publishing',
    creator: '吴十',
    createTime: '2024-01-15 07:10:45'
  }
]);

// 计算属性
const filteredProducts = computed(() => {
  let filtered = podProducts.value;
  
  // 搜索过滤
  if (searchKeyword.value) {
    filtered = filtered.filter(product => 
      product.name.toLowerCase().includes(searchKeyword.value.toLowerCase()) ||
      product.baseProduct.toLowerCase().includes(searchKeyword.value.toLowerCase())
    );
  }
  
  // 状态过滤
  if (statusFilter.value) {
    filtered = filtered.filter(product => product.publishStatus === statusFilter.value);
  }
  
  return filtered;
});

const currentPageProducts = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filteredProducts.value.slice(start, end);
});

// 方法
const isProductSelected = (productId: string) => {
  return selectedProducts.value.some(p => p.id === productId);
};

const toggleProduct = (product: PodProduct) => {
  const index = selectedProducts.value.findIndex(p => p.id === product.id);
  if (index > -1) {
    selectedProducts.value.splice(index, 1);
  } else {
    selectedProducts.value.push(product);
  }
};

const selectAll = () => {
  selectedProducts.value = [...filteredProducts.value];
};

const clearSelection = () => {
  selectedProducts.value = [];
};

const getPublishStatusClass = (status: string) => {
  const statusClasses: Record<string, string> = {
    'published': 'bg-green-100 text-green-800',
    'publishing': 'bg-yellow-100 text-yellow-800',
    'unpublished': 'bg-gray-100 text-gray-800'
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

const handleConfirm = () => {
  if (selectedProducts.value.length === 0) {
    ElMessage.warning('请选择至少一个POD商品');
    return;
  }
  
  emit('select', selectedProducts.value);
  handleClose();
};

const handleClose = () => {
  selectedProducts.value = [];
  searchKeyword.value = '';
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

/* 棋盘格背景样式 - 用于透明图片预览 */
.checkerboard-bg {
  background-image: linear-gradient(45deg, #f0f0f0 25%, transparent 25%),
    linear-gradient(-45deg, #f0f0f0 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #f0f0f0 75%),
    linear-gradient(-45deg, transparent 75%, #f0f0f0 75%);
  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
}

.dark .checkerboard-bg {
  background-image: linear-gradient(45deg, #2a2a2a 25%, transparent 25%),
    linear-gradient(-45deg, #2a2a2a 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #2a2a2a 75%),
    linear-gradient(-45deg, transparent 75%, #2a2a2a 75%);
}
</style>
