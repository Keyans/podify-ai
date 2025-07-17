<template>
  <div class="p-8">
    <!-- 页面标题 -->
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-dark-text">交易记录</h2>
      <p class="mt-2 text-sm text-gray-600 dark:text-dark-text-secondary">查看您的交易记录和使用统计</p>
    </div>

    <!-- 统计卡片 -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="bg-white dark:bg-dark-card rounded-lg p-6 shadow-sm">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
            <CreditCardIcon class="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div class="ml-4">
            <p class="text-sm text-gray-600 dark:text-dark-text-secondary">总消费</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-dark-text">¥{{ totalSpent.toFixed(2) }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-dark-card rounded-lg p-6 shadow-sm">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
            <ChartBarIcon class="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <div class="ml-4">
            <p class="text-sm text-gray-600 dark:text-dark-text-secondary">本月消费</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-dark-text">¥{{ monthlySpent.toFixed(2) }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-dark-card rounded-lg p-6 shadow-sm">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
            <CubeIcon class="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div class="ml-4">
            <p class="text-sm text-gray-600 dark:text-dark-text-secondary">使用次数</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-dark-text">{{ totalUsage }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-dark-card rounded-lg p-6 shadow-sm">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-amber-100 dark:bg-amber-900/20 rounded-lg flex items-center justify-center">
            <ClockIcon class="w-6 h-6 text-amber-600 dark:text-amber-400" />
          </div>
          <div class="ml-4">
            <p class="text-sm text-gray-600 dark:text-dark-text-secondary">本月使用</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-dark-text">{{ monthlyUsage }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 筛选和搜索 -->
    <div class="bg-white dark:bg-dark-card rounded-lg p-6 shadow-sm mb-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
            交易类型
          </label>
          <el-select v-model="filters.type" placeholder="全部类型" clearable class="w-full">
            <el-option label="全部类型" value="" />
            <el-option label="充值" value="recharge" />
            <el-option label="消费" value="consume" />
            <el-option label="退款" value="refund" />
          </el-select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
            应用类型
          </label>
          <el-select v-model="filters.appType" placeholder="全部应用" clearable class="w-full">
            <el-option label="全部应用" value="" />
            <el-option label="商品采集" value="product-collection" />
            <el-option label="智能裁图" value="smart-crop" />
            <el-option label="一键抠图" value="one-click-cutout" />
            <el-option label="超级裂变" value="super-split" />
            <el-option label="标题生成" value="title-generator" />
            <el-option label="批量刊登" value="batch-listing" />
          </el-select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
            时间范围
          </label>
          <el-date-picker
            v-model="filters.dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            class="w-full"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
            搜索
          </label>
          <el-input
            v-model="filters.keyword"
            placeholder="搜索交易ID或备注"
            clearable
            @keyup.enter="handleSearch"
          >
            <template #suffix>
              <MagnifyingGlassIcon class="w-4 h-4 text-gray-400" />
            </template>
          </el-input>
        </div>
      </div>

      <div class="flex justify-end mt-4 space-x-3">
        <button
          @click="resetFilters"
          class="px-4 py-2 text-sm font-medium text-gray-600 dark:text-dark-text-secondary hover:text-gray-900 dark:hover:text-dark-text bg-gray-50 dark:bg-dark-border hover:bg-gray-100 dark:hover:bg-dark-card rounded-lg transition-all duration-200"
        >
          重置
        </button>
        <button
          @click="handleSearch"
          class="px-4 py-2 text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 rounded-lg transition-colors"
        >
          搜索
        </button>
      </div>
    </div>

    <!-- 交易记录表格 -->
    <div class="bg-white dark:bg-dark-card rounded-lg shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <el-table
          :data="currentPageTransactions"
          style="width: 100%"
          v-loading="loading"
          class="modern-table"
          :header-cell-style="{
            backgroundColor: 'var(--el-bg-color-page)',
            color: 'var(--el-text-color-primary)',
            fontWeight: '600',
            borderBottom: '1px solid var(--el-border-color-light)'
          }"
          :row-style="{ backgroundColor: 'transparent' }"
        >
          <el-table-column label="交易ID" width="120">
            <template #default="scope">
              <span class="font-mono text-sm">{{ scope.row.id }}</span>
            </template>
          </el-table-column>

          <el-table-column label="类型" width="100">
            <template #default="scope">
              <span
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                :class="getTypeClass(scope.row.type)"
              >
                {{ getTypeText(scope.row.type) }}
              </span>
            </template>
          </el-table-column>

          <el-table-column label="应用" width="120">
            <template #default="scope">
              <span class="text-sm text-gray-900 dark:text-dark-text">
                {{ getAppName(scope.row.appType) }}
              </span>
            </template>
          </el-table-column>

          <el-table-column label="金额" width="100">
            <template #default="scope">
              <span
                class="font-semibold"
                :class="[
                  scope.row.type === 'consume' ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'
                ]"
              >
                {{ scope.row.type === 'consume' ? '-' : '+' }}¥{{ scope.row.amount.toFixed(2) }}
              </span>
            </template>
          </el-table-column>

          <el-table-column label="余额" width="100">
            <template #default="scope">
              <span class="text-sm text-gray-900 dark:text-dark-text">
                ¥{{ scope.row.balance.toFixed(2) }}
              </span>
            </template>
          </el-table-column>

          <el-table-column label="备注" min-width="200">
            <template #default="scope">
              <span class="text-sm text-gray-600 dark:text-dark-text-secondary">
                {{ scope.row.description }}
              </span>
            </template>
          </el-table-column>

          <el-table-column label="时间" width="160">
            <template #default="scope">
              <span class="text-sm text-gray-600 dark:text-dark-text-secondary">
                {{ scope.row.createTime }}
              </span>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="100">
            <template #default="scope">
              <button
                @click="viewTransactionDetail(scope.row)"
                class="text-sm text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300"
              >
                详情
              </button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 分页 -->
      <div class="px-6 py-4 border-t border-gray-200 dark:border-dark-border">
        <el-pagination
          v-model:current-page="pagination.currentPage"
          v-model:page-size="pagination.pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="pagination.total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>

    <!-- 交易详情对话框 -->
    <el-dialog
      v-model="showDetailDialog"
      title="交易详情"
      width="500px"
    >
      <div v-if="selectedTransaction" class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary">交易ID</label>
            <p class="mt-1 text-sm font-mono text-gray-900 dark:text-dark-text">{{ selectedTransaction.id }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary">交易类型</label>
            <p class="mt-1 text-sm text-gray-900 dark:text-dark-text">{{ getTypeText(selectedTransaction.type) }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary">应用类型</label>
            <p class="mt-1 text-sm text-gray-900 dark:text-dark-text">{{ getAppName(selectedTransaction.appType) }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary">交易金额</label>
            <p class="mt-1 text-sm font-semibold text-gray-900 dark:text-dark-text">
              {{ selectedTransaction.type === 'consume' ? '-' : '+' }}¥{{ selectedTransaction.amount.toFixed(2) }}
            </p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary">交易后余额</label>
            <p class="mt-1 text-sm text-gray-900 dark:text-dark-text">¥{{ selectedTransaction.balance.toFixed(2) }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary">交易时间</label>
            <p class="mt-1 text-sm text-gray-900 dark:text-dark-text">{{ selectedTransaction.createTime }}</p>
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary">备注说明</label>
          <p class="mt-1 text-sm text-gray-900 dark:text-dark-text">{{ selectedTransaction.description }}</p>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end">
          <el-button @click="showDetailDialog = false">关闭</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue';
import {
  CreditCardIcon,
  ChartBarIcon,
  CubeIcon,
  ClockIcon,
  MagnifyingGlassIcon
} from '@heroicons/vue/24/outline';

// 类型定义
interface Transaction {
  id: string;
  type: 'recharge' | 'consume' | 'refund';
  appType: string;
  amount: number;
  balance: number;
  description: string;
  createTime: string;
}

// 响应式数据
const loading = ref(false);
const showDetailDialog = ref(false);
const selectedTransaction = ref<Transaction | null>(null);

// 统计数据
const totalSpent = ref(2456.78);
const monthlySpent = ref(456.78);
const totalUsage = ref(1234);
const monthlyUsage = ref(156);

// 筛选条件
const filters = reactive({
  type: '',
  appType: '',
  dateRange: null as [Date, Date] | null,
  keyword: ''
});

// 分页数据
const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0
});

// 交易记录数据
const transactions = ref<Transaction[]>([]);

// 计算属性
const currentPageTransactions = computed(() => {
  const start = (pagination.currentPage - 1) * pagination.pageSize;
  const end = start + pagination.pageSize;
  return transactions.value.slice(start, end);
});

// 方法
const getTypeText = (type: string) => {
  const typeMap = {
    recharge: '充值',
    consume: '消费',
    refund: '退款'
  };
  return typeMap[type as keyof typeof typeMap] || type;
};

const getTypeClass = (type: string) => {
  const classMap = {
    recharge: 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400',
    consume: 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400',
    refund: 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400'
  };
  return classMap[type as keyof typeof classMap] || '';
};

const getAppName = (appType: string) => {
  const appMap = {
    'product-collection': '商品采集',
    'smart-crop': '智能裁图',
    'one-click-cutout': '一键抠图',
    'super-split': '超级裂变',
    'title-generator': '标题生成',
    'batch-listing': '批量刊登',
    'recharge': '账号充值'
  };
  return appMap[appType as keyof typeof appMap] || appType;
};

const handleSearch = () => {
  pagination.currentPage = 1;
  loadTransactions();
};

const resetFilters = () => {
  filters.type = '';
  filters.appType = '';
  filters.dateRange = null;
  filters.keyword = '';
  handleSearch();
};

const handleSizeChange = (size: number) => {
  pagination.pageSize = size;
  loadTransactions();
};

const handleCurrentChange = (page: number) => {
  pagination.currentPage = page;
  loadTransactions();
};

const viewTransactionDetail = (transaction: Transaction) => {
  selectedTransaction.value = transaction;
  showDetailDialog.value = true;
};

const loadTransactions = () => {
  loading.value = true;
  
  // 模拟加载数据
  setTimeout(() => {
    // 模拟交易记录数据
    const mockTransactions: Transaction[] = [
      {
        id: 'T20240115001',
        type: 'consume',
        appType: 'product-collection',
        amount: 5.00,
        balance: 1229.56,
        description: '商品采集 - Amazon平台采集50个商品',
        createTime: '2024-01-15 14:30:00'
      },
      {
        id: 'T20240115002',
        type: 'recharge',
        appType: 'recharge',
        amount: 500.00,
        balance: 1234.56,
        description: '账号充值 - 支付宝支付',
        createTime: '2024-01-15 14:25:00'
      },
      {
        id: 'T20240114001',
        type: 'consume',
        appType: 'smart-crop',
        amount: 3.00,
        balance: 734.56,
        description: '智能裁图 - 处理30张图片',
        createTime: '2024-01-14 16:45:00'
      },
      {
        id: 'T20240114002',
        type: 'consume',
        appType: 'one-click-cutout',
        amount: 2.50,
        balance: 737.56,
        description: '一键抠图 - 处理25张图片',
        createTime: '2024-01-14 15:20:00'
      },
      {
        id: 'T20240113001',
        type: 'consume',
        appType: 'title-generator',
        amount: 1.00,
        balance: 740.06,
        description: '标题生成 - 生成10个商品标题',
        createTime: '2024-01-13 11:30:00'
      }
    ];
    
    transactions.value = mockTransactions;
    pagination.total = mockTransactions.length;
    loading.value = false;
  }, 500);
};

// 生命周期
onMounted(() => {
  loadTransactions();
});
</script>
