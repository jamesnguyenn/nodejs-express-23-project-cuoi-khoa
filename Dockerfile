FROM node:16

WORKDIR /usr/src/app

COPY package*.json /
COPY . .

RUN npm install

EXPOSE 8080

RUN npm prisma generate
RUN npm install pm2 -g

CMD ["yarn","start"]