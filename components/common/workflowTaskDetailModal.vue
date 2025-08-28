<template>
  <a-modal
    v-model:open="modalVisible"
    title="工作流任务详情"
    width="1400px"
    :footer="null"
    :destroyOnClose="true"
    class="workflow-task-detail-modal"
  >
    <!-- 上层：标题统计信息 -->
    <div class="detail-header mb-6">
      <PageTitle :total-list="headerStatsData" />
    </div>

    <!-- 下层：左右分栏布局 -->
    <div class="detail-content">
      <a-row :gutter="24">
        <!-- 左侧：工作流展示 -->
        <a-col :span="8">
          <a-card title="工作流程" size="small" class="workflow-card">
            <!-- 工作流步骤组件 -->
            <div class="workflow-container">
              <WorkflowSteps 
                :task-list="workflowData" 
                @step-click="handleStepClick"
              />
            </div>
            
            <!-- 工作流步骤列表 -->
            <div class="workflow-steps-list mt-4">
              <div 
                v-for="step in sortedWorkflowSteps" 
                :key="step.taskType"
                class="workflow-step-item"
                :class="{ 'active': activeStep === step.taskType }"
                @click="handleStepClick(step)"
              >
                <div class="step-info">
                  <div class="step-order">{{ step.sort }}</div>
                  <div class="step-details">
                    <div class="step-name">{{ getTaskTypeInfo(step.taskType).label }}</div>
                    <div class="step-status" :class="getStepStatusClass(step.taskStatus)">
                      {{ getStatusText(step.taskStatus, 'status').text }}
                    </div>
                  </div>
                </div>
                <div class="step-icon">
                  <Icon 
                    :type="getStepStatusIcon(step.taskStatus)" 
                    :color="getStepStatusColor(step.taskStatus)"
                  />
                </div>
              </div>
            </div>
          </a-card>
        </a-col>

        <!-- 右侧：详情表格 -->
        <a-col :span="16">
          <a-card :title="activeStepTitle" size="small" class="detail-card">
            <!-- 输入表单区域（商品采集等） -->
            <div v-if="showInputForm" class="input-form-section mb-4">
              <a-form :model="inputFormData" layout="vertical">
                <a-row :gutter="16">
                  <a-col :span="12">
                    <a-form-item label="商品链接">
                      <a-input 
                        v-model:value="inputFormData.productUrl" 
                        placeholder="请输入商品链接"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item label="采集数量">
                      <a-input-number 
                        v-model:value="inputFormData.quantity" 
                        :min="1"
                        placeholder="请输入采集数量"
                        style="width: 100%"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row :gutter="16">
                  <a-col :span="24">
                    <a-form-item label="备注">
                      <a-textarea 
                        v-model:value="inputFormData.remark" 
                        placeholder="请输入备注信息"
                        :rows="3"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-form-item>
                  <a-button type="primary" @click="handleSubmitInput">
                    提交
                  </a-button>
                  <a-button class="ml-2" @click="handleResetInput">
                    重置
                  </a-button>
                </a-form-item>
              </a-form>
            </div>

            <!-- 表格展示区域 -->
            <div v-if="showTable" class="table-section">
              <PageTable
                :columns="currentTableColumns"
                :data-source="currentTableData"
                :loading="tableLoading"
                :pagination="tablePagination"
                row-key="id"
                @change="handleTableChange"
              >
                <template #bodyCell="{ column, record }">
                  <template v-if="column.key === 'image'">
                    <a-image
                      :width="60"
                      :height="60"
                      :src="record.imageUrl"
                      :preview="true"
                      fallback="/images/placeholder.png"
                    />
                  </template>
                  <template v-if="column.key === 'status'">
                    <a-tag :color="getStatusText(record.status, 'status').color">
                      {{ getStatusText(record.status, 'status').text }}
                    </a-tag>
                  </template>
                  <template v-if="column.key === 'action'">
                    <a-button type="link" size="small" @click="handleViewDetail(record)">
                      查看
                    </a-button>
                    <a-button type="link" size="small" @click="handleDownload(record)">
                      下载
                    </a-button>
                  </template>
                </template>
              </PageTable>
            </div>

            <!-- 空状态 -->
            <div v-if="!showInputForm && !showTable" class="empty-state">
              <a-empty description="请选择左侧工作流步骤查看详情" />
            </div>
          </a-card>
        </a-col>
      </a-row>
    </div>

    <!-- 底部操作按钮 -->
    <template #footer>
      <div class="modal-footer">
        <a-button @click="handleClose">关闭</a-button>
        <a-button type="primary" @click="handleContinueExecution">
          继续执行工作流
        </a-button>
        <a-button type="primary" danger @click="handleTerminateTask">
          终止当前工作流任务
        </a-button>
      </div>
    </template>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import PageTitle from './pageTitle.vue'
