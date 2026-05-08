#!/bin/bash
cd /tmp/SafeSwallowApp || exit 1

# Renomear o arquivo CSS para forçar refresh
css_file=$(ls dist/assets/index-*.css | head -1)
if [ -f "$css_file" ]; then
  mv "$css_file" "${css_file%.css}.renamed.css"
  git add dist/assets/
  git commit -m "build: rename CSS to clear cache"
  git push origin main
  echo "✅ CSS renomeado para forçar cache clear!"
else
  echo "❌ CSS não encontrado!"
fi
