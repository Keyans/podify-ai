import { ref, reactive, type Ref } from 'vue'; // 确保导入 Ref

interface PaginationConfig {
  page: number;
  limit: number;
  total: number;
}
// Define a general type for search parameters
interface SearchParams {
    [key: string]: any; // Allow any keys for flexibility
}

// Define the type for the getList function you'll pass from the page
type GetListFunction = (params: Record<string, any>) => Promise<{
    list: any[]; // API 返回的数据列表
    total: number; // API 返回的总条数
}>;

export interface UseTableDataReturn {
  pagination: Ref<PaginationConfig>;
  tableData: Ref<any[]>;
  handleTableChange: (pageConfig: any, filters?: any, sorter?: any) => void;
  selectedRowKeys: Ref<(string | number)[]>;
  onSelectChange: (keys: (string | number)[], rows: any[]) => void;
  searchParams: SearchParams; // 🚀 暴露 searchParams，使其可以被 v-model 绑定
  onSearch: (newParams: SearchParams) => void;
  onReset: () => void;
  fetchData: () => Promise<void>;
}

export function useTableData(getListFn: GetListFunction,
    initialSearchParams: SearchParams = {},
    paramPreparer?: (rawParams: SearchParams, pagination: PaginationConfig) => Record<string, any>
): UseTableDataReturn {
  const pagination = ref<PaginationConfig>({
    page: 1,
    limit: 10,
    total: 0
  });

  const tableData = ref<any[]>([]);
  const selectedRowKeys = ref<(string | number)[]>([]);

  // 🚀 searchParams 保持 reactive
  const searchParams = reactive<SearchParams>({ ...initialSearchParams });

  const fetchData = async () => {
    // 组装原始请求参数：包含当前搜索参数和分页信息
    const rawRequestParams: SearchParams = {
      ...searchParams, // 使用 reactive 的 searchParams
      page: pagination.value.page,
      limit: pagination.value.limit,
    };

    const finalRequestParams = paramPreparer 
      ? paramPreparer(rawRequestParams, pagination.value) 
      : rawRequestParams;

    try {
      const result = await getListFn(finalRequestParams);
      tableData.value = result.list;
      pagination.value.total = result.total;
    } catch (error) {
      console.error('获取表格数据失败:', error);
      tableData.value = [];
      pagination.value.total = 0;
    }
  };
  
  const onSelectChange = (keys: (string | number)[], rows: any[]) => {
    selectedRowKeys.value = keys;
  };

  const handleTableChange = (pageConfig: any, filters?: any, sorter?: any) => {
    pagination.value.page = pageConfig.current;
    pagination.value.limit = pageConfig.pageSize;
    selectedRowKeys.value = []; // 通常分页后清空选中
    fetchData();
  };

  const onSearch = (newParams: SearchParams) => {
    Object.assign(searchParams, newParams); 
    pagination.value.page = 1; // 搜索时重置页码到第一页
    fetchData();
  };

  const onReset = () => {
    // 🚀 重置 searchParams 为初始状态
    Object.keys(searchParams).forEach(key => delete searchParams[key]);
    Object.assign(searchParams, initialSearchParams);
    pagination.value.page = 1; // 重置页码到第一页
    fetchData();
  };

  return {
    pagination,
    tableData,
    handleTableChange,
    selectedRowKeys,
    onSelectChange,
    searchParams, // 🚀 暴露 searchParams
    onSearch,
    onReset,
    fetchData
  };
}