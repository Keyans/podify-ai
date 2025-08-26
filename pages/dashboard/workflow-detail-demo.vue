<template>
  <div class="workflow-detail-demo-page">
    <!-- 页面标题 -->
    <div class="demo-header">
      <h1>工作流任务详情组件演示</h1>
      <p>展示新的工作流任务详情弹窗组件效果</p>
      
      <!-- 主题切换器 -->
      <div class="theme-switcher">
        <ThemeSelector />
      </div>
    </div>

    <!-- 功能说明 -->
    <div class="feature-explanation">
      <a-card title="组件特性">
        <div class="feature-content">
          <h3>工作流任务详情组件特性：</h3>
          <ul>
            <li><strong>三层布局设计</strong> - 上层统计信息、下层左右分栏</li>
            <li><strong>工作流可视化</strong> - 左侧显示工作流进度和步骤</li>
            <li><strong>动态内容展示</strong> - 右侧根据选择的步骤显示对应内容</li>
            <li><strong>输入表单支持</strong> - 商品采集等步骤支持参数输入</li>
            <li><strong>表格展示</strong> - 其他步骤显示相应的结果表格</li>
            <li><strong>操作按钮</strong> - 支持继续执行和终止工作流</li>
          </ul>
          
          <h3>布局结构：</h3>
          <div class="layout-structure">
            <div class="layout-item header-layout">
              <span>上层：PageTitle 统计信息</span>
            </div>
            <div class="layout-row">
              <div class="layout-item left-layout">
                <span>左侧：工作流步骤</span>
              </div>
              <div class="layout-item right-layout">
                <span>右侧：详情内容</span>
              </div>
            </div>
          </div>
        </div>
      </a-card>
    </div>

    <!-- 演示案例 -->
    <div class="demo-section">
      <a-card title="演示案例">
        <div class="demo-buttons">
          <a-button type="primary" @click="showCompleteWorkflow">
            查看完整工作流
          </a-button>
          <a-button @click="showPartialWorkflow">
            查看部分完成工作流
          </a-button>
          <a-button @click="showFailedWorkflow">
            查看失败工作流
          </a-button>
          <a-button @click="showProcessingWorkflow">
            查看进行中工作流
          </a-button>
        </div>
      </a-card>
    </div>

    <!-- 组件结构说明 -->
    <div class="component-structure">
      <a-card title="组件结构说明">
        <a-collapse>
          <a-collapse-panel key="layout" header="布局结构">
            <div class="code-example">
              <pre><code><!-- 上层：标题统计信息 -->
&lt;div class="detail-header"&gt;
  &lt;PageTitle :total-list="headerStatsData" /&gt;
&lt;/div&gt;

<!-- 下层：左右分栏布局 -->
&lt;a-row :gutter="24"&gt;
  &lt;!-- 左侧：工作流展示 --&gt;
  &lt;a-col :span="8"&gt;
    &lt;WorkflowSteps :task-list="workflowData" /&gt;
    &lt;!-- 工作流步骤列表 --&gt;
  &lt;/a-col&gt;

  &lt;!-- 右侧：详情表格 --&gt;
  &lt;a-col :span="16"&gt;
    &lt;!-- 输入表单或表格展示 --&gt;
    &lt;PageTable v-if="showTable" /&gt;
  &lt;/a-col&gt;
&lt;/a-row&gt;</code></pre>
            </div>
          </a-collapse-panel>
          
          <a-collapse-panel key="workflow-steps" header="工作流步骤">
            <div class="code-example">
              <p>左侧工作流步骤支持：</p>
              <ul>
                <li>点击步骤切换右侧内容</li>
                <li>步骤状态可视化展示</li>
                <li>步骤顺序和进度跟踪</li>
              </ul>
            </div>
          </a-collapse-panel>
          
          <a-collapse-panel key="dynamic-content" header="动态内容展示">
            <div class="code-example">
              <p>右侧内容根据选择的步骤动态切换：</p>
              <ul>
                <li><strong>商品采集</strong> - 显示输入表单</li>
                <li><strong>智能截图</strong> - 显示截图结果表格</li>
                <li><strong>一键抠图</strong> - 显示抠图结果表格</li>
                <li><strong>其他步骤</strong> - 显示对应的处理结果</li>
              </ul>
            </div>
          </a-collapse-panel>
          
          <a-collapse-panel key="props-events" header="组件属性和事件">
            <div class="code-example">
              <pre><code>// Props
