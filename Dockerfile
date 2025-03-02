FROM imbios/bun-node AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

FROM base AS builder

ARG VERSION
ENV NEXT_PUBLIC_VERSION=$VERSION
ARG SHA
ENV NEXT_PUBLIC_SHA=$SHA

COPY . .
RUN bunx prisma generate
RUN bun run build

FROM base AS runner
ENV NODE_ENV=production

COPY --from=builder --chown=bun:bun /app/public ./public
COPY --from=builder --chown=bun:bun /app/.next/standalone ./
COPY --from=builder --chown=bun:bun /app/.next/static ./.next/static
COPY --from=builder --chown=bun:bun /app/prisma ./prisma/

USER bun

EXPOSE 3000

ENV PORT=3000

ENV HOSTNAME="0.0.0.0"
CMD bunx prisma migrate deploy && bun ./server.js