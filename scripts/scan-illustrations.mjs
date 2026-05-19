#!/usr/bin/env node
/**
 * 插画库自动扫描索引工具
 *
 * 功能：
 * 1. 读取 config/illustrations.json 配置
 * 2. 扫描所有插画库目录
 * 3. 验证路径是否存在
 * 4. 生成/更新 prompts/illustration-index.md
 * 5. 输出统计报告
 *
 * 用法：
 *   node scripts/scan-illustrations.mjs [--update] [--validate] [--add <path>]
 *
 * 选项：
 *   --update    扫描并更新 illustration-index.md
 *   --validate  仅验证配置中的路径是否存在
 *   --add       交互式添加新插画库
 *   --stats     输出统计信息
 */

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join, resolve, basename, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, '..');

const CONFIG_PATH = join(ROOT, 'config', 'illustrations.json');
const INDEX_PATH = join(ROOT, 'prompts', 'illustration-index.md');

// ═══════════════════════════════════════
// 工具函数
// ═══════════════════════════════════════

function loadConfig() {
  if (!existsSync(CONFIG_PATH)) {
    console.error('❌ 配置文件不存在：', CONFIG_PATH);
    process.exit(1);
  }
  return JSON.parse(readFileSync(CONFIG_PATH, 'utf-8'));
}

function countFiles(dir, ext = '.png') {
  if (!existsSync(dir)) return 0;
  let count = 0;
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      count += countFiles(join(dir, entry.name), ext);
    } else if (entry.name.endsWith(ext)) {
      count++;
    }
  }
  return count;
}

function listCategories(basePath) {
  if (!existsSync(basePath)) return [];
  return readdirSync(basePath, { withFileTypes: true })
    .filter(e => e.isDirectory())
    .map(e => ({
      name: e.name,
      path: join(basePath, e.name),
      count: countFiles(join(basePath, e.name))
    }))
    .sort((a, b) => b.count - a.count);
}

function sampleFiles(dir, limit = 5) {
  if (!existsSync(dir)) return [];
  const results = [];
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (results.length >= limit) break;
    if (entry.isDirectory()) {
      const subFiles = readdirSync(join(dir, entry.name))
        .filter(f => f.endsWith('.png'));
      if (subFiles.length > 0) {
        results.push(join(dir, entry.name, subFiles[0]));
      }
    } else if (entry.name.endsWith('.png')) {
      results.push(join(dir, entry.name));
    }
  }
  return results;
}

// ═══════════════════════════════════════
// 验证命令
// ═══════════════════════════════════════

function validate() {
  const config = loadConfig();
  console.log('🔍 验证插画库配置...\n');

  let allValid = true;

  for (const lib of config.libraries) {
    const exists = existsSync(lib.basePath);
    const icon = exists ? '✅' : '❌';
    console.log(`${icon} ${lib.name}`);
    console.log(`   路径: ${lib.basePath}`);

    if (exists) {
      const actualCount = countFiles(lib.basePath);
      const diff = actualCount - lib.totalCount;
      const diffStr = diff === 0 ? '一致' : (diff > 0 ? `+${diff} 新增` : `${diff} 减少`);
      console.log(`   数量: 配置 ${lib.totalCount} / 实际 ${actualCount} (${diffStr})`);

      // 验证每个分类
      for (const cat of lib.categories) {
        const catPath = join(lib.basePath, cat.path);
        const catExists = existsSync(catPath);
        if (!catExists) {
          console.log(`   ⚠️  分类不存在: ${cat.path}`);
          allValid = false;
        }
      }
    } else {
      console.log(`   ⚠️  路径不存在！请检查 config/illustrations.json`);
      allValid = false;
    }
    console.log('');
  }

  if (allValid) {
    console.log('✅ 所有配置验证通过');
  } else {
    console.log('⚠️  存在问题，请检查上述输出');
    process.exit(1);
  }
}

// ═══════════════════════════════════════
// 统计命令
// ═══════════════════════════════════════

function stats() {
  const config = loadConfig();
  console.log('📊 插画资源统计\n');
  console.log('═'.repeat(60));

  let totalAll = 0;

  for (const lib of config.libraries) {
    console.log(`\n📁 ${lib.name} (${lib.id})`);
    console.log(`   风格: ${lib.style}`);
    console.log(`   路径: ${lib.basePath}`);
    console.log('   ─'.repeat(20));

    if (existsSync(lib.basePath)) {
      const categories = listCategories(lib.basePath);
      let libTotal = 0;

      for (const cat of categories) {
        console.log(`   ${cat.name.padEnd(30)} ${String(cat.count).padStart(5)} 张`);
        libTotal += cat.count;
      }
      console.log(`   ${'─'.repeat(35)}─────────`);
      console.log(`   ${'合计'.padEnd(28)} ${String(libTotal).padStart(5)} 张`);
      totalAll += libTotal;
    } else {
      console.log('   ⚠️  路径不存在');
    }
  }

  console.log('\n' + '═'.repeat(60));
  console.log(`📈 总计: ${totalAll} 张插画资源`);
  console.log(`📚 库数: ${config.libraries.length} 个插画库`);

  // 风格兼容性统计
  console.log('\n🎨 风格兼容性:');
  for (const [style, mapping] of Object.entries(config.styleMapping)) {
    const total = mapping.primary.length + mapping.secondary.length;
    if (total === 0) {
      console.log(`   ${style.padEnd(12)} ❌ 禁止`);
    } else {
      console.log(`   ${style.padEnd(12)} ${mapping.primary.join(', ')} ${mapping.secondary.length > 0 ? '(+' + mapping.secondary.join(', ') + ')' : ''}`);
    }
  }
}

