<template>
  <el-dialog
    v-model="dialogVisible"
    width="700px"
    :before-close="handleClose"
    :show-close="false"
    class="modern-dialog"
  >
    <!-- 自定义标题 -->
    <template #header>
      <div class="flex items-center justify-between p-6 border-b border-gray-100 dark:border-dark-border">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
          </div>
          <div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-dark-text">新建采集任务</h3>
            <p class="text-sm text-gray-600 dark:text-dark-text-secondary">配置您的商品采集参数</p>
          </div>
        </div>
        <button @click="handleClose"
          class="p-2 text-gray-400 hover:text-gray-600 dark:text-dark-text-secondary dark:hover:text-dark-text rounded-lg hover:bg-gray-100 dark:hover:bg-dark-card transition-all duration-200">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </template>
    <div class="p-6 space-y-6">
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="0px"
        class="space-y-6"
      >
        <!-- 采集类型 -->
        <div class="space-y-3">
          <label class="block text-sm font-semibold text-gray-900 dark:text-dark-text">
            采集类型
          </label>
          <el-form-item prop="type" class="mb-0">
            <div class="grid grid-cols-2 gap-3 w-full">
              <label v-for="option in typeOptions" :key="option.value"
                class="relative flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md"
                :class="form.type === option.value
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                  : 'border-gray-200 dark:border-dark-border hover:border-gray-300 dark:hover:border-gray-600'">
                <input type="radio"
                  :value="option.value"
                  v-model="form.type"
                  @change="handleTypeChange"
                  class="sr-only">
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 rounded-lg flex items-center justify-center"
                    :class="form.type === option.value
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 dark:bg-dark-card text-gray-600 dark:text-dark-text-secondary'">
                    <component :is="option.icon" class="w-4 h-4" />
                  </div>
                  <span class="font-medium text-gray-900 dark:text-dark-text">{{ option.label }}</span>
                </div>
                <div v-if="form.type === option.value"
                  class="absolute top-2 right-2 w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center">
                  <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              </label>
            </div>
          </el-form-item>
        </div>

        <!-- 链接输入框 (商品或店铺) -->
        <div v-if="form.type === CollectionType.PRODUCT || form.type === CollectionType.STORE"
          class="space-y-3">
          <label class="block text-sm font-semibold text-gray-900 dark:text-dark-text">
            {{ form.type === CollectionType.PRODUCT ? '商品链接' : '店铺链接' }}
          </label>
          <el-form-item prop="links" class="mb-0">
            <el-input
              v-model="form.links"
              type="textarea"
              :rows="6"
              :placeholder="form.type === CollectionType.PRODUCT ? '请输入商品链接地址，一行一条' : '请输入店铺链接地址，一行一条'"
              class="modern-textarea"
            />
            <div class="flex items-start space-x-2 mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <svg class="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <div class="text-xs text-blue-700 dark:text-blue-300">
                <p class="font-medium">支持平台：</p>
                <p>亚马逊、Temu、Shein - 每行输入一个链接地址</p>
              </div>
            </div>
          </el-form-item>
        </div>

        <!-- 搜索关键词 (搜索类型) -->
        <div v-if="form.type === CollectionType.SEARCH" class="space-y-3">
          <label class="block text-sm font-semibold text-gray-900 dark:text-dark-text">
            搜索关键词
          </label>
          <el-form-item prop="keyword" class="mb-0">
            <el-input
              v-model="form.keyword"
              placeholder="请输入搜索关键词，如：iPhone 15"
              class="modern-input"
            />
          </el-form-item>
        </div>

        <!-- 平台选择 (搜索类型) -->
        <div v-if="form.type === CollectionType.SEARCH" class="space-y-3">
          <label class="block text-sm font-semibold text-gray-900 dark:text-dark-text">
            选择平台
          </label>
          <el-form-item prop="platform" class="mb-0">
            <div class="grid grid-cols-3 gap-3 w-full">
              <label v-for="platform in platformOptions" :key="platform.value"
                class="relative flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all duration-200"
                :class="form.platform === platform.value
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                  : 'border-gray-200 dark:border-dark-border hover:border-gray-300 dark:hover:border-gray-600'">
                <input type="radio"
                  :value="platform.value"
                  v-model="form.platform"
                  class="sr-only">
                <div class="flex flex-col items-center space-y-1 w-full">
                  <span class="text-lg">{{ platform.icon }}</span>
                  <span class="text-sm font-medium text-gray-900 dark:text-dark-text">{{ platform.label }}</span>
                </div>
                <div v-if="form.platform === platform.value"
                  class="absolute top-1 right-1 w-4 h-4 bg-primary-500 rounded-full flex items-center justify-center">
                  <svg class="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              </label>
            </div>
          </el-form-item>
        </div>

        <!-- 价格区间 (搜索类型) -->
        <div v-if="form.type === CollectionType.SEARCH" class="space-y-3">
          <label class="block text-sm font-semibold text-gray-900 dark:text-dark-text">
            价格区间
          </label>
          <el-form-item class="mb-0">
            <div class="flex items-center space-x-3">
              <el-input
                v-model="form.priceMin"
                placeholder="最低价格"
                type="number"
                class="modern-input"
                style="width: 150px"
              >
                <template #prefix>¥</template>
              </el-input>
              <span class="text-gray-500 dark:text-dark-text-secondary">至</span>
              <el-input
                v-model="form.priceMax"
                placeholder="最高价格"
                type="number"
                class="modern-input"
                style="width: 150px"
              >
                <template #prefix>¥</template>
              </el-input>
            </div>
          </el-form-item>
        </div>

        <!-- 翻页数 (搜索类型) -->
        <div v-if="form.type === CollectionType.SEARCH" class="space-y-3">
          <label class="block text-sm font-semibold text-gray-900 dark:text-dark-text">
            翻页数
          </label>
          <el-form-item prop="pageCount" class="mb-0">
            <el-input-number
              v-model="form.pageCount"
              :min="1"
              :max="50"
              placeholder="请输入翻页数"
              class="w-full"
            />
            <div class="mt-1 text-xs text-gray-500 dark:text-dark-text-secondary">
              建议设置1-10页，页数过多可能影响采集效率
            </div>
          </el-form-item>
        </div>

        <!-- 商品类型 (搜索类型) -->
        <div v-if="form.type === CollectionType.SEARCH" class="space-y-3">
          <label class="block text-sm font-semibold text-gray-900 dark:text-dark-text">
            商品类型
          </label>
          <el-form-item prop="productType" class="mb-0">
            <el-select
              v-model="form.productType"
              placeholder="请选择商品类型"
              class="w-full"
            >
              <el-option
                v-for="type in productTypeOptions"
                :key="type.value"
                :label="type.label"
                :value="type.value"
              />
            </el-select>
          </el-form-item>
        </div>

        <!-- 下载采集器 (其他类型) -->
        <div v-if="form.type === CollectionType.OTHER" class="space-y-3">
          <label class="block text-sm font-semibold text-gray-900 dark:text-dark-text">
            采集器工具
          </label>
          <div class="p-4 bg-gray-50 dark:bg-dark-card rounded-lg border border-gray-200 dark:border-dark-border">
            <button @click="downloadCollector"
              class="inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
              <Download class="w-5 h-5 mr-2" />
              下载采集器
            </button>
            <div class="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <div class="flex items-start space-x-2">
                <svg class="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
                <div class="text-xs text-yellow-700 dark:text-yellow-300">
                  <p class="font-medium">使用说明：</p>
                  <p>1. 下载并安装采集器工具</p>
                  <p>2. 按照安装向导完成配置</p>
                  <p>3. 启动采集器开始自定义采集</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-form>
    </div>

    <template #footer>
      <div class="flex items-center justify-between p-6 border-t border-gray-100 dark:border-dark-border bg-gray-50 dark:bg-dark-card/50">
        <div class="text-sm text-gray-500 dark:text-dark-text-secondary">
          <div v-if="estimatedItems > 0">
            <div>预计采集 {{ estimatedItems }} 个商品</div>
            <div v-if="costDetails.hasFreeQuota && costDetails.freeItems > 0" class="text-green-600 dark:text-green-400">
              免费额度：{{ costDetails.freeItems }} 个，付费：{{ costDetails.chargeableItems }} 个
            </div>
            <div v-if="billingConfig" class="text-blue-600 dark:text-blue-400">
              单价：¥{{ billingConfig.unitPrice.toFixed(2) }}/个商品
            </div>
          </div>
        </div>
        <div class="flex items-center space-x-3">
          <button @click="handleClose"
            class="px-6 py-2.5 text-gray-700 dark:text-dark-text font-medium rounded-lg border border-gray-300 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-border transition-all duration-200">
            取消
          </button>
          <button @click="handleSubmit"
            :disabled="!canSubmit || submitting"
            class="inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium rounded-lg shadow-lg hover:shadow-xl disabled:shadow-none transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed">
            <svg v-if="submitting" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ submitting ? '创建中...' : buttonText }}
          </button>
        </div>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { ElMessage } from 'element-plus';
