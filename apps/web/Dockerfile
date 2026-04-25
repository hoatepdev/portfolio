# =========================
# Base stage - installs pnpm
# =========================
FROM node:22-alpine AS base
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10.11.0 --activate

# =========================
# Build stage
# =========================
FROM base AS build
WORKDIR /app

# Increase memory for build
ENV NODE_OPTIONS=--max-old-space-size=2048

# Copy package manifests for efficient caching
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json turbo.json ./
COPY apps/web/package.json ./apps/web/
COPY packages/ui/package.json ./packages/ui/
COPY packages/eslint-config/package.json ./packages/eslint-config/
COPY packages/typescript-config/package.json ./packages/typescript-config/

# Install ALL dependencies (dev deps needed for build)
# Do NOT set NODE_ENV=production here - it would skip devDependencies needed for the build
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

# Copy source code (only what passes .dockerignore)
COPY . .

# Build the application
# Set NODE_ENV=production only for the build step
ENV NODE_ENV=production
RUN --mount=type=cache,id=turbo,target=/app/.turbo \
    pnpm exec turbo run build --filter=apps-web...

# =========================
# Runner stage - minimal production image
# =========================
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NODE_OPTIONS=--max-old-space-size=1024
ENV PORT=4000

# Security: run as non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy standalone output (contains minimal node_modules + server.js)
COPY --from=build --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=build --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public
COPY --from=build --chown=nextjs:nodejs /app/apps/web/src/contents ./apps/web/src/contents

USER nextjs
EXPOSE 4000

# Run with node.js directly (no pnpm needed)
CMD ["node", "apps/web/server.js"]
