# 环境配置说明

## 可用环境

### 开发环境 (development)
- **API地址**: 本地代理到 `http://192.168.1.151:30882`
- **启动命令**: `npm run dev`
- **构建命令**: `npm run build`

### 测试环境 (test)
- **API地址**: `https://podesigner.riin.com`
- **启动命令**: `npm run dev:test`
- **构建命令**: `npm run build:test`
- **预览命令**: `npm run preview:test`

### 生产环境 (production)
- **API地址**: `https://podesigner.riin.com`
- **启动命令**: 不支持开发服务器
- **构建命令**: `npm run build:prod`
- **预览命令**: `npm run preview:prod`

## 可用命令

```bash
# 开发环境
npm run dev              # 启动开发服务器 (.env.development)
npm run build:dev        # 构建开发版本

# 测试环境  
npm run dev:test         # 启动测试环境开发服务器 (.env.test)
npm run build:test       # 构建测试环境版本
npm run preview:test     # 预览测试环境构建结果

# 生产环境
npm run dev:prod         # 启动生产环境开发服务器 (.env.production)
npm run build:prod       # 构建生产环境版本
npm run preview:prod     # 预览生产环境构建结果

# 静态生成
npm run generate         # 生成静态文件（开发环境）
npm run generate:test    # 生成静态文件（测试环境）
npm run generate:prod    # 生成静态文件（生产环境）
```

## 环境配置测试

访问 `/test-env` 页面可以查看当前环境的详细配置信息和测试 API 连接。

## 环境配置（基于 .env 文件）

本项目采用 **完全基于 .env 文件** 的环境配置方案：

### 1. 环境配置文件
- `.env.development` - 开发环境配置
- `.env.test` - 测试环境配置  
- `.env.production` - 生产环境配置

### 2. 类型安全 (`config/environments.ts`)
- 提供 TypeScript 类型定义
- 环境变量读取和验证逻辑
- 不包含硬编码的配置值

### 配置项说明：
- `apiBaseUrl`: API 基础地址
- `apiPrefix`: API 前缀  
- `apiProxyTarget`: 代理目标地址
- `apiClientType`: 客户端类型
- `apiAuthToken`: 认证令牌
- `galleryUrl`: 图库地址
- `backendApi`: 后端 API 地址

### 当前环境对比：
| 环境 | API 目标 | 用途 |
|------|----------|------|
| 开发环境 | `http://192.168.1.151:30882` | 本地开发 |
| 测试环境 | `https://podesigner.riin.com` | 测试验证 |
| 生产环境 | `https://podesigner.riin.com` | 生产部署 |

## 环境指示器

在开发和测试环境中，页面右上角会显示当前环境的指示器：

- 🔵 **开发环境**: 蓝色标识
- 🟡 **测试环境**: 黄色标识
- 🔴 **生产环境**: 红色标识（仅在生产环境显示）

## 环境变量配置

### 创建环境配置文件
参考 `config/env.example` 创建对应的 `.env.*` 文件：

```bash
# 本地开发覆盖
.env.local

# 各环境专用配置
.env.development
.env.test  
.env.production
```

### 动态覆盖配置
也可以通过命令行临时覆盖：

```bash
# 自定义 API 地址
NUXT_PUBLIC_API_PROXY_TARGET=https://custom-api.com npm run dev:test

# 自定义认证令牌  
NUXT_PUBLIC_API_AUTH_TOKEN=your_token npm run dev:test
```

### 部署时配置
在服务器上设置环境变量，无需修改代码：

```bash
# Docker 部署示例
docker run -e NUXT_PUBLIC_API_PROXY_TARGET=https://api.prod.com your-app

# 服务器环境变量
export NUXT_PUBLIC_API_PROXY_TARGET=https://api.prod.com
```

## 部署说明

### 测试环境部署
```bash
npm run build:test
# 然后部署 .output 目录到测试服务器
```

### 生产环境部署
```bash
npm run build:prod
# 然后部署 .output 目录到生产服务器
``` 