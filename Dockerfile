FROM node:10.16.0

WORKDIR /app

COPY . ./

CMD [ "yarn", "start" ]

EXPOSE 3333