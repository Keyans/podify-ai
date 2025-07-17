<template>
  <div class="bg-white dark:bg-dark-card rounded-xl p-6 shadow-sm border border-gray-100 dark:border-dark-border">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-dark-text">快捷操作</h3>
      <button
        @click="customizeActions"
        class="text-sm text-gray-500 dark:text-dark-text-secondary hover:text-gray-700 dark:hover:text-dark-text"
      >
        <Cog6ToothIcon class="w-4 h-4" />
      </button>
    </div>

    <!-- 主要操作 -->
    <div class="grid grid-cols-1 gap-3 mb-6">
      <button
        v-for="action in primaryActions"
        :key="action.id"
        @click="executeAction(action)"
        class="flex items-center justify-between p-4 bg-gradient-to-r rounded-lg text-white transition-all duration-200 hover:shadow-lg transform hover:scale-[1.02]"
        :class="action.gradient"
      >
        <div class="flex items-center space-x-3">
          <component :is="action.icon" class="w-6 h-6" />
          <div class="text-left">
            <div class="font-medium">{{ action.name }}</div>
            <div class="text-sm opacity-90">{{ action.description }}</div>
          </div>
        </div>
        <ChevronRightIcon class="w-5 h-5 opacity-70" />
      </button>
    </div>

    <!-- 常用工具 -->
    <div class="mb-6">
      <h4 class="text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-3">常用工具</h4>
      <div class="grid grid-cols-2 gap-2">
        <button
          v-for="tool in commonTools"
          :key="tool.id"
          @click="executeTool(tool)"
          class="flex flex-col items-center p-3 bg-gray-50 dark:bg-dark-border hover:bg-gray-100 dark:hover:bg-dark-card rounded-lg transition-colors"
        >
          <component :is="tool.icon" class="w-6 h-6 text-gray-600 dark:text-dark-text-secondary mb-2" />
          <span class="text-xs font-medium text-gray-700 dark:text-dark-text-secondary">{{ tool.name }}</span>
        </button>
      </div>
    </div>

    <!-- 批量操作 -->
    <div class="mb-6">
      <h4 class="text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-3">批量操作</h4>
      <div class="space-y-2">
        <button
          v-for="batch in batchOperations"
          :key="batch.id"
          @click="executeBatchOperation(batch)"
          class="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-border hover:bg-gray-100 dark:hover:bg-dark-card rounded-lg transition-colors"
        >
          <div class="flex items-center space-x-3">
            <component :is="batch.icon" class="w-5 h-5 text-gray-600 dark:text-dark-text-secondary" />
            <div class="text-left">
              <div class="text-sm font-medium text-gray-900 dark:text-dark-text">{{ batch.name }}</div>
              <div class="text-xs text-gray-500 dark:text-dark-text-secondary">{{ batch.description }}</div>
            </div>
          </div>
          <ChevronRightIcon class="w-4 h-4 text-gray-400" />
        </button>
      </div>
    </div>

    <!-- 系统工具 -->
    <div class="border-t border-gray-200 dark:border-dark-border pt-4">
      <h4 class="text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-3">系统工具</h4>
      <div class="grid grid-cols-3 gap-2">
        <button
          v-for="system in systemTools"
          :key="system.id"
          @click="executeSystemTool(system)"
          class="flex flex-col items-center p-2 hover:bg-gray-50 dark:hover:bg-dark-border rounded-lg transition-colors"
          :title="system.description"
        >
          <component :is="system.icon" class="w-5 h-5 text-gray-600 dark:text-dark-text-secondary mb-1" />
          <span class="text-xs text-gray-600 dark:text-dark-text-secondary">{{ system.name }}</span>
        </button>
      </div>
    </div>

    <!-- 自定义操作对话框 -->
    <el-dialog
      v-model="showCustomizeDialog"
      title="自定义快捷操作"
      width="600px"
    >
      <div class="space-y-4">
        <div>
          <h4 class="text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">选择要显示的操作</h4>
          <div class="grid grid-cols-2 gap-2">
            <label
              v-for="action in allAvailableActions"
              :key="action.id"
              class="flex items-center space-x-2 p-2 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-dark-border"
            >
              <input
                type="checkbox"
                :value="action.id"
                v-model="selectedActions"
                class="text-blue-600 focus:ring-blue-500"
              />
              <component :is="action.icon" class="w-4 h-4 text-gray-600 dark:text-dark-text-secondary" />
              <span class="text-sm text-gray-700 dark:text-dark-text-secondary">{{ action.name }}</span>
            </label>
          </div>
        </div>

        <div>
          <h4 class="text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">操作顺序</h4>
          <p class="text-xs text-gray-500 dark:text-dark-text-secondary mb-2">拖拽调整操作顺序</p>
          <draggable
            v-model="selectedActionsList"
            item-key="id"
            class="space-y-2"
          >
            <template #item="{ element }">
              <div class="flex items-center space-x-2 p-2 bg-gray-50 dark:bg-dark-border rounded-lg cursor-move">
                <Bars3Icon class="w-4 h-4 text-gray-400" />
                <component :is="element.icon" class="w-4 h-4 text-gray-600 dark:text-dark-text-secondary" />
                <span class="text-sm text-gray-700 dark:text-dark-text-secondary">{{ element.name }}</span>
              </div>
            </template>
          </draggable>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end space-x-3">
          <el-button @click="showCustomizeDialog = false">取消</el-button>
          <el-button type="primary" @click="saveCustomization">
            保存设置
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { ElMessage } from 'element-plus';
import draggable from 'vuedraggable';
import {
  ChevronRightIcon,
  Cog6ToothIcon,
  Bars3Icon,
  PlusIcon,
  PhotoIcon,
  CubeIcon,
  DocumentTextIcon,
  ShoppingBagIcon,
  ClipboardDocumentListIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  TrashIcon,
  FolderIcon,
  ChartBarIcon,
  Cog8ToothIcon,
  ShieldCheckIcon,
  BellIcon
} from '@heroicons/vue/24/outline';

