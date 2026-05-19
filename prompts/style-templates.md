# 风格模板设计规范 · Style Template Specifications

> 本文件是 xhs-pipeline 所有风格的**唯一权威参考**。
> 生成 HTML 时必须严格遵循对应风格的全部规范，不得自行发挥。

---

## 设计原理（为什么这样选）

### 字号系统的美学依据

#### 为什么最小 20px？
小红书图文在手机上查看，画布 900×1200px 渲染到 375px 宽的手机屏幕上时，**缩放比约 0.42**。
- 20px × 0.42 ≈ 8.4px 物理像素 → 在 Retina 屏上约 17pt，这是人眼舒适阅读的下限
- < 20px 的文字在手机上看不清，直接降低停留率

#### 字号层级比例（基于 1.414 增模比 · Augmented Fourth）
使用 **√2 增模比（1.414）** 构建和谐字号阶梯：

```
基准 body：28-40px（手机阅读正文）
× 1.414 → 页面标题：48-72px
× 1.414 → 封面标题：96-240px（允许夸张以制造冲击）
× 1.414 → 装饰数字：200-480px（纯视觉锚点，非阅读用）
÷ 1.414 → 辅助文字：20-28px
```

这是杂志排版常用的 Modular Scale，保证不同层级之间有明确的视觉层次但不突兀。

#### 各风格的字号性格

| 风格 | 字号性格 | 标题建议 | 正文建议 | 原因 |
|------|---------|---------|---------|------|
| guofeng | 大开大合 | 200-240px | 32-40px | 模仿书法碑帖的疏密节奏 |
| minimal | 克制内敛 | 72-96px | 28-32px | 杂志排版，标题不喧宾夺主 |
| dopamine | 张扬跳跃 | 100-120px | 28-36px | 街头海报感，标题要抢眼 |
| knowledge | 信息清晰 | 60-72px / 数字480px | 30-40px | 数据可视化，数字是主角 |
| food | 温暖亲切 | 64-80px | 28-34px | 不过分夸张，图片是主角 |
| ai-daily | 信息密集 | 100-124px | 28-30px | 终端日报感，标题需冲击但正文紧凑 |

#### font-weight 选择原则
- **900 (Black)**：仅用于封面大标题 / 装饰数字。制造视觉锚点
- **700 (Bold)**：页面标题。建立层次
- **500 (Medium)**：正文要点。可读性最佳
- **400 (Regular)**：辅助文字。退后不抢注意力

---

### 颜色系统的美学依据

#### 色彩心理学基础

| 色相 | 心理联想 | 适用风格 | 引用来源 |
|------|---------|---------|---------|
| 红（暖） | 热情/传统/喜庆 | guofeng | 中国传统色谱 · 朱砂 |
| 金/土黄 | 尊贵/古典/丰收 | guofeng | 中国传统色谱 · 赤金 |
| 黑白灰 | 克制/文艺/高级 | minimal | 国际主义平面设计 |
| 高饱和多色 | 快乐/年轻/活力 | dopamine | 多巴胺穿搭美学 |
| 橙红 | 行动力/重要/紧迫 | knowledge | UI 强调色通则 |
| 暖棕橙 | 食欲/温暖/舒适 | food | 食品包装色彩学 |
| 荧光绿+黑 | 科技/极客/未来 | ai-daily | 终端/Matrix 美学 |

#### 对比度规则（WCAG AA 标准）
正文文字与背景的对比度 ≥ 4.5:1，大标题 ≥ 3:1。

各风格的实际对比度验证：

| 风格 | 文字色 | 背景色 | 对比度 | 判定 |
|------|--------|--------|--------|------|
| guofeng | `#2c1810` | `#f4ecd8` | 11.2:1 | ✅ |
| minimal | `#1c1917` | `#f8f7f4` | 14.8:1 | ✅ |
| dopamine | `#FFFFFF` | `#2D2A4A` | 12.6:1 | ✅ |
| knowledge | `#1a1a1a` | `#fafafa` | 17.4:1 | ✅ |
| food | `#2C1810` | `#FFF8F0` | 12.8:1 | ✅ |
| ai-daily | `#f5f5f5` | `#0a0a0a` | 19.2:1 | ✅ |

#### 为什么禁止纯黑 `#000` 和纯白 `#FFF`？
- `#000` 在屏幕上过于刺眼，与任何非纯白背景的组合都显得生硬
- `#FFF` 大面积使用会造成眩光，特别是暗光环境
- 设计圈共识：用 `#1a1a1a`~`#2c2c2c` 代替纯黑，用 `#f5f5f5`~`#fafafa` 代替纯白
- 参考：Apple Human Interface Guidelines、Material Design 3 均避免纯黑白

#### 各风格配色的设计来源

**guofeng** — 来源：中国传统色谱 + 故宫文创配色
```
朱砂 #8b0000 — 印章、牌匾、朱批
赤金 #b8860b — 龙袍、佛像、器物镶边
宣纸 #f4ecd8 — 中国画用纸的天然色
墨色 #2c1810 — 研磨后的松烟墨
```

**minimal** — 来源：日系杂志 KINFOLK / CEREAL 风格
```
暖白 #f8f7f4 — 日本文库本纸张色（微黄暖调，非冷白）
墨色 #1c1917 — stone-900 系（Tailwind 石色阶）
中灰 #57534e — stone-600（非蓝灰，是暖灰）
淡灰 #a8a29e — stone-400
线条 #e7e5e4 — stone-200
注：全部使用 Tailwind stone 色阶，保证暖调统一
```

**dopamine** — 来源：2024 多巴胺穿搭趋势 + Pantone 年度色
```
深紫底 #2D2A4A — 为高饱和色提供暗色衬底
柠檬黄 #FFE66D — Pantone Illuminating 近似
粉红 #FF6B9D — Gen-Z Pink
薄荷绿 #4ECDC4 — Tiffany Green 变体
珊瑚橙 #FF8A5C — Pantone Living Coral 2019
薰衣草 #C3A6FF — Digital Lavender 2023
注：暗底+高饱和前景 = 色彩对比强烈但不杂乱
```

**knowledge** — 来源：Notion / Linear / 商务信息图
```
近白底 #fafafa — neutral-50（最干净的信息底）
主文字 #1a1a1a — neutral-900
橙红 #ff4500 — Reddit 橙 / 醒目行动色
橙淡底 #fff4ee — 橙色 5% 透明度铺底
注：大面积白+单一强调色 = 信息层次清晰
```

**food** — 来源：咖啡品牌 / 日料店视觉 / 暖调食物摄影
```
暖白底 #FFF8F0 — 奶油色系（food photography 背景色）
深棕 #2C1810 — 烘焙/咖啡深色
橙色 #E8690A — 食物暖光色（太阳下的面包/烤肉色）
奶油 #FFFBF5 — 牛奶/奶油白
注：暖色系唤起食欲（色彩心理学已证实）
```

**ai-daily** — 来源：Terminal 终端 / The Matrix / GitHub Dark
```
近黑 #0a0a0a — 终端背景色
荧光绿 #00ff88 — 经典终端绿 / Matrix 代码色
卡片底 #141414 — 比背景稍亮一级
灰色系 #a3a3a3/#525252 — neutral 中性灰（不偏暖不偏冷）
注：单一荧光色+暗底 = 极强视觉焦点，信息分层靠亮度
```

---

### 装饰图形与插画的美学依据

#### 各风格的装饰元素来源

**guofeng 古风国潮** — 来源：中国书画/篆刻/建筑装饰
| 元素 | 设计来源 | 实现方式 |
|------|---------|---------|
| 印章 | 中国篆刻艺术（方寸之间，气象万千） | `.seal` 竖排白字红底 |
| 竖排文字 | 中文传统排版（从右到左，从上到下） | `writing-mode: vertical-rl` |
| 朱砂红圆形 | 朱砂印泥 / 铜钱形制 | `border-radius: 50%; background: var(--vermilion)` |
| 金色横线 | 金箔装裱条 / 画轴分隔 | `background: var(--gold)` 或渐变消失线 |
| 宣纸纹理 | 手工宣纸纤维感 | `radial-gradient` 细点阵 6px×6px |
| 墨晕渐变 | 水墨洇染效果 | `radial-gradient(circle at 20% 10%, rgba(vermilion, 0.04))` |
| 太极/圆形图案 | 道家符号 / 铜镜纹样 | SVG circle + stroke |

