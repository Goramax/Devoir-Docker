#!/bin/sh

ROOT_DIR=/usr/share/nginx/html

# Replace API_URL by docker env API_URL for every javascript file
for file in $(find $ROOT_DIR -type f -name "*.js"); do
    sed -i "s|API_URL|$API_URL|g" $file
done

nginx -g "daemon off;"