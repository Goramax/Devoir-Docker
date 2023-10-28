#!/bin/sh

if [ ! -f .env ]; then
    echo "DB_HOST=$DB_HOST\nDB_PORT=$DB_PORT\nDB_USER=$DB_USER\nDB_PASSWORD=$DB_PASSWORD\nDB_NAME=$DB_NAME\nDEV=$DEV" > .env
fi

node dist/main.js