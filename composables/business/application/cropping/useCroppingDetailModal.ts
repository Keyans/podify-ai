import { ref, h, type Ref } from 'vue';
import { useModalTable } from '~/composables/useModalTable'; // 确保路径正确
import { getCropperTaskDetail } from '~/apis/business/cropper';
import StatusTag from '~/components/common/statusTag.vue';
import CommonImage from '~/components/common/commonImage.vue';
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

export function useCollectorDetailModal(): UseCollectorDetailModalReturn { // 🚀 不再接收 tableModalRef
  const subTitle = ref('截图详情');
  const currentCollectorId = ref<string | number | null>(null);

  const subStatsData = ref([
    { title: '目标数', value: 0 },
    { title: '成功数', value: 0 },
    { title: '失败数', value: 0 }
  ]);

  const subTableColumns = [
    { title: '详情ID', dataIndex: 'cropperId' },
    {
      title: '原图',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      customRender: ({ text }: { text: any }) => {
        return h(CommonImage, { src: text, alt: '原图' });
      }
    },
    {
      title: '裁切图',
      dataIndex: 'resultsImageUrl',
      key: 'resultsImageUrl',
      customRender: ({ text }: { text: any }) => {
        return h(CommonImage, { src: text, alt: '原图' });
      }
    },
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
      customRender: ({ text, record }: { text: string , record: any}) => {
        const imageUrl = record.resultsImageUrl | record.imageUrl; // 假设图片URL在 record.imageUrl 字段中
        const imageName = record.cropperId ? `${record.cropperId}_image.png` : 'image.png'; // 假设根据订单ID生成文件名
        return h('a', { href: imageUrl, download: imageName }, '下载图片');
      }
    }
  ];

  const initialSubDetailSearchParams = {
    status: '',
  };

  const subSearchFields = ref([
    {
      key: 'status',
      component: 'a-select',
      props: {
        placeholder: '完成状态',
        allowClear: true,
        options: [
          { label: '全部', value: '' },
          { label: '待执行', value: 0 },
          { label: '进行中', value: 1 },
          { label: '已完成', value: 2 },
          { label: '部分失败', value: 3 },
          { label: '失败', value: 4 }
        ],
        style: { width: '100px' } 
      }
    },
  ]);

  const getSubListForTable = async (params: Record<string, any>) => {
    try {
      const res = await getCropperTaskDetail(params);
      if (res.code === 200) {
        return { list: res.data.cropperList, total: res.data.total };
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
    currentCollectorId.value = record.cropperId;

    subTitle.value = `采集详情: 任务ID | ${record.cropperId}`;
    subStatsData.value = [
      { title: '目标数', value: record.cropperNum },
      { title: '成功数', value: record.cropperSuccessNum },
      { title: '失败数', value: record.cropperFailNum }
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