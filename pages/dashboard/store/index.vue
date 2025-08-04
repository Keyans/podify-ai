<template>
  <div class="h-full flex">
    <!-- 左侧平台列表 -->
    <div class="w-64 bg-dark-card border-r border-dark-border flex-shrink-0">
      <div class="p-6">
        <h3 class="text-lg font-medium text-dark-text mb-4">概览</h3>
        
        <!-- 平台列表 -->
        <div class="space-y-2">
          <div 
            v-for="platform in platformList" 
            :key="platform.key"
            class="flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors"
            :class="selectedPlatform === platform.key 
              ? 'bg-cyan-400/10 border border-cyan-400/20' 
              : 'hover:bg-dark-input'"
            @click="selectPlatform(platform.key)"
          >
            <div class="flex items-center space-x-3">
              <div 
                class="w-2 h-2 rounded-full" 
                :class="platform.color"
              ></div>
              <span 
                class="text-sm font-medium"
                :class="selectedPlatform === platform.key ? 'text-cyan-400' : 'text-dark-text'"
              >
                {{ platform.name }}
              </span>
            </div>
            <span 
              class="text-sm font-medium"
              :class="selectedPlatform === platform.key ? 'text-cyan-400' : 'text-dark-text-secondary'"
            >
              ({{ platform.count }})
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 右侧内容区域 -->
    <div class="flex-1 flex flex-col min-w-0">
      <DataTableLayout
        title="店铺管理"
        description="管理您的店铺信息和授权状态"
        :stats="statsData"
        :action-buttons="actionButtons"
        table-title="店铺列表"
        table-description="所有店铺记录"
        :columns="tableColumns"
        :table-data="filteredTableData"
        :total-items="filteredTotalItems"
        :current-page="currentPage"
        :page-size="pageSize"
        :row-actions="rowActions"
        :badge-config="badgeConfig"
        @action-click="handleActionClick"
        @row-action="handleRowAction"
        @page-change="handlePageChange"
        @page-size-change="handlePageSizeChange"
        @batch-export="handleBatchExport"
      >
        <!-- 搜索过滤器 -->
        <template #search-filters>
          <div class="bg-dark-card border border-dark-border rounded-lg p-4">
            <div class="flex flex-wrap items-center gap-4">
              <!-- 高级搜索 -->
              <div class="flex-1 min-w-[200px]">
                <input 
                  type="text" 
                  v-model="searchKeyword"
                  class="w-full px-3 py-2 bg-dark-input border border-dark-border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-dark-text text-sm"
                  placeholder="高级搜索"
                >
              </div>
              
              <!-- 采集平台 -->
              <div class="min-w-[120px]">
                <select 
                  v-model="searchPlatform"
                  :disabled="selectedPlatform !== 'all'"
                  class="w-full px-3 py-2 bg-dark-input border border-dark-border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-dark-text text-sm"
                  :class="{ 'opacity-50 cursor-not-allowed': selectedPlatform !== 'all' }"
                  @change="handlePlatformSearch"
                >
                  <option value="">采集平台</option>
                  <option v-for="platform in availablePlatformOptions" :key="platform.key" :value="platform.key">
                    {{ platform.name }}
                  </option>
                </select>
              </div>
              
              <!-- 创建人 -->
              <div class="min-w-[120px]">
                <select 
                  v-model="searchCreator"
                  class="w-full px-3 py-2 bg-dark-input border border-dark-border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-dark-text text-sm"
                >
                  <option value="">创建人</option>
                  <option value="admin">admin</option>
                </select>
              </div>
              
              <!-- 价格区间 -->
              <div class="flex items-center space-x-2 min-w-[200px]">
                <input 
                  type="text" 
                  v-model="minPrice"
                  class="w-20 px-3 py-2 bg-dark-input border border-dark-border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-dark-text text-sm"
                  placeholder="最低价格"
                >
                <span class="text-dark-text-secondary text-sm">~</span>
                <input 
                  type="text" 
                  v-model="maxPrice"
                  class="w-20 px-3 py-2 bg-dark-input border border-dark-border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-dark-text text-sm"
                  placeholder="最高价格"
                >
              </div>
              
              <!-- 商品标题 -->
              <div class="min-w-[160px]">
                <input 
                  type="text" 
                  v-model="searchTitle"
                  class="w-full px-3 py-2 bg-dark-input border border-dark-border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-dark-text text-sm"
                  placeholder="商品标题"
                >
              </div>
              
              <!-- 查询按钮 -->
              <button 
                @click="handleSearch"
                class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
              >
                查询
              </button>
            </div>
          </div>
        </template>

        <!-- 自定义列插槽 -->
        <template #column-storeInfo="{ item }">
          <div class="flex flex-col">
            <span class="text-sm font-medium text-dark-text">{{ item.storeId }}</span>
            <span class="text-xs text-dark-text-secondary">{{ item.storeName }}</span>
          </div>
        </template>

        <template #column-storeType="{ item }">
          <span 
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
            :class="getStoreTypeBadgeClass(item.storeType)"
          >
            {{ getStoreTypeLabel(item.storeType) }}
          </span>
        </template>

        <template #column-authStatus="{ item }">
          <div class="flex flex-col space-y-1">
            <span 
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
              :class="getAuthStatusBadgeClass(item.authStatus)"
            >
              {{ getAuthStatusLabel(item.authStatus) }}
            </span>
            <div class="text-xs text-dark-text-secondary">
              <div>授权：{{ formatTime(item.authTime) }}</div>
              <div>到期：{{ formatTime(item.expireTime) }}</div>
            </div>
          </div>
        </template>
      </DataTableLayout>

      <!-- 添加店铺弹窗 -->
      <StoreNewModal 
        :is-open="showNewModal" 
        @close="showNewModal = false" 
        @submit="handleAddStore" 
      />

      <!-- 查看详情弹窗 -->
      <StoreDetailModal 
        :is-open="showDetailModal"
        :store-id="selectedStoreId"
        @close="showDetailModal = false"
        @updated="handleStoreUpdated"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import DataTableLayout from '~/components/DataTableLayout.vue'
