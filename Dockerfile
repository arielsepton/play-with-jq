FROM node:18-alpine

RUN apk add bash autoconf make libtool automake gcc g++ python3

# Update npm to the latest version
RUN npm install -g npm@latest

COPY . /app

WORKDIR /app

RUN npm install -g node-gyp
RUN npm install 
RUN npm run build

ENTRYPOINT ["npm", "start"]