**参考图库**：
- 故宫博物院数字文物库（dpm.org.cn）
- 中国传统色（zhongguose.com）
- Iconfont 国潮专题图标（iconfont.cn 搜「国潮」）

```svg
<!-- 古风常用 SVG：太极分隔符 -->
<svg width="32" height="32" viewBox="0 0 24 24" fill="none">
  <circle cx="12" cy="12" r="3" fill="#8B0000" />
  <circle cx="12" cy="12" r="9" stroke="#B8860B" stroke-width="1.2" />
</svg>

<!-- 古风常用 SVG：回纹角花 -->
<svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#b8860b" stroke-width="1.5">
  <path d="M4 4h32v32H4V4z M8 8h24v24H8V8z M12 12h16v16H12V12z" />
</svg>
```

---

**minimal 极简文艺** — 来源：瑞士国际主义设计 / KINFOLK 杂志
| 元素 | 设计来源 | 实现方式 |
|------|---------|---------|
| 极细水平线（1px） | 杂志分栏线 / 报纸排版 | `h-px bg-[var(--border)]` |
| 短横线装饰（64px宽） | 杂志段落分隔符 | `w-16 h-px bg-[var(--ink)]` |
| 小圆点排列 | 排版辅助记号 / 页码指示 | 2-3个不同灰度的小圆点 |
| 超大淡色页码 | KINFOLK 杂志版式 | 72px Inter 字体，`color: var(--border)` |
| 大量留白 | 无印良品设计哲学 / 侘寂美学 | 内容区从 top: 340px 开始 |

**参考杂志**：
- KINFOLK（kinfolk.com）— 大量留白、暖灰色调
- CEREAL（readcereal.com）— 极简排版、无装饰线
- THE GENTLEWOMAN — 纯文字力量

```
注：minimal 的"插画"就是"没有插画"。留白本身就是最好的装饰。
唯一的视觉元素是排版辅助符号（线段、圆点、页码）。
不要为 minimal 添加任何多余的装饰图形。
```

---

**dopamine 多巴胺撞色** — 来源：Y2K 美学 / 日本原宿风 / Figma Community
| 元素 | 设计来源 | 实现方式 |
|------|---------|---------|
| 背景色块 (.blob) | 手机壁纸渐变球 / Figma 插画风 | `border-radius: 50%; opacity: 0.1-0.15; position: absolute` |
| 胶囊标签 (.pill) | iOS 药丸按钮 / Instagram Stories 标签 | `border-radius: 999px` 高饱和底+深色字 |
| 毛玻璃卡片 | iOS 控制中心 / glassmorphism.com | `backdrop-filter: blur(12px); background: rgba(255,255,255,0.08)` |
| 多色圆点色板 | Pantone 色卡展示 | 底部一排 4-5 个小彩色圆点 |
| 圆角方形图标 | iOS App Icon 风格 | `border-radius: 16px` + 纯色底 |

**参考来源**：
- glassmorphism.com — 毛玻璃效果生成器
- haikei.app — SVG blob 生成器
- Dribbble 搜索 "dopamine color" / "Y2K design"
- Pantone 年度色报告（pantone.com）

```svg
<!-- 多巴胺常用：不需要 SVG 插画，色块本身就是装饰 -->
<!-- blob 放置规则：2-3 个，分布在画布 3 个角落，部分溢出边缘 -->
<div class="blob" style="width:320px;height:320px;background:var(--pink);opacity:0.15;top:-60px;right:-80px"></div>
<div class="blob" style="width:260px;height:260px;background:var(--mint);opacity:0.12;bottom:120px;left:-60px"></div>
<div class="blob" style="width:200px;height:200px;background:var(--yellow);opacity:0.1;bottom:-40px;right:100px"></div>
```

---

**knowledge 商务知识卡** — 来源：Notion / 得到 App / TED 演讲幻灯片
| 元素 | 设计来源 | 实现方式 |
|------|---------|---------|
| 超大装饰数字 | TED Talks 数据可视化 / 得到 App 课程封面 | 480px Inter font-weight:900 |
| 左边框卡片 | Notion callout / VS Code 引用块 | `border-left: 8px solid var(--accent)` |
| 圆角徽章 | GitHub Labels / Notion Tag | `border-radius: 9999px; background: var(--accent-soft)` |
| 底部 CTA 条 | 微信公众号底部关注栏 | 满宽 + border-top + 头像 + 按钮 |
| 编号方块 | 杂志栏目编号 | 深色底白字小方块 |

**参考来源**：
- 得到 App 课程卡片设计
- Notion 模板市场（notion.so/templates）
- Canva 信息图模板
- SlidesCarnival 演讲模板

```
注：knowledge 不使用插画或装饰图形。
所有视觉冲击来自"超大数字"和"颜色对比"（白底+橙红）。
数字是最好的插画。
```

---

**food 美食探店** — 来源：大众点评 / 食べログ / 美食摄影
| 元素 | 设计来源 | 实现方式 |
|------|---------|---------|
| 顶部大图（520px） | 小红书美食帖首图 / 美食杂志 | Unsplash 食物图 + object-fit:cover |
| 渐变遮罩 | 电影海报文字区处理 | `linear-gradient(180deg, transparent 50%, var(--warm-bg) 100%)` |
| 评分卡 | 大众点评评分 UI | 毛玻璃底 + 大数字 + 星星 SVG |
| 圆角标签 (.tag) | 外卖 App 分类标签 | pill 形状 + 位置/时间/价格信息 |
| 餐具图标 | 美食 App 通用符号 | Lucide `utensils` 图标 |

**图片来源（必须使用高质量食物图片）**：
- Unsplash 搜索关键词：`ramen`, `coffee`, `bakery`, `sushi`, `hotpot`
- Pexels 中文搜索：`美食`, `咖啡`, `甜品`
- Foodiesfeed.com — 专业美食图片免费站

```
推荐 Unsplash 图片模板 URL：
https://images.unsplash.com/photo-{ID}?w=900&h=520&fit=crop&crop=center

常用食物图 ID（直接替换 {ID}）：
- 拉面：1569718212165-3a8922ada9a9
- 咖啡：1495474472287-4d71bcdd2085
- 烘焙：1509440159596-0249088772ff
- 寿司：1579584425555-c3ce17fd4351
- 火锅：1555126634-323283e090fa
```

---

**ai-daily AI科技日报** — 来源：Terminal / Matrix / Vercel Dashboard
| 元素 | 设计来源 | 实现方式 |
|------|---------|---------|
| 60px 网格线 | 代码编辑器网格 / 工程图纸 | `linear-gradient` 1px 白色 3% 透明度 |
| 荧光发光 (.glow) | Neon 霓虹灯 / Matrix 数字雨 | `text-shadow: 0 0 28px rgba(0,255,136,0.6)` |
| 脉冲圆点 (.pulse-dot) | 服务器状态指示灯 | `animation: pulse 1.6s ease-in-out infinite` |
| 顶部状态栏 | 终端标题栏 / VS Code 状态栏 | border-bottom 分割 + mono 字体 |
| 编号条目卡 | RSS 阅读器列表 / Hacker News | 左侧大编号 + 右侧标题分类 |
| `◢` 三角前缀 | Terminal prompt 符号 | 文字装饰，非图标 |

**参考来源**：
- Vercel Dashboard（vercel.com/dashboard）
- Linear App（linear.app）— 暗色+绿色
- GitHub Dark Theme
- Warp Terminal（warp.dev）
- Hacker News / Lobste.rs 列表排版

```
注：ai-daily 绝不使用任何插画图片。
所有视觉来自：网格纹理 + 荧光绿 + 等宽字体 + 信息密度。
这是"信息即美学"的风格。
```

---

### 通用插画/图标资源（按需使用）

当特殊场景需要插画时（如空状态、引导页），推荐：

| 资源 | 风格 | 推荐用于 | 地址 |
|------|------|---------|------|
| Lucide Icons | 线性图标 | 所有风格的功能图标 | lucide.dev |
| 手绘中国风 SVG | 传统纹样 | guofeng 装饰 | iconfont.cn 搜「国潮」 |
| Simple Icons | 品牌 Logo | ai-daily 公司标识 | simpleicons.org |
| Heroicons | 实心/线性 | knowledge 信息图标 | heroicons.com |
| Tabler Icons | 线性粗细统一 | food/dopamine | tabler.io/icons |

