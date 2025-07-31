<template>
  <div class="flex flex-col h-screen bg-dark-bg">
    <!-- 顶部区域：页面标题、统计数据、搜索筛选 -->
    <div class="border-b border-dark-border">
      <!-- 页面标题和操作按钮 -->
      <div class="p-6 border-b border-dark-border">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-dark-text mb-2">商品图库</h1>
            <p class="text-dark-text-secondary">管理和组织商品相关的图片资源</p>
          </div>
          <div class="flex items-center space-x-3">
            <button 
              @click="showUploadModal = true"
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
              </svg>
              上传商品图片
            </button>
          </div>
        </div>
      </div>

      <!-- 统计信息卡片 -->
      <div class="p-6 border-b border-dark-border">
        <div class="grid grid-cols-4 gap-4">
          <div class="bg-dark-input rounded-lg p-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-dark-text-secondary">商品图片总数</p>
                <p class="text-2xl font-bold text-dark-text">{{ stats.totalImages }}</p>
              </div>
              <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </div>
            </div>
          </div>
          
          <div class="bg-dark-input rounded-lg p-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-dark-text-secondary">存储空间</p>
                <p class="text-2xl font-bold text-dark-text">{{ stats.storageUsed }}</p>
              </div>
              <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                </svg>
              </div>
            </div>
          </div>
          
          <div class="bg-dark-input rounded-lg p-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-dark-text-secondary">今日上传</p>
                <p class="text-2xl font-bold text-dark-text">{{ stats.todayUploads }}</p>
              </div>
              <div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                </svg>
              </div>
            </div>
          </div>

          <div class="bg-dark-input rounded-lg p-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-dark-text-secondary">分类数量</p>
                <p class="text-2xl font-bold text-dark-text">{{ getTotalCategories() }}</p>
              </div>
              <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-5l-2-2H5a2 2 0 00-2 2z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 搜索和筛选栏 -->
      <div class="p-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <!-- 搜索框 -->
            <div class="relative">
              <input 
                v-model="searchQuery"
                type="text"
                placeholder="搜索商品图片..."
                class="w-64 px-3 py-2 bg-dark-input border border-dark-border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-dark-text pl-10"
              />
              <svg class="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>

            <!-- 排序 -->
            <select 
              v-model="sortBy"
              class="px-3 py-2 bg-dark-input border border-dark-border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-dark-text"
            >
              <option value="name">按名称</option>
              <option value="date">按日期</option>
              <option value="size">按大小</option>
            </select>
          </div>

          <div class="flex items-center space-x-4">
            <!-- 视图切换 -->
            <div class="flex items-center bg-dark-input rounded-md p-1">
              <button 
                @click="viewMode = 'grid'"
                :class="viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-dark-text-secondary'"
                class="p-2 rounded-md transition-colors"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                </svg>
              </button>
              <button 
                @click="viewMode = 'list'"
                :class="viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-dark-text-secondary'"
                class="p-2 rounded-md transition-colors"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
                </svg>
              </button>
            </div>

            <!-- 批量操作 -->
            <button 
              v-if="selectedItems.length > 0"
              @click="showBatchActions = !showBatchActions"
              class="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center relative"
            >
              已选择 {{ selectedItems.length }} 项
              <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
              
              <!-- 批量操作菜单 -->
              <div v-if="showBatchActions" class="absolute top-full right-0 mt-2 w-48 bg-dark-card border border-dark-border rounded-md shadow-lg z-10">
                <div class="py-1">
                  <button 
                    @click="batchMove"
                    class="w-full text-left px-4 py-2 text-sm text-dark-text hover:bg-dark-hover"
                  >
                    移动到分类
                  </button>
                  <button 
                    @click="batchDownload"
                    class="w-full text-left px-4 py-2 text-sm text-dark-text hover:bg-dark-hover"
                  >
                    批量下载
                  </button>
                  <button 
                    @click="batchDelete"
                    class="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-dark-hover"
                  >
                    批量删除
                  </button>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部区域：分类面板 + 图片展示 -->
    <div class="flex flex-1 overflow-hidden">
      <!-- 左侧分类面板 -->
      <div class="w-64 bg-dark-card border-r border-dark-border flex flex-col">
        <!-- 分类标题 -->
        <div class="p-4 border-b border-dark-border">
          <div class="flex items-center justify-between">
            <h3 class="font-medium text-dark-text">商品分类</h3>
            <button 
              @click="showAddCategoryModal = true"
              class="p-1 text-dark-text-secondary hover:text-dark-text rounded"
              title="添加分类"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- 分类列表 -->
        <div class="flex-1 overflow-y-auto">
          <!-- 全部 -->
          <div 
            @click="selectCategory('')"
            :class="selectedCategory === '' ? 'bg-blue-600 text-white' : 'text-dark-text hover:bg-dark-hover'"
            class="flex items-center px-4 py-3 cursor-pointer transition-colors"
          >
            <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
            </svg>
            <span class="flex-1">全部</span>
            <span class="text-xs bg-dark-input px-2 py-1 rounded">{{ getTotalCount() }}</span>
          </div>

          <!-- 用户自定义分类 -->
          <div v-for="category in userCategories" :key="category.id" class="group">
            <div 
              @click="selectCategory(category.value)"
              :class="selectedCategory === category.value ? 'bg-blue-600 text-white' : 'text-dark-text hover:bg-dark-hover'"
              class="flex items-center px-4 py-3 cursor-pointer transition-colors"
            >
              <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-5l-2-2H5a2 2 0 00-2 2z"/>
              </svg>
              <span class="flex-1">{{ category.name }}</span>
              <span class="text-xs bg-dark-input px-2 py-1 rounded mr-2">{{ category.count }}</span>
              
              <!-- 分类操作按钮 -->
              <div class="opacity-0 group-hover:opacity-100 flex items-center space-x-1">
                <button 
                  @click.stop="editCategory(category)"
                  class="p-1 text-dark-text-secondary hover:text-dark-text rounded"
                  title="编辑分类"
                >
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                </button>
                <button 
                  @click.stop="deleteCategory(category)"
                  class="p-1 text-red-400 hover:text-red-300 rounded"
                  title="删除分类"
                >
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- 默认系统分类 -->
          <div class="px-4 py-2 text-xs text-dark-text-secondary border-t border-dark-border mt-2">
            系统分类
          </div>
          <div v-for="category in systemCategories" :key="category.value">
            <div 
              @click="selectCategory(category.value)"
              :class="selectedCategory === category.value ? 'bg-blue-600 text-white' : 'text-dark-text hover:bg-dark-hover'"
              class="flex items-center px-4 py-3 cursor-pointer transition-colors"
            >
              <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
              </svg>
              <span class="flex-1">{{ category.name }}</span>
              <span class="text-xs bg-dark-input px-2 py-1 rounded">{{ category.count }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧图片展示区域 -->
      <div class="flex-1 flex flex-col">
        <!-- 图片内容区域 -->
        <div class="flex-1 overflow-auto">
          <!-- 网格视图 -->
          <div v-if="viewMode === 'grid'" class="p-6">
            <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <div 
                v-for="image in filteredImages" 
                :key="image.id"
                class="group relative bg-dark-input rounded-lg overflow-hidden border border-dark-border hover:shadow-md transition-all cursor-pointer"
                @click="openImageDetail(image)"
              >
                <!-- 选择框 -->
                <div class="absolute top-2 left-2 z-10">
                  <input 
                    type="checkbox" 
                    v-model="selectedItems" 
                    :value="image.id"
                    @click.stop
                    class="w-4 h-4 rounded border-dark-border"
                  />
                </div>

                <!-- 图片 -->
                <div class="aspect-square overflow-hidden">
                  <img 
                    :src="image.url" 
                    :alt="image.name"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                <!-- 商品信息覆盖层 -->
                <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
                  <h3 class="text-white text-sm font-medium truncate">{{ image.productName }}</h3>
                  <div class="flex items-center justify-between mt-1">
                    <span class="text-white text-xs opacity-80">{{ image.dimensions }}</span>
                    <span 
                      class="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium"
                      :class="getCategoryClass(image.category)"
                    >
                      {{ getCategoryName(image.category) }}
                    </span>
                  </div>
                </div>

                <!-- 悬停操作 -->
                <div class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                  <button 
                    @click.stop="previewImage(image)"
                    class="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                  </button>
                  <button 
                    @click.stop="downloadImage(image)"
                    class="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-4-4m4 4l4-4m-6 4V4"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- 列表视图 -->
          <div v-if="viewMode === 'list'" class="border-t border-dark-border">
            <table class="w-full">
              <thead class="bg-dark-border">
                <tr>
                  <th class="px-4 py-3 text-left text-xs font-medium text-dark-text-secondary uppercase tracking-wider">
                    <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" class="rounded border-dark-border">
                  </th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-dark-text-secondary uppercase tracking-wider">名称</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-dark-text-secondary uppercase tracking-wider">商品名称</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-dark-text-secondary uppercase tracking-wider">分类</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-dark-text-secondary uppercase tracking-wider">尺寸</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-dark-text-secondary uppercase tracking-wider">大小</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-dark-text-secondary uppercase tracking-wider">上传时间</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-dark-text-secondary uppercase tracking-wider">操作</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-dark-border bg-dark-card">
                <tr v-for="image in filteredImages" :key="image.id" class="hover:bg-dark-hover">
                  <td class="px-4 py-3">
                    <input type="checkbox" v-model="selectedItems" :value="image.id" class="rounded border-dark-border">
                  </td>
                  <td class="px-4 py-3 flex items-center">
                    <img :src="image.url" :alt="image.name" class="w-10 h-10 rounded object-cover mr-3">
                    <span class="text-sm font-medium text-dark-text">{{ image.name }}</span>
                  </td>
                  <td class="px-4 py-3 text-sm text-dark-text">{{ image.productName }}</td>
                  <td class="px-4 py-3">
                    <span 
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      :class="getCategoryClass(image.category)"
                    >
                      {{ getCategoryName(image.category) }}
                    </span>
                  </td>
                  <td class="px-4 py-3 text-sm text-dark-text-secondary">{{ image.dimensions }}</td>
                  <td class="px-4 py-3 text-sm text-dark-text-secondary">{{ image.fileSize }}</td>
                  <td class="px-4 py-3 text-sm text-dark-text-secondary">{{ image.uploadedAt }}</td>
                  <td class="px-4 py-3">
                    <div class="flex items-center space-x-2">
                      <button 
                        @click="openImageDetail(image)"
                        class="text-blue-600 hover:text-blue-700"
                      >
                        查看
                      </button>
                      <button 
                        @click="downloadImage(image)"
                        class="text-green-600 hover:text-green-700"
                      >
                        下载
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- 分页 -->
          <div class="p-6 border-t border-dark-border flex items-center justify-between">
            <div class="text-sm text-dark-text-secondary">
              显示 {{ (currentPage - 1) * pageSize + 1 }} 到 {{ Math.min(currentPage * pageSize, totalItems) }} 条，共 {{ totalItems }} 条
            </div>
            
            <div class="flex items-center space-x-2">
              <button 
                @click="goToPage(currentPage - 1)"
                :disabled="currentPage === 1"
                class="px-3 py-1 rounded border border-dark-border text-dark-text disabled:opacity-50 disabled:cursor-not-allowed hover:bg-dark-hover"
              >
                上一页
              </button>
              
              <span class="px-3 py-1 bg-blue-600 text-white rounded">{{ currentPage }}</span>
              
              <button 
                @click="goToPage(currentPage + 1)"
                :disabled="currentPage >= totalPages"
                class="px-3 py-1 rounded border border-dark-border text-dark-text disabled:opacity-50 disabled:cursor-not-allowed hover:bg-dark-hover"
              >
                下一页
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 图片详情弹窗 -->
  <ImageDetailModal
    :isOpen="showDetailModal"
    :image="selectedImage"
    @close="showDetailModal = false"
    @download="downloadImage"
    @delete="deleteImage"
  />

  <!-- 添加分类弹窗 -->
  <div v-if="showAddCategoryModal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
    <div class="bg-dark-card rounded-lg w-full max-w-md text-dark-text">
      <div class="p-4 border-b border-dark-border">
        <h3 class="font-medium">{{ editingCategory ? '编辑分类' : '添加分类' }}</h3>
      </div>
      <div class="p-4">
        <div class="mb-4">
          <label class="block text-sm font-medium text-dark-text mb-2">分类名称</label>
          <input 
            v-model="categoryForm.name"
            type="text"
            placeholder="请输入分类名称"
            class="w-full px-3 py-2 bg-dark-input border border-dark-border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-dark-text"
          />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-dark-text mb-2">描述（可选）</label>
          <textarea 
            v-model="categoryForm.description"
            placeholder="请输入分类描述"
            class="w-full px-3 py-2 bg-dark-input border border-dark-border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-dark-text"
            rows="3"
          />
        </div>
      </div>
      <div class="p-4 border-t border-dark-border flex justify-end space-x-3">
        <button 
          @click="cancelCategoryEdit"
          class="px-4 py-2 border border-dark-border rounded-md text-dark-text-secondary hover:bg-dark-hover"
        >
          取消
        </button>
        <button 
          @click="saveCategoryEdit"
          :disabled="!categoryForm.name.trim()"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ editingCategory ? '保存' : '添加' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import ImageDetailModal from '~/components/ImageDetailModal.vue'

// 使用 dashboard 布局
definePageMeta({
  layout: 'dashboard'
})

// 搜索和筛选
const searchQuery = ref('')
const selectedCategory = ref('')
const sortBy = ref('date')

// 视图模式
const viewMode = ref('grid')

// 选择状态
const selectedItems = ref([])
const selectAll = ref(false)
const showBatchActions = ref(false)

// 分页
const currentPage = ref(1)
const pageSize = ref(24)

// 弹窗状态
const showDetailModal = ref(false)
const showUploadModal = ref(false)
const showAddCategoryModal = ref(false)
const selectedImage = ref(null)

// 分类管理
const editingCategory = ref(null)
const categoryForm = ref({
  name: '',
  description: ''
})

// 统计数据
const stats = ref({
  totalImages: '2,456',
  storageUsed: '15.6GB',
  todayUploads: '24'
})

// 用户自定义分类
const userCategories = ref([
  { id: 1, name: '春季新品', value: 'spring-new', count: 156, description: '2024春季新品图片' },
  { id: 2, name: '促销活动', value: 'promotion', count: 89, description: '促销活动相关图片' },
  { id: 3, name: '品牌宣传', value: 'brand', count: 234, description: '品牌宣传素材' },
  { id: 4, name: '产品详情', value: 'product-detail', count: 445, description: '产品详情页图片' }
])

// 系统默认分类
const systemCategories = ref([
  { name: '服装', value: 'clothing', count: 256 },
  { name: '电子产品', value: 'electronics', count: 189 },
  { name: '家居用品', value: 'home', count: 432 },
  { name: '美妆护肤', value: 'beauty', count: 178 },
  { name: '运动户外', value: 'sports', count: 123 }
])

// 商品图片数据
const images = ref([
  {
    id: 1,
    name: 'product_001.jpg',
    productName: '纯棉圆领T恤',
    url: 'https://via.placeholder.com/300x300/4F46E5/ffffff?text=T恤',
    category: 'clothing',
    dimensions: '1024x1024',
    fileSize: '2.5MB',
    uploadedAt: '2025-01-15 14:30',
    description: '高品质纯棉T恤商品图片'
  },
  {
    id: 2,
    name: 'product_002.jpg',
    productName: '智能手机',
    url: 'https://via.placeholder.com/300x300/059669/ffffff?text=手机',
    category: 'electronics',
    dimensions: '1200x1200',
    fileSize: '3.2MB',
    uploadedAt: '2025-01-15 13:45',
    description: '最新款智能手机产品图片'
  },
  {
    id: 3,
    name: 'product_003.jpg',
    productName: '陶瓷马克杯',
    url: 'https://via.placeholder.com/300x300/DC2626/ffffff?text=杯子',
    category: 'home',
    dimensions: '800x800',
    fileSize: '1.8MB',
    uploadedAt: '2025-01-15 12:20',
    description: '精美陶瓷马克杯商品图片'
  },
  {
    id: 4,
    name: 'product_004.jpg',
    productName: '保湿面霜',
    url: 'https://via.placeholder.com/300x300/7C3AED/ffffff?text=面霜',
    category: 'beauty',
    dimensions: '600x600',
    fileSize: '1.5MB',
    uploadedAt: '2025-01-15 11:15',
    description: '高端保湿面霜产品图片'
  },
  {
    id: 5,
    name: 'product_005.jpg',
    productName: '运动跑鞋',
    url: 'https://via.placeholder.com/300x300/EA580C/ffffff?text=跑鞋',
    category: 'sports',
    dimensions: '1080x1080',
    fileSize: '2.8MB',
    uploadedAt: '2025-01-15 10:30',
    description: '专业运动跑鞋商品图片'
  },
  {
    id: 6,
    name: 'product_006.jpg',
    productName: '连帽卫衣',
    url: 'https://via.placeholder.com/300x300/0891B2/ffffff?text=卫衣',
    category: 'clothing',
    dimensions: '1024x1024',
    fileSize: '2.9MB',
    uploadedAt: '2025-01-15 09:45',
    description: '时尚连帽卫衣商品图片'
  }
])

// 筛选后的图片
const filteredImages = computed(() => {
  let result = [...images.value]
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(img => 
      img.name.toLowerCase().includes(query) ||
      img.productName.toLowerCase().includes(query) ||
      img.description.toLowerCase().includes(query)
    )
  }
  
  if (selectedCategory.value) {
    result = result.filter(img => img.category === selectedCategory.value)
  }
  
  // 排序
  result.sort((a, b) => {
    switch (sortBy.value) {
      case 'name':
        return a.name.localeCompare(b.name)
      case 'date':
        return new Date(b.uploadedAt) - new Date(a.uploadedAt)
      case 'size':
        return parseFloat(b.fileSize) - parseFloat(a.fileSize)
      default:
        return 0
    }
  })
  
  return result
})

