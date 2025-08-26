// ~/utils/statusUtils.ts

// 任务类型枚举
export const TASK_TYPE_ENUM = {
    PRODUCT_COLLECTOR: { value: 1, label: "商品采集" },
    SMART_IMAGE_CROPPER: { value: 2, label: "智能截图" },
    SMART_MATTING: { value: 3, label: "一键抠图" },
    SUPER_FISSION_ENGINE: { value: 4, label: "超级裂变" },
    INFRINGEMENT_DETECTOR: { value: 5, label: "侵权检测" },
    POD_COMPOSER: { value: 6, label: "POD合成" },
    TITLE_GENERATOR: { value: 7, label: "标题生成" },
    BULK_PUBLISHER: { value: 8, label: "批量刊登" },
    TEXT_IMAGE_CREATOR: { value: 9, label: "文生图" },
} as const;

// 任务类型映射（用于根据数值获取标签）
export const TASK_TYPE_MAP = {
    1: TASK_TYPE_ENUM.PRODUCT_COLLECTOR,
    2: TASK_TYPE_ENUM.SMART_IMAGE_CROPPER,
    3: TASK_TYPE_ENUM.SMART_MATTING,
    4: TASK_TYPE_ENUM.SUPER_FISSION_ENGINE,
    5: TASK_TYPE_ENUM.INFRINGEMENT_DETECTOR,
    6: TASK_TYPE_ENUM.POD_COMPOSER,
    7: TASK_TYPE_ENUM.TITLE_GENERATOR,
    8: TASK_TYPE_ENUM.BULK_PUBLISHER,
    9: TASK_TYPE_ENUM.TEXT_IMAGE_CREATOR,
} as const;

// 获取任务类型信息
export const getTaskTypeInfo = (taskType: number) => {
    return TASK_TYPE_MAP[taskType as keyof typeof TASK_TYPE_MAP] || { value: taskType, label: '未知任务类型' };
};

// 配置状态、平台、类型映射
const statusMaps = {
    'status': {
        0: { text: '待执行', color: 'default' },
        1: { text: '进行中', color: 'processing' },
        2: { text: '已完成', color: 'success' },
        3: { text: '部分失败', color: 'warning' },
        4: { text: '失败', color: 'error' }
    },
    'platform': {
        1: { text: 'TEMU', color: '#f50' },
        2: { text: '亚马逊', color: 'orange' },
        3: { text: 'Shein', color: 'blue' },
    },
    'type': {
        1: { text: '商品', color: 'pink' },
        2: { text: '店铺', color: 'cyan' },
        3: { text: '搜索', color: 'purple' },
        4: { text: '其他', color: 'geekblue' },
    },
    'riskLevel': {
        0: { text: '无风险', color: 'green' },
        1: { text: '低风险', color: 'cyan' },
        2: { text: '中风险', color: 'orange' },
        3: { text: '高风险', color: 'red' },
    }
} as {
    [key: string]: Record<number, { text: string; color: string }>;
};
// 使用 export 导出这个函数
export const getStatusText = (status: string | number, type: string) => {
    const map = statusMaps[type];
    const result = map?.[Number(status)] || { text: '未知', color: 'default' };
    return result;
};