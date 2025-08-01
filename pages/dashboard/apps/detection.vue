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
        idLabel="检测"
        typeLabel="检测"
        quantityLabel="检测"
        statusLabel="任务"
        newButtonText="新建检测"
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
                  <span>新建检测</span>
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

              <!-- 检测状态筛选 -->
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
                  <option value="processing">检测中</option>
                  <option value="completed">已完成</option>
                  <option value="failed">失败</option>
                </select>
                <svg class="absolute right-2 top-3 w-4 h-4 pointer-events-none" :style="{ color: 'var(--text-secondary)' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>

              <!-- 风险等级筛选 -->
              <div class="relative">
                <select 
                  v-model="filters.riskLevel"
                  @change="handleFilterChange"
                  class="appearance-none px-4 py-2 pr-8 rounded-lg border text-sm min-w-32"
                  :style="{
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    borderColor: 'var(--border-color)'
                  }"
                >
                  <option value="">全部风险</option>
                  <option value="high">高风险</option>
                  <option value="medium">中风险</option>
                  <option value="low">低风险</option>
                  <option value="safe">安全</option>
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

  <!-- 新建侵权检测任务弹窗 -->
  <DetectionNewTaskModal 
    :isOpen="showCreateModal" 
    @close="showCreateModal = false"
    @submit="handleTaskSubmit"
  />

  <!-- 侵权检测任务详情弹窗 -->
  <DetectionDetailModal
    :isOpen="showDetailModal"
    :taskData="currentTaskData"
    :taskInfo="currentTaskInfo"
    @close="showDetailModal = false"
    @download="handleDownloadImages"
    @page-change="handleDetailPageChange"
  />
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import TaskTable from '~/components/TaskTable.vue'
import DetectionNewTaskModal from '~/components/DetectionNewTaskModal.vue'
import DetectionDetailModal from '~/components/DetectionDetailModal.vue'
import { getDetectionStats, getDetectionTaskList, getDetectionTaskDetail, getDetectionTaskInfo } from '~/apis/business/detection'

// 使用 dashboard 布局
definePageMeta({
  layout: 'dashboard'
})

// 控制新建检测弹窗显示
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
    label: '总检测数',
    value: statsData.value.count,
    iconPath: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
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
    label: '今日检测',
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
  riskLevel: '',
  startDate: '',
  endDate: ''
})

// 当前任务信息（用于详情弹窗）
const currentTaskInfo = ref(null)

// 获取统计数据
const fetchStats = async () => {
  try {
    const response = await getDetectionStats()
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
    console.error('获取侵权检测统计数据失败:', error)
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
    const response = await getDetectionTaskList(params)
    if (response.success) {
      // 根据新的API返回结构映射数据字段到表格需要的格式
      const rawList = response.data?.list || response.data?.creatorList || []
      tableData.value = rawList.map(item => ({
        id: item.taskId || item.id,
        检测ID: item.taskId || item.id,
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
    console.error('获取侵权检测任务列表失败:', error)
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
  const taskId = item.id || item.检测ID || item._raw?.taskId || item._raw?.id
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
    console.log('获取侵权检测任务详情，参数:', params)
    const response = await getDetectionTaskDetail(params)
    console.log('侵权检测任务详情响应:', response)
    
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
    console.error('获取侵权检测任务详情失败:', error)
  } finally {
    detailLoading.value = false
  }
}

// 获取任务统计信息
const fetchTaskInfo = async (taskId) => {
  try {
    console.log('获取侵权检测任务信息，taskId:', taskId)
    const response = await getDetectionTaskInfo(taskId)
    console.log('侵权检测任务信息响应:', response)
    
    if (response.success) {
      // 更新当前任务数据中的统计信息
      currentTaskData.value = {
        ...currentTaskData.value,
        taskInfo: response.data
  }
}
  } catch (error) {
    console.error('获取侵权检测任务信息失败:', error)
}
}

// 处理详情页面变化
const handleDetailPageChange = async (pagination) => {
  console.log('侵权检测详情页面变化:', pagination)
  
  // 更新当前任务数据的分页信息
  currentTaskData.value.detailPagination = {
    ...currentTaskData.value.detailPagination,
    ...pagination
  }
  
  // 重新获取详情数据
  const taskId = currentTaskData.value.id || currentTaskData.value.检测ID || currentTaskData.value._raw?.taskId || currentTaskData.value._raw?.id
  if (taskId) {
    await fetchTaskDetail(taskId)
  }
}

// 事件处理函数
const handleFilterChange = (newFilters) => {
  console.log('筛选条件变化:', newFilters)
  // 如果传入了新的筛选条件，更新filters
  if (newFilters) {
    filters.value = { ...filters.value, ...newFilters }
  }
  
  // 将filters映射到filterParams
  filterParams.value = {
    taskId: filters.value.taskId || '',
    status: filters.value.status || '',
    startTime: filters.value.startDate || '',
    endTime: filters.value.endDate || '',
    userId: ''
  }
  
  pageParams.value.page = 1 // 重置到第一页
  fetchTaskList()
}

const handlePageChange = (page) => {
  console.log('分页变化:', page)
  pageParams.value.page = page
  fetchTaskList()
}

// 处理新建侵权检测任务提交
const handleTaskSubmit = async (formData) => {
  console.log('新建侵权检测任务:', formData)
  
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
      console.log('侵权检测任务创建成功，响应数据:', formData.taskResponse)
      console.log('侵权检测任务创建成功，数据已刷新')
      
    } else {
      console.error('侵权检测任务创建失败:', formData.error || '未知错误')
    }
    
  } catch (error) {
    console.error('处理侵权检测任务提交失败:', error)
    // 即使出错也要关闭弹窗
    showCreateModal.value = false
  }
}

// 处理结果下载
const handleDownloadResults = (results) => {
  console.log('下载侵权检测结果:', results)
  // 实际应用中应该调用下载API
}

// 处理图片下载（详情弹窗中使用）
const handleDownloadImages = (images) => {
  console.log('下载侵权检测图片:', images)
  // 实际应用中应该调用下载API
}

// 重置筛选条件
const resetFilters = () => {
  filters.value = {
    taskId: '',
    status: '',
    riskLevel: '',
    startDate: '',
    endDate: ''
  }
  handleFilterChange()
}

// 页面初始化
// 使用页面刷新组合式函数
const refreshPageData = () => {
  Promise.all([
    fetchStats(),
    fetchTaskList()
  ]).catch(error => {
    console.error('强制刷新数据加载失败:', error)
  })
}

usePageRefresh(refreshPageData, '/dashboard/apps/detection')

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

<style scoped>
/* 自定义样式 */
</style>