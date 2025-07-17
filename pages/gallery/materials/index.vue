<template>
  <div class="space-y-6">
    <!-- 页面标题 -->
    <div class="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border border-green-100 dark:border-green-800">
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
          </svg>
        </div>
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-dark-text">素材图库</h1>
          <p class="mt-1 text-sm text-gray-600 dark:text-dark-text-secondary">管理设计素材和创意元素</p>
        </div>
      </div>
    </div>

    <!-- 统计卡片 -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-elegant dark:shadow-elegant-dark border border-gray-100 dark:border-dark-border hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-dark-text-secondary">素材总数</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-dark-text">{{ totalMaterials }}</p>
          </div>
          <div class="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-elegant dark:shadow-elegant-dark border border-gray-100 dark:border-dark-border hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-dark-text-secondary">图标数量</p>
            <p class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ iconCount }}</p>
          </div>
          <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-elegant dark:shadow-elegant-dark border border-gray-100 dark:border-dark-border hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-dark-text-secondary">装饰元素</p>
            <p class="text-2xl font-bold text-purple-600 dark:text-purple-400">{{ decorationCount }}</p>
          </div>
          <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-elegant dark:shadow-elegant-dark border border-gray-100 dark:border-dark-border hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-dark-text-secondary">透明素材</p>
            <p class="text-2xl font-bold text-orange-600 dark:text-orange-400">{{ transparentCount }}</p>
          </div>
          <div class="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
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
            accept="image/*,.svg"
            multiple
            :show-file-list="false">
            <button class="inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
              上传素材
            </button>
          </el-upload>

          <!-- 批量操作 -->
          <div v-if="selectedMaterials.length > 0" class="flex items-center space-x-2 ml-4 pl-4 border-l border-gray-200 dark:border-dark-border">
            <span class="text-sm text-gray-600 dark:text-dark-text-secondary">
              已选择 {{ selectedMaterials.length }} 个素材
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
          <el-select v-model="categoryFilter" placeholder="素材分类" style="width: 120px" clearable>
            <el-option label="全部" value="" />
            <el-option label="图标" value="icon" />
            <el-option label="装饰" value="decoration" />
            <el-option label="边框" value="border" />
            <el-option label="纹理" value="texture" />
          </el-select>

          <el-select v-model="formatFilter" placeholder="文件格式" style="width: 100px" clearable>
            <el-option label="全部" value="" />
            <el-option label="PNG" value="png" />
            <el-option label="SVG" value="svg" />
            <el-option label="JPG" value="jpg" />
          </el-select>

          <el-input
            v-model="searchKeyword"
            placeholder="搜索素材..."
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

    <!-- 素材网格 -->
    <div class="bg-white dark:bg-dark-surface rounded-xl shadow-elegant dark:shadow-elegant-dark border border-gray-100 dark:border-dark-border overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-100 dark:border-dark-border">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-dark-text">设计素材</h3>
        <p class="text-sm text-gray-600 dark:text-dark-text-secondary mt-1">共 {{ filteredMaterials.length }} 个素材</p>
      </div>

      <div class="p-6">
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div
            v-for="material in currentPageMaterials"
            :key="material.id"
            class="group relative cursor-pointer"
            @click="toggleMaterialSelection(material)"
          >
            <!-- 选中状态 -->
            <div v-if="isMaterialSelected(material)" class="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center z-10">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>

            <!-- 素材图片 -->
            <div class="relative">
              <div class="w-full h-32 rounded-lg border-2 transition-all duration-200 overflow-hidden"
                :class="isMaterialSelected(material) ? 'border-green-500' : 'border-gray-200 dark:border-dark-border group-hover:border-green-300'">

                <!-- 透明背景的棋盘格 -->
                <div v-if="material.hasTransparency" class="absolute inset-0 checkerboard-bg"></div>

                <img
                  :src="material.thumbnail"
                  :alt="material.name"
                  class="w-full h-full object-contain relative z-10"
                />
              </div>

              <!-- 分类和格式标签 -->
              <div class="absolute top-2 left-2 flex flex-col space-y-1">
                <span :class="getCategoryClass(material.category)" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium">
                  {{ getCategoryText(material.category) }}
                </span>
                <span :class="getFormatClass(material.format)" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium">
                  {{ material.format.toUpperCase() }}
                </span>
              </div>

              <!-- 透明标识 -->
              <div v-if="material.hasTransparency" class="absolute bottom-2 left-2">
                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                  <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                  透明
                </span>
              </div>

              <!-- 悬停操作 -->
              <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-lg transition-all duration-200 flex items-center justify-center">
                <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
                  <button @click.stop="previewMaterial(material)" class="p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200">
                    <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  </button>
                  <button @click.stop="downloadMaterial(material)" class="p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200">
                    <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <!-- 素材信息 -->
            <div class="mt-2">
              <p class="text-sm font-medium text-gray-900 dark:text-dark-text truncate" :title="material.name">
                {{ material.name }}
              </p>
              <p class="text-xs text-gray-500 dark:text-dark-text-secondary">
                {{ material.size }} • {{ material.uploadTime }}
              </p>
            </div>
          </div>
        </div>

        <!-- 分页 -->
        <div class="flex justify-center mt-6" v-if="filteredMaterials.length > pageSize">
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[24, 48, 96]"
            :total="filteredMaterials.length"
            layout="sizes, prev, pager, next"
            class="modern-pagination"
          />
        </div>
      </div>
    </div>
  </div>

  <!-- 素材预览对话框 -->
  <ImagePreviewDialog v-model="showPreviewDialog" :image="previewMaterialData" />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { ElMessage } from 'element-plus';
