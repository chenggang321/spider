FROM node:lts-alpine

WORKDIR /app
COPY . /app

# 配置git
RUN apk add git

RUN rm -f package-lock.json \
    ; rm -rf .idea \
    ; rm -rf node_modules \
    ; npm config set registry "https://registry.npm.taobao.org/" \
    && npm install


EXPOSE 3000
CMD ["node", "app.js"]
