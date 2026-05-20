---
name: xhs-ai-daily
description: 小红书 AI 科技日报风格图文制作（黑底+荧光绿终端风）
version: 1.0.0
author: ts
platforms: [linux, macos]
prerequisites:
  commands: [node]
metadata:
  hermes:
    tags: [小红书, XHS, AI日报, 科技, 终端风]
    category: social-media
---

# 小红书 · AI 科技日报风格

> 黑底+荧光绿终端风。适合：AI/编程/科技日报、技术新闻速递、数据分析。

---

## 使用方式

提供素材后，自动执行：
1. 整理素材要点 → `01-knowledge.md`
2. 策划图文脚本 → `02-xhs-content.md`（暂停确认）
3. 生成 HTML 页面 → `pages/page*.html`
4. 截图产出 PNG → `output/page*.png`

---

## 阶段① · 素材整理

将原始素材整理为结构化知识文档：

```markdown
# {主题} — 知识文档
> 素材来源 / 整理时间 / 关键词
## 核心概述（2-3句）
## 知识模块 1-N（含子知识点）
## 关键要点总结
## 适合的图文角度
```

输出到 `projects/{topic}/01-knowledge.md`

---

## 阶段② · 图文策划

**本风格已确定为 ai-daily**，内容类型通常为「日报资讯型」。

输出格式：
```markdown
# {标题}
## 元信息
- 内容类型：日报资讯型
- 风格模板：ai-daily
- 总页数：5
## Page 1 · 封面
{标题/副标题/标签}
## Page 2-4 · 新闻条目
{每页3条：编号+分类+标题+一句话描述}
## Page 5 · 总结页
{最后一条新闻+关键词标签+金句+CTA}
```

**⚠️ 必须暂停确认**：输出脚本后等用户确认再生成 HTML。

输出到 `projects/{topic}/02-xhs-content.md`

---

## 阶段③ · HTML 生成（核心设计规范）

### 设计语言
终端/黑客风格。暗色背景 + 绿色荧光 + 网格线 + 等宽字体。信息密集、科技感满。

**设计来源**：Terminal 终端 / The Matrix / GitHub Dark

### CSS 变量（必须使用）
```css
:root {
  --bg: #0a0a0a;
  --bg-2: #141414;
  --fg: #f5f5f5;
  --fg-2: #a3a3a3;
  --fg-3: #525252;
  --accent: #00ff88;
  --accent-dim: rgba(0,255,136,0.15);
  --border: rgba(255,255,255,0.08);
}
```

### 页面背景
```css
html, body { background: #1f1f1f; margin: 0; }
body {
  font-family: 'Noto Sans SC', 'PingFang SC', system-ui, sans-serif;
  min-height: 100vh; display: flex; align-items: center; justify-content: center;
  padding: 32px 16px;
}
```

### Canvas 背景（网格纹理 - 必须有）
```css
.canvas {
  width: 900px; height: 1200px; position: relative; overflow: hidden;
  background: var(--bg);
  box-shadow: 0 1px 2px rgba(0,0,0,0.5), 0 30px 80px -20px rgba(0,255,136,0.15), 0 30px 60px -20px rgba(0,0,0,0.6);
  background-image:
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 60px 60px;
}
@media (max-width: 960px) {
  .canvas { transform: scale(calc(100vw / 960)); transform-origin: top center; }
  body { align-items: flex-start; padding-top: 16px; }
}
```

### 字体
```css
body { font-family: 'Noto Sans SC', 'PingFang SC', system-ui, sans-serif; }
.mono, .code { font-family: 'JetBrains Mono', monospace; }
.deco-num { font-family: 'Orbitron', 'Black Ops One', monospace; }
h1, .headline { font-family: 'Space Grotesk', 'Noto Sans SC', sans-serif; font-weight: 900; }
```

