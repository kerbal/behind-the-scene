FROM node:lts-alpine as build

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app 
COPY yarn.lock /app
RUN yarn
RUN yarn global add @vue/cli
COPY . .
RUN yarn build

FROM build as development

EXPOSE 8080
CMD [ "yarn","serve"]

FROM nginx:stable-alpine as production
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]