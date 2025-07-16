<template>
  <el-dialog
    v-model="dialogVisible"
    :title="title || '选择图片'"
    width="900px"
    align-center
  >
    <div class="space-y-6">
      <!-- 操作按钮 -->
      <div class="flex space-x-3">
        <el-upload
          ref="uploadRef"
          :file-list="fileList"
          :on-change="handleFileChange"
          :on-remove="handleFileRemove"
          :auto-upload="false"
          multiple
          accept="image/*"
          :show-file-list="false"
        >
          <el-button type="primary">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
            </svg>
            上传图片
          </el-button>
        </el-upload>

        <el-button @click="showGalleryTab = true">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          从图库选择
        </el-button>

        <el-button @click="showEffectDialog = true">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
          </svg>
          创建效果图
        </el-button>
      </div>

      <!-- 标签页 -->
      <div class="border border-gray-200 dark:border-dark-border rounded-lg overflow-hidden">
        <div class="flex border-b border-gray-200 dark:border-dark-border">
          <button
            @click="showGalleryTab = false"
            :class="[
              'px-4 py-2 text-sm font-medium',
              !showGalleryTab
                ? 'text-amber-600 dark:text-amber-400 border-b-2 border-amber-500'
                : 'text-gray-500 dark:text-dark-text-secondary hover:text-gray-700 dark:hover:text-dark-text'
            ]"
          >
            已上传图片
          </button>
          <button
            @click="showGalleryTab = true"
            :class="[
              'px-4 py-2 text-sm font-medium',
              showGalleryTab
                ? 'text-amber-600 dark:text-amber-400 border-b-2 border-amber-500'
                : 'text-gray-500 dark:text-dark-text-secondary hover:text-gray-700 dark:hover:text-dark-text'
            ]"
          >
            图库
          </button>
        </div>

        <!-- 已上传图片 -->
        <div v-if="!showGalleryTab" class="p-4">
          <div v-if="uploadedImages.length > 0" class="grid grid-cols-5 gap-4">
            <div
              v-for="(image, index) in uploadedImages"
              :key="index"
              class="relative group"
              @click="toggleImageSelection(image)"
            >
              <div class="relative">
                <img
                  :src="image.url"
                  :alt="image.name"
                  class="w-full h-32 object-cover rounded-lg border-2 transition-all duration-200"
                  :class="isSelected(image) ? 'border-amber-500' : 'border-gray-200 dark:border-dark-border hover:border-amber-300'"
                />
                
                <!-- 选中状态 -->
                <div
                  v-if="isSelected(image)"
                  class="absolute inset-0 bg-amber-500 bg-opacity-20 rounded-lg flex items-center justify-center"
                >
                  <div class="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                </div>
                
                <!-- 悬停效果 -->
                <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-lg transition-all duration-200"></div>
              </div>
              <p class="text-xs text-gray-600 dark:text-dark-text-secondary mt-1 truncate">{{ image.name }}</p>
            </div>
          </div>
          <div v-else class="text-center py-12">
            <svg class="w-12 h-12 text-gray-400 dark:text-dark-text-secondary mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <p class="text-gray-500 dark:text-dark-text-secondary">暂无上传图片，请点击上方按钮上传</p>
          </div>
        </div>

        <!-- 图库 -->
        <div v-else class="p-4">
          <div class="flex justify-between items-center mb-4">
            <div class="flex space-x-4">
              <el-input
                v-model="searchKeyword"
                placeholder="搜索图片..."
                style="width: 300px"
                @input="handleSearch"
              >
                <template #prefix>
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </template>
              </el-input>
              
              <el-select
                v-model="selectedCategory"
                placeholder="选择分类"
                style="width: 150px"
                @change="handleCategoryChange"
              >
                <el-option label="全部分类" value="" />
                <el-option label="商品图片" value="product" />
                <el-option label="背景图片" value="background" />
                <el-option label="素材图片" value="material" />
              </el-select>
            </div>
          </div>

          <div v-if="filteredGalleryImages.length > 0" class="grid grid-cols-5 gap-4">
            <div
              v-for="image in filteredGalleryImages"
              :key="image.id"
              class="relative group cursor-pointer"
              @click="toggleImageSelection(image)"
            >
              <div class="relative">
                <img
                  :src="image.url"
                  :alt="image.name"
                  class="w-full h-32 object-cover rounded-lg border-2 transition-all duration-200"
                  :class="isSelected(image) ? 'border-amber-500' : 'border-gray-200 dark:border-dark-border hover:border-amber-300'"
                />
                
                <!-- 选中状态 -->
                <div
                  v-if="isSelected(image)"
                  class="absolute inset-0 bg-amber-500 bg-opacity-20 rounded-lg flex items-center justify-center"
                >
                  <div class="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                </div>
                
                <!-- 悬停效果 -->
                <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-lg transition-all duration-200"></div>
              </div>
              <p class="text-xs text-gray-600 dark:text-dark-text-secondary mt-1 truncate">{{ image.name }}</p>
            </div>
          </div>
          <div v-else class="text-center py-12">
            <svg class="w-12 h-12 text-gray-400 dark:text-dark-text-secondary mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <p class="text-gray-500 dark:text-dark-text-secondary">没有找到匹配的图片</p>
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="flex justify-between">
        <div class="text-sm text-gray-600 dark:text-dark-text-secondary">
          已选择 {{ selectedImages.length }} 张图片
        </div>
        <div class="flex space-x-3">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button
            type="primary"
            @click="confirmSelection"
            :disabled="selectedImages.length === 0"
          >
            确认选择
          </el-button>
        </div>
      </div>
    </template>
  </el-dialog>

  <!-- 创建效果图对话框 -->
  <CreateEffectDialog
    v-model="showEffectDialog"
    @created="handleEffectCreated"
  />
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import CreateEffectDialog from './CreateEffectDialog.vue';

