<template>
  <el-dialog
    v-model="dialogVisible"
    title="创建POD合成任务"
    width="1000px"
    align-center
    @close="resetForm"
    class="create-pod-dialog"
  >
    <div class="space-y-6">
      <!-- 步骤指示器 -->
      <div class="flex items-center justify-center space-x-4 mb-8">
        <div class="flex items-center">
          <div :class="[
            'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
            currentStep >= 1 ? 'bg-purple-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
          ]">
            1
          </div>
          <span class="ml-2 text-sm font-medium text-gray-900 dark:text-dark-text">选择白品</span>
        </div>
        <div class="w-16 h-0.5 bg-gray-200 dark:bg-gray-700"></div>
        <div class="flex items-center">
          <div :class="[
            'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
            currentStep >= 2 ? 'bg-purple-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
          ]">
            2
          </div>
          <span class="ml-2 text-sm font-medium text-gray-900 dark:text-dark-text">选择图案</span>
        </div>
        <div class="w-16 h-0.5 bg-gray-200 dark:bg-gray-700"></div>
        <div class="flex items-center">
          <div :class="[
            'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
            currentStep >= 3 ? 'bg-purple-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
          ]">
            3
          </div>
          <span class="ml-2 text-sm font-medium text-gray-900 dark:text-dark-text">确认合成</span>
        </div>
      </div>

      <!-- 步骤1: 选择白品 -->
      <div v-if="currentStep === 1" class="space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-medium text-gray-900 dark:text-dark-text">选择白品商品</h3>
          <div class="text-sm text-gray-600 dark:text-dark-text-secondary">
            已选择 <span class="font-medium text-purple-600 dark:text-purple-400">{{ selectedBaseProducts.length }}</span> 个白品
          </div>
        </div>
        <div class="border border-gray-200 dark:border-dark-border rounded-lg p-4">
          <div class="flex items-center space-x-4 mb-4">
            <el-input
              v-model="baseProductSearch"
              placeholder="搜索白品商品..."
              style="width: 300px"
              @input="searchBaseProducts"
            >
              <template #prefix>
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </template>
            </el-input>
            <el-select v-model="baseProductCategory" placeholder="选择分类" style="width: 150px">
              <el-option label="全部分类" value="" />
              <el-option label="服装" value="clothing" />
              <el-option label="配饰" value="accessories" />
              <el-option label="家居" value="home" />
            </el-select>
            <el-button
              v-if="selectedBaseProducts.length > 0"
              @click="clearSelectedBaseProducts"
              size="small"
              type="danger"
              plain
            >
              清空选择
            </el-button>
          </div>

          <div class="grid grid-cols-4 gap-4 max-h-96 overflow-y-auto">
            <div
              v-for="product in filteredBaseProducts"
              :key="product.id"
              class="border-2 rounded-lg p-3 cursor-pointer transition-all duration-200 hover:shadow-md relative"
              :class="isBaseProductSelected(product.id) ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' : 'border-gray-200 dark:border-dark-border hover:border-purple-300'"
              @click="toggleBaseProduct(product)"
            >
              <!-- 选中标识 -->
              <div v-if="isBaseProductSelected(product.id)" class="absolute top-2 right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <img :src="product.image" :alt="product.name" class="w-full h-32 object-cover rounded-lg mb-2" />
              <h4 class="text-sm font-medium text-gray-900 dark:text-dark-text truncate">{{ product.name }}</h4>
              <p class="text-xs text-gray-500 dark:text-dark-text-secondary">{{ product.category }}</p>
              <p class="text-sm font-medium text-green-600 dark:text-green-400 mt-1">¥{{ product.price }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 步骤2: 选择图案 -->
      <div v-if="currentStep === 2" class="space-y-4">
        <h3 class="text-lg font-medium text-gray-900 dark:text-dark-text">选择印刷图案</h3>
        <div class="flex space-x-3 mb-4">
          <el-button
            :type="patternSource === 'gallery' ? 'primary' : 'default'"
            @click="patternSource = 'gallery'"
          >
            从图库选择
          </el-button>
          <el-button
            :type="patternSource === 'upload' ? 'primary' : 'default'"
            @click="patternSource = 'upload'"
          >
            上传图片
          </el-button>
        </div>

        <!-- 从图库选择 -->
        <div v-if="patternSource === 'gallery'" class="border border-gray-200 dark:border-dark-border rounded-lg p-4">
          <div class="flex items-center space-x-4 mb-4">
            <el-input
              v-model="patternSearch"
              placeholder="搜索图案..."
              style="width: 300px"
            >
              <template #prefix>
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </template>
            </el-input>
            <el-select v-model="patternCategory" placeholder="选择分类" style="width: 150px">
              <el-option label="全部分类" value="" />
              <el-option label="动物" value="animal" />
              <el-option label="植物" value="plant" />
              <el-option label="几何" value="geometric" />
              <el-option label="文字" value="text" />
            </el-select>
          </div>
          
          <div class="grid grid-cols-5 gap-4 max-h-96 overflow-y-auto">
            <div
              v-for="pattern in filteredPatterns"
              :key="pattern.id"
              class="border-2 rounded-lg p-2 cursor-pointer transition-all duration-200 hover:shadow-md"
              :class="selectedPatterns.some(p => p.id === pattern.id) ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' : 'border-gray-200 dark:border-dark-border hover:border-purple-300'"
              @click="togglePattern(pattern)"
            >
              <div class="relative">
                <img :src="pattern.image" :alt="pattern.name" class="w-full h-24 object-cover rounded-lg mb-2" />
                <div
                  v-if="selectedPatterns.some(p => p.id === pattern.id)"
                  class="absolute top-1 right-1 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center"
                >
                  <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              </div>
              <h4 class="text-xs font-medium text-gray-900 dark:text-dark-text truncate">{{ pattern.name }}</h4>
            </div>
          </div>
        </div>

        <!-- 上传图片 -->
        <div v-if="patternSource === 'upload'" class="border border-gray-200 dark:border-dark-border rounded-lg p-4">
          <el-upload
            ref="uploadRef"
            :file-list="uploadedPatterns"
            :on-change="handlePatternUpload"
            :auto-upload="false"
            multiple
            accept="image/*"
            drag
            class="w-full"
          >
            <div class="text-center py-8">
              <svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
              <p class="text-gray-600 dark:text-dark-text-secondary">拖拽图片到此处或点击上传</p>
              <p class="text-sm text-gray-500 dark:text-dark-text-secondary mt-1">支持 JPG、PNG 格式</p>
            </div>
          </el-upload>
          
          <div v-if="uploadedPatterns.length > 0" class="grid grid-cols-5 gap-4 mt-4">
            <div
              v-for="(pattern, index) in uploadedPatterns"
              :key="index"
              class="relative border border-gray-200 dark:border-dark-border rounded-lg p-2"
            >
              <img :src="pattern.url" :alt="pattern.name" class="w-full h-24 object-cover rounded-lg" />
              <button
                @click="removeUploadedPattern(index)"
                class="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
              >
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 步骤3: 确认合成 -->
      <div v-if="currentStep === 3" class="space-y-4">
        <h3 class="text-lg font-medium text-gray-900 dark:text-dark-text">确认合成信息</h3>
        <div class="bg-gray-50 dark:bg-dark-card rounded-lg p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- 选中的白品 -->
            <div>
              <h4 class="text-sm font-medium text-gray-900 dark:text-dark-text mb-3">
                选中的白品 ({{ selectedBaseProducts.length }})
              </h4>
              <div class="max-h-64 overflow-y-auto space-y-2">
                <div
                  v-for="product in selectedBaseProducts"
                  :key="product.id"
                  class="flex items-center space-x-3 p-3 border border-gray-200 dark:border-dark-border rounded-lg"
                >
                  <img :src="product.image" :alt="product.name" class="w-16 h-16 object-cover rounded-lg" />
                  <div class="flex-1">
                    <p class="font-medium text-gray-900 dark:text-dark-text">{{ product.name }}</p>
                    <p class="text-sm text-gray-500 dark:text-dark-text-secondary">{{ product.category }}</p>
                    <p class="text-sm font-medium text-green-600 dark:text-green-400">¥{{ product.price }}</p>
                  </div>
                </div>
                <div v-if="selectedBaseProducts.length === 0" class="text-center p-4 text-gray-500 dark:text-dark-text-secondary">
                  未选择任何白品
                </div>
              </div>
            </div>

            <!-- 选中的图案 -->
            <div>
              <h4 class="text-sm font-medium text-gray-900 dark:text-dark-text mb-3">选中的图案 ({{ totalSelectedPatterns }})</h4>
              <div class="grid grid-cols-3 gap-2 max-h-32 overflow-y-auto">
                <div
                  v-for="pattern in allSelectedPatterns"
                  :key="'id' in pattern ? pattern.id : pattern.name"
                  class="relative"
                >
                  <img :src="'image' in pattern ? pattern.image : pattern.url" :alt="pattern.name" class="w-full h-16 object-cover rounded-lg" />
                </div>
              </div>
            </div>
          </div>

          <!-- 合成设置 -->
          <div class="mt-6 pt-6 border-t border-gray-200 dark:border-dark-border">
            <h4 class="text-sm font-medium text-gray-900 dark:text-dark-text mb-3">合成设置</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">商品名称前缀</label>
                <el-input v-model="productNamePrefix" placeholder="如：个性化、定制" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">价格调整</label>
                <el-input-number
                  v-model="priceAdjustment"
                  :min="0"
                  :precision="2"
                  :step="1"
                  style="width: 100%"
                />
              </div>
            </div>
          </div>

          <!-- 预计结果 -->
          <div class="mt-6 pt-6 border-t border-gray-200 dark:border-dark-border">
            <h4 class="text-sm font-medium text-gray-900 dark:text-dark-text mb-3">预计结果</h4>
            <div class="grid grid-cols-4 gap-4 text-center">
              <div class="bg-white dark:bg-dark-surface p-4 rounded-lg border border-gray-200 dark:border-dark-border">
                <p class="text-2xl font-bold text-orange-600 dark:text-orange-400">{{ selectedBaseProducts.length }}</p>
                <p class="text-sm text-gray-600 dark:text-dark-text-secondary">白品数量</p>
              </div>
              <div class="bg-white dark:bg-dark-surface p-4 rounded-lg border border-gray-200 dark:border-dark-border">
                <p class="text-2xl font-bold text-purple-600 dark:text-purple-400">{{ selectedBaseProducts.length * totalSelectedPatterns }}</p>
                <p class="text-sm text-gray-600 dark:text-dark-text-secondary">将生成商品数</p>
              </div>
              <div class="bg-white dark:bg-dark-surface p-4 rounded-lg border border-gray-200 dark:border-dark-border">
                <p class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ estimatedSkus }}</p>
                <p class="text-sm text-gray-600 dark:text-dark-text-secondary">预计SKU数</p>
              </div>
              <div class="bg-white dark:bg-dark-surface p-4 rounded-lg border border-gray-200 dark:border-dark-border">
                <p class="text-2xl font-bold text-green-600 dark:text-green-400">¥{{ finalPrice }}</p>
                <p class="text-sm text-gray-600 dark:text-dark-text-secondary">最终售价</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="flex justify-between items-center">
        <div class="flex items-center space-x-4">
          <el-button v-if="currentStep > 1" @click="previousStep">上一步</el-button>
          <div v-if="currentStep === 3 && totalProducts > 0" class="text-sm text-gray-500 dark:text-dark-text-secondary">
            <div>将生成 {{ totalProducts }} 个POD商品</div>
            <div v-if="costDetails.hasFreeQuota && costDetails.freeItems > 0" class="text-green-600 dark:text-green-400">
              免费额度：{{ costDetails.freeItems }} 个，付费：{{ costDetails.chargeableItems }} 个
            </div>
            <div v-if="billingConfig" class="text-blue-600 dark:text-blue-400">
              单价：¥{{ billingConfig.unitPrice.toFixed(2) }}/个商品
            </div>
          </div>
        </div>
        <div class="flex space-x-3">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button
            v-if="currentStep < 3"
            type="primary"
            @click="nextStep"
            :disabled="!canProceed"
          >
            下一步
          </el-button>
          <el-button
            v-else
            type="primary"
            @click="submitTask"
            :loading="submitting"
          >
            {{ submitting ? '创建中...' : buttonText }}
          </el-button>
        </div>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { ElMessage } from 'element-plus';