import { Download } from '@element-plus/icons-vue';
import {
  ShoppingBagIcon,
  BuildingStorefrontIcon,
  MagnifyingGlassIcon,
  CubeIcon
} from '@heroicons/vue/24/outline';
import type { FormInstance, FormRules } from 'element-plus';
import { createCollectionTask, CollectionType, Platform } from '../../../../store/product-collection';
import { getAppBillingConfig, calculateActualCost, getEstimatedCostDetails } from '../../../../store/billing';

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

// 导出枚举供模板使用

// 响应式数据
const formRef = ref<FormInstance>();
const submitting = ref(false);

const form = ref({
  type: CollectionType.PRODUCT,
  links: '',
  keyword: '',
  platform: Platform.AMAZON,
  priceMin: '',
  priceMax: '',
  pageCount: 5,
  productType: ''
});

// 类型选项
const typeOptions = [
  { value: CollectionType.PRODUCT, label: '商品链接', icon: ShoppingBagIcon },
  { value: CollectionType.STORE, label: '店铺链接', icon: BuildingStorefrontIcon },
  { value: CollectionType.SEARCH, label: '搜索采集', icon: MagnifyingGlassIcon },
  { value: CollectionType.OTHER, label: '其他方式', icon: CubeIcon },
];

// 平台选项
const platformOptions = [
  { value: Platform.AMAZON, label: '亚马逊', icon: '🛒' },
  { value: Platform.TEMU, label: 'Temu', icon: '🛍️' },
  { value: Platform.SHEIN, label: 'Shein', icon: '👗' },
];

