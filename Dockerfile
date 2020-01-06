FROM node:10-alpine

WORKDIR /usr/src/app

RUN apk update && \
    apk upgrade && \ 
    apk add --no-cache --virtual install \
        python \
        make \
        g++ \
        git

COPY package*.json ./

RUN npm install --unsafe-perm && \ 
    apk del install

COPY . .

RUN npm run build && \
  npm prune --production

CMD ["node", "./out/app.js"]