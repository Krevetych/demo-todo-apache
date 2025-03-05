FROM node:23

WORKDIR /app

COPY package*.json ./

COPY node_modules ./node_modules

COPY . .

EXPOSE 8080

CMD ["sh", "-c", "node /app/src/initDB.js && node src/server.js"]