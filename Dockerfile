# Stage 1: Build the Vite app
FROM node:18-alpine AS builder

WORKDIR /app

# Salin env file terlebih dahulu
COPY .env.production .env.production

# Salin package & install
COPY package*.json ./
RUN npm install

# Salin semua kode
COPY . .

# Set environment agar gunakan .env.production
ENV NODE_ENV=production

# Build aplikasi Vite
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:1.25-alpine

# Hapus file HTML default dari Nginx
RUN rm -rf /usr/share/nginx/html/*

# Salin hasil build dari stage sebelumnya
COPY --from=builder /app/dist /usr/share/nginx/html

# Optional: custom nginx config (jika ada)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Jalankan Nginx
CMD ["nginx", "-g", "daemon off;"]
