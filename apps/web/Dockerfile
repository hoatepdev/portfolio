FROM node:20-alpine AS base
WORKDIR /app
ENV NODE_ENV=production

# Set max memory for Node.js
ENV NODE_OPTIONS=--max-old-space-size=1536

# Install pnpm
RUN corepack enable && corepack prepare pnpm@10.11.0 --activate

# Install dependencies and build in a separate layer
FROM base AS build
WORKDIR /app

# Copy only the lockfile and package manifests for efficient caching
COPY pnpm-workspace.yaml ./
COPY pnpm-lock.yaml package.json ./
COPY apps/web/package.json ./apps/web/package.json
COPY packages/ui/package.json ./packages/ui/package.json
COPY packages/eslint-config/package.json ./packages/eslint-config/package.json
COPY packages/typescript-config/package.json ./packages/typescript-config/package.json
# Copy turbo config
COPY turbo.json ./

# Install dependencies (monorepo)
RUN pnpm install --frozen-lockfile

# Copy the rest of the repo
COPY . .

RUN pnpm add -g turbo
# Build the web app
RUN turbo build --filter=apps-web...

# Production image, copy only necessary files
FROM base AS runner
WORKDIR /app

# Copy built app and node_modules from build stage
COPY --from=build /app/apps/web/.next ./apps/web/.next
COPY --from=build /app/apps/web/public ./apps/web/public
COPY --from=build /app/apps/web/package.json ./apps/web/package.json
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/apps/web/node_modules ./apps/web/node_modules
COPY --from=build /app/apps/web/src/contents ./apps/web/src/contents

# Set environment variables (override at runtime as needed)
ENV PORT=3000
EXPOSE 3000

CMD ["pnpm", "--filter", "apps-web", "start"]
