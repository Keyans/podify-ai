<template>
  <a-modal 
    v-model:open="isOpen" 
    width="1200px" 
    :title="modalTitle" 
    :footer="null"
    centered
    @cancel="handleCancel"
  >
    <div class="sku-detail-content">
      <!-- SKU 基本信息展示区域 -->
      <div class="sku-info-section mb-4" v-if="skuInfo">
        <div class="flex items-start gap-4">
          <!-- 主图展示 -->
          <div class="sku-images flex gap-2">
            <div class="main-image">
              <a-image 
                :src="skuInfo.spuImageUrl" 
                :width="120" 
                :height="120"
                :preview="true"
                fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3Ik1RnG4W+FgYxN"
              />
            </div>
            <div class="result-image">
              <a-image 
                :src="skuInfo.imageUrl" 
                :width="120" 
                :height="120"
                :preview="true"
                fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3Ik1RnG4W+FgYxN"
              />
            </div>
          </div>
          
          <!-- SKU 基本信息 -->
          <div class="sku-basic-info flex-1">
            <h3 class="text-lg font-semibold mb-2">{{ skuInfo.title }}</h3>
            <div class="info-grid grid grid-cols-2 gap-2 text-sm">
              <div><span class="font-medium">SPU编码:</span> {{ skuInfo.spuId }}</div>
              <div></div>
              <div><span class="font-medium">创建时间:</span> {{ skuInfo.createTime }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 分隔线 -->
      <a-divider />

      <!-- 表格区域 -->
      <div class="table-section">
        <PageTable
          :columns="tableColumns"
          :data-source="tableData"
          :row-key="rowKey"
          :loading="loading"
          :pagination="pagination"
          :scroll="{ x: 1000 }"
          @change="handleTableChange"
        >
          <template #empty>
            <a-empty description="暂无数据" />
          </template>
        </PageTable>
      </div>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, computed, type PropType } from 'vue'
import PageTable from '~/components/common/pageTable.vue'

// 定义组件事件
const emit = defineEmits([
  'update:open',
  'tableChange'
])

// 定义组件 Props
const props = defineProps({
  open: {
    type: Boolean,
    default: false
  },
  skuInfo: {
    type: Object as PropType<any>,
    default: () => ({})
  },
  tableColumns: {
    type: Array as PropType<any[]>,
    required: true
  },
  tableData: {
    type: Array as PropType<any[]>,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  },
  pagination: {
    type: [Object, Boolean] as PropType<object | boolean>,
    default: false
  },
  rowKey: {
    type: String,
    default: 'id'
  }
})

// 控制模态框显示状态
const isOpen = computed({
  get: () => props.open,
  set: (value) => emit('update:open', value)
})

// 模态框标题
const modalTitle = ref('SKU详情')

// 处理模态框关闭
const handleCancel = () => {
  isOpen.value = false
}

// 处理表格变化事件
const handleTableChange = (pagination: any, filters?: any, sorter?: any) => {
  emit('tableChange', pagination, filters, sorter)
}

// 获取状态颜色
const getStatusColor = (status: any) => {
  const statusMap: Record<string, string> = {
    'success': 'green',
    'failed': 'red',
    'pending': 'orange',
    'processing': 'blue',
    '1': 'green',
    '0': 'red',
    '2': 'orange'
  }
  return statusMap[status] || 'default'
}

// 获取状态文本
const getStatusText = (status: any) => {
  const statusMap: Record<string, string> = {
    'success': '成功',
    'failed': '失败',
    'pending': '待处理',
    'processing': '处理中',
    '1': '成功',
    '0': '失败',
    '2': '处理中'
  }
  return statusMap[status] || status
}
</script>

<style scoped>
.sku-detail-content {
  max-height: 70vh;
  overflow-y: auto;
}

.sku-info-section {
  background: #fafafa;
  padding: 16px;
  border-radius: 6px;
}

.info-grid {
  line-height: 1.6;
}

.table-section {
  min-height: 300px;
}
</style>