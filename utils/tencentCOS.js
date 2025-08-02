/**
 * 腾讯云COS上传工具类
 * 使用官方cos-js-sdk-v5进行文件上传
 */

import COS from "cos-js-sdk-v5";
import { getTencentCosCredentials } from "~/apis/business/oss";

class TencentCOS {
  constructor() {
    this.cos = null;
    this.credentials = null;
    this.credentialsExpireTime = null;
    this.initPromise = null; // Promise锁
  }

  /**
   * 获取临时密钥并初始化COS实例
   */
  async initCOS() {
    if (this.initPromise) return this.initPromise; // 如果已有请求，直接复用
    this.initPromise = (async () => {
      try {
        console.log("🔑 开始获取腾讯云COS临时密钥...");

        const result = await getTencentCosCredentials();

        if (!result || !result.success || !result.data) {
          throw new Error(result?.message || "获取临时密钥失败");
        }

        // 提取临时密钥信息
        console.log("🔍 解析临时密钥响应:", result.data);

        let credentialsData = result.data;

        // 如果data下还有data，则使用嵌套的data
        if (credentialsData.data && typeof credentialsData.data === "object") {
          credentialsData = credentialsData.data;
        }

        const {
          tmpSecretId,
          tmpSecretKey,
          sessionToken,
          expiredTime,
          bucket,
          region,
          prefix = "",
          bucketName, // 可能的备选字段名
          pathPrefix, // 可能的备选字段名
        } = credentialsData;

        // 使用备选字段名
        const finalBucket = bucket || bucketName;
        const finalPrefix = prefix || pathPrefix || "";

        if (!tmpSecretId || !tmpSecretKey || !sessionToken) {
          throw new Error("临时密钥信息不完整");
        }

        if (!finalBucket || !region) {
          throw new Error(
            `存储桶或地域信息缺失: bucket=${finalBucket}, region=${region}`
          );
        }

        this.credentials = {
          tmpSecretId,
          tmpSecretKey,
          sessionToken,
          bucket: finalBucket,
          region,
          prefix: `${finalPrefix}/`,
        };

        // 保存过期时间
        this.credentialsExpireTime = expiredTime
          ? new Date(expiredTime * 1000)
          : new Date(Date.now() + 3600 * 1000); // 默认1小时

        // 初始化COS实例
        this.cos = new COS({
          SecretId: tmpSecretId,
          SecretKey: tmpSecretKey,
          SecurityToken: sessionToken,
          // 可选配置
          FileParallelLimit: 3, // 控制文件上传并发数
          ChunkParallelLimit: 8, // 控制单个文件下分片上传并发数，在同园区上传可以设置较大的并发数
          ChunkSize: 1024 * 1024 * 8, // 控制分片大小，单位 B，在同园区上传可以设置较大的分片大小
          SliceSize: 1024 * 1024 * 8, // 使用分片上传的文件大小阈值，小于等于该数值的文件使用简单上传，大于该数值的文件使用分片上传
          ProgressInterval: 1000, // 控制上传进度回调的间隔
        });

        console.log("✅ COS实例初始化成功", {
          bucket: finalBucket,
          region,
          prefix: `${finalPrefix}/`,
          expireTime: this.credentialsExpireTime.toLocaleString(),
        });

        return true;
      } catch (error) {
        console.error("❌ COS初始化失败:", error);
        throw error;
      } finally {
        this.initPromise = null; // 清空Promise锁
      }
    })();
    return this.initPromise;
  }

  /**
   * 检查凭证是否需要刷新
   */
  needRefreshCredentials() {
    if (!this.credentials || !this.credentialsExpireTime) {
      return true;
    }

    // 提前5分钟刷新凭证
    const now = new Date();
    const refreshTime = new Date(
      this.credentialsExpireTime.getTime() - 5 * 60 * 1000
    );

    return now >= refreshTime;
  }

  /**
   * 确保COS实例可用
   */
  async ensureCOSReady() {
    if (!this.cos || this.needRefreshCredentials()) {
      await this.initCOS();
    }
  }

