#!/bin/bash
# Converte todos .webm para .mp4 com ffmpeg (H.264 + AAC)
# Preserva .webm como backup até que tudo esteja rodando

set -e

PROJECT_DIR="/tmp/SafeSwallowApp"
cd "$PROJECT_DIR"

echo "🔍 Buscando todos .webm..."
find public -name "*.webm" -type f | sort

echo -e "\n📊 Estatísticas antes:"
find public -name "*.webm" -type f -exec stat --printf='%s %n\n' {} \; | awk '{total+=$1} END {printf "Total .webm size: %.2f MB\n", total/1024/1024}'
find public -name "*.mp4" -type f -exec stat --printf='%s %n\n' {} \; 2>/dev/null | awk '{total+=$1} END {printf "Total .mp4 size: %.2f MB\n", total/1024/1024}' || true

sleep 2

echo -e "\n✅ Convertendo .webm → .mp4..."
for file in $(find public -name "*.webm" -type f); do
    dir=$(dirname "$file")
    base=$(basename "$file" .webm)
    mp4="${dir}/${base}.mp4"
    
    echo "  $file → $mp4"
    ffmpeg -y -i "$file" -preset veryfast -crf 23 -c:v libx264 -c:a aac -movflags +faststart "$mp4" 2>/dev/null
    
    if [ $? -eq 0 ]; then
        # Verifica se o mp4 tem tamanho >0 e é menor que original
        orig_size=$(stat -c%s "$file")
        new_size=$(stat -c%s "$mp4")
        if [ $new_size -gt 0 ]; then
            savings=$((orig_size - new_size))
            echo "    ✅ OK (${new_size} bytes, economia: $((savings/1024)) KB)"
        else
            echo "    ❌ Erro: arquivo mp4 vazio"
            rm -f "$mp4"
        fi
    else
        echo "    ❌ Erro na conversão"
    fi
done

echo -e "\n📊 Estatísticas depois:"
find public -name "*.webm" -type f -exec stat --printf='%s %n\n' {} \; | awk '{total+=$1} END {printf "Total .webm size: %.2f MB\n", total/1024/1024}'
find public -name "*.mp4" -type f -exec stat --printf='%s %n\n' {} \; | awk '{total+=$1} END {printf "Total .mp4 size: %.2f MB\n", total/1024/1024}'

echo -e "\n✅ Conclusão: Concluído. Use 'git status' para ver os novos .mp4."
echo "⚠️  .webm ainda estão na pasta (backup). Você pode removê-los manualmente depois."
