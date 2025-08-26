<template>
  <div class="cascader-fix-demo">
    <!-- 页面标题 -->
    <div class="demo-header">
      <h1>Cascader 级联选择器暗色主题修复演示</h1>
      <p>解决级联选择器在暗色主题下白色背景的问题</p>
      
      <!-- 主题切换器 -->
      <div class="theme-switcher">
        <ThemeSelector />
      </div>
    </div>

    <!-- 问题说明 -->
    <div class="problem-explanation">
      <a-card title="修复内容">
        <div class="problem-content">
          <h3>修复的问题：</h3>
          <ul>
            <li><strong>白色背景问题</strong> - 级联选择器下拉选项使用固定的白色背景，在暗色主题下不协调</li>
            <li><strong>选中状态不一致</strong> - 与 Select 下拉框的选中状态样式不统一</li>
            <li><strong>文字对比度问题</strong> - 在某些背景下文字可读性差</li>
            <li><strong>边框颜色不适配</strong> - 使用固定颜色而非主题变量</li>
          </ul>
          
          <h3>修复方案：</h3>
          <ul>
            <li>使用 <code>var(--bg-primary)</code> 替代固定的白色背景</li>
            <li>选中状态使用 <code>var(--accent-color)</code> 主题色</li>
            <li>统一悬停状态为 <code>var(--bg-tertiary)</code></li>
            <li>添加多重样式选择器确保覆盖优先级</li>
          </ul>
        </div>
      </a-card>
    </div>

    <!-- 修复效果展示 -->
    <div class="fix-demo-section">
      <a-row :gutter="[24, 24]">
        <!-- 基础级联选择器 -->
        <a-col :span="12">
          <a-card title="基础级联选择器">
            <div class="demo-group">
              <h4>地区选择</h4>
              <a-cascader
                v-model:value="regionValue"
                :options="regionOptions"
                placeholder="请选择地区"
                :show-search="true"
                style="width: 100%"
              />
              <div class="demo-result">
                <p><strong>选中值：</strong>{{ regionValue?.join(' / ') || '未选择' }}</p>
              </div>
            </div>
          </a-card>
        </a-col>

        <!-- 多选级联选择器 -->
        <a-col :span="12">
          <a-card title="多选级联选择器">
            <div class="demo-group">
              <h4>技能选择</h4>
              <a-cascader
                v-model:value="skillsValue"
                :options="skillsOptions"
                :multiple="true"
                :max-tag-count="2"
                placeholder="请选择技能"
                style="width: 100%"
              />
              <div class="demo-result">
                <p><strong>选中数量：</strong>{{ skillsValue?.length || 0 }} 项</p>
              </div>
            </div>
          </a-card>
        </a-col>

        <!-- 简单对比演示 -->
        <a-col :span="24">
          <a-card title="修复前后对比">
            <div class="comparison-content">
              <a-row :gutter="[24, 0]">
                <a-col :span="12">
                  <h4>修复前（模拟）</h4>
                  <div class="before-demo">
                    <div class="old-cascader-dropdown">
                      <div class="old-menu">
                        <div class="old-menu-item">北京市</div>
                        <div class="old-menu-item old-active">上海市</div>
                        <div class="old-menu-item">广东省</div>
                      </div>
                      <div class="old-menu">
                        <div class="old-menu-item">浦东新区</div>
                        <div class="old-menu-item old-active">徐汇区</div>
                        <div class="old-menu-item">黄浦区</div>
                      </div>
                    </div>
                    <p class="comparison-note error">❌ 白色背景在暗色主题下突兀</p>
                  </div>
                </a-col>
                <a-col :span="12">
                  <h4>修复后（当前效果）</h4>
                  <div class="after-demo">
                    <a-cascader
                      v-model:value="demoValue"
                      :options="demoOptions"
                      placeholder="查看修复效果"
                      style="width: 100%"
                    />
                    <p class="comparison-note success">✅ 使用主题色，视觉一致</p>
                  </div>
                </a-col>
              </a-row>
            </div>
          </a-card>
        </a-col>
      </a-row>
    </div>

    <!-- 技术实现说明 -->
    <div class="technical-details">
      <a-card title="技术实现详情">
        <a-collapse>
          <a-collapse-panel key="css-fixes" header="CSS 修复规则">
            <div class="code-example">
              <p>Cascader 组件的完整样式修复：</p>
              <pre><code>/* Cascader 下拉面板背景 */
.ant-cascader-dropdown {
  background-color: var(--bg-secondary) !important;
  border-color: var(--border-color) !important;
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.3) !important;
}

/* Cascader 菜单项选中状态 */
.ant-cascader-menu-item-active {
  background-color: var(--bg-primary) !important;
  color: var(--accent-color) !important;
}

/* 使用 ::deep() 确保样式穿透 */
::deep(.ant-cascader-dropdown .ant-cascader-menu-item-active) {
  background-color: var(--bg-primary) !important;
  color: var(--accent-color) !important;
}</code></pre>
            </div>
          </a-collapse-panel>
          
          <a-collapse-panel key="multiple-selectors" header="多重选择器策略">
            <div class="code-example">
              <p>使用多种选择器确保修复生效：</p>
              <pre><code>/* 特定 CSS 类名修复 */
:where(.css-dev-only-do-not-override-1onovbn).ant-cascader-dropdown .ant-cascader-menu-item-active {
  background-color: var(--bg-primary) !important;
  color: var(--accent-color) !important;
}

/* 属性选择器修复 */
*[class*="ant-cascader-menu-item-active"] {
  background-color: var(--bg-primary) !important;
  color: var(--accent-color) !important;
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
  title: 'Cascader 级联选择器修复演示'
})

// 响应式数据
const regionValue = ref<string[]>([])
const skillsValue = ref<string[][]>([])
const demoValue = ref<string[]>(['shanghai', 'xuhui'])

// 地区选择数据
const regionOptions = [
  {
    value: 'beijing',
    label: '北京市',
    children: [
      { value: 'chaoyang', label: '朝阳区' },
      { value: 'haidian', label: '海淀区' },
      { value: 'dongcheng', label: '东城区' }
    ]
  },
  {
    value: 'shanghai',
    label: '上海市',
    children: [
      { value: 'pudong', label: '浦东新区' },
      { value: 'xuhui', label: '徐汇区' },
      { value: 'huangpu', label: '黄浦区' }
    ]
  },
  {
    value: 'guangdong',
    label: '广东省',
    children: [
      {
        value: 'guangzhou',
        label: '广州市',
        children: [
          { value: 'tianhe', label: '天河区' },
          { value: 'yuexiu', label: '越秀区' }
        ]
      },
      {
        value: 'shenzhen',
        label: '深圳市',
        children: [
          { value: 'futian', label: '福田区' },
          { value: 'nanshan', label: '南山区' }
        ]
      }
    ]
  }
]

// 技能选择数据
const skillsOptions = [
  {
    value: 'frontend',
    label: '前端开发',
    children: [
      { value: 'vue', label: 'Vue.js' },
      { value: 'react', label: 'React' },
      { value: 'angular', label: 'Angular' }
    ]
  },
  {
    value: 'backend',
    label: '后端开发',
    children: [
      { value: 'java', label: 'Java' },
      { value: 'python', label: 'Python' },
      { value: 'nodejs', label: 'Node.js' }
    ]
  },
  {
    value: 'design',
    label: '设计',
    children: [
      { value: 'ui', label: 'UI设计' },
      { value: 'ux', label: 'UX设计' },
      { value: 'graphic', label: '平面设计' }
    ]
  }
]

// 演示数据
const demoOptions = [
  {
    value: 'shanghai',
    label: '上海市',
    children: [
      { value: 'xuhui', label: '徐汇区' },
      { value: 'pudong', label: '浦东新区' }
    ]
  }
]
</script>

<style scoped>
.cascader-fix-demo {
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

.comparison-content h4 {
  color: var(--text-primary);
  margin-bottom: 16px;
  font-size: 16px;
}

.before-demo {
  background: var(--bg-tertiary);
  padding: 16px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

.old-cascader-dropdown {
  display: flex;
  background: white;
  border-radius: 6px;
  border: 1px solid #d9d9d9;
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.old-menu {
  width: 150px;
  border-right: 1px solid #f0f0f0;
}

.old-menu:last-child {
  border-right: none;
}

.old-menu-item {
  padding: 8px 12px;
  color: #000;
  cursor: pointer;
  transition: background-color 0.2s;
}

.old-menu-item:hover {
  background-color: #f5f5f5;
}

.old-menu-item.old-active {
  background-color: #1677ff;
  color: white;
}

.after-demo {
  background: var(--bg-tertiary);
  padding: 16px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
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

/* 确保级联选择器使用正确的主题样式 */
:deep(.ant-cascader) {
  width: 100%;
}

:deep(.ant-cascader .ant-select-selector) {
  background-color: var(--bg-tertiary);
  border-color: var(--border-color);
  color: var(--text-primary);
}

:deep(.ant-cascader .ant-select-selection-placeholder) {
  color: var(--text-tertiary);
}
</style>