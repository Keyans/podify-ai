<template>
  <div class="billing-button-wrapper">
    <!-- 主按钮 -->
    <button
      @click="handleClick"
      :disabled="disabled || insufficientBalance"
      :class="[
        'billing-button',
        buttonClasses,
        {
          'billing-button--disabled': disabled || insufficientBalance,
          'billing-button--insufficient': insufficientBalance
        }
      ]"
    >
      <component v-if="icon" :is="icon" class="w-5 h-5 mr-2" />
      <span>{{ buttonText }}</span>
      
      <!-- 计费标识 -->
      <div class="billing-badge">
        <CreditCardIcon class="w-3 h-3 mr-1" />
        <span class="billing-text">{{ billingText }}</span>
      </div>
    </button>

    <!-- 计费信息提示 -->
    <div v-if="showBillingInfo" class="billing-info">
      <div class="billing-info-content">
        <div class="billing-details">
          <div class="billing-item">
            <span class="label">计费方式:</span>
            <span class="value">{{ billingModeText }}</span>
          </div>
          <div class="billing-item">
            <span class="label">单价:</span>
            <span class="value price">¥{{ unitPrice.toFixed(2) }}</span>
          </div>
          <div v-if="estimatedQuantity > 0" class="billing-item">
            <span class="label">预估数量:</span>
            <span class="value">{{ estimatedQuantity }}</span>
          </div>
          <div v-if="estimatedCost > 0" class="billing-item total">
            <span class="label">预估费用:</span>
            <span class="value price">¥{{ estimatedCost.toFixed(2) }}</span>
          </div>
        </div>
        
        <!-- 余额信息 -->
        <div class="balance-info">
          <div class="balance-item">
            <span class="label">当前余额:</span>
            <span class="value" :class="{ 'insufficient': insufficientBalance }">
              ¥{{ currentBalance.toFixed(2) }}
            </span>
          </div>
          <div v-if="insufficientBalance" class="insufficient-warning">
            <ExclamationTriangleIcon class="w-4 h-4 mr-1" />
            <span>余额不足，请先充值</span>
            <button @click="goToRecharge" class="recharge-link">
              立即充值
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { CreditCardIcon, ExclamationTriangleIcon } from '@heroicons/vue/24/outline';
import { BillingMode } from '../../types/billing';

// Props
interface Props {
  // 按钮基本属性
  buttonText: string;
  icon?: any;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  
  // 计费相关属性
  billingMode: BillingMode;
  unitPrice: number;
  estimatedQuantity?: number;
  showBillingInfo?: boolean;
  
  // 余额相关
  currentBalance?: number;
  checkBalance?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  size: 'medium',
  variant: 'primary',
  estimatedQuantity: 0,
  showBillingInfo: true,
  currentBalance: 0,
  checkBalance: true
});

// Emits
const emit = defineEmits<{
  click: [];
}>();

// 路由
const router = useRouter();

// 计算属性
const billingModeText = computed(() => {
  const modeMap = {
    [BillingMode.PER_USE]: '按次计费',
    [BillingMode.PER_ITEM]: '按项目计费',
    [BillingMode.MONTHLY]: '包月订阅',
    [BillingMode.ONE_TIME]: '一次性付费',
    [BillingMode.FREE]: '免费使用'
  };
  return modeMap[props.billingMode] || '未知';
});

const billingText = computed(() => {
  if (props.billingMode === BillingMode.FREE) {
    return '免费';
  }
  return `¥${props.unitPrice.toFixed(2)}/${props.billingMode === BillingMode.PER_USE ? '次' : '项'}`;
});

const estimatedCost = computed(() => {
  if (props.billingMode === BillingMode.FREE) {
    return 0;
  }
  return props.unitPrice * Math.max(1, props.estimatedQuantity);
});

const insufficientBalance = computed(() => {
  if (!props.checkBalance || props.billingMode === BillingMode.FREE) {
    return false;
  }
  return props.currentBalance < estimatedCost.value;
});

const buttonClasses = computed(() => {
  const baseClasses = 'billing-button-base';
  const sizeClasses = {
    small: 'billing-button-small',
    medium: 'billing-button-medium',
    large: 'billing-button-large'
  };
  const variantClasses = {
    primary: 'billing-button-primary',
    secondary: 'billing-button-secondary',
    success: 'billing-button-success',
    warning: 'billing-button-warning',
    danger: 'billing-button-danger'
  };
  
  return [
    baseClasses,
    sizeClasses[props.size],
    variantClasses[props.variant]
  ].join(' ');
});

// 方法
const handleClick = () => {
  if (props.disabled || insufficientBalance.value) {
    return;
  }
  emit('click');
};

const goToRecharge = () => {
  router.push('/account-settings/recharge');
};
</script>

<style scoped>
.billing-button-wrapper {
  @apply relative inline-block;
}

.billing-button {
  @apply relative inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2;
}

.billing-button-base {
  @apply shadow-lg hover:shadow-xl;
}

/* 尺寸样式 */
.billing-button-small {
  @apply px-3 py-1.5 text-sm;
}

.billing-button-medium {
  @apply px-4 py-2.5 text-sm;
}

.billing-button-large {
  @apply px-6 py-3 text-base;
}

/* 变体样式 */
.billing-button-primary {
  @apply bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white focus:ring-blue-500;
}

.billing-button-secondary {
  @apply bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white focus:ring-gray-500;
}

.billing-button-success {
  @apply bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white focus:ring-green-500;
}

.billing-button-warning {
  @apply bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white focus:ring-amber-500;
}

.billing-button-danger {
  @apply bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white focus:ring-red-500;
}

/* 禁用状态 */
.billing-button--disabled {
  @apply opacity-50 cursor-not-allowed transform-none shadow-none;
}

.billing-button--insufficient {
  @apply bg-gradient-to-r from-red-400 to-red-500 cursor-not-allowed transform-none;
}

/* 计费标识 */
.billing-badge {
  @apply absolute -top-2 -right-2 bg-white dark:bg-dark-card text-gray-700 dark:text-dark-text text-xs px-2 py-1 rounded-full shadow-md border border-gray-200 dark:border-dark-border flex items-center;
}

.billing-text {
  @apply font-medium;
}

/* 计费信息提示 */
.billing-info {
  @apply absolute top-full left-0 mt-2 w-80 bg-white dark:bg-dark-card rounded-lg shadow-xl border border-gray-200 dark:border-dark-border z-50 opacity-0 invisible transition-all duration-200;
}

.billing-button-wrapper:hover .billing-info {
  @apply opacity-100 visible;
}

.billing-info-content {
  @apply p-4 space-y-4;
}

.billing-details {
  @apply space-y-2;
}

.billing-item {
  @apply flex justify-between items-center;
}

.billing-item.total {
  @apply border-t border-gray-200 dark:border-dark-border pt-2 font-semibold;
}

.billing-item .label {
  @apply text-sm text-gray-600 dark:text-dark-text-secondary;
}

.billing-item .value {
  @apply text-sm font-medium text-gray-900 dark:text-dark-text;
}

.billing-item .value.price {
  @apply text-amber-600 dark:text-amber-400 font-bold;
}

.balance-info {
  @apply border-t border-gray-200 dark:border-dark-border pt-4 space-y-2;
}

.balance-item {
  @apply flex justify-between items-center;
}

.balance-item .value.insufficient {
  @apply text-red-600 dark:text-red-400 font-bold;
}

.insufficient-warning {
  @apply flex items-center text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-2 rounded-lg;
}

.recharge-link {
  @apply ml-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline font-medium;
}
</style>
