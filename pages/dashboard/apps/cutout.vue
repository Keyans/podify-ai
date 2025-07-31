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
      idLabel="抠图"
      typeLabel="抠图"
      quantityLabel="抠图"
      statusLabel="任务"
      newButtonText="新建抠图"
      :showType="false"
      @view="showTaskDetail"
      @newTask="showCreateModal = true"
      @page-change="handlePageChange"
      @filter-change="handleFilterChange"
    >
    </TaskTable>
  </div>

  <!-- 新建抠图任务弹窗 -->
  <CutoutNewTaskModal 
    :isOpen="showCreateModal" 
    @close="showCreateModal = false"
    @submit="handleTaskSubmit"
  />

  <!-- 抠图任务详情弹窗 -->
  <CutoutDetailModal
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
import CutoutNewTaskModal from '~/components/CutoutNewTaskModal.vue'
import CutoutDetailModal from '~/components/CutoutDetailModal.vue'
import { getMattingStats, getMattingTaskList, getMattingTaskDetail } from '~/apis/business/matting'

// 使用 dashboard 布局
definePageMeta({
  layout: 'dashboard'
})

// 控制新建抠图弹窗显示
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
    label: '总抠图数',
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
    label: '今日抠图',
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
    const response = await getMattingStats()
    if (response.success) {
      statsData.value = response.data
    }
  } catch (error) {
    console.error('获取抠图统计数据失败:', error)
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
    const response = await getMattingTaskList(params)
    if (response.success) {
      // 映射数据字段到表格需要的格式
      const rawList = response.data?.mattingTaskList || response.data?.list || []
      tableData.value = rawList.map(item => ({
        id: item.mattingId || item.taskId,
        抠图ID: item.mattingId || item.taskId,
        目标: item.mattingNum || item.targetCount,
        成功: item.mattingSuccessNum || item.successCount,
        失败: item.mattingFailNum || item.failedCount,
        任务状态: getStatusText(item.mattingStatus || item.status),
        创建人: item.createBy || item.creator,
        // 保留原始数据字段，供详情弹窗使用
        mattingNum: item.mattingNum,
        mattingSuccessNum: item.mattingSuccessNum,
        mattingFailNum: item.mattingFailNum,
        mattingStatus: item.mattingStatus,
        mattingId: item.mattingId,
        _raw: item, // 保存完整的原始数据
        创建时间: item.createTime || item.createdAt,
        // 保留原始数据以备后用
        _raw: item
      }))
    }
  } catch (error) {
    console.error('获取抠图任务列表失败:', error)
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
  // 从列表数据中获取统计信息
  const mattingNum = item.mattingNum || item._raw?.mattingNum || 0
  const mattingSuccessNum = item.mattingSuccessNum || item._raw?.mattingSuccessNum || 0
  const mattingFailNum = item.mattingFailNum || item._raw?.mattingFailNum || 0
  
  currentTaskData.value = {
    ...item,
    // 映射统计数据
    targetCount: mattingNum,
    successCount: mattingSuccessNum,
    failedCount: mattingFailNum,
    // 详情列表数据
    detailList: [], // 初始化为空数组
    detailPagination: {
      page: 1,
      limit: 10,
      total: 0
    }
  }
  
  showDetailModal.value = true
  
  // 获取详情数据，使用 mattingId 或 taskId
  const taskId = item.mattingId || item.id || item.抠图ID || item._raw?.mattingId || item._raw?.taskId
  console.log('获取详情数据，任务ID:', taskId, '原始数据:', item)
  if (taskId) {
    await fetchTaskDetail(taskId)
  } else {
    console.warn('无法获取有效的任务ID', item)
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
    console.log('获取抠图任务详情，参数:', params)
    const response = await getMattingTaskDetail(params)
    console.log('抠图任务详情响应:', response)
    
    if (response.success) {
      // 根据实际返回的数据结构处理
      const detailList = response.data?.mattingList || response.data?.list || response.data?.mattingTaskList || []
      
      // 处理详情列表数据，映射字段名
      const processedDetailList = detailList.map((item, index) => ({
        ...item,
        id: item.id || `matting_${index}`,
        originalImage: item.imageUrl,  // 原图
        cutoutImage: item.resultsImageUrl,  // 抠图结果
        resultUrl: item.resultsImageUrl,    // 结果图URL
        imageUrl: item.imageUrl,            // 保持原字段
        resultsImageUrl: item.resultsImageUrl, // 保持原字段
        status: item.status || 0  // 状态：0-处理中，1-成功，2-失败
      }))
      
      // 更新当前任务数据中的详情信息
      currentTaskData.value = {
        ...currentTaskData.value,
        detailList: processedDetailList,
        detailPagination: {
          page: params.page,
          limit: params.limit,
          total: response.data?.total || processedDetailList.length
        }
      }
      
      // 同时更新taskDetailData以保持兼容性
      taskDetailData.value = processedDetailList
    }
  } catch (error) {
    console.error('获取抠图任务详情失败:', error)
  } finally {
    detailLoading.value = false
  }
}

// 处理详情页面变化
const handleDetailPageChange = async (pagination) => {
  console.log('抠图详情页面变化:', pagination)
  
  // 更新当前任务数据的分页信息
  currentTaskData.value.detailPagination = {
    ...currentTaskData.value.detailPagination,
    ...pagination
  }
  
  // 重新获取详情数据
  const taskId = currentTaskData.value.id || currentTaskData.value.抠图ID || currentTaskData.value._raw?.mattingId || currentTaskData.value._raw?.taskId
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

// 处理新建抠图任务提交
const handleTaskSubmit = async (formData) => {
  console.log('新建抠图任务:', formData)
  
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
      console.log('抠图任务创建成功，响应数据:', formData.taskResponse)
      console.log('抠图任务创建成功，数据已刷新')
      
      // 可以在这里添加成功提示
      // ElMessage.success('抠图任务创建成功')
      
    } else {
      console.error('抠图任务创建失败:', formData.error || '未知错误')
      
      // 可以在这里添加错误提示
      // ElMessage.error(formData.error || '抠图任务创建失败')
    }
    
  } catch (error) {
    console.error('处理抠图任务提交失败:', error)
    // 即使出错也要关闭弹窗
    showCreateModal.value = false
  }
}

// 处理图片下载
const handleDownloadImages = (images) => {
  console.log('下载抠图结果:', images)
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