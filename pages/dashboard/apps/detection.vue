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
      idLabel="检测"
      typeLabel="检测"
      quantityLabel="风险"
      statusLabel="任务"
      newButtonText="新建检测"
      :showType="false"
      @view="showTaskDetail"
      @newTask="showCreateModal = true"
      @page-change="handlePageChange"
      @filter-change="handleFilterChange"
    />
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
    @close="showDetailModal = false"
    @download="handleDownloadResults"
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

// 页面初始化
onMounted(async () => {
  // 并行获取统计数据和任务列表
  await Promise.all([
    fetchStats(),
    fetchTaskList()
  ])
})
</script>

<style scoped>
/* 自定义样式 */
</style>