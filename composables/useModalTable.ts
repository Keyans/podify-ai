import { ref, type Ref } from 'vue'; // 确保导入 Ref

interface PaginationConfig {
  page: number;
  limit: number;
  total: number;
}

interface SearchParams {
    [key: string]: any;
}

interface ModalTableConfig {
  getListFn: (params: Record<string, any>) => Promise<{ list: any[]; total: number }>;
  initialSearchParams?: Record<string, any>;
  paramPreparer?: (rawParams: Record<string, any>, pagination: { page: number; limit: number; total: number }) => Record<string, any>;
}

export interface UseTableDataReturn { // 从 useTableData.ts 复制过来，以便在这里扩展
  pagination: Ref<PaginationConfig>;
  tableData: Ref<any[]>;
  handleTableChange: (pageConfig: any, filters?: any, sorter?: any) => void;
  selectedRowKeys: Ref<(string | number)[]>;
  onSelectChange: (keys: (string | number)[], rows: any[]) => void;
  searchParams: SearchParams;
  onSearch: (newParams: SearchParams) => void;
  onReset: () => void;
  fetchData: () => Promise<void>;
}

export interface UseModalTableReturn extends UseTableDataReturn {
  modalOpen: Ref<boolean>; // 暴露 modalOpen ref，用于 v-model:open 绑定
  modalLoading: Ref<boolean>; // 模态框内部的 loading 状态
  // openModalAndFetch 函数替代了之前的 openModal，因为它会立即触发数据加载
  openModalAndFetch: () => void;
}

export function useModalTable(
  config: ModalTableConfig
): UseModalTableReturn {
  const modalOpen = ref(false); // 直接控制模态框的打开状态
  const modalLoading = ref(false); // 模态框内部的 loading 状态

  // 内部使用 useTableData 来管理模态框内部的表格数据和分页、搜索逻辑
  // 这里的 UseTableDataReturn 接口需要从 useTableData.ts 文件中导入或复制过来
  const {
    pagination,
    tableData,
    handleTableChange,
    selectedRowKeys,
    onSelectChange,
    searchParams,
    onSearch, // 这个 onSearch 内部会调用 fetchData
    onReset,  // 这个 onReset 内部会调用 fetchData
    fetchData: internalFetchData // 内部的数据获取函数，避免命名冲突
  } = useTableData(config.getListFn, config.initialSearchParams, config.paramPreparer);

  // 包装 internalFetchData，添加 loading 状态
  const fetchDataWithLoading = async () => {
    modalLoading.value = true;
    try {
      await internalFetchData();
    } finally {
      modalLoading.value = false;
    }
  };

  // 开放给外部调用的函数，用于打开模态框并触发数据加载
  const openModalAndFetch = () => {
    modalOpen.value = true;
    // 每次打开模态框时，重置分页和搜索参数，并重新加载数据
    pagination.value = { page: 1, limit: 10, total: 0 };
    // 注意：这里我们使用 Object.assign 来更新 reactive 的 searchParams 对象，
    // 确保引用不变，以便 Vue 能正确追踪
    Object.assign(searchParams, config.initialSearchParams || {});
    selectedRowKeys.value = []; // 清空选中项
    
    fetchDataWithLoading(); // 立即触发数据加载
  };

  return {
    modalOpen, // 暴露给外部绑定 v-model:open
    modalLoading,
    pagination,
    tableData,
    handleTableChange,
    selectedRowKeys,
    onSelectChange,
    searchParams,
    // onSearch 和 onReset 仍然是 useTableData 提供的，它们内部会调用 fetchDataWithLoading
    onSearch: (newParams) => {
      Object.assign(searchParams, newParams); // 确保外部传入的参数更新到 searchParams
      pagination.value.page = 1; // 搜索时重置页码
      fetchDataWithLoading();
    },
    onReset: () => {
      Object.keys(searchParams).forEach(key => delete searchParams[key]);
      Object.assign(searchParams, config.initialSearchParams || {});
      pagination.value.page = 1; // 重置页码
      fetchDataWithLoading();
    },
    fetchData: fetchDataWithLoading, // 暴露带 loading 的 fetchData
    openModalAndFetch // 暴露打开模态框并加载数据的方法
  };
}