<template>
  <div>
    <a-card class="ml-10 mr-10 mt-4">
      <PageTitle :totalList="statsData" />
    </a-card>
    <a-card class="ml-10 mr-10 mt-4">
      <PageSearch
        v-model="searchParams"
        :fields="searchFields"
        @search="onSearch"
        @reset="onReset"
      >
        <template #prefix>
          <div class="flex items-center space-x-4">
            <a-button @click="addOpen = true">新建工作流</a-button>
            <a-button @click="navigateToTemplateManagement">工作流管理</a-button>
          </div>
        </template>
      </PageSearch>
    </a-card>
    <a-card class="ml-10 mr-10 mt-4">
      <PageTable
        :columns="tableColumns"
        :data-source="tableData"
        row-key="creatorId"
        :loading="tableLoading"
        :pagination="{ total: Number(pagination.total), pageSize: Number(pagination.limit), current: Number(pagination.page) }"
        :row-selection="{ selectedRowKeys, onChange: onSelectChange }"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <PageTableOption :record="record" @detail="handleDetail" @more="handleMore"></PageTableOption>
          </template>
        </template>
      </PageTable>
    </a-card>
    
    <!-- 新建合成任务弹窗 -->
    <PodSynthesisNewTaskModal 
    :isOpen="addOpen" 
    @close="addOpen = false"
    @submit="handleTaskSubmit"
  />
  
  <!-- SKU 详情模态框 -->
  <!-- 工作流任务详情模态框 -->
  <WorkflowTaskDetailModal
    v-model:open="workflowDetailModalOpen"
    :task-info="currentTaskInfo"
    :workflow-data="currentWorkflowData"
    :header-stats-data="currentStatsData"
    @close="handleWorkflowDetailClose"
    @continue-execution="handleContinueExecution"
    @terminate-task="handleTerminateTask"
  />
  </div>    
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import PageTitle from '~/components/common/pageTitle.vue'
import PageSearch from '~/components/common/pageSearch.vue'
import PageTable from '~/components/common/pageTable.vue'
import PageTableOption from '~/components/common/pageTableOption.vue'
import PodSynthesisNewTaskModal from '~/components/PodSynthesisNewTaskModal.vue'
import WorkflowTaskDetailModal from '~/components/common/workflowTaskDetailModal.vue'

// 导入 Composable
import { useList } from '~/composables/business/work/useList'
import { getTaskTypeInfo } from '~/utils/statusUtils'


const addOpen = ref<boolean>(false)
const templateModalOpen = ref<boolean>(false)

// 工作流任务详情模态框
const workflowDetailModalOpen = ref<boolean>(false)
const currentTaskInfo = ref<any>({})
const currentWorkflowData = ref<any[]>([])
const currentStatsData = ref<any[]>([])

// 使用 dashboard 布局
definePageMeta({
  layout: 'dashboard'
})


// 处理新建文生图任务提交
const handleTaskSubmit = async (formData: { taskResponse: any }) => {
  
  try {
    // 现在只有成功时才会收到事件，所以直接处理成功逻辑    
    // 关闭弹窗
    addOpen.value = false  
    // 刷新数据
    handleTaskSuccess()       
  } catch (error) {
    // 处理异常时关闭弹窗
    addOpen.value = false
  }
}

// 主表格逻辑
const {
  statsData,
  getCount,
  tableColumns,
  searchFields,
  pagination,
  tableData,
  tableLoading,
  selectedRowKeys,
  onSelectChange,
  handleTableChange,
  searchParams,
  onSearch,
  onReset,
  fetchData: fetchMainTableData 
} = useList()

// 点击查看详情的事件处理
const handleDetail = async (record: any) => {
  // 设置当前任务信息
  currentTaskInfo.value = record
  
  // 模拟工作流数据（实际项目中从API获取）
  currentWorkflowData.value = [
    { taskType: 1, taskStatus: 2, sort: 1 }, // 商品采集 - 已完成
    { taskType: 2, taskStatus: 2, sort: 2 }, // 智能截图 - 已完成  
    { taskType: 3, taskStatus: 1, sort: 3 }, // 一键抠图 - 进行中
    { taskType: 4, taskStatus: 0, sort: 4 }, // 超级裂变 - 待执行
    { taskType: 7, taskStatus: 0, sort: 5 }, // 标题生成 - 待执行
    { taskType: 8, taskStatus: 0, sort: 6 }, // 批量刊登 - 待执行
  ]
  
  // 设置头部统计数据
  currentStatsData.value = [
    { title: '工作流总数', value: 8 },
    { title: '已经运行时间', value: '45分钟' },
    { title: '当前进度', value: '图片合成 54/382' }
  ]
  
  // 打开工作流任务详情模态框
  workflowDetailModalOpen.value = true
}

const handleMore = (record: any) => {
  console.log(record)
}

// 打开模板管理模态弹窗
const navigateToTemplateManagement = () => {
  templateModalOpen.value = true
}

// 处理任务创建成功事件
const handleTaskSuccess = () => {
  getCount() // 重新获取统计数据
  fetchMainTableData() // 重新获取主表格数据
}

// 工作流详情模态框事件处理
const handleWorkflowDetailClose = () => {
  workflowDetailModalOpen.value = false
  currentTaskInfo.value = {}
  currentWorkflowData.value = []
  currentStatsData.value = []
}

const handleContinueExecution = (taskInfo: any) => {
  console.log('继续执行工作流:', taskInfo)
  // 这里实现继续执行工作流的逻辑
  // 可能需要调用API重启工作流
  workflowDetailModalOpen.value = false
}

const handleTerminateTask = (taskInfo: any) => {
  console.log('终止工作流任务:', taskInfo)
  // 这里实现终止工作流的逻辑
  // 需要调用API终止当前工作流
  workflowDetailModalOpen.value = false
  // 刷新主表格数据
  fetchMainTableData()
}

// 页面加载时执行
onMounted(() => {
  getCount() // 获取统计数据
  fetchMainTableData() // 获取主表格数据
})
</script>