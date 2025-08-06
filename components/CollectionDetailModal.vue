<template>
  <Transition name="modal" appear>
    <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div class="bg-dark-card rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto text-dark-text transform transition-all duration-300 ease-out">
      <div class="p-5 border-b border-dark-border flex justify-between items-center">
        <h3 class="font-medium">采集详情 <span class="text-gray-500 text-sm ml-2">任务ID：{{ taskData.id || 'COL001' }}</span></h3>
        <button @click="close" class="text-gray-400 hover:text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      <div class="p-6">
        <!-- 商品链接采集详情 -->
        <div v-if="collectionType === 'product'">
          <div class="grid grid-cols-4 gap-4 mb-6">
            <div class="bg-dark-input rounded-md p-4">
              <div class="text-sm text-gray-400 mb-1">采集类型</div>
              <div class="font-medium">{{ taskData.type || '商品链接' }}</div>
            </div>
            <div class="bg-dark-input rounded-md p-4">
              <div class="text-sm text-gray-400 mb-1">采集平台</div>
              <div class="font-medium">{{ taskData.platform || '未知' }}</div>
            </div>
            <div class="bg-dark-input rounded-md p-4">
              <div class="text-sm text-gray-400 mb-1">目标数</div>
              <div class="font-medium">{{ taskData.targetCount || 0 }}</div>
            </div>
            <div class="bg-dark-input rounded-md p-4">
              <div class="text-sm text-gray-400 mb-1">成功数</div>
              <div class="font-medium">{{ taskData.successCount || 0 }}</div>
            </div>
          </div>
          
          <!-- 搜索框 -->
          <div class="flex mb-4">
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="请输入标题搜索"
              class="flex-1 px-3 py-2 bg-dark-input border border-dark-border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-dark-text"
            />
            <button class="ml-2 px-4 py-2 bg-dark-hover text-dark-text rounded-md">查询</button>
          </div>
          
          <!-- 表格 -->
          <div class="overflow-x-auto">
            <table class="min-w-full">
              <thead>
                <tr class="border-b border-dark-border">
                  <th class="py-3 px-4 text-left">
                    <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" />
                  </th>
                  <th class="py-3 px-4 text-left">序号</th>
                  <th class="py-3 px-4 text-left">主图</th>
                  <th class="py-3 px-4 text-left">标题</th>
                  <th class="py-3 px-4 text-left">价格</th>
                  <th class="py-3 px-4 text-left">状态</th>
                  <th class="py-3 px-4 text-left">操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in productItems" :key="index" class="border-b border-dark-border">
                  <td class="py-3 px-4">
                    <input type="checkbox" v-model="item.selected" />
                  </td>
                  <td class="py-3 px-4">{{ index + 1 }}</td>
                  <td class="py-3 px-4">
                    <div class="w-16 h-16 bg-dark-hover rounded-md overflow-hidden">
                      <OptimizedImage
                        :src="item.image"
                        :alt="item.title"
                        width="64px"
                        height="64px"
                        container-class="w-16 h-16"
                        :lazy="false"
                        :zoomable="true"
                        priority="high"
                        :show-progress="true"
                        @click="handleImageClick(item)"
                      />
                    </div>
                  </td>
                  <td class="py-3 px-4 max-w-[300px]">
                    <div class="truncate">{{ item.title }}</div>
                  </td>
                  <td class="py-3 px-4">${{ item.price }}</td>
                  <td class="py-3 px-4">
                    <span 
                      class="px-2 py-1 text-xs font-medium rounded-md"
                      :class="{
                        'bg-green-500 text-white': item.status === '已完成',
                        'bg-red-500 text-white': item.status === '失败',
                        'bg-blue-500 text-white': item.status === '处理中',
                        'bg-gray-500 text-white': item.status === '待处理'
                      }"
                    >
                      {{ item.status }}
                    </span>
                  </td>
                  <td class="py-3 px-4">
                    <a 
                      v-if="item.url" 
                      :href="item.url" 
                      target="_blank" 
                      class="text-green-500 hover:underline"
                    >
                      访问链接
                    </a>
                    <span v-else class="text-gray-400">无链接</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
        
        <!-- 店铺链接采集详情 -->
        <div v-if="collectionType === 'store'">
          <div class="grid grid-cols-4 gap-4 mb-6">
            <div class="bg-dark-input rounded-md p-4">
              <div class="text-sm text-gray-400 mb-1">采集类型</div>
              <div class="font-medium">店铺链接</div>
            </div>
            <div class="bg-dark-input rounded-md p-4">
              <div class="text-sm text-gray-400 mb-1">采集平台</div>
              <div class="font-medium">亚马逊</div>
            </div>
            <div class="bg-dark-input rounded-md p-4">
              <div class="text-sm text-gray-400 mb-1">采集页数</div>
              <div class="font-medium">3</div>
            </div>
            <div class="bg-dark-input rounded-md p-4">
              <div class="text-sm text-gray-400 mb-1">目标数/成功数</div>
              <div class="font-medium">156/156</div>
            </div>
          </div>
          
          <!-- 搜索框 -->
          <div class="flex mb-4">
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="请输入标题搜索"
              class="flex-1 px-3 py-2 bg-dark-input border border-dark-border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-dark-text"
            />
            <button class="ml-2 px-4 py-2 bg-dark-hover text-dark-text rounded-md">查询</button>
          </div>
          
          <div class="mb-2 text-right">
            <a href="#" class="text-green-500 hover:underline">查看店铺链接</a>
          </div>
          
          <!-- 表格 -->
          <div class="overflow-x-auto">
            <table class="min-w-full">
              <thead>
                <tr class="border-b border-dark-border">
                  <th class="py-3 px-4 text-left">
                    <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" />
                  </th>
                  <th class="py-3 px-4 text-left">序号</th>
                  <th class="py-3 px-4 text-left">主图</th>
                  <th class="py-3 px-4 text-left">标题</th>
                  <th class="py-3 px-4 text-left">价格</th>
                  <th class="py-3 px-4 text-left">状态</th>
                  <th class="py-3 px-4 text-left">操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in productItems" :key="index" class="border-b border-dark-border">
                  <td class="py-3 px-4">
                    <input type="checkbox" v-model="item.selected" />
                  </td>
                  <td class="py-3 px-4">{{ index + 1 }}</td>
                  <td class="py-3 px-4">
                    <div class="w-16 h-16 bg-dark-hover rounded-md overflow-hidden">
                      <OptimizedImage
                        :src="item.image"
                        :alt="item.title"
                        width="64px"
                        height="64px"
                        container-class="w-16 h-16"
                        :lazy="false"
                        :zoomable="true"
                        priority="high"
                        :show-progress="true"
                        @click="handleImageClick(item)"
                      />
                    </div>
                  </td>
                  <td class="py-3 px-4 max-w-[300px]">
                    <div class="truncate">{{ item.title }}</div>
                  </td>
                  <td class="py-3 px-4">${{ item.price }}</td>
                  <td class="py-3 px-4">
                    <span 
                      class="px-2 py-1 text-xs font-medium rounded-md"
                      :class="{
                        'bg-green-500 text-white': item.status === '成功',
                        'bg-red-500 text-white': item.status === '失败',
                        'bg-gray-500 text-white': item.status === '处理中'
                      }"
                    >
                      {{ item.status }}
                    </span>
                  </td>
                  <td class="py-3 px-4">
                    <a href="#" class="text-green-500 hover:underline">访问链接</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <!-- 搜索采集详情 -->
        <div v-if="collectionType === 'search'">
          <div class="grid grid-cols-5 gap-4 mb-6">
            <div class="bg-dark-input rounded-md p-4">
              <div class="text-sm text-gray-400 mb-1">采集类型</div>
              <div class="font-medium">搜索采集</div>
            </div>
            <div class="bg-dark-input rounded-md p-4">
              <div class="text-sm text-gray-400 mb-1">关键词</div>
              <div class="font-medium">T Shirt</div>
            </div>
            <div class="bg-dark-input rounded-md p-4">
              <div class="text-sm text-gray-400 mb-1">采集平台</div>
              <div class="font-medium">亚马逊</div>
            </div>
            <div class="bg-dark-input rounded-md p-4">
              <div class="text-sm text-gray-400 mb-1">价格区间</div>
              <div class="font-medium">5.32~6.54</div>
            </div>
            <div class="bg-dark-input rounded-md p-4">
              <div class="text-sm text-gray-400 mb-1">采集数量</div>
              <div class="font-medium">5</div>
            </div>
            <div class="bg-dark-input rounded-md p-4">
              <div class="text-sm text-gray-400 mb-1">目标数</div>
              <div class="font-medium">156</div>
            </div>
            <div class="bg-dark-input rounded-md p-4">
              <div class="text-sm text-gray-400 mb-1">成功数</div>
              <div class="font-medium">156</div>
            </div>
          </div>
          
          <!-- 搜索框 -->
          <div class="flex mb-4">
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="请输入标题搜索"
              class="flex-1 px-3 py-2 bg-dark-input border border-dark-border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-dark-text"
            />
            <button class="ml-2 px-4 py-2 bg-dark-hover text-dark-text rounded-md">查询</button>
          </div>
          
          <!-- 表格 -->
          <div class="overflow-x-auto">
            <table class="min-w-full">
              <thead>
                <tr class="border-b border-dark-border">
                  <th class="py-3 px-4 text-left">
                    <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" />
                  </th>
                  <th class="py-3 px-4 text-left">序号</th>
                  <th class="py-3 px-4 text-left">主图</th>
                  <th class="py-3 px-4 text-left">标题</th>
                  <th class="py-3 px-4 text-left">价格</th>
                  <th class="py-3 px-4 text-left">状态</th>
                  <th class="py-3 px-4 text-left">操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in productItems" :key="index" class="border-b border-dark-border">
                  <td class="py-3 px-4">
                    <input type="checkbox" v-model="item.selected" />
                  </td>
                  <td class="py-3 px-4">{{ index + 1 }}</td>
                  <td class="py-3 px-4">
                    <div class="w-16 h-16 bg-dark-hover rounded-md overflow-hidden">
                      <OptimizedImage
                        :src="item.image"
                        :alt="item.title"
                        width="64px"
                        height="64px"
                        container-class="w-16 h-16"
                        :lazy="false"
                        :zoomable="true"
                        priority="high"
                        :show-progress="true"
                        @click="handleImageClick(item)"
                      />
                    </div>
                  </td>
                  <td class="py-3 px-4 max-w-[300px]">
                    <div class="truncate">{{ item.title }}</div>
                  </td>
                  <td class="py-3 px-4">${{ item.price }}</td>
                  <td class="py-3 px-4">
                    <span 
                      class="px-2 py-1 text-xs font-medium rounded-md"
                      :class="{
                        'bg-green-500 text-white': item.status === '成功',
                        'bg-red-500 text-white': item.status === '失败',
                        'bg-gray-500 text-white': item.status === '处理中'
                      }"
                    >
                      {{ item.status }}
                    </span>
                  </td>
                  <td class="py-3 px-4">
                    <a href="#" class="text-green-500 hover:underline">访问链接</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <!-- 插件采集详情 -->
        <div v-if="collectionType === 'plugin'">
          <div class="grid grid-cols-2 gap-4 mb-6">
            <div class="bg-dark-input rounded-md p-4">
              <div class="text-sm text-gray-400 mb-1">采集类型</div>
              <div class="font-medium">插件采集</div>
            </div>
            <div class="bg-dark-input rounded-md p-4">
              <div class="text-sm text-gray-400 mb-1">目标数/成功数</div>
              <div class="font-medium">156/156</div>
            </div>
          </div>
          
          <!-- 搜索框 -->
          <div class="flex mb-4">
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="请描述图片内容"
              class="flex-1 px-3 py-2 bg-dark-input border border-dark-border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-dark-text"
            />
            <button class="ml-2 px-4 py-2 bg-dark-hover text-dark-text rounded-md">查询</button>
          </div>
          
          <!-- 表格 -->
          <div class="overflow-x-auto">
            <table class="min-w-full">
              <thead>
                <tr class="border-b border-dark-border">
                  <th class="py-3 px-4 text-left">
                    <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" />
                  </th>
                  <th class="py-3 px-4 text-left">序号</th>
                  <th class="py-3 px-4 text-left">图片</th>
                  <th class="py-3 px-4 text-left">图片地址</th>
                  <th class="py-3 px-4 text-left">状态</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in pluginItems" :key="index" class="border-b border-dark-border">
                  <td class="py-3 px-4">
                    <input type="checkbox" v-model="item.selected" />
                  </td>
                  <td class="py-3 px-4">{{ index + 1 }}</td>
                  <td class="py-3 px-4">
                    <div class="w-16 h-16 bg-dark-hover rounded-md overflow-hidden">
                      <OptimizedImage
                        :src="item.image"
                        :alt="item.url"
                        width="64px"
                        height="64px"
                        container-class="w-16 h-16"
                        :lazy="false"
                        :zoomable="true"
                        priority="high"
                        :show-progress="true"
                        @click="handleImageClick(item)"
                      />
                    </div>
                  </td>
                  <td class="py-3 px-4 max-w-[400px]">
                    <div class="truncate text-green-500">{{ item.url }}</div>
                  </td>
                  <td class="py-3 px-4">
                    <span 
                      class="px-2 py-1 text-xs font-medium rounded-md"
                      :class="{
                        'bg-green-500 text-white': item.status === '成功',
                        'bg-red-500 text-white': item.status === '失败',
                        'bg-gray-500 text-white': item.status === '处理中'
                      }"
                    >
                      {{ item.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <!-- 裁图详情 -->
        <div v-if="collectionType === 'cropping'">
          <div class="grid grid-cols-3 gap-4 mb-6">
            <div class="bg-dark-input rounded-md p-4">
              <div class="text-sm text-gray-400 mb-1">目标数</div>
              <div class="font-medium">{{ taskData?.目标 || taskData?.targetCount || 0 }}</div>
            </div>
            <div class="bg-dark-input rounded-md p-4">
              <div class="text-sm text-gray-400 mb-1">成功数</div>
              <div class="font-medium">{{ taskData?.成功 || taskData?.successCount || 0 }}</div>
            </div>
            <div class="bg-dark-input rounded-md p-4">
              <div class="text-sm text-gray-400 mb-1">失败数</div>
              <div class="font-medium">{{ taskData?.失败 || taskData?.failedCount || 0 }}</div>
            </div>
          </div>
          
          <!-- 筛选区域 -->
          <div class="flex mb-4">
            <div class="relative">
              <button @click="showStatusFilter = !showStatusFilter" class="px-3 py-2 bg-dark-input border border-dark-border rounded-md flex items-center">
                {{ selectedStatusFilter }}
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div v-if="showStatusFilter" class="absolute mt-1 w-32 bg-dark-card border border-dark-border rounded-md shadow-lg z-10">
                <div class="py-1">
                  <button @click="filterByStatus('全部')" class="w-full text-left px-4 py-2 text-sm text-dark-text hover:bg-dark-hover">全部</button>
                  <button @click="filterByStatus('成功')" class="w-full text-left px-4 py-2 text-sm text-dark-text hover:bg-dark-hover">成功</button>
                  <button @click="filterByStatus('失败')" class="w-full text-left px-4 py-2 text-sm text-dark-text hover:bg-dark-hover">失败</button>
                  <button @click="filterByStatus('处理中')" class="w-full text-left px-4 py-2 text-sm text-dark-text hover:bg-dark-hover">处理中</button>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 表格 -->
          <div class="overflow-x-auto">
            <table class="min-w-full">
              <thead>
                <tr class="border-b border-dark-border">
                  <th class="py-3 px-4 text-left">
                    <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" />
                  </th>
                  <th class="py-3 px-4 text-left">序号</th>
                  <th class="py-3 px-4 text-left">原图</th>
                  <th class="py-3 px-4 text-left">裁剪图</th>
                  <th class="py-3 px-4 text-left">状态</th>
                  <th class="py-3 px-4 text-right">操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="!croppingItems || croppingItems.length === 0" class="border-b border-dark-border">
                  <td colspan="6" class="py-8 text-center text-gray-400">暂无数据</td>
                </tr>
                <tr v-else v-for="(item, index) in filteredCroppingItems" :key="item.id || index" class="border-b border-dark-border">
                  <td class="py-3 px-4">
                    <input type="checkbox" v-model="item.selected" />
                  </td>
                  <td class="py-3 px-4">{{ (pagination.page - 1) * pagination.limit + index + 1 }}</td>
                  <td class="py-3 px-4">
                    <div class="w-16 h-16 bg-dark-hover rounded-md overflow-hidden">
                      <OptimizedImage
                        :src="item.originalImage"
                        alt="原图"
                        width="64px"
                        height="64px"
                        container-class="w-16 h-16"
                        :lazy="false"
                        :zoomable="true"
                        priority="high"
                        :show-progress="true"
                        @click="handleImageClick(item)"
                      />
                    </div>
                  </td>
                  <td class="py-3 px-4">
                    <div class="w-16 h-16 bg-dark-hover rounded-md overflow-hidden">
                      <OptimizedImage
                        v-if="item.croppedImage"
                        :src="item.croppedImage"
                        alt="裁剪图"
                        width="64px"
                        height="64px"
                        container-class="w-16 h-16"
                        :lazy="false"
                        :zoomable="true"
                        priority="high"
                        :show-progress="true"
                        @click="handleImageClick(item)"
                      />
                      <div v-else class="w-full h-full bg-dark-hover flex items-center justify-center">
                        <span class="text-xs text-gray-500">无图片</span>
                      </div>
                    </div>
                  </td>
                  <td class="py-3 px-4">
                    <span 
                      class="px-2 py-1 text-xs font-medium rounded-md"
                      :class="{
                        'bg-green-500 text-white': item.status === '成功',
                        'bg-red-500 text-white': item.status === '失败',
                        'bg-yellow-500 text-white': item.status === '处理中',
                        'bg-gray-500 text-white': item.status === '暂停' || item.status === '未知'
                      }"
                    >
                      {{ item.status }}
                    </span>
                  </td>
                  <td class="py-3 px-4 text-right">
                    <a href="#" @click.prevent="downloadImage(item)" class="text-green-500 hover:underline">下载图片</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <!-- 分页 -->
        <div v-if="pagination && pagination.total > 0" class="mt-6 flex justify-between items-center">
          <div class="flex items-center space-x-4">
            <div class="text-sm text-gray-400">
              共 {{ pagination.total }} 条记录
            </div>
            <div class="flex items-center space-x-2">
              <span class="text-sm text-gray-400">每页显示</span>
              <select 
                v-model="selectedPageSize"
                @change="handlePageSizeChange"
                class="px-2 py-1 bg-dark-input border border-dark-border rounded-md text-sm"
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
              <span class="text-sm text-gray-400">条</span>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <button 
              @click="handlePageChange(pagination.page - 1)"
              :disabled="pagination.page <= 1"
              class="px-3 py-1 text-sm border border-dark-border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-dark-hover"
            >
              上一页
            </button>
            <span class="text-sm text-gray-400">
              {{ pagination.page }} / {{ Math.ceil(pagination.total / pagination.limit) }}
            </span>
            <button 
              @click="handlePageChange(pagination.page + 1)"
              :disabled="pagination.page >= Math.ceil(pagination.total / pagination.limit)"
              class="px-3 py-1 text-sm border border-dark-border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-dark-hover"
            >
              下一页
            </button>
            <div class="flex items-center space-x-2 ml-4">
              <span class="text-sm text-gray-400">跳转到</span>
              <input 
                type="number" 
                v-model="jumpToPage"
                @keyup.enter="handleJumpToPage"
                :min="1"
                :max="Math.ceil(pagination.total / pagination.limit)"
                class="w-16 px-2 py-1 bg-dark-input border border-dark-border rounded-md text-center text-sm" 
              />
              <button 
                @click="handleJumpToPage"
                class="px-2 py-1 text-sm border border-dark-border rounded-md hover:bg-dark-hover"
              >
                确定
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div class="p-5 border-t border-dark-border flex justify-end space-x-3">
        <button @click="close" class="px-4 py-2 border border-dark-border rounded-md text-gray-400 hover:bg-dark-hover">关闭</button>
        <button v-if="collectionType === 'cropping'" @click="exportCroppingDetail" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">一键提取</button>
        <div v-if="collectionType === 'cropping'" class="relative">
          <button @click="showMoreActions = !showMoreActions" class="px-4 py-2 border border-dark-border rounded-md text-gray-400 hover:bg-dark-hover flex items-center">
            更多操作
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div v-if="showMoreActions" class="absolute bottom-full right-0 mb-2 w-40 bg-dark-card border border-dark-border rounded-md shadow-lg z-10">
            <div class="py-1">
              <a href="#" class="block px-4 py-2 text-sm text-dark-text hover:bg-dark-hover">导出详情</a>
            </div>
          </div>
        </div>
        <button v-else @click="exportDetail" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">导出详情</button>
      </div>
    </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, defineProps, defineEmits, computed, onMounted, watch } from 'vue'
