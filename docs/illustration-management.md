# 插画资源管理指南

> 本文件说明如何管理、扩展和维护插画资源库。

---

## 架构概览

```
config/illustrations.json    ← 配置中心（路径、分类、兼容性）
scripts/scan-illustrations.mjs ← 扫描/验证/生成工具
prompts/illustration-index.md ← 生成的索引文档（AI 阅读用）
```

**数据流**：
```
illustrations.json → scan-illustrations.mjs → illustration-index.md → AI 生成 HTML
```

---

## 日常操作

### 验证配置

```bash
node scripts/scan-illustrations.mjs --validate
```
检查所有配置的路径是否存在、分类是否完整。

### 查看统计

```bash
node scripts/scan-illustrations.mjs --stats
```
输出每个库的实际文件数量和风格兼容性。

### 重新生成索引

```bash
node scripts/scan-illustrations.mjs --update
```
扫描目录并重新生成 `prompts/illustration-index.md`。

---

## 添加新插画库

### 步骤 1：准备素材

将插画文件组织为以下结构：
```
/path/to/your-library/
├── 分类A_标签/
│   ├── 子目录_名称/
│   │   └── filename.png
│   └── ...
├── 分类B_标签/
└── ...
```

要求：
- 格式：PNG（透明背景优先）
- 建议尺寸：400-1000px（不要太大，影响加载）
- 文件名有意义（编号 + 关键词）

### 步骤 2：编辑配置

在 `config/illustrations.json` 的 `libraries` 数组中添加：

```json
{
  "id": "your-library-id",
  "name": "库的显示名称",
  "description": "风格描述",
  "basePath": "/absolute/path/to/library",
  "format": "png",
  "style": "风格标签(如 flat-vector / anime / watercolor)",
  "totalCount": 0,
  "categories": [
    { "id": "cat1", "path": "实际目录名", "label": "中文标签", "count": 0 }
  ],
  "filePattern": "*.png",
  "compatibleStyles": ["food", "dopamine"],
  "incompatibleStyles": ["ai-daily", "minimal"],
  "displaySize": { "min": 80, "max": 180, "unit": "px" }
}
```

### 步骤 3：更新风格映射

在 `config/illustrations.json` 的 `styleMapping` 中添加新库的引用：

```json
"food": {
  "primary": ["vectorshelf:drink", "your-library-id:cat1"],
  ...
}
```

### 步骤 4：验证并生成

```bash
node scripts/scan-illustrations.mjs --validate
node scripts/scan-illustrations.mjs --update
```

### 步骤 5：添加收藏

将常用素材添加到 `favorites` 数组：

```json
{ "library": "your-library-id", "id": "filename", "name": "中文名", "tags": ["标签1", "标签2"] }
```

---

## 换机器 / 迁移路径

只需修改 `config/illustrations.json` 中每个库的 `basePath` 字段：

```json
"basePath": "/new/machine/path/to/illustrations"
```

然后重新生成索引：
```bash
node scripts/scan-illustrations.mjs --update
```

---

## 插画库推荐来源

| 来源 | 风格 | 获取方式 |
|------|------|---------|
| [shigureni](https://www.shigureni.com/) | 日系角色 | 免费下载 |
| [vectorshelf](https://vectorshelf.com/) | 扁平矢量 | 付费/免费 |
| [unDraw](https://undraw.co/) | 扁平插画（可自定义主色） | 免费 SVG |
| [Storyset](https://storyset.com/) | 动态插画 | 免费（需署名） |
| [Open Doodles](https://opendoodles.com/) | 手绘涂鸦 | 免费 |
| [Humaaans](https://humaaans.com/) | 可组合人物 | 免费 |
| [Blush](https://blush.design/) | 多风格插画 | 部分免费 |
| [Loose Drawing](https://loosedrawing.com/) | 日系简笔画 | 免费 |
| [いらすとや](https://www.irasutoya.com/) | 日系万用 | 免费（20张/项目） |

### 新库接入检查清单

- [ ] 素材格式统一（PNG 透明底 / SVG）
- [ ] 文件名有规律可循
- [ ] 目录结构按分类组织
- [ ] 确认许可证允许商用/二次使用
- [ ] 在 config 中配置完整
- [ ] `--validate` 通过
- [ ] `--update` 生成索引
- [ ] 在 demo 中验证显示效果

---

## 版本管理策略

- `config/illustrations.json`：提交到 Git（配置中心）
- `prompts/illustration-index.md`：提交到 Git（生成的文档）
- 实际插画文件：**不提交**（.gitignore 排除，本地/NAS 维护）
- Demo 截图：提交精选几张到 `demos/`（展示效果用）
