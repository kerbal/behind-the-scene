FROM node:lts-alpine as build

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app 
COPY yarn.lock /app
RUN yarn
COPY . .
RUN yarn build

FROM build as development
EXPOSE 3000
CMD [ "yarn","dev"]

FROM build as development-debug
EXPOSE 3000
CMD [ "yarn","start:debug"]

FROM node:lts-alpine as production
RUN mkdir -p /app
WORKDIR /app

COPY package.json /app 
COPY yarn.lock /app
RUN yarn

COPY --from=build /app/dist ./dist
CMD [ "yarn","start:prod"]