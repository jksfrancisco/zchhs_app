# app/Dockerfile

FROM node:18-alpine

WORKDIR /app

# Copy only package files first (for layer caching)
COPY src/package.json src/yarn.lock ./ 

# Install dependencies
# RUN yarn install --frozen-lockfile

# Copy all app source files
COPY ./src ./

# Build Next.js app
RUN yarn build

# Expose default Next.js port (3000)
EXPOSE 4203

# Start app
CMD ["yarn", "start"]
