<template>
  <div class="time-picker-selected-fix-demo">
    <!-- 页面标题 -->
    <div class="demo-header">
      <h1>TimePicker 选中状态特定修复演示</h1>
      <p>解决 TimePicker 选中项固定背景色 #f0fffe 的问题</p>
      
      <!-- 主题切换器 -->
      <div class="theme-switcher">
        <ThemeSelector />
      </div>
    </div>

    <!-- 问题说明 -->
    <div class="problem-explanation">
      <a-card title="修复的具体问题">
        <div class="problem-content">
          <h3>问题描述：</h3>
          <p>您指出的具体CSS选择器：</p>
          <div class="css-selector">
            <code>:where(.css-dev-only-do-not-override-1onovbn).ant-picker-dropdown .ant-picker-time-panel-column >li.ant-picker-time-panel-cell-selected .ant-picker-time-panel-cell-inner</code>
          </div>
          <p>使用了固定的背景色 <span class="color-badge" style="background: #f0fffe; color: #000;">#f0fffe</span>，在暗色主题下缺乏区分度。</p>
          
          <h3>修复方案：</h3>
          <ul>
            <li>使用 <code>var(--bg-primary)</code> 替代固定的 <span class="color-badge" style="background: #f0fffe; color: #000;">#f0fffe</span> 背景色</li>
            <li>使用 <code>var(--accent-color)</code> 作为文字颜色，提供更好的对比度</li>
            <li>修复确定按钮的白色边框：<code>border-color: var(--accent-color)</code></li>
            <li>添加 <code>border: 1px solid var(--accent-color)</code> 增强视觉区分</li>
            <li>移除不必要的阴影：<code>box-shadow: none</code></li>
            <li>确保在所有主题下都有良好的可读性和区分度</li>
          </ul>
        </div>
      </a-card>
    </div>

    <!-- 修复效果展示 -->
    <div class="fix-demo-section">
      <a-row :gutter="[24, 24]">
        <!-- TimePicker 基础演示 -->
        <a-col :span="12">
          <a-card title="基础时间选择器">
            <div class="demo-group">
              <h4>标准时间选择</h4>
              <a-time-picker
                v-model:value="timeValue1"
                placeholder="选择时间"
                style="width: 100%"
                format="HH:mm:ss"
              />
              <div class="demo-result">
                <p><strong>选中时间：</strong>{{ timeValue1 || '未选择' }}</p>
              </div>
            </div>

            <div class="demo-group">
              <h4>分钟精度时间选择</h4>
              <a-time-picker
                v-model:value="timeValue2"
                placeholder="选择时间"
                style="width: 100%"
                format="HH:mm"
              />
              <div class="demo-result">
                <p><strong>选中时间：</strong>{{ timeValue2 || '未选择' }}</p>
              </div>
            </div>
          </a-card>
        </a-col>

        <!-- TimePicker 特殊配置 -->
        <a-col :span="12">
          <a-card title="特殊配置时间选择器">
            <div class="demo-group">
              <h4>12小时制</h4>
              <a-time-picker
                v-model:value="timeValue3"
                format="h:mm:ss a"
                use12-hours
                placeholder="选择时间"
                style="width: 100%"
              />
              <div class="demo-result">
                <p><strong>选中时间：</strong>{{ timeValue3 || '未选择' }}</p>
              </div>
            </div>

            <div class="demo-group">
              <h4>时间范围选择</h4>
              <a-time-range-picker
                v-model:value="timeRangeValue"
                style="width: 100%"
              />
              <div class="demo-result">
                <p><strong>时间范围：</strong>{{ timeRangeValue?.join(' ~ ') || '未选择' }}</p>
              </div>
            </div>
          </a-card>
        </a-col>
      </a-row>
    </div>

    <!-- 修复前后对比 -->
    <div class="comparison-section">
      <a-card title="修复前后对比">
        <div class="comparison-content">
          <a-row :gutter="[24, 0]">
            <a-col :span="12">
              <h4>修复前（模拟固定背景色）</h4>
              <div class="before-demo">
                <div class="old-time-picker-panel">
                  <div class="old-time-column">
                    <div class="old-time-header">时</div>
                    <div class="old-time-cell">11</div>
                    <div class="old-time-cell">12</div>
                    <div class="old-time-cell old-selected-fixed">13</div>
                    <div class="old-time-cell">14</div>
                    <div class="old-time-cell">15</div>
                  </div>
                  <div class="old-time-column">
                    <div class="old-time-header">分</div>
                    <div class="old-time-cell">56</div>
                    <div class="old-time-cell old-selected-fixed">57</div>
                    <div class="old-time-cell">58</div>
                    <div class="old-time-cell">59</div>
                    <div class="old-time-cell">00</div>
                  </div>
                  <div class="old-time-column">
                    <div class="old-time-header">秒</div>
                    <div class="old-time-cell">16</div>
                    <div class="old-time-cell">17</div>
                    <div class="old-time-cell old-selected-fixed">18</div>
                    <div class="old-time-cell">19</div>
                    <div class="old-time-cell">20</div>
                  </div>
                </div>
                <p class="comparison-note error">❌ 使用固定色 #f0fffe，在暗色主题下区分度差</p>
              </div>
            </a-col>
            <a-col :span="12">
              <h4>修复后（使用主题变量）</h4>
              <div class="after-demo">
                <div class="new-time-picker-panel">
                  <div class="new-time-column">
                    <div class="new-time-header">时</div>
                    <div class="new-time-cell">11</div>
                    <div class="new-time-cell">12</div>
                    <div class="new-time-cell new-selected">13</div>
                    <div class="new-time-cell">14</div>
                    <div class="new-time-cell">15</div>
                  </div>
                  <div class="new-time-column">
                    <div class="new-time-header">分</div>
                    <div class="new-time-cell">56</div>
                    <div class="new-time-cell new-selected">57</div>
                    <div class="new-time-cell">58</div>
                    <div class="new-time-cell">59</div>
                    <div class="new-time-cell">00</div>
                  </div>
                  <div class="new-time-column">
                    <div class="new-time-header">秒</div>
                    <div class="new-time-cell">16</div>
                    <div class="new-time-cell">17</div>
                    <div class="new-time-cell new-selected">18</div>
                    <div class="new-time-cell">19</div>
                    <div class="new-time-cell">20</div>
                  </div>
                </div>
                <p class="comparison-note success">✅ 使用主题变量，在所有主题下都有良好区分度</p>
              </div>
            </a-col>
          </a-row>
        </div>
      </a-card>
    </div>

    <!-- 技术实现说明 -->
    <div class="technical-details">
      <a-card title="技术实现详情">
        <a-collapse>
          <a-collapse-panel key="specific-selector" header="特定选择器修复">
            <div class="code-example">
              <p>针对您提到的具体CSS选择器进行修复：</p>
              <pre><code>/* 针对您提到的具体选择器修复 */
