<template>
  <div class="modal-button-fix-demo">
    <!-- 页面标题 -->
    <div class="demo-header">
      <h1>Modal 弹窗确认按钮修复演示</h1>
      <p>解决Modal弹窗确认按钮在暗色主题下的白色底纹问题</p>
      
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
          <ul>
            <li><strong>白色底纹问题</strong> - Modal弹窗的确认按钮在暗色主题下显示白色底纹，看起来很不协调</li>
            <li><strong>边框不一致</strong> - 按钮边框颜色与主题色不匹配</li>
            <li><strong>阴影效果突兀</strong> - 默认的按钮阴影在暗色背景下显得生硬</li>
            <li><strong>状态变化不协调</strong> - 悬停、聚焦状态的颜色过渡不自然</li>
          </ul>
          
          <h3>修复方案：</h3>
          <ul>
            <li>统一确认按钮背景色：<code>var(--accent-color)</code></li>
            <li>统一确认按钮边框色：<code>var(--accent-color)</code></li>
            <li>移除白色底纹和阴影：<code>box-shadow: none</code></li>
            <li>适配取消按钮：使用主题变量确保协调</li>
            <li>覆盖所有状态：悬停、聚焦、激活状态的完整修复</li>
          </ul>
        </div>
      </a-card>
    </div>

    <!-- 修复效果展示 -->
    <div class="fix-demo-section">
      <a-row :gutter="[24, 24]">
        <!-- 不同类型的Modal -->
        <a-col :span="8">
          <a-card title="基础确认弹窗">
            <div class="demo-group">
              <a-button type="primary" @click="showBasicModal">
                打开基础弹窗
              </a-button>
              <p class="demo-desc">基础的确认/取消弹窗</p>
            </div>
          </a-card>
        </a-col>

        <a-col :span="8">
          <a-card title="自定义内容弹窗">
            <div class="demo-group">
              <a-button type="primary" @click="showCustomModal">
                打开自定义弹窗
              </a-button>
              <p class="demo-desc">包含表单内容的弹窗</p>
            </div>
          </a-card>
        </a-col>

        <a-col :span="8">
          <a-card title="危险操作弹窗">
            <div class="demo-group">
              <a-button type="primary" danger @click="showDangerModal">
                打开危险操作弹窗
              </a-button>
              <p class="demo-desc">危险操作确认弹窗</p>
            </div>
          </a-card>
        </a-col>

        <!-- pageImage组件演示 -->
        <a-col :span="12">
          <a-card title="pageImage 组件演示">
            <div class="demo-group">
              <a-button type="primary" @click="showImageModal">
                打开图片上传弹窗
              </a-button>
              <p class="demo-desc">模拟您遇到问题的 pageImage 组件</p>
            </div>
          </a-card>
        </a-col>

        <!-- 按钮状态展示 -->
        <a-col :span="12">
          <a-card title="按钮状态展示">
            <div class="demo-group">
              <h4>修复后的按钮状态</h4>
              <div class="button-states">
                <a-button type="primary" class="state-btn">正常状态</a-button>
                <a-button type="primary" class="state-btn button-hover">悬停状态</a-button>
                <a-button type="primary" class="state-btn">聚焦状态</a-button>
                <a-button class="state-btn">取消按钮</a-button>
              </div>
            </div>
          </a-card>
        </a-col>
      </a-row>
    </div>

    <!-- 修复前后对比 */
    <div class="comparison-section">
      <a-card title="修复前后对比">
        <div class="comparison-content">
          <a-row :gutter="[24, 0]">
            <a-col :span="12">
              <h4>修复前（模拟白色底纹）</h4>
              <div class="before-demo">
                <div class="old-modal-footer">
                  <button class="old-cancel-btn">取消</button>
                  <button class="old-confirm-btn-broken">确认</button>
                </div>
                <p class="comparison-note error">❌ 确认按钮有白色底纹，在暗色主题下很突兀</p>
              </div>
            </a-col>
            <a-col :span="12">
              <h4>修复后（当前效果）</h4>
              <div class="after-demo">
                <div class="new-modal-footer">
                  <a-button>取消</a-button>
                  <a-button type="primary">确认</a-button>
                </div>
                <p class="comparison-note success">✅ 使用主题色，完全适配暗色主题</p>
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
          <a-collapse-panel key="modal-button-fix" header="Modal按钮修复">
            <div class="code-example">
              <p>Modal确认按钮的完整修复：</p>
              <pre><code>/* 修复Modal弹窗确认按钮的白色底纹问题 */
.ant-modal-footer .ant-btn-primary {
  background-color: var(--accent-color) !important;
  border-color: var(--accent-color) !important;
  color: white !important;
  box-shadow: none !important;
}

.ant-modal-footer .ant-btn-primary:hover {
  background-color: var(--accent-hover) !important;
  border-color: var(--accent-hover) !important;
  color: white !important;
  box-shadow: none !important;
}

/* Modal取消按钮也需要适配暗色主题 */
.ant-modal-footer .ant-btn:not(.ant-btn-primary) {
  background-color: var(--bg-tertiary) !important;
  border-color: var(--border-color) !important;
  color: var(--text-primary) !important;
  box-shadow: none !important;
}</code></pre>
            </div>
          </a-collapse-panel>
          
          <a-collapse-panel key="comprehensive-coverage" header="全面覆盖策略">
            <div class="code-example">
              <p>使用多重选择器确保修复生效：</p>
              <pre><code>/* 特定CSS类名修复 */
