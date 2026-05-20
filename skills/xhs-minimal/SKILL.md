---
name: xhs-minimal
description: 小红书极简文艺风格图文制作（大留白+无彩色+杂志感）
version: 1.0.0
author: ts
platforms: [linux, macos]
prerequisites:
  commands: [node]
metadata:
  hermes:
    tags: [小红书, XHS, 极简, 文艺, 杂志]
    category: social-media
---

# 小红书 · 极简文艺风格

> Less is more。大量留白、极细线条、克制用色、文艺杂志感。适合：生活/读书/文艺/感悟/哲理。

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
## 知识模块 1-N
## 关键要点总结
## 适合的图文角度
```

输出到 `projects/{topic}/01-knowledge.md`

---

## 阶段② · 图文策划

**本风格已确定为 minimal**，适合内容类型：金句语录型 / 清单型 / 故事经验型。

输出格式：
```markdown
# {标题}
## 元信息
- 内容类型：{具体类型}
- 风格模板：minimal
- 总页数：{N}
## Page 1 · 封面
{大标题+副标题}
## Page 2-N · 内容页
{每页1个核心观点+引文}
```

**⚠️ 必须暂停确认**后继续。

输出到 `projects/{topic}/02-xhs-content.md`

---

## 阶段③ · HTML 生成（核心设计规范）

### 设计语言
Less is more。大量留白、极细线条、克制用色。文艺杂志感。

### CSS 变量（必须使用）
```css
:root {
  --bg: #f8f7f4;
  --ink: #1c1917;
  --ink-2: #57534e;
  --ink-3: #a8a29e;
  --border: #e7e5e4;
  --accent: #1c1917;
}
```

### 页面背景
```css
html, body { background: #eae8e4; margin: 0; }
body {
  font-family: 'Noto Serif SC', 'Songti SC', Georgia, serif;
  min-height: 100vh; display: flex; align-items: center; justify-content: center;
  padding: 32px 16px;
}
```

### Canvas 背景
```css
.canvas {
  width: 900px; height: 1200px; position: relative; overflow: hidden;
  background: var(--bg);
  box-shadow: 0 1px 2px rgba(28,25,23,0.06), 0 30px 60px -20px rgba(28,25,23,0.18);
}
@media (max-width: 960px) {
  .canvas { transform: scale(calc(100vw / 960)); transform-origin: top center; }
  body { align-items: flex-start; padding-top: 16px; }
}
```

### 字体
```css
body { font-family: 'Noto Serif SC', 'Songti SC', Georgia, serif; }
.label, .num { font-family: 'Inter', 'Playfair Display', serif; }
```

Google Fonts：
```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;600;700&family=Inter:wght@400;500;600&family=Playfair+Display:wght@400;700&family=Space+Grotesk:wght@400;500&display=swap" />
```

本地字体（可选增强）：
```css
@font-face { font-family: '思源宋体'; src: url('/home/ts/XHSVibeUISkill/fonts/fonts-net-cn/extracted/思源宋体/SourceHanSerifCN-Regular-1.otf'); font-weight: 400; }
@font-face { font-family: '思源宋体'; src: url('/home/ts/XHSVibeUISkill/fonts/fonts-net-cn/extracted/思源宋体/SourceHanSerifCN-Bold-2.otf'); font-weight: 700; }
@font-face { font-family: '汤宪滨宋'; src: url('/home/ts/XHSVibeUISkill/fonts/fonts-net-cn/extracted/汤宪滨宋·免费商用/汤宪滨宋.ttf'); }
@font-face { font-family: '杨任东竹石体'; src: url('/home/ts/XHSVibeUISkill/fonts/fonts-net-cn/extracted/杨任东竹石体 Regular/杨任东竹石体-Regular.ttf'); }
```

### 核心组件

**编号标签**（顶部）：
```css
font-family: Inter, sans-serif; font-size: 14px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--ink-3);
```

**超大淡色页码**：
```css
font-family: Inter, sans-serif; font-size: 72px; font-weight: 600; color: var(--border);
```

**装饰短横线**：
```css
width: 64px; height: 1px; background: var(--ink);
```

### 装饰系统（极简 — 克制使用）

极简风格的装饰极度克制，只有：
- 1px 分割线（`height: 1px; background: var(--border)`）
- 装饰短横线（`width: 64px; height: 1px; background: var(--ink)`）
- 超大淡色页码（右下角）
- 小圆点（`width: 6px; height: 6px; border-radius: 50%; background: var(--ink-3)`）

**禁止任何花哨装饰**。

### 空间分配

```
┌──────────────────────────────┐ 0px
│ 顶部：100px                   │  左：编号(14px, uppercase, 0.3em)
│                              │  右：日期(14px)
│ 细线分割(1px)                 │ 100px
│                              │
│ 超大留白：240px               │  纯空白（灵魂所在）
│                              │ 340px
│ 主内容区：480px（全部左对齐）   │
│   小标签：18px, 字距0.15em     │  英文分类
│   间距：40px                  │
│   主标题：96px, 3行以内        │  行高1.15
│   间距：56px                  │
│   装饰短横线：w-16, h-1px      │
│   间距：40px                  │
│   引文：28px, 行高1.8          │
│                              │ 820px
│                              │
│ 留白过渡区：260px             │
│                              │
│ 底部：120px                   │  左：署名(20px)
│                              │  右下：超大淡色页码(72px)
└──────────────────────────────┘ 1200px
```

### 文字层级
| 元素 | 字号 | 字体 | 颜色 |
|------|------|------|------|
| 主标题 | 96px | Noto Serif SC 700 | --ink |
| 小标签 | 18px | Inter, 字距0.15em | --ink-3 |
| 引文 | 28px | Noto Serif SC 400 | --ink-2 |
| 署名 | 20px | Inter | --ink-3 |
| 页码 | 72px | Inter 600 | --border |

### 内容密度
- 每页：标题+引文+署名
- 内容占画布：42%
- 留白=呼吸=高级感
- **上方 1/3 为留白**

### 布局特征
- 极度留白 — 内容从 top:340px 开始
- 全部左对齐（不居中）
- 右下角超大淡色页码

### 插画规则
- ❌ **禁止使用任何插画**
- 仅靠排版、留白、线条创造美感

### 禁止
- ❌ 使用彩色（全站只有黑白灰）
- ❌ 大面积色块
- ❌ 粗边框或阴影卡片
- ❌ 居中排列正文
- ❌ 超过 3 种字重
- ❌ emoji
- ❌ 字号 < 20px（编号14px例外）

### HTML 模板结构
```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Minimal · VIbeUI</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;600;700&family=Inter:wght@400;500;600&family=Playfair+Display:wght@400;700&family=Space+Grotesk:wght@400;500&display=swap" />
  <script src="https://unpkg.com/lucide@latest"></script>
  <style>
    :root { /* 上述变量 */ }
    html, body { /* 上述样式 */ }
    .canvas { /* 上述样式 */ }
  </style>
</head>
<body>
  <div class="canvas">
    <!-- 左对齐布局，大面积留白 -->
  </div>
  <script>lucide.createIcons();</script>
</body>
</html>
```

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

1. Canvas = 900×1200px
2. 所有文字 ≥ 20px（编号14px例外）
3. 每页总文字 ≤ 80字
4. 禁止 emoji，图标用 `<i data-lucide="名称">`
5. 安全区：内容距边缘 ≥ 56px
6. 禁止纯黑 #000 / 纯白 #FFF
7. 内容超容量必须拆页
