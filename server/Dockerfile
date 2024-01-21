FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the application files to the working directory/container
COPY . .

# Expose the port the app runs on
EXPOSE 3001

# Command to run the application
CMD npm run dev