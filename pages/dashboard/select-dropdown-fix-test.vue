<template>
  <div class="select-dropdown-test">
    <!-- 页面标题 -->
    <div class="test-header">
      <h1>Ant Design Vue Select 下拉选项修复测试</h1>
      <p>验证下拉选项选中状态背景色修复效果</p>
      
      <!-- 主题切换器 -->
      <div class="theme-switcher">
        <ThemeSelector />
      </div>
    </div>

    <!-- 问题描述 -->
    <div class="problem-description">
      <a-card title="修复的问题">
        <div class="problem-content">
          <h3>修复前的问题：</h3>
          <ul>
            <li><strong>选中项背景色为白色</strong> - 在暗色主题下显示为白色背景</li>
            <li><strong>视觉对比度差</strong> - 白色背景在黑色界面下突兀</li>
            <li><strong>主题不一致</strong> - 与整体暗色主题风格不符</li>
          </ul>
          
          <h3>修复后的效果：</h3>
          <ul>
            <li>选中项背景使用 <code>var(--bg-primary)</code> - 与主题背景一致</li>
            <li>选中项文字使用 <code>var(--accent-color)</code> - 突出显示选中状态</li>
            <li>悬停效果使用 <code>var(--bg-tertiary)</code> - 提供良好的交互反馈</li>
          </ul>
        </div>
      </a-card>
    </div>

    <!-- 测试组件 -->
    <div class="test-components">
      <a-row :gutter="[24, 24]">
        <!-- 基础选择器测试 -->
        <a-col :span="12">
          <a-card title="基础选择器">
            <div class="test-group">
              <h4>单选下拉框</h4>
              <a-select 
                v-model:value="singleValue" 
                placeholder="请选择一个选项"
                style="width: 100%"
              >
                <a-select-option value="进行中">进行中</a-select-option>
                <a-select-option value="待执行">待执行</a-select-option>
                <a-select-option value="已完成">已完成</a-select-option>
                <a-select-option value="部分失败">部分失败</a-select-option>
                <a-select-option value="失败">失败</a-select-option>
              </a-select>
            </div>

            <div class="test-group">
              <h4>多选下拉框</h4>
              <a-select 
                v-model:value="multipleValue" 
                mode="multiple"
                placeholder="请选择多个选项"
                style="width: 100%"
              >
                <a-select-option value="图片处理">图片处理</a-select-option>
                <a-select-option value="AI生成">AI生成</a-select-option>
                <a-select-option value="商品合成">商品合成</a-select-option>
                <a-select-option value="标题生成">标题生成</a-select-option>
                <a-select-option value="抠图处理">抠图处理</a-select-option>
              </a-select>
            </div>
          </a-card>
        </a-col>

        <!-- 搜索选择器测试 -->
        <a-col :span="12">
          <a-card title="搜索选择器">
            <div class="test-group">
              <h4>可搜索选择器</h4>
              <a-select 
                v-model:value="searchValue"
                show-search
                placeholder="输入搜索内容"
                style="width: 100%"
                :filter-option="filterOption"
              >
                <a-select-option value="裁剪工具">裁剪工具</a-select-option>
                <a-select-option value="抠图工具">抠图工具</a-select-option>
                <a-select-option value="检测工具">检测工具</a-select-option>
                <a-select-option value="合成工具">合成工具</a-select-option>
                <a-select-option value="变换工具">变换工具</a-select-option>
                <a-select-option value="文生图工具">文生图工具</a-select-option>
                <a-select-option value="标题生成工具">标题生成工具</a-select-option>
              </a-select>
            </div>

            <div class="test-group">
              <h4>分组选择器</h4>
              <a-select 
                v-model:value="groupValue"
                placeholder="选择工具类型"
                style="width: 100%"
              >
                <a-select-opt-group label="图像处理">
                  <a-select-option value="crop">裁剪</a-select-option>
                  <a-select-option value="cutout">抠图</a-select-option>
                  <a-select-option value="detection">检测</a-select-option>
                </a-select-opt-group>
                <a-select-opt-group label="AI生成">
                  <a-select-option value="text-to-image">文生图</a-select-option>
                  <a-select-option value="title-generation">标题生成</a-select-option>
                </a-select-opt-group>
                <a-select-opt-group label="商品管理">
                  <a-select-option value="pod-synthesis">POD合成</a-select-option>
                  <a-select-option value="transform">变换</a-select-option>
                </a-select-opt-group>
              </a-select>
            </div>
          </a-card>
        </a-col>

        <!-- 不同尺寸测试 -->
        <a-col :span="12">
          <a-card title="不同尺寸选择器">
            <div class="test-group">
              <h4>大尺寸</h4>
              <a-select 
                v-model:value="largeSizeValue"
                size="large"
                placeholder="大尺寸选择器"
                style="width: 100%"
              >
                <a-select-option value="option1">选项1</a-select-option>
                <a-select-option value="option2">选项2</a-select-option>
                <a-select-option value="option3">选项3</a-select-option>
              </a-select>
            </div>

            <div class="test-group">
              <h4>默认尺寸</h4>
              <a-select 
                v-model:value="defaultSizeValue"
                placeholder="默认尺寸选择器"
                style="width: 100%"
              >
                <a-select-option value="option1">选项1</a-select-option>
                <a-select-option value="option2">选项2</a-select-option>
                <a-select-option value="option3">选项3</a-select-option>
              </a-select>
            </div>

            <div class="test-group">
              <h4>小尺寸</h4>
              <a-select 
                v-model:value="smallSizeValue"
                size="small"
                placeholder="小尺寸选择器"
                style="width: 100%"
              >
                <a-select-option value="option1">选项1</a-select-option>
                <a-select-option value="option2">选项2</a-select-option>
                <a-select-option value="option3">选项3</a-select-option>
              </a-select>
            </div>
          </a-card>
        </a-col>

        <!-- 特殊状态测试 -->
        <a-col :span="12">
          <a-card title="特殊状态选择器">
            <div class="test-group">
              <h4>禁用选择器</h4>
              <a-select 
                v-model:value="disabledValue"
                disabled
                placeholder="禁用状态"
                style="width: 100%"
              >
                <a-select-option value="option1">选项1</a-select-option>
                <a-select-option value="option2">选项2</a-select-option>
              </a-select>
            </div>

            <div class="test-group">
              <h4>加载状态</h4>
              <a-select 
                v-model:value="loadingValue"
                loading
                placeholder="加载中..."
                style="width: 100%"
              >
                <a-select-option value="option1">选项1</a-select-option>
                <a-select-option value="option2">选项2</a-select-option>
              </a-select>
            </div>

            <div class="test-group">
              <h4>错误状态</h4>
              <a-select 
                v-model:value="errorValue"
                status="error"
                placeholder="错误状态"
                style="width: 100%"
              >
                <a-select-option value="option1">选项1</a-select-option>
                <a-select-option value="option2">选项2</a-select-option>
              </a-select>
            </div>
          </a-card>
        </a-col>
      </a-row>
    </div>

    <!-- 修复详情 -->
    <div class="fix-details">
      <a-card title="修复技术详情">
        <a-collapse>
          <a-collapse-panel key="css-selectors" header="CSS 选择器修复">
            <div class="code-example">
              <p>针对你提到的特定选择器进行修复：</p>
              <pre><code>/* 修复特定的 CSS 类名 */
