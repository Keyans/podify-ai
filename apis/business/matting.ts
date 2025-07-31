import { get, post } from '../index'
import { buildApiPath } from '../apiConfig'

// API响应类型定义
export interface ApiResponse<T = any> {
  success: boolean
  code: number
  message: string
  data: T
  timestamp?: string
  error?: boolean
}

// 抠图统计数据类型
export interface MattingStatsData {
  count: string
  successCount: string
  failedCount: string
  successRate: number
  inProgressCount: string
  todayCount: string
}

// 抠图任务列表参数类型
export interface MattingTaskListParams {
  page?: number
  limit?: number
  taskId?: string
  status?: number | string
  startTime?: string
  endTime?: string
  userId?: string
}

// 抠图任务详情参数类型
export interface MattingTaskDetailParams {
  taskId: string
  page?: number
  limit?: number
}

// 图片信息类型
export interface ImageInfo {
  imageName: string
  imageUrl: string
  fileSize: number
  width: number
  height: number
  format: string
}

// 创建抠图任务参数类型
export interface CreateMattingTaskParams {
  uploadType: number // 1: 本地上传, 2: 图库上传
  imageList: ImageInfo[]
}

// 获取抠图统计数据
export const getMattingStats = async (): Promise<ApiResponse<MattingStatsData>> => {
  const url = buildApiPath('/smart/matting/total')
  return get(url)
}

// 获取抠图任务列表
export const getMattingTaskList = async (params: MattingTaskListParams): Promise<ApiResponse<any>> => {
  const url = buildApiPath('/smart/matting/getTaskList')
  return get(url, params)
}

// 获取抠图任务详情
export const getMattingTaskDetail = async (params: MattingTaskDetailParams): Promise<ApiResponse<any>> => {
  const url = buildApiPath('/smart/matting/getList')
  return get(url, params)
}

// 创建抠图任务
export const createMattingTask = async (params: CreateMattingTaskParams): Promise<ApiResponse<any>> => {
  const url = buildApiPath('/smart/matting/addTask')
  return post(url, params)
}

export default {
  getMattingStats,
  getMattingTaskList,
  getMattingTaskDetail,
  createMattingTask
} 