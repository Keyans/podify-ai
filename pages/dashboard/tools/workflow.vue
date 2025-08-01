<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 页面头部 -->
    <div class="bg-white shadow-sm border-b">
      <div class="px-6 py-4">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-2xl font-semibold text-gray-900">工作流</h1>
            <p class="text-gray-600 mt-1">自动化您的业务流程，提高工作效率</p>
          </div>
          <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            创建工作流
          </button>
        </div>
      </div>
    </div>

    <!-- 主要内容 -->
    <div class="p-6">
      <!-- 工作流统计 -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-blue-100">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">活跃工作流</p>
              <p class="text-2xl font-semibold text-gray-900">24</p>
              <p class="text-xs text-green-600">+3 本周新增</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-green-100">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">今日执行</p>
              <p class="text-2xl font-semibold text-gray-900">156</p>
              <p class="text-xs text-green-600">+12% 比昨日</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-yellow-100">
              <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">节省时间</p>
              <p class="text-2xl font-semibold text-gray-900">48h</p>
              <p class="text-xs text-green-600">本月累计</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-purple-100">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">成功率</p>
              <p class="text-2xl font-semibold text-gray-900">98.5%</p>
              <p class="text-xs text-green-600">+0.3% 本月</p>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <!-- 快速创建 -->
        <div class="bg-white rounded-lg shadow">
          <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-lg font-medium text-gray-900">快速创建</h2>
          </div>
          <div class="p-6">
            <div class="space-y-3">
              <button v-for="template in workflowTemplates" :key="template.id" 
                class="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
                <div class="flex items-center">
                  <div :class="[
                    'p-2 rounded-lg mr-3',
                    template.color
                  ]">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="template.icon"></path>
                    </svg>
                  </div>
                  <div class="flex-1">
                    <h3 class="text-sm font-medium text-gray-900">{{ template.name }}</h3>
                    <p class="text-xs text-gray-500 mt-1">{{ template.description }}</p>
                  </div>
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>

        <!-- 执行状态 -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow">
            <div class="px-6 py-4 border-b border-gray-200">
              <h2 class="text-lg font-medium text-gray-900">执行状态</h2>
            </div>
            <div class="p-6">
              <div class="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div class="text-center">
                  <svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                  <p class="text-gray-500">工作流执行统计图表</p>
                  <p class="text-sm text-gray-400 mt-1">显示过去7天的执行情况</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 工作流列表 -->
      <div class="bg-white rounded-lg shadow">
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex justify-between items-center">
            <h2 class="text-lg font-medium text-gray-900">我的工作流</h2>
            <div class="flex space-x-2">
              <div class="relative">
                <input type="text" placeholder="搜索工作流..." 
                  class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <svg class="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <select class="border border-gray-300 rounded-lg px-3 py-2">
                <option>全部状态</option>
                <option>运行中</option>
                <option>已暂停</option>
                <option>已停止</option>
              </select>
            </div>
          </div>
        </div>
        
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">工作流名称</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">类型</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">最后执行</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">成功率</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="workflow in workflows" :key="workflow.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div :class="[
                      'p-2 rounded-lg mr-3',
                      workflow.color
                    ]">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="workflow.icon"></path>
                      </svg>
                    </div>
                    <div>
                      <div class="text-sm font-medium text-gray-900">{{ workflow.name }}</div>
                      <div class="text-sm text-gray-500">{{ workflow.description }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {{ workflow.type }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    workflow.status === 'running' ? 'bg-green-100 text-green-800' :
                    workflow.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                    workflow.status === 'stopped' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  ]">
                    <span :class="[
                      'w-1.5 h-1.5 rounded-full mr-1.5',
                      workflow.status === 'running' ? 'bg-green-400' :
                      workflow.status === 'paused' ? 'bg-yellow-400' :
                      workflow.status === 'stopped' ? 'bg-red-400' :
                      'bg-gray-400'
                    ]"></span>
                    {{ workflow.statusText }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ workflow.lastRun }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="text-sm font-medium text-gray-900">{{ workflow.successRate }}%</div>
                    <div class="ml-2 w-16 bg-gray-200 rounded-full h-2">
                      <div class="bg-green-500 h-2 rounded-full" :style="{ width: workflow.successRate + '%' }"></div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex space-x-2">
                    <button v-if="workflow.status === 'running'" 
                      class="text-yellow-600 hover:text-yellow-900">
                      暂停
                    </button>
                    <button v-else-if="workflow.status === 'paused'" 
                      class="text-green-600 hover:text-green-900">
                      继续
                    </button>
                    <button v-else 
                      class="text-green-600 hover:text-green-900">
                      启动
                    </button>
                    <button class="text-blue-600 hover:text-blue-900">编辑</button>
                    <button class="text-gray-600 hover:text-gray-900">详情</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- 分页 -->
        <div class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <p class="text-sm text-gray-700">
                显示 <span class="font-medium">1</span> 到 <span class="font-medium">10</span> 条，共 <span class="font-medium">24</span> 条记录
              </p>
            </div>
            <div class="flex space-x-2">
              <button class="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">上一页</button>
              <button class="px-3 py-1 bg-blue-600 text-white rounded text-sm">1</button>
              <button class="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">2</button>
              <button class="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">3</button>
              <button class="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">下一页</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 配置页面布局和元数据
