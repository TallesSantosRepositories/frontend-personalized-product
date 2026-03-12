# ── Stage 1: Build ──────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# ── Stage 2: Serve com Nginx ─────────────────────
FROM nginx:alpine

# Copia o build gerado pelo Vite
COPY --from=builder /app/dist /usr/share/nginx/html

# Copia nossa config customizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]