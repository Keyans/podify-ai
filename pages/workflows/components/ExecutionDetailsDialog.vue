<template>
  <el-dialog
    v-model="dialogVisible"
    title="执行详情"
    width="800px"
    :close-on-click-modal="false"
    class="execution-dialog"
  >
    <div v-if="execution" class="space-y-6">
      <!-- 基本信息 -->
      <div class="bg-gray-50 dark:bg-dark-card rounded-lg p-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-dark-text mb-3">基本信息</h3>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">执行ID</label>
            <p class="text-sm text-gray-900 dark:text-dark-text">{{ execution.id }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">工作流名称</label>
            <p class="text-sm text-gray-900 dark:text-dark-text">{{ execution.workflowName }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">执行状态</label>
            <el-tag :type="getStatusType(execution.status)" size="small">
              {{ getStatusText(execution.status) }}
            </el-tag>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">执行人</label>
            <p class="text-sm text-gray-900 dark:text-dark-text">{{ execution.executor }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">开始时间</label>
            <p class="text-sm text-gray-900 dark:text-dark-text">{{ execution.startTime }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">执行时长</label>
            <p class="text-sm text-gray-900 dark:text-dark-text">{{ execution.duration || '进行中' }}</p>
          </div>
        </div>
      </div>

      <!-- 执行步骤 -->
      <div class="bg-white dark:bg-dark-surface rounded-lg border border-gray-200 dark:border-dark-border">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-dark-text p-4 border-b border-gray-200 dark:border-dark-border">
          执行步骤
        </h3>
        <div class="p-4">
          <div class="space-y-4">
            <div
              v-for="(step, index) in execution.stepResults"
              :key="step.appId"
              class="flex items-start space-x-4"
            >
              <!-- 步骤序号和连接线 -->
              <div class="flex flex-col items-center">
                <div 
                  class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium"
                  :class="getStepNumberClass(step.status)"
                >
                  {{ index + 1 }}
                </div>
                <div 
                  v-if="index < execution.stepResults.length - 1"
                  class="w-px h-12 mt-2"
                  :class="getConnectorClass(step.status)"
                ></div>
              </div>

              <!-- 步骤内容 -->
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between mb-2">
                  <div class="flex items-center space-x-2">
                    <component :is="getAppIcon(getAppTypeByName(step.appName))" class="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <h4 class="text-base font-medium text-gray-900 dark:text-dark-text">{{ step.appName }}</h4>
                    <el-tag :type="getStepStatusType(step.status)" size="small">
                      {{ getStepStatusText(step.status) }}
                    </el-tag>
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-4 text-sm">
                  <div v-if="step.startTime">
                    <span class="text-gray-600 dark:text-dark-text-secondary">开始时间：</span>
                    <span class="text-gray-900 dark:text-dark-text">{{ step.startTime }}</span>
                  </div>
                  <div v-if="step.duration">
                    <span class="text-gray-600 dark:text-dark-text-secondary">执行时长：</span>
                    <span class="text-gray-900 dark:text-dark-text">{{ step.duration }}</span>
                  </div>
                  <div v-if="step.inputCount !== undefined">
                    <span class="text-gray-600 dark:text-dark-text-secondary">输入数量：</span>
                    <span class="text-gray-900 dark:text-dark-text">{{ step.inputCount }}</span>
                  </div>
                  <div v-if="step.outputCount !== undefined">
                    <span class="text-gray-600 dark:text-dark-text-secondary">输出数量：</span>
                    <span class="text-gray-900 dark:text-dark-text">{{ step.outputCount }}</span>
                  </div>
                </div>

                <!-- 错误信息 -->
                <div v-if="step.errorMessage" class="mt-2 p-2 bg-red-50 dark:bg-red-900/20 rounded border border-red-200 dark:border-red-800">
                  <p class="text-sm text-red-700 dark:text-red-300">
                    <strong>错误信息：</strong>{{ step.errorMessage }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="flex justify-end">
        <el-button @click="handleClose" size="large">关闭</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import {
  ShoppingBagIcon,
  ScissorsIcon,
  SparklesIcon,
  DocumentTextIcon,
  RectangleStackIcon,
  CubeIcon
} from '@heroicons/vue/24/outline';
import type { WorkflowExecution } from '~/stores/workflows';

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

// 获取应用图标
const getAppIcon = (appType: string) => {
  const iconMap: Record<string, any> = {
    'product-collection': ShoppingBagIcon,
    'smart-crop': ScissorsIcon,
    'one-click-cutout': SparklesIcon,
    'super-split': CubeIcon,
    'title-generator': DocumentTextIcon,
    'batch-listing': RectangleStackIcon,
    'pod-compose': CubeIcon
  };
  return iconMap[appType] || CubeIcon;
};

// 根据应用名称获取类型
const getAppTypeByName = (appName: string) => {
  const nameTypeMap: Record<string, string> = {
    '商品采集': 'product-collection',
    '智能裁图': 'smart-crop',
    '一键抠图': 'one-click-cutout',
    '超级裂变': 'super-split',
    '标题生成': 'title-generator',
    '批量刊登': 'batch-listing',
    'POD合成': 'pod-compose'
  };
  return nameTypeMap[appName] || 'unknown';
};

// 获取状态类型
const getStatusType = (status: string) => {
  switch (status) {
    case 'completed': return 'success';
    case 'failed': return 'danger';
    case 'running': return 'warning';
    case 'pending': return 'info';
    default: return 'info';
  }
};

// 获取状态文本
const getStatusText = (status: string) => {
  switch (status) {
    case 'completed': return '已完成';
    case 'failed': return '失败';
    case 'running': return '执行中';
    case 'pending': return '等待中';
    default: return '未知';
  }
};

// 获取步骤状态类型
const getStepStatusType = (status: string) => {
  return getStatusType(status);
};

// 获取步骤状态文本
const getStepStatusText = (status: string) => {
  return getStatusText(status);
};

// 获取步骤序号样式
const getStepNumberClass = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-500 text-white';
    case 'failed':
      return 'bg-red-500 text-white';
    case 'running':
      return 'bg-blue-500 text-white';
    case 'pending':
      return 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300';
    default:
      return 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300';
  }
};

// 获取连接线样式
const getConnectorClass = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-300 dark:bg-green-600';
    case 'failed':
      return 'bg-red-300 dark:bg-red-600';
    case 'running':
      return 'bg-blue-300 dark:bg-blue-600';
    default:
      return 'bg-gray-300 dark:bg-gray-600';
  }
};

// 方法
const handleClose = () => {
  dialogVisible.value = false;
};
</script>

<style scoped>
.execution-dialog :deep(.el-dialog__body) {
  padding: 20px;
}

.execution-dialog :deep(.el-dialog__footer) {
  padding: 20px;
  border-top: 1px solid #e5e7eb;
}
</style>
