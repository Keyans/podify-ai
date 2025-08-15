import { ref, h } from 'vue';
import { useTableData } from '~/composables/useTableData';
import StatusTag from '~/components/common/statusTag.vue';
import { getDetectionStats, getDetectionTaskList } from '~/apis/business/detection'

export function useList() {
  const tableLoading = ref(false); // 主表格的 loading 状态

  const initialPageSearchParams = {
    userId: '',
    taskId: '',
    collectorPlatform: '',
    collectorStatus: '',
    startTime: '',
    endTime: '',
  };

  const statsData = ref([
    { title: '总风险数', value: 0 },
    { title: '高风险数', value: 0 },
    { title: '中风险数', value:0 },
    { title: '低风险数', value: 0 },
    { title: '无风险数', value: 0 }
  ]);

  const tableColumns = [
    { title: '检测ID', dataIndex: 'taskNo' },
    {
      title: '检测数量',
      dataIndex: 'targetCount',
      key: 'targetCount',
      customRender: ({ record }: { record: any }) => {
        const targetCount = record.targetCount || 0;
        const successCount = record.completedCount || 0;
        return h('div', {}, [
          h('div', {}, `目标 : ${targetCount}`),
          h('div', { style: { color: 'green' } }, `成功 : ${successCount}`)
        ]);
      }
    },
    {
      title: '风险风布',
      dataIndex: 'highRiskCount',
      key: 'highRiskCount',
      customRender: ({ record }: { record: any }) => {
        const highRiskCount = record.highRiskCount || 0;
        const mediumRiskCount = record.mediumRiskCount || 0;
        const lowRiskCount = record.lowRiskCount || 0;
        return h('div', {}, [
          h('div', {}, `高风险 : ${highRiskCount}`),
          h('div', {}, `中风险 : ${mediumRiskCount}`),
          h('div', {}, `低风险 : ${lowRiskCount}`),
        ]);
      }
    },
    {
      title: '检测状态',
      dataIndex: 'status',
      key: 'status',
      customRender: ({ text }: { text: any }) => {
        return h(StatusTag, { value: text, type: 'status' });
      }
    },
    { title: '创建人', dataIndex: 'operator' },
    { title: '创建时间', dataIndex: 'createTime' },
    { title: '操作', key: 'action' }
  ];

  const searchFields = [
    { key: 'operator', component: 'a-input', props: { placeholder: '创建人Id', allowClear: true } },
    { key: 'taskNo', component: 'a-input', props: { placeholder: '检测ID', allowClear: true } },
    {
      key: 'status',
      component: 'a-select',
      props: {
        placeholder: '检测状态',
        allowClear: true,
        style: { width: '150px' }, 
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
    const res = await getDetectionStats();
    if (res.code === 200) {
      statsData.value[0].value = res.data.totalCount;
      statsData.value[1].value = res.data.highRiskCount;
      statsData.value[2].value = res.data.mediumRiskCount;
      statsData.value[3].value = res.data.lowRiskCount;
      statsData.value[4].value = res.data.noRiskCount;
    }
  };

  const getTaskListForTable = async (params: Record<string, any>) => {
    tableLoading.value = true;
    try {
      const res = await getDetectionTaskList(params);
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
    searchParams, // 暴露给 dashboard.vue 使用 v-model
    onSearch,
    onReset,
    fetchData // 暴露主表格数据获取方法
  };
}