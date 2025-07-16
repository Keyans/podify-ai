<template>
  <el-dialog
    v-model="dialogVisible"
    width="1400px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    class="workflow-dialog"
    align-center
  >
    <!-- 自定义标题 -->
    <template #header>
      <div class="flex items-center justify-between w-full">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <div>
            <h2 class="text-xl font-bold text-gray-900 dark:text-dark-text">新建工作流</h2>
            <p class="text-sm text-gray-500 dark:text-dark-text-secondary">拖拽应用构建自动化工作流程</p>
          </div>
        </div>
        <div class="flex items-center space-x-2">
          <el-button
            @click="showTemplateDialog = true"
            size="small"
            type="info"
            plain
            class="transform hover:scale-105 transition-transform duration-200"
          >
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
            选择模板
          </el-button>
          <el-button
            @click="openAppMarket"
            type="primary"
            size="small"
            plain
            class="transform hover:scale-105 transition-transform duration-200"
          >
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
            </svg>
            应用市场
          </el-button>
        </div>
      </div>
    </template>

    <div class="flex h-[700px] -mx-6 -mt-4">
      <!-- 左侧：应用列表 -->
      <div class="w-72 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-dark-surface dark:to-dark-card border-r border-gray-200 dark:border-dark-border p-6">
        <div class="mb-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-bold text-gray-900 dark:text-dark-text flex items-center">
              <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
              可用应用
            </h3>
            <div class="text-xs text-gray-500 dark:text-dark-text-secondary bg-white dark:bg-dark-surface px-2 py-1 rounded-full">
              {{ filteredAvailableApps.length }} 个
            </div>
          </div>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon class="w-4 h-4 text-gray-400" />
            </div>
            <input
              v-model="appSearchKeyword"
              placeholder="搜索应用..."
              class="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm"
            />
          </div>
        </div>

        <div class="space-y-3 max-h-[580px] overflow-y-auto custom-scrollbar">
          <div
            v-for="app in filteredAvailableApps"
            :key="app.id"
            class="group relative flex items-center p-4 bg-white dark:bg-dark-surface rounded-xl cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 transform hover:scale-105 hover:shadow-lg border border-gray-100 dark:border-dark-border hover:border-blue-200 dark:hover:border-blue-700"
            draggable="true"
            @dragstart="handleDragStart($event, app)"
          >
            <!-- 应用图标 -->
            <div class="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
              <component :is="getAppIcon(app.type)" class="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>

            <!-- 应用信息 -->
            <div class="flex-1 min-w-0">
              <div class="text-sm font-semibold text-gray-900 dark:text-dark-text truncate mb-1">{{ app.name }}</div>
              <div class="text-xs text-gray-500 dark:text-dark-text-secondary truncate">{{ app.description }}</div>
            </div>

            <!-- 拖拽提示 -->
            <div class="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div class="text-xs text-blue-600 dark:text-blue-400 font-medium">拖拽</div>
              <svg class="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"></path>
              </svg>
            </div>

            <!-- 拖拽指示器 -->
            <div class="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          <!-- 空状态 -->
          <div v-if="filteredAvailableApps.length === 0" class="text-center py-12">
            <svg class="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <p class="text-sm text-gray-500 dark:text-dark-text-secondary">未找到匹配的应用</p>
          </div>
        </div>
      </div>

      <!-- 中间：工作流画板 -->
      <div class="flex-1 px-6 bg-white dark:bg-dark-card">
        <div class="mb-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-bold text-gray-900 dark:text-dark-text flex items-center">
              <svg class="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
              工作流设计
            </h3>
            <div class="flex items-center space-x-2">
              <div class="text-xs text-gray-500 dark:text-dark-text-secondary bg-gray-100 dark:bg-dark-surface px-2 py-1 rounded-full">
                {{ workflowApps.length }} 个应用
              </div>
              <button
                @click="clearWorkflow"
                class="text-xs text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 px-2 py-1 rounded-full transition-all duration-200"
              >
                清空
              </button>
            </div>
          </div>
          <div class="relative">
            <input
              v-model="form.name"
              placeholder="请输入工作流名称..."
              class="w-full px-4 py-3 bg-gray-50 dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 text-gray-900 dark:text-dark-text placeholder-gray-500"
            />
            <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
              </svg>
            </div>
          </div>
        </div>

        <div
          class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark-surface dark:to-dark-border rounded-2xl p-8 min-h-[580px] border-2 border-dashed border-gray-300 dark:border-dark-border relative overflow-hidden transition-all duration-300"
          @drop="handleDrop"
          @dragover="handleDragOver"
          @dragleave="handleDragLeave"
          :class="{ 'border-blue-400 bg-blue-50 dark:bg-blue-900/10 scale-105': isDragOver }"
        >
          <!-- 背景装饰 -->
          <div class="absolute inset-0 opacity-5">
            <div class="absolute top-10 left-10 w-20 h-20 bg-blue-500 rounded-full"></div>
            <div class="absolute top-32 right-16 w-16 h-16 bg-purple-500 rounded-full"></div>
            <div class="absolute bottom-20 left-20 w-12 h-12 bg-green-500 rounded-full"></div>
            <div class="absolute bottom-32 right-32 w-24 h-24 bg-orange-500 rounded-full"></div>
          </div>

          <!-- 工作流节点容器 -->
          <div class="relative z-10 flex flex-col items-center space-y-8">
            <!-- 开始节点 -->
            <div class="flex flex-col items-center space-y-3">
              <div class="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-xl transform hover:scale-105 transition-transform duration-300">
                <PlayIcon class="w-10 h-10 text-white" />
              </div>
              <span class="text-sm font-bold text-gray-700 dark:text-dark-text bg-white dark:bg-dark-surface px-3 py-1 rounded-full shadow-md">开始</span>
            </div>

            <!-- 应用节点区域 -->
            <div v-if="workflowApps.length > 0" class="flex flex-col items-center space-y-8 w-full">
              <!-- 连接线 -->
              <div class="flex flex-col items-center">
                <div class="w-1 h-12 bg-gradient-to-b from-green-400 to-blue-400 rounded-full"></div>
                <div class="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
              </div>

              <!-- 应用节点网格 -->
              <div class="w-full max-w-4xl">
                <draggable
                  v-model="workflowApps"
                  @end="onDragEnd"
                  item-key="id"
                  :animation="300"
                  handle=".drag-handle"
                  ghost-class="sortable-ghost"
                  chosen-class="sortable-chosen"
                  drag-class="sortable-drag"
                  class="grid grid-cols-5 gap-6 justify-items-center"
                >
                  <template #item="{ element: app, index }">
                    <div
                      class="relative group cursor-pointer drag-handle transform transition-all duration-300 hover:scale-110"
                      @click="selectedAppIndex = index"
                      :class="{
                        'ring-4 ring-purple-400 ring-opacity-50 scale-110': selectedAppIndex === index,
                        'hover:shadow-2xl': selectedAppIndex !== index
                      }"
                    >
                      <div class="flex flex-col items-center space-y-3 p-4">
                        <!-- 应用图标 -->
                        <div class="relative">
                          <div class="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
                            <component :is="getAppIcon(app.type)" class="w-8 h-8 text-white" />
                          </div>

                          <!-- 序号标识 -->
                          <div class="absolute -top-2 -left-2 w-6 h-6 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg">
                            {{ index + 1 }}
                          </div>

                          <!-- 删除按钮 -->
                          <button
                            @click.stop="removeApp(index)"
                            class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg transform hover:scale-110"
                          >
                            <XMarkIcon class="w-3 h-3 text-white" />
                          </button>

                          <!-- 配置按钮 -->
                          <button
                            @click.stop="selectedAppIndex = index"
                            class="absolute -bottom-2 -right-2 w-6 h-6 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg transform hover:scale-110"
                          >
                            <Cog6ToothIcon class="w-3 h-3 text-white" />
                          </button>
                        </div>

                        <!-- 应用名称 -->
                        <div class="text-center">
                          <span class="text-xs font-semibold text-gray-700 dark:text-dark-text bg-white dark:bg-dark-surface px-2 py-1 rounded-full shadow-md max-w-20 truncate block">
                            {{ app.name }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </template>
                </draggable>
              </div>

              <!-- 连接线 -->
              <div class="flex flex-col items-center">
                <div class="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                <div class="w-1 h-12 bg-gradient-to-b from-purple-400 to-red-400 rounded-full"></div>
              </div>
            </div>

            <!-- 结束节点 -->
            <div class="flex flex-col items-center space-y-3">
              <div class="w-20 h-20 bg-gradient-to-br from-red-400 to-red-600 rounded-2xl flex items-center justify-center shadow-xl transform hover:scale-105 transition-transform duration-300">
                <StopIcon class="w-10 h-10 text-white" />
              </div>
              <span class="text-sm font-bold text-gray-700 dark:text-dark-text bg-white dark:bg-dark-surface px-3 py-1 rounded-full shadow-md">结束</span>
            </div>
          </div>

          <!-- 空状态提示 -->
          <div v-if="workflowApps.length === 0" class="absolute inset-0 flex items-center justify-center z-20">
            <div class="text-center text-gray-500 dark:text-dark-text-secondary">
              <div class="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl flex items-center justify-center">
                <CubeIcon class="w-12 h-12 text-blue-400 dark:text-blue-500" />
              </div>
              <h4 class="text-lg font-semibold text-gray-700 dark:text-dark-text mb-2">开始构建工作流</h4>
              <p class="text-sm text-gray-500 dark:text-dark-text-secondary mb-4">拖拽左侧应用到此处开始构建工作流</p>
              <div class="flex items-center justify-center space-x-2 text-xs text-gray-400 dark:text-dark-text-secondary">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"></path>
                </svg>
                <span>拖拽应用</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span>配置设置</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                </svg>
                <span>运行工作流</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧：应用设置 -->
      <div class="w-96 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-dark-surface dark:to-dark-card border-l border-gray-200 dark:border-dark-border p-6">
        <div class="mb-6">
          <h3 class="text-lg font-bold text-gray-900 dark:text-dark-text flex items-center">
            <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            应用设置
          </h3>
        </div>

        <div v-if="selectedAppIndex !== null && workflowApps[selectedAppIndex]" class="space-y-6">
          <!-- 应用信息卡片 -->
          <div class="bg-white dark:bg-dark-surface rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-dark-border">
            <div class="flex items-center space-x-4 mb-6">
              <div class="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-2xl flex items-center justify-center">
                <component :is="getAppIcon(workflowApps[selectedAppIndex].type)" class="w-7 h-7 text-blue-600 dark:text-blue-400" />
              </div>
              <div class="flex-1">
                <div class="font-bold text-gray-900 dark:text-dark-text text-lg">{{ workflowApps[selectedAppIndex].name }}</div>
                <div class="text-sm text-gray-500 dark:text-dark-text-secondary mt-1">{{ workflowApps[selectedAppIndex].description }}</div>
                <div class="flex items-center mt-2">
                  <span class="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full font-medium">
                    步骤 {{ selectedAppIndex + 1 }}
                  </span>
                </div>
              </div>
            </div>

            <!-- 公共设置 -->
            <div class="space-y-4">
              <!-- 执行模式 -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">执行模式</label>
                <el-radio-group v-model="workflowApps[selectedAppIndex].settings.mode" size="small">
                  <el-radio label="auto">自动执行</el-radio>
                  <el-radio label="manual">手动确认</el-radio>
                </el-radio-group>
              </div>

              <!-- 数据源选择 -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">{{ getDataSourceLabel(workflowApps[selectedAppIndex].type) }}</label>
                <el-select
                  v-model="workflowApps[selectedAppIndex].settings.dataSource"
                  :placeholder="getDataSourcePlaceholder(workflowApps[selectedAppIndex].type)"
                  size="small"
                  class="w-full"
                  @change="handleDataSourceChange(selectedAppIndex)"
                >
                  <el-option
                    v-for="option in getDataSourceOptions(workflowApps[selectedAppIndex].type)"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                  />
                </el-select>
              </div>

              <!-- 数据选择界面 -->
              <div v-if="needsDataSelection(workflowApps[selectedAppIndex])" class="mt-4">
                <DataSelectionPanel
                  :app-type="workflowApps[selectedAppIndex].type"
                  :data-source="workflowApps[selectedAppIndex].settings.dataSource"
                  v-model="workflowApps[selectedAppIndex].datasetConfig"
                />
              </div>

              <!-- 超时时间 -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">超时时间（分钟）</label>
                <el-input-number
                  v-model="workflowApps[selectedAppIndex].settings.timeout"
                  :min="1"
                  :max="60"
                  size="small"
                  class="w-full"
                />
              </div>
              
              <!-- 失败处理 -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">失败处理</label>
                <el-select
                  v-model="workflowApps[selectedAppIndex].settings.onError"
                  size="small"
                  class="w-full"
                >
                  <el-option label="停止工作流" value="stop" />
                  <el-option label="跳过继续" value="skip" />
                  <el-option label="重试" value="retry" />
                </el-select>
              </div>

              <!-- 应用特定设置 -->
              <AppSpecificSettings
                v-if="workflowApps[selectedAppIndex]"
                :app-type="workflowApps[selectedAppIndex].type"
                v-model="workflowApps[selectedAppIndex].settings"
              />

              <!-- 数据集选择 -->
              <!-- <DatasetSelector
                v-if="workflowApps[selectedAppIndex]"
                :app-type="workflowApps[selectedAppIndex].type"
                v-model="workflowApps[selectedAppIndex].datasetConfig"
              /> -->
            </div>
          </div>
        </div>

        <div v-else class="text-center text-gray-500 dark:text-dark-text-secondary py-8">
          <Cog6ToothIcon class="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p class="text-sm">选择一个应用节点进行设置</p>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="flex justify-end space-x-3">
        <el-button @click="handleClose" size="large">取消</el-button>
        <el-button
          @click="handleSubmit"
          type="primary"
          size="large"
          :loading="submitting"
          :disabled="!canSubmit"
        >
          {{ submitting ? '创建中...' : '确定创建' }}
        </el-button>
      </div>
    </template>

    <!-- 工作流模板选择弹窗 -->
    <WorkflowTemplateDialog
      v-model="showTemplateDialog"
      @select="loadFromTemplate"
      @create-blank="showTemplateDialog = false"
    />
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue';
import { ElMessage } from 'element-plus';
import {
  MagnifyingGlassIcon,
  PlayIcon,
  StopIcon,
  XMarkIcon,
  CubeIcon,
  Cog6ToothIcon
} from '@heroicons/vue/24/outline';
import {
  ShoppingBagIcon,
  ScissorsIcon,
  SparklesIcon,
  DocumentTextIcon,
  RectangleStackIcon
} from '@heroicons/vue/24/outline';
import draggable from 'vuedraggable';
import { createWorkflow, type Workflow } from '../../../store/workflows';
import WorkflowTemplateDialog from './WorkflowTemplateDialog.vue';
import AppSpecificSettings from './AppSpecificSettings.vue';
import DataSelectionPanel from './DataSelectionPanel.vue';
// import DatasetSelector from './DatasetSelector.vue';

// Props
interface Props {
  modelValue: boolean;
}

// Emits
interface Emits {
  (e: 'update:modelValue', value: boolean): void;
  (e: 'success'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// 类型定义
interface AvailableApp {
  id: string;
  name: string;
  type: string;
  description: string;
}

interface WorkflowApp extends AvailableApp {
  settings: {
    mode: 'auto' | 'manual';
    dataSource: string;
    timeout: number;
    onError: 'stop' | 'skip' | 'retry';
    [key: string]: any; // 允许应用特定设置
  };
  datasetConfig: Record<string, any>; // 数据集配置
}

// 响应式数据
const dialogVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const submitting = ref(false);
const appSearchKeyword = ref('');
const selectedAppIndex = ref<number | null>(null);
const showTemplateDialog = ref(false);
const isDragOver = ref(false);

const form = reactive({
  name: ''
});

const workflowApps = ref<WorkflowApp[]>([]);

// 可用应用列表
const availableApps: AvailableApp[] = [
  { id: 'product-collection', name: '商品采集', type: 'product-collection', description: '采集电商平台商品信息' },
  { id: 'smart-crop', name: '智能裁图', type: 'smart-crop', description: '智能裁剪商品图片' },
  { id: 'one-click-cutout', name: '一键抠图', type: 'one-click-cutout', description: '自动抠图去背景' },
  { id: 'super-split', name: '超级裂变', type: 'super-split', description: '图片批量裂变处理' },
  { id: 'title-generator', name: '标题生成', type: 'title-generator', description: '智能生成商品标题' },
  { id: 'batch-listing', name: '批量刊登', type: 'batch-listing', description: '批量刊登商品到平台' },
  { id: 'pod-compose', name: 'POD合成', type: 'pod-compose', description: 'POD商品合成处理' }
];

// 计算属性
const filteredAvailableApps = computed(() => {
  return availableApps.filter(app =>
    app.name.toLowerCase().includes(appSearchKeyword.value.toLowerCase()) ||
    app.description.toLowerCase().includes(appSearchKeyword.value.toLowerCase())
  );
});

const canSubmit = computed(() => {
  return form.name.trim() && workflowApps.value.length > 0;
});

// 获取应用图标
const getAppIcon = (appType: string) => {
  const iconMap: Record<string, any> = {
    'product-collection': ShoppingBagIcon,
    'smart-crop': ScissorsIcon,
    'one-click-cutout': SparklesIcon,
    'super-split': CubeIcon,
    'title-generator': DocumentTextIcon,
    'batch-listing': RectangleStackIcon,
    'pod-compose': CubeIcon
  };
  return iconMap[appType] || CubeIcon;
};

// 方法
const openAppMarket = () => {
  ElMessage.info('跳转到应用市场功能开发中...');
};

const loadFromTemplate = (template: Workflow) => {
  // 从模板加载工作流配置
  form.name = `${template.name} - 副本`;
  workflowApps.value = template.apps.map(app => {
    const availableApp = availableApps.find(a => a.type === app.type);
    return {
      id: `app_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      name: app.name,
      type: app.type,
      description: availableApp?.description || '',
      settings: {
        ...app.settings,
        dataSource: (app.settings as any).dataSource || getDefaultDataSource(app.type)
      },
      datasetConfig: {}
    };
  });
  showTemplateDialog.value = false;
  ElMessage.success(`已从模板"${template.name}"加载配置`);
};

const handleDragStart = (event: DragEvent, app: AvailableApp) => {
  if (event.dataTransfer) {
    event.dataTransfer.setData('application/json', JSON.stringify(app));
    event.dataTransfer.effectAllowed = 'copy';
  }
};

const handleDragOver = (event: DragEvent) => {
  event.preventDefault();
  isDragOver.value = true;
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'copy';
  }
};

const handleDragLeave = (event: DragEvent) => {
  event.preventDefault();
  isDragOver.value = false;
};

const handleDrop = (event: DragEvent) => {
  event.preventDefault();
  isDragOver.value = false;
  if (event.dataTransfer) {
    try {
      const appData = JSON.parse(event.dataTransfer.getData('application/json')) as AvailableApp;
      addAppToWorkflow(appData);
      ElMessage.success(`已添加应用：${appData.name}`);
    } catch (error) {
      console.error('Failed to parse dropped data:', error);
      ElMessage.error('添加应用失败');
    }
  }
};

const addAppToWorkflow = (app: AvailableApp) => {
  const workflowApp: WorkflowApp = {
    ...app,
    id: `${app.id}_${Date.now()}`, // 确保唯一ID
    settings: {
      mode: 'auto',
      dataSource: getDefaultDataSource(app.type),
      timeout: 30,
      onError: 'stop'
    },
    datasetConfig: {} // 初始化数据集配置
  };
  workflowApps.value.push(workflowApp);
  selectedAppIndex.value = workflowApps.value.length - 1;
};

const removeApp = (index: number) => {
  workflowApps.value.splice(index, 1);
  if (selectedAppIndex.value === index) {
    selectedAppIndex.value = null;
  } else if (selectedAppIndex.value !== null && selectedAppIndex.value > index) {
    selectedAppIndex.value--;
  }
};

const onDragEnd = () => {
  // 拖拽结束后重置选中状态
  selectedAppIndex.value = null;
};

// 清空工作流
const clearWorkflow = () => {
  if (workflowApps.value.length > 0) {
    workflowApps.value = [];
    selectedAppIndex.value = null;
    ElMessage.success('工作流已清空');
  }
};

const handleSubmit = async () => {
  if (!canSubmit.value) return;

  submitting.value = true;
  try {
    await createWorkflow({
      name: form.name,
      apps: workflowApps.value
    });

    ElMessage.success('工作流创建成功！');
    emit('success');
    handleClose();
  } catch (error) {
    ElMessage.error('创建失败，请重试');
  } finally {
    submitting.value = false;
  }
};

const handleClose = () => {
  form.name = '';
  workflowApps.value = [];
  selectedAppIndex.value = null;
  appSearchKeyword.value = '';
  showTemplateDialog.value = false;
  dialogVisible.value = false;
};

// 获取数据源标签
const getDataSourceLabel = (appType: string): string => {
  const labelMap: Record<string, string> = {
    'product-collection': '采集来源',
    'smart-crop': '图片来源',
    'one-click-cutout': '图片来源',
    'super-split': '图片来源',
    'title-generator': '图片来源',
    'batch-listing': '商品来源',
    'pod-compose': '白品来源'
  };
  return labelMap[appType] || '数据来源';
};

// 获取数据源占位符
const getDataSourcePlaceholder = (appType: string): string => {
  const placeholderMap: Record<string, string> = {
    'product-collection': '选择采集来源',
    'smart-crop': '选择图片来源',
    'one-click-cutout': '选择图片来源',
    'super-split': '选择图片来源',
    'title-generator': '选择图片来源',
    'batch-listing': '选择商品来源',
    'pod-compose': '选择白品来源'
  };
  return placeholderMap[appType] || '选择数据来源';
};

// 获取数据源选项
const getDataSourceOptions = (appType: string) => {
  const optionsMap: Record<string, Array<{label: string, value: string}>> = {
    'product-collection': [
      { label: '使用上一步结果', value: 'previous' },
      { label: '手动输入链接', value: 'manual' },
      { label: '关键词搜索', value: 'search' }
    ],
    'smart-crop': [
      { label: '使用上一步结果', value: 'previous' },
      { label: '从图库选择', value: 'gallery' },
      { label: '上传图片', value: 'upload' }
    ],
    'one-click-cutout': [
      { label: '使用上一步结果', value: 'previous' },
      { label: '从图库选择', value: 'gallery' },
      { label: '上传图片', value: 'upload' }
    ],
    'super-split': [
      { label: '使用上一步结果', value: 'previous' },
      { label: '从图库选择', value: 'gallery' },
      { label: '上传图片', value: 'upload' }
    ],
    'title-generator': [
      { label: '使用上一步结果', value: 'previous' },
      { label: '从图库选择', value: 'gallery' },
      { label: '上传图片', value: 'upload' }
    ],
    'batch-listing': [
      { label: '使用上一步结果', value: 'previous' },
      { label: '选择POD商品', value: 'pod-products' },
      { label: '选择白品', value: 'white-products' }
    ],
    'pod-compose': [
      { label: '使用上一步结果', value: 'previous' },
      { label: '选择白品', value: 'white-products' },
      { label: '全部白品', value: 'all-white-products' }
    ]
  };
  return optionsMap[appType] || [{ label: '使用上一步结果', value: 'previous' }];
};

// 获取默认数据源
const getDefaultDataSource = (appType: string): string => {
  const defaultMap: Record<string, string> = {
    'product-collection': 'search',
    'smart-crop': 'gallery',
    'one-click-cutout': 'gallery',
    'super-split': 'gallery',
    'title-generator': 'gallery',
    'batch-listing': 'pod-products',
    'pod-compose': 'white-products'
  };
  return defaultMap[appType] || 'previous';
};

// 处理数据源变化
const handleDataSourceChange = (appIndex: number) => {
  // 清空之前的数据选择
  workflowApps.value[appIndex].datasetConfig = {};
};

// 判断是否需要数据选择
const needsDataSelection = (app: WorkflowApp): boolean => {
  if (!app || !app.settings.dataSource) return false;

  // 如果选择的是"使用上一步结果"，则不需要额外的数据选择
  if (app.settings.dataSource === 'previous') return false;

  // 其他情况都需要数据选择
  return true;
};
</script>

<style scoped>
/* 对话框样式 */
.workflow-dialog :deep(.el-dialog) {
  border-radius: 24px;
  overflow: hidden;
}

.workflow-dialog :deep(.el-dialog__header) {
  padding: 24px 24px 0;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-bottom: 1px solid #e2e8f0;
}

.workflow-dialog :deep(.el-dialog__body) {
  padding: 0;
}

.workflow-dialog :deep(.el-dialog__footer) {
  padding: 24px;
  border-top: 1px solid #e2e8f0;
  background: #f8fafc;
}

/* 自定义滚动条 */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 #f1f5f9;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* 拖拽样式 */
.sortable-ghost {
  opacity: 0.3;
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
  border: 3px dashed #3b82f6;
  border-radius: 16px;
  transform: scale(0.95);
}

.sortable-chosen {
  transform: scale(1.05) rotate(2deg);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  z-index: 1000;
}

.sortable-drag {
  transform: rotate(8deg) scale(1.1);
  opacity: 0.9;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
}

/* 动画效果 */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes bounce {
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0, 0, 0);
  }
  40%, 43% {
    transform: translate3d(0, -8px, 0);
  }
  70% {
    transform: translate3d(0, -4px, 0);
  }
  90% {
    transform: translate3d(0, -2px, 0);
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-bounce {
  animation: bounce 1s infinite;
}

/* 暗黑模式适配 */
.dark .workflow-dialog :deep(.el-dialog__header) {
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  border-bottom-color: #475569;
}

.dark .workflow-dialog :deep(.el-dialog__footer) {
  background: #1e293b;
  border-top-color: #475569;
}

.dark .custom-scrollbar {
  scrollbar-color: #475569 #334155;
}

.dark .custom-scrollbar::-webkit-scrollbar-track {
  background: #334155;
}

.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background: #475569;
}

.dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #64748b;
}

.dark .sortable-ghost {
  background: linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%);
  border-color: #3b82f6;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .workflow-dialog :deep(.el-dialog) {
    width: 95vw !important;
    margin: 0 auto;
  }
}

@media (max-width: 768px) {
  .workflow-dialog :deep(.el-dialog) {
    width: 100vw !important;
    height: 100vh !important;
    margin: 0;
    border-radius: 0;
  }

  .workflow-dialog :deep(.el-dialog__header) {
    padding: 16px;
  }

  .workflow-dialog :deep(.el-dialog__footer) {
    padding: 16px;
  }
}
</style>