Google Fonts：
```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;700&family=Noto+Sans+SC:wght@500;700;900&family=Space+Grotesk:wght@500;700&family=Orbitron:wght@700;900&family=Black+Ops+One&display=swap" />
```

本地字体（可选增强）：
```css
@font-face { font-family: '优设标题黑'; src: url('/home/ts/XHSVibeUISkill/fonts/fonts-net-cn/extracted/优设标题黑/YouSheBiaoTiHei-2.ttf'); }
@font-face { font-family: '寒蝉高黑体'; src: url('/home/ts/XHSVibeUISkill/fonts/fonts-net-cn/extracted/寒蝉高黑体/HanChanGaoHeiTi-2.otf'); }
@font-face { font-family: '标小智无界黑'; src: url('/home/ts/XHSVibeUISkill/fonts/fonts-net-cn/extracted/标小智无界黑/LogoSCUnboundedSans-Regular-2.ttf'); }
@font-face { font-family: '精品点阵体'; src: url('/home/ts/XHSVibeUISkill/fonts/fonts-net-cn/extracted/精品点阵体/JingPinDianZhenTi7x7-2.ttf'); }
@font-face { font-family: '文道潮黑'; src: url('/home/ts/XHSVibeUISkill/fonts/fonts-net-cn/extracted/文道潮黑/WenDaoChaoHei-2.ttf'); }
@font-face { font-family: 'Smiley Sans'; src: url('/home/ts/XHSVibeUISkill/fonts/SmileySans-Oblique.ttf'); }
```

### 核心组件

**荧光发光效果**：
```css
.glow { text-shadow: 0 0 28px rgba(0,255,136,0.6); }
```

**脉冲点**：
```css
.pulse-dot { width: 10px; height: 10px; border-radius: 50%; background: var(--accent); animation: pulse-ai 1.6s ease-in-out infinite; }
@keyframes pulse-ai {
  0%,100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(1.5); }
}
```

**顶部状态条**（终端风格）：
```css
display: flex; justify-content: space-between; border-bottom: 1px solid var(--border); padding: 28px 48px;
/* 左：脉冲点 + AI_DAILY(mono) + 期号 */
/* 右：日期（等宽字体） */
```

**新闻条目卡**：
```css
display: flex; align-items: center; gap: 24px;
border-radius: 16px; border: 1px solid var(--border);
background: var(--bg-2); padding: 24px 28px;
```

### 装饰系统（每页至少 3 个）

```css
/* 扫描线 — 终端复古感 */
.scanline::after {
  content: ''; position: absolute; inset: 0;
  background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,136,0.01) 2px, rgba(0,255,136,0.01) 4px);
  pointer-events: none;
}

/* 发光球 — 色彩焦点 */
.glow-orb { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.06; background: var(--accent); pointer-events: none; }

/* 发光文字 */
.glow-text { color: var(--accent); text-shadow: 0 0 28px rgba(0,255,136,0.6); }

/* 数据卡片 — 带左侧发光边框 */
.data-card { border-radius: 16px; border: 1px solid var(--border); background: var(--bg-2); padding: 24px 28px; position: relative; }
.data-card::before { content: ''; position: absolute; left: 0; top: 20%; bottom: 20%; width: 3px; border-radius: 2px; background: var(--accent); box-shadow: 0 0 8px rgba(0,255,136,0.4); }

/* 科技进度条 */
.tech-bar { height: 4px; border-radius: 2px; background: rgba(255,255,255,0.05); }
.tech-bar-fill { height: 100%; border-radius: 2px; background: linear-gradient(90deg, var(--accent), rgba(0,255,136,0.3)); }

/* 排名编号 */
.rank-num { font-family: 'JetBrains Mono', monospace; font-size: 44px; font-weight: 700; color: var(--accent); opacity: 0.8; }

/* 科技分割线 */
.divider-tech { height: 1px; background: linear-gradient(90deg, transparent, var(--accent), transparent); opacity: 0.3; }
```

