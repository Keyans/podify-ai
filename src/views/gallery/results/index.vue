<template>
  <div class="space-y-6">
    <!-- 页面标题 -->
    <div class="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl p-6 border border-orange-100 dark:border-orange-800">
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
          </svg>
        </div>
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-dark-text">处理结果</h1>
          <p class="mt-1 text-sm text-gray-600 dark:text-dark-text-secondary">管理AI处理后的图片结果</p>
        </div>
      </div>
    </div>

    <!-- 统计卡片 -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-elegant dark:shadow-elegant-dark border border-gray-100 dark:border-dark-border hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-dark-text-secondary">处理结果总数</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-dark-text">{{ totalResults }}</p>
          </div>
          <div class="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-elegant dark:shadow-elegant-dark border border-gray-100 dark:border-dark-border hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-dark-text-secondary">抠图结果</p>
            <p class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ cutoutResults }}</p>
          </div>
          <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M19 10a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-elegant dark:shadow-elegant-dark border border-gray-100 dark:border-dark-border hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-dark-text-secondary">裁图结果</p>
            <p class="text-2xl font-bold text-green-600 dark:text-green-400">{{ cropResults }}</p>
          </div>
          <div class="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-elegant dark:shadow-elegant-dark border border-gray-100 dark:border-dark-border hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-dark-text-secondary">裂变结果</p>
            <p class="text-2xl font-bold text-purple-600 dark:text-purple-400">{{ splitResults }}</p>
          </div>
          <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- 操作区域 -->
    <div class="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-elegant dark:shadow-elegant-dark border border-gray-100 dark:border-dark-border">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div class="flex items-center space-x-3">
          <!-- 批量操作 -->
          <div v-if="selectedResults.length > 0" class="flex items-center space-x-2">
            <span class="text-sm text-gray-600 dark:text-dark-text-secondary">
              已选择 {{ selectedResults.length }} 个结果
            </span>
            <button @click="batchDownload"
              class="inline-flex items-center px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-lg transition-all duration-200">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
              </svg>
              批量下载
            </button>
            <button @click="batchDelete"
              class="inline-flex items-center px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-all duration-200">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
              批量删除
            </button>
          </div>
        </div>

        <!-- 筛选和搜索 -->
        <div class="flex items-center space-x-3">
          <el-select v-model="typeFilter" placeholder="处理类型" style="width: 120px" clearable>
            <el-option label="全部" value="" />
            <el-option label="智能抠图" value="cutout" />
            <el-option label="智能裁图" value="crop" />
            <el-option label="超级裂变" value="split" />
          </el-select>

          <el-select v-model="statusFilter" placeholder="状态" style="width: 100px" clearable>
            <el-option label="全部" value="" />
            <el-option label="成功" value="success" />
            <el-option label="失败" value="failed" />
          </el-select>

          <el-input
            v-model="searchKeyword"
            placeholder="搜索结果..."
            style="width: 200px"
            clearable
            @input="handleSearch"
          >
            <template #prefix>
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </template>
          </el-input>
        </div>
      </div>
    </div>

    <!-- 结果网格 -->
    <div class="bg-white dark:bg-dark-surface rounded-xl shadow-elegant dark:shadow-elegant-dark border border-gray-100 dark:border-dark-border overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-100 dark:border-dark-border">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-dark-text">处理结果</h3>
        <p class="text-sm text-gray-600 dark:text-dark-text-secondary mt-1">共 {{ filteredResults.length }} 个结果</p>
      </div>

      <div class="p-6">
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div
            v-for="result in currentPageResults"
            :key="result.id"
            class="group relative cursor-pointer"
            @click="toggleResultSelection(result)"
          >
            <!-- 选中状态 -->
            <div v-if="isResultSelected(result)" class="absolute top-2 right-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center z-10">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>

            <!-- 结果图片 -->
            <div class="relative">
              <div class="w-full h-32 rounded-lg border-2 transition-all duration-200 overflow-hidden"
                :class="isResultSelected(result) ? 'border-orange-500' : 'border-gray-200 dark:border-dark-border group-hover:border-orange-300'">

                <!-- 透明背景的棋盘格 -->
                <div v-if="result.hasTransparency" class="absolute inset-0 checkerboard-bg"></div>

                <img
                  :src="result.thumbnail"
                  :alt="result.name"
                  class="w-full h-full object-contain relative z-10"
                />
              </div>

              <!-- 处理类型标签 -->
              <div class="absolute top-2 left-2">
                <span :class="getTypeClass(result.type)" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium">
                  {{ getTypeText(result.type) }}
                </span>
              </div>

              <!-- 状态标签 -->
              <div class="absolute bottom-2 left-2">
                <span :class="getStatusClass(result.status)" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium">
                  {{ getStatusText(result.status) }}
                </span>
              </div>

              <!-- 悬停操作 -->
              <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-lg transition-all duration-200 flex items-center justify-center">
                <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
                  <button @click.stop="previewResult(result)" class="p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200">
                    <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  </button>
                  <button @click.stop="downloadResult(result)" class="p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200">
                    <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <!-- 结果信息 -->
            <div class="mt-2">
              <p class="text-sm font-medium text-gray-900 dark:text-dark-text truncate" :title="result.name">
                {{ result.name }}
              </p>
              <p class="text-xs text-gray-500 dark:text-dark-text-secondary">
                {{ result.size }} • {{ result.processTime }}
              </p>
            </div>
          </div>
        </div>

        <!-- 分页 -->
        <div class="flex justify-center mt-6" v-if="filteredResults.length > pageSize">
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[24, 48, 96]"
            :total="filteredResults.length"
            layout="sizes, prev, pager, next"
            class="modern-pagination"
          />
        </div>
      </div>
    </div>
  </div>

  <!-- 结果预览对话框 -->
  <ImagePreviewDialog v-model="showPreviewDialog" :image="previewResultData" />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { ElMessage } from 'element-plus';
