import hardhat from "hardhat";

const main = async () => {
    // Deploy contracts/DeployedTokenManagement.sol
    const DeployedTokenManagement = await hardhat.ethers.getContractFactory("DeployedTokenManagement");
    const contract = await DeployedTokenManagement.deploy();

    console.log("Deployed to:", contract.target);

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });