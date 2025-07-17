<template>
  <el-dialog
    v-model="dialogVisible"
    title="编辑工作流"
    width="1200px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    class="workflow-dialog"
  >
    <div class="flex h-[600px]">
      <!-- 左侧：应用列表 -->
      <div class="w-64 border-r border-gray-200 dark:border-dark-border pr-4">
        <div class="mb-4">
          <div class="flex justify-between items-center mb-2">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-dark-text">可用应用</h3>
            <el-button
              @click="openAppMarket"
              type="primary"
              size="small"
              plain
            >
              应用市场
            </el-button>
          </div>
          <el-input
            v-model="appSearchKeyword"
            placeholder="搜索应用..."
            size="small"
            clearable
          >
            <template #prefix>
              <MagnifyingGlassIcon class="w-4 h-4 text-gray-400" />
            </template>
          </el-input>
        </div>

        <div class="space-y-2 max-h-[500px] overflow-y-auto">
          <div
            v-for="app in filteredAvailableApps"
            :key="app.id"
            class="flex items-center p-3 bg-gray-50 dark:bg-dark-card rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-dark-card/80 transition-colors duration-200"
            draggable="true"
            @dragstart="handleDragStart($event, app)"
          >
            <component :is="getAppIcon(app.type)" class="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3" />
            <div class="flex-1 min-w-0">
              <div class="text-sm font-medium text-gray-900 dark:text-dark-text truncate">{{ app.name }}</div>
              <div class="text-xs text-gray-500 dark:text-dark-text-secondary truncate">{{ app.description }}</div>
            </div>
            <PlusIcon class="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      <!-- 中间：工作流画板 -->
      <div class="flex-1 px-4">
        <div class="mb-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-dark-text mb-2">工作流设计</h3>
          <el-input
            v-model="form.name"
            placeholder="请输入工作流名称..."
            size="small"
            class="mb-2"
          />
        </div>

        <div
          class="bg-white dark:bg-dark-surface rounded-lg p-6 min-h-[450px] border border-gray-200 dark:border-dark-border relative"
          @drop="handleDrop"
          @dragover="handleDragOver"
        >
          <!-- 工作流节点容器 -->
          <div class="flex flex-col items-center space-y-6">
            <!-- 开始节点 -->
            <div class="flex flex-col items-center space-y-2">
              <div class="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                <PlayIcon class="w-8 h-8 text-white" />
              </div>
              <span class="text-sm font-medium text-gray-700 dark:text-dark-text">开始</span>
            </div>

            <!-- 应用节点区域 -->
            <div v-if="workflowApps.length > 0" class="flex flex-col items-center space-y-6 w-full">
              <!-- 连接线 -->
              <div class="w-px h-8 bg-gray-300 dark:bg-gray-600"></div>

              <!-- 应用节点网格 -->
              <div class="w-full max-w-2xl">
                <draggable
                  v-model="workflowApps"
                  @end="onDragEnd"
                  item-key="id"
                  :animation="200"
                  handle=".drag-handle"
                  ghost-class="sortable-ghost"
                  chosen-class="sortable-chosen"
                  drag-class="sortable-drag"
                  class="grid grid-cols-4 gap-4 justify-items-center"
                >
                  <template #item="{ element: app, index }">
                    <div
                      class="relative group cursor-pointer drag-handle"
                      @click="selectedAppIndex = index"
                      :class="{ 'ring-2 ring-blue-500 rounded-lg': selectedAppIndex === index }"
                    >
                      <div class="flex flex-col items-center space-y-2 p-3">
                        <div class="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center relative shadow-md">
                          <component :is="getAppIcon(app.type)" class="w-7 h-7 text-white" />
                          <!-- 删除按钮 -->
                          <button
                            @click.stop="removeApp(index)"
                            class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md"
                          >
                            <XMarkIcon class="w-3 h-3 text-white" />
                          </button>
                        </div>
                        <span class="text-xs text-gray-600 dark:text-dark-text-secondary font-medium text-center max-w-20 truncate">
                          {{ app.name }}
                        </span>
                      </div>
                    </div>
                  </template>
                </draggable>
              </div>

              <!-- 连接线 -->
              <div class="w-px h-8 bg-gray-300 dark:bg-gray-600"></div>
            </div>

            <!-- 结束节点 -->
            <div class="flex flex-col items-center space-y-2">
              <div class="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                <StopIcon class="w-8 h-8 text-white" />
              </div>
              <span class="text-sm font-medium text-gray-700 dark:text-dark-text">结束</span>
            </div>
          </div>

          <!-- 空状态提示 -->
          <div v-if="workflowApps.length === 0" class="absolute inset-0 flex items-center justify-center">
            <div class="text-center text-gray-500 dark:text-dark-text-secondary">
              <CubeIcon class="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p class="text-sm">拖拽左侧应用到此处开始构建工作流</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧：应用设置 -->
      <div class="w-80 border-l border-gray-200 dark:border-dark-border pl-4">
        <div class="mb-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-dark-text">应用设置</h3>
        </div>

        <div v-if="selectedAppIndex !== null && workflowApps[selectedAppIndex]" class="space-y-4">
          <div class="bg-gray-50 dark:bg-dark-card rounded-lg p-4">
            <div class="flex items-center space-x-3 mb-4">
              <component :is="getAppIcon(workflowApps[selectedAppIndex].type)" class="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <div>
                <div class="font-medium text-gray-900 dark:text-dark-text">{{ workflowApps[selectedAppIndex].name }}</div>
                <div class="text-sm text-gray-500 dark:text-dark-text-secondary">{{ workflowApps[selectedAppIndex].description }}</div>
              </div>
            </div>

            <!-- 执行模式 -->
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">执行模式</label>
              <el-radio-group v-model="workflowApps[selectedAppIndex].settings.mode" size="small">
                <el-radio label="auto">自动执行</el-radio>
                <el-radio label="manual">手动确认</el-radio>
              </el-radio-group>
            </div>

            <!-- 产品选择 -->
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">产品选择</label>
              <el-select
                v-model="workflowApps[selectedAppIndex].settings.productSelection"
                placeholder="选择产品来源"
                size="small"
                class="w-full"
              >
                <el-option label="使用上一步结果" value="previous" />
                <el-option label="手动选择" value="manual" />
                <el-option label="全部产品" value="all" />
              </el-select>
            </div>

            <!-- 超时时间 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">超时时间（分钟）</label>
              <el-input-number
                v-model="workflowApps[selectedAppIndex].settings.timeout"
                :min="1"
                :max="60"
                size="small"
                class="w-full"
              />
            </div>

            <!-- 失败处理 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">失败处理</label>
              <el-select
                v-model="workflowApps[selectedAppIndex].settings.onError"
                size="small"
                class="w-full"
              >
                <el-option label="停止工作流" value="stop" />
                <el-option label="跳过继续" value="skip" />
                <el-option label="重试" value="retry" />
              </el-select>
            </div>

            <!-- 应用特定设置 -->
            <!-- <AppSpecificSettings
              v-if="workflowApps[selectedAppIndex]"
              :app-type="workflowApps[selectedAppIndex].type"
              v-model="workflowApps[selectedAppIndex].settings"
            /> -->
          </div>
        </div>

        <div v-else class="text-center text-gray-500 dark:text-dark-text-secondary py-8">
          <Cog6ToothIcon class="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p class="text-sm">选择一个应用节点进行设置</p>
        </div>
        
      </div>
    </div>

    <template #footer>
      <div class="flex justify-end space-x-3">
        <el-button @click="handleClose" size="large">取消</el-button>
        <el-button
          @click="handleSubmit"
          type="primary"
          size="large"
          :loading="submitting"
          :disabled="!canSubmit"
        >
          {{ submitting ? '保存中...' : '保存修改' }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed, reactive, watch } from 'vue';
