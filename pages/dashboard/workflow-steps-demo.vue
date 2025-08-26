<template>
  <div class="workflow-demo-page">
    <!-- 页面标题 -->
    <div class="demo-header">
      <h1>工作流步骤组件演示</h1>
      <p>展示工作流流程的可视化组件效果</p>
      
      <!-- 主题切换器 -->
      <div class="theme-switcher">
        <ThemeSelector />
      </div>
    </div>

    <!-- 功能说明 -->
    <div class="feature-explanation">
      <a-card title="功能特性">
        <div class="feature-content">
          <h3>工作流步骤组件特性：</h3>
          <ul>
            <li><strong>任务类型映射</strong> - 根据枚举显示对应的任务名称</li>
            <li><strong>状态可视化</strong> - 不同图标和颜色表示不同状态</li>
            <li><strong>流程连接</strong> - 连接线显示工作流程的顺序</li>
            <li><strong>统计信息</strong> - 显示各种状态的任务数量统计</li>
            <li><strong>响应式设计</strong> - 适配移动端和桌面端</li>
          </ul>
          
          <h3>支持的任务类型：</h3>
          <div class="task-types">
            <a-tag v-for="(type, key) in taskTypes" :key="key" color="blue">
              {{ type.value }}. {{ type.label }}
            </a-tag>
          </div>
        </div>
      </a-card>
    </div>

    <!-- 演示案例 -->
    <div class="demo-section">
      <a-row :gutter="[24, 24]">
        <!-- 案例1：完整工作流 -->
        <a-col :span="24">
          <a-card title="案例1：完整工作流（部分完成）">
            <div class="demo-description">
              <p>模拟一个包含多个步骤的工作流，部分步骤已完成，一个正在进行中</p>
            </div>
            <WorkflowSteps :task-list="demoTaskList1" />
          </a-card>
        </a-col>

        <!-- 案例2：简单工作流 -->
        <a-col :span="12">
          <a-card title="案例2：您提供的示例数据">
            <div class="demo-description">
              <p>使用您提供的JSON数据结构</p>
            </div>
            <WorkflowSteps :task-list="demoTaskList2" />
          </a-card>
        </a-col>

        <!-- 案例3：失败工作流 -->
        <a-col :span="12">
          <a-card title="案例3：包含失败的工作流">
            <div class="demo-description">
              <p>演示工作流中某个步骤失败的情况</p>
            </div>
            <WorkflowSteps :task-list="demoTaskList3" />
          </a-card>
        </a-col>

        <!-- 案例4：全部完成 -->
        <a-col :span="12">
          <a-card title="案例4：全部完成的工作流">
            <div class="demo-description">
              <p>所有步骤都已成功完成的工作流</p>
            </div>
            <WorkflowSteps :task-list="demoTaskList4" />
          </a-card>
        </a-col>

        <!-- 案例5：空工作流 -->
        <a-col :span="12">
          <a-card title="案例5：空工作流处理">
            <div class="demo-description">
              <p>测试没有任务或空数组的情况</p>
            </div>
            <WorkflowSteps :task-list="[]" />
          </a-card>
        </a-col>
      </a-row>
    </div>

    <!-- 数据结构说明 -->
    <div class="data-structure">
      <a-card title="数据结构说明">
        <a-collapse>
          <a-collapse-panel key="task-types" header="任务类型枚举">
            <div class="code-example">
              <pre><code>// 任务类型枚举定义
