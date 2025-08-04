# 腾讯云COS CORS配置完整指南

## 🚨 **问题现象**
- 在debug-env页面测试CORS配置时显示 "❌ 不支持 (Failed to fetch)"
- 上传文件时出现 "CORS blocked or network error"
- 浏览器控制台显示CORS相关错误

## 🎯 **解决方案：配置COS CORS规则**

### 第一步：登录腾讯云控制台

1. 访问：https://console.cloud.tencent.com/cos
2. 登录你的腾讯云账号

### 第二步：找到对应的存储桶

1. 在存储桶列表中找到你项目使用的存储桶
2. 从debug-env页面可以看到存储桶名称和地域信息

### 第三步：配置CORS规则

1. **点击存储桶名称**进入详情页
2. **权限管理** → **跨域访问CORS**
3. **点击"添加规则"**

### 第四步：填写CORS规则配置

#### **开发环境配置（推荐）**
```
来源 Origin: http://localhost:3000
方法 Method: GET,PUT,POST,DELETE,HEAD,OPTIONS
允许的Header: *
暴露的Header: ETag,x-cos-version-id
超时 Max-Age: 3600
```

#### **生产环境配置**
```
来源 Origin: https://your-domain.com
方法 Method: GET,PUT,POST,DELETE,HEAD,OPTIONS
允许的Header: *
暴露的Header: ETag,x-cos-version-id
超时 Max-Age: 3600
```

#### **临时测试配置（宽松模式）**
如果急需解决问题，可以临时使用：
```
来源 Origin: *
方法 Method: *
允许的Header: *
暴露的Header: *
超时 Max-Age: 3600
```
⚠️ **警告**：生产环境不要使用`*`，存在安全风险！

### 第五步：保存并等待生效

1. **点击"保存"**按钮
2. **等待1-3分钟**让配置生效
3. **刷新浏览器页面**清除缓存

## 🧪 **测试验证**

配置完成后，重新测试：

1. **访问调试页面**：http://localhost:3000/debug-env
2. **点击"测试CORS配置"**
3. **查看结果**：
   - ✅ 网络连通性：正常
   - ✅ CORS预检请求：成功
   - ✅ 显示正确的CORS头信息

## 📋 **配置示例（JSON格式）**

如果控制台支持JSON导入，可以使用以下配置：

```json
{
  "CORSRules": [
    {
      "AllowedOrigins": ["http://localhost:3000"],
      "AllowedMethods": ["GET", "PUT", "POST", "DELETE", "HEAD"],
      "AllowedHeaders": ["*"],
      "ExposeHeaders": ["ETag", "x-cos-version-id"],
      "MaxAgeSeconds": 3600
    }
  ]
}
```

## 💡 **常见问题解答**

### Q1: 配置后仍然报错怎么办？
A1: 
- 等待5分钟后重试
- 清除浏览器缓存（Ctrl+F5）
- 检查配置是否完全正确
- 尝试使用 `*` 进行临时测试

### Q2: 生产环境应该如何配置？
A2:
- **不要使用** `*` 通配符
- **指定具体的域名**：https://your-domain.com
- **只允许必要的方法**：GET,PUT,POST,DELETE,HEAD
- **定期审查配置**确保安全

### Q3: 多个域名如何配置？
A3:
- **方法1**：创建多个CORS规则，每个规则对应一个域名
- **方法2**：在一个规则中用逗号分隔多个域名（某些版本支持）

### Q4: 为什么需要OPTIONS方法？
A4: 
- 浏览器在发送复杂请求前会先发送OPTIONS预检请求
- 如果预检失败，实际请求不会发送
- 这是CORS标准的要求

## 🔍 **故障排除**

### 检查清单：
- [ ] COS存储桶名称正确
- [ ] CORS规则包含当前域名
- [ ] 允许的方法包含PUT和OPTIONS
- [ ] 允许的Header设置为*或包含必要头
- [ ] 配置已保存并等待生效
- [ ] 浏览器缓存已清除

### 调试命令：
```bash
# 测试COS域名连通性
curl -I https://your-bucket.cos.ap-guangzhou.myqcloud.com/

# 测试CORS预检请求
curl -X OPTIONS \
  -H "Origin: http://localhost:3000" \
  -H "Access-Control-Request-Method: PUT" \
  -H "Access-Control-Request-Headers: authorization,content-type" \
  https://your-bucket.cos.ap-guangzhou.myqcloud.com/
```

## 🎉 **配置成功标志**

当CORS配置正确时，你应该看到：
- ✅ CORS测试显示"成功"
- ✅ 文件上传功能正常工作
- ✅ 浏览器控制台没有CORS错误
- ✅ debug-env页面显示正确的CORS头信息

完成以上配置后，你的文件上传功能应该能够正常工作了！🚀 