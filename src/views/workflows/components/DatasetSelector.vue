<template>
  <div class="space-y-4">
    <div class="text-sm font-medium text-gray-700 dark:text-dark-text border-b border-gray-200 dark:border-dark-border pb-2">
      数据集选择
    </div>

    <!-- 商品采集数据集 -->
    <div v-if="appType === 'product-collection'">
      <div class="space-y-3">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">选择商品来源</label>
          <el-radio-group v-model="datasetConfig.sourceType" size="small">
            <el-radio label="url">URL链接</el-radio>
            <el-radio label="keywords">关键词搜索</el-radio>
            <el-radio label="category">分类浏览</el-radio>
          </el-radio-group>
        </div>

        <div v-if="datasetConfig.sourceType === 'url'">
          <label class="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">商品URL</label>
          <el-input
            v-model="datasetConfig.urls"
            type="textarea"
            :rows="3"
            placeholder="请输入商品URL，每行一个"
            size="small"
          />
        </div>

        <div v-if="datasetConfig.sourceType === 'keywords'">
          <label class="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">搜索关键词</label>
          <el-input
            v-model="datasetConfig.keywords"
            placeholder="请输入搜索关键词，用逗号分隔"
            size="small"
          />
        </div>

        <div v-if="datasetConfig.sourceType === 'category'">
          <label class="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">商品分类</label>
          <el-select v-model="datasetConfig.category" placeholder="选择分类" size="small" class="w-full">
            <el-option label="服装配饰" value="clothing" />
            <el-option label="数码电子" value="electronics" />
            <el-option label="家居用品" value="home" />
            <el-option label="运动户外" value="sports" />
          </el-select>
        </div>
      </div>
    </div>

    <!-- 图片处理数据集 -->
    <div v-else-if="appType === 'smart-crop' || appType === 'one-click-cutout' || appType === 'super-split'">
      <div class="space-y-3">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">图片来源</label>
          <el-radio-group v-model="datasetConfig.imageSource" size="small">
            <el-radio label="upload">本地上传</el-radio>
            <el-radio label="gallery">图库选择</el-radio>
            <el-radio label="previous">上一步结果</el-radio>
          </el-radio-group>
        </div>

        <div v-if="datasetConfig.imageSource === 'upload'">
          <el-upload
            class="upload-demo"
            drag
            multiple
            :auto-upload="false"
            :file-list="datasetConfig.uploadFiles"
            @change="handleFileChange"
          >
            <div class="text-center">
              <CloudArrowUpIcon class="w-8 h-8 mx-auto text-gray-400 mb-2" />
              <div class="text-sm text-gray-600 dark:text-dark-text-secondary">
                点击或拖拽文件到此区域上传
              </div>
            </div>
          </el-upload>
        </div>

        <div v-if="datasetConfig.imageSource === 'gallery'">
          <div class="grid grid-cols-3 gap-2">
            <div
              v-for="image in mockGalleryImages"
              :key="image.id"
              class="relative cursor-pointer border-2 rounded"
              :class="datasetConfig.selectedImages.includes(image.id) ? 'border-blue-500' : 'border-gray-200'"
              @click="toggleImageSelection(image.id)"
            >
              <img :src="image.url" :alt="image.name" class="w-full h-16 object-cover rounded" />
              <div
                v-if="datasetConfig.selectedImages.includes(image.id)"
                class="absolute top-1 right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center"
              >
                <CheckIcon class="w-3 h-3 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 标题生成数据集 -->
    <div v-else-if="appType === 'title-generator'">
      <div class="space-y-3">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">标题生成来源</label>
          <el-radio-group v-model="datasetConfig.titleSource" size="small">
            <el-radio label="products">商品信息</el-radio>
            <el-radio label="manual">手动输入</el-radio>
            <el-radio label="previous">上一步结果</el-radio>
          </el-radio-group>
        </div>

        <div v-if="datasetConfig.titleSource === 'manual'">
          <label class="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">商品信息</label>
          <el-input
            v-model="datasetConfig.productInfo"
            type="textarea"
            :rows="4"
            placeholder="请输入商品信息，包括名称、特点、用途等"
            size="small"
          />
        </div>

        <div v-if="datasetConfig.titleSource === 'products'">
          <div class="text-sm text-gray-600 dark:text-dark-text-secondary">
            将使用已有的商品数据生成标题
          </div>
        </div>
      </div>
    </div>

    <!-- 批量刊登数据集 -->
    <div v-else-if="appType === 'batch-listing'">
      <div class="space-y-3">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">刊登数据来源</label>
          <el-radio-group v-model="datasetConfig.listingSource" size="small">
            <el-radio label="template">模板文件</el-radio>
            <el-radio label="products">商品数据</el-radio>
            <el-radio label="previous">上一步结果</el-radio>
          </el-radio-group>
        </div>

        <div v-if="datasetConfig.listingSource === 'template'">
          <el-upload
            class="upload-demo"
            :auto-upload="false"
            :file-list="datasetConfig.templateFiles"
            @change="handleTemplateChange"
            accept=".csv,.xlsx,.xls"
          >
            <el-button size="small" type="primary">选择模板文件</el-button>
            <template #tip>
              <div class="text-xs text-gray-500 dark:text-dark-text-secondary mt-1">
                支持 CSV、Excel 格式
              </div>
            </template>
          </el-upload>
        </div>
      </div>
    </div>

    <!-- POD合成数据集 -->
    <div v-else-if="appType === 'pod-compose'">
      <div class="space-y-3">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">合成数据来源</label>
          <el-radio-group v-model="datasetConfig.podSource" size="small">
            <el-radio label="products">白品商品</el-radio>
            <el-radio label="designs">设计图案</el-radio>
            <el-radio label="previous">上一步结果</el-radio>
          </el-radio-group>
        </div>

        <div v-if="datasetConfig.podSource === 'products'">
          <div class="text-sm text-gray-600 dark:text-dark-text-secondary">
            将使用白品管理中的商品进行合成
          </div>
        </div>

        <div v-if="datasetConfig.podSource === 'designs'">
          <div class="text-sm text-gray-600 dark:text-dark-text-secondary">
            将使用图库中的设计图案进行合成
          </div>
        </div>
      </div>
    </div>

    <!-- 数据预览 -->
    <div v-if="hasDataSelected" class="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
      <div class="text-sm font-medium text-blue-700 dark:text-blue-300 mb-1">数据预览</div>
      <div class="text-xs text-blue-600 dark:text-blue-400">
        {{ getDataPreviewText() }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { CloudArrowUpIcon, CheckIcon } from '@heroicons/vue/24/outline';

// Props
interface Props {
  appType: string;
  modelValue: Record<string, any>;
}

// Emits
interface Emits {
  (e: 'update:modelValue', value: Record<string, any>): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// 响应式数据
const datasetConfig = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

// 模拟图库图片
const mockGalleryImages = ref([
  { id: '1', name: 'image1.jpg', url: 'https://picsum.photos/100/100?random=1' },
  { id: '2', name: 'image2.jpg', url: 'https://picsum.photos/100/100?random=2' },
  { id: '3', name: 'image3.jpg', url: 'https://picsum.photos/100/100?random=3' },
  { id: '4', name: 'image4.jpg', url: 'https://picsum.photos/100/100?random=4' },
  { id: '5', name: 'image5.jpg', url: 'https://picsum.photos/100/100?random=5' },
  { id: '6', name: 'image6.jpg', url: 'https://picsum.photos/100/100?random=6' }
]);

// 计算属性
const hasDataSelected = computed(() => {
  const config = datasetConfig.value;
  
  switch (props.appType) {
    case 'product-collection':
      return config.sourceType && (config.urls || config.keywords || config.category);
    case 'smart-crop':
    case 'one-click-cutout':
    case 'super-split':
      return config.imageSource && (
        config.uploadFiles?.length > 0 || 
        config.selectedImages?.length > 0 || 
        config.imageSource === 'previous'
      );
    case 'title-generator':
      return config.titleSource && (config.productInfo || config.titleSource !== 'manual');
    case 'batch-listing':
      return config.listingSource && (config.templateFiles?.length > 0 || config.listingSource !== 'template');
    case 'pod-compose':
      return config.podSource;
    default:
      return false;
  }
});

// 监听应用类型变化，初始化默认配置
watch(() => props.appType, (newType) => {
  const defaultConfig = getDefaultDatasetConfig(newType);
  emit('update:modelValue', { ...defaultConfig, ...props.modelValue });
}, { immediate: true });

// 方法
const getDefaultDatasetConfig = (appType: string): Record<string, any> => {
  const defaults: Record<string, Record<string, any>> = {
    'product-collection': {
      sourceType: 'keywords',
      urls: '',
      keywords: '',
      category: ''
    },
    'smart-crop': {
      imageSource: 'gallery',
      uploadFiles: [],
      selectedImages: []
    },
    'one-click-cutout': {
      imageSource: 'gallery',
      uploadFiles: [],
      selectedImages: []
    },
    'super-split': {
      imageSource: 'gallery',
      uploadFiles: [],
      selectedImages: []
    },
    'title-generator': {
      titleSource: 'products',
      productInfo: ''
    },
    'batch-listing': {
      listingSource: 'products',
      templateFiles: []
    },
    'pod-compose': {
      podSource: 'products'
    }
  };

  return defaults[appType] || {};
};

const handleFileChange = (_file: any, fileList: any[]) => {
  const config = { ...datasetConfig.value };
  config.uploadFiles = fileList;
  emit('update:modelValue', config);
};

const handleTemplateChange = (_file: any, fileList: any[]) => {
  const config = { ...datasetConfig.value };
  config.templateFiles = fileList;
  emit('update:modelValue', config);
};

const toggleImageSelection = (imageId: string) => {
  const config = { ...datasetConfig.value };
  if (!config.selectedImages) {
    config.selectedImages = [];
  }
  
  const index = config.selectedImages.indexOf(imageId);
  if (index > -1) {
    config.selectedImages.splice(index, 1);
  } else {
    config.selectedImages.push(imageId);
  }
  
  emit('update:modelValue', config);
};

const getDataPreviewText = () => {
  const config = datasetConfig.value;
  
  switch (props.appType) {
    case 'product-collection':
      if (config.sourceType === 'keywords' && config.keywords) {
        return `关键词: ${config.keywords}`;
      }
      if (config.sourceType === 'category' && config.category) {
        return `分类: ${config.category}`;
      }
      if (config.sourceType === 'url' && config.urls) {
        const urlCount = config.urls.split('\n').filter((url: string) => url.trim()).length;
        return `${urlCount} 个URL链接`;
      }
      break;
    case 'smart-crop':
    case 'one-click-cutout':
    case 'super-split':
      if (config.imageSource === 'upload' && config.uploadFiles?.length) {
        return `${config.uploadFiles.length} 个上传文件`;
      }
      if (config.imageSource === 'gallery' && config.selectedImages?.length) {
        return `${config.selectedImages.length} 个图库图片`;
      }
      if (config.imageSource === 'previous') {
        return '使用上一步处理结果';
      }
      break;
    case 'title-generator':
      if (config.titleSource === 'manual' && config.productInfo) {
        return '手动输入的商品信息';
      }
      if (config.titleSource === 'products') {
        return '使用商品数据生成';
      }
      if (config.titleSource === 'previous') {
        return '使用上一步处理结果';
      }
      break;
    case 'batch-listing':
      if (config.listingSource === 'template' && config.templateFiles?.length) {
        return `${config.templateFiles.length} 个模板文件`;
      }
      if (config.listingSource === 'products') {
        return '使用商品数据刊登';
      }
      if (config.listingSource === 'previous') {
        return '使用上一步处理结果';
      }
      break;
    case 'pod-compose':
      if (config.podSource === 'products') {
        return '使用白品商品合成';
      }
      if (config.podSource === 'designs') {
        return '使用设计图案合成';
      }
      if (config.podSource === 'previous') {
        return '使用上一步处理结果';
      }
      break;
  }
  
  return '已选择数据源';
};
</script>
