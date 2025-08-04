# 服务器端代理502错误修复说明

## 问题描述
用户访问 `https://cuz-ai.riin.com/pod/tenant/api/v1/tenants/login` 时出现502错误，经分析发现是服务器端代理配置硬编码了无法访问的后端地址。

## 错误原因分析

### 架构流程
```
前端axios请求 → Nuxt服务器端代理 → 后端API服务器
      ↑                 ↑               ↑
   /pod/login     硬编码地址        真实后端
                192.168.1.151:30882   (无法访问)
```

### 根本原因
1. **硬编码代理地址**：`server/middleware/proxy.ts` 中硬编码了 `http://192.168.1.151:30882`
2. **环境变量被忽略**：服务器端代理没有读取环境变量配置
3. **网络不可达**：硬编码的IP地址无法访问，导致502错误

## 修复方案

### 1. 修改服务器端代理配置

**修改前** (`server/middleware/proxy.ts`)：
```javascript
// 硬编码代理目标
const targetUrl = `http://192.168.1.151:30882${url}`
```

**修改后**：
```javascript
// 从运行时配置获取代理目标地址
const config = useRuntimeConfig()
const proxyTarget = config.public.apiProxyTarget || 'http://192.168.1.151:30882'
const targetUrl = `${proxyTarget}${url}`
```

### 2. 更新环境变量配置

**开发环境** (`.env.development`)：
```bash
# 修改前
NUXT_PUBLIC_API_PROXY_TARGET=http://192.168.1.151:30882

# 修改后
NUXT_PUBLIC_API_PROXY_TARGET=http://10.233.34.88:31110
```

**测试环境** (`.env.test`)：
```bash
# 修改前
NUXT_PUBLIC_API_PROXY_TARGET=https://cuz-ai.riin.com

# 修改后  
NUXT_PUBLIC_API_PROXY_TARGET=http://10.233.41.245:31110
```

## 配置说明

### 关键环境变量
- **`NUXT_PUBLIC_API_PROXY_TARGET`**：服务器端代理的目标地址
- **`NUXT_PUBLIC_BACKEND_API`**：前端直接调用的后端API地址（在这个架构中不直接使用）

### 代理工作原理
1. 前端发起请求：`GET /pod/tenant/api/v1/tenants/login`
2. Nuxt服务器端代理拦截：匹配 `/pod/` 开头的路径
3. 转发到后端：`http://10.233.34.88:31110/pod/tenant/api/v1/tenants/login`
4. 返回响应给前端

## 验证方法

### 1. 检查代理配置生效
```bash
# 启动开发服务器
npm run dev

# 查看控制台日志，确认代理目标地址正确
# 应该看到：[代理配置] proxyTarget: http://10.233.34.88:31110
```

### 2. 测试API调用
1. 访问注册页面：`http://localhost:3000/register`
2. 填写表单并提交
3. 在浏览器开发者工具中查看网络请求
4. 确认没有502错误

### 3. 后端连通性测试
```bash
# 测试开发环境后端
curl http://10.233.34.88:31110/pod/tenant/api/v1/tenants/health

# 测试测试环境后端
curl http://10.233.41.245:31110/pod/tenant/api/v1/tenants/health
```

## 环境对比

| 环境 | 代理目标地址 | 说明 |
|------|-------------|------|
| 开发环境 | `http://10.233.34.88:31110` | 内网开发API服务器 |
| 测试环境 | `http://10.233.41.245:31110` | 内网测试API服务器 |
| 生产环境 | 待配置 | 需要配置生产环境的后端地址 |

## 注意事项

1. **环境隔离**：不同环境使用不同的后端地址，确保数据隔离
2. **网络安全**：内网地址只能在内网环境访问
3. **日志监控**：代理增加了详细的日志输出，便于调试
4. **错误处理**：增强了错误信息，包含目标地址便于定位问题

## 生产环境规划

生产环境部署时需要：
1. 配置生产环境的 `.env.production` 文件
2. 设置正确的 `NUXT_PUBLIC_API_PROXY_TARGET`
3. 确保生产环境的网络连通性
4. 配置HTTPS和安全策略

## 相关文件

- `server/middleware/proxy.ts` - 服务器端代理配置
- `.env.development` - 开发环境配置
- `.env.test` - 测试环境配置
- `nuxt.config.ts` - Nuxt运行时配置

## 更新日期
2025年1月8日 