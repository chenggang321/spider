FROM node:lts-alpine
FROM python:3.6-alpine

WORKDIR /app
COPY . /app

# install git - apt-get replace with apk
RUN apk update && \
    apk upgrade && \
    apk add --no-cache bash git openssh

RUN rm -f package-lock.json \
    ; rm -rf .idea \
    ; rm -rf node_modules \
    ; npm config set registry "https://registry.npm.taobao.org/" \
    && npm install


EXPOSE 3000
CMD ["node", "app.js"]
