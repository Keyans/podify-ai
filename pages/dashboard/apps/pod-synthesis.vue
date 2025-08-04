<template>
  <div class="flex flex-col h-screen bg-dark-bg overflow-hidden">
    <!-- 统计卡片 -->
    <div class="flex-shrink-0 p-4 border-b border-dark-border">
      <div class="grid grid-cols-4 gap-4">
        <div v-for="(stat, index) in stats" :key="index" class="bg-dark-card rounded-lg shadow-sm border border-dark-border p-4">
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
    </div>

    <!-- 任务表格区域 - 精确自适应高度 -->
    <div class="flex-1 min-h-0 p-4">
    <TaskTable
      :data="tableData"
      :loading="loading"
      :currentApp="'pod-synthesis'"
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
        <!-- 自定义搜索栏设计 -->
        <template #custom-filters>
          <div class="p-4 rounded-lg border border-dark-border bg-dark-card">
            <!-- 操作按钮区域 - POD合成特有的按钮布局 -->
            <div class="flex items-center justify-between mb-4">
              <div class="flex space-x-3">
                <!-- 新建合成按钮 - 左侧 -->
                <button 
                  @click="showCreateModal = true"
                  class="flex items-center space-x-2 px-4 py-2 bg-cyan-400 text-white rounded-lg hover:bg-cyan-500 text-sm"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  <span>新建合成</span>
                </button>
                
                <!-- 下载合成插件按钮 -->
        <button 
                  class="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span>下载合成插件</span>
        </button>

                <!-- 产品模板管理 -->
                <button 
                  class="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                  </svg>
                  <span>产品模板</span>
                </button>
              </div>
            </div>

            <!-- 搜索过滤区域 - POD合成特有的过滤条件 -->
            <div class="flex items-center space-x-4">
              <!-- 任务ID搜索 -->
              <div class="relative">
                <input 
                  type="text" 
                  v-model="filters.taskId" 
                  placeholder="搜索任务ID"
                  class="pl-10 pr-4 py-2 rounded-lg border text-sm w-48"
                  :style="{
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    borderColor: 'var(--border-color)'
                  }"
                >
                <svg class="absolute left-3 top-3 w-4 h-4" :style="{ color: 'var(--text-secondary)' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>

              <!-- 产品类型筛选 -->
              <div class="relative">
                <select 
                  v-model="filters.productType" 
                  class="appearance-none px-4 py-2 pr-8 rounded-lg border text-sm min-w-32"
                  :style="{
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    borderColor: 'var(--border-color)'
                  }"
                >
                  <option value="">全部类型</option>
                  <option value="tshirt">T恤</option>
                  <option value="hoodie">卫衣</option>
                  <option value="mug">马克杯</option>
                  <option value="canvas">帆布包</option>
                  <option value="pillow">抱枕</option>
                  <option value="phone_case">手机壳</option>
                </select>
                <svg class="absolute right-2 top-3 w-4 h-4 pointer-events-none" :style="{ color: 'var(--text-secondary)' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>

              <!-- 合成状态筛选 -->
              <div class="relative">
                <select 
                  v-model="filters.status" 
                  class="appearance-none px-4 py-2 pr-8 rounded-lg border text-sm min-w-32"
                  :style="{
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    borderColor: 'var(--border-color)'
                  }"
                >
                  <option value="">全部状态</option>
                  <option value="waiting">等待中</option>
                  <option value="processing">合成中</option>
                  <option value="completed">已完成</option>
                  <option value="failed">失败</option>
                </select>
                <svg class="absolute right-2 top-3 w-4 h-4 pointer-events-none" :style="{ color: 'var(--text-secondary)' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>

              <!-- 时间筛选 -->
              <div class="relative">
                <select 
                  v-model="filters.dateRange"
                  class="appearance-none px-4 py-2 pr-8 rounded-lg border text-sm min-w-32"
                  :style="{
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    borderColor: 'var(--border-color)'
                  }"
                >
                  <option value="">全部时间</option>
                  <option value="today">今天</option>
                  <option value="week">本周</option>
                  <option value="month">本月</option>
                </select>
                <svg class="absolute right-2 top-3 w-4 h-4 pointer-events-none" :style="{ color: 'var(--text-secondary)' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>

              <!-- 搜索按钮 -->
              <button 
                @click="handleSearch"
                class="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                <span>搜索</span>
              </button>

              <!-- 重置按钮 -->
              <button 
                @click="resetFilters"
                class="px-4 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-700"
                :style="{
                  backgroundColor: 'var(--bg-tertiary)',
                  color: 'var(--text-secondary)',
                  borderColor: 'var(--border-color)'
                }"
              >
                重置
              </button>
            </div>
          </div>
      </template>
    </TaskTable>
    </div>
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

// 过滤器状态
const filters = ref({
  taskId: '',
  productType: '',
  status: '',
  dateRange: ''
})

// 重置过滤器
const resetFilters = () => {
  filters.value = {
    taskId: '',
    productType: '',
    status: '',
    dateRange: ''
  }
  // 重置后自动触发搜索
  handleSearch()
}

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

// 手动搜索
const handleSearch = () => {
  console.log('执行搜索，当前筛选条件:', filters.value)
  // 这里添加搜索逻辑
}

// 处理筛选变化
const handleFilterChange = () => {
  console.log('筛选条件变化:', filters.value)
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