import OptimizedImage from '~/components/OptimizedImage.vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  taskData: {
    type: Object,
    default: () => ({})
  },
  type: {
    type: String,
    default: 'product' // product, store, search, plugin
  }
})

const emits = defineEmits(['close', 'download', 'page-change'])

// 采集类型
const collectionType = computed(() => {
  return props.type || 'product'
})

// 搜索查询
const searchQuery = ref('')

// 更多操作下拉菜单
const showMoreActions = ref(false)

// 状态筛选相关
const showStatusFilter = ref(false)
const selectedStatusFilter = ref('全部')

// 筛选后的裁图数据
const filteredCroppingItems = computed(() => {
  if (selectedStatusFilter.value === '全部') {
    return croppingItems.value
  }
  return croppingItems.value.filter(item => item.status === selectedStatusFilter.value)
})

// 按状态筛选
const filterByStatus = (status) => {
  selectedStatusFilter.value = status
  showStatusFilter.value = false
}

// 下载单个图片
const downloadImage = (item) => {
  console.log('下载图片:', item)
  emits('download', [item])
}

// 分页信息
const pagination = computed(() => {
  return props.taskData?.detailPagination || {
    page: 1,
    limit: 10,
    total: 0
  }
})

// 分页
const currentPage = ref(1)
const totalItems = ref(5)

