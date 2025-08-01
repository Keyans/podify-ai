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
                <p class="text-2xl font-bold text-dark-text">{{ categories.length }}</p>
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
            @click="selectCategory('all')"
            :class="selectedCategory === '' ? 'bg-blue-600 text-white' : 'text-dark-text hover:bg-dark-hover'"
            class="flex items-center px-4 py-3 cursor-pointer transition-colors"
          >
            <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
            </svg>
            <span class="flex-1">全部</span>
            <span class="text-xs bg-dark-input px-2 py-1 rounded">{{ totalMaterials }}</span>
          </div>

          <!-- 用户自定义分类 -->
          <div v-for="category in categories" :key="category.categoryId">
            <!-- 顶级分类 -->
            <div class="group">
            <div 
                @click="selectCategory(category.categoryId)"
                :class="selectedCategory === category.categoryId ? 'bg-blue-600 text-white' : 'text-dark-text hover:bg-dark-hover'"
              class="flex items-center px-4 py-3 cursor-pointer transition-colors"
            >
                <!-- 根据是否有子分类显示不同图标 -->
                <svg v-if="category.categoryList && category.categoryList.length > 0" class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
                <svg v-else class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/>
                </svg>
                <span class="flex-1">{{ category.categoryName }}</span>
                <span class="text-xs bg-dark-input px-2 py-1 rounded mr-2">{{ category.count || 0 }}</span>
              
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

            <!-- 子分类 -->
            <div v-if="category.categoryList && category.categoryList.length > 0" class="pl-4">
              <div v-for="subCategory in category.categoryList" :key="subCategory.categoryId" class="group">
                <div 
                  @click="selectCategory(subCategory.categoryId)"
                  :class="selectedCategory === subCategory.categoryId ? 'bg-blue-600 text-white' : 'text-dark-text hover:bg-dark-hover'"
                  class="flex items-center px-4 py-2 cursor-pointer transition-colors"
                >
                  <!-- 根据是否有子分类显示不同图标 -->
                  <svg v-if="subCategory.categoryList && subCategory.categoryList.length > 0" class="w-3 h-3 mr-3 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                  <svg v-else class="w-3 h-3 mr-3 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/>
                  </svg>
                  <span class="flex-1 text-sm">{{ subCategory.categoryName }}</span>
                  <span class="text-xs bg-dark-input px-2 py-1 rounded mr-2">{{ subCategory.count || 0 }}</span>
                  
                  <!-- 子分类操作按钮 -->
                  <div class="opacity-0 group-hover:opacity-100 flex items-center space-x-1">
                    <button 
                      @click.stop="editCategory(subCategory)"
                      class="p-1 text-dark-text-secondary hover:text-dark-text rounded"
                      title="编辑分类"
                    >
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                      </svg>
                    </button>
                    <button 
                      @click.stop="deleteCategory(subCategory)"
                      class="p-1 text-red-400 hover:text-red-300 rounded"
                      title="删除分类"
                    >
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
                    </button>
          </div>
                </div>

                <!-- 三级分类 -->
                <div v-if="subCategory.categoryList && subCategory.categoryList.length > 0" class="pl-4">
                  <div v-for="thirdCategory in subCategory.categoryList" :key="thirdCategory.categoryId" class="group">
            <div 
                      @click="selectCategory(thirdCategory.categoryId)"
                      :class="selectedCategory === thirdCategory.categoryId ? 'bg-blue-600 text-white' : 'text-dark-text hover:bg-dark-hover'"
                      class="flex items-center px-4 py-2 cursor-pointer transition-colors"
            >
                      <svg class="w-3 h-3 mr-3 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                      </svg>
                      <span class="flex-1 text-sm text-dark-text-secondary">{{ thirdCategory.categoryName }}</span>
                      <span class="text-xs bg-dark-input px-2 py-1 rounded mr-2">{{ thirdCategory.count || 0 }}</span>
                      
                      <!-- 三级分类操作按钮 -->
                      <div class="opacity-0 group-hover:opacity-100 flex items-center space-x-1">
                        <button 
                          @click.stop="editCategory(thirdCategory)"
                          class="p-1 text-dark-text-secondary hover:text-dark-text rounded"
                          title="编辑分类"
                        >
                          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                          </svg>
                        </button>
                        <button 
                          @click.stop="deleteCategory(thirdCategory)"
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
                </div>
              </div>
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
            <!-- 加载状态 -->
            <div v-if="loading" class="flex items-center justify-center py-12">
              <div class="text-center">
                <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p class="mt-2 text-dark-text-secondary">加载中...</p>
              </div>
            </div>
            
            <!-- 素材网格 -->
            <div v-if="!loading && materials.length > 0" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <div 
                v-for="material in materials" 
                :key="material.imageName + material.createTime"
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
                    :src="material.imageUrl" 
                    :alt="material.imageName"
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
                  <h3 class="text-sm font-medium text-dark-text truncate">{{ material.imageName }}</h3>
                  <div class="flex items-center justify-between mt-2">
                    <div class="flex items-center space-x-2">
                      <span class="text-xs text-dark-text-secondary">{{ material.createBy }}</span>
                      <span class="text-xs text-dark-text-secondary">•</span>
                      <span class="text-xs text-dark-text-secondary">{{ material.createTime }}</span>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            <!-- 空状态 -->
            <div v-else-if="!loading && materials.length === 0" class="p-12 text-center text-dark-text-secondary">
              <div class="mb-6">
                <svg class="w-16 h-16 mx-auto text-dark-text-secondary opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V17a4 4 0 01-4 4H7z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 8v2a2 2 0 002 2h2"/>
                </svg>
              </div>
              <h3 class="text-lg font-medium text-dark-text mb-2">暂无素材</h3>
              <p class="text-dark-text-secondary mb-6">还没有上传任何设计素材，快来上传第一个吧！</p>
              <button 
                @click="showUploadModal = true"
                class="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center mx-auto"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                </svg>
                上传素材
              </button>
            </div>
          </div>

          <!-- 瀑布流视图 -->
          <div v-if="viewMode === 'masonry'" class="p-6">
            <!-- 加载状态 -->
            <div v-if="loading" class="flex items-center justify-center py-12">
              <div class="text-center">
                <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p class="mt-2 text-dark-text-secondary">加载中...</p>
              </div>
            </div>
            
            <!-- 素材瀑布流 -->
            <div v-if="!loading && materials.length > 0" class="columns-2 md:columns-3 lg:columns-4 gap-4">
              <div 
                v-for="material in materials" 
                :key="material.imageName + material.createTime"
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
                    :src="material.imageUrl" 
                    :alt="material.imageName"
                    class="w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    style="aspect-ratio: 1"
                    loading="lazy"
                  />
                </div>

                <!-- 素材信息 -->
                <div class="p-3">
                  <h3 class="text-sm font-medium text-dark-text truncate">{{ material.imageName }}</h3>
                  <div class="flex items-center justify-between mt-2">
                    <span class="text-xs text-dark-text-secondary">{{ material.createTime }}</span>
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
            <!-- 空状态 -->
            <div v-else-if="!loading && materials.length === 0" class="p-12 text-center text-dark-text-secondary">
              <div class="mb-6">
                <svg class="w-16 h-16 mx-auto text-dark-text-secondary opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V17a4 4 0 01-4 4H7z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 8v2a2 2 0 002 2h2"/>
                </svg>
              </div>
              <h3 class="text-lg font-medium text-dark-text mb-2">暂无素材</h3>
              <p class="text-dark-text-secondary mb-6">还没有上传任何设计素材，快来上传第一个吧！</p>
              <button 
                @click="showUploadModal = true"
                class="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center mx-auto"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                </svg>
                上传素材
              </button>
            </div>
          </div>

          <!-- 分页 -->
          <div class="p-6 border-t border-dark-border flex items-center justify-between">
            <div class="text-sm text-dark-text-secondary">
              <span v-if="totalMaterials > 0">
              显示 {{ (currentPage - 1) * pageSize + 1 }} 到 {{ Math.min(currentPage * pageSize, totalMaterials) }} 条，共 {{ totalMaterials }} 条
              </span>
              <span v-else class="text-dark-text-secondary">
                暂无素材数据
              </span>
            </div>
            
            <div v-if="totalMaterials > 0" class="flex items-center space-x-2">
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

  <!-- 上传素材弹窗 -->
  <GalleryUploadModal
    :isOpen="showUploadModal"
    :galleryType="2"
    @close="showUploadModal = false"
    @upload-success="handleUploadSuccess"
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
          <label class="block text-sm font-medium text-dark-text mb-2">父级分类（可选）</label>
          <select 
            v-model="categoryForm.parentCategoryId"
            class="w-full px-3 py-2 bg-dark-input border border-dark-border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-dark-text"
          >
            <option value="">-- 选择父级分类 --</option>
            <!-- 递归渲染分类选项 -->
            <template v-for="category in categories" :key="category.categoryId">
              <option :value="category.categoryId">{{ category.categoryName }}</option>
              <!-- 子分类 -->
              <template v-if="category.categoryList && category.categoryList.length > 0">
                <option 
                  v-for="subCategory in category.categoryList" 
                  :key="subCategory.categoryId" 
                  :value="subCategory.categoryId"
                >
                  &nbsp;&nbsp;└─ {{ subCategory.categoryName }}
                </option>
                <!-- 三级分类 -->
                <template v-if="subCategory.categoryList && subCategory.categoryList.length > 0">
                  <option 
                    v-for="thirdCategory in subCategory.categoryList" 
                    :key="thirdCategory.categoryId" 
                    :value="thirdCategory.categoryId"
                  >
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ {{ thirdCategory.categoryName }}
                  </option>
                </template>
              </template>
            </template>
          </select>
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

  <!-- 通知弹窗 -->
  <div v-if="notification.show" class="fixed bottom-4 left-1/2 -translate-x-1/2 bg-dark-card border border-dark-border rounded-md shadow-lg z-50 p-3 flex items-center space-x-2">
    <svg class="w-5 h-5" :class="notification.type === 'success' ? 'text-green-500' : notification.type === 'error' ? 'text-red-500' : notification.type === 'warning' ? 'text-yellow-500' : 'text-blue-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>
    <span class="text-sm text-dark-text">{{ notification.message }}</span>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import MaterialDetailModal from '~/components/MaterialDetailModal.vue'
