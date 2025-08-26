<template>
  <div class="workflow-steps">
    <!-- 工作流程步骤展示 -->
    <div class="steps-container">
      <template v-for="(task, index) in sortedTasks" :key="`${task.taskType}-${index}`">
        <!-- 步骤项 -->
        <div class="step-item" :class="getStepClass(task.taskStatus)">
          <!-- 步骤图标（使用序号替代） -->
          <div class="step-icon" :class="getIconClass(task.taskStatus)">
            <span class="step-order-number">{{ task.sort }}</span>
          </div>
          
          <!-- 步骤内容 -->
          <div class="step-content">
            <div class="step-title">{{ getTaskTypeInfo(task.taskType).label }}</div>
          </div>
        </div>
        
        <!-- 连接线（除了最后一个步骤） -->
        <div v-if="index < sortedTasks.length - 1" class="step-connector">
          <div class="connector-line" :class="getConnectorClass(task.taskStatus, sortedTasks[index + 1]?.taskStatus)"></div>
        </div>
      </template>
    </div>
    
    <!-- 工作流统计信息 -->
    <div class="workflow-summary">
      <div class="summary-item">
        <span class="summary-label">总步骤:</span>
        <span class="summary-value">{{ taskList.length }}</span>
      </div>
      <div class="summary-item">
        <span class="summary-label">已完成:</span>
        <span class="summary-value success">{{ completedCount }}</span>
      </div>
      <div class="summary-item">
        <span class="summary-label">进行中:</span>
        <span class="summary-value processing">{{ inProgressCount }}</span>
      </div>
      <div class="summary-item">
        <span class="summary-label">待执行:</span>
        <span class="summary-value pending">{{ pendingCount }}</span>
      </div>
      <div class="summary-item">
        <span class="summary-label">已失败:</span>
        <span class="summary-value failed">{{ failedCount }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getTaskTypeInfo, getStatusText } from '~/utils/statusUtils'

interface TaskItem {
  taskType: number
  taskStatus: number
  sort: number
}

interface Props {
  taskList: TaskItem[]
}

const props = withDefaults(defineProps<Props>(), {
  taskList: () => []
})

// 按照sort字段排序的任务列表
const sortedTasks = computed(() => {
  return [...props.taskList].sort((a, b) => a.sort - b.sort)
})

// 统计不同状态的任务数量
const completedCount = computed(() => 
  props.taskList.filter(task => task.taskStatus === 2).length
)

const inProgressCount = computed(() => 
  props.taskList.filter(task => task.taskStatus === 1).length
)

const pendingCount = computed(() => 
  props.taskList.filter(task => task.taskStatus === 0).length
)

// 已失败任务数量（状态为4）
const failedCount = computed(() => 
  props.taskList.filter(task => task.taskStatus === 4).length
)

// 获取步骤样式类
const getStepClass = (status: number) => {
  const statusClassMap = {
    0: 'step-pending',    // 待执行
    1: 'step-processing', // 进行中
    2: 'step-completed',  // 已完成
    3: 'step-warning',    // 部分失败
    4: 'step-error'       // 失败
  }
  return statusClassMap[status as keyof typeof statusClassMap] || 'step-unknown'
}

// 获取图标样式类
const getIconClass = (status: number) => {
  const iconClassMap = {
    0: 'icon-pending',
    1: 'icon-processing',
    2: 'icon-completed',
    3: 'icon-warning',
    4: 'icon-error'
  }
  return iconClassMap[status as keyof typeof iconClassMap] || 'icon-unknown'
}

// 获取连接线样式类
const getConnectorClass = (currentStatus: number, nextStatus: number) => {
  if (currentStatus === 2) { // 当前步骤已完成
    return 'connector-completed'
  } else if (currentStatus === 1) { // 当前步骤进行中
    return 'connector-processing'
  } else if (currentStatus === 4 || currentStatus === 3) { // 当前步骤失败
    return 'connector-error'
  }
  return 'connector-pending'
}
</script>