:where(.css-dev-only-do-not-override-1onovbn).ant-modal-footer .ant-btn-primary {
  background-color: var(--accent-color) !important;
  border-color: var(--accent-color) !important;
  color: white !important;
  box-shadow: none !important;
}

/* 深度选择器修复 */
::deep(.ant-modal-footer .ant-btn-primary) {
  background-color: var(--accent-color) !important;
  border-color: var(--accent-color) !important;
  color: white !important;
  box-shadow: none !important;
}

/* 属性选择器修复 */
*[class*="ant-modal"] .ant-btn-primary {
  background-color: var(--accent-color) !important;
  border-color: var(--accent-color) !important;
  color: white !important;
  box-shadow: none !important;
}</code></pre>
            </div>
          </a-collapse-panel>
          
          <a-collapse-panel key="consistency" header="组件一致性保证">
            <div class="code-example">
              <p>确保与其他组件按钮的一致性：</p>
              <pre><code>/* 统一的确认按钮样式 */
.ant-modal-footer .ant-btn-primary,
.ant-picker-footer .ant-btn-primary,
.ant-drawer-footer .ant-btn-primary {
  background-color: var(--accent-color) !important;
  border-color: var(--accent-color) !important;
  color: white !important;
  box-shadow: none !important;
}

/* 统一的取消按钮样式 */
.ant-modal-footer .ant-btn:not(.ant-btn-primary),
.ant-picker-footer .ant-btn:not(.ant-btn-primary),
.ant-drawer-footer .ant-btn:not(.ant-btn-primary) {
  background-color: var(--bg-tertiary) !important;
  border-color: var(--border-color) !important;
  color: var(--text-primary) !important;
  box-shadow: none !important;
}</code></pre>
            </div>
          </a-collapse-panel>
        </a-collapse>
      </a-card>
    </div>

    <!-- 弹窗示例 -->
    <a-modal
      v-model:open="basicModalVisible"
      title="基础确认弹窗"
      ok-text="确认"
      cancel-text="取消"
      @ok="handleBasicOk"
    >
      <p>这是一个基础的确认弹窗，请注意确认按钮不再有白色底纹。</p>
    </a-modal>

    <a-modal
      v-model:open="customModalVisible"
      title="自定义内容弹窗"
      ok-text="提交"
      cancel-text="取消"
      @ok="handleCustomOk"
    >
      <a-form layout="vertical">
        <a-form-item label="用户名">
          <a-input v-model:value="formData.username" placeholder="请输入用户名" />
        </a-form-item>
        <a-form-item label="邮箱">
          <a-input v-model:value="formData.email" placeholder="请输入邮箱" />
        </a-form-item>
      </a-form>
    </a-modal>

    <a-modal
      v-model:open="dangerModalVisible"
      title="危险操作确认"
      ok-text="确认删除"
      cancel-text="取消"
      ok-type="danger"
      @ok="handleDangerOk"
    >
      <p>⚠️ 这是一个危险操作，确认后将无法恢复。</p>
    </a-modal>

    <!-- 模拟pageImage组件 -->
    <a-modal
      v-model:open="imageModalVisible"
      title="新建载图"
      ok-text="确认"
      cancel-text="取消"
      @ok="handleImageOk"
    >
      <div class="upload-area">
        <div class="upload-buttons">
          <a-button>上传图片</a-button>
          <a-button>图库选取</a-button>
        </div>
        <p class="upload-tip">将文件/文件夹拖拽到此处，不超过1000张</p>
      </div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ThemeSelector from '~/components/ThemeSelector.vue'

// 页面标题
useHead({
  title: 'Modal 确认按钮修复演示'
})

// 弹窗状态
const basicModalVisible = ref(false)
const customModalVisible = ref(false)
const dangerModalVisible = ref(false)
const imageModalVisible = ref(false)

// 表单数据
const formData = ref({
  username: '',
  email: ''
})

// 弹窗处理函数
const showBasicModal = () => {
  basicModalVisible.value = true
}

const showCustomModal = () => {
  customModalVisible.value = true
}

const showDangerModal = () => {
  dangerModalVisible.value = true
}

const showImageModal = () => {
  imageModalVisible.value = true
}

const handleBasicOk = () => {
  console.log('基础弹窗确认')
}

const handleCustomOk = () => {
  console.log('自定义弹窗确认', formData.value)
}

const handleDangerOk = () => {
  console.log('危险操作确认')
}

const handleImageOk = () => {
  console.log('图片弹窗确认')
}
</script>

<style scoped>
.modal-button-fix-demo {
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

.demo-desc {
  margin-top: 12px;
  color: var(--text-secondary);
  font-size: 14px;
}

.button-states {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
}

.state-btn {
  min-width: 120px;
}

.button-hover:hover {
  background-color: var(--accent-hover) !important;
  border-color: var(--accent-hover) !important;
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

/* 修复前的按钮样式（模拟问题） */
.old-modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px;
  background: var(--bg-secondary);
  border-radius: 6px;
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
}

/* 修复后的按钮样式 */
.new-modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px;
  background: var(--bg-secondary);
  border-radius: 6px;
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

/* 上传区域样式 */
.upload-area {
  text-align: center;
  padding: 32px;
  border: 2px dashed var(--border-color);
  border-radius: 8px;
  background: var(--bg-tertiary);
}

.upload-buttons {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 16px;
}

.upload-tip {
  color: var(--text-secondary);
  margin: 0;
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