FROM node:24-alpine AS builder
WORKDIR /app
RUN corepack enable
# Install build dependencies for native modules
RUN apk add --no-cache python3 make g++
COPY package.json package-lock.json .npmrc ./
RUN npm ci
RUN npm rebuild
COPY . .
RUN npm run postinstall
RUN npm run build

FROM node:24-alpine AS runner
WORKDIR /app
# Install runtime dependencies for better-sqlite3 and curl for health checks
RUN apk add --no-cache sqlite curl
COPY --from=builder /app/.output ./
ENV PORT=3000
ENV HOST=0.0.0.0

EXPOSE 3000

CMD ["node", "/app/server/index.mjs"]