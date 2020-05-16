FROM node:10
WORKDIR /home/facsimile/yactschedulerdock/
COPY package*.json ./
RUN npm install
COPY . .
#EXPOSE 8080
CMD [ "node", "src/schedule.js" ]