// 类型定义
interface QuickAction {
  id: string;
  name: string;
  description: string;
  icon: any;
  action: string;
  gradient?: string;
}

// 响应式数据
const showCustomizeDialog = ref(false);
const selectedActions = ref<string[]>([]);

// 主要操作
const primaryActions = ref<QuickAction[]>([
  {
    id: 'new-collection',
    name: '新建采集任务',
    description: '快速创建商品采集任务',
    icon: PlusIcon,
    action: 'create-collection',
    gradient: 'from-blue-500 to-blue-600'
  },
  {
    id: 'batch-process',
    name: '批量处理图片',
    description: '智能裁图、抠图等批量操作',
    icon: PhotoIcon,
    action: 'batch-image-process',
    gradient: 'from-green-500 to-green-600'
  }
]);

// 常用工具
const commonTools = ref<QuickAction[]>([
  {
    id: 'gallery',
    name: '图库',
    description: '管理图片资源',
    icon: PhotoIcon,
    action: 'open-gallery'
  },
  {
    id: 'products',
    name: '商品',
    description: '商品管理',
    icon: CubeIcon,
    action: 'open-products'
  },
  {
    id: 'titles',
    name: '标题',
    description: '标题生成',
    icon: DocumentTextIcon,
    action: 'open-titles'
  },
  {
    id: 'listing',
    name: '刊登',
    description: '批量刊登',
    icon: ShoppingBagIcon,
    action: 'open-listing'
  }
]);

// 批量操作
const batchOperations = ref<QuickAction[]>([
  {
    id: 'batch-export',
    name: '批量导出数据',
    description: '导出选中的任务数据',
    icon: ArrowDownTrayIcon,
    action: 'batch-export'
  },
  {
    id: 'batch-import',
    name: '批量导入数据',
    description: '从文件导入数据',
    icon: ArrowUpTrayIcon,
    action: 'batch-import'
  },
  {
    id: 'batch-delete',
    name: '批量清理任务',
    description: '清理过期或失败的任务',
    icon: TrashIcon,
    action: 'batch-cleanup'
  }
]);

