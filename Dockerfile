# etapa 1: Construcción
FROM node:23-slim AS build

WORKDIR /app
COPY  package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Estapa 2: Servir con Ngnix
FROM nginx:stable-alpine
COPY --from=build /app/dist/frontend /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]
