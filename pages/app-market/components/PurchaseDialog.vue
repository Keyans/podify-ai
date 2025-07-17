<template>
  <el-dialog
    v-model="dialogVisible"
    :title="getDialogTitle()"
    width="600px"
    align-center
    :close-on-click-modal="false"
    class="purchase-dialog"
  >
    <div v-if="app" class="purchase-content">
      <!-- 应用信息 -->
      <div class="app-info flex items-center space-x-4 mb-6 p-4 bg-gray-50 dark:bg-dark-card rounded-lg">
        <div class="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30 rounded-xl flex items-center justify-center text-2xl font-bold border border-primary-200 dark:border-primary-700">
          {{ app.icon }}
        </div>
        <div class="flex-1">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-dark-text">
            {{ app.name }}
          </h3>
          <p class="text-sm text-gray-600 dark:text-dark-text-secondary">
            {{ app.developer }}
          </p>
        </div>
      </div>

      <!-- 价格信息 -->
      <div class="price-section mb-6">
        <h4 class="text-base font-medium text-gray-900 dark:text-dark-text mb-3">
          价格详情
        </h4>
        <div class="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-lg p-4">
          <PriceDisplay :price="app.price" size="large" />
          
          <!-- 免费应用提示 -->
          <div v-if="app.price.type === 'free'" class="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <div class="flex items-center space-x-2">
              <CheckCircleIcon class="w-5 h-5 text-green-600 dark:text-green-400" />
              <span class="text-sm text-green-800 dark:text-green-300">
                此应用完全免费，无需付费即可使用所有功能
              </span>
            </div>
          </div>

          <!-- 一口价说明 -->
          <div v-else-if="app.price.type === BillingMode.ONE_TIME" class="mt-4 space-y-2">
            <div class="flex items-center justify-between text-sm">
              <span class="text-gray-600 dark:text-dark-text-secondary">应用价格</span>
              <span class="font-medium text-gray-900 dark:text-dark-text">¥{{ app.price.amount }}</span>
            </div>
            <div v-if="app.price.originalAmount && app.price.originalAmount > app.price.amount" class="flex items-center justify-between text-sm">
              <span class="text-gray-600 dark:text-dark-text-secondary">原价</span>
              <span class="text-gray-400 line-through">¥{{ app.price.originalAmount }}</span>
            </div>
            <div class="flex items-center justify-between text-sm font-medium border-t border-gray-200 dark:border-dark-border pt-2">
              <span class="text-gray-900 dark:text-dark-text">总计</span>
              <span class="text-lg text-primary-600 dark:text-primary-400">¥{{ app.price.amount }}</span>
            </div>
          </div>

          <!-- 包月订阅说明 -->
          <div v-else-if="app.price.type === 'monthly'" class="mt-4 space-y-3">
            <div class="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div class="flex items-center space-x-2 mb-2">
                <InformationCircleIcon class="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span class="text-sm font-medium text-blue-800 dark:text-blue-300">订阅说明</span>
              </div>
              <ul class="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                <li>• 按月自动续费，可随时取消</li>
                <li>• 享受所有高级功能</li>
                <li>• 优先技术支持</li>
                <li>• 无使用次数限制</li>
              </ul>
            </div>
            <div class="flex items-center justify-between text-sm font-medium border-t border-gray-200 dark:border-dark-border pt-2">
              <span class="text-gray-900 dark:text-dark-text">月费</span>
              <span class="text-lg text-primary-600 dark:text-primary-400">¥{{ app.price.amount }}/月</span>
            </div>
          </div>

          <!-- 按次计费说明 -->
          <div v-else-if="app.price.type === 'per_use'" class="mt-4 space-y-3">
            <div class="p-3 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
              <div class="flex items-center space-x-2 mb-2">
                <CurrencyDollarIcon class="w-5 h-5 text-orange-600 dark:text-orange-400" />
                <span class="text-sm font-medium text-orange-800 dark:text-orange-300">按需付费</span>
              </div>
              <p class="text-sm text-orange-700 dark:text-orange-300">
                根据实际使用次数计费，用多少付多少，经济实惠
              </p>
            </div>
            <div class="space-y-2">
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-600 dark:text-dark-text-secondary">单次使用费用</span>
                <span class="font-medium text-gray-900 dark:text-dark-text">¥{{ app.price.amount }}</span>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-600 dark:text-dark-text-secondary">预充值金额</span>
                <el-input-number
                  v-model="rechargeAmount"
                  :min="10"
                  :max="1000"
                  :step="10"
                  size="small"
                  style="width: 120px"
                />
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-600 dark:text-dark-text-secondary">可使用次数</span>
                <span class="font-medium text-gray-900 dark:text-dark-text">
                  约 {{ Math.floor(rechargeAmount / app.price.amount) }} 次
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 支付方式 -->
      <div v-if="app.price.type !== 'free'" class="payment-section mb-6">
        <h4 class="text-base font-medium text-gray-900 dark:text-dark-text mb-3">
          支付方式
        </h4>
        <div class="grid grid-cols-3 gap-3">
          <label
            v-for="method in paymentMethods"
            :key="method.id"
            class="flex flex-col items-center p-4 border border-gray-200 dark:border-dark-border rounded-lg cursor-pointer hover:border-primary-300 dark:hover:border-primary-600 transition-colors text-center"
            :class="selectedPaymentMethod === method.id ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : ''"
          >
            <input
              v-model="selectedPaymentMethod"
              :value="method.id"
              type="radio"
              class="sr-only"
            />
            <div class="flex flex-col items-center space-y-2">
              <div class="text-3xl">{{ method.icon }}</div>
              <div>
                <div class="font-medium text-gray-900 dark:text-dark-text text-sm">{{ method.name }}</div>
                <div class="text-xs text-gray-500 dark:text-dark-text-secondary mt-1">{{ method.description }}</div>
              </div>
            </div>
            <div v-if="selectedPaymentMethod === method.id" class="text-primary-600 dark:text-primary-400 mt-2">
              <CheckCircleIcon class="w-4 h-4" />
            </div>
          </label>
        </div>
      </div>

      <!-- 用户协议 -->
      <div v-if="app.price.type !== 'free'" class="agreement-section mb-6">
        <label class="flex items-start space-x-3 cursor-pointer">
          <el-checkbox v-model="agreedToTerms" />
          <span class="text-sm text-gray-600 dark:text-dark-text-secondary">
            我已阅读并同意
            <a href="#" class="text-primary-600 dark:text-primary-400 hover:underline">《用户服务协议》</a>
            和
            <a href="#" class="text-primary-600 dark:text-primary-400 hover:underline">《隐私政策》</a>
          </span>
        </label>
      </div>
    </div>

    <!-- 底部操作按钮 -->
    <template #footer>
      <div class="flex justify-end space-x-3">
        <el-button @click="dialogVisible = false" size="large">
          取消
        </el-button>
        <el-button
          @click="handlePurchase"
          type="primary"
          size="large"
          :loading="purchasing"
          :disabled="!canPurchase"
        >
          {{ getPurchaseButtonText() }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { ElMessage } from 'element-plus';
import {
  CheckCircleIcon,
  InformationCircleIcon,
  CurrencyDollarIcon
} from '@heroicons/vue/24/outline';
import PriceDisplay from './PriceDisplay.vue';
import type { AppInfo } from '~/stores/app-market';
import { BillingMode } from '~/types/billing';

// Props
const props = defineProps<{
  modelValue: boolean;
  app: AppInfo | null;
}>();

// Emits
const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  'purchase-success': [appId: string];
}>();