import GalleryUploadModal from '~/components/GalleryUploadModal.vue'
import { getGalleryStats, getGalleryImageList, getGalleryCategories, addGalleryCategory, GalleryType } from '~/apis/business/gallery'

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
  description: '',
  parentCategoryId: '' // 添加父分类ID字段
})

// 通知系统
const notification = ref({
  show: false,
  type: 'success', // success, error, warning, info
  message: ''
})

// 显示通知
const showNotification = (type, message) => {
  notification.value = {
    show: true,
    type,
    message
  }
  
  // 3秒后自动隐藏
  setTimeout(() => {
    notification.value.show = false
  }, 3000)
}

// 统计数据
const stats = ref({
  totalMaterials: '0',
  storageUsed: '0GB',
  downloads: '0',
  favorites: '0',
  recentAdded: '0'
})

// 分类数据
const categories = ref([])
const categoriesLoading = ref(false)

// 素材数据和加载状态
const materials = ref([])
const loading = ref(false)
const pagination = ref({
  current: 1,
  size: 24,
  pages: 1,
  total: 0
})

// 分页计算
const totalMaterials = computed(() => parseInt(pagination.value.total))
const totalPages = computed(() => parseInt(pagination.value.pages))

// 获取分类数据
const fetchCategories = async () => {
  try {
    categoriesLoading.value = true
    const response = await getGalleryCategories({ galleryType: GalleryType.MATERIALS })
    
    if (response.success && response.data) {
      categories.value = response.data.categoryList
    }
  } catch (error) {
    console.error('获取素材图库分类失败:', error)
  } finally {
    categoriesLoading.value = false
  }
}

