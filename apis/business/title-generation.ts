import { get, post } from '../index'
import { buildApiPath } from '../apiConfig'
import type { ApiResponse } from '../apiConfig'

// 标题生成统计数据类型
export interface TitleGenerationStatsData {
  count: string                // 总生成数
  successCount: string         // 成功数量
  failedCount: string          // 失败数量
  successRate: number          // 成功率
  inProgressCount: string      // 进行中数量
  todayCount: string           // 今日生成数
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

// 商品信息类型
export interface ProductInfo {
  id: string                   // 商品ID
  name: string                 // 商品名称
  image: string                // 商品图片
  category: string             // 商品分类
  description?: string         // 商品描述
}

// 创建标题生成任务参数
export interface CreateTitleTaskParams {
  prompt: string               // 生成规律设置（用户输入的要求）
  products: ProductInfo[]      // 选择的商品列表
}

// 获取标题生成统计数据
export const getTitleGenerationStats = async (): Promise<ApiResponse<TitleGenerationStatsData>> => {
  const url = buildApiPath('/title/generation/total')
  return get(url)
}

// 获取标题生成任务列表
export const getTitleGenerationTaskList = async (params: TaskListParams): Promise<ApiResponse<any>> => {
  const url = buildApiPath('/title/generation/getTaskList')
  return get(url, params)
}

// 获取标题生成任务详情
export const getTitleGenerationTaskDetail = async (params: { taskId: string; page?: number; limit?: number }): Promise<ApiResponse<any>> => {
  const url = buildApiPath('/title/generation/getList')
  return get(url, params)
}

// 获取标题生成任务信息
export const getTitleGenerationTaskInfo = async (taskId: string): Promise<ApiResponse<any>> => {
  const url = buildApiPath(`/title/generation/getTask/${taskId}`)
  return get(url)
}

// 创建标题生成任务
export const createTitleGenerationTask = async (params: CreateTitleTaskParams): Promise<ApiResponse<any>> => {
  const url = buildApiPath('/title/generation/addTask')
  return post(url, params)
}

// 获取商品列表（用于选择商品）
export const getProductList = async (params: { page?: number; limit?: number; search?: string; category?: string }): Promise<ApiResponse<any>> => {
  const url = buildApiPath('/products/list')
  return get(url, params)
}

export default {
  getTitleGenerationStats,
  getTitleGenerationTaskList,
  getTitleGenerationTaskDetail,
  getTitleGenerationTaskInfo,
  createTitleGenerationTask,
  getProductList
} 