// 选择全部
const selectAll = ref(false)
const toggleSelectAll = () => {
  if (collectionType.value === 'plugin') {
    pluginItems.value.forEach(item => item.selected = selectAll.value)
  } else if (collectionType.value === 'cropping') {
    // 对于裁图类型，需要直接修改计算属性的源数据或使用不同的方式处理
    croppingItems.value.forEach(item => item.selected = selectAll.value)
  } else {
    productItems.value.forEach(item => item.selected = selectAll.value)
  }
}

// 商品数据 - 初始化为空，等待从taskData中获取
const productItems = ref([])

// 监听taskData变化，更新产品列表
watch(() => props.taskData, (newTaskData) => {
  if (newTaskData && newTaskData.detailList) {
    console.log('🔄 更新产品列表:', newTaskData.detailList)
    
    // 将API数据转换为组件期望的格式
    productItems.value = newTaskData.detailList.map(item => ({
    selected: false, 
      id: item.id,
      image: item.image || 'https://via.placeholder.com/150',
      title: item.title || '',
      price: item.price ? item.price.replace('$', '') : '0.00',
      status: item.status || '未知',
      url: item.url || '',
      platform: item.platform || '',
      categoryId: item.categoryId || '',
      rawData: item.rawData
    }))
    
    console.log('✅ 产品列表已更新:', productItems.value)
  } else {
    // 如果没有数据，显示空列表
    productItems.value = []
  }
}, { 
  immediate: true, // 立即执行一次
  deep: true       // 深度监听
})

