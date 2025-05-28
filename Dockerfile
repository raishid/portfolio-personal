FROM oven/bun:1.2-debian

#INSTALL PYTHON

RUN apt-get update && \
    apt-get install -y python3 python3-pip && \
    rm -rf /var/lib/apt/lists/*

RUN mkdir -p /app

COPY . /app

WORKDIR /app

RUN bun install

RUN bun run build

CMD ["bun", ".output/server/index.mjs"]