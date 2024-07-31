# Use an official Node runtime as the base image
FROM node:20.16.0

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# The app binds to port 3000 by default
EXPOSE 3000

# Run the app using npm start
CMD ["npm", "start"]