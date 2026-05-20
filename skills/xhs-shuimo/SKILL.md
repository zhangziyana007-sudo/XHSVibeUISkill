---
name: xhs-shuimo
description: 小红书水墨古风风格图文制作（灰阶五墨+泼墨飞白+山水留白）
version: 1.0.0
author: ts
platforms: [linux, macos]
prerequisites:
  commands: [node]
metadata:
  hermes:
    tags: [小红书, XHS, 水墨, 古风, 禅意]
    category: social-media
---

# 小红书 · 水墨古风风格

> 中国水墨画意境 + 极简留白。墨分五色、计白当黑。适合：诗词/禅意/山水/文人/哲理。

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

**本风格已确定为 shuimo**，适合内容类型：金句语录型 / 故事经验型 / 清单型。

### 页面结构通用规则

所有图文：封面(1页) + 内容页(N页) + 末页(1页)，总 4-8 页。

| 封面 | 内容页 | 末页 |
|------|--------|------|
| 大标题+副标题+标签 | 按素材类型适配（见下） | 总结语+CTA+话题标签 |

**内容页适配**（按素材特征选择）：
- 步骤/流程 → 每步一页：大编号 + 标题 + ≤2行说明
- 多个同类项 → 每项一页：标题 + 描述 + 标签
- 清单/注意事项 → 每页 3-5 条：编号 + 要点
- 金句/语录 → 每句一页：超大字 + 留白
- 新闻/数据 → 每页 2-3 条：数据卡片
- 对比 → 左右对比 或 前后对比

**⚠️ 必须暂停确认**后继续。

输出到 `projects/{topic}/02-xhs-content.md`

---

## 阶段③ · HTML 生成（核心设计规范）

### 设计语言
中国水墨画意境。以墨分五色（焦浓重淡清）为核心，追求「意在笔先、计白当黑」。

**与 guofeng（国潮）的区别**：国潮偏朱砂金色、印章装饰、竖排版式；水墨偏灰阶渐变、泼墨飞白、山水意境。

### CSS 变量（必须使用）
```css
:root {
  --xuan: #f7f3ec;
  --mo-jiao: #1a1a1a;
  --mo-nong: #333333;
  --mo-zhong: #555555;
  --mo-dan: #888888;
  --mo-qing: #bbbbbb;
  --qing: #4a7c7c;
  --zhu: #7a2e2e;
  --jin: #8b7355;
}
```

### 页面背景
```css
html, body { background: #e8e2d8; margin: 0; }
body {
  font-family: '问藏书房', 'LXGW WenKai', 'Noto Serif SC', serif;
  min-height: 100vh; display: flex; align-items: center; justify-content: center;
  padding: 32px 16px;
}
```

### Canvas 背景（水墨宣纸质感 - 必须有）
```css
.canvas {
  width: 900px; height: 1200px; position: relative; overflow: hidden;
  background: var(--xuan); color: var(--mo-jiao);
  box-shadow: 0 2px 4px rgba(26,26,26,0.06), 0 24px 48px -12px rgba(26,26,26,0.15);
  background-image:
    radial-gradient(ellipse at 15% 20%, rgba(74,124,124,0.05), transparent 50%),
    radial-gradient(ellipse at 85% 75%, rgba(26,26,26,0.04), transparent 45%),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
}
@media (max-width: 960px) {
  .canvas { transform: scale(calc(100vw / 960)); transform-origin: top center; }
  body { align-items: flex-start; padding-top: 16px; }
}
```

### 字体
```css
body { font-family: '问藏书房', 'LXGW WenKai', 'Noto Serif SC', serif; }
h1, .title { font-family: '正风毛笔', '三极泼墨体', 'Ma Shan Zheng', cursive; }
h2, .subtitle { font-family: '演示悠然小楷', '演示夏行楷', serif; }
.seal-text { font-family: '峄山碑篆体', serif; }
```

Google Fonts（备用）：
```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&family=Noto+Serif+SC:wght@400;700;900&display=swap" />
```

