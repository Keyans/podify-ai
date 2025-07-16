<template>
  <div class="p-6 bg-gray-50 dark:bg-dark-bg min-h-screen">
    <!-- 页面标题和时间 -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-dark-text">驾驶舱</h1>
        <p class="text-gray-600 dark:text-dark-text-secondary mt-1">
          {{ currentTime }} · 欢迎回来，{{ userInfo.nickname }}
        </p>
      </div>
      <div class="flex items-center space-x-4">
        <button
          @click="refreshData"
          :loading="refreshing"
          class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 dark:text-dark-text-secondary hover:text-gray-900 dark:hover:text-dark-text bg-white dark:bg-dark-card hover:bg-gray-50 dark:hover:bg-dark-border rounded-lg shadow-sm transition-all duration-200"
        >
          <ArrowPathIcon class="w-4 h-4 mr-2" :class="{ 'animate-spin': refreshing }" />
          刷新数据
        </button>
        <div class="text-sm text-gray-500 dark:text-dark-text-secondary">
          最后更新: {{ lastUpdateTime }}
        </div>
      </div>
    </div>

    <!-- 关键指标概览 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div
        v-for="metric in keyMetrics"
        :key="metric.id"
        class="bg-white dark:bg-dark-card rounded-xl p-6 shadow-sm border border-gray-100 dark:border-dark-border hover:shadow-md transition-all duration-200"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-dark-text-secondary">{{ metric.label }}</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-dark-text mt-1">{{ metric.value }}</p>
            <div class="flex items-center mt-2">
              <component
                :is="metric.trend === 'up' ? ChevronUpIcon : ChevronDownIcon"
                class="w-4 h-4 mr-1"
                :class="[
                  metric.trend === 'up' ? 'text-green-500' : 'text-red-500'
                ]"
              />
              <span
                class="text-sm font-medium"
                :class="[
                  metric.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                ]"
              >
                {{ metric.change }}
              </span>
              <span class="text-sm text-gray-500 dark:text-dark-text-secondary ml-1">vs 昨日</span>
            </div>
          </div>
          <div
            class="w-12 h-12 rounded-lg flex items-center justify-center"
            :class="metric.iconBg"
          >
            <component :is="metric.icon" class="w-6 h-6" :class="metric.iconColor" />
          </div>
        </div>
      </div>
    </div>

    <!-- 主要内容区域 -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- 左侧列 -->
      <div class="lg:col-span-2 space-y-8">
        <!-- 快捷操作 -->
        <QuickActions />
        <!-- 数据看板 -->
        <DataDashboard />

      </div>

      <!-- 右侧列 -->
      <div class="space-y-8">
        <!-- 紧急任务 -->
        <!-- <UrgentTasks /> -->

        <!-- 常用事务 -->
        <CommonTasks />

        <!-- 实时监控 -->
        <RealTimeMonitoring />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { ArrowPathIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/vue/24/outline';
import {
  ChartBarIcon,
  CubeIcon,
  ClockIcon,
  CreditCardIcon
} from '@heroicons/vue/24/outline';
import DataDashboard from './components/DataDashboard.vue';
import RealTimeMonitoring from './components/RealTimeMonitoring.vue';

import CommonTasks from './components/CommonTasks.vue';
import QuickActions from './components/QuickActions.vue';

// 类型定义
interface KeyMetric {
  id: string;
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: any;
  iconBg: string;
  iconColor: string;
}

interface UserInfo {
  nickname: string;
  avatar?: string;
}

// 响应式数据
const refreshing = ref(false);
const currentTime = ref('');
const lastUpdateTime = ref('');

// 用户信息
const userInfo = ref<UserInfo>({
  nickname: '张三',
  avatar: '/default-avatar.png'
});

// 关键指标数据
const keyMetrics = ref<KeyMetric[]>([
  {
    id: 'total-tasks',
    label: '今日任务',
    value: '156',
    change: '+12.5%',
    trend: 'up',
    icon: ChartBarIcon,
    iconBg: 'bg-blue-100 dark:bg-blue-900/20',
    iconColor: 'text-blue-600 dark:text-blue-400'
  },
  {
    id: 'processing',
    label: '处理中',
    value: '23',
    change: '+8.2%',
    trend: 'up',
    icon: CubeIcon,
    iconBg: 'bg-amber-100 dark:bg-amber-900/20',
    iconColor: 'text-amber-600 dark:text-amber-400'
  },
  {
    id: 'completed',
    label: '已完成',
    value: '128',
    change: '+15.3%',
    trend: 'up',
    icon: ClockIcon,
    iconBg: 'bg-green-100 dark:bg-green-900/20',
    iconColor: 'text-green-600 dark:text-green-400'
  },
  {
    id: 'revenue',
    label: '今日支出',
    value: '¥2,456',
    change: '-3.1%',
    trend: 'down',
    icon: CreditCardIcon,
    iconBg: 'bg-purple-100 dark:bg-purple-900/20',
    iconColor: 'text-purple-600 dark:text-purple-400'
  }
]);

// 计算属性
const formatTime = (date: Date) => {
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// 方法
const updateTime = () => {
  const now = new Date();
  currentTime.value = formatTime(now);
  lastUpdateTime.value = now.toLocaleTimeString('zh-CN');
};

const refreshData = async () => {
  refreshing.value = true;
  try {
    // 模拟数据刷新
    await new Promise(resolve => setTimeout(resolve, 1000));
    updateTime();

    // 更新关键指标（模拟数据变化）
    keyMetrics.value.forEach(metric => {
      const randomChange = parseFloat((Math.random() * 20 - 10).toFixed(1));
      metric.change = `${randomChange > 0 ? '+' : ''}${randomChange}%`;
      metric.trend = randomChange > 0 ? 'up' : 'down';
    });
  } finally {
    refreshing.value = false;
  }
};

// 定时器
let timeInterval: number;

// 生命周期
onMounted(() => {
  updateTime();
  timeInterval = setInterval(updateTime, 60000); // 每分钟更新时间
});

onUnmounted(() => {
  if (timeInterval) {
    clearInterval(timeInterval);
  }
});
</script>
