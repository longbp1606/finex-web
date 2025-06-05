FROM node:22 AS builder
RUN npm install -g pnpm
WORKDIR /app
COPY package.json pnpm-lock.yaml .
RUN pnpm install
COPY . .
RUN pnpm run build

FROM nginx:1.25.2-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf.template /etc/nginx/templates/default.conf.template
EXPOSE 80