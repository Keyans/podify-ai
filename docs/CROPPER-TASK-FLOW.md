# 智能裁图任务创建流程

## 概述

智能裁图任务创建包含图片上传和任务创建两个主要步骤：

1. **图片上传**：将图片上传到腾讯云 COS 或选择图库图片
2. **任务创建**：调用 `/smart/cropper/addTask` 接口创建裁图任务

## 接口说明

### 任务创建接口

**接口地址**: `/smart/cropper/addTask`  
**请求方法**: `POST`  
**Content-Type**: `application/json`

### 请求参数

```typescript
interface CreateCropperTaskParams {
  uploadType: number        // 1: 本地上传, 2: 图库上传
  imageList: ImageInfo[]    // 图片信息列表
}

interface ImageInfo {
  imageName: string   // 图片名称
  imageUrl: string    // 图片URL（COS地址或图库地址）
  fileSize: number    // 文件大小（字节）
  width: number       // 图片宽度
  height: number      // 图片高度
  format: string      // 图片格式（JPG、PNG等）
}
```

### 请求示例

```json
{
  "uploadType": 1,
  "imageList": [
    {
      "imageName": "图片名称.jpg",
      "imageUrl": "https://podesigner-1316029341.cos.accelerate.myqcloud.com/upload/gallery/temu_pod_a0dd9724a866_1753184525825.jpg",
      "fileSize": 17482,
      "width": 1200,
      "height": 1800,
      "format": "JPG"
    }
  ]
}
```

## 实现流程

### 1. 图片选择和上传

#### 本地上传 (uploadType: 1)
1. 用户选择本地图片文件
2. 获取图片尺寸信息（width, height）
3. 获取文件格式（format）
4. 获取临时密钥调用 `/business/oss/tencent/key/temporary`
5. 上传文件到腾讯云 COS
6. 收集上传后的图片信息

#### 图库选择 (uploadType: 2)
1. 用户从图库选择图片
2. 获取图库图片的 URL 和基本信息
3. 下载图片获取尺寸信息
4. 收集图片信息

### 2. 任务创建

1. 合并本地上传和图库选择的图片信息
2. 根据图片来源确定 `uploadType`
3. 调用 `/smart/cropper/addTask` 创建任务
4. 处理任务创建结果
5. 刷新任务列表和统计数据

## 核心组件

### TencentCosUpload.vue
- 处理文件选择、验证、预览
- 获取图片尺寸信息
- 上传文件到腾讯云 COS
- 提供 `getImageInfoList()` 方法获取图片信息

### CroppingNewTaskModal.vue
- 整合文件上传和图库选择
- 调用任务创建接口
- 处理任务创建结果

### cropping.vue
- 处理任务创建成功后的界面更新
- 刷新任务列表和统计数据

## API 文件

### apis/business/cropper.ts
- `createCropperTask()` - 创建裁图任务
- `getCropperStats()` - 获取统计数据
- `getCropperTaskList()` - 获取任务列表
- `getCropperTaskDetail()` - 获取任务详情

### apis/business/oss.ts
- `getTencentCosCredentials()` - 获取腾讯云临时密钥

## 测试页面

### /test-cropper
专门的裁图功能测试页面，可以：
- 测试文件上传功能
- 查看图片详细信息
- 测试任务创建接口
- 查看任务创建结果

### /test-env
环境配置测试页面，可以：
- 查看当前环境配置
- 测试 API 连接
- 验证代理设置

## 错误处理

1. **文件验证**：格式、大小限制
2. **上传失败**：网络错误、权限问题
3. **任务创建失败**：接口错误、参数验证
4. **用户反馈**：错误提示和成功提示

## 注意事项

1. **图片信息收集**：必须在上传前获取图片尺寸信息
2. **上传类型判断**：根据实际图片来源确定 uploadType
3. **异步处理**：上传和任务创建都是异步操作
4. **错误处理**：完善的错误处理和用户提示
5. **数据刷新**：任务创建成功后刷新相关数据 