<template>
  <div class="space-y-6">
    <!-- 页面标题 -->
    <div class="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-purple-100 dark:border-purple-800">
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"></path>
          </svg>
        </div>
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-dark-text">背景图库</h1>
          <p class="mt-1 text-sm text-gray-600 dark:text-dark-text-secondary">管理背景图片和纹理素材</p>
        </div>
      </div>
    </div>

    <!-- 统计卡片 -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-elegant dark:shadow-elegant-dark border border-gray-100 dark:border-dark-border hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-dark-text-secondary">背景总数</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-dark-text">{{ totalBackgrounds }}</p>
          </div>
          <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-elegant dark:shadow-elegant-dark border border-gray-100 dark:border-dark-border hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-dark-text-secondary">纯色背景</p>
            <p class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ solidCount }}</p>
          </div>
          <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"></path>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-elegant dark:shadow-elegant-dark border border-gray-100 dark:border-dark-border hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-dark-text-secondary">渐变背景</p>
            <p class="text-2xl font-bold text-green-600 dark:text-green-400">{{ gradientCount }}</p>
          </div>
          <div class="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-elegant dark:shadow-elegant-dark border border-gray-100 dark:border-dark-border hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-dark-text-secondary">纹理背景</p>
            <p class="text-2xl font-bold text-orange-600 dark:text-orange-400">{{ textureCount }}</p>
          </div>
          <div class="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
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
            <button class="inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
              上传背景
            </button>
          </el-upload>

          <!-- 创建渐变背景 -->
          <button @click="showGradientCreator = true"
            class="inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            创建渐变
          </button>

          <!-- 批量操作 -->
          <div v-if="selectedBackgrounds.length > 0" class="flex items-center space-x-2 ml-4 pl-4 border-l border-gray-200 dark:border-dark-border">
            <span class="text-sm text-gray-600 dark:text-dark-text-secondary">
              已选择 {{ selectedBackgrounds.length }} 个背景
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
          <el-select v-model="categoryFilter" placeholder="背景类型" style="width: 120px" clearable>
            <el-option label="全部" value="" />
            <el-option label="纯色" value="solid" />
            <el-option label="渐变" value="gradient" />
            <el-option label="纹理" value="texture" />
            <el-option label="图片" value="image" />
          </el-select>

          <el-select v-model="sizeFilter" placeholder="尺寸" style="width: 120px" clearable>
            <el-option label="全部" value="" />
            <el-option label="1920x1080" value="1920x1080" />
            <el-option label="1280x720" value="1280x720" />
            <el-option label="正方形" value="square" />
          </el-select>

          <el-input
            v-model="searchKeyword"
            placeholder="搜索背景..."
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

    <!-- 背景网格 -->
    <div class="bg-white dark:bg-dark-surface rounded-xl shadow-elegant dark:shadow-elegant-dark border border-gray-100 dark:border-dark-border overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-100 dark:border-dark-border">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-dark-text">背景素材</h3>
        <p class="text-sm text-gray-600 dark:text-dark-text-secondary mt-1">共 {{ filteredBackgrounds.length }} 个背景</p>
      </div>

      <div class="p-6">
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <div
            v-for="background in currentPageBackgrounds"
            :key="background.id"
            class="group relative cursor-pointer"
            @click="toggleBackgroundSelection(background)"
          >
            <!-- 选中状态 -->
            <div v-if="isBackgroundSelected(background)" class="absolute top-2 right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center z-10">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>

            <!-- 背景预览 -->
            <div class="relative">
              <div class="w-full h-32 rounded-lg border-2 transition-all duration-200 overflow-hidden"
                :class="isBackgroundSelected(background) ? 'border-purple-500' : 'border-gray-200 dark:border-dark-border group-hover:border-purple-300'">

                <!-- 渐变背景 -->
                <div v-if="background.category === 'gradient'"
                  class="w-full h-full"
                  :style="{ background: background.gradientStyle }">
                </div>

                <!-- 纯色背景 -->
                <div v-else-if="background.category === 'solid'"
                  class="w-full h-full"
                  :style="{ backgroundColor: background.color }">
                </div>

                <!-- 图片背景 -->
                <img v-else
                  :src="background.thumbnail"
                  :alt="background.name"
                  class="w-full h-full object-cover"
                />
              </div>

              <!-- 分类标签 -->
              <div class="absolute top-2 left-2">
                <span :class="getCategoryClass(background.category)" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium">
                  {{ getCategoryText(background.category) }}
                </span>
              </div>

              <!-- 尺寸标签 -->
              <div class="absolute bottom-2 left-2">
                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-black bg-opacity-50 text-white">
                  {{ background.dimensions }}
                </span>
              </div>

              <!-- 悬停操作 -->
              <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-lg transition-all duration-200 flex items-center justify-center">
                <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
                  <button @click.stop="previewBackground(background)" class="p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200">
                    <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  </button>
                  <button @click.stop="downloadBackground(background)" class="p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200">
                    <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <!-- 背景信息 -->
            <div class="mt-2">
              <p class="text-sm font-medium text-gray-900 dark:text-dark-text truncate" :title="background.name">
                {{ background.name }}
              </p>
              <p class="text-xs text-gray-500 dark:text-dark-text-secondary">
                {{ background.size }} • {{ background.uploadTime }}
              </p>
            </div>
          </div>
        </div>

        <!-- 分页 -->
        <div class="flex justify-center mt-6" v-if="filteredBackgrounds.length > pageSize">
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[20, 40, 80]"
            :total="filteredBackgrounds.length"
            layout="sizes, prev, pager, next"
            class="modern-pagination"
          />
        </div>
      </div>
    </div>
  </div>

  <!-- 背景预览对话框 -->
  <ImagePreviewDialog v-model="showPreviewDialog" :image="previewBackgroundData" />

  <!-- 渐变创建器对话框 -->
  <GradientCreatorDialog v-model="showGradientCreator" @create="handleGradientCreate" />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { ElMessage } from 'element-plus';
