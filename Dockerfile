FROM node:12.18.4-buster-slim

WORKDIR /app

ADD openaz_nodejs ./openaz_nodejs
ADD tools ./tools
ADD types ./types

COPY *.json ./

RUN npm install

ADD src ./src

# RUN npm run build

EXPOSE 3000
CMD npm run start-ts > ./output.log 2>&1

#EXPOSE 5000
#CMD node ./src/docker_debug.js > ./output.log 2>&1