import { getAppBillingConfig, calculateActualCost, getEstimatedCostDetails } from '../../../../store/billing';

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
interface BaseProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
}

interface Pattern {
  id: string;
  name: string;
  category: string;
  image: string;
}

interface UploadedPattern {
  name: string;
  url: string;
  file: File;
}

// 响应式数据
const dialogVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const currentStep = ref(1);
const submitting = ref(false);

// 步骤1: 白品选择
const baseProductSearch = ref('');
const baseProductCategory = ref('');
const selectedBaseProducts = ref<BaseProduct[]>([]);

// 步骤2: 图案选择
const patternSource = ref<'gallery' | 'upload'>('gallery');
const patternSearch = ref('');
const patternCategory = ref('');
const selectedPatterns = ref<Pattern[]>([]);
const uploadedPatterns = ref<UploadedPattern[]>([]);

// 步骤3: 合成设置
const productNamePrefix = ref('个性化');
const priceAdjustment = ref(20);

// 模拟数据
const baseProducts = ref<BaseProduct[]>([
  { id: 'BP001', name: '纯棉圆领T恤', category: '服装', price: 39.9, image: 'https://picsum.photos/200/200?random=501' },
  { id: 'BP002', name: '陶瓷马克杯', category: '家居', price: 25.9, image: 'https://picsum.photos/200/200?random=502' },
  { id: 'BP003', name: '帆布手提袋', category: '配饰', price: 29.9, image: 'https://picsum.photos/200/200?random=503' },
  { id: 'BP004', name: 'iPhone手机壳', category: '配饰', price: 19.9, image: 'https://picsum.photos/200/200?random=504' },
  { id: 'BP005', name: '方形抱枕', category: '家居', price: 49.9, image: 'https://picsum.photos/200/200?random=505' },
  { id: 'BP006', name: '连帽卫衣', category: '服装', price: 89.9, image: 'https://picsum.photos/200/200?random=506' },
  { id: 'BP007', name: '棒球帽', category: '配饰', price: 35.9, image: 'https://picsum.photos/200/200?random=507' },
  { id: 'BP008', name: '保温杯', category: '家居', price: 59.9, image: 'https://picsum.photos/200/200?random=508' }
]);

