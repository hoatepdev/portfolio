#!/bin/bash

# DOMAIN
DOMAIN="p.hoatepdev.site"

# Đường dẫn chứng chỉ gốc từ Let's Encrypt
LE_PATH="/etc/letsencrypt/live/$DOMAIN"

# Đường dẫn trong dự án Docker
DOCKER_SSL_PATH="/services/portfolio/nginx/ssl"

# Tên container (đổi theo docker-compose.yml)
NGINX_CONTAINER="portfolio-nginx"

# Kiểm tra chứng chỉ có tồn tại không
if [ ! -f "$LE_PATH/fullchain.pem" ]; then
  echo "❌ Không tìm thấy chứng chỉ Let's Encrypt cho $DOMAIN"
  exit 1
fi

# Copy chứng chỉ
echo "📥 Đang copy chứng chỉ..."
cp "$LE_PATH/fullchain.pem" "$DOCKER_SSL_PATH/fullchain.pem"
cp "$LE_PATH/privkey.pem" "$DOCKER_SSL_PATH/privkey.pem"

# Reload container nginx
echo "🔁 Reload Nginx container..."
docker exec "$NGINX_CONTAINER" nginx -s reload

echo "✅ Đã copy và reload thành công."
