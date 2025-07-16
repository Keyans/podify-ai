<template>
  <el-dialog 
    v-model="dialogVisible" 
    title="从图库选择图片" 
    width="1000px" 
    align-center>
    <div class="space-y-4">
      <!-- 搜索和筛选 -->
      <div class="flex justify-between items-center">
        <div class="flex space-x-4">
          <el-input 
            v-model="searchKeyword" 
            placeholder="搜索图片..." 
            style="width: 300px"
            @input="handleSearch">
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
            @change="handleCategoryChange">
            <el-option label="全部分类" value="" />
            <el-option label="商品图片" value="product" />
            <el-option label="背景图片" value="background" />
            <el-option label="素材图片" value="material" />
          </el-select>
        </div>
        
        <div class="text-sm text-gray-600 dark:text-dark-text-secondary">
          已选择 {{ selectedImages.length }} 张图片
        </div>
      </div>

      <!-- 图片网格 -->
      <div class="border border-gray-200 dark:border-dark-border rounded-lg p-4 max-h-96 overflow-y-auto">
        <div class="grid grid-cols-6 gap-4">
          <div v-for="image in filteredImages" :key="image.id" 
               class="relative group cursor-pointer"
               @click="toggleImageSelection(image)">
            <div class="relative">
              <img :src="image.thumbnail" :alt="image.name"
                   class="w-full h-24 object-cover rounded-lg border-2 transition-all duration-200"
                   :class="getImageBorderClass(image)">

              <!-- 选中状态 -->
              <div v-if="isSelected(image)"
                   :class="getSelectedOverlayClass()">
                <div :class="getSelectedIconClass()">
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
        
        <!-- 空状态 -->
        <div v-if="filteredImages.length === 0" class="text-center py-8">
          <svg class="w-12 h-12 text-gray-400 dark:text-dark-text-secondary mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          <p class="text-gray-500 dark:text-dark-text-secondary">没有找到匹配的图片</p>
        </div>
      </div>

      <!-- 分页 -->
      <div v-if="filteredImages.length > 0" class="flex justify-center">
        <el-pagination
          v-model:current-page="currentPage"
          :page-size="pageSize"
          :total="totalImages"
          layout="prev, pager, next"
          @current-change="handlePageChange"
        />
      </div>
    </div>

    <template #footer>
      <div class="flex justify-between">
        <el-button @click="selectAll" v-if="filteredImages.length > 0">
          {{ isAllSelected ? '取消全选' : '全选当页' }}
        </el-button>
        <div class="flex space-x-3">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmSelection" :disabled="selectedImages.length === 0">
            确认选择 ({{ selectedImages.length }})
          </el-button>
        </div>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

// Props
const props = defineProps<{
  modelValue: boolean;
  themeColor?: string; // 主题色，如 'pink', 'purple', 'blue' 等
}>();

// Emits
const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  'select': [images: any[]];
}>();

// 响应式数据
const dialogVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const searchKeyword = ref('');
const selectedCategory = ref('');
const selectedImages = ref<any[]>([]);
const currentPage = ref(1);
const pageSize = ref(24);
const themeColor = computed(() => props.themeColor || 'blue');

// 模拟图库数据
const galleryImages = ref([
  {
    id: 1,
    name: '商品图片_001.jpg',
    thumbnail: 'https://picsum.photos/200/200?random=1',
    url: 'https://picsum.photos/400/400?random=1',
    category: 'product'
  },
  {
    id: 2,
    name: '商品图片_002.jpg',
    thumbnail: 'https://picsum.photos/200/200?random=2',
    url: 'https://picsum.photos/400/400?random=2',
    category: 'product'
  },
  {
    id: 3,
    name: '背景图片_001.jpg',
    thumbnail: 'https://picsum.photos/200/200?random=3',
    url: 'https://picsum.photos/400/400?random=3',
    category: 'background'
  },
  {
    id: 4,
    name: '素材图片_001.jpg',
    thumbnail: 'https://picsum.photos/200/200?random=4',
    url: 'https://picsum.photos/400/400?random=4',
    category: 'material'
  },
  {
    id: 5,
    name: '商品图片_003.jpg',
    thumbnail: 'https://picsum.photos/200/200?random=5',
    url: 'https://picsum.photos/400/400?random=5',
    category: 'product'
  },
  {
    id: 6,
    name: '商品图片_004.jpg',
    thumbnail: 'https://picsum.photos/200/200?random=6',
    url: 'https://picsum.photos/400/400?random=6',
    category: 'product'
  },
  {
    id: 7,
    name: '背景图片_002.jpg',
    thumbnail: 'https://picsum.photos/200/200?random=7',
    url: 'https://picsum.photos/400/400?random=7',
    category: 'background'
  },
  {
    id: 8,
    name: '素材图片_002.jpg',
    thumbnail: 'https://picsum.photos/200/200?random=8',
    url: 'https://picsum.photos/400/400?random=8',
    category: 'material'
  },
  {
    id: 9,
    name: '商品图片_005.jpg',
    thumbnail: 'https://picsum.photos/200/200?random=9',
    url: 'https://picsum.photos/400/400?random=9',
    category: 'product'
  },
  {
    id: 10,
    name: '商品图片_006.jpg',
    thumbnail: 'https://picsum.photos/200/200?random=10',
    url: 'https://picsum.photos/400/400?random=10',
    category: 'product'
  },
  {
    id: 11,
    name: '背景图片_003.jpg',
    thumbnail: 'https://picsum.photos/200/200?random=11',
    url: 'https://picsum.photos/400/400?random=11',
    category: 'background'
  },
  {
    id: 12,
    name: '素材图片_003.jpg',
    thumbnail: 'https://picsum.photos/200/200?random=12',
    url: 'https://picsum.photos/400/400?random=12',
    category: 'material'
  }
]);

