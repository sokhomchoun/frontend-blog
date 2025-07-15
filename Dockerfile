# Use official Node.js image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first for caching dependencies
COPY frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app files
COPY frontend/ ./

# Expose Vite dev server port
EXPOSE 5173

# Start Vite in development mode
CMD ["npm", "run", "dev"]
