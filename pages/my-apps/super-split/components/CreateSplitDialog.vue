<template>
  <el-dialog
    v-model="dialogVisible"
    title="新建裂变任务"
    width="900px"
    align-center
    @close="resetForm">
    <div class="space-y-6">
      <!-- 头部按钮区域 -->
      <div class="flex justify-start space-x-3">
        <!-- 上传图片按钮（主按钮） -->
        <el-upload
          ref="uploadRef"
          :file-list="fileList"
          :on-change="handleFileChange"
          :on-remove="handleFileRemove"
          :auto-upload="false"
          multiple
          accept="image/*"
          :show-file-list="false">
          <el-button type="primary" size="large">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
            </svg>
            上传图片
          </el-button>
        </el-upload>

        <!-- 从图库选择按钮（次要按钮） -->
        <el-button size="large" @click="showGalleryDialog = true">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          从图库选择
        </el-button>
      </div>

      <!-- 裂变设置区域 -->
      <div class="bg-gray-50 dark:bg-dark-card rounded-lg p-4">
        <h4 class="text-sm font-medium text-gray-900 dark:text-dark-text mb-3">裂变设置</h4>
        <div class="flex items-center space-x-4">
          <div class="flex items-center space-x-2">
            <label class="text-sm text-gray-600 dark:text-dark-text-secondary">裂变数量:</label>
            <el-input-number
              v-model="splitCount"
              :min="1"
              :max="5"
              size="small"
              style="width: 120px"
            />
          </div>
          <div class="text-xs text-gray-500 dark:text-dark-text-secondary">
            每张原图将生成 {{ splitCount }} 个不同的裂变版本
          </div>
        </div>
      </div>

      <!-- 图片展示区域 -->
      <div v-if="selectedImages.length > 0" class="space-y-4">
        <div class="flex items-center justify-between">
          <h4 class="text-sm font-medium text-gray-900 dark:text-dark-text">
            已选择图片 ({{ selectedImages.length }})
          </h4>
          <div class="text-xs text-gray-500 dark:text-dark-text-secondary">
            预计生成 {{ selectedImages.length * splitCount }} 张裂变图片
          </div>
        </div>

        <!-- 图片网格 -->
        <div class="border border-gray-200 dark:border-dark-border rounded-lg p-4 max-h-80 overflow-y-auto">
          <div class="grid grid-cols-6 gap-4">
            <div v-for="(image, index) in currentPageImages" :key="image.id || index" 
                 class="relative group">
              <div class="relative">
                <img :src="image.url" :alt="image.name" 
                     class="w-full h-20 object-cover rounded-lg border border-gray-200 dark:border-dark-border">
                
                <!-- 删除按钮 -->
                <button @click="removeImage(index + (currentPage - 1) * pageSize)"
                  class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>

                <!-- 裂变数量标识 -->
                <div class="absolute bottom-1 right-1 bg-purple-500 text-white text-xs px-1.5 py-0.5 rounded">
                  ×{{ splitCount }}
                </div>
              </div>
              <p class="text-xs text-gray-600 dark:text-dark-text-secondary mt-1 truncate">{{ image.name }}</p>
            </div>
          </div>

          <!-- 分页 -->
          <div v-if="selectedImages.length > pageSize" class="mt-4 flex justify-center">
            <el-pagination
              v-model:current-page="currentPage"
              :page-size="pageSize"
              :total="selectedImages.length"
              layout="prev, pager, next"
              small
            />
          </div>
        </div>
      </div>

      <!-- 空状态 -->
      <div v-else class="text-center py-12 border-2 border-dashed border-gray-200 dark:border-dark-border rounded-lg">
        <svg class="w-12 h-12 text-gray-400 dark:text-dark-text-secondary mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
        <p class="text-gray-500 dark:text-dark-text-secondary">请上传图片或从图库选择</p>
      </div>
    </div>

    <template #footer>
      <div class="flex justify-between items-center">
        <div class="text-sm text-gray-500 dark:text-dark-text-secondary">
          <div v-if="selectedImages.length > 0">
            <div>将处理 {{ selectedImages.length }} 张图片，生成 {{ selectedImages.length * splitCount }} 张裂变图片</div>
            <div v-if="costDetails.hasFreeQuota && costDetails.freeItems > 0" class="text-green-600 dark:text-green-400">
              免费额度：{{ costDetails.freeItems }} 张，付费：{{ costDetails.chargeableItems }} 张
            </div>
            <div v-if="billingConfig" class="text-blue-600 dark:text-blue-400">
              单价：¥{{ billingConfig.unitPrice.toFixed(2) }}/张
            </div>
          </div>
          <div v-else>请先选择图片</div>
        </div>
        <div class="flex space-x-3">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitTask" :disabled="selectedImages.length === 0">
            {{ buttonText }}
          </el-button>
        </div>
      </div>
    </template>
  </el-dialog>

  <!-- 图库选择对话框 -->
  <GallerySelectDialog v-model="showGalleryDialog" theme-color="purple" @select="handleGallerySelect" />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { ElMessage } from 'element-plus';
