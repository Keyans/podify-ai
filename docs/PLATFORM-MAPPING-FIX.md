# 采集平台类型映射修正

## 🎯 **问题描述**
用户反馈采集类型显示不正确，所有采集记录都显示为"亚马逊"，实际上应该根据 `collectorPlatform` 字段的值显示对应的平台名称。

## 📋 **正确的平台映射关系**
根据后端接口定义，`collectorPlatform` 字段的值应该对应：

| 数值 | 平台名称 |
|------|----------|
| 1    | TEMU     |
| 2    | 亚马逊   |
| 3    | Shein    |
| 4    | 1688     |
| 5    | 淘宝     |

## ✅ **已修正的文件**

### 1. `pages/dashboard/apps/collection.vue`
**修正内容**: `getCollectorPlatformText` 函数的平台映射

```javascript
// 修正前
const platformMap = {
  1: '亚马逊',  // ❌ 错误
  2: 'TEMU',     // ❌ 错误
  3: 'Shein',
  4: '1688',
  5: '淘宝'
}

// 修正后  
const platformMap = {
  1: 'TEMU',     // ✅ 正确
  2: '亚马逊',   // ✅ 正确
  3: 'Shein',
  4: '1688', 
  5: '淘宝'
}
```

### 2. `pages/dashboard/images/products.vue`
**修正内容**: `getPlatformName` 函数的平台映射

```javascript
// 修正前
const platformMap = {
  1: 'Temu',        // 英文名称
  2: 'Amazon',      // 英文名称
  3: 'eBay',        // 不匹配的平台
  4: 'AliExpress'   // 不匹配的平台
}

// 修正后
const platformMap = {
  1: 'TEMU',     // ✅ 统一中文名称
  2: '亚马逊',   // ✅ 统一中文名称
  3: 'Shein',    // ✅ 正确的平台
  4: '1688',     // ✅ 正确的平台
  5: '淘宝'      // ✅ 新增平台
}
```

## 🔍 **其他平台标识**

系统中还存在字符串形式的平台标识，这些**无需修改**：

### 表单选项值 (正确)
```javascript
// 在各种表单组件中使用
value="temu"    → 显示 "TEMU"
value="amazon"  → 显示 "亚马逊" 
value="shein"   → 显示 "Shein"
```

### 涉及的组件
- ✅ `components/CollectionNewTaskModal.vue` - 表单选项正确
- ✅ `components/TaskModal.vue` - 表单选项正确
- ✅ `components/TaskTable.vue` - 颜色映射使用字符串，正确
- ✅ `components/CollectionTable.vue` - 颜色映射使用字符串，正确

## 🎨 **平台颜色映射**
系统中还有平台颜色映射，使用字符串标识：

```javascript
// TaskTable.vue 和 CollectionTable.vue 中
if (platform === 'TEMU') return '#eb2f96'  // 粉色
// 其他平台使用默认颜色
```

## 📊 **修正效果**

### 修正前
- collectorPlatform = 1 → 显示 "亚马逊" ❌
- collectorPlatform = 2 → 显示 "TEMU" ❌
- collectorPlatform = 3 → 显示 "Shein" ✅

### 修正后
- collectorPlatform = 1 → 显示 "TEMU" ✅
- collectorPlatform = 2 → 显示 "亚马逊" ✅
- collectorPlatform = 3 → 显示 "Shein" ✅
- collectorPlatform = 4 → 显示 "1688" ✅
- collectorPlatform = 5 → 显示 "淘宝" ✅

## 🚀 **验证方法**

1. **刷新商品采集页面**
2. **查看采集记录**，确认平台类型显示正确：
   - TEMU 采集记录显示 "TEMU"
   - 亚马逊采集记录显示 "亚马逊"
   - Shein 采集记录显示 "Shein"
3. **查看商品图库页面**，确认平台名称显示一致

现在采集类型应该能正确显示对应的平台名称了！🎉 