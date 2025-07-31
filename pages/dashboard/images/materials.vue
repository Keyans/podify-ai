<template>
  <div class="flex flex-col h-screen bg-dark-bg">
    <!-- 顶部区域：页面标题、统计数据、搜索筛选 -->
    <div class="border-b border-dark-border">
      <!-- 页面标题和操作按钮 -->
      <div class="p-6 border-b border-dark-border">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-dark-text mb-2">素材图库</h1>
            <p class="text-dark-text-secondary">探索和管理设计创作素材资源</p>
          </div>
          <div class="flex items-center space-x-3">
            <button 
              @click="showUploadModal = true"
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
              </svg>
              上传素材
            </button>
            <button 
              @click="refreshMaterials"
              class="px-4 py-2 border border-dark-border rounded-md text-dark-text hover:bg-dark-hover flex items-center"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              刷新
            </button>
          </div>
        </div>
      </div>

      <!-- 统计信息卡片 -->
      <div class="p-6 border-b border-dark-border">
        <div class="grid grid-cols-5 gap-4">
          <div class="bg-dark-input rounded-lg p-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-dark-text-secondary">素材总数</p>
                <p class="text-2xl font-bold text-dark-text">{{ stats.totalMaterials }}</p>
              </div>
              <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
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
              <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                </svg>
              </div>
            </div>
          </div>
          
          <div class="bg-dark-input rounded-lg p-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-dark-text-secondary">热门素材</p>
                <p class="text-2xl font-bold text-dark-text">{{ stats.popular }}</p>
              </div>
              <div class="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
              </div>
            </div>
          </div>
          
          <div class="bg-dark-input rounded-lg p-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-dark-text-secondary">存储使用</p>
                <p class="text-2xl font-bold text-dark-text">{{ stats.storageUsed }}</p>
              </div>
              <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                </svg>
              </div>
            </div>
          </div>
          
          <div class="bg-dark-input rounded-lg p-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-dark-text-secondary">最近添加</p>
                <p class="text-2xl font-bold text-dark-text">{{ stats.recentAdded }}</p>
              </div>
              <div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
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
                placeholder="搜索素材..."
                class="w-64 px-3 py-2 bg-dark-input border border-dark-border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-dark-text pl-10"
              />
              <svg class="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>

            <!-- 标签筛选 -->
            <select 
              v-model="selectedTag"
              class="px-3 py-2 bg-dark-input border border-dark-border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-dark-text"
            >
              <option value="">选择标签</option>
              <option value="free">免费</option>
              <option value="premium">高级</option>
              <option value="trending">热门</option>
              <option value="new">最新</option>
            </select>

            <!-- 排序 -->
            <select 
              v-model="sortBy"
              class="px-3 py-2 bg-dark-input border border-dark-border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-dark-text"
            >
              <option value="newest">最新</option>
              <option value="popular">热门</option>
              <option value="name">名称</option>
              <option value="downloads">下载量</option>
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
                @click="viewMode = 'masonry'"
                :class="viewMode === 'masonry' ? 'bg-blue-600 text-white' : 'text-dark-text-secondary'"
                class="p-2 rounded-md transition-colors"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"/>
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
                    @click="batchDownload"
                    class="w-full text-left px-4 py-2 text-sm text-dark-text hover:bg-dark-hover"
                  >
                    批量下载
                  </button>
                  <button 
                    @click="batchAddToCollection"
                    class="w-full text-left px-4 py-2 text-sm text-dark-text hover:bg-dark-hover"
                  >
                    添加到收藏
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

    <!-- 底部区域：分类面板 + 素材展示 -->
    <div class="flex flex-1 overflow-hidden">
      <!-- 左侧分类面板 -->
      <div class="w-64 bg-dark-card border-r border-dark-border flex flex-col">
        <!-- 分类标题 -->
        <div class="p-4 border-b border-dark-border">
          <div class="flex items-center justify-between">
            <h3 class="font-medium text-dark-text">素材分类</h3>
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
              <span class="mr-3 text-lg">{{ category.icon }}</span>
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
              <span class="mr-3 text-lg">{{ category.icon }}</span>
              <span class="flex-1">{{ category.name }}</span>
              <span class="text-xs bg-dark-input px-2 py-1 rounded">{{ category.count }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧素材展示区域 -->
      <div class="flex-1 flex flex-col">
        <!-- 素材内容区域 -->
        <div class="flex-1 overflow-auto">
          <!-- 网格视图 -->
          <div v-if="viewMode === 'grid'" class="p-6">
            <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <div 
                v-for="material in filteredMaterials" 
                :key="material.id"
                class="group relative bg-dark-input rounded-lg overflow-hidden border border-dark-border hover:shadow-lg transition-all cursor-pointer"
                @click="openMaterialDetail(material)"
              >
                <!-- 选择框 -->
                <div class="absolute top-2 left-2 z-10">
                  <input 
                    type="checkbox" 
                    v-model="selectedItems" 
                    :value="material.id"
                    @click.stop
                    class="w-4 h-4 rounded border-dark-border"
                  />
                </div>

                <!-- 标签 -->
                <div class="absolute top-2 right-2 z-10">
                  <span 
                    v-if="material.isPremium"
                    class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"
                  >
                    高级
                  </span>
                  <span 
                    v-else
                    class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                  >
                    免费
                  </span>
                </div>

                <!-- 图片 -->
                <div class="aspect-square overflow-hidden">
                  <img 
                    :src="material.preview" 
                    :alt="material.title"
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                <!-- 悬停操作层 -->
                <div class="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                  <button 
                    @click.stop="previewMaterial(material)"
                    class="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100"
                    title="预览"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                  </button>
                  <button 
                    @click.stop="downloadMaterial(material)"
                    class="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100"
                    title="下载"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-4-4m4 4l4-4m-6 4V4"/>
                    </svg>
                  </button>
                  <button 
                    @click.stop="toggleFavorite(material)"
                    class="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100"
                    title="收藏"
                  >
                    <svg class="w-4 h-4" :class="material.isFavorite ? 'text-red-500' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                    </svg>
                  </button>
                </div>

                <!-- 素材信息 -->
                <div class="p-3">
                  <h3 class="text-sm font-medium text-dark-text truncate">{{ material.title }}</h3>
                  <div class="flex items-center justify-between mt-2">
                    <div class="flex items-center space-x-2">
                      <span class="text-xs text-dark-text-secondary">{{ material.dimensions }}</span>
                      <span class="text-xs text-dark-text-secondary">•</span>
                      <span class="text-xs text-dark-text-secondary">{{ material.format }}</span>
                    </div>
                    <div class="flex items-center space-x-1">
                      <svg class="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-4-4m4 4l4-4m-6 4V4"/>
                      </svg>
                      <span class="text-xs text-dark-text-secondary">{{ material.downloads }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 瀑布流视图 -->
          <div v-if="viewMode === 'masonry'" class="p-6">
            <div class="columns-2 md:columns-3 lg:columns-4 gap-4">
              <div 
                v-for="material in filteredMaterials" 
                :key="material.id"
                class="group relative bg-dark-input rounded-lg overflow-hidden border border-dark-border hover:shadow-lg transition-all cursor-pointer mb-4 break-inside-avoid"
                @click="openMaterialDetail(material)"
              >
                <!-- 选择框 -->
                <div class="absolute top-2 left-2 z-10">
                  <input 
                    type="checkbox" 
                    v-model="selectedItems" 
                    :value="material.id"
                    @click.stop
                    class="w-4 h-4 rounded border-dark-border"
                  />
                </div>

                <!-- 标签 -->
                <div class="absolute top-2 right-2 z-10">
                  <span 
                    v-if="material.isPremium"
                    class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"
                  >
                    高级
                  </span>
                  <span 
                    v-else
                    class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                  >
                    免费
                  </span>
                </div>

                <!-- 图片 -->
                <div class="overflow-hidden">
                  <img 
                    :src="material.preview" 
                    :alt="material.title"
                    class="w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    :style="{ aspectRatio: material.aspectRatio || '1' }"
                    loading="lazy"
                  />
                </div>

                <!-- 素材信息 -->
                <div class="p-3">
                  <h3 class="text-sm font-medium text-dark-text truncate">{{ material.title }}</h3>
                  <div class="flex items-center justify-between mt-2">
                    <span class="text-xs text-dark-text-secondary">{{ material.format }}</span>
                    <div class="flex items-center space-x-1">
                      <svg class="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-4-4m4 4l4-4m-6 4V4"/>
                      </svg>
                      <span class="text-xs text-dark-text-secondary">{{ material.downloads }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 分页 -->
          <div class="p-6 border-t border-dark-border flex items-center justify-between">
            <div class="text-sm text-dark-text-secondary">
              显示 {{ (currentPage - 1) * pageSize + 1 }} 到 {{ Math.min(currentPage * pageSize, totalMaterials) }} 条，共 {{ totalMaterials }} 条
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

  <!-- 素材详情弹窗 -->
  <MaterialDetailModal
    :isOpen="showDetailModal"
    :material="selectedMaterial"
    @close="showDetailModal = false"
    @download="downloadMaterial"
    @favorite="toggleFavorite"
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
          <label class="block text-sm font-medium text-dark-text mb-2">图标（可选）</label>
          <input 
            v-model="categoryForm.icon"
            type="text"
            placeholder="请输入emoji图标，如：🎨"
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
import MaterialDetailModal from '~/components/MaterialDetailModal.vue'

// 使用 dashboard 布局
definePageMeta({
  layout: 'dashboard'
})

// 搜索和筛选
const searchQuery = ref('')
const selectedCategory = ref('')
const selectedTag = ref('')
const sortBy = ref('newest')

// 视图模式
const viewMode = ref('grid')

// 选择状态
const selectedItems = ref([])
const showBatchActions = ref(false)

// 分页
const currentPage = ref(1)
const pageSize = ref(24)

// 弹窗状态
const showDetailModal = ref(false)
const showUploadModal = ref(false)
const showAddCategoryModal = ref(false)
const selectedMaterial = ref(null)

// 分类管理
const editingCategory = ref(null)
const categoryForm = ref({
  name: '',
  icon: '',
  description: ''
})

// 统计数据
const stats = ref({
  totalMaterials: '8,456',
  popular: '124',
  storageUsed: '45.2GB',
  recentAdded: '89'
})

// 用户自定义分类
const userCategories = ref([
  { id: 1, name: 'Logo设计', value: 'logo-design', icon: '🏷️', count: 234, description: 'Logo和品牌设计素材' },
  { id: 2, name: '节日素材', value: 'holiday', icon: '🎉', count: 167, description: '各种节日庆典素材' },
  { id: 3, name: '科技感', value: 'tech', icon: '⚡', count: 89, description: '科技风格设计元素' },
  { id: 4, name: '手绘插画', value: 'handdrawn', icon: '✏️', count: 156, description: '手绘风格插画素材' }
])

// 系统默认分类
const systemCategories = ref([
  { name: '图标', value: 'icons', icon: '🎯', count: 1245 },
  { name: '背景', value: 'backgrounds', icon: '🌈', count: 856 },
  { name: '纹理', value: 'textures', icon: '🧱', count: 634 },
  { name: '插画', value: 'illustrations', icon: '🎨', count: 923 },
  { name: '字体', value: 'fonts', icon: '🔤', count: 456 },
  { name: '模板', value: 'templates', icon: '📄', count: 789 },
  { name: '装饰', value: 'decorations', icon: '✨', count: 345 },
  { name: '图案', value: 'patterns', icon: '🔸', count: 567 }
])

// 素材数据
const materials = ref([
  {
    id: 1,
    title: '极简线条图标集',
    preview: 'https://via.placeholder.com/300x300/667EEA/ffffff?text=Icons',
    category: 'icons',
    format: 'SVG',
    dimensions: '24x24',
    downloads: '2.1k',
    isPremium: false,
    isFavorite: false,
    aspectRatio: '1',
    uploadedAt: '2025-01-15',
    description: '包含100+精美线条图标的完整图标集'
  },
  {
    id: 2,
    title: '抽象几何背景',
    preview: 'https://via.placeholder.com/300x400/F093FB/ffffff?text=Abstract',
    category: 'backgrounds',
    format: 'PNG',
    dimensions: '1920x1080',
    downloads: '1.5k',
    isPremium: true,
    isFavorite: true,
    aspectRatio: '3/4',
    uploadedAt: '2025-01-14',
    description: '现代抽象几何背景，适合各种设计项目'
  },
  {
    id: 3,
    title: '木质纹理素材',
    preview: 'https://via.placeholder.com/300x200/8B5A3C/ffffff?text=Wood',
    category: 'textures',
    format: 'JPG',
    dimensions: '2048x1024',
    downloads: '980',
    isPremium: false,
    isFavorite: false,
    aspectRatio: '3/2',
    uploadedAt: '2025-01-13',
    description: '高质量木质纹理，自然真实的材质表现'
  },
  {
    id: 4,
    title: '商务插画素材',
    preview: 'https://via.placeholder.com/300x350/4338CA/ffffff?text=Business',
    category: 'illustrations',
    format: 'AI',
    dimensions: '矢量',
    downloads: '756',
    isPremium: true,
    isFavorite: false,
    aspectRatio: '6/7',
    uploadedAt: '2025-01-12',
    description: '专业商务场景插画，可编辑矢量格式'
  },
  {
    id: 5,
    title: '现代无衬线字体',
    preview: 'https://via.placeholder.com/300x150/059669/ffffff?text=Font',
    category: 'fonts',
    format: 'TTF',
    dimensions: '字体文件',
    downloads: '1.2k',
    isPremium: false,
    isFavorite: true,
    aspectRatio: '2/1',
    uploadedAt: '2025-01-11',
    description: '简洁现代的无衬线字体，支持多语言'
  },
  {
    id: 6,
    title: '响应式网页模板',
    preview: 'https://via.placeholder.com/300x450/DC2626/ffffff?text=Template',
    category: 'templates',
    format: 'HTML',
    dimensions: '网页模板',
    downloads: '834',
    isPremium: true,
    isFavorite: false,
    aspectRatio: '2/3',
    uploadedAt: '2025-01-10',
    description: '现代响应式网页设计模板，包含完整代码'
  },
  {
    id: 7,
    title: '节日装饰元素',
    preview: 'https://via.placeholder.com/300x300/F59E0B/ffffff?text=Decor',
    category: 'decorations',
    format: 'PNG',
    dimensions: '512x512',
    downloads: '645',
    isPremium: false,
    isFavorite: false,
    aspectRatio: '1',
    uploadedAt: '2025-01-09',
    description: '精美节日装饰元素，透明背景PNG格式'
  },
  {
    id: 8,
    title: '无缝几何图案',
    preview: 'https://via.placeholder.com/300x300/7C3AED/ffffff?text=Pattern',
    category: 'patterns',
    format: 'AI',
    dimensions: '无缝平铺',
    downloads: '923',
    isPremium: false,
    isFavorite: true,
    aspectRatio: '1',
    uploadedAt: '2025-01-08',
    description: '精美几何图案，可无缝平铺使用'
  }
])

// 筛选后的素材
const filteredMaterials = computed(() => {
  let result = [...materials.value]
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(material => 
      material.title.toLowerCase().includes(query) ||
      material.description.toLowerCase().includes(query)
    )
  }
  
  if (selectedCategory.value) {
    result = result.filter(material => material.category === selectedCategory.value)
  }
  
  if (selectedTag.value) {
    switch (selectedTag.value) {
      case 'free':
        result = result.filter(material => !material.isPremium)
        break
      case 'premium':
        result = result.filter(material => material.isPremium)
        break
      case 'trending':
        result = result.filter(material => parseInt(material.downloads) > 1000)
        break
      case 'new':
        result = result.filter(material => new Date(material.uploadedAt) > new Date('2025-01-12'))
        break
    }
  }
  
  // 排序
  result.sort((a, b) => {
    switch (sortBy.value) {
      case 'newest':
        return new Date(b.uploadedAt) - new Date(a.uploadedAt)
      case 'popular':
        return parseFloat(b.downloads) - parseFloat(a.downloads)
      case 'name':
        return a.title.localeCompare(b.title)
      case 'downloads':
        return parseFloat(b.downloads) - parseFloat(a.downloads)
      default:
        return 0
    }
  })
  
  return result
})

// 分页计算
const totalMaterials = computed(() => filteredMaterials.value.length)
const totalPages = computed(() => Math.ceil(totalMaterials.value / pageSize.value))

// 获取总数量
const getTotalCount = () => {
  return materials.value.length
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
    icon: category.icon || '',
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
    category.icon = categoryForm.value.icon || '📁'
    category.description = categoryForm.value.description
  } else {
    // 添加新分类
    const newCategory = {
      id: Date.now(),
      name: categoryForm.value.name,
      value: categoryForm.value.name.toLowerCase().replace(/\s+/g, '-'),
      icon: categoryForm.value.icon || '📁',
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
    icon: '',
    description: ''
  }
}

// 操作方法
const openMaterialDetail = (material) => {
  selectedMaterial.value = material
  showDetailModal.value = true
}

const previewMaterial = (material) => {
  openMaterialDetail(material)
}

const downloadMaterial = (material) => {
  console.log('下载素材:', material.title)
}

const toggleFavorite = (material) => {
  material.isFavorite = !material.isFavorite
  console.log('切换收藏状态:', material.title, material.isFavorite)
}

const refreshMaterials = () => {
  console.log('刷新素材列表')
}

const batchDownload = () => {
  console.log('批量下载:', selectedItems.value)
  showBatchActions.value = false
}

const batchAddToCollection = () => {
  console.log('添加到收藏:', selectedItems.value)
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
  console.log('素材图库页面初始化')
})
</script>