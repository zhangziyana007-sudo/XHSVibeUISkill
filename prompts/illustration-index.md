# 本地插画资源索引

> 本文件由 `scripts/scan-illustrations.mjs --update` 自动生成。
> 手动编辑会在下次扫描时被覆盖。
> 配置文件：`config/illustrations.json`

---

## ⚠️ 路径规则（铁律）

**所有 `<img>` 的 `src` 必须使用绝对路径。**

```html
<!-- ✅ 正确 -->
<img src="/home/ts/下载/vectorshelf_插画合集/Drink_饮品/dr055_カフェフラペチーノ/dr055.png" />

<!-- ❌ 禁止（Playwright file:// 模式下 symlink 相对路径会超时） -->
<img src="../../../assets/illustrations/vectorshelf/Drink_饮品/dr055.png" />
```

原因：截图工具通过 `file://` 协议加载 HTML，symlink 目录的相对路径会导致 Playwright networkidle 超时。

---

## 插画库：しぐれに（shigureni）

**风格**：日系 anime 风格少女角色插画
**路径根目录**：`/home/ts/下载/shigureni_插画合集/イラスト_插画`
**格式**：PNG（透明背景）
**实际数量**：116 张

### 分类

| 类别 | 路径 | 数量 | 适用场景 |
|------|------|------|----------|
| 其他/日常 | `その他_其他/` | 92 | — |
| 动物 | `動物_动物/` | 15 | — |
| 时尚 | `美容_时尚/` | 3 | — |
| 美食 | `料理_美食/` | 2 | — |
| 生活 | `日常_生活/` | 2 | — |
| 学习 | `学校_学习/` | 1 | — |
| 设备 | `デバイス_设备/` | 1 | — |

### 兼容风格

- ✅ 兼容：knowledge, food, dopamine
- ❌ 禁止：ai-daily, minimal, guofeng

### 显示尺寸建议

- 最小：120px
- 最大：200px

### 路径示例

```
/home/ts/下载/shigureni_插画合集/イラスト_插画/その他_其他/001_タバコを吸う女の子のイラスト.png
/home/ts/下载/shigureni_插画合集/イラスト_插画/デバイス_设备/016_10秒後にスマホが落ちてくる女の子のイラスト.png
/home/ts/下载/shigureni_插画合集/イラスト_插画/動物_动物/004_猫を膝の上に乗せてゲームをする女の子のイラスト.png
/home/ts/下载/shigureni_插画合集/イラスト_插画/学校_学习/115_テスト期間が終わって豪遊する女の子のイラスト.png
/home/ts/下载/shigureni_插画合集/イラスト_插画/料理_美食/068_猫に狙われながら食事をする女の子のイラスト.png
```

---

## 插画库：vectorshelf

**风格**：扁平矢量物件插画（无人物、纯物品）
**路径根目录**：`/home/ts/下载/vectorshelf_插画合集`
**格式**：PNG（透明背景）
**实际数量**：4842 张

### 分类

| 类别 | 路径 | 数量 | 适用场景 |
|------|------|------|----------|
| 饮品 | `Drink_饮品/` | 449 | — |
| 食物 | `Food_食物/` | 439 | — |
| 植物 | `Plants_植物/` | 984 | — |
| 物品 | `Goods_物品/` | 899 | — |
| 其他 | `Other_其他/` | 2007 | — |
| 文字 | `Letters_文字/` | 64 | — |

### 兼容风格

- ✅ 兼容：food, dopamine, guofeng, knowledge
- ❌ 禁止：ai-daily, minimal

### 显示尺寸建议

- 最小：80px
- 最大：180px

---

## 风格 → 插画推荐映射

| 风格 | 主推 | 备选 | 用法 |
|------|------|------|------|
| food | vectorshelf:drink, vectorshelf:food | shigureni:cooking | 列表项图标(80px) / 标题装饰(120-160px) |
| dopamine | vectorshelf:drink, vectorshelf:food, vectorshelf:plants | shigureni:other | 标题旁大图(160-180px) / 列表项图标(80px) |
| guofeng | vectorshelf:plants | — | 角落装饰(100-160px)，仅限东方花卉(梅花/樱花) |
| knowledge | shigureni:school, shigureni:other | vectorshelf:goods | 小型角落装饰(120px)，不占主空间 |
| ai-daily | — | — | ❌ 禁止使用任何插画 |
| minimal | — | — | ❌ 禁止使用任何插画 |

---

## 高频推荐素材

| 库 | 编号 | 名称 | 标签 |
|---|------|------|------|
| vectorshelf | dr055 | 星冰乐 | 咖啡, 饮品, 夏日 |
| vectorshelf | dr066 | 拿铁 | 咖啡, 日常 |
| vectorshelf | dr007 | 咖啡杯碟 | 咖啡, 下午茶 |
| vectorshelf | dr075 | 青柠汁 | 果汁, 清爽, 夏日 |
| vectorshelf | dr034 | 外带杯 | 咖啡, 外卖 |
| vectorshelf | dr018 | 牛奶瓶 | 牛奶, 早餐 |
| vectorshelf | dr004 | 奶昔 | 甜品, 饮品 |
| vectorshelf | pl129 | 梅与绣眼鸟 | 国潮, 梅花, 鸟 |
| vectorshelf | pl081 | 樱花 | 国潮, 樱花, 春天 |
| vectorshelf | fo034 | 草莓可丽饼 | 甜品, 草莓 |
| vectorshelf | fo017 | 水果糖浆 | 水果, 甜品 |

---

## 插画使用规范

1. **每页最多 1-2 张插画**，避免喧宾夺主
2. 插画作为**装饰点缀**，不作为信息主体
3. 必须添加 `alt` 属性描述
4. 使用 `object-fit: contain` 保持比例
5. 添加 `drop-shadow` 提升层次感：
   ```css
   .illust { filter: drop-shadow(0 4px 12px rgba(0,0,0,0.1)); }
   ```
6. 不对插画做裁切（保持完整性）
