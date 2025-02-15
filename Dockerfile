FROM node
WORKDIR /app
# COPY package.json /app   is same as COPY package.json .
# it means copy package.json into /app
COPY package.json /app
RUN npm install
COPY .  /app
EXPOSE 5000
CMD ["node", "index.js"]
