---
name: xhs-guofeng
description: 小红书古风国潮风格图文制作（宣纸+朱砂红+金色+书法）
version: 1.0.0
author: ts
platforms: [linux, macos]
prerequisites:
  commands: [node]
metadata:
  hermes:
    tags: [小红书, XHS, 古风, 国潮, 传统文化]
    category: social-media
---

# 小红书 · 古风国潮风格

> 中式传统美学 + 现代排版。宣纸底+朱砂红+金色+书法。适合：国学/传统/文化/读书/金句。

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

**本风格已确定为 guofeng**，适合内容类型：金句语录型 / 清单型 / 故事经验型。

**⚠️ 必须暂停确认**后继续。

输出到 `projects/{topic}/02-xhs-content.md`

---

## 阶段③ · HTML 生成（核心设计规范）

### 设计语言
中式传统美学 + 现代排版。讲究留白、竖排、印章、书法气韵。

**设计来源**：宋代文人画 / 古籍版刻 / 现代国潮品牌

### CSS 变量（必须使用）
```css
:root {
  --paper: #f4ecd8;
  --ink: #2c1810;
  --ink-soft: #5a4032;
  --vermilion: #8b0000;
  --gold: #b8860b;
}
```

### 页面背景
```css
html, body { background: #e9e3d5; margin: 0; }
body {
  font-family: 'Noto Serif SC', 'LXGW WenKai', 'Songti SC', serif;
  min-height: 100vh; display: flex; align-items: center; justify-content: center;
  padding: 32px 16px;
}
```

### Canvas 背景（宣纸质感 - 必须有）
```css
.canvas {
  width: 900px; height: 1200px; position: relative; overflow: hidden;
  background: var(--paper); color: var(--ink);
  box-shadow: 0 1px 2px rgba(44,24,16,0.08), 0 30px 60px -20px rgba(44,24,16,0.25);
  background-image:
    radial-gradient(circle at 20% 10%, rgba(139,0,0,0.04), transparent 40%),
    radial-gradient(circle at 80% 80%, rgba(184,134,11,0.06), transparent 40%),
    radial-gradient(rgba(44,24,16,0.05) 1px, transparent 1px);
  background-size: 100% 100%, 100% 100%, 6px 6px;
}
@media (max-width: 960px) {
  .canvas { transform: scale(calc(100vw / 960)); transform-origin: top center; }
  body { align-items: flex-start; padding-top: 16px; }
}
```

### 字体
```css
body { font-family: 'Noto Serif SC', 'LXGW WenKai', 'Songti SC', serif; }
h1, .title { font-family: 'Ma Shan Zheng', 'Zhi Mang Xing', cursive; }
h2, .subtitle { font-family: 'ZCOOL XiaoWei', 'Long Cang', serif; }
```

Google Fonts：
```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&family=Zhi+Mang+Xing&family=Liu+Jian+Mao+Cao&family=Long+Cang&family=ZCOOL+XiaoWei&family=Noto+Serif+SC:wght@500;700;900&display=swap" />
```

本地字体（可选增强）：
```css
@font-face { font-family: 'LXGW WenKai'; src: url('/home/ts/XHSVibeUISkill/fonts/LXGWWenKai-Regular.ttf'); }
@font-face { font-family: '演示悠然小楷'; src: url('/home/ts/XHSVibeUISkill/fonts/fonts-net-cn/extracted/演示悠然小楷/YanShiYouRanXiaoKai-2.ttf'); }
@font-face { font-family: '演示夏行楷'; src: url('/home/ts/XHSVibeUISkill/fonts/fonts-net-cn/extracted/演示夏行楷/YanShiXiaXingKai-2.ttf'); }
@font-face { font-family: '云峰静龙行书'; src: url('/home/ts/XHSVibeUISkill/fonts/fonts-net-cn/extracted/云峰静龙行书/YunFengJingLongXingShu-2.ttf'); }
@font-face { font-family: '正风毛笔'; src: url('/home/ts/XHSVibeUISkill/fonts/fonts-net-cn/extracted/正风毛笔 Bold/MasaFont-Bold-2.ttf'); }
@font-face { font-family: '三极泼墨体'; src: url('/home/ts/XHSVibeUISkill/fonts/fonts-net-cn/extracted/三极泼墨体/SanJiPoMoTi-2.ttf'); }
@font-face { font-family: '峄山碑篆体'; src: url('/home/ts/XHSVibeUISkill/fonts/fonts-net-cn/extracted/峄山碑篆体/YiShanBeiZhuanTi.ttf'); }
@font-face { font-family: '令东齐伋复刻体'; src: url('/home/ts/XHSVibeUISkill/fonts/fonts-net-cn/extracted/令东齐伋复刻体/LingDongQiCheChunTang-2.ttf'); }
@font-face { font-family: '问藏书房'; src: url('/home/ts/XHSVibeUISkill/fonts/fonts-net-cn/extracted/问藏书房/WenCangShuFang-2.ttf'); }
```

