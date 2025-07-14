<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 页面头部 -->
    <div class="bg-white shadow-sm border-b">
      <div class="px-6 py-4">
        <h1 class="text-2xl font-semibold text-gray-900">团队资产</h1>
        <p class="text-gray-600 mt-1">管理团队共享的资源和素材</p>
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
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">总文件数</p>
              <p class="text-2xl font-semibold text-gray-900">1,247</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-green-100">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">图片素材</p>
              <p class="text-2xl font-semibold text-gray-900">856</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-purple-100">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011-1h2a1 1 0 011 1v3M7 4H5a1 1 0 00-1 1v16a1 1 0 001 1h14a1 1 0 001-1V5a1 1 0 00-1-1h-2M7 4h10M9 9h6m-6 4h6m-3 4h3"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">设计模板</p>
              <p class="text-2xl font-semibold text-gray-900">124</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-orange-100">
              <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">存储使用</p>
              <p class="text-2xl font-semibold text-gray-900">68%</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 工具栏 -->
      <div class="bg-white rounded-lg shadow mb-6">
        <div class="px-6 py-4">
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div class="flex space-x-4">
              <button class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                上传文件
              </button>
              <button class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                创建文件夹
              </button>
              <button class="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50">
                批量操作
              </button>
            </div>
            <div class="flex space-x-2">
              <select class="border border-gray-300 rounded-md px-3 py-2">
                <option>全部类型</option>
                <option>图片</option>
                <option>文档</option>
                <option>视频</option>
                <option>模板</option>
              </select>
              <div class="relative">
                <input type="text" placeholder="搜索资源..." class="border border-gray-300 rounded-md pl-10 pr-4 py-2">
                <svg class="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 文件夹和文件列表 -->
      <div class="bg-white rounded-lg shadow">
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex items-center space-x-2">
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-5l-2-2H5a2 2 0 00-2 2z"></path>
            </svg>
            <span class="text-sm text-gray-600">团队资产 / 设计素材</span>
          </div>
        </div>
        
        <div class="p-6">
          <!-- 文件夹 -->
          <div class="mb-6">
            <h3 class="text-sm font-medium text-gray-900 mb-3">文件夹</h3>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <div v-for="folder in folders" :key="folder.id" class="group cursor-pointer">
                <div class="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-blue-300 transition-colors">
                  <svg class="w-12 h-12 text-blue-500 mb-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2h-8l-2-2z"/>
                  </svg>
                  <p class="text-sm font-medium text-gray-900 text-center truncate w-full">{{ folder.name }}</p>
                  <p class="text-xs text-gray-500">{{ folder.count }} 个文件</p>
                </div>
              </div>
            </div>
          </div>

          <!-- 文件列表 -->
          <div>
            <h3 class="text-sm font-medium text-gray-900 mb-3">文件</h3>
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <input type="checkbox" class="rounded border-gray-300">
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">名称</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">类型</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">大小</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">上传者</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">修改时间</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="file in files" :key="file.id" class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <input type="checkbox" class="rounded border-gray-300">
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="h-8 w-8 flex-shrink-0">
                          <div :class="[
                            'w-full h-full rounded flex items-center justify-center',
                            file.type === 'image' ? 'bg-green-100' :
                            file.type === 'document' ? 'bg-blue-100' :
                            file.type === 'video' ? 'bg-purple-100' : 'bg-gray-100'
                          ]">
                            <svg class="w-4 h-4" :class="[
                              file.type === 'image' ? 'text-green-600' :
                              file.type === 'document' ? 'text-blue-600' :
                              file.type === 'video' ? 'text-purple-600' : 'text-gray-600'
                            ]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path v-if="file.type === 'image'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                              <path v-else-if="file.type === 'document'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                              <path v-else-if="file.type === 'video'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                          </div>
                        </div>
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">{{ file.name }}</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" :class="[
                        file.type === 'image' ? 'bg-green-100 text-green-800' :
                        file.type === 'document' ? 'bg-blue-100 text-blue-800' :
                        file.type === 'video' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                      ]">
                        {{ file.typeText }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ file.size }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="h-6 w-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-medium">
                          {{ file.uploader.charAt(0) }}
                        </div>
                        <div class="ml-2 text-sm text-gray-900">{{ file.uploader }}</div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ file.modifiedTime }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button class="text-blue-600 hover:text-blue-900 mr-3">下载</button>
                      <button class="text-green-600 hover:text-green-900 mr-3">分享</button>
                      <button class="text-red-600 hover:text-red-900">删除</button>
                    </td>
                  </tr>
                </tbody>
              </table>
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
  title: '团队资源 - PodifyAi',
  description: 'PodifyAi团队资源页面'
})

// 模拟数据
const folders = ref([
  { id: 1, name: '产品图片', count: 156 },
  { id: 2, name: '营销素材', count: 89 },
  { id: 3, name: 'Logo设计', count: 24 },
  { id: 4, name: '模板库', count: 67 },
  { id: 5, name: '视频素材', count: 32 },
  { id: 6, name: '文档资料', count: 45 }
])

const files = ref([
  {
    id: 1,
    name: '春季产品海报.jpg',
    type: 'image',
    typeText: '图片',
    size: '2.4 MB',
    uploader: '李四',
    modifiedTime: '2024-01-15 14:30'
  },
  {
    id: 2,
    name: '产品规格说明.pdf',
    type: 'document',
    typeText: '文档',
    size: '1.2 MB',
    uploader: '张三',
    modifiedTime: '2024-01-15 10:15'
  },
  {
    id: 3,
    name: '品牌宣传视频.mp4',
    type: 'video',
    typeText: '视频',
    size: '15.6 MB',
    uploader: '王五',
    modifiedTime: '2024-01-14 16:45'
  },
  {
    id: 4,
    name: 'T恤设计模板.psd',
    type: 'template',
    typeText: '模板',
    size: '8.9 MB',
    uploader: '赵六',
    modifiedTime: '2024-01-14 09:20'
  },
  {
    id: 5,
    name: '用户调研报告.docx',
    type: 'document',
    typeText: '文档',
    size: '3.1 MB',
    uploader: '钱七',
    modifiedTime: '2024-01-13 15:30'
  }
])
</script>