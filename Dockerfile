FROM oven/bun:1-alpine AS builder
WORKDIR /app
# Install build dependencies for native modules
RUN apk add --no-cache python3 make g++
COPY package.json bun.lock .npmrc ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run postinstall
RUN bun run build

FROM oven/bun:1-alpine AS runner
WORKDIR /app
# Install only essential runtime dependencies
RUN apk add --no-cache curl
COPY --from=builder /app/.output ./
ENV NODE_ENV=production \
    PORT=3000 \
    HOST=0.0.0.0

EXPOSE 3000

CMD ["bun", "/app/server/index.mjs"]