FROM node:24-alpine3.22 AS builder

# Include data
WORKDIR /app
COPY . .

# Build app
RUN npm install
RUN npm run build

# Prep database
RUN npx drizzle-kit push

# Run app
EXPOSE 4173
CMD [ "npm", "run", "preview", "--", "--host" ]