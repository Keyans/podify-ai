<template>
  <div class="p-8">
    <!-- 页面标题 -->
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-dark-text">账号充值</h2>
      <p class="mt-2 text-sm text-gray-600 dark:text-dark-text-secondary">为您的账号充值，享受更多服务</p>
    </div>

    <div class="max-w-4xl">
      <!-- 账户余额 -->
      <div class="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 text-white mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-medium mb-2">当前余额</h3>
            <p class="text-3xl font-bold">¥{{ currentBalance.toFixed(2) }}</p>
          </div>
          <div class="text-right">
            <p class="text-amber-100 text-sm">账户ID</p>
            <p class="font-mono text-lg">{{ accountId }}</p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- 充值区域 -->
        <div class="bg-white dark:bg-dark-card rounded-lg p-6 shadow-sm">
          <h3 class="text-lg font-medium text-gray-900 dark:text-dark-text mb-6">选择充值金额</h3>
          
          <!-- 预设金额 -->
          <div class="grid grid-cols-3 gap-3 mb-6">
            <button
              v-for="amount in presetAmounts"
              :key="amount"
              @click="selectedAmount = amount"
              class="p-4 text-center border-2 rounded-lg transition-all duration-200"
              :class="[
                selectedAmount === amount
                  ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400'
                  : 'border-gray-200 dark:border-dark-border hover:border-amber-300 dark:hover:border-amber-600 text-gray-700 dark:text-dark-text-secondary hover:text-amber-600 dark:hover:text-amber-400'
              ]"
            >
              <div class="text-lg font-semibold">¥{{ amount }}</div>
            </button>
          </div>

          <!-- 自定义金额 -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
              自定义金额
            </label>
            <el-input
              v-model.number="customAmount"
              type="number"
              placeholder="请输入充值金额"
              :min="1"
              :max="10000"
              @input="handleCustomAmountChange"
            >
              <template #prefix>¥</template>
            </el-input>
          </div>

          <!-- 支付方式 -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-3">
              选择支付方式
            </label>
            <div class="space-y-3">
              <label
                v-for="method in paymentMethods"
                :key="method.id"
                class="flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200"
                :class="[
                  selectedPaymentMethod === method.id
                    ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20'
                    : 'border-gray-200 dark:border-dark-border hover:border-amber-300 dark:hover:border-amber-600'
                ]"
              >
                <input
                  type="radio"
                  :value="method.id"
                  v-model="selectedPaymentMethod"
                  class="sr-only"
                />
                <img :src="method.icon" :alt="method.name" class="w-8 h-8 mr-3" />
                <div class="flex-1">
                  <div class="font-medium text-gray-900 dark:text-dark-text">{{ method.name }}</div>
                  <div class="text-sm text-gray-500 dark:text-dark-text-secondary">{{ method.description }}</div>
                </div>
                <div
                  v-if="selectedPaymentMethod === method.id"
                  class="w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center"
                >
                  <CheckIcon class="w-3 h-3 text-white" />
                </div>
              </label>
            </div>
          </div>

          <!-- 充值按钮 -->
          <button
            @click="handleRecharge"
            :disabled="!canRecharge"
            :class="[
              'w-full py-3 px-4 rounded-lg font-medium transition-all duration-200',
              canRecharge
                ? 'bg-amber-500 hover:bg-amber-600 text-white'
                : 'bg-gray-300 dark:bg-dark-border text-gray-500 dark:text-dark-text-secondary cursor-not-allowed'
            ]"
          >
            立即充值 ¥{{ finalAmount.toFixed(2) }}
          </button>
        </div>

        <!-- 充值记录 -->
        <div class="bg-white dark:bg-dark-card rounded-lg p-6 shadow-sm">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-medium text-gray-900 dark:text-dark-text">充值记录</h3>
            <button
              @click="refreshRechargeHistory"
              class="text-sm text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300"
            >
              刷新
            </button>
          </div>

          <div class="space-y-4 max-h-96 overflow-y-auto">
            <div
              v-for="record in rechargeHistory"
              :key="record.id"
              class="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-border rounded-lg"
            >
              <div class="flex items-center">
                <div
                  class="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                  :class="[
                    record.status === 'success' ? 'bg-green-100 dark:bg-green-900/20' :
                    record.status === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900/20' :
                    'bg-red-100 dark:bg-red-900/20'
                  ]"
                >
                  <CreditCardIcon
                    class="w-5 h-5"
                    :class="[
                      record.status === 'success' ? 'text-green-600 dark:text-green-400' :
                      record.status === 'pending' ? 'text-yellow-600 dark:text-yellow-400' :
                      'text-red-600 dark:text-red-400'
                    ]"
                  />
                </div>
                <div>
                  <div class="font-medium text-gray-900 dark:text-dark-text">
                    ¥{{ record.amount.toFixed(2) }}
                  </div>
                  <div class="text-sm text-gray-500 dark:text-dark-text-secondary">
                    {{ record.method }} · {{ record.createTime }}
                  </div>
                </div>
              </div>
              <div class="text-right">
                <div
                  class="text-sm font-medium"
                  :class="[
                    record.status === 'success' ? 'text-green-600 dark:text-green-400' :
                    record.status === 'pending' ? 'text-yellow-600 dark:text-yellow-400' :
                    'text-red-600 dark:text-red-400'
                  ]"
                >
                  {{ getStatusText(record.status) }}
                </div>
              </div>
            </div>

            <div v-if="rechargeHistory.length === 0" class="text-center py-8">
              <CreditCardIcon class="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p class="text-gray-500 dark:text-dark-text-secondary">暂无充值记录</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 充值确认对话框 -->
    <el-dialog
      v-model="showConfirmDialog"
      title="确认充值"
      width="400px"
      :before-close="handleConfirmDialogClose"
    >
      <div class="text-center py-4">
        <div class="w-16 h-16 bg-amber-100 dark:bg-amber-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CreditCardIcon class="w-8 h-8 text-amber-600 dark:text-amber-400" />
        </div>
        <h3 class="text-lg font-medium text-gray-900 dark:text-dark-text mb-2">确认充值信息</h3>
        <p class="text-gray-600 dark:text-dark-text-secondary mb-4">
          充值金额：<span class="font-semibold text-amber-600 dark:text-amber-400">¥{{ finalAmount.toFixed(2) }}</span>
        </p>
        <p class="text-gray-600 dark:text-dark-text-secondary">
          支付方式：{{ getPaymentMethodName(selectedPaymentMethod) }}
        </p>
      </div>

      <template #footer>
        <div class="flex justify-center space-x-3">
          <el-button @click="showConfirmDialog = false">取消</el-button>
          <el-button type="primary" @click="confirmRecharge" :loading="processing">
            确认支付
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { CreditCardIcon, CheckIcon } from '@heroicons/vue/24/outline';

