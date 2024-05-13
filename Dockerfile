FROM node:18.12-alpine3.16 AS base

COPY . /app
WORKDIR /app

FROM base AS prod-deps
RUN npm install --prod

FROM base AS build
RUN npm install
RUN npm run build

FROM base
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist
COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/prisma /app/prisma
COPY --from=build /app/.env.dev /app/.env.dev
COPY --from=build /app/.env.prod /app/.env.prod

EXPOSE 5010
CMD [ "npm", "start" ]
