<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
    <div class="bg-dark-card rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto text-dark-text">
      <!-- 弹窗头部 -->
      <div class="p-5 border-b border-dark-border flex justify-between items-center">
        <h3 class="font-medium text-dark-text">裁图详情 <span class="text-gray-400 text-sm">任务ID：{{ taskData?.id || taskData?.裁图ID || 'N/A' }}</span></h3>
        <button @click="close" class="text-gray-400 hover:text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <!-- 弹窗内容 -->
      <div class="p-6">
        <!-- 统计卡片 -->
        <div class="grid grid-cols-3 gap-4 mb-6">
          <div class="bg-dark-input rounded-md p-4">
            <div class="text-sm text-gray-400 mb-1">目标数</div>
            <div class="font-medium text-blue-400">{{ taskData?.cropperNum || taskData?.目标 || 0 }}</div>
          </div>
          <div class="bg-dark-input rounded-md p-4">
            <div class="text-sm text-gray-400 mb-1">成功数</div>
            <div class="font-medium text-green-400">{{ taskData?.cropperSuccessNum || taskData?.成功 || 0 }}</div>
          </div>
          <div class="bg-dark-input rounded-md p-4">
            <div class="text-sm text-gray-400 mb-1">失败数</div>
            <div class="font-medium text-red-400">{{ taskData?.cropperFailNum || taskData?.失败 || 0 }}</div>
          </div>
        </div>
        
        <!-- 筛选区域 -->
        <div class="flex mb-4">
          <div class="relative">
            <button @click="showStatusDropdown = !showStatusDropdown" class="px-3 py-2 bg-dark-input border border-dark-border rounded-md flex items-center">
              {{ selectedStatus }}
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div v-if="showStatusDropdown" class="absolute mt-1 w-40 bg-dark-card border border-dark-border rounded-md shadow-lg z-10">
              <div class="py-1">
                <a href="#" @click.prevent="filterByStatus('全部')" class="block px-4 py-2 text-sm text-dark-text hover:bg-dark-hover">全部</a>
                <a href="#" @click.prevent="filterByStatus('待执行')" class="block px-4 py-2 text-sm text-dark-text hover:bg-dark-hover">待执行</a>
                <a href="#" @click.prevent="filterByStatus('进行中')" class="block px-4 py-2 text-sm text-dark-text hover:bg-dark-hover">进行中</a>
                <a href="#" @click.prevent="filterByStatus('已完成')" class="block px-4 py-2 text-sm text-dark-text hover:bg-dark-hover">已完成</a>
                <a href="#" @click.prevent="filterByStatus('部分失败')" class="block px-4 py-2 text-sm text-dark-text hover:bg-dark-hover">部分失败</a>
                <a href="#" @click.prevent="filterByStatus('失败')" class="block px-4 py-2 text-sm text-dark-text hover:bg-dark-hover">失败</a>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 详情表格 -->
        <div class="overflow-hidden rounded-lg border border-dark-border">
          <table class="min-w-full divide-y divide-dark-border">
            <thead class="bg-dark-input">
              <tr>
                <th class="px-6 py-3 text-left">
                  <input type="checkbox" class="rounded border-gray-300" v-model="selectAll" @change="toggleSelectAll">
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-dark-text-secondary uppercase tracking-wider">序号</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-dark-text-secondary uppercase tracking-wider">原图</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-dark-text-secondary uppercase tracking-wider">裁剪图</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-dark-text-secondary uppercase tracking-wider">状态</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-dark-text-secondary uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody class="bg-dark-card divide-y divide-dark-border">
              <tr v-for="(item, index) in paginatedDetailList" :key="index" class="hover:bg-dark-hover">
                <td class="px-6 py-4">
                  <input type="checkbox" class="rounded border-gray-300" v-model="selectedItems" :value="item.id">
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-dark-text">{{ index + 1 }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="w-20 h-20 bg-dark-hover rounded-md overflow-hidden">
                    <OptimizedImage 
                      v-if="item.imageUrl || item.originalImage" 
                      :src="item.imageUrl || item.originalImage" 
                      :alt="item.fileName || '原图'" 
                      container-class="w-full h-full"
                      image-class="w-full h-full object-cover"
                      :zoomable="true"
                      :lazy="false"
                    />
                    <div v-else class="w-full h-full bg-dark-hover flex items-center justify-center">
                      <span class="text-xs text-gray-500">无图片</span>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="w-20 h-20 bg-dark-hover rounded-md overflow-hidden">
                    <OptimizedImage 
                      v-if="item.croppedImage || item.cropUrl || item.resultUrl" 
                      :src="item.croppedImage || item.cropUrl || item.resultUrl" 
                      :alt="item.fileName || '裁剪图'" 
                      container-class="w-full h-full"
                      image-class="w-full h-full object-cover"
                      :zoomable="true"
                      :lazy="false"
                    />
                    <div v-else class="w-full h-full bg-dark-hover flex items-center justify-center">
                      <span class="text-xs text-gray-500">无图片</span>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <TaskStatus :status="item.status" size="sm" />
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-dark-text">
                  <a href="#" class="text-green-500 hover:underline" @click.prevent="downloadImage(item)">下载图片</a>
                </td>
              </tr>
              
              <!-- 无数据展示 -->
              <tr v-if="filteredDetailList.length === 0">
                <td colspan="6" class="py-8 text-center text-sm text-dark-text-secondary">
                  暂无数据
                </td>
              </tr>
            </tbody>
          </table>
          
          <!-- 分页 -->
          <div class="px-6 py-4 flex items-center justify-between border-t border-dark-border bg-dark-card">
            <div class="flex items-center space-x-4">
              <div class="text-sm text-dark-text-secondary">
                共 {{ filteredDetailList.length }} 条记录
              </div>
              <div class="flex items-center space-x-2">
                <span class="text-sm text-dark-text-secondary">每页显示</span>
                <select 
                  v-model="pagination.pageSize"
                  @change="handlePageSizeChange"
                  class="px-2 py-1 text-sm rounded border bg-dark-input border-dark-border text-dark-text"
                >
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
                <span class="text-sm text-dark-text-secondary">条</span>
              </div>
            </div>
            
            <div class="flex items-center space-x-2">
              <button 
                @click="goToPage(1)"
                :disabled="pagination.currentPage === 1"
                class="px-3 py-1 text-sm rounded border border-dark-border text-dark-text disabled:opacity-50 disabled:cursor-not-allowed hover:bg-dark-hover"
              >
                首页
              </button>
              <button 
                @click="goToPage(pagination.currentPage - 1)"
                :disabled="pagination.currentPage === 1"
                class="px-3 py-1 text-sm rounded border border-dark-border text-dark-text disabled:opacity-50 disabled:cursor-not-allowed hover:bg-dark-hover"
              >
                上一页
              </button>
              
              <span class="px-3 py-1 text-sm bg-green-600 text-white rounded">
                {{ pagination.currentPage }}
              </span>
              
              <button 
                @click="goToPage(pagination.currentPage + 1)"
                :disabled="pagination.currentPage === totalPages"
                class="px-3 py-1 text-sm rounded border border-dark-border text-dark-text disabled:opacity-50 disabled:cursor-not-allowed hover:bg-dark-hover"
              >
                下一页
              </button>
              <button 
                @click="goToPage(totalPages)"
                :disabled="pagination.currentPage === totalPages"
                class="px-3 py-1 text-sm rounded border border-dark-border text-dark-text disabled:opacity-50 disabled:cursor-not-allowed hover:bg-dark-hover"
              >
                末页
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 弹窗底部 -->
      <div class="p-5 border-t border-dark-border flex justify-end space-x-3">
        <button @click="close" class="px-4 py-2 border border-dark-border rounded-md text-gray-400 hover:bg-dark-hover">关闭</button>
        <button @click="exportSelected" class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">导出详情</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits, watch } from 'vue'
