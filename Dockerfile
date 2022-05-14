FROM node:16.13.1-alpine
WORKDIR /chuoicuahangvai-admin
COPY . .
RUN npm install
RUN npm run build
RUN npm install -g serve
RUN npm install -g pm2
CMD ["pm2-runtime", "start", "ecosystems.config.js"]
