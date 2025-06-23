FROM node:20-alpine AS build
WORKDIR /link_frontend
COPY ./package.json ./package-lock.json ./
RUN npm install
COPY ./src ./src
COPY ./public ./public
COPY ./tsconfig.node.json ./
COPY ./tsconfig.app.json ./
COPY ./tsconfig.json ./
COPY ./vite.config.ts ./
COPY ./index.html ./

RUN npm run build
FROM nginx:alpine
COPY --from=build /link_frontend/dist /usr/share/nginx/html