// 分页计算
const totalItems = computed(() => filteredImages.value.length)
const totalPages = computed(() => Math.ceil(totalItems.value / pageSize.value))

// 获取分类名称
const getCategoryName = (category) => {
  const allCategories = [...userCategories.value, ...systemCategories.value]
  const found = allCategories.find(cat => cat.value === category)
  return found ? found.name : '其他'
}

// 获取分类样式
const getCategoryClass = (category) => {
  const categoryClasses = {
    clothing: 'bg-blue-100 text-blue-800',
    electronics: 'bg-green-100 text-green-800',
    home: 'bg-orange-100 text-orange-800',
    beauty: 'bg-pink-100 text-pink-800',
    sports: 'bg-purple-100 text-purple-800'
  }
  return categoryClasses[category] || 'bg-gray-100 text-gray-800'
}

// 获取总数量
const getTotalCount = () => {
  return images.value.length
}

// 获取总分类数
const getTotalCategories = () => {
  return userCategories.value.length + systemCategories.value.length
}

// 分类操作
const selectCategory = (category) => {
  selectedCategory.value = category
  currentPage.value = 1
}

const editCategory = (category) => {
  editingCategory.value = category
  categoryForm.value = {
    name: category.name,
    description: category.description || ''
  }
  showAddCategoryModal.value = true
}

