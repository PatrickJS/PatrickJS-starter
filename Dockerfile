# Builds a Docker to deliver dist/
# Alternatively, use nginx:alpine for a smaller image
FROM nginx:latest
COPY dist/ /usr/share/nginx/html
