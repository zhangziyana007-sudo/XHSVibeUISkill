# 字体管理指南

## 目录结构

```
fonts/                          ← 字体文件目录（.gitignore 中忽略大文件）
config/fonts.json               ← 字体配置中心
docs/font-management.md         ← 本文件
```

## 已包含字体（21 个，~100MB）

### 国潮书法（6 个）
| 字体 | 文件 | 大小 | 用途 |
|------|------|------|------|
| 马善政楷体 | MaShanZheng-Regular.ttf | 5.6MB | 国风主标题 |
| 刘建毛草 | LiuJianMaoCao-Regular.ttf | 4.7MB | 大气装饰标题 |
| 龙藏体 | LongCang-Regular.ttf | 4.9MB | 引言/副标题 |
| 志芒行 | ZhiMangXing-Regular.ttf | 3.9MB | 文化类主标题 |
| 站酷小薇 | ZCOOLXiaoWei-Regular.ttf | 6.0MB | 印章/署名 |
| 霞鹜文楷 | LXGWWenKai-Regular.ttf | 18.2MB | 正文楷体/古风 |

### 力量感大标题（4 个）
| 字体 | 文件 | 大小 | 用途 |
|------|------|------|------|
| 思源黑体 Black | NotoSansCJKsc-Black.otf | 17.0MB | 万能大标题 |
| 思源宋体 Black | NotoSerifCJKsc-Black.otf | 22.9MB | 文艺大标题 |
| 得意黑 | SmileySans-Oblique.ttf | 2.5MB | 现代几何标题 |
| Dela Gothic One | DelaGothicOne-Regular.ttf | 2.4MB | 冲击力标题 |

### 手写温柔（4 个）
| 字体 | 文件 | 大小 | 用途 |
|------|------|------|------|
| 站酷快乐体 | ZCOOLKuaiLe-Regular.ttf | 1.4MB | 活泼种草标题 |
| 庆科黄油体 | ZCOOLQingKeHuangYou-Regular.ttf | 7.9MB | 美食标题 |
| Caveat | Caveat-Variable.ttf | 394KB | 英文手写装饰 |
| Pacifico | Pacifico-Regular.ttf | 322KB | 英文草书装饰 |

### 科技未来（4 个）
| 字体 | 文件 | 大小 | 用途 |
|------|------|------|------|
| JetBrains Mono | JetBrainsMono-Bold.ttf | 271KB | 代码/版本号 |
| Space Grotesk | SpaceGrotesk-Variable.ttf | 134KB | 科技英文标题 |
| Orbitron | Orbitron-Variable.ttf | 38KB | 数字/期号 |
| Black Ops One | BlackOpsOne-Regular.ttf | 163KB | 警告标签 |

### 文艺衬线（3 个）
| 字体 | 文件 | 大小 | 用途 |
|------|------|------|------|
| Playfair Display | PlayfairDisplay-Variable.ttf | 294KB | 杂志感标题 |
| Outfit | Outfit-Variable.ttf | 108KB | 现代圆角英文 |
| Righteous | Righteous-Regular.ttf | 42KB | 复古美食英文 |

## 使用方式

### 方式 1：Google Fonts CDN（推荐）

大部分字体在 Google Fonts 上有在线版本，HTML 中一行 link 即可：

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&family=ZCOOL+KuaiLe&family=Noto+Sans+SC:wght@900&display=swap" />
```

Playwright 截图时会自动等待字体加载完成（`waitUntil: 'networkidle'`）。

### 方式 2：本地 @font-face（用于非 Google Fonts 字体）

```html
<style>
@font-face {
  font-family: 'Smiley Sans';
  src: url('/path/to/fonts/SmileySans-Oblique.ttf') format('truetype');
}
@font-face {
  font-family: 'LXGW WenKai';
  src: url('/path/to/fonts/LXGWWenKai-Regular.ttf') format('truetype');
}
</style>
```

**注意**：Playwright 截图时路径必须是绝对路径（file:// 协议不支持相对路径通过 symlink）。

## 风格 → 字体速查表

| 风格 | 标题首选 | 副标题 | 装饰 |
|------|---------|--------|------|
| guofeng | Ma Shan Zheng / Zhi Mang Xing | ZCOOL XiaoWei / LXGW WenKai | Liu Jian Mao Cao |
| knowledge | Noto Sans CJK SC Black / 得意黑 | Outfit / Space Grotesk | JetBrains Mono |
| ai-daily | Noto Sans CJK SC Black / 得意黑 | JetBrains Mono | Orbitron / Black Ops One |
| food | ZCOOL QingKe HuangYou / KuaiLe | Caveat / Righteous | Pacifico |
| dopamine | ZCOOL KuaiLe / 得意黑 / Dela Gothic | Pacifico / Caveat | Orbitron |

## 扩展：手动下载字体

`config/fonts.json` 的 `manualDownload` 部分列出了 14 个需要从 fonts.net.cn 手动下载的字体。

下载步骤：
1. 访问 fonts.net.cn 对应链接
2. 点击"本地下载"
3. 将 .ttf 文件放入 `fonts/` 目录
4. 在 `config/fonts.json` 的对应 category 中添加条目

## 注意事项

- `fonts/` 目录因体积大（~100MB）默认不推送 Git，建议用 Git LFS 或 .gitignore
- Google Fonts 在线加载是首选方案，本地字体用于备份和扩展
- 所有已下载字体均为 **商用免费**（Google Fonts 或 OFL 许可证）
- fonts.net.cn 标注"商用免费"的字体已确认可用于非商标场景
