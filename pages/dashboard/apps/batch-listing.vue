<template>
  <DataTableLayout
    title="批量刊登"
    description="智能批量商品刊登和发布管理工具"
    :stats="stats"
    :action-buttons="actionButtons"
    table-title="批量刊登任务列表"
    table-description="管理您的商品批量刊登任务和发布状态"
    :columns="columns"
    :table-data="tableData"
    :total-items="tableData.length"
    :current-page="1"
    :page-size="20"
    :badge-config="badgeConfig"
    @action-click="handleActionClick"
    @batch-export="handleBatchExport"
    @row-action="handleRowAction"
    @page-change="handlePageChange"
  >
    <!-- 刊登数量列自定义渲染 -->
    <template #column-刊登数量="{ item }">
      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
        {{ item.刊登数量 }}
      </span>
    </template>
    
    <!-- 成功率列自定义渲染 -->
    <template #column-成功率="{ item }">
      <div class="flex items-center space-x-2">
        <div class="w-16 bg-gray-200 rounded-full h-2">
          <div 
            class="h-2 rounded-full transition-all duration-300"
            :class="{
              'bg-green-500': parseFloat(item.成功率) >= 80,
              'bg-yellow-500': parseFloat(item.成功率) >= 60 && parseFloat(item.成功率) < 80,
              'bg-red-500': parseFloat(item.成功率) < 60
            }"
            :style="{ width: item.成功率 }"
          ></div>
        </div>
        <span class="text-sm text-gray-600">{{ item.成功率 }}</span>
      </div>
    </template>
    
    <!-- 操作人列自定义渲染 -->
    <template #column-操作人="{ item }">
      <div class="flex items-center">
        <div class="h-6 w-6 rounded-full bg-gradient-to-r from-green-500 to-blue-600 flex items-center justify-center text-white text-xs font-medium">
          {{ item.操作人.charAt(0) }}
        </div>
        <span class="ml-2 text-sm text-gray-900">{{ item.操作人 }}</span>
      </div>
    </template>

    <!-- 平台列自定义渲染 -->
    <template #column-目标平台="{ item }">
      <div class="flex flex-wrap gap-1">
        <span 
          v-for="platform in item.目标平台.split(',')"
          :key="platform"
          class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium"
          :class="{
            'bg-orange-100 text-orange-800': platform.trim() === '淘宝',
            'bg-red-100 text-red-800': platform.trim() === '天猫',
            'bg-blue-100 text-blue-800': platform.trim() === '京东',
            'bg-purple-100 text-purple-800': platform.trim() === '拼多多',
            'bg-green-100 text-green-800': platform.trim() === '抖音',
            'bg-gray-100 text-gray-800': !['淘宝', '天猫', '京东', '拼多多', '抖音'].includes(platform.trim())
          }"
        >
          {{ platform.trim() }}
        </span>
      </div>
    </template>
  </DataTableLayout>
</template>

<script setup>
import { ref } from 'vue'
import DataTableLayout from '~/components/DataTableLayout.vue'

// 使用 dashboard 布局
definePageMeta({
  layout: 'dashboard'
})

useHead({
  title: '批量刊登 - PodifyAi',
  meta: [
    { name: 'description', content: 'PodifyAi 批量刊登管理页面' }
  ]
})

// 统计数据
const stats = ref([
  {
    label: '总刊登数',
    value: '3,248',
    iconPath: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    label: '成功率',
    value: '92.6%',
    iconPath: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600'
  },
  {
    label: '今日刊登',
    value: '156',
    iconPath: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600'
  },
  {
    label: '处理中',
    value: '23',
    iconPath: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-600'
  }
])

// 操作按钮
const actionButtons = ref([
  {
    label: '新建刊登',
    type: 'primary',
    action: 'create-listing',
    iconPath: 'M12 6v6m0 0v6m0-6h6m-6 0H6'
  },
  {
    label: '导入商品',
    type: 'secondary',
    action: 'import-products',
    iconPath: 'M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10'
  },
  {
    label: '模板管理',
    type: 'secondary',
    action: 'template-management',
    iconPath: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
  },
  {
    label: '批量操作',
    type: 'success',
    action: 'batch-operation',
    iconPath: 'M4 6h16M4 10h16M4 14h16M4 18h16'
  }
])

