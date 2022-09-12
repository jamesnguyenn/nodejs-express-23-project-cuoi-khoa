FROM node:16

WORKDIR /usr/src/app

COPY package*.json /

RUN yarn install

COPY . .

EXPOSE 8080

RUN yarn prisma generate
RUN npm install pm2 -g

CMD ["yarn","start"]