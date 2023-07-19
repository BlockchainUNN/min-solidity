const { run } = require("hardhat")

const verify = async (contractAddress, args, contract) => {
    console.log("verifying contract...")

    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
            contract: contract,
        },
        )
    }
    catch (e) {
        if(e.message.toLowerCase().includes("already verified")) {
            console.log("Already verified")
        }
        else {
            console.log(e)
        }
    }
}

module.exports = {
    verify
}