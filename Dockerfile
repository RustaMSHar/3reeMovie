# Используем Node.js для сборки
FROM node:18-alpine AS builder

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем весь код и собираем фронтенд
COPY . .
RUN npm run build

# Используем Nginx для раздачи собранного фронтенда
FROM nginx:latest

# Копируем файлы статики из `dist/` в корень сервера Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Открываем порт
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
