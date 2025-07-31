# 裁图任务列表修复说明

## 修复的问题

### 1. ✅ 任务列表字段映射
**问题**: 后端返回的数据结构与前端表格显示的字段不匹配

**解决方案**: 
- 更新 `fetchTaskList()` 函数，正确映射 API 返回的字段
- 添加状态文本转换函数 `getStatusText()`

```javascript
// 原始 API 响应结构
{
  "cropperTaskList": [
    {
      "cropperId": "1950477479573385216",
      "cropperNum": 1,
      "cropperSuccessNum": 0,
      "cropperFailNum": 0,
      "cropperStatus": 0,
      "createBy": "api_key_0",
      "createTime": "2025-07-30 16:44:04"
    }
  ]
}

// 映射后的表格数据
{
  id: item.cropperId,
  裁图ID: item.cropperId,
  目标: item.cropperNum,
  成功: item.cropperSuccessNum,
  失败: item.cropperFailNum,
  任务状态: getStatusText(item.cropperStatus),
  创建人: item.createBy,
  创建时间: item.createTime,
  _raw: item  // 保留原始数据
}
```

### 2. ✅ 任务创建后数据刷新
**问题**: 创建任务成功后，列表和统计数据没有自动刷新

**解决方案**:
- 简化 `handleTaskSubmit()` 函数
- 移除手动添加表格数据的逻辑
- 任务创建成功后调用 `fetchStats()` 和 `fetchTaskList()` 重新获取数据

```javascript
// 修复后的处理逻辑
if (formData.success && formData.taskResponse) {
  // 关闭弹窗
  showCreateModal.value = false
  
  // 刷新数据
  await Promise.all([
    fetchStats(),
    fetchTaskList()
  ])
}
```

### 3. ✅ 查看详情参数修复
**问题**: 查看详情时使用错误的参数名，导致无法正确获取详情数据

**解决方案**:
- 更新 API 接口参数定义，添加 `cropperId` 字段
- 修改 `fetchTaskDetail()` 函数使用 `cropperId` 参数
- 更新 `showTaskDetail()` 函数正确传递参数

```javascript
// 修复前
const params = { taskId, page: 1, limit: 100 }

// 修复后
const params = { cropperId, page: 1, limit: 100 }
```

### 4. ✅ 错误处理优化
**问题**: 任务创建失败时没有正确的错误反馈

**解决方案**:
- 在 `CroppingNewTaskModal` 中添加失败情况的处理
- 返回详细的成功/失败状态给父组件
- 在父组件中根据状态进行相应处理

```javascript
// 任务创建失败时的处理
if (!response.success) {
  const formData = {
    files: allImageList,
    taskResponse: null,
    success: false,
    error: response.message || '创建任务失败'
  }
  emits('submit', formData)
}
```

## 状态码映射

裁图任务状态码对应关系：
- `0`: 进行中
- `1`: 已完成
- `2`: 失败
- `3`: 暂停

## 测试页面

### `/test-task-list`
专门用于测试任务列表功能的页面，包含：
- 统计数据获取测试
- 任务列表获取测试
- 任务详情获取测试
- 原始数据展示
- 字段映射验证

## API 接口

### 统计数据接口
- **URL**: `/smart/cropper/total`
- **方法**: `GET`
- **用途**: 获取裁图任务统计信息

### 任务列表接口
- **URL**: `/smart/cropper/getTaskList`
- **方法**: `GET`
- **参数**: `page`, `limit`, `taskId`, `status`, `startTime`, `endTime`, `userId`
- **返回**: `cropperTaskList` 数组

### 任务详情接口
- **URL**: `/smart/cropper/getList`
- **方法**: `GET`
- **参数**: `cropperId`, `page`, `limit`
- **返回**: 详情数据列表

### 创建任务接口
- **URL**: `/smart/cropper/addTask`
- **方法**: `POST`
- **参数**: `uploadType`, `imageList`
- **返回**: 任务创建结果

## 文件修改清单

1. **`pages/dashboard/apps/cropping.vue`**
   - 修复字段映射逻辑
   - 优化任务创建后的数据刷新
   - 修复查看详情的参数传递

2. **`apis/business/cropper.ts`**
   - 添加 `cropperId` 参数支持
   - 完善接口类型定义

3. **`components/CroppingNewTaskModal.vue`**
   - 优化错误处理
   - 返回详细的状态信息

4. **`pages/test-task-list.vue`** (新增)
   - 专门的测试页面
   - 验证所有功能

## 验证方法

1. 访问 `/dashboard/apps/cropping` 查看裁图页面
2. 点击"新建裁图"创建任务，验证列表刷新
3. 点击"查看"按钮验证详情获取
4. 访问 `/test-task-list` 进行详细测试
5. 查看浏览器控制台确认 API 调用和数据格式 