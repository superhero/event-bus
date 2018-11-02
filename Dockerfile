FROM node:10.5-jessie

ENV DEBIAN_FRONTEND noninteractive
ENV HTTP_PORT 18200

COPY package.json /opt/event-bus/package.json
COPY src          /opt/event-bus/src

WORKDIR /opt/event-bus

RUN npm install --production

RUN ln -snf /usr/share/zoneinfo/Europe/Madrid /etc/localtime && echo "Europe/Madrid" > /etc/timezone

CMD [ "npm", "start" ]
