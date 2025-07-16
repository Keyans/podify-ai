import { ref, computed } from 'vue';
import { BillingMode } from '../types/billing';

// 价格类型枚举 - 使用统一的计费模式
export const PriceType = BillingMode;
export type PriceType = BillingMode;

// 应用分类
export enum AppCategory {
  IMAGE_PROCESSING = 'image_processing',  // 图像处理
  DATA_ANALYSIS = 'data_analysis',        // 数据分析
  SEO_TOOLS = 'seo_tools',               // SEO工具
  MARKET_ANALYSIS = 'market_analysis',    // 市场分析
  MANAGEMENT_TOOLS = 'management_tools',  // 管理工具
  AUTOMATION = 'automation',              // 自动化工具
  CONTENT_CREATION = 'content_creation'   // 内容创作
}

// 应用状态
export enum AppStatus {
  ACTIVE = 'active',       // 正常
  MAINTENANCE = 'maintenance', // 维护中
  DEPRECATED = 'deprecated'    // 已废弃
}

// 价格信息接口
export interface PriceInfo {
  type: PriceType;
  amount: number;          // 价格金额
  currency: string;        // 货币单位
  originalAmount?: number; // 原价（用于显示折扣）
  unit?: string;          // 单位说明（如：/月、/次）
  description?: string;    // 价格说明
}

// 应用信息接口
export interface AppInfo {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  icon: string;
  screenshots: string[];
  category: AppCategory;
  tags: string[];
  price: PriceInfo;
  rating: number;          // 评分 (0-5)
  reviewCount: number;     // 评价数量
  downloadCount: number;   // 下载/使用次数
  developer: string;       // 开发者
  version: string;         // 版本号
  lastUpdated: string;     // 最后更新时间
  status: AppStatus;
  features: string[];      // 功能特性列表
  requirements?: string[]; // 使用要求
  isInstalled?: boolean;   // 是否已安装
  isFavorited?: boolean;   // 是否已收藏
}

// 筛选条件接口
export interface FilterOptions {
  category?: AppCategory;
  priceType?: PriceType;
  rating?: number;         // 最低评分
  searchKeyword?: string;
  sortBy?: 'name' | 'rating' | 'downloadCount' | 'lastUpdated' | 'price';
  sortOrder?: 'asc' | 'desc';
}

// 应用市场状态
const apps = ref<AppInfo[]>([]);
const favoriteApps = ref<string[]>([]);
const installedApps = ref<string[]>([]);
const loading = ref(false);
const currentFilter = ref<FilterOptions>({});

