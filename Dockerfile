# Usage (given build times depend on machine):
#
#    Build SMALL image (no cache; ~20MB, time for build=rebuild = ~360s):
#    docker build --squash="true" -t angular-starter .
#
#    Build FAST (rebuild) image (cache; >280MB, build time ~360s, rebuild time ~80s):
#    docker build -t angular-starter .
#
#    Clean (remove intermidiet images):
#    docker rmi -f $(docker images -f "dangling=true" -q)
#
#    Run image (on localhost:8080):
#    docker run --name angular-starter -p 8080:80 angular-starter &
#
#    Run image as virtual host (read more: https://github.com/jwilder/nginx-proxy):
#    docker run -e VIRTUAL_HOST=angular-starter.your-domain.com --name angular-starter angular-starter &

FROM nginx:1.13.0-alpine

# overwrite the nginx default.conf, e.g. for 'X-Forwarded-For' and 'real_ip'
#COPY config/nginx/default.conf /etc/nginx/conf.d/default.conf

# build in /tmp npm (in separate dir due to docker cache)
ADD . /tmp

# install npm (in separate dir due to docker cache)
ADD package.json /tmp/package.json

# minimize docker image size by combining into a single run statement
RUN apk add --no-cache bash && \
    apk add --no-cache openssl && \
    apk add --no-cache nodejs && \

    # do everything in the tmp directory
    cd /tmp && \

    # install packages
    npm install && \

    # build and publish application
    npm run build:aot && \
    mv ./dist/* /usr/share/nginx/html && \

    # clean
    rm -Rf /tmp  && \
    rm -Rf /root/.npm && \
    apk del nodejs bash openssl

# this is for virtual host purposes
EXPOSE 80
