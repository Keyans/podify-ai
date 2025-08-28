import { ref, h, type Ref } from 'vue';
import { useModalTable } from '~/composables/useModalTable'; // 确保路径正确
import { getTextToImageTaskDetail } from '~/apis/business/text-to-image';
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
    { title: '生图数', value: 0 },
    { title: '成功数', value: 0 },
    { title: '失败数', value: 0 }
  ]);

  const subTableColumns = [
    { title: '详情ID', dataIndex: 'creatorId' },
    {
      title: '参考图',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      customRender: ({ text }: { text: any }) => {
        return h(CommonImage, { src: text, alt: '参考图' });
      }
    },
    {
      title: '结果图',
      dataIndex: 'resultsImageUrl',
      key: 'resultsImageUrl',
      customRender: ({ text }: { text: string[] }) => { // 明确 text 是字符串数组
        if (!text || text.length === 0) {
          return h('span', '无图片'); // 如果没有图片，显示“无图片”
        }
        // 使用 map 遍历数组，为每个 URL 创建一个 CommonImage 组件
        return h(
          'div',
          { style: { display: 'flex', flexWrap: 'wrap', gap: '8px' } }, // 可以添加样式来控制图片布局
          text.map((url: string, index: number) => {
            return h(CommonImage, {
              src: url,
              alt: `结果图-${index + 1}`, // 为每张图片提供独特的 alt 文本
              key: url // 或者使用 index 作为 key，如果 URL 不唯一
            });
          })
        );
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
      dataIndex: 'resultsImageUrl',
      key: 'resultsImageUrl',
      customRender: ({ text }: { text: string | string[] }) => {
        if (!text || (typeof text === 'string' && text.trim() === '')) {
          return null; // Handles null, undefined, or empty string
        }
      
        const urls = Array.isArray(text) ? text : [text]; // Ensure urls is always an array
      
        if (urls.length === 0) {
          return '暂无图片'; // No URLs to display
        }
      
        return urls.map((url, index) => {
          if (typeof url !== 'string' || url.trim() === '') {
            return null; // Skip invalid URLs within the array
          }
          return h('a', { href: url, target: '_blank', rel: 'noopener noreferrer', key: url + index }, '访问链接 '); // Added a space for separation
        });
      }
    }
  ];

  const initialSubDetailSearchParams = {
    subSearchId: '',
  };

  const subSearchFields = ref([
    { key: 'subSearchId', component: 'a-input', props: { placeholder: '请输入' } },
  ]);

  const getSubListForTable = async (params: Record<string, any>) => {
    try {
      const res = await getTextToImageTaskDetail(params);
      if (res.code === 200) {
        return { list: res.data.creatorList, total: res.data.total };
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
    currentCollectorId.value = record.creatorId;

    subTitle.value = `生图详情: 任务ID | ${record.creatorId}`;
    subStatsData.value = [
      { title: '生图数', value: record.creatorNum },
      { title: '成功数', value: record.creatorSuccessNum },
      { title: '失败数', value: record.creatorFailNum }
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