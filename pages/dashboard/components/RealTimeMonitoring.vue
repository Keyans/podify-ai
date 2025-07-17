<template>
  <div class="bg-white dark:bg-dark-card rounded-xl p-6 shadow-sm border border-gray-100 dark:border-dark-border">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-dark-text">实时监控</h3>
      <div class="flex items-center space-x-2">
        <div class="flex items-center space-x-1">
          <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span class="text-sm text-gray-600 dark:text-dark-text-secondary">实时更新</span>
        </div>
      </div>
    </div>

    <!-- 系统状态 -->
    <div class="mb-8">
      <h4 class="text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-4">系统状态</h4>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          v-for="status in systemStatus"
          :key="status.id"
          class="p-4 rounded-lg border"
          :class="getStatusBorderColor(status.status)"
        >
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-medium text-gray-700 dark:text-dark-text-secondary">{{ status.name }}</span>
            <div
              class="w-3 h-3 rounded-full"
              :class="getStatusColor(status.status)"
            ></div>
          </div>
          <div class="text-lg font-bold text-gray-900 dark:text-dark-text">{{ status.value }}</div>
          <div class="text-xs text-gray-500 dark:text-dark-text-secondary mt-1">{{ status.description }}</div>
        </div>
      </div>
    </div>

    <!-- 正在处理的任务 -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-4">
        <h4 class="text-sm font-medium text-gray-700 dark:text-dark-text-secondary">正在处理的任务</h4>
        <span class="text-sm text-gray-500 dark:text-dark-text-secondary">{{ processingTasks.length }} 个任务</span>
      </div>
      <div class="space-y-3 max-h-64 overflow-y-auto">
        <div
          v-for="task in processingTasks"
          :key="task.id"
          class="p-3 bg-gray-50 dark:bg-dark-border rounded-lg"
        >
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center space-x-2">
              <component :is="getTaskIcon(task.type)" class="w-4 h-4 text-gray-600 dark:text-dark-text-secondary" />
              <span class="text-sm font-medium text-gray-900 dark:text-dark-text">{{ task.name }}</span>
            </div>
            <span class="text-xs text-gray-500 dark:text-dark-text-secondary">{{ task.progress }}%</span>
          </div>
          <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
            <div
              class="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
              :style="{ width: `${task.progress}%` }"
            ></div>
          </div>
          <div class="flex justify-between text-xs text-gray-500 dark:text-dark-text-secondary">
            <span>{{ task.operator }}</span>
            <span>预计剩余: {{ task.estimatedTime }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 资源使用情况 -->
    <div class="mb-8">
      <h4 class="text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-4">资源使用情况</h4>
      <div class="space-y-4">
        <div
          v-for="resource in resourceUsage"
          :key="resource.id"
          class="flex items-center justify-between"
        >
          <div class="flex items-center space-x-3">
            <component :is="resource.icon" class="w-5 h-5 text-gray-600 dark:text-dark-text-secondary" />
            <div>
              <div class="text-sm font-medium text-gray-900 dark:text-dark-text">{{ resource.name }}</div>
              <div class="text-xs text-gray-500 dark:text-dark-text-secondary">{{ resource.description }}</div>
            </div>
          </div>
          <div class="text-right">
            <div class="text-sm font-medium text-gray-900 dark:text-dark-text">{{ resource.usage }}%</div>
            <div class="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
              <div
                class="h-2 rounded-full transition-all duration-300"
                :class="getUsageColor(resource.usage)"
                :style="{ width: `${resource.usage}%` }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 最近活动 -->
    <div>
      <h4 class="text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-4">最近活动</h4>
      <div class="space-y-3 max-h-48 overflow-y-auto">
        <div
          v-for="activity in recentActivities"
          :key="activity.id"
          class="flex items-start space-x-3 p-2 hover:bg-gray-50 dark:hover:bg-dark-border rounded-lg transition-colors"
        >
          <div
            class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
            :class="getActivityColor(activity.type)"
          >
            <component :is="getActivityIcon(activity.type)" class="w-4 h-4 text-white" />
          </div>
          <div class="flex-1 min-w-0">
            <div class="text-sm text-gray-900 dark:text-dark-text">{{ activity.message }}</div>
            <div class="text-xs text-gray-500 dark:text-dark-text-secondary">{{ activity.time }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import {
  CpuChipIcon,
  CircleStackIcon,
  CloudIcon,
  PhotoIcon,
  CubeIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon
} from '@heroicons/vue/24/outline';

// 类型定义
interface SystemStatus {
  id: string;
  name: string;
  value: string;
  status: 'healthy' | 'warning' | 'error';
  description: string;
}

interface ProcessingTask {
  id: string;
  name: string;
  type: string;
  progress: number;
  operator: string;
  estimatedTime: string;
}

interface ResourceUsage {
  id: string;
  name: string;
  description: string;
  usage: number;
  icon: any;
}

interface RecentActivity {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  message: string;
  time: string;
}

// 响应式数据
const systemStatus = ref<SystemStatus[]>([
  {
    id: 'api',
    name: 'API服务',
    value: '正常',
    status: 'healthy',
    description: '响应时间: 120ms'
  },
  {
    id: 'database',
    name: '数据库',
    value: '正常',
    status: 'healthy',
    description: '连接数: 45/100'
  },
  {
    id: 'storage',
    name: '存储服务',
    value: '警告',
    status: 'warning',
    description: '使用率: 85%'
  }
]);

const processingTasks = ref<ProcessingTask[]>([
  {
    id: 'task1',
    name: '商品采集 - Amazon平台',
    type: 'product-collection',
    progress: 75,
    operator: '张三',
    estimatedTime: '5分钟'
  },
  {
    id: 'task2',
    name: '智能裁图批处理',
    type: 'smart-crop',
    progress: 45,
    operator: '李四',
    estimatedTime: '12分钟'
  },
  {
    id: 'task3',
    name: '标题生成任务',
    type: 'title-generator',
    progress: 90,
    operator: '王五',
    estimatedTime: '2分钟'
  }
]);

const resourceUsage = ref<ResourceUsage[]>([
  {
    id: 'cpu',
    name: 'CPU使用率',
    description: '处理器负载',
    usage: 65,
    icon: CpuChipIcon
  },
  {
    id: 'memory',
    name: '内存使用率',
    description: '8GB / 16GB',
    usage: 50,
    icon: CircleStackIcon
  },
  {
    id: 'storage',
    name: '存储使用率',
    description: '850GB / 1TB',
    usage: 85,
    icon: CloudIcon
  }
]);

const recentActivities = ref<RecentActivity[]>([
  {
    id: 'act1',
    type: 'success',
    message: '商品采集任务 #12345 已完成',
    time: '2分钟前'
  },
  {
    id: 'act2',
    type: 'info',
    message: '用户 张三 登录系统',
    time: '5分钟前'
  },
  {
    id: 'act3',
    type: 'warning',
    message: '存储空间使用率超过80%',
    time: '10分钟前'
  },
  {
    id: 'act4',
    type: 'success',
    message: '智能裁图任务 #12344 已完成',
    time: '15分钟前'
  },
  {
    id: 'act5',
    type: 'error',
    message: '批量刊登任务 #12343 执行失败',
    time: '20分钟前'
  }
]);

// 方法
const getStatusColor = (status: string) => {
  const colorMap = {
    healthy: 'bg-green-500',
    warning: 'bg-amber-500',
    error: 'bg-red-500'
  };
  return colorMap[status as keyof typeof colorMap] || 'bg-gray-500';
};

const getStatusBorderColor = (status: string) => {
  const colorMap = {
    healthy: 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10',
    warning: 'border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/10',
    error: 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/10'
  };
  return colorMap[status as keyof typeof colorMap] || 'border-gray-200 dark:border-gray-700';
};

const getTaskIcon = (type: string) => {
  const iconMap = {
    'product-collection': CubeIcon,
    'smart-crop': PhotoIcon,
    'title-generator': DocumentTextIcon
  };
  return iconMap[type as keyof typeof iconMap] || CubeIcon;
};

const getUsageColor = (usage: number) => {
  if (usage >= 80) return 'bg-gradient-to-r from-red-500 to-red-600';
  if (usage >= 60) return 'bg-gradient-to-r from-amber-500 to-amber-600';
  return 'bg-gradient-to-r from-green-500 to-green-600';
};

const getActivityColor = (type: string) => {
  const colorMap = {
    success: 'bg-green-500',
    warning: 'bg-amber-500',
    error: 'bg-red-500',
    info: 'bg-blue-500'
  };
  return colorMap[type as keyof typeof colorMap] || 'bg-gray-500';
};

const getActivityIcon = (type: string) => {
  const iconMap = {
    success: CheckCircleIcon,
    warning: ExclamationTriangleIcon,
    error: XCircleIcon,
    info: InformationCircleIcon
  };
  return iconMap[type as keyof typeof iconMap] || InformationCircleIcon;
};

// 模拟实时数据更新
const updateRealTimeData = () => {
  // 更新任务进度
  processingTasks.value.forEach(task => {
    if (task.progress < 100) {
      task.progress = Math.min(100, task.progress + Math.random() * 5);
    }
  });

  // 更新资源使用率
  resourceUsage.value.forEach(resource => {
    const change = (Math.random() - 0.5) * 10;
    resource.usage = Math.max(0, Math.min(100, resource.usage + change));
  });
};

// 定时器
let updateInterval: number;

// 生命周期
onMounted(() => {
  updateInterval = setInterval(updateRealTimeData, 3000); // 每3秒更新一次
});

onUnmounted(() => {
  if (updateInterval) {
    clearInterval(updateInterval);
  }
});
</script>