// 类型定义
interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  icon: string;
}

interface RechargeRecord {
  id: string;
  amount: number;
  method: string;
  status: 'success' | 'pending' | 'failed';
  createTime: string;
}

// 响应式数据
const currentBalance = ref(1234.56);
const accountId = ref('ACC20240001');
const selectedAmount = ref(0);
const customAmount = ref<number | null>(null);
const selectedPaymentMethod = ref('alipay');
const showConfirmDialog = ref(false);
const processing = ref(false);

// 预设充值金额
const presetAmounts = [50, 100, 200, 500, 1000, 2000];

// 支付方式
const paymentMethods: PaymentMethod[] = [
  {
    id: 'alipay',
    name: '支付宝',
    description: '推荐使用，到账快速',
    icon: '/payment-icons/alipay.png'
  },
  {
    id: 'wechat',
    name: '微信支付',
    description: '便捷支付，安全可靠',
    icon: '/payment-icons/wechat.png'
  },
  {
    id: 'bank',
    name: '银行卡',
    description: '支持各大银行卡',
    icon: '/payment-icons/bank.png'
  }
];

// 充值记录
const rechargeHistory = ref<RechargeRecord[]>([]);

// 计算属性
const finalAmount = computed(() => {
  return customAmount.value || selectedAmount.value;
});

const canRecharge = computed(() => {
  return finalAmount.value > 0 && selectedPaymentMethod.value;
});

// 方法
const handleCustomAmountChange = (value: number | null) => {
  if (value && value > 0) {
    selectedAmount.value = 0; // 清除预设选择
  }
};

const getPaymentMethodName = (methodId: string) => {
  const method = paymentMethods.find(m => m.id === methodId);
  return method?.name || '';
};

const getStatusText = (status: string) => {
  const statusMap = {
    success: '成功',
    pending: '处理中',
    failed: '失败'
  };
  return statusMap[status as keyof typeof statusMap] || status;
};

const handleRecharge = () => {
  if (!canRecharge.value) {
    ElMessage.warning('请选择充值金额和支付方式');
    return;
  }
  showConfirmDialog.value = true;
};

const confirmRecharge = async () => {
  processing.value = true;
  try {
    // 模拟支付处理
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // 更新余额
    currentBalance.value += finalAmount.value;
    
    // 添加充值记录
    const newRecord: RechargeRecord = {
      id: `R${Date.now()}`,
      amount: finalAmount.value,
      method: getPaymentMethodName(selectedPaymentMethod.value),
      status: 'success',
      createTime: new Date().toLocaleString()
    };
    rechargeHistory.value.unshift(newRecord);
    
    // 重置表单
    selectedAmount.value = 0;
    customAmount.value = null;
    showConfirmDialog.value = false;
    
    ElMessage.success('充值成功！');
  } catch (error) {
    ElMessage.error('充值失败，请重试');
  } finally {
    processing.value = false;
  }
};

const handleConfirmDialogClose = () => {
  if (!processing.value) {
    showConfirmDialog.value = false;
  }
};

const refreshRechargeHistory = () => {
  // 模拟刷新充值记录
  ElMessage.success('充值记录已刷新');
};

const loadRechargeHistory = () => {
  // 模拟加载充值记录
  rechargeHistory.value = [
    {
      id: 'R001',
      amount: 500,
      method: '支付宝',
      status: 'success',
      createTime: '2024-01-15 14:30:00'
    },
    {
      id: 'R002',
      amount: 200,
      method: '微信支付',
      status: 'success',
      createTime: '2024-01-10 09:15:00'
    },
    {
      id: 'R003',
      amount: 100,
      method: '银行卡',
      status: 'pending',
      createTime: '2024-01-08 16:45:00'
    }
  ];
};

// 生命周期
onMounted(() => {
  loadRechargeHistory();
});
</script>