import ImagePreviewDialog from '../components/ImagePreviewDialog.vue';

// 类型定义
interface Material {
  id: string;
  name: string;
  thumbnail: string;
  url: string;
  category: 'icon' | 'decoration' | 'border' | 'texture';
  format: 'png' | 'svg' | 'jpg';
  size: string;
  uploadTime: string;
  hasTransparency: boolean;
  tags?: string[];
}

// 响应式数据
const uploadRef = ref();
const fileList = ref<any[]>([]);
const selectedMaterials = ref<Material[]>([]);
const searchKeyword = ref('');
const categoryFilter = ref('');
const formatFilter = ref('');
const currentPage = ref(1);
const pageSize = ref(24);
const showPreviewDialog = ref(false);
const previewMaterialData = ref<Material | null>(null);

// 统计数据
const totalMaterials = ref(324);
const iconCount = ref(156);
const decorationCount = ref(89);
const transparentCount = ref(234);

// 模拟素材数据
const materials = ref<Material[]>([
  {
    id: 'mat_001',
    name: '星星图标.svg',
    thumbnail: 'https://picsum.photos/300/300?random=11',
    url: 'https://picsum.photos/800/800?random=11',
    category: 'icon',
    format: 'svg',
    size: '12KB',
    uploadTime: '2024-01-15 14:30',
    hasTransparency: true,
    tags: ['星星', '图标', '装饰']
  },
  {
    id: 'mat_002',
    name: '花朵装饰.png',
    thumbnail: 'https://picsum.photos/300/300?random=12',
    url: 'https://picsum.photos/800/800?random=12',
    category: 'decoration',
    format: 'png',
    size: '45KB',
    uploadTime: '2024-01-15 14:25',
    hasTransparency: true,
    tags: ['花朵', '装饰', '自然']
  },
  {
    id: 'mat_003',
    name: '金色边框.png',
    thumbnail: 'https://picsum.photos/300/300?random=13',
    url: 'https://picsum.photos/800/800?random=13',
    category: 'border',
    format: 'png',
    size: '78KB',
    uploadTime: '2024-01-15 14:20',
    hasTransparency: true,
    tags: ['边框', '金色', '装饰']
  },
  {
    id: 'mat_004',
    name: '木纹纹理.jpg',
    thumbnail: 'https://picsum.photos/300/300?random=14',
    url: 'https://picsum.photos/800/800?random=14',
    category: 'texture',
    format: 'jpg',
    size: '234KB',
    uploadTime: '2024-01-15 13:45',
    hasTransparency: false,
    tags: ['木纹', '纹理', '背景']
  },
  {
    id: 'mat_005',
    name: '爱心图标.svg',
    thumbnail: 'https://picsum.photos/300/300?random=15',
    url: 'https://picsum.photos/800/800?random=15',
    category: 'icon',
    format: 'svg',
    size: '8KB',
    uploadTime: '2024-01-15 13:40',
    hasTransparency: true,
    tags: ['爱心', '图标', '情感']
  },
  {
    id: 'mat_006',
    name: '蝴蝶装饰.png',
    thumbnail: 'https://picsum.photos/300/300?random=16',
    url: 'https://picsum.photos/800/800?random=16',
    category: 'decoration',
    format: 'png',
    size: '56KB',
    uploadTime: '2024-01-15 13:35',
    hasTransparency: true,
    tags: ['蝴蝶', '装饰', '动物']
  }
]);

