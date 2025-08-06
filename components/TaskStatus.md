# TaskStatus 组件使用说明

## 简介

TaskStatus 是一个统一的任务状态显示组件，用于在整个应用中一致地渲染任务状态。

## 状态映射

| 状态值 | 状态文本 | 说明 |
|--------|----------|------|
| 0 | 待执行 | 任务还未开始 |
| 1 | 进行中 | 任务正在执行 |
| 2 | 已完成 | 任务成功完成 |
| 3 | 部分失败 | 任务部分成功，部分失败 |
| 4 | 失败 | 任务执行失败 |

## 基本用法

```vue
<template>
  <!-- 基本用法 -->
  <TaskStatus :status="2" />
  
  <!-- 不显示图标 -->
  <TaskStatus :status="1" :showIcon="false" />
  
  <!-- 小尺寸 -->
  <TaskStatus :status="0" size="sm" />
  
  <!-- 大尺寸 -->
  <TaskStatus :status="3" size="lg" />
  
  <!-- 柔和主题 -->
  <TaskStatus :status="4" theme="soft" />
</template>

<script setup>
import TaskStatus from '~/components/TaskStatus.vue'
</script>
```

## 属性说明

### status
- **类型**: `Number | String`
- **必需**: 是
- **说明**: 任务状态值，支持 0-4 的数字

### showIcon
- **类型**: `Boolean`
- **默认值**: `true`
- **说明**: 是否显示状态图标

### size
- **类型**: `String`
- **默认值**: `'md'`
- **可选值**: `'sm'`, `'md'`, `'lg'`
- **说明**: 组件尺寸

### theme
- **类型**: `String`
- **默认值**: `'default'`
- **可选值**: `'default'`, `'soft'`
- **说明**: 样式主题

## 样式说明

### 默认主题 (default)
- 待执行: 灰色背景，深色边框
- 进行中: 蓝色背景，带动画加载图标
- 已完成: 绿色背景，勾选图标
- 部分失败: 黄色背景，警告图标
- 失败: 红色背景，错误图标

### 柔和主题 (soft)
- 颜色更淡，边框更轻

## 在现有页面中的应用

### 替换原有状态显示

#### 之前：
```vue
<span 
  class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
  :class="getStatusClass(item.status)"
>
  {{ getStatusText(item.status) }}
</span>
```

#### 现在：
```vue
<TaskStatus :status="item.status" />
```

### 列表中使用
```vue
<td class="px-4 py-4 text-center">
  <TaskStatus :status="getStatus(item)" />
</td>
```

### 详情弹窗中使用
```vue
<td class="py-3 px-4">
  <TaskStatus :status="item.status" size="sm" />
</td>
```

## 状态字段映射

在不同页面中，状态字段的名称不同。TaskTable组件会自动按优先级查找以下字段：

| 页面类型 | 状态字段 | 说明 |
|----------|----------|------|
| 商品采集 | collectorStatus | 商品采集任务状态 |
| 智能裁图 | cropperStatus | 裁图任务状态 |
| 一键抠图 | mattingStatus | 抠图任务状态 |
| 文生图 | creatorStatus | 文生图任务状态 |
| 超级裂变 | fissionStatus | 裂变任务状态 |
| 侵权检测 | status | 通用状态字段 |
| 其他 | 任务状态 | 中文状态字段 |

## 注意事项

1. **状态值统一**: 确保传入的状态值符合 0-4 的约定
2. **图标动画**: "进行中"状态会显示旋转的加载图标
3. **响应式**: 组件支持响应式设计，在不同设备上都能正常显示
4. **无障碍**: 组件包含适当的语义标记，支持无障碍访问
5. **字段自动匹配**: TaskTable组件会自动匹配正确的状态字段，无需手动指定

## 迁移指南

如果你的页面之前使用了自定义的状态显示逻辑，可以按以下步骤迁移：

1. 导入 TaskStatus 组件
2. 替换原有的状态显示元素
3. 删除不再需要的 `getStatusText` 和 `getStatusClass` 函数
4. 确保状态值符合 0-4 的约定

## 相关组件

- TaskTable: 任务列表表格组件
- TextToImageDetailModal: 文生图详情弹窗
- CroppingDetailModal: 裁图详情弹窗
- 其他详情弹窗组件