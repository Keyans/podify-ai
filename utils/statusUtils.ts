// ~/utils/statusUtils.ts

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