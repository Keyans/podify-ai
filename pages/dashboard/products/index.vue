<template>
  <div>
    <!-- POD商品头部 -->
    <div 
      class="p-6 mb-6 rounded-lg shadow-sm" 
      :style="{ 
        backgroundColor: 'var(--bg-secondary)', 
        color: 'var(--text-primary)' 
      }"
    >
      <div class="flex items-center">
        <div 
          class="p-2 rounded-lg mr-4" 
          :style="{
            backgroundColor: 'var(--accent-color)', 
            opacity: '0.1'
          }"
        >
          <svg 
            class="w-6 h-6" 
            :style="{ color: 'var(--accent-color)' }" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
          </svg>
        </div>
        <div>
          <h1 class="text-xl font-bold" :style="{ color: 'var(--text-primary)' }">POD商品</h1>
          <p :style="{ color: 'var(--text-secondary)' }" class="text-sm">便捷创建和管理智能打印</p>
        </div>
      </div>
    </div>

    <!-- 数据统计卡片 -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <!-- POD商品总数 -->
      <div class="bg-white p-6 rounded-lg shadow-sm flex justify-between items-center">
        <div>
          <p class="text-gray-500 text-sm">POD商品总数</p>
          <p class="text-2xl font-bold">86</p>
        </div>
        <div class="bg-purple-50 p-2 rounded-lg">
          <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
        </div>
      </div>

      <!-- 已刊登数量 -->
      <div class="bg-white p-6 rounded-lg shadow-sm flex justify-between items-center">
        <div>
          <p class="text-gray-500 text-sm">已刊登数量</p>
          <p class="text-2xl font-bold">42</p>
        </div>
        <div class="bg-green-50 p-2 rounded-lg">
          <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
          </svg>
        </div>
      </div>

      <!-- 今日新增 -->
      <div class="bg-white p-6 rounded-lg shadow-sm flex justify-between items-center">
        <div>
          <p class="text-gray-500 text-sm">今日新增</p>
          <p class="text-2xl font-bold">8</p>
        </div>
        <div class="bg-blue-50 p-2 rounded-lg">
          <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
        </div>
      </div>

      <!-- 平均价格 -->
      <div class="bg-white p-6 rounded-lg shadow-sm flex justify-between items-center">
        <div>
          <p class="text-gray-500 text-sm">平均价格</p>
          <p class="text-2xl font-bold text-orange-500">¥89.99</p>
        </div>
        <div class="bg-orange-50 p-2 rounded-lg">
          <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
      </div>
    </div>

    <!-- 操作按钮区域 -->
    <div class="flex space-x-2 mb-6">
      <button 
        class="flex items-center space-x-2 px-4 py-2 rounded-lg"
        :style="{
          backgroundColor: 'var(--bg-tertiary)',
          color: 'var(--text-primary)'
        }"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
        <span>POD商品生成"POD生产"应用程序生成，无法手动创建</span>
      </button>
      <button 
        class="flex items-center space-x-2 px-4 py-2 rounded-lg"
        :style="{
          backgroundColor: 'var(--accent-color)',
          color: 'white'
        }"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
        </svg>
        <span>导出商品</span>
      </button>
    </div>

    <!-- 商品列表区域 -->
    <div class="bg-white rounded-lg shadow-sm">
      <div class="p-6 border-b border-gray-200">
        <h2 class="text-lg font-semibold">POD商品列表</h2>
        <p class="text-sm text-gray-500">智能管理您创建的商品</p>
      </div>

      <!-- 表格 -->
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y" :style="{ borderColor: 'var(--border-color)' }">
          <thead :style="{ backgroundColor: 'var(--bg-tertiary)' }">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" :style="{ color: 'var(--text-secondary)' }">
                <input type="checkbox" class="rounded border-gray-300 text-blue-600">
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" :style="{ color: 'var(--text-secondary)' }">商品缩略图</th>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" :style="{ color: 'var(--text-secondary)' }">商品名称</th>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" :style="{ color: 'var(--text-secondary)' }">价格（美元）</th>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" :style="{ color: 'var(--text-secondary)' }">SKU编号</th>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" :style="{ color: 'var(--text-secondary)' }">行动类型</th>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" :style="{ color: 'var(--text-secondary)' }">创建人</th>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" :style="{ color: 'var(--text-secondary)' }">创建时间</th>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" :style="{ color: 'var(--text-secondary)' }">操作</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <!-- 第一行 -->
            <tr class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <input type="checkbox" class="rounded border-gray-300 text-blue-600">
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <img src="https://via.placeholder.com/60" alt="个性T恤" class="w-12 h-12 object-cover rounded">
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <p class="text-sm font-medium text-gray-900">个性化T恤 - 猫咪图案</p>
                  <p class="text-xs text-gray-500">类别：T恤/服饰</p>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <p class="text-sm text-green-600 font-medium">¥79.9</p>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <p class="text-sm text-gray-500">5</p>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">已刊登</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs">张</div>
                  <span class="ml-2 text-sm text-gray-900">张三</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <p class="text-sm text-gray-500">2024-01-15 14:30:25</p>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex space-x-2">
                  <button class="text-blue-600 hover:text-blue-800 text-sm">查看详情</button>
                  <button class="text-red-600 hover:text-red-800 text-sm">下架</button>
                </div>
              </td>
            </tr>
            
            <!-- 第二行 -->
            <tr class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <input type="checkbox" class="rounded border-gray-300 text-blue-600">
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <img src="https://via.placeholder.com/60" alt="宠物玩具" class="w-12 h-12 object-cover rounded">
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <p class="text-sm font-medium text-gray-900">宠物玩具 - 发声玩具</p>
                  <p class="text-xs text-gray-500">类别：宠物用品</p>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <p class="text-sm text-green-600 font-medium">¥45.9</p>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <p class="text-sm text-gray-500">3</p>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">未刊登</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">李</div>
                  <span class="ml-2 text-sm text-gray-900">李四</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <p class="text-sm text-gray-500">2024-01-15 13:45:12</p>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex space-x-2">
                  <button class="text-blue-600 hover:text-blue-800 text-sm">查看详情</button>
                  <button class="text-green-600 hover:text-green-800 text-sm">刊登</button>
                </div>
              </td>
            </tr>

            <!-- 第三行 -->
            <tr class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <input type="checkbox" class="rounded border-gray-300 text-blue-600">
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <img src="https://via.placeholder.com/60" alt="艺术帆布包" class="w-12 h-12 object-cover rounded">
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <p class="text-sm font-medium text-gray-900">艺术帆布包 - 抽象画风</p>
                  <p class="text-xs text-gray-500">类别：时尚配饰</p>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <p class="text-sm text-green-600 font-medium">¥69.9</p>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <p class="text-sm text-gray-500">4</p>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">处理中</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white text-xs">王</div>
                  <span class="ml-2 text-sm text-gray-900">王五</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <p class="text-sm text-gray-500">2024-01-15 12:20:08</p>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex space-x-2">
                  <button class="text-blue-600 hover:text-blue-800 text-sm">查看详情</button>
                  <button class="text-gray-600 hover:text-gray-800 text-sm">取消</button>
                </div>
              </td>
            </tr>

            <!-- 第四行 -->
            <tr class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <input type="checkbox" class="rounded border-gray-300 text-blue-600">
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <img src="https://via.placeholder.com/60" alt="个性手机壳" class="w-12 h-12 object-cover rounded">
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <p class="text-sm font-medium text-gray-900">个性化手机壳 - 几何图案</p>
                  <p class="text-xs text-gray-500">类别：iPhone手机壳</p>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <p class="text-sm text-green-600 font-medium">¥39.9</p>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <p class="text-sm text-gray-500">8</p>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">已刊登</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs">赵</div>
                  <span class="ml-2 text-sm text-gray-900">赵六</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <p class="text-sm text-gray-500">2024-01-15 11:15:25</p>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex space-x-2">
                  <button class="text-blue-600 hover:text-blue-800 text-sm">查看详情</button>
                  <button class="text-red-600 hover:text-red-800 text-sm">下架</button>
                </div>
              </td>
            </tr>

            <!-- 第五行 -->
            <tr class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <input type="checkbox" class="rounded border-gray-300 text-blue-600">
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <img src="https://via.placeholder.com/60" alt="宠物服装" class="w-12 h-12 object-cover rounded">
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <p class="text-sm font-medium text-gray-900">宠物服装 - 卡通图案</p>
                  <p class="text-xs text-gray-500">类别：宠物服饰</p>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <p class="text-sm text-green-600 font-medium">¥59.9</p>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <p class="text-sm text-gray-500">5</p>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">未刊登</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">钱</div>
                  <span class="ml-2 text-sm text-gray-900">钱七</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <p class="text-sm text-gray-500">2024-01-15 10:30:45</p>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex space-x-2">
                  <button class="text-blue-600 hover:text-blue-800 text-sm">查看详情</button>
                  <button class="text-green-600 hover:text-green-800 text-sm">刊登</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 分页 -->
      <div class="px-6 py-4 border-t flex items-center justify-between" :style="{ borderColor: 'var(--border-color)' }">
        <div class="text-sm" :style="{ color: 'var(--text-secondary)' }">
          共 5 条记录
        </div>
        <div class="flex items-center space-x-2">
          <span class="text-sm" :style="{ color: 'var(--text-secondary)' }">10/page</span>
          <button 
            class="px-3 py-1 text-sm rounded border" 
            :style="{
              backgroundColor: 'var(--bg-secondary)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-secondary)'
            }"
          >
            上一页
          </button>
          <button 
            class="px-3 py-1 text-sm rounded border"
            :style="{
              backgroundColor: 'var(--accent-color)',
              borderColor: 'var(--accent-color)',
              color: 'white'
            }"
          >
            1
          </button>
          <span class="text-sm" :style="{ color: 'var(--text-secondary)' }">Go to</span>
          <input 
            type="number" 
            value="1" 
            class="w-12 px-2 py-1 text-sm border rounded text-center"
            :style="{
              backgroundColor: 'var(--bg-tertiary)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)'
            }"
          >
          <button 
            class="px-3 py-1 text-sm rounded border"
            :style="{
              backgroundColor: 'var(--bg-secondary)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-secondary)'
            }"
          >
            下一页
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 使用 dashboard 布局
definePageMeta({
  layout: 'dashboard'
})

useHead({
  title: 'POD商品 - PodifyAi',
  meta: [
    { name: 'description', content: 'PodifyAi POD商品管理页面' }
  ]
})
</script>