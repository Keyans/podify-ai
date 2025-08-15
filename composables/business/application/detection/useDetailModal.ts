import { ref, h, type Ref } from 'vue';
import { useModalTable } from '~/composables/useModalTable'; // 确保路径正确
import { getDetectionTaskDetail, getDetectionTaskInfo } from '~/apis/business/detection'
import StatusTag from '~/components/common/statusTag.vue';
import CommonImage from '~/components/common/commonImage.vue';

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
  const subTitle = ref('抠图详情');
  const currentCollectorId = ref<string | number | null>(null);

  const subStatsData = ref([
    { title: '目标数', value: 0 },
    { title: '成功数', value: 0 },
    { title: '失败数', value: 0 }
  ]);

  const subTableColumns = [
    { title: '详情ID', dataIndex: 'taskId' },
    {
      title: '原图',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      customRender: ({ text }: { text: any }) => {
        return h(CommonImage, { src: text, alt: '原图' });
      }
    },
    {
      title: '风险等级',
      dataIndex: 'status',
      key: 'status',
      customRender: ({ text }: { text: any }) => {
        return h(StatusTag, { value: text, type: 'riskLevel' });
      }
    },
    {
      title: '风险标签',
      dataIndex: 'reason',
      key: 'reason',
    },
    {
      title: '可信度',
      dataIndex: 'confidence',
      key: 'confidence',
      customRender: ({ text }: { text: any }) => {
        return h('div', `${(text * 100).toFixed(2)}%`);
      }
    },
    {
      title: '检测时间',
      dataIndex: 'createTime',
      key: 'createTime'
    }
  ];

  const initialSubDetailSearchParams = {
    status: '',
  };

  const subSearchFields = ref([
    {
      key: 'riskLevel',
      component: 'a-select',
      props: {
        placeholder: '风险等级',
        allowClear: true,
        options: [
          { label: '全部', value: '' },
          { label: '无风险', value: 0 },
          { label: '低风险', value: 1 },
          { label: '中风险', value: 2 },
          { label: '高风险', value: 3 },
        ],
        style: { width: '100px' } 
      }
    },
  ]);

  const getSubListForTable = async (params: Record<string, any>) => {
    try {
      const res = await getDetectionTaskDetail(params);
      if (res.code === 200) {
        return { list: res.data, total: res.data.total };
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
    currentCollectorId.value = record.id;

    subTitle.value = `检测详情: 任务ID | ${record.id}`;
    subStatsData.value = [
      { title: '目标数', value: record.targetCount },
      { title: '高风险', value: record.highRiskCount },
      { title: '中风险', value: record.mediumRiskCount },
      { title: '低风险', value: record.lowRiskCount },
      { title: '完成数', value: record.noRiskCount }
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