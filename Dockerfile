FROM node:12.13.0 as build
LABEL maintainer="jingshonline@jingshonline.com"

WORKDIR /src

RUN npm install -g cnpm --registry=https://registry.npm.taobao.org 

COPY . .
RUN cnpm install \
  --prefer-offline \
  --frozen-lockfile \
  --non-interactive \
  --production=false

RUN cnpm run build

RUN rm -rf node_modules && \
  NODE_ENV=production cnpm install \
  --prefer-offline \
  --pure-lockfile \
  --non-interactive \
  --production=true

FROM harbor.jingshonline.net/jingsh/node:alpine

WORKDIR /src

COPY --from=build /src  .

ENV HOST 0.0.0.0
EXPOSE 3000

CMD [ "npm", "start" ]