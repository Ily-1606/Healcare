
# Healcare Covid

App blockchain về covid-19

## Run online website
https://healcare.ily1606.online/

### List accounts:

Account #0: 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266 (10000 ETH)

Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80


Account #1: 0x70997970c51812dc3a010c7d01b50e0d17dc79c8 (10000 ETH)

Private Key: 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d

### Config:
URL RPC: http://3.1.222.109:8545

Mã chuỗi: 31337

## Run Locally

Clone the project

```bash
   git clone https://github.com/Ily-1606/Healcare.git
```

Go to the project directory

```bash
  cd Healcare
```

Install dependencies

```bash
  npm install
```

Start hardhat

```bash
  npm run start
```

Deploy smart contract, and get ADDRESS SMART CONTRACT

```bash
  npm run deploy
```

Copy .env file to .env.local

In .env.local, replace VITE_ADDRESS_SMARTCONTRACT to ADDRESS SMART CONTRACT

Start the server

```bash
  npm run dev
```