definePageMeta({
  layout: 'dashboard',
  title: '工作流 - CUZCUZAI',
  description: 'CUZCUZAI工作流页面'
})

// 模拟数据
const workflowTemplates = ref([
  {
    id: 1,
    name: '商品自动上架',
    description: '新商品自动发布到各平台',
    icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',
    color: 'bg-blue-100 text-blue-600'
  },
  {
    id: 2,
    name: '库存监控',
    description: '库存不足时自动补货提醒',
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    color: 'bg-green-100 text-green-600'
  },
  {
    id: 3,
    name: '订单处理',
    description: '新订单自动分配和处理',
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    color: 'bg-purple-100 text-purple-600'
  },
  {
    id: 4,
    name: '客户服务',
    description: '客户咨询自动回复',
    icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
    color: 'bg-orange-100 text-orange-600'
  },
  {
    id: 5,
    name: '数据同步',
    description: '多平台数据自动同步',
    icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
    color: 'bg-indigo-100 text-indigo-600'
  }
])

const workflows = ref([
  {
    id: 1,
    name: '商品自动上架流程',
    description: '新设计完成后自动上架到所有平台',
    type: '商品管理',
    status: 'running',
    statusText: '运行中',
    lastRun: '2分钟前',
    successRate: 98,
    icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',
    color: 'bg-blue-100 text-blue-600'
  },
  {
    id: 2,
    name: '库存预警系统',
    description: '监控库存水平并发送预警通知',
    type: '库存管理',
    status: 'running',
    statusText: '运行中',
    lastRun: '15分钟前',
    successRate: 95,
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    color: 'bg-green-100 text-green-600'
  },
  {
    id: 3,
    name: '订单自动处理',
    description: '新订单自动分配给相应供应商',
    type: '订单管理',
    status: 'paused',
    statusText: '已暂停',
    lastRun: '1小时前',
    successRate: 92,
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    color: 'bg-purple-100 text-purple-600'
  },
  {
    id: 4,
    name: '客户服务机器人',
    description: '自动回复常见客户咨询',
    type: '客户服务',
    status: 'running',
    statusText: '运行中',
    lastRun: '刚刚',
    successRate: 89,
    icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
    color: 'bg-orange-100 text-orange-600'
  },
  {
    id: 5,
    name: '数据同步服务',
    description: '多平台商品信息同步更新',
    type: '数据管理',
    status: 'stopped',
    statusText: '已停止',
    lastRun: '3小时前',
    successRate: 97,
    icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
    color: 'bg-indigo-100 text-indigo-600'
  },
  {
    id: 6,
    name: '价格优化算法',
    description: '根据市场情况自动调整商品价格',
    type: '价格管理',
    status: 'running',
    statusText: '运行中',
    lastRun: '30分钟前',
    successRate: 94,
    icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    color: 'bg-yellow-100 text-yellow-600'
  }
])
</script>