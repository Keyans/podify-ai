import { ref, computed } from 'vue';
import { BillingMode } from '../types/billing';

// 应用计费配置接口
export interface AppBillingConfig {
  appId: string;
  appName: string;
  billingMode: BillingMode;
  unitPrice: number;
  description: string;
  freeQuota?: number; // 免费额度
  minimumCharge?: number; // 最低消费
}

// 用户余额信息
export interface UserBalance {
  balance: number;
  frozenBalance: number;
  availableBalance: number;
  lastUpdateTime: string;
}

// 应用计费配置
const appBillingConfigs: AppBillingConfig[] = [
  {
    appId: 'product-collection',
    appName: '商品采集',
    billingMode: BillingMode.PER_ITEM,
    unitPrice: 0.10,
    description: '按采集商品数量计费，每个商品0.1元',
    freeQuota: 10,
    minimumCharge: 1.00
  },
  {
    appId: 'smart-crop',
    appName: '智能裁图',
    billingMode: BillingMode.PER_ITEM,
    unitPrice: 0.05,
    description: '按处理图片数量计费，每张图片0.05元',
    freeQuota: 20,
    minimumCharge: 0.50
  },
  {
    appId: 'one-click-cutout',
    appName: '一键抠图',
    billingMode: BillingMode.PER_ITEM,
    unitPrice: 0.08,
    description: '按处理图片数量计费，每张图片0.08元',
    freeQuota: 15,
    minimumCharge: 0.80
  },
  {
    appId: 'super-split',
    appName: '超级裂变',
    billingMode: BillingMode.PER_ITEM,
    unitPrice: 0.12,
    description: '按处理图片数量计费，每张图片0.12元',
    freeQuota: 10,
    minimumCharge: 1.20
  },
  {
    appId: 'title-generator',
    appName: '标题生成',
    billingMode: BillingMode.PER_ITEM,
    unitPrice: 0.03,
    description: '按生成标题数量计费，每个标题0.03元',
    freeQuota: 50,
    minimumCharge: 0.30
  },
  {
    appId: 'batch-listing',
    appName: '批量刊登',
    billingMode: BillingMode.PER_ITEM,
    unitPrice: 0.20,
    description: '按刊登商品数量计费，每个商品0.2元',
    freeQuota: 5,
    minimumCharge: 2.00
  },
  {
    appId: 'pod-compose',
    appName: 'POD合成',
    billingMode: BillingMode.PER_ITEM,
    unitPrice: 0.15,
    description: '按合成商品数量计费，每个商品0.15元',
    freeQuota: 8,
    minimumCharge: 1.50
  },
  {
    appId: 'copyright-detection',
    appName: '侵权检测',
    billingMode: BillingMode.PER_ITEM,
    unitPrice: 0.06,
    description: '按检测图片数量计费，每张图片0.06元',
    freeQuota: 20,
    minimumCharge: 0.60
  }
];

// 响应式状态
const userBalance = ref<UserBalance>({
  balance: 156.78,
  frozenBalance: 23.45,
  availableBalance: 133.33,
  lastUpdateTime: new Date().toISOString()
});

// 用户使用记录（用于计算免费额度）
const userUsageRecord = ref<Record<string, number>>({
  'product-collection': 5,
  'smart-crop': 12,
  'one-click-cutout': 8,
  'super-split': 3,
  'title-generator': 25,
  'batch-listing': 2,
  'pod-compose': 4,
  'copyright-detection': 15
});

// 计算属性
export const availableBalance = computed(() => userBalance.value.availableBalance);

// 获取应用计费配置
export const getAppBillingConfig = (appId: string): AppBillingConfig | null => {
  return appBillingConfigs.find(config => config.appId === appId) || null;
};

// 获取所有应用计费配置
export const getAllAppBillingConfigs = (): AppBillingConfig[] => {
  return [...appBillingConfigs];
};