// 响应式数据
const purchasing = ref(false);
const selectedPaymentMethod = ref('alipay');
const agreedToTerms = ref(false);
const rechargeAmount = ref(50);

// 计算属性
const dialogVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const canPurchase = computed(() => {
  if (!props.app) return false;
  if (props.app.price.type === 'free') return true;
  return agreedToTerms.value && selectedPaymentMethod.value;
});

// 支付方式选项
const paymentMethods = ref([
  {
    id: 'alipay',
    name: '支付宝',
    icon: '💙',
    description: '推荐使用，安全快捷'
  },
  {
    id: 'wechat',
    name: '微信支付',
    icon: '💚',
    description: '微信扫码支付'
  },
  {
    id: 'unionpay',
    name: '银联支付',
    icon: '💳',
    description: '银行卡支付'
  }
]);

// 方法
const getDialogTitle = () => {
  if (!props.app) return '购买应用';
  
  switch (props.app.price.type) {
    case 'free':
      return '安装免费应用';
    case BillingMode.ONE_TIME:
      return '购买应用';
    case 'monthly':
      return '订阅应用';
    case 'per_use':
      return '充值使用';
    default:
      return '购买应用';
  }
};

const getPurchaseButtonText = () => {
  if (!props.app) return '确认';
  
  switch (props.app.price.type) {
    case 'free':
      return '立即安装';
    case BillingMode.ONE_TIME:
      return `立即购买 ¥${props.app.price.amount}`;
    case 'monthly':
      return `立即订阅 ¥${props.app.price.amount}/月`;
    case 'per_use':
      return `充值 ¥${rechargeAmount.value}`;
    default:
      return '确认购买';
  }
};

