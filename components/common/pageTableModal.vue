<template>
    <a-modal v-model:open="isOpen" width="1000px" ok-text="确认" cancel-text="取消"  centered :title="subTitle" @ok="handleOk" @cancel="handleCancel">
        <a-card>
            <PageTitle :totalList="subStatsData" />
            <PageSearch 
            class="mt-4"      
            :modelValue="props.subSearchParams"    
            @update:modelValue="onPageSearchUpdate" 
            :fields="subSearchFields"                 
            @search="onSubSearch"
            @reset="onSubReset" 
            >
            </PageSearch>
            <PageTable
                class="mt-4"    
                :columns="subTableColumns"
                :data-source="Array.isArray(subTableData) ? subTableData : []"
                row-key="id"
                :pagination="subTablePagination"
                :loading="subTableLoading"
                :row-selection="subTableRowSelection ? { selectedRowKeys: subSelectedRowKeys, onChange: onSubSelectChange } : undefined" 
                @change="onSubTableChange"
                >
            </PageTable>
        </a-card>
    </a-modal>
    <skuModal ref="detailModalRef"></skuModal>
</template>

<script setup lang="ts">
import { ref, type PropType, computed } from 'vue'; // 🚀 Import computed
import PageTitle from '~/components/common/pageTitle.vue';
import PageSearch from '~/components/common/pageSearch.vue';
import PageTable from '~/components/common/pageTable.vue';

// 定义组件将发出的事件
const emit = defineEmits([
  'update:subTablePagination',  // 用于双向绑定分页（如果父组件使用 v-model）
  'update:subSelectedRowKeys',  // 用于双向绑定行选择
  'update:subSearchParams',     // 用于双向绑定搜索参数
  'subSearch',                  // 触发搜索事件
  'subReset',                   // 触发重置事件
  'subTableChange',              // 通用的子表格变化事件（分页、排序、筛选）
  'update:open' // 🚀 Crucial: Emit update:open for v-model:open
]);

// Props for the modal
const props = defineProps({
   open: {
    type: Boolean,
    default: false
  },
  subTitle:{
    type: String,
    default:''
  },
  subStatsData: {
    type: Array as PropType<any[]>, // 🚀 明确为 Array 类型
    default: () => []
  },
  subTableData: { 
    type: Array as PropType<any[]>, // 🚀 修正：应该为 Array 类型
    default: () => []
  },
  subTableLoading: { // 新增：用于接收父组件传递的 loading 状态
    type: Boolean,
    default: false
  },
    // 🚀 新增：接收子表格的列定义
  subTableColumns: {
    type: Array as () => any[], // 明确类型为数组，元素可以是任意类型（Ant Design Vue Columns）
    required: true // 通常子表格需要列定义，所以设为 required
  },
// 新增：子页面的搜索字段配置
    subSearchFields: {
    type: Array as () => any[],
    default: () => [],
  },
  // 新增：子页面的搜索参数，父组件通过 v-model 传入
  subSearchParams: {
    type: Object as PropType<Record<string, any>>, // 🚀 明确为 Object 类型
    default: () => ({}),
  },
  // 新增：子表格的分页配置
  subTablePagination: {
    type: [Object, Boolean] as PropType<object | boolean>, // 🚀 明确类型
    default: false,
  },
  // 新增：子表格已选中的行的key
  subSelectedRowKeys: {
    type: Array as () => (string | number)[],
    default: () => [],
  },
  // 新增：是否启用子表格的行选择功能
  subTableRowSelection: {
    type: Boolean,
    default: false,
  },
});

// 使用 ref 来控制 modal 的显示状态
const isOpen = computed({
  get: () => props.open,
  set: (value) => emit('update:open', value)
});

// 暴露给父组件的方法
const open = () => {
    isOpen.value = true; // 打开弹窗
};

const handleOk = () => {
    isOpen.value = false; // 关闭弹窗
};

const handleCancel = () => {
    isOpen.value = false; // 关闭弹窗
};

// 🚀 新增方法：处理 PageSearch 组件发出的 update:modelValue 事件
const onPageSearchUpdate = (newValue: Record<string, any>) => {
    emit('update:subSearchParams', newValue);
};
// 处理子搜索组件的搜索事件
const onSubSearch = (newParams: any) => {
  emit('subSearch', newParams); // 触发父组件的 subSearch 业务逻辑
};

// 处理子搜索组件的重置事件
const onSubReset = () => {
  // 🚀 关键：当 PageSearch 触发重置时，需要将重置后的搜索参数通过 update:subSearchParams 事件传回父组件
  // 假设重置后的参数是 props.subSearchParams 的默认值或空对象
  emit('update:subSearchParams', {}); // 重置为初始空对象
  emit('subReset'); // 触发父组件的 subReset 业务逻辑
};

// 处理子表格的分页、排序、筛选变化
const onSubTableChange = (pagination: any, filters: any, sorter: any) => {
  emit('subTableChange', pagination, filters, sorter);
};

// 处理子表格的行选择变化
const onSubSelectChange = (selectedRowKeys: (string | number)[], selectedRows: any[]) => {
  emit('update:subSelectedRowKeys', selectedRowKeys);
};

</script>