// 计算属性
const filteredImages = computed(() => {
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
  
  // 分页
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filtered.slice(start, end);
});

const totalImages = computed(() => {
  let filtered = galleryImages.value;
  
  if (selectedCategory.value) {
    filtered = filtered.filter(img => img.category === selectedCategory.value);
  }
  
  if (searchKeyword.value) {
    filtered = filtered.filter(img => 
      img.name.toLowerCase().includes(searchKeyword.value.toLowerCase())
    );
  }
  
  return filtered.length;
});

const isAllSelected = computed(() => {
  return filteredImages.value.length > 0 && 
         filteredImages.value.every(img => isSelected(img));
});

// 方法
const isSelected = (image: any) => {
  return selectedImages.value.some(selected => selected.id === image.id);
};

const toggleImageSelection = (image: any) => {
  const index = selectedImages.value.findIndex(selected => selected.id === image.id);
  if (index > -1) {
    selectedImages.value.splice(index, 1);
  } else {
    selectedImages.value.push(image);
  }
};

const selectAll = () => {
  if (isAllSelected.value) {
    // 取消选择当页所有图片
    filteredImages.value.forEach(img => {
      const index = selectedImages.value.findIndex(selected => selected.id === img.id);
      if (index > -1) {
        selectedImages.value.splice(index, 1);
      }
    });
  } else {
    // 选择当页所有图片
    filteredImages.value.forEach(img => {
      if (!isSelected(img)) {
        selectedImages.value.push(img);
      }
    });
  }
};

const handleSearch = () => {
  currentPage.value = 1;
};

const handleCategoryChange = () => {
  currentPage.value = 1;
};

const handlePageChange = (page: number) => {
  currentPage.value = page;
};

const confirmSelection = () => {
  emit('select', selectedImages.value);
  selectedImages.value = [];
};

// 主题色相关方法
const getImageBorderClass = (image: any) => {
  const color = themeColor.value;
  if (isSelected(image)) {
    switch (color) {
      case 'pink': return 'border-pink-500';
      case 'purple': return 'border-purple-500';
      case 'yellow': return 'border-yellow-500';
      case 'blue': return 'border-blue-500';
      default: return 'border-blue-500';
    }
  } else {
    switch (color) {
      case 'pink': return 'border-gray-200 dark:border-dark-border hover:border-pink-300';
      case 'purple': return 'border-gray-200 dark:border-dark-border hover:border-purple-300';
      case 'yellow': return 'border-gray-200 dark:border-dark-border hover:border-yellow-300';
      case 'blue': return 'border-gray-200 dark:border-dark-border hover:border-blue-300';
      default: return 'border-gray-200 dark:border-dark-border hover:border-blue-300';
    }
  }
};

const getSelectedOverlayClass = () => {
  const color = themeColor.value;
  switch (color) {
    case 'pink': return 'absolute inset-0 bg-pink-500 bg-opacity-20 rounded-lg flex items-center justify-center';
    case 'purple': return 'absolute inset-0 bg-purple-500 bg-opacity-20 rounded-lg flex items-center justify-center';
    case 'yellow': return 'absolute inset-0 bg-yellow-500 bg-opacity-20 rounded-lg flex items-center justify-center';
    case 'blue': return 'absolute inset-0 bg-blue-500 bg-opacity-20 rounded-lg flex items-center justify-center';
    default: return 'absolute inset-0 bg-blue-500 bg-opacity-20 rounded-lg flex items-center justify-center';
  }
};

const getSelectedIconClass = () => {
  const color = themeColor.value;
  switch (color) {
    case 'pink': return 'w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center';
    case 'purple': return 'w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center';
    case 'yellow': return 'w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center';
    case 'blue': return 'w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center';
    default: return 'w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center';
  }
};

onMounted(() => {
  // 初始化数据
});
</script>