import StoreNewModal from '~/components/StoreNewModal.vue'
import StoreDetailModal from '~/components/StoreDetailModal.vue'
import { getStoreList, getStoreStats, addStore } from '~/apis/business/store'

// 页面配置
definePageMeta({
  layout: 'dashboard'
})

useHead({
  title: '店铺管理 - CUZCUZAI',
  meta: [
    { name: 'description', content: 'CUZCUZAI店铺管理页面' }
  ]
})

// 数据状态
const tableData = ref([])
const totalItems = ref(0)
const currentPage = ref(1)
const pageSize = ref(10)
const loading = ref(false)

// 平台筛选状态
const selectedPlatform = ref('all')

// 弹窗状态
const showNewModal = ref(false)
const showDetailModal = ref(false)
const selectedStoreId = ref('')

// 搜索状态
const searchKeyword = ref('')
const searchPlatform = ref('')
const searchCreator = ref('')
const minPrice = ref('')
const maxPrice = ref('')
const searchTitle = ref('')

// 平台列表
const platformList = ref([
  { key: 'all', name: '全部平台', count: 0, color: 'bg-gray-500' },
  { key: 'amazon', name: '亚马逊', count: 421, color: 'bg-orange-500' },
  { key: 'temu', name: 'Temu', count: 31, color: 'bg-blue-500' },
  { key: 'tiktok', name: 'Tiktok', count: 341, color: 'bg-gray-800' },
  { key: 'shopify', name: 'Shopify', count: 67, color: 'bg-green-500' },
  { key: 'aliexpress', name: '速卖通', count: 312, color: 'bg-red-500' }
])