// 模拟应用数据
const mockApps: AppInfo[] = [
  // 我的应用中的核心功能
  {
    id: 'product-collection',
    name: '商品采集',
    description: '智能采集全球电商平台商品信息，支持Amazon、Temu、Shein等主流平台',
    longDescription: '商品采集是一款专业的电商数据采集工具，支持从Amazon、Temu、Shein等主流电商平台批量采集商品信息。具备智能去重、数据清洗、格式转换等功能，是电商从业者的必备工具。',
    icon: '🛒',
    screenshots: [
      'https://picsum.photos/800/600?random=1',
      'https://picsum.photos/800/600?random=2',
      'https://picsum.photos/800/600?random=3'
    ],
    category: AppCategory.DATA_ANALYSIS,
    tags: ['数据采集', '电商', '批量处理', '多平台'],
    price: {
      type: PriceType.PER_ITEM,
      amount: 0.10,
      currency: 'CNY',
      originalAmount: 0.15,
      unit: '/个商品',
      description: '按采集商品数量计费'
    },
    rating: 4.9,
    reviewCount: 2341,
    downloadCount: 28750,
    developer: 'RiinAI团队',
    version: '3.2.1',
    lastUpdated: '2024-01-16',
    status: AppStatus.ACTIVE,
    features: [
      '多平台支持',
      '智能去重',
      '数据清洗',
      '批量导出',
      '定时采集'
    ],
    requirements: ['需要网络连接', '支持Chrome浏览器插件']
  },
  {
    id: 'smart-crop',
    name: '智能裁图',
    description: 'AI智能图片裁剪和优化，自动识别主体，支持多种裁剪比例',
    longDescription: '智能裁图是一款基于深度学习的图片裁剪工具，能够自动识别图片主体，进行智能裁剪。支持批量处理、多种裁剪比例、自定义裁剪区域等功能。',
    icon: '✂️',
    screenshots: [
      'https://picsum.photos/800/600?random=4',
      'https://picsum.photos/800/600?random=5',
      'https://picsum.photos/800/600?random=6'
    ],
    category: AppCategory.IMAGE_PROCESSING,
    tags: ['AI', '图片处理', '批量处理', '智能裁剪'],
    price: {
      type: PriceType.PER_ITEM,
      amount: 0.05,
      currency: 'CNY',
      unit: '/张',
      description: '按处理图片数量计费'
    },
    rating: 4.8,
    reviewCount: 1856,
    downloadCount: 22420,
    developer: 'RiinAI团队',
    version: '2.1.0',
    lastUpdated: '2024-01-15',
    status: AppStatus.ACTIVE,
    features: [
      '智能主体识别',
      '批量处理支持',
      '多种裁剪比例',
      '高质量输出',
      '云端处理'
    ],
    requirements: ['需要网络连接', '支持JPG/PNG格式']
  },
  {
    id: 'one-click-cutout',
    name: '一键抠图',
    description: '一键智能抠图，去除背景，AI驱动的背景移除工具',
    longDescription: '一键抠图使用先进的AI算法，能够精确识别图片主体，自动移除背景。支持批量处理，输出高质量透明背景图片，是设计师和电商从业者的得力助手。',
    icon: '🎨',
    screenshots: [
      'https://picsum.photos/800/600?random=7',
      'https://picsum.photos/800/600?random=8'
    ],
    category: AppCategory.IMAGE_PROCESSING,
    tags: ['AI', '抠图', '背景移除', '图片处理'],
    price: {
      type: PriceType.PER_USE,
      amount: 0.5,
      currency: 'CNY',
      unit: '/张',
      description: '按使用次数计费，高质量处理'
    },
    rating: 4.9,
    reviewCount: 3241,
    downloadCount: 45750,
    developer: 'RiinAI团队',
    version: '1.8.0',
    lastUpdated: '2024-01-14',
    status: AppStatus.ACTIVE,
    features: [
      'AI智能识别',
      '高精度抠图',
      '批量处理',
      '多格式支持',
      '云端处理'
    ]
  },
  {
    id: 'super-split',
    name: '超级裂变',
    description: '营销裂变工具，快速传播，支持多种裂变模式和数据分析',
    longDescription: '超级裂变是一款专业的营销裂变工具，支持多种裂变模式，包括分享裂变、任务裂变、拼团裂变等。提供详细的数据分析和用户行为追踪，帮助企业快速扩大用户规模。',
    icon: '🚀',
    screenshots: [
      'https://picsum.photos/800/600?random=9',
      'https://picsum.photos/800/600?random=10',
      'https://picsum.photos/800/600?random=11'
    ],
    category: AppCategory.AUTOMATION,
    tags: ['营销', '裂变', '传播', '数据分析'],
    price: {
      type: PriceType.MONTHLY,
      amount: 199,
      currency: 'CNY',
      unit: '/月',
      description: '专业营销工具，支持无限裂变活动'
    },
    rating: 4.7,
    reviewCount: 1567,
    downloadCount: 18920,
    developer: 'RiinAI团队',
    version: '2.5.0',
    lastUpdated: '2024-01-13',
    status: AppStatus.ACTIVE,
    features: [
      '多种裂变模式',
      '数据分析',
      '用户追踪',
      '活动管理',
      '效果统计'
    ]
  },
  {
    id: 'title-generator',
    name: '标题生成',
    description: 'AI智能生成吸引人的标题，支持多种模板和平台优化',
    longDescription: 'AI标题生成器基于大语言模型，能够为不同平台生成吸引人的标题。支持电商、自媒体、广告等多种场景，提供模板库和个性化定制功能。',
    icon: '📝',
    screenshots: [
      'https://picsum.photos/800/600?random=12',
      'https://picsum.photos/800/600?random=13'
    ],
    category: AppCategory.CONTENT_CREATION,
    tags: ['AI', '标题生成', '内容创作', '营销'],
    price: {
      type: PriceType.PER_USE,
      amount: 0.1,
      currency: 'CNY',
      unit: '/次',
      description: '按生成次数计费，经济实惠'
    },
    rating: 4.6,
    reviewCount: 2890,
    downloadCount: 35670,
    developer: 'RiinAI团队',
    version: '1.9.2',
    lastUpdated: '2024-01-12',
    status: AppStatus.ACTIVE,
    features: [
      'AI智能生成',
      '多平台优化',
      '模板库',
      '批量生成',
      '效果预测'
    ]
  },
  {
    id: 'pod-compose',
    name: 'POD合成',
    description: '按需印刷商品合成工具，支持图案与产品的智能合成',
    longDescription: 'POD合成工具专为按需印刷业务设计，支持将设计图案与各种产品模板进行智能合成。提供丰富的产品库、智能排版、批量处理等功能。',
    icon: '🎨',
    screenshots: [
      'https://picsum.photos/800/600?random=14',
      'https://picsum.photos/800/600?random=15',
      'https://picsum.photos/800/600?random=16'
    ],
    category: AppCategory.IMAGE_PROCESSING,
    tags: ['POD', '合成', '印刷', '设计'],
    price: {
      type: PriceType.MONTHLY,
      amount: 89,
      currency: 'CNY',
      unit: '/月',
      description: '专业POD工具，支持无限合成'
    },
    rating: 4.5,
    reviewCount: 1234,
    downloadCount: 12450,
    developer: 'RiinAI团队',
    version: '1.6.0',
    lastUpdated: '2024-01-11',
    status: AppStatus.ACTIVE,
    features: [
      '智能合成',
      '产品模板库',
      '批量处理',
      '高清输出',
      '自动排版'
    ]
  },
  {
    id: 'batch-listing',
    name: '批量刊登',
    description: '批量发布商品到各大平台，支持模板导入和自动化发布',
    longDescription: '批量刊登工具支持将商品信息批量发布到Amazon、eBay、Shopify等多个电商平台。提供模板导入、数据映射、自动化发布等功能，大大提高运营效率。',
    icon: '📦',
    screenshots: [
      'https://picsum.photos/800/600?random=17',
      'https://picsum.photos/800/600?random=18'
    ],
    category: AppCategory.AUTOMATION,
    tags: ['批量发布', '电商', '自动化', '多平台'],
    price: {
      type: PriceType.MONTHLY,
      amount: 159,
      currency: 'CNY',
      unit: '/月',
      description: '专业电商工具，支持无限发布'
    },
    rating: 4.4,
    reviewCount: 987,
    downloadCount: 15680,
    developer: 'RiinAI团队',
    version: '2.3.1',
    lastUpdated: '2024-01-10',
    status: AppStatus.ACTIVE,
    features: [
      '多平台支持',
      '模板导入',
      '批量发布',
      '数据映射',
      '发布监控'
    ]
  },
  // 扩展应用 - 免费和付费混合
  {
    id: 'price-monitor',
    name: '价格监控',
    description: '实时监控商品价格变化，支持多平台价格对比和降价提醒',
    longDescription: '价格监控工具帮助您实时跟踪商品价格变化，支持Amazon、Temu、Shein等主流电商平台。提供价格历史图表、降价提醒、竞品对比等功能。',
    icon: '📊',
    screenshots: [
      'https://picsum.photos/800/600?random=19',
      'https://picsum.photos/800/600?random=20'
    ],
    category: AppCategory.DATA_ANALYSIS,
    tags: ['价格监控', '数据分析', '电商', '提醒'],
    price: {
      type: PriceType.FREE,
      amount: 0,
      currency: 'CNY',
      description: '免费版本，每日可监控10个商品'
    },
    rating: 4.2,
    reviewCount: 1892,
    downloadCount: 28750,
    developer: '第三方开发者',
    version: '1.5.2',
    lastUpdated: '2024-01-10',
    status: AppStatus.ACTIVE,
    features: [
      '多平台支持',
      '价格历史图表',
      '降价提醒',
      '数据导出'
    ],
    requirements: ['需要网络连接']
  },
  {
    id: 'keyword-research',
    name: '关键词研究',
    description: '专业的关键词挖掘和分析工具，助力SEO优化',
    longDescription: '关键词研究专家是一款专业的SEO工具，提供关键词挖掘、竞争度分析、搜索量预测等功能。帮助您找到高价值的关键词，提升网站排名。',
    icon: '🔍',
    screenshots: [
      'https://picsum.photos/800/600?random=21',
      'https://picsum.photos/800/600?random=22',
      'https://picsum.photos/800/600?random=23'
    ],
    category: AppCategory.SEO_TOOLS,
    tags: ['SEO', '关键词', '搜索优化', '竞争分析'],
    price: {
      type: PriceType.ONE_TIME,
      amount: 199,
      currency: 'CNY',
      originalAmount: 299,
      description: '一次购买，终身使用'
    },
    rating: 4.6,
    reviewCount: 1567,
    downloadCount: 13240,
    developer: 'SEO专家团队',
    version: '3.0.1',
    lastUpdated: '2024-01-12',
    status: AppStatus.ACTIVE,
    features: [
      '关键词挖掘',
      '竞争度分析',
      '搜索量预测',
      '长尾词推荐',
      '数据报告'
    ]
  },
  {
    id: 'review-analyzer',
    name: '评论分析',
    description: '智能分析商品评论情感，提取用户反馈洞察',
    longDescription: '评论分析工具使用自然语言处理技术，智能分析商品评论的情感倾向、关键词提取、用户满意度等。帮助商家了解产品优缺点，优化产品和服务。',
    icon: '💬',
    screenshots: [
      'https://picsum.photos/800/600?random=24',
      'https://picsum.photos/800/600?random=25'
    ],
    category: AppCategory.DATA_ANALYSIS,
    tags: ['评论分析', 'NLP', '情感分析', '用户洞察'],
    price: {
      type: PriceType.MONTHLY,
      amount: 79,
      currency: 'CNY',
      unit: '/月',
      description: '专业分析工具，无限制使用'
    },
    rating: 4.3,
    reviewCount: 756,
    downloadCount: 9870,
    developer: 'AI分析团队',
    version: '2.1.0',
    lastUpdated: '2024-01-09',
    status: AppStatus.ACTIVE,
    features: [
      '情感分析',
      '关键词提取',
      '满意度评分',
      '趋势分析',
      '报告生成'
    ]
  },
  {
    id: 'competitor-analysis',
    name: '竞品分析',
    description: '深度分析竞争对手策略，洞察市场机会',
    longDescription: '竞品分析大师帮助您深入了解竞争对手的产品策略、价格策略、营销手段等。提供详细的分析报告和市场洞察，助力商业决策。',
    icon: '🎯',
    screenshots: [
      'https://picsum.photos/800/600?random=26',
      'https://picsum.photos/800/600?random=27'
    ],
    category: AppCategory.MARKET_ANALYSIS,
    tags: ['竞品分析', '市场研究', '策略分析', '商业智能'],
    price: {
      type: PriceType.MONTHLY,
      amount: 299,
      currency: 'CNY',
      unit: '/月',
      description: '专业版功能，深度分析报告'
    },
    rating: 4.4,
    reviewCount: 623,
    downloadCount: 7890,
    developer: '商业分析专家',
    version: '2.3.0',
    lastUpdated: '2024-01-08',
    status: AppStatus.ACTIVE,
    features: [
      '竞品监控',
      '价格对比',
      '营销策略分析',
      '市场趋势预测',
      '定制报告'
    ]
  },
  {
    id: 'inventory-management',
    name: '库存管理',
    description: '智能库存管理系统，支持多仓库、多渠道库存同步',
    longDescription: '智能库存管理系统提供全面的库存控制功能，支持多仓库管理、库存预警、自动补货、销售预测等。帮助企业优化库存结构，降低运营成本。',
    icon: '📋',
    screenshots: [
      'https://picsum.photos/800/600?random=28',
      'https://picsum.photos/800/600?random=29',
      'https://picsum.photos/800/600?random=30'
    ],
    category: AppCategory.MANAGEMENT_TOOLS,
    tags: ['库存管理', '仓储', '供应链', '预测'],
    price: {
      type: PriceType.MONTHLY,
      amount: 399,
      currency: 'CNY',
      unit: '/月',
      description: '企业级库存管理解决方案'
    },
    rating: 4.5,
    reviewCount: 445,
    downloadCount: 5670,
    developer: '企业管理专家',
    version: '3.1.2',
    lastUpdated: '2024-01-07',
    status: AppStatus.ACTIVE,
    features: [
      '多仓库管理',
      '库存预警',
      '自动补货',
      '销售预测',
      '报表分析'
    ]
  },
  {
    id: 'customer-service',
    name: '客服助手',
    description: 'AI智能客服机器人，24小时自动回复客户咨询',
    longDescription: 'AI客服助手基于大语言模型，能够理解客户问题并提供准确回复。支持多平台接入、知识库管理、人工客服转接等功能，大幅提升客服效率。',
    icon: '🎧',
    screenshots: [
      'https://picsum.photos/800/600?random=31',
      'https://picsum.photos/800/600?random=32'
    ],
    category: AppCategory.AUTOMATION,
    tags: ['AI客服', '自动回复', '知识库', '多平台'],
    price: {
      type: PriceType.MONTHLY,
      amount: 199,
      currency: 'CNY',
      unit: '/月',
      description: 'AI客服解决方案，支持无限对话'
    },
    rating: 4.6,
    reviewCount: 1234,
    downloadCount: 15670,
    developer: 'AI服务团队',
    version: '2.0.5',
    lastUpdated: '2024-01-06',
    status: AppStatus.ACTIVE,
    features: [
      'AI智能回复',
      '多平台接入',
      '知识库管理',
      '人工转接',
      '对话分析'
    ]
  },
  {
    id: 'data-export',
    name: '数据导出',
    description: '多格式数据导出工具，支持Excel、CSV、JSON等格式',
    longDescription: '数据导出工具支持将各种业务数据导出为多种格式，包括Excel、CSV、JSON、PDF等。提供数据清洗、格式转换、定时导出等功能。',
    icon: '📤',
    screenshots: [
      'https://picsum.photos/800/600?random=33',
      'https://picsum.photos/800/600?random=34'
    ],
    category: AppCategory.DATA_ANALYSIS,
    tags: ['数据导出', '格式转换', '数据清洗', '自动化'],
    price: {
      type: PriceType.FREE,
      amount: 0,
      currency: 'CNY',
      description: '免费工具，基础导出功能'
    },
    rating: 4.1,
    reviewCount: 567,
    downloadCount: 12340,
    developer: '数据工具团队',
    version: '1.4.0',
    lastUpdated: '2024-01-05',
    status: AppStatus.ACTIVE,
    features: [
      '多格式支持',
      '数据清洗',
      '批量导出',
      '定时任务',
      '模板定制'
    ]
  },
  {
    id: 'report-generator',
    name: '报表生成',
    description: '自动生成业务报表，支持多种图表和数据可视化',
    longDescription: '报表生成器能够自动收集业务数据，生成专业的分析报表。支持多种图表类型、数据可视化、定时发送等功能，让数据分析更简单。',
    icon: '📈',
    screenshots: [
      'https://picsum.photos/800/600?random=35',
      'https://picsum.photos/800/600?random=36',
      'https://picsum.photos/800/600?random=37'
    ],
    category: AppCategory.DATA_ANALYSIS,
    tags: ['报表生成', '数据可视化', '图表', '自动化'],
    price: {
      type: PriceType.MONTHLY,
      amount: 129,
      currency: 'CNY',
      unit: '/月',
      description: '专业报表工具，无限制生成'
    },
    rating: 4.7,
    reviewCount: 890,
    downloadCount: 11230,
    developer: '数据分析专家',
    version: '2.2.1',
    lastUpdated: '2024-01-04',
    status: AppStatus.ACTIVE,
    features: [
      '自动数据收集',
      '多种图表',
      '数据可视化',
      '定时发送',
      '模板库'
    ]
  },
  {
    id: 'workflow-automation',
    name: '工作流自动化',
    description: '无代码工作流自动化平台，连接各种应用和服务',
    longDescription: '工作流自动化平台让您无需编程即可创建复杂的自动化流程。支持连接数百种应用和服务，实现数据同步、任务自动化、通知提醒等功能。',
    icon: '⚡',
    screenshots: [
      'https://picsum.photos/800/600?random=38',
      'https://picsum.photos/800/600?random=39',
      'https://picsum.photos/800/600?random=40'
    ],
    category: AppCategory.AUTOMATION,
    tags: ['工作流', '自动化', '无代码', '集成'],
    price: {
      type: PriceType.MONTHLY,
      amount: 299,
      currency: 'CNY',
      originalAmount: 399,
      unit: '/月',
      description: '企业级自动化解决方案'
    },
    rating: 4.8,
    reviewCount: 1567,
    downloadCount: 8900,
    developer: '自动化专家',
    version: '3.0.0',
    lastUpdated: '2024-01-03',
    status: AppStatus.ACTIVE,
    features: [
      '无代码设计',
      '应用集成',
      '条件触发',
      '数据转换',
      '监控告警'
    ]
  }
];

