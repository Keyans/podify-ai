<template>
  <div class="space-y-6">
    <!-- 页面标题 -->
    <div class="bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 rounded-2xl p-6 border border-primary-100 dark:border-primary-800">
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        </div>
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-dark-text">工作流管理</h1>
          <p class="mt-1 text-sm text-gray-600 dark:text-dark-text-secondary">创建、管理和监控您的自动化工作流程</p>
        </div>
      </div>
    </div>

    <!-- 统计卡片 -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-elegant dark:shadow-elegant-dark border border-gray-100 dark:border-dark-border hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-dark-text-secondary">总执行次数</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-dark-text">{{ totalExecutions }}</p>
          </div>
          <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-elegant dark:shadow-elegant-dark border border-gray-100 dark:border-dark-border hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-dark-text-secondary">成功率</p>
            <p class="text-2xl font-bold text-green-600 dark:text-green-400">{{ successRate }}%</p>
          </div>
          <div class="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-elegant dark:shadow-elegant-dark border border-gray-100 dark:border-dark-border hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-dark-text-secondary">活跃工作流</p>
            <p class="text-2xl font-bold text-purple-600 dark:text-purple-400">{{ activeWorkflows }}</p>
          </div>
          <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-elegant dark:shadow-elegant-dark border border-gray-100 dark:border-dark-border hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-dark-text-secondary">平均耗时</p>
            <p class="text-2xl font-bold text-orange-600 dark:text-orange-400">{{ averageTime }}</p>
          </div>
          <div class="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- 头部操作区域 -->
    <div class="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-elegant dark:shadow-elegant-dark border border-gray-100 dark:border-dark-border">
      <div class="flex justify-between items-center">
        <div class="flex items-center space-x-3">
          <button @click="showCreateDialog = true"
            class="inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
            <Plus class="w-5 h-5 mr-2" />
            新建工作流
          </button>
          <button @click="exportWorkflows"
            class="inline-flex items-center px-4 py-2.5 bg-white dark:bg-dark-card text-gray-700 dark:text-dark-text font-medium rounded-lg border border-gray-300 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-border shadow-sm hover:shadow-md transition-all duration-200">
            <Download class="w-5 h-5 mr-2" />
            导出数据
          </button>

          <!-- 批量操作按钮 -->
          <div v-if="selectedRows.length > 0" class="flex items-center space-x-2 ml-4 pl-4 border-l border-gray-200 dark:border-dark-border">
            <span class="text-sm text-gray-600 dark:text-dark-text-secondary">
              已选择 {{ selectedRows.length }} 项
            </span>
            <button @click="batchExport"
              class="inline-flex items-center px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-all duration-200">
              <Download class="w-4 h-4 mr-1" />
              批量导出
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 搜索和筛选区域 -->
    <div class="bg-white dark:bg-dark-card rounded-2xl shadow-elegant dark:shadow-elegant-dark border border-gray-100 dark:border-dark-border p-6">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <!-- 搜索和筛选控件 -->
        <div class="flex flex-col sm:flex-row gap-4 flex-1">
          <!-- 搜索框 -->
          <div class="relative flex-1 max-w-md">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <MagnifyingGlassIcon class="w-5 h-5 text-gray-400" />
            </div>
            <input
              v-model="searchKeyword"
              @input="handleSearch"
              type="text"
              placeholder="搜索工作流名称或ID..."
              class="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 dark:text-dark-text placeholder-gray-500 hover:border-gray-300 dark:hover:border-dark-text-secondary"
            />
          </div>

          <!-- 状态筛选 -->
          <div class="relative">
            <select
              v-model="statusFilter"
              @change="handleSearch"
              class="appearance-none px-4 py-3 pr-10 bg-gray-50 dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl text-gray-900 dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-300 dark:hover:border-dark-text-secondary cursor-pointer"
            >
              <option value="">全部状态</option>
              <option value="completed">已完成</option>
              <option value="running">执行中</option>
              <option value="failed">失败</option>
              <option value="pending">等待中</option>
            </select>
            <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>

          <!-- 快速筛选标签 -->
          <div class="flex items-center space-x-2">
            <button
              @click="quickFilter('today')"
              class="px-3 py-2 text-sm font-medium text-gray-600 dark:text-dark-text-secondary hover:text-blue-600 dark:hover:text-blue-400 bg-gray-100 dark:bg-dark-surface hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
            >
              今日
            </button>
            <button
              @click="quickFilter('week')"
              class="px-3 py-2 text-sm font-medium text-gray-600 dark:text-dark-text-secondary hover:text-blue-600 dark:hover:text-blue-400 bg-gray-100 dark:bg-dark-surface hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
            >
              本周
            </button>
          </div>
        </div>

        <!-- 统计信息和批量操作 -->
        <div class="flex items-center justify-between lg:justify-end gap-4">
          <div class="flex items-center space-x-4">
            <div class="text-sm text-gray-600 dark:text-dark-text-secondary">
              共 <span class="font-semibold text-gray-900 dark:text-dark-text">{{ pagination.total }}</span> 条记录
            </div>
            <div v-if="selectedRows.length > 0" class="flex items-center gap-3">
              <span class="text-sm font-medium text-blue-600 dark:text-blue-400">
                已选择 {{ selectedRows.length }} 项
              </span>
              <div class="flex space-x-2">
                <button
                  @click="batchExport"
                  class="px-3 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-all duration-200 transform hover:scale-105"
                >
                  批量导出
                </button>
                <button
                  @click="batchDelete"
                  class="px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-all duration-200 transform hover:scale-105"
                >
                  批量删除
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 工作流执行历史列表 -->
    <div class="bg-white dark:bg-dark-surface rounded-xl shadow-elegant dark:shadow-elegant-dark border border-gray-100 dark:border-dark-border overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-100 dark:border-dark-border">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-dark-text">执行历史</h3>
        <p class="text-sm text-gray-600 dark:text-dark-text-secondary mt-1">管理和监控您的工作流执行记录</p>
      </div>

      <div class="overflow-x-auto">
        <el-table
          :data="currentPageExecutions"
          style="width: 100%"
          v-loading="loading"
          :header-cell-style="{
            backgroundColor: 'var(--el-bg-color-page)',
            color: 'var(--el-text-color-primary)',
            fontWeight: '600',
            borderBottom: '1px solid var(--el-border-color-light)'
          }"
          :row-style="{ backgroundColor: 'transparent' }"
          class="modern-table"
          @selection-change="handleSelectionChange">

          <!-- 复选框列 -->
          <el-table-column type="selection" width="55" align="center" />

          <el-table-column label="执行信息" min-width="200">
          <template #default="scope">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 rounded-lg flex items-center justify-center"
                   :class="getExecutionIconBg(scope.row.status)">
                <component :is="getExecutionIcon(scope.row.status)" class="w-5 h-5" :class="getExecutionIconColor(scope.row.status)" />
              </div>
              <div>
                <div class="font-medium text-gray-900 dark:text-dark-text">{{ scope.row.workflowName }}</div>
                <div class="text-sm text-gray-500 dark:text-dark-text-secondary">ID: {{ scope.row.id }}</div>
              </div>
            </div>
          </template>
          </el-table-column>

          <el-table-column label="工作流程" min-width="280">
          <template #default="{ row }">
            <div class="py-2">
              <div class="flex items-center space-x-2 max-w-full">
                <!-- 开始节点 -->
                <div class="flex flex-col items-center space-y-1 flex-shrink-0">
                  <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <PlayIcon class="w-3 h-3 text-white" />
                  </div>
                  <span class="text-xs text-gray-600 dark:text-dark-text-secondary">开始</span>
                </div>

                <!-- 应用节点容器 - 支持省略号 -->
                <div class="flex items-center space-x-1 min-w-0">
                  <!-- 显示前3个应用 -->
                  <template v-for="(app, index) in row.workflow.apps.slice(0, 3)" :key="index">
                    <!-- 连接线 -->
                    <div class="w-4 h-px bg-gray-300 dark:bg-gray-600 flex-shrink-0 mb-[20px]"></div>

                    <!-- 应用节点 -->
                    <div class="flex flex-col items-center space-y-1 flex-shrink-0">
                      <div
                        class="w-6 h-6 rounded-full flex items-center justify-center"
                        :class="getStepStatusClass(row.stepResults[index]?.status)"
                      >
                        <component :is="getAppIcon(app.type)" class="w-3 h-3 text-white" />
                      </div>
                      <span class="text-xs text-gray-600 dark:text-dark-text-secondary text-center max-w-12 truncate">
                        {{ app.name }}
                      </span>
                    </div>
                  </template>

                  <!-- 省略号（如果应用数量超过3个） -->
                  <template v-if="row.workflow.apps.length > 3">
                    <div class="w-4 h-px bg-gray-300 dark:bg-gray-600 flex-shrink-0 mb-[20px]"></div>
                    <div class="flex flex-col items-center space-y-1 flex-shrink-0">
                      <div class="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
                        <span class="text-xs text-white font-bold">...</span>
                      </div>
                      <span class="text-xs text-gray-600 dark:text-dark-text-secondary">
                        +{{ row.workflow.apps.length - 3 }}
                      </span>
                    </div>
                  </template>
                </div>

                <!-- 连接线到结束 -->
                <div class="w-4 h-px bg-gray-300 dark:bg-gray-600 flex-shrink-0 mb-[20px]"></div>

                <!-- 结束节点 -->
                <div class="flex flex-col items-center space-y-1 flex-shrink-0">
                  <div class="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <StopIcon class="w-3 h-3 text-white" />
                  </div>
                  <span class="text-xs text-gray-600 dark:text-dark-text-secondary">结束</span>
                </div>
              </div>
            </div>
          </template>
          </el-table-column>

          <el-table-column label="执行状态" width="150">
            <template #default="scope">
              <div class="space-y-2">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      :class="getStatusClass(scope.row.status)">
                  <span class="w-1.5 h-1.5 rounded-full mr-1.5" :class="getStatusDotClass(scope.row.status)"></span>
                  {{ getStatusText(scope.row.status) }}
                </span>
                <div v-if="scope.row.duration" class="text-xs text-gray-500 dark:text-dark-text-secondary">
                  耗时: {{ scope.row.duration }}
                </div>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="执行信息" width="180">
            <template #default="scope">
              <div class="space-y-1">
                <div class="text-sm font-medium text-gray-900 dark:text-dark-text">{{ scope.row.executor }}</div>
                <div class="text-xs text-gray-500 dark:text-dark-text-secondary">{{ scope.row.startTime }}</div>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="180">
            <template #default="scope">
              <div class="flex items-center space-x-2">
                <button @click="viewExecutionDetails(scope.row)"
                  class="inline-flex items-center px-3 py-1.5 text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 bg-primary-50 dark:bg-primary-900/20 hover:bg-primary-100 dark:hover:bg-primary-900/30 rounded-lg transition-all duration-200">
                  查看详情
                </button>

                <!-- 更多操作下拉菜单 -->
                <el-dropdown @command="handleDropdownCommand" trigger="click">
                  <button class="inline-flex items-center px-2 py-1.5 text-sm font-medium text-gray-600 dark:text-dark-text-secondary hover:text-gray-700 dark:hover:text-dark-text bg-gray-50 dark:bg-dark-card hover:bg-gray-100 dark:hover:bg-dark-border rounded-lg transition-all duration-200">
                    更多
                    <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item :command="{action: 'viewResults', row: scope.row}" :disabled="scope.row.status !== 'completed'">
                      <div class="flex items-center space-x-2">
                        <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span>处理结果</span>
                      </div>
                    </el-dropdown-item>
                    <el-dropdown-item :command="{action: 'rerun', row: scope.row}">
                      <div class="flex items-center space-x-2">
                        <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                        </svg>
                        <span>重新执行</span>
                      </div>
                    </el-dropdown-item>
                    <el-dropdown-item :command="{action: 'duplicate', row: scope.row}">
                      <div class="flex items-center space-x-2">
                        <svg class="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                        </svg>
                        <span>复制工作流</span>
                      </div>
                    </el-dropdown-item>
                    <el-dropdown-item :command="{action: 'export', row: scope.row}">
                      <div class="flex items-center space-x-2">
                        <svg class="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                        <span>导出结果</span>
                      </div>
                    </el-dropdown-item>
                    <el-dropdown-item :command="{action: 'delete', row: scope.row}" divided>
                      <div class="flex items-center space-x-2">
                        <svg class="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                        <span>删除记录</span>
                      </div>
                    </el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 分页 -->
      <div class="flex justify-between items-center px-6 py-4 border-t border-gray-100 dark:border-dark-border bg-gray-50 dark:bg-dark-card/50">
        <div class="text-sm text-gray-600 dark:text-dark-text-secondary">
          共 {{ pagination.total }} 条记录
        </div>
        <el-pagination
          v-model:current-page="pagination.currentPage"
          v-model:page-size="pagination.pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="pagination.total"
          layout="sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          class="modern-pagination"
        />
      </div>
    </div>

    <!-- 创建工作流弹窗 -->
    <CreateWorkflowDialog v-model="showCreateDialog" @success="refreshData" />

    <!-- 工作流模板弹窗 -->
    <!-- <WorkflowTemplateDialog
      v-model="showTemplateDialog"
      @select="createFromTemplate"
      @create-blank="showCreateDialog = true"
    /> -->

    <!-- 执行详情弹窗 -->
    <ExecutionDetailsDialog
      v-model="showDetailsDialog"
      :execution="selectedExecution"
      @view-results="viewResults"
    />

    <!-- 处理结果弹窗 -->
    <ResultsDialog v-model="showResultsDialog" :execution="selectedExecution" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { Plus, Download } from '@element-plus/icons-vue';