// 计算属性
const filteredMaterials = computed(() => {
  let filtered = materials.value;

  // 分类筛选
  if (categoryFilter.value) {
    filtered = filtered.filter(mat => mat.category === categoryFilter.value);
  }

  // 格式筛选
  if (formatFilter.value) {
    filtered = filtered.filter(mat => mat.format === formatFilter.value);
  }

  // 搜索筛选
  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase();
    filtered = filtered.filter(mat =>
      mat.name.toLowerCase().includes(keyword) ||
      mat.tags?.some(tag => tag.toLowerCase().includes(keyword))
    );
  }

  return filtered;
});

const currentPageMaterials = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filteredMaterials.value.slice(start, end);
});

// 方法
const handleFileUpload = (file: any) => {
  if (file.raw) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const newMaterial: Material = {
        id: 'mat_' + Date.now(),
        name: file.name,
        thumbnail: e.target?.result as string,
        url: e.target?.result as string,
        category: 'icon', // 默认为图标
        format: file.name.split('.').pop()?.toLowerCase() as 'png' | 'svg' | 'jpg',
        size: formatFileSize(file.size || 0),
        uploadTime: new Date().toLocaleString('zh-CN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        }),
        hasTransparency: file.name.toLowerCase().includes('.png') || file.name.toLowerCase().includes('.svg'),
        tags: []
      };

      materials.value.unshift(newMaterial);
      ElMessage.success(`素材 ${file.name} 上传成功`);
    };
    reader.readAsDataURL(file.raw);
  }
};

const handleFileRemove = (file: any) => {
  const index = materials.value.findIndex(mat => mat.name === file.name);
  if (index > -1) {
    materials.value.splice(index, 1);
  }
};

const formatFileSize = (size: number) => {
  if (size < 1024) return size + ' B';
  if (size < 1024 * 1024) return (size / 1024).toFixed(1) + ' KB';
  return (size / (1024 * 1024)).toFixed(1) + ' MB';
};

const isMaterialSelected = (material: Material) => {
  return selectedMaterials.value.some(mat => mat.id === material.id);
};

const toggleMaterialSelection = (material: Material) => {
  const index = selectedMaterials.value.findIndex(mat => mat.id === material.id);
  if (index > -1) {
    selectedMaterials.value.splice(index, 1);
  } else {
    selectedMaterials.value.push(material);
  }
};

const getCategoryClass = (category: string) => {
  const classes: Record<string, string> = {
    'icon': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    'decoration': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    'border': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
    'texture': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
  };
  return classes[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
};

const getCategoryText = (category: string) => {
  const texts: Record<string, string> = {
    'icon': '图标',
    'decoration': '装饰',
    'border': '边框',
    'texture': '纹理'
  };
  return texts[category] || '未知';
};

const getFormatClass = (format: string) => {
  const classes: Record<string, string> = {
    'svg': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
    'png': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    'jpg': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
  };
  return classes[format] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
};

const previewMaterial = (material: Material) => {
  previewMaterialData.value = material;
  showPreviewDialog.value = true;
};

const downloadMaterial = (material: Material) => {
  const link = document.createElement('a');
  link.href = material.url;
  link.download = material.name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  ElMessage.success(`正在下载 ${material.name}`);
};

const batchDelete = () => {
  if (selectedMaterials.value.length === 0) return;

  selectedMaterials.value.forEach(selectedMat => {
    const index = materials.value.findIndex(mat => mat.id === selectedMat.id);
    if (index > -1) {
      materials.value.splice(index, 1);
    }
  });

  ElMessage.success(`已删除 ${selectedMaterials.value.length} 个素材`);
  selectedMaterials.value = [];
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