// 计算可用的平台选项（用于搜索下拉框）
const availablePlatformOptions = computed(() => {
  if (selectedPlatform.value === 'all') {
    // 全部平台时显示所有平台选项（除了all）
    return platformList.value.filter(p => p.key !== 'all')
  } else {
    // 选择了具体平台时，只显示当前选中的平台
    return platformList.value.filter(p => p.key === selectedPlatform.value)
  }
})

// 统计数据
const statsData = ref([
  {
    label: '半托管',
    value: '35',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
    iconPath: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  {
    label: '全托管',
    value: '5',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    iconPath: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  {
    label: '授权异常',
    value: '8',
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
    iconPath: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.884-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z'
  },
  {
    label: '接收异常',
    value: '2',
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
    iconPath: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.884-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z'
  }
])

// 操作按钮
const actionButtons = ref([
  {
    label: '添加店铺',
    action: 'add',
    type: 'primary',
    iconPath: 'M12 6v6m0 0v6m0-6h6m-6 0H6'
  }
])

// 表格列配置
const tableColumns = ref([
  { key: 'storeInfo', label: '店铺ID', type: 'custom' },
  { key: 'storeType', label: '店铺类型', type: 'custom' },
  { key: 'storeName', label: '店铺名称', type: 'text', class: 'text-dark-text' },
  { key: 'authStatus', label: '授权状态', type: 'custom' },
  { key: 'creator', label: '创建人', type: 'user' },
  { key: 'createTime', label: '创建时间', type: 'text', class: 'text-dark-text-secondary text-sm' },
  { key: 'actions', label: '操作', type: 'actions' }
])

// 行操作按钮 - 只保留查看详情
const rowActions = ref([
  {
    action: 'view'
  }
])

// 徽章配置
const badgeConfig = ref({
  'authorized': 'bg-green-100 text-green-800',
  'unauthorized': 'bg-red-100 text-red-800',
  'expired': 'bg-red-100 text-red-800',
  'pending': 'bg-yellow-100 text-yellow-800',
  'expiring_soon': 'bg-orange-100 text-orange-800'
})

// 计算筛选后的全部数据
const allFilteredData = computed(() => {
  let filtered = tableData.value
  
  // 按平台筛选
  if (selectedPlatform.value !== 'all') {
    filtered = filtered.filter(item => item.platform === selectedPlatform.value)
  }
  
  // 其他搜索条件筛选可以在这里添加
  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase()
    filtered = filtered.filter(item => 
      item.storeName.toLowerCase().includes(keyword) ||
      item.storeId.toLowerCase().includes(keyword)
    )
  }
  
  if (searchPlatform.value && selectedPlatform.value === 'all') {
    filtered = filtered.filter(item => item.platform === searchPlatform.value)
  }
  
  if (searchCreator.value) {
    filtered = filtered.filter(item => item.creator === searchCreator.value)
  }
  
  if (searchTitle.value) {
    const title = searchTitle.value.toLowerCase()
    filtered = filtered.filter(item => 
      item.storeName.toLowerCase().includes(title)
    )
  }
  
  return filtered
})

// 计算当前页显示的数据
const filteredTableData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return allFilteredData.value.slice(start, end)
})

// 计算筛选后的总数量
const filteredTotalItems = computed(() => {
  return allFilteredData.value.length
})

// 加载数据
const loadData = async () => {
  loading.value = true
  try {
    // 获取店铺列表
    const listResponse = await getStoreList({
      page: currentPage.value,
      limit: pageSize.value
    })
    
    if (listResponse.success) {
      tableData.value = listResponse.data.storeList
      totalItems.value = listResponse.data.total
    } else {
      // 使用模拟数据
      loadMockData()
    }
    
    // 获取统计数据
    try {
      const statsResponse = await getStoreStats()
      if (statsResponse.success) {
        updateStatsData(statsResponse.data)
      }
    } catch (error) {
      console.error('获取统计数据失败:', error)
    }
    
  } catch (error) {
    console.error('获取店铺数据失败:', error)
    // 使用模拟数据
    loadMockData()
  } finally {
    loading.value = false
  }
}

