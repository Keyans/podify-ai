<template>
  <div class="bg-white dark:bg-dark-card rounded-xl p-6 shadow-sm border border-gray-100 dark:border-dark-border">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-dark-text">数据看板</h3>
      <div class="flex items-center space-x-2">
        <el-select v-model="selectedPeriod" size="small" class="w-24">
          <el-option label="今日" value="today" />
          <el-option label="本周" value="week" />
          <el-option label="本月" value="month" />
        </el-select>
      </div>
    </div>

    <!-- 应用使用统计 -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <!-- 应用使用排行 -->
      <div>
        <h4 class="text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-4">应用使用排行</h4>
        <div class="space-y-3">
          <div v-for="(app, index) in appUsageRanking" :key="app.id"
            class="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-border rounded-lg">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white"
                :class="getRankingColor(index)">
                {{ index + 1 }}
              </div>
              <div>
                <div class="font-medium text-gray-900 dark:text-dark-text">{{ app.name }}</div>
                <div class="text-sm text-gray-500 dark:text-dark-text-secondary">{{ app.usage }}次使用</div>
              </div>
            </div>
            <div class="text-right">
              <div class="text-sm font-medium text-gray-900 dark:text-dark-text">{{ app.percentage }}%</div>
              <div class="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                <div class="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                  :style="{ width: `${app.percentage}%` }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 任务状态分布 -->
      <div>
        <h4 class="text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-4">任务状态分布</h4>
        <div class="relative">
          <!-- 简化的饼图 -->
          <div class="w-32 h-32 mx-auto mb-4 relative">
            <svg viewBox="0 0 100 100" class="w-full h-full transform -rotate-90">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" stroke-width="8"
                class="dark:stroke-gray-700" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" stroke-width="8" stroke-dasharray="188.5"
                :stroke-dashoffset="188.5 - (188.5 * taskStatusData.completed / 100)"
                class="transition-all duration-500" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#f59e0b" stroke-width="8" stroke-dasharray="188.5"
                :stroke-dashoffset="188.5 - (188.5 * (taskStatusData.completed + taskStatusData.processing) / 100)"
                class="transition-all duration-500" />
            </svg>
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="text-center">
                <div class="text-2xl font-bold text-gray-900 dark:text-dark-text">{{ totalTasks }}</div>
                <div class="text-sm text-gray-500 dark:text-dark-text-secondary">总任务</div>
              </div>
            </div>
          </div>

          <!-- 状态图例 -->
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                <span class="text-sm text-gray-600 dark:text-dark-text-secondary">已完成</span>
              </div>
              <span class="text-sm font-medium text-gray-900 dark:text-dark-text">
                {{ taskStatusData.completed }}%
              </span>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <div class="w-3 h-3 bg-amber-500 rounded-full"></div>
                <span class="text-sm text-gray-600 dark:text-dark-text-secondary">处理中</span>
              </div>
              <span class="text-sm font-medium text-gray-900 dark:text-dark-text">
                {{ taskStatusData.processing }}%
              </span>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                <span class="text-sm text-gray-600 dark:text-dark-text-secondary">失败</span>
              </div>
              <span class="text-sm font-medium text-gray-900 dark:text-dark-text">
                {{ taskStatusData.failed }}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 趋势图表 -->
    <div>
      <h4 class="text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-4">使用趋势</h4>
      <div class="h-64 bg-gray-50 dark:bg-dark-border rounded-lg p-4">
        <!-- 简化的趋势图 -->
        <div class="h-full flex items-end justify-between space-x-2">
          <div v-for="(data, index) in trendData" :key="index"
            class="flex-1 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-sm transition-all duration-300 hover:from-blue-600 hover:to-blue-500"
            :style="{ height: `${(data.value / Math.max(...trendData.map(d => d.value))) * 100}%` }"
            :title="`${data.label}: ${data.value}`"></div>
        </div>
        <div class="flex justify-between mt-2 text-xs text-gray-500 dark:text-dark-text-secondary">
          <span v-for="data in trendData" :key="data.label">{{ data.label }}</span>
        </div>
      </div>
    </div>

    <!-- 性能指标 -->
    <div class="mt-8">
      <h4 class="text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-4">性能指标</h4>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div v-for="metric in performanceMetrics" :key="metric.id"
          class="p-4 bg-gray-50 dark:bg-dark-border rounded-lg">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-medium text-gray-700 dark:text-dark-text-secondary">{{ metric.label }}</span>
            <span class="text-lg font-bold text-gray-900 dark:text-dark-text">{{ metric.value }}</span>
          </div>
          <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div class="h-2 rounded-full transition-all duration-300" :class="getMetricColor(metric.status)"
              :style="{ width: `${metric.percentage}%` }"></div>
          </div>
          <div class="flex justify-between mt-1 text-xs text-gray-500 dark:text-dark-text-secondary">
            <span>{{ metric.status }}</span>
            <span>{{ metric.percentage }}%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

