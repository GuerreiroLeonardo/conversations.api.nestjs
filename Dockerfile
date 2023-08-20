FROM node:18.12.1-alpine AS build

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

WORKDIR /usr/src/app

COPY package*.json ./

# ARG BASE64_ENCODED_PERSONAL_ACCESS_TOKEN

RUN npm ci

COPY . .
RUN npm run build

# ---- RELEASE ---- #
FROM node:18.12.1-alpine AS release


RUN apk update && apk add --no-cache chromium
ENV PUPPETEER_EXECUTABLE_PATH=/usr/lib/chromium/chrome

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/node_modules/ ./node_modules
COPY --from=build /usr/src/app/dist/ ./dist
EXPOSE 80
# ENV APP_PORT=8080
CMD ["npm", "run", "start:prod"]