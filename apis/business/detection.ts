import { get, post } from '../index'
import { buildApiPath } from '../apiConfig'
import type { ApiResponse } from '../apiConfig'

// 侵权检测统计数据类型
export interface DetectionStatsData {
  count: string                // 总检测数
  successCount: string         // 成功数量
  failedCount: string          // 失败数量
  successRate: number          // 成功率
  inProgressCount: string      // 进行中数量
  todayCount: string           // 今日检测数
}

// 任务列表查询参数
export interface TaskListParams {
  taskId?: string              // 任务Id
  status?: number              // 状态
  startTime?: string           // 开始时间
  endTime?: string             // 结束时间
  userId?: string              // 用户Id
  page?: number                // 页码
  limit?: number               // 分页数
  taskNo?: string              // 任务编号
  operator?: string            // 操作员
}

// 获取侵权检测统计数据
export const getDetectionStats = async (): Promise<ApiResponse<DetectionStatsData>> => {
  const url = buildApiPath('/infringement/detector/getRiskLevelStatistics')
  return get(url)
}

// 获取侵权检测任务列表 - 使用正确的接口路径
export const getDetectionTaskList = async (params: TaskListParams): Promise<ApiResponse<any>> => {
  const url = buildApiPath('/infringement/detector/getTaskPageList')
  return get(url, params)
}

// 获取侵权检测任务详情列表 - 根据taskId获取检测结果明细
export const getDetectionTaskDetail = async (params: { taskId: string; page?: number; limit?: number }): Promise<ApiResponse<any>> => {
  const url = buildApiPath(`/infringement/detector/getDetectorList/${params.taskId}`)
  // 将page和limit作为query参数
  const queryParams = {
    page: params.page,
    limit: params.limit
  }
  return get(url, queryParams)
}

// 获取侵权检测任务信息 - 获取任务的统计信息
export const getDetectionTaskInfo = async (taskId: string): Promise<ApiResponse<any>> => {
  const url = buildApiPath(`/infringement/detector/getTask/${taskId}`)
  return get(url)
}

// 图片上传到COS的参数类型
export interface ImageUploadData {
  imageName: string            // 图片名称
  imageUrl: string             // 图片URL
  thumbnailImageUrl?: string   // 缩略图URL
  fileSize: number             // 文件大小
  width: number                // 图片宽度
  height: number               // 图片高度
  format: string               // 图片格式
}

// 创建侵权检测任务参数 - 根据API文档结构
export interface CreateDetectionTaskParams {
  uploadType: number           // 上传类型：0-上传图片，1-图库选择
  imageList: ImageUploadData[] // 图片列表（需要先上传到COS）
}

// 创建侵权检测任务 - 使用正确的接口路径
export const createDetectionTask = async (params: CreateDetectionTaskParams): Promise<ApiResponse<any>> => {
  const url = buildApiPath('/infringement/detector/createTask')
  return post(url, params)
}

export default {
  getDetectionStats,
  getDetectionTaskList,
  getDetectionTaskDetail,
  getDetectionTaskInfo,
  createDetectionTask
} 