import {
  MagnifyingGlassIcon,
  PlayIcon,
  StopIcon
} from '@heroicons/vue/24/outline';
import {
  ShoppingBagIcon,
  ScissorsIcon,
  SparklesIcon,
  DocumentTextIcon,
  RectangleStackIcon,
  CubeIcon
} from '@heroicons/vue/24/outline';
import CreateWorkflowDialog from './components/CreateWorkflowDialog.vue';
// import WorkflowTemplateDialog from './components/WorkflowTemplateDialog.vue';
import ExecutionDetailsDialog from './components/ExecutionDetailsDialog.vue';
import ResultsDialog from './components/ResultsDialog.vue';
import {
  initWorkflows,
  getWorkflowExecutions,
  // type Workflow,
  type WorkflowExecution
} from '~/stores/workflows';

// 响应式数据
const searchKeyword = ref('');
const statusFilter = ref('');
const selectedRows = ref<WorkflowExecution[]>([]);
const showCreateDialog = ref(false);
// const showTemplateDialog = ref(false);
const showDetailsDialog = ref(false);
const showResultsDialog = ref(false);
const selectedExecution = ref<WorkflowExecution | null>(null);

const pagination = ref({
  currentPage: 1,
  pageSize: 20,
  total: 0
});

// 使用存储中的数据
const executions = ref<WorkflowExecution[]>([]);
const loading = ref(false);