// 表格列配置
const columns = ref([
  { key: 'checkbox', label: '', width: '50px' },
  { key: '任务ID', label: '任务ID', sortable: true, width: '120px' },
  { key: '任务名称', label: '任务名称', sortable: true, width: '150px' },
  { key: '目标平台', label: '目标平台', sortable: false, width: '180px' },
  { key: '刊登数量', label: '刊登数量', sortable: true, width: '100px' },
  { key: '成功率', label: '成功率', sortable: true, width: '120px' },
  { key: '刊登状态', label: '刊登状态', sortable: true, width: '100px' },
  { key: '操作人', label: '操作人', sortable: true, width: '120px' },
  { key: '创建时间', label: '创建时间', sortable: true, width: '150px' },
  { 
    key: 'actions', 
    label: '操作', 
    width: '120px',
    actions: [
      {
        action: 'view',
        label: '查看详情',
        type: 'primary',
        iconPath: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
      },
      {
        action: 'more',
        label: '更多',
        type: 'dropdown'
      }
    ]
  }
])

// 表格数据
const tableData = ref([
  {
    id: 'BATCH001',
    任务ID: 'BATCH001',
    任务名称: '春季新品批量上架',
    目标平台: '淘宝,天猫,京东',
    刊登数量: '120个',
    成功率: '95.8%',
    刊登状态: '已完成',
    操作人: '张经理',
    创建时间: '2024-01-15 14:30:25'
  },
  {
    id: 'BATCH002',
    任务ID: 'BATCH002',
    任务名称: '电子产品促销活动',
    目标平台: '京东,拼多多',
    刊登数量: '85个',
    成功率: '88.2%',
    刊登状态: '已完成',
    操作人: '李主管',
    创建时间: '2024-01-15 13:45:12'
  },
  {
    id: 'BATCH003',
    任务ID: 'BATCH003',
    任务名称: '服装类目批量发布',
    目标平台: '淘宝,抖音',
    刊登数量: '200个',
    成功率: '76.5%',
    刊登状态: '刊登中',
    操作人: '王小美',
    创建时间: '2024-01-15 12:20:08'
  },
  {
    id: 'BATCH004',
    任务ID: 'BATCH004',
    任务名称: '家居用品上新',
    目标平台: '天猫,京东,拼多多',
    刊登数量: '0个',
    成功率: '0%',
    刊登状态: '失败',
    操作人: '赵助理',
    创建时间: '2024-01-15 11:15:33'
  },
  {
    id: 'BATCH005',
    任务ID: 'BATCH005',
    任务名称: '美妆护肤品推广',
    目标平台: '淘宝,抖音',
    刊登数量: '150个',
    成功率: '92.0%',
    刊登状态: '已完成',
    操作人: '孙总监',
    创建时间: '2024-01-15 10:05:17'
  },
  {
    id: 'BATCH006',
    任务ID: 'BATCH006',
    任务名称: '数码配件批量刊登',
    目标平台: '京东,拼多多',
    刊登数量: '75个',
    成功率: '84.0%',
    刊登状态: '已完成',
    操作人: '周专员',
    创建时间: '2024-01-15 09:30:45'
  },
  {
    id: 'BATCH007',
    任务ID: 'BATCH007',
    任务名称: '运动户外用品发布',
    目标平台: '淘宝,天猫,京东,抖音',
    刊登数量: '45个',
    成功率: '68.9%',
    刊登状态: '等待中',
    操作人: '吴运营',
    创建时间: '2024-01-15 08:45:20'
  }
])

// 状态徽章配置
const badgeConfig = ref({
  '已完成': { class: 'bg-green-100 text-green-800', text: '已完成' },
  '刊登中': { class: 'bg-yellow-100 text-yellow-800', text: '刊登中' },
  '失败': { class: 'bg-red-100 text-red-800', text: '失败' },
  '等待中': { class: 'bg-gray-100 text-gray-800', text: '等待中' },
  '暂停': { class: 'bg-orange-100 text-orange-800', text: '暂停' }
})

// 事件处理函数
const handleActionClick = (action) => {
  console.log('Action clicked:', action)
  // 根据不同的action执行相应的操作
  switch (action) {
    case 'create-listing':
      // 新建刊登任务逻辑
      break
    case 'import-products':
      // 导入商品逻辑
      break
    case 'template-management':
      // 模板管理逻辑
      break
    case 'batch-operation':
      // 批量操作逻辑
      break
  }
}

const handleBatchExport = (selectedItems) => {
  console.log('Batch export:', selectedItems)
  // 批量导出选中的刊登任务
}

const handleRowAction = (action, item) => {
  console.log('Row action:', action, item)
  // 处理行操作，如查看详情、编辑、删除、重新刊登等
}

const handlePageChange = (page) => {
  console.log('Page changed:', page)
  // 处理分页变化
}
</script>