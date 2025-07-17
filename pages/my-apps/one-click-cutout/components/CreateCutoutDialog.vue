<template>
  <el-dialog
    v-model="dialogVisible"
    title="新建抠图任务"
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

        <!-- 图库选择按钮（次按钮） -->
        <el-button @click="showGalleryDialog = true" size="large">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
          </svg>
          图库选择
        </el-button>
      </div>

      <!-- 图片展示区域 -->
      <div class="bg-gray-50 dark:bg-dark-card border-2 border-dashed border-gray-300 dark:border-dark-border rounded-lg min-h-[400px] p-6">
        <div v-if="selectedImages.length > 0">
          <!-- 图片网格 -->
          <div class="grid grid-cols-6 gap-4">
            <div v-for="(image, index) in currentPageImages" :key="image.id || index"
                 class="relative group">
              <div class="relative">
                <img :src="image.url" :alt="image.name"
                     class="w-full h-20 object-cover rounded-lg border border-gray-200 dark:border-dark-border">

                <!-- 删除按钮 -->
                <button @click="removeImage(index)"
                        class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>

              <!-- 图片信息 -->
              <div class="mt-1 text-xs text-gray-600 dark:text-dark-text-secondary truncate">
                {{ image.name }}
              </div>
            </div>
          </div>

          <!-- 分页 -->
          <div v-if="selectedImages.length > pageSize" class="flex justify-center mt-6">
            <el-pagination
              v-model:current-page="currentPage"
              :page-size="pageSize"
              :total="selectedImages.length"
              layout="prev, pager, next"
              @current-change="handlePageChange" />
          </div>
        </div>

        <!-- 空状态 -->
        <div v-else class="flex flex-col items-center justify-center h-full text-center">
          <svg class="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          <p class="text-lg text-gray-500 dark:text-dark-text-secondary mb-2">暂无图片</p>
          <p class="text-sm text-gray-400 dark:text-dark-text-secondary">请点击上方按钮选择图片</p>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="flex justify-between items-center">
        <div class="text-sm text-gray-500 dark:text-dark-text-secondary">
          <div v-if="selectedImages.length > 0">
            <div>将处理 {{ selectedImages.length }} 张图片</div>
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
  <GallerySelectDialog v-model="showGalleryDialog" theme-color="pink" @select="handleGallerySelect" />
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

const handleFileRemove = (file: any) => {
  const index = selectedImages.value.findIndex(img => img.id === file.uid);
  if (index > -1) {
    selectedImages.value.splice(index, 1);
  }
};

const handleGallerySelect = (images: any[]) => {
  const imagesWithId = images.map(img => ({
    ...img,
    id: img.id || Date.now() + Math.random()
  }));
  selectedImages.value.push(...imagesWithId);
  showGalleryDialog.value = false;
};

const removeImage = (index: number) => {
  const actualIndex = (currentPage.value - 1) * pageSize.value + index;
  selectedImages.value.splice(actualIndex, 1);

  // 如果当前页没有图片了，回到上一页
  if (currentPageImages.value.length === 0 && currentPage.value > 1) {
    currentPage.value--;
  }
};

const handlePageChange = (page: number) => {
  currentPage.value = page;
};

// 费用计算
const appId = 'one-click-cutout';
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

  ElMessage.success(`正在创建抠图任务，共 ${selectedImages.value.length} 张图片`);

  // 重置表单
  resetForm();

  emit('success');
  emit('update:modelValue', false);
};

const resetForm = () => {
  selectedImages.value = [];
  fileList.value = [];
  currentPage.value = 1;
};
</script>
