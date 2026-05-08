#!/bin/bash
# Vercel custom build script - copia dist/ (relativo ao repo)
# O Vercel rodou 'bash vercel-build.sh' dentro do repo, então o dist/ está em ./dist/

set -e

echo "📋 Copiando dist/ para output..."

# Criar output se não existir
mkdir -p /vercel/output

# Copiar dist/ para output (caminho relativo)
if [ -d "dist" ]; then
  cp -r dist/* /vercel/output/
  echo "✅ Copied dist/ to output"
else
  echo "❌ dist/ not found"
  exit 1
fi

echo "Output:"
ls -la /vercel/output/