interface Props {
  open: boolean                    // 控制模态框显示
  taskInfo?: any                   // 任务信息
  workflowData?: TaskItem[]        // 工作流数据
  headerStatsData?: StatsItem[]    // 头部统计数据
}

// Events
emit('update:open', value)         // 更新显示状态
emit('close')                      // 关闭事件
emit('continue-execution', data)   // 继续执行工作流
emit('terminate-task', data)       // 终止任务</code></pre>
            </div>
          </a-collapse-panel>
        </a-collapse>
      </a-card>
    </div>

    <!-- 工作流任务详情组件实例 -->
    <WorkflowTaskDetailModal
      v-model:open="detailModalVisible"
      :task-info="currentTaskInfo"
      :workflow-data="currentWorkflowData"
      :header-stats-data="currentStatsData"
      @close="handleDetailClose"
      @continue-execution="handleContinueExecution"
      @terminate-task="handleTerminateTask"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ThemeSelector from '~/components/ThemeSelector.vue'
import WorkflowTaskDetailModal from '~/components/common/workflowTaskDetailModal.vue'

// 页面标题
useHead({
  title: '工作流任务详情组件演示'
})

// 响应式数据
const detailModalVisible = ref(false)
const currentTaskInfo = ref<any>({})
const currentWorkflowData = ref<any[]>([])
const currentStatsData = ref<any[]>([])

// 演示案例数据

// 完整工作流
const completeWorkflowData = [
  { taskType: 1, taskStatus: 2, sort: 1 }, // 商品采集 - 已完成
  { taskType: 2, taskStatus: 2, sort: 2 }, // 智能截图 - 已完成
  { taskType: 3, taskStatus: 2, sort: 3 }, // 一键抠图 - 已完成
  { taskType: 4, taskStatus: 2, sort: 4 }, // 超级裂变 - 已完成
  { taskType: 7, taskStatus: 2, sort: 5 }, // 标题生成 - 已完成
  { taskType: 8, taskStatus: 2, sort: 6 }, // 批量刊登 - 已完成
]

// 部分完成工作流
const partialWorkflowData = [
  { taskType: 1, taskStatus: 2, sort: 1 }, // 商品采集 - 已完成
  { taskType: 2, taskStatus: 2, sort: 2 }, // 智能截图 - 已完成
  { taskType: 3, taskStatus: 1, sort: 3 }, // 一键抠图 - 进行中
  { taskType: 4, taskStatus: 0, sort: 4 }, // 超级裂变 - 待执行
  { taskType: 7, taskStatus: 0, sort: 5 }, // 标题生成 - 待执行
  { taskType: 8, taskStatus: 0, sort: 6 }, // 批量刊登 - 待执行
]

// 失败工作流
const failedWorkflowData = [
  { taskType: 1, taskStatus: 2, sort: 1 }, // 商品采集 - 已完成
  { taskType: 2, taskStatus: 2, sort: 2 }, // 智能截图 - 已完成
  { taskType: 3, taskStatus: 4, sort: 3 }, // 一键抠图 - 失败
  { taskType: 4, taskStatus: 0, sort: 4 }, // 超级裂变 - 待执行
  { taskType: 7, taskStatus: 0, sort: 5 }, // 标题生成 - 待执行
]

// 进行中工作流
const processingWorkflowData = [
  { taskType: 1, taskStatus: 2, sort: 1 }, // 商品采集 - 已完成
  { taskType: 2, taskStatus: 1, sort: 2 }, // 智能截图 - 进行中
  { taskType: 3, taskStatus: 0, sort: 3 }, // 一键抠图 - 待执行
  { taskType: 4, taskStatus: 0, sort: 4 }, // 超级裂变 - 待执行
]

// 演示案例函数
const showCompleteWorkflow = () => {
  currentTaskInfo.value = {
    workflowId: 'WF001',
    workflowName: '商品处理完整流程',
    status: 2
  }
  currentWorkflowData.value = completeWorkflowData
  currentStatsData.value = [
    { title: '工作流总数', value: 6 },
    { title: '已经运行时间', value: '2小时30分钟' },
    { title: '当前进度', value: '已完成' }
  ]
  detailModalVisible.value = true
}

const showPartialWorkflow = () => {
  currentTaskInfo.value = {
    workflowId: 'WF002',
    workflowName: '商品处理进行中',
    status: 1
  }
  currentWorkflowData.value = partialWorkflowData
  currentStatsData.value = [
    { title: '工作流总数', value: 6 },
    { title: '已经运行时间', value: '45分钟' },
    { title: '当前进度', value: '一键抠图 34/382' }
  ]
  detailModalVisible.value = true
}

