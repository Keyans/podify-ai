<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 页面头部 -->
    <div class="bg-white shadow-sm border-b">
      <div class="px-6 py-4">
        <h1 class="text-2xl font-semibold text-gray-900">团队协作</h1>
        <p class="text-gray-600 mt-1">管理团队成员和协作项目</p>
      </div>
    </div>

    <!-- 主要内容 -->
    <div class="p-6">
      <!-- 统计卡片 -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-blue-100">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">团队成员</p>
              <p class="text-2xl font-semibold text-gray-900">24</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-green-100">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">活跃项目</p>
              <p class="text-2xl font-semibold text-gray-900">8</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-yellow-100">
              <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">待办任务</p>
              <p class="text-2xl font-semibold text-gray-900">42</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-purple-100">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">今日消息</p>
              <p class="text-2xl font-semibold text-gray-900">156</p>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- 团队成员 -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow">
            <div class="px-6 py-4 border-b border-gray-200">
              <div class="flex justify-between items-center">
                <h2 class="text-lg font-medium text-gray-900">团队成员</h2>
                <button class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm">
                  邀请成员
                </button>
              </div>
            </div>
            
            <div class="p-6">
              <div class="space-y-4">
                <!-- 成员项 -->
                <div v-for="member in teamMembers" :key="member.id" class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div class="flex items-center">
                    <div class="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium">
                      {{ member.name.charAt(0) }}
                    </div>
                    <div class="ml-4">
                      <p class="text-sm font-medium text-gray-900">{{ member.name }}</p>
                      <p class="text-sm text-gray-500">{{ member.role }}</p>
                    </div>
                  </div>
                  <div class="flex items-center space-x-2">
                    <span :class="[
                      'px-2 py-1 text-xs font-medium rounded-full',
                      member.status === 'online' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    ]">
                      {{ member.status === 'online' ? '在线' : '离线' }}
                    </span>
                    <button class="text-gray-400 hover:text-gray-600">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 最近活动 -->
        <div>
          <div class="bg-white rounded-lg shadow">
            <div class="px-6 py-4 border-b border-gray-200">
              <h2 class="text-lg font-medium text-gray-900">最近活动</h2>
            </div>
            
            <div class="p-6">
              <div class="space-y-4">
                <!-- 活动项 -->
                <div v-for="activity in recentActivities" :key="activity.id" class="flex items-start">
                  <div class="h-8 w-8 rounded-full bg-gradient-to-r from-green-500 to-blue-600 flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
                    {{ activity.user.charAt(0) }}
                  </div>
                  <div class="ml-3 flex-1">
                    <p class="text-sm text-gray-900">
                      <span class="font-medium">{{ activity.user }}</span>
                      {{ activity.action }}
                    </p>
                    <p class="text-xs text-gray-500 mt-1">{{ activity.time }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 项目列表 -->
      <div class="mt-8">
        <div class="bg-white rounded-lg shadow">
          <div class="px-6 py-4 border-b border-gray-200">
            <div class="flex justify-between items-center">
              <h2 class="text-lg font-medium text-gray-900">协作项目</h2>
              <button class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm">
                创建项目
              </button>
            </div>
          </div>
          
          <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <!-- 项目卡片 -->
              <div v-for="project in projects" :key="project.id" class="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-lg font-medium text-gray-900">{{ project.name }}</h3>
                  <span :class="[
                    'px-2 py-1 text-xs font-medium rounded-full',
                    project.status === 'active' ? 'bg-green-100 text-green-800' :
                    project.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  ]">
                    {{ project.statusText }}
                  </span>
                </div>
                
                <p class="text-sm text-gray-600 mb-4">{{ project.description }}</p>
                
                <div class="flex items-center justify-between">
                  <div class="flex -space-x-2">
                    <div v-for="member in project.members.slice(0, 3)" :key="member" class="h-6 w-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 border-2 border-white flex items-center justify-center text-white text-xs font-medium">
                      {{ member.charAt(0) }}
                    </div>
                    <div v-if="project.members.length > 3" class="h-6 w-6 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-gray-600 text-xs font-medium">
                      +{{ project.members.length - 3 }}
                    </div>
                  </div>
                  
                  <div class="text-sm text-gray-500">
                    {{ project.progress }}% 完成
                  </div>
                </div>
                
                <div class="mt-3">
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-blue-600 h-2 rounded-full" :style="{ width: project.progress + '%' }"></div>
                  </div>
                </div>
              </div>
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
  title: '团队协作 - PodifyAi',
  description: 'PodifyAi团队协作页面'
})

// 模拟数据
const teamMembers = ref([
  { id: 1, name: '张三', role: '项目经理', status: 'online' },
  { id: 2, name: '李四', role: '设计师', status: 'online' },
  { id: 3, name: '王五', role: '开发工程师', status: 'offline' },
  { id: 4, name: '赵六', role: '产品经理', status: 'online' },
  { id: 5, name: '钱七', role: '运营专员', status: 'offline' }
])

const recentActivities = ref([
  { id: 1, user: '张三', action: '创建了新项目 "春季营销活动"', time: '2分钟前' },
  { id: 2, user: '李四', action: '上传了设计稿', time: '15分钟前' },
  { id: 3, user: '王五', action: '完成了开发任务', time: '1小时前' },
  { id: 4, user: '赵六', action: '更新了项目需求', time: '2小时前' },
  { id: 5, user: '钱七', action: '发布了运营报告', time: '3小时前' }
])

const projects = ref([
  {
    id: 1,
    name: '春季营销活动',
    description: '为春季产品推广制定营销策略和创意内容',
    status: 'active',
    statusText: '进行中',
    members: ['张三', '李四', '王五'],
    progress: 75
  },
  {
    id: 2,
    name: 'POD产品设计',
    description: '设计新的按需打印产品系列',
    status: 'active',
    statusText: '进行中',
    members: ['李四', '赵六'],
    progress: 45
  },
  {
    id: 3,
    name: '用户体验优化',
    description: '优化平台用户界面和交互体验',
    status: 'pending',
    statusText: '待开始',
    members: ['王五', '赵六', '钱七'],
    progress: 20
  }
])
</script>