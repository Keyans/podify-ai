<template>
  <div class="selected-state-fix-demo">
    <!-- 页面标题 -->
    <div class="demo-header">
      <h1>选中状态文字可见性修复演示</h1>
      <p>解决暗色主题下选中状态文字不可见的问题</p>
      
      <!-- 主题切换器 -->
      <div class="theme-switcher">
        <ThemeSelector />
      </div>
    </div>

    <!-- 问题说明 -->
    <div class="problem-explanation">
      <a-card title="问题描述">
        <div class="problem-content">
          <h3>修复前的问题：</h3>
          <ul>
            <li><strong>选中状态背景色过深</strong> - 使用固定的蓝色背景可能在某些主题下对比度不足</li>
            <li><strong>文字颜色不适配</strong> - 白色文字在某些蓝色背景下可能不够清晰</li>
            <li><strong>主题不一致</strong> - 使用固定颜色而非主题变量，导致与整体主题不协调</li>
            <li><strong>可访问性问题</strong> - 对比度不足影响可读性</li>
          </ul>
          
          <h3>修复方案：</h3>
          <ul>
            <li>使用主题变量 <code>var(--accent-color)</code> 替代固定颜色</li>
            <li>确保选中状态始终使用白色文字以保证对比度</li>
            <li>添加悬停状态的颜色变化</li>
            <li>统一所有组件的选中状态样式</li>
          </ul>
        </div>
      </a-card>
    </div>

    <!-- 修复效果展示 -->
    <div class="fix-demo-section">
      <a-row :gutter="[24, 24]">
        <!-- 按钮选中状态 -->
        <a-col :span="12">
          <a-card title="按钮选中状态">
            <div class="demo-group">
              <h4>分类选择按钮</h4>
              <div class="button-group">
                <button 
                  v-for="category in categories"
                  :key="category.id"
                  @click="selectedCategory = category.id"
                  :class="selectedCategory === category.id ? 'bg-blue-600 text-white' : 'bg-dark-input text-dark-text-secondary'"
                  class="px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-dark-border"
                >
                  {{ category.name }}
                </button>
              </div>
            </div>
            
            <div class="demo-group mt-6">
              <h4>视图切换按钮</h4>
              <div class="view-toggle">
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
            </div>
          </a-card>
        </a-col>

        <!-- 导航选中状态 -->
        <a-col :span="12">
          <a-card title="导航选中状态">
            <div class="demo-group">
              <h4>侧边栏导航</h4>
              <div class="nav-demo">
                <div 
                  v-for="nav in navItems"
                  :key="nav.id"
                  @click="selectedNav = nav.id"
                  :class="selectedNav === nav.id ? 'bg-cyan-400/10 text-cyan-400' : 'text-dark-text-secondary hover:text-dark-text'"
                  class="flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors border border-transparent hover:border-dark-border"
                >
                  <div 
                    class="w-2 h-2 rounded-full" 
                    :class="selectedNav === nav.id ? 'bg-cyan-400' : 'bg-dark-text-tertiary'"
                  ></div>
                  <span>{{ nav.name }}</span>
                </div>
              </div>
            </div>
          </a-card>
        </a-col>

        <!-- 分页选中状态 -->
        <a-col :span="12">
          <a-card title="分页选中状态">
            <div class="demo-group">
              <h4>分页按钮</h4>
              <div class="pagination-demo">
                <button 
                  v-for="page in [1, 2, 3, 4, 5]"
                  :key="page"
                  @click="currentPage = page"
                  :class="currentPage === page 
                    ? 'bg-cyan-400 text-dark-bg font-bold' 
                    : 'text-dark-text-secondary hover:text-white hover:bg-dark-input border border-dark-border'"
                  class="px-3 py-1 rounded-md text-sm font-medium transition-colors mx-1"
                >
                  {{ page }}
                </button>
              </div>
            </div>
          </a-card>
        </a-col>

        <!-- 表单选中状态 -->
        <a-col :span="12">
          <a-card title="表单选中状态">
            <div class="demo-group">
              <h4>复选框和单选框</h4>
              <div class="form-demo">
                <div class="space-y-3">
                  <label class="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      v-model="checkboxValues.option1"
                      class="w-4 h-4 rounded border-dark-border bg-dark-input text-blue-600 focus:ring-blue-500"
                    />
                    <span class="text-dark-text">选项 1</span>
                  </label>
                  <label class="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      v-model="checkboxValues.option2"
                      class="w-4 h-4 rounded border-dark-border bg-dark-input text-blue-600 focus:ring-blue-500"
                    />
                    <span class="text-dark-text">选项 2</span>
                  </label>
                  <label class="flex items-center space-x-2">
                    <input 
                      type="radio" 
                      v-model="radioValue"
                      value="radio1"
                      class="w-4 h-4 border-dark-border bg-dark-input text-blue-600 focus:ring-blue-500"
                    />
                    <span class="text-dark-text">单选 1</span>
                  </label>
                  <label class="flex items-center space-x-2">
                    <input 
                      type="radio" 
                      v-model="radioValue"
                      value="radio2"
                      class="w-4 h-4 border-dark-border bg-dark-input text-blue-600 focus:ring-blue-500"
                    />
                    <span class="text-dark-text">单选 2</span>
                  </label>
                </div>
              </div>
            </div>
          </a-card>
        </a-col>
      </a-row>
    </div>

    <!-- 技术实现说明 -->
    <div class="technical-details">
      <a-card title="技术实现详情">
        <a-collapse>
          <a-collapse-panel key="css-variables" header="CSS 变量统一管理">
            <div class="code-example">
              <p>使用主题变量替代固定颜色：</p>
              <pre><code>/* 修复前 */