:where(.css-dev-only-do-not-override-1onovbn).ant-picker-dropdown 
.ant-picker-time-panel-column > li.ant-picker-time-panel-cell-selected 
.ant-picker-time-panel-cell-inner {
  background-color: var(--bg-primary) !important;
  color: var(--accent-color) !important;
  border: 1px solid var(--accent-color) !important;
}

/* 全局TimePicker选中项修复 - 覆盖所有可能的固定背景色 */
.ant-picker-dropdown .ant-picker-time-panel-column > li.ant-picker-time-panel-cell-selected 
.ant-picker-time-panel-cell-inner {
  background-color: var(--bg-primary) !important;
  color: var(--accent-color) !important;
  border: 1px solid var(--accent-color) !important;
}</code></pre>
            </div>
          </a-collapse-panel>
          
          <a-collapse-panel key="color-theory" header="主题色彩设计原理">
            <div class="code-example">
              <p>选择主题变量的原因：</p>
              <pre><code>/* 颜色选择原理 */

/* 1. 背景色选择 */
background-color: var(--bg-primary);
/* 使用主背景色，确保在暗色主题下有足够的对比度 */

/* 2. 文字色选择 */
color: var(--accent-color);
/* 使用主题强调色，确保醒目且与主题一致 */

/* 3. 边框色选择 */
border: 1px solid var(--accent-color);
/* 使用强调色边框，增强视觉区分度 */

/* 4. 字重增强 */
font-weight: 500;
/* 适度增加字重，提升选中状态的识别度 */</code></pre>
            </div>
          </a-collapse-panel>
          
          <a-collapse-panel key="accessibility" header="可访问性改进">
            <div class="code-example">
              <p>确保在所有主题下的可访问性：</p>
              <pre><code>/* 可访问性考虑 */

/* 1. 对比度保证 */
/* 使用主题变量确保在亮色和暗色主题下都有足够的对比度 */

/* 2. 悬停状态增强 */
:hover .ant-picker-time-panel-cell-inner {
  background-color: var(--accent-color) !important;
  color: white !important;
}

/* 3. 视觉区分增强 */
/* 通过边框、字重等多重视觉元素确保选中状态明显 */

