<template>
  <div class="flex flex-col h-full bg-dark-bg overflow-hidden">
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

    <!-- 任务表格区域 - 使用统一的TaskTable组件 -->
    <div class="flex-1 min-h-0 p-4">
      <TaskTable
        :data="tableData"
        :loading="loading"
        :pagination="pagination"
        :totalItems="pagination.total || 0"
        :pageSize="pagination.limit || 10"
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
        @page-size-change="handlePageSizeChange"
        @filter-change="handleFilterChange"
      >
        <!-- 自定义搜索栏设计 - 左右布局 -->
        <template #custom-filters>
          <div class="p-4 rounded-lg border border-dark-border bg-dark-card">
            <!-- 左右布局：左侧按钮，右侧搜索筛选 -->
            <div class="flex items-center justify-between">
              <!-- 左侧：操作按钮 -->
              <div class="flex space-x-3">
                <!-- 新建合成按钮 -->
                <button 
                  @click="showCreateModal = true"
                  class="flex items-center space-x-2 px-4 py-2 text-white rounded-lg text-sm"
                  :style="{
                    backgroundColor: 'var(--accent-color)'
                  }"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  <span>新建合成</span>
                </button>
              </div>

              <!-- 右侧：搜索过滤区域 -->
              <div class="flex items-center space-x-4">
                <!-- 搜索任务ID -->
                <div class="relative">
                  <input 
                    type="text" 
                    v-model="filters.keyword" 
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

                <!-- 全部状态筛选 -->
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
                    <option value="0">待执行</option>
                    <option value="1">进行中</option>
                    <option value="2">已完成</option>
                    <option value="3">部分失败</option>
                    <option value="4">失败</option>
                  </select>
                  <svg class="absolute right-2 top-3 w-4 h-4 pointer-events-none" :style="{ color: 'var(--text-secondary)' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>

                <!-- 全部负责人筛选 -->
                <div class="relative">
                  <select 
                    v-model="filters.userId" 
                    class="appearance-none px-4 py-2 pr-8 rounded-lg border text-sm min-w-32"
                    :style="{
                      backgroundColor: 'var(--bg-tertiary)',
                      color: 'var(--text-primary)',
                      borderColor: 'var(--border-color)'
                    }"
                  >
                    <option value="">全部负责人</option>
                    <option value="admin">admin</option>
                    <option value="system">system</option>
                  </select>
                  <svg class="absolute right-2 top-3 w-4 h-4 pointer-events-none" :style="{ color: 'var(--text-secondary)' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>

                <!-- 开始日期 -->
                <div class="relative">
                  <input 
                    type="date" 
                    v-model="filters.startTime"
                    class="px-3 py-2 rounded-lg border text-sm w-40"
                    :style="{
                      backgroundColor: 'var(--bg-tertiary)',
                      color: 'var(--text-primary)',
                      borderColor: 'var(--border-color)'
                    }"
                  >
                </div>

                <!-- 结束日期 -->
                <div class="relative">
                  <input 
                    type="date" 
                    v-model="filters.endTime"
                    class="px-3 py-2 rounded-lg border text-sm w-40"
                    :style="{
                      backgroundColor: 'var(--bg-tertiary)',
                      color: 'var(--text-primary)',
                      borderColor: 'var(--border-color)'
                    }"
                  >
                </div>

                <!-- 搜索按钮 -->
                <button 
                  @click="handleSearch"
                  class="flex items-center space-x-2 px-4 py-2 text-white rounded-lg text-sm"
                  :style="{
                    backgroundColor: 'var(--accent-color)'
                  }"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                  <span>搜索</span>
                </button>

                <!-- 重置按钮 -->
                <button 
                  @click="resetFilters"
                  class="px-4 py-2 text-sm rounded-lg border"
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
          </div>
        </template>

        <!-- 自定义合成ID列 -->
        <template #column-合成ID="{ item }">
          <div class="flex flex-col">
            <span class="text-sm font-medium text-dark-text">{{ item.taskId || item.id }}</span>
          </div>
        </template>

        <!-- 自定义合成信息列 -->
        <template #column-合成信息="{ item }">
          <div class="flex items-center space-x-3">
            <div>
              <div class="text-sm text-dark-text">
                白品：<span class="text-dark-accent">{{ item.whiteCount || 1 }}</span>
              </div>
              <div class="text-sm text-dark-text">
                图案：<span class="text-dark-accent">{{ item.designCount || 1 }}</span>
              </div>
            </div>
          </div>
        </template>

        <!-- 自定义任务状态列 -->
        <template #column-任务状态="{ item }">
          <TaskStatus :status="item.status" size="sm" />
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
import { ref, onMounted, computed } from 'vue'
import TaskTable from '~/components/TaskTable.vue'
import PodSynthesisNewTaskModal from '~/components/PodSynthesisNewTaskModal.vue'
import PodSynthesisDetailModal from '~/components/PodSynthesisDetailModal.vue'
import TaskStatus from '~/components/TaskStatus.vue'
import { getPodComposerStats, getPodComposerTaskList, getPodComposerTaskDetail } from '~/apis/business/pod-composer'

// 使用 dashboard 布局
definePageMeta({
  layout: 'dashboard'
})

// 状态管理
const loading = ref(false)
const showCreateModal = ref(false)
const showDetailModal = ref(false)
const currentTaskData = ref(null)

// 统计数据
const statsData = ref({
  totalCount: 0,
  successRate: 0,
  inProgressCount: 0,
  todayCount: 0
})