import PageTable from './pageTable.vue'
import WorkflowSteps from './workflowSteps.vue'
import { getTaskTypeInfo, getStatusText } from '~/utils/statusUtils'

// 定义接口
interface TaskItem {
  taskType: number
  taskStatus: number
  sort: number
}

interface StatsItem {
  title: string
  value: string | number
}

interface TableColumn {
  title: string
  dataIndex?: string
  key: string
  width?: number
  customRender?: any
}

interface Props {
  open: boolean
  taskInfo?: any
  workflowData?: TaskItem[]
  headerStatsData?: StatsItem[]
}

const props = withDefaults(defineProps<Props>(), {
  open: false,
  taskInfo: () => ({}),
  workflowData: () => [],
  headerStatsData: () => []
})

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
  (e: 'close'): void
  (e: 'continue-execution', data: any): void
  (e: 'terminate-task', data: any): void
}>()

// 响应式数据
const modalVisible = computed({
  get: () => props.open,
  set: (value) => emit('update:open', value)
})

const activeStep = ref<number | null>(null)
const tableLoading = ref(false)
const currentTableData = ref<any[]>([])

// 输入表单数据
const inputFormData = ref({
  productUrl: '',
  quantity: 1,
  remark: ''
})

// 排序后的工作流步骤
const sortedWorkflowSteps = computed(() => {
  return [...props.workflowData].sort((a, b) => a.sort - b.sort)
})

// 当前激活步骤的标题
const activeStepTitle = computed(() => {
  if (!activeStep.value) return '请选择工作流步骤'
  return getTaskTypeInfo(activeStep.value).label
})

// 是否显示输入表单（商品采集等需要输入的步骤）
const showInputForm = computed(() => {
  // 商品采集步骤显示输入表单
  return activeStep.value === 1
})

// 是否显示表格
const showTable = computed(() => {
  // 除了商品采集，其他步骤显示表格
  return activeStep.value && activeStep.value !== 1
})

// 当前表格列配置
const currentTableColumns = computed((): TableColumn[] => {
  if (!activeStep.value) return []
  
  switch (activeStep.value) {
    case 2: // 智能截图
      return [
        { title: '序号', dataIndex: 'index', key: 'index', width: 80 },
        { title: '原图', key: 'image', width: 100 },
        { title: '截图结果', key: 'resultImage', width: 100 },
        { title: '状态', key: 'status', width: 100 },
        { title: '创建时间', dataIndex: 'createTime', key: 'createTime', width: 180 },
        { title: '操作', key: 'action', width: 150 }
      ]
    case 3: // 一键抠图
      return [
        { title: '序号', dataIndex: 'index', key: 'index', width: 80 },
        { title: '原图', key: 'image', width: 100 },
        { title: '抠图结果', key: 'resultImage', width: 100 },
        { title: '状态', key: 'status', width: 100 },
        { title: '处理时间', dataIndex: 'processTime', key: 'processTime', width: 180 },
        { title: '操作', key: 'action', width: 150 }
      ]
    case 4: // 超级裂变
      return [
        { title: '序号', dataIndex: 'index', key: 'index', width: 80 },
        { title: '原图', key: 'image', width: 100 },
        { title: '裂变数量', dataIndex: 'count', key: 'count', width: 100 },
        { title: '状态', key: 'status', width: 100 },
        { title: '创建时间', dataIndex: 'createTime', key: 'createTime', width: 180 },
        { title: '操作', key: 'action', width: 150 }
      ]
    default:
      return [
        { title: '序号', dataIndex: 'index', key: 'index', width: 80 },
        { title: '图片', key: 'image', width: 100 },
        { title: '状态', key: 'status', width: 100 },
        { title: '创建时间', dataIndex: 'createTime', key: 'createTime', width: 180 },
        { title: '操作', key: 'action', width: 150 }
      ]
  }
})

// 表格分页配置
const tablePagination = ref({
  current: 1,
  pageSize: 10,
  total: 0
})

// 获取步骤状态样式类
const getStepStatusClass = (status: number) => {
  const statusMap = {
    0: 'status-pending',
    1: 'status-processing', 
    2: 'status-completed',
    3: 'status-warning',
    4: 'status-error'
  }
  return statusMap[status as keyof typeof statusMap] || 'status-unknown'
}

// 获取步骤状态图标
const getStepStatusIcon = (status: number) => {
  const iconMap = {
    0: 'clock-circle',
    1: 'loading',
    2: 'check-circle',
    3: 'exclamation-circle',
    4: 'close-circle'
  }
  return iconMap[status as keyof typeof iconMap] || 'question-circle'
}