export const TASK_TYPE_ENUM = {
    PRODUCT_COLLECTOR: { value: 1, label: "商品采集" },
    SMART_IMAGE_CROPPER: { value: 2, label: "智能截图" },
    SMART_MATTING: { value: 3, label: "一键抠图" },
    SUPER_FISSION_ENGINE: { value: 4, label: "超级裂变" },
    INFRINGEMENT_DETECTOR: { value: 5, label: "侵权检测" },
    POD_COMPOSER: { value: 6, label: "POD合成" },
    TITLE_GENERATOR: { value: 7, label: "标题生成" },
    BULK_PUBLISHER: { value: 8, label: "批量刊登" },
    TEXT_IMAGE_CREATOR: { value: 9, label: "文生图" },
}</code></pre>
            </div>
          </a-collapse-panel>
          
          <a-collapse-panel key="task-status" header="任务状态定义">
            <div class="code-example">
              <pre><code>// 任务状态映射
'taskStatus': {
    0: { text: '待执行', color: 'default' },
    1: { text: '进行中', color: 'processing' },
    2: { text: '已完成', color: 'success' },
    3: { text: '部分失败', color: 'warning' },
    4: { text: '失败', color: 'error' }
}</code></pre>
            </div>
          </a-collapse-panel>
          
          <a-collapse-panel key="data-format" header="数据格式">
            <div class="code-example">
              <pre><code>// taskList 数据格式
[
    {
        "taskType": 4,      // 任务类型（1-9对应不同任务）
        "taskStatus": 4,    // 任务状态（0-4对应不同状态）
        "sort": 1          // 排序序号
    },
    {
        "taskType": 7,
        "taskStatus": 0,
        "sort": 2
    },
    {
        "taskType": 9,
        "taskStatus": 0,
        "sort": 3
    }
]</code></pre>
            </div>
          </a-collapse-panel>
        </a-collapse>
      </a-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ThemeSelector from '~/components/ThemeSelector.vue'
import WorkflowSteps from '~/components/common/workflowSteps.vue'
import { TASK_TYPE_ENUM } from '~/utils/statusUtils'

// 页面标题
useHead({
  title: '工作流步骤组件演示'
})

// 任务类型信息
const taskTypes = TASK_TYPE_ENUM

// 演示数据1：完整工作流
const demoTaskList1 = ref([
  { taskType: 1, taskStatus: 2, sort: 1 }, // 商品采集 - 已完成
  { taskType: 2, taskStatus: 2, sort: 2 }, // 智能截图 - 已完成
  { taskType: 3, taskStatus: 2, sort: 3 }, // 一键抠图 - 已完成
  { taskType: 4, taskStatus: 1, sort: 4 }, // 超级裂变 - 进行中
  { taskType: 6, taskStatus: 0, sort: 5 }, // POD合成 - 待执行
  { taskType: 8, taskStatus: 0, sort: 6 }, // 批量刊登 - 待执行
])

// 演示数据2：您提供的示例
const demoTaskList2 = ref([
  { taskType: 4, taskStatus: 4, sort: 1 }, // 超级裂变 - 失败
  { taskType: 7, taskStatus: 0, sort: 2 }, // 标题生成 - 待执行
  { taskType: 9, taskStatus: 0, sort: 3 }, // 文生图 - 待执行
])

// 演示数据3：包含失败的工作流
const demoTaskList3 = ref([
  { taskType: 1, taskStatus: 2, sort: 1 }, // 商品采集 - 已完成
  { taskType: 5, taskStatus: 4, sort: 2 }, // 侵权检测 - 失败
  { taskType: 7, taskStatus: 0, sort: 3 }, // 标题生成 - 待执行
])

// 演示数据4：全部完成
const demoTaskList4 = ref([
  { taskType: 2, taskStatus: 2, sort: 1 }, // 智能截图 - 已完成
  { taskType: 3, taskStatus: 2, sort: 2 }, // 一键抠图 - 已完成
  { taskType: 6, taskStatus: 2, sort: 3 }, // POD合成 - 已完成
])
</script>

<style scoped>
.workflow-demo-page {
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

.task-types {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
}

.demo-section {
  margin-bottom: 32px;
}

.demo-description {
  margin-bottom: 16px;
}

.demo-description p {
  color: var(--text-secondary);
  font-size: 14px;
  margin: 0;
}

.data-structure {
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