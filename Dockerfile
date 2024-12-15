# Use the official Node.js image from the Docker Hub
FROM node:latest

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the NestJS application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3333

# Define the command to run the app
CMD ["npm", "run", "start:prod"]