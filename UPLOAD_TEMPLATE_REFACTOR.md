# 上传模板组件重构总结

## 重构目标

解决原有架构问题：两种上传方式（模板文件上传 vs API上传）都调用同一个 `createTemplate` 接口，但需要不同的参数结构。同时解决切换上传方式时数据保留的问题。

## 主要改进

### 1. 数据结构重构

#### 原有结构（存在问题）
```typescript
// 所有数据混合在一个对象中
const uploadForm = reactive({
  platform: '',
  templateName: '',
  file: null
})

// API数据和模板数据混合
const apiForm = reactive({
  name: '',
  url: '',
  method: 'GET',
  headers: '',
  body: ''
})
```

#### 新的结构（清晰分离）
```typescript
// 公共表单数据
const commonForm = reactive({
  platform: '',
  templateName: ''
})

// 模版文件上传专用数据
const templateFileForm = reactive({
  file: null as File | null,
  parsedData: null as any
})

// API上传专用数据
const apiForm = reactive({
  name: '',
  url: '',
  method: 'GET',
  headers: '',
  body: '',
  responseData: null as any
})
```

### 2. 专用DTO构建函数

#### 模版文件上传DTO
```typescript
const buildTemplateUploadDTO = (): TemplateDTO => {
  return {
    // ... 基础字段
    platformFields: {
      key: {
        type: 'template_file',
        columns: templateFileForm.parsedData?.columns || [],
        totalRows: templateFileForm.parsedData?.totalRows || 0,
        fileName: templateFileForm.parsedData?.fileName,
        uploadMethod: 'template'
      }
    },
    categoryFields: {
      key: {
        source: 'file',
        data: templateFileForm.parsedData?.rows?.slice(0, 5) || [],
        sheetName: templateFileForm.parsedData?.currentSheet || 'Sheet1',
        uploadMethod: 'template'
      }
    }
  }
}
```

#### API上传DTO
```typescript
const buildApiUploadDTO = (): TemplateDTO => {
  return {
    // ... 基础字段
    platformFields: {
      key: {
        type: 'api_data',
        apiUrl: apiForm.url,
        apiMethod: apiForm.method,
        apiHeaders: apiForm.headers,
        apiBody: apiForm.body,
        uploadMethod: 'api'
      }
    },
    categoryFields: {
      key: {
        source: 'api',
        data: Array.isArray(apiForm.responseData) 
          ? apiForm.responseData.slice(0, 5) 
          : (apiForm.responseData ? [apiForm.responseData] : []),
        rawApiData: apiForm.responseData,
        uploadMethod: 'api'
      }
    }
  }
}
```

### 3. 智能表单重置机制

#### 切换上传方式时的处理
```typescript
// 监听上传方式变化，切换时重置对应表单
watch(uploadMethod, (newMethod, oldMethod) => {
  if (oldMethod && newMethod !== oldMethod) {
    resetMethodSpecificForm(newMethod)
  }
})

// 重置特定方法的表单数据
const resetMethodSpecificForm = (method: string) => {
  if (method === 'template') {
    // 切换到模板上传时，重置API表单
    apiForm.name = ''
    apiForm.url = ''
    apiForm.method = 'GET'
    apiForm.headers = ''
    apiForm.body = ''
    apiForm.responseData = null
    apiTestResult.value = null
  } else if (method === 'api') {
    // 切换到API上传时，重置模板文件表单
    templateFileForm.file = null
    templateFileForm.parsedData = null
    fileList.value = []
  }
}
```

### 4. 数据流优化

#### 模板文件上传流程
1. 用户选择文件 → `templateFileForm.file`
2. 解析Excel数据 → `templateFileForm.parsedData`
3. 构建专用DTO → `buildTemplateUploadDTO()`
4. 调用API → `createTemplate(templateDTO)`

#### API上传流程
1. 用户配置API → `apiForm`
2. 测试连接获取数据 → `apiForm.responseData`
3. 构建专用DTO → `buildApiUploadDTO()`
4. 调用API → `createTemplate(templateDTO)`

## 核心优势

1. **数据隔离**：模板上传和API上传的数据完全分离，避免字段混淆
2. **类型安全**：每种上传方式都有专用的DTO构建函数，确保参数结构正确
3. **用户体验**：切换上传方式时自动清理不相关数据，保留公共数据
4. **可维护性**：清晰的数据流和职责分离，便于后续扩展和维护
5. **调试友好**：每个DTO都包含 `uploadMethod` 字段，便于后端识别数据来源

## 文件修改

- ✅ `/components/batch/uploadTemplateModal.vue` - 完成重构
- ✅ 保持向后兼容性
- ✅ 通过所有语法检查
- ✅ 保持现有UI和用户交互逻辑不变

## 测试建议

1. 测试模板文件上传功能
2. 测试API上传功能
3. 测试上传方式切换时的数据保留/清理逻辑
4. 验证后端接收到的参数结构是否正确