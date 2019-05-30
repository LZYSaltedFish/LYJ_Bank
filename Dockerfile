# Create image based off of the official Node 6 image
FROM s390x/ibmnode:latest

# Create a directory where our app will be placed
RUN mkdir -p /usr/src

ENV NODE_ENV production

## ---- 东八区 ---
ENV TZ Asia/Shanghai

# Change directory so that our commands run inside this new dir
WORKDIR /usr/src

# Copy dependency definitions
COPY package.json /usr/src

# Install dependecies
RUN npm install --production

# Get all the code needed to run the app
COPY . /usr/src

RUN npm run doc

# Expose the port the app runs in
EXPOSE 8080

# Serve the app
CMD ["sh","-c","npm run seed && npm start"]
