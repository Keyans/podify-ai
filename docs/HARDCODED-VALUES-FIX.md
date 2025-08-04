# 硬编码数值修复文档

## 📝 问题描述

项目中多个页面存在硬编码的数量值 `'100'`，导致显示不准确。应该使用实际的数据字段 `cropperNum` 来显示真实的目标数量。

## 🔧 修复内容

### 1. 文生图页面 (`text-to-image.vue`)
**位置**: 第321行  
**修复前**: `目标: item.size || item.targetCount || '100'`  
**修复后**: `目标: item.cropperNum || item.targetCount || item.size || '0'`

### 2. 标题生成页面 (`title-generation.vue`)
**位置**: 第322行  
**修复前**: `目标: item.size || item.targetCount || '100'`  
**修复后**: `目标: item.cropperNum || item.targetCount || item.size || '0'`

### 3. 检测页面 (`detection.vue`)
**位置**: 第326行  
**修复前**: `目标: item.size || item.targetCount || '100'`  
**修复后**: `目标: item.cropperNum || item.targetCount || item.size || '0'`

### 4. 收藏表格组件 (`CollectionTable.vue`)

#### 4.1 目标数量显示
**位置**: 第181行  
**修复前**: `目标：{{ item.targetCount || 100 }}`  
**修复后**: `目标：{{ item.cropperNum || item.targetCount || '0' }}`

#### 4.2 成功数量函数
**位置**: 第525行  
**修复前**: 硬编码返回 `'100'`, `'0'`, `'95'`  
**修复后**: 使用实际字段 `item.successCount`, `item.current`，或根据状态和目标数量计算

#### 4.3 进度百分比函数
**位置**: 第532行  
**修复前**: 硬编码返回固定百分比  
**修复后**: 根据实际成功数量和目标数量计算百分比

### 5. 任务表格组件 (`TaskTable.vue`)
**位置**: 第701行  
**修复前**: `return item.targetCount || item.目标 || 100`  
**修复后**: `return item.cropperNum || item.targetCount || item.目标 || '0'`

### 6. 采集页面 (`collection.vue`)
**位置**: 第650行  
**修复前**: `targetCount: formData.targetCount || 100`  
**修复后**: `targetCount: formData.targetCount || 1`  
**说明**: 创建任务时的默认值，从100改为1（最小合理值）

## 🎯 字段优先级

所有修复都遵循以下字段优先级：

1. **`cropperNum`** - 主要的数量字段
2. **`targetCount`** - 备用目标数量字段  
3. **`size`** - 尺寸/数量字段
4. **`current`** - 当前数量字段（用于成功数量）
5. **`successCount`** - 成功数量字段

## ✅ 修复效果

- ✅ **准确显示**: 显示真实的目标数量而不是固定的100
- ✅ **动态计算**: 成功率和进度基于实际数据计算
- ✅ **数据一致性**: 所有页面使用相同的字段优先级
- ✅ **向下兼容**: 如果新字段不存在，仍能正常显示

## 🚫 不需要修复的地方

以下地方的100是合理的，不需要修改：

- `login.vue` - CSS样式中的像素值
- `images/overview.vue` - 存储空间大小（100GB）

## 📊 测试建议

1. **创建任务**: 输入不同的目标数量，验证显示正确
2. **列表显示**: 检查所有相关页面的目标数量显示
3. **进度条**: 验证进度条根据实际数据计算
4. **边界情况**: 测试数量为0或空值的情况

---

**修复时间**: 2024年1月  
**影响页面**: 6个文件，8个修复点  
**状态**: ✅ 已完成 