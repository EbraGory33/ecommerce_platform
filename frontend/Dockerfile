# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json /app/
RUN npm install

# Copy the React app code
COPY . /app/

# Build the React app
RUN npm run build

# Use serve to serve the static files
RUN npm install -g serve
CMD ["serve", "-s", "build"]

# Expose the port for the React app
EXPOSE 3000