// 计算属性
const filteredExecutions = computed(() => {
  let filtered = executions.value;

  // 搜索过滤
  if (searchKeyword.value) {
    filtered = filtered.filter(execution =>
      execution.workflowName.toLowerCase().includes(searchKeyword.value.toLowerCase()) ||
      execution.id.toLowerCase().includes(searchKeyword.value.toLowerCase())
    );
  }

  // 状态过滤
  if (statusFilter.value) {
    filtered = filtered.filter(execution => execution.status === statusFilter.value);
  }

  return filtered;
});

const currentPageExecutions = computed(() => {
  const start = (pagination.value.currentPage - 1) * pagination.value.pageSize;
  const end = start + pagination.value.pageSize;
  return filteredExecutions.value.slice(start, end);
});

// 统计数据
const totalExecutions = computed(() => executions.value.length);

const successRate = computed(() => {
  if (executions.value.length === 0) return 0;
  const completedCount = executions.value.filter(e => e.status === 'completed').length;
  return Math.round((completedCount / executions.value.length) * 100);
});

const activeWorkflows = computed(() => {
  const uniqueWorkflows = new Set(executions.value.map(e => e.workflowId));
  return uniqueWorkflows.size;
});

const averageTime = computed(() => {
  const completedExecutions = executions.value.filter(e => e.status === 'completed' && e.duration);
  if (completedExecutions.length === 0) return '0分钟';

  // 简化计算，返回固定值作为示例
  return '3.5分钟';
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

// 获取应用状态样式 - 已移除，使用getStepStatusClass替代

// 获取状态类型 - 已移除，使用getStatusClass替代

// 获取状态文本
const getStatusText = (status: string) => {
  switch (status) {
    case 'completed':
      return '已完成';
    case 'failed':
      return '失败';
    case 'running':
      return '执行中';
    case 'pending':
      return '等待中';
    default:
      return '未知';
  }
};

// 方法
const loadExecutions = async () => {
  loading.value = true;
  try {
    const data = await getWorkflowExecutions();
    executions.value = data;
    pagination.value.total = filteredExecutions.value.length;
  } catch (error) {
    ElMessage.error('加载执行历史失败');
  } finally {
    loading.value = false;
  }
};

const handleSelectionChange = (selection: WorkflowExecution[]) => {
  selectedRows.value = selection;
};

const handleSearch = () => {
  pagination.value.currentPage = 1;
  pagination.value.total = filteredExecutions.value.length;
};

const viewExecutionDetails = (execution: WorkflowExecution) => {
  selectedExecution.value = execution;
  showDetailsDialog.value = true;
};

const viewResults = (execution: WorkflowExecution) => {
  selectedExecution.value = execution;
  showResultsDialog.value = true;
};

// 获取执行图标背景
const getExecutionIconBg = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 dark:bg-green-900/30';
    case 'failed':
      return 'bg-red-100 dark:bg-red-900/30';
    case 'running':
      return 'bg-blue-100 dark:bg-blue-900/30';
    case 'pending':
      return 'bg-gray-100 dark:bg-gray-900/30';
    default:
      return 'bg-gray-100 dark:bg-gray-900/30';
  }
};

