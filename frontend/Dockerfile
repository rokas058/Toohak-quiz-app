FROM harbor.devbridge.net/sourcery-academy/node:20 AS builder

COPY . /code
COPY .env.production .
WORKDIR /code
RUN npm ci
RUN npm run build

FROM harbor.devbridge.net/sourcery-academy/nginx:1.25.4-alpine

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY nginx/cache-headers.conf /etc/nginx/conf.d/cache-headers.conf
COPY nginx/nocache-headers.conf /etc/nginx/conf.d/nocache-headers.conf
COPY nginx/security-headers.conf /etc/nginx/conf.d/security-headers.conf

COPY --from=builder /code/dist /usr/share/nginx/html