import ImagePreviewDialog from '../components/ImagePreviewDialog.vue';
import GradientCreatorDialog from '../components/GradientCreatorDialog.vue';

// 类型定义
interface Background {
  id: string;
  name: string;
  thumbnail?: string;
  url?: string;
  category: 'solid' | 'gradient' | 'texture' | 'image';
  dimensions: string;
  size: string;
  uploadTime: string;
  color?: string;
  gradientStyle?: string;
  tags?: string[];
}

// 响应式数据
const uploadRef = ref();
const fileList = ref<any[]>([]);
const selectedBackgrounds = ref<Background[]>([]);
const searchKeyword = ref('');
const categoryFilter = ref('');
const sizeFilter = ref('');
const currentPage = ref(1);
const pageSize = ref(20);
const showPreviewDialog = ref(false);
const showGradientCreator = ref(false);
const previewBackgroundData = ref<Background | null>(null);

// 统计数据
const totalBackgrounds = ref(289);
const solidCount = ref(45);
const gradientCount = ref(78);
const textureCount = ref(166);

// 模拟背景数据
const backgrounds = ref<Background[]>([
  {
    id: 'bg_001',
    name: '纯白背景',
    category: 'solid',
    dimensions: '1920x1080',
    size: '2KB',
    uploadTime: '2024-01-15 14:30',
    color: '#ffffff',
    tags: ['白色', '纯色', '简约']
  },
  {
    id: 'bg_002',
    name: '蓝色渐变',
    category: 'gradient',
    dimensions: '1920x1080',
    size: '5KB',
    uploadTime: '2024-01-15 14:25',
    gradientStyle: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    tags: ['蓝色', '渐变', '现代']
  },
  {
    id: 'bg_003',
    name: '木纹纹理',
    thumbnail: 'https://picsum.photos/400/300?random=21',
    url: 'https://picsum.photos/1920/1080?random=21',
    category: 'texture',
    dimensions: '1920x1080',
    size: '456KB',
    uploadTime: '2024-01-15 14:20',
    tags: ['木纹', '纹理', '自然']
  },
  {
    id: 'bg_004',
    name: '风景背景',
    thumbnail: 'https://picsum.photos/400/300?random=22',
    url: 'https://picsum.photos/1920/1080?random=22',
    category: 'image',
    dimensions: '1920x1080',
    size: '1.2MB',
    uploadTime: '2024-01-15 13:45',
    tags: ['风景', '自然', '摄影']
  },
  {
    id: 'bg_005',
    name: '黑色背景',
    category: 'solid',
    dimensions: '1920x1080',
    size: '2KB',
    uploadTime: '2024-01-15 13:40',
    color: '#000000',
    tags: ['黑色', '纯色', '经典']
  },
  {
    id: 'bg_006',
    name: '彩虹渐变',
    category: 'gradient',
    dimensions: '1920x1080',
    size: '8KB',
    uploadTime: '2024-01-15 13:35',
    gradientStyle: 'linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3)',
    tags: ['彩虹', '渐变', '彩色']
  }
]);

