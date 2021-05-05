FROM node:lts-alpine as build-stage

ARG NUXT_ENV_RRS_APP_TITLE=“”
ARG NUXT_ENV_RRS_API_URL=“”
ARG NUXT_ENV_RRS_GAUTH_CLIENTID=“”

WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

########################
# production stage 
########################
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
RUN mkdir /usr/share/nginx/log
COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]