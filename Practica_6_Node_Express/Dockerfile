# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Install app dependencies
RUN npm install

# Copy the application files to the working directory
COPY src /usr/src/app/

# Expose the port that the app will run on
EXPOSE 3000

# Define the command to run your application
CMD ["node", "app.js"]
