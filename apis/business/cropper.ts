import { get, post } from '../index'
import { buildApiPath } from '../apiConfig'
import type { ApiResponse } from '../apiConfig'

// 智能裁图统计数据类型
export interface CropperStatsData {
  count: string                // 总裁图数
  successCount: string         // 成功数量
  failedCount: string          // 失败数量
  successRate: number          // 成功率
  inProgressCount: string      // 进行中数量
  todayCount: string           // 今日裁图数
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

// 任务详情查询参数
export interface TaskDetailParams {
  taskId?: string
  cropperId?: string  // 根据接口可能使用的参数名
  page?: number
  limit?: number
}

// 获取智能裁图统计数据
export const getCropperStats = async (): Promise<ApiResponse<CropperStatsData>> => {
  const url = buildApiPath('/smart/cropper/total')
  return get(url)
}

// 获取智能裁图任务列表
export const getCropperTaskList = async (params?: TaskListParams): Promise<ApiResponse<any>> => {
  const url = buildApiPath('/smart/cropper/getTaskList')
  return get(url, params)
}

// 获取智能裁图任务详情列表
export const getCropperTaskDetail = async (params: TaskDetailParams): Promise<ApiResponse<any>> => {
  const url = buildApiPath('/smart/cropper/getList')
  return get(url, params)
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

// 创建裁图任务参数
export interface CreateCropperTaskParams {
  uploadType: number  // 1: 本地上传, 2: 图库上传
  imageList: ImageInfo[]
}

// 创建智能裁图任务
export const createCropperTask = async (params: CreateCropperTaskParams): Promise<ApiResponse<any>> => {
  const url = buildApiPath('/smart/cropper/addTask')
  return post(url, params)
}

export default {
  getCropperStats,
  getCropperTaskList,
  getCropperTaskDetail,
  createCropperTask
} 