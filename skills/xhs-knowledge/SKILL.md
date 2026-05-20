---
name: xhs-knowledge
description: 小红书商务知识卡风格图文制作（白底+橙红+超大数字+干货信息）
version: 1.0.0
author: ts
platforms: [linux, macos]
prerequisites:
  commands: [node]
metadata:
  hermes:
    tags: [小红书, XHS, 知识卡, 干货, 数据]
    category: social-media
---

# 小红书 · 商务知识卡风格

> 信息密度高、数据可视化、专业干净。适合：教程/干货/数据/思维模型/效率方法。

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

**本风格已确定为 knowledge**，适合内容类型：教程步骤型 / 数据报告型 / 清单型 / 工具推荐型。

**⚠️ 必须暂停确认**后继续。

输出到 `projects/{topic}/02-xhs-content.md`

---

## 阶段③ · HTML 生成（核心设计规范）

### 设计语言
信息密度高、数据可视化、专业干净。

### CSS 变量（必须使用）
```css
:root {
  --bg: #fafafa;
  --ink: #1a1a1a;
  --ink-2: #4b5563;
  --ink-3: #9ca3af;
  --border: #e5e5e5;
  --accent: #ff4500;
  --accent-soft: #fff4ee;
}
```

### 页面背景
```css
html, body { background: #ebebeb; margin: 0; }
body {
  font-family: 'Noto Sans SC', 'PingFang SC', system-ui, sans-serif;
  min-height: 100vh; display: flex; align-items: center; justify-content: center;
  padding: 32px 16px;
}
```

### Canvas 背景
```css
.canvas {
  width: 900px; height: 1200px; position: relative; overflow: hidden;
  background: var(--bg);
  box-shadow: 0 1px 2px rgba(0,0,0,0.04), 0 30px 60px -20px rgba(0,0,0,0.2);
}
@media (max-width: 960px) {
  .canvas { transform: scale(calc(100vw / 960)); transform-origin: top center; }
  body { align-items: flex-start; padding-top: 16px; }
}
```

### 字体
```css
body { font-family: 'Noto Sans SC', 'PingFang SC', system-ui, sans-serif; }
.big-num, .code { font-family: 'JetBrains Mono', 'Orbitron', monospace; }
h1, .title { font-family: 'Outfit', 'Noto Sans SC', sans-serif; font-weight: 900; }
```

Google Fonts：
```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&family=Outfit:wght@600;700;900&family=Space+Grotesk:wght@500;700&family=JetBrains+Mono:wght@500;700&family=Orbitron:wght@700;900&display=swap" />
```

本地字体（可选增强）：
```css
@font-face { font-family: '优设标题黑'; src: url('/home/ts/XHSVibeUISkill/fonts/fonts-net-cn/extracted/优设标题黑/YouSheBiaoTiHei-2.ttf'); }
@font-face { font-family: '庞门正道标题体'; src: url('/home/ts/XHSVibeUISkill/fonts/fonts-net-cn/extracted/庞门正道标题体免费版/PangMenZhengDaoBiaoTiTiMianFeiBan-2.ttf'); }
@font-face { font-family: '标小智无界黑'; src: url('/home/ts/XHSVibeUISkill/fonts/fonts-net-cn/extracted/标小智无界黑/LogoSCUnboundedSans-Regular-2.ttf'); }
@font-face { font-family: '文道潮黑'; src: url('/home/ts/XHSVibeUISkill/fonts/fonts-net-cn/extracted/文道潮黑/WenDaoChaoHei-2.ttf'); }
@font-face { font-family: '创客贴金刚体'; src: url('/home/ts/XHSVibeUISkill/fonts/fonts-net-cn/extracted/创客贴金刚体/ChuangKeTieJinGangTi-2.otf'); }
@font-face { font-family: 'Smiley Sans'; src: url('/home/ts/XHSVibeUISkill/fonts/SmileySans-Oblique.ttf'); }
```

### 核心组件

**超大装饰数字（.big-num）** — 视觉锚点：
```css
.big-num { font-family: Inter, sans-serif; font-weight: 900; font-feature-settings: 'tnum'; font-size: 480px; line-height: 0.85; letter-spacing: -0.05em; color: var(--accent); }
```

**圆角徽章**：
```css
display: inline-block; border-radius: 9999px; background: var(--accent-soft); padding: 8px 24px; font-size: 26px; font-weight: 700; color: var(--accent);
```

**金句卡片**：
```css
border-radius: 24px; border-left: 8px solid var(--accent); background: white; padding: 32px 40px; box-shadow: 0 8px 24px -12px rgba(0,0,0,0.12);
```

**底部 CTA 条**：
```css
border-top: 1px solid var(--border); background: white;
/* 头像 + 用户名 + 关注按钮 */
```

### 装饰系统（每页至少 3 个）

```css
/* 淡色网格背景 */
.grid-bg { background-image: linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px); background-size: 40px 40px; }

/* 发光球 — 视觉锚点 */
.glow { position: absolute; border-radius: 50%; filter: blur(60px); opacity: 0.08; pointer-events: none; }

/* 荧光笔标注 */
.highlight-purple { background: linear-gradient(180deg, transparent 60%, rgba(168,85,247,0.15) 60%); padding: 0 4px; }
.highlight-green { background: linear-gradient(180deg, transparent 60%, rgba(34,197,94,0.15) 60%); padding: 0 4px; }

/* 步骤连接线 */
.connector { position: absolute; width: 2px; background: linear-gradient(180deg, var(--accent), transparent); left: 50%; transform: translateX(-50%); }

/* 步骤圆 */
.step-circle { width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: var(--accent); color: white; font-weight: 700; font-size: 22px; }

/* 效率徽章 */
.efficiency-badge { display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; border-radius: 100px; background: var(--accent-soft); color: var(--accent); font-size: 20px; font-weight: 600; }
```

### 空间分配

```
┌──────────────────────────────┐ 0px
│ 顶部品牌条：80px              │  编号方块(深底白字) + 描述 + 期号
│                              │ 80px
│ 间距：64px                    │
│ 徽章标签：50px                │  pill「✦ 必看干货」accent-soft
│                              │ 194px
│ 间距：32px                    │
│ 超大数字+标题区：480px         │  数字480px(accent) + 旁边标题
│                              │ 706px
│ 间距：54px                    │
│ 金句卡片：200px               │  border-left:8px accent
│                              │ 960px
│ 底部CTA条：100px              │  border-top + 头像 + 关注按钮
└──────────────────────────────┘ 1200px
```

### 内容密度
- 每页：数字+标题+金句卡
- 内容占画布：75%
- 结构化分层代替留白

### 插画规则
- ✅ 可选使用 shigureni 学习人物（小尺寸 120px）
- ✅ 可选使用 vectorshelf Goods 文具类
- 路径必须为绝对路径
- 仅作小型角落装饰

### 禁止
- ❌ 手写/衬线字体
- ❌ 大面积暗色
- ❌ 模糊/毛玻璃效果
- ❌ 装饰性色块
- ❌ 信息堆砌无层次
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
