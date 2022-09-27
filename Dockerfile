FROM node:16-alpine3.15

WORKDIR /usr

COPY package.json ./

COPY tsconfig.json ./

COPY tsoa.json ./

COPY app ./app

RUN ls -a

RUN npm install

RUN npm run build

## this is stage two , where the app actually runs

FROM node:16-alpine3.15

WORKDIR /usr

COPY package.json ./

COPY .env .

RUN npm install --only=production

COPY --from=0 /usr/dist .

RUN npm install pm2 -g

EXPOSE 5000

CMD ["pm2-runtime","app/server.js"]