import OptimizedImage from '~/components/OptimizedImage.vue'
import TaskStatus from '~/components/TaskStatus.vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  taskData: {
    type: Object,
    default: () => ({})
  }
})

const emits = defineEmits(['close', 'download', 'page-change'])

// 筛选器状态
const selectedStatus = ref('全部')
const showStatusDropdown = ref(false)

// 选中项
const selectAll = ref(false)
const selectedItems = ref([])

// 分页状态
const pagination = ref({
  currentPage: 1,
  pageSize: 10
})

// 模拟详情数据（从props传入）
const detailList = ref([])

// 监听弹窗状态变化
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    // 重置状态
    pagination.value.currentPage = 1
    selectedItems.value = []
    selectAll.value = false
    selectedStatus.value = '全部'
    showStatusDropdown.value = false
    
    // 如果有任务数据，使用任务数据中的详情列表
    if (props.taskData?.detailList) {
      console.log('裁图详情弹窗接收到的数据:', props.taskData.detailList)
      detailList.value = props.taskData.detailList
    }
  }
})

// 监听任务数据变化
watch(() => props.taskData?.detailList, (newDetailList) => {
  if (newDetailList && newDetailList.length > 0) {
    console.log('裁图详情数据更新:', newDetailList)
    detailList.value = newDetailList
  }
}, { deep: true, immediate: true })

