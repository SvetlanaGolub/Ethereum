const { expect } = require("chai");

describe("Token contract", function () {
  let totalSupply = '10000000000000000000'; // 10000 * 1e18
  let Token;
  let hardhatToken;
  let owner;
  let addr1;
  let addr2;
  let addrs;
  let count = 5;

  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    Token = await ethers.getContractFactory("Token");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    hardhatToken = await Token.deploy(totalSupply);
  });

  // You can nest describe calls to create subsections.
  
  describe("Test remove function", function() { 
   
     it("Checking the removal of an element", async function () {
       expect((await hardhatToken.getArray())).to.have.lengthOf(1);
       await hardhatToken.removeFromArray(0);
       expect((await hardhatToken.getArray())).to.be.empty;
     });
     
     for (let indexToRemove = 0; indexToRemove < count + 1; indexToRemove++) {
       const desc = "Checking the correctness of the removal of the element at index " + indexToRemove;
       it(desc, async function () {
         // Setup data
         var arr = [];
         for (let i = 1; i <= count; i++) {
           await hardhatToken.pushToArray(100 + i);
         }
         for (let i = 0; i <= count; i++) {
           arr.push((await hardhatToken.getArray())[i]);
         }
         arr.splice(indexToRemove, 1);
         // Get element to remove
         elementToRemove = (await hardhatToken.getArray())[indexToRemove];
         // Check length
         expect((await hardhatToken.getArray())).to.have.lengthOf(count + 1);
         // Remove element
         await hardhatToken.removeFromArray(indexToRemove);
         // Check length again
         expect((await hardhatToken.getArray())).to.have.lengthOf(count);
         // Check that correct element has been removed
         expect((await hardhatToken.getArray())).to.not.include(elementToRemove);
         // Check order and existence of other elements
         expect((await hardhatToken.getArray())).to.eql(arr);
       });
     }
     
     it("Checking the correctness of the deletion from empty array", async function () {
       expect((await hardhatToken.getArray())).to.have.lengthOf(1);
       await hardhatToken.removeFromArray(0);
       expect((await hardhatToken.getArray())).to.be.empty;
       await hardhatToken.removeFromArray(0);
     });
     
     it("Checking the correctness of the deletion with wrong index", async function () {
       expect((await hardhatToken.getArray())).to.have.lengthOf(1);
       await hardhatToken.removeFromArray(100);
       expect((await hardhatToken.getArray())).to.have.lengthOf(1);
     });
   });
 });