**绝对禁止**：
- ❌ 使用 emoji 代替图标（任何风格）
- ❌ 在 minimal 中使用插画
- ❌ 在 ai-daily 中使用图片
- ❌ 在 guofeng 中使用西式插画
- ❌ 使用未经验证来源的 SVG（可能有 XSS 风险）

---

## 01 · 古风国潮 (guofeng)

### 设计语言
中式传统美学 + 现代排版。讲究留白、竖排、印章、书法气韵。

### CSS 变量（必须使用）
```css
:root {
  --paper: #f4ecd8;       /* 宣纸底色 */
  --ink: #2c1810;         /* 墨色主文字 */
  --ink-soft: #5a4032;    /* 淡墨辅助文字 */
  --vermilion: #8b0000;   /* 朱砂红（印章/强调） */
  --gold: #b8860b;        /* 金色（分割线/装饰） */
}
```

### 页面背景
```css
html, body { background: #e9e3d5; }  /* 旧纸色外框 */
```

### Canvas 背景（宣纸质感 - 必须有）
```css
.canvas {
  background: var(--paper);
  color: var(--ink);
  box-shadow: 0 1px 2px rgba(44,24,16,0.08), 0 30px 60px -20px rgba(44,24,16,0.25);
  background-image:
    radial-gradient(circle at 20% 10%, rgba(139,0,0,0.04), transparent 40%),
    radial-gradient(circle at 80% 80%, rgba(184,134,11,0.06), transparent 40%),
    radial-gradient(rgba(44,24,16,0.05) 1px, transparent 1px);
  background-size: 100% 100%, 100% 100%, 6px 6px;
}
```

### 字体

**字体用途映射**（参考 `config/fonts.json` → styleMapping.guofeng）：
| 用途 | 推荐字体 | 效果 |
|------|----------|------|
| 主标题 | Ma Shan Zheng / Zhi Mang Xing / Liu Jian Mao Cao | 毛笔书法感 |
| 副标题 | ZCOOL XiaoWei / Long Cang / LXGW WenKai | 文人气质 |
| 正文 | LXGW WenKai / Noto Serif SC | 典雅宋体 |
| 装饰 | Liu Jian Mao Cao / ZCOOL XiaoWei | 草书/碑刻 |

```css
body { font-family: 'Noto Serif SC', 'LXGW WenKai', 'Songti SC', serif; }
h1, .title { font-family: 'Ma Shan Zheng', 'Zhi Mang Xing', cursive; }
h2, .subtitle { font-family: 'ZCOOL XiaoWei', 'Long Cang', serif; }
```
Google Fonts 引入：
```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&family=Zhi+Mang+Xing&family=Liu+Jian+Mao+Cao&family=Long+Cang&family=ZCOOL+XiaoWei&family=Noto+Serif+SC:wght@500;700;900&display=swap" />
```
本地字体（非 Google Fonts）：
```css
@font-face { font-family: 'LXGW WenKai'; src: url('../fonts/LXGWWenKai-Regular.ttf'); }
```

**本地字体扩展（fonts-net-cn 精选）：**
| 字体名 | 用途 | 效果 | zip路径 |
|--------|------|------|---------|
| 演示悠然小楷 | 副标题/正文 | 优雅小楷，文人气韵 | `fonts-net-cn/演示悠然小楷.zip` |
| 演示夏行楷 | 主标题/副标题 | 行楷流畅，动感十足 | `fonts-net-cn/演示夏行楷.zip` |
| 云峰静龙行书 | 主标题装饰 | 飘逸行书，龙飞凤舞 | `fonts-net-cn/云峰静龙行书.zip` |
| 正风毛笔 | 主标题 | 粗犷毛笔，气势磅礴 | `fonts-net-cn/正风毛笔 Bold.zip` |
| 三极泼墨体 | 装饰/标题 | 泼墨写意，浓墨重彩 | `fonts-net-cn/三极泼墨体.zip` |
| 峄山碑篆体 | 印章/装饰 | 篆书古朴，适合.seal组件 | `fonts-net-cn/峄山碑篆体.zip` |
| 令东齐伋复刻体 | 正文 | 古籍刊刻体，典雅庄重 | `fonts-net-cn/令东齐伋复刻体.zip` |
| 问藏书房 | 正文/副标题 | 书卷气，文艺内敛 | `fonts-net-cn/问藏书房.zip` |

```css
/* 古风本地字体示例 @font-face */
@font-face { font-family: '演示悠然小楷'; src: url('../fonts/fonts-net-cn/演示悠然小楷/YanShiYouRanXiaoKai-2.ttf'); }
@font-face { font-family: '演示夏行楷'; src: url('../fonts/fonts-net-cn/演示夏行楷/YanShiXiaXingKai-2.ttf'); }
@font-face { font-family: '云峰静龙行书'; src: url('../fonts/fonts-net-cn/云峰静龙行书/YunFengJingLongXingShu-2.ttf'); }
@font-face { font-family: '正风毛笔'; src: url('../fonts/fonts-net-cn/正风毛笔 Bold/MasaFont-Bold-2.ttf'); }
@font-face { font-family: '三极泼墨体'; src: url('../fonts/fonts-net-cn/三极泼墨体/SanJiPoMoTi-2.ttf'); }
@font-face { font-family: '峄山碑篆体'; src: url('../fonts/fonts-net-cn/峄山碑篆体/YiShanBeiZhuanTi.ttf'); }
@font-face { font-family: '令东齐伋复刻体'; src: url('../fonts/fonts-net-cn/令东齐伋复刻体/LingDongQiCheChunTang-2.ttf'); }
@font-face { font-family: '问藏书房'; src: url('../fonts/fonts-net-cn/问藏书房/WenCangShuFang-2.ttf'); }
```
> 古风推荐组合：标题用「正风毛笔/云峰静龙行书」+ 副标题用「演示悠然小楷」+ 正文用「问藏书房/令东齐伋复刻体」+ 印章用「峄山碑篆体」

### 核心组件

**印章（.seal）** — 古风的灵魂元素，每页至少出现一次：
```css
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
```

**竖排文字**：
```css
.vertical-text {
  writing-mode: vertical-rl;
  letter-spacing: 16px;
}
```

**金色分割线**：
```css
background: linear-gradient(90deg, transparent, var(--vermilion), transparent);
/* 或使用 var(--gold) */
```

### 布局特征
- 大面积留白，内容集中在画面中心偏上
- 主标题可以极大（200-240px），配合竖排短语
- 顶部：左侧圆形图标 + 竖排日期（右侧）
- 底部：印章（左） + 品牌署名（右）
- 分割线用渐变消失效果
- SVG 太极/圆形装饰作为分隔元素

### 装饰元素
- 朱砂红圆形图标（`border-radius: 50%; background: var(--vermilion)`）
- 金色横线分隔 (`var(--gold)`)
- 底部渐变分割线
- 角花（四角 L 形金色边框）
- 云纹装饰（SVG 或低透明度背景元素）
- 引言卡片（朱砂红左边框 + 引号装饰）
- 菱形列表符号（`.gf-bullet`）

**完整装饰 CSS 类定义见 `prompts/decoration-system.md` §04**

### 插画规则
- ✅ 可使用 vectorshelf Plants 类（梅花 pl129、樱花 pl081）
- ❌ 禁止西式/卡通插画
- 路径必须为绝对路径

### 禁止
- ❌ 使用英文字体作为主字体
- ❌ 使用 emoji
- ❌ 使用彩色渐变背景
- ❌ 使用卡片阴影堆叠
- ❌ 文字全部横排（必须有竖排元素）

---

## 02 · 极简文艺 (minimal)

### 设计语言
Less is more。大量留白、极细线条、克制用色。文艺杂志感。

### CSS 变量（必须使用）
```css
:root {
  --bg: #f8f7f4;         /* 暖白底色 */
  --ink: #1c1917;        /* 主文字 - 非纯黑 */
  --ink-2: #57534e;      /* 次要文字 */
  --ink-3: #a8a29e;      /* 辅助/标注 */
  --border: #e7e5e4;     /* 极细线 */
  --accent: #1c1917;     /* 强调色=墨色，不用彩色 */
}
```

### 页面背景
```css
html, body { background: #eae8e4; }
```

### Canvas 背景
```css
.canvas {
  background: var(--bg);
  box-shadow: 0 1px 2px rgba(28,25,23,0.06), 0 30px 60px -20px rgba(28,25,23,0.18);
}
```

