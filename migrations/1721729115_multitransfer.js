const Multitransfer = artifacts.require("Multitransfer");

module.exports = async (deployer) => {
  await deployer.deploy(Multitransfer);
  const multiTransfer = await Multitransfer.deployed();

  if (multiTransfer) {
    console.log("Contract initiated successfully");
  } else {
    console.log("Failed to deploy multi transfer");
  }
};
