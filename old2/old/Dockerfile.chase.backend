# Builds an image to run the api in prod mode

# install dependencies into temp directory
# this will cache them and speed up future builds
FROM oven/bun:latest AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
COPY chase/backend/package.json /temp/dev/chase/backend/package.json
COPY chase/frontend/package.json /temp/dev/chase/frontend/package.json
RUN cd /temp/dev && bun install --frozen-lockfile

# since we bundle we dont really need the dependencies in the prod version
# install with --production (exclude devDependencies)
# RUN mkdir -p /temp/prod
# COPY package.json bun.lockb /temp/prod/
# RUN cd /temp/prod && bun install --frozen-lockfile --production

# we need to use node and bun for generating prisma files, see https://github.com/prisma/prisma/issues/21241
FROM imbios/bun-node AS builder
WORKDIR /app/staging
COPY --from=install /temp/dev/node_modules node_modules
COPY chase/backend chase/backend/
# generates types and runs a typecheck
RUN cd chase/backend && bun run typecheck
RUN cd chase/backend && bun run build

FROM oven/bun:latest AS release
WORKDIR /app/prod
COPY --from=builder /app/staging/chase/backend/out .
# we need the generated prisma files at runtime since it contains the prisma engine
COPY --from=builder /app/staging/chase/backend/prisma ./prisma/
ENV NODE_ENV=production
ENV PORT=3001
# run the app
USER bun
EXPOSE 3001/tcp
ENTRYPOINT [ "bun", "main.js", "--smol" ]
