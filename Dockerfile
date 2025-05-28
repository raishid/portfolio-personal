FROM oven/bun:1.2-debian

RUN mkdir -p /app

COPY . /app

WORKDIR /app

RUN bun install

RUN bun run build

CMD ["bun", ".output/server/index.mjs"]