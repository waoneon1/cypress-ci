# SPA is not suiteable for web that need SEO

############################
# STEP 1 build static files
# pull official base image
############################
FROM node:12.18-alpine3.12 as builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy and build
# output directory is in dist/ folder
COPY . .
RUN npm run build --spa

############################
# STEP 2 build nginx image
############################
FROM nginx:1.18-alpine as production-stage

COPY --from=builder /app/dist /usr/share/nginx/html

# WIP Running nginx as non-root user
# https://hub.docker.com/_/nginx
# Required add nginx.conf

# Tell docker how the process PID 1 handle gracefully shutdown
# Signal Quit for gracefully shutdown NGINX
# http://nginx.org/en/docs/control.html
STOPSIGNAL SIGQUIT

# Change to port 8000 | 3000
ENV NGINX_PORT=3000
EXPOSE 3000


# There are 2 different method how docker run our program
# Shell form: `CMD command param1 param2` equivalent with 
#             `/bin/sh -c command param1 param2`
# Exec form: `CMD ["command", "param1", "param2"]`
#
# Since shell form running our program inside sh, so the PID 1
# is sh, not our program. Hence, our program never receive stop signal
# So we will use exec form.

# Entrypoint is how docker will execute our program by default
# CMD is the default param and can be replaced by docker params, even though
# we can use it to execute our program.

CMD ["nginx", "-g", "daemon off;"]
