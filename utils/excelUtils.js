import * as XLSX from 'xlsx';

/**
 * 将上传的 Excel 文件解析为 JSON 格式的数据
 * @param {File} file - 上传的 Excel 文件对象
 * @param {Object} options - 配置选项
 * @param {string} options.sheetName - 指定要解析的工作表名称，不指定则解析第一个工作表
 * @param {string} options.range - 指定数据范围，如 'A1:D10'
 * @param {boolean} options.header - 是否将第一行作为表头，默认为 true
 * @param {number} options.skipRows - 跳过的行数，默认为 0
 * @returns {Promise<Object>} 返回解析后的 JSON 数据
 */
export const parseExcelToJson = async (file, options = {}) => {
  try {
    // 参数验证
    if (!file) {
      throw new Error('文件不能为空');
    }

    // 检查文件类型
    const allowedTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
      'application/vnd.ms-excel', // .xls
      'application/octet-stream' // 某些情况下的通用类型
    ];

    const fileExtension = file.name.toLowerCase().split('.').pop();
    if (!['xlsx', 'xls'].includes(fileExtension)) {
      throw new Error('不支持的文件格式，请上传 .xlsx 或 .xls 文件');
    }

    // 默认配置
    const config = {
      sheetName: null,
      range: null,
      header: true,
      skipRows: 0,
      ...options
    };

    // 读取文件
    const arrayBuffer = await readFileAsArrayBuffer(file);
    
    // 解析 Excel 文件
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    
    // 获取工作表名称列表
    const sheetNames = workbook.SheetNames;
    
    if (sheetNames.length === 0) {
      throw new Error('Excel 文件中没有找到工作表');
    }

    // 确定要解析的工作表
    let targetSheetName = config.sheetName;
    if (!targetSheetName || !sheetNames.includes(targetSheetName)) {
      targetSheetName = sheetNames[0]; // 使用第一个工作表
    }

    const worksheet = workbook.Sheets[targetSheetName];
    
    if (!worksheet) {
      throw new Error(`工作表 "${targetSheetName}" 不存在`);
    }

    // 解析配置
    const parseOptions = {
      header: config.header ? 1 : undefined,
      range: config.range || undefined,
      defval: '', // 空单元格的默认值
      raw: false // 格式化数据
    };

    // 将工作表转换为 JSON
    let jsonData = XLSX.utils.sheet_to_json(worksheet, parseOptions);
    
    // 跳过指定行数
    if (config.skipRows > 0) {
      jsonData = jsonData.slice(config.skipRows);
    }

    // 数据验证
    if (!Array.isArray(jsonData)) {
      throw new Error('解析结果不是有效的数组格式');
    }

    // 返回结构化数据
    return {
      success: true,
      data: {
        fileName: file.name,
        fileSize: file.size,
        sheetNames: sheetNames,
        currentSheet: targetSheetName,
        totalRows: jsonData.length,
        columns: jsonData.length > 0 ? Object.keys(jsonData[0]) : [],
        rows: jsonData
      },
      message: '文件解析成功'
    };

  } catch (error) {
    console.error('Excel 文件解析失败:', error);
    return {
      success: false,
      data: null,
      message: error.message || '文件解析失败，请检查文件格式是否正确'
    };
  }
};

/**
 * 将文件读取为 ArrayBuffer
 * @param {File} file - 文件对象
 * @returns {Promise<ArrayBuffer>} ArrayBuffer 数据
 */
const readFileAsArrayBuffer = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      resolve(event.target.result);
    };
    
    reader.onerror = (error) => {
      reject(new Error('文件读取失败: ' + error.message));
    };
    
    reader.readAsArrayBuffer(file);
  });
};

/**
 * 验证 Excel 数据格式
 * @param {Array} data - 解析后的数据数组
 * @param {Array} requiredColumns - 必需的列名数组
 * @returns {Object} 验证结果
 */
export const validateExcelData = (data, requiredColumns = []) => {
  try {
    if (!Array.isArray(data) || data.length === 0) {
      return {
        valid: false,
        message: '数据为空或格式不正确'
      };
    }

    // 检查必需的列
    if (requiredColumns.length > 0) {
      const firstRow = data[0];
      const missingColumns = requiredColumns.filter(col => !(col in firstRow));
      
      if (missingColumns.length > 0) {
        return {
          valid: false,
          message: `缺少必需的列: ${missingColumns.join(', ')}`
        };
      }
    }

    return {
      valid: true,
      message: '数据格式验证通过'
    };

  } catch (error) {
    return {
      valid: false,
      message: '数据验证失败: ' + error.message
    };
  }
};

/**
 * 获取 Excel 文件的基本信息
 * @param {File} file - Excel 文件对象
 * @returns {Promise<Object>} 文件信息
 */
export const getExcelFileInfo = async (file) => {
  try {
    const arrayBuffer = await readFileAsArrayBuffer(file);
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    
    const sheetInfo = workbook.SheetNames.map(sheetName => {
      const worksheet = workbook.Sheets[sheetName];
      const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1');
      
      return {
        name: sheetName,
        rowCount: range.e.r + 1,
        columnCount: range.e.c + 1
      };
    });

    return {
      success: true,
      data: {
        fileName: file.name,
        fileSize: file.size,
        sheetCount: workbook.SheetNames.length,
        sheets: sheetInfo
      }
    };

  } catch (error) {
    return {
      success: false,
      message: '获取文件信息失败: ' + error.message
    };
  }
};

export default {
  parseExcelToJson,
  validateExcelData,
  getExcelFileInfo
};