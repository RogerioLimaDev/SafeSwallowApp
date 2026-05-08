#!/bin/bash
cd /tmp/SafeSwallowApp || exit 1

# Renomear CSS de volta (remover .renamed para que Vite gera novo hash)
mv dist/assets/index-iq7doii-.renamed.css dist/assets/index-new.css 2>/dev/null || true

# Rodar build novo
echo "Building with vite..."
npx vite build --no-watch 2>&1 | tail -10

# Nova versão do CSS
echo "New CSS files:"
ls dist/assets/*.css 2>/dev/null
