import { get, post } from '../index'
import { buildApiPath } from '../apiConfig'
import type { ApiResponse } from '../apiConfig'

// 图库统计数据类型
export interface GalleryStatsData {
  imageCount: string          // 图片总数
  fileSizeTotal: string       // 存储空间总大小
  todayUploadCount: string    // 今日上传数
  todayProcessedCount: string // 今日处理数
}

// 图库类型枚举
export enum GalleryType {
  ALL = 0,        // 全部/概览
  PRODUCTS = 1,   // 商品图库
  MATERIALS = 2,  // 素材图库
  RESULTS = 3     // 结果图库
}

// 获取图库统计数据的参数
export interface GalleryStatsParams {
  galleryType: GalleryType | number
}

// 图片信息
export interface ImageInfo {
  imageName: string
  imageUrl: string
  createBy: string
  createTime: string
}

// 图库图片列表查询参数
export interface GalleryImageListParams {
  galleryType: GalleryType | number
  page?: number
  limit?: number
  categoryId?: string
  imageName?: string
  startTime?: string
  endTime?: string
  userId?: string
}

// 图库图片列表响应数据
export interface GalleryImageListData {
  current: string
  size: string
  pages: string
  total: string
  imageList: ImageInfo[]
}

// 获取图库统计数据
export const getGalleryStats = async (params: GalleryStatsParams): Promise<ApiResponse<GalleryStatsData>> => {
  const url = buildApiPath('/gallery/image/totalAI')
  return get(url, params)
}

// 获取图库图片列表
export const getGalleryImageList = async (params: GalleryImageListParams): Promise<ApiResponse<GalleryImageListData>> => {
  const url = buildApiPath('/gallery/image/getAIList')
  return get(url, params)
}

// 上传图库图片接口参数
export interface GalleryUploadParams {
  galleryType: GalleryType | number
  categoryId?: string
  imageList: {
    imageName: string
    imageUrl: string
    fileSize?: number
    width?: number
    height?: number
    format?: string
  }[]
}

// 上传图库图片接口
export const uploadGalleryImages = async (params: GalleryUploadParams): Promise<ApiResponse<any>> => {
  const url = buildApiPath('/gallery/image/addAI')
  return post(url, params)
}

// 图库分类接口相关类型定义
export interface CategoryInfo {
  categoryId: string
  categoryName: string
  createBy: string
  createTime: string
  categoryList: CategoryInfo[] // 支持多级分类
}

export interface CategoryListData {
  categoryList: CategoryInfo[]
}

export interface CategoryListParams {
  galleryType: GalleryType | number
}

// 获取图库分类列表
export const getGalleryCategories = async (params: CategoryListParams): Promise<ApiResponse<CategoryListData>> => {
  const url = buildApiPath('/gallery/category/getAIAll')
  return get(url, params)
}

// 添加图库分类接口相关类型定义
export interface AddCategoryParams {
  galleryType: GalleryType | number
  categoryName: string
  parentCategoryId?: string
}

export interface AddCategoryData {
  categoryId: string
}

// 添加图库分类
export const addGalleryCategory = async (params: AddCategoryParams): Promise<ApiResponse<AddCategoryData>> => {
  const url = buildApiPath('/gallery/category/addAI')
  return post(url, params)
}

export default {
  getGalleryStats,
  getGalleryImageList,
  uploadGalleryImages,
  getGalleryCategories,
  addGalleryCategory,
  GalleryType
} 