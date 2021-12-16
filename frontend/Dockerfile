FROM node:14-alpine
ENV NODE_ENV development

# Add a work directory
WORKDIR /app

# Install dependencies
COPY package.json .
RUN npm install

# Copy app files
COPY . .