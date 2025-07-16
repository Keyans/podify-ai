<template>
  <div class="bg-white dark:bg-dark-card rounded-xl p-6 shadow-sm border border-gray-100 dark:border-dark-border">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-dark-text">常用事务</h3>
      <button
        @click="refreshTasks"
        class="text-sm text-gray-500 dark:text-dark-text-secondary hover:text-gray-700 dark:hover:text-dark-text"
      >
        <ArrowPathIcon class="w-4 h-4" />
      </button>
    </div>

    <!-- 待处理事项 -->
    <div class="mb-6">
      <div class="flex items-center justify-between mb-3">
        <h4 class="text-sm font-medium text-gray-700 dark:text-dark-text-secondary">待处理事项</h4>
        <span class="text-xs text-gray-500 dark:text-dark-text-secondary">{{ pendingTasks.length }} 项</span>
      </div>
      
      <div v-if="pendingTasks.length === 0" class="text-center py-4">
        <CheckCircleIcon class="w-8 h-8 text-green-500 mx-auto mb-2" />
        <p class="text-sm text-gray-500 dark:text-dark-text-secondary">暂无待处理事项</p>
      </div>

      <div v-else class="space-y-2 max-h-48 overflow-y-auto">
        <div
          v-for="task in pendingTasks"
          :key="task.id"
          class="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-border rounded-lg hover:bg-gray-100 dark:hover:bg-dark-card transition-colors cursor-pointer"
          @click="handlePendingTask(task)"
        >
          <div class="flex items-center space-x-3">
            <div
              class="w-2 h-2 rounded-full"
              :class="getTaskStatusColor(task.status)"
            ></div>
            <div>
              <div class="text-sm font-medium text-gray-900 dark:text-dark-text">{{ task.title }}</div>
              <div class="text-xs text-gray-500 dark:text-dark-text-secondary">{{ task.type }} · {{ task.createTime }}</div>
            </div>
          </div>
          <ChevronRightIcon class="w-4 h-4 text-gray-400" />
        </div>
      </div>
    </div>

    <!-- 最近任务 -->
    <div class="mb-6">
      <div class="flex items-center justify-between mb-3">
        <h4 class="text-sm font-medium text-gray-700 dark:text-dark-text-secondary">最近任务</h4>
        <button
          @click="viewAllRecentTasks"
          class="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
        >
          查看全部
        </button>
      </div>
      
      <div class="space-y-2">
        <div
          v-for="task in recentTasks"
          :key="task.id"
          class="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-dark-border rounded-lg transition-colors"
        >
          <div class="flex items-center space-x-3">
            <component :is="getTaskIcon(task.type)" class="w-4 h-4 text-gray-600 dark:text-dark-text-secondary" />
            <div>
              <div class="text-sm text-gray-900 dark:text-dark-text">{{ task.title }}</div>
              <div class="text-xs text-gray-500 dark:text-dark-text-secondary">{{ task.finishTime }}</div>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <span
              class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium"
              :class="getStatusBadgeColor(task.status)"
            >
              {{ getStatusText(task.status) }}
            </span>
            <button
              @click="viewTaskDetail(task)"
              class="text-xs text-gray-500 dark:text-dark-text-secondary hover:text-gray-700 dark:hover:text-dark-text"
            >
              详情
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 快速操作 -->
    <div class="border-t border-gray-200 dark:border-dark-border pt-4">
      <h4 class="text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-3">快速操作</h4>
      <div class="grid grid-cols-2 gap-2">
        <button
          v-for="action in quickActions"
          :key="action.id"
          @click="executeQuickAction(action)"
          class="flex items-center justify-center p-3 text-sm font-medium text-gray-700 dark:text-dark-text-secondary bg-gray-50 dark:bg-dark-border hover:bg-gray-100 dark:hover:bg-dark-card rounded-lg transition-colors"
        >
          <component :is="action.icon" class="w-4 h-4 mr-2" />
          {{ action.name }}
        </button>
      </div>
    </div>

    <!-- 统计信息 -->
    <div class="mt-6 pt-4 border-t border-gray-200 dark:border-dark-border">
      <h4 class="text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-3">今日统计</h4>
      <div class="grid grid-cols-3 gap-4 text-center">
        <div>
          <div class="text-lg font-bold text-gray-900 dark:text-dark-text">{{ todayStats.completed }}</div>
          <div class="text-xs text-gray-500 dark:text-dark-text-secondary">已完成</div>
        </div>
        <div>
          <div class="text-lg font-bold text-gray-900 dark:text-dark-text">{{ todayStats.processing }}</div>
          <div class="text-xs text-gray-500 dark:text-dark-text-secondary">处理中</div>
        </div>
        <div>
          <div class="text-lg font-bold text-gray-900 dark:text-dark-text">{{ todayStats.pending }}</div>
          <div class="text-xs text-gray-500 dark:text-dark-text-secondary">待处理</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import {
  ArrowPathIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  PlusIcon,
  DocumentTextIcon,
  PhotoIcon,
  CubeIcon,
  ShoppingBagIcon,
  ClipboardDocumentListIcon,
  Cog6ToothIcon
} from '@heroicons/vue/24/outline';

