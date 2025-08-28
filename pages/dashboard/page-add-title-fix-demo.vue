<template>
  <div class="page-add-title-fix-demo">
    <!-- 页面标题 -->
    <div class="demo-header">
      <h1>pageAddTitle 组件主题修复演示</h1>
      <p>解决组件配色不统一和按钮在暗色主题下不可见的问题</p>
      
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
            <li><strong>配色不统一</strong> - 使用固定颜色值如 #ff6b35、#262626 等，未遵循主题系统</li>
            <li><strong>按钮在暗色主题下不可见</strong> - "选择商品"和"提交任务"按钮缺少主题适配</li>
            <li><strong>文字对比度不足</strong> - 在暗色背景下某些文字颜色不易阅读</li>
            <li><strong>边框和背景色不适配</strong> - 使用固定的浅色值，与暗色主题不协调</li>
          </ul>
          
          <h3>修复方案：</h3>
          <ul>
            <li>使用 CSS 变量替代所有固定颜色值</li>
            <li>按钮颜色统一使用 <code>var(--accent-color)</code></li>
            <li>文字颜色使用 <code>var(--text-primary)</code> 和 <code>var(--text-secondary)</code></li>
            <li>背景色使用 <code>var(--bg-secondary)</code> 和 <code>var(--bg-tertiary)</code></li>
            <li>边框色使用 <code>var(--border-color)</code></li>
          </ul>
        </div>
      </a-card>
    </div>

    <!-- 修复效果展示 -->
    <div class="fix-demo-section">
      <a-row :gutter="[24, 24]">
        <!-- 修复前后对比 -->
        <a-col :span="24">
          <a-card title="修复前后对比">
            <div class="comparison-content">
              <a-row :gutter="[24, 0]">
                <a-col :span="12">
                  <h4>修复前（模拟）</h4>
                  <div class="before-demo">
                    <div class="old-form-section">
                      <div class="old-section-header">
                        <h3 class="old-section-title">生成规则设置</h3>
                        <button class="old-preset-btn">使用预设</button>
                      </div>
                      <div class="old-textarea-area">
                        <textarea class="old-textarea" placeholder="请描述你要AI生成标题的要求" rows="3"></textarea>
                      </div>
                    </div>
                    <div class="old-product-area">
                      <div class="old-empty-state">
                        <button class="old-select-btn">选择商品</button>
                        <p class="old-select-tip">点击选择商品</p>
                      </div>
                    </div>
                    <p class="comparison-note error">❌ 固定颜色在暗色主题下不协调</p>
                  </div>
                </a-col>
                <a-col :span="12">
                  <h4>修复后（当前效果）</h4>
                  <div class="after-demo">
                    <div class="new-form-section">
                      <div class="new-section-header">
                        <h3 class="new-section-title">生成规则设置</h3>
                        <a-button type="link" class="new-preset-btn">使用预设</a-button>
                      </div>
                      <a-textarea
                        placeholder="请描述你要AI生成标题的要求"
                        :rows="3"
                        class="new-textarea"
                      />
                    </div>
                    <div class="new-product-area">
                      <div class="new-empty-state">
                        <a-button type="primary" class="new-select-btn">选择商品</a-button>
                        <p class="new-select-tip">点击选择商品</p>
                      </div>
                    </div>
                    <p class="comparison-note success">✅ 使用主题变量，适配所有主题</p>
                  </div>
                </a-col>
              </a-row>
            </div>
          </a-card>
        </a-col>

        <!-- 按钮样式对比 -->
        <a-col :span="12">
          <a-card title="按钮样式对比">
            <div class="button-demo">
              <h4>修复前的固定颜色按钮</h4>
              <div class="old-buttons">
                <button class="old-primary-btn">提交任务</button>
                <button class="old-secondary-btn">取消</button>
                <button class="old-link-btn">使用预设</button>
              </div>
              
              <h4 style="margin-top: 24px;">修复后的主题适配按钮</h4>
              <div class="new-buttons">
                <a-button type="primary">提交任务</a-button>
                <a-button>取消</a-button>
                <a-button type="link">使用预设</a-button>
              </div>
            </div>
          </a-card>
        </a-col>

        <!-- 表单元素对比 -->
        <a-col :span="12">
          <a-card title="表单元素对比">
            <div class="form-demo">
              <h4>修复前的固定样式</h4>
              <div class="old-form-elements">
                <div class="old-product-item">
                  <div class="old-product-image"></div>
                  <div class="old-product-info">
                    <div class="old-product-name">商品名称</div>
                    <div class="old-product-category">商品分类</div>
                  </div>
                </div>
              </div>
              
              <h4 style="margin-top: 24px;">修复后的主题适配</h4>
              <div class="new-form-elements">
                <div class="new-product-item">
                  <div class="new-product-image"></div>
                  <div class="new-product-info">
                    <div class="new-product-name">商品名称</div>
                    <div class="new-product-category">商品分类</div>
                  </div>
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
          <a-collapse-panel key="css-variables" header="CSS 变量使用">
            <div class="code-example">
              <p>将固定颜色替换为主题变量：</p>
              <pre><code>/* 修复前 */
.section-title {
  color: #262626;
}
.preset-btn {
  color: #ff6b35;
}
.product-area {
  background-color: #fafafa;
  border: 2px dashed #d9d9d9;
}

