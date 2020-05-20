FROM node:14.2.0-alpine3.10
WORKDIR /home/facsimile/yactschedulerdock/
COPY package*.json ./
RUN npm install
COPY . .
#EXPOSE 8080
CMD [ "node", "src/schedule.js" ]
