FROM node:16.13.2

COPY ./ /src/hardhat
WORKDIR /src/hardhat
RUN npm install
CMD ["npm","run","start"]
EXPOSE 8545
