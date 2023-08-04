# Use a specific version of Node.js
FROM node:19.8.1-alpine

# Set the working directory
WORKDIR /app

# Copy the app files into the image
COPY . /app

# Install dependencies
RUN npm install -g nodemon
RUN npm install

# Expose the port the app runs on
EXPOSE 8080

# Command to run the app
CMD npm run dev