.bg-blue-600 {
  background-color: #2563eb;
  color: white;
}

/* 修复后 */
.bg-blue-600 {
  background-color: var(--accent-color) !important;
  color: white !important;
}</code></pre>
            </div>
          </a-collapse-panel>
          
          <a-collapse-panel key="contrast-fix" header="对比度修复">
            <div class="code-example">
              <p>确保选中状态的文字始终可见：</p>
              <pre><code>/* 全局选中状态修复 */
.bg-blue-600,
.bg-cyan-400 {
  background-color: var(--accent-color) !important;
  color: white !important;
  border-color: var(--accent-color) !important;
}

/* 悬停状态增强 */
.bg-blue-600:hover,
.bg-cyan-400:hover {
  background-color: var(--accent-hover) !important;
  color: white !important;
}</code></pre>
            </div>
          </a-collapse-panel>
          
          <a-collapse-panel key="accessibility" header="可访问性改进">
            <div class="code-example">
              <p>支持高对比度模式和响应式设计：</p>
              <pre><code>/* 高对比度模式支持 */
@media (prefers-contrast: high) {
  .bg-blue-600,
  .bg-cyan-400 {
    background-color: var(--accent-color) !important;
    color: white !important;
    border: 2px solid white !important;
  }
}

/* 系统暗色模式适配 */
@media (prefers-color-scheme: dark) {
  .bg-blue-600,
  .bg-cyan-400 {
    background-color: var(--accent-color) !important;
    color: white !important;
  }
}</code></pre>
            </div>
          </a-collapse-panel>
        </a-collapse>
      </a-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ThemeSelector from '~/components/ThemeSelector.vue'

// 页面标题
useHead({
  title: '选中状态文字可见性修复演示'
})

// 响应式数据
const selectedCategory = ref('all')
const viewMode = ref('grid')
const selectedNav = ref('overview')
const currentPage = ref(3)
const radioValue = ref('radio1')
const checkboxValues = ref({
  option1: true,
  option2: false
})

// 演示数据
const categories = [
  { id: 'all', name: '全部' },
  { id: 'images', name: '图片处理' },
  { id: 'ai', name: 'AI生成' },
  { id: 'tools', name: '工具' }
]

const navItems = [
  { id: 'overview', name: '概览' },
  { id: 'products', name: '商品图库' },
  { id: 'materials', name: '素材图库' },
  { id: 'results', name: '结果图库' }
]
</script>

<style scoped>
.selected-state-fix-demo {
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
  background-color: var(--bg-primary);
  min-height: 100vh;
}

.demo-header {
  text-align: center;
  margin-bottom: 32px;
  position: relative;
}

.demo-header h1 {
  color: var(--text-primary);
  margin-bottom: 8px;
  font-size: 28px;
}

.demo-header p {
  color: var(--text-secondary);
  font-size: 16px;
  margin-bottom: 24px;
}

.theme-switcher {
  position: absolute;
  top: 0;
  right: 0;
}

.problem-explanation {
  margin-bottom: 32px;
}

.problem-content h3 {
  color: var(--text-primary);
  margin: 16px 0 8px 0;
}

.problem-content ul {
  color: var(--text-secondary);
  padding-left: 24px;
}

.problem-content li {
  margin-bottom: 8px;
}

.problem-content strong {
  color: var(--text-primary);
}

.problem-content code {
  background: var(--bg-tertiary);
  padding: 2px 6px;
  border-radius: 4px;
  color: var(--accent-color);
  font-family: 'Monaco', 'Menlo', monospace;
}

.fix-demo-section {
  margin-bottom: 32px;
}

.demo-group {
  margin-bottom: 24px;
}

.demo-group h4 {
  color: var(--text-primary);
  margin-bottom: 12px;
  font-size: 16px;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.view-toggle {
  display: flex;
  background: var(--bg-tertiary);
  border-radius: 6px;
  padding: 4px;
  width: fit-content;
}

.nav-demo {
  space-y: 2px;
}

.nav-demo > div {
  margin-bottom: 8px;
}

.pagination-demo {
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-demo {
  background: var(--bg-tertiary);
  padding: 16px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

.technical-details {
  margin-top: 32px;
}

.code-example {
  background: var(--bg-tertiary);
  padding: 16px;
  border-radius: 6px;
  border: 1px solid var(--border-color);
}

.code-example p {
  color: var(--text-primary);
  margin-bottom: 12px;
}

.code-example pre {
  background: var(--bg-primary);
  padding: 12px;
  border-radius: 4px;
  border: 1px solid var(--border-color);
  overflow-x: auto;
}

.code-example code {
  color: var(--text-primary);
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 13px;
  line-height: 1.5;
}

/* 确保主题选择器在演示页面中正常显示 */
.theme-switcher :deep(.theme-selector) {
  position: relative;
}

/* 适配暗色主题的卡片样式 */
:deep(.ant-card) {
  background-color: var(--bg-secondary);
  border-color: var(--border-color);
}

:deep(.ant-card-head) {
  background-color: var(--bg-secondary);
  border-bottom-color: var(--border-color);
}

:deep(.ant-card-head-title) {
  color: var(--text-primary);
}

:deep(.ant-card-body) {
  color: var(--text-primary);
}

:deep(.ant-collapse) {
  background-color: var(--bg-tertiary);
  border-color: var(--border-color);
}

:deep(.ant-collapse-item) {
  border-bottom-color: var(--border-color);
}

:deep(.ant-collapse-header) {
  color: var(--text-primary);
  background-color: var(--bg-secondary);
}

:deep(.ant-collapse-content) {
  background-color: var(--bg-tertiary);
  border-top-color: var(--border-color);
}

:deep(.ant-collapse-content-box) {
  color: var(--text-primary);
}
</style>