// 类型定义
interface PendingTask {
  id: string;
  title: string;
  type: string;
  status: 'pending' | 'urgent' | 'normal';
  createTime: string;
}

interface RecentTask {
  id: string;
  title: string;
  type: string;
  status: 'completed' | 'failed' | 'cancelled';
  finishTime: string;
}

interface QuickAction {
  id: string;
  name: string;
  icon: any;
  action: string;
}

interface TodayStats {
  completed: number;
  processing: number;
  pending: number;
}

// 响应式数据
const pendingTasks = ref<PendingTask[]>([
  {
    id: 'pending-1',
    title: '审核商品采集结果',
    type: '商品采集',
    status: 'urgent',
    createTime: '30分钟前'
  },
  {
    id: 'pending-2',
    title: '处理图片裁剪失败',
    type: '智能裁图',
    status: 'normal',
    createTime: '1小时前'
  },
  {
    id: 'pending-3',
    title: '确认批量刊登设置',
    type: '批量刊登',
    status: 'normal',
    createTime: '2小时前'
  }
]);

const recentTasks = ref<RecentTask[]>([
  {
    id: 'recent-1',
    title: 'Amazon商品采集 #12345',
    type: 'product-collection',
    status: 'completed',
    finishTime: '5分钟前'
  },
  {
    id: 'recent-2',
    title: '智能裁图批处理 #12344',
    type: 'smart-crop',
    status: 'completed',
    finishTime: '15分钟前'
  },
  {
    id: 'recent-3',
    title: '标题生成任务 #12343',
    type: 'title-generator',
    status: 'failed',
    finishTime: '25分钟前'
  },
  {
    id: 'recent-4',
    title: '一键抠图任务 #12342',
    type: 'one-click-cutout',
    status: 'completed',
    finishTime: '35分钟前'
  }
]);

const quickActions = ref<QuickAction[]>([
  {
    id: 'new-collection',
    name: '新建采集',
    icon: PlusIcon,
    action: 'create-collection'
  },
  {
    id: 'batch-process',
    name: '批量处理',
    icon: ClipboardDocumentListIcon,
    action: 'batch-process'
  },
  {
    id: 'view-gallery',
    name: '查看图库',
    icon: PhotoIcon,
    action: 'view-gallery'
  },
  {
    id: 'system-settings',
    name: '系统设置',
    icon: Cog6ToothIcon,
    action: 'system-settings'
  }
]);

const todayStats = ref<TodayStats>({
  completed: 156,
  processing: 23,
  pending: 8
});

// 方法
const getTaskStatusColor = (status: string) => {
  const colorMap = {
    urgent: 'bg-red-500',
    normal: 'bg-blue-500',
    pending: 'bg-gray-500'
  };
  return colorMap[status as keyof typeof colorMap] || 'bg-gray-500';
};

const getTaskIcon = (type: string) => {
  const iconMap = {
    'product-collection': CubeIcon,
    'smart-crop': PhotoIcon,
    'title-generator': DocumentTextIcon,
    'one-click-cutout': PhotoIcon,
    'batch-listing': ShoppingBagIcon
  };
  return iconMap[type as keyof typeof iconMap] || CubeIcon;
};

const getStatusBadgeColor = (status: string) => {
  const colorMap = {
    completed: 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400',
    failed: 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400',
    cancelled: 'bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-400'
  };
  return colorMap[status as keyof typeof colorMap] || 'bg-gray-100 text-gray-800';
};

const getStatusText = (status: string) => {
  const textMap = {
    completed: '已完成',
    failed: '失败',
    cancelled: '已取消'
  };
  return textMap[status as keyof typeof textMap] || status;
};

const handlePendingTask = (task: PendingTask) => {
  ElMessage.info(`处理待办事项: ${task.title}`);
  // 这里可以跳转到具体的处理页面
};

const viewTaskDetail = (task: RecentTask) => {
  ElMessage.info(`查看任务详情: ${task.title}`);
  // 这里可以打开任务详情对话框
};

const viewAllRecentTasks = () => {
  ElMessage.info('跳转到任务历史页面');
  // 这里可以跳转到任务历史页面
};

const executeQuickAction = (action: QuickAction) => {
  switch (action.action) {
    case 'create-collection':
      ElMessage.info('跳转到商品采集页面');
      break;
    case 'batch-process':
      ElMessage.info('打开批量处理工具');
      break;
    case 'view-gallery':
      ElMessage.info('跳转到图库管理页面');
      break;
    case 'system-settings':
      ElMessage.info('跳转到系统设置页面');
      break;
    default:
      ElMessage.info(`执行操作: ${action.name}`);
  }
};

const refreshTasks = () => {
  ElMessage.success('任务列表已刷新');
  // 这里可以重新加载任务数据
};
</script>