// 初始化数据
const initializeApps = () => {
  apps.value = mockApps.map(app => ({
    ...app,
    isFavorited: favoriteApps.value.includes(app.id),
    isInstalled: installedApps.value.includes(app.id)
  }));
};

// 获取所有应用
export const getAllApps = () => {
  return apps.value;
};

// 获取收藏的应用
export const getFavoriteApps = computed(() => {
  return apps.value.filter(app => app.isFavorited);
});

// 根据筛选条件获取应用
export const getFilteredApps = computed(() => {
  let filtered = apps.value;
  const filter = currentFilter.value;

  // 搜索关键词
  if (filter.searchKeyword) {
    const keyword = filter.searchKeyword.toLowerCase();
    filtered = filtered.filter(app =>
      app.name.toLowerCase().includes(keyword) ||
      app.description.toLowerCase().includes(keyword) ||
      app.tags.some(tag => tag.toLowerCase().includes(keyword))
    );
  }

  // 分类筛选
  if (filter.category) {
    filtered = filtered.filter(app => app.category === filter.category);
  }

  // 价格类型筛选
  if (filter.priceType) {
    filtered = filtered.filter(app => app.price.type === filter.priceType);
  }

  // 评分筛选
  if (filter.rating !== undefined) {
    filtered = filtered.filter(app => app.rating >= filter.rating!);
  }

  // 排序
  if (filter.sortBy) {
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (filter.sortBy) {
        case 'name':
          aValue = a.name;
          bValue = b.name;
          break;
        case 'rating':
          aValue = a.rating;
          bValue = b.rating;
          break;
        case 'downloadCount':
          aValue = a.downloadCount;
          bValue = b.downloadCount;
          break;
        case 'lastUpdated':
          aValue = new Date(a.lastUpdated);
          bValue = new Date(b.lastUpdated);
          break;
        case 'price':
          aValue = a.price.amount;
          bValue = b.price.amount;
          break;
        default:
          return 0;
      }

      if (filter.sortOrder === 'desc') {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      } else {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      }
    });
  }

  return filtered;
});

