<template>
  <div class="pageimage-modal-fix-demo">
    <!-- 页面标题 -->
    <div class="demo-header">
      <h1>pageImage 组件 Modal 按钮修复演示</h1>
      <p>专门解决 pageImage 组件中 Modal 确认按钮的白色底纹问题</p>
      
      <!-- 主题切换器 -->
      <div class="theme-switcher">
        <ThemeSelector />
      </div>
    </div>

    <!-- 问题说明 -->
    <div class="problem-explanation">
      <a-card title="修复的具体问题">
        <div class="problem-content">
          <h3>pageImage 组件的问题：</h3>
          <ul>
            <li><strong>白色底纹问题</strong> - Modal 确认按钮在暗色主题下显示明显的白色底纹</li>
            <li><strong>组件级样式穿透</strong> - 全局样式可能无法完全覆盖组件内的样式</li>
            <li><strong>Ant Design Vue 特殊类名</strong> - 某些特定的 CSS 类名优先级很高</li>
            <li><strong>内联样式干扰</strong> - 可能存在内联样式覆盖了主题样式</li>
          </ul>
          
          <h3>修复策略：</h3>
          <ul>
            <li><strong>双重保障</strong> - 全局样式 + 组件级样式修复</li>
            <li><strong>多重选择器</strong> - 使用多种CSS选择器确保覆盖</li>
            <li><strong>强制覆盖</strong> - 添加 <code>!important</code> 和 <code>background-image: none</code></li>
            <li><strong>状态完整覆盖</strong> - 包括 hover、focus、active 所有状态</li>
            <li><strong>伪元素清理</strong> - 移除可能影响的 ::before 和 ::after</li>
          </ul>
        </div>
      </a-card>
    </div>

    <!-- pageImage 组件演示 -->
    <div class="fix-demo-section">
      <a-row :gutter="[24, 24]">
        <a-col :span="12">
          <a-card title="pageImage 组件演示">
            <div class="demo-group">
              <h4>原始的 pageImage 组件</h4>
              <p class="demo-desc">点击按钮打开与您遇到问题相同的弹窗</p>
              <a-button type="primary" @click="showImageModal">
                打开图片上传弹窗
              </a-button>
            </div>
          </a-card>
        </a-col>

        <a-col :span="12">
          <a-card title="修复验证">
            <div class="demo-group">
              <h4>检查修复效果</h4>
              <p class="demo-desc">观察确认按钮是否还有白色底纹</p>
              <div class="check-list">
                <div class="check-item">
                  <span class="check-icon">✅</span>
                  <span>确认按钮使用主题色背景</span>
                </div>
                <div class="check-item">
                  <span class="check-icon">✅</span>
                  <span>没有白色底纹或边框</span>
                </div>
                <div class="check-item">
                  <span class="check-icon">✅</span>
                  <span>悬停状态颜色协调</span>
                </div>
                <div class="check-item">
                  <span class="check-icon">✅</span>
                  <span>与暗色主题完美融合</span>
                </div>
              </div>
            </div>
          </a-card>
        </a-col>

        <a-col :span="24">
          <a-card title="修复前后对比">
            <div class="comparison-content">
              <a-row :gutter="[24, 0]">
                <a-col :span="12">
                  <h4>修复前（模拟问题）</h4>
                  <div class="before-demo">
                    <div class="old-modal-preview">
                      <div class="old-modal-header">新建载图</div>
                      <div class="old-modal-body">
                        <div class="upload-area-mock">
                          <p>图片上传区域</p>
                        </div>
                      </div>
                      <div class="old-modal-footer">
                        <button class="old-cancel-btn">取消</button>
                        <button class="old-confirm-btn-broken">确认</button>
                      </div>
                    </div>
                    <p class="comparison-note error">❌ 确认按钮有明显的白色底纹</p>
                  </div>
                </a-col>
                <a-col :span="12">
                  <h4>修复后（当前效果）</h4>
                  <div class="after-demo">
                    <div class="new-modal-preview">
                      <div class="new-modal-header">新建载图</div>
                      <div class="new-modal-body">
                        <div class="upload-area-mock">
                          <p>图片上传区域</p>
                        </div>
                      </div>
                      <div class="new-modal-footer">
                        <a-button>取消</a-button>
                        <a-button type="primary">确认</a-button>
                      </div>
                    </div>
                    <p class="comparison-note success">✅ 使用主题色，完全适配暗色主题</p>
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
          <a-collapse-panel key="global-fix" header="全局样式修复">
            <div class="code-example">
              <p>在 main.css 中的全局修复：</p>
              <pre><code>/* 修复Modal弹窗确认按钮的白色底纹问题 - 加强版 */
.ant-modal-footer .ant-btn-primary {
  background-color: var(--accent-color) !important;
  border-color: var(--accent-color) !important;
  color: white !important;
  box-shadow: none !important;
  background-image: none !important;
  outline: none !important;
}

