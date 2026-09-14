FROM node:22-alpine AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

FROM node:22-alpine

WORKDIR /app
COPY --from=build /app/.output ./.output
COPY --from=build /app/package.json ./

ENV PORT=5173
EXPOSE 5173

CMD ["node", ".output/server/index.mjs"]