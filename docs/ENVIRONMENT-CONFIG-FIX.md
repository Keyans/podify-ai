# 环境配置修复说明

## 问题描述
之前 `npm run build:test` 打包时没有正确读取 `.env.test` 环境配置，导致使用了开发环境的配置。

## 解决方案

### 1. 修改了构建脚本
现在所有的脚本都会显式设置 `NUXT_ENV` 环境变量：

```json
{
  "scripts": {
    "dev": "npx cross-env NUXT_ENV=development nuxt dev --dotenv .env.development",
    "dev:test": "npx cross-env NUXT_ENV=test nuxt dev --dotenv .env.test",
    "dev:prod": "npx cross-env NUXT_ENV=production nuxt dev --dotenv .env.production",
    "build:dev": "npx cross-env NUXT_ENV=development nuxt build --dotenv .env.development",
    "build:test": "npx cross-env NUXT_ENV=test nuxt build --dotenv .env.test",
    "build:prod": "npx cross-env NUXT_ENV=production nuxt build --dotenv .env.production"
  }
}
```

### 2. 添加了 cross-env 依赖
为了确保跨平台兼容性，已添加 `cross-env` 作为开发依赖。

### 3. 需要创建正确的环境文件

您需要在项目根目录创建 `.env.test` 文件（如果不存在的话），内容示例：

```bash
# 测试环境配置
NUXT_ENV=test

# API 配置 - 测试环境
NUXT_PUBLIC_API_BASE_URL=https://podesigner.riin.com
NUXT_PUBLIC_API_PREFIX=/pod/cuzcuz-ai
NUXT_PUBLIC_API_PROXY_TARGET=https://podesigner.riin.com
NUXT_PUBLIC_API_PROXY_PREFIX=/pod
NUXT_PUBLIC_API_CLIENT_TYPE=pod-admin
NUXT_PUBLIC_API_AUTH_TOKEN=hpod_tk_25b2c6a0691694b0f52770b0

# 业务配置 - 测试环境
NUXT_PUBLIC_MICRO_POD_URL=http://design.test.com/#/editor?source=shop
NUXT_PUBLIC_GALLERY_URL=https://gallery-test.riin.com
NUXT_PUBLIC_BACKEND_API=https://podesigner.riin.com
NUXT_PUBLIC_CLIENT_TYPE=test

# CLS 日志配置 (可选)
NUXT_PUBLIC_CLS_SECRET_ID=
NUXT_PUBLIC_CLS_SECRET_KEY=
NUXT_PUBLIC_CLS_TOPIC_ID=
NUXT_PUBLIC_CLS_ENDPOINT=
```

同样，确保 `.env.production` 文件包含生产环境的配置。

## 使用方法

现在您可以正确使用不同环境的构建命令：

```bash
# 开发环境构建
npm run build:dev

# 测试环境构建  
npm run build:test

# 生产环境构建
npm run build:prod
```

每个命令都会：
1. 设置正确的 `NUXT_ENV` 环境变量
2. 加载对应的 `.env.*` 文件
3. 使用正确的 API 配置进行构建

## 验证方法

构建完成后，您可以检查生成的文件或运行时配置，确认 `NUXT_PUBLIC_API_BASE_URL` 等变量使用了正确的测试环境或生产环境值。

## 注意事项

1. 确保 `.env.test` 和 `.env.production` 文件存在且配置正确
2. 这些 `.env.*` 文件已在 `.gitignore` 中被忽略，不会提交到代码仓库
3. 每个环境的 API 地址和配置都应该设置为对应环境的正确值 