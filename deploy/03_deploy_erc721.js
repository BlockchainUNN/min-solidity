const { network } = require("hardhat")
const { verify } = require("../utils/verify")
require("dotenv").config()

module.exports = async({ getNamedAccounts, deployments }) => {
    const { deployer } = await getNamedAccounts()
    const { deploy } = deployments
    const chainId = network.config.chainId

    const NFTContract = await deploy("MYNFT", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    if(chainId != 31337 && process.env.ETHERSCAN_API_KEY) [
        await verify(
            NFTContract.address,
            [],
            "contracts/min_erc721/MYNFT.sol:MYNFT",
        )
    ]
}

module.exports.tags = ["all", "nft"]