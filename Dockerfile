FROM node:20-alpine

RUN apk update && apk add bash sudo

RUN addgroup -g 1001 appgroup && adduser -D -u 1001 -G appgroup appuser

WORKDIR /usr/src/app

COPY --chown=appuser:appgroup package.json package-lock.json* ./

RUN npm install

COPY --chown=appuser:appgroup . .

USER appuser

EXPOSE 3003

CMD ["npm", "run", "start:dev"]