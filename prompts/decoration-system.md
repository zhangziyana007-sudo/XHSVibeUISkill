# 装饰元素增强系统

> 本文件定义了每种视觉风格的**增强装饰元素**。
> 这些装饰 CSS 类在阶段③生成 HTML 时按需添加，用于提升页面视觉丰富度和辨识度。
> 装饰元素是**可选增强**——基础组件已在 `style-templates.md` 中定义，本文件提供额外装饰层。

---

## 使用原则

1. **装饰服务于内容**：装饰不能遮挡文字或干扰阅读
2. **每页 3-5 个装饰元素**：太少无感，太多杂乱
3. **装饰层 z-index 低于内容层**：用 `pointer-events: none` + `position: absolute`
4. **保持性能**：避免过多 `filter: blur()` 叠加（每页 ≤ 3 个模糊元素）

---

## 01 · 美食探店 (food) 装饰系统

适用场景：美食推荐、咖啡种草、饮品清单

### 装饰 CSS 类

```css
/* 柔光圆 — 营造温暖氛围 */
.glow-circle {
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
  opacity: 0.15;
  pointer-events: none;
}
/* 用法：2-3个，暖色系（橙/粉/黄），放在画布边缘 */

/* 点阵装饰 — 增加精致感 */
.dot-pattern {
  position: absolute;
  width: 80px; height: 80px;
  background-image: radial-gradient(circle, var(--warm-light) 1.5px, transparent 1.5px);
  background-size: 12px 12px;
  opacity: 0.4;
  pointer-events: none;
}

/* 卡片顶部光条 — 增加高级感 */
.card-elevated::before {
  content: '';
  position: absolute;
  top: 0; left: 24px; right: 24px;
  height: 3px;
  border-radius: 0 0 3px 3px;
  background: linear-gradient(90deg, var(--orange), #F59E0B);
}

/* 渐变徽章（HOT / NEW） */
.badge-hot {
  background: linear-gradient(135deg, #FF6B35, #FF8F4C);
  color: white;
  padding: 4px 12px;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 700;
}

/* 评分进度条 */
.rating-bar {
  height: 6px;
  border-radius: 3px;
  background: #F3E8DE;
}
.rating-bar-fill {
  height: 100%;
  border-radius: 3px;
  background: linear-gradient(90deg, var(--orange), #F59E0B);
}

/* 价格标签 */
.price-tag {
  font-family: Inter, sans-serif;
  font-weight: 800;
  font-size: 32px;
  color: var(--orange);
}
.price-tag .unit {
  font-size: 20px;
  font-weight: 500;
}

/* 精致分割线 */
.divider-fancy {
  display: flex;
  align-items: center;
  gap: 12px;
}
.divider-fancy::before,
.divider-fancy::after {
  content: '';
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--warm-light), transparent);
}
```

### 配合插画
- 使用 vectorshelf Drink/Food 类插画
- 插画大小：80-160px
- 位置：标题旁、卡片角落、列表图标

---

## 02 · 商务知识卡 (knowledge) 装饰系统

适用场景：教程、效率方法、知识干货

### 装饰 CSS 类

```css
/* 淡色网格背景 */
.grid-bg {
  background-image:
    linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px);
  background-size: 40px 40px;
}

/* 发光球 — 作为视觉锚点 */
.glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.08;
  pointer-events: none;
}

/* 荧光笔标注 */
.highlight-purple {
  background: linear-gradient(180deg, transparent 60%, rgba(168,85,247,0.15) 60%);
  padding: 0 4px;
}
.highlight-green {
  background: linear-gradient(180deg, transparent 60%, rgba(34,197,94,0.15) 60%);
  padding: 0 4px;
}

/* 步骤连接线 */
.connector {
  position: absolute;
  width: 2px;
  background: linear-gradient(180deg, var(--accent), transparent);
  left: 50%;
  transform: translateX(-50%);
}

/* 步骤圆 */
.step-circle {
  width: 48px; height: 48px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  background: var(--accent);
  color: white;
  font-weight: 700;
  font-size: 22px;
}

/* 效率徽章 */
.efficiency-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 100px;
  background: var(--accent-soft);
  color: var(--accent);
  font-size: 20px;
  font-weight: 600;
}

/* 时间标记 */
.time-marker {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 18px;
  color: var(--ink-3);
  font-family: Inter, sans-serif;
}

/* 脉冲小点（列表项前） */
.pulse-dot-sm::after {
  content: '';
  width: 8px; height: 8px;
  border-radius: 50%;
  background: var(--accent);
  animation: pulse-sm 2s ease-in-out infinite;
}
@keyframes pulse-sm {
  0%,100% { opacity: 1; }
  50% { opacity: 0.3; }
}
```

