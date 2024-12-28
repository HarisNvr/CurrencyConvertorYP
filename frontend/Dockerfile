FROM node:18-slim
WORKDIR /app
COPY ./package.json .
COPY ./package-lock.json .
RUN npm install
COPY . .
RUN npm run build
CMD cp -r dist result_build