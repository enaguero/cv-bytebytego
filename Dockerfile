# syntax=docker/dockerfile:1.7

# -------- 1. deps: install full deps with cache mounts -----------------------
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci

# -------- 2. builder: build the Astro app ------------------------------------
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# -------- 3. prod-deps: prune to production deps -----------------------------
FROM node:22-alpine AS prod-deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

# -------- 4. runtime: minimal image, non-root, runs the Node server ----------
FROM node:22-alpine AS runtime
WORKDIR /app

# Drop privileges
RUN addgroup -S app && adduser -S app -G app

ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=4321

# Curl for healthcheck (8 KB on alpine)
RUN apk add --no-cache curl

COPY --from=prod-deps --chown=app:app /app/node_modules ./node_modules
COPY --from=builder --chown=app:app /app/dist ./dist
COPY --chown=app:app package.json ./

USER app
EXPOSE 4321

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD curl -fsS http://localhost:4321/ > /dev/null || exit 1

CMD ["node", "./dist/server/entry.mjs"]
