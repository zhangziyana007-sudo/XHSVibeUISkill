# Prompt：小红书内容 MD → 3:4 HTML 页面

## 角色
你是一位前端视觉工程师。根据小红书图文内容 MD，为每一页生成独立的 HTML 文件。

## 输入
`02-xhs-content.md`（阶段 2 产出的图文脚本）

## 输出
每页生成一个 `page{N}.html`，存放到 `pages/` 目录

## ⚠️ 风格模板规范（最重要）
**必须先阅读 `prompts/style-templates.md`，严格按照对应风格的全部规范生成 HTML。**

该文件包含每个风格的：
- CSS 变量（必须完整使用）
- 页面/Canvas 背景（包含纹理）
- 字体引入
- 核心组件定义
- 布局特征
- 装饰元素
- 禁止事项

**不要自行发挥设计。模板文件是权威参考。**

## ⚠️ 装饰增强系统（视觉丰富度）
**必须阅读 `prompts/decoration-system.md`，为每页添加对应风格的装饰元素。**

装饰系统提供：
- 背景装饰层（光晕球、网格、扫描线等）
- 分割线变体（精致线、波浪线、科技线等）
- 卡片增强样式（发光边框、彩色边框等）
- 徽章/标签组件（药丸、印章、进度条等）

**每页至少使用 3 个装饰元素，使页面有「精心设计」的丰富感。**

## ⚠️ 本地插画资源（可选增强）
**当内容适合配图时，阅读 `prompts/illustration-index.md` 选取本地插画。**

关键规则：
- 仅 food / dopamine / guofeng / knowledge 风格可使用插画
- ai-daily 和 minimal 风格 **禁止** 使用插画
- **图片路径必须使用绝对路径**（详见 illustration-index.md）
- 每页最多 1-2 张插画作为装饰

---

## HTML 规范（必须严格遵守）

### 基础结构
```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{页面标题} · VIbeUI</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Google Fonts：严格按 style-templates.md 中的对应风格选择 -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=...&display=swap" />
  <!-- 本地字体（得意黑/霞鹜文楷等非 Google Fonts 字体，按需添加） -->
  <style>
    /* @font-face { font-family: 'LXGW WenKai'; src: url('/home/ts/XHSVibeUISkill/fonts/LXGWWenKai-Regular.ttf'); } */
    /* @font-face { font-family: 'Smiley Sans'; src: url('/home/ts/XHSVibeUISkill/fonts/SmileySans-Oblique.ttf'); } */
    /* @font-face { font-family: 'Noto Sans CJK SC'; src: url('/home/ts/XHSVibeUISkill/fonts/NotoSansCJKsc-Black.otf'); font-weight: 900; } */
    /* @font-face { font-family: 'Noto Serif CJK SC'; src: url('/home/ts/XHSVibeUISkill/fonts/NotoSerifCJKsc-Black.otf'); font-weight: 900; } */
  </style>
  <!-- Lucide 图标（禁止用 emoji） -->
  <script src="https://unpkg.com/lucide@latest"></script>
  <style>
    /* CSS 变量：从 style-templates.md 对应风格复制完整变量表 */
    :root { ... }
    /* 页面背景：从 style-templates.md 对应风格复制 */
    html, body { margin: 0; background: ...; }
    body {
      font-family: '...';  /* 从 style-templates.md 对应风格"### 字体"章节取完整 font-family 声明 */
      min-height: 100vh; display: flex; align-items: center; justify-content: center;
      padding: 32px 16px;
    }
    /* 标题/副标题字体（按 style-templates.md 字体映射表选择） */
    h1, .title { font-family: '...'; }
    h2, .subtitle { font-family: '...'; }
    /* Canvas 背景：从 style-templates.md 对应风格复制（含纹理/阴影） */
    .canvas {
      width: 900px; height: 1200px; position: relative;
      overflow: hidden;
      background: ...;
      background-image: ...;  /* 纹理（如有） */
      box-shadow: ...;
    }
    @media (max-width: 960px) {
      .canvas { transform: scale(calc(100vw / 960)); transform-origin: top center; }
      body { align-items: flex-start; padding-top: 16px; }
    }
    /* 风格专属组件类：从 style-templates.md 复制 */
    /* 例如 guofeng 的 .seal / .vertical-text */
    /* 例如 dopamine 的 .blob / .pill */
    /* 例如 ai-daily 的 .mono / .glow / .pulse-dot */
  </style>
</head>
<body>
  <div class="canvas">
    <!-- 按 style-templates.md 的"布局特征"组织内容 -->
  </div>
  <script>lucide.createIcons();</script>
</body>
</html>
```

### 字号铁律（手机上必须看清）

| 元素 | 字号范围 | font-weight |
|------|---------|------------|
| 封面主标题 | 96-240px | 900 |
| 超大装饰数字 | 200-480px | 900 |
| 页面标题 | 48-72px | 700 |
| 要点正文 | 28-40px | 500 |
| 辅助说明文字 | 20-28px | 400 |
| 代码文字 | 24-28px | 500 (monospace) |

**绝对禁止 < 20px 的任何文字。违反此规则的输出视为无效。**

### 图标规则
- 全部使用 Lucide 图标：`<i data-lucide="icon-name" style="width:28px;height:28px"></i>`
- 图标颜色跟随文字色或主色
- **禁止使用 emoji 字符**

### 配色规则
- 从 `style-templates.md` 读取对应风格的完整 CSS 变量表
- 如 `02-xhs-content.md` 的元信息指定了自定义色系，以元信息为准
- 禁止纯黑 `#000` 和纯白 `#FFF`
- 文字在背景上必须有足够对比度（WCAG AA 标准）

### 风格检查清单（生成每个文件后自检）

| 检查项 | 要求 |
|--------|------|
| CSS 变量 | 是否与 style-templates.md 完全一致？ |
| 页面背景 | body 背景色是否正确？ |
| Canvas 纹理 | 是否包含对应风格的 background-image？ |
| Canvas 阴影 | box-shadow 是否正确？ |
| 字体引入 | Google Fonts link 是否完整（含字重）？本地字体是否用 @font-face + 绝对路径？ |
| 字体映射 | 标题/副标题/正文是否按 style-templates.md 字体映射表分配了不同字体？ |
| 核心组件 | 是否使用了风格的标志性组件？ |
| 布局结构 | 是否遵循风格的布局特征？ |
| 装饰元素 | 是否有 ≥3 个 decoration-system.md 中的装饰？ |
| 插画使用 | 若有插画，路径是否为绝对路径？ |
| 字号 | 所有文字 ≥ 20px？ |
| 图标 | 全部是 Lucide，无 emoji？ |
| 禁止项 | 是否违反了风格的「禁止」列表？ |

### 布局规则
- `.canvas` 安全区：左右 ≥ 56px（`px-14`），上下 ≥ 56px
- 内容垂直方向用 `flex` 或 `absolute` 定位布局
- 每页内容不能溢出 1200px 高度
- 底部预留 60-80px 给品牌/页码区

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

### 占位图（仅 food 风格或需要图片时）
```html
<img src="https://images.unsplash.com/photo-XXX?w=900&h=520&fit=crop&crop=center"
     loading="lazy" alt="描述"
     class="h-full w-full object-cover" />
<!-- 底部渐变遮罩 -->
<div style="position:absolute;inset:0;background:linear-gradient(180deg, rgba(0,0,0,0) 50%, var(--warm-bg) 100%)"></div>
```
