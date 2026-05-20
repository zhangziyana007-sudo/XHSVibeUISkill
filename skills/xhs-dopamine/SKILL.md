---
name: xhs-dopamine
description: 小红书多巴胺撞色风格图文制作（深紫+高饱和撞色+大圆角）
version: 1.0.0
author: ts
platforms: [linux, macos]
prerequisites:
  commands: [node]
metadata:
  hermes:
    tags: [小红书, XHS, 多巴胺, 撞色, 潮流]
    category: social-media
---

# 小红书 · 多巴胺撞色风格

> 高饱和度撞色、大圆角、快乐活力。适合：种草/推荐/潮流/好物/合集。

---

## 使用方式

提供素材后，自动执行：
1. 整理素材要点 → `01-knowledge.md`
2. 策划图文脚本 → `02-xhs-content.md`（暂停确认）
3. 生成 HTML 页面 → `pages/page*.html`
4. 截图产出 PNG → `output/page*.png`

---

## 阶段① · 素材整理

```markdown
# {主题} — 知识文档
> 素材来源 / 整理时间 / 关键词
## 核心概述
## 知识模块 1-N
## 关键要点总结
## 适合的图文角度
```

输出到 `projects/{topic}/01-knowledge.md`

---

## 阶段② · 图文策划

**本风格已确定为 dopamine**，适合内容类型：合集推荐型 / 工具推荐型 / 测评种草型。

**⚠️ 必须暂停确认**后继续。

输出到 `projects/{topic}/02-xhs-content.md`

---

## 阶段③ · HTML 生成（核心设计规范）

### 设计语言
高饱和度撞色、大圆角、模糊背景色块。快乐、年轻、潮流。

### CSS 变量（必须使用）
```css
:root {
  --bg: #2D2A4A;
  --yellow: #FFE66D;
  --pink: #FF6B9D;
  --mint: #4ECDC4;
  --coral: #FF8A5C;
  --lavender: #C3A6FF;
  --fg: #FFFFFF;
  --fg-dim: rgba(255,255,255,0.7);
}
```

### 页面背景
```css
html, body { background: #1a1835; margin: 0; }
body {
  font-family: 'Noto Sans SC', 'PingFang SC', system-ui, sans-serif; font-weight: 700;
  min-height: 100vh; display: flex; align-items: center; justify-content: center;
  padding: 32px 16px;
}
```

### Canvas 背景
```css
.canvas {
  width: 900px; height: 1200px; position: relative; overflow: hidden;
  background: var(--bg);
  /* 无额外纹理 — 色块本身就是装饰 */
}
@media (max-width: 960px) {
  .canvas { transform: scale(calc(100vw / 960)); transform-origin: top center; }
  body { align-items: flex-start; padding-top: 16px; }
}
```

### 字体
```css
body { font-family: 'Noto Sans SC', 'PingFang SC', system-ui, sans-serif; font-weight: 700; }
h1, .title { font-family: 'ZCOOL KuaiLe', 'Dela Gothic One', sans-serif; }
.deco, .tag { font-family: 'Pacifico', 'Caveat', cursive; }
```

Google Fonts：
```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@500;700;900&family=ZCOOL+KuaiLe&family=Dela+Gothic+One&family=Pacifico&family=Caveat:wght@500;700&family=Orbitron:wght@700;900&display=swap" />
```

本地字体（可选增强）：
```css
@font-face { font-family: '优设标题圆'; src: url('/home/ts/XHSVibeUISkill/fonts/fonts-net-cn/extracted/优设标题圆/YouSheBiaoTiYuan-2.otf'); }
@font-face { font-family: '站酷庆科黄油体'; src: url('/home/ts/XHSVibeUISkill/fonts/fonts-net-cn/extracted/站酷庆科黄油体/ZhanKuQingKeHuangYouTi-2.ttf'); }
@font-face { font-family: '仓耳小丸子'; src: url('/home/ts/XHSVibeUISkill/fonts/fonts-net-cn/extracted/仓耳小丸子/CangErXiaoWanZi-2.ttf'); }
@font-face { font-family: '小可奶酪体'; src: url('/home/ts/XHSVibeUISkill/fonts/fonts-net-cn/extracted/小可奶酪体/XiaoKeNaiLaoTiShangYongMianFei@QingKeZiTi-2.ttf'); }
@font-face { font-family: '猕猴桃圆'; src: url('/home/ts/XHSVibeUISkill/fonts/fonts-net-cn/extracted/猕猴桃圆 M/KiwiMaru-Medium-2.ttf'); }
@font-face { font-family: '德拉黑体'; src: url('/home/ts/XHSVibeUISkill/fonts/fonts-net-cn/extracted/德拉黑体/DelaGothicOne-Regular-2.ttf'); }
@font-face { font-family: 'Smiley Sans'; src: url('/home/ts/XHSVibeUISkill/fonts/SmileySans-Oblique.ttf'); }
```