  /**
   * 检查COS凭证状态
   * @returns {Object} 凭证状态信息
   */
  async checkCredentialsStatus() {
    const status = {
      hasCredentials: !!this.credentials,
      hasValidCredentials: false,
      expireTime: null,
      needRefresh: false,
      error: null
    };

    try {
      if (this.credentials && this.credentialsExpireTime) {
        status.hasValidCredentials = true;
        status.expireTime = this.credentialsExpireTime.toLocaleString();
        status.needRefresh = this.needRefreshCredentials();
      }

      // 尝试获取新的凭证
      if (!this.credentials || this.needRefreshCredentials()) {
        console.log('🔄 尝试获取新的COS凭证...');
        await this.initCOS();
        status.hasCredentials = true;
        status.hasValidCredentials = true;
        status.expireTime = this.credentialsExpireTime.toLocaleString();
        status.needRefresh = false;
      }

    } catch (error) {
      console.error('❌ COS凭证获取失败:', error);
      status.error = {
        message: error.message,
        code: error.code,
        statusCode: error.statusCode
      };
    }

    return status;
  }

  /**
   * 生成文件名
   */
  generateFileName(originalName, prefix = "", options = {}) {
    // 获取 galleryType
    const galleryType = options?.galleryType;
    // 获取当前日期 yyyyMMdd
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    const dateStr = `${yyyy}${mm}${dd}`;

    // 只在有 galleryType 时拼接
    let path = prefix;
    if (galleryType === "official" || galleryType === "application") {
      const typeDir = galleryType === "official" ? "official" : "application";
      // 确保 prefix 末尾无 /
      path = path.replace(/\/$/, "");
      path = `${path}/${typeDir}/${dateStr}`;
    }
    // 拼接原始文件名，前加时间戳和随机数
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8);
    const fileExtension = originalName.split(".").pop();
    const baseName = originalName.split(".").slice(0, -1).join(".");
    return `${path}/${baseName}_${timestamp}_${randomStr}.${fileExtension}`;
  }

  /**
   * 获取图片尺寸
   */
  getImageDimensions(file) {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith("image/")) {
        reject(new Error("不是图片文件"));
        return;
      }

      const img = new Image();
      const url = URL.createObjectURL(file);

      img.onload = () => {
        URL.revokeObjectURL(url);
        resolve({
          width: img.naturalWidth,
          height: img.naturalHeight,
        });
      };

      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error("无法加载图片"));
      };

      img.src = url;
    });
  }

  /**
   * 上传单个文件
   * @param {File} file 要上传的文件
   * @param {Object} options 上传选项
   * @returns {Promise} 上传结果
   */
  async uploadFile(file, options = {}) {
    try {
      await this.ensureCOSReady();

      const {
        folder = "",
        onProgress = null,
        customFileName = null,
        bucketId = "",
        galleryType = "application", // 默认使用application类型
      } = options;

      // 生成文件名 - 使用prefix和galleryType
      const fileName = customFileName || this.generateFileName(
        file.name, 
        this.credentials?.prefix || "", 
        { galleryType }
      );
      const key = folder ? `${folder}/${fileName}` : fileName;

      console.log("📤 开始上传文件:", {
        originalName: file.name,
        key,
        size: file.size,
        type: file.type,
        galleryType,
        bucket: this.credentials?.bucket,
        region: this.credentials?.region
      });

      return new Promise(async (resolve, reject) => {
        this.cos.uploadFile(
          {
            Bucket: this.credentials?.bucket || "",
            Region: this.credentials?.region || "",
            Key: key,
            Body: file,
            SliceSize: 1024 * 1024 * 5, // 5MB分片
            onProgress: (progressData) => {
              const percent = Math.round(progressData.percent * 100);
              console.log(`📊 上传进度: ${percent}%`);

              if (onProgress && typeof onProgress === "function") {
                onProgress({
                  percent,
                  loaded: progressData.loaded,
                  total: progressData.total,
                  speed: progressData.speed,
                });
              }
            },
            onTaskReady: (taskId) => {
              console.log("📋 上传任务已创建:", taskId);
            },
          },
          async (err, data) => {
            if (err) {
              console.error("❌ 文件上传失败:", err);
              reject(new Error(err.message || "文件上传失败"));
            } else {
              const fileUrl = `https://${data.Location}`;
              console.log("✅ 文件上传成功:", fileUrl);

              const uploadResult = {
                success: true,
                url: fileUrl,
                key: data.Key,
                location: data.Location,
                etag: data.ETag,
                versionId: data.VersionId,
                fileName: fileName,
                originalName: file.name,
                size: file.size,
                type: file.type,
                bucketId,
              };

              // 如果是图片文件，尝试获取尺寸信息
              if (file.type && file.type.startsWith("image/")) {
                try {
                  const dimensions = await this.getImageDimensions(file);
                  if (dimensions) {
                    uploadResult.width = dimensions.width;
                    uploadResult.height = dimensions.height;
                    console.log("📐 获取图片尺寸:", dimensions);
                  }
                } catch (dimError) {
                  console.warn("⚠️ 获取图片尺寸失败:", dimError.message);
                }
              }

              resolve(uploadResult);
            }
          }
        );
      });
    } catch (error) {
      console.error("❌ 上传文件异常:", error);
      throw error;
    }
  }

  /**
   * 批量上传文件
   * @param {Array} files 文件数组
   * @param {Object} options 上传选项
   * @returns {Promise} 上传结果数组
   */
  async uploadFiles(files, options = {}) {
    const results = [];
    const {
      concurrent = 3, // 并发上传数量
      onFileProgress = null,
      onOverallProgress = null,
      galleryType = "application", // 默认使用application类型
    } = options;

    console.log(
      `📤 开始批量上传 ${files.length} 个文件，并发数: ${concurrent}，galleryType: ${galleryType}`
    );

    // 分批处理文件
    for (let i = 0; i < files.length; i += concurrent) {
      const batch = files.slice(i, i + concurrent);

      const batchPromises = batch.map(async (file, index) => {
        try {
          const fileIndex = i + index;
          const result = await this.uploadFile(file, {
            ...options,
            galleryType,
            onProgress: (progress) => {
              if (onFileProgress) {
                onFileProgress(fileIndex, progress, file);
              }
            },
          });

          // 计算整体进度
          if (onOverallProgress) {
            const completedCount = results.filter((r) => r.success).length + 1;
            const overallPercent = Math.round(
              (completedCount / files.length) * 100
            );
            onOverallProgress(overallPercent, completedCount, files.length);
          }

          return result;
        } catch (error) {
          console.error(`❌ 文件 ${file.name} 上传失败:`, error);
          return {
            success: false,
            error: error.message,
            fileName: file.name,
            originalName: file.name,
          };
        }
      });

      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);
    }

    const successCount = results.filter((r) => r.success).length;
    const errorCount = results.filter((r) => !r.success).length;

    console.log(
      `📊 批量上传完成: 成功 ${successCount} 个，失败 ${errorCount} 个`
    );

    return {
      results,
      success: successCount,
      error: errorCount,
      total: files.length,
    };
  }

  /**
   * 删除文件
   * @param {string} key 文件key
   * @returns {Promise} 删除结果
   */
  async deleteFile(key) {
    try {
      await this.ensureCOSReady();

      return new Promise((resolve, reject) => {
        this.cos.deleteObject(
          {
            Bucket: this.credentials?.bucket || "",
            Region: this.credentials?.region || "",
            Key: key,
          },
          (err, data) => {
            if (err) {
              console.error("❌ 文件删除失败:", err);
              reject(new Error(err.message || "文件删除失败"));
            } else {
              console.log("✅ 文件删除成功:", key);
              resolve({
                success: true,
                key,
                statusCode: data.statusCode,
              });
            }
          }
        );
      });
    } catch (error) {
      console.error("❌ 删除文件异常:", error);
      throw error;
    }
  }

  /**
   * 获取文件URL（带签名，用于私有访问）
   * @param {string} key 文件key
   * @param {number} expires 过期时间（秒），默认1小时
   * @returns {string} 签名URL
   */
  async getSignedUrl(key, expires = 3600) {
    try {
      await this.ensureCOSReady();

      const url = this.cos.getObjectUrl({
        Bucket: this.credentials?.bucket || "",
        Region: this.credentials?.region || "",
        Key: key,
        Sign: true,
        Expires: expires,
      });

      return url;
    } catch (error) {
      console.error("❌ 获取签名URL失败:", error);
      throw error;
    }
  }

  /**
   * 检查文件是否存在
   * @param {string} key 文件key
   * @returns {Promise<boolean>} 文件是否存在
   */
  async fileExists(key) {
    try {
      await this.ensureCOSReady();

      return new Promise((resolve) => {
        this.cos.headObject(
          {
            Bucket: this.credentials?.bucket || "",
            Region: this.credentials?.region || "",
            Key: key,
          },
          (err, data) => {
            if (err) {
              resolve(false);
            } else {
              resolve(true);
            }
          }
        );
      });
    } catch (error) {
      console.error("❌ 检查文件存在异常:", error);
      return false;
    }
  }

  /**
   * 测试CORS配置
   * @returns {Promise} CORS测试结果
   */
  async testCorsConfiguration() {
    try {
      // 先尝试获取凭证，如果失败则使用默认的bucket信息进行CORS测试
      let testUrl;
      let bucket, region;
      
      try {
        await this.ensureCOSReady();
        testUrl = `https://${this.credentials.bucket}.cos.${this.credentials.region}.myqcloud.com/`;
        bucket = this.credentials.bucket;
        region = this.credentials.region;
      } catch (credError) {
        console.warn('⚠️ 获取COS凭证失败，使用默认配置进行CORS测试:', credError.message);
        // 使用已知的bucket信息进行CORS测试
        bucket = 'aimall-test-1316029341';
        region = 'ap-guangzhou';
        testUrl = `https://${bucket}.cos.${region}.myqcloud.com/`;
      }
      const results = {
        testUrl: testUrl,
        origin: window.location.origin,
        bucket: bucket,
        region: region,
        credentialsStatus: this.credentials ? '✅ 凭证获取成功' : '⚠️ 凭证获取失败，使用默认配置'
      };
      
      // 测试1：网络连通性测试 (HEAD请求)
      try {
        console.log('🔍 测试COS域名连通性:', testUrl);
        const headResponse = await fetch(testUrl, {
          method: 'HEAD',
          mode: 'no-cors' // 绕过CORS检查，只测试连通性
        });
        results.CONNECTIVITY = {
          success: true,
          message: 'COS域名可访问'
        };
      } catch (error) {
        results.CONNECTIVITY = {
          success: false,
          error: error.message,
          message: 'COS域名无法访问，请检查网络连接'
        };
      }
      
      // 测试2：预检请求 (OPTIONS)
      try {
        console.log('🔍 测试CORS预检请求:', {
          url: testUrl,
          origin: window.location.origin,
          method: 'OPTIONS'
        });
        
        const optionsResponse = await fetch(testUrl, {
          method: 'OPTIONS',
          headers: {
            'Origin': window.location.origin,
            'Access-Control-Request-Method': 'PUT',
            'Access-Control-Request-Headers': 'authorization,content-type,x-cos-security-token'
          }
        });
        
        const responseHeaders = Object.fromEntries(optionsResponse.headers.entries());
        
        results.OPTIONS = {
          success: optionsResponse.ok,
          status: optionsResponse.status,
          statusText: optionsResponse.statusText,
          headers: responseHeaders,
          corsHeaders: {
            allowOrigin: responseHeaders['access-control-allow-origin'],
            allowMethods: responseHeaders['access-control-allow-methods'],
            allowHeaders: responseHeaders['access-control-allow-headers'],
            maxAge: responseHeaders['access-control-max-age']
          }
        };
        
        // 检查CORS配置是否正确
        if (optionsResponse.ok) {
          const allowOrigin = responseHeaders['access-control-allow-origin'];
          const allowMethods = responseHeaders['access-control-allow-methods'];
          
          results.OPTIONS.analysis = {
            originAllowed: allowOrigin === '*' || allowOrigin === window.location.origin,
            methodsAllowed: allowMethods && (allowMethods.includes('PUT') || allowMethods.includes('*')),
            recommendation: allowOrigin === '*' ? 
              '✅ CORS配置正确，允许所有域名' : 
              allowOrigin === window.location.origin ? 
                '✅ CORS配置正确，允许当前域名' : 
                '❌ CORS配置需要添加当前域名：' + window.location.origin
          };
        }
        
      } catch (error) {
        results.OPTIONS = {
          success: false,
          error: error.message,
          analysis: {
            diagnosis: this.diagnoseCorsError(error.message),
            recommendation: this.getCorsRecommendation()
          }
        };
      }
      
      return results;
    } catch (error) {
      console.error("❌ CORS配置测试失败:", error);
      throw error;
    }
  }

  /**
   * 诊断CORS错误
   * @param {string} errorMessage 错误消息
   * @returns {string} 诊断结果
   */
  diagnoseCorsError(errorMessage) {
    if (errorMessage.includes('Failed to fetch')) {
      return '🚨 CORS预检请求被阻止 - 这是典型的CORS配置问题';
    } else if (errorMessage.includes('Network error')) {
      return '🌐 网络连接问题 - 请检查网络或DNS设置';
    } else if (errorMessage.includes('CORS')) {
      return '🔒 CORS策略阻止 - 需要在COS控制台配置CORS规则';
    } else {
      return '❓ 未知错误 - ' + errorMessage;
    }
  }

  /**
   * 获取CORS配置建议
   * @returns {string} 配置建议
   */
  getCorsRecommendation() {
    return `
请在腾讯云COS控制台配置CORS规则：
1. 登录腾讯云控制台 → 对象存储 → 存储桶列表
2. 选择存储桶：${this.credentials?.bucket}
3. 权限管理 → 跨域访问CORS → 添加规则
4. 配置以下规则：
   - 来源Origin: ${window.location.origin}
   - 方法Method: GET,PUT,POST,DELETE,HEAD
   - 允许的Header: *
   - 暴露的Header: ETag,x-cos-version-id
   - 超时Max-Age: 3600
    `;
  }

  /**
   * 直接上传文件（用于调试）
   * @param {File} file 文件
   * @param {Object} options 选项
   * @returns {Promise} 上传结果
   */
  async directUpload(file, options = {}) {
    try {
      await this.ensureCOSReady();

      const fileName = this.generateFileName(
        file.name, 
        this.credentials?.prefix || "", 
        { galleryType: options.galleryType || 'application' }
      );
      const key = fileName;

      console.log("🔧 直接上传配置:", {
        bucket: this.credentials?.bucket,
        region: this.credentials?.region,
        key: key,
        origin: window.location.origin
      });

      return new Promise((resolve, reject) => {
        this.cos.uploadFile(
          {
            Bucket: this.credentials?.bucket || "",
            Region: this.credentials?.region || "",
            Key: key,
            Body: file,
            Headers: {
              'Cache-Control': 'max-age=31536000'
            },
            onProgress: options.onProgress,
            onTaskReady: (taskId) => {
              console.log("📋 直接上传任务已创建:", taskId);
            },
          },
          (err, data) => {
            if (err) {
              console.error("❌ 直接上传失败:", {
                error: err,
                code: err.code,
                message: err.message,
                statusCode: err.statusCode,
                headers: err.headers
              });
              reject(err);
            } else {
              const fileUrl = `https://${data.Location}`;
              console.log("✅ 直接上传成功:", fileUrl);
              resolve({
                success: true,
                url: fileUrl,
                key: data.Key,
                location: data.Location,
                etag: data.ETag,
                versionId: data.VersionId,
                fileName: fileName,
                originalName: file.name,
                size: file.size,
                type: file.type,
              });
            }
          }
        );
      });
    } catch (error) {
      console.error("❌ 直接上传异常:", error);
      throw error;
    }
  }

  /**
   * 带CORS头的上传（用于调试）
   * @param {File} file 文件
   * @param {Object} options 选项
   * @returns {Promise} 上传结果
   */
  async uploadWithCorsHeaders(file, options = {}) {
    try {
      await this.ensureCOSReady();
      
      const fileName = this.generateFileName(
        file.name, 
        this.credentials?.prefix || "", 
        { galleryType: options.galleryType || 'application' }
      );
      const key = fileName;

      console.log("🔧 带CORS头上传配置:", {
        bucket: this.credentials?.bucket,
        region: this.credentials?.region,
        key: key,
        origin: window.location.origin
      });

      return new Promise((resolve, reject) => {
        this.cos.uploadFile(
          {
            Bucket: this.credentials?.bucket || "",
            Region: this.credentials?.region || "",
            Key: key,
            Body: file,
            Headers: {
              'Cache-Control': 'max-age=31536000',
              'Origin': window.location.origin
            },
            onProgress: options.onProgress,
            onTaskReady: (taskId) => {
              console.log("📋 带CORS头上传任务已创建:", taskId);
            },
          },
          (err, data) => {
            if (err) {
              console.error("❌ 带CORS头上传失败:", {
                error: err,
                code: err.code,
                message: err.message,
                statusCode: err.statusCode,
                headers: err.headers
              });
              reject(err);
            } else {
              const fileUrl = `https://${data.Location}`;
              console.log("✅ 带CORS头上传成功:", fileUrl);
              resolve({
                success: true,
                url: fileUrl,
                key: data.Key,
                location: data.Location,
                etag: data.ETag,
                versionId: data.VersionId,
                fileName: fileName,
                originalName: file.name,
                size: file.size,
                type: file.type,
              });
            }
          }
        );
      });
    } catch (error) {
      console.error("❌ 带CORS头上传异常:", error);
      throw error;
    }
  }
}

// 工具函数：组装 imageList
function buildImageList(results) {
  return results
    .filter((r) => r.success)
    .map((r) => ({
      imageName: (r.originalName || r.fileName).replace(/\.[^/.]+$/, ''),
      imageUrl: r.url,
      fileSize: String(r.size || 0),
      width: r.width || 0,
      height: r.height || 0,
      format: (r.type || "").split("/").pop() || "",
    }));
}

// 创建单例实例
const tencentCOS = new TencentCOS();

export default tencentCOS;
export { TencentCOS, buildImageList }; 