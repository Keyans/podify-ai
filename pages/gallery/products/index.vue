<template>
  <div class="space-y-6">
    <!-- 页面标题 -->
    <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-blue-100 dark:border-blue-800">
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
          </svg>
        </div>
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-dark-text">商品图库</h1>
          <p class="mt-1 text-sm text-gray-600 dark:text-dark-text-secondary">管理商品相关的图片资源</p>
        </div>
      </div>
    </div>

    <!-- 统计卡片 -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-elegant dark:shadow-elegant-dark border border-gray-100 dark:border-dark-border hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-dark-text-secondary">商品图片总数</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-dark-text">{{ totalImages }}</p>
          </div>
          <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-elegant dark:shadow-elegant-dark border border-gray-100 dark:border-dark-border hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-dark-text-secondary">主图数量</p>
            <p class="text-2xl font-bold text-green-600 dark:text-green-400">{{ mainImages }}</p>
          </div>
          <div class="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-elegant dark:shadow-elegant-dark border border-gray-100 dark:border-dark-border hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-dark-text-secondary">详情图数量</p>
            <p class="text-2xl font-bold text-purple-600 dark:text-purple-400">{{ detailImages }}</p>
          </div>
          <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-elegant dark:shadow-elegant-dark border border-gray-100 dark:border-dark-border hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-dark-text-secondary">SKU图数量</p>
            <p class="text-2xl font-bold text-orange-600 dark:text-orange-400">{{ skuImages }}</p>
          </div>
          <div class="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- 操作区域 -->
    <div class="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-elegant dark:shadow-elegant-dark border border-gray-100 dark:border-dark-border">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div class="flex items-center space-x-3">
          <!-- 上传按钮 -->
          <el-upload
            ref="uploadRef"
            :file-list="fileList"
            :on-change="handleFileUpload"
            :on-remove="handleFileRemove"
            :auto-upload="false"
            accept="image/*"
            multiple
            :show-file-list="false">
            <button class="inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
              上传图片
            </button>
          </el-upload>

          <!-- 批量操作 -->
          <div v-if="selectedImages.length > 0" class="flex items-center space-x-2 ml-4 pl-4 border-l border-gray-200 dark:border-dark-border">
            <span class="text-sm text-gray-600 dark:text-dark-text-secondary">
              已选择 {{ selectedImages.length }} 张图片
            </span>
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
          <el-select v-model="categoryFilter" placeholder="图片分类" style="width: 120px" clearable>
            <el-option label="全部" value="" />
            <el-option label="主图" value="main" />
            <el-option label="详情图" value="detail" />
            <el-option label="SKU图" value="sku" />
          </el-select>

          <el-input
            v-model="searchKeyword"
            placeholder="搜索图片..."
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

    <!-- 图片网格 -->
    <div class="bg-white dark:bg-dark-surface rounded-xl shadow-elegant dark:shadow-elegant-dark border border-gray-100 dark:border-dark-border overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-100 dark:border-dark-border">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-dark-text">商品图片</h3>
        <p class="text-sm text-gray-600 dark:text-dark-text-secondary mt-1">共 {{ filteredImages.length }} 张图片</p>
      </div>

      <div class="p-6">
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div
            v-for="image in currentPageImages"
            :key="image.id"
            class="group relative cursor-pointer"
            @click="toggleImageSelection(image)"
          >
            <!-- 选中状态 -->
            <div v-if="isImageSelected(image)" class="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center z-10">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>

            <!-- 图片 -->
            <div class="relative">
              <img
                :src="image.thumbnail"
                :alt="image.name"
                class="w-full h-32 object-cover rounded-lg border-2 transition-all duration-200"
                :class="isImageSelected(image) ? 'border-blue-500' : 'border-gray-200 dark:border-dark-border group-hover:border-blue-300'"
              />
              
              <!-- 分类标签 -->
              <div class="absolute top-2 left-2">
                <span :class="getCategoryClass(image.category)" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium">
                  {{ getCategoryText(image.category) }}
                </span>
              </div>

              <!-- 悬停操作 -->
              <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-lg transition-all duration-200 flex items-center justify-center">
                <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
                  <button @click.stop="previewImage(image)" class="p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200">
                    <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  </button>
                  <button @click.stop="downloadImage(image)" class="p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200">
                    <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <!-- 图片信息 -->
            <div class="mt-2">
              <p class="text-sm font-medium text-gray-900 dark:text-dark-text truncate" :title="image.name">
                {{ image.name }}
              </p>
              <p class="text-xs text-gray-500 dark:text-dark-text-secondary">
                {{ image.size }} • {{ image.uploadTime }}
              </p>
            </div>
          </div>
        </div>

        <!-- 分页 -->
        <div class="flex justify-center mt-6" v-if="filteredImages.length > pageSize">
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[24, 48, 96]"
            :total="filteredImages.length"
            layout="sizes, prev, pager, next"
            class="modern-pagination"
          />
        </div>
      </div>
    </div>
  </div>

  <!-- 图片预览对话框 -->
  <ImagePreviewDialog v-model="showPreviewDialog" :image="previewImageData" />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { ElMessage } from 'element-plus';
import ImagePreviewDialog from '../components/ImagePreviewDialog.vue';

// 类型定义
interface ProductImage {
  id: string;
  name: string;
  thumbnail: string;
  url: string;
  category: 'main' | 'detail' | 'sku';
  size: string;
  uploadTime: string;
  tags?: string[];
}

// 响应式数据
const uploadRef = ref();
const fileList = ref<any[]>([]);
const selectedImages = ref<ProductImage[]>([]);
const searchKeyword = ref('');
const categoryFilter = ref('');
const currentPage = ref(1);
const pageSize = ref(24);
const showPreviewDialog = ref(false);
const previewImageData = ref<ProductImage | null>(null);

