#!/bin/bash
cd /tmp/SafeSwallowApp || exit 1
git add package.json
git commit -m "fix: Vercel serves dist/ directly (removed vite build from scripts)"
git push origin main