本地字体（核心 — 必须引入）：
```css
@font-face { font-family: '正风毛笔'; src: url('/home/ts/XHSVibeUISkill/fonts/fonts-net-cn/extracted/正风毛笔 Bold/MasaFont-Bold-2.ttf'); }
@font-face { font-family: '三极泼墨体'; src: url('/home/ts/XHSVibeUISkill/fonts/fonts-net-cn/extracted/三极泼墨体/SanJiPoMoTi-2.ttf'); }
@font-face { font-family: '云峰静龙行书'; src: url('/home/ts/XHSVibeUISkill/fonts/fonts-net-cn/extracted/云峰静龙行书/YunFengJingLongXingShu-2.ttf'); }
@font-face { font-family: '演示悠然小楷'; src: url('/home/ts/XHSVibeUISkill/fonts/fonts-net-cn/extracted/演示悠然小楷/YanShiYouRanXiaoKai-2.ttf'); }
@font-face { font-family: '演示夏行楷'; src: url('/home/ts/XHSVibeUISkill/fonts/fonts-net-cn/extracted/演示夏行楷/YanShiXiaXingKai-2.ttf'); }
@font-face { font-family: '问藏书房'; src: url('/home/ts/XHSVibeUISkill/fonts/fonts-net-cn/extracted/问藏书房/WenCangShuFang-2.ttf'); }
@font-face { font-family: '令东齐伋复刻体'; src: url('/home/ts/XHSVibeUISkill/fonts/fonts-net-cn/extracted/令东齐伋复刻体/LingDongQiCheChunTang-2.ttf'); }
@font-face { font-family: '峄山碑篆体'; src: url('/home/ts/XHSVibeUISkill/fonts/fonts-net-cn/extracted/峄山碑篆体/YiShanBeiZhuanTi.ttf'); }
@font-face { font-family: 'LXGW WenKai'; src: url('/home/ts/XHSVibeUISkill/fonts/LXGWWenKai-Regular.ttf'); }
```

### 核心组件

**泼墨标题（.splash-title）**：
```css
.splash-title { font-family: '正风毛笔', '三极泼墨体', cursive; font-size: 120px; color: var(--mo-jiao); text-shadow: 2px 2px 8px rgba(26,26,26,0.2); position: relative; }
.splash-title::after { content: ''; position: absolute; bottom: -8px; left: 10%; width: 80%; height: 3px; background: linear-gradient(90deg, transparent, var(--mo-dan), var(--mo-qing), transparent); }
```

**墨迹装饰（.ink-splash）**：
```css
.ink-splash { position: absolute; border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; background: radial-gradient(ellipse, rgba(26,26,26,0.08), transparent 70%); filter: blur(2px); }
.ink-splash-sm { width: 120px; height: 100px; }
.ink-splash-md { width: 200px; height: 180px; }
.ink-splash-lg { width: 320px; height: 280px; }
```

**山水剪影（.mountain-silhouette）**：
```css
.mountain-silhouette { position: absolute; bottom: 0; left: 0; right: 0; height: 240px; background: linear-gradient(180deg, transparent 0%, rgba(26,26,26,0.02) 30%, rgba(26,26,26,0.06) 60%, rgba(26,26,26,0.1) 100%); clip-path: polygon(0% 100%, 0% 65%, 8% 55%, 15% 60%, 22% 45%, 30% 50%, 38% 35%, 45% 40%, 52% 28%, 58% 35%, 65% 22%, 72% 30%, 78% 25%, 85% 38%, 92% 30%, 100% 45%, 100% 100%); opacity: 0.6; }
```

**墨线分割（.ink-divider）**：
```css
.ink-divider { height: 2px; background: linear-gradient(90deg, transparent, #bbb 15%, #888 40%, #555 50%, #888 60%, #bbb 85%, transparent); margin: 32px 0; }
```

**水墨印章（.shuimo-seal）**：
```css
.shuimo-seal { font-family: '峄山碑篆体', serif; writing-mode: vertical-rl; border: 2px solid var(--zhu); color: var(--zhu); padding: 16px 10px; letter-spacing: 10px; font-size: 28px; opacity: 0.8; }
```