/* 强制覆盖任何内联样式的白色底纹 */
div[class*="ant-modal"] button[class*="ant-btn-primary"][style] {
  background-color: var(--accent-color) !important;
  border-color: var(--accent-color) !important;
  color: white !important;
  box-shadow: none !important;
  background-image: none !important;
}</code></pre>
            </div>
          </a-collapse-panel>
          
          <a-collapse-panel key="component-fix" header="组件级样式修复">
            <div class="code-example">
              <p>在 pageImage.vue 组件中的局部修复：</p>
              <pre><code>/* 局部Modal确认按钮修复 - 彻底解决白色底纹问题 */
:deep(.ant-modal-footer .ant-btn-primary) {
  background-color: var(--accent-color) !important;
  border-color: var(--accent-color) !important;
  color: white !important;
  box-shadow: none !important;
  background-image: none !important;
  outline: none !important;
}

/* 强制覆盖任何内联样式的白色底纹 */
:deep(.ant-modal-footer button[style]) {
  background-color: var(--accent-color) !important;
  border-color: var(--accent-color) !important;
  color: white !important;
  box-shadow: none !important;
  background-image: none !important;
}</code></pre>
            </div>
          </a-collapse-panel>
          
          <a-collapse-panel key="anti-design-specifics" header="Ant Design 特殊处理">
            <div class="code-example">
              <p>针对 Ant Design Vue 特殊类名的处理：</p>
              <pre><code>/* 覆盖Ant Design的特定类名 */
:deep(.css-dev-only-do-not-override-1onovbn.ant-btn-primary) {
  background-color: var(--accent-color) !important;
  border-color: var(--accent-color) !important;
  color: white !important;
  box-shadow: none !important;
  background-image: none !important;
}

/* 针对可能的伪元素 */
.ant-modal-footer .ant-btn-primary::before,
.ant-modal-footer .ant-btn-primary::after {
  display: none !important;
}</code></pre>
            </div>
          </a-collapse-panel>
        </a-collapse>
      </a-card>
    </div>

    <!-- pageImage 组件实例 -->
    <PageImage 
      v-model:open="imageModalVisible" 
      image-title="新建载图"
      :other-params="{ fissionNum: 1 }"
      @success="handleSuccess"
      @close="handleClose"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ThemeSelector from '~/components/ThemeSelector.vue'
import PageImage from '~/components/common/pageImage.vue'

// 页面标题
useHead({
  title: 'pageImage Modal 按钮修复演示'
})

// 弹窗状态
const imageModalVisible = ref(false)

// 弹窗处理函数
const showImageModal = () => {
  imageModalVisible.value = true
}

const handleSuccess = () => {
  console.log('图片上传成功')
}

const handleClose = () => {
  console.log('弹窗关闭')
}
</script>

<style scoped>
.pageimage-modal-fix-demo {
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
  text-align: center;
}

.demo-group h4 {
  color: var(--text-primary);
  margin-bottom: 12px;
  font-size: 16px;
}

.demo-desc {
  margin: 12px 0;
  color: var(--text-secondary);
  font-size: 14px;
}

.check-list {
  text-align: left;
  margin-top: 16px;
}

.check-item {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  color: var(--text-primary);
}

.check-icon {
  margin-right: 8px;
  color: #52c41a;
  font-weight: bold;
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

/* 修复前的Modal预览（模拟问题） */
.old-modal-preview {
  background: var(--bg-secondary);
  border-radius: 8px;
  border: 1px solid var(--border-color);
  overflow: hidden;
}

.old-modal-header {
  padding: 16px 20px;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
  color: var(--text-primary);
  font-weight: 500;
}

.old-modal-body {
  padding: 20px;
  background: var(--bg-secondary);
}

.upload-area-mock {
  text-align: center;
  padding: 32px;
  border: 2px dashed var(--border-color);
  border-radius: 6px;
  background: var(--bg-tertiary);
  color: var(--text-secondary);
}

.old-modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 20px;
  background: var(--bg-secondary);
  border-top: 1px solid var(--border-color);
}

.old-cancel-btn {
  padding: 8px 16px;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  border-radius: 4px;
  cursor: pointer;
}

.old-confirm-btn-broken {
  padding: 8px 16px;
  background: #1677ff;
  border: 1px solid #ffffff; /* 模拟白色边框问题 */
  color: white;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(255, 255, 255, 0.1); /* 模拟白色阴影 */
  position: relative;
}

.old-confirm-btn-broken::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.1); /* 模拟白色底纹 */
  pointer-events: none;
}

/* 修复后的Modal预览 */
.new-modal-preview {
  background: var(--bg-secondary);
  border-radius: 8px;
  border: 1px solid var(--border-color);
  overflow: hidden;
}

.new-modal-header {
  padding: 16px 20px;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
  color: var(--text-primary);
  font-weight: 500;
}

.new-modal-body {
  padding: 20px;
  background: var(--bg-secondary);
}

.new-modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 20px;
  background: var(--bg-secondary);
  border-top: 1px solid var(--border-color);
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