// 加载模拟数据
const loadMockData = () => {
  const mockData = []
  
  // 生成更多模拟数据用于测试分页
  const platforms = ['temu', 'amazon', 'tiktok', 'shopify', 'aliexpress']
  const storeTypes = ['semi-managed', 'full-managed']
  const authStatuses = ['authorized', 'unauthorized', 'expiring_soon']
  const companies = [
    '南京达利科贸有限公司', '济宁金源洋贸易有限公司', '杭萨大同贸易有限公司',
    '上海飞狮半导体有限公司', '河南中恒远贸易有限公司', '西南少龙半导体有限公司',
    '三门峡富荣洋贸易有限公司', '上海富门国际贸易有限公司', '青海迅联企业营管理有限公司',
    '郑州开祁土食品配料有限公司', '北京科技创新有限公司', '深圳电子商务有限公司',
    '广州国际贸易有限公司', '成都软件科技有限公司', '武汉智能制造有限公司',
    '西安新能源有限公司', '重庆物流科技有限公司', '天津港务贸易有限公司',
    '沈阳机械制造有限公司', '长沙文化传媒有限公司', '南昌绿色食品有限公司',
    '石家庄建材有限公司', '太原能源科技有限公司', '哈尔滨农业科技有限公司',
    '长春汽车配件有限公司', '昆明旅游开发有限公司', '南宁跨境电商有限公司',
    '海口海鲜贸易有限公司', '银川新材料有限公司', '乌鲁木齐丝路贸易有限公司'
  ]
  
  // 生成60条测试数据
  for (let i = 1; i <= 60; i++) {
    const platform = platforms[Math.floor(Math.random() * platforms.length)]
    const storeType = storeTypes[Math.floor(Math.random() * storeTypes.length)]
    const authStatus = authStatuses[Math.floor(Math.random() * authStatuses.length)]
    const company = companies[Math.floor(Math.random() * companies.length)]
    
    let storeIdPrefix = 'LST'
    if (platform === 'amazon') storeIdPrefix = 'AMZ'
    else if (platform === 'tiktok') storeIdPrefix = 'TT'
    else if (platform === 'shopify') storeIdPrefix = 'SH'
    else if (platform === 'aliexpress') storeIdPrefix = 'AE'
    
    mockData.push({
      id: i.toString(),
      storeId: `${storeIdPrefix}${String(i).padStart(3, '0')}`,
      storeName: company,
      platform: platform,
      storeType: storeType,
      authStatus: authStatus,
      authTime: '2025-08-02 17:23:19',
      expireTime: '2025-08-02 17:23:19',
      creator: 'admin',
      createTime: '2025-07-23 11:45:06'
    })
  }
  
  tableData.value = mockData
  totalItems.value = mockData.length
  
  // 更新平台计数
  updatePlatformCounts()
}

// 更新统计数据
const updateStatsData = (data) => {
  statsData.value[0].value = data.temuStores?.toString() || '0'
  statsData.value[3].value = data.unauthorizedStores?.toString() || '0'
}

// 获取平台标签
const getPlatformLabel = (platform) => {
  const platformMap = {
    'temu': 'Temu',
    'amazon': '亚马逊',
    'shein': 'Shein'
  }
  return platformMap[platform] || platform
}

// 获取平台徽章样式
const getPlatformBadgeClass = (platform) => {
  const classMap = {
    'temu': 'bg-blue-100 text-blue-800',
    'amazon': 'bg-orange-100 text-orange-800',
    'shein': 'bg-purple-100 text-purple-800'
  }
  return classMap[platform] || 'bg-gray-100 text-gray-800'
}

// 获取店铺类型标签
const getStoreTypeLabel = (type) => {
  const typeMap = {
    'semi-managed': '半托管',
    'full-managed': '全托管'
  }
  return typeMap[type] || type
}