import GallerySelectDialog from '../~/components/common/GallerySelectDialog.vue';
import { getAppBillingConfig, calculateActualCost, getEstimatedCostDetails } from '~/stores/billing';

// Props
const props = defineProps<{
  modelValue: boolean;
}>();

// Emits
const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  'success': [];
}>();

// 类型定义
interface ImageFile {
  id?: string | number;
  name: string;
  url: string;
  file?: File;
}

// 响应式数据
const dialogVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const showGalleryDialog = ref(false);
const fileList = ref<any[]>([]);
const selectedImages = ref<ImageFile[]>([]);
const currentPage = ref(1);
const pageSize = ref(18); // 增加每页显示数量
const splitCount = ref(3); // 裂变数量，默认为3

// 计算属性
const currentPageImages = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return selectedImages.value.slice(start, end);
});

// 文件处理方法
const handleFileChange = (file: any) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    const imageId = Date.now() + Math.random();
    selectedImages.value.push({
      id: imageId,
      name: file.name,
      url: e.target?.result as string,
      file: file.raw
    });
  };
  reader.readAsDataURL(file.raw);
};

const handleFileRemove = (_file: any) => {
  // 这个方法在我们的实现中不会被调用，因为我们设置了 :show-file-list="false"
};

const removeImage = (index: number) => {
  selectedImages.value.splice(index, 1);
  // 如果当前页没有图片了，回到上一页
  if (currentPageImages.value.length === 0 && currentPage.value > 1) {
    currentPage.value--;
  }
};

// 图库选择处理
const handleGallerySelect = (images: any[]) => {
  const newImages = images.map(img => ({
    id: img.id,
    name: img.name,
    url: img.url
  }));
  selectedImages.value.push(...newImages);
  showGalleryDialog.value = false;
  ElMessage.success(`已添加 ${images.length} 张图片`);
};

// 费用计算
const appId = 'super-split';
const billingConfig = getAppBillingConfig(appId);

const estimatedCost = computed(() => {
  if (selectedImages.value.length === 0) return 0;
  return calculateActualCost(appId, selectedImages.value.length);
});

const costDetails = computed(() => {
  return getEstimatedCostDetails(appId, selectedImages.value.length);
});

const buttonText = computed(() => {
  if (selectedImages.value.length === 0) {
    return '提交任务';
  }

  const cost = estimatedCost.value;
  if (cost === 0) {
    return '提交任务（免费）';
  }

  return `提交任务（¥${cost.toFixed(2)}）`;
});

const submitTask = () => {
  if (selectedImages.value.length === 0) {
    ElMessage.warning('请先选择图片');
    return;
  }

  ElMessage.success(`正在创建裂变任务，共 ${selectedImages.value.length} 张图片，每张生成 ${splitCount.value} 个裂变版本`);

  // 重置表单
  resetForm();

  emit('success');
  emit('update:modelValue', false);
};

const resetForm = () => {
  selectedImages.value = [];
  fileList.value = [];
  currentPage.value = 1;
  splitCount.value = 3;
};
</script>
