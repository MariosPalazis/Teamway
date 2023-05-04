FROM node:19.6.0

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install 
#RUN npm ci

COPY . .

EXPOSE 9000

CMD ["npm", "start"]