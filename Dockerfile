# Builds a Docker to deliver build/prod/
FROM nginx:latest
COPY build/prod/ /usr/share/nginx/html
