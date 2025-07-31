import { get, post } from '../index'
import { buildApiPath } from '../apiConfig'

// 腾讯云临时密钥响应数据类型
export interface TencentCosCredentials {
  tmpSecretId: string      // 临时访问密钥ID
  tmpSecretKey: string     // 临时访问密钥Key
  sessionToken: string     // 会话令牌
  startTime: string        // 开始时间
  expiredTime: string      // 过期时间
  bucketName: string       // 存储桶名称
  region: string           // 地域
  pathPrefix: string       // 路径前缀
}

// 获取腾讯云临时密钥
export const getTencentCosCredentials = async () => {
  const url = '/pod/business/oss/tencent/key/temporary'
  return get(url)
}

export default {
  getTencentCosCredentials
} 