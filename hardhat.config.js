require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

const API = process.env.API_URL
const ACCOUNT = process.env.PRIVATE_KEYS
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    mumbai : {
      url: API,
      accounts : [`0x${ACCOUNT}`]
    }
  }
  
};