// 计算实际费用（考虑免费额度）
export const calculateActualCost = (appId: string, quantity: number): number => {
  const config = getAppBillingConfig(appId);
  if (!config) return 0;

  const usedQuota = userUsageRecord.value[appId] || 0;
  const freeQuota = config.freeQuota || 0;
  const remainingFreeQuota = Math.max(0, freeQuota - usedQuota);
  
  // 计算需要付费的数量
  const chargeableQuantity = Math.max(0, quantity - remainingFreeQuota);
  
  // 计算费用
  const cost = chargeableQuantity * config.unitPrice;
  
  // 应用最低消费
  if (cost > 0 && config.minimumCharge && cost < config.minimumCharge) {
    return config.minimumCharge;
  }
  
  return cost;
};

// 检查余额是否充足
export const checkSufficientBalance = (appId: string, quantity: number): boolean => {
  const cost = calculateActualCost(appId, quantity);
  return userBalance.value.availableBalance >= cost;
};

// 获取免费额度信息
export const getFreeQuotaInfo = (appId: string) => {
  const config = getAppBillingConfig(appId);
  if (!config || !config.freeQuota) {
    return null;
  }

  const usedQuota = userUsageRecord.value[appId] || 0;
  const remainingQuota = Math.max(0, config.freeQuota - usedQuota);
  
  return {
    total: config.freeQuota,
    used: usedQuota,
    remaining: remainingQuota,
    percentage: (usedQuota / config.freeQuota) * 100
  };
};

// 预估费用详情
export const getEstimatedCostDetails = (appId: string, quantity: number) => {
  const config = getAppBillingConfig(appId);
  if (!config) {
    return {
      totalCost: 0,
      freeItems: 0,
      chargeableItems: 0,
      unitPrice: 0,
      hasFreeQuota: false,
      quotaInfo: null
    };
  }

  const quotaInfo = getFreeQuotaInfo(appId);
  const freeItems = quotaInfo ? Math.min(quantity, quotaInfo.remaining) : 0;
  const chargeableItems = Math.max(0, quantity - freeItems);
  const baseCost = chargeableItems * config.unitPrice;
  const totalCost = baseCost > 0 && config.minimumCharge && baseCost < config.minimumCharge 
    ? config.minimumCharge 
    : baseCost;

  return {
    totalCost,
    freeItems,
    chargeableItems,
    unitPrice: config.unitPrice,
    hasFreeQuota: !!config.freeQuota,
    quotaInfo,
    minimumCharge: config.minimumCharge
  };
};

// 更新用户余额
export const updateUserBalance = (newBalance: Partial<UserBalance>) => {
  userBalance.value = {
    ...userBalance.value,
    ...newBalance,
    lastUpdateTime: new Date().toISOString()
  };
};

// 扣费操作
export const deductBalance = async (appId: string, quantity: number): Promise<boolean> => {
  const cost = calculateActualCost(appId, quantity);
  
  if (userBalance.value.availableBalance < cost) {
    throw new Error('余额不足');
  }

  // 模拟API调用
  await new Promise(resolve => setTimeout(resolve, 500));

  // 更新余额
  userBalance.value.balance -= cost;
  userBalance.value.availableBalance -= cost;
  
  // 更新使用记录
  userUsageRecord.value[appId] = (userUsageRecord.value[appId] || 0) + quantity;
  
  // 更新时间
  userBalance.value.lastUpdateTime = new Date().toISOString();
  
  return true;
};

// 获取用户余额
export const getUserBalance = () => {
  return { ...userBalance.value };
};

// 刷新余额（模拟从服务器获取）
export const refreshBalance = async (): Promise<UserBalance> => {
  // 模拟API调用
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // 模拟余额变化
  const randomChange = (Math.random() - 0.5) * 10;
  userBalance.value.balance += randomChange;
  userBalance.value.availableBalance = userBalance.value.balance - userBalance.value.frozenBalance;
  userBalance.value.lastUpdateTime = new Date().toISOString();
  
  return { ...userBalance.value };
};

// 导出状态
export { userBalance, userUsageRecord };
