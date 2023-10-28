# Node packages installation stage
FROM node@sha256:fdf5490bb2e1aba61297901bbe55d39202a6d9f18913bfb4a37466f8b728a44e AS build

WORKDIR /app
COPY ./package*.json .
RUN npm i
COPY . .
RUN npm run build

# New stage for production to secure the image
FROM node@sha256:fdf5490bb2e1aba61297901bbe55d39202a6d9f18913bfb4a37466f8b728a44e AS deploy

# Environment variables
ENV DB_HOST='localhost'
ENV DB_PORT='3306'
ENV DB_USER='root'
ENV DB_PASSWORD='root'
ENV DB_NAME='todo'
ENV DEV='false'

WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/scripts/entrypoint.sh ./entrypoint.sh

ENTRYPOINT [ "./entrypoint.sh" ]
CMD ["node", "dist/main.js"]

EXPOSE 3000