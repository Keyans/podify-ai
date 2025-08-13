<template>
    <div class="common-table">
      <a-spin :spinning="loading">
        <a-table
          ref="tableRef"
          :columns="processedColumns"
          :data-source="dataSource"
          :row-key="rowKey"
          :pagination="mergedPagination"
          :row-selection="mergedRowSelection"
          :scroll="scroll"
          v-bind="$attrs"
          @change="handleTableChange"
        >
          <!-- 透传所有插槽 -->
        <template v-for="(_, slotName) in $slots" #[slotName]="slotData">
          <slot :name="slotName" v-bind="slotData" />
        </template>
          <!-- 默认空状态 -->
          <template #emptyText>
            <slot name="empty">
              <a-empty :description="emptyText" :image="emptyImage">
                <template v-if="showEmptyAction" #footer>
                  <slot name="emptyAction">
                    <a-button type="primary" @click="handleEmptyAction">
                      {{ emptyActionText }}
                    </a-button>
                  </slot>
                </template>
              </a-empty>
            </slot>
          </template>
        </a-table>
      </a-spin>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, watch } from 'vue'
  import type { TableProps, PaginationProps } from 'ant-design-vue'
  
  // 类型定义
  interface ColumnType {
    title: string
    dataIndex?: string
    key: string
    width?: number | string
    fixed?: 'left' | 'right'
    customRender?: (data: { text: any; record: any; index: number }) => any
    slots?: { customRender?: string }
  }
  
  interface CommonTableProps {
    columns: ColumnType[]
    dataSource: any[]
    rowKey?: string | ((record: any) => string)
    loading?: boolean
    pagination?: PaginationProps | boolean
    rowSelection?: TableProps['rowSelection'] | boolean
    scroll?: { x?: number | string | true; y?: number | string }
    emptyText?: string
    emptyImage?: string
    emptyActionText?: string
    showEmptyAction?: boolean
  }
  
  const props = withDefaults(defineProps<CommonTableProps>(), {
    columns: () => [],
    dataSource: () => [],
    rowKey: 'key',
    loading: false,
    pagination: () => ({}),
    rowSelection: undefined,
    scroll: () => ({ x: 'max-content' }),
    emptyText: '暂无数据',
    emptyImage: undefined,
    emptyActionText: '新建数据',
    showEmptyAction: true
  })
  
  const emit = defineEmits<{
    (e: 'change', pagination: any, filters: any, sorter: any): void
    (e: 'update:selectedRowKeys', keys: (string | number)[]): void
    (e: 'pageChange', page: number, pageSize: number): void
    (e: 'emptyAction'): void
  }>()
  
  // 分页状态
  const currentPage = ref(1)
  const pageSize = ref(10)
  
  // 行选择状态
  const selectedRowKeys = ref<(string | number)[]>([])
  
  // 处理后的列配置
  const processedColumns = computed(() => {
    return props.columns.map(column => {
      // 可以在这里添加列的统一处理逻辑
      return column
    })
  })
  
  // 合并分页配置
  const mergedPagination = computed(() => {
    if (props.pagination === false) return false
  
    return {
      current: currentPage.value,
      pageSize: pageSize.value,
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      pageSizeOptions: ['10', '20', '50', '100'],
      ...props.pagination
    }
  })
  
  // 合并行选择配置
  const mergedRowSelection = computed(() => {
    if (!props.rowSelection) return undefined
  
    const selectionConfig = typeof props.rowSelection === 'boolean' ? {} : props.rowSelection
  
    return {
      selectedRowKeys: selectedRowKeys.value,
      onChange: (keys: (string | number)[], rows: any[]) => {
        selectedRowKeys.value = keys
        emit('update:selectedRowKeys', keys)
        if (selectionConfig.onChange) {
          selectionConfig.onChange(keys, rows)
        }
      },
      ...selectionConfig
    }
  })
  
  // 表格变化事件
  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    if (pagination) {
      currentPage.value = pagination.current
      pageSize.value = pagination.pageSize
      emit('pageChange', pagination.current, pagination.pageSize)
    }
    emit('change', pagination, filters, sorter)
  }
  
  // 空状态操作
  const handleEmptyAction = () => {
    emit('emptyAction')
  }
  
  // 监听外部 selectedRowKeys 变化
  watch(() => props.rowSelection, (newVal) => {
    if (newVal && typeof newVal === 'object' && 'selectedRowKeys' in newVal) {
      selectedRowKeys.value = newVal.selectedRowKeys || []
    }
  }, { deep: true })
  
  // 暴露方法
  defineExpose({
    clearSelection: () => {
      selectedRowKeys.value = []
      emit('update:selectedRowKeys', [])
    },
    getSelectedRows: () => {
      return props.dataSource.filter(item => {
        const key = typeof props.rowKey === 'function' ? props.rowKey(item) : item[props.rowKey]
        return selectedRowKeys.value.includes(key)
      })
    }
  })
  </script>
  
  <style scoped>
  .common-table {
    width: 100%;
  }
  
  .common-table :deep(.ant-table-pagination) {
    margin-top: 16px;
    margin-bottom: 0;
  }
  </style>