const patterns = ref<Pattern[]>([
  { id: 'PT001', name: '可爱猫咪', category: 'animal', image: 'https://picsum.photos/150/150?random=601' },
  { id: 'PT002', name: '几何图案', category: 'geometric', image: 'https://picsum.photos/150/150?random=602' },
  { id: 'PT003', name: '热带植物', category: 'plant', image: 'https://picsum.photos/150/150?random=603' },
  { id: 'PT004', name: '励志文字', category: 'text', image: 'https://picsum.photos/150/150?random=604' },
  { id: 'PT005', name: '抽象艺术', category: 'geometric', image: 'https://picsum.photos/150/150?random=605' },
  { id: 'PT006', name: '卡通狗狗', category: 'animal', image: 'https://picsum.photos/150/150?random=606' },
  { id: 'PT007', name: '花卉图案', category: 'plant', image: 'https://picsum.photos/150/150?random=607' },
  { id: 'PT008', name: '英文字母', category: 'text', image: 'https://picsum.photos/150/150?random=608' }
]);

// 计算属性
const filteredBaseProducts = computed(() => {
  let filtered = baseProducts.value;
  
  if (baseProductCategory.value) {
    filtered = filtered.filter(p => p.category === baseProductCategory.value);
  }
  
  if (baseProductSearch.value) {
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(baseProductSearch.value.toLowerCase())
    );
  }
  
  return filtered;
});

