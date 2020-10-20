FROM node:12-alpine as build

WORKDIR /app
COPY ./package.json ./package-lock.json ./angular.json ./tsconfig.json ./tslint.json ./src .browserslistrc ./
RUN npm install
RUN npm install -g @angular/cli
RUN ng build --configuration production --output-path=/dist

FROM nginx:alpine
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /dist /usr/share/nginx/html

EXPOSE 4200 80
CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]
