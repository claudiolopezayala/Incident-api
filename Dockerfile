FROM node:20.15.1

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn build

EXPOSE 3000

CMD [ "node", "dist/src/index.js" ]