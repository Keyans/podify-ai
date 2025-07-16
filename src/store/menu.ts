import { reactive } from 'vue';

// 应用菜单项接口
export interface AppMenuItem {
  id: string;
  name: string;
  path: string;
  icon?: string;
  description?: string;
  category?: string;
  isDefault?: boolean; // 是否为默认应用
}

// 默认的我的应用菜单项
const defaultMyApps: AppMenuItem[] = [
  {
    id: 'product-collection',
    name: '商品采集',
    path: '/my-apps/product-collection',
    icon: '🛒',
    description: '智能采集全球电商平台商品信息',
    category: '数据采集',
    isDefault: true
  },
  {
    id: 'smart-crop',
    name: '智能裁图',
    path: '/my-apps/smart-crop',
    icon: '✂️',
    description: 'AI智能图片裁剪和优化',
    category: '图像处理',
    isDefault: true
  },
  {
    id: 'one-click-cutout',
    name: '一键抠图',
    path: '/my-apps/one-click-cutout',
    icon: '🎨',
    description: '一键智能抠图，去除背景',
    category: '图像处理',
    isDefault: true
  },
  {
    id: 'super-split',
    name: '超级裂变',
    path: '/my-apps/super-split',
    icon: '🚀',
    description: '营销裂变工具，快速传播',
    category: '营销工具',
    isDefault: true
  },
  {
    id: 'copyright-detection',
    name: '侵权检测',
    path: '/my-apps/copyright-detection',
    icon: '🛡️',
    description: 'AI智能图片侵权检测和风险评估',
    category: '图像处理',
    isDefault: true
  },
  {
    id: 'pod-compose',
    name: 'POD合成',
    path: '/my-apps/pod-compose',
    icon: '🎨',
    description: '按需印刷商品合成工具',
    category: '图像处理',
    isDefault: true
  },
  {
    id: 'title-generator',
    name: '标题生成',
    path: '/my-apps/title-generator',
    icon: '📝',
    description: 'AI智能生成吸引人的标题',
    category: '内容创作',
    isDefault: true
  },
  {
    id: 'batch-listing',
    name: '批量刊登',
    path: '/my-apps/batch-listing',
    icon: '📦',
    description: '批量发布商品到各大平台',
    category: '电商工具',
    isDefault: true
  }
];

// 可选的应用列表（用于添加应用）
export const availableApps: AppMenuItem[] = [
  {
    id: 'price-monitor',
    name: '价格监控',
    path: '/my-apps/price-monitor',
    icon: '📊',
    description: '实时监控商品价格变化',
    category: '数据分析'
  },
  {
    id: 'review-analyzer',
    name: '评论分析',
    path: '/my-apps/review-analyzer',
    icon: '💬',
    description: '智能分析商品评论情感',
    category: '数据分析'
  },
  {
    id: 'keyword-research',
    name: '关键词研究',
    path: '/my-apps/keyword-research',
    icon: '🔍',
    description: '挖掘高价值关键词',
    category: 'SEO工具'
  },
  {
    id: 'competitor-analysis',
    name: '竞品分析',
    path: '/my-apps/competitor-analysis',
    icon: '🎯',
    description: '深度分析竞争对手策略',
    category: '市场分析'
  },
  {
    id: 'inventory-management',
    name: '库存管理',
    path: '/my-apps/inventory-management',
    icon: '📋',
    description: '智能库存管理系统',
    category: '管理工具'
  },
  {
    id: 'customer-service',
    name: '客服助手',
    path: '/my-apps/customer-service',
    icon: '🎧',
    description: 'AI智能客服机器人',
    category: '客户服务'
  },
  {
    id: 'data-export',
    name: '数据导出',
    path: '/my-apps/data-export',
    icon: '📤',
    description: '多格式数据导出工具',
    category: '数据工具'
  },
  {
    id: 'report-generator',
    name: '报表生成',
    path: '/my-apps/report-generator',
    icon: '📈',
    description: '自动生成业务报表',
    category: '数据分析'
  }
];

// 从localStorage获取保存的菜单配置
const getSavedMyApps = (): AppMenuItem[] => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('my-apps-menu');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        console.error('Failed to parse saved menu:', error);
      }
    }
  }
  return [...defaultMyApps];
};

// 菜单状态
export const menuStore = reactive({
  myApps: getSavedMyApps(),
  showSettings: false,
  isEditing: false
});

// 保存菜单配置到localStorage
const saveMyApps = () => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('my-apps-menu', JSON.stringify(menuStore.myApps));
  }
};

// 更新我的应用菜单
export const updateMyApps = (apps: AppMenuItem[]) => {
  menuStore.myApps = apps;
  saveMyApps();
};

// 添加应用到我的应用
export const addAppToMyApps = (app: AppMenuItem) => {
  // 检查是否已存在
  const exists = menuStore.myApps.find(item => item.id === app.id);
  if (!exists) {
    menuStore.myApps.push({ ...app });
    saveMyApps();
    return true;
  }
  return false;
};

// 从我的应用中移除应用
export const removeAppFromMyApps = (appId: string) => {
  // 确保至少保留一个应用
  if (menuStore.myApps.length <= 1) {
    return false;
  }

  const index = menuStore.myApps.findIndex(item => item.id === appId);
  if (index > -1) {
    menuStore.myApps.splice(index, 1);
    saveMyApps();
    return true;
  }
  return false;
};

// 恢复默认菜单
export const restoreDefaultMenu = () => {
  menuStore.myApps = [...defaultMyApps];
  saveMyApps();
};

// 切换设置面板显示状态
export const toggleSettings = () => {
  menuStore.showSettings = !menuStore.showSettings;
};

// 切换编辑模式
export const toggleEditMode = () => {
  menuStore.isEditing = !menuStore.isEditing;
};

// 获取未添加的应用列表
export const getAvailableApps = (): AppMenuItem[] => {
  return availableApps.filter(app => 
    !menuStore.myApps.find(myApp => myApp.id === app.id)
  );
};

// 按分类分组应用
export const getAppsByCategory = (apps: AppMenuItem[]) => {
  const grouped: Record<string, AppMenuItem[]> = {};
  apps.forEach(app => {
    const category = app.category || '其他';
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(app);
  });
  return grouped;
};
