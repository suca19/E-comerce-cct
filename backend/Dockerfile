FROM node:22-alpine

WORKDIR /app

# Run as the built-in "node" user (uid 1000) instead of root:
# safer, and files created from the container belong to you on the host.
RUN chown node:node /app
USER node

# Install dependencies first so Docker can cache this layer
COPY --chown=node:node package*.json ./
RUN npm ci

COPY --chown=node:node . .

EXPOSE 5001
CMD ["npm", "start"]
