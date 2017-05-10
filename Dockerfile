# Builds a Docker to deliver dist/
FROM nginx:alpine
COPY dist/ /usr/share/nginx/html
