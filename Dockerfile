FROM node:14
EXPOSE 80
WORKDIR /home/node/
RUN apt-get update

RUN npm init -y
RUN npm install --save express cookie-parser body-parser express-session ejs
COPY . .

CMD ["node","/home/node/app.js"]


#docker build -t discord:1.0.3 .
#sudo docker container run -d --name Docker-Discord-Bot discord:1.0.3