// 计算属性
const filteredBackgrounds = computed(() => {
  let filtered = backgrounds.value;

  // 分类筛选
  if (categoryFilter.value) {
    filtered = filtered.filter(bg => bg.category === categoryFilter.value);
  }

  // 尺寸筛选
  if (sizeFilter.value) {
    if (sizeFilter.value === 'square') {
      filtered = filtered.filter(bg => bg.dimensions.includes('x') && bg.dimensions.split('x')[0] === bg.dimensions.split('x')[1]);
    } else {
      filtered = filtered.filter(bg => bg.dimensions === sizeFilter.value);
    }
  }

  // 搜索筛选
  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase();
    filtered = filtered.filter(bg =>
      bg.name.toLowerCase().includes(keyword) ||
      bg.tags?.some(tag => tag.toLowerCase().includes(keyword))
    );
  }

  return filtered;
});

const currentPageBackgrounds = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filteredBackgrounds.value.slice(start, end);
});

// 方法
const handleFileUpload = (file: any) => {
  if (file.raw) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const newBackground: Background = {
        id: 'bg_' + Date.now(),
        name: file.name,
        thumbnail: e.target?.result as string,
        url: e.target?.result as string,
        category: 'image',
        dimensions: '1920x1080', // 默认尺寸
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

      backgrounds.value.unshift(newBackground);
      ElMessage.success(`背景 ${file.name} 上传成功`);
    };
    reader.readAsDataURL(file.raw);
  }
};

const handleFileRemove = (file: any) => {
  const index = backgrounds.value.findIndex(bg => bg.name === file.name);
  if (index > -1) {
    backgrounds.value.splice(index, 1);
  }
};

const handleGradientCreate = (gradientData: any) => {
  const newBackground: Background = {
    id: 'bg_' + Date.now(),
    name: gradientData.name || '自定义渐变',
    category: 'gradient',
    dimensions: '1920x1080',
    size: '5KB',
    uploadTime: new Date().toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }),
    gradientStyle: gradientData.style,
    tags: ['渐变', '自定义']
  };

  backgrounds.value.unshift(newBackground);
  ElMessage.success('渐变背景创建成功');
};

const formatFileSize = (size: number) => {
  if (size < 1024) return size + ' B';
  if (size < 1024 * 1024) return (size / 1024).toFixed(1) + ' KB';
  return (size / (1024 * 1024)).toFixed(1) + ' MB';
};

const isBackgroundSelected = (background: Background) => {
  return selectedBackgrounds.value.some(bg => bg.id === background.id);
};

const toggleBackgroundSelection = (background: Background) => {
  const index = selectedBackgrounds.value.findIndex(bg => bg.id === background.id);
  if (index > -1) {
    selectedBackgrounds.value.splice(index, 1);
  } else {
    selectedBackgrounds.value.push(background);
  }
};

const getCategoryClass = (category: string) => {
  const classes: Record<string, string> = {
    'solid': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    'gradient': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    'texture': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
    'image': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
  };
  return classes[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
};

const getCategoryText = (category: string) => {
  const texts: Record<string, string> = {
    'solid': '纯色',
    'gradient': '渐变',
    'texture': '纹理',
    'image': '图片'
  };
  return texts[category] || '未知';
};

const previewBackground = (background: Background) => {
  previewBackgroundData.value = background;
  showPreviewDialog.value = true;
};

const downloadBackground = (background: Background) => {
  if (background.category === 'solid' || background.category === 'gradient') {
    // 对于纯色和渐变背景，生成图片并下载
    const canvas = document.createElement('canvas');
    canvas.width = 1920;
    canvas.height = 1080;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      if (background.category === 'solid' && background.color) {
        ctx.fillStyle = background.color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else if (background.category === 'gradient' && background.gradientStyle) {
        // 简化的渐变处理
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#667eea');
        gradient.addColorStop(1, '#764ba2');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = background.name + '.png';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }
      });
    }
  } else if (background.url) {
    // 对于图片背景，直接下载
    const link = document.createElement('a');
    link.href = background.url;
    link.download = background.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  ElMessage.success(`正在下载 ${background.name}`);
};

const batchDelete = () => {
  if (selectedBackgrounds.value.length === 0) return;

  selectedBackgrounds.value.forEach(selectedBg => {
    const index = backgrounds.value.findIndex(bg => bg.id === selectedBg.id);
    if (index > -1) {
      backgrounds.value.splice(index, 1);
    }
  });

  ElMessage.success(`已删除 ${selectedBackgrounds.value.length} 个背景`);
  selectedBackgrounds.value = [];
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
