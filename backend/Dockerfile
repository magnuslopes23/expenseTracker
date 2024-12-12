# Use Node.js base image
FROM node:16-alpine

# Set the working directory
WORKDIR /app

FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
