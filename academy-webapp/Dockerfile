FROM node:24-alpine3.22 AS builder

# Include data
WORKDIR /app
COPY . .

# Build app
RUN npm install
# RUN npm run build

# Run app
EXPOSE 4173
CMD [ "npm", "run", "devcontainer" ]
# CMD [ "npm", "run", "container" ]
# CMD [ "npm", "run", "migrate" ]