// 获取执行图标
const getExecutionIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return 'svg';
    case 'failed':
      return 'svg';
    case 'running':
      return 'svg';
    default:
      return 'svg';
  }
};

// 获取执行图标颜色
const getExecutionIconColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'text-green-600 dark:text-green-400';
    case 'failed':
      return 'text-red-600 dark:text-red-400';
    case 'running':
      return 'text-blue-600 dark:text-blue-400';
    case 'pending':
      return 'text-gray-600 dark:text-gray-400';
    default:
      return 'text-gray-600 dark:text-gray-400';
  }
};

// 获取步骤状态样式
const getStepStatusClass = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-500';
    case 'failed':
      return 'bg-red-500';
    case 'running':
      return 'bg-blue-500';
    case 'pending':
      return 'bg-gray-400';
    default:
      return 'bg-gray-400';
  }
};

// 获取状态样式类
const getStatusClass = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
    case 'failed':
      return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
    case 'running':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
    case 'pending':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
  }
};

// 获取状态点样式
const getStatusDotClass = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-400';
    case 'failed':
      return 'bg-red-400';
    case 'running':
      return 'bg-blue-400';
    case 'pending':
      return 'bg-gray-400';
    default:
      return 'bg-gray-400';
  }
};

// 下拉菜单命令处理
const handleDropdownCommand = (command: { action: string; row: WorkflowExecution }) => {
  const { action, row } = command;

  switch (action) {
    case 'viewResults':
      viewResults(row);
      break;
    case 'rerun':
      ElMessage.info('重新执行功能开发中...');
      break;
    case 'duplicate':
      ElMessage.info('复制工作流功能开发中...');
      break;
    case 'export':
      ElMessage.info('导出结果功能开发中...');
      break;
    case 'delete':
      ElMessage.info('删除记录功能开发中...');
      break;
  }
};

