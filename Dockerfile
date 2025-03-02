FROM imbios/bun-node AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

FROM base AS dependencies
COPY package.json bun.lockb tsconfig.json bunfig.toml ./
RUN bun install --frozen-lockfile

FROM base AS builder

ARG VERSION
ENV NEXT_PUBLIC_VERSION=$VERSION
ARG SHA
ENV NEXT_PUBLIC_SHA=$SHA

COPY --from=dependencies /app/node_modules ./node_modules
# we need to generate prisma files before building to prevent type errors
COPY ./prisma/migrations ./prisma/migrations/
COPY ./prisma/schema.prisma ./prisma/schema.prisma
RUN bunx prisma generate
COPY . .
RUN bun run build

FROM base AS runner
ENV NODE_ENV=production

COPY --from=builder /app/public ./public

COPY --from=builder --chown=bun:bun /app/.next/standalone ./
COPY --from=builder --chown=bun:bun /app/.next/static ./.next/static
COPY --from=builder --chown=bun:bun /app/prisma ./prisma/

USER bun

EXPOSE 3000

ENV PORT=3000

ENV HOSTNAME="0.0.0.0"
CMD bunx prisma migrate deploy && bun ./server.js