// ═══════════════════════════════════════
// 更新索引命令
// ═══════════════════════════════════════

function update() {
  const config = loadConfig();
  console.log('📝 生成插画索引 prompts/illustration-index.md ...\n');

  let md = `# 本地插画资源索引

> 本文件由 \`scripts/scan-illustrations.mjs --update\` 自动生成。
> 手动编辑会在下次扫描时被覆盖。
> 配置文件：\`config/illustrations.json\`

---

## ⚠️ 路径规则（铁律）

**所有 \`<img>\` 的 \`src\` 必须使用绝对路径。**

\`\`\`html
<!-- ✅ 正确 -->
<img src="/home/ts/下载/vectorshelf_插画合集/Drink_饮品/dr055_カフェフラペチーノ/dr055.png" />

<!-- ❌ 禁止（Playwright file:// 模式下 symlink 相对路径会超时） -->
<img src="../../../assets/illustrations/vectorshelf/Drink_饮品/dr055.png" />
\`\`\`

原因：截图工具通过 \`file://\` 协议加载 HTML，symlink 目录的相对路径会导致 Playwright networkidle 超时。

---
`;

  // 逐个库生成文档
  for (const lib of config.libraries) {
    md += `\n## 插画库：${lib.name}\n\n`;
    md += `**风格**：${lib.description}\n`;
    md += `**路径根目录**：\`${lib.basePath}\`\n`;
    md += `**格式**：${lib.format.toUpperCase()}（透明背景）\n`;

    if (existsSync(lib.basePath)) {
      const actualCount = countFiles(lib.basePath);
      md += `**实际数量**：${actualCount} 张\n`;
    } else {
      md += `**⚠️ 路径不存在，请检查配置**\n`;
    }

    md += `\n### 分类\n\n`;
    md += `| 类别 | 路径 | 数量 | 适用场景 |\n`;
    md += `|------|------|------|----------|\n`;

    for (const cat of lib.categories) {
      const catPath = join(lib.basePath, cat.path);
      const actualCount = existsSync(catPath) ? countFiles(catPath) : cat.count;
      md += `| ${cat.label} | \`${cat.path}/\` | ${actualCount} | — |\n`;
    }

    md += `\n### 兼容风格\n\n`;
    md += `- ✅ 兼容：${lib.compatibleStyles.join(', ')}\n`;
    md += `- ❌ 禁止：${lib.incompatibleStyles.join(', ')}\n`;
    md += `\n### 显示尺寸建议\n\n`;
    md += `- 最小：${lib.displaySize.min}${lib.displaySize.unit}\n`;
    md += `- 最大：${lib.displaySize.max}${lib.displaySize.unit}\n`;

    // 列出样本文件
    if (existsSync(lib.basePath)) {
      const samples = sampleFiles(lib.basePath, 5);
      if (samples.length > 0) {
        md += `\n### 路径示例\n\n\`\`\`\n`;
        for (const s of samples) {
          md += `${s}\n`;
        }
        md += `\`\`\`\n`;
      }
    }

    md += `\n---\n`;
  }

  // 风格映射表
  md += `\n## 风格 → 插画推荐映射\n\n`;
  md += `| 风格 | 主推 | 备选 | 用法 |\n`;
  md += `|------|------|------|------|\n`;

  for (const [style, mapping] of Object.entries(config.styleMapping)) {
    const primary = mapping.primary.length > 0 ? mapping.primary.join(', ') : '—';
    const secondary = mapping.secondary.length > 0 ? mapping.secondary.join(', ') : '—';
    md += `| ${style} | ${primary} | ${secondary} | ${mapping.usage} |\n`;
  }

  // 收藏列表
  if (config.favorites && config.favorites.length > 0) {
    md += `\n---\n\n## 高频推荐素材\n\n`;
    md += `| 库 | 编号 | 名称 | 标签 |\n`;
    md += `|---|------|------|------|\n`;

    for (const fav of config.favorites) {
      md += `| ${fav.library} | ${fav.id} | ${fav.name} | ${fav.tags.join(', ')} |\n`;
    }
  }

  // 使用规范
  md += `\n---\n\n## 插画使用规范\n\n`;
  md += `1. **每页最多 1-2 张插画**，避免喧宾夺主\n`;
  md += `2. 插画作为**装饰点缀**，不作为信息主体\n`;
  md += `3. 必须添加 \`alt\` 属性描述\n`;
  md += `4. 使用 \`object-fit: contain\` 保持比例\n`;
  md += `5. 添加 \`drop-shadow\` 提升层次感：\n`;
  md += `   \`\`\`css\n   .illust { filter: drop-shadow(0 4px 12px rgba(0,0,0,0.1)); }\n   \`\`\`\n`;
  md += `6. 不对插画做裁切（保持完整性）\n`;

  writeFileSync(INDEX_PATH, md, 'utf-8');
  console.log(`✅ 已生成: ${INDEX_PATH}`);
}

// ═══════════════════════════════════════
// 主入口
// ═══════════════════════════════════════

const args = process.argv.slice(2);

if (args.includes('--validate') || args.includes('-v')) {
  validate();
} else if (args.includes('--stats') || args.includes('-s')) {
  stats();
} else if (args.includes('--update') || args.includes('-u')) {
  update();
} else if (args.length === 0) {
  // 默认：验证 + 统计
  validate();
  console.log('');
  stats();
} else {
  console.log(`
📦 插画库扫描索引工具

用法:
  node scripts/scan-illustrations.mjs [选项]

选项:
  --validate, -v    验证配置中的路径是否存在
  --stats, -s       输出统计信息
  --update, -u      扫描并更新 prompts/illustration-index.md
  (无参数)          验证 + 统计

配置文件: config/illustrations.json
`);
}