/* 4. 主题一致性 */
/* 与Select、Cascader、DatePicker保持完全一致的设计语言 */</code></pre>
            </div>
          </a-collapse-panel>
          
          <a-collapse-panel key="button-border-fix" header="确定按钮边框修复">
            <div class="code-example">
              <p>修复TimePicker确定按钮的白色边框问题：</p>
              <pre><code>/* 修复确定按钮的白色边框问题 */
.ant-picker-footer .ant-btn-primary {
  background-color: var(--accent-color) !important;
  border-color: var(--accent-color) !important;
  color: white !important;
  box-shadow: none !important;
}

.ant-picker-footer .ant-btn-primary:hover {
  background-color: var(--accent-hover) !important;
  border-color: var(--accent-hover) !important;
  color: white !important;
  box-shadow: none !important;
}

/* 深度选择器修复 */
::deep(.ant-picker-footer .ant-btn-primary) {
  background-color: var(--accent-color) !important;
  border-color: var(--accent-color) !important;
  color: white !important;
  box-shadow: none !important;
}</code></pre>
            </div>
          </a-collapse-panel>
        </a-collapse>
      </a-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ThemeSelector from '~/components/ThemeSelector.vue'

// 页面标题
useHead({
  title: 'TimePicker 选中状态修复演示'
})

// 响应式数据
const timeValue1 = ref()
const timeValue2 = ref()
const timeValue3 = ref()
const timeRangeValue = ref()
</script>

<style scoped>
.time-picker-selected-fix-demo {
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

.problem-content p {
  color: var(--text-secondary);
  margin-bottom: 12px;
}

.css-selector {
  background: var(--bg-tertiary);
  padding: 12px;
  border-radius: 6px;
  border: 1px solid var(--border-color);
  margin: 12px 0;
}

.css-selector code {
  color: var(--accent-color);
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 13px;
  word-break: break-all;
}

.color-badge {
  padding: 2px 8px;
  border-radius: 4px;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 12px;
  border: 1px solid #ccc;
}

.problem-content ul {
  color: var(--text-secondary);
  padding-left: 24px;
}

.problem-content li {
  margin-bottom: 8px;
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

.demo-result {
  margin-top: 12px;
  padding: 8px 12px;
  background: var(--bg-tertiary);
  border-radius: 6px;
  border: 1px solid var(--border-color);
}

.demo-result p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 14px;
}

.comparison-section {
  margin-bottom: 32px;
}

.comparison-content h4 {
  color: var(--text-primary);
  margin-bottom: 16px;
  font-size: 16px;
}

.before-demo, .after-demo {
  background: var(--bg-tertiary);
  padding: 16px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

/* 修复前的时间选择器样式（模拟固定背景色） */
.old-time-picker-panel {
  display: flex;
  gap: 16px;
  background: var(--bg-secondary);
  border-radius: 6px;
  padding: 16px;
  border: 1px solid var(--border-color);
}

.old-time-column {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 60px;
}

.old-time-header {
  text-align: center;
  color: var(--text-primary);
  font-weight: 500;
  margin-bottom: 8px;
  font-size: 14px;
}

.old-time-cell {
  padding: 6px 12px;
  text-align: center;
  color: var(--text-primary);
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.old-time-cell:hover {
  background-color: var(--bg-tertiary);
}

.old-time-cell.old-selected-fixed {
  background-color: #f0fffe !important; /* 固定的问题颜色 */
  color: #000 !important;
  border: 1px solid #d9f7be;
}

/* 修复后的时间选择器样式（使用主题变量） */
.new-time-picker-panel {
  display: flex;
  gap: 16px;
  background: var(--bg-secondary);
  border-radius: 6px;
  padding: 16px;
  border: 1px solid var(--border-color);
}

.new-time-column {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 60px;
}

.new-time-header {
  text-align: center;
  color: var(--text-primary);
  font-weight: 500;
  margin-bottom: 8px;
  font-size: 14px;
}

.new-time-cell {
  padding: 6px 12px;
  text-align: center;
  color: var(--text-primary);
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.new-time-cell:hover {
  background-color: var(--bg-tertiary);
}

.new-time-cell.new-selected {
  background-color: var(--bg-primary) !important;
  color: var(--accent-color) !important;
  border: 1px solid var(--accent-color) !important;
  font-weight: 500;
}

.comparison-note {
  margin-top: 12px;
  font-size: 14px;
  font-weight: 500;
}

.comparison-note.error {
  color: #ff4d4f;
}

.comparison-note.success {
  color: #52c41a;
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