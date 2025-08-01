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
      idLabel="标题"
      typeLabel="标题"
      quantityLabel="标题"
      statusLabel="任务"
      newButtonText="新建标题"
      :showType="false"
      @view="showTaskDetail"
      @newTask="showCreateModal = true"
      @page-change="handlePageChange"
      @filter-change="handleFilterChange"
    >
        <!-- 自定义搜索栏设计 -->
        <template #custom-filters>
          <div class="p-4 rounded-lg border border-dark-border bg-dark-card">
            <!-- 左右布局：左侧操作按钮，右侧搜索条件 -->
            <div class="flex items-center justify-between">
              <!-- 左侧：新建按钮 -->
              <div class="flex space-x-3">
        <button 
                  @click="showCreateModal = true"
                  class="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  <span>新建标题</span>
                </button>
            </div>

              <!-- 右侧：搜索过滤区域 -->
            <div class="flex items-center space-x-4">
              <!-- 任务ID搜索 -->
              <div class="relative">
                <input 
                  type="text" 
                  v-model="filters.taskId" 
                  @input="handleFilterChange"
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

              <!-- 生成状态筛选 -->
              <div class="relative">
                <select 
                  v-model="filters.status" 
                  @change="handleFilterChange"
                  class="appearance-none px-4 py-2 pr-8 rounded-lg border text-sm min-w-32"
                  :style="{
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    borderColor: 'var(--border-color)'
                  }"
                >
                  <option value="">全部状态</option>
                  <option value="waiting">等待中</option>
                  <option value="processing">生成中</option>
                  <option value="completed">已完成</option>
                  <option value="failed">失败</option>
                </select>
                <svg class="absolute right-2 top-3 w-4 h-4 pointer-events-none" :style="{ color: 'var(--text-secondary)' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>

                            <!-- 开始日期 -->
              <div class="relative">
                <input 
                  type="date" 
                  v-model="filters.startDate" 
                  @change="handleFilterChange"
                  placeholder="开始日期"
                  class="px-4 py-2 rounded-lg border text-sm min-w-40"
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
                  v-model="filters.endDate" 
                  @change="handleFilterChange"
                  placeholder="结束日期"
                  class="px-4 py-2 rounded-lg border text-sm min-w-40"
          :style="{
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    borderColor: 'var(--border-color)'
          }"
        >
              </div>

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
          </div>
      </template>
    </TaskTable>
    </div>
  </div>

  <!-- 新建标题生成任务弹窗 -->
  <TitleGenerationNewTaskModal 
    :isOpen="showCreateModal" 
    @close="showCreateModal = false"
    @submit="handleTaskSubmit"
  />

  <!-- 标题生成任务详情弹窗 -->
  <TitleGenerationDetailModal
    :isOpen="showDetailModal"
    :taskData="currentTaskData"
    :taskInfo="currentTaskInfo"
    @close="showDetailModal = false"
    @download="handleDownloadTitles"
    @page-change="handleDetailPageChange"
  />
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import TaskTable from '~/components/TaskTable.vue'
import TitleGenerationNewTaskModal from '~/components/TitleGenerationNewTaskModal.vue'
import TitleGenerationDetailModal from '~/components/TitleGenerationDetailModal.vue'
import { getTitleGenerationStats, getTitleGenerationTaskList, getTitleGenerationTaskDetail, getTitleGenerationTaskInfo } from '~/apis/business/title-generation'

// 使用 dashboard 布局
definePageMeta({
  layout: 'dashboard'
})

// 控制新建标题生成弹窗显示
const showCreateModal = ref(false)

// 控制详情弹窗显示
const showDetailModal = ref(false)
const currentTaskData = ref({})
const taskDetailData = ref([])
const detailLoading = ref(false)

// 页面加载状态
const loading = ref(false)

// 统计数据
const statsData = ref({
  count: '0',
  successCount: '0',
  failedCount: '0',
  successRate: 0,
  inProgressCount: '0',
  todayCount: '0'
})

