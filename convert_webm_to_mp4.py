#!/usr/bin/env python3
"""
Converte todos .webm do projeto para .mp4 (H.264 + AAC).
Preserva arquivos .webm como backup.
"""

import subprocess
import sys
import os
from pathlib import Path

PROJECT_DIR = Path("/tmp/SafeSwallowApp")
WEBM_DIR = PROJECT_DIR / "public"

def get_webm_files():
    """Find all .webm files recursively."""
    return list(WEBM_DIR.rglob("*.webm"))

def convert_webm_to_mp4(webm_path: Path) -> bool:
    """Convert a single .webm file to .mp4"""
    mp4_path = webm_path.with_suffix('.mp4')
    
    # Skip if .mp4 already exists and is non-empty
    if mp4_path.exists() and mp4_path.stat().st_size > 0:
        print(f"  ✅ Already exists: {mp4_path.name}")
        return True
    
    print(f"  🔄 Converting: {webm_path.name}")
    
    cmd = [
        "ffmpeg", "-y",  # overwrite without asking
        "-i", str(webm_path),
        "-preset", "veryfast",      # good speed/quality tradeoff
        "-crf", "23",               # quality (23 = default balance)
        "-c:v", "libx264",          # H.264 video codec
        "-c:a", "aac",              # AAC audio codec
        "-b:a", "192k",             # audio bitrate
        "-movflags", "+faststart",  # web optimization
        "-threads", "0",            # use all cores
        str(mp4_path)
    ]
    
    try:
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=120)
        if result.returncode == 0:
            orig_size = webm_path.stat().st_size
            new_size = mp4_path.stat().st_size
            savings = orig_size - new_size
            savings_pct = (savings / orig_size) * 100
            print(f"    ✅ OK ({new_size:,} bytes, {savings_pct:.1f}% smaller)")
            return True
        else:
            print(f"    ❌ Error: {result.stderr[:200]}")
            return False
    except subprocess.TimeoutExpired:
        print(f"    ❌ Timeout (120s)")
        return False
    except Exception as e:
        print(f"    ❌ Exception: {e}")
        return False

def main():
    webm_files = get_webm_files()
    total = len(webm_files)
    print(f"📁 Found {total} .webm files to convert")
    
    success_count = 0
    fail_count = 0
    
    for i, webm_path in enumerate(webm_files, 1):
        print(f"[{i}/{total}] {webm_path}")
        if convert_webm_to_mp4(webm_path):
            success_count += 1
        else:
            fail_count += 1
    
    print(f"\n📊 Summary:")
    print(f"  ✅ Success: {success_count}")
    print(f"  ❌ Failed:  {fail_count}")
    print(f"\n⚠️  Original .webm files are kept as backup.")
    print(f"✅ Run 'git status' to see the .mp4 files.")

if __name__ == "__main__":
    sys.exit(main())