// 统计数据
const totalImages = ref(456);
const mainImages = ref(128);
const detailImages = ref(234);
const skuImages = ref(94);

// 模拟图片数据
const productImages = ref<ProductImage[]>([
  {
    id: 'img_001',
    name: '商品主图_T恤_001.jpg',
    thumbnail: 'https://picsum.photos/300/300?random=1',
    url: 'https://picsum.photos/800/800?random=1',
    category: 'main',
    size: '1.2MB',
    uploadTime: '2024-01-15 14:30',
    tags: ['T恤', '服装', '主图']
  },
  {
    id: 'img_002',
    name: '商品详情图_T恤_001.jpg',
    thumbnail: 'https://picsum.photos/300/300?random=2',
    url: 'https://picsum.photos/800/800?random=2',
    category: 'detail',
    size: '2.1MB',
    uploadTime: '2024-01-15 14:25',
    tags: ['T恤', '服装', '详情图']
  },
  {
    id: 'img_003',
    name: 'SKU图_T恤_红色_S.jpg',
    thumbnail: 'https://picsum.photos/300/300?random=3',
    url: 'https://picsum.photos/800/800?random=3',
    category: 'sku',
    size: '0.8MB',
    uploadTime: '2024-01-15 14:20',
    tags: ['T恤', '红色', 'S码']
  },
  {
    id: 'img_004',
    name: '商品主图_马克杯_001.jpg',
    thumbnail: 'https://picsum.photos/300/300?random=4',
    url: 'https://picsum.photos/800/800?random=4',
    category: 'main',
    size: '1.5MB',
    uploadTime: '2024-01-15 13:45',
    tags: ['马克杯', '家居', '主图']
  },
  {
    id: 'img_005',
    name: '商品详情图_马克杯_001.jpg',
    thumbnail: 'https://picsum.photos/300/300?random=5',
    url: 'https://picsum.photos/800/800?random=5',
    category: 'detail',
    size: '1.8MB',
    uploadTime: '2024-01-15 13:40',
    tags: ['马克杯', '家居', '详情图']
  },
  {
    id: 'img_006',
    name: 'SKU图_马克杯_白色.jpg',
    thumbnail: 'https://picsum.photos/300/300?random=6',
    url: 'https://picsum.photos/800/800?random=6',
    category: 'sku',
    size: '0.9MB',
    uploadTime: '2024-01-15 13:35',
    tags: ['马克杯', '白色']
  }
]);

// 计算属性
const filteredImages = computed(() => {
  let filtered = productImages.value;

  // 分类筛选
  if (categoryFilter.value) {
    filtered = filtered.filter(img => img.category === categoryFilter.value);
  }

  // 搜索筛选
  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase();
    filtered = filtered.filter(img =>
      img.name.toLowerCase().includes(keyword) ||
      img.tags?.some(tag => tag.toLowerCase().includes(keyword))
    );
  }

  return filtered;
});

const currentPageImages = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filteredImages.value.slice(start, end);
});

// 方法
const handleFileUpload = (file: any) => {
  if (file.raw) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const newImage: ProductImage = {
        id: 'img_' + Date.now(),
        name: file.name,
        thumbnail: e.target?.result as string,
        url: e.target?.result as string,
        category: 'main', // 默认为主图
        size: formatFileSize(file.size || 0),
        uploadTime: new Date().toLocaleString('zh-CN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        }),
        tags: []
      };

      productImages.value.unshift(newImage);
      ElMessage.success(`图片 ${file.name} 上传成功`);
    };
    reader.readAsDataURL(file.raw);
  }
};

const handleFileRemove = (file: any) => {
  // 移除对应的图片
  const index = productImages.value.findIndex(img => img.name === file.name);
  if (index > -1) {
    productImages.value.splice(index, 1);
  }
};

const formatFileSize = (size: number) => {
  if (size < 1024) return size + ' B';
  if (size < 1024 * 1024) return (size / 1024).toFixed(1) + ' KB';
  return (size / (1024 * 1024)).toFixed(1) + ' MB';
};

const isImageSelected = (image: ProductImage) => {
  return selectedImages.value.some(img => img.id === image.id);
};

const toggleImageSelection = (image: ProductImage) => {
  const index = selectedImages.value.findIndex(img => img.id === image.id);
  if (index > -1) {
    selectedImages.value.splice(index, 1);
  } else {
    selectedImages.value.push(image);
  }
};

const getCategoryClass = (category: string) => {
  const classes: Record<string, string> = {
    'main': 'bg-blue-100 text-blue-800',
    'detail': 'bg-green-100 text-green-800',
    'sku': 'bg-purple-100 text-purple-800'
  };
  return classes[category] || 'bg-gray-100 text-gray-800';
};

const getCategoryText = (category: string) => {
  const texts: Record<string, string> = {
    'main': '主图',
    'detail': '详情图',
    'sku': 'SKU图'
  };
  return texts[category] || '未知';
};

const previewImage = (image: ProductImage) => {
  previewImageData.value = image;
  showPreviewDialog.value = true;
};

const downloadImage = (image: ProductImage) => {
  // 创建下载链接
  const link = document.createElement('a');
  link.href = image.url;
  link.download = image.name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  ElMessage.success(`正在下载 ${image.name}`);
};

const batchDelete = () => {
  if (selectedImages.value.length === 0) return;

  selectedImages.value.forEach(selectedImg => {
    const index = productImages.value.findIndex(img => img.id === selectedImg.id);
    if (index > -1) {
      productImages.value.splice(index, 1);
    }
  });

  ElMessage.success(`已删除 ${selectedImages.value.length} 张图片`);
  selectedImages.value = [];
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
</style>
