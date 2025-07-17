<template>
  <el-dialog
    v-model="dialogVisible"
    title="新建侵权检测任务"
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

      <!-- 图片网格显示区域 -->
      <div v-if="selectedImages.length > 0" class="border border-gray-200 dark:border-dark-border rounded-lg p-4">
        <div class="grid grid-cols-6 gap-4">
          <div v-for="image in currentPageImages" :key="image.id" class="relative group">
            <div class="relative">
              <img :src="image.url" :alt="image.name"
                   class="w-full h-24 object-cover rounded-lg border border-gray-200 dark:border-dark-border">
              
              <!-- 删除按钮 -->
              <button @click="removeImage(image.id)"
                class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <!-- 文件名 -->
            <p class="mt-2 text-xs text-gray-600 dark:text-dark-text-secondary truncate" :title="image.name">
              {{ image.name }}
            </p>
          </div>
        </div>

        <!-- 分页控制 -->
        <div v-if="selectedImages.length > pageSize" class="mt-4 flex justify-center">
          <el-pagination
            v-model:current-page="currentPage"
            :page-size="pageSize"
            :total="selectedImages.length"
            layout="prev, pager, next"
            small
            @current-change="handlePageChange"
          />
        </div>
      </div>

      <!-- 空状态 -->
      <div v-else class="border-2 border-dashed border-gray-300 dark:border-dark-border rounded-lg p-12 text-center">
        <svg class="mx-auto h-12 w-12 text-gray-400 dark:text-dark-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-dark-text">暂无图片</h3>
        <p class="mt-1 text-sm text-gray-500 dark:text-dark-text-secondary">请上传图片或从图库中选择图片进行侵权检测</p>
      </div>

      <!-- 检测设置 -->
      <div v-if="selectedImages.length > 0" class="bg-gray-50 dark:bg-dark-card rounded-lg p-4">
        <h3 class="text-sm font-medium text-gray-900 dark:text-dark-text mb-3">检测设置</h3>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
              检测精度
            </label>
            <el-select v-model="detectionAccuracy" style="width: 100%">
              <el-option label="标准检测" value="standard" />
              <el-option label="高精度检测" value="high" />
              <el-option label="快速检测" value="fast" />
            </el-select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
              相似度阈值
            </label>
            <el-select v-model="similarityThreshold" style="width: 100%">
              <el-option label="70% (宽松)" value="70" />
              <el-option label="80% (标准)" value="80" />
              <el-option label="90% (严格)" value="90" />
            </el-select>
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="flex justify-between items-center">
        <div class="text-sm text-gray-500 dark:text-dark-text-secondary">
          <div v-if="selectedImages.length > 0">
            <div>将检测 {{ selectedImages.length }} 张图片的侵权风险</div>
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
  <GallerySelectDialog v-model="showGalleryDialog" theme-color="blue" @select="handleGallerySelect" />
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { ElMessage } from 'element-plus';
import GallerySelectDialog from '~/components/common/GallerySelectDialog.vue';
import { createDetectionTask, type ImageFile } from '~/stores/copyright-detection';
import { getAppBillingConfig, calculateActualCost, getEstimatedCostDetails } from '~/stores/billing';

// Props 和 Emits
const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  success: [];
}>();

// 响应式数据
const dialogVisible = ref(false);
const showGalleryDialog = ref(false);
const fileList = ref<any[]>([]);
const selectedImages = ref<ImageFile[]>([]);
const currentPage = ref(1);
const pageSize = ref(18);

// 检测设置
const detectionAccuracy = ref('standard');
const similarityThreshold = ref('80');

// 监听 modelValue 变化
watch(() => props.modelValue, (val) => {
  dialogVisible.value = val;
});

watch(dialogVisible, (val) => {
  emit('update:modelValue', val);
});

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
  const index = selectedImages.value.findIndex(img => img.name === file.name);
  if (index > -1) {
    selectedImages.value.splice(index, 1);
  }
};

const removeImage = (imageId: number | string) => {
  const index = selectedImages.value.findIndex(img => img.id === imageId);
  if (index > -1) {
    selectedImages.value.splice(index, 1);
    // 调整当前页码
    const maxPage = Math.ceil(selectedImages.value.length / pageSize.value);
    if (currentPage.value > maxPage && maxPage > 0) {
      currentPage.value = maxPage;
    }
  }
};

const handleGallerySelect = (images: any[]) => {
  images.forEach(image => {
    if (!selectedImages.value.find(selected => selected.id === image.id)) {
      selectedImages.value.push({
        id: image.id,
        name: image.name,
        url: image.url || image.thumbnail
      });
    }
  });
  showGalleryDialog.value = false;
};

const handlePageChange = (page: number) => {
  currentPage.value = page;
};

// 费用计算
const appId = 'copyright-detection';
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
    return '开始检测';
  }

  const cost = estimatedCost.value;
  if (cost === 0) {
    return '开始检测（免费）';
  }

  return `开始检测（¥${cost.toFixed(2)}）`;
});

const submitTask = async () => {
  if (selectedImages.value.length === 0) {
    ElMessage.warning('请先选择图片');
    return;
  }

  try {
    await createDetectionTask(selectedImages.value.length);
    ElMessage.success(`正在创建侵权检测任务，共 ${selectedImages.value.length} 张图片`);

    // 重置表单
    resetForm();

    emit('success');
    emit('update:modelValue', false);
  } catch (error) {
    ElMessage.error('创建任务失败，请重试');
  }
};

const resetForm = () => {
  selectedImages.value = [];
  fileList.value = [];
  currentPage.value = 1;
  detectionAccuracy.value = 'standard';
  similarityThreshold.value = '80';
};
</script>

<style scoped>
.el-upload :deep(.el-upload__input) {
  display: none;
}
</style>
