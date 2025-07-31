import { get, post } from '../index'
import { buildApiPath } from '../apiConfig'
import type { ApiResponse } from '../apiConfig'

// 文生图统计数据类型
export interface TextToImageStatsData {
  count: string                // 总生图数
  successCount: string         // 成功数量
  failedCount: string          // 失败数量
  successRate: number          // 成功率
  inProgressCount: string      // 进行中数量
  todayCount: string           // 今日生图数
}

// 任务列表查询参数
export interface TaskListParams {
  page?: number
  limit?: number
  taskId?: string
  status?: string
  startTime?: string
  endTime?: string
  userId?: string
}

// 获取文生图统计数据
export const getTextToImageStats = async (): Promise<ApiResponse<TextToImageStatsData>> => {
  const url = buildApiPath('/text/image/total')
  return get(url)
}

// 获取文生图任务列表
export const getTextToImageTaskList = async (params: TaskListParams): Promise<ApiResponse<any>> => {
  const url = buildApiPath('/text/image/getTaskList')
  return get(url, params)
}

// 获取文生图任务详情
export const getTextToImageTaskDetail = async (params: { taskId: string; page?: number; limit?: number }): Promise<ApiResponse<any>> => {
  const url = buildApiPath('/text/image/getList')
  return get(url, params)
}

// 创建文生图任务参数
export interface CreateTextToImageTaskParams {
  prompt: string               // 生图提示词
  negativePrompt?: string      // 负面提示词
  width: number               // 图片宽度
  height: number              // 图片高度
  count: number               // 生成数量
  style?: string              // 生成风格
  seed?: number               // 随机种子
}

// 创建文生图任务
export const createTextToImageTask = async (params: CreateTextToImageTaskParams): Promise<ApiResponse<any>> => {
  const url = buildApiPath('/text/image/addTask')
  return post(url, params)
}

export default {
  getTextToImageStats,
  getTextToImageTaskList,
  getTextToImageTaskDetail,
  createTextToImageTask
} 