// 获取店铺类型徽章样式
const getStoreTypeBadgeClass = (type) => {
  const classMap = {
    'semi-managed': 'bg-gray-100 text-gray-800',
    'full-managed': 'bg-blue-100 text-blue-800'
  }
  return classMap[type] || 'bg-gray-100 text-gray-800'
}

// 获取授权状态标签
const getAuthStatusLabel = (status) => {
  const statusMap = {
    'authorized': '授权成功',
    'unauthorized': '授权失败',
    'expired': '授权过期',
    'pending': '即将到期',
    'expiring_soon': '即将到期'
  }
  return statusMap[status] || status
}

// 获取授权状态徽章样式
const getAuthStatusBadgeClass = (status) => {
  const classMap = {
    'authorized': 'bg-green-100 text-green-800',
    'unauthorized': 'bg-red-100 text-red-800',
    'expired': 'bg-red-100 text-red-800',
    'pending': 'bg-orange-100 text-orange-800',
    'expiring_soon': 'bg-orange-100 text-orange-800'
  }
  return classMap[status] || 'bg-gray-100 text-gray-800'
}

// 格式化时间
const formatTime = (time) => {
  if (!time) return '-'
  
  try {
    const date = new Date(time)
    return date.toLocaleDateString('zh-CN')
  } catch (error) {
    return time
  }
}

// 选择平台
const selectPlatform = (platformKey) => {
  selectedPlatform.value = platformKey
  currentPage.value = 1 // 重置页码
  
  // 联动更新搜索条件中的采集平台
  if (platformKey === 'all') {
    searchPlatform.value = '' // 全部平台时清空采集平台筛选
  } else {
    searchPlatform.value = platformKey // 选择具体平台时同步到搜索条件
  }
}

// 更新平台计数
const updatePlatformCounts = () => {
  const counts = {}
  tableData.value.forEach(item => {
    counts[item.platform] = (counts[item.platform] || 0) + 1
  })
  
  platformList.value.forEach(platform => {
    if (platform.key === 'all') {
      platform.count = tableData.value.length
    } else {
      platform.count = counts[platform.key] || 0
    }
  })
}

// 处理操作按钮点击
const handleActionClick = (action) => {
  if (action === 'add') {
    showNewModal.value = true
  }
}

// 处理行操作
const handleRowAction = ({ action, item }) => {
  if (action === 'view') {
    selectedStoreId.value = item.id
    showDetailModal.value = true
  }
}

// 处理分页变化
const handlePageChange = (page) => {
  currentPage.value = page
  loadData()
}

// 处理分页大小变化
const handlePageSizeChange = (newPageSize) => {
  pageSize.value = newPageSize
  currentPage.value = 1 // 重置到第一页
  loadData()
}

// 处理批量导出
const handleBatchExport = (selectedItems) => {
  console.log('批量导出:', selectedItems)
}

// 处理添加店铺
const handleAddStore = async (formData) => {
  try {
    const response = await addStore(formData)
    if (response.success) {
      showNewModal.value = false
      loadData() // 重新加载数据
      console.log('添加店铺成功')
    }
  } catch (error) {
    console.error('添加店铺失败:', error)
  }
}

// 删除店铺功能已移除

// 处理店铺更新
const handleStoreUpdated = () => {
  loadData() // 重新加载数据
}

// 处理搜索
const handleSearch = () => {
  currentPage.value = 1 // 重置页码
  loadData() // 重新加载数据
}

// 处理采集平台搜索变化
const handlePlatformSearch = () => {
  // 如果在全部平台模式下选择了具体平台，切换到对应的左侧平台
  if (selectedPlatform.value === 'all' && searchPlatform.value) {
    selectedPlatform.value = searchPlatform.value
  }
  handleSearch()
}

// 组件挂载时加载数据
onMounted(() => {
  loadData()
})
</script> 