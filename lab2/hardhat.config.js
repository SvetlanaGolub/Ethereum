/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-ethers")
require("@nomicfoundation/hardhat-chai-matchers")
require("dotenv").config();
const { API_URL, PRIVATE_KEY } = process.env;
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: { 
    },
    sepolia: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  },
  solidity: "0.8.17",
};