### 字体

**字体用途映射**（参考 `config/fonts.json` → styleMapping.minimal）：
| 用途 | 推荐字体 | 效果 |
|------|----------|------|
| 主标题 | Noto Serif SC (700) / Playfair Display | 经典衬线 |
| 副标题 | Inter / Space Grotesk | 极简几何 |
| 正文 | Noto Serif SC (400) | 舒适阅读 |
| 编号/标注 | Inter (light) | 克制辅助 |

```css
body { font-family: 'Noto Serif SC', 'Songti SC', Georgia, serif; }
.label, .num { font-family: 'Inter', 'Playfair Display', serif; }
```
Google Fonts 引入：
```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;600;700&family=Inter:wght@400;500;600&family=Playfair+Display:wght@400;700&family=Space+Grotesk:wght@400;500&display=swap" />
```

**本地字体扩展（fonts-net-cn 精选）：**
| 字体名 | 用途 | 效果 | zip路径 |
|--------|------|------|---------|
| 思源宋体 | 正文/标题 | 高质量宋体，极简首选 | `fonts-net-cn/思源宋体.zip` |
| 汤宪滨宋 | 标题/正文 | 精致瘦宋，文艺气质 | `fonts-net-cn/汤宪滨宋·免费商用.zip` |
| 杨任东竹石体 | 标题 | 竹石清劲，高级感 | `fonts-net-cn/杨任东竹石体 Regular.zip` |

```css
/* 极简本地字体示例 @font-face */
@font-face { font-family: '思源宋体'; src: url('../fonts/fonts-net-cn/思源宋体/SourceHanSerifCN-Regular-1.otf'); font-weight: 400; }
@font-face { font-family: '思源宋体'; src: url('../fonts/fonts-net-cn/思源宋体/SourceHanSerifCN-Bold-2.otf'); font-weight: 700; }
@font-face { font-family: '汤宪滨宋'; src: url('../fonts/fonts-net-cn/汤宪滨宋·免费商用/汤宪滨宋.ttf'); }
@font-face { font-family: '杨任东竹石体'; src: url('../fonts/fonts-net-cn/杨任东竹石体 Regular/杨任东竹石体-Regular.ttf'); }
```
> 极简推荐组合：正文用「思源宋体」替代系统 Songti SC，标题用「汤宪滨宋」增添文艺感

### 布局特征
- **极度留白** — 内容区从 top: 340px 开始（上方 1/3 为留白）
- 左对齐为主（不居中）
- 顶部：极细编号（Inter 字体，14px，0.3em 字距）+ 日期
- 装饰细线 `h-px`（1px 高度分割线）
- 底部：小圆点装饰 + 署名
- 右下角超大淡色页码（72px，`var(--border)` 颜色）

### 核心组件

**编号标签**（顶部）：
```css
font-family: Inter, sans-serif;
font-size: 14px;
letter-spacing: 0.3em;
text-transform: uppercase;
color: var(--ink-3);
```

**超大淡色页码**：
```css
font-family: Inter, sans-serif;
font-size: 72px;
font-weight: 600;
color: var(--border);  /* 极淡 */
```

**装饰短横线**：
```css
width: 64px; height: 1px; background: var(--ink);
```

### 禁止
- ❌ 使用彩色（全站只有黑白灰）
- ❌ 使用大面积色块
- ❌ 使用粗边框或阴影卡片
- ❌ 居中排列正文
- ❌ 使用超过 3 种字重

---

## 03 · 多巴胺撞色 (dopamine)

### 设计语言
高饱和度撞色、大圆角、模糊背景色块。快乐、年轻、潮流。

### CSS 变量（必须使用）
```css
:root {
  --bg: #2D2A4A;         /* 深紫底色 */
  --yellow: #FFE66D;     /* 柠檬黄 - 主强调 */
  --pink: #FF6B9D;       /* 粉红 */
  --mint: #4ECDC4;       /* 薄荷绿 */
  --coral: #FF8A5C;      /* 珊瑚橙 */
  --lavender: #C3A6FF;   /* 薰衣草紫 */
  --fg: #FFFFFF;         /* 白色文字 */
  --fg-dim: rgba(255,255,255,0.7);
}
```

### 页面背景
```css
html, body { background: #1a1835; }
```

### Canvas 背景
```css
.canvas {
  background: var(--bg);
  /* 无额外纹理 — 色块本身就是装饰 */
}
```

### 字体

**字体用途映射**（参考 `config/fonts.json` → styleMapping.dopamine）：
| 用途 | 推荐字体 | 效果 |
|------|----------|------|
| 主标题 | ZCOOL KuaiLe / Dela Gothic One | 圆润活泼/粗黑冲击 |
| 副标题 | Pacifico / Caveat | 手写趣味 |
| 正文 | Noto Sans SC (700-900) | 饱满有力 |
| 装饰 | Pacifico / Orbitron | 圆体/几何 |

```css
body { font-family: 'Noto Sans SC', 'PingFang SC', system-ui, sans-serif; font-weight: 700; }
h1, .title { font-family: 'ZCOOL KuaiLe', 'Dela Gothic One', sans-serif; }
.deco, .tag { font-family: 'Pacifico', 'Caveat', cursive; }
```
Google Fonts 引入：
```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@500;700;900&family=ZCOOL+KuaiLe&family=Dela+Gothic+One&family=Pacifico&family=Caveat:wght@500;700&family=Orbitron:wght@700;900&display=swap" />
```
本地字体（非 Google Fonts）：
```css
@font-face { font-family: 'Smiley Sans'; src: url('../fonts/SmileySans-Oblique.ttf'); }
```
> 得意黑 (Smiley Sans) 适合作为活力标题的替代选择

**本地字体扩展（fonts-net-cn 精选）：**
| 字体名 | 用途 | 效果 | zip路径 |
|--------|------|------|---------|
| 优设标题圆 | 主标题 | 超圆润大标题，活力爆棚 | `fonts-net-cn/优设标题圆.zip` |
| 站酷庆科黄油体 | 主标题/副标题 | 黄油质感，滑腻可爱 | `fonts-net-cn/站酷庆科黄油体.zip` |
| 仓耳小丸子 | 正文/标签 | 圆滚滚丸子体，萌趣 | `fonts-net-cn/仓耳小丸子.zip` |
| 小可奶酪体 | 标签/装饰 | 奶酪质感，甜美可爱 | `fonts-net-cn/小可奶酪体.zip` |
| 猕猴桃圆 M | 正文 | 水果圆体，清新饱满 | `fonts-net-cn/猕猴桃圆 M.zip` |
| 德拉黑体 | 主标题 | 超粗哥特黑，冲击力强 | `fonts-net-cn/德拉黑体.zip` |

```css
/* 多巴胺本地字体示例 @font-face */
@font-face { font-family: '优设标题圆'; src: url('../fonts/fonts-net-cn/优设标题圆/YouSheBiaoTiYuan-2.otf'); }
@font-face { font-family: '站酷庆科黄油体'; src: url('../fonts/fonts-net-cn/站酷庆科黄油体/ZhanKuQingKeHuangYouTi-2.ttf'); }
@font-face { font-family: '仓耳小丸子'; src: url('../fonts/fonts-net-cn/仓耳小丸子/CangErXiaoWanZi-2.ttf'); }
@font-face { font-family: '小可奶酪体'; src: url('../fonts/fonts-net-cn/小可奶酪体/XiaoKeNaiLaoTiShangYongMianFei@QingKeZiTi-2.ttf'); }
@font-face { font-family: '猕猴桃圆'; src: url('../fonts/fonts-net-cn/猕猴桃圆 M/KiwiMaru-Medium-2.ttf'); }
@font-face { font-family: '德拉黑体'; src: url('../fonts/fonts-net-cn/德拉黑体/DelaGothicOne-Regular-2.ttf'); }
```
> 多巴胺推荐组合：标题用「优设标题圆/站酷庆科黄油体」+ 正文用「猕猴桃圆/仓耳小丸子」+ 装饰标签用「小可奶酪体」

### 核心组件

**背景色块（.blob）** — 必须有 2-3 个：
```css
.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(0px);   /* 不模糊，保持实色 */
  opacity: 0.1-0.15;   /* 低透明度 */
  width: 200-320px;
  height: 200-320px;
}
/* 放置于画布边缘，部分溢出 */
```

