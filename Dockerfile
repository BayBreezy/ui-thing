# syntax=docker/dockerfile:1.7

# Build: Node (Nuxt needs >=24.13.1, see package.json "engines") + Bun (installs deps, matches
# "packageManager"). Runtime: Node + the self-contained `.output` only.
ARG NODE_VERSION=24
ARG BUN_VERSION=1.4.0

FROM oven/bun:${BUN_VERSION} AS bun

# ---------------------------------------------------------------------------------------------
# deps: only re-runs when package.json / bun.lock change. Scripts are skipped here because the
# `postinstall` (`nuxt prepare`) needs the app source; they run in the build stage instead.
# ---------------------------------------------------------------------------------------------
FROM node:${NODE_VERSION}-bookworm-slim AS deps
WORKDIR /app
COPY --from=bun /usr/local/bin/bun /usr/local/bin/bun
RUN ln -s /usr/local/bin/bun /usr/local/bin/bunx
ENV HUSKY=0 CI=true
COPY package.json bun.lock ./
RUN --mount=type=cache,target=/root/.bun/install/cache \
    bun install --frozen-lockfile --ignore-scripts

# ---------------------------------------------------------------------------------------------
# build
# ---------------------------------------------------------------------------------------------
FROM deps AS build
# Build-time env (Coolify passes these as build args). They only live in this stage, not in the
# final image, so secrets don't end up in the shipped image's history.
ARG PUBLIC_URL
ARG GA_ID
ARG NUXT_OG_IMAGE_SECRET
ENV PUBLIC_URL=$PUBLIC_URL GA_ID=$GA_ID NUXT_OG_IMAGE_SECRET=$NUXT_OG_IMAGE_SECRET

COPY . .
# Run the trusted lifecycle scripts (vue-demi, sharp, ...) and `nuxt prepare` now that the source
# is here. Fast: everything is already linked from the layer above.
RUN --mount=type=cache,target=/root/.bun/install/cache \
    bun install --frozen-lockfile

# The Nuxt/Nitro build cache and Nuxt Content's parse cache survive between deploys.
RUN --mount=type=cache,target=/app/node_modules/.cache \
    --mount=type=cache,target=/app/.data \
    bun run build

# ---------------------------------------------------------------------------------------------
# runtime
# ---------------------------------------------------------------------------------------------
FROM node:${NODE_VERSION}-bookworm-slim AS runtime
# curl is what Coolify's container healthcheck uses.
RUN apt-get update \
    && apt-get install -y --no-install-recommends curl ca-certificates \
    && rm -rf /var/lib/apt/lists/*

ENV NODE_ENV=production HOST=0.0.0.0 PORT=3000
WORKDIR /app
# Nuxt Content creates its sqlite file under .data at startup.
RUN mkdir -p /app/.data && chown -R node:node /app
COPY --from=build --chown=node:node /app/.output ./.output

USER node
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
