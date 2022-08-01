require('dotenv').config();
require('@nomiclabs/hardhat-ethers');
require('@nomiclabs/hardhat-waffle');
require('hardhat-deploy');

module.exports = {
	networks: {
		hardhat: {
			accounts: {
				mnemonic:
					'test test test test test test test test test test test junk',
			},
		},
		metis: {
			url: process.env.METIS_DEPLOY_URL,
			accounts: [`0x${process.env.PRIVATE_KEY}`],
		},
	},

	solidity: {
		version: '0.7.6',
	},

	namedAccounts: {
		deployer: 0,
	},
};