:where(.css-dev-only-do-not-override-1onovbn).ant-select-dropdown 
.ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
  background-color: var(--bg-primary) !important;
  color: var(--accent-color) !important;
}

/* 通用修复 */
.ant-select-dropdown .ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
  background-color: var(--bg-primary) !important;
  color: var(--accent-color) !important;
}</code></pre>
            </div>
          </a-collapse-panel>
          
          <a-collapse-panel key="theme-variables" header="主题变量使用">
            <div class="code-example">
              <p>使用项目主题变量确保一致性：</p>
              <pre><code>/* 背景色变量 */
var(--bg-primary)    /* 主背景色 - 黑色 #000000 */
var(--bg-secondary)  /* 次级背景 - 深灰 #111111 */
var(--bg-tertiary)   /* 三级背景 - 浅灰 #1a1a1a */

/* 文字色变量 */
var(--text-primary)  /* 主文字 - 白色 #ffffff */
var(--accent-color)  /* 强调色 - 青蓝 #22d3ee */</code></pre>
            </div>
          </a-collapse-panel>
          
          <a-collapse-panel key="priority-rules" header="样式优先级管理">
            <div class="code-example">
              <p>使用多种方式确保修复生效：</p>
              <pre><code>/* 方式1: 深度选择器 */
::deep(.ant-select-dropdown .ant-select-item-option-selected) {
  background-color: var(--bg-primary) !important;
}

/* 方式2: 属性选择器 */
[class*="ant-select-dropdown"] [class*="ant-select-item-option-selected"] {
  background-color: var(--bg-primary) !important;
}

/* 方式3: 特定类名匹配 */
:where(.css-dev-only-do-not-override-1onovbn) .ant-select-item-option-selected {
  background-color: var(--bg-primary) !important;
}</code></pre>
            </div>
          </a-collapse-panel>
        </a-collapse>
      </a-card>
    </div>

    <!-- 当前选择值显示 -->
    <div class="current-values">
      <a-card title="当前选择值">
        <div class="values-display">
          <p><strong>单选值:</strong> {{ singleValue || '未选择' }}</p>
          <p><strong>多选值:</strong> {{ multipleValue?.length ? multipleValue.join(', ') : '未选择' }}</p>
          <p><strong>搜索值:</strong> {{ searchValue || '未选择' }}</p>
          <p><strong>分组值:</strong> {{ groupValue || '未选择' }}</p>
        </div>
      </a-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ThemeSelector from '~/components/ThemeSelector.vue'

// 页面标题
useHead({
  title: 'Select 下拉选项修复测试'
})

// 响应式数据
const singleValue = ref('进行中')
const multipleValue = ref(['图片处理', 'AI生成'])
const searchValue = ref('')
const groupValue = ref('')
const largeSizeValue = ref('')
const defaultSizeValue = ref('')
const smallSizeValue = ref('')
const disabledValue = ref('option1')
const loadingValue = ref('')
const errorValue = ref('')

// 搜索过滤函数
const filterOption = (input, option) => {
  return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
}
</script>

<style scoped>
.select-dropdown-test {
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
  background-color: var(--bg-primary);
  min-height: 100vh;
}

.test-header {
  text-align: center;
  margin-bottom: 32px;
  position: relative;
}

.test-header h1 {
  color: var(--text-primary);
  margin-bottom: 8px;
  font-size: 28px;
}

.test-header p {
  color: var(--text-secondary);
  font-size: 16px;
  margin-bottom: 24px;
}

.theme-switcher {
  position: absolute;
  top: 0;
  right: 0;
}

.problem-description {
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

.test-components {
  margin-bottom: 32px;
}

.test-group {
  margin-bottom: 24px;
}

.test-group h4 {
  color: var(--text-primary);
  margin-bottom: 8px;
  font-size: 14px;
}

.fix-details {
  margin-bottom: 32px;
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

.current-values {
  margin-top: 32px;
}

.values-display p {
  color: var(--text-primary);
  margin-bottom: 8px;
}

.values-display strong {
  color: var(--accent-color);
}

/* 确保主题选择器正常显示 */
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