# XHSVibeUISkill

小红书图文生产线 — 7 种独立视觉风格，每种风格自包含完整 4 阶段工作流，产出 3:4 图文 PNG。

## 特性

- **7 种独立风格技能**：每种风格一个自包含的 SKILL.md，无需读取多个文件
- **4 阶段流水线**：素材 → 知识文档 → 图文脚本 → HTML 页面 → PNG 截图
- **Token 高效**：只读取需要的风格文件（~250行），不加载全部规范
- **本地字体+插画**：已集成 21 套字体 + 两套插画库

## 风格一览

| 风格 | 目录 | 特点 | 适用内容 |
|------|------|------|---------|
| AI科技日报 | `skills/xhs-ai-daily/` | 黑底+荧光绿/终端网格 | AI资讯、科技日报 |
| 极简文艺 | `skills/xhs-minimal/` | 纸白+大留白/衬线 | 金句、读书、文艺 |
| 多巴胺撞色 | `skills/xhs-dopamine/` | 深紫+五色撞色/药丸 | 种草、日常、潮流 |
| 商务知识卡 | `skills/xhs-knowledge/` | 灰白+橙红/大数字 | 教程、干货、数据 |
| 美食探店 | `skills/xhs-food/` | 暖色+真实图片/评分 | 美食、餐厅、探店 |
| 古风国潮 | `skills/xhs-guofeng/` | 宣纸+朱砂金/书法印章 | 国学、传统文化 |
| 水墨古风 | `skills/xhs-shuimo/` | 五墨灰阶/泼墨飞白/山水 | 诗词、禅意、哲理 |

## 目录结构

```
├── SKILL.md                 ← 风格路由索引（入口）
├── skills/                  ← 7 个独立风格技能
│   ├── xhs-ai-daily/SKILL.md
│   ├── xhs-minimal/SKILL.md
│   ├── xhs-dopamine/SKILL.md
│   ├── xhs-knowledge/SKILL.md
│   ├── xhs-food/SKILL.md
│   ├── xhs-guofeng/SKILL.md
│   └── xhs-shuimo/SKILL.md
├── prompts/                 ← 共享参考文件（可选阅读）
│   ├── content-types.md
│   ├── style-templates.md
│   ├── decoration-system.md
│   └── illustration-index.md
├── fonts/                   ← 本地字体文件
├── config/                  ← 字体/插画配置
├── scripts/                 ← 截图工具
│   ├── screenshot-xhs.mjs
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

**方式一（推荐）**：直接指定风格
```
用 xhs-ai-daily 帮我做一篇关于XXX的小红书图文
```

**方式二**：让 AI 推荐风格
```
帮我把这段素材做成小红书图文
```

### 3. 安装为 Hermes 技能

```bash
# 创建符号链接到 Hermes 技能目录
mkdir -p ~/.hermes/skills/social-media
for style in skills/xhs-*; do
  ln -sf "$(pwd)/$style" ~/.hermes/skills/social-media/$(basename $style)
done
```

### 4. 截图命令

```bash
cd /home/ts/VIbeUI && node scripts/screenshot-xhs.mjs \
  --input=./projects/{topic}/pages \
  --output=./projects/{topic}/output
```

## 插画资源（本地维护）

插画素材不包含在本仓库中，需在本地配置：

- **shigureni**：116 张日系角色 PNG
- **vectorshelf**：4794+ 张扁平矢量物件 PNG

详见 `prompts/illustration-index.md` 中的路径配置说明。

## License

MIT
