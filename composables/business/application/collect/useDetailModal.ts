import { ref, h, type Ref } from 'vue';
import { useModalTable } from '~/composables/useModalTable'; // 确保路径正确
import { getTaskDetail } from '~/apis/business/collector';
import StatusTag from '~/components/common/statusTag.vue';
import CommonImage from '~/components/common/commonImage.vue';
import { Tooltip } from 'ant-design-vue';
import { getStatusText } from '~/utils/statusUtils';

// 定义返回接口
export interface UseCollectorDetailModalReturn {
  subTitle: Ref<string>;
  subStatsData: Ref<{ title: string; value: string | number }[]>;
  subTableColumns: any[];
  subSearchFields: any[];

  subTableData: Ref<any[]>;
  subTableLoading: Ref<boolean>; // 使用 modalLoading 命名
  subTablePagination: Ref<{ page: number; limit: number; total: number }>;
  subSelectedRowKeys: Ref<(string | number)[]>;
  subDetailSearchParams: Record<string, any>; // 暴露给 v-model

  handleSubSearch: (newParams: any) => void;
  handleSubReset: () => void;
  handleSubTableChange: (pagination: any, filters?: any, sorter?: any) => void;
  onSubSelectChange: (keys: (string | number)[], rows: any[]) => void;

  openCollectorDetailModal: (record: any) => Promise<void>;
  modalOpen: Ref<boolean>; // 🚀 暴露 modalOpen 供 dashboard.vue 中的 v-model:open 绑定
}

export function useDetailModal(): UseCollectorDetailModalReturn { // 🚀 不再接收 tableModalRef
  const subTitle = ref('采集详情');
  const currentCollectorId = ref<string | number | null>(null);

  const subStatsData = ref([
    { title: '采集类型', value: '' },
    { title: '采集平台', value: '' },
    { title: '目标数', value: 0 },
    { title: '成功数', value: 0 }
  ]);

  const subTableColumns = [
    { title: '详情ID', dataIndex: 'id' },
    {
      title: '主图',
      dataIndex: 'image',
      key: 'image',
      customRender: ({ text }: { text: any }) => {
        return h(CommonImage, { src: text, alt: '采集主图' });
      }
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 200,
      customRender: ({ text }: { text: string }) => {
        const maxLength = 20;
        const isEllipsis = text && text.length > maxLength;
        const displayedText = isEllipsis ? text.slice(0, maxLength) + '...' : text;
        return h(
          Tooltip,
          { title: isEllipsis ? text : '', placement: 'topLeft' },
          h('div', { style: { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, displayedText)
        );
      },
    },
    { title: '价格', dataIndex: 'price' },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      customRender: ({ text }: { text: any }) => {
        return h(StatusTag, { value: text, type: 'status' });
      }
    },
    {
      title: '操作',
      dataIndex: 'url',
      key: 'url',
      customRender: ({ text }: { text: string }) => {
        if (!text || typeof text !== 'string' || text.trim() === '') {
          return null;
        }
        return h('a', { href: text,style:{color:'#1890ff',cursor:'pointer'}, target: '_blank', rel: 'noopener noreferrer' }, '访问链接');
      }
    }
  ];

  const initialSubDetailSearchParams = {
    subSearchId: '',
  };

  const subSearchFields = ref([
    { key: 'subSearchId', component: 'a-input', props: { placeholder: '请输入标题搜素' } },
  ]);

  const getSubListForTable = async (params: Record<string, any>) => {
    try {
      const res = await getTaskDetail(params);
      if (res.code === 200) {
        return { list: res.data.productList, total: res.data.total };
      } else {
        console.error("获取子任务列表失败:", res.message);
        return { list: [], total: 0 };
      }
    } catch (error) {
      console.error("请求子任务 API 异常:", error);
      return { list: [], total: 0 };
    }
  };

  const subTableParamPreparer = (
    rawParams: Record<string, any>,
    paginationConfig: { page: number; limit: number; total: number }
  ): Record<string, any> => {
    const finalParams: Record<string, any> = {
      page: paginationConfig.page,
      limit: paginationConfig.limit,
      taskId: currentCollectorId.value, // 核心：将主采集ID带入子表格请求
    };

    Object.keys(rawParams).forEach(key => {
      const value = rawParams[key];
      finalParams[key] = value;
    });
    return finalParams;
  };

  // 🚀 调用 useModalTable，不再传入 ref
  const {
    modalOpen, // 🚀 从 useModalTable 获取 modalOpen
    modalLoading: subTableLoading,
    tableData: subTableData,
    pagination: subTablePagination,
    selectedRowKeys: subSelectedRowKeys,
    searchParams: subDetailSearchParams,
    onSearch: handleSubSearch,
    onReset: handleSubReset,
    handleTableChange: handleSubTableChange,
    onSelectChange: onSubSelectChange,
    openModalAndFetch: fetchSubTableData // 🚀 使用 openModalAndFetch 替代 fetchData
  } = useModalTable({
    getListFn: getSubListForTable,
    initialSearchParams: initialSubDetailSearchParams,
    paramPreparer: subTableParamPreparer,
  });

  const openCollectorDetailModal = async (record: any) => {
    currentCollectorId.value = record.collectorId;

    subTitle.value = `采集详情: 任务ID | ${record.collectorId}`;
    subStatsData.value = [
      { title: '采集类型', value: getStatusText(record.collectorType, 'type').text },
      { title: '采集平台', value: getStatusText(record.collectorPlatform, 'platform').text },
      { title: '目标数', value: record.collectorNum },
      { title: '成功数', value: record.collectorSuccessNum }
    ];

    fetchSubTableData(); // 🚀 调用 openModalAndFetch 来打开模态框并触发数据加载
  };

  return {
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
    modalOpen, // 🚀 暴露 modalOpen
  };
}