### 配合插画
- 可选使用 shigureni 学习场景人物（小尺寸，120px）
- 或 vectorshelf Goods 文具类
- 位置：页面角落装饰，不占主要空间

---

## 03 · AI 科技日报 (ai-daily) 装饰系统

适用场景：AI 新闻日报、科技资讯、工具推荐

### 装饰 CSS 类

```css
/* 扫描线叠加 — 终端复古感 */
.scanline::after {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0,255,136,0.01) 2px,
    rgba(0,255,136,0.01) 4px
  );
  pointer-events: none;
}

/* 发光球 — 提供色彩焦点 */
.glow-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.06;
  background: var(--accent);
  pointer-events: none;
}

/* 脉冲点 — 状态指示 */
.pulse-dot {
  width: 10px; height: 10px;
  border-radius: 50%;
  background: var(--accent);
  animation: pulse-ai 1.6s ease-in-out infinite;
}
@keyframes pulse-ai {
  0%,100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(1.5); }
}

/* 发光文字 */
.glow-text {
  color: var(--accent);
  text-shadow: 0 0 28px rgba(0,255,136,0.6);
}

/* 数据卡片 — 带左侧发光边框 */
.data-card {
  border-radius: 16px;
  border: 1px solid var(--border);
  background: var(--bg-2);
  padding: 24px 28px;
  position: relative;
}
.data-card::before {
  content: '';
  position: absolute;
  left: 0; top: 20%; bottom: 20%;
  width: 3px;
  border-radius: 2px;
  background: var(--accent);
  box-shadow: 0 0 8px rgba(0,255,136,0.4);
}

/* 科技进度条 */
.tech-bar {
  height: 4px;
  border-radius: 2px;
  background: rgba(255,255,255,0.05);
}
.tech-bar-fill {
  height: 100%;
  border-radius: 2px;
  background: linear-gradient(90deg, var(--accent), rgba(0,255,136,0.3));
}

/* 排名编号 */
.rank-num {
  font-family: 'JetBrains Mono', monospace;
  font-size: 44px;
  font-weight: 700;
  color: var(--accent);
  opacity: 0.8;
}

/* 科技分割线 */
.divider-tech {
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
  opacity: 0.3;
}
```

### 插画规则
- ❌ **绝对禁止使用任何图片或插画**
- 所有视觉效果来自 CSS 装饰 + 图标 + 排版

---

## 04 · 古风国潮 (guofeng) 装饰系统

适用场景：读书笔记、金句语录、国风内容

### 装饰 CSS 类

```css
/* 宣纸纹理叠加（已在 canvas background-image 中） */

/* 印章 — 每页必有 */
.seal {
  font-family: 'ZCOOL XiaoWei', 'Noto Serif SC', serif;
  writing-mode: vertical-rl;
  background: var(--vermilion);
  color: var(--paper);
  padding: 24px 14px;
  letter-spacing: 14px;
  border-radius: 6px;
  font-size: 36px;
}

/* 竖排文字 */
.vertical-text {
  writing-mode: vertical-rl;
  letter-spacing: 16px;
}

/* 金色装饰线 */
.gold-line {
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
  margin: 24px 0;
}

/* 云纹装饰 */
.cloud-deco {
  position: absolute;
  opacity: 0.06;
  pointer-events: none;
}
/* 用 SVG 实现云纹 */

/* 角花装饰 — 放在画布四角 */
.corner-deco {
  position: absolute;
  width: 48px; height: 48px;
  border: 2px solid var(--gold);
  opacity: 0.3;
  pointer-events: none;
}
.corner-deco.top-left { top: 32px; left: 32px; border-right: none; border-bottom: none; }
.corner-deco.top-right { top: 32px; right: 32px; border-left: none; border-bottom: none; }
.corner-deco.bottom-left { bottom: 32px; left: 32px; border-right: none; border-top: none; }
.corner-deco.bottom-right { bottom: 32px; right: 32px; border-left: none; border-top: none; }

/* 引言卡片 — 带朱砂红左边框 */
.quote-card {
  background: rgba(244,236,216,0.6);
  border-left: 4px solid var(--vermilion);
  padding: 28px 32px;
  border-radius: 0 12px 12px 0;
  margin: 16px 0;
}
.quote-card::before {
  content: '"';
  font-size: 48px;
  color: var(--vermilion);
  opacity: 0.4;
  line-height: 1;
}

/* 菱形列表符号 */
.gf-bullet {
  width: 10px; height: 10px;
  background: var(--vermilion);
  transform: rotate(45deg);
  flex-shrink: 0;
}
```