// const createFromTemplate = (template: Workflow) => {
//   // 从模板创建工作流的逻辑
//   ElMessage.success(`正在从模板"${template.name}"创建工作流...`);
//   showTemplateDialog.value = false;
//   showCreateDialog.value = true;
// };

const exportWorkflows = () => {
  ElMessage.success('导出执行历史功能开发中...');
};

const refreshData = () => {
  ElMessage.success('数据已刷新！');
  loadExecutions();
};

// 快速筛选
const quickFilter = (type: string) => {
  switch (type) {
    case 'today':
      ElMessage.info('显示今日执行记录');
      break;
    case 'week':
      ElMessage.info('显示本周执行记录');
      break;
    default:
      return;
  }

  // 这里可以添加实际的筛选逻辑
  handleSearch();
};

// 批量导出
const batchExport = () => {
  if (selectedRows.value.length === 0) {
    ElMessage.warning('请先选择要导出的记录');
    return;
  }
  ElMessage.success(`正在导出 ${selectedRows.value.length} 条执行记录...`);
};

// 批量删除
const batchDelete = () => {
  if (selectedRows.value.length === 0) {
    ElMessage.warning('请先选择要删除的记录');
    return;
  }
  ElMessage.warning(`批量删除功能开发中... (已选择 ${selectedRows.value.length} 项)`);
};

