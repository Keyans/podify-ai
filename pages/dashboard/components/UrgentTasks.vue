<template>
  <div class="bg-white dark:bg-dark-card rounded-xl p-6 shadow-sm border border-gray-100 dark:border-dark-border">
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center space-x-2">
        <ExclamationTriangleIcon class="w-5 h-5 text-red-500" />
        <h3 class="text-lg font-semibold text-gray-900 dark:text-dark-text">紧急任务</h3>
        <span
          v-if="urgentTasks.length > 0"
          class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400"
        >
          {{ urgentTasks.length }}
        </span>
      </div>
      <button
        @click="refreshUrgentTasks"
        class="text-sm text-gray-500 dark:text-dark-text-secondary hover:text-gray-700 dark:hover:text-dark-text"
      >
        <ArrowPathIcon class="w-4 h-4" />
      </button>
    </div>

    <div v-if="urgentTasks.length === 0" class="text-center py-8">
      <CheckCircleIcon class="w-12 h-12 text-green-500 mx-auto mb-3" />
      <p class="text-gray-500 dark:text-dark-text-secondary">暂无紧急任务</p>
    </div>

    <div v-else class="space-y-4">
      <div
        v-for="task in urgentTasks"
        :key="task.id"
        class="p-4 rounded-lg border-l-4 transition-all duration-200 hover:shadow-md"
        :class="getPriorityBorderColor(task.priority)"
      >
        <div class="flex items-start justify-between mb-2">
          <div class="flex items-center space-x-2">
            <div
              class="w-2 h-2 rounded-full"
              :class="getPriorityColor(task.priority)"
            ></div>
            <span class="text-sm font-medium text-gray-900 dark:text-dark-text">{{ task.title }}</span>
            <span
              class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium"
              :class="getPriorityBadgeColor(task.priority)"
            >
              {{ getPriorityText(task.priority) }}
            </span>
          </div>
          <div class="flex items-center space-x-1">
            <button
              @click="handleTask(task)"
              class="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
            >
              处理
            </button>
            <button
              @click="dismissTask(task)"
              class="text-xs text-gray-500 dark:text-dark-text-secondary hover:text-gray-700 dark:hover:text-dark-text"
            >
              忽略
            </button>
          </div>
        </div>
        
        <p class="text-sm text-gray-600 dark:text-dark-text-secondary mb-3">{{ task.description }}</p>
        
        <div class="flex items-center justify-between text-xs text-gray-500 dark:text-dark-text-secondary">
          <div class="flex items-center space-x-4">
            <span>{{ task.type }}</span>
            <span>{{ task.assignee }}</span>
          </div>
          <div class="flex items-center space-x-2">
            <ClockIcon class="w-3 h-3" />
            <span>{{ task.deadline }}</span>
          </div>
        </div>

        <!-- 任务进度 -->
        <div v-if="task.progress !== undefined" class="mt-3">
          <div class="flex justify-between text-xs text-gray-500 dark:text-dark-text-secondary mb-1">
            <span>进度</span>
            <span>{{ task.progress }}%</span>
          </div>
          <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
            <div
              class="h-1.5 rounded-full transition-all duration-300"
              :class="getProgressColor(task.progress)"
              :style="{ width: `${task.progress}%` }"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 快速操作 -->
    <div class="mt-6 pt-4 border-t border-gray-200 dark:border-dark-border">
      <div class="flex items-center justify-between">
        <span class="text-sm font-medium text-gray-700 dark:text-dark-text-secondary">快速操作</span>
        <div class="flex space-x-2">
          <button
            @click="createUrgentTask"
            class="inline-flex items-center px-3 py-1.5 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
          >
            <PlusIcon class="w-3 h-3 mr-1" />
            新建紧急任务
          </button>
          <button
            @click="viewAllTasks"
            class="inline-flex items-center px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-dark-text-secondary hover:text-gray-900 dark:hover:text-dark-text bg-gray-100 dark:bg-dark-border hover:bg-gray-200 dark:hover:bg-dark-card rounded-lg transition-colors"
          >
            查看全部
          </button>
        </div>
      </div>
    </div>

    <!-- 创建紧急任务对话框 -->
    <el-dialog
      v-model="showCreateDialog"
      title="创建紧急任务"
      width="500px"
    >
      <el-form
        ref="createFormRef"
        :model="createForm"
        :rules="createRules"
        label-width="80px"
      >
        <el-form-item label="任务标题" prop="title">
          <el-input v-model="createForm.title" placeholder="请输入任务标题" />
        </el-form-item>

        <el-form-item label="优先级" prop="priority">
          <el-select v-model="createForm.priority" placeholder="选择优先级" class="w-full">
            <el-option label="紧急" value="urgent" />
            <el-option label="高" value="high" />
            <el-option label="中" value="medium" />
          </el-select>
        </el-form-item>

        <el-form-item label="任务类型" prop="type">
          <el-select v-model="createForm.type" placeholder="选择任务类型" class="w-full">
            <el-option label="系统故障" value="system-error" />
            <el-option label="数据处理" value="data-processing" />
            <el-option label="客户支持" value="customer-support" />
            <el-option label="其他" value="other" />
          </el-select>
        </el-form-item>

        <el-form-item label="截止时间" prop="deadline">
          <el-date-picker
            v-model="createForm.deadline"
            type="datetime"
            placeholder="选择截止时间"
            class="w-full"
          />
        </el-form-item>

        <el-form-item label="任务描述" prop="description">
          <el-input
            v-model="createForm.description"
            type="textarea"
            :rows="3"
            placeholder="请输入任务描述"
          />
        </el-form-item>

        <el-form-item label="指派给" prop="assignee">
          <el-select v-model="createForm.assignee" placeholder="选择负责人" class="w-full">
            <el-option label="张三" value="张三" />
            <el-option label="李四" value="李四" />
            <el-option label="王五" value="王五" />
          </el-select>
        </el-form-item>
      </el-form>

      <template #footer>
        <div class="flex justify-end space-x-3">
          <el-button @click="showCreateDialog = false">取消</el-button>
          <el-button type="primary" @click="submitCreateForm" :loading="creating">
            创建任务
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { ElMessage, type FormInstance, type FormRules } from 'element-plus';
import {
  ExclamationTriangleIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  ClockIcon,
  PlusIcon
} from '@heroicons/vue/24/outline';

