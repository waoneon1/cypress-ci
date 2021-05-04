FROM node:lts-alpine as build-stage

WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM build-stage as source
ENV NUXT_ENV_RRS_APP_TITLE='RRS | Relative Ranking System'
COPY --chown=node:node . .
RUN npx nuxt build  

########################
# production stage 
########################
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
RUN mkdir /usr/share/nginx/log
COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]