**胶囊标签（.pill）** — 撞色标签是灵魂：
```css
.pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 22px;
  border-radius: 999px;
  font-size: 22px;
  font-weight: 700;
}
/* 每个 pill 用不同的颜色 */
```

**毛玻璃引文卡**：
```css
background: rgba(255,255,255,0.08);
backdrop-filter: blur(12px);
border: 1px solid rgba(255,255,255,0.12);
border-radius: 24px;
padding: 32px 40px;
```

### 布局特征
- 顶部：品牌图标(圆角方形) + 编号胶囊标签
- 主标题区：超大字（120px）、分行、关键词用亮色（`var(--yellow)`）
- 中间：撞色 pill 标签组排列
- 底部：毛玻璃引文卡 + 颜色圆点色板展示

### 色彩使用规则
- 背景暗色（深紫 `#2D2A4A`）
- 前景亮色交替使用 yellow/pink/mint/coral/lavender
- 每页至少使用 3 种亮色
- 文字默认白色，关键词用 `var(--yellow)` 高亮
- pill 标签每个颜色不同

### 装饰增强
- 背景色块（.blob）2-3 个 + 小彩点（.confetti）5-8 个
- 波浪分割线（.wave-divider）
- 弹跳卡片彩色边框（.bounce-card.pink/.purple/.green/.yellow）
- 编号圆（.num-circle）使用渐变色

**完整装饰 CSS 类定义见 `prompts/decoration-system.md` §05**

### 插画规则
- ✅ 可使用 vectorshelf Drink/Food/Plants
- 路径必须为绝对路径
- 插画搭配 `drop-shadow` 提升层次

### 禁止
- ❌ 使用灰色/暗淡色调
- ❌ 单一颜色方案
- ❌ 大段文字
- ❌ 极细字重（不能低于 500）
- ❌ 直角（所有圆角 ≥ 16px）

---

## 04 · 商务知识卡 (knowledge)

### 设计语言
信息密度高、数据可视化、专业干净。适合干货/数据/思维模型。

### CSS 变量（必须使用）
```css
:root {
  --bg: #fafafa;          /* 近白底色 */
  --ink: #1a1a1a;         /* 主文字 */
  --ink-2: #4b5563;       /* 次要文字 */
  --ink-3: #9ca3af;       /* 辅助文字 */
  --border: #e5e5e5;      /* 分割线 */
  --accent: #ff4500;      /* 橙红强调色 */
  --accent-soft: #fff4ee; /* 强调色淡底 */
}
```

### 页面背景
```css
html, body { background: #ebebeb; }
```

### Canvas 背景
```css
.canvas {
  background: var(--bg);
  box-shadow: 0 1px 2px rgba(0,0,0,0.04), 0 30px 60px -20px rgba(0,0,0,0.2);
}
```

### 字体

**字体用途映射**（参考 `config/fonts.json` → styleMapping.knowledge）：
| 用途 | 推荐字体 | 效果 |
|------|----------|------|
| 主标题 | Noto Sans SC (900) / Dela Gothic One | 超粗黑体冲击 |
| 副标题 | Outfit / Space Grotesk | 现代几何 |
| 正文 | Noto Sans SC (500) | 清晰易读 |
| 数字/代码 | JetBrains Mono / Orbitron | 技术感数字 |

```css
body { font-family: 'Noto Sans SC', 'PingFang SC', system-ui, sans-serif; }
.big-num, .code { font-family: 'JetBrains Mono', 'Orbitron', monospace; }
h1, .title { font-family: 'Outfit', 'Noto Sans SC', sans-serif; font-weight: 900; }
```
Google Fonts 引入：
```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&family=Outfit:wght@600;700;900&family=Space+Grotesk:wght@500;700&family=JetBrains+Mono:wght@500;700&family=Orbitron:wght@700;900&display=swap" />
```
本地字体（非 Google Fonts）：
```css
@font-face { font-family: 'Smiley Sans'; src: url('../fonts/SmileySans-Oblique.ttf'); }
```
> 得意黑适合知识卡主标题的替代选择，斜体设计增加动感

**本地字体扩展（fonts-net-cn 精选）：**
| 字体名 | 用途 | 效果 | zip路径 |
|--------|------|------|---------|
| 优设标题黑 | 主标题 | 超粗标题黑体，冲击力极强 | `fonts-net-cn/优设标题黑.zip` |
| 庞门正道标题体 | 主标题 | 粗壮大标题，醒目硬朗 | `fonts-net-cn/庞门正道标题体免费版.zip` |
| 标小智无界黑 | 正文/副标题 | 现代无界黑，科技感 | `fonts-net-cn/标小智无界黑.zip` |
| 文道潮黑 | 副标题/标签 | 潮流黑体，年轻有力 | `fonts-net-cn/文道潮黑.zip` |
| 创客贴金刚体 | 标题装饰 | 金刚力量感，超粗重量 | `fonts-net-cn/创客贴金刚体.zip` |
| 思源黑体 Heavy | 正文 | 高质量黑体全字重 | `fonts-net-cn/思源黑体 Heavy.zip` |

```css
/* 知识卡本地字体示例 @font-face */
@font-face { font-family: '优设标题黑'; src: url('../fonts/fonts-net-cn/优设标题黑/YouSheBiaoTiHei-2.ttf'); }
@font-face { font-family: '庞门正道标题体'; src: url('../fonts/fonts-net-cn/庞门正道标题体免费版/PangMenZhengDaoBiaoTiTiMianFeiBan-2.ttf'); }
@font-face { font-family: '标小智无界黑'; src: url('../fonts/fonts-net-cn/标小智无界黑/LogoSCUnboundedSans-Regular-2.ttf'); }
@font-face { font-family: '文道潮黑'; src: url('../fonts/fonts-net-cn/文道潮黑/WenDaoChaoHei-2.ttf'); }
@font-face { font-family: '创客贴金刚体'; src: url('../fonts/fonts-net-cn/创客贴金刚体/ChuangKeTieJinGangTi-2.otf'); }
```
> 知识卡推荐组合：大标题用「优设标题黑/庞门正道标题体」+ 副标题用「标小智无界黑」+ 正文用 Noto Sans SC

### 核心组件

**超大装饰数字（.big-num）** — 知识卡的视觉锚点：
```css
.big-num {
  font-family: Inter, sans-serif;
  font-weight: 900;
  font-feature-settings: 'tnum';
  font-size: 480px;
  line-height: 0.85;
  letter-spacing: -0.05em;
  color: var(--accent);  /* 橙红色 */
}
```

**圆角徽章**：
```css
display: inline-block;
border-radius: 9999px;
background: var(--accent-soft);
padding: 8px 24px;
font-size: 26px;
font-weight: 700;
color: var(--accent);
```

**金句卡片**：
```css
border-radius: 24px;
border-left: 8px solid var(--accent);
background: white;
padding: 32px 40px;
box-shadow: 0 8px 24px -12px rgba(0,0,0,0.12);
```

**底部 CTA 条**：
```css
border-top: 1px solid var(--border);
background: white;
/* 内含头像 + 用户名 + 关注按钮 */
```

### 布局特征
- 顶部：编号方块（深色底白字） + 标题描述 + 期号
- 彩色徽章标签
- 超大数字 + 旁边的标题文字
- 底部 1/3：金句卡（左边框强调）
- 最底部：品牌条 + CTA 按钮

### 装饰增强
- 淡色网格背景（.grid-bg）
- 发光球（.glow）锚定视觉焦点
- 荧光笔标注（.highlight-purple / .highlight-green）
- 步骤连接线（.connector）+ 步骤圆（.step-circle）
- 效率徽章（.efficiency-badge）
- 时间标记（.time-marker）

**完整装饰 CSS 类定义见 `prompts/decoration-system.md` §02**

### 插画规则
- ✅ 可选使用 shigureni 学习人物（小尺寸，120px）
- ✅ 可选使用 vectorshelf Goods 文具类
- 路径必须为绝对路径
- 插画仅作小型角落装饰，不占主空间

### 禁止
- ❌ 使用手写/衬线字体
- ❌ 大面积暗色
- ❌ 模糊/毛玻璃效果
- ❌ 装饰性色块
- ❌ 信息堆砌无层次

---

## 05 · 美食探店 (food)

### 设计语言
温暖、食欲感、照片主导。暖色调 + 大图 + 标签分类。

