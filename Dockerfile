FROM node:16.13.2

COPY ./ /src/hardhat
WORKDIR /src/hardhat
RUN npm install
RUN npm install --save-dev "@nomiclabs/hardhat-ethers@^2.0.0" "ethers@^5.0.0" "ethereum-waffle@^3.2.0"
RUN npm install --save-dev hardhat
CMD ["npx","hardhat","node", "--hostname", "0.0.0.0"]
EXPOSE 8545