### 核心组件

**背景色块（.blob）** — 必须有 2-3 个：
```css
.blob { position: absolute; border-radius: 50%; filter: blur(0px); opacity: 0.1-0.15; width: 200-320px; height: 200-320px; }
/* 放在画布边缘，部分溢出 */
```

**胶囊标签（.pill）** — 撞色灵魂：
```css
.pill { display: inline-flex; align-items: center; gap: 8px; padding: 10px 22px; border-radius: 999px; font-size: 22px; font-weight: 700; }
/* 每个 pill 不同颜色 */
```

**毛玻璃引文卡**：
```css
background: rgba(255,255,255,0.08); backdrop-filter: blur(12px);
border: 1px solid rgba(255,255,255,0.12); border-radius: 24px; padding: 32px 40px;
```

### 装饰系统（每页至少 3 个）

```css
/* 彩色渐变斑点 — 背景大球 */
.blob { position: absolute; border-radius: 50%; filter: blur(40px); opacity: 0.25; pointer-events: none; }

/* 彩色小圆点 — confetti */
.confetti { position: absolute; width: 12px; height: 12px; border-radius: 50%; pointer-events: none; }

/* 药丸标签 4 色系 */
.pill-pink { background: linear-gradient(135deg, #FF6B9D, #FF9EB8); color: white; }
.pill-purple { background: linear-gradient(135deg, #A855F7, #C084FC); color: white; }
.pill-yellow { background: linear-gradient(135deg, #FBBF24, #FCD34D); color: #7C2D12; }
.pill-green { background: linear-gradient(135deg, #34D399, #6EE7B7); color: #064E3B; }

/* 弹跳卡片 — 彩色边框 */
.bounce-card { background: white; border-radius: 24px; padding: 20px 24px; box-shadow: 0 8px 24px rgba(255,107,157,0.1); border: 2px solid transparent; }
.bounce-card.pink { border-color: rgba(255,107,157,0.3); }
.bounce-card.purple { border-color: rgba(168,85,247,0.3); }
.bounce-card.green { border-color: rgba(52,211,153,0.3); }
.bounce-card.yellow { border-color: rgba(251,191,36,0.3); }

/* 波浪分割线 */
.wave-divider { width: 100%; height: 24px; background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 900 24'%3E%3Cpath d='M0,12 Q225,0 450,12 Q675,24 900,12' fill='none' stroke='%23FF6B9D' stroke-width='2' opacity='0.3'/%3E%3C/svg%3E"); background-repeat: no-repeat; }

/* 数字圆 */
.num-circle { width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 22px; font-weight: 900; color: white; }
```

### 空间分配

```
┌──────────────────────────────┐ 0px
│ [blob x3 绝对定位背景]         │  角落溢出
│ 顶部：80px                    │  品牌圆角方形 + pill标签
│                              │ 80px
│ 主标题区：280px               │
│   英文小标签：24px, 粗体       │  粉色
│   大标题：120px, 分行          │  白+关键词黄色
│                              │ 360px
│ 间距：56px                    │
│ 撞色标签组：200px             │  4-6个 pill, flex-wrap
│                              │ 616px
│ 间距：48px                    │
│ 毛玻璃引文卡：180px           │  blur(12px)
│                              │ 844px
│ 间距+底部：160px              │  头像+ID + 颜色圆点
└──────────────────────────────┘ 1200px
```

### 色彩使用规则
- 背景暗色（深紫 `#2D2A4A`）
- 前景亮色交替使用 yellow/pink/mint/coral/lavender
- 每页至少使用 3 种亮色
- 文字默认白色，关键词用 `var(--yellow)` 高亮
- pill 标签每个颜色不同

### 内容密度
- 每页：标题+标签组+引文
- 内容占画布：85%
- 几乎不留白，色彩即节奏

### 插画规则
- ✅ 可使用 vectorshelf Drink/Food/Plants
- 路径必须为绝对路径：`/home/ts/下载/vectorshelf_插画合集/{类别}/{文件}`
- 插画搭配 `drop-shadow(0 4px 12px rgba(0,0,0,0.1))`

### 禁止
- ❌ 灰色/暗淡色调
- ❌ 单一颜色方案
- ❌ 大段文字
- ❌ 极细字重（不低于 500）
- ❌ 直角（所有圆角 ≥ 16px）
- ❌ emoji

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
2. 所有文字 ≥ 20px
3. 每页总文字 ≤ 80字
4. 禁止 emoji，图标用 `<i data-lucide="名称">`
5. 每页至少 3 个装饰元素
6. 安全区：内容距边缘 ≥ 56px
7. 禁止纯黑 #000 / 纯白 #FFF
8. 内容超容量必须拆页