### CSS 变量（必须使用）
```css
:root {
  --warm-bg: #FFF8F0;    /* 暖白底 */
  --warm-dark: #2C1810;  /* 深棕主文字 */
  --warm-mid: #6B4C3B;   /* 中棕次要文字 */
  --warm-light: #A68B7B; /* 浅棕辅助文字 */
  --orange: #E8690A;     /* 橙色强调 */
  --orange-soft: #FFF1E6;/* 橙色淡底 */
  --cream: #FFFBF5;      /* 奶油白 */
}
```

### 页面背景
```css
html, body { background: #f0e8df; }
```

### Canvas 背景
```css
.canvas {
  background: var(--warm-bg);
  box-shadow: 0 1px 2px rgba(44,24,16,0.06), 0 30px 60px -20px rgba(44,24,16,0.2);
}
```

### 字体

**字体用途映射**（参考 `config/fonts.json` → styleMapping.food）：
| 用途 | 推荐字体 | 效果 |
|------|----------|------|
| 主标题 | ZCOOL QingKe HuangYou / ZCOOL KuaiLe | 手写活泼/圆润可爱 |
| 副标题 | Caveat / Righteous | 手写随性/复古招牌 |
| 正文 | Noto Sans SC (500) | 清晰易读 |
| 装饰 | Pacifico / Caveat | 手写花体 |

```css
body { font-family: 'Noto Sans SC', 'PingFang SC', system-ui, sans-serif; }
h1, .title { font-family: 'ZCOOL QingKe HuangYou', 'ZCOOL KuaiLe', cursive; }
.tag, .score { font-family: 'Caveat', 'Righteous', cursive; }
```
Google Fonts 引入：
```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&family=ZCOOL+QingKe+HuangYou&family=ZCOOL+KuaiLe&family=Caveat:wght@500;700&family=Righteous&family=Pacifico&display=swap" />
```

**本地字体扩展（fonts-net-cn 精选）：**
| 字体名 | 用途 | 效果 | zip路径 |
|--------|------|------|---------|
| 仓耳舒圆体 W03 | 正文/副标题 | 柔软圆润，温暖亲切 | `fonts-net-cn/仓耳舒圆体W03.zip` |
| 猕猴桃圆 M | 正文 | 水果感圆体，清新自然 | `fonts-net-cn/猕猴桃圆 M.zip` |
| 千图小兔体 | 标签/装饰 | 卡通兔子体，可爱甜美 | `fonts-net-cn/千图小兔体.zip` |
| 沐瑶软笔手写体 | 装饰/标注 | 柔软手写，温度感 | `fonts-net-cn/沐瑶软笔手写体.zip` |
| 站酷庆科黄油体 | 主标题 | 黄油顺滑，和美食主题绝配 | `fonts-net-cn/站酷庆科黄油体.zip` |

```css
/* 美食本地字体示例 @font-face */
@font-face { font-family: '仓耳舒圆体'; src: url('../fonts/fonts-net-cn/仓耳舒圆体W03/CangErShuYuanTiW03-2.ttf'); }
@font-face { font-family: '猕猴桃圆'; src: url('../fonts/fonts-net-cn/猕猴桃圆 M/KiwiMaru-Medium-2.ttf'); }
@font-face { font-family: '千图小兔体'; src: url('../fonts/fonts-net-cn/千图小兔体/千图小兔体.ttf'); }
@font-face { font-family: '沐瑶软笔手写体'; src: url('../fonts/fonts-net-cn/沐瑶软笔手写体/Muyao-Softbrush-2.ttf'); }
@font-face { font-family: '站酷庆科黄油体'; src: url('../fonts/fonts-net-cn/站酷庆科黄油体/ZhanKuQingKeHuangYouTi-2.ttf'); }
```
> 美食推荐组合：标题用「站酷庆科黄油体」+ 正文用「仓耳舒圆体/猕猴桃圆」+ 点缀用「沐瑶软笔手写体」

### 核心组件

**顶部大图**：
```css
.food-img {
  object-fit: cover;
  border-radius: 16px;
  width: 100%;
  height: 520px;  /* 画布高度的 ~43% */
}
/* 底部渐变遮罩过渡到背景色 */
background: linear-gradient(180deg, rgba(0,0,0,0) 50%, var(--warm-bg) 100%);
```

**评分卡**：
```css
background: rgba(255,255,255,0.9);
backdrop-filter: blur(8px);
border-radius: 16px;
padding: 12px 20px;
/* 大数字 + 星星图标 */
```

**标签（.tag）**：
```css
.tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 999px;
  font-size: 20px;
  font-weight: 600;
}
/* 主标签：bg=orange, color=white */
/* 次要标签：bg=orange-soft, color=orange */
```

### 布局特征
- **上半部分**（520px）：大图 + 渐变遮罩
  - 左上：品牌图标 + 文字
  - 右上：评分卡片
- **下半部分**：内容区
  - 标签组（位置、营业时间、价格）
  - 主标题 + 描述
  - 推荐菜品列表

### 图片规则
- 封面页必须有食物图片（Unsplash/Pexels）
- 使用 `object-fit: cover` + 大圆角
- 底部渐变遮罩过渡到背景
- 建议使用：
  ```
  https://images.unsplash.com/photo-XXXX?w=900&h=520&fit=crop&crop=center
  ```

### 装饰增强
- 柔光圆（.glow-circle）2-3 个暖色
- 点阵装饰（.dot-pattern）放在角落
- 卡片顶部光条（.card-elevated::before）
- 评分进度条（.rating-bar）
- 价格标签组件（.price-tag）
- 精致分割线（.divider-fancy）

**完整装饰 CSS 类定义见 `prompts/decoration-system.md` §01**

### 插画规则
- ✅ 可使用 vectorshelf Drink/Food 类
- 路径必须为绝对路径
- 插画作为列表项图标（80px）或标题装饰（120-160px）

### 禁止
- ❌ 冷色调
- ❌ 无图片的纯文字页面
- ❌ 深色/暗色背景
- ❌ 代码元素
- ❌ 科技感图标

---

## 06 · AI 科技日报 (ai-daily)

### 设计语言
终端/黑客风格。暗色背景 + 绿色荧光 + 网格线 + 等宽字体。信息密集、科技感满。

### CSS 变量（必须使用）
```css
:root {
  --bg: #0a0a0a;         /* 近纯黑底色 */
  --bg-2: #141414;       /* 卡片底色 */
  --fg: #f5f5f5;         /* 主文字 */
  --fg-2: #a3a3a3;       /* 次要文字 */
  --fg-3: #525252;       /* 辅助/标签 */
  --accent: #00ff88;     /* 荧光绿 - 唯一亮色 */
  --accent-dim: rgba(0,255,136,0.15);  /* 荧光绿淡色 */
  --border: rgba(255,255,255,0.08);    /* 极淡边框 */
}
```

### 页面背景
```css
html, body { background: #1f1f1f; }
```

### Canvas 背景（网格纹理 - 必须有）
```css
.canvas {
  background: var(--bg);
  box-shadow: 0 1px 2px rgba(0,0,0,0.5), 0 30px 80px -20px rgba(0,255,136,0.15), 0 30px 60px -20px rgba(0,0,0,0.6);
  background-image:
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 60px 60px;
}
```

### 字体

**字体用途映射**（参考 `config/fonts.json` → styleMapping.ai-daily）：
| 用途 | 推荐字体 | 效果 |
|------|----------|------|
| 主标题 | Noto Sans SC (900) | 超粗黑体 |
| 副标题 | JetBrains Mono / Space Grotesk | 代码感/几何 |
| 正文 | Noto Sans SC (500) | 清晰技术 |
| 装饰/数据 | Orbitron / Black Ops One / JetBrains Mono | 科幻/军事/代码 |

```css
body { font-family: 'Noto Sans SC', 'PingFang SC', system-ui, sans-serif; }
.mono, .code { font-family: 'JetBrains Mono', monospace; }
.deco-num { font-family: 'Orbitron', 'Black Ops One', monospace; }
h1, .headline { font-family: 'Space Grotesk', 'Noto Sans SC', sans-serif; font-weight: 900; }
```
Google Fonts 引入：
```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;700&family=Noto+Sans+SC:wght@500;700;900&family=Space+Grotesk:wght@500;700&family=Orbitron:wght@700;900&family=Black+Ops+One&display=swap" />
```
本地字体（非 Google Fonts）：
```css
@font-face { font-family: 'Smiley Sans'; src: url('../fonts/SmileySans-Oblique.ttf'); }
```
> 得意黑适合 AI 日报标题，斜体造型有科技动感