// 获取素材列表数据
const fetchMaterials = async () => {
  try {
    loading.value = true
    const params = {
      galleryType: GalleryType.MATERIALS,
      page: currentPage.value,
      limit: pageSize.value
    }
    
    // 添加搜索条件
  if (searchQuery.value) {
      params.imageName = searchQuery.value
  }
  
    // 添加分类筛选
  if (selectedCategory.value) {
      params.categoryId = selectedCategory.value
    }
    
    const response = await getGalleryImageList(params)
    
    if (response.success && response.data) {
      const data = response.data
      materials.value = data.imageList
      pagination.value = {
        current: parseInt(data.current),
        size: parseInt(data.size),
        pages: parseInt(data.pages),
        total: parseInt(data.total)
    }
    }
  } catch (error) {
    console.error('获取素材列表失败:', error)
    materials.value = []
  } finally {
    loading.value = false
  }
}

// 获取分类显示名称
const getCategoryName = (categoryValue) => {
  if (!categoryValue) return '全部'
  
  const findCategory = (categories, value) => {
    for (const cat of categories) {
      if (cat.categoryId === value) return cat.categoryName
      if (cat.categoryList && cat.categoryList.length > 0) {
        const found = findCategory(cat.categoryList, value)
        if (found) return found
      }
    }
    return null
  }
  
  return findCategory(categories.value, categoryValue) || categoryValue
}