// 计算属性：统计卡片数据
const stats = computed(() => [
  {
    label: '总生成',
    value: statsData.value.count,
    iconPath: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    label: '成功率',
    value: `${statsData.value.successRate}%`,
    iconPath: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600'
  },
  {
    label: '进行中',
    value: statsData.value.inProgressCount,
    iconPath: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-600'
  },
  {
    label: '今日生成',
    value: statsData.value.todayCount,
    iconPath: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600'
  }
])

// 表格数据
const tableData = ref([])

// 分页参数
const pageParams = ref({
  page: 1,
  limit: 10
})

// 筛选参数
const filterParams = ref({
  taskId: '',
  status: '',
  startTime: '',
  endTime: '',
  userId: ''
})

// 表单筛选器状态
const filters = ref({
  taskId: '',
  status: '',
  startDate: '',
  endDate: ''
})

// 当前任务信息（用于详情弹窗）
const currentTaskInfo = ref(null)

// 重置筛选条件
const resetFilters = () => {
  filters.value = {
    taskId: '',
    status: '',
    startDate: '',
    endDate: ''
  }
  // 更新filterParams并重新获取数据
  filterParams.value = {
    taskId: filters.value.taskId || '',
    status: filters.value.status || '',
    startTime: filters.value.startDate || '',
    endTime: filters.value.endDate || '',
    userId: ''
  }
  pageParams.value.page = 1
  fetchTaskList()
}

// 获取统计数据
const fetchStats = async () => {
  try {
    const response = await getTitleGenerationStats()
    if (response.success) {
      // 根据新的API返回结构映射统计数据
      const data = response.data
      statsData.value = {
        count: data.count || '0',
        successCount: data.successCount || '0', 
        failedCount: data.failedCount || '0',
        successRate: data.successRate || 0,
        inProgressCount: data.inProgressCount || '0',
        todayCount: data.todayCount || '0'
      }
    }
  } catch (error) {
    console.error('获取标题生成统计数据失败:', error)
  }
}

// 获取任务列表
const fetchTaskList = async () => {
  try {
    loading.value = true
    const params = {
      ...pageParams.value,
      ...filterParams.value
    }
    const response = await getTitleGenerationTaskList(params)
    if (response.success) {
      // 根据新的API返回结构映射数据字段到表格需要的格式
      const rawList = response.data?.list || response.data?.creatorList || []
      tableData.value = rawList.map(item => ({
        id: item.taskId || item.id,
        生图ID: item.taskId || item.id,
        目标: item.size || item.targetCount || '100',
        成功: item.current || item.successCount || '1',
        失败: '0', // 根据接口文档，暂时设为0
        任务状态: getStatusText(item.status),
        创建人: item.creatorId || item.creator || item.createBy,
        创建时间: item.createTime || item.createdAt,
        // 保留原始数据以备后用
        _raw: item
      }))
    }
  } catch (error) {
    console.error('获取标题生成任务列表失败:', error)
  } finally {
    loading.value = false
  }
}

// 状态文本转换
const getStatusText = (status) => {
  const statusMap = {
    0: '进行中',
    1: '已完成',
    2: '失败',
    3: '暂停'
  }
  return statusMap[status] || '未知'
}

// 查看任务详情
const showTaskDetail = async (item) => {
  // 设置当前任务数据，包含详情数据结构
  currentTaskData.value = {
    ...item,
    detailList: [], // 初始化为空数组
    detailPagination: {
      page: 1,
      limit: 10,
      total: 0
    },
    taskInfo: null // 任务统计信息
  }
  
  showDetailModal.value = true
  
  // 获取详情数据，使用 taskId 或 id
  const taskId = item.id || item.生图ID || item._raw?.taskId || item._raw?.id
  if (taskId) {
    // 并行获取任务详情列表和任务统计信息
    await Promise.all([
      fetchTaskDetail(taskId),
      fetchTaskInfo(taskId)
    ])
  }
}

