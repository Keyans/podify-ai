import { get } from '../index'
import { buildApiPath } from '../apiConfig'
import type { ApiResponse } from '../apiConfig'

// 驾驶舱统计数据类型
export interface DashboardStatsData {
  today: {
    taskCount: string           // 今日任务数
    processedCount: string      // 处理中数量
    completeCount: string       // 完成数量
  }
  yesterday: {
    taskCount: string           // 昨日任务数
    processedCount: string      // 处理中数量
    completeCount: string       // 完成数量
  }
  timestamp: string             // 时间戳
  error: boolean               // 是否有错误
  success: boolean             // 是否成功
}

// 获取驾驶舱统计数据
export const getDashboardStats = async (): Promise<ApiResponse<DashboardStatsData>> => {
  const url = buildApiPath('/index/getTaskTotal')
  return get(url)
}

export default {
  getDashboardStats
} 