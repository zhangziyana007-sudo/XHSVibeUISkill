---
name: xhs-food
description: 小红书美食探店风格图文制作（暖白+大图+食欲系）
version: 1.0.0
author: ts
platforms: [linux, macos]
prerequisites:
  commands: [node]
metadata:
  hermes:
    tags: [小红书, XHS, 美食, 探店, 饮品]
    category: social-media
---

# 小红书 · 美食探店风格

> 温暖、食欲感、照片主导。适合：美食/饮品/探店/咖啡/旅行美食。

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

**本风格已确定为 food**，适合内容类型：合集推荐型 / 测评种草型 / 清单型。

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
温暖、食欲感、照片主导。暖色调 + 大图 + 标签分类。

### CSS 变量（必须使用）
```css
:root {
  --warm-bg: #FFF8F0;
  --warm-dark: #2C1810;
  --warm-mid: #6B4C3B;
  --warm-light: #A68B7B;
  --orange: #E8690A;
  --orange-soft: #FFF1E6;
  --cream: #FFFBF5;
}
```

### 页面背景
```css
html, body { background: #f0e8df; margin: 0; }
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
  background: var(--warm-bg);
  box-shadow: 0 1px 2px rgba(44,24,16,0.06), 0 30px 60px -20px rgba(44,24,16,0.2);
}
@media (max-width: 960px) {
  .canvas { transform: scale(calc(100vw / 960)); transform-origin: top center; }
  body { align-items: flex-start; padding-top: 16px; }
}
```

### 字体
```css
body { font-family: 'Noto Sans SC', 'PingFang SC', system-ui, sans-serif; }
h1, .title { font-family: 'ZCOOL QingKe HuangYou', 'ZCOOL KuaiLe', cursive; }
.tag, .score { font-family: 'Caveat', 'Righteous', cursive; }
```

Google Fonts：
```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&family=ZCOOL+QingKe+HuangYou&family=ZCOOL+KuaiLe&family=Caveat:wght@500;700&family=Righteous&family=Pacifico&display=swap" />
```

本地字体（可选增强）：
```css
@font-face { font-family: '仓耳舒圆体'; src: url('/home/ts/XHSVibeUISkill/fonts/fonts-net-cn/extracted/仓耳舒圆体W03/CangErShuYuanTiW03-2.ttf'); }
@font-face { font-family: '猕猴桃圆'; src: url('/home/ts/XHSVibeUISkill/fonts/fonts-net-cn/extracted/猕猴桃圆 M/KiwiMaru-Medium-2.ttf'); }
@font-face { font-family: '千图小兔体'; src: url('/home/ts/XHSVibeUISkill/fonts/fonts-net-cn/extracted/千图小兔体/千图小兔体.ttf'); }
@font-face { font-family: '沐瑶软笔手写体'; src: url('/home/ts/XHSVibeUISkill/fonts/fonts-net-cn/extracted/沐瑶软笔手写体/Muyao-Softbrush-2.ttf'); }
@font-face { font-family: '站酷庆科黄油体'; src: url('/home/ts/XHSVibeUISkill/fonts/fonts-net-cn/extracted/站酷庆科黄油体/ZhanKuQingKeHuangYouTi-2.ttf'); }
```

### 核心组件

**顶部大图**：
```css
.food-img { object-fit: cover; border-radius: 16px; width: 100%; height: 520px; }
/* 底部渐变遮罩 */
background: linear-gradient(180deg, rgba(0,0,0,0) 50%, var(--warm-bg) 100%);
```

**评分卡**：
```css
background: rgba(255,255,255,0.9); backdrop-filter: blur(8px); border-radius: 16px; padding: 12px 20px;
```

**标签（.tag）**：
```css
.tag { display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; border-radius: 999px; font-size: 20px; font-weight: 600; }
/* 主标签：bg=orange, color=white */
/* 次要标签：bg=orange-soft, color=orange */
```

### 装饰系统（每页至少 3 个）

```css
/* 柔光圆 — 温暖氛围 */
.glow-circle { position: absolute; border-radius: 50%; filter: blur(40px); opacity: 0.15; pointer-events: none; }

/* 点阵装饰 */
.dot-pattern { position: absolute; width: 80px; height: 80px; background-image: radial-gradient(circle, var(--warm-light) 1.5px, transparent 1.5px); background-size: 12px 12px; opacity: 0.4; pointer-events: none; }

/* 卡片顶部光条 */
.card-elevated::before { content: ''; position: absolute; top: 0; left: 24px; right: 24px; height: 3px; border-radius: 0 0 3px 3px; background: linear-gradient(90deg, var(--orange), #F59E0B); }

/* 渐变徽章 */
.badge-hot { background: linear-gradient(135deg, #FF6B35, #FF8F4C); color: white; padding: 4px 12px; border-radius: 8px; font-size: 18px; font-weight: 700; }

/* 评分进度条 */
.rating-bar { height: 6px; border-radius: 3px; background: #F3E8DE; }
.rating-bar-fill { height: 100%; border-radius: 3px; background: linear-gradient(90deg, var(--orange), #F59E0B); }

/* 价格标签 */
.price-tag { font-family: Inter, sans-serif; font-weight: 800; font-size: 32px; color: var(--orange); }

/* 精致分割线 */
.divider-fancy { display: flex; align-items: center; gap: 12px; }
.divider-fancy::before, .divider-fancy::after { content: ''; flex: 1; height: 1px; background: linear-gradient(90deg, transparent, var(--warm-light), transparent); }
```

### 空间分配

```
┌──────────────────────────────┐ 0px
│ 大图区：520px（占43%）         │  全宽 object-fit:cover
│   左上(abs)：品牌图标          │
│   右上(abs)：评分卡(blur)      │
│   底部(abs)：渐变遮罩          │  transparent → warm-bg
│                              │ 520px
│ 标签组：60px (margin-top:-20) │  pill标签 x3
│                              │ 560px
│ 主标题+内容：340px            │  标题(64px) + 菜品列表
│                              │ 900px
│ 间距+底部：100px              │  评价/互动引导
└──────────────────────────────┘ 1200px
```

### 图片规则
- 封面页**必须**有食物图片
- 使用 `object-fit: cover` + `border-radius: 16px`
- 底部渐变遮罩过渡到背景
- 占位图：`https://picsum.photos/900/520` (开发阶段)

### 内容密度
- 图片占 43% + 文字占 30%
- 图片本身是"视觉休息"

### 插画规则
- ✅ 可使用 vectorshelf Drink/Food 类
- 路径：`/home/ts/下载/vectorshelf_插画合集/{类别}/{文件}`
- 大小：80-160px，作为列表项图标或标题装饰

### 禁止
- ❌ 冷色调
- ❌ 无图片的纯文字页面
- ❌ 深色/暗色背景
- ❌ 代码元素
- ❌ 科技感图标
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
