FROM oven/bun:latest

mkdir -p /app

COPY . /app

WORKDIR /app

RUN bun install

RUN bun run build

CMD ["bun", ".output/server/index.mjs"]