FROM node:22-alpine AS build


WORKDIR /webapp

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build 

FROM nginx:stable-alpine

COPY --from=build /webapp/dist /usr/share/nginx/html


EXPOSE 80


CMD ["nginx", "-g", "daemon off;"]