**本地字体扩展（fonts-net-cn 精选）：**
| 字体名 | 用途 | 效果 | zip路径 |
|--------|------|------|---------|
| 优设标题黑 | 主标题 | 超粗黑标题，科技冲击力 | `fonts-net-cn/优设标题黑.zip` |
| 寒蝉高黑体 | 标题/副标题 | 高瘦科技风黑体 | `fonts-net-cn/寒蝉高黑体.zip` |
| 标小智无界黑 | 正文/标签 | 现代无界黑，干净利落 | `fonts-net-cn/标小智无界黑.zip` |
| 精品点阵体 | 装饰/代码 | 像素风，复古科技感 | `fonts-net-cn/精品点阵体.zip` |
| 文道潮黑 | 副标题 | 潮流黑体，锐利有力 | `fonts-net-cn/文道潮黑.zip` |

```css
/* AI日报本地字体示例 @font-face */
@font-face { font-family: '优设标题黑'; src: url('../fonts/fonts-net-cn/优设标题黑/YouSheBiaoTiHei-2.ttf'); }
@font-face { font-family: '寒蝉高黑体'; src: url('../fonts/fonts-net-cn/寒蝉高黑体/HanChanGaoHeiTi-2.otf'); }
@font-face { font-family: '标小智无界黑'; src: url('../fonts/fonts-net-cn/标小智无界黑/LogoSCUnboundedSans-Regular-2.ttf'); }
@font-face { font-family: '精品点阵体'; src: url('../fonts/fonts-net-cn/精品点阵体/JingPinDianZhenTi7x7-2.ttf'); }
@font-face { font-family: '文道潮黑'; src: url('../fonts/fonts-net-cn/文道潮黑/WenDaoChaoHei-2.ttf'); }
```
> AI日报推荐组合：标题用「优设标题黑/寒蝉高黑体」+ 标签用「标小智无界黑」+ 装饰数字用「精品点阵体」（像素风）

### 核心组件

**荧光发光效果**：
```css
.glow { text-shadow: 0 0 28px rgba(0,255,136,0.6); }
```

**脉冲点**：
```css
.pulse-dot { animation: pulse 1.6s ease-in-out infinite; }
@keyframes pulse {
  0%,100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(1.5); }
}
```

**新闻条目卡**：
```css
display: flex;
align-items: center;
gap: 24px;
border-radius: 16px;
border: 1px solid var(--border);
background: var(--bg-2);
padding: 24px 28px;
```

**顶部状态条**（终端风格）：
```css
display: flex;
justify-content: space-between;
border-bottom: 1px solid var(--border);
padding: 28px 48px;
/* 左：脉冲点 + AI_DAILY + 期号 */
/* 右：日期（等宽字体） */
```

### 布局特征
- 顶部：状态条（绿色脉冲点 + 等宽标题 + 日期）
- 标题区：英文小标签（`◢ Today in AI`）+ 超大中文标题
- 关键词用 `var(--accent)` + glow 效果
- 下半部分：新闻条目卡列表（编号 + 分类 + 标题）
- 底部：图标 + ID + 导航提示

### 文字层级规则
- 标签/分类：等宽字体 `16px`，`var(--fg-3)` 色
- 编号：等宽字体 `44px`，`var(--accent)` 色
- 新闻标题：`30px` 粗体，`var(--fg)` 色
- 主标题：`124px` font-black

### 装饰增强
- 扫描线叠加（.scanline::after）
- 发光球（.glow-orb）提供色彩焦点
- 脉冲点（.pulse-dot）状态指示
- 发光文字（.glow-text）关键词强调
- 数据卡片左侧发光边框（.data-card::before）
- 科技进度条（.tech-bar）
- 排名编号（.rank-num）
- 科技分割线（.divider-tech）

**完整装饰 CSS 类定义见 `prompts/decoration-system.md` §03**

### 插画规则
- ❌ **绝对禁止使用任何图片或插画**
- 所有视觉效果仅来自 CSS 装饰 + Lucide 图标 + 排版

### 禁止
- ❌ 使用暖色调
- ❌ 使用圆形色块装饰
- ❌ 使用非等宽字体做代码/标签
- ❌ 使用白色背景
- ❌ 使用除绿色以外的亮色作为强调色
- ❌ 使用图片（纯文字信息流）

---

## 通用规范（所有风格必须遵守）

### 画布尺寸
```css
.canvas { width: 900px; height: 1200px; }
```
不可修改。最终输出为 3:4 比例。

### 响应式预览
```css
@media (max-width: 960px) {
  .canvas { transform: scale(calc(100vw / 960)); transform-origin: top center; }
  body { align-items: flex-start; padding-top: 16px; }
}
```

### 导航工具栏（截图时自动隐藏）
```html
<div class="toolbar" id="toolbar">
  <a href="page{N-1}.html">← 上一页</a>
  <a href="page{N+1}.html">下一页 →</a>
  <button onclick="document.getElementById('toolbar').style.display='none'">隐藏</button>
</div>
<script>
  if (new URLSearchParams(location.search).get('print') === '1') {
    document.getElementById('toolbar').style.display = 'none';
  }
</script>
```

### 字号铁律（不可违反）
| 元素 | 最小字号 | 最大字号 |
|------|---------|---------|
| 封面主标题 | 96px | 240px |
| 装饰数字 | 200px | 480px |
| 页面标题 | 48px | 72px |
| 要点正文 | 28px | 40px |
| 辅助文字 | 20px | 28px |
| 绝对最小值 | **20px** | — |

**< 20px 的任何文字都是违规，必须修正。**

### 图标
全部使用 Lucide：
```html
<script src="https://unpkg.com/lucide@latest"></script>
<!-- 使用方式 -->
<i data-lucide="icon-name" style="width:28px;height:28px;color:inherit"></i>
<!-- 初始化 -->
<script>lucide.createIcons();</script>
```
**禁止 emoji。**

### 安全区
- 内容距画布边缘：左右 ≥ 56px（`px-14`），上下 ≥ 56px
- 底部预留 60-80px 给品牌/页码区

### 颜色禁区
- ❌ 纯黑 `#000000`
- ❌ 纯白 `#FFFFFF`（ai-daily 的 `--fg: #f5f5f5` 是允许的）
- ❌ 默认蓝色 `#3b82f6`

### 必须包含的 CDN
```html
<script src="https://cdn.tailwindcss.com"></script>
<script src="https://unpkg.com/lucide@latest"></script>
```

### 风格快速选择表

| 内容类型 | 首选风格 | 备选风格 |
|---------|---------|---------|
| AI/科技/编程 | ai-daily | knowledge |
| 干货/数据/思维 | knowledge | minimal |
| 文学/感悟/哲理 | guofeng | minimal |
| 美食/探店/旅行 | food | dopamine |
| 穿搭/种草/潮流 | dopamine | food |
| 读书/生活/文艺 | minimal | guofeng |
| 效率工具/推荐 | knowledge | dopamine |
| 国学/历史/传统 | guofeng | — |

---

## 内容布局约束（900×1200 画布空间分配）

### 通用画布分区模型

```
┌─────────────────────────────────────┐ 0px
│         顶部区 (TOP ZONE)            │
│     品牌/日期/编号/标签               │ 56-120px
├─────────────────────────────────────┤
│                                     │
│         主内容区 (MAIN ZONE)          │
│     标题/正文/要点/数据              │ 120-1080px
│                                     │
├─────────────────────────────────────┤
│         底部区 (BOTTOM ZONE)          │
│     署名/CTA/页码/导航               │ 1080-1200px
└─────────────────────────────────────┘
        ←── 安全区 56px ──→
```

**安全区**：所有内容距画布边缘 ≥ 56px（`px-14 pt-14 pb-14`）

---

### 各风格的空间分配规则

