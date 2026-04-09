# Frontend Dockerfile - Multi-stage build
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/build ./build

EXPOSE 3000

ENV REACT_APP_API_URL=http://localhost:5000/api

CMD ["serve", "-s", "build", "-l", "3000"]
