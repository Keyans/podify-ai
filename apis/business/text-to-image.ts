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
  promptWord: string          // 生图提示词
  creatorSize: number         // 生图尺寸 (0:自定义 1:16:9 2:4:3 3:3:2 4:1:1 5:2:3 6:3:4 7:9:16)
  creatorWidth: number        // 图片宽度
  creatorHeight: number       // 图片高度
  creatorNum: number          // 生成数量
  uploadType?: number         // 上传类型 (1:本地上传 2:图库上传) - 可选，仅有示例图时传递
  imageName?: string          // 图片名称 - 可选，仅有示例图时传递
  imageUrl?: string           // 图片URL - 可选，仅有示例图时传递
  fileSize?: number           // 文件大小 - 可选，仅有示例图时传递
  width?: number              // 示例图宽度 - 可选，仅有示例图时传递
  height?: number             // 示例图高度 - 可选，仅有示例图时传递
  format?: string             // 图片格式 - 可选，仅有示例图时传递
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