// 系统工具
const systemTools = ref<QuickAction[]>([
  {
    id: 'reports',
    name: '报表',
    description: '查看数据报表',
    icon: ChartBarIcon,
    action: 'view-reports'
  },
  {
    id: 'settings',
    name: '设置',
    description: '系统设置',
    icon: Cog8ToothIcon,
    action: 'open-settings'
  },
  {
    id: 'security',
    name: '安全',
    description: '安全中心',
    icon: ShieldCheckIcon,
    action: 'security-center'
  },
  {
    id: 'notifications',
    name: '通知',
    description: '消息通知',
    icon: BellIcon,
    action: 'view-notifications'
  },
  {
    id: 'backup',
    name: '备份',
    description: '数据备份',
    icon: FolderIcon,
    action: 'data-backup'
  },
  {
    id: 'logs',
    name: '日志',
    description: '系统日志',
    icon: ClipboardDocumentListIcon,
    action: 'view-logs'
  }
]);

// 所有可用操作
const allAvailableActions = ref<QuickAction[]>([
  ...primaryActions.value,
  ...commonTools.value,
  ...batchOperations.value,
  ...systemTools.value
]);

// 计算属性
const selectedActionsList = computed({
  get: () => {
    return allAvailableActions.value.filter(action => 
      selectedActions.value.includes(action.id)
    );
  },
  set: (value) => {
    selectedActions.value = value.map(action => action.id);
  }
});

// 方法
const executeAction = (action: QuickAction) => {
  switch (action.action) {
    case 'create-collection':
      ElMessage.info('跳转到商品采集页面');
      break;
    case 'batch-image-process':
      ElMessage.info('打开批量图片处理工具');
      break;
    default:
      ElMessage.info(`执行操作: ${action.name}`);
  }
};

const executeTool = (tool: QuickAction) => {
  switch (tool.action) {
    case 'open-gallery':
      ElMessage.info('跳转到图库管理页面');
      break;
    case 'open-products':
      ElMessage.info('跳转到商品管理页面');
      break;
    case 'open-titles':
      ElMessage.info('跳转到标题生成页面');
      break;
    case 'open-listing':
      ElMessage.info('跳转到批量刊登页面');
      break;
    default:
      ElMessage.info(`打开工具: ${tool.name}`);
  }
};

const executeBatchOperation = (batch: QuickAction) => {
  switch (batch.action) {
    case 'batch-export':
      ElMessage.info('开始批量导出数据');
      break;
    case 'batch-import':
      ElMessage.info('打开批量导入工具');
      break;
    case 'batch-cleanup':
      ElMessage.info('开始清理过期任务');
      break;
    default:
      ElMessage.info(`执行批量操作: ${batch.name}`);
  }
};

const executeSystemTool = (system: QuickAction) => {
  switch (system.action) {
    case 'view-reports':
      ElMessage.info('跳转到数据报表页面');
      break;
    case 'open-settings':
      ElMessage.info('跳转到系统设置页面');
      break;
    case 'security-center':
      ElMessage.info('跳转到安全中心');
      break;
    case 'view-notifications':
      ElMessage.info('打开消息通知');
      break;
    case 'data-backup':
      ElMessage.info('开始数据备份');
      break;
    case 'view-logs':
      ElMessage.info('查看系统日志');
      break;
    default:
      ElMessage.info(`执行系统工具: ${system.name}`);
  }
};

const customizeActions = () => {
  // 初始化选中的操作
  selectedActions.value = [
    ...primaryActions.value.map(a => a.id),
    ...commonTools.value.slice(0, 4).map(a => a.id)
  ];
  showCustomizeDialog.value = true;
};

const saveCustomization = () => {
  ElMessage.success('快捷操作设置已保存');
  showCustomizeDialog.value = false;
  // 这里可以保存用户的自定义设置到本地存储或服务器
};
</script>