**竹节引言框（.bamboo-quote）**：
```css
.bamboo-quote { border-left: 3px solid var(--qing); padding: 20px 24px; background: rgba(74,124,124,0.04); font-family: '演示悠然小楷', serif; font-size: 28px; color: var(--mo-nong); position: relative; }
.bamboo-quote::before { content: '"'; position: absolute; top: -12px; left: 12px; font-size: 64px; color: var(--mo-qing); }
```

### 装饰系统（每页至少 3 个）

```css
/* 淡墨圆晕 */
.ink-circle { position: absolute; border-radius: 50%; background: radial-gradient(circle, rgba(26,26,26,0.04), transparent 70%); }
.ink-circle-sm { width: 150px; height: 150px; }
.ink-circle-lg { width: 400px; height: 400px; }

/* 飞白文字 — 超大淡色装饰字 */
.feibai { font-family: '正风毛笔', '三极泼墨体', cursive; font-size: 280px; color: rgba(26,26,26,0.04); position: absolute; z-index: 0; user-select: none; }

/* 墨点列表 */
.ink-dot-list li { position: relative; padding-left: 24px; margin-bottom: 16px; }
.ink-dot-list li::before { content: ''; position: absolute; left: 0; top: 12px; width: 8px; height: 8px; border-radius: 50%; background: var(--mo-zhong); }

/* 云雾效果 */
.mist { position: absolute; width: 100%; height: 120px; background: linear-gradient(180deg, rgba(247,243,236,0.9), rgba(247,243,236,0)); pointer-events: none; }
```

### 色彩节奏
```
焦墨(#1a1a1a) → 标题/核心关键词
浓墨(#333)    → 正文
重墨(#555)    → 副标题
淡墨(#888)    → 辅助说明
清墨(#bbb)    → 装饰/背景文字
青色(#4a7c7c) → 少量点缀（引用框）
暗朱(#7a2e2e) → 极少量（印章）
```

### 空间分配

```
┌──────────────────────────────┐ 0px
│ 上部 1/4 留白 + 墨迹装饰      │  300px 纯宣纸+淡墨飞溅
│                              │ 300px
│ 主标题区：300px               │
│   泼墨标题(120px)             │  居中或偏右
│   墨线分割                    │
│   副标题(36px, 小楷)          │
│                              │ 600px
│ 内容区：300px                 │
│   引言框 / 墨点列表           │  左对齐，行间距≥2.0
│                              │ 900px
│ 底部留白 + 山水剪影           │  300px
│   印章(右下)                  │
└──────────────────────────────┘ 1200px
```

### 内容密度
- 内容仅占画布 50-60%
- 大面积宣纸留白
- 留白是水墨的核心
- 每页正文不超过 40 字

### 布局特征
- 极度留白 — 上部 1/4 可为纯空白+墨迹
- 主标题居中或偏右（模仿书法落款）
- 正文左对齐，行间距 ≥ 2.0
- 底部山水剪影渐隐
- 竖排诗句/短语作侧边装饰

### 插画规则
- ❌ **禁止使用任何插画**
- 仅使用 CSS 装饰（泼墨/山水/墨圆）

### 禁止
- ❌ 彩色（除青色和暗朱极少量点缀外）
- ❌ 英文字体作主字体
- ❌ 渐变彩色背景
- ❌ 卡片阴影堆叠（只允许淡墨晕染）
- ❌ emoji
- ❌ 信息密度过高（水墨核心是留白）
- ❌ 粗线条边框
- ❌ 正文全部居中

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
3. 每页总文字 ≤ 80字（水墨建议 ≤ 40字）
4. 禁止 emoji，图标用 `<i data-lucide="名称">`
5. 每页至少 3 个装饰元素
6. 安全区：内容距边缘 ≥ 56px
7. 禁止纯黑 #000 / 纯白 #FFF
8. 内容超容量必须拆页
