# Use the official Node.js image as the base
FROM node:14

# Set the working directory inside the Docker image
WORKDIR /app/articles-challenge-frontend

# Copy package.json and package-lock.json to the Docker image
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire app code to the Docker image
COPY . .

# Build the Vite React app
RUN npm run build

# Expose the port your app listens on (change this if necessary)
EXPOSE 3000

# Specify the command to run the app
CMD ["npm", "run", "serve"]
