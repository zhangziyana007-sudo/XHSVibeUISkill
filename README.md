# XHSVibeUISkill

小红书图文生产线 — 将任意素材经过 4 阶段流水线加工，产出可直接发布的 3:4 图文 PNG。

## 特性

- **4 阶段流水线**：素材 → 知识文档 → 图文脚本 → HTML 页面 → PNG 截图
- **6 种视觉风格**：guofeng / minimal / dopamine / knowledge / food / ai-daily
- **装饰增强系统**：每种风格配套专属装饰 CSS 组件
- **本地插画支持**：可配合 shigureni / vectorshelf 插画库使用

## 目录结构

```
├── SKILL.md                 ← 工作流主控文件（入口）
├── prompts/                 ← Prompt 规范文件
│   ├── 01-raw-to-knowledge.md
│   ├── 02-knowledge-to-xhs.md
│   ├── 03-xhs-to-html.md
│   ├── content-types.md
│   ├── style-templates.md
│   ├── decoration-system.md
│   └── illustration-index.md
├── scripts/
│   ├── screenshot-xhs.mjs  ← Playwright 截图工具
│   └── package.json
└── demos/                   ← 效果展示图
```

## 快速开始

### 1. 安装截图依赖

```bash
cd scripts && npm install
npx playwright install chromium
```

### 2. 使用方式

将本项目作为 AI 编程工具的 Skill/Prompt 使用：

1. 将 `SKILL.md` 作为工作流入口加载
2. AI 按照 4 阶段流程执行
3. 每阶段读取对应 prompt 文件获取详细规范
4. 最终使用 `scripts/screenshot-xhs.mjs` 截图

### 3. 截图命令

```bash
node scripts/screenshot-xhs.mjs --input=./pages --output=./output
```

## 风格预览

| 风格 | 特点 | 适用内容 |
|------|------|---------|
| guofeng | 宣纸纹理 / 印章 / 金线 / 竖排 | 国风、读书、金句 |
| minimal | 极简留白 / 衬线字体 / 暖灰 | 文艺、杂志、克制 |
| dopamine | 高饱和撞色 / 大圆角 / 药丸标签 | 种草、好物、活力 |
| knowledge | 超大数字 / 信息可视化 / 橙红 | 干货、数据、教程 |
| food | 暖色调 / 大图 / 食欲感 | 美食、探店、饮品 |
| ai-daily | 暗色 / 荧光绿 / 网格 / 终端感 | AI新闻、科技日报 |

## 插画资源（本地维护）

插画素材不包含在本仓库中，需在本地配置：

- **shigureni**：116 张日系角色 PNG
- **vectorshelf**：4794+ 张扁平矢量物件 PNG

详见 `prompts/illustration-index.md` 中的路径配置说明。

## License

MIT
