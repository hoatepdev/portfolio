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

# Install all dependencies; devDependencies are required for the build.
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

# Copy source code (only what passes .dockerignore)
COPY . .

# Build the static export into apps/web/out.
ENV NODE_ENV=production
RUN --mount=type=cache,id=turbo,target=/app/.turbo \
    pnpm exec turbo run build --filter=apps-web...

# =========================
# Runner stage - static server
# =========================
FROM nginx:1.27-alpine AS runner

COPY --from=build /app/apps/web/out /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
