# Используем Node.js для сборки
FROM node:18-alpine AS builder

# Устанавливаем рабочую директорию
WORKDIR /app

RUN ls -l /app

COPY package.json package-lock.json ./
RUN npm install

# Копируем весь код и собираем фронтенд
COPY . .
RUN npm run build

# Отладка: Проверим, есть ли файлы в `dist/` перед копированием
RUN ls -l /app/dist

# Используем Nginx для раздачи фронтенда
FROM nginx:latest

# Отладка: Проверим, был ли удалён старый `index.html`
RUN rm -rf /usr/share/nginx/html/* && ls -l /usr/share/nginx/html

# Копируем собранные файлы фронтенда в Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Отладка: Проверим, скопировались ли файлы
RUN ls -l /usr/share/nginx/html

# Открываем порт
EXPOSE 8089

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