// 类型定义
interface AppUsage {
  id: string;
  name: string;
  usage: number;
  percentage: number;
}

interface TaskStatus {
  completed: number;
  processing: number;
  failed: number;
}

interface TrendData {
  label: string;
  value: number;
}

interface PerformanceMetric {
  id: string;
  label: string;
  value: string;
  percentage: number;
  status: 'excellent' | 'good' | 'warning' | 'poor';
}

// 响应式数据
const selectedPeriod = ref('today');

// 应用使用排行
const appUsageRanking = ref<AppUsage[]>([
  { id: 'product-collection', name: '商品采集', usage: 156, percentage: 35 },
  { id: 'smart-crop', name: '智能裁图', usage: 128, percentage: 28 },
  { id: 'one-click-cutout', name: '一键抠图', usage: 89, percentage: 20 },
  { id: 'title-generator', name: '标题生成', usage: 67, percentage: 15 },
  { id: 'batch-listing', name: '批量刊登', usage: 23, percentage: 5 }
]);

// 任务状态数据
const taskStatusData = ref<TaskStatus>({
  completed: 75,
  processing: 18,
  failed: 7
});

// 趋势数据
const trendData = ref<TrendData[]>([
  { label: '周一', value: 120 },
  { label: '周二', value: 156 },
  { label: '周三', value: 189 },
  { label: '周四', value: 167 },
  { label: '周五', value: 234 },
  { label: '周六', value: 198 },
  { label: '周日', value: 145 }
]);

// 性能指标
const performanceMetrics = ref<PerformanceMetric[]>([
  { id: 'success-rate', label: '成功率', value: '94.2%', percentage: 94, status: 'excellent' },
  { id: 'avg-time', label: '平均处理时间', value: '2.3s', percentage: 85, status: 'good' },
  { id: 'resource-usage', label: '资源使用率', value: '67%', percentage: 67, status: 'warning' }
]);

// 计算属性
const totalTasks = computed(() => {
  return appUsageRanking.value.reduce((sum, app) => sum + app.usage, 0);
});

// 方法
const getRankingColor = (index: number) => {
  const colors = [
    'bg-gradient-to-br from-yellow-400 to-yellow-500', // 金色
    'bg-gradient-to-br from-gray-400 to-gray-500',     // 银色
    'bg-gradient-to-br from-amber-600 to-amber-700',   // 铜色
    'bg-gradient-to-br from-blue-500 to-blue-600',     // 蓝色
    'bg-gradient-to-br from-purple-500 to-purple-600'  // 紫色
  ];
  return colors[index] || 'bg-gradient-to-br from-gray-500 to-gray-600';
};

const getMetricColor = (status: string) => {
  const colorMap = {
    excellent: 'bg-gradient-to-r from-green-500 to-green-600',
    good: 'bg-gradient-to-r from-blue-500 to-blue-600',
    warning: 'bg-gradient-to-r from-amber-500 to-amber-600',
    poor: 'bg-gradient-to-r from-red-500 to-red-600'
  };
  return colorMap[status as keyof typeof colorMap] || 'bg-gray-500';
};

// 生命周期
onMounted(() => {
  // 初始化数据
});
</script>