import { ElMessage } from 'element-plus';
import {
  MagnifyingGlassIcon,
  PlusIcon,
  PlayIcon,
  StopIcon,
  XMarkIcon,
  CubeIcon,
  Cog6ToothIcon
} from '@heroicons/vue/24/outline';
import {
  ShoppingBagIcon,
  ScissorsIcon,
  SparklesIcon,
  DocumentTextIcon,
  RectangleStackIcon
} from '@heroicons/vue/24/outline';
import draggable from 'vuedraggable';
import { updateWorkflow } from '~/stores/workflows';
// import AppSpecificSettings from './AppSpecificSettings.vue';

// Props
interface Props {
  modelValue: boolean;
  workflow: any;
}

// Emits
interface Emits {
  (e: 'update:modelValue', value: boolean): void;
  (e: 'success'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// 类型定义
interface AvailableApp {
  id: string;
  name: string;
  type: string;
  description: string;
}

interface WorkflowApp extends AvailableApp {
  settings: {
    mode: 'auto' | 'manual';
    productSelection: 'previous' | 'manual' | 'all';
    timeout: number;
    onError: 'stop' | 'skip' | 'retry';
  };
}

// 响应式数据
const dialogVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const submitting = ref(false);
const appSearchKeyword = ref('');
const selectedAppIndex = ref<number | null>(null);

const form = reactive({
  name: ''
});

const workflowApps = ref<WorkflowApp[]>([]);

// 可用应用列表
const availableApps: AvailableApp[] = [
  { id: 'product-collection', name: '商品采集', type: 'product-collection', description: '采集电商平台商品信息' },
  { id: 'smart-crop', name: '智能裁图', type: 'smart-crop', description: '智能裁剪商品图片' },
  { id: 'one-click-cutout', name: '一键抠图', type: 'one-click-cutout', description: '自动抠图去背景' },
  { id: 'super-split', name: '超级裂变', type: 'super-split', description: '图片批量裂变处理' },
  { id: 'title-generator', name: '标题生成', type: 'title-generator', description: '智能生成商品标题' },
  { id: 'batch-listing', name: '批量刊登', type: 'batch-listing', description: '批量刊登商品到平台' },
  { id: 'pod-compose', name: 'POD合成', type: 'pod-compose', description: 'POD商品合成处理' }
];

// 监听工作流数据变化
watch(() => props.workflow, (newWorkflow) => {
  if (newWorkflow && props.modelValue) {
    form.name = newWorkflow.name;
    workflowApps.value = newWorkflow.apps.map((app: any) => ({
      ...app,
      description: availableApps.find(a => a.type === app.type)?.description || '',
      settings: {
        mode: app.settings.mode || 'auto',
        dataSource: (app.settings as any).dataSource || 'previous',
        timeout: app.settings.timeout || 30,
        onError: app.settings.onError || 'stop'
      }
    }));
    selectedAppIndex.value = null;
  }
}, { immediate: true });

// 计算属性
const filteredAvailableApps = computed(() => {
  return availableApps.filter(app =>
    app.name.toLowerCase().includes(appSearchKeyword.value.toLowerCase()) ||
    app.description.toLowerCase().includes(appSearchKeyword.value.toLowerCase())
  );
});

const canSubmit = computed(() => {
  return form.name.trim() && workflowApps.value.length > 0;
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
const openAppMarket = () => {
  ElMessage.info('跳转到应用市场功能开发中...');
};

const handleDragStart = (event: DragEvent, app: AvailableApp) => {
  if (event.dataTransfer) {
    event.dataTransfer.setData('application/json', JSON.stringify(app));
    event.dataTransfer.effectAllowed = 'copy';
  }
};

const handleDragOver = (event: DragEvent) => {
  event.preventDefault();
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'copy';
  }
};

const handleDrop = (event: DragEvent) => {
  event.preventDefault();
  if (event.dataTransfer) {
    try {
      const appData = JSON.parse(event.dataTransfer.getData('application/json')) as AvailableApp;
      addAppToWorkflow(appData);
    } catch (error) {
      console.error('Failed to parse dropped data:', error);
    }
  }
};

const addAppToWorkflow = (app: AvailableApp) => {
  const workflowApp: WorkflowApp = {
    ...app,
    id: `${app.id}_${Date.now()}`, // 确保唯一ID
    settings: {
      mode: 'auto',
      productSelection: 'previous',
      timeout: 30,
      onError: 'stop'
    }
  };
  workflowApps.value.push(workflowApp);
  selectedAppIndex.value = workflowApps.value.length - 1;
};

const removeApp = (index: number) => {
  workflowApps.value.splice(index, 1);
  if (selectedAppIndex.value === index) {
    selectedAppIndex.value = null;
  } else if (selectedAppIndex.value !== null && selectedAppIndex.value > index) {
    selectedAppIndex.value--;
  }
};

const onDragEnd = () => {
  // 拖拽结束后重置选中状态
  selectedAppIndex.value = null;
};

const handleSubmit = async () => {
  if (!canSubmit.value || !props.workflow) return;

  submitting.value = true;
  try {
    await updateWorkflow({
      id: props.workflow.id,
      name: form.name,
      apps: workflowApps.value.map(app => ({
        id: app.id,
        name: app.name,
        type: app.type,
        settings: {
          mode: app.settings.mode,
          dataSource: (app.settings as any).dataSource || 'previous',
          timeout: app.settings.timeout,
          onError: app.settings.onError
        }
      }))
    });

    ElMessage.success('工作流修改成功！');
    emit('success');
    handleClose();
  } catch (error) {
    ElMessage.error('保存失败，请重试');
  } finally {
    submitting.value = false;
  }
};

const handleClose = () => {
  form.name = '';
  workflowApps.value = [];
  selectedAppIndex.value = null;
  appSearchKeyword.value = '';
  dialogVisible.value = false;
};
</script>

<style scoped>
.workflow-dialog :deep(.el-dialog__body) {
  padding: 20px;
}

.workflow-dialog :deep(.el-dialog__footer) {
  padding: 20px;
  border-top: 1px solid #e5e7eb;
}

/* 拖拽样式 */
.sortable-ghost {
  opacity: 0.5;
  background: #f3f4f6;
  border: 2px dashed #d1d5db;
  border-radius: 8px;
}

.sortable-chosen {
  transform: scale(1.02);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.sortable-drag {
  transform: rotate(5deg);
  opacity: 0.8;
}

/* 暗黑模式下的拖拽样式 */
.dark .sortable-ghost {
  background: #374151;
  border-color: #6b7280;
}
</style>
