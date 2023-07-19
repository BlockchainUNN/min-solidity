const { network } = require("hardhat")
const { verify } = require("../utils/verify")
require("dotenv").config()

module.exports = async({ getNamedAccounts, deployments }) => {
    const { deploy } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    const ERC20 = await deploy("TOKEN", {
        from: deployer,
        args: [
            "MIN-STARKNET",
            "MST",
            1000,
            '0xdC5f4f0bE199443BbFa0796B414710ecF492b36f'
        ],
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    if (chainId != 31337 && process.env.ETHERSCAN_API_KEY) {
        await verify(
            ERC20.address, 
            [
                "MIN-STARKNET",
                "MST",
                1000,
                '0xdC5f4f0bE199443BbFa0796B414710ecF492b36f'
            ],
            "contracts/min_erc20/ERC20.sol:TOKEN",
        )
    }
}

module.exports.tags = ["all", "erc20"]