const showFailedWorkflow = () => {
  currentTaskInfo.value = {
    workflowId: 'WF003',
    workflowName: '商品处理失败案例',
    status: 4
  }
  currentWorkflowData.value = failedWorkflowData
  currentStatsData.value = [
    { title: '工作流总数', value: 5 },
    { title: '已经运行时间', value: '1小时15分钟' },
    { title: '当前进度', value: '一键抠图失败' }
  ]
  detailModalVisible.value = true
}

const showProcessingWorkflow = () => {
  currentTaskInfo.value = {
    workflowId: 'WF004',
    workflowName: '商品处理执行中',
    status: 1
  }
  currentWorkflowData.value = processingWorkflowData
  currentStatsData.value = [
    { title: '工作流总数', value: 4 },
    { title: '已经运行时间', value: '23分钟' },
    { title: '当前进度', value: '智能截图 156/200' }
  ]
  detailModalVisible.value = true
}

// 事件处理
const handleDetailClose = () => {
  detailModalVisible.value = false
  currentTaskInfo.value = {}
  currentWorkflowData.value = []
  currentStatsData.value = []
}

const handleContinueExecution = (taskInfo: any) => {
  console.log('继续执行工作流:', taskInfo)
  // 这里可以实现继续执行的逻辑
  detailModalVisible.value = false
}

const handleTerminateTask = (taskInfo: any) => {
  console.log('终止工作流任务:', taskInfo)
  // 这里可以实现终止任务的逻辑
  detailModalVisible.value = false
}
</script>

<style scoped>
.workflow-detail-demo-page {
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
  background-color: var(--bg-primary);
  min-height: 100vh;
}

.demo-header {
  text-align: center;
  margin-bottom: 32px;
  position: relative;
}

.demo-header h1 {
  color: var(--text-primary);
  margin-bottom: 8px;
  font-size: 28px;
}

.demo-header p {
  color: var(--text-secondary);
  font-size: 16px;
  margin-bottom: 24px;
}

.theme-switcher {
  position: absolute;
  top: 0;
  right: 0;
}

.feature-explanation {
  margin-bottom: 32px;
}

.feature-content h3 {
  color: var(--text-primary);
  margin: 16px 0 8px 0;
}

.feature-content ul {
  color: var(--text-secondary);
  padding-left: 24px;
}

.feature-content li {
  margin-bottom: 8px;
}

.feature-content strong {
  color: var(--text-primary);
}

.layout-structure {
  margin-top: 16px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  overflow: hidden;
}

.layout-item {
  padding: 12px 16px;
  text-align: center;
  color: var(--text-primary);
  font-weight: 500;
}

.header-layout {
  background-color: var(--bg-tertiary);
  border-bottom: 1px solid var(--border-color);
}

.layout-row {
  display: flex;
}

.left-layout {
  flex: 1;
  background-color: var(--bg-secondary);
  border-right: 1px solid var(--border-color);
}

.right-layout {
  flex: 2;
  background-color: var(--bg-secondary);
}

.demo-section {
  margin-bottom: 32px;
}

.demo-buttons {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.component-structure {
  margin-top: 32px;
}

.code-example {
  background: var(--bg-tertiary);
  padding: 16px;
  border-radius: 6px;
  border: 1px solid var(--border-color);
}

.code-example pre {
  background: var(--bg-primary);
  padding: 12px;
  border-radius: 4px;
  border: 1px solid var(--border-color);
  overflow-x: auto;
  margin: 0;
}

.code-example code {
  color: var(--text-primary);
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 13px;
  line-height: 1.5;
}

.code-example ul {
  margin: 8px 0;
  padding-left: 20px;
}

.code-example li {
  margin-bottom: 4px;
  color: var(--text-secondary);
}

/* 适配暗色主题的卡片样式 */
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

:deep(.ant-collapse) {
  background-color: var(--bg-tertiary);
  border-color: var(--border-color);
}

:deep(.ant-collapse-item) {
  border-bottom-color: var(--border-color);
}

:deep(.ant-collapse-header) {
  color: var(--text-primary);
  background-color: var(--bg-secondary);
}

:deep(.ant-collapse-content) {
  background-color: var(--bg-tertiary);
  border-top-color: var(--border-color);
}

:deep(.ant-collapse-content-box) {
  color: var(--text-primary);
}
</style>