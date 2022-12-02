// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
	// Структура данных произвольного названия
	struct MyStruct {
		// логический
		bool myBool;
		//знаковый целочисленный 
		int myInt;
		//адрес 
		address myAddr;
		//четырехбайтовый
		int32 myBytes;
	}
	
	// массив структур
	MyStruct [] public myStructArray;
	
	int public pole;
	
    constructor(uint256 initialSupply) ERC20("Token", "TKN") {
        _mint(msg.sender, initialSupply);
        pole = 1;
        myStructArray.push(MyStruct({myBool:true, myInt:12, myAddr:address(0x0), myBytes:13}));
        
    }
    
    function getArray() external view returns (MyStruct[] memory a) {
        a = myStructArray;
    }
    
	function pushToArray() public returns(int) {
		MyStruct memory s;
		myStructArray.push(s);
		return 12;
	}
	
	// Удаление структуры с индексом id из массива структур
	function removeFromArray(uint id) public  {
		if (id >= myStructArray.length) return;

		for (uint i = id; i < myStructArray.length-1; i++){
			myStructArray[i] = myStructArray[i+1];
		}	
		
		myStructArray.pop();
	}	
}
