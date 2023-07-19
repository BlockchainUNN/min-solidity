const { network } = require("hardhat");
const { verify }  = require("../utils/verify");
require("dotenv").config();

module.exports = async({ getNamedAccounts, deployments }) => {
    const { deploy } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    const ENS = await deploy("ENS", {
        from: deployer,
        args: ['0xdC5f4f0bE199443BbFa0796B414710ecF492b36f', "Darlington"],
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    if(chainId != 31337 && process.env.ETHERSCAN_API_KEY) {
        await verify(ENS.address, ['0xdC5f4f0bE199443BbFa0796B414710ecF492b36f', "Darlington"], 'contracts/min_ens/ENS.sol:ENS')
    } 
}

module.exports.tags = ["all", "ens"]