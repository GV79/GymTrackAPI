FROM node:14.11.0-alpine
LABEL AUTHOR gv79

WORKDIR /app

COPY package*.json /app/
RUN npm install

COPY . .

EXPOSE 3030
CMD [ "npm", "start" ]