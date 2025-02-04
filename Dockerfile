# Используем Node.js LTS
FROM node:18-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем весь код
COPY . .

# Собираем фронтенд (если есть)
RUN npm run build

# Открываем порт 3000
EXPOSE 8099

# Запускаем сервер
CMD ["npm", "start"]
