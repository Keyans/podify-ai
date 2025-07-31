import { get, post } from '../index'
import { buildApiPath } from '../apiConfig'
import type { ApiResponse } from '../apiConfig'

// 超级复变统计数据类型
export interface FissionStatsData {
  count: string                // 总复变数
  successCount: string         // 成功数量
  failedCount: string          // 失败数量
  successRate: number          // 成功率
  inProgressCount: string      // 进行中数量
  todayCount: string           // 今日复变数
}

// 任务列表查询参数
export interface FissionTaskListParams {
  page?: number
  limit?: number
  taskId?: string
  status?: string
  startTime?: string
  endTime?: string
  userId?: string
}

// 任务详情查询参数
export interface FissionTaskDetailParams {
  taskId?: string
  fissionNum?: string  // 根据接口可能使用的参数名
  page?: number
  limit?: number
}

// 获取超级复变统计数据
export const getFissionStats = async (): Promise<ApiResponse<FissionStatsData>> => {
  const url = buildApiPath('/super/fission/total')
  return get(url)
}

// 获取超级复变任务列表
export const getFissionTaskList = async (params?: FissionTaskListParams): Promise<ApiResponse<any>> => {
  const url = buildApiPath('/super/fission/getTaskList')
  return get(url, params)
}

// 获取超级复变任务详情列表
export const getFissionTaskDetail = async (params: FissionTaskDetailParams): Promise<ApiResponse<any>> => {
  const url = buildApiPath('/super/fission/getList')
  return get(url, params)
}

// 图片信息类型
export interface FissionImageInfo {
  imageName: string
  imageUrl: string
  fileSize: number
  width: number
  height: number
  format: string
}

// 创建复变任务参数
export interface CreateFissionTaskParams {
  uploadType: number  // 1: 本地上传, 2: 图库上传
  fissionNum: number  // 裂变数量
  imageList: FissionImageInfo[]
}

// 创建超级复变任务
export const createFissionTask = async (params: CreateFissionTaskParams): Promise<ApiResponse<any>> => {
  const url = buildApiPath('/super/fission/addTask')
  return post(url, params)
}

export default {
  getFissionStats,
  getFissionTaskList,
  getFissionTaskDetail,
  createFissionTask
} 