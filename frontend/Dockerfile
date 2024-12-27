FROM node:18-slim
WORKDIR /app
COPY ./package.json .
COPY ./package-lock.json .
RUN npm install
COPY . . 
ENV VITE_CURRENCY_API_URL=http://localhost:8000/api
# EXPOSE 5173
# CMD ["npm", "run", "dev-exposed"]
RUN npm run build
CMD cp -r dist result_build