import ImagePreviewDialog from '../components/ImagePreviewDialog.vue';

// 类型定义
interface ProcessResult {
  id: string;
  name: string;
  thumbnail: string;
  url: string;
  type: 'cutout' | 'crop' | 'split';
  status: 'success' | 'failed';
  size: string;
  processTime: string;
  hasTransparency: boolean;
  originalImage?: string;
  tags?: string[];
}

// 响应式数据
const selectedResults = ref<ProcessResult[]>([]);
const searchKeyword = ref('');
const typeFilter = ref('');
const statusFilter = ref('');
const currentPage = ref(1);
const pageSize = ref(24);
const showPreviewDialog = ref(false);
const previewResultData = ref<ProcessResult | null>(null);

// 统计数据
const totalResults = ref(179);
const cutoutResults = ref(89);
const cropResults = ref(56);
const splitResults = ref(34);

// 模拟处理结果数据
const processResults = ref<ProcessResult[]>([
  {
    id: 'result_001',
    name: '抠图结果_商品001.png',
    thumbnail: 'https://picsum.photos/300/300?random=31',
    url: 'https://picsum.photos/800/800?random=31',
    type: 'cutout',
    status: 'success',
    size: '456KB',
    processTime: '2024-01-15 14:30',
    hasTransparency: true,
    originalImage: 'https://picsum.photos/800/800?random=301',
    tags: ['抠图', '商品', '透明背景']
  },
  {
    id: 'result_002',
    name: '裁图结果_商品002.jpg',
    thumbnail: 'https://picsum.photos/300/300?random=32',
    url: 'https://picsum.photos/800/800?random=32',
    type: 'crop',
    status: 'success',
    size: '234KB',
    processTime: '2024-01-15 14:25',
    hasTransparency: false,
    originalImage: 'https://picsum.photos/800/800?random=302',
    tags: ['裁图', '商品', '智能裁剪']
  },
  {
    id: 'result_003',
    name: '裂变结果_商品003_1.jpg',
    thumbnail: 'https://picsum.photos/300/300?random=33',
    url: 'https://picsum.photos/800/800?random=33',
    type: 'split',
    status: 'success',
    size: '345KB',
    processTime: '2024-01-15 14:20',
    hasTransparency: false,
    originalImage: 'https://picsum.photos/800/800?random=303',
    tags: ['裂变', '商品', '变体1']
  },
  {
    id: 'result_004',
    name: '抠图结果_商品004.png',
    thumbnail: 'https://picsum.photos/300/300?random=34',
    url: 'https://picsum.photos/800/800?random=34',
    type: 'cutout',
    status: 'failed',
    size: '0KB',
    processTime: '2024-01-15 13:45',
    hasTransparency: true,
    originalImage: 'https://picsum.photos/800/800?random=304',
    tags: ['抠图', '商品', '处理失败']
  },
  {
    id: 'result_005',
    name: '裁图结果_商品005.jpg',
    thumbnail: 'https://picsum.photos/300/300?random=35',
    url: 'https://picsum.photos/800/800?random=35',
    type: 'crop',
    status: 'success',
    size: '567KB',
    processTime: '2024-01-15 13:40',
    hasTransparency: false,
    originalImage: 'https://picsum.photos/800/800?random=305',
    tags: ['裁图', '商品', '高质量']
  },
  {
    id: 'result_006',
    name: '裂变结果_商品006_2.jpg',
    thumbnail: 'https://picsum.photos/300/300?random=36',
    url: 'https://picsum.photos/800/800?random=36',
    type: 'split',
    status: 'success',
    size: '423KB',
    processTime: '2024-01-15 13:35',
    hasTransparency: false,
    originalImage: 'https://picsum.photos/800/800?random=306',
    tags: ['裂变', '商品', '变体2']
  }
]);