const filteredPatterns = computed(() => {
  let filtered = patterns.value;
  
  if (patternCategory.value) {
    filtered = filtered.filter(p => p.category === patternCategory.value);
  }
  
  if (patternSearch.value) {
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(patternSearch.value.toLowerCase())
    );
  }
  
  return filtered;
});

const allSelectedPatterns = computed(() => {
  return [...selectedPatterns.value, ...uploadedPatterns.value];
});

const totalSelectedPatterns = computed(() => {
  return selectedPatterns.value.length + uploadedPatterns.value.length;
});

const estimatedSkus = computed(() => {
  if (selectedBaseProducts.value.length === 0) return 0;
  // 假设每个白品有6个SKU（2种颜色 × 3种尺码）
  return selectedBaseProducts.value.length * totalSelectedPatterns.value * 6;
});

const averageBasePrice = computed(() => {
  if (selectedBaseProducts.value.length === 0) return 0;
  const totalPrice = selectedBaseProducts.value.reduce((sum, product) => sum + product.price, 0);
  return totalPrice / selectedBaseProducts.value.length;
});

const finalPrice = computed(() => {
  if (selectedBaseProducts.value.length === 0) return 0;
  return (averageBasePrice.value + priceAdjustment.value).toFixed(2);
});

const canProceed = computed(() => {
  if (currentStep.value === 1) {
    return selectedBaseProducts.value.length > 0;
  }
  if (currentStep.value === 2) {
    return totalSelectedPatterns.value > 0;
  }
  return true;
});

// 方法
const toggleBaseProduct = (product: BaseProduct) => {
  const index = selectedBaseProducts.value.findIndex(p => p.id === product.id);
  if (index > -1) {
    selectedBaseProducts.value.splice(index, 1);
  } else {
    selectedBaseProducts.value.push(product);
  }
};

const isBaseProductSelected = (productId: string): boolean => {
  return selectedBaseProducts.value.some(p => p.id === productId);
};

const clearSelectedBaseProducts = () => {
  selectedBaseProducts.value = [];
};

const togglePattern = (pattern: Pattern) => {
  const index = selectedPatterns.value.findIndex(p => p.id === pattern.id);
  if (index > -1) {
    selectedPatterns.value.splice(index, 1);
  } else {
    selectedPatterns.value.push(pattern);
  }
};

const handlePatternUpload = (file: any) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    uploadedPatterns.value.push({
      name: file.name,
      url: e.target?.result as string,
      file: file.raw
    });
  };
  reader.readAsDataURL(file.raw);
};

const removeUploadedPattern = (index: number) => {
  uploadedPatterns.value.splice(index, 1);
};

const searchBaseProducts = () => {
  // 搜索白品商品
};

const nextStep = () => {
  if (canProceed.value) {
    currentStep.value++;
  }
};

const previousStep = () => {
  currentStep.value--;
};

// 费用计算 - POD合成按生成的商品数量计费
const appId = 'pod-compose';
const billingConfig = getAppBillingConfig(appId);

const totalProducts = computed(() => {
  return selectedBaseProducts.value.length * totalSelectedPatterns.value;
});

const estimatedCost = computed(() => {
  if (totalProducts.value === 0) return 0;
  return calculateActualCost(appId, totalProducts.value);
});

const costDetails = computed(() => {
  return getEstimatedCostDetails(appId, totalProducts.value);
});

const buttonText = computed(() => {
  if (totalProducts.value === 0) {
    return '创建任务';
  }

  const cost = estimatedCost.value;
  if (cost === 0) {
    return '创建任务（免费）';
  }

  return `创建任务（¥${cost.toFixed(2)}）`;
});

const submitTask = () => {
  submitting.value = true;

  // 输出选中的白品信息用于验证
  console.log('选中的白品:', selectedBaseProducts.value);
  console.log('选中的图案:', [...selectedPatterns.value, ...uploadedPatterns.value]);
  console.log('预计生成商品数:', selectedBaseProducts.value.length * totalSelectedPatterns.value);

  // 模拟提交
  setTimeout(() => {
    submitting.value = false;
    ElMessage.success(`POD合成任务创建成功！将基于 ${selectedBaseProducts.value.length} 个白品和 ${totalSelectedPatterns.value} 个图案生成 ${selectedBaseProducts.value.length * totalSelectedPatterns.value} 个商品`);
    resetForm();
    emit('success');
    emit('update:modelValue', false);
  }, 2000);
};

const resetForm = () => {
  currentStep.value = 1;
  selectedBaseProducts.value = [];
  selectedPatterns.value = [];
  uploadedPatterns.value = [];
  baseProductSearch.value = '';
  baseProductCategory.value = '';
  patternSearch.value = '';
  patternCategory.value = '';
  patternSource.value = 'gallery';
  productNamePrefix.value = '个性化';
  priceAdjustment.value = 20;
};
</script>

<style scoped>
.create-pod-dialog :deep(.el-dialog__body) {
  padding: 20px;
}

.create-pod-dialog :deep(.el-upload-dragger) {
  width: 100%;
}
</style>
