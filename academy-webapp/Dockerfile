FROM node:24-alpine3.22 AS builder

WORKDIR /app
COPY . .
RUN npm install
# RUN npm run build

EXPOSE 4173

CMD [ "npm", "run", "preview", "--", "--host" ]