const handleSizeChange = (val: number) => {
  pagination.value.pageSize = val;
  pagination.value.currentPage = 1;
  loadExecutions();
};

const handleCurrentChange = (val: number) => {
  pagination.value.currentPage = val;
  loadExecutions();
};

// 生命周期
onMounted(() => {
  initWorkflows();
  loadExecutions();
});
</script>

<style scoped>
/* 工作流表格样式 */
:deep(.workflow-table) {
  .el-table__header-wrapper {
    background: transparent;
  }

  .el-table__header th {
    background: transparent !important;
    border-bottom: 1px solid #f3f4f6;
    font-weight: 600;
    color: #6b7280;
    padding: 16px 12px;
  }

  .el-table__row {
    transition: all 0.3s ease;
  }

  .el-table__row:hover {
    background-color: #f8fafc;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }

  .el-table__cell {
    border-bottom: 1px solid #f3f4f6;
    padding: 16px 12px;
  }
}

/* 暗黑模式适配 */
.dark :deep(.workflow-table) {
  .el-table__header th {
    border-bottom-color: #374151;
    color: #9ca3af;
  }

  .el-table__row:hover {
    background-color: #1f2937;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  .el-table__cell {
    border-bottom-color: #374151;
  }
}

/* 现代化下拉菜单样式 */
:deep(.modern-dropdown) {
  .el-dropdown-menu__item {
    padding: 12px 16px;
    margin: 4px 8px;
    border-radius: 8px;
    transition: all 0.2s ease;
  }

  .el-dropdown-menu__item:hover {
    background-color: #f3f4f6;
    transform: translateX(4px);
  }

  .el-dropdown-menu__item--divided {
    border-top: 1px solid #e5e7eb;
    margin-top: 8px;
    padding-top: 16px;
  }
}

.dark :deep(.modern-dropdown) {
  .el-dropdown-menu__item:hover {
    background-color: #374151;
  }

  .el-dropdown-menu__item--divided {
    border-top-color: #4b5563;
  }
}

/* 优雅阴影效果 */
.shadow-elegant {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.shadow-elegant-dark {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.2);
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

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* 响应式优化 */
@media (max-width: 1024px) {
  .grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-4 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-4 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }

  /* 移动端表格优化 */
  :deep(.workflow-table) {
    .el-table__cell {
      padding: 12px 8px;
    }
  }
}

@media (max-width: 640px) {
  /* 移动端按钮组优化 */
  .flex.items-center.space-x-3 {
    flex-direction: column;
    space-x: 0;
    gap: 0.75rem;
  }

  .flex.items-center.space-x-3 > * {
    width: 100%;
  }
}

/* 表格行状态指示器 */
.status-indicator {
  position: relative;
}

.status-indicator::before {
  content: '';
  position: absolute;
  left: -12px;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 24px;
  border-radius: 2px;
}

.status-completed::before {
  background-color: #10b981;
}

.status-running::before {
  background-color: #3b82f6;
}

.status-failed::before {
  background-color: #ef4444;
}

.status-pending::before {
  background-color: #6b7280;
}
</style>
