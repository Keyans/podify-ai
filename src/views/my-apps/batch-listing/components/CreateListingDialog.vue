<template>
  <el-dialog
    v-model="dialogVisible"
    width="900px"
    align-center
    :before-close="handleClose"
    :show-close="false"
    class="modern-dialog"
    @close="resetForm">
    <!-- 自定义标题 -->
    <template #header>
      <div class="flex items-center justify-between p-6 border-b border-gray-100 dark:border-dark-border">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          <div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-dark-text">新建刊登任务</h3>
            <p class="text-sm text-gray-600 dark:text-dark-text-secondary">配置刊登平台、模板文件和商品信息</p>
          </div>
        </div>
        <button @click="handleClose" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </template>

    <div class="p-6 space-y-6">
      <!-- 头部按钮区域 -->
      <div class="flex justify-start space-x-3">
        <!-- 上传模板文件按钮（主按钮） -->
        <el-upload
          ref="uploadRef"
          :file-list="fileList"
          :on-change="handleFileChange"
          :on-remove="handleFileRemove"
          :auto-upload="false"
          accept=".csv,.xls,.xlsx,.xlsm"
          :show-file-list="false">
          <el-button type="primary" size="large">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
            </svg>
            上传模板文件
          </el-button>
        </el-upload>

        <!-- 选择模板文件按钮（次要按钮） -->
        <el-button size="large" @click="showTemplateSelector = true">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
          </svg>
          选择模板文件
        </el-button>
      </div>



      <!-- 已选择的文件显示 -->
      <div v-if="selectedFiles.length > 0" class="space-y-3">
        <h4 class="text-sm font-medium text-gray-900 dark:text-dark-text">已选择的模板文件</h4>
        <div class="grid grid-cols-1 gap-3">
          <div
            v-for="file in selectedFiles"
            :key="file.name"
            class="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-card rounded-lg border border-gray-200 dark:border-dark-border"
          >
            <div class="flex items-center space-x-3">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <div>
                <div class="font-medium text-gray-900 dark:text-dark-text">{{ file.name }}</div>
                <div class="text-sm text-gray-500 dark:text-dark-text-secondary">{{ formatFileSize(file.size) }}</div>
              </div>
            </div>
            <el-button
              type="danger"
              link
              @click="removeFile(file)"
            >
              删除
            </el-button>
          </div>
        </div>
      </div>

      <!-- POD商品选择 -->
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <h4 class="text-sm font-medium text-gray-900 dark:text-dark-text">选择POD商品</h4>
          <button @click="showPodSelector = true"
            class="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
            选择商品 ({{ selectedProducts.length }})
          </button>
        </div>
        
        <!-- 已选择的POD商品预览 -->
        <div v-if="selectedProducts.length > 0" class="grid grid-cols-4 gap-4 max-h-48 overflow-y-auto">
          <div
            v-for="product in selectedProducts.slice(0, 8)"
            :key="product.id"
            class="relative border border-gray-200 dark:border-dark-border rounded-lg p-2"
          >
            <el-image
              :src="product.coverImage"
              fit="cover"
              class="w-full h-20 rounded"
            />
            <div class="mt-1 text-xs text-gray-600 dark:text-dark-text-secondary truncate">
              {{ product.name }}
            </div>
            <el-button
              type="danger"
              link
              size="small"
              class="absolute top-1 right-1"
              @click="removeProduct(product)"
            >
              ×
            </el-button>
          </div>
          <div v-if="selectedProducts.length > 8" class="flex items-center justify-center border border-gray-200 dark:border-dark-border rounded-lg p-2">
            <span class="text-sm text-gray-500 dark:text-dark-text-secondary">
              +{{ selectedProducts.length - 8 }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 对话框底部 -->
    <template #footer>
      <div class="flex items-center justify-end p-6 border-t border-gray-100 dark:border-dark-border bg-gray-50 dark:bg-dark-card/50 space-x-3">
        <button @click="handleClose"
          class="px-6 py-2.5 text-gray-700 dark:text-dark-text font-medium rounded-lg border border-gray-300 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-border transition-all duration-200">
          取消
        </button>
        <button
          @click="handleSubmit"
          :disabled="!canSubmit || submitting"
          class="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {{ submitting ? '生成中...' : '生成刊登数据' }}
        </button>
      </div>
    </template>
  </el-dialog>

  <!-- 模板文件选择对话框 -->
  <TemplateSelector v-model="showTemplateSelector" @select="handleTemplateSelect" />

  <!-- POD商品选择对话框 -->
  <PodProductSelector v-model="showPodSelector" @select="handleProductSelect" />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { ElMessage } from 'element-plus';
import type { UploadFile } from 'element-plus';
import TemplateSelector from './TemplateSelector.vue';
import PodProductSelector from './PodProductSelector.vue';

// Props
interface Props {
  modelValue: boolean;
}

// Emits
interface Emits {
  (e: 'update:modelValue', value: boolean): void;
  (e: 'success'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// 类型定义

interface PodProduct {
  id: string;
  name: string;
  coverImage: string;
}

interface TemplateFile {
  name: string;
  size: number;
  url?: string;
}

// 响应式数据
const dialogVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const uploadRef = ref();
const submitting = ref(false);
const showTemplateSelector = ref(false);
const showPodSelector = ref(false);
const fileList = ref<UploadFile[]>([]);
const selectedFiles = ref<TemplateFile[]>([]);
const selectedProducts = ref<PodProduct[]>([]);

// 计算属性
const canSubmit = computed(() => {
  return selectedFiles.value.length > 0 &&
         selectedProducts.value.length > 0;
});

// 方法
const handleFileChange = (file: UploadFile) => {
  if (file.raw) {
    const templateFile: TemplateFile = {
      name: file.name,
      size: file.size || 0
    };
    selectedFiles.value.push(templateFile);
  }
};

const handleFileRemove = (file: UploadFile) => {
  const index = selectedFiles.value.findIndex(f => f.name === file.name);
  if (index > -1) {
    selectedFiles.value.splice(index, 1);
  }
};

const removeFile = (file: TemplateFile) => {
  const index = selectedFiles.value.findIndex(f => f.name === file.name);
  if (index > -1) {
    selectedFiles.value.splice(index, 1);
  }
};

const handleTemplateSelect = (files: TemplateFile[]) => {
  selectedFiles.value = [...selectedFiles.value, ...files];
};

const handleProductSelect = (products: PodProduct[]) => {
  selectedProducts.value = products;
};

const removeProduct = (product: PodProduct) => {
  const index = selectedProducts.value.findIndex(p => p.id === product.id);
  if (index > -1) {
    selectedProducts.value.splice(index, 1);
  }
};

const formatFileSize = (size: number) => {
  if (size < 1024) return size + ' B';
  if (size < 1024 * 1024) return (size / 1024).toFixed(1) + ' KB';
  return (size / (1024 * 1024)).toFixed(1) + ' MB';
};

const handleSubmit = async () => {
  if (!canSubmit.value) return;

  submitting.value = true;
  try {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    ElMessage.success('刊登任务创建成功！');
    emit('success');
    handleClose();
  } catch (error) {
    ElMessage.error('创建失败，请重试');
  } finally {
    submitting.value = false;
  }
};

const handleClose = () => {
  resetForm();
  emit('update:modelValue', false);
};

const resetForm = () => {
  selectedFiles.value = [];
  selectedProducts.value = [];
  fileList.value = [];
  if (uploadRef.value) {
    uploadRef.value.clearFiles();
  }
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
