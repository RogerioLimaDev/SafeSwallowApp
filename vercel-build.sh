#!/bin/bash
# Vercel custom build script - apenas copia dist/ existente (sem rodar build)

set -e

echo "📋 Copiando dist/ para output..."
mkdir -p /vercel/output
cp -r /vercel/path0/dist/* /vercel/output/

echo "✅ Done!"
echo "Output:"
ls -la /vercel/output/
