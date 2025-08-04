# 文生图API接口更新文档

## 📝 更新概述

本次更新主要是为了适配文生图详情查询接口 `/text/image/getList` 的新数据格式。

## 🔗 接口信息

### 详情查询接口
- **路径**: `/text/image/getList`
- **方法**: GET
- **用途**: 获取文生图任务的详细结果列表

### 请求参数
```typescript
{
  taskId: string,    // 任务ID (实际传入creatorId)
  page: number,      // 当前页码
  limit: number      // 每页数量
}
```

### 返回数据结构
```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    "current": "1",      // 当前页码
    "size": "100",       // 每页数量
    "pages": "1",        // 总页数
    "total": "1",        // 总记录数
    "creatorList": [     // 详情数据列表
      {
        "imageUrl": "https://example.com/original.jpg",  // 原图URL
        "resultsImageUrl": [                             // 结果图片URL数组
          "https://example.com/result1.jpg",
          "https://example.com/result2.jpg"
        ],
        "status": 0        // 状态：0-处理中, 1-已完成, 2-失败, 3-部分完成
      }
    ]
  },
  "timestamp": "1753695869515",
  "error": false,
  "success": true
}
```

## ⚡ 代码更新内容

### 1. 文生图页面 (`text-to-image.vue`)

#### 数据字段映射修正
- **生图ID字段**：使用 `creatorId` 而不是 `taskId` 
- **详情查询**：将 `creatorId` 作为 `taskId` 参数传递给接口

#### 接口参数修正
- 使用标准的 `page` 和 `limit` 参数
- 移除了 `current` 和 `size` 参数

#### 数据转换逻辑
```typescript
// 列表数据映射：使用creatorId作为生图ID
tableData.value = rawList.map(item => ({
  id: item.creatorId || item.id,        // 使用creatorId作为主键
  生图ID: item.creatorId || item.id,    // 生图ID使用creatorId字段
  目标: item.size || item.targetCount || '100',
  成功: item.current || item.successCount || '1',
  失败: '0',
  任务状态: getStatusText(item.status),
  创建人: item.creatorId || item.creator || item.createBy,
  创建时间: item.createTime || item.createdAt,
  _raw: item
}))

// 详情数据转换：creatorId作为taskId参数传递
const transformedList = detailList.map((item, index) => ({
  id: index + 1,
  referenceImage: item.imageUrl,           // 原图作为参考图
  resultImages: item.resultsImageUrl || [], // 结果图片数组
  dimensions: item.dimensions || '1024×1024',
  description: item.description || item.prompt || '文生图任务',
  prompt: item.prompt || '文生图提示词',
  status: getDetailStatusText(item.status), // 转换状态文本
  selected: false,
  _raw: item // 保留原始数据
}))
```

#### 状态码映射
```typescript
const getDetailStatusText = (status) => {
  const statusMap = {
    0: '处理中',
    1: '已完成', 
    2: '失败',
    3: '部分完成'
  }
  return statusMap[status] || '未知'
}
```

### 2. 详情弹窗组件 (`TextToImageDetailModal.vue`)

#### 图片显示优化
- 支持 `imageUrl` 和 `referenceImage` 作为参考图
- 支持 `resultsImageUrl` 和 `resultImages` 作为结果图
- 添加图片加载错误处理
- 增加图片点击预览功能

#### 状态处理增强
- 同时支持数字状态码和字符串状态
- 统一状态颜色和样式

#### 分页信息处理
- 正确处理 `current`、`size`、`pages`、`total` 字段
- 支持服务端分页和客户端分页

## 🎯 功能特性

### ✅ 已实现功能
1. **完整接口适配**: 支持新的API数据格式
2. **图片展示**: 正确显示原图和结果图
3. **状态管理**: 支持数字和文本状态显示
4. **分页功能**: 完整的分页支持
5. **错误处理**: 图片加载失败处理
6. **交互优化**: 图片点击预览

### 🔧 技术改进
1. **数据转换**: 统一数据格式适配前端组件
2. **参数映射**: `page/limit` ↔ `current/size` 转换
3. **向下兼容**: 保持与旧数据格式的兼容性
4. **类型安全**: 完善的数据类型处理

## 📊 测试建议

### 测试场景
1. **正常流程**: 创建任务 → 查看详情 → 查看图片
2. **分页测试**: 多页数据的分页跳转
3. **状态测试**: 不同状态的任务显示
4. **异常处理**: 图片加载失败、接口错误等

### 测试数据
```json
{
  "taskId": "TEST001",
  "current": 1,
  "size": 10
}
```

## 🚀 部署说明

1. 确保API接口 `/text/image/getList` 已部署
2. 验证接口返回数据格式符合文档定义
3. 测试前端页面功能正常
4. 检查图片链接的有效性和访问权限

---

**更新时间**: 2024年1月
**版本**: v1.0
**状态**: ✅ 已完成 