// 设置筛选条件
export const setFilter = (filter: Partial<FilterOptions>) => {
  currentFilter.value = { ...currentFilter.value, ...filter };
};

// 清除筛选条件
export const clearFilter = () => {
  currentFilter.value = {};
};

// 收藏/取消收藏应用
export const toggleFavorite = (appId: string) => {
  const app = apps.value.find(a => a.id === appId);
  if (!app) return false;

  const index = favoriteApps.value.indexOf(appId);
  if (index > -1) {
    favoriteApps.value.splice(index, 1);
    app.isFavorited = false;
  } else {
    favoriteApps.value.push(appId);
    app.isFavorited = true;
  }

  // 保存到本地存储
  localStorage.setItem('app-market-favorites', JSON.stringify(favoriteApps.value));
  return app.isFavorited;
};

// 安装/卸载应用
export const toggleInstall = (appId: string) => {
  const app = apps.value.find(a => a.id === appId);
  if (!app) return false;

  const index = installedApps.value.indexOf(appId);
  if (index > -1) {
    installedApps.value.splice(index, 1);
    app.isInstalled = false;
  } else {
    installedApps.value.push(appId);
    app.isInstalled = true;
  }

  // 保存到本地存储
  localStorage.setItem('app-market-installed', JSON.stringify(installedApps.value));
  return app.isInstalled;
};

// 获取应用详情
export const getAppById = (appId: string) => {
  return apps.value.find(app => app.id === appId);
};

// 获取分类列表
export const getCategories = () => {
  return Object.values(AppCategory);
};

// 获取价格类型列表
export const getPriceTypes = () => {
  return Object.values(PriceType);
};

// 初始化应用市场
export const initAppMarket = () => {
  loading.value = true;
  
  // 从本地存储加载收藏和安装记录
  const savedFavorites = localStorage.getItem('app-market-favorites');
  if (savedFavorites) {
    favoriteApps.value = JSON.parse(savedFavorites);
  }

  const savedInstalled = localStorage.getItem('app-market-installed');
  if (savedInstalled) {
    installedApps.value = JSON.parse(savedInstalled);
  }

  // 初始化应用数据
  initializeApps();
  
  loading.value = false;
};

// 导出状态
export const appMarketStore = {
  apps: computed(() => apps.value),
  favoriteApps,
  installedApps,
  loading: computed(() => loading.value),
  currentFilter: computed(() => currentFilter.value)
};
