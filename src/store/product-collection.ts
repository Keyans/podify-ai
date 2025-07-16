import { reactive } from 'vue';

// 采集类型枚举
export enum CollectionType {
  PRODUCT = 'product',
  STORE = 'store', 
  SEARCH = 'search',
  OTHER = 'other'
}

// 平台枚举
export enum Platform {
  AMAZON = 'amazon',
  TEMU = 'temu',
  SHEIN = 'shein'
}

// 采集状态枚举
export enum CollectionStatus {
  PENDING = '待开始',
  IN_PROGRESS = '进行中',
  COMPLETED = '已完成',
  FAILED = '失败',
  PARTIAL_FAILED = '部分失败'
}

// 采集任务接口
export interface CollectionTask {
  id: string;
  type: string;
  platform: string;
  targetCount: number;
  successCount: number;
  status: string;
  collector: string;
  createTime: string;
  links?: string;
  keyword?: string;
  failureReason?: string;
}

// 采集详情接口
export interface CollectionDetail {
  index: number;
  title?: string;
  mainImage?: string;
  price?: string;
  rating?: number;
  status: string;
  originalUrl?: string;
  failureReason?: string;
}

// 创建采集表单接口
export interface CreateCollectionForm {
  type: CollectionType;
  links: string;
  keyword: string;
  platform: Platform;
}

// 全局状态
export const collectionStore = reactive({
  // 采集任务列表
  tasks: [
    {
      id: 'COL001',
      type: '商品',
      platform: '亚马逊',
      targetCount: 100,
      successCount: 95,
      status: CollectionStatus.COMPLETED,
      collector: 'admin',
      createTime: '2024-01-15 10:30:00',
      links: 'https://amazon.com/product1\nhttps://amazon.com/product2'
    },
    {
      id: 'COL002', 
      type: '店铺',
      platform: 'Temu',
      targetCount: 50,
      successCount: 45,
      status: CollectionStatus.PARTIAL_FAILED,
      collector: 'admin',
      createTime: '2024-01-14 14:20:00',
      links: 'https://temu.com/store1',
      failureReason: '部分商品链接失效'
    },
    {
      id: 'COL003',
      type: '搜索',
      platform: 'Shein',
      targetCount: 200,
      successCount: 150,
      status: CollectionStatus.IN_PROGRESS,
      collector: 'admin',
      createTime: '2024-01-13 09:15:00',
      keyword: 'women dress'
    },
    {
      id: 'COL004',
      type: '商品',
      platform: '亚马逊',
      targetCount: 30,
      successCount: 0,
      status: CollectionStatus.FAILED,
      collector: 'admin',
      createTime: '2024-01-12 16:45:00',
      links: 'https://amazon.com/invalid-product',
      failureReason: '所有商品链接均无效'
    }
  ] as CollectionTask[],

  // 当前页码和页面大小
  pagination: {
    currentPage: 1,
    pageSize: 20,
    total: 0
  },

  // 加载状态
  loading: false
});

// 获取采集任务列表
export const getCollectionTasks = (page: number = 1, size: number = 20) => {
  collectionStore.loading = true;
  
  return new Promise<{ data: CollectionTask[], total: number }>((resolve) => {
    setTimeout(() => {
      const start = (page - 1) * size;
      const end = start + size;
      const data = collectionStore.tasks.slice(start, end);
      const total = collectionStore.tasks.length;
      
      collectionStore.pagination.currentPage = page;
      collectionStore.pagination.pageSize = size;
      collectionStore.pagination.total = total;
      collectionStore.loading = false;
      
      resolve({ data, total });
    }, 500);
  });
};

// 创建新的采集任务
export const createCollectionTask = (form: CreateCollectionForm) => {
  return new Promise<CollectionTask>((resolve) => {
    setTimeout(() => {
      const newTask: CollectionTask = {
        id: `COL${String(collectionStore.tasks.length + 1).padStart(3, '0')}`,
        type: getTypeDisplayName(form.type),
        platform: getPlatformDisplayName(form.platform),
        targetCount: form.type === CollectionType.SEARCH ? 100 : (form.links?.split('\n').filter(l => l.trim()).length || 0),
        successCount: 0,
        status: CollectionStatus.PENDING,
        collector: 'admin',
        createTime: new Date().toLocaleString('zh-CN'),
        links: form.links,
        keyword: form.keyword
      };
      
      collectionStore.tasks.unshift(newTask);
      resolve(newTask);
    }, 1000);
  });
};

// 获取采集详情
export const getCollectionDetails = (_taskId: string, page: number = 1, size: number = 20) => {
  return new Promise<{ data: CollectionDetail[], total: number }>((resolve) => {
    setTimeout(() => {
      // 模拟详情数据
      const mockDetails: CollectionDetail[] = [
        {
          index: 1,
          title: 'Apple iPhone 15 Pro Max 256GB Natural Titanium',
          mainImage: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=200&h=200&fit=crop',
          price: '$1,199.00',
          rating: 4.5,
          status: '成功',
          originalUrl: 'https://amazon.com/example1'
        },
        {
          index: 2,
          title: 'Samsung Galaxy S24 Ultra 512GB Titanium Black',
          mainImage: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop',
          price: '$1,299.99',
          rating: 4.3,
          status: '成功',
          originalUrl: 'https://amazon.com/example2'
        },
        {
          index: 3,
          title: '',
          mainImage: '',
          price: '',
          rating: 0,
          status: '失败',
          originalUrl: 'https://amazon.com/example3',
          failureReason: '商品页面无法访问'
        }
      ];
      
      const start = (page - 1) * size;
      const end = start + size;
      const data = mockDetails.slice(start, end);
      const total = mockDetails.length;
      
      resolve({ data, total });
    }, 300);
  });
};

// 辅助函数
const getTypeDisplayName = (type: CollectionType): string => {
  const typeMap = {
    [CollectionType.PRODUCT]: '商品',
    [CollectionType.STORE]: '店铺',
    [CollectionType.SEARCH]: '搜索',
    [CollectionType.OTHER]: '其他'
  };
  return typeMap[type] || '未知';
};

const getPlatformDisplayName = (platform: Platform): string => {
  const platformMap = {
    [Platform.AMAZON]: '亚马逊',
    [Platform.TEMU]: 'Temu',
    [Platform.SHEIN]: 'Shein'
  };
  return platformMap[platform] || '未知';
};

// 导出表格数据
export const exportCollectionData = (format: 'excel' | 'csv' = 'excel') => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      console.log(`导出${format}格式的采集数据...`);
      resolve();
    }, 1000);
  });
};

// 下载采集插件
export const downloadPlugin = () => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      console.log('下载采集插件...');
      resolve();
    }, 500);
  });
};