// 插件采集数据
const pluginItems = ref([
  { 
    selected: false, 
    image: 'https://via.placeholder.com/150', 
    url: 'http://pic.com/4375890238897/2347890/2347923-2346dfs032dfg.jpg', 
    status: '成功' 
  },
  { 
    selected: false, 
    image: 'https://via.placeholder.com/150', 
    url: 'http://pic.com/4375890238897/2347890/2347923-2346dfs032dfg.jpg', 
    status: '成功' 
  },
  { 
    selected: false, 
    image: 'https://via.placeholder.com/150', 
    url: 'http://pic.com/4375890238897/2347890/2347923-2346dfs032dfg.jpg', 
    status: '失败' 
  },
  { 
    selected: false, 
    image: 'https://via.placeholder.com/150', 
    url: 'http://pic.com/4375890238897/2347890/2347923-2346dfs032dfg.jpg', 
    status: '处理中' 
  },
  { 
    selected: false, 
    image: 'https://via.placeholder.com/150', 
    url: 'http://pic.com/4375890238897/2347890/2347923-2346dfs032dfg.jpg', 
    status: '成功' 
  }
])

// 裁图采集数据 - 从taskData中动态获取
const croppingItems = computed(() => {
  if (collectionType.value === 'cropping' && props.taskData?.detailList) {
    return props.taskData.detailList.map(item => ({
      selected: false,
      id: item.id || item.cropperId,
      cropperId: item.cropperId,
      originalImage: item.originalImage || item.imageUrl || 'https://via.placeholder.com/150/000000/FFFFFF?text=Original',
      croppedImage: item.croppedImage || item.cropperUrl || item.resultsImageUrl || null,
      status: getStatusText(item.status || item.cropperStatus),
      rawData: item
    }))
  }
  
  // 默认的示例数据（用于其他类型或无数据时）
  return [
    { 
      selected: false, 
      originalImage: 'https://via.placeholder.com/150/000000/FFFFFF?text=T-shirt+1', 
      croppedImage: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Cropped+1', 
      status: '成功' 
    },
    { 
      selected: false, 
      originalImage: 'https://via.placeholder.com/150/000000/FFFFFF?text=T-shirt+2', 
      croppedImage: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Cropped+2', 
      status: '成功' 
    },
    { 
      selected: false, 
      originalImage: 'https://via.placeholder.com/150/000000/FFFFFF?text=T-shirt+3', 
      croppedImage: null, 
      status: '失败' 
    },
    { 
      selected: false, 
      originalImage: 'https://via.placeholder.com/150/000000/FFFFFF?text=T-shirt+4', 
      croppedImage: null, 
      status: '处理中' 
    },
    { 
      selected: false, 
      originalImage: 'https://via.placeholder.com/150/000000/FFFFFF?text=T-shirt+5', 
      croppedImage: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Cropped+5', 
      status: '成功' 
    }
  ]
})

