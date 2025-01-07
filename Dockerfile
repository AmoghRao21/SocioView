# Step 1: Use the official Node.js image as the base image
FROM node:16

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Step 4: Install the app dependencies
RUN npm ci

# Step 5: Copy the rest of your application files into the container
COPY . .

# Step 6: Expose the port that your backend will run on (e.g., port 3000)
EXPOSE 3000

# Step 7: Define the command to start your backend application
CMD ["npm", "start"]