// 计算属性
const filteredResults = computed(() => {
  let filtered = processResults.value;

  // 类型筛选
  if (typeFilter.value) {
    filtered = filtered.filter(result => result.type === typeFilter.value);
  }

  // 状态筛选
  if (statusFilter.value) {
    filtered = filtered.filter(result => result.status === statusFilter.value);
  }

  // 搜索筛选
  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase();
    filtered = filtered.filter(result =>
      result.name.toLowerCase().includes(keyword) ||
      result.tags?.some(tag => tag.toLowerCase().includes(keyword))
    );
  }

  return filtered;
});

const currentPageResults = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filteredResults.value.slice(start, end);
});

// 方法
const isResultSelected = (result: ProcessResult) => {
  return selectedResults.value.some(res => res.id === result.id);
};

const toggleResultSelection = (result: ProcessResult) => {
  const index = selectedResults.value.findIndex(res => res.id === result.id);
  if (index > -1) {
    selectedResults.value.splice(index, 1);
  } else {
    selectedResults.value.push(result);
  }
};

const getTypeClass = (type: string) => {
  const classes: Record<string, string> = {
    'cutout': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    'crop': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    'split': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
  };
  return classes[type] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
};

const getTypeText = (type: string) => {
  const texts: Record<string, string> = {
    'cutout': '抠图',
    'crop': '裁图',
    'split': '裂变'
  };
  return texts[type] || '未知';
};

const getStatusClass = (status: string) => {
  const classes: Record<string, string> = {
    'success': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    'failed': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
  };
  return classes[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
};

const getStatusText = (status: string) => {
  const texts: Record<string, string> = {
    'success': '成功',
    'failed': '失败'
  };
  return texts[status] || '未知';
};

const previewResult = (result: ProcessResult) => {
  previewResultData.value = result;
  showPreviewDialog.value = true;
};

const downloadResult = (result: ProcessResult) => {
  if (result.status === 'failed') {
    ElMessage.warning('处理失败的结果无法下载');
    return;
  }

  const link = document.createElement('a');
  link.href = result.url;
  link.download = result.name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  ElMessage.success(`正在下载 ${result.name}`);
};

const batchDownload = () => {
  if (selectedResults.value.length === 0) return;

  const successResults = selectedResults.value.filter(result => result.status === 'success');
  if (successResults.length === 0) {
    ElMessage.warning('没有可下载的成功结果');
    return;
  }

  successResults.forEach(result => {
    downloadResult(result);
  });

  ElMessage.success(`正在下载 ${successResults.length} 个结果`);
};

const batchDelete = () => {
  if (selectedResults.value.length === 0) return;

  selectedResults.value.forEach(selectedResult => {
    const index = processResults.value.findIndex(result => result.id === selectedResult.id);
    if (index > -1) {
      processResults.value.splice(index, 1);
    }
  });

  ElMessage.success(`已删除 ${selectedResults.value.length} 个结果`);
  selectedResults.value = [];
};

const handleSearch = () => {
  currentPage.value = 1;
};
</script>

<style scoped>
.shadow-elegant {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.shadow-elegant-dark {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
}

.modern-pagination :deep(.el-pagination) {
  justify-content: center;
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
