---
name: xhs-pipeline
description: 小红书图文生产线 - 将任意原始素材经过4阶段流水线加工，产出可直接发布的3:4图文PNG
version: 2.0.0
author: ts
license: MIT
platforms: [linux, macos]
prerequisites:
  commands: [node]
metadata:
  hermes:
    tags: [小红书, XHS, 图文, 内容创作, 设计, Pipeline]
    category: social-media
---

# 小红书图文生产线

> 将任意素材自动加工为小红书 3:4 图文 PNG。

---

## 执行流程（4步）

```
素材 ──→ ① 知识文档 ──→ ② 图文脚本 ──→ ③ HTML页面 ──→ ④ PNG截图
```

**执行顺序：逐阶段执行，每阶段完成后确认再进入下一阶段。**

| 步骤 | 做什么 | 读哪个 Prompt | 产出 |
|------|--------|--------------|------|
| ① 知识整理 | 深度加工素材为知识文档 | `prompts/01-raw-to-knowledge.md` | `01-knowledge.md` |
| ②a 类型风格判断 | 分析素材 → 推荐类型+风格 | `prompts/02-knowledge-to-xhs.md` | **暂停等待用户确认** |
| ②b 图文脚本 | 确认后，按类型+风格写脚本 | 同上 | `02-xhs-content.md` |
| ③ 页面生成 | 按设计规范生成 HTML | `prompts/03-xhs-to-html.md` | `pages/page*.html` |
| ④ 截图导出 | 批量截取 PNG | 执行截图命令 | `output/page*.png` |

### ⚠️ 步骤②必须暂停确认

在步骤②中，AI 先分析素材并给出推荐，**必须等用户确认后再继续**：

```
AI输出示例：
━━━━━━━━━━━━━━━━━━━━
📋 内容类型推荐：数据报告型
   理由：素材中有大量数字、排名、百分比
🎨 视觉风格推荐：ai-daily
   理由：主题是 AI/科技领域
━━━━━━━━━━━━━━━━━━━━
请确认或修改：
1. 内容类型 OK？（可选：教程/合集/对比/清单/金句/日报/数据报告/故事/工具/测评）
2. 视觉风格 OK？（可选：ai-daily/guofeng/knowledge/food/dopamine/minimal）
```

用户确认后才进入实际脚本编写。

---

## 关键决策点（步骤②）

在步骤②中需要做两个决策：

### 1. 判断内容类型（决定页面结构）

参考 → `prompts/content-types.md`

| 素材特征 | 内容类型 |
|---------|---------|
| 有步骤/流程 | 教程步骤型 |
| 多个同类推荐 | 合集推荐型 |
| A vs B | 对比型 |
| 注意事项/规则 | 清单型 |
| 一句话/感悟 | 金句语录型 |
| 多条新闻/动态 | 日报资讯型 |
| 数字/百分比 | 数据报告型 |
| 个人经历 | 故事经验型 |
| 推荐工具/App | 工具推荐型 |
| 使用体验 | 测评种草型 |

### 2. 选择视觉风格（决定配色和组件）

参考 → `prompts/style-templates.md`

**按视觉目的分类（AI 推荐 TOP 3 供用户选择）：**

| 视觉目的 | 可选风格 | 适合内容 |
|---------|---------|---------|
| 高级感 / 专业感 | `ai-daily` · `minimal` | 科技、数据、商务、极简干货 |
| 活泼 / 吸引点击 | `dopamine` · `food` | 种草、日常、美食、潮流、合集 |
| 文化 / 品质感 | `guofeng` · `knowledge` | 国风、读书、教程、金句、经验 |

**推荐格式**：AI 必须给出 TOP 3 推荐（标注推荐度），用户从中选择：
```
🎨 风格推荐 TOP 3：
  ① ai-daily ⭐推荐 — 暗色科技感，适合数据展示
  ② knowledge — 白底清晰，适合干货阅读
  ③ minimal — 极简高级，适合专业呈现
```

---

## 参考文件索引

| 文件 | 内容 | 何时阅读 |
|------|------|---------|
| `prompts/01-raw-to-knowledge.md` | 阶段①的完整 prompt | 执行阶段①时 |
| `prompts/02-knowledge-to-xhs.md` | 阶段②的完整 prompt + 输出格式 | 执行阶段②时 |
| `prompts/03-xhs-to-html.md` | 阶段③的 HTML 规范 + 自检清单 | 执行阶段③时 |
| `prompts/content-types.md` | 10种内容类型的页面结构定义 | 阶段②判断类型时 |
| `prompts/style-templates.md` | 6种风格的完整 CSS 规范 | 阶段③生成 HTML 时 |
| `prompts/decoration-system.md` | 5种风格的装饰增强 CSS 类 | 阶段③丰富视觉时 |
| `prompts/illustration-index.md` | 本地插画库分类索引 + 路径规则 | 阶段③需要配图时 |

---

## 截图命令

```bash
cd /home/ts/VIbeUI && node scripts/screenshot-xhs.mjs \
  --input=./projects/{topic}/pages \
  --output=./projects/{topic}/output
```

| 参数 | 默认值 | 说明 |
|------|-------|------|
| `--input` | `./pages` | HTML 文件或目录 |
| `--output` | `./output` | PNG 输出目录 |
| `--scale` | `2` | 缩放倍数（2x = 1800×2400） |

---

## 项目目录结构

```
projects/{topic}/
├── 01-knowledge.md       ← ①产出
├── 02-xhs-content.md     ← ②产出
├── pages/                ← ③产出
│   ├── page1.html
│   └── ...
└── output/               ← ④产出（发小红书用这个）
    ├── page1.png
    └── ...
```

---

## 核心铁律

1. **所有文字 ≥ 20px**（手机看不清 = 废稿）
2. **每页总文字 ≤ 80字**
3. **禁止 emoji，只用 Lucide 图标**
4. **禁止纯黑 #000 和纯白 #FFF**
5. **必须严格遵循 style-templates.md 的风格规范**
6. **必须按 content-types.md 的类型结构组织页面**
7. **每页至少 3 个装饰元素（见 decoration-system.md）**
8. **插画路径必须用绝对路径（见 illustration-index.md）**

---

## 依赖

- Node.js（`/home/ts/.n/bin/node`）
- Playwright Chromium（已安装）

## 本地插画资源

两套本地插画库可供 food/dopamine/guofeng/knowledge 风格使用：

| 库名 | 数量 | 风格 | 根目录 |
|------|------|------|--------|
| shigureni | 116 PNG | 日系角色插画 | `/home/ts/下载/shigureni_插画合集/イラスト_插画/` |
| vectorshelf | 4794+ PNG | 扁平矢量物件 | `/home/ts/下载/vectorshelf_插画合集/` |

详细分类和推荐用法见 `prompts/illustration-index.md`。

**⚠️ 重要**：HTML 中引用插画时必须使用绝对路径，不可使用相对路径（Playwright file:// 协议限制）。