// Props
const props = defineProps<{
  modelValue: boolean;
  title?: string;
  multiple?: boolean;
}>();

// Emits
const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  'select': [images: string[]];
}>();

// 类型定义
interface ImageItem {
  id: string | number;
  name: string;
  url: string;
  file?: File;
  category?: string;
}

// 响应式数据
const dialogVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const showGalleryTab = ref(false);
const showEffectDialog = ref(false);
const fileList = ref<any[]>([]);
const uploadedImages = ref<ImageItem[]>([]);
const selectedImages = ref<ImageItem[]>([]);
const searchKeyword = ref('');
const selectedCategory = ref('');

// 模拟图库数据
const galleryImages = ref<ImageItem[]>([
  {
    id: 1,
    name: '商品图片_001.jpg',
    url: 'https://picsum.photos/400/400?random=1',
    category: 'product'
  },
  {
    id: 2,
    name: '商品图片_002.jpg',
    url: 'https://picsum.photos/400/400?random=2',
    category: 'product'
  },
  {
    id: 3,
    name: '背景图片_001.jpg',
    url: 'https://picsum.photos/400/400?random=3',
    category: 'background'
  },
  {
    id: 4,
    name: '素材图片_001.jpg',
    url: 'https://picsum.photos/400/400?random=4',
    category: 'material'
  },
  {
    id: 5,
    name: '商品图片_003.jpg',
    url: 'https://picsum.photos/400/400?random=5',
    category: 'product'
  },
  {
    id: 6,
    name: '商品图片_004.jpg',
    url: 'https://picsum.photos/400/400?random=6',
    category: 'product'
  },
  {
    id: 7,
    name: '背景图片_002.jpg',
    url: 'https://picsum.photos/400/400?random=7',
    category: 'background'
  },
  {
    id: 8,
    name: '素材图片_002.jpg',
    url: 'https://picsum.photos/400/400?random=8',
    category: 'material'
  }
]);

// 计算属性
const filteredGalleryImages = computed(() => {
  let filtered = galleryImages.value;
  
  // 分类筛选
  if (selectedCategory.value) {
    filtered = filtered.filter(img => img.category === selectedCategory.value);
  }
  
  // 关键词搜索
  if (searchKeyword.value) {
    filtered = filtered.filter(img => 
      img.name.toLowerCase().includes(searchKeyword.value.toLowerCase())
    );
  }
  
  return filtered;
});

// 方法
const isSelected = (image: ImageItem) => {
  return selectedImages.value.some(selected => {
    if (typeof image.id === 'number' && typeof selected.id === 'number') {
      return selected.id === image.id;
    }
    return selected.url === image.url;
  });
};

const toggleImageSelection = (image: ImageItem) => {
  if (!props.multiple) {
    // 单选模式
    selectedImages.value = [image];
    return;
  }
  
  const index = selectedImages.value.findIndex(selected => {
    if (typeof image.id === 'number' && typeof selected.id === 'number') {
      return selected.id === image.id;
    }
    return selected.url === image.url;
  });
  
  if (index > -1) {
    selectedImages.value.splice(index, 1);
  } else {
    selectedImages.value.push(image);
  }
};

const handleFileChange = (file: any) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    const imageId = Date.now() + Math.random();
    const newImage = {
      id: imageId,
      name: file.name,
      url: e.target?.result as string,
      file: file.raw
    };
    
    uploadedImages.value.push(newImage);
    
    // 自动选中上传的图片
    if (!props.multiple) {
      selectedImages.value = [newImage];
    } else {
      selectedImages.value.push(newImage);
    }
  };
  reader.readAsDataURL(file.raw);
};

const handleFileRemove = (_file: any) => {
  // 这个方法在我们的实现中不会被调用，因为我们设置了 :show-file-list="false"
};

const handleSearch = () => {
  // 搜索图库图片
};

const handleCategoryChange = () => {
  // 切换图片分类
};

const confirmSelection = () => {
  emit('select', selectedImages.value.map(img => img.url));
  emit('update:modelValue', false);
  selectedImages.value = [];
};

const handleEffectCreated = (imageUrl: string) => {
  const newImage = {
    id: Date.now(),
    name: `效果图_${Date.now()}.jpg`,
    url: imageUrl
  };
  
  uploadedImages.value.push(newImage);
  showEffectDialog.value = false;
  
  // 自动选中创建的效果图
  if (!props.multiple) {
    selectedImages.value = [newImage];
  } else {
    selectedImages.value.push(newImage);
  }
  
  ElMessage.success('效果图创建成功');
};

onMounted(() => {
  // 初始化数据
});
</script>
