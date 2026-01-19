# LTS Node.js version
FROM node:22-alpine

# Add pnpm globally
RUN npm install -g pnpm

# Create application directory
WORKDIR /usr/src/app

# Copy package.json and pnpm-lock.yaml files
COPY package.json ./

# Install dependencies (frozen-lockfile locks the versions)
RUN pnpm install 

# Copy application code
COPY . .

# Build NestJS application
RUN pnpm run build

# Expose port
EXPOSE 3333

# Start application
CMD ["pnpm", "run", "start:prod"]