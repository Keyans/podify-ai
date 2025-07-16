<template>
  <el-dialog
    v-model="dialogVisible"
    title="工作流模板"
    width="1000px"
    :close-on-click-modal="false"
    class="template-dialog"
  >
    <div class="mb-4">
      <el-input
        v-model="searchKeyword"
        placeholder="搜索模板..."
        size="large"
        clearable
      >
        <template #prefix>
          <MagnifyingGlassIcon class="w-5 h-5 text-gray-400" />
        </template>
      </el-input>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[500px] overflow-y-auto">
      <div
        v-for="template in filteredTemplates"
        :key="template.id"
        class="bg-gray-50 dark:bg-dark-card rounded-lg p-4 border border-gray-200 dark:border-dark-border hover:border-blue-300 dark:hover:border-blue-600 cursor-pointer transition-all duration-200"
        @click="selectTemplate(template)"
      >
        <!-- 模板头部 -->
        <div class="flex justify-between items-start mb-3">
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-dark-text">{{ template.name }}</h3>
            <p class="text-sm text-gray-600 dark:text-dark-text-secondary mt-1">
              {{ template.apps.length }} 个应用 · 使用 {{ template.usageCount }} 次
            </p>
          </div>
          <el-tag
            :type="template.status === 'enabled' ? 'success' : 'danger'"
            size="small"
          >
            {{ template.status === 'enabled' ? '可用' : '禁用' }}
          </el-tag>
        </div>

        <!-- 工作流程预览 -->
        <div class="mb-3">
          <div class="flex items-center space-x-2 overflow-x-auto pb-2">
            <!-- 开始节点 -->
            <div class="flex items-center space-x-1 flex-shrink-0">
              <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <PlayIcon class="w-3 h-3 text-white" />
              </div>
              <span class="text-xs text-gray-600 dark:text-dark-text-secondary">开始</span>
            </div>

            <!-- 应用节点 -->
            <template v-for="(app, index) in template.apps" :key="index">
              <ArrowRightIcon class="w-3 h-3 text-gray-400 flex-shrink-0" />
              <div class="flex items-center space-x-1 bg-blue-100 dark:bg-blue-900/30 rounded px-2 py-1 flex-shrink-0">
                <component :is="getAppIcon(app.type)" class="w-3 h-3 text-blue-600 dark:text-blue-400" />
                <span class="text-xs text-blue-700 dark:text-blue-300">{{ app.name }}</span>
              </div>
            </template>

            <ArrowRightIcon class="w-3 h-3 text-gray-400 flex-shrink-0" />

            <!-- 结束节点 -->
            <div class="flex items-center space-x-1 flex-shrink-0">
              <div class="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                <StopIcon class="w-3 h-3 text-white" />
              </div>
              <span class="text-xs text-gray-600 dark:text-dark-text-secondary">结束</span>
            </div>
          </div>
        </div>

        <!-- 模板信息 -->
        <div class="flex justify-between items-center text-sm text-gray-500 dark:text-dark-text-secondary">
          <span>创建者：{{ template.creator }}</span>
          <span>{{ template.createTime }}</span>
        </div>
      </div>
    </div>

    <!-- 空状态 -->
    <div v-if="filteredTemplates.length === 0" class="text-center py-12">
      <CubeIcon class="w-16 h-16 mx-auto text-gray-400 mb-4" />
      <p class="text-gray-500 dark:text-dark-text-secondary">没有找到匹配的模板</p>
    </div>

    <template #footer>
      <div class="flex justify-end space-x-3">
        <el-button @click="handleClose" size="large">
          取消
        </el-button>
        <el-button
          @click="createBlankWorkflow"
          type="primary"
          size="large"
          plain
        >
          创建空白工作流
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import {
  MagnifyingGlassIcon,
  ArrowRightIcon,
  PlayIcon,
  StopIcon,
  CubeIcon
} from '@heroicons/vue/24/outline';
import {
  ShoppingBagIcon,
  ScissorsIcon,
  SparklesIcon,
  DocumentTextIcon,
  RectangleStackIcon
} from '@heroicons/vue/24/outline';
import { getWorkflows, type Workflow } from '../../../store/workflows';

// Props
interface Props {
  modelValue: boolean;
}

// Emits
interface Emits {
  (e: 'update:modelValue', value: boolean): void;
  (e: 'select', template: Workflow): void;
  (e: 'create-blank'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// 响应式数据
const dialogVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const searchKeyword = ref('');

// 获取模板数据（使用现有的工作流作为模板）
const templates = computed(() => getWorkflows());

// 过滤模板
const filteredTemplates = computed(() => {
  if (!searchKeyword.value) {
    return templates.value;
  }
  
  return templates.value.filter(template =>
    template.name.toLowerCase().includes(searchKeyword.value.toLowerCase()) ||
    template.apps.some(app => 
      app.name.toLowerCase().includes(searchKeyword.value.toLowerCase())
    )
  );
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

// 方法
const selectTemplate = (template: Workflow) => {
  emit('select', template);
  handleClose();
};

const createBlankWorkflow = () => {
  emit('create-blank');
  handleClose();
};

const handleClose = () => {
  searchKeyword.value = '';
  dialogVisible.value = false;
};
</script>

<style scoped>
.template-dialog :deep(.el-dialog__body) {
  padding: 20px;
}

.template-dialog :deep(.el-dialog__footer) {
  padding: 20px;
  border-top: 1px solid #e5e7eb;
}
</style>
