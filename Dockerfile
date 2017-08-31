FROM node

MAINTAINER Oct16 mail@fengfan.me

RUN mkdir -p /home/service
WORKDIR /home/service

COPY . /home/service
CMD [ "node", "./server.js" ]

EXPOSE 3010
