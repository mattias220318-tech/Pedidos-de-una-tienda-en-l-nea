FROM node:20-alpine
WORKDIR /app

# Copiar solo los archivos de dependencias primero para aprovechar la caché de Docker
COPY package*.json ./
RUN npm install

# Copiar el resto del código
COPY . .

EXPOSE 3000
CMD ["npm", "start"]
