FROM node:lts-alpine

WORKDIR /app
COPY . /app

# 配置git
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories
RUN apk add git
RUN git config --global https.proxy http://127.0.0.1:1080
RUN git config --global https.proxy https://127.0.0.1:1080
RUN git config --global user.name "chenggang321"
RUN git config --global user.email "1129137164@qq.com"

RUN rm -f package-lock.json \
    ; rm -rf .idea \
    ; rm -rf node_modules \
    ; npm config set registry "https://registry.npm.taobao.org/" \
    && npm install


EXPOSE 3000
CMD ["node", "app.js"]
