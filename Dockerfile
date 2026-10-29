FROM node:24-slim
WORKDIR /app
COPY package.json ./
COPY server ./server
COPY content ./content
COPY public ./public
CMD ["node","server/index.js"]
