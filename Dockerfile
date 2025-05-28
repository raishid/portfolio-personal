FROM oven/bun:latest

#install nvm
RUN apt-get update && apt-get install -y curl
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

# Set environment variables for nvm
ENV NVM_DIR="/root/.nvm"
ENV NODE_VERSION="18"
ENV PATH="$NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH"

# Install Node.js using nvm
RUN bash -c "source $NVM_DIR/nvm.sh && nvm install $NODE_VERSION && nvm use $NODE_VERSION"

RUN mkdir -p /app

COPY . /app

WORKDIR /app

RUN bun install

RUN bun run build

CMD ["bun", ".output/server/index.mjs"]