const handlePurchase = async () => {
  if (!props.app || !canPurchase.value) return;

  purchasing.value = true;

  try {
    // 模拟购买/安装过程
    await new Promise(resolve => setTimeout(resolve, 2000));

    if (props.app.price.type === 'free') {
      ElMessage.success(`${props.app.name} 安装成功！`);
    } else {
      ElMessage.success(`${props.app.name} 购买成功！`);
    }

    emit('purchase-success', props.app.id);
    dialogVisible.value = false;
  } catch (error) {
    ElMessage.error('操作失败，请重试');
  } finally {
    purchasing.value = false;
  }
};
</script>

<style scoped>
/* 购买弹窗样式 */
:deep(.purchase-dialog) {
  .el-dialog__header {
    padding: 24px 24px 0;
    border-bottom: 1px solid var(--el-border-color-light);
  }
  
  .el-dialog__body {
    padding: 24px;
  }
  
  .el-dialog__footer {
    padding: 0 24px 24px;
    border-top: 1px solid var(--el-border-color-light);
    margin-top: 24px;
  }
}

/* 暗黑模式适配 */
.dark :deep(.purchase-dialog) {
  .el-dialog__header,
  .el-dialog__footer {
    border-color: var(--el-border-color-dark);
  }
}

/* 支付方式选择样式 */
.payment-section .grid label {
  transition: all 0.3s ease;
  min-height: 100px;
  position: relative;
}

.payment-section .grid label:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.dark .payment-section .grid label:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

/* 选中状态的特殊效果 */
.payment-section .grid label.border-primary-500 {
  box-shadow: 0 0 0 1px var(--el-color-primary), 0 2px 8px rgba(var(--el-color-primary-rgb), 0.2);
}

/* 响应式调整 */
@media (max-width: 640px) {
  .payment-section .grid {
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 0.75rem;
  }

  .payment-section .grid label {
    min-height: auto;
    flex-direction: row;
    text-align: left;
  }

  .payment-section .grid label .flex-col {
    flex-direction: row;
    align-items: center;
    space-y: 0;
    gap: 0.75rem;
  }
}

/* 价格高亮效果 */
.price-highlight {
  background: linear-gradient(135deg, var(--el-color-primary-light-9) 0%, var(--el-color-success-light-9) 100%);
  border: 1px solid var(--el-color-primary-light-7);
}

/* 动画效果 */
.purchase-content {
  animation: slideInUp 0.4s ease-out;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
