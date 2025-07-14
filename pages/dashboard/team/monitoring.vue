<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 页面头部 -->
    <div class="bg-white shadow-sm border-b">
      <div class="px-6 py-4">
        <h1 class="text-2xl font-semibold text-gray-900">任务监控</h1>
        <p class="text-gray-600 mt-1">实时监控团队任务进度和性能指标</p>
      </div>
    </div>

    <!-- 主要内容 -->
    <div class="p-6">
      <!-- 实时统计 -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-blue-100">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">进行中任务</p>
              <p class="text-2xl font-semibold text-gray-900">24</p>
              <p class="text-xs text-green-600">+3 今日新增</p>
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
              <p class="text-sm font-medium text-gray-600">已完成任务</p>
              <p class="text-2xl font-semibold text-gray-900">156</p>
              <p class="text-xs text-green-600">+12 今日完成</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-yellow-100">
              <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">逾期任务</p>
              <p class="text-2xl font-semibold text-gray-900">3</p>
              <p class="text-xs text-red-600">需要关注</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-purple-100">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">团队效率</p>
              <p class="text-2xl font-semibold text-gray-900">87%</p>
              <p class="text-xs text-green-600">+5% 本周</p>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <!-- 任务进度图表 -->
        <div class="bg-white rounded-lg shadow">
          <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-lg font-medium text-gray-900">任务完成趋势</h2>
          </div>
          <div class="p-6">
            <div class="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div class="text-center">
                <svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
                <p class="text-gray-500">任务完成趋势图表</p>
                <p class="text-sm text-gray-400 mt-1">显示过去7天的任务完成情况</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 团队工作负载 -->
        <div class="bg-white rounded-lg shadow">
          <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-lg font-medium text-gray-900">团队工作负载</h2>
          </div>
          <div class="p-6">
            <div class="space-y-4">
              <div v-for="member in teamWorkload" :key="member.id" class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
                    {{ member.name.charAt(0) }}
                  </div>
                  <div class="ml-3">
                    <p class="text-sm font-medium text-gray-900">{{ member.name }}</p>
                    <p class="text-xs text-gray-500">{{ member.activeTasks }} 个活跃任务</p>
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <div class="w-20 bg-gray-200 rounded-full h-2">
                    <div class="h-2 rounded-full" :class="[
                      member.workload > 80 ? 'bg-red-500' :
                      member.workload > 60 ? 'bg-yellow-500' : 'bg-green-500'
                    ]" :style="{ width: member.workload + '%' }"></div>
                  </div>
                  <span class="text-sm font-medium" :class="[
                    member.workload > 80 ? 'text-red-600' :
                    member.workload > 60 ? 'text-yellow-600' : 'text-green-600'
                  ]">{{ member.workload }}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 实时任务列表 -->
      <div class="bg-white rounded-lg shadow">
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex justify-between items-center">
            <h2 class="text-lg font-medium text-gray-900">实时任务监控</h2>
            <div class="flex space-x-2">
              <select class="border border-gray-300 rounded-md px-3 py-2 text-sm">
                <option>全部状态</option>
                <option>进行中</option>
                <option>已完成</option>
                <option>逾期</option>
                <option>待开始</option>
              </select>
              <select class="border border-gray-300 rounded-md px-3 py-2 text-sm">
                <option>全部成员</option>
                <option>张三</option>
                <option>李四</option>
                <option>王五</option>
              </select>
            </div>
          </div>
        </div>
        
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">任务名称</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">负责人</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">优先级</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">进度</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">截止时间</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="task in tasks" :key="task.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{{ task.name }}</div>
                  <div class="text-sm text-gray-500">{{ task.project }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="h-6 w-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-medium">
                      {{ task.assignee.charAt(0) }}
                    </div>
                    <div class="ml-2 text-sm text-gray-900">{{ task.assignee }}</div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="[
                    'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                    task.priority === 'high' ? 'bg-red-100 text-red-800' :
                    task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  ]">
                    {{ task.priorityText }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="w-16 bg-gray-200 rounded-full h-2 mr-2">
                      <div class="bg-blue-600 h-2 rounded-full" :style="{ width: task.progress + '%' }"></div>
                    </div>
                    <span class="text-sm text-gray-900">{{ task.progress }}%</span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="[
                    'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                    task.status === 'completed' ? 'bg-green-100 text-green-800' :
                    task.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                    task.status === 'overdue' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  ]">
                    {{ task.statusText }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div :class="[
                    task.isOverdue ? 'text-red-600' : 'text-gray-900'
                  ]">
                    {{ task.dueDate }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button class="text-blue-600 hover:text-blue-900 mr-3">查看</button>
                  <button class="text-green-600 hover:text-green-900 mr-3">编辑</button>
                  <button class="text-gray-600 hover:text-gray-900">更多</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- 分页 -->
        <div class="px-6 py-4 border-t border-gray-200">
          <div class="flex items-center justify-between">
            <div class="text-sm text-gray-700">
              显示 1-10 共 {{ tasks.length }} 个任务
            </div>
            <div class="flex space-x-2">
              <button class="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">上一页</button>
              <button class="px-3 py-1 bg-blue-600 text-white rounded text-sm">1</button>
              <button class="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">2</button>
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
  title: '任务监控 - PodifyAi',
  description: 'PodifyAi任务监控页面'
})

// 模拟数据
const teamWorkload = ref([
  { id: 1, name: '张三', activeTasks: 8, workload: 85 },
  { id: 2, name: '李四', activeTasks: 6, workload: 65 },
  { id: 3, name: '王五', activeTasks: 4, workload: 45 },
  { id: 4, name: '赵六', activeTasks: 7, workload: 75 },
  { id: 5, name: '钱七', activeTasks: 3, workload: 35 }
])

const tasks = ref([
  {
    id: 1,
    name: '春季营销活动设计',
    project: '营销推广',
    assignee: '李四',
    priority: 'high',
    priorityText: '高',
    progress: 75,
    status: 'in_progress',
    statusText: '进行中',
    dueDate: '2024-01-20',
    isOverdue: false
  },
  {
    id: 2,
    name: 'POD产品上架',
    project: '产品管理',
    assignee: '张三',
    priority: 'medium',
    priorityText: '中',
    progress: 90,
    status: 'in_progress',
    statusText: '进行中',
    dueDate: '2024-01-18',
    isOverdue: false
  },
  {
    id: 3,
    name: '用户反馈分析',
    project: '数据分析',
    assignee: '王五',
    priority: 'low',
    priorityText: '低',
    progress: 100,
    status: 'completed',
    statusText: '已完成',
    dueDate: '2024-01-15',
    isOverdue: false
  },
  {
    id: 4,
    name: '库存管理优化',
    project: '系统优化',
    assignee: '赵六',
    priority: 'high',
    priorityText: '高',
    progress: 30,
    status: 'overdue',
    statusText: '逾期',
    dueDate: '2024-01-12',
    isOverdue: true
  },
  {
    id: 5,
    name: '客服培训材料',
    project: '团队建设',
    assignee: '钱七',
    priority: 'medium',
    priorityText: '中',
    progress: 60,
    status: 'in_progress',
    statusText: '进行中',
    dueDate: '2024-01-25',
    isOverdue: false
  }
])
</script>