#### guofeng 古风国潮
```
┌──────────────────────────────┐ 0px
│ 顶部：120px                   │  左：圆形图标+标题  右：竖排日期
│                              │
│ 留白过渡区：180px             │  纯空白，制造呼吸感
│                              │ 300px
│ 主标题区：400px               │  居中，大字（200-240px）
│   上方短语(26px, 竖排感)       │  + 装饰线 + 副句
│   ─ 主标题(240px) ─           │
│   装饰分隔(SVG/金线)           │
│   副标题(44px)                │ 700px
│                              │
│ 留白过渡区：180px             │  纯空白
│                              │ 880px
│ 底部：120px                   │  左：印章  右：署名+编号
│ 底部渐变分割线                 │
└──────────────────────────────┘ 1200px
特征：内容仅占中间 33%，上下各 25% 留白
关键词：疏密有致、气韵生动
```

#### minimal 极简文艺
```
┌──────────────────────────────┐ 0px
│ 顶部：100px                   │  左：编号(14px, uppercase)
│                              │  右：日期(14px)
│ 细线分割(1px)                 │ 100px
│                              │
│ 超大留白：240px               │  纯空白（这是灵魂所在）
│                              │ 340px
│ 主内容区：480px（全部左对齐）   │
│   小标签：18px, 字距0.15em     │  英文分类标注
│   间距：40px                  │
│   主标题：96px, 3行以内        │  中文标题，行高1.15
│   间距：56px                  │
│   装饰短横线：w-16, h-1px      │  黑色
│   间距：40px                  │
│   引文：28px, 行高1.8          │  正文/引用
│                              │ 820px
│                              │
│ 留白过渡区：260px             │
│                              │
│ 底部：120px                   │  左：署名(20px) + 描述(14px)
│                              │  右下：超大淡色页码(72px)
└──────────────────────────────┘ 1200px
特征：左对齐，上方1/3留白，右下角页码
关键词：呼吸感、杂志感、Less is more
```

#### dopamine 多巴胺撞色
```
┌──────────────────────────────┐ 0px
│ [blob x3 绝对定位背景]         │  角落溢出，z-index 最低
│                              │
│ 顶部：80px                    │  品牌圆角方形 + 胶囊pill标签
│                              │ 80px
│ 主标题区：280px               │
│   英文小标签：24px, 粗体       │  tracking 0.15em, 粉色
│   间距：24px                  │
│   大标题：120px, 分行          │  白色 + 关键词黄色高亮
│                              │ 360px
│ 间距：56px                    │
│                              │
│ 撞色标签组：200px             │  4-6个 pill, flex-wrap, gap-4
│   每个 pill：22px, 700        │  不同颜色 + 不同图标
│                              │ 616px
│                              │
│ 间距：48px                    │
│                              │
│ 毛玻璃引文卡：180px           │  blur(12px) + rgba(w,0.08)
│   引文：36px                  │  关键词黄色高亮
│   补充：20px                  │ 844px
│                              │
│ 间距+底部：160px              │  头像+ID vs 颜色圆点(5个)
└──────────────────────────────┘ 1200px
特征：信息密集、色彩丰富、无大面积留白
关键词：撞色、年轻、快乐
```

#### knowledge 商务知识卡
```
┌──────────────────────────────┐ 0px
│ 顶部品牌条：80px              │  编号方块(深底白字) + 描述 + 期号
│                              │ 80px
│ 间距：64px                    │
│ 徽章标签：50px                │  pill「✦ 必看干货」accent-soft 底
│                              │ 194px
│ 间距：32px                    │
│                              │
│ 超大数字+标题区：480px         │  数字480px(accent色) + 旁边标题
│   数字：左侧，line-height:0.85│  60px「条原则」+ 34px 副标题
│   标题：右下对齐               │
│                              │ 706px
│                              │
│ 间距：54px                    │
│                              │
│ 金句卡片：200px               │  border-left:8px accent
│   小标签：22px ink-3           │  白色底 + 阴影
│   引文：40px 粗体              │  2行
│   解释：24px ink-2             │
│                              │ 960px
│                              │
│ 底部CTA条：100px              │  border-top + 头像 + 关注按钮
│   满宽白色背景                 │
└──────────────────────────────┘ 1200px
特征：数字是视觉锚点，信息分层极清晰
关键词：数据可视化、干货、信息层次
```

#### food 美食探店
```
┌──────────────────────────────┐ 0px
│                              │
│ 大图区：520px（占画布43%！）   │  全宽 object-fit:cover
│   左上(abs)：品牌图标+文字     │  白色文字 + 阴影
│   右上(abs)：评分卡(blur底)    │  大数字 + 星星
│   底部(abs)：渐变遮罩          │  transparent → warm-bg
│                              │ 520px
│                              │
│ 标签组：60px（margin-top:-20）│  pill标签 x3（位置/时间/价格）
│   主标签：bg-orange, 白字     │
│   次标签：bg-orange-soft      │ 560px
│                              │
│ 主标题+内容：340px            │  标题(64px) + 描述/菜品列表
│                              │ 900px
│                              │
│ 间距+底部：100px              │  评价/互动引导
│                              │
└──────────────────────────────┘ 1200px
特征：图片是绝对主角，占上半屏
关键词：食欲、温暖、真实感
```

#### ai-daily AI科技日报
```
┌──────────────────────────────┐ 0px
│ [60px网格全画布铺满]           │  linear-gradient 白色3%透明度
│                              │
│ 状态条：70px                  │  脉冲点 + AI_DAILY(mono) + 日期
│ border-bottom                │ 70px
│                              │
│ 标题区：320px                 │
│   小标签：22px mono           │  「◢ Today in AI」accent色
│   间距：24px                  │
│   大标题：124px, black        │  3行，关键词 glow+accent色
│                              │ 390px
│                              │
│ 间距：30px                    │
│                              │
│ 新闻列表：520px               │  3-5个条目卡，间距24px
│   每条目卡：                   │  bg-2底 + border
│     左：编号(44px, mono, 绿)  │
│     右上：分类(16px, mono, 灰)│
│     右下：标题(30px, 粗体, 白)│
│   每条高度：~100px            │ 940px
│                              │
│ 间距：20px                    │
│                              │
│ 底部：60px                    │  SVG图标 + ID(mono) + 滑动提示
└──────────────────────────────┘ 1200px
特征：信息极密，无装饰性留白
关键词：终端、数据流、信息密度
```

---

### 内容密度规则

| 风格 | 每页最大文字要素 | 内容占画布比例 | 留白策略 |
|------|----------------|--------------|---------|
| guofeng | 主标题+副句+2行辅助 | 33% | 大量留白=气韵生动 |
| minimal | 标题+引文+署名 | 42% | 留白=呼吸=高级感 |
| dopamine | 标题+标签组+引文 | 85% | 几乎不留白，色彩即节奏 |
| knowledge | 数字+标题+金句卡 | 75% | 结构化分层代替留白 |
| food | 图片+标签+标题 | 图43%+文30% | 图片本身是"视觉休息" |
| ai-daily | 标题+3-5条新闻 | 85% | 无留白=信息流美学 |

### 多页内容角色分配

一组图文（5-8页）中每页的职责：

| 页码 | 角色 | 内容密度 | 视觉重心 |
|------|------|---------|---------|
| Page 1（封面） | 吸引停留 | 低：大标题+副标题+标签 | 主标题冲击力 |
| Page 2-3 | 核心信息 | 中：每页 2-3 个要点 | 信息获取 |
| Page 4-5 | 补充/细节 | 中高：代码/数据/列表 | 深度内容 |
| Page N-1 | 金句/总结 | 低：一句话/一张图 | 情绪共鸣 |
| Page N（末页） | 互动转化 | 低：CTA+话题标签+ID | 涨粉/收藏 |

### 每页文字量硬性上限

| 页面类型 | 最大字数 | 如果超出怎么办 |
|---------|---------|--------------|
| 封面 | ≤ 30字 | 删减副标题/标签 |
| 内容页 | ≤ 80字（含标题） | 拆分为多页 |
| 末页 | ≤ 40字 | 精简CTA |

**溢出处理铁律**：如果内容超过单页容量，**必须拆分为多页**，绝不能缩小字号来硬塞。

### 间距节奏规则

不同层级元素之间的间距应遵循 8px 倍数网格：

| 关系 | 间距 | 示例 |
|------|------|------|
| 同级元素内部 | 8-16px | 标签内图标与文字 |
| 相关元素之间 | 24-32px | 标题与副标题 |
| 不同区块之间 | 48-64px | 标题区与内容区 |
| 主要分区之间 | 80-120px | 顶部区与主内容区 |

**节奏变化**：间距不能全部相同，否则失去层次感。大间距和小间距交替出现。