// 类型定义
interface UrgentTask {
  id: string;
  title: string;
  description: string;
  priority: 'urgent' | 'high' | 'medium';
  type: string;
  assignee: string;
  deadline: string;
  progress?: number;
  status: 'pending' | 'in-progress' | 'completed';
}

// 响应式数据
const showCreateDialog = ref(false);
const creating = ref(false);
const createFormRef = ref<FormInstance>();

// 紧急任务数据
const urgentTasks = ref<UrgentTask[]>([
  {
    id: 'urgent-1',
    title: '存储空间不足警告',
    description: '系统存储空间使用率已达到85%，需要立即清理或扩容',
    priority: 'urgent',
    type: '系统故障',
    assignee: '张三',
    deadline: '2小时内',
    progress: 30,
    status: 'in-progress'
  },
  {
    id: 'urgent-2',
    title: '批量任务处理失败',
    description: '商品采集任务 #12340 处理失败，影响50个商品数据',
    priority: 'high',
    type: '数据处理',
    assignee: '李四',
    deadline: '4小时内',
    status: 'pending'
  },
  {
    id: 'urgent-3',
    title: '客户反馈处理延迟',
    description: '有3个客户反馈处理超时，需要立即跟进',
    priority: 'medium',
    type: '客户支持',
    assignee: '王五',
    deadline: '今日内',
    progress: 60,
    status: 'in-progress'
  }
]);

// 创建表单数据
const createForm = reactive({
  title: '',
  priority: '',
  type: '',
  deadline: null as Date | null,
  description: '',
  assignee: ''
});

// 表单验证规则
const createRules: FormRules = {
  title: [
    { required: true, message: '请输入任务标题', trigger: 'blur' }
  ],
  priority: [
    { required: true, message: '请选择优先级', trigger: 'change' }
  ],
  type: [
    { required: true, message: '请选择任务类型', trigger: 'change' }
  ],
  deadline: [
    { required: true, message: '请选择截止时间', trigger: 'change' }
  ],
  description: [
    { required: true, message: '请输入任务描述', trigger: 'blur' }
  ],
  assignee: [
    { required: true, message: '请选择负责人', trigger: 'change' }
  ]
};

// 方法
const getPriorityColor = (priority: string) => {
  const colorMap = {
    urgent: 'bg-red-500',
    high: 'bg-orange-500',
    medium: 'bg-yellow-500'
  };
  return colorMap[priority as keyof typeof colorMap] || 'bg-gray-500';
};

const getPriorityBorderColor = (priority: string) => {
  const colorMap = {
    urgent: 'border-red-500 bg-red-50 dark:bg-red-900/10',
    high: 'border-orange-500 bg-orange-50 dark:bg-orange-900/10',
    medium: 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/10'
  };
  return colorMap[priority as keyof typeof colorMap] || 'border-gray-500';
};

const getPriorityBadgeColor = (priority: string) => {
  const colorMap = {
    urgent: 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400',
    high: 'bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-400',
    medium: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400'
  };
  return colorMap[priority as keyof typeof colorMap] || 'bg-gray-100 text-gray-800';
};

const getPriorityText = (priority: string) => {
  const textMap = {
    urgent: '紧急',
    high: '高',
    medium: '中'
  };
  return textMap[priority as keyof typeof textMap] || priority;
};

const getProgressColor = (progress: number) => {
  if (progress >= 80) return 'bg-green-500';
  if (progress >= 50) return 'bg-blue-500';
  if (progress >= 20) return 'bg-yellow-500';
  return 'bg-red-500';
};

const handleTask = (task: UrgentTask) => {
  ElMessage.info(`开始处理任务: ${task.title}`);
  // 这里可以跳转到具体的任务处理页面
};

const dismissTask = (task: UrgentTask) => {
  const index = urgentTasks.value.findIndex(t => t.id === task.id);
  if (index > -1) {
    urgentTasks.value.splice(index, 1);
    ElMessage.success('任务已忽略');
  }
};

const refreshUrgentTasks = () => {
  ElMessage.success('紧急任务已刷新');
};

const createUrgentTask = () => {
  showCreateDialog.value = true;
};

const viewAllTasks = () => {
  ElMessage.info('跳转到任务管理页面');
  // 这里可以跳转到任务管理页面
};

const submitCreateForm = async () => {
  if (!createFormRef.value) return;

  try {
    await createFormRef.value.validate();
    creating.value = true;

    // 模拟创建任务
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newTask: UrgentTask = {
      id: `urgent-${Date.now()}`,
      title: createForm.title,
      description: createForm.description,
      priority: createForm.priority as 'urgent' | 'high' | 'medium',
      type: createForm.type,
      assignee: createForm.assignee,
      deadline: createForm.deadline?.toLocaleString() || '',
      status: 'pending'
    };

    urgentTasks.value.unshift(newTask);
    
    // 重置表单
    createFormRef.value.resetFields();
    showCreateDialog.value = false;
    
    ElMessage.success('紧急任务创建成功');
  } catch (error) {
    ElMessage.error('创建失败，请检查输入信息');
  } finally {
    creating.value = false;
  }
};
</script>
