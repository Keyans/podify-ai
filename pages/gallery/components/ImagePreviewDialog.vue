<template>
  <el-dialog
    v-model="dialogVisible"
    width="800px"
    align-center
    :show-close="false"
    class="modern-dialog">
    <!-- 自定义标题 -->
    <template #header>
      <div class="flex items-center justify-between p-6 border-b border-gray-100 dark:border-dark-border">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
            </svg>
          </div>
          <div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-dark-text">图片预览</h3>
            <p class="text-sm text-gray-600 dark:text-dark-text-secondary">查看图片详细信息</p>
          </div>
        </div>
        <button @click="handleClose" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </template>

    <div v-if="image" class="p-6 space-y-6">
      <!-- 图片展示 -->
      <div class="flex justify-center">
        <div class="relative">
          <img
            :src="image.url"
            :alt="image.name"
            class="max-w-full max-h-96 object-contain rounded-lg shadow-lg"
          />
          
          <!-- 分类标签 -->
          <div class="absolute top-4 left-4">
            <span :class="getCategoryClass(image.category)" class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium">
              {{ getCategoryText(image.category) }}
            </span>
          </div>
        </div>
      </div>

      <!-- 图片信息 -->
      <div class="bg-gray-50 dark:bg-dark-card rounded-lg p-4">
        <h4 class="text-lg font-semibold text-gray-900 dark:text-dark-text mb-4">图片信息</h4>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-sm font-medium text-gray-600 dark:text-dark-text-secondary">文件名</label>
            <p class="text-gray-900 dark:text-dark-text">{{ image.name }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-600 dark:text-dark-text-secondary">文件大小</label>
            <p class="text-gray-900 dark:text-dark-text">{{ image.size }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-600 dark:text-dark-text-secondary">上传时间</label>
            <p class="text-gray-900 dark:text-dark-text">{{ image.uploadTime }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-600 dark:text-dark-text-secondary">图片分类</label>
            <p class="text-gray-900 dark:text-dark-text">{{ getCategoryText(image.category) }}</p>
          </div>
        </div>

        <!-- 标签 -->
        <div v-if="image.tags && image.tags.length > 0" class="mt-4">
          <label class="text-sm font-medium text-gray-600 dark:text-dark-text-secondary">标签</label>
          <div class="flex flex-wrap gap-2 mt-2">
            <span
              v-for="tag in image.tags"
              :key="tag"
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 对话框底部 -->
    <template #footer>
      <div class="flex items-center justify-between p-6 border-t border-gray-100 dark:border-dark-border bg-gray-50 dark:bg-dark-card/50">
        <div class="flex space-x-3">
          <button @click="downloadImage"
            class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
            </svg>
            下载图片
          </button>
          <button @click="copyImageUrl"
            class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
            </svg>
            复制链接
          </button>
        </div>
        
        <button @click="handleClose"
          class="px-6 py-2.5 text-gray-700 dark:text-dark-text font-medium rounded-lg border border-gray-300 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-border transition-all duration-200">
          关闭
        </button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ElMessage } from 'element-plus';

// Props
interface Props {
  modelValue: boolean;
  image: any;
}

// Emits
interface Emits {
  (e: 'update:modelValue', value: boolean): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// 响应式数据
const dialogVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

// 方法
const getCategoryClass = (category: string) => {
  const classes: Record<string, string> = {
    'main': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    'detail': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    'sku': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
    'material': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    'background': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
    'result': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
  };
  return classes[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
};

const getCategoryText = (category: string) => {
  const texts: Record<string, string> = {
    'main': '主图',
    'detail': '详情图',
    'sku': 'SKU图',
    'material': '素材',
    'background': '背景',
    'result': '处理结果'
  };
  return texts[category] || '未知';
};

const downloadImage = () => {
  if (!props.image) return;
  
  // 创建下载链接
  const link = document.createElement('a');
  link.href = props.image.url;
  link.download = props.image.name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  ElMessage.success(`正在下载 ${props.image.name}`);
};

const copyImageUrl = async () => {
  if (!props.image) return;
  
  try {
    await navigator.clipboard.writeText(props.image.url);
    ElMessage.success('图片链接已复制到剪贴板');
  } catch (error) {
    ElMessage.error('复制失败，请手动复制');
  }
};

const handleClose = () => {
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
</style>
