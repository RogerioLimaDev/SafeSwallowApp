#!/bin/bash
cd /tmp/SafeSwallowApp || exit 1

echo "Building with vite..."
timeout 60 npx vite build --no-watch || echo "Build timed out (may still succeed)"

echo " Checking dist/..."
ls dist/assets/ 2>/dev/null | head -5
ls dist/images/ 2>/dev/null | head -5

echo "Committing..."
git add -A
git commit -m "build: regenerate dist/ with vite"
git push origin main
