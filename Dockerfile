# pull official base image
FROM node:12.10.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
RUN npm install
RUN npm install react-scripts@3.4.1 -g
# add app
COPY . ./


# Building app
RUN npm run build

# Running the app
CMD [ "npm", "start" ]