// 状态文本转换函数
const getStatusText = (status) => {
  const statusMap = {
    0: '待执行',
    1: '进行中', 
    2: '已完成',
    3: '部分失败',
    4: '失败'
  }
  return statusMap[status] || '未知'
}

// 每页显示数量
const selectedPageSize = ref(pagination.value.limit)

// 跳转到指定页
const jumpToPage = ref(pagination.value.page)

// 处理每页显示数量变化
const handlePageSizeChange = () => {
  console.log('🔄 每页显示数量变化:', selectedPageSize.value)
  // 发送分页变化事件给父组件
  emits('page-change', {
    page: 1, // 跳转到第一页
    limit: selectedPageSize.value
  })
}

// 处理跳转到指定页
const handleJumpToPage = () => {
  const newPage = parseInt(jumpToPage.value)
  if (newPage < 1 || newPage > Math.ceil(pagination.value.total / pagination.value.limit)) {
    return
  }
  console.log('🔄 跳转到指定页:', newPage)
  // 发送分页变化事件给父组件
  emits('page-change', {
    page: newPage,
    limit: pagination.value.limit
  })
}

// 监听pagination变化，更新相关变量
watch(() => pagination.value, (newPagination) => {
  if (newPagination) {
    selectedPageSize.value = newPagination.limit
    jumpToPage.value = newPagination.page
  }
}, { deep: true, immediate: true })