// 获取步骤状态颜色
const getStepStatusColor = (status: number) => {
  const colorMap = {
    0: '#d9d9d9',
    1: '#1890ff',
    2: '#52c41a',
    3: '#faad14',
    4: '#ff4d4f'
  }
  return colorMap[status as keyof typeof colorMap] || '#d9d9d9'
}

// 处理步骤点击
const handleStepClick = (step: TaskItem) => {
  activeStep.value = step.taskType
  // 加载对应步骤的数据
  loadStepData(step.taskType)
}

// 加载步骤数据
const loadStepData = async (taskType: number) => {
  tableLoading.value = true
  try {
    // 模拟数据加载
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // 根据任务类型生成模拟数据
    currentTableData.value = generateMockData(taskType)
    tablePagination.value.total = currentTableData.value.length
  } catch (error) {
    console.error('加载步骤数据失败:', error)
  } finally {
    tableLoading.value = false
  }
}

// 生成模拟数据
const generateMockData = (taskType: number) => {
  const mockData = []
  for (let i = 1; i <= 5; i++) {
    mockData.push({
      id: i,
      index: i,
      imageUrl: '/images/mock-image.jpg',
      status: Math.floor(Math.random() * 3), // 0-2随机状态
      createTime: new Date().toLocaleString(),
      processTime: new Date().toLocaleString(),
      count: Math.floor(Math.random() * 10) + 1
    })
  }
  return mockData
}

// 表格事件处理
const handleTableChange = (pagination: any) => {
  tablePagination.value.current = pagination.current
  tablePagination.value.pageSize = pagination.pageSize
  // 重新加载数据
  if (activeStep.value) {
    loadStepData(activeStep.value)
  }
}

// 输入表单事件处理
const handleSubmitInput = () => {
  console.log('提交输入数据:', inputFormData.value)
  // 这里实现提交逻辑
}

const handleResetInput = () => {
  inputFormData.value = {
    productUrl: '',
    quantity: 1,
    remark: ''
  }
}

// 表格操作事件
const handleViewDetail = (record: any) => {
  console.log('查看详情:', record)
}

const handleDownload = (record: any) => {
  console.log('下载:', record)
}

// 模态框事件处理
const handleClose = () => {
  modalVisible.value = false
  emit('close')
}

const handleContinueExecution = () => {
  emit('continue-execution', props.taskInfo)
}

const handleTerminateTask = () => {
  emit('terminate-task', props.taskInfo)
}

// 监听模态框打开，重置状态
watch(() => props.open, (newVal) => {
  if (newVal) {
    activeStep.value = null
    currentTableData.value = []
    inputFormData.value = {
      productUrl: '',
      quantity: 1,
      remark: ''
    }
  }
})
</script>

<style scoped>
.workflow-task-detail-modal :deep(.ant-modal-body) {
  padding: 24px;
}

.detail-header {
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 16px;
}

.detail-content {
  margin-top: 16px;
}

.workflow-card,
.detail-card {
  height: 600px;
  overflow-y: auto;
}

.workflow-card :deep(.ant-card-body) {
  padding: 16px;
}

.workflow-container {
  margin-bottom: 16px;
}

.workflow-steps-list {
  border-top: 1px solid var(--border-color);
  padding-top: 16px;
}

.workflow-step-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  margin-bottom: 8px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.workflow-step-item:hover {
  background-color: var(--bg-tertiary);
  border-color: var(--accent-color);
}

.workflow-step-item.active {
  background-color: var(--bg-primary);
  border-color: var(--accent-color);
}

.step-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.step-order {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: var(--accent-color);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 12px;
}

.step-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.step-name {
  font-weight: 500;
  color: var(--text-primary);
}

.step-status {
  font-size: 12px;
}

.status-pending { color: var(--text-tertiary); }
.status-processing { color: var(--accent-color); }
.status-completed { color: #52c41a; }
.status-warning { color: #faad14; }
.status-error { color: #ff4d4f; }

.input-form-section {
  background-color: var(--bg-tertiary);
  padding: 16px;
  border-radius: 6px;
  border: 1px solid var(--border-color);
}

.table-section {
  min-height: 400px;
}

.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
}

.modal-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 响应式适配 */
@media (max-width: 1200px) {
  .workflow-card,
  .detail-card {
    height: 500px;
  }
}

/* 暗色主题适配 */
:deep(.ant-card) {
  background-color: var(--bg-secondary);
  border-color: var(--border-color);
}

:deep(.ant-card-head) {
  background-color: var(--bg-secondary);
  border-bottom-color: var(--border-color);
}

:deep(.ant-card-head-title) {
  color: var(--text-primary);
}

:deep(.ant-card-body) {
  color: var(--text-primary);
}
</style>