### 配合插画
- 使用 vectorshelf Plants 类：梅花（pl129）、樱花（pl081）
- 插画位置：标题区右侧装饰、底部点缀
- 大小：100-160px
- 不使用西式或卡通插画

---

## 05 · 多巴胺撞色 (dopamine) 装饰系统

适用场景：种草清单、好物推荐、活力向内容

### 装饰 CSS 类

```css
/* 彩色渐变斑点 — 背景大球 */
.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
  opacity: 0.25;
  pointer-events: none;
}
/* 用法：3-4个，不同颜色，放在画布边缘溢出 */

/* 彩色小圆点 — confetti 效果 */
.confetti {
  position: absolute;
  width: 12px; height: 12px;
  border-radius: 50%;
  pointer-events: none;
}
/* 用法：5-8个散布画布各处，使用 pink/purple/yellow/green/blue */

/* 药丸标签 — 4 色系 */
.pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border-radius: 100px;
  padding: 8px 18px;
  font-size: 20px;
  font-weight: 700;
  color: white;
}
.pill-pink { background: linear-gradient(135deg, #FF6B9D, #FF9EB8); }
.pill-purple { background: linear-gradient(135deg, #A855F7, #C084FC); }
.pill-yellow { background: linear-gradient(135deg, #FBBF24, #FCD34D); color: #7C2D12; }
.pill-green { background: linear-gradient(135deg, #34D399, #6EE7B7); color: #064E3B; }

/* 弹跳卡片 — 带彩色边框 */
.bounce-card {
  background: white;
  border-radius: 24px;
  padding: 20px 24px;
  box-shadow: 0 8px 24px rgba(255,107,157,0.1);
  border: 2px solid transparent;
}
.bounce-card.pink { border-color: rgba(255,107,157,0.3); }
.bounce-card.purple { border-color: rgba(168,85,247,0.3); }
.bounce-card.green { border-color: rgba(52,211,153,0.3); }
.bounce-card.yellow { border-color: rgba(251,191,36,0.3); }

/* 波浪分割线 */
.wave-divider {
  width: 100%; height: 24px;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 900 24'%3E%3Cpath d='M0,12 Q225,0 450,12 Q675,24 900,12' fill='none' stroke='%23FF6B9D' stroke-width='2' opacity='0.3'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
}

/* 数字圆 — 编号组件 */
.num-circle {
  width: 44px; height: 44px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 22px; font-weight: 900;
  color: white;
  flex-shrink: 0;
}
/* 每个编号用不同渐变色 */
```

### 颜色变量（浅色底版）

多巴胺风格有两种底色方案，根据内容选用：

**暗底版**（原版，style-templates.md 中定义）：
```css
--bg: #2D2A4A; --fg: #FFFFFF;
```

**浅色底版**（更适合食物/日常内容）：
```css
--dp-bg: #FFF5F7;
--dp-card: #FFFFFF;
--dp-pink: #FF6B9D;
--dp-purple: #A855F7;
--dp-yellow: #FBBF24;
--dp-green: #34D399;
--dp-blue: #60A5FA;
--dp-text: #1F1235;
--dp-text-2: #6B5B7B;
```

选择规则：
- 科技/潮流/夜生活 → 暗底版
- 美食/日常/好物推荐 → 浅色底版

### 配合插画
- 使用 vectorshelf Drink/Food/Plants
- 插画大小：80-180px
- 位置：标题旁大图 + 列表项小图标
- 搭配 `drop-shadow(0 4px 12px rgba(0,0,0,0.1))` 提升层次

---

## 06 · 水墨古风 (shuimo) 装饰系统

> 水墨画意境。以灰阶五墨为核心，追求空灵留白、泼墨飞白效果。

### 装饰 CSS 类

**泼墨飞溅（.ink-splash）**：
```css
.ink-splash {
  position: absolute;
  border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
  background: radial-gradient(ellipse, rgba(26,26,26,0.08), transparent 70%);
  filter: blur(2px);
}
.ink-splash-sm { width: 120px; height: 100px; }
.ink-splash-md { width: 200px; height: 180px; }
.ink-splash-lg { width: 320px; height: 280px; }
```