// 计算属性：统计卡片数据
const stats = computed(() => [
  {
    label: '总合成',
    value: statsData.value.totalCount?.toString() || '156',
    iconPath: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    label: '成功率',
    value: `${statsData.value.successRate || 98}%`,
    iconPath: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600'
  },
  {
    label: '进行中',
    value: statsData.value.inProgressCount?.toString() || '45,678',
    iconPath: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-600'
  },
  {
    label: '今日合成',
    value: statsData.value.todayCount?.toString() || '344',
    iconPath: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600'
  }
])

// 表格数据
const tableData = ref([])

// 分页参数
const pagination = ref({
  page: 1,
  limit: 10,
  total: 0,
  pages: 1
})

// 过滤器状态
const filters = ref({
  keyword: '',
  status: '',
  startTime: '',
  endTime: '',
  userId: ''
})

// 获取统计数据
const fetchStats = async () => {
  try {
    const response = await getPodComposerStats()
    if (response.success) {
      statsData.value = response.data || {}
    }
  } catch (error) {
    console.error('获取统计数据失败:', error)
  }
}

// 获取任务列表
const fetchTaskList = async () => {
  try {
    loading.value = true
    const params = {
      page: pagination.value.page,
      limit: pagination.value.limit,
      taskId: filters.value.keyword,
      status: filters.value.status ? parseInt(filters.value.status) : undefined,
      startTime: filters.value.startTime,
      endTime: filters.value.endTime,
      userId: filters.value.userId
    }
    
    console.log('请求POD合成任务列表，参数:', params)
    const response = await getPodComposerTaskList(params)
    console.log('POD合成任务列表响应:', response)
    
    if (response.success) {
      // 处理返回的数据结构
      const taskList = response.data?.records || response.data?.list || []
      
      // 将API数据转换为组件期望的格式
      const formattedTaskList = taskList.map(item => ({
        id: item.taskId || item.id,
        taskId: item.taskId || item.id,
        taskName: item.taskName || item.name,
        name: item.taskName || item.name,
        status: item.status,
        creator: item.creator || item.userId,
        createTime: item.createTime || item.createdAt,
        createdAt: item.createTime || item.createdAt,
        whiteCount: item.whiteCount || 21,
        designCount: item.designCount || 21,
        spuCount: item.spuCount || 67,
        skuCount: item.skuCount || 1293,
        // 保留原始数据
        rawData: item
      }))
      
      tableData.value = formattedTaskList
      
      // 更新分页信息
      pagination.value = {
        page: parseInt(response.data?.current || pagination.value.page),
        limit: parseInt(response.data?.size || pagination.value.limit),
        total: parseInt(response.data?.total || formattedTaskList.length),
        pages: parseInt(response.data?.pages || 1)
      }
      
      console.log('✅ POD合成任务列表数据已格式化:', {
        taskList: formattedTaskList,
        pagination: pagination.value
      })
    }
  } catch (error) {
    console.error('获取POD合成任务列表失败:', error)
    // 在错误情况下显示空数据
    tableData.value = []
  } finally {
    loading.value = false
  }
}

// 时间格式化函数
const formatTime = (time) => {
  if (!time) return '--'
  try {
    return new Date(time).toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  } catch (error) {
    return time
  }
}

// 显示任务详情
const showTaskDetail = async (task) => {
  currentTaskData.value = task
  showDetailModal.value = true
  
  // 获取任务详情数据
  const taskId = task.taskId || task.id
  if (taskId) {
    await fetchTaskDetail(taskId)
  }
}

// 获取任务详情
const fetchTaskDetail = async (taskId) => {
  try {
    const params = {
      taskId,
      page: 1,
      limit: 10
    }
    
    console.log('获取POD合成任务详情，参数:', params)
    const response = await getPodComposerTaskDetail(params)
    console.log('POD合成任务详情响应:', response)
    
    if (response.success) {
      // 处理详情数据并更新到currentTaskData
      const detailList = response.data?.list || []
      currentTaskData.value = {
        ...currentTaskData.value,
        detailList: detailList,
        detailPagination: {
          page: parseInt(response.data?.current || 1),
          limit: parseInt(response.data?.size || 10),
          total: parseInt(response.data?.total || detailList.length),
          pages: parseInt(response.data?.pages || 1)
        }
      }
    }
  } catch (error) {
    console.error('获取POD合成任务详情失败:', error)
  }
}

// 处理任务提交
const handleTaskSubmit = async (formData) => {
  console.log('提交POD合成任务:', formData)
  showCreateModal.value = false
  // 刷新任务列表
  await fetchTaskList()
}

// 处理分页变化
const handlePageChange = (page) => {
  pagination.value.page = page
  fetchTaskList()
}

// 处理每页大小变化
const handlePageSizeChange = (newPageSize) => {
  pagination.value.limit = newPageSize
  pagination.value.page = 1 // 重置到第一页
  fetchTaskList()
}

// 处理筛选变化 - TaskTable组件需要
const handleFilterChange = () => {
  console.log('筛选条件变化:', filters.value)
  // 这里可以添加自动搜索逻辑
}

// 手动搜索
const handleSearch = () => {
  console.log('执行搜索，当前筛选条件:', filters.value)
  pagination.value.page = 1 // 重置到第一页
  fetchTaskList()
}

// 重置过滤器
const resetFilters = () => {
  filters.value = {
    keyword: '',
    status: '',
    startTime: '',
    endTime: '',
    userId: ''
  }
  pagination.value.page = 1
  fetchTaskList()
}

// 处理下载图片
const handleDownloadImages = (images) => {
  console.log('下载图片:', images)
  // 这里添加下载逻辑
}

// 页面加载时获取数据
onMounted(() => {
  fetchStats()
  fetchTaskList()
})
</script>

<style scoped>
.search-button:hover {
  filter: brightness(0.9);
  transition: all 0.2s ease;
}

.create-button:hover {
  filter: brightness(0.9);
  transition: all 0.2s ease;
}
</style>