// 商品类型选项
const productTypeOptions = [
  { value: '', label: '全部类型' },
  { value: 'new', label: '新品' },
  { value: 'hot', label: '热卖' },
  { value: 'discount', label: '折扣商品' },
  { value: 'bestseller', label: '畅销商品' },
  { value: 'featured', label: '精选商品' },
];

// 计算属性
const dialogVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const canSubmit = computed(() => {
  if (form.value.type === CollectionType.PRODUCT || form.value.type === CollectionType.STORE) {
    return form.value.links.trim() !== '';
  }
  if (form.value.type === CollectionType.SEARCH) {
    return form.value.keyword.trim() !== '' && form.value.platform;
  }
  if (form.value.type === CollectionType.OTHER) {
    return true; // 其他类型只需要下载采集器
  }
  return false;
});

// 表单验证规则
const rules: FormRules = {
  type: [
    { required: true, message: '请选择采集类型', trigger: 'change' }
  ],
  links: [
    { required: true, message: '请输入链接地址', trigger: 'blur' }
  ],
  keyword: [
    { required: true, message: '请输入搜索关键词', trigger: 'blur' }
  ],
  platform: [
    { required: true, message: '请选择平台', trigger: 'change' }
  ]
};

// 方法
const handleTypeChange = () => {
  // 切换类型时清空相关字段
  form.value.links = '';
  form.value.keyword = '';
  form.value.platform = Platform.AMAZON;
  form.value.priceMin = '';
  form.value.priceMax = '';
  form.value.pageCount = 5;
  form.value.productType = '';
};

