<template>
  <el-dialog
    v-model="dialogVisible"
    title="处理结果"
    width="1000px"
    :close-on-click-modal="false"
    class="results-dialog"
  >
    <div v-if="execution" class="space-y-6">
      <!-- 结果概览 -->
      <div class="bg-gray-50 dark:bg-dark-card rounded-lg p-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-dark-text mb-3">处理概览</h3>
        <div class="grid grid-cols-4 gap-4">
          <div class="text-center">
            <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ getTotalInput() }}</div>
            <div class="text-sm text-gray-600 dark:text-dark-text-secondary">总输入</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-green-600 dark:text-green-400">{{ getTotalOutput() }}</div>
            <div class="text-sm text-gray-600 dark:text-dark-text-secondary">总输出</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-orange-600 dark:text-orange-400">{{ getSuccessRate() }}%</div>
            <div class="text-sm text-gray-600 dark:text-dark-text-secondary">成功率</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">{{ execution.duration || '0分钟' }}</div>
            <div class="text-sm text-gray-600 dark:text-dark-text-secondary">总耗时</div>
          </div>
        </div>
      </div>

      <!-- 各步骤结果 -->
      <div class="bg-white dark:bg-dark-surface rounded-lg border border-gray-200 dark:border-dark-border">
        <div class="p-4 border-b border-gray-200 dark:border-dark-border">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-dark-text">各步骤处理结果</h3>
        </div>
        
        <div class="p-4">
          <el-tabs v-model="activeTab" type="border-card">
            <el-tab-pane
              v-for="step in execution.stepResults"
              :key="step.appId"
              :label="step.appName"
              :name="step.appId"
            >
              <div class="space-y-4">
                <!-- 步骤统计 -->
                <div class="grid grid-cols-3 gap-4">
                  <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 text-center">
                    <div class="text-lg font-semibold text-blue-600 dark:text-blue-400">{{ step.inputCount || 0 }}</div>
                    <div class="text-sm text-gray-600 dark:text-dark-text-secondary">输入数量</div>
                  </div>
                  <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 text-center">
                    <div class="text-lg font-semibold text-green-600 dark:text-green-400">{{ step.outputCount || 0 }}</div>
                    <div class="text-sm text-gray-600 dark:text-dark-text-secondary">输出数量</div>
                  </div>
                  <div class="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3 text-center">
                    <div class="text-lg font-semibold text-orange-600 dark:text-orange-400">{{ step.duration || '0分钟' }}</div>
                    <div class="text-sm text-gray-600 dark:text-dark-text-secondary">处理时长</div>
                  </div>
                </div>

                <!-- 模拟结果数据 -->
                <div class="bg-gray-50 dark:bg-dark-card rounded-lg p-4">
                  <h4 class="text-base font-medium text-gray-900 dark:text-dark-text mb-3">处理结果数据</h4>
                  
                  <!-- 根据不同应用类型显示不同的结果 -->
                  <div v-if="step.appName === '商品采集'">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div
                        v-for="item in getMockProductData(step.outputCount || 0)"
                        :key="item.id"
                        class="bg-white dark:bg-dark-surface rounded-lg p-3 border border-gray-200 dark:border-dark-border"
                      >
                        <img :src="item.image" :alt="item.title" class="w-full h-32 object-cover rounded mb-2" />
                        <h5 class="text-sm font-medium text-gray-900 dark:text-dark-text truncate">{{ item.title }}</h5>
                        <p class="text-sm text-green-600 dark:text-green-400 font-semibold">${{ item.price }}</p>
                      </div>
                    </div>
                  </div>

                  <div v-else-if="step.appName === '智能裁图' || step.appName === '一键抠图'">
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div
                        v-for="item in getMockImageData(step.outputCount || 0)"
                        :key="item.id"
                        class="bg-white dark:bg-dark-surface rounded-lg p-2 border border-gray-200 dark:border-dark-border"
                      >
                        <img :src="item.image" :alt="item.name" class="w-full h-24 object-cover rounded mb-1" />
                        <p class="text-xs text-gray-600 dark:text-dark-text-secondary text-center">{{ item.name }}</p>
                      </div>
                    </div>
                  </div>

                  <div v-else-if="step.appName === '标题生成'">
                    <div class="space-y-2">
                      <div
                        v-for="item in getMockTitleData(step.outputCount || 0)"
                        :key="item.id"
                        class="bg-white dark:bg-dark-surface rounded-lg p-3 border border-gray-200 dark:border-dark-border"
                      >
                        <p class="text-sm text-gray-900 dark:text-dark-text">{{ item.title }}</p>
                        <p class="text-xs text-gray-500 dark:text-dark-text-secondary mt-1">长度: {{ item.length }} 字符</p>
                      </div>
                    </div>
                  </div>

                  <div v-else-if="step.appName === '批量刊登'">
                    <div class="space-y-2">
                      <div
                        v-for="item in getMockListingData(step.outputCount || 0)"
                        :key="item.id"
                        class="bg-white dark:bg-dark-surface rounded-lg p-3 border border-gray-200 dark:border-dark-border flex justify-between items-center"
                      >
                        <div>
                          <p class="text-sm font-medium text-gray-900 dark:text-dark-text">{{ item.platform }}</p>
                          <p class="text-xs text-gray-500 dark:text-dark-text-secondary">{{ item.productId }}</p>
                        </div>
                        <el-tag :type="item.status === 'success' ? 'success' : 'danger'" size="small">
                          {{ item.status === 'success' ? '成功' : '失败' }}
                        </el-tag>
                      </div>
                    </div>
                  </div>

                  <div v-else>
                    <p class="text-gray-500 dark:text-dark-text-secondary text-center py-4">
                      暂无结果数据展示
                    </p>
                  </div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="flex justify-between">
        <el-button @click="downloadResults" type="primary" plain>
          下载结果
        </el-button>
        <el-button @click="handleClose" size="large">关闭</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { ElMessage } from 'element-plus';
