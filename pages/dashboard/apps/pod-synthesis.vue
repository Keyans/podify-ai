<template>
  <div class="p-6">
    <!-- 统计卡片 -->
    <div class="grid grid-cols-4 gap-6 mb-6">
      <div v-for="(stat, index) in stats" :key="index" class="bg-dark-card rounded-lg shadow-sm border border-dark-border p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-dark-text-secondary">{{ stat.label }}</p>
            <p class="text-2xl font-bold text-dark-text mt-1">{{ stat.value }}</p>
          </div>
          <div class="w-12 h-12 rounded-lg flex items-center justify-center" :class="stat.iconBg">
            <svg class="w-6 h-6" :class="stat.iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="stat.iconPath"/>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- 任务表格 -->
    <TaskTable
      :data="tableData"
      :loading="loading"
      idLabel="合成"
      typeLabel="合成"
      quantityLabel="合成"
      statusLabel="任务"
      newButtonText="新建合成"
      :showType="false"
      @view="showTaskDetail"
      @newTask="showCreateModal = true"
      @page-change="handlePageChange"
      @filter-change="handleFilterChange"
    >
      <template #extra-buttons>
        <button 
          class="flex items-center space-x-2 px-4 py-2 rounded-md text-sm"
          :style="{
            backgroundColor: 'var(--accent-color)',
            color: 'white'
          }"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span>下载合成插件</span>
        </button>
      </template>
    </TaskTable>
  </div>

  <!-- 新建合成任务弹窗 -->
  <PodSynthesisNewTaskModal 
    :isOpen="showCreateModal" 
    @close="showCreateModal = false"
    @submit="handleTaskSubmit"
  />

  <!-- 合成任务详情弹窗 -->
  <PodSynthesisDetailModal
    :isOpen="showDetailModal"
    :taskData="currentTaskData"
    @close="showDetailModal = false"
    @download="handleDownloadImages"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import TaskTable from '~/components/TaskTable.vue'
import PodSynthesisNewTaskModal from '~/components/PodSynthesisNewTaskModal.vue'
import PodSynthesisDetailModal from '~/components/PodSynthesisDetailModal.vue'

// 使用 dashboard 布局
definePageMeta({
  layout: 'dashboard'
})

// 状态
const loading = ref(false)
const showCreateModal = ref(false)
const showDetailModal = ref(false)
const currentTaskData = ref(null)

// 统计数据
const stats = [
  {
    label: '总合成数',
    value: '156',
    iconPath: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    label: '成功率',
    value: '98%',
    iconPath: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600'
  },
  {
    label: '处理中',
    value: '43.6%',
    iconPath: 'M13 10V3L4 14h7v7l9-11h-7z',
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-600'
  },
  {
    label: '总任务数',
    value: '344',
    iconPath: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600'
  }
]

// 表格数据
const tableData = ref([
  {
    id: 'POD001',
    name: 'T恤衣物合成任务1',
    type: 'POD合成',
    targetCount: 120,
    successCount: 118,
    status: 'completed',
    progress: 98,
    creator: '张三',
    createdAt: '2023-06-01 10:30:00'
  },
  {
    id: 'POD002',
    name: '马克杯合成任务',
    type: 'POD合成',
    targetCount: 85,
    successCount: 85,
    status: 'completed',
    progress: 100,
    creator: '李四',
    createdAt: '2023-06-02 14:20:00'
  },
  {
    id: 'POD003',
    name: '帆布袋合成任务',
    type: 'POD合成',
    targetCount: 50,
    successCount: 32,
    status: 'processing',
    progress: 64,
    creator: '王五',
    createdAt: '2023-06-03 09:15:00'
  },
  {
    id: 'POD004',
    name: '抱枕合成任务',
    type: 'POD合成',
    targetCount: 200,
    successCount: 180,
    status: 'completed',
    progress: 90,
    creator: '赵六',
    createdAt: '2023-06-04 16:45:00'
  },
  {
    id: 'POD005',
    name: '帽子合成任务',
    type: 'POD合成',
    targetCount: 75,
    successCount: 15,
    status: 'processing',
    progress: 20,
    creator: '钱七',
    createdAt: '2023-06-05 11:30:00'
  }
])

// 显示任务详情
const showTaskDetail = (task) => {
  currentTaskData.value = task
  showDetailModal.value = true
}

// 处理任务提交
const handleTaskSubmit = (formData) => {
  console.log('提交合成任务:', formData)
  // 这里添加提交逻辑
  showCreateModal.value = false
  // 模拟添加新任务
  const newTask = {
    id: `POD00${tableData.value.length + 1}`,
    name: `新合成任务 ${new Date().toLocaleTimeString()}`,
    type: 'POD合成',
    targetCount: formData.products ? formData.products.length : 0,
    successCount: 0,
    status: 'processing',
    progress: 0,
    creator: '当前用户',
    createdAt: new Date().toLocaleString()
  }
  tableData.value.unshift(newTask)
}

// 处理分页变化
const handlePageChange = (page) => {
  console.log('页码变化:', page)
  // 这里添加分页逻辑
}

// 处理筛选变化
const handleFilterChange = (filters) => {
  console.log('筛选条件变化:', filters)
  // 这里添加筛选逻辑
}

// 处理下载图片
const handleDownloadImages = (images) => {
  console.log('下载图片:', images)
  // 这里添加下载逻辑
}

// 页面加载时获取数据
onMounted(() => {
  // 这里可以添加API调用获取实际数据
})
</script>