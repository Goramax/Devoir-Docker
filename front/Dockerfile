# Node packages installation stage
FROM node@sha256:fdf5490bb2e1aba61297901bbe55d39202a6d9f18913bfb4a37466f8b728a44e AS build

# Environment variables
ENV API_URL='API_URL'

WORKDIR /app
COPY ./package*.json .
RUN npm i && echo "VITE_API_URL=${API_URL}" > .env
COPY . .
RUN npm run build

# App deployment stage with nginx
FROM nginx@sha256:e3dd8f3abfcc0450c96d61b58c3e05b3b4fdeb0680c155aa3246f9be4b80343a AS deploy

WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist .
COPY --from=build /app/scripts/entrypoint.sh ./entrypoint.sh

ENTRYPOINT [ "./entrypoint.sh" ]

CMD ["nginx", "-g", "daemon off;"]

EXPOSE 80