// 关闭弹窗
const close = () => {
  emits('close')
}

// 导出详情
const exportDetail = () => {
  let selectedItems = []
  
  if (collectionType.value === 'plugin') {
    selectedItems = pluginItems.value.filter(item => item.selected)
  } else if (collectionType.value === 'cropping') {
    selectedItems = croppingItems.value.filter(item => item.selected)
  }
  else {
    selectedItems = productItems.value.filter(item => item.selected)
  }
  
  console.log('导出详情:', selectedItems)
  emits('download', selectedItems)
}

// 导出裁图详情
const exportCroppingDetail = () => {
  let selectedItems = croppingItems.value.filter(item => item.selected)
  console.log('导出裁图详情:', selectedItems)
  emits('download', selectedItems)
}

// 处理分页变化
const handlePageChange = (newPage) => {
  if (newPage < 1 || newPage > Math.ceil(pagination.value.total / pagination.value.limit)) {
    return
  }
  
  console.log('🔄 详情弹窗分页变化:', { 
    currentPage: pagination.value.page, 
    newPage,
    limit: pagination.value.limit 
  })
  
  // 发送分页变化事件给父组件
  emits('page-change', {
    page: newPage,
    limit: pagination.value.limit
  })
}

// 处理图片点击
const handleImageClick = (item) => {
  console.log('点击图片:', item)
  // 可以在这里实现图片放大查看功能
  // 比如打开一个图片预览模态框
}

// 初始化
onMounted(() => {
  // 根据任务数据初始化
  console.log('任务数据:', props.taskData)
})
</script>

<style scoped>
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from, .modal-leave-to {
  opacity: 0;
}

.modal-enter-active .bg-dark-card,
.modal-leave-active .bg-dark-card {
  transition: transform 0.3s ease;
}

.modal-enter-from .bg-dark-card,
.modal-leave-to .bg-dark-card {
  transform: scale(0.9);
}
</style> 