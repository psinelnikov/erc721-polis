# ERC-721 Polis Demo

## What you Need

-   [Nodejs](https://nodejs.org/en/)
-   [Yarn](https://yarnpkg.com/getting-started/install/)
-   [Hardhat](https://hardhat.org/)

## Before You Start

In the root folder: `yarn install`

## Information

There are 3 example.env files that need to be changed to `.env`:

-   `/contract/example.env` - Add your `PRIVATE_KEY` from your metis account
-   `/server/example.env` - Add the `APP_ID` and `APP_SECRET` located on the Polis dashboard under Application Management
-   `/client/example.env`- Add the `APP_ID`, `CONTRACT_NAME`, and `CHAIN_ID` located on the Polis dashboard under Application Management and Domain Information section

| Command       | Purpose                                            |
| ------------- | -------------------------------------------------- |
| `yarn metis`  | Compiles and deploys the `CryptoDevs.sol` contract |
| `yarn client` | Starts the React frontend                          |
| `yarn server` | Starts the authentication backend                  |