// 分类操作
const editCategory = (category) => {
  editingCategory.value = category
  categoryForm.value = {
    name: category.categoryName,
    description: category.description || '',
    parentCategoryId: category.parentCategoryId || '' // 设置父分类ID
  }
  showAddCategoryModal.value = true
}

const deleteCategory = (category) => {
  if (confirm(`确定要删除分类"${category.categoryName}"吗？`)) {
    const index = categories.value.findIndex(cat => cat.categoryId === category.categoryId)
    if (index > -1) {
      categories.value.splice(index, 1)
    }
  }
}

const saveCategoryEdit = async () => {
  if (!categoryForm.value.name.trim()) return
  
  try {
  if (editingCategory.value) {
      // 编辑现有分类 - 这里暂时只更新本地数据，因为没有编辑API
    const category = editingCategory.value
      category.categoryName = categoryForm.value.name
    category.icon = categoryForm.value.icon || '📁'
    category.description = categoryForm.value.description
      category.parentCategoryId = categoryForm.value.parentCategoryId // 更新父分类ID
  } else {
      // 添加新分类 - 调用API
      const params = {
        galleryType: GalleryType.MATERIALS,
        categoryName: categoryForm.value.name
      }
      
      // 如果有父分类，添加到参数中
      if (categoryForm.value.parentCategoryId) {
        params.parentCategoryId = categoryForm.value.parentCategoryId
      }
      
      const response = await addGalleryCategory(params)
      
      if (response.success && response.data) {
        // 添加成功后刷新分类列表
        await fetchCategories()
        
        // 显示成功提示
        showNotification('success', '分类添加成功')
      } else {
        showNotification('error', response.message || '添加分类失败')
        return
      }
  }
  
  cancelCategoryEdit()
  } catch (error) {
    console.error('保存分类失败:', error)
    showNotification('error', '保存分类失败，请重试')
  }
}

const cancelCategoryEdit = () => {
  showAddCategoryModal.value = false
  editingCategory.value = null
  categoryForm.value = {
    name: '',
    icon: '',
    description: '',
    parentCategoryId: ''
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
  console.log('下载素材:', material.imageName)
}

const toggleFavorite = (material) => {
  material.isFavorite = !material.isFavorite
  console.log('切换收藏状态:', material.imageName)
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
    fetchMaterials()
  }
}

// 格式化文件大小
const formatFileSize = (sizeStr) => {
  const size = parseFloat(sizeStr)
  if (isNaN(size)) return '0GB'
  
  if (size >= 1) {
    return `${size.toFixed(2)}GB`
  } else {
    return `${(size * 1024).toFixed(0)}MB`
  }
}

// 获取统计数据
const fetchStats = async () => {
  try {
    const response = await getGalleryStats({ galleryType: GalleryType.MATERIALS })
    
    if (response.success && response.data) {
      const data = response.data
      stats.value.totalMaterials = data.imageCount
      stats.value.storageUsed = formatFileSize(data.fileSizeTotal)
      stats.value.recentAdded = data.todayUploadCount
      stats.value.popular = data.todayProcessedCount
    }
  } catch (error) {
    console.error('获取素材图库统计数据失败:', error)
  }
}

// 防抖定时器
let searchTimer = null

// 监听搜索和筛选变化
watch([searchQuery, selectedCategory], () => {
  currentPage.value = 1 // 重置到第一页
  
  // 清除之前的定时器
  if (searchTimer) {
    clearTimeout(searchTimer)
  }
  
  // 设置新的定时器
  searchTimer = setTimeout(() => {
    fetchMaterials()
  }, 500)
})

// 页面初始化
onMounted(() => {
  console.log('素材图库页面初始化')
  fetchStats()
  fetchMaterials()
  fetchCategories() // 获取分类数据
})

// 上传成功回调
const handleUploadSuccess = (data) => {
  console.log('上传成功:', data)
  // 刷新素材列表
  fetchMaterials()
  // 刷新统计数据
  fetchStats()
  // 刷新分类数据
  fetchCategories()
}
</script>