### 核心组件

**印章（.seal）** — 每页至少出现一次：
```css
.seal { font-family: 'ZCOOL XiaoWei', 'Noto Serif SC', serif; writing-mode: vertical-rl; background: var(--vermilion); color: var(--paper); padding: 24px 14px; letter-spacing: 14px; border-radius: 6px; font-size: 36px; }
```

**竖排文字**：
```css
.vertical-text { writing-mode: vertical-rl; letter-spacing: 16px; }
```

**金色分割线**：
```css
background: linear-gradient(90deg, transparent, var(--vermilion), transparent);
```

### 装饰系统（每页至少 3 个）

```css
/* 印章 — 每页必有 */
.seal { /* 同上核心组件 */ }

/* 竖排文字 */
.vertical-text { writing-mode: vertical-rl; letter-spacing: 16px; }

/* 金色装饰线 */
.gold-line { height: 1px; background: linear-gradient(90deg, transparent, var(--gold), transparent); margin: 24px 0; }

/* 角花 — 画布四角 */
.corner-deco { position: absolute; width: 48px; height: 48px; border: 2px solid var(--gold); opacity: 0.3; pointer-events: none; }
.corner-deco.top-left { top: 32px; left: 32px; border-right: none; border-bottom: none; }
.corner-deco.top-right { top: 32px; right: 32px; border-left: none; border-bottom: none; }
.corner-deco.bottom-left { bottom: 32px; left: 32px; border-right: none; border-top: none; }
.corner-deco.bottom-right { bottom: 32px; right: 32px; border-left: none; border-top: none; }

/* 引言卡片 — 朱砂红左边框 */
.quote-card { background: rgba(244,236,216,0.6); border-left: 4px solid var(--vermilion); padding: 28px 32px; border-radius: 0 12px 12px 0; }
.quote-card::before { content: '"'; font-size: 48px; color: var(--vermilion); opacity: 0.4; }

/* 菱形列表符号 */
.gf-bullet { width: 10px; height: 10px; background: var(--vermilion); transform: rotate(45deg); flex-shrink: 0; }
```

### 空间分配

```
┌──────────────────────────────┐ 0px
│ 顶部：120px                   │  左：圆形图标+标题  右：竖排日期
│                              │
│ 留白过渡区：180px             │  纯空白=呼吸感
│                              │ 300px
│ 主标题区：400px               │
│   主标题(200-240px)           │  书法体，居中
│   装饰分隔(金线/SVG)          │
│   副标题(44px)                │
│                              │ 700px
│ 留白过渡区：180px             │
│                              │ 880px
│ 底部：120px                   │  左：印章  右：署名+编号
└──────────────────────────────┘ 1200px
```

### 内容密度
- 每页：主标题+副句+2行辅助
- 内容占画布：33%
- 大量留白=气韵生动
- 疏密有致

### 布局特征
- 大面积留白，内容居中偏上
- 主标题可以极大（200-240px）
- 必须有竖排元素
- SVG 太极/圆形装饰作分隔

### 插画规则
- ✅ 可使用 vectorshelf Plants（梅花 pl129、樱花 pl081）
- 路径：`/home/ts/下载/vectorshelf_插画合集/Plants/{文件}`
- ❌ 禁止西式/卡通插画

### 禁止
- ❌ 英文字体作为主字体
- ❌ emoji
- ❌ 彩色渐变背景
- ❌ 卡片阴影堆叠
- ❌ 文字全部横排（必须有竖排）

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
5. 每页至少 3 个装饰元素（印章必有）
6. 安全区：内容距边缘 ≥ 56px
7. 禁止纯黑 #000 / 纯白 #FFF
8. 内容超容量必须拆页