// 根据筛选条件过滤数据
const filteredDetailList = computed(() => {
  let result = [...detailList.value]
  
  if (selectedStatus.value !== '全部') {
    // 将状态文本映射为数字进行比较
    const statusMap = {
      '待执行': 0,
      '进行中': 1,
      '已完成': 2,
      '部分失败': 3,
      '失败': 4
    }
    const statusValue = statusMap[selectedStatus.value]
    if (statusValue !== undefined) {
      result = result.filter(item => item.status === statusValue)
    }
  }
  
  return result
})

// 计算总页数
const totalPages = computed(() => {
  return Math.ceil(filteredDetailList.value.length / pagination.value.pageSize)
})

// 分页后的数据
const paginatedDetailList = computed(() => {
  const start = (pagination.value.currentPage - 1) * pagination.value.pageSize
  const end = start + pagination.value.pageSize
  return filteredDetailList.value.slice(start, end)
})



// 切换全选
const toggleSelectAll = () => {
  paginatedDetailList.value.forEach(item => {
    item.selected = selectAll.value
  })
}

// 监听单个选择变化
watch(paginatedDetailList, () => {
  selectAll.value = paginatedDetailList.value.length > 0 && paginatedDetailList.value.every(item => item.selected)
}, { deep: true })

// 按状态筛选
const filterByStatus = (status) => {
  selectedStatus.value = status
  showStatusDropdown.value = false
  pagination.value.currentPage = 1
}

// 分页操作
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    pagination.value.currentPage = page
    emits('page-change', { page })
  }
}

// 页面大小变化
const handlePageSizeChange = () => {
  pagination.value.currentPage = 1
}

// 下载图片
const downloadImage = (item) => {
  const imageUrl = item.croppedImage || item.cropUrl || item.resultUrl || item.imageUrl
  if (imageUrl) {
    const link = document.createElement('a')
    link.href = imageUrl
    link.download = `cropped_image_${item.id || Date.now()}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

// 导出选中项
const exportSelected = () => {
  const selected = paginatedDetailList.value.filter(item => item.selected)
  console.log('导出选中项:', selected)
  // 这里可以添加导出逻辑
}

// 关闭弹窗
const close = () => {
  emits('close')
}
</script>

<style scoped>
/* 确保容器具有正确的尺寸 */
img {
  display: block;
  max-width: 100%;
  height: auto;
}
</style>