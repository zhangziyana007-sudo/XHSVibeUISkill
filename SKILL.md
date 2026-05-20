---
name: xhs-styles
description: 小红书图文生产线 - 7种独立视觉风格，每种风格自包含完整4阶段流水线
version: 3.0.0
author: ts
license: MIT
platforms: [linux, macos]
prerequisites:
  commands: [node]
metadata:
  hermes:
    tags: [小红书, XHS, 图文, 内容创作, 设计]
    category: social-media
---

# 小红书图文生产线 · 风格路由

> 7 种独立视觉风格，每种风格自包含完整工作流。直接使用对应风格的 skill 即可。

---

## 风格选择

| 风格 | 适合内容 | 技能文件 |
|------|---------|---------|
| **AI科技日报** | AI资讯/科技/数据报告 | `skills/xhs-ai-daily/SKILL.md` |
| **极简文艺** | 金句/读书/极简干货 | `skills/xhs-minimal/SKILL.md` |
| **多巴胺撞色** | 种草/日常/潮流/合集 | `skills/xhs-dopamine/SKILL.md` |
| **商务知识卡** | 教程/干货/经验分享 | `skills/xhs-knowledge/SKILL.md` |
| **美食探店** | 美食/餐厅/探店 | `skills/xhs-food/SKILL.md` |
| **古风国潮** | 国学/传统文化/金句 | `skills/xhs-guofeng/SKILL.md` |
| **水墨古风** | 诗词/禅意/哲理/文人 | `skills/xhs-shuimo/SKILL.md` |

---

## 使用方式

**方式一（推荐）**：直接指定风格
```
用 xhs-ai-daily 帮我做一篇关于XXX的小红书图文
```

**方式二**：让 AI 推荐风格
```
帮我把这段素材做成小红书图文（AI会推荐TOP3风格供选择）
```

### 风格推荐对照

| 视觉目的 | 推荐风格 |
|---------|---------|
| 高级感 / 专业感 | `ai-daily` · `minimal` |
| 活泼 / 吸引点击 | `dopamine` · `food` |
| 文化 / 品质感 | `guofeng` · `shuimo` · `knowledge` |

---

## 执行流程（每个风格内部一致）

```
素材 ──→ ① 知识文档 ──→ ② 图文脚本 ──→ ③ HTML页面 ──→ ④ PNG截图
```

每个风格的 SKILL.md 都是自包含的完整工作流，包含：
- 该风格的 CSS 变量和设计规范
- 专属装饰组件和布局规则
- 字体和配色方案
- 截图命令

---

## 截图工具

```bash
cd /home/ts/VIbeUI && node scripts/screenshot-xhs.mjs \
  --input=./projects/{topic}/pages \
  --output=./projects/{topic}/output
```

---

## 共享资源

| 资源 | 路径 |
|------|------|
| 本地字体 | `fonts/` 目录 |
| 插画库(vectorshelf) | `/home/ts/下载/vectorshelf_插画合集/` |
| 插画库(shigureni) | `/home/ts/下载/shigureni_插画合集/イラスト_插画/` |
| 插画分类索引 | `prompts/illustration-index.md` |
| 字体配置 | `config/fonts.json` |
| 内容类型参考 | `prompts/content-types.md` |

---

## 依赖

- Node.js + Playwright Chromium（已安装）
