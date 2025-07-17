<template>
  <div class="bg-gray-50 dark:bg-dark-card rounded-lg p-4 border border-gray-200 dark:border-dark-border">
    <!-- 商品采集数据选择 -->
    <div v-if="appType === 'product-collection'">
      <!-- 手动输入链接 -->
      <div v-if="dataSource === 'manual'">
        <div class="flex items-center justify-between mb-3">
          <label class="text-sm font-medium text-gray-700 dark:text-dark-text">商品链接</label>
          <el-button @click="clearSelection" size="small" type="danger" plain v-if="hasSelection">
            清空
          </el-button>
        </div>
        <el-input
          v-model="localConfig.links"
          type="textarea"
          :rows="3"
          placeholder="请输入商品链接，每行一个"
          @input="updateConfig"
        />
        <div v-if="linkCount > 0" class="mt-2 text-sm text-blue-600 dark:text-blue-400">
          已输入 {{ linkCount }} 个链接
        </div>
      </div>

      <!-- 关键词搜索 -->
      <div v-else-if="dataSource === 'search'">
        <div class="flex items-center justify-between mb-3">
          <label class="text-sm font-medium text-gray-700 dark:text-dark-text">搜索关键词</label>
          <el-button @click="clearSelection" size="small" type="danger" plain v-if="hasSelection">
            清空
          </el-button>
        </div>
        <el-input
          v-model="localConfig.keyword"
          placeholder="请输入搜索关键词"
          @input="updateConfig"
        />
        <div v-if="localConfig.keyword" class="mt-2 text-sm text-blue-600 dark:text-blue-400">
          关键词：{{ localConfig.keyword }}
        </div>
      </div>
    </div>

    <!-- 图片处理应用数据选择 -->
    <div v-else-if="isImageApp">
      <!-- 从图库选择 -->
      <div v-if="dataSource === 'gallery'">
        <div class="flex items-center justify-between mb-3">
          <label class="text-sm font-medium text-gray-700 dark:text-dark-text">选择图片</label>
          <div class="flex space-x-2">
            <el-button @click="openGalleryDialog" size="small" type="primary">
              选择图片
            </el-button>
            <el-button @click="clearSelection" size="small" type="danger" plain v-if="hasSelection">
              清空
            </el-button>
          </div>
        </div>
        <div v-if="selectedImages.length > 0" class="space-y-2">
          <div class="text-sm text-blue-600 dark:text-blue-400">
            已选择 {{ selectedImages.length }} 张图片
          </div>
          <div class="grid grid-cols-6 gap-2">
            <div
              v-for="(image, index) in selectedImages.slice(0, 6)"
              :key="image.id"
              class="relative aspect-square bg-gray-100 dark:bg-dark-surface rounded-lg overflow-hidden"
            >
              <img :src="image.url" :alt="image.name" class="w-full h-full object-cover" />
              <div v-if="index === 5 && selectedImages.length > 6" 
                   class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-xs">
                +{{ selectedImages.length - 6 }}
              </div>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-4 text-gray-500 dark:text-dark-text-secondary text-sm">
          点击"选择图片"从图库中选择图片
        </div>
      </div>

      <!-- 上传图片 -->
      <div v-else-if="dataSource === 'upload'">
        <div class="flex items-center justify-between mb-3">
          <label class="text-sm font-medium text-gray-700 dark:text-dark-text">上传图片</label>
          <el-button @click="clearSelection" size="small" type="danger" plain v-if="hasSelection">
            清空
          </el-button>
        </div>
        <el-upload
          ref="uploadRef"
          :file-list="uploadedFiles"
          :on-change="handleFileChange"
          :on-remove="handleFileRemove"
          :auto-upload="false"
          multiple
          accept="image/*"
          :show-file-list="false"
          drag
        >
          <div class="text-center py-6">
            <svg class="w-8 h-8 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
            </svg>
            <p class="text-sm text-gray-600 dark:text-dark-text-secondary">
              拖拽图片到此处或 <span class="text-blue-600">点击上传</span>
            </p>
          </div>
        </el-upload>
        <div v-if="uploadedFiles.length > 0" class="mt-3">
          <div class="text-sm text-blue-600 dark:text-blue-400 mb-2">
            已上传 {{ uploadedFiles.length }} 张图片
          </div>
          <div class="grid grid-cols-6 gap-2">
            <div
              v-for="(file, index) in uploadedFiles.slice(0, 6)"
              :key="file.uid"
              class="relative aspect-square bg-gray-100 dark:bg-dark-surface rounded-lg overflow-hidden"
            >
              <img :src="file.url" :alt="file.name" class="w-full h-full object-cover" />
              <div v-if="index === 5 && uploadedFiles.length > 6" 
                   class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-xs">
                +{{ uploadedFiles.length - 6 }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 批量刊登数据选择 -->
    <div v-else-if="appType === 'batch-listing'">
      <!-- 选择POD商品 -->
      <div v-if="dataSource === 'pod-products'">
        <div class="flex items-center justify-between mb-3">
          <label class="text-sm font-medium text-gray-700 dark:text-dark-text">POD商品</label>
          <div class="flex space-x-2">
            <el-button @click="openPodProductDialog" size="small" type="primary">
              选择商品
            </el-button>
            <el-button @click="clearSelection" size="small" type="danger" plain v-if="hasSelection">
              清空
            </el-button>
          </div>
        </div>
        <div v-if="selectedProducts.length > 0" class="text-sm text-blue-600 dark:text-blue-400">
          已选择 {{ selectedProducts.length }} 个POD商品
        </div>
        <div v-else class="text-center py-4 text-gray-500 dark:text-dark-text-secondary text-sm">
          点击"选择商品"选择POD商品
        </div>
      </div>

      <!-- 选择白品 -->
      <div v-else-if="dataSource === 'white-products'">
        <div class="flex items-center justify-between mb-3">
          <label class="text-sm font-medium text-gray-700 dark:text-dark-text">白品</label>
          <div class="flex space-x-2">
            <el-button @click="openWhiteProductDialog" size="small" type="primary">
              选择白品
            </el-button>
            <el-button @click="clearSelection" size="small" type="danger" plain v-if="hasSelection">
              清空
            </el-button>
          </div>
        </div>
        <div v-if="selectedProducts.length > 0" class="text-sm text-blue-600 dark:text-blue-400">
          已选择 {{ selectedProducts.length }} 个白品
        </div>
        <div v-else class="text-center py-4 text-gray-500 dark:text-dark-text-secondary text-sm">
          点击"选择白品"选择白品商品
        </div>
      </div>
    </div>

    <!-- POD合成数据选择 -->
    <div v-else-if="appType === 'pod-compose'">
      <!-- 选择白品 -->
      <div v-if="dataSource === 'white-products'">
        <div class="flex items-center justify-between mb-3">
          <label class="text-sm font-medium text-gray-700 dark:text-dark-text">白品</label>
          <div class="flex space-x-2">
            <el-button @click="openWhiteProductDialog" size="small" type="primary">
              选择白品
            </el-button>
            <el-button @click="clearSelection" size="small" type="danger" plain v-if="hasSelection">
              清空
            </el-button>
          </div>
        </div>
        <div v-if="selectedProducts.length > 0" class="text-sm text-blue-600 dark:text-blue-400">
          已选择 {{ selectedProducts.length }} 个白品
        </div>
        <div v-else class="text-center py-4 text-gray-500 dark:text-dark-text-secondary text-sm">
          点击"选择白品"选择白品商品
        </div>
      </div>

      <!-- 全部白品 -->
      <div v-else-if="dataSource === 'all-white-products'">
        <div class="text-center py-4">
          <div class="text-sm text-blue-600 dark:text-blue-400">
            将使用全部白品（约 {{ totalWhiteProducts }} 个）
          </div>
        </div>
      </div>
    </div>

    <!-- 使用上一步结果 -->
    <div v-if="dataSource === 'previous'" class="text-center py-4">
      <div class="text-sm text-gray-600 dark:text-dark-text-secondary">
        将使用上一个应用的输出结果作为输入
      </div>
    </div>

    <!-- 图库选择对话框 -->
    <GallerySelectDialog 
      v-model="showGalleryDialog" 
      theme-color="blue" 
      @select="handleGallerySelect" 
    />

    <!-- POD商品选择对话框 -->
    <PodProductSelector 
      v-model="showPodProductDialog" 
      @select="handlePodProductSelect" 
    />

    <!-- 白品选择对话框 -->
    <WhiteProductSelector 
      v-model="showWhiteProductDialog" 
      @select="handleWhiteProductSelect" 
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { ElMessage } from 'element-plus';
import type { UploadFile } from 'element-plus';
import GallerySelectDialog from '~/components/common/GallerySelectDialog.vue';

// 临时组件，实际应该从相应模块导入
const PodProductSelector = {
  template: '<div></div>',
  emits: ['update:modelValue', 'select']
};

const WhiteProductSelector = {
  template: '<div></div>',
  emits: ['update:modelValue', 'select']
};

// Props
interface Props {
  appType: string;
  dataSource: string;
  modelValue: Record<string, any>;
}

// Emits
interface Emits {
  (e: 'update:modelValue', value: Record<string, any>): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// 响应式数据
const localConfig = ref<Record<string, any>>({});
const showGalleryDialog = ref(false);
const showPodProductDialog = ref(false);
const showWhiteProductDialog = ref(false);
const uploadRef = ref();
const uploadedFiles = ref<UploadFile[]>([]);

// 计算属性
const isImageApp = computed(() => {
  return ['smart-crop', 'one-click-cutout', 'super-split', 'title-generator'].includes(props.appType);
});

const selectedImages = computed(() => {
  return localConfig.value.selectedImages || [];
});

const selectedProducts = computed(() => {
  return localConfig.value.selectedProducts || [];
});

const linkCount = computed(() => {
  if (!localConfig.value.links) return 0;
  return localConfig.value.links.split('\n').filter((link: string) => link.trim()).length;
});

const hasSelection = computed(() => {
  if (props.dataSource === 'previous') return false;
  
  switch (props.appType) {
    case 'product-collection':
      return props.dataSource === 'manual' ? linkCount.value > 0 : !!localConfig.value.keyword;
    case 'smart-crop':
    case 'one-click-cutout':
    case 'super-split':
    case 'title-generator':
      return props.dataSource === 'gallery' ? selectedImages.value.length > 0 : uploadedFiles.value.length > 0;
    case 'batch-listing':
    case 'pod-compose':
      return selectedProducts.value.length > 0;
    default:
      return false;
  }
});

const totalWhiteProducts = computed(() => 156); // 模拟数据

// 监听器
watch(() => props.modelValue, (newVal) => {
  localConfig.value = { ...newVal };
}, { immediate: true, deep: true });

// 方法
const updateConfig = () => {
  emit('update:modelValue', { ...localConfig.value });
};

const clearSelection = () => {
  localConfig.value = {};
  uploadedFiles.value = [];
  updateConfig();
  ElMessage.success('已清空选择');
};

const openGalleryDialog = () => {
  showGalleryDialog.value = true;
};

const handleGallerySelect = (images: any[]) => {
  localConfig.value.selectedImages = images;
  updateConfig();
  ElMessage.success(`已选择 ${images.length} 张图片`);
};

const openPodProductDialog = () => {
  showPodProductDialog.value = true;
  ElMessage.info('POD商品选择功能开发中...');
};

const handlePodProductSelect = (products: any[]) => {
  localConfig.value.selectedProducts = products;
  updateConfig();
  ElMessage.success(`已选择 ${products.length} 个POD商品`);
};

const openWhiteProductDialog = () => {
  showWhiteProductDialog.value = true;
  ElMessage.info('白品选择功能开发中...');
};

const handleWhiteProductSelect = (products: any[]) => {
  localConfig.value.selectedProducts = products;
  updateConfig();
  ElMessage.success(`已选择 ${products.length} 个白品`);
};

const handleFileChange = (_file: UploadFile, fileList: UploadFile[]) => {
  uploadedFiles.value = fileList;
  localConfig.value.uploadedFiles = fileList;
  updateConfig();
};

const handleFileRemove = (_file: UploadFile, fileList: UploadFile[]) => {
  uploadedFiles.value = fileList;
  localConfig.value.uploadedFiles = fileList;
  updateConfig();
};
</script>