const deleteCategory = (category) => {
  if (confirm(`确定要删除分类"${category.name}"吗？`)) {
    const index = userCategories.value.findIndex(cat => cat.id === category.id)
    if (index > -1) {
      userCategories.value.splice(index, 1)
    }
  }
}

const saveCategoryEdit = () => {
  if (!categoryForm.value.name.trim()) return
  
  if (editingCategory.value) {
    // 编辑现有分类
    const category = editingCategory.value
    category.name = categoryForm.value.name
    category.description = categoryForm.value.description
  } else {
    // 添加新分类
    const newCategory = {
      id: Date.now(),
      name: categoryForm.value.name,
      value: categoryForm.value.name.toLowerCase().replace(/\s+/g, '-'),
      count: 0,
      description: categoryForm.value.description
    }
    userCategories.value.push(newCategory)
  }
  
  cancelCategoryEdit()
}

const cancelCategoryEdit = () => {
  showAddCategoryModal.value = false
  editingCategory.value = null
  categoryForm.value = {
    name: '',
    description: ''
  }
}

// 图片操作方法
const openImageDetail = (image) => {
  selectedImage.value = image
  showDetailModal.value = true
}

const previewImage = (image) => {
  openImageDetail(image)
}

const downloadImage = (image) => {
  console.log('下载图片:', image.name)
}

const deleteImage = (image) => {
  console.log('删除图片:', image.name)
}

const toggleSelectAll = () => {
  if (selectAll.value) {
    selectedItems.value = filteredImages.value.map(img => img.id)
  } else {
    selectedItems.value = []
  }
}

const batchMove = () => {
  console.log('批量移动:', selectedItems.value)
  showBatchActions.value = false
}

const batchDownload = () => {
  console.log('批量下载:', selectedItems.value)
  showBatchActions.value = false
}

const batchDelete = () => {
  console.log('批量删除:', selectedItems.value)
  showBatchActions.value = false
}

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

// 页面初始化
onMounted(() => {
  console.log('商品图库页面初始化')
})
</script>