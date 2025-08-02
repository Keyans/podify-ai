# 腾讯云COS CORS问题排查指南

## 🚨 **问题症状**

在开发环境中上传文件到腾讯云COS时出现：
- `CORS blocked or network error`
- `Access to XMLHttpRequest blocked by CORS policy`
- 文件上传失败，但获取临时密钥成功

## 🔍 **问题原因分析**

### 1. **开发环境localhost限制**
腾讯云COS的CORS配置可能没有包含 `localhost:3000` 域名

### 2. **预检请求失败**
浏览器在上传前会发送OPTIONS预检请求，可能被CORS策略阻止

### 3. **请求头不匹配**
COS上传时需要特定的请求头，可能与CORS配置不匹配

### 4. **环境配置差异**
开发环境和生产环境的域名不同，导致CORS策略不一致

## 🛠️ **排查步骤**

### 第一步：使用调试工具
访问调试页面进行全面检查：
```
http://localhost:3000/debug-env
```

#### 1. 测试COS凭证获取
- 点击"测试COS凭证获取"
- 检查是否成功获取临时密钥
- 确认bucket、region、pathPrefix等配置正确

#### 2. 测试CORS配置
- 点击"测试CORS配置"
- 查看OPTIONS预检请求是否成功
- 检查返回的CORS头信息

#### 3. 多种上传测试
- **使用工具类上传**：标准上传方式
- **直接COS上传**：绕过工具类的直接上传
- **带CORS头上传**：强制添加CORS头的上传

### 第二步：检查腾讯云COS配置

登录腾讯云控制台，检查COS存储桶的CORS配置：

1. **进入COS控制台** → 选择对应存储桶 → 权限管理 → 跨域访问CORS

2. **检查CORS规则**应包含：
```json
{
  "allowedOrigins": [
    "http://localhost:3000",
    "https://your-domain.com",
    "*"
  ],
  "allowedMethods": [
    "PUT",
    "POST",
    "GET",
    "DELETE",
    "HEAD"
  ],
  "allowedHeaders": [
    "*",
    "authorization",
    "content-type", 
    "x-cos-security-token",
    "x-cos-meta-*"
  ],
  "maxAgeSeconds": 3600
}
```

3. **临时解决方案**：暂时设置 `allowedOrigins: ["*"]` 进行测试

### 第三步：网络环境检查

#### 1. 检查代理设置
确认开发环境的代理不会拦截COS请求：
- 检查 `nuxt.config.ts` 中的代理配置
- 确认代理只处理 `/pod` 路径，不影响腾讯云域名

#### 2. 网络连通性测试
```bash
# 测试COS域名连通性
curl -I https://your-bucket.cos.ap-guangzhou.myqcloud.com/

# 测试OPTIONS预检请求
curl -X OPTIONS \
  -H "Origin: http://localhost:3000" \
  -H "Access-Control-Request-Method: PUT" \
  -H "Access-Control-Request-Headers: authorization,content-type" \
  https://your-bucket.cos.ap-guangzhou.myqcloud.com/
```

## 🔧 **解决方案**

### 方案1：配置COS CORS（推荐）

在腾讯云COS控制台添加开发环境CORS规则：

```json
{
  "allowedOrigins": ["http://localhost:3000"],
  "allowedMethods": ["PUT", "POST", "GET", "HEAD"],
  "allowedHeaders": ["*"],
  "exposeHeaders": ["ETag", "x-cos-version-id"],
  "maxAgeSeconds": 3600
}
```

### 方案2：开发环境代理COS请求

在 `nuxt.config.ts` 中添加COS代理：

```javascript
proxy: {
  '/cos-proxy': {
    target: 'https://your-bucket.cos.ap-guangzhou.myqcloud.com',
    changeOrigin: true,
    pathRewrite: {
      '^/cos-proxy': ''
    },
    secure: true
  }
}
```

然后修改上传逻辑使用代理路径。

### 方案3：使用服务端代理上传

创建服务端API代理COS上传：

```javascript
// server/api/upload-proxy.post.js
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  // 在服务端进行COS上传，避免CORS问题
  // ...
})
```

### 方案4：本地hosts配置

修改本地hosts文件，将localhost映射为允许的域名：
```
127.0.0.1 dev.your-domain.com
```

然后使用 `http://dev.your-domain.com:3000` 访问。

## 📊 **常见错误对照表**

| 错误信息 | 可能原因 | 解决方案 |
|---------|---------|---------|
| `CORS blocked` | CORS配置缺少localhost | 添加开发域名到CORS |
| `Network error` | 网络连接问题 | 检查网络和DNS |
| `Access denied` | 认证失败 | 检查临时密钥配置 |
| `Invalid bucket` | 存储桶配置错误 | 检查bucket名称和region |
| `Preflight failed` | OPTIONS请求失败 | 检查CORS预检配置 |

## 🎯 **最佳实践**

### 开发环境
1. **宽松CORS设置**：`allowedOrigins: ["*"]` 便于调试
2. **详细日志记录**：启用COS SDK的调试日志
3. **多环境隔离**：使用不同的存储桶前缀

### 生产环境  
1. **严格CORS设置**：只允许必要的域名和方法
2. **HTTPS强制**：所有请求使用HTTPS
3. **监控告警**：设置上传失败率监控

## 🚀 **快速修复**

如果需要立即解决问题，可以临时使用以下配置：

1. **在COS控制台**设置CORS允许所有来源：
```json
{
  "allowedOrigins": ["*"],
  "allowedMethods": ["*"],
  "allowedHeaders": ["*"],
  "maxAgeSeconds": 3600
}
```

2. **重启开发服务器**：
```bash
npm run dev:test
```

3. **清除浏览器缓存**：刷新页面或使用无痕模式

这样应该能够立即解决CORS问题，然后再逐步优化为更安全的配置。

## 🔍 **调试技巧**

1. **打开浏览器开发者工具**
   - Network标签查看请求详情
   - Console标签查看错误信息
   - 重点关注OPTIONS预检请求

2. **使用curl测试**
   - 命令行测试避免浏览器CORS限制
   - 直接测试COS API响应

3. **对比工作环境**
   - 检查其他正常项目的配置差异
   - 复制成功的CORS配置

通过以上步骤，应该能够定位并解决CORS问题！🎉 