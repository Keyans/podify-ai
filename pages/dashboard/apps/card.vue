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
            <a-button @click="addOpen = true">新建合成</a-button>
          </div>
        </template>
      </PageSearch>
    </a-card>
    <a-card class="ml-10 mr-10 mt-4">
      <PageTable
        :columns="tableColumns"
        :data-source="tableData"
        row-key="creatorId"
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
  <!-- 新建合成任务弹窗 -->
  <PodSynthesisNewTaskModal 
    :isOpen="addOpen" 
    @close="addOpen = false"
    @submit="handleTaskSubmit"
  />
  </div>    
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import PageTitle from '~/components/common/pageTitle.vue'
import PageSearch from '~/components/common/pageSearch.vue'
import PageTable from '~/components/common/pageTable.vue'
import PageTableOption from '~/components/common/pageTableOption.vue'
import PageTableModal from '~/components/common/pageTableModal.vue'
import PodSynthesisNewTaskModal from '~/components/PodSynthesisNewTaskModal.vue'

// 导入 Composable
import { useList } from '~/composables/business/application/pod/useList'
import { useDetailModal } from '~/composables/business/application/pod/useDetailModal'


const addOpen = ref<boolean>(false)

// 使用 dashboard 布局
definePageMeta({
  layout: 'dashboard'
})


// 处理新建文生图任务提交
const handleTaskSubmit = async (formData: { taskResponse: any }) => {
  
  try {
    // 现在只有成功时才会收到事件，所以直接处理成功逻辑    
    // 关闭弹窗
    addOpen.value = false  
    // 刷新数据
    handleTaskSuccess()       
  } catch (error) {
    // 处理异常时关闭弹窗
    addOpen.value = false
  }
}

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
  handleTableChange,
  searchParams,
  onSearch,
  onReset,
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

// 页面加载时执行
onMounted(() => {
  getCount() // 获取统计数据
  fetchMainTableData() // 获取主表格数据
})
</script>