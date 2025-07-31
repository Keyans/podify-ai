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
      idLabel="裂变"
      typeLabel="裂变"
      quantityLabel="裂变"
      statusLabel="任务"
      newButtonText="新建裂变"
      :showType="false"
      @view="showTaskDetail"
      @newTask="showCreateModal = true"
      @page-change="handlePageChange"
      @filter-change="handleFilterChange"
    ></TaskTable>
  </div>

  <!-- 新建裂变任务弹窗 -->
  <TransformNewTaskModal 
    :isOpen="showCreateModal" 
    @close="showCreateModal = false"
    @submit="handleTaskSubmit"
  />

  <!-- 裂变任务详情弹窗 -->
  <TransformDetailModal
    :isOpen="showDetailModal"
    :taskData="currentTaskData"
    @close="showDetailModal = false"
    @download="handleDownloadImages"
    @page-change="handleDetailPageChange"
  />
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import TaskTable from '~/components/TaskTable.vue'
import TransformNewTaskModal from '~/components/TransformNewTaskModal.vue'
import TransformDetailModal from '~/components/TransformDetailModal.vue'
import { getFissionStats, getFissionTaskList, getFissionTaskDetail } from '~/apis/business/fission'

// 使用 dashboard 布局
definePageMeta({
  layout: 'dashboard'
})

// 控制新建裂变弹窗显示
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
    label: '总裂变数',
    value: statsData.value.count,
    iconPath: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
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
    label: '处理中',
    value: statsData.value.inProgressCount,
    iconPath: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-600'
  },
  {
    label: '今日裂变',
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
    const response = await getFissionStats()
    if (response.success) {
      statsData.value = response.data
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
      ...pageParams.value,
      ...filterParams.value
    }
    const response = await getFissionTaskList(params)
    if (response.success) {
      // 映射数据字段到表格需要的格式
      const rawList = response.data?.fissionTaskList || []
      tableData.value = rawList.map(item => ({
        id: item.fissionId,
        裂变ID: item.fissionId,
        目标: item.fissionNum,
        成功: item.fissionSuccessNum,
        失败: item.fissionFailNum,
        任务状态: getStatusText(item.fissionStatus),
        创建人: item.createBy,
        创建时间: item.createTime,
        // 保留原始数据以备后用
        _raw: item
      }))
    }
  } catch (error) {
    console.error('获取任务列表失败:', error)
  } finally {
    loading.value = false
  }
}

// 状态文本转换
const getStatusText = (status) => {
  const statusMap = {
    0: '待执行',
    1: '进行中',
    2: '已完成',
    3: '部分失败',
    4: '失败'
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
    }
  }
  
  showDetailModal.value = true
  
  // 获取详情数据，使用 taskId (对应裂变ID)
  const taskId = item.id || item.裂变ID || item._raw?.fissionId || item._raw?.taskId
  if (taskId) {
    await fetchTaskDetail(taskId)
  }
}

// 获取任务详情
const fetchTaskDetail = async (taskId) => {
  try {
    detailLoading.value = true
    const params = {
      taskId,  // 使用 taskId 作为参数名
      page: currentTaskData.value.detailPagination?.page || 1,
      limit: currentTaskData.value.detailPagination?.limit || 10
    }
    console.log('获取任务详情，参数:', params)
    const response = await getFissionTaskDetail(params)
    console.log('任务详情响应:', response)
    
    if (response.success) {
      // 根据实际返回的数据结构处理
      const detailList = response.data?.fissionList || response.data?.list || []
      
      // 将API数据转换为组件期望的格式
      const formattedDetailList = detailList.map(item => ({
        id: item.fissionId,
        fissionId: item.fissionId,
        imageUrl: item.imageUrl,
        originalImage: item.imageUrl,
        fissionUrl: item.resultsImageUrl,
        fissionedImage: item.resultsImageUrl,
        status: item.status,
        fissionStatus: item.status,
        // 保留原始数据
        rawData: item
      }))
      
      // 更新当前任务数据中的详情信息
      currentTaskData.value = {
        ...currentTaskData.value,
        detailList: formattedDetailList,
        detailPagination: {
          page: parseInt(response.data?.current || params.page),
          limit: parseInt(response.data?.size || params.limit),
          total: parseInt(response.data?.total || formattedDetailList.length),
          pages: parseInt(response.data?.pages || 1)
        }
      }
      
      // 同时更新taskDetailData以保持兼容性
      taskDetailData.value = formattedDetailList
      
      console.log('✅ 任务详情数据已格式化:', {
        detailList: formattedDetailList,
        pagination: currentTaskData.value.detailPagination
      })
    }
  } catch (error) {
    console.error('获取任务详情失败:', error)
  } finally {
    detailLoading.value = false
  }
}

// 处理详情页面变化
const handleDetailPageChange = async (pagination) => {
  console.log('详情页面变化:', pagination)
  
  // 更新当前任务数据的分页信息
  currentTaskData.value.detailPagination = {
    ...currentTaskData.value.detailPagination,
    ...pagination
  }
  
  // 重新获取详情数据
  const taskId = currentTaskData.value.id || currentTaskData.value.裂变ID || currentTaskData.value._raw?.fissionId || currentTaskData.value._raw?.taskId
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

// 处理新建裂变任务提交
const handleTaskSubmit = async (formData) => {
  console.log('新建裂变任务:', formData)
  
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
      console.log('任务创建成功，响应数据:', formData.taskResponse)
      console.log('任务创建成功，数据已刷新')
      
      // 可以在这里添加成功提示
      // ElMessage.success('任务创建成功')
      
    } else {
      console.error('任务创建失败:', formData.error || '未知错误')
      
      // 可以在这里添加错误提示
      // ElMessage.error(formData.error || '任务创建失败')
    }
    
  } catch (error) {
    console.error('处理任务提交失败:', error)
    // 即使出错也要关闭弹窗
    showCreateModal.value = false
  }
}

// 处理下载图片
const handleDownloadImages = (images) => {
  console.log('下载图片:', images)
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
/* 页面特定样式 */
</style>