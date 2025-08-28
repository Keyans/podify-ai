<template>
  <div>
    <a-card class="ml-10 mr-10 mt-4">
      <PageTitle :totalList="statsData" />
    </a-card>
    <a-card class="ml-10 mr-10 mt-4">
      <PageSearch
        v-model="searchParams"
        :fields="searchFields"
        @search="onSearch"
        @reset="onReset"
      >
        <template #prefix>
          <div class="flex items-center space-x-4">
            <a-button @click="workOpen = true">新建刊登</a-button>
            <a-button @click="navigateToTemplateManagement">刊登模版管理</a-button>
          </div>
        </template>
      </PageSearch>
    </a-card>
    <a-card class="ml-10 mr-10 mt-4">
      <PageTable
        :columns="tableColumns"
        :data-source="tableData"
        row-key="croppingId"
        :loading="tableLoading"
        :pagination="{ total: Number(pagination.total), pageSize: Number(pagination.limit), current: Number(pagination.page) }"
        :row-selection="{ selectedRowKeys, onChange: onSelectChange }"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <PageTableOption :record="record" @detail="handleDetail" @more="handleMore"></PageTableOption>
          </template>
        </template>
      </PageTable>
    </a-card>
    <PageTableModal 
      v-model:open="modalOpen" :subTitle="subTitle"
      :subStatsData="subStatsData" 
      :subTableColumns="subTableColumns"
      :subTableData="subTableData"
      :subTableLoading="subTableLoading" 
      v-model:subSearchParams="subDetailSearchParams"  
      :subSearchFields="subSearchFields"        
      @subSearch="handleSubSearch"                    
      @subReset="handleSubReset"                      
      :subTablePagination="subTablePagination"        
      :subSelectedRowKeys="subSelectedRowKeys"        
      :subTableRowSelection="true"                    
      @subTableChange="handleSubTableChange"          
      @update:subSelectedRowKeys="subSelectedRowKeys = $event"
    /> 
    <pageAddTitle v-model:open="addOpen" :title="imageTitle" @close="addOpen = false" @success="handleTaskSuccess"/>
    <batchModal 
      v-model:open="templateModalOpen" 
      :platform-options="platformOptions"
      :platform-loading="platformLoading"
      @close="templateModalOpen = false" 
    />
    <batchWork 
      v-model:open="workOpen" 
      :platform-options="platformOptions"
      :platform-loading="platformLoading"
      @close="workOpen = false" 
    />
  </div>    
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import PageTitle from '~/components/common/pageTitle.vue'
import PageSearch from '~/components/common/pageSearch.vue'
import PageTable from '~/components/common/pageTable.vue'
import PageTableOption from '~/components/common/pageTableOption.vue'
import PageTableModal from '~/components/common/pageTableModal.vue'
import pageAddTitle from '~/components/common/pageAddTitle.vue'
import batchModal from '~/components/batch/batchModal.vue'
import batchWork from '~/components/batch/batchWork.vue'
// 导入 Composable
import { useList } from '~/composables/business/application/batch/useList'
import { useDetailModal } from '~/composables/business/application/batch/useDetailModal'
import { getEnabledPlatforms } from '~/apis/business/publish'

const workOpen = ref<boolean>(false)
const addOpen = ref<boolean>(false)
const imageTitle = ref<string>('新建标题')
const templateModalOpen = ref<boolean>(false)

// 平台数据状态 - 保存完整的平台信息
const platformOptions = ref<Array<{label: string, value: string, id?: string}>>([])
const platformLoading = ref(false)

// 使用 dashboard 布局
definePageMeta({
  layout: 'dashboard'
})

// 主表格逻辑
const {
  statsData,
  getCount,
  tableColumns,
  searchFields,
  pagination,
  tableData,
  tableLoading,
  selectedRowKeys,
  onSelectChange,
  searchParams,
  onSearch,
  onReset,
  handleTableChange,
  fetchData: fetchMainTableData 
} = useList()

// 详情模态框逻辑
// 🚀 移除 tableModalRef 的声明和使用，useCollectorDetailModal 不再需要它
const {
  subTitle,
  subStatsData,
  subTableColumns,
  subSearchFields,
  subTableData,
  subTableLoading,
  subTablePagination,
  subSelectedRowKeys,
  subDetailSearchParams, 
  handleSubSearch,
  handleSubReset,
  handleSubTableChange,
  onSubSelectChange,
  openCollectorDetailModal,
  modalOpen, // 🚀 从 useDetailModal 中解构出 modalOpen
} = useDetailModal() // 🚀 useDetailModal 不再接收参数

// 点击查看详情的事件处理
const handleDetail = async (record: any) => {
  await openCollectorDetailModal(record)
}

const handleMore = (record: any) => {
  console.log(record)
}

// 处理任务创建成功事件
const handleTaskSuccess = () => {
  getCount() // 重新获取统计数据
  fetchMainTableData() // 重新获取主表格数据
}

// 获取平台列表
const fetchPlatformOptions = async () => {
  try {
    platformLoading.value = true
    console.log('开始获取平台列表...')
    const response = await getEnabledPlatforms()
    console.log('平台列表获取成功:', response)
    
    if (response.success && response.data) {
      // 构建平台选项，添加“全部”选项，保存完整的id和name信息
      const platforms = response.data.map((platform: any) => ({
        label: platform.name || platform.platformName,
        value: platform.name || platform.platformName,
        id: platform.id || platform.platformId // 保存平台ID用于后续接口调用
      }))
      
      // 在前面添加“全部”选项
      platformOptions.value = [
        { label: '全部', value: '' }, // 全部选项不需要id
        ...platforms
      ]
    } else {
      // 提供默认数据作为后备方案
      platformOptions.value = [
        { label: '全部', value: '' },
        { label: '亚马逊', value: '亚马逊', id: 'amazon' },
        { label: 'TEMU', value: 'TEMU', id: 'temu' },
        { label: 'Shein', value: 'Shein', id: 'shein' }
      ]
    }
  } catch (error) {
    console.error('获取平台列表失败:', error)
    // 错误处理，提供默认数据
    platformOptions.value = [
      { label: '全部', value: '' },
      { label: '亚马逊', value: '亚马逊', id: 'amazon' },
      { label: 'TEMU', value: 'TEMU', id: 'temu' },
      { label: 'Shein', value: 'Shein', id: 'shein' }
    ]
  } finally {
    platformLoading.value = false
  }
}

// 打开模板管理模态弹窗
const navigateToTemplateManagement = () => {
  templateModalOpen.value = true
}

// 页面加载时执行
onMounted(async () => {
  // 先获取平台数据
  await fetchPlatformOptions()
  
  // 然后获取其他数据
  getCount() // 获取统计数据
  fetchMainTableData() // 获取主表格数据
})
</script>