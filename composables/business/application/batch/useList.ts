import { ref, h } from 'vue';
import { useTableData } from '~/composables/useTableData';
import StatusTag from '~/components/common/statusTag.vue';
import { getTaskStatistics, getTaskPageList } from '~/apis/business/publish'

export function useList() {
  const tableLoading = ref(false); // 主表格的 loading 状态

  const initialPageSearchParams = {
    userId: '',
    taskId: '',
    status: null,
    startTime: '',
    endTime: '',
  };

  const statsData = ref([
    { title: '总刊登', value: 0 },
    { title: '成功率', value: '0%' },
    { title: '进行中', value: '0' },
    { title: '今日刊登', value: 0 }
  ]);

  const tableColumns = [
    { title: '刊登ID', dataIndex: 'titleId' },
    { title: '刊登平台', dataIndex: 'platform' },
    { title: '刊登模版', dataIndex: 'templateId' },
    { title: '商品数量', dataIndex: 'titleNum' },
    {
      title: '任务状态',
      dataIndex: 'titleStatus',
      key: 'titleStatus',
      customRender: ({ text }: { text: any }) => {
        return h(StatusTag, { value: text, type: 'status' });
      }
    },
    { title: '创建人', dataIndex: 'createBy' },
    { title: '创建时间', dataIndex: 'createTime' },
    { title: '操作', key: 'action' }
  ];

  const searchFields = [
    { key: 'userId', component: 'a-input', props: { placeholder: '创建人ID', allowClear: true } },
    { key: 'taskId', component: 'a-input', props: { placeholder: '刊登ID', allowClear: true } },
    {
      key: 'status',
      component: 'a-select',
      props: {
        placeholder: '刊登状态',
        allowClear: true,
        options: [
          { label: '待执行', value: 0 },
          { label: '进行中', value: 1 },
          { label: '已完成', value: 2 },
          { label: '部分失败', value: 3 },
          { label: '失败', value: 4 }
        ]
      }
    },
    {
      key: 'date',
      component: 'a-range-picker',
      props: {
        placeholder: ['开始日期', '结束日期'],
        showTime: { format: 'HH:mm:ss' },
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
      }
    }
  ];

  const getCount = async () => {
    const res = await getTaskStatistics();
    if (res.code === 200) {
      statsData.value[0].value = res.data.totalTasks;
      statsData.value[1].value = `${(res.data.successRate * 100).toFixed(2)}%`;
      statsData.value[2].value = res.data.processingTasks;
      statsData.value[3].value = res.data.todayTasks;
    }
  };

  const getTaskListForTable = async (params: Record<string, any>) => {
    tableLoading.value = true;
    try {
      const res = await getTaskPageList(params);
      if (res.code === 200) {
        return { list: res.data.records, total: res.data.total };
      } else {
        console.error("获取列表失败:", res.message);
        return { list: [], total: 0 };
      }
    } catch (error) {
      console.error("请求列表 API 异常:", error);
      return { list: [], total: 0 };
    } finally {
      tableLoading.value = false;
    }
  };

  const myPageParamPreparer = (
    rawParams: Record<string, any>,
    paginationConfig: { page: number; limit: number; total: number }
  ): Record<string, any> => {
    const finalParams: Record<string, any> = {
      page: paginationConfig.page,
      limit: paginationConfig.limit,
    };

    Object.keys(rawParams).forEach(key => {
      const value = rawParams[key];
      if (key === 'date') {
        if (Array.isArray(value) && value.length === 2) {
          finalParams.startTime = value[0];
          finalParams.endTime = value[1];
        }
      } else if (value !== '' && value !== null && value !== undefined && !(Array.isArray(value) && value.length === 0)) {
        finalParams[key] = value;
      }
    });
    return finalParams;
  };

  const {
    pagination,
    tableData,
    handleTableChange,
    selectedRowKeys,
    onSelectChange,
    searchParams, // 暴露 searchParams 供 PageSearch v-model 绑定
    onSearch,
    onReset,
    fetchData // 更名为 fetchMainTableData 避免混淆
  } = useTableData(getTaskListForTable, initialPageSearchParams, myPageParamPreparer);

  return {
    statsData,
    getCount,
    tableColumns,
    searchFields,
    pagination,
    tableData,
    tableLoading, // 暴露 loading 状态
    selectedRowKeys,
    onSelectChange,
    handleTableChange,
    searchParams, // 暴露给 dashboard.vue 使用 v-model
    onSearch,
    onReset,
    fetchData // 暴露主表格数据获取方法
  };
}