FROM ubuntu:16.04
RUN apt-get update
#RUN apt-get install nodejs
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get install -y nodejs
RUN apt-get install -y build-essential
RUN mkdir /var/screenshot
RUN mkdir /var/screenshot/shots
COPY ./package.json /var/screenshot/package.json
COPY ./src/server.js /var/screenshot/src/server.js
RUN cd /var/screenshot/ && npm install && node ./src/server.js
