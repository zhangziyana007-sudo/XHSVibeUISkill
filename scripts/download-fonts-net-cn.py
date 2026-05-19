#!/usr/bin/env python3
"""
批量下载 fonts.net.cn 商用免费中文字体
共27页，约536个字体
"""

import requests
import re
import os
import time
import json
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed

BASE_URL = "https://www.fonts.net.cn"
DOWNLOAD_API = f"{BASE_URL}/font-download.html"
OUTPUT_DIR = Path("/home/ts/XHSVibeUISkill/fonts/fonts-net-cn")
HEADERS = {
    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Referer": "https://www.fonts.net.cn/",
    "X-Requested-With": "XMLHttpRequest",
}

def get_font_ids_from_page(page_num: int) -> list[dict]:
    """从列表页提取字体ID和名称"""
    url = f"{BASE_URL}/commercial-free/fonts-zh-{page_num}.html"
    try:
        resp = requests.get(url, headers={"User-Agent": HEADERS["User-Agent"]}, timeout=30)
        resp.raise_for_status()
        # 匹配 font-NNNNNNNNN.html 和字体名
        pattern = r'<a href="/font-(\d+)\.html"[^>]*title="([^"]+)"'
        matches = re.findall(pattern, resp.text)
        # 去重（同一字体会出现多次）
        seen = set()
        fonts = []
        for fid, name in matches:
            if fid not in seen:
                seen.add(fid)
                fonts.append({"id": fid, "name": name})
        return fonts
    except Exception as e:
        print(f"  ❌ 第 {page_num} 页获取失败: {e}")
        return []


def get_download_url(font_id: str, retries: int = 3) -> str | None:
    """获取字体下载链接（带重试）"""
    for attempt in range(retries):
        try:
            resp = requests.post(
                DOWNLOAD_API,
                data={"id": font_id},
                headers={**HEADERS, "Content-Type": "application/x-www-form-urlencoded"},
                timeout=30,
            )
            data = resp.json()
            if data.get("success") and data.get("data", {}).get("url"):
                return "https:" + data["data"]["url"]
        except Exception as e:
            if attempt < retries - 1:
                time.sleep(2 * (attempt + 1))
            else:
                print(f"    ⚠️ 获取下载链接失败 (ID={font_id}): {e}")
    return None


def download_font(font: dict, index: int, total: int) -> bool:
    """下载单个字体"""
    font_id = font["id"]
    name = font["name"]
    
    # 获取下载URL
    url = get_download_url(font_id)
    if not url:
        return False
    
    # 文件名从URL或字体名推导
    safe_name = re.sub(r'[/\\:*?"<>|]', '_', name)
    filename = f"{safe_name}.zip"
    filepath = OUTPUT_DIR / filename
    
    if filepath.exists():
        print(f"  [{index}/{total}] ⏭️  已存在: {name}")
        return True
    
    try:
        resp = requests.get(url, headers={"User-Agent": HEADERS["User-Agent"]}, timeout=120, stream=True)
        resp.raise_for_status()
        
        with open(filepath, "wb") as f:
            for chunk in resp.iter_content(chunk_size=8192):
                f.write(chunk)
        
        size_kb = filepath.stat().st_size / 1024
        print(f"  [{index}/{total}] ✅ {name} ({size_kb:.0f} KB)")
        return True
    except Exception as e:
        print(f"  [{index}/{total}] ❌ {name}: {e}")
        if filepath.exists():
            filepath.unlink()
        return False


def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    
    print("=" * 60)
    print("  fonts.net.cn 商用免费中文字体批量下载")
    print("=" * 60)
    
    # 第一步：收集所有字体ID
    print("\n📋 正在收集27页字体列表...")
    all_fonts = []
    for page in range(1, 28):
        fonts = get_font_ids_from_page(page)
        all_fonts.extend(fonts)
        print(f"  第 {page:2d}/27 页: 找到 {len(fonts)} 个字体")
        time.sleep(0.5)  # 礼貌延迟
    
    # 去重
    seen_ids = set()
    unique_fonts = []
    for f in all_fonts:
        if f["id"] not in seen_ids:
            seen_ids.add(f["id"])
            unique_fonts.append(f)
    
    print(f"\n📊 共找到 {len(unique_fonts)} 个唯一字体")
    
    # 保存字体列表
    manifest = OUTPUT_DIR / "_manifest.json"
    with open(manifest, "w", encoding="utf-8") as f:
        json.dump(unique_fonts, f, ensure_ascii=False, indent=2)
    
    # 第二步：逐个下载
    print(f"\n⬇️  开始下载到: {OUTPUT_DIR}")
    print("-" * 60)
    
    success = 0
    failed = 0
    skipped = 0
    total = len(unique_fonts)
    consecutive_fails = 0
    
    for i, font in enumerate(unique_fonts, 1):
        # 检查是否已存在（快速跳过）
        safe_name = re.sub(r'[/\\:*?"<>|]', '_', font["name"])
        filepath = OUTPUT_DIR / f"{safe_name}.zip"
        if filepath.exists():
            print(f"  [{i}/{total}] ⏭️  已存在: {font['name']}")
            skipped += 1
            success += 1
            consecutive_fails = 0
            continue
        
        if download_font(font, i, total):
            success += 1
            consecutive_fails = 0
        else:
            failed += 1
            consecutive_fails += 1
        
        # 自适应延迟：连续失败越多，延迟越长
        if consecutive_fails >= 5:
            wait = min(30, 5 * consecutive_fails)
            print(f"    ⏳ 连续失败 {consecutive_fails} 次，等待 {wait}s...")
            time.sleep(wait)
        elif consecutive_fails >= 2:
            time.sleep(3)
        else:
            time.sleep(1.5)
    
    print("\n" + "=" * 60)
    print(f"  下载完成！成功: {success} (跳过已有: {skipped}) | 失败: {failed} | 总计: {total}")
    print(f"  保存目录: {OUTPUT_DIR}")
    print("=" * 60)


if __name__ == "__main__":
    main()
