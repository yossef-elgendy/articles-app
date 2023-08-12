FROM node:17-alpine

WORKDIR /app/articles-challenge-frontend

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "dev"]
