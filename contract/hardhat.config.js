require('dotenv').config();
require('@nomiclabs/hardhat-ethers');
require('@nomiclabs/hardhat-waffle');
require('@metis.io/hardhat-mvm');
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
			gasPrice: 15000000,
			ovm: true,
		},
	},

	solidity: {
		version: '0.7.6',
	},

	ovm: {
		solcVersion: '0.7.6+commit.3b061308', // Currently, we only support 0.5.16, 0.6.12, and 0.7.6 of the Solidity compiler
		optimizer: true,
		runs: 20,
	},
	namedAccounts: {
		deployer: 0,
	},
};
