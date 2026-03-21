#!/bin/sh
set -e

# Se a pasta persistente existir no volume, cria o symlink
if [ -d "/app/prod/public" ]; then
  ln -sfn /app/prod/public /app/prod/public
  echo "✔ Pasta pesada linkada com sucesso"
else
  echo "⚠ Aviso: /data/sua-pasta-pesada não encontrada, continuando sem ela"
fi

# Inicia o nginx
exec nginx -g "daemon off;"