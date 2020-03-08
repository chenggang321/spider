FROM node:lts-alpine
FROM ubuntu:12.04

WORKDIR /app
COPY . /app

RUN apt-get update
RUN apt-get -y install git

RUN rm -f package-lock.json \
    ; rm -rf .idea \
    ; rm -rf node_modules \
    ; npm config set registry "https://registry.npm.taobao.org/" \
    && npm install


EXPOSE 3000
CMD ["node", "app.js"]
