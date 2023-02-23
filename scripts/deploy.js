// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the

// global scope, and execute the script.
const main = async () => {
  const domainContractFactory = await ethers.getContractFactory("Domains");
  const domainContract = await domainContractFactory.deploy("sarkar");
  await domainContract.deployed();
  
  console.log("Contract Deployed to : ", domainContract.address);
  
  
  let txn = await domainContract.register("adhrit", {value : ethers.utils.parseEther('0.1')});
  await txn.wait()
  console.log("Minted domain adhrit.sarkar");

  txn = await domainContract.setRecord("adhrit", "Created this domain on  my own name");
  await txn.wait();
  console.log("Set record for adhrit.sarkar");

  const address = await domainContract.getAddress("adhrit");
  console.log("Owner of domain adhrit : ", address);

  const balance = await ethers.provider.getBalance(domainContract.address);

  console.log("Contract balance : ", ethers.utils.formatEther(balance))
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error){
    console.log(error);
    process.exit(1);
  }
}

runMain();