### 空间分配

```
┌──────────────────────────────────────┐ 0px
│ [60px网格全画布铺满]                    │
│ 状态条：70px                          │  脉冲点 + AI_DAILY(mono) + 日期
│ border-bottom                        │ 70px
│ 标题区：320px                         │
│   小标签：22px mono                   │  「◢ Today in AI」accent色
│   间距：24px                          │
│   大标题：124px, black                │  关键词 glow+accent色
│                                      │ 390px
│ 间距：30px                            │
│ 新闻列表：520px                       │  3-5个条目卡，间距24px
│   每条目卡：~100px                    │  bg-2底 + 左绿边
│     左：编号(44px, mono, 绿)          │
│     右上：分类(16px, mono, 灰)        │
│     右下：标题(30px, 粗体, 白)        │
│                                      │ 940px
│ 间距：20px                            │
│ 底部：60px                            │  图标 + ID(mono) + 页码
└──────────────────────────────────────┘ 1200px
```

### 文字层级
| 元素 | 字号 | 字体 | 颜色 |
|------|------|------|------|
| 主标题 | 124px | Noto Sans SC 900 | --fg + 关键词 --accent |
| 小标签 | 22px | mono | --accent |
| 编号 | 44px | mono | --accent |
| 分类 | 16px | mono | --fg-3 |
| 新闻标题 | 30px | 粗体 | --fg |
| 描述 | 22px | 400 | --fg-2 |

### 内容密度
- 每页最大文字：标题+3-5条新闻
- 内容占画布：85%
- 留白策略：无留白=信息流美学

### 插画规则
- ❌ **绝对禁止使用任何图片或插画**
- 所有视觉效果仅来自 CSS 装饰 + Lucide 图标 + 排版

### 禁止
- ❌ 暖色调
- ❌ 圆形色块装饰
- ❌ 非等宽字体做代码/标签
- ❌ 白色背景
- ❌ 除绿色以外的亮色
- ❌ 图片
- ❌ emoji
- ❌ 字号 < 20px（标签16px例外）

### HTML 模板结构
```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>AI Daily · VIbeUI</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;700&family=Noto+Sans+SC:wght@500;700;900&family=Space+Grotesk:wght@500;700&family=Orbitron:wght@700;900&family=Black+Ops+One&display=swap" />
  <script src="https://unpkg.com/lucide@latest"></script>
  <style>
    :root { /* 上述变量 */ }
    html, body { /* 上述样式 */ }
    .canvas { /* 上述样式 */ }
    /* 组件 + 装饰类 */
  </style>
</head>
<body>
  <div class="canvas scanline">
    <!-- 内容按空间分配布局 -->
  </div>
  <script>lucide.createIcons();</script>
</body>
</html>
```

### 正文强调规则
- 每段正文至少 1-2 处视觉强调
- 关键词用 `color: var(--accent)` + `.glow-text`
- 数据用加粗 + accent 色
- 强调占比 15-30%

---

## 阶段④ · 截图

```bash
cd /home/ts/VIbeUI && node scripts/screenshot-xhs.mjs \
  --input=./projects/{topic}/pages \
  --output=./projects/{topic}/output
```

产出：`output/page*.png`（1800×2400 px @2x）

---

## 产出目录

```
projects/{topic}/
├── 01-knowledge.md
├── 02-xhs-content.md
├── pages/page*.html
└── output/page*.png  ← 发小红书用
```

---

## 通用铁律

1. Canvas = 900×1200px，不可修改
2. 所有文字 ≥ 20px（标签16px例外）
3. 每页总文字 ≤ 80字
4. 禁止 emoji，图标用 `<i data-lucide="名称">`
5. 每页至少 3 个装饰元素
6. 安全区：内容距边缘 ≥ 56px
7. 禁止纯黑 #000 / 纯白 #FFF / 默认蓝
8. 内容超容量必须拆页，不能缩字号
