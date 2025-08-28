<template>
  <div class="theme-demo-page">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1>Ant Design Vue 主题系统演示</h1>
      <p>展示新的主题系统如何自动应用到所有 Ant Design Vue 组件</p>
    </div>

    <!-- 主题选择器 -->
    <div class="theme-selector-section">
      <h2>主题选择</h2>
      <ThemeSelector />
    </div>

    <!-- 组件演示区域 -->
    <div class="components-demo">
      <a-row :gutter="[24, 24]">
        <!-- 按钮组件 -->
        <a-col :span="12">
          <a-card title="按钮组件">
            <a-space direction="vertical" style="width: 100%;">
              <a-button type="primary">主要按钮</a-button>
              <a-button>默认按钮</a-button>
              <a-button type="dashed">虚线按钮</a-button>
              <a-button type="text">文本按钮</a-button>
              <a-button type="link">链接按钮</a-button>
            </a-space>
          </a-card>
        </a-col>

        <!-- 输入组件 -->
        <a-col :span="12">
          <a-card title="输入组件">
            <a-space direction="vertical" style="width: 100%;">
              <a-input placeholder="请输入内容" />
              <a-input-search placeholder="搜索内容" />
              <a-select v-model:value="selectValue" placeholder="请选择" style="width: 100%">
                <a-select-option value="option1">选项1</a-select-option>
                <a-select-option value="option2">选项2</a-select-option>
              </a-select>
              <a-date-picker placeholder="选择日期" style="width: 100%" />
            </a-space>
          </a-card>
        </a-col>

        <!-- 数据展示组件 -->
        <a-col :span="24">
          <a-card title="表格组件">
            <a-table 
              :dataSource="tableData" 
              :columns="tableColumns"
              :pagination="{ pageSize: 5 }"
              row-key="id"
            />
          </a-card>
        </a-col>

        <!-- 反馈组件 -->
        <a-col :span="12">
          <a-card title="反馈组件">
            <a-space direction="vertical" style="width: 100%;">
              <a-button @click="showMessage">显示消息</a-button>
              <a-button @click="showNotification">显示通知</a-button>
              <a-button @click="showModal">显示对话框</a-button>
              <a-progress :percent="75" />
              <TaskStatus :status="1" />
              <TaskStatus :status="2" />
              <TaskStatus :status="3" />
            </a-space>
          </a-card>
        </a-col>

        <!-- 导航组件 -->
        <a-col :span="12">
          <a-card title="导航组件">
            <a-menu mode="vertical" :selectedKeys="['1']">
              <a-menu-item key="1">
                <template #icon>
                  <UserOutlined />
                </template>
                导航项目1
              </a-menu-item>
              <a-sub-menu key="sub1">
                <template #icon>
                  <SettingOutlined />
                </template>
                <template #title>子菜单</template>
                <a-menu-item key="2">子项目1</a-menu-item>
                <a-menu-item key="3">子项目2</a-menu-item>
              </a-sub-menu>
            </a-menu>
          </a-card>
        </a-col>

        <!-- 布局组件 -->
        <a-col :span="24">
          <a-card title="标签页组件">
            <a-tabs v-model:activeKey="activeTab">
              <a-tab-pane key="1" tab="标签页1">
                <p>这是标签页1的内容</p>
              </a-tab-pane>
              <a-tab-pane key="2" tab="标签页2">
                <p>这是标签页2的内容</p>
              </a-tab-pane>
              <a-tab-pane key="3" tab="标签页3">
                <p>这是标签页3的内容</p>
              </a-tab-pane>
            </a-tabs>
          </a-card>
        </a-col>
      </a-row>
    </div>

    <!-- 主题说明 -->
    <div class="theme-explanation">
      <a-card title="主题系统说明">
        <a-typography>
          <a-typography-title :level="4">新的主题系统特点：</a-typography-title>
          <a-typography-paragraph>
            <ul>
              <li><strong>自动化：</strong>通过 ConfigProvider 和 Design Token 系统，所有 Ant Design Vue 组件自动应用主题配色</li>
              <li><strong>一致性：</strong>确保所有组件使用相同的设计规范和颜色体系</li>
              <li><strong>灵活性：</strong>支持动态切换主题，支持暗色/亮色模式</li>
              <li><strong>维护性：</strong>减少手动 CSS 覆盖，使用官方 API 确保升级兼容性</li>
              <li><strong>性能：</strong>基于 CSS-in-JS 的主题系统，按需注入样式</li>
            </ul>
          </a-typography-paragraph>
          
          <a-typography-title :level="4">集成的组件主题：</a-typography-title>
          <a-typography-paragraph>
            <a-tag color="blue">Button 按钮</a-tag>
            <a-tag color="green">Input 输入框</a-tag>
            <a-tag color="orange">Table 表格</a-tag>
            <a-tag color="red">Modal 对话框</a-tag>
            <a-tag color="purple">Select 选择器</a-tag>
            <a-tag color="cyan">Card 卡片</a-tag>
            <a-tag color="gold">Menu 菜单</a-tag>
            <a-tag color="lime">Pagination 分页</a-tag>
          </a-typography-paragraph>
        </a-typography>
      </a-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { message, notification, Modal } from 'ant-design-vue'
import { UserOutlined, SettingOutlined } from '@ant-design/icons-vue'
import ThemeSelector from '~/components/ThemeSelector.vue'
import TaskStatus from '~/components/TaskStatus.vue'

// 页面标题
useHead({
  title: 'Ant Design Vue 主题系统演示'
})

// 响应式数据
const selectValue = ref(undefined)
const activeTab = ref('1')

// 表格数据
const tableData = ref([
  { id: 1, name: '张三', age: 32, address: '北京市朝阳区' },
  { id: 2, name: '李四', age: 28, address: '上海市浦东新区' },
  { id: 3, name: '王五', age: 35, address: '广州市天河区' },
  { id: 4, name: '赵六', age: 29, address: '深圳市南山区' },
  { id: 5, name: '钱七', age: 31, address: '杭州市西湖区' }
])

const tableColumns = [
  { title: '姓名', dataIndex: 'name', key: 'name' },
  { title: '年龄', dataIndex: 'age', key: 'age' },
  { title: '地址', dataIndex: 'address', key: 'address' }
]

// 事件处理
const showMessage = () => {
  message.success('这是一个成功消息！')
}

const showNotification = () => {
  notification.info({
    message: '通知标题',
    description: '这是一个信息通知的详细内容。'
  })
}

const showModal = () => {
  Modal.confirm({
    title: '确认对话框',
    content: '这是一个确认对话框的内容。',
    onOk() {
      message.success('确认成功！')
    },
    onCancel() {
      message.info('已取消')
    }
  })
}
</script>

<style scoped>
.theme-demo-page {
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: 32px;
}

.page-header h1 {
  color: var(--text-primary);
  margin-bottom: 8px;
}

.page-header p {
  color: var(--text-secondary);
  font-size: 16px;
}

.theme-selector-section {
  margin-bottom: 32px;
  padding: 24px;
  background: var(--bg-secondary);
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

.theme-selector-section h2 {
  color: var(--text-primary);
  margin-bottom: 16px;
}

.components-demo {
  margin-bottom: 32px;
}

.theme-explanation {
  margin-top: 32px;
}

/* 演示卡片样式 */
:deep(.ant-card) {
  margin-bottom: 16px;
}

:deep(.ant-card-head-title) {
  color: var(--text-primary);
}

/* 确保主题选择器在演示页面中正常显示 */
.theme-selector-section :deep(.theme-selector) {
  position: relative;
}
</style>