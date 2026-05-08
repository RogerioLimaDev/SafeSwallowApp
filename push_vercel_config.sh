#!/bin/bash
cd /tmp/SafeSwallowApp || exit 1
git add vercel.json
git commit -m "fix: use framework=vite for automatic build detection"
git push origin main
