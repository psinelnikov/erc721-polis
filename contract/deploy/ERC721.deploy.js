// Just a standard hardhat-deploy deployment definition file!
const func = async (hre) => {
	const { deployments, getNamedAccounts } = hre;
	const { deploy } = deployments;
	const { deployer } = await getNamedAccounts();

	const name = 'CryptoDevs';
	const symbol = 'DEV';
	const supply = 10;

	await deploy('CryptoDevs', {
		from: deployer,
		args: [name, symbol, supply],
		log: true,
	});
};

func.tags = ['CryptoDevs'];
module.exports = func;