const downloadCollector = () => {
  ElMessage.success('采集器下载功能开发中...');
};

// 费用计算 - 商品采集按页数计费，每页预估10个商品
const appId = 'product-collection';
const billingConfig = getAppBillingConfig(appId);

const estimatedItems = computed(() => {
  if (form.value.type === CollectionType.PRODUCT) {
    // 商品链接采集，按链接数量计算
    const links = form.value.links.split('\n').filter(link => link.trim());
    return links.length;
  } else if (form.value.type === CollectionType.SEARCH) {
    // 搜索采集，按页数计算，每页约10个商品
    return form.value.pageCount * 10;
  } else {
    // 店铺采集等其他方式，按页数计算
    return form.value.pageCount * 10;
  }
});

const estimatedCost = computed(() => {
  if (estimatedItems.value === 0) return 0;
  return calculateActualCost(appId, estimatedItems.value);
});

const costDetails = computed(() => {
  return getEstimatedCostDetails(appId, estimatedItems.value);
});

const buttonText = computed(() => {
  if (estimatedItems.value === 0) {
    return '开始采集';
  }

  const cost = estimatedCost.value;
  if (cost === 0) {
    return '开始采集（免费）';
  }

  return `开始采集（¥${cost.toFixed(2)}）`;
});

const handleSubmit = async () => {
  if (!formRef.value) return;

  try {
    await formRef.value.validate();
    submitting.value = true;

    // 调用API创建采集任务
    await createCollectionTask(form.value);

    ElMessage.success('采集任务创建成功！');
    emit('success');
    handleClose();
  } catch (error) {
    console.error('创建采集任务失败:', error);
    ElMessage.error('创建失败，请重试');
  } finally {
    submitting.value = false;
  }
};

const handleClose = () => {
  // 重置表单
  if (formRef.value) {
    formRef.value.resetFields();
  }
  form.value = {
    type: CollectionType.PRODUCT,
    links: '',
    keyword: '',
    platform: Platform.AMAZON,
    priceMin: '',
    priceMax: '',
    pageCount: 5,
    productType: ''
  };
  emit('update:modelValue', false);
};

// 监听弹窗显示状态
watch(dialogVisible, (newVal) => {
  if (newVal) {
    // 弹窗打开时重置表单
    handleClose();
    emit('update:modelValue', true);
  }
});
</script>

<style scoped>
.modern-dialog :deep(.el-dialog) {
  border-radius: 16px;
  overflow: hidden;
  background: white;
}

.dark .modern-dialog :deep(.el-dialog) {
  background: rgb(30, 41, 59);
  border: 1px solid rgb(71, 85, 105);
}

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

.modern-textarea :deep(.el-textarea__inner) {
  border-radius: 12px;
  border: 2px solid rgb(229, 231, 235);
  transition: all 0.2s ease;
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
}

.dark .modern-textarea :deep(.el-textarea__inner) {
  border-color: rgb(75, 85, 99);
  background: rgb(51, 65, 85);
  color: rgb(241, 245, 249);
}

.modern-textarea :deep(.el-textarea__inner:focus) {
  border-color: rgb(59, 130, 246);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.modern-input :deep(.el-input__inner) {
  border-radius: 12px;
  border: 2px solid rgb(229, 231, 235);
  transition: all 0.2s ease;
  height: 44px;
}

.dark .modern-input :deep(.el-input__inner) {
  border-color: rgb(75, 85, 99);
  background: rgb(51, 65, 85);
  color: rgb(241, 245, 249);
}

.modern-input :deep(.el-input__inner:focus) {
  border-color: rgb(59, 130, 246);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
</style>
