import { reactive } from 'vue';

// 风险等级枚举
export enum RiskLevel {
  NO_RISK = 'no_risk',        // 无风险
  LOW_RISK = 'low_risk',      // 低风险
  MEDIUM_RISK = 'medium_risk', // 中风险
  HIGH_RISK = 'high_risk'     // 高风险
}

// 检测状态枚举
export enum DetectionStatus {
  PENDING = 'pending',        // 等待中
  PROCESSING = 'processing',  // 检测中
  COMPLETED = 'completed',    // 已完成
  FAILED = 'failed'          // 失败
}

// 侵权检测任务接口
export interface CopyrightDetectionTask {
  id: string;
  imageCount: number;
  completedCount: number;
  status: DetectionStatus;
  operator: string;
  createTime: string;
  riskSummary?: {
    noRisk: number;
    lowRisk: number;
    mediumRisk: number;
    highRisk: number;
  };
}

// 检测结果接口
export interface DetectionResult {
  id: string;
  taskId: string;
  fileName: string;
  originalImage: string;
  riskLevel: RiskLevel;
  confidence: number; // 置信度 0-100
  similarImages?: SimilarImage[];
  detectionTime: string;
}

// 相似图片接口
export interface SimilarImage {
  id: string;
  url: string;
  source: string; // 来源网站
  similarity: number; // 相似度 0-100
  copyright?: string; // 版权信息
}

// 图片文件接口
export interface ImageFile {
  id: number | string;
  name: string;
  url: string;
  file?: File;
}

// 全局状态
export const copyrightDetectionStore = reactive({
  // 检测任务列表
  tasks: [
    {
      id: 'CD001',
      imageCount: 25,
      completedCount: 25,
      status: DetectionStatus.COMPLETED,
      operator: 'admin',
      createTime: '2024-01-15 14:30:00',
      riskSummary: {
        noRisk: 15,
        lowRisk: 6,
        mediumRisk: 3,
        highRisk: 1
      }
    },
    {
      id: 'CD002',
      imageCount: 18,
      completedCount: 12,
      status: DetectionStatus.PROCESSING,
      operator: 'admin',
      createTime: '2024-01-15 16:20:00'
    },
    {
      id: 'CD003',
      imageCount: 30,
      completedCount: 30,
      status: DetectionStatus.COMPLETED,
      operator: 'admin',
      createTime: '2024-01-14 10:15:00',
      riskSummary: {
        noRisk: 20,
        lowRisk: 8,
        mediumRisk: 2,
        highRisk: 0
      }
    },
    {
      id: 'CD004',
      imageCount: 8,
      completedCount: 0,
      status: DetectionStatus.PENDING,
      operator: 'admin',
      createTime: '2024-01-15 18:45:00'
    },
    {
      id: 'CD005',
      imageCount: 15,
      completedCount: 0,
      status: DetectionStatus.FAILED,
      operator: 'admin',
      createTime: '2024-01-13 09:30:00'
    }
  ] as CopyrightDetectionTask[],

  // 检测结果列表（示例数据）
  results: [
    {
      id: 'DR001',
      taskId: 'CD001',
      fileName: 'product_image_001.jpg',
      originalImage: 'https://picsum.photos/400/400?random=1',
      riskLevel: RiskLevel.HIGH_RISK,
      confidence: 95,
      similarImages: [
        {
          id: 'SI001',
          url: 'https://picsum.photos/400/400?random=101',
          source: 'shutterstock.com',
          similarity: 95,
          copyright: 'Shutterstock Inc.'
        },
        {
          id: 'SI002',
          url: 'https://picsum.photos/400/400?random=102',
          source: 'getty.com',
          similarity: 88,
          copyright: 'Getty Images'
        }
      ],
      detectionTime: '2024-01-15 14:32:15'
    },
    {
      id: 'DR002',
      taskId: 'CD001',
      fileName: 'product_image_002.jpg',
      originalImage: 'https://picsum.photos/400/400?random=2',
      riskLevel: RiskLevel.MEDIUM_RISK,
      confidence: 72,
      similarImages: [
        {
          id: 'SI003',
          url: 'https://picsum.photos/400/400?random=103',
          source: 'unsplash.com',
          similarity: 72,
          copyright: 'Unsplash License'
        }
      ],
      detectionTime: '2024-01-15 14:32:28'
    },
    {
      id: 'DR003',
      taskId: 'CD001',
      fileName: 'product_image_003.jpg',
      originalImage: 'https://picsum.photos/400/400?random=3',
      riskLevel: RiskLevel.LOW_RISK,
      confidence: 45,
      similarImages: [
        {
          id: 'SI004',
          url: 'https://picsum.photos/400/400?random=104',
          source: 'pexels.com',
          similarity: 45,
          copyright: 'Pexels License'
        }
      ],
      detectionTime: '2024-01-15 14:32:41'
    },
    {
      id: 'DR004',
      taskId: 'CD001',
      fileName: 'product_image_004.jpg',
      originalImage: 'https://picsum.photos/400/400?random=4',
      riskLevel: RiskLevel.NO_RISK,
      confidence: 15,
      similarImages: [],
      detectionTime: '2024-01-15 14:32:55'
    }
  ] as DetectionResult[]
});

// 获取风险等级显示名称
export const getRiskLevelText = (level: RiskLevel): string => {
  const levelTexts = {
    [RiskLevel.NO_RISK]: '无风险',
    [RiskLevel.LOW_RISK]: '低风险',
    [RiskLevel.MEDIUM_RISK]: '中风险',
    [RiskLevel.HIGH_RISK]: '高风险'
  };
  return levelTexts[level];
};

// 获取风险等级颜色
export const getRiskLevelColor = (level: RiskLevel): string => {
  const levelColors = {
    [RiskLevel.NO_RISK]: 'success',
    [RiskLevel.LOW_RISK]: 'warning',
    [RiskLevel.MEDIUM_RISK]: 'danger',
    [RiskLevel.HIGH_RISK]: 'danger'
  };
  return levelColors[level];
};

// 获取状态显示名称
export const getStatusText = (status: DetectionStatus): string => {
  const statusTexts = {
    [DetectionStatus.PENDING]: '等待中',
    [DetectionStatus.PROCESSING]: '检测中',
    [DetectionStatus.COMPLETED]: '已完成',
    [DetectionStatus.FAILED]: '失败'
  };
  return statusTexts[status];
};

// 获取任务的检测结果
export const getTaskResults = (taskId: string): DetectionResult[] => {
  return copyrightDetectionStore.results.filter(result => result.taskId === taskId);
};

// 创建新的检测任务
export const createDetectionTask = (imageCount: number): Promise<CopyrightDetectionTask> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newTask: CopyrightDetectionTask = {
        id: `CD${String(copyrightDetectionStore.tasks.length + 1).padStart(3, '0')}`,
        imageCount,
        completedCount: 0,
        status: DetectionStatus.PENDING,
        operator: 'admin',
        createTime: new Date().toLocaleString('zh-CN')
      };
      
      copyrightDetectionStore.tasks.unshift(newTask);
      resolve(newTask);
    }, 1000);
  });
};