// 获取任务详情
const fetchTaskDetail = async (taskId) => {
  try {
    detailLoading.value = true
    const params = {
      taskId,  // 使用 taskId 作为路径参数
      page: currentTaskData.value.detailPagination?.page || 1,
      limit: currentTaskData.value.detailPagination?.limit || 10
    }
    console.log('获取标题生成任务详情，参数:', params)
    const response = await getTitleGenerationTaskDetail(params)
    console.log('标题生成任务详情响应:', response)
    
    if (response.success) {
      // 根据新的API返回结构处理详情数据
      const detailList = response.data?.data || response.data?.list || []
      
      // 更新当前任务数据中的详情信息
      currentTaskData.value = {
        ...currentTaskData.value,
        detailList: detailList,
        detailPagination: {
          page: params.page,
          limit: params.limit,
          total: response.data?.total || detailList.length
        }
      }
      
      // 同时更新taskDetailData以保持兼容性
      taskDetailData.value = detailList
    }
  } catch (error) {
    console.error('获取标题生成任务详情失败:', error)
  } finally {
    detailLoading.value = false
  }
}

// 获取任务统计信息
const fetchTaskInfo = async (taskId) => {
  try {
    console.log('获取标题生成任务信息，taskId:', taskId)
    const response = await getTitleGenerationTaskInfo(taskId)
    console.log('标题生成任务信息响应:', response)
    
    if (response.success) {
      // 更新当前任务数据中的统计信息
      currentTaskData.value = {
        ...currentTaskData.value,
        taskInfo: response.data
      }
    }
  } catch (error) {
    console.error('获取标题生成任务信息失败:', error)
  }
}

// 处理详情页面变化
const handleDetailPageChange = async (pagination) => {
  console.log('标题生成详情页面变化:', pagination)
  
  // 更新当前任务数据的分页信息
  currentTaskData.value.detailPagination = {
    ...currentTaskData.value.detailPagination,
    ...pagination
  }
  
  // 重新获取详情数据
  const taskId = currentTaskData.value.id || currentTaskData.value.生图ID || currentTaskData.value._raw?.taskId || currentTaskData.value._raw?.id
  if (taskId) {
    await fetchTaskDetail(taskId)
  }
}

// 事件处理函数
const handleFilterChange = (filters) => {
  console.log('筛选条件变化:', filters)
  filterParams.value = { ...filterParams.value, ...filters }
  pageParams.value.page = 1 // 重置到第一页
  fetchTaskList()
}

const handlePageChange = (page) => {
  console.log('分页变化:', page)
  pageParams.value.page = page
  fetchTaskList()
}

// 处理新建标题生成任务提交
const handleTaskSubmit = async (formData) => {
  console.log('新建标题生成任务:', formData)
  
  try {
    // 关闭弹窗
    showCreateModal.value = false
    
    // 无论任务创建成功还是失败，都要刷新数据
    await Promise.all([
      fetchStats(),
      fetchTaskList()
    ])
    
    // 检查任务创建结果并显示相应提示
    if (formData.success && formData.taskResponse) {
      console.log('标题生成任务创建成功，响应数据:', formData.taskResponse)
      console.log('标题生成任务创建成功，数据已刷新')
      
    } else {
      console.error('标题生成任务创建失败:', formData.error || '未知错误')
    }
    
  } catch (error) {
    console.error('处理标题生成任务提交失败:', error)
    // 即使出错也要关闭弹窗
  showCreateModal.value = false
}
}

// 处理标题下载
const handleDownloadTitles = (titles) => {
  console.log('下载标题生成结果:', titles)
  // 实际应用中应该调用下载API
}

// 页面初始化
onMounted(() => {
  // 立即显示页面，后台异步获取数据（不等待完成）
  Promise.all([
    fetchStats(),
    fetchTaskList()
  ]).catch(error => {
    console.error('数据加载失败:', error)
  })
})
</script>
