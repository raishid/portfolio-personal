FROM oven/bun:1.1.1-alpine

RUN mkdir -p /app

COPY . /app

WORKDIR /app

RUN bun install

RUN bun run build

CMD ["bun", ".output/server/index.mjs"]