import type { WorkflowExecution } from '../../../store/workflows';

// Props
interface Props {
  modelValue: boolean;
  execution: WorkflowExecution | null;
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

const activeTab = ref('');

// 当对话框打开时，设置默认选中的标签页
const execution = computed(() => {
  if (props.execution && props.execution.stepResults.length > 0) {
    activeTab.value = props.execution.stepResults[0].appId;
  }
  return props.execution;
});

// 计算总输入
const getTotalInput = () => {
  if (!execution.value) return 0;
  const firstStep = execution.value.stepResults[0];
  return firstStep?.inputCount || 0;
};

// 计算总输出
const getTotalOutput = () => {
  if (!execution.value) return 0;
  const lastStep = execution.value.stepResults[execution.value.stepResults.length - 1];
  return lastStep?.outputCount || 0;
};

// 计算成功率
const getSuccessRate = () => {
  const totalInput = getTotalInput();
  const totalOutput = getTotalOutput();
  if (totalInput === 0) return 0;
  return Math.round((totalOutput / totalInput) * 100);
};

// 生成模拟商品数据
const getMockProductData = (count: number) => {
  return Array.from({ length: Math.min(count, 6) }, (_, i) => ({
    id: `product_${i + 1}`,
    title: `商品标题 ${i + 1} - 高质量产品描述`,
    price: (Math.random() * 100 + 10).toFixed(2),
    image: `https://picsum.photos/200/200?random=${i + 1}`
  }));
};

// 生成模拟图片数据
const getMockImageData = (count: number) => {
  return Array.from({ length: Math.min(count, 8) }, (_, i) => ({
    id: `image_${i + 1}`,
    name: `处理后图片_${i + 1}.jpg`,
    image: `https://picsum.photos/150/150?random=${i + 10}`
  }));
};

// 生成模拟标题数据
const getMockTitleData = (count: number) => {
  const titles = [
    '高品质时尚T恤 - 舒适透气 多色可选 男女通用款式',
    '精美陶瓷马克杯 - 创意设计 办公室必备 礼品首选',
    '多功能手机壳 - 防摔保护 时尚外观 适配多机型',
    '舒适运动鞋 - 轻便透气 专业运动 日常休闲两用',
    '优质帆布包 - 大容量设计 环保材质 时尚百搭'
  ];
  
  return Array.from({ length: Math.min(count, 5) }, (_, i) => ({
    id: `title_${i + 1}`,
    title: titles[i % titles.length],
    length: titles[i % titles.length].length
  }));
};

// 生成模拟刊登数据
const getMockListingData = (count: number) => {
  const platforms = ['Amazon', 'eBay', 'Shopify', 'Etsy'];
  
  return Array.from({ length: Math.min(count, 8) }, (_, i) => ({
    id: `listing_${i + 1}`,
    platform: platforms[i % platforms.length],
    productId: `PRD${String(i + 1).padStart(6, '0')}`,
    status: Math.random() > 0.2 ? 'success' : 'failed'
  }));
};

// 方法
const downloadResults = () => {
  ElMessage.success('结果下载功能开发中...');
};

const handleClose = () => {
  dialogVisible.value = false;
};
</script>

<style scoped>
.results-dialog :deep(.el-dialog__body) {
  padding: 20px;
}

.results-dialog :deep(.el-dialog__footer) {
  padding: 20px;
  border-top: 1px solid #e5e7eb;
}
</style>