<style scoped>
.workflow-steps {
  padding: 8px;
  background: var(--bg-secondary);
  border-radius: 6px;
  border: 1px solid var(--border-color);
}

.steps-container {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  gap: 4px;
  margin-bottom: 8px;
  overflow-x: auto;
}

.step-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 80px;
  max-width: 80px;
  padding: 8px 4px;
  transition: all 0.3s ease;
  position: relative;
  flex-shrink: 0;
}

.step-pending {
  /* 移除外部圆圈样式 */
}

.step-processing {
  /* 移除外部圆圈样式 */
}

.step-completed {
  /* 移除外部圆圈样式 */
}

.step-warning {
  /* 移除外部圆圈样式 */
}

.step-error {
  /* 移除外部圆圈样式 */
}

.step-icon {
  font-size: 16px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-weight: bold;
  border: 1px solid;
}

.step-order-number {
  font-size: 16px;
  line-height: 1;
  font-weight: bold;
}

.icon-pending { 
  color: var(--text-tertiary); 
  background-color: var(--bg-tertiary);
  border-color: var(--border-color);
}
.icon-processing { 
  color: white; 
  background-color: var(--accent-color);
  border-color: var(--accent-color);
}
.icon-completed { 
  color: white; 
  background-color: #52c41a;
  border-color: #52c41a;
}
.icon-warning { 
  color: white; 
  background-color: #faad14;
  border-color: #faad14;
}
.icon-error { 
  color: white; 
  background-color: #ff4d4f;
  border-color: #ff4d4f;
}

.step-content {
  text-align: center;
  margin-bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.step-title {
  font-size: 11px;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 0;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 72px;
  text-align: center;
}

.step-connector {
  flex: 0 0 auto;
  width: 16px;
  height: 2px;
  margin: 0 2px;
}

.connector-line {
  width: 100%;
  height: 100%;
  border-radius: 1px;
}

.connector-pending {
  background: var(--border-color);
}

.connector-processing {
  background: var(--accent-color);
}

.connector-completed {
  background: #52c41a;
}

.connector-error {
  background: #ff4d4f;
}

.workflow-summary {
  display: flex;
  gap: 8px;
  padding: 6px 8px;
  background: var(--bg-tertiary);
  border-radius: 4px;
  border: 1px solid var(--border-color);
  flex-wrap: wrap;
  font-size: 11px;
}

.summary-item {
  display: flex;
  align-items: center;
  gap: 3px;
}

.summary-label {
  font-size: 10px;
  color: var(--text-secondary);
}

.summary-value {
  font-size: 10px;
  font-weight: 500;
  color: var(--text-primary);
}

.summary-value.success { color: #52c41a; }
.summary-value.processing { color: var(--accent-color); }
.summary-value.pending { color: var(--text-tertiary); }
.summary-value.failed { color: #ff4d4f; }

/* 响应式设计 - 针对表格行优化 */
@media (max-width: 768px) {
  .workflow-steps {
    padding: 6px;
  }
  
  .steps-container {
    flex-direction: row;
    gap: 3px;
    margin-bottom: 6px;
  }
  
  .step-item {
    min-width: 60px;
    max-width: 60px;
    padding: 6px 2px;
  }
  
  .step-icon {
    width: 28px;
    height: 28px;
    font-size: 14px;
    margin-bottom: 4px;
  }
  
  .step-order-number {
    font-size: 12px;
  }
  
  .step-title {
    font-size: 9px;
    max-width: 56px;
    line-height: 1.1;
  }
  
  .step-connector {
    width: 12px;
    height: 1px;
    margin: 0 1px;
  }
  
  .workflow-summary {
    padding: 6px 8px;
    gap: 6px;
    font-size: 10px;
  }
  
  .summary-label,
  .summary-value {
    font-size: 9px;
  }
}

/* 暗色主题适配 */
:deep(.ant-tag) {
  border-color: transparent;
}
</style>