/* 修复后 */
.section-title {
  color: var(--text-primary);
}
.preset-btn {
  color: var(--accent-color);
}
.product-area {
  background-color: var(--bg-tertiary);
  border: 2px dashed var(--border-color);
}</code></pre>
            </div>
          </a-collapse-panel>
          
          <a-collapse-panel key="button-theming" header="按钮主题化">
            <div class="code-example">
              <p>统一按钮样式使用主题色：</p>
              <pre><code>/* 主要按钮 */
.modal-footer .ant-btn-primary {
  background-color: var(--accent-color);
  border-color: var(--accent-color);
  color: white;
}

.modal-footer .ant-btn-primary:hover {
  background-color: var(--accent-hover);
  border-color: var(--accent-hover);
}

/* 次要按钮 */
.modal-footer .ant-btn:not(.ant-btn-primary) {
  background-color: var(--bg-tertiary);
  border-color: var(--border-color);
  color: var(--text-primary);
}</code></pre>
            </div>
          </a-collapse-panel>
          
          <a-collapse-panel key="modal-theming" header="弹窗组件主题化">
            <div class="code-example">
              <p>使用 ::deep() 修复 Ant Design 组件样式：</p>
              <pre><code>/* 弹窗暗色主题适配 */
:deep(.ant-modal-content) {
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
}

:deep(.ant-modal-title) {
  color: var(--text-primary);
}

/* 输入框主题适配 */
:deep(.ant-input) {
  background-color: var(--bg-tertiary);
  border-color: var(--border-color);
  color: var(--text-primary);
}</code></pre>
            </div>
          </a-collapse-panel>
        </a-collapse>
      </a-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import ThemeSelector from '~/components/ThemeSelector.vue'

// 页面标题
useHead({
  title: 'pageAddTitle 组件主题修复演示'
})
</script>

<style scoped>
.page-add-title-fix-demo {
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
  min-height: 300px;
}

/* 修复前的旧样式 */
.old-form-section {
  margin-bottom: 16px;
}

.old-section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.old-section-title {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  color: #262626; /* 固定颜色 */
}

.old-preset-btn {
  padding: 4px 8px;
  background: none;
  border: none;
  color: #ff6b35; /* 固定颜色 */
  cursor: pointer;
  font-size: 14px;
}

.old-textarea {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d9d9d9; /* 固定颜色 */
  border-radius: 6px;
  background-color: #fff; /* 固定颜色 */
  color: #000; /* 固定颜色 */
  resize: vertical;
}

.old-product-area {
  min-height: 120px;
  border: 2px dashed #d9d9d9; /* 固定颜色 */
  border-radius: 6px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fafafa; /* 固定颜色 */
}

.old-select-btn {
  padding: 8px 24px;
  background-color: #ff6b35; /* 固定颜色 */
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 12px;
}

.old-select-tip {
  margin: 0;
  color: #8c8c8c; /* 固定颜色 */
  font-size: 14px;
}

/* 修复后的新样式 */
.new-form-section {
  margin-bottom: 16px;
}

.new-section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.new-section-title {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  color: var(--text-primary);
}

.new-preset-btn {
  color: var(--accent-color);
}

.new-textarea {
  background-color: var(--bg-tertiary);
  border-color: var(--border-color);
  color: var(--text-primary);
}

.new-product-area {
  min-height: 120px;
  border: 2px dashed var(--border-color);
  border-radius: 6px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--bg-tertiary);
}

.new-select-btn {
  background-color: var(--accent-color);
  border-color: var(--accent-color);
  margin-bottom: 12px;
}

.new-select-tip {
  margin: 0;
  color: var(--text-secondary);
  font-size: 14px;
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

/* 按钮演示样式 */
.button-demo h4 {
  color: var(--text-primary);
  margin-bottom: 12px;
}

.old-buttons, .new-buttons {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.old-primary-btn {
  padding: 8px 24px;
  background-color: #ff6b35;
  color: white;
  border: 1px solid #ff6b35;
  border-radius: 6px;
  cursor: pointer;
}

.old-secondary-btn {
  padding: 8px 24px;
  background-color: #fff;
  color: #000;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
}

.old-link-btn {
  padding: 8px 12px;
  background: none;
  color: #ff6b35;
  border: none;
  cursor: pointer;
}

/* 表单元素演示 */
.form-demo h4 {
  color: var(--text-primary);
  margin-bottom: 12px;
}

.old-product-item, .new-product-item {
  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 8px;
}

.old-product-item {
  border: 1px solid #f0f0f0;
  background-color: #fafafa;
}

.new-product-item {
  border: 1px solid var(--border-color);
  background-color: var(--bg-tertiary);
}

.old-product-image, .new-product-image {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  margin-right: 12px;
  background: linear-gradient(45deg, #ccc 25%, transparent 25%), 
              linear-gradient(-45deg, #ccc 25%, transparent 25%), 
              linear-gradient(45deg, transparent 75%, #ccc 75%), 
              linear-gradient(-45deg, transparent 75%, #ccc 75%);
  background-size: 8px 8px;
  background-position: 0 0, 0 4px, 4px -4px, -4px 0px;
}

.old-product-name {
  font-size: 14px;
  color: #262626;
  margin-bottom: 4px;
  font-weight: 500;
}

.old-product-category {
  font-size: 12px;
  color: #8c8c8c;
}

.new-product-name {
  font-size: 14px;
  color: var(--text-primary);
  margin-bottom: 4px;
  font-weight: 500;
}

.new-product-category {
  font-size: 12px;
  color: var(--text-secondary);
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