<template>
  <el-dialog
    v-model="dialogVisible"
    title="新建标题生成任务"
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

      <!-- 生成规则设置区域 -->
      <div class="bg-gray-50 dark:bg-dark-card rounded-lg p-4">
        <div class="flex items-center justify-between mb-3">
          <h4 class="text-sm font-medium text-gray-900 dark:text-dark-text">生成规则设置</h4>
          <div class="relative">
            <button 
              @mouseenter="showPresetTooltip = true"
              @mouseleave="showPresetTooltip = false"
              @click="showPresetPanel = !showPresetPanel"
              class="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200">
              使用预设
            </button>
            <!-- 预设面板 -->
            <div v-if="showPresetPanel" class="absolute right-0 top-8 w-80 bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-lg shadow-lg z-10">
              <div class="p-4">
                <div class="flex items-center justify-between mb-3">
                  <h5 class="text-sm font-medium text-gray-900 dark:text-dark-text">预设列表</h5>
                  <button @click="showCreatePresetDialog = true" class="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700">
                    新建预设
                  </button>
                </div>
                <div class="space-y-2 max-h-48 overflow-y-auto">
                  <div v-for="preset in presets" :key="preset.id" 
                       @click="selectPreset(preset)"
                       class="p-3 border border-gray-200 dark:border-dark-border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-dark-card transition-colors duration-200">
                    <div class="font-medium text-sm text-gray-900 dark:text-dark-text">{{ preset.name }}</div>
                    <div class="text-xs text-gray-500 dark:text-dark-text-secondary mt-1 line-clamp-2">{{ preset.description }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <el-input
          v-model="generationRules"
          type="textarea"
          :rows="6"
          placeholder="请输入生成规则，例如：根据图片内容拟定标题；要求：商品款式+商品颜色+印花图案+使用场景，遵循亚马逊平台要求，输出英文，总字符量不超过120个字符"
          class="modern-textarea"
        />
      </div>

      <!-- 图片展示区域 -->
      <div v-if="selectedImages.length > 0" class="space-y-4">
        <div class="flex items-center justify-between">
          <h4 class="text-sm font-medium text-gray-900 dark:text-dark-text">
            已选择图片 ({{ selectedImages.length }})
          </h4>
          <div class="text-xs text-gray-500 dark:text-dark-text-secondary">
            预计生成 {{ selectedImages.length * 3 }} 个标题
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

                <!-- 标题数量标识 -->
                <div class="absolute bottom-1 right-1 bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded">
                  ×3
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
            <div>将处理 {{ selectedImages.length }} 张图片，生成 {{ totalTitles }} 个标题</div>
            <div v-if="costDetails.hasFreeQuota && costDetails.freeItems > 0" class="text-green-600 dark:text-green-400">
              免费额度：{{ costDetails.freeItems }} 个标题，付费：{{ costDetails.chargeableItems }} 个标题
            </div>
            <div v-if="billingConfig" class="text-blue-600 dark:text-blue-400">
              单价：¥{{ billingConfig.unitPrice.toFixed(2) }}/个标题
            </div>
          </div>
          <div v-else>请先选择图片和设置生成规则</div>
        </div>
        <div class="flex space-x-3">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitTask" :disabled="selectedImages.length === 0 || !generationRules.trim()">
            {{ buttonText }}
          </el-button>
        </div>
      </div>
    </template>
  </el-dialog>

  <!-- 图库选择对话框 -->
  <GallerySelectDialog v-model="showGalleryDialog" theme-color="blue" @select="handleGallerySelect" />

  <!-- 新建预设对话框 -->
  <CreatePresetDialog v-model="showCreatePresetDialog" @success="handlePresetCreated" />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { ElMessage } from 'element-plus';
import GallerySelectDialog from '../~/components/common/GallerySelectDialog.vue';
import CreatePresetDialog from './CreatePresetDialog.vue';
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

interface Preset {
  id: string;
  name: string;
  description: string;
  rules: string;
}

// 响应式数据
const dialogVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const showGalleryDialog = ref(false);
const showPresetPanel = ref(false);
const showPresetTooltip = ref(false);
const showCreatePresetDialog = ref(false);
const fileList = ref<any[]>([]);
const selectedImages = ref<ImageFile[]>([]);
const currentPage = ref(1);
const pageSize = ref(18);
const generationRules = ref('');

// 预设数据
const presets = ref<Preset[]>([
  {
    id: '1',
    name: '亚马逊标题',
    description: '根据图片内容拟定标题；要求：商品款式+商品颜色+印花图案+使用场景，遵循亚马逊平台要求，输出英文，总字符量不超过120个字符',
    rules: '任务：根据图片内容拟定标题；要求：商品款式+商品颜色+印花图案+使用场景，遵循<亚马逊>平台要求，输出<英文>，总字符量不超过120个字符'
  },
  {
    id: '2',
    name: 'Temu标题',
    description: '根据图片内容生成Temu平台标题；要求：突出产品特色和卖点，中英文混合，字符数80-100',
    rules: '任务：根据图片内容拟定标题；要求：突出产品特色和卖点，遵循<Temu>平台要求，输出<中英文混合>，总字符量80-100个字符'
  },
  {
    id: '3',
    name: 'Shein标题',
    description: '根据图片内容生成Shein平台标题；要求：时尚感强，突出风格和场合，英文输出，60-80字符',
    rules: '任务：根据图片内容拟定标题；要求：时尚感强，突出风格和场合，遵循<Shein>平台要求，输出<英文>，总字符量60-80个字符'
  }
]);

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

// 预设相关方法
const selectPreset = (preset: Preset) => {
  generationRules.value = preset.rules;
  showPresetPanel.value = false;
  ElMessage.success(`已应用预设：${preset.name}`);
};

const handlePresetCreated = (preset: Preset) => {
  presets.value.push(preset);
  ElMessage.success('预设创建成功！');
};

// 费用计算 - 标题生成按生成的标题数量计费，每张图片生成3个标题
const appId = 'title-generator';
const billingConfig = getAppBillingConfig(appId);

const totalTitles = computed(() => selectedImages.value.length * 3);

const estimatedCost = computed(() => {
  if (totalTitles.value === 0) return 0;
  return calculateActualCost(appId, totalTitles.value);
});

const costDetails = computed(() => {
  return getEstimatedCostDetails(appId, totalTitles.value);
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

  if (!generationRules.value.trim()) {
    ElMessage.warning('请设置生成规则');
    return;
  }

  ElMessage.success(`正在创建标题生成任务，共 ${selectedImages.value.length} 张图片`);

  // 重置表单
  resetForm();

  emit('success');
  emit('update:modelValue', false);
};

const resetForm = () => {
  selectedImages.value = [];
  fileList.value = [];
  currentPage.value = 1;
  generationRules.value = '';
  showPresetPanel.value = false;
};
</script>

<style scoped>
.modern-textarea :deep(.el-textarea__inner) {
  border-radius: 8px;
  border: 1px solid theme('colors.gray.300');
  transition: all 0.2s ease;
}

.modern-textarea :deep(.el-textarea__inner:focus) {
  border-color: theme('colors.blue.500');
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
