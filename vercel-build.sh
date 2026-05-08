#!/bin/bash
set -e

echo "🔍 Verificando Node.js versão:"
node --version
npm --version

echo "🧱 Instalando dependências..."
npm install

echo "🔨 Rodando build..."
npm run build

echo "📦 Arquivos gerados no dist/:"
ls -la dist/