**山水剪影（.mountain-silhouette）**：
```css
.mountain-silhouette {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 240px;
  background: linear-gradient(180deg,
    transparent 0%, rgba(26,26,26,0.02) 30%,
    rgba(26,26,26,0.06) 60%, rgba(26,26,26,0.1) 100%);
  clip-path: polygon(
    0% 100%, 0% 65%, 8% 55%, 15% 60%, 22% 45%, 30% 50%,
    38% 35%, 45% 40%, 52% 28%, 58% 35%, 65% 22%, 72% 30%,
    78% 25%, 85% 38%, 92% 30%, 100% 45%, 100% 100%);
  opacity: 0.6;
}
```

**墨线分割（.ink-divider）**：
```css
.ink-divider {
  height: 2px;
  background: linear-gradient(90deg,
    transparent, #bbb 15%, #888 40%, #555 50%, #888 60%, #bbb 85%, transparent);
  margin: 32px 0;
}
.ink-divider-thin { height: 1px; opacity: 0.5; }
```

**淡墨圆晕（.ink-circle）**：
```css
.ink-circle {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(26,26,26,0.04), transparent 70%);
}
.ink-circle-sm { width: 150px; height: 150px; }
.ink-circle-lg { width: 400px; height: 400px; }
```

**飞白文字（.feibai）** — 超大淡色装饰字：
```css
.feibai {
  font-family: '正风毛笔', '三极泼墨体', cursive;
  font-size: 280px;
  color: rgba(26,26,26,0.04);
  position: absolute;
  z-index: 0;
  user-select: none;
}
```

**竹节引言框（.bamboo-quote）**：
```css
.bamboo-quote {
  border-left: 3px solid #4a7c7c;
  padding: 20px 24px;
  background: rgba(74,124,124,0.04);
  font-family: '演示悠然小楷', serif;
  font-size: 28px;
  color: #333;
}
```

**墨点列表（.ink-dot-list）**：
```css
.ink-dot-list li { position: relative; padding-left: 24px; margin-bottom: 16px; }
.ink-dot-list li::before {
  content: ''; position: absolute;
  left: 0; top: 12px;
  width: 8px; height: 8px;
  border-radius: 50%;
  background: #555;
}
```

**水墨印章（.shuimo-seal）**：
```css
.shuimo-seal {
  font-family: '峄山碑篆体', serif;
  writing-mode: vertical-rl;
  border: 2px solid #7a2e2e;
  color: #7a2e2e;
  padding: 16px 10px;
  letter-spacing: 10px;
  font-size: 28px;
  opacity: 0.8;
}
```

**云雾效果（.mist）**：
```css
.mist {
  position: absolute;
  width: 100%; height: 120px;
  background: linear-gradient(180deg,
    rgba(247,243,236,0.9), rgba(247,243,236,0));
  pointer-events: none;
}
.mist-top { top: 0; }
.mist-bottom { bottom: 0; transform: rotate(180deg); }
```

### 装饰使用规则
- 每页至少 3 个装饰元素
- 墨迹飞溅放置在角落或边缘，不遮挡正文
- 山水剪影仅用于底部，透明度低
- 飞白装饰字放在内容下方（z-index:0）
- 留白区域可以放淡墨圆晕增加层次
- 印章放在右下或左下角

### 插画规则
- ❌ 禁止使用任何插画
- 仅使用 CSS 生成的装饰效果（泼墨/山水/墨圆）

---

## 装饰元素对照速查表

| 风格 | 背景装饰 | 分割线 | 列表标记 | 卡片增强 | 徽章/标签 |
|------|---------|--------|---------|---------|----------|
| food | glow-circle + dot-pattern | divider-fancy | 数字+图标 | card-elevated::before | badge-hot |
| knowledge | grid-bg + glow | 渐变线 | step-circle + connector | 左边框 | efficiency-badge |
| ai-daily | scanline + glow-orb | divider-tech | rank-num | data-card::before | 无（纯文字） |
| guofeng | 宣纸纹理 + cloud-deco | gold-line | gf-bullet | quote-card | seal |
| dopamine | blob + confetti | wave-divider | num-circle | bounce-card 边框 | pill |
| shuimo | ink-splash + ink-circle | ink-divider | ink-dot-list | bamboo-quote | shuimo-seal |
