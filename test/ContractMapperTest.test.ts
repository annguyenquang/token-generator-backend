import Constructor_Dev from "../src/logic/classes/Constructor_Dev";
import ContractBody_Dev from "../src/logic/classes/ContractBody_Dev";
import { Contract_DevBuilder } from "../src/logic/classes/Contract_Dev";
import ModifierCall_Dev from "../src/logic/classes/ModifierCall_Dev";
import ContractMapper from "../src/logic/mappers/ContractMapper";

describe('ContractMapper', () => {
    test('Test the ContractMapper setName() function', () => {
        const contractMapper = new ContractMapper();
        contractMapper.setName("MyToken");
        const contract = contractMapper.getContract();
        expect(contract.name).toBe("MyToken");
    })
    test('Test if the set of Modifier call is working', () => {
        const contractMapper = new ContractMapper();
        contractMapper.setName("Antrium");
        const contract = contractMapper.getContract();
        const expectRes: String = new Contract_DevBuilder()
            .setName("Antrium")
            .setInheritances(["ERC20"])
            .setImports(["@openzeppelin/contracts/token/ERC20/ERC20.sol"])
            .setVersion("^0.8.20")
            .setContractBody(new ContractBody_Dev({
                contractConstructor: new Constructor_Dev({
                    functionBody: "",
                    modifierCallList: [new ModifierCall_Dev({ name: "ERC20", args: ["\"Antrium\"", "\"\""] })]
                })
            }))
            .build().toString();
        console.log(expectRes);
        expect(contract.toString()).toBe(expectRes);

    });
    test('Test if the set of Modifier call is working (call setName 2 times)', () => {
        const contractMapper = new ContractMapper();
        contractMapper.setName("abcxyz");
        contractMapper.setName("Antrium");
        const contract = contractMapper.getContract();
        const expectRes: String = new Contract_DevBuilder()
            .setName("Antrium")
            .setInheritances(["ERC20"])
            .setImports(["@openzeppelin/contracts/token/ERC20/ERC20.sol"])
            .setVersion("^0.8.20")
            .setContractBody(new ContractBody_Dev({
                contractConstructor: new Constructor_Dev({
                    functionBody: "",
                    modifierCallList: [new ModifierCall_Dev({ name: "ERC20", args: ["\"Antrium\"", "\"\""] })]
                })
            }))
            .build().toString();
        expect(contract.toString()).toBe(expectRes);

    });
    test("Test the setSymbol function", () => {
        const contractMapper = new ContractMapper();
        contractMapper.setSymbol("ANT");
        const contract = contractMapper.getContract();
        const expectRes: String = new Contract_DevBuilder()
            .setName("")
            .setInheritances(["ERC20"])
            .setImports(["@openzeppelin/contracts/token/ERC20/ERC20.sol"])
            .setVersion("^0.8.20")
            .setContractBody(new ContractBody_Dev({
                contractConstructor: new Constructor_Dev({
                    functionBody: "",
                    modifierCallList: [new ModifierCall_Dev({ name: "ERC20", args: ["\"\"", "\"ANT\""] })]
                })
            }))
            .build().toString();
        expect(contract.toString()).toBe(expectRes);

    })
    test('Test combine the setName, setSymbol', () => {
        const contract = new ContractMapper().setName("Antrium").setSymbol("ANT").setName("abc").setName('Antrium').setSymbol('ANT').getContract();
        const expectRes: String =
            `SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
contract Antrium is ERC20{
constructor() ERC20("Antrium", "ANT"){}
}`
        expect(contract.toString()).toBe(expectRes);
    })
    test('Test set Permit', () => {
        const contract = new ContractMapper().setName("Antrium").setPermit(99).getContract();
        const expectRes: String =
            `SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
contract Antrium is ERC20{
constructor() ERC20("Antrium", ""){
_mint(msg.sender, 99 * 10 ** decimals());
}
}`;
        expect(contract.toString()).toBe(expectRes);
    });
    test('test setIsBurnable', () => {
        const contract = new ContractMapper().setName("Antrium").setPermit(99).setIsBurnable(false).setIsBurnable(true).getContract();
        const expectRes: String =
            `SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
contract Antrium is ERC20{
constructor() ERC20("Antrium", ""){
_mint(msg.sender, 99 * 10 ** decimals());
}
}`;
        expect(contract.toString()).toBe(expectRes);

    });
});