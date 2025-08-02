/**
 * COS上传问题快速调试工具
 */

// 快速检查COS配置
export const quickDebugCOS = async () => {
  const results = {
    timestamp: new Date().toLocaleString(),
    checks: []
  }

  // 1. 检查网络连接
  try {
    const testUrl = 'https://www.baidu.com'
    const response = await fetch(testUrl, { method: 'HEAD', mode: 'no-cors' })
    results.checks.push({
      name: '网络连接',
      status: 'success',
      message: '网络连接正常'
    })
  } catch (error) {
    results.checks.push({
      name: '网络连接',
      status: 'error', 
      message: `网络连接异常: ${error.message}`
    })
  }

  // 2. 检查当前域名
  results.checks.push({
    name: '当前域名',
    status: 'info',
    message: `当前访问域名: ${window.location.origin}`
  })

  // 3. 检查环境变量
  const env = process.env.NODE_ENV || 'unknown'
  results.checks.push({
    name: '环境变量',
    status: 'info',
    message: `当前环境: ${env}`
  })

  return results
}

// 生成CORS配置建议
export const generateCorsConfig = (currentOrigin) => {
  return {
    development: {
      allowedOrigins: ["http://localhost:3000", "http://127.0.0.1:3000"],
      config: `{
  "CORSRules": [
    {
      "AllowedOrigins": ["http://localhost:3000", "http://127.0.0.1:3000"],
      "AllowedMethods": ["GET", "PUT", "POST", "DELETE", "HEAD"],
      "AllowedHeaders": ["*"],
      "ExposeHeaders": ["ETag", "x-cos-version-id"],
      "MaxAgeSeconds": 3600
    }
  ]
}`
    },
    current: {
      allowedOrigins: [currentOrigin],
      config: `{
  "CORSRules": [
    {
      "AllowedOrigins": ["${currentOrigin}"],
      "AllowedMethods": ["GET", "PUT", "POST", "DELETE", "HEAD"], 
      "AllowedHeaders": ["*"],
      "ExposeHeaders": ["ETag", "x-cos-version-id"],
      "MaxAgeSeconds": 3600
    }
  ]
}`
    },
    universal: {
      allowedOrigins: ["*"],
      config: `{
  "CORSRules": [
    {
      "AllowedOrigins": ["*"],
      "AllowedMethods": ["GET", "PUT", "POST", "DELETE", "HEAD"],
      "AllowedHeaders": ["*"], 
      "ExposeHeaders": ["ETag", "x-cos-version-id"],
      "MaxAgeSeconds": 3600
    }
  ]
}`,
      warning: "⚠️ 通用配置允许所有域名访问，生产环境请谨慎使用"
    }
  }
} 