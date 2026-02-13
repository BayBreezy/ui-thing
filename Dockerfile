FROM oven/bun:latest AS builder
WORKDIR /app
# Install build dependencies for native modules
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*
COPY package.json bun.lock .npmrc ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run postinstall
RUN bun run build

FROM oven/bun:latest AS runner
WORKDIR /app
# Install runtime dependencies for better-sqlite3 and curl for health checks
RUN apt-get update && apt-get install -y sqlite3 curl && rm -rf /var/lib/apt/lists/*
COPY --from=builder /app/.output ./
ENV PORT=3000
ENV HOST=0.0.0.0

EXPOSE